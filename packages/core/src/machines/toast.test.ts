import { afterEach, describe, expect, it, vi } from "vitest";
import type { Scheduler } from "./store";
import {
  createToastQueue,
  getToastOverflow,
  TOAST_DEFAULT_DURATION,
  TOAST_DEFAULT_EXIT_DURATION,
  type ToastQueueLifecycleEvent,
} from "./toast";

/** A manual clock: `tick(ms)` runs the due timers in order. */
function createManualScheduler() {
  let now = 0;
  let nextId = 0;
  const timers = new Map<number, { at: number; fn: () => void }>();
  const scheduler: Scheduler = {
    setTimeout(fn, ms) {
      const id = ++nextId;
      timers.set(id, { at: now + ms, fn });
      return id;
    },
    clearTimeout(handle) {
      timers.delete(handle as number);
    },
    now: () => now,
  };
  const tick = (ms: number) => {
    const end = now + ms;
    for (;;) {
      const due = [...timers.entries()]
        .filter(([, t]) => t.at <= end)
        .sort((a, b) => a[1].at - b[1].at || a[0] - b[0])[0];
      if (!due) break;
      timers.delete(due[0]);
      now = due[1].at;
      due[1].fn();
    }
    now = end;
  };
  return { scheduler, tick, pending: () => timers.size };
}

const setup = (config: Parameters<typeof createToastQueue>[0] = {}) => {
  const clock = createManualScheduler();
  const queue = createToastQueue<string, { region?: string }>({
    scheduler: clock.scheduler,
    ...config,
  });
  return {
    queue,
    ...clock,
    ids: () => queue.getState().toasts.map((t) => t.id),
  };
};

describe("toast queue", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("adds toasts with defaults, in insertion order", () => {
    const { queue, ids } = setup();
    expect(queue.add({ title: "a" })).toBe(1);
    expect(queue.add({ title: "b", loading: true }, { region: "r" })).toBe(2);
    expect(queue.add({ id: "named", color: "danger", closable: false })).toBe(
      "named",
    );
    expect(ids()).toEqual([1, 2, "named"]);
    const [a, b, named] = queue.getState().toasts;
    expect(a).toMatchObject({
      color: "info",
      loading: false,
      duration: TOAST_DEFAULT_DURATION,
      closable: true,
      state: "open",
      title: "a",
    });
    expect(b).toMatchObject({ loading: true, duration: 0, region: "r" });
    expect(named).toMatchObject({ color: "danger", closable: false });
  });

  it("replaces a toast re-using an id in place and restarts its timer", () => {
    const { queue, ids, tick } = setup();
    queue.add({ id: "x", title: "first", duration: 1000 });
    queue.add({ title: "other", duration: 0 });
    tick(800);
    queue.add({ id: "x", title: "second", duration: 1000 });
    expect(ids()).toEqual(["x", 1]);
    expect(queue.getState().toasts[0].title).toBe("second");
    tick(800);
    expect(queue.getState().toasts[0].state).toBe("open");
    tick(200);
    expect(queue.getState().toasts[0].state).toBe("closing");
  });

  it("auto-dismisses, notifies and removes after the exit duration", () => {
    const { queue, tick, ids } = setup();
    const onClose = vi.fn();
    const events: ToastQueueLifecycleEvent<string>[] = [];
    queue.subscribeLifecycle((e) => events.push(e));
    queue.add({ id: "t", onClose });
    tick(TOAST_DEFAULT_DURATION - 1);
    expect(onClose).not.toHaveBeenCalled();
    tick(1);
    expect(onClose).toHaveBeenCalledWith("t");
    expect(events.map((e) => e.type)).toEqual(["close"]);
    expect(events[0]).toMatchObject({ reason: "timeout" });
    tick(TOAST_DEFAULT_EXIT_DURATION - 1);
    expect(ids()).toEqual(["t"]);
    tick(1);
    expect(ids()).toEqual([]);
    expect(events.map((e) => e.type)).toEqual(["close", "remove"]);
  });

  it("dismisses once (unknown and closing ids are ignored)", () => {
    const { queue, tick } = setup();
    const onClose = vi.fn();
    queue.add({ id: 1, onClose, duration: 0 });
    queue.dismiss(1, "close-button");
    queue.dismiss(1);
    queue.dismiss("missing");
    expect(onClose).toHaveBeenCalledTimes(1);
    tick(TOAST_DEFAULT_EXIT_DURATION);
    expect(queue.getState().toasts).toEqual([]);
  });

  it("keeps a toast shown again while it was closing", () => {
    const { queue, tick } = setup();
    queue.add({ id: "x", duration: 0 });
    queue.dismiss("x");
    queue.add({ id: "x", title: "again", duration: 0 });
    tick(TOAST_DEFAULT_EXIT_DURATION);
    expect(queue.getState().toasts).toHaveLength(1);
    expect(queue.getState().toasts[0].state).toBe("open");
  });

  it("dismissAll closes every toast", () => {
    const { queue } = setup();
    queue.add({ title: "a" });
    queue.add({ title: "b" });
    queue.dismissAll();
    expect(queue.getState().toasts.map((t) => t.state)).toEqual([
      "closing",
      "closing",
    ]);
  });

  it("pauses and resumes the countdown where it stopped", () => {
    const { queue, tick } = setup();
    queue.add({ id: "p", duration: 1000 });
    tick(600);
    queue.pause("p");
    queue.pause("p"); // no-op
    expect(queue.isPaused("p")).toBe(true);
    tick(5000);
    expect(queue.getState().toasts[0].state).toBe("open");
    queue.resume("p");
    queue.resume("p"); // no-op
    expect(queue.isPaused("p")).toBe(false);
    tick(399);
    expect(queue.getState().toasts[0].state).toBe("open");
    tick(1);
    expect(queue.getState().toasts[0].state).toBe("closing");
    // no timer: nothing to pause / resume
    queue.pause("unknown");
    queue.resume("unknown");
    expect(queue.isPaused("unknown")).toBe(false);
  });

  it("updates open toasts, switching the default duration with loading", () => {
    const { queue, tick } = setup();
    queue.add({ id: "l", loading: true, title: "Saving" }, { region: "r" });
    queue.update("l", { loading: false, title: "Saved", color: "success" });
    const [toast] = queue.getState().toasts;
    expect(toast).toMatchObject({
      loading: false,
      title: "Saved",
      color: "success",
      duration: TOAST_DEFAULT_DURATION,
      region: "r",
    });
    // back to loading: the loading default (no auto-close)
    queue.update("l", { loading: true });
    expect(queue.getState().toasts[0].duration).toBe(0);
    // an explicit duration wins; a custom one is kept
    queue.update("l", { duration: 50 });
    queue.update("l", { loading: false });
    expect(queue.getState().toasts[0].duration).toBe(50);
    queue.update("l", { title: "kept" });
    expect(queue.getState().toasts[0].duration).toBe(50);
    tick(50);
    expect(queue.getState().toasts[0].state).toBe("closing");
    // closing or unknown toasts are not updated
    const before = queue.getState();
    queue.update("l", { title: "late" });
    queue.update("missing", { title: "x" });
    expect(queue.getState()).toBe(before);
  });

  it("keeps nothing when not on the client but still hands out ids", () => {
    const { queue, pending } = setup({ isClient: () => false });
    const listener = vi.fn();
    queue.subscribe(listener);
    expect(queue.add({ title: "server" })).toBe(1);
    expect(queue.add({ id: "named" })).toBe("named");
    expect(queue.getState().toasts).toEqual([]);
    expect(listener).not.toHaveBeenCalled();
    expect(pending()).toBe(0);
  });

  it("reset clears toasts and timers and always notifies", () => {
    const { queue, pending } = setup();
    const listener = vi.fn();
    queue.subscribe(listener);
    queue.add({ title: "a" });
    queue.reset();
    expect(queue.getState().toasts).toEqual([]);
    expect(pending()).toBe(0);
    queue.reset();
    expect(listener).toHaveBeenCalledTimes(3);
  });

  it("dispatches the same operations through send()", () => {
    const { queue, tick } = setup({ defaultDuration: 100, exitDuration: 10 });
    queue.send({ type: "ADD", options: { id: "a" }, extra: { region: "x" } });
    queue.send({ type: "UPDATE", id: "a", options: { title: "u" } });
    queue.send({ type: "PAUSE", id: "a" });
    expect(queue.isPaused("a")).toBe(true);
    queue.send({ type: "RESUME", id: "a" });
    queue.send({ type: "ADD", options: { id: "b" } });
    queue.send({ type: "DISMISS", id: "b", reason: "escape" });
    expect(queue.getState().toasts.map((t) => t.state)).toEqual([
      "open",
      "closing",
    ]);
    tick(100);
    expect(queue.getState().toasts.map((t) => t.id)).toEqual(["a"]);
    queue.send({ type: "DISMISS_ALL" });
    expect(queue.getState().toasts[0]).toMatchObject({
      state: "closing",
      title: "u",
      region: "x",
    });
    queue.send({ type: "RESET" });
    expect(queue.getState().toasts).toEqual([]);
    queue.send({ type: "UNKNOWN" } as never);
  });

  it("unsubscribes lifecycle listeners", () => {
    const { queue } = setup();
    const listener = vi.fn();
    const off = queue.subscribeLifecycle(listener);
    off();
    queue.add({ id: 1 });
    queue.dismiss(1);
    expect(listener).not.toHaveBeenCalled();
  });

  it("uses the engine timers by default", () => {
    vi.useFakeTimers();
    const queue = createToastQueue<string>();
    queue.add({ id: "t", duration: 100 });
    vi.advanceTimersByTime(100);
    expect(queue.getState().toasts[0].state).toBe("closing");
    vi.advanceTimersByTime(TOAST_DEFAULT_EXIT_DURATION);
    expect(queue.getState().toasts).toEqual([]);
  });
});

describe("getToastOverflow", () => {
  it("returns the oldest open toasts beyond max (closing ones don't count)", () => {
    const list = [
      { id: 1, state: "closing" as const },
      { id: 2, state: "open" as const },
      { id: 3, state: "open" as const },
      { id: 4, state: "open" as const },
    ];
    expect(getToastOverflow(list, 2).map((t) => t.id)).toEqual([2]);
    expect(getToastOverflow(list, Infinity)).toEqual([]);
    expect(getToastOverflow(list, 0).map((t) => t.id)).toEqual([2, 3, 4]);
  });
});

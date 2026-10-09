import { expect, it, vi } from "vitest";
import { createConfirmStore, createToastStore } from "./feedback-store";
it("confirm store cancels unresolved requests on disposal and ignores repeat settlement", async () => {
  const store = createConfirmStore();
  let id = 0;
  store.subscribe((entries) => {
    id = entries[0]?.id ?? id;
  });
  const first = store.request({ title: "First" }),
    second = store.request({ title: "Second" });
  store.settle(id, true);
  store.settle(id, false);
  store.clear();
  await expect(first).resolves.toBe(true);
  await expect(second).resolves.toBe(false);
});
it("toast timers pause/resume with remaining duration and close only once", () => {
  vi.useFakeTimers();
  const store = createToastStore(),
    closed = vi.fn();
  const id = store.api({ title: "Message", duration: 100, onClose: closed });
  vi.advanceTimersByTime(40);
  store.pause(id);
  vi.advanceTimersByTime(1000);
  expect(closed).not.toHaveBeenCalled();
  store.resume(id);
  vi.advanceTimersByTime(59);
  expect(closed).not.toHaveBeenCalled();
  vi.advanceTimersByTime(1);
  expect(closed).toHaveBeenCalledOnce();
  store.api.dismiss(id);
  expect(closed).toHaveBeenCalledOnce();
  vi.useRealTimers();
});
it("toast promise updates the same id and preserves rejection", async () => {
  const store = createToastStore();
  let entries: Parameters<Parameters<typeof store.subscribe>[0]>[0] = [];
  store.subscribe((items) => (entries = items));
  let resolve!: (value: number) => void;
  const promise = new Promise<number>((done) => (resolve = done));
  expect(
    store.api.promise(
      promise,
      { loading: "Loading", success: (v) => `Saved ${v}`, error: "Failed" },
      { duration: 0 },
    ),
  ).toBe(promise);
  const id = entries[0]!.id;
  resolve(3);
  await promise;
  await Promise.resolve();
  expect(entries).toHaveLength(1);
  expect(entries[0]).toMatchObject({ id, title: "Saved 3", loading: false });
  const rejected = Promise.reject(new Error("offline"));
  store.api.promise(
    rejected,
    {
      loading: "Connecting",
      success: "Online",
      error: (e) => (e as Error).message,
    },
    { duration: 0 },
  );
  await expect(rejected).rejects.toThrow("offline");
  await Promise.resolve();
  expect(entries[1]).toMatchObject({
    title: "offline",
    color: "danger",
    loading: false,
  });
  store.api.dismiss();
});

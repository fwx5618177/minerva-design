// Leak harness: every public component (closed and open overlays included)
// is mounted, given time to run its effects, then unmounted. Nothing the
// library acquired may survive: event listeners on window / document /
// <html> / <body> / media query lists, timers, intervals, animation frames,
// idle callbacks, Resize / Mutation / Intersection observers.
import { useEffect, type ReactElement } from "react";
import { act, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createDismissableLayer, lockScroll } from "@minerva/dom";
import * as lib from "./index";
import { componentSsrCases } from "./test-utils/componentSsrCases";
import { trackLeaks, type LeakTracker } from "../../../tests/leak-tracker";

const realTimeout = globalThis.setTimeout.bind(globalThis);
const pause = (ms: number) =>
  act(() => new Promise<void>((resolve) => realTimeout(resolve, ms)));

let tracker: LeakTracker;

beforeEach(() => {
  tracker = trackLeaks();
  vi.spyOn(console, "error").mockImplementation(() => {});
  vi.spyOn(console, "warn").mockImplementation(() => {});
});

afterEach(() => {
  tracker.restore();
  vi.restoreAllMocks();
});

function ShowToast() {
  useEffect(() => {
    lib.toast.success("Saved", { duration: 60_000 });
  }, []);
  return null;
}

/** Overlays and timed components in their active state */
const activeCases: Array<[string, ReactElement]> = [
  [
    "Menu (open)",
    <lib.Menu items={[{ key: "a", label: "Alpha" }]} defaultOpen>
      <button type="button">Menu</button>
    </lib.Menu>,
  ],
  [
    "Select (open)",
    <lib.Select aria-label="Fruit" defaultOpen>
      <lib.SelectItem value="a">Apple</lib.SelectItem>
    </lib.Select>,
  ],
  [
    "Popover (open)",
    <lib.Popover defaultOpen>
      <lib.PopoverTrigger>Pop</lib.PopoverTrigger>
      <lib.PopoverContent aria-label="Pop">Body</lib.PopoverContent>
    </lib.Popover>,
  ],
  [
    "Tooltip (open)",
    <lib.Tooltip content="Tip" defaultOpen>
      <button type="button">Tip</button>
    </lib.Tooltip>,
  ],
  [
    "CommandDialog (open, with shortcut)",
    <lib.CommandDialog
      items={[{ id: "a", title: "Alpha" }]}
      shortcut="mod+k"
      defaultOpen
      onSelect={() => {}}
    />,
  ],
];

describe("leak harness: mount / unmount", () => {
  it.each([...componentSsrCases, ...activeCases])(
    "%s releases everything it acquired",
    async (_, element) => {
      const { unmount } = render(
        <lib.ConfigProvider theme="light">{element}</lib.ConfigProvider>,
      );
      await pause(30);
      unmount();
      await pause(30);
      expect(tracker.held()).toEqual([]);
    },
  );

  // The toast store is module level by design (the imperative `toast()` API
  // works without a provider and toasts survive a provider remount): a
  // toast's auto-dismiss timer belongs to the toast, not to the provider,
  // and is released when the toast closes.
  it("Toast: the auto-dismiss timer is released when the toast closes", async () => {
    const { unmount } = render(
      <lib.ToastProvider>
        <ShowToast />
      </lib.ToastProvider>,
    );
    await pause(30);
    unmount();
    expect(tracker.held().join("\n")).toMatch(/Toast[\\/]store\.ts/);
    act(() => lib.toast.dismiss());
    // closing animation (TOAST_EXIT_DURATION), then removal
    await pause(300);
    expect(tracker.held()).toEqual([]);
  });

  it("mounting twice holds the same resources as mounting once (no accumulation)", async () => {
    const element = (
      <lib.ConfigProvider theme="auto">
        <lib.Menu items={[{ key: "a", label: "Alpha" }]} defaultOpen>
          <button type="button">Menu</button>
        </lib.Menu>
      </lib.ConfigProvider>
    );
    const first = render(element);
    await pause(10);
    const once = tracker.counts();
    // an open menu holds its dismissable layer listeners
    expect(once.size).toBeGreaterThan(0);
    first.unmount();
    const second = render(element);
    await pause(10);
    expect(tracker.counts()).toEqual(once);
    second.unmount();
    await pause(10);
    expect(tracker.held()).toEqual([]);
  });
});

describe("leak tracker", () => {
  it("reports listeners, timers and observers the library did not release", () => {
    const el = document.createElement("div");
    document.body.append(el);
    const layer = createDismissableLayer(el, { onDismiss: () => {} });
    const unlock = lockScroll();
    expect(tracker.held().join("\n")).toMatch(
      /document "(keydown|pointerdown|focusin)"/,
    );
    layer.destroy();
    unlock();
    expect(tracker.held()).toEqual([]);
    el.remove();
  });

  it("ignores resources acquired outside the library", () => {
    const listener = () => {};
    window.addEventListener("resize", listener);
    const id = setTimeout(() => {}, 1000);
    const observer = new ResizeObserver(() => {});
    observer.observe(document.body);
    expect(tracker.held()).toEqual([]);
    window.removeEventListener("resize", listener);
    clearTimeout(id);
    observer.disconnect();
  });
});

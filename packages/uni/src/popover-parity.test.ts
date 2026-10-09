import { mount } from "@vue/test-utils";
import { h, nextTick } from "vue";
import { it, expect } from "vitest";
import Popover from "./Popover.vue";
import PopoverTrigger from "./PopoverTrigger.vue";
import PopoverAnchor from "./PopoverAnchor.vue";
import PopoverContent from "./PopoverContent.vue";
it("Popover measures a separate anchor, flips at viewport edge, shifts and matches width", async () => {
  const w = mount(Popover, {
    props: { open: false },
    slots: {
      default: () => [
        h(PopoverTrigger, {}, () => "Open"),
        h(PopoverAnchor, {}, () => "Anchor"),
        h(
          PopoverContent,
          {
            side: "bottom",
            align: "end",
            sideOffset: 6,
            collisionPadding: 8,
            matchAnchorWidth: "exact",
            forceMount: true,
            arrow: true,
          },
          () => "Details",
        ),
      ],
    },
    attachTo: document.body,
  });
  const anchor = w.find(".mn-popover-anchor").element as HTMLElement;
  anchor.getBoundingClientRect = () =>
    ({
      left: 950,
      right: 1030,
      top: 720,
      bottom: 750,
      width: 80,
      height: 30,
    }) as DOMRect;
  const panel = w.find('[role="dialog"]').element as HTMLElement;
  panel.getBoundingClientRect = () => ({ width: 200, height: 100 }) as DOMRect;
  await w.setProps({ open: true });
  await nextTick();
  await nextTick();
  expect(panel.dataset.side).toBe("top");
  expect(panel.style.width).toBe("80px");
  expect(Number.parseFloat(panel.style.left)).toBeLessThanOrEqual(
    window.innerWidth - 88,
  );
  expect(panel.style.top).toBe("614px");
  expect(w.find("[data-popover-arrow]").exists()).toBe(true);
  w.unmount();
});
it("cancelable dismissal honors Escape callback then closes and preserves owner rejection", async () => {
  const w = mount(Popover, {
    props: { open: true },
    slots: {
      default: () => [
        h(PopoverTrigger, {}, () => "Open"),
        h(
          PopoverContent,
          { onEscapeKeyDown: (event: Event) => event.preventDefault() },
          () => "Details",
        ),
      ],
    },
    attachTo: document.body,
  });
  await w.find('[role="dialog"]').trigger("keydown", { key: "Escape" });
  expect(w.emitted("openChange")).toBeUndefined();
  w.unmount();
  const plain = mount(Popover, {
    props: { open: true },
    slots: {
      default: () => [
        h(PopoverTrigger, {}, () => "Open"),
        h(PopoverContent, {}, () => "Details"),
      ],
    },
  });
  await plain.find('[role="dialog"]').trigger("keydown", { key: "Escape" });
  expect(plain.emitted("openChange")).toEqual([[false]]);
  expect(plain.find('[role="dialog"]').isVisible()).toBe(true);
});
it("closing and unmount remove native polling and host listeners", async () => {
  const { vi } = await import("vitest");
  vi.useFakeTimers();
  const previous = uni;
  const off = vi.fn(),
    exec = vi.fn();
  const query = {
    in: () => query,
    select: () => query,
    boundingClientRect: () => query,
    exec,
  };
  vi.stubGlobal("uni", {
    ...previous,
    createSelectorQuery: () => query,
    getSystemInfoSync: () => ({ windowWidth: 400, windowHeight: 800 }),
    onWindowResize: vi.fn(),
    offWindowResize: off,
  });
  const w = mount(Popover, {
    props: { open: false },
    slots: {
      default: () => [
        h(PopoverTrigger, {}, () => "Open"),
        h(PopoverContent, { forceMount: true }, () => "Details"),
      ],
    },
  });
  const panel = w.find('[role="dialog"]').element;
  Object.defineProperty(panel, "getBoundingClientRect", {
    value: undefined,
    configurable: true,
  });
  await w.setProps({ open: true });
  await nextTick();
  vi.advanceTimersByTime(310);
  expect(exec.mock.calls.length).toBeGreaterThan(1);
  await w.setProps({ open: false });
  await nextTick();
  const closed = exec.mock.calls.length;
  vi.advanceTimersByTime(300);
  expect(exec).toHaveBeenCalledTimes(closed);
  await w.setProps({ open: true });
  await nextTick();
  w.unmount();
  const unmounted = exec.mock.calls.length;
  vi.advanceTimersByTime(300);
  expect(exec).toHaveBeenCalledTimes(unmounted);
  expect(off).toHaveBeenCalled();
  vi.useRealTimers();
  vi.stubGlobal("uni", previous);
});

import { mount } from "@vue/test-utils";
import { h, nextTick } from "vue";
import { it, expect, vi } from "vitest";
import VirtualList from "./VirtualList.vue";
const items = Array.from({ length: 100 }, (_, id) => ({
  id,
  label: `Row ${id}`,
}));
it("VirtualList honors maxHeight/itemPadding, native scroll range and retains the focused row", async () => {
  const w = mount(VirtualList, {
    props: {
      items,
      itemHeight: 40,
      maxHeight: 120,
      overscan: 0,
      itemPadding: 6,
      onItemClick: () => {},
    },
    slots: { default: ({ item }) => h("span", item.label) },
  });
  expect(w.attributes("style")).toContain("120px");
  expect(w.find('[data-virtual-index="0"]').attributes("style")).toContain(
    "6px",
  );
  await w.find('[data-virtual-index="0"]').trigger("focusin");
  await w.trigger("scroll", { detail: { scrollTop: 800, scrollHeight: 4000 } });
  expect(w.find('[data-virtual-index="20"]').exists()).toBe(true);
  expect(w.find('[data-virtual-index="0"]').exists()).toBe(true);
  await w
    .find('[data-virtual-index="20"]')
    .trigger("keydown", { key: "Enter" });
  expect(w.emitted("itemClick")?.[0].slice(0, 2)).toEqual([items[20], 20]);
});
it("VirtualList promise loadMore guard, loading suppression and highPerformance scheduling work", async () => {
  vi.useFakeTimers();
  let resolve = () => {};
  const load = vi.fn(() => new Promise<void>((r) => (resolve = r)));
  const w = mount(VirtualList, {
    props: {
      items,
      itemHeight: 40,
      maxHeight: 120,
      loadMoreThreshold: 100,
      onLoadMore: load,
      highPerformance: true,
    },
  });
  await w.trigger("scroll", {
    detail: { scrollTop: 3800, scrollHeight: 4000 },
  });
  expect(load).not.toHaveBeenCalled();
  vi.runOnlyPendingTimers();
  await nextTick();
  expect(load).toHaveBeenCalledTimes(1);
  await w.trigger("scroll", {
    detail: { scrollTop: 3810, scrollHeight: 4000 },
  });
  vi.runOnlyPendingTimers();
  await nextTick();
  expect(load).toHaveBeenCalledTimes(1);
  resolve();
  await Promise.resolve();
  await w.setProps({ loading: true });
  await w.trigger("scroll", {
    detail: { scrollTop: 3820, scrollHeight: 4000 },
  });
  vi.runOnlyPendingTimers();
  expect(load).toHaveBeenCalledTimes(1);
  expect(w.find('[role="progressbar"]').exists()).toBe(true);
  w.unmount();
  expect(vi.getTimerCount()).toBe(0);
  vi.useRealTimers();
});
it("VirtualList measures first-row content when fixed height is omitted and applies changed padding", async () => {
  const previous = globalThis.ResizeObserver;
  let measure: ResizeObserverCallback = () => {};
  vi.stubGlobal(
    "ResizeObserver",
    class {
      constructor(fn: ResizeObserverCallback) {
        measure = fn;
      }
      observe() {}
      disconnect() {}
    },
  );
  const w = mount(VirtualList, {
    props: { items, maxHeight: 120, itemPadding: 5 },
  });
  const sample = w.find("[data-virtual-measure]").element;
  Object.defineProperty(sample, "offsetHeight", { value: 30 });
  measure(
    [{ target: sample, contentRect: { height: 30 } }] as ResizeObserverEntry[],
    {} as ResizeObserver,
  );
  await nextTick();
  expect(w.find('[data-virtual-index="0"]').attributes("style")).toContain(
    "height: 40px",
  );
  await w.setProps({ itemPadding: 10 });
  expect(w.find('[data-virtual-index="0"]').attributes("style")).toContain(
    "height: 50px",
  );
  w.unmount();
  vi.stubGlobal("ResizeObserver", previous);
});

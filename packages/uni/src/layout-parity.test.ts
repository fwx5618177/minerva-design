import { mount } from "@vue/test-utils";
import { h, nextTick } from "vue";
import { expect, it, vi } from "vitest";
import Box from "./Box.vue";
import ResponsiveGrid from "./ResponsiveGrid.vue";
import FormLayout from "./FormLayout.vue";
import SplitLayout from "./SplitLayout.vue";
import AppShell from "./AppShell.vue";

it("Box spacing axes use core tokens while dimensions use pixels and sides override axes", () => {
  const w = mount(Box, {
    props: {
      p: 4,
      px: 2,
      pl: "12px",
      m: "auto",
      w: 120,
      bg: "bg.muted",
      rounded: "lg",
      boxShadow: "sm",
    },
  });
  const style = w.attributes("style");
  expect((w.element as HTMLElement).style.paddingTop).toBe("var(--space-4)");
  expect((w.element as HTMLElement).style.paddingRight).toBe("var(--space-2)");
  expect((w.element as HTMLElement).style.paddingLeft).toBe("12px");
  expect(style).toContain("width: 120px");
  expect(style).toContain("var(--surface-muted-color)");
});
it("ResponsiveGrid responds to its measured container width and inherits omitted breakpoints", async () => {
  const previousObserver = globalThis.ResizeObserver;
  let resize: ResizeObserverCallback = () => {};
  vi.stubGlobal(
    "ResizeObserver",
    class {
      constructor(fn: ResizeObserverCallback) {
        resize = fn;
      }
      observe() {}
      disconnect() {}
    },
  );
  const w = mount(ResponsiveGrid, {
    props: { columns: { base: 1, sm: 2, lg: 4 }, gap: 3, rowGap: "12px" },
    attachTo: document.body,
  });
  resize(
    [{ contentRect: { width: 500 } }] as ResizeObserverEntry[],
    {} as ResizeObserver,
  );
  await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
  await nextTick();
  expect(w.find("[data-grid-layout]").attributes("style")).toContain(
    "repeat(2,",
  );
  resize(
    [{ contentRect: { width: 900 } }] as ResizeObserverEntry[],
    {} as ResizeObserver,
  );
  await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
  await nextTick();
  expect(w.find("[data-grid-layout]").attributes("style")).toContain(
    "repeat(2,",
  );
  resize(
    [{ contentRect: { width: 1250 } }] as ResizeObserverEntry[],
    {} as ResizeObserver,
  );
  await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
  await nextTick();
  expect(w.find("[data-grid-layout]").attributes("style")).toContain(
    "repeat(4,",
  );
  expect(w.find("[data-grid-layout]").attributes("style")).toContain(
    "row-gap: 12px",
  );
  w.unmount();
  vi.stubGlobal("ResizeObserver", previousObserver);
});
it("ResponsiveGrid validates columns instead of silently ignoring them", () => {
  expect(() => mount(ResponsiveGrid, { props: { columns: 13 } })).toThrow(
    RangeError,
  );
});
it("FormLayout delegates all responsive columns and native form submit detail", async () => {
  const w = mount(FormLayout, {
    props: { columns: { base: 1, md: 3 }, gap: 2, columnGap: "8px" },
  });
  expect(w.findComponent(ResponsiveGrid).props("columns")).toEqual({
    base: 1,
    md: 3,
  });
  await w
    .find("form")
    .trigger("submit", { detail: { value: { email: "a@example.test" } } });
  expect(w.emitted("submit")).toEqual([
    [{ value: { email: "a@example.test" } }],
  ]);
});
it("SplitLayout omits empty aside and validates requested width", () => {
  expect(mount(SplitLayout).find("[data-split-aside]").exists()).toBe(false);
  expect(() =>
    mount(SplitLayout, {
      props: { asideWidth: -1 },
      slots: { aside: "Aside" },
    }),
  ).toThrow(RangeError);
  const w = mount(SplitLayout, {
    props: { asideWidth: 300 },
    slots: { default: "Main", aside: "Aside" },
  });
  expect(w.find("[data-split-aside]").text()).toBe("Aside");
});
it("AppShell controlled mode rejection, compact navigation state and route close use actual slots", async () => {
  const w = mount(AppShell, {
    props: { sidebarMode: "expanded" },
    slots: {
      brand: "Brand",
      navigation: ({ collapsed }) =>
        h("span", collapsed ? "Compact navigation" : "Full navigation"),
      default: "Content",
    },
  });
  await w.find('[aria-label="Collapse sidebar"]').trigger("click");
  expect(w.emitted("sidebarModeChange")).toEqual([["compact"]]);
  expect(w.text()).toContain("Full navigation");
  await w.setProps({ sidebarMode: "compact" });
  expect(w.text()).toContain("Compact navigation");
  expect(w.findAll('[role="main"]')).toHaveLength(1);
});
it("AppShell mobile opens a single navigation instance and closes after committed navigationKey", async () => {
  const previous = uni;
  let resize: ((e: { size: { windowWidth: number } }) => void) | undefined;
  vi.stubGlobal("uni", {
    ...previous,
    getSystemInfoSync: () => ({ windowWidth: 390 }),
    onWindowResize: (fn: (e: { size: { windowWidth: number } }) => void) =>
      (resize = fn),
    offWindowResize: vi.fn(),
  });
  const w = mount(AppShell, {
    props: { navigationKey: "a" },
    slots: { navigation: () => h("span", { "data-nav-content": "" }, "Menu") },
  });
  expect(w.findAll("[data-nav-content]")).toHaveLength(0);
  await w.find('[aria-label="Open navigation"]').trigger("click");
  expect(w.findAll("[data-nav-content]")).toHaveLength(1);
  await w.setProps({ navigationKey: "b" });
  expect(w.findAll("[data-nav-content]")).toHaveLength(0);
  resize?.({ size: { windowWidth: 1200 } });
  await nextTick();
  expect(w.findAll("[data-nav-content]")).toHaveLength(1);
  w.unmount();
  vi.stubGlobal("uni", previous);
});

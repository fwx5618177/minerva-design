import { mount } from "@vue/test-utils";
import { h, nextTick } from "vue";
import { it, expect } from "vitest";
import PageTabs from "./PageTabs.vue";
import PageTab from "./PageTab.vue";
it("PageTab is a route control with independent action, onSelect and active current-page state", async () => {
  const w = mount(PageTab, {
    props: { value: "a", label: "Overview", active: true },
    slots: { action: () => h("button", { "data-action": "" }, "Close") },
  });
  expect(w.find('[aria-current="page"]').text()).toBe("Overview");
  expect(w.find('[role="tab"]').exists()).toBe(false);
  await w.find('[aria-current="page"]').trigger("click");
  expect(w.emitted("select")).toEqual([[]]);
  await w.find("[data-action]").trigger("click");
  expect(w.emitted("select")).toHaveLength(1);
  await w.setProps({ disabled: true });
  expect(w.find("[data-action]").attributes("disabled")).toBeUndefined();
});
it("PageTabs uses activeValue, real horizontal overflow, scroll buttons, and active reveal", async () => {
  const w = mount(PageTabs, {
    props: { activeValue: "a", "aria-label": "Open files" },
    slots: {
      default: () => [
        h(PageTab, { value: "a", label: "A" }),
        h(PageTab, { value: "b", label: "B" }),
      ],
    },
    attachTo: document.body,
  });
  const viewport = w.find("[data-page-viewport]").element as HTMLElement;
  Object.defineProperties(viewport, {
    clientWidth: { configurable: true, value: 200 },
    scrollWidth: { configurable: true, value: 600 },
  });
  viewport.getBoundingClientRect = () =>
    ({ left: 0, right: 200, width: 200 }) as DOMRect;
  const b = w.find('[data-value="b"]').element as HTMLElement;
  b.getBoundingClientRect = () =>
    ({ left: 450, right: 550, width: 100 }) as DOMRect;
  window.dispatchEvent(new Event("resize"));
  await nextTick();
  expect(w.find('[aria-label="Scroll pages right"]').exists()).toBe(true);
  await w.find('[aria-label="Scroll pages right"]').trigger("click");
  expect(viewport.scrollLeft).toBe(160);
  await w.setProps({ activeValue: "b" });
  await nextTick();
  expect(viewport.scrollLeft).toBeGreaterThan(160);
  expect(w.find('[data-value="b"] [aria-current="page"]').exists()).toBe(true);
  w.unmount();
});
it("removing a focused page restores focus to the committed current page", async () => {
  const w = mount(PageTabs, {
    props: {
      activeValue: "a",
      items: [
        { value: "a", label: "A" },
        { value: "b", label: "B" },
      ],
    },
    attachTo: document.body,
  });
  const removed = w.find('[data-value="b"] button')
    .element as HTMLButtonElement;
  removed.focus();
  await w.setProps({ items: [{ value: "a", label: "A" }] });
  await nextTick();
  expect(document.activeElement).toBe(
    w.find('[data-value="a"] button').element,
  );
  w.unmount();
});

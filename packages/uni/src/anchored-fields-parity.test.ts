import { mount, flushPromises } from "@vue/test-utils";
import { it, expect } from "vitest";
import { h, nextTick } from "vue";
import Menu from "./Menu.vue";
import TimePicker from "./TimePicker.vue";
it("Menu measures the trigger, flips bottom collision, typeahead focuses entries, then restores trigger", async () => {
  const w = mount(Menu, {
    props: {
      items: [
        { key: "a", label: "Alpha" },
        { key: "b", label: "Beta" },
      ],
    },
    slots: { trigger: () => h("button", "Open") },
    attachTo: document.body,
  });
  const trigger = w.find("[data-menu-trigger]").element as HTMLElement;
  trigger.getBoundingClientRect = () =>
    ({
      left: 20,
      right: 100,
      top: 750,
      bottom: 780,
      width: 80,
      height: 30,
    }) as DOMRect;
  await w.find("[data-menu-trigger]").trigger("click");
  await nextTick();
  expect(w.find(".mn-uni-popover-panel").attributes("data-side")).toBe("top");
  await w.find('[role="menu"]').trigger("keydown", { key: "b" });
  expect((document.activeElement as HTMLElement).textContent).toContain("Beta");
  await w.find('[data-menu-key="b"]').trigger("click");
  await nextTick();
  await nextTick();
  expect(document.activeElement).toBe(
    w.find("[data-menu-trigger] button").element,
  );
  w.unmount();
});
it("TimePicker measures input and flips its real panel above a bottom edge", async () => {
  const w = mount(TimePicker, { attachTo: document.body });
  const input = w.find("input").element;
  const field = w.find(".mn-input-wrapper").element as HTMLElement;
  field.getBoundingClientRect = () =>
    ({
      left: 20,
      right: 220,
      top: 750,
      bottom: 790,
      width: 200,
      height: 40,
    }) as DOMRect;
  await w.find("input").trigger("click");
  await nextTick();
  expect(w.find(".mn-uni-popover-panel").attributes("data-side")).toBe("top");
  expect(w.find('[data-time-column="second"]').exists()).toBe(true);
  await w.find('[role="dialog"]').trigger("keydown", { key: "Escape" });
  await nextTick();
  expect(w.find('[role="dialog"]').exists()).toBe(false);
  expect(document.activeElement).toBe(input);
  w.unmount();
});
it("Menu RTL submenu navigation focuses children and Escape returns only to its parent", async () => {
  const w = mount(Menu, {
    props: {
      dir: "rtl",
      items: [
        {
          key: "parent",
          label: "Parent",
          children: [
            { key: "child", label: "Child" },
            { key: "other", label: "Other" },
          ],
        },
        { key: "last", label: "Last" },
      ],
    },
    attachTo: document.body,
  });
  const parent = w.get('[data-menu-key="parent"]');
  await parent.trigger("keydown", { key: "ArrowLeft" });
  await nextTick();
  expect((document.activeElement as HTMLElement).textContent).toContain(
    "Child",
  );
  await w.get('[data-menu-key="child"]').trigger("keydown", { key: "ArrowUp" });
  expect((document.activeElement as HTMLElement).textContent).toContain(
    "Other",
  );
  await w.get('[data-menu-key="other"]').trigger("keydown", { key: "Escape" });
  await nextTick();
  expect(document.activeElement).toBe(parent.element);
  expect(w.emitted("openChange")).toBeUndefined();
  w.unmount();
});
it("AutoComplete measures and flips its native dropdown without stealing typing focus", async () => {
  const { default: AutoComplete } = await import("./AutoComplete.vue");
  const w = mount(AutoComplete, {
    props: { options: [{ value: "a", label: "Alpha" }] },
    attachTo: document.body,
  });
  const input = w.get("input");
  (input.element as HTMLElement).getBoundingClientRect = () =>
    ({
      left: 30,
      right: 130,
      top: 750,
      bottom: 780,
      width: 100,
      height: 30,
    }) as DOMRect;
  (input.element as HTMLElement).focus();
  await flushPromises();
  expect(w.get(".mn-uni-popover-panel").attributes("data-side")).toBe("top");
  expect(document.activeElement).toBe(input.element);
  await w.get('[role="option"]').trigger("click");
  await nextTick();
  expect((w.get("input").element as HTMLInputElement).value).toBe("Alpha");
  w.unmount();
});
it("AutoComplete animation can be disabled and reenabled on the actual popup", async () => {
  const { default: AutoComplete } = await import("./AutoComplete.vue");
  const w = mount(AutoComplete, {
    props: { animation: false, options: [{ value: "a", label: "Alpha" }] },
  });
  await w.get("input").trigger("focus");
  expect(w.get('[role="listbox"]').classes()).not.toContain(
    "mn-autocomplete-animated",
  );
  await w.setProps({ animation: true });
  expect(w.get('[role="listbox"]').classes()).toContain(
    "mn-autocomplete-animated",
  );
  w.unmount();
});
it("Menu hover opens a submenu without taking focus and leaving closes it after the grace period", async () => {
  const w = mount(Menu, {
    props: {
      items: [
        { key: "p", label: "Parent", children: [{ key: "c", label: "Child" }] },
      ],
    },
  });
  const row = w.get('[data-menu-key="p"]').element.parentElement!;
  row.dispatchEvent(new MouseEvent("mouseenter"));
  await nextTick();
  expect(w.find('[data-menu-key="c"]').exists()).toBe(true);
  row.dispatchEvent(new MouseEvent("mouseleave"));
  await new Promise((resolve) => setTimeout(resolve, 260));
  await nextTick();
  expect(w.find('[data-menu-key="c"]').exists()).toBe(false);
  w.unmount();
});

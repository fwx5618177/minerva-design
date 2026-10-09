import { mount } from "@vue/test-utils";
import { h, nextTick } from "vue";
import { it, expect } from "vitest";
import Tabs from "./Tabs.vue";
import TabList from "./TabList.vue";
import Tab from "./Tab.vue";
import TabPanel from "./TabPanel.vue";
function children() {
  return [
    h(TabList, {}, () => [
      h(Tab, { value: "a" }, () => "Alpha"),
      h(Tab, { value: "x", disabled: true }, () => "Disabled"),
      h(Tab, { value: "b", color: "danger" }, () => "Beta"),
    ]),
    h(TabPanel, { value: "a" }, () => "First"),
    h(TabPanel, { value: "b", forceMount: true }, () => "Second"),
  ];
}
it("Tabs orientation/variant/color render actual compound state and ARIA relationships", async () => {
  const w = mount(Tabs, {
    props: { orientation: "vertical", variant: "pills", color: "success" },
    slots: { default: children },
    attachTo: document.body,
  });
  await nextTick();
  expect(w.classes()).toEqual(
    expect.arrayContaining([
      "mn-tabs-vertical",
      "mn-tabs-pills",
      "mn-tabs-success",
    ]),
  );
  expect(w.find('[role="tablist"]').attributes("aria-orientation")).toBe(
    "vertical",
  );
  const tabs = w.findAll('[role="tab"]');
  expect(tabs[0].attributes("aria-selected")).toBe("true");
  expect(w.find('[role="tabpanel"]').attributes("aria-labelledby")).toBe(
    tabs[0].attributes("id"),
  );
  await tabs[0].trigger("keydown", { key: "ArrowDown" });
  expect(document.activeElement).toBe(tabs[2].element);
  expect(tabs[2].attributes("aria-selected")).toBe("true");
  expect(tabs[2].classes()).toContain("mn-tab-color-danger");
  w.unmount();
});
it("Tabs manual activation moves focus without changing selection; controlled owner may reject activation", async () => {
  const w = mount(Tabs, {
    props: { value: "a", activationMode: "manual", dir: "rtl" },
    slots: { default: children },
    attachTo: document.body,
  });
  const tabs = w.findAll('[role="tab"]');
  await tabs[0].trigger("keydown", { key: "ArrowLeft" });
  expect(document.activeElement).toBe(tabs[2].element);
  expect(w.emitted("change")).toBeUndefined();
  await tabs[2].trigger("keydown", { key: "Enter" });
  expect(w.emitted("change")).toEqual([["b"]]);
  expect(tabs[0].attributes("aria-selected")).toBe("true");
  w.unmount();
});

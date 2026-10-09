import type { Component } from "vue";
import { mount } from "@vue/test-utils";
import { expect, it } from "vitest";
import * as components from "./index";
const names = [
  "Checkbox",
  "Radio",
  "Textarea",
  "NumberInput",
  "Rating",
  "Select",
  "AutoComplete",
  "Cascader",
  "TagInput",
  "JsonField",
  "KeyValueEditor",
  "TimePicker",
  "MonthCalendar",
  "Pagination",
  "Tabs",
  "PageTabs",
  "Menu",
  "NavTree",
  "Steps",
  "Modal",
  "Drawer",
  "Confirm",
  "Popover",
  "Tooltip",
  "Toast",
  "CommandDialog",
  "Table",
  "DataTable",
  "VirtualList",
  "Upload",
  "Avatar",
  "AvatarGroup",
  "Badge",
  "Card",
  "ProgressIndicator",
  "Empty",
  "Skeleton",
  "Alert",
  "Divider",
  "Tag",
  "ThemeToggle",
  "Box",
  "Stack",
  "ResponsiveGrid",
  "SplitLayout",
  "Page",
  "AppShell",
  "FormControl",
  "FormField",
  "FormLayout",
  "LoadingState",
  "TextLink",
  "DescriptionList",
  "List",
  "CodeBlock",
  "Prose",
  "HtmlPreview",
  "IconButton",
];
it.each(names)("%s has an actual native renderer", (name) => {
  expect((components as Record<string, unknown>)[name]).toBeTruthy();
});
it("number input clamps stepping and blocks disabled interaction", async () => {
  const w = mount(components.NumberInput, {
    props: { defaultValue: 2, min: 0, max: 3, step: 2, showStepper: true },
  });
  await w.find('[data-action="increment"]').trigger("click");
  expect(w.emitted("change")).toEqual([[3]]);
  await w.setProps({ disabled: true });
  await w.find('[data-action="decrement"]').trigger("click");
  expect(w.emitted("change")).toHaveLength(1);
});
it("selection excludes disabled options and emits the value", async () => {
  const w = mount(components.Select, {
    props: {
      options: [
        { value: "a", label: "Alpha" },
        { value: "b", label: "Beta", disabled: true },
      ],
    },
  });
  await w.find('[data-action="trigger"]').trigger("click");
  await w.find('[data-value="b"]').trigger("click");
  expect(w.emitted("change")).toBeUndefined();
  await w.find('[data-value="a"]').trigger("click");
  expect(w.emitted("change")).toEqual([["a"]]);
});
it("modal dismisses from backdrop and emits a controlled request", async () => {
  const w = mount(components.Modal, {
    props: { open: true, title: "Editor" },
    slots: { default: "Content" },
  });
  await w.find('[data-part="backdrop"]').trigger("click");
  expect(w.emitted("update:open")).toEqual([[false]]);
  expect(w.text()).toContain("Editor");
});
it("table sorts records numerically and emits selected keys", async () => {
  const w = mount(components.Table, {
    props: {
      columns: [{ key: "score", header: "Score", sortable: true }],
      data: [
        { id: "a", score: 10 },
        { id: "b", score: 2 },
      ],
      rowKey: "id",
      selectable: true,
    },
  });
  await w.find('[data-sort="score"]').trigger("click");
  expect(w.findAll('[data-part="cell"]').map((c) => c.text())).toEqual([
    "2",
    "10",
  ]);
  await w.find('[data-select="b"]').trigger("click");
  expect(w.emitted("selectionChange")?.[0]?.[0]).toEqual(["b"]);
});
it.each(names)("%s mounts with native host components", (name) => {
  const w = mount((components as unknown as Record<string, Component>)[name], {
    props: name === "IconButton" ? { label: "Edit" } : {},
  });
  expect(w.exists()).toBe(true);
  w.unmount();
});
it("controlled select keeps parent value until updated", async () => {
  const w = mount(components.Select, {
    props: {
      value: "a",
      options: [
        { value: "a", label: "Alpha" },
        { value: "b", label: "Beta" },
      ],
    },
  });
  await w.find('[data-action="trigger"]').trigger("click");
  await w.find('[data-value="b"]').trigger("click");
  expect(w.emitted("change")).toEqual([["b"]]);
  expect(w.find('[data-action="trigger"]').text()).toContain("Alpha");
  await w.setProps({ value: "b" });
  expect(w.find('[data-action="trigger"]').text()).toContain("Beta");
});
it("JSON field preserves and emits raw text including invalid drafts", async () => {
  const w = mount(components.JsonField, {
    props: { defaultValue: '{"ok":true}' },
  });
  await w.find("textarea").trigger("input", { detail: { value: "{" } });
  expect(w.text()).toContain("Invalid JSON");
  expect(w.emitted("change")).toEqual([["{"]]);
  await w
    .find("textarea")
    .trigger("input", { detail: { value: '{"count":2}' } });
  expect(w.emitted("change")).toEqual([["{"], ['{"count":2}']]);
});
it("Button renders all style axes and loading content", async () => {
  const w = mount(components.Button, {
    props: {
      size: "xlarge",
      variant: "link",
      color: "danger",
      fullWidth: true,
      loading: true,
      loadingText: "Saving",
    },
    slots: { default: "Save", startIcon: "+" },
  });
  expect(w.classes()).toContain("mn-size-xlarge");
  expect(w.classes()).toContain("mn-color-danger");
  expect(w.text()).toBe("Saving");
  await w.setProps({ loading: false });
  expect(w.text()).toContain("Save");
});
it("Input clears, reveals password and keeps rejected controlled value", async () => {
  const w = mount(components.Input, {
    props: {
      value: "secret",
      type: "password",
      clearable: true,
      showCharCount: true,
    },
  });
  await w.find('[data-action="password"]').trigger("click");
  expect(w.find("input").attributes("password")).toBe("false");
  await w.find('[data-action="clear"]').trigger("click");
  expect(w.emitted("change")).toEqual([[""]]);
  expect((w.find("input").element as HTMLInputElement).value).toBe("secret");
  expect(w.text()).toContain("6");
});
it("Rating displays five stars on a ten-point scale", () => {
  const w = mount(components.Rating, {
    props: { value: 7, max: 10, showValue: true },
  });
  expect(w.findAll(".mn-star")).toHaveLength(5);
  expect(w.findAll(".mn-rating-half")).toHaveLength(1);
  expect(w.text()).toContain("7.0");
});
it("table select-all skips disabled rows and filter resets local page", async () => {
  const w = mount(components.Table, {
    props: {
      columns: [
        {
          key: "team",
          header: "Team",
          filters: [
            { text: "A", value: "a" },
            { text: "B", value: "b" },
          ],
        },
      ],
      data: [
        { id: "1", team: "a" },
        { id: "2", team: "b" },
        { id: "3", team: "a", disabled: true },
      ],
      selectable: true,
      pageSize: 1,
    },
  });
  await w.find('[data-action="select-all"]').trigger("click");
  expect(w.emitted("selectionChange")?.[0]?.[0]).toEqual(["1"]);
  await w.find('[data-action="next-page"]').trigger("click");
  expect(w.text()).toContain("2 / 3");
  await w.find('[data-filter="team:a"]').trigger("click");
  expect(w.text()).toContain("1 / 2");
});

it("NumberInput commits only on blur with precision and nullable clearing", async () => {
  const w = mount(components.NumberInput, {
    props: { defaultValue: 1.2, step: 0.01, max: 5 },
  });
  await w.find("input").trigger("input", { detail: { value: "2.345" } });
  expect(w.emitted("change")).toBeUndefined();
  await w.find("input").trigger("blur");
  expect(w.emitted("change")).toEqual([[2.35]]);
  await w.find("input").trigger("input", { detail: { value: "" } });
  await w.find("input").trigger("blur");
  expect(w.emitted("change")?.[1]).toEqual([null]);
});

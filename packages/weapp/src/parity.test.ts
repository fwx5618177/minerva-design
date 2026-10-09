import simulate from "miniprogram-simulate";
import { expect, it } from "vitest";
import * as controls from "./index";
const names = [
  "checkbox",
  "radio",
  "textarea",
  "numberInput",
  "rating",
  "select",
  "autoComplete",
  "cascader",
  "tagInput",
  "jsonField",
  "keyValueEditor",
  "timePicker",
  "monthCalendar",
  "pagination",
  "tabs",
  "pageTabs",
  "menu",
  "navTree",
  "steps",
  "modal",
  "drawer",
  "confirm",
  "popover",
  "tooltip",
  "toast",
  "commandDialog",
  "table",
  "dataTable",
  "virtualList",
  "upload",
  "avatar",
  "avatarGroup",
  "badge",
  "card",
  "progressIndicator",
  "empty",
  "skeleton",
  "alert",
  "divider",
  "tag",
  "themeToggle",
  "box",
  "stack",
  "responsiveGrid",
  "splitLayout",
  "page",
  "appShell",
  "formControl",
  "formField",
  "formLayout",
  "loadingState",
  "textLink",
  "descriptionList",
  "list",
  "codeBlock",
  "prose",
  "htmlPreview",
  "iconButton",
];
it.each(names)("%s has a native template and definition", (name) => {
  const c = (controls as unknown as Record<string, typeof controls.button>)[
    name
  ];
  expect(c).toBeTruthy();
  expect(c.template).toBeTruthy();
  expect(c.definition).toBeTruthy();
});
function mount(name: string, props: Record<string, unknown> = {}) {
  const c = (controls as unknown as Record<string, typeof controls.button>)[
    name
  ];
  const id = simulate.load({
    tagName: "mn-" + name.toLowerCase(),
    template: c.template,
    ...c.definition,
  });
  const w = simulate.render(id, props);
  w.attach(document.createElement("div"));
  return w;
}
it("number stepping clamps and disables mutation", async () => {
  const w = mount("numberInput", {
    value: 2,
    min: 0,
    max: 3,
    step: 2,
    showStepper: true,
  });
  const events: unknown[] = [];
  w.addEventListener("change", (e) => events.push(e.detail));
  w.querySelector(".mn-increment")!.dispatchEvent("tap");
  await simulate.sleep(0);
  expect(events).toEqual([{ value: 3 }]);
  w.setData({ disabled: true });
  w.querySelector(".mn-decrement")!.dispatchEvent("tap");
  await simulate.sleep(0);
  expect(events).toHaveLength(1);
});
it("select opens, guards disabled items and emits selection", async () => {
  const w = mount("select", {
    options: [
      { value: "a", label: "Alpha" },
      { value: "b", label: "Beta", disabled: true },
    ],
  });
  const events: unknown[] = [];
  w.addEventListener("change", (e) => events.push(e.detail));
  w.querySelector(".mn-select-trigger")!.dispatchEvent("tap");
  await simulate.sleep(0);
  const opts = w.querySelectorAll(".mn-option");
  opts[1]!.dispatchEvent("tap");
  await simulate.sleep(0);
  expect(events).toHaveLength(0);
  opts[0]!.dispatchEvent("tap");
  await simulate.sleep(0);
  expect(events).toEqual([{ value: "a" }]);
});
it("modal backdrop requests close", async () => {
  const w = mount("modal", { open: true, title: "Editor" });
  const events: unknown[] = [];
  w.addEventListener("openchange", (e) => events.push(e.detail));
  w.querySelector(".mn-backdrop")!.dispatchEvent("tap");
  await simulate.sleep(0);
  expect(events).toEqual([{ open: false }]);
});
it.each(names)("%s renders in the WeChat host", (name) => {
  const w = mount(name);
  expect(w.dom).toBeTruthy();
  w.detach();
});
it("table sort and selection are controlled across parent updates", async () => {
  const w = mount("table", {
    selectedRowKeys: [],
    columns: [{ key: "score", header: "Score", sortable: true }],
    data: [
      { id: "a", score: 10 },
      { id: "b", score: 2 },
    ],
    selectable: true,
  });
  const selected: unknown[] = [];
  w.addEventListener("selectionchange", (e) => selected.push(e.detail));
  w.querySelector(".mn-table-sort")!.dispatchEvent("tap");
  await simulate.sleep(0);
  expect(
    (w.data.rows as { key: string; selected: boolean }[]).map((r) => r.key),
  ).toEqual(["b", "a"]);
  w.querySelector(".mn-select-row")!.dispatchEvent("tap");
  await simulate.sleep(0);
  expect(selected[0]).toMatchObject({ selectedRowKeys: ["b"] });
  expect(w.data.selectedRowKeys).toEqual([]);
  w.setData({ selectedRowKeys: ["b"] });
  expect(
    (w.data.rows as { key: string; selected: boolean }[])[0].selected,
  ).toBe(true);
});
it("calendar rejects out of range days and navigates year boundary", async () => {
  const w = mount("monthCalendar", {
    defaultMonth: "2026-12",
    min: "2026-12-10",
    max: "2027-01-10",
  });
  const changes: unknown[] = [];
  w.addEventListener("change", (e) => changes.push(e.detail));
  const days = w.querySelectorAll(".mn-calendar-day");
  days[2]!.dispatchEvent("tap");
  await simulate.sleep(0);
  expect(changes).toHaveLength(0);
  w.querySelectorAll(".mn-close")[1]!.dispatchEvent("tap");
  await simulate.sleep(0);
  expect(w.data.active).toBe("2027-01");
});
it("JSON input only emits parsed data when valid", async () => {
  const w = mount("jsonField", { value: { ok: true } });
  const changes: unknown[] = [];
  w.addEventListener("change", (e) => changes.push(e.detail));
  w.querySelector(".mn-code")!.dispatchEvent("input", {
    detail: { value: "{" },
  });
  await simulate.sleep(0);
  expect(w.data.error).toContain("Invalid JSON:");
  expect(changes).toHaveLength(0);
  w.querySelector(".mn-code")!.dispatchEvent("input", {
    detail: { value: '{"count":2}' },
  });
  await simulate.sleep(0);
  expect(changes).toEqual([{ value: { count: 2 } }]);
});
it("input clear/password actions preserve controlled rejection", async () => {
  const w = mount("input", {
    value: "secret",
    type: "password",
    clearable: true,
  });
  const events: unknown[] = [];
  w.addEventListener("change", (e) => events.push(e.detail));
  w.querySelector(".mn-password-toggle")!.dispatchEvent("tap");
  await simulate.sleep(0);
  expect(w.data.passwordVisible).toBe(true);
  w.querySelector(".mn-input-clear")!.dispatchEvent("tap");
  await simulate.sleep(0);
  expect(events).toEqual([{ value: "" }]);
  expect(w.data.value).toBe("secret");
});
it("theme provider updates palette mode and design classes", () => {
  const w = mount("configProvider", {
    mode: "dark",
    palette: "tech",
    design: { preset: "touch" },
  });
  expect(w.data.themeClass).toContain("mn-palette-tech-dark");
  expect(w.data.themeClass).toContain("mn-density-comfortable");
  w.setData({
    mode: "light",
    palette: "graphite",
    design: { density: "compact", radius: "none" },
  });
  expect(w.data.themeClass).toContain("mn-palette-graphite");
  expect(w.data.themeClass).toContain("mn-radius-none");
  expect(w.data.themeClass).not.toContain("dark");
});
it("rating uses fixed five stars and half-step scores", async () => {
  const w = mount("rating", { value: 7, max: 10, showValue: true });
  expect(w.querySelectorAll(".mn-star")).toHaveLength(5);
  const events: unknown[] = [];
  w.addEventListener("change", (e) => events.push(e.detail));
  w.querySelectorAll(".mn-rating-target-left")[4]!.dispatchEvent("tap");
  await simulate.sleep(0);
  expect(events).toEqual([{ value: 9 }]);
});

it("number input holds draft until blur and commits null when cleared", async () => {
  const w = mount("numberInput", { value: 1.2, step: 0.01 });
  const events: unknown[] = [];
  w.addEventListener("change", (e) => events.push(e.detail));
  w.querySelector(".mn-input")!.dispatchEvent("input", {
    detail: { value: "2.345" },
  });
  await simulate.sleep(0);
  expect(events).toHaveLength(0);
  w.querySelector(".mn-input")!.dispatchEvent("blur");
  await simulate.sleep(0);
  expect(events).toEqual([{ value: 2.35 }]);
  expect(w.data.draft).toBe("1.20");
  w.querySelector(".mn-input")!.dispatchEvent("input", {
    detail: { value: "" },
  });
  w.querySelector(".mn-input")!.dispatchEvent("blur");
  await simulate.sleep(0);
  expect(events[1]).toEqual({ value: null });
});
it("table filters, pages and select-all skip disabled rows", async () => {
  const w = mount("table", {
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
  });
  const selections: unknown[] = [];
  w.addEventListener("selectionchange", (e) => selections.push(e.detail));
  w.querySelector(".mn-select-all")!.dispatchEvent("tap");
  await simulate.sleep(0);
  expect(selections[0]).toMatchObject({ selectedRowKeys: ["1"] });
  w.querySelector(".mn-next-page")!.dispatchEvent("tap");
  await simulate.sleep(0);
  expect((w.data.rows as { key: string }[])[0]?.key).toBe("2");
  w.querySelectorAll(".mn-filter-option")[0]!.dispatchEvent("tap");
  await simulate.sleep(0);
  expect(w.data.activePage).toBe(1);
  expect(w.data.pageCount).toBe(2);
});
it.each([
  "gridItem",
  "contextMenu",
  "paletteToggle",
  "statCard",
  "radioGroup",
  "ratingScale",
  "skeletonText",
  "confirmDialog",
  "confirmProvider",
  "toastProvider",
])("%s has a working native definition", (name) => {
  const w = mount(name);
  expect(w.dom).toBeTruthy();
  w.detach();
});
it("native context menu longpress guards disabled actions and dismisses", async () => {
  const w = mount("contextMenu", {
    items: [
      { value: "edit", label: "Edit" },
      { value: "delete", label: "Delete", disabled: true },
    ],
  });
  const events: unknown[] = [];
  w.addEventListener("select", (e) => events.push(e.detail));
  w.querySelector(".mn-context-area")!.dispatchEvent("longpress");
  await simulate.sleep(0);
  expect(w.data.effectiveOpen).toBe(true);
  w.querySelectorAll(".mn-option")[1]!.dispatchEvent("tap");
  await simulate.sleep(0);
  expect(events).toHaveLength(0);
  w.querySelectorAll(".mn-option")[0]!.dispatchEvent("tap");
  await simulate.sleep(0);
  expect(events).toEqual([
    { value: "edit", item: { value: "edit", label: "Edit" } },
  ]);
  expect(w.data.effectiveOpen).toBe(false);
});
it("native radio group selection is controlled and guarded", async () => {
  const w = mount("radioGroup", {
    value: "a",
    options: [
      { value: "a", label: "Alpha" },
      { value: "b", label: "Beta" },
    ],
  });
  const events: unknown[] = [];
  w.addEventListener("change", (e) => events.push(e.detail));
  w.querySelectorAll(".mn-choice")[1]!.dispatchEvent("tap");
  await simulate.sleep(0);
  expect(events).toEqual([{ value: "b" }]);
  expect(w.data.value).toBe("a");
  w.setData({ readOnly: true });
  w.querySelectorAll(".mn-choice")[1]!.dispatchEvent("tap");
  await simulate.sleep(0);
  expect(events).toHaveLength(1);
});
it("native provider hosts resolve confirm promises and toast actions", async () => {
  const confirmHost = mount("confirmProvider");
  const promise = controls.requestConfirm({ title: "Delete?" });
  await simulate.sleep(0);
  expect(confirmHost.data.current.title).toBe("Delete?");
  confirmHost.querySelector(".mn-confirm-accept")!.dispatchEvent("tap");
  await expect(promise).resolves.toBe(true);
  const toastHost = mount("toastProvider");
  let calls = 0;
  controls.toastApi({
    id: "a",
    title: "Saved",
    duration: 0,
    action: { label: "Undo", onClick: () => calls++ },
  });
  await simulate.sleep(0);
  expect(toastHost.data.entries).toHaveLength(1);
  toastHost.querySelector(".mn-toast-action")!.dispatchEvent("tap");
  await simulate.sleep(0);
  expect(calls).toBe(1);
  expect(toastHost.data.entries).toHaveLength(0);
  confirmHost.detach();
  toastHost.detach();
});
it("Monaco browser editor remains explicitly unsupported in the native host", () =>
  expect(
    (controls as Record<string, unknown>).monacoCodeEditor,
  ).toBeUndefined());
it("native checkbox and switch retain local state while controlled owners can reject", async () => {
  const checkbox = mount("checkbox", { defaultChecked: true });
  checkbox.querySelector(".mn-choice")!.dispatchEvent("tap");
  await simulate.sleep(0);
  expect(checkbox.data.effectiveChecked).toBe(false);
  const checked = mount("checkbox", { checked: false });
  checked.querySelector(".mn-choice")!.dispatchEvent("tap");
  await simulate.sleep(0);
  expect(checked.data.effectiveChecked).toBe(false);
  const toggle = mount("toggle", { defaultChecked: true });
  expect(toggle.data.effectiveChecked).toBe(true);
  toggle
    .querySelector(".mn-switch")!
    .dispatchEvent("change", { detail: { value: false } });
  await simulate.sleep(0);
  expect(toggle.data.effectiveChecked).toBe(false);
});

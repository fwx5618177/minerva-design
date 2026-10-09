import simulate from "miniprogram-simulate";
import { afterEach, expect, it, vi } from "vitest";
import {
  monthCalendar,
  pagination,
  menu,
  navTree,
  steps,
  cascader,
} from "./index";
const mounted: simulate.RootComponent<
  WechatMiniprogram.IAnyObject,
  WechatMiniprogram.IAnyObject,
  WechatMiniprogram.IAnyObject
>[] = [];
afterEach(() => mounted.splice(0).forEach((w) => w.detach()));
function mount(control: typeof pagination, props: Record<string, unknown>) {
  const id = simulate.load({
    tagName: "navigation-case",
    template: control.template,
    ...control.definition,
  });
  const w = simulate.render(id, props);
  w.attach(document.createElement("div"));
  mounted.push(w);
  return w;
}
const tick = () => simulate.sleep(0);
const day = (w: ReturnType<typeof mount>, date: string) =>
  w.querySelectorAll(".mn-calendar-day")[
    w.data.days.findIndex((item: { date: string }) => item.date === date)
  ];
const menuItem = (w: ReturnType<typeof mount>, key: string) =>
  w.querySelectorAll(".mn-menu-item")[
    w.data.menuRows
      .filter(
        (item: { type: string }) =>
          item.type !== "group" && item.type !== "separator",
      )
      .findIndex((item: { key: string }) => item.key === key)
  ];
it("calendar uses six Monday-first weeks, disabled dates, display ranges and selected event actions", async () => {
  const w = mount(monthCalendar, {
    defaultMonth: "2026-10",
    defaultValue: "2026-10-09",
    disabledDates: ["2026-10-10"],
    rangeStart: "2026-10-12",
    rangeEnd: "2026-10-08",
    events: [{ id: "demo", date: "2026-10-09", title: "Demo" }],
  });
  expect(w.data.days).toHaveLength(42);
  expect(w.data.days[0].date).toBe("2026-09-28");
  expect(
    w.data.days.find((d: { date: string }) => d.date === "2026-10-09"),
  ).toMatchObject({ inRange: true, selected: true, count: 1 });
  const changes: unknown[] = [],
    events: unknown[] = [];
  w.addEventListener("change", (e) => changes.push(e.detail));
  w.addEventListener("eventclick", (e) => events.push(e.detail));
  day(w, "2026-10-10").dispatchEvent("tap");
  await tick();
  expect(changes).toEqual([]);
  w.querySelector(".mn-calendar-event")!.dispatchEvent("tap");
  await tick();
  expect(events).toEqual([
    { event: { id: "demo", date: "2026-10-09", title: "Demo" } },
  ]);
  day(w, "2026-10-11").dispatchEvent("tap");
  await tick();
  expect(w.data.selected).toBe("2026-10-11");
});
it("calendar respects rejected controlled month/value and configurable week start/date callbacks", async () => {
  const w = mount(monthCalendar, {
    month: "2026-12",
    value: "2026-12-10",
    weekStartsOn: 0,
  });
  const changes: unknown[] = [];
  w.addEventListener("monthchange", (e) => changes.push(e.detail));
  w.querySelectorAll(".mn-close")[1].dispatchEvent("tap");
  await tick();
  expect(w.data.active).toBe("2026-12");
  expect(changes).toEqual([{ month: "2027-01" }]);
  w.instance.configure({
    disabledDate: (day: string) => day.endsWith("11"),
    getDayLabel: (day: string) => `Day ${day}`,
  });
  expect(w.data.days[0].date).toBe("2026-11-29");
  expect(
    w.data.days.find((d: { date: string }) => d.date === "2026-12-11"),
  ).toMatchObject({ disabled: true, ariaLabel: "Day 2026-12-11" });
  day(w, "2026-12-12").dispatchEvent("tap");
  await tick();
  expect(w.data.selected).toBe("2026-12-10");
});
it("pagination shares compact page windows, quick jump, size resets, visible range and owner rejection", async () => {
  const w = mount(pagination, {
    defaultCurrent: 5,
    total: 98,
    defaultPageSize: 10,
    siblingCount: 1,
    boundaryCount: 1,
    showQuickJumper: true,
    showSizeChanger: true,
    showTotal: true,
    pageSizeOptions: [10, 20],
  });
  expect(w.data.range).toEqual([41, 50]);
  expect(
    w.data.pageItems.some((i: { kind: string }) => i.kind === "ellipsis"),
  ).toBe(true);
  w.querySelector(".mn-page-jump")!.dispatchEvent("input", {
    detail: { value: "9" },
  });
  w.querySelector(".mn-page-jump")!.dispatchEvent("confirm");
  await tick();
  expect(w.data.page).toBe(9);
  w.querySelector(".mn-page-size")!.dispatchEvent("change", {
    detail: { value: "1" },
  });
  await tick();
  expect(w.data.page).toBe(1);
  expect(w.data.effectivePageSize).toBe(20);
  expect(w.data.range).toEqual([1, 20]);
  w.setData({ current: 3, pageSize: 10 });
  await tick();
  w.querySelectorAll(".mn-page-item")[
    w.data.pageItems.findIndex((item: { kind: string }) => item.kind === "next")
  ].dispatchEvent("tap");
  await tick();
  expect(w.data.page).toBe(3);
  w.setData({ disabled: true });
  const emitted: unknown[] = [];
  w.addEventListener("change", (e) => emitted.push(e.detail));
  w.querySelector(".mn-page-jump")!.dispatchEvent("confirm", {
    detail: { value: "4" },
  });
  await tick();
  expect(emitted).toEqual([]);
});
it("menu expands nested actions, renders groups/separators and preserves checkbox/radio ownership", async () => {
  const w = mount(menu, {
    items: [
      {
        key: "file",
        label: "File",
        children: [{ key: "save", label: "Save" }],
      },
      { type: "separator", key: "sep" },
      { type: "checkbox", key: "locked", label: "Locked", checked: false },
      { type: "checkbox", key: "local", label: "Local", defaultChecked: true },
      {
        type: "radio-group",
        key: "color",
        label: "Color",
        defaultValue: "red",
        items: [
          { value: "red", label: "Red" },
          { value: "blue", label: "Blue" },
        ],
      },
    ],
  });
  expect(w.querySelectorAll(".mn-menu-separator")).toHaveLength(1);
  menuItem(w, "file").dispatchEvent("tap");
  await tick();
  expect(w.dom!.textContent).toContain("Save");
  const selected: unknown[] = [];
  w.addEventListener("select", (e) => selected.push(e.detail));
  menuItem(w, "save").dispatchEvent("tap");
  await tick();
  expect(selected).toEqual([
    { value: "save", item: { key: "save", label: "Save" } },
  ]);
  menuItem(w, "locked").dispatchEvent("tap");
  menuItem(w, "local").dispatchEvent("tap");
  menuItem(w, "color:blue").dispatchEvent("tap");
  await tick();
  expect(
    w.data.menuRows.find((r: { key: string }) => r.key === "locked").checked,
  ).toBe(false);
  expect(
    w.data.menuRows.find((r: { key: string }) => r.key === "local").checked,
  ).toBe(false);
  expect(
    w.data.menuRows.find((r: { key: string }) => r.key === "color:blue")
      .checked,
  ).toBe(true);
});
it("NavTree handles React sections/id schema, active ancestors, defaults, filter and controlled expansion", async () => {
  const w = mount(navTree, {
    sections: [
      {
        id: "main",
        title: "Main",
        items: [
          {
            id: "a",
            label: "Group",
            children: [
              { id: "b", label: "Beta", href: "/pages/b" },
              { id: "c", label: "Gamma" },
            ],
          },
        ],
      },
    ],
    activeId: "b",
    query: "beta",
  });
  expect(w.data.rows.map((r: { id: string }) => r.id)).toEqual(["a", "b"]);
  expect(w.data.rows[0]).toMatchObject({
    expanded: true,
    ancestorActive: true,
  });
  w.setData({ query: "", expandedIds: [] });
  await tick();
  expect(w.data.rows).toHaveLength(1);
  const changes: unknown[] = [];
  w.addEventListener("expandchange", (e) => changes.push(e.detail));
  w.querySelector(".mn-tree-expand")!.dispatchEvent("tap");
  await tick();
  expect(w.data.rows).toHaveLength(1);
  expect(changes).toEqual([{ expandedKeys: ["a"], expandedIds: ["a"] }]);
  w.setData({ expandedIds: ["a"] });
  await tick();
  expect(w.data.rows).toHaveLength(3);
});
it("Steps uses value selection, item disabled guards, icons and error states", async () => {
  const w = mount(steps, {
    defaultValue: "a",
    readOnly: false,
    items: [
      { value: "a", label: "First", icon: "A" },
      { value: "b", label: "Second", status: "error" },
      { value: "c", label: "Blocked", disabled: true },
    ],
  });
  expect(w.dom!.textContent).toContain("First");
  expect(w.querySelector(".mn-step-error")).not.toBeNull();
  const changes: unknown[] = [];
  w.addEventListener("change", (e) => changes.push(e.detail));
  w.querySelectorAll(".mn-step")[2].dispatchEvent("tap");
  w.querySelectorAll(".mn-step")[1].dispatchEvent("tap");
  await tick();
  expect(changes).toEqual([{ value: "b", current: 1 }]);
  expect(w.data.selectedStep).toBe("b");
});
it("Cascader configure supports custom filtering and asynchronous lazy loading without premature selection", async () => {
  const w = mount(cascader, {
    options: [{ value: "a", label: "Async" }],
    value: [],
    showSearch: true,
  });
  const loadData = vi.fn(async () => {});
  w.instance.configure({
    loadData,
    filter: (query: string, path: { label: string }[]) =>
      path.at(-1)?.label === query,
  });
  const changes: unknown[] = [];
  w.addEventListener("change", (e) => changes.push(e.detail));
  w.querySelector(".mn-option")!.dispatchEvent("tap");
  await tick();
  expect(loadData).toHaveBeenCalledWith([{ value: "a", label: "Async" }]);
  expect(changes).toEqual([]);
  w.setData({
    options: [
      {
        value: "a",
        label: "Async",
        children: [{ value: "b", label: "Leaf", isLeaf: true }],
      },
    ],
  });
  await tick();
  expect(w.querySelectorAll(".mn-cascader-level")).toHaveLength(2);
  w.querySelector(".mn-input")!.dispatchEvent("input", {
    detail: { value: "Leaf" },
  });
  await tick();
  expect(w.querySelectorAll(".mn-search-result")).toHaveLength(1);
});
it("Cascader coalesces pending loads and clears loading on rejection so retry is possible", async () => {
  const w = mount(cascader, { options: [{ value: "a", label: "Async" }] });
  let reject!: (reason: Error) => void;
  const load = vi.fn(
    () =>
      new Promise<void>((_resolve, fail) => {
        reject = fail;
      }),
  );
  w.instance.configure({ loadData: load });
  const errors: unknown[] = [];
  w.addEventListener("loaderror", (e) => errors.push(e.detail));
  w.querySelector(".mn-option")!.dispatchEvent("tap");
  await tick();
  expect(w.data.levels[0][0].loading).toBe(true);
  w.querySelector(".mn-option")!.dispatchEvent("tap");
  await tick();
  expect(load).toHaveBeenCalledTimes(1);
  reject(new Error("Offline"));
  await tick();
  expect(w.data.levels[0][0].loading).toBe(false);
  expect(errors).toEqual([expect.objectContaining({ message: "Offline" })]);
});

it("menu data supports standalone headings and radio shortcuts without duplicate changes", async () => {
  const w = mount(menu, {
    items: [
      { type: "group", key: "heading", label: "View", items: [] },
      {
        type: "radio-group",
        key: "mode",
        defaultValue: "list",
        items: [
          { value: "list", label: "List", shortcut: "Ctrl+L" },
          { value: "grid", label: "Grid", shortcut: "Ctrl+G" },
        ],
      },
      {
        type: "radio-group",
        key: "blocked",
        disabled: true,
        items: [{ value: "locked", label: "Locked" }],
      },
    ],
  });
  expect(w.querySelector(".mn-menu-group")!.dom!.textContent).toBe("View");
  expect(menuItem(w, "mode:list").dom!.textContent).toContain("Ctrl+L");
  const changes: unknown[] = [];
  w.addEventListener("valuechange", (event) => changes.push(event.detail));
  menuItem(w, "mode:list").dispatchEvent("tap");
  menuItem(w, "blocked:locked").dispatchEvent("tap");
  await tick();
  expect(changes).toEqual([]);
  menuItem(w, "mode:grid").dispatchEvent("tap");
  await tick();
  menuItem(w, "mode:grid").dispatchEvent("tap");
  await tick();
  expect(changes).toHaveLength(1);
  expect(changes[0]).toMatchObject({ key: "mode", value: "grid" });
});

import { mount } from "@vue/test-utils";
import { h } from "vue";
import { expect, it, vi } from "vitest";
import MonthCalendar from "./MonthCalendar.vue";
import Pagination from "./Pagination.vue";
import Steps from "./Steps.vue";
import DataTable from "./DataTable.vue";
import ConfigProvider from "./ConfigProvider.vue";

it("calendar uses 42 Monday-first local days, events and display-only ranges", async () => {
  const event = { id: "launch", date: "2026-10-09", title: "Launch" };
  const w = mount(MonthCalendar, {
    props: {
      defaultMonth: new Date(2026, 9, 1),
      defaultValue: "2026-10-09",
      events: [event],
      rangeStart: "2026-10-11",
      rangeEnd: "2026-10-08",
    },
  });
  expect(w.findAll("[data-day]")).toHaveLength(42);
  expect(w.findAll("[data-day]")[0].attributes("data-day")).toBe("2026-09-28");
  expect(w.find('[data-day="2026-10-09"]').attributes("data-in-range")).toBe(
    "true",
  );
  await w.find('[data-event-id="launch"]').trigger("click");
  expect(w.emitted("eventClick")).toEqual([[event]]);
  await w.find('[data-day="2026-10-10"]').trigger("click");
  expect(w.emitted("change")).toEqual([["2026-10-10"]]);
  expect(w.find('[data-day="2026-10-10"]').attributes("aria-selected")).toBe(
    "true",
  );
});
it("calendar controlled month/value reject requests and disabled blocks navigation and events", async () => {
  const w = mount(MonthCalendar, {
    props: {
      month: new Date(2026, 9, 15),
      value: "2026-10-09",
      events: [{ id: "x", date: "2026-10-09", title: "Test" }],
    },
  });
  await w.find('[aria-label="Next month"]').trigger("click");
  const date = w.emitted("monthChange")?.[0]?.[0] as Date;
  expect(date.getMonth()).toBe(10);
  expect(date.getDate()).toBe(1);
  expect(date.getHours()).toBe(0);
  expect(w.find("[data-month]").attributes("data-month")).toBe("2026-10");
  await w.setProps({ disabled: true });
  await w.find('[aria-label="Next month"]').trigger("click");
  await w.find('[data-event-id="x"]').trigger("click");
  expect(w.emitted("monthChange")).toHaveLength(1);
  expect(w.emitted("eventClick")).toBeUndefined();
});
it("calendar applies locale, custom weekdays, disabled date and week-start extension", async () => {
  const w = mount(ConfigProvider, {
    props: { locale: "fr" },
    slots: {
      default: () =>
        h(MonthCalendar, {
          defaultMonth: new Date(2026, 9, 1),
          weekStartsOn: 0,
          disabledDates: ["2026-10-09"],
        }),
    },
  });
  expect(w.text()).toContain("octobre");
  expect(w.findAll("[data-day]")[0].attributes("data-day")).toBe("2026-09-27");
  await w.find('[data-day="2026-10-09"]').trigger("click");
  expect(w.getComponent(MonthCalendar).emitted("change")).toBeUndefined();
});
it("calendar keyboard moves through days and commits with Enter", async () => {
  const w = mount(MonthCalendar, {
    props: { defaultMonth: new Date(2026, 9, 1), defaultValue: "2026-10-09" },
  });
  await w
    .find('[data-day="2026-10-09"]')
    .trigger("keydown", { key: "ArrowRight" });
  expect(w.find('[data-day="2026-10-10"]').attributes("tabindex")).toBe("0");
  await w.find('[data-day="2026-10-10"]').trigger("keydown", { key: "Enter" });
  expect(w.emitted("change")).toEqual([["2026-10-10"]]);
});
it("pagination compact range and total slot derive from current page", async () => {
  const w = mount(Pagination, {
    props: {
      total: 95,
      defaultCurrent: 5,
      siblingCount: 1,
      boundaryCount: 1,
      showTotal: true,
    },
    slots: {
      total: ({ total, range }) =>
        h("span", `${range[0]}-${range[1]} of ${total}`),
    },
  });
  expect(w.text()).toContain("41-50 of 95");
  expect(
    w.findAll("[data-page]").map((b) => b.attributes("data-page")),
  ).toEqual(["1", "4", "5", "6", "10"]);
  await w.find('[data-page="6"]').trigger("click");
  expect(w.emitted("change")).toEqual([[6, 10]]);
  expect(w.text()).toContain("51-60 of 95");
});
it("pagination quick jump clamps, size changes reset page and controlled owners can reject", async () => {
  const w = mount(Pagination, {
    props: {
      total: 100,
      current: 4,
      pageSize: 10,
      showQuickJumper: true,
      showSizeChanger: true,
      pageSizeOptions: [10, 25],
    },
  });
  const input = w.find("[data-jumper]");
  await input.trigger("input", { detail: { value: "99" } });
  await input.trigger("confirm");
  expect(w.emitted("change")).toEqual([[10, 10]]);
  const picker = w.find("[data-page-size]");
  await picker.trigger("change", { detail: { value: 1 } });
  expect(w.emitted("change")?.at(-1)).toEqual([1, 25]);
  expect(w.find('[data-page="4"]').attributes("aria-current")).toBe("page");
});
it("pagination simple mode, hide edges, localization and disabled guards", async () => {
  const w = mount(ConfigProvider, {
    props: { locale: "zh" },
    slots: {
      default: () => h(Pagination, { total: 30, simple: true, disabled: true }),
    },
  });
  expect(w.find('[aria-label="下一页"]').exists()).toBe(true);
  await w
    .find("[data-simple-page]")
    .trigger("input", { detail: { value: "2" } });
  await w.find("[data-simple-page]").trigger("confirm");
  expect(w.getComponent(Pagination).emitted("change")).toBeUndefined();
});
it("Steps uses value identities and respects readOnly/disabled rather than emitting numeric indexes", async () => {
  const onChange = vi.fn();
  const items = [
    { value: "draft", label: "Draft" },
    { value: "review", label: "Review" },
    { value: "publish", label: "Publish", disabled: true },
  ];
  const w = mount(Steps, {
    props: { items, defaultValue: "review", onChange },
  });
  await w.find('[data-step="draft"] button').trigger("click");
  expect(onChange).toHaveBeenCalledWith("draft");
  await w.find('[data-step="publish"] button').trigger("click");
  expect(onChange).toHaveBeenCalledTimes(1);
  expect(w.find('[data-step="draft"] button').attributes("aria-current")).toBe(
    "step",
  );
  await w.setProps({ readOnly: true });
  expect(w.findAll("button")).toHaveLength(0);
});
it("Steps without a listener is a read-only progress list and native status/icon slots work", () => {
  const w = mount(Steps, {
    props: {
      items: [{ value: "error", label: "Upload", status: "error" }],
      value: "error",
    },
    slots: { icon: () => h("span", "!") },
  });
  expect(w.findAll("button")).toHaveLength(0);
  expect(w.find('[data-step="error"]').attributes("data-status")).toBe("error");
  expect(w.text()).toContain("!");
});
it("DataTable loading wins over errors and forwards table props, slots and full event payloads", async () => {
  const rows = [
    { id: "a", name: "Beta" },
    { id: "b", name: "Alpha" },
  ];
  const w = mount(DataTable, {
    props: {
      columns: [{ key: "name", header: "Name", sortable: true }],
      data: rows,
      error: "Offline",
      loading: true,
      rowSelection: { selectedRowKeys: ["b"] },
      sortState: { key: "name", order: "ascend" },
      variant: "bordered",
    },
    slots: { cell: ({ row, column }) => h("span", `Value ${row[column.key]}`) },
  });
  expect(w.find('[role="alert"]').exists()).toBe(false);
  expect(w.attributes("aria-busy")).toBe("true");
  await w.setProps({ loading: false, error: undefined });
  expect(w.text()).toContain("Value Alpha");
  const table = w.findComponent({ name: "Table" });
  expect(table.props("rowSelection")).toEqual({ selectedRowKeys: ["b"] });
  table.vm.$emit("selectionChange", ["a"], [rows[0]]);
  expect(w.emitted("selectionChange")).toEqual([[["a"], [rows[0]]]]);
  table.vm.$emit("filterChange", { name: ["Alpha"] });
  expect(w.emitted("filterChange")).toEqual([[{ name: ["Alpha"] }]]);
});

it("Menu keeps checkbox/radio owners, nests groups and selects original actions", async () => {
  const { default: Menu } = await import("./Menu.vue");
  const checked = vi.fn(),
    selected = vi.fn(),
    radio = vi.fn();
  const action = { key: "export", label: "Export" };
  const w = mount(Menu, {
    props: {
      defaultOpen: true,
      items: [
        {
          type: "group",
          key: "g",
          label: "Tools",
          items: [
            {
              type: "checkbox",
              key: "check",
              label: "Show grid",
              checked: false,
              onCheckedChange: checked,
            },
            { type: "separator", key: "sep" },
            { key: "more", label: "More", children: [action] },
            {
              type: "radio-group",
              key: "sort",
              label: "Sort",
              defaultValue: "a",
              onValueChange: radio,
              items: [
                { value: "a", label: "Name" },
                { value: "b", label: "Date" },
              ],
            },
          ],
        },
      ],
      onSelect: selected,
    },
  });
  expect(w.find('[role="separator"]').exists()).toBe(true);
  await w.find('[role="menuitemcheckbox"]').trigger("click");
  expect(checked).toHaveBeenCalledWith(true);
  expect(w.find('[role="menuitemcheckbox"]').attributes("aria-checked")).toBe(
    "false",
  );
  await w.find('[data-menu-key="sort:b"]').trigger("click");
  expect(radio).toHaveBeenCalledWith("b");
  expect(w.find('[data-menu-key="sort:b"]').attributes("aria-checked")).toBe(
    "true",
  );
  await w.find('[data-menu-key="more"]').trigger("click");
  await w.find('[data-menu-key="export"]').trigger("click");
  expect(selected).toHaveBeenCalledWith(action);
});
it("Menu trigger controlled open rejects requests and disabled actions cannot select", async () => {
  const { default: Menu } = await import("./Menu.vue");
  const w = mount(Menu, {
    props: {
      open: false,
      items: [{ key: "x", label: "Blocked", disabled: true }],
    },
    slots: { trigger: "Actions" },
  });
  await w.find("[data-menu-trigger]").trigger("click");
  expect(w.emitted("openChange")).toEqual([[true]]);
  expect(w.find('[role="menu"]').exists()).toBe(false);
  await w.setProps({ open: true });
  await w.find('[data-menu-key="x"]').trigger("click");
  expect(w.emitted("select")).toBeUndefined();
});
it("NavTree uses sections/ids, expands active ancestors and user collapse wins", async () => {
  const { default: NavTree } = await import("./NavTree.vue");
  const leaf = { id: "leaf", label: "Leaf", href: "/leaf" };
  const w = mount(NavTree, {
    props: {
      activeId: "leaf",
      sections: [
        {
          id: "main",
          title: "Main",
          items: [{ id: "branch", label: "Branch", children: [leaf] }],
        },
      ],
    },
  });
  expect(w.find('[data-tree-id="leaf"]').exists()).toBe(true);
  await w.find('[data-tree-id="branch"]').trigger("click");
  expect(w.find('[data-tree-id="leaf"]').exists()).toBe(false);
  expect(w.emitted("expandedChange")).toEqual([[[]]]);
  await w.find('[data-tree-id="branch"]').trigger("click");
  await w.find('[data-tree-id="leaf"]').trigger("click");
  expect(w.emitted("itemSelect")?.at(-1)).toEqual([leaf]);
});
it("NavTree controlled expansion, filtering and scoped content expose real state", async () => {
  const { default: NavTree } = await import("./NavTree.vue");
  const items = [
    {
      id: "group",
      label: "Group",
      children: [
        { id: "apple", label: "Apple" },
        { id: "pear", label: "Pear" },
      ],
    },
  ];
  const w = mount(NavTree, {
    props: { sections: [{ id: "s", items }], expandedIds: [] },
    slots: {
      item: ({ item, state }) => h("span", `${item.label}:${state.depth}`),
    },
  });
  await w.find('[data-tree-id="group"]').trigger("click");
  expect(w.find('[data-tree-id="apple"]').exists()).toBe(false);
  await w.setProps({ filter: "Pear" });
  expect(w.find('[data-tree-id="pear"]').text()).toContain("Pear:1");
  expect(w.find('[data-tree-id="apple"]').exists()).toBe(false);
  await w.setProps({ collapsed: true });
  expect(w.find('[data-tree-id="pear"]').exists()).toBe(false);
});

import { describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { defineComponent, h, ref } from "vue";
import {
  Table,
  TableRoot,
  type TableColumn,
  type TableRowKey,
  type TableSortState,
} from ".";

interface Person {
  id: number;
  name: string;
  age: number;
}

const people: Person[] = [
  { id: 1, name: "Charlie", age: 30 },
  { id: 2, name: "alice", age: 25 },
  { id: 3, name: "Bob", age: 35 },
];

const columns: TableColumn<Person>[] = [
  { key: "name", header: "Name", sortable: true },
  { key: "age", header: "Age", sortable: (a, b) => a.age - b.age },
  { key: "id", header: "ID" },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AnyTable = Table as any;
const rowKey = (r: Person) => r.id;

/** Text of a column of every body row */
const names = (column = 0) =>
  within(screen.getAllByRole("rowgroup")[1])
    .getAllByRole("row")
    .map((row) => within(row).getAllByRole("cell")[column].textContent);

const header = (name: string) => screen.getByRole("columnheader", { name });

describe("Table sorting", () => {
  it("renders sort buttons only in sortable headers, with aria-sort", () => {
    render(AnyTable, { props: { columns, data: people, rowKey } });
    const button = within(header("Name")).getByRole("button", { name: "Name" });
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveAttribute("data-part", "sort-button");
    expect(header("Name")).toHaveAttribute("aria-sort", "none");
    expect(header("Age")).toHaveAttribute("aria-sort", "none");
    expect(header("ID")).not.toHaveAttribute("aria-sort");
    expect(header("Name")).toHaveAttribute("data-sort", "none");
    expect(header("ID")).not.toHaveAttribute("data-sort");
    expect(within(header("ID")).queryByRole("button")).toBeNull();
    expect(header("Name").querySelector("svg")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  it("cycles ascend, descend and none with the keyboard (uncontrolled)", async () => {
    const user = userEvent.setup();
    const { emitted } = render(AnyTable, {
      props: { columns, data: people, rowKey },
    });
    await user.tab();
    expect(screen.getByRole("button", { name: "Name" })).toHaveFocus();

    await user.keyboard("{Enter}");
    expect(header("Name")).toHaveAttribute("aria-sort", "ascending");
    expect(header("Name")).toHaveAttribute("data-sort", "ascending");
    expect(names()).toEqual(["alice", "Bob", "Charlie"]);

    await user.keyboard(" ");
    expect(header("Name")).toHaveAttribute("aria-sort", "descending");
    expect(header("Age")).toHaveAttribute("data-sort", "none");
    expect(names()).toEqual(["Charlie", "Bob", "alice"]);

    await user.keyboard("{Enter}");
    expect(header("Name")).toHaveAttribute("aria-sort", "none");
    expect(names()).toEqual(["Charlie", "alice", "Bob"]);

    const states = [
      [{ key: "name", order: "ascend" }],
      [{ key: "name", order: "descend" }],
      [{ key: "name", order: null }],
    ];
    expect(emitted().sortChange).toEqual(states);
    expect(emitted()["update:sortState"]).toEqual(states);
  });

  it("uses a compare function and switches columns", async () => {
    const user = userEvent.setup();
    render(AnyTable, {
      props: {
        columns,
        data: people,
        rowKey,
        defaultSortState: { key: "name", order: "descend" },
      },
    });
    expect(names()).toEqual(["Charlie", "Bob", "alice"]);
    await user.tab();
    await user.tab();
    expect(screen.getByRole("button", { name: "Age" })).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(header("Age")).toHaveAttribute("aria-sort", "ascending");
    expect(header("Name")).toHaveAttribute("aria-sort", "none");
    expect(names()).toEqual(["alice", "Charlie", "Bob"]);
  });

  it("sorts empty values last and numeric strings naturally", async () => {
    const user = userEvent.setup();
    render(AnyTable, {
      props: {
        columns: [{ key: "code", header: "Code", sortable: true }],
        data: [
          { code: "item10" },
          { code: undefined },
          { code: "item2" },
          { code: "item1" },
        ],
      },
    });
    await user.click(screen.getByRole("button", { name: "Code" }));
    expect(names()).toEqual(["item1", "item2", "item10", ""]);
  });

  it("follows the controlled sort state and reports changes", async () => {
    const user = userEvent.setup();
    const { emitted, rerender } = render(AnyTable, {
      props: {
        columns,
        data: people,
        rowKey,
        sortState: { key: "age", order: "descend" },
      },
    });
    expect(names()).toEqual(["Bob", "Charlie", "alice"]);
    await user.click(screen.getByRole("button", { name: "Age" }));
    expect(emitted().sortChange).toEqual([[{ key: "age", order: null }]]);
    // Not applied until the parent updates the prop
    expect(header("Age")).toHaveAttribute("aria-sort", "descending");
    await rerender({ columns, data: people, rowKey, sortState: null });
    expect(header("Age")).toHaveAttribute("aria-sort", "none");
    expect(names()).toEqual(["Charlie", "alice", "Bob"]);
  });

  it("works with v-model:sortState", async () => {
    const user = userEvent.setup();
    const sort = ref<TableSortState | null>(null);
    render(
      defineComponent(
        () => () =>
          h(AnyTable, {
            columns,
            data: people,
            rowKey,
            sortState: sort.value,
            "onUpdate:sortState": (v: TableSortState) => (sort.value = v),
          }),
      ),
    );
    await user.click(screen.getByRole("button", { name: "Age" }));
    expect(sort.value).toEqual({ key: "age", order: "ascend" });
    expect(header("Age")).toHaveAttribute("aria-sort", "ascending");
    expect(names()).toEqual(["alice", "Charlie", "Bob"]);
  });

  it("does not reorder rows with manualSort", async () => {
    const user = userEvent.setup();
    const { emitted } = render(AnyTable, {
      props: { columns, data: people, rowKey, manualSort: true },
    });
    await user.click(screen.getByRole("button", { name: "Name" }));
    expect(header("Name")).toHaveAttribute("aria-sort", "ascending");
    expect(names()).toEqual(["Charlie", "alice", "Bob"]);
    expect(emitted().sortChange).toEqual([[{ key: "name", order: "ascend" }]]);
  });

  it("ignores a sort state on an unknown column", () => {
    render(AnyTable, {
      props: {
        columns,
        data: people,
        rowKey,
        defaultSortState: { key: "nope", order: "ascend" },
      },
    });
    expect(names()).toEqual(["Charlie", "alice", "Bob"]);
  });
});

describe("Table row selection", () => {
  const rowLabel = (r: Person) => r.name;

  it("toggles a row checkbox with Space and reports keys and rows", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { emitted } = render(AnyTable, {
      props: {
        columns,
        data: people,
        rowKey,
        rowSelection: { onChange, getRowLabel: rowLabel },
      },
    });
    const selectAll = screen.getByRole("checkbox", {
      name: "Select all rows",
    }) as HTMLInputElement;
    expect(selectAll).toHaveAttribute("data-part", "checkbox");
    const alice = screen.getByRole("checkbox", { name: "Select row alice" });
    await user.tab();
    expect(selectAll).toHaveFocus();
    // select-all, Name, Age sort buttons, then the first row checkbox
    await user.tab();
    await user.tab();
    await user.tab();
    await user.tab();
    expect(alice).toHaveFocus();
    await user.keyboard(" ");
    expect(alice).toBeChecked();
    expect(alice.closest("tr")).toHaveAttribute("aria-selected", "true");
    expect(alice.closest("tr")).toHaveAttribute("data-selected", "");
    expect(onChange).toHaveBeenLastCalledWith([2], [people[1]]);
    expect(emitted().selectionChange).toEqual([[[2], [people[1]]]]);
    expect(emitted()["update:selectedRowKeys"]).toEqual([[[2]]]);
    expect(selectAll.indeterminate).toBe(true);

    await user.keyboard(" ");
    expect(alice).not.toBeChecked();
    expect(alice.closest("tr")).not.toHaveAttribute("aria-selected");
    expect(alice.closest("tr")).not.toHaveAttribute("data-selected");
    expect(onChange).toHaveBeenLastCalledWith([], []);
    expect(selectAll.indeterminate).toBe(false);
  });

  it("labels rows with the row key by default", () => {
    render(AnyTable, {
      props: { columns, data: people, rowKey, rowSelection: {} },
    });
    expect(screen.getByRole("checkbox", { name: "Select row 3" })).toBeTruthy();
  });

  it("selects and clears all rows, skipping disabled rows", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(AnyTable, {
      props: {
        columns,
        data: people,
        rowKey,
        rowSelection: {
          onChange,
          getRowLabel: rowLabel,
          getCheckboxProps: (r: Person) => ({ disabled: r.id === 3 }),
        },
      },
    });
    const selectAll = screen.getByRole("checkbox", {
      name: "Select all rows",
    }) as HTMLInputElement;
    expect(
      screen.getByRole("checkbox", { name: "Select row Bob" }),
    ).toBeDisabled();

    selectAll.focus();
    await user.keyboard(" ");
    expect(onChange).toHaveBeenLastCalledWith([1, 2], [people[0], people[1]]);
    expect(selectAll).toBeChecked();
    expect(selectAll.indeterminate).toBe(false);
    expect(
      screen.getByRole("checkbox", { name: "Select row Bob" }),
    ).not.toBeChecked();

    await user.keyboard(" ");
    expect(onChange).toHaveBeenLastCalledWith([], []);
    expect(selectAll).not.toBeChecked();
  });

  it("keeps disabled and off-page selections when toggling all", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(AnyTable, {
      props: {
        columns,
        data: people,
        rowKey,
        rowSelection: {
          defaultSelectedRowKeys: [3, 99],
          onChange,
          getCheckboxProps: (r: Person) => ({ disabled: r.id === 3 }),
        },
      },
    });
    const selectAll = screen.getByRole("checkbox", {
      name: "Select all rows",
    }) as HTMLInputElement;
    expect(selectAll.indeterminate).toBe(true);
    await user.click(selectAll);
    expect(onChange).toHaveBeenLastCalledWith(
      [3, 99, 1, 2],
      [people[0], people[1], people[2]],
    );
    await user.click(selectAll);
    expect(onChange).toHaveBeenLastCalledWith([3, 99], [people[2]]);
  });

  it("follows controlled rowSelection.selectedRowKeys", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { rerender } = render(AnyTable, {
      props: {
        columns,
        data: people,
        rowKey,
        rowSelection: { selectedRowKeys: [1], onChange, getRowLabel: rowLabel },
      },
    });
    const charlie = screen.getByRole("checkbox", {
      name: "Select row Charlie",
    });
    expect(charlie).toBeChecked();
    await user.click(charlie);
    expect(onChange).toHaveBeenCalledWith([], []);
    expect(charlie).toBeChecked();
    const selectAll = screen.getByRole("checkbox", { name: "Select all rows" });
    await user.click(selectAll);
    expect(onChange).toHaveBeenLastCalledWith([1, 2, 3], people);
    expect(selectAll).not.toBeChecked();
    await rerender({
      columns,
      data: people,
      rowKey,
      rowSelection: { selectedRowKeys: [], onChange, getRowLabel: rowLabel },
    });
    expect(charlie).not.toBeChecked();
  });

  it("works with v-model:selectedRowKeys (no rowSelection needed)", async () => {
    const user = userEvent.setup();
    const keys = ref<TableRowKey[]>([2]);
    render(
      defineComponent(
        () => () =>
          h(AnyTable, {
            columns,
            data: people,
            rowKey,
            selectedRowKeys: keys.value,
            "onUpdate:selectedRowKeys": (v: TableRowKey[]) => (keys.value = v),
          }),
      ),
    );
    expect(
      screen.getByRole("checkbox", { name: "Select row 2" }),
    ).toBeChecked();
    await user.click(screen.getByRole("checkbox", { name: "Select row 3" }));
    expect(keys.value).toEqual([2, 3]);
    expect(
      screen.getByRole("checkbox", { name: "Select row 3" }),
    ).toBeChecked();
  });

  it("enables the selection column from defaultSelectedRowKeys", () => {
    render(AnyTable, {
      props: { columns, data: people, rowKey, defaultSelectedRowKeys: [1] },
    });
    expect(
      screen.getByRole("checkbox", { name: "Select row 1" }),
    ).toBeChecked();
  });

  it("keeps the selection on the same rows after sorting", async () => {
    const user = userEvent.setup();
    render(AnyTable, {
      props: {
        columns,
        data: people,
        rowKey,
        rowSelection: { getRowLabel: rowLabel },
      },
    });
    await user.click(screen.getByRole("checkbox", { name: "Select row Bob" }));
    await user.click(screen.getByRole("button", { name: "Name" }));
    expect(names(1)).toEqual(["alice", "Bob", "Charlie"]);
    const selectedRow = screen
      .getAllByRole("row")
      .find((row) => row.getAttribute("aria-selected") === "true");
    expect(selectedRow).toHaveTextContent("Bob");
  });

  it("spans the selection column in the empty row and disables select-all", () => {
    render(AnyTable, { props: { columns, data: [], rowSelection: {} } });
    expect(screen.getByText("No data")).toHaveAttribute("colspan", "4");
    expect(
      screen.getByRole("checkbox", { name: "Select all rows" }),
    ).toBeDisabled();
  });

  it("disables select-all and keeps the selection column while loading", () => {
    const { container } = render(AnyTable, {
      props: { columns, data: people, rowSelection: {}, loading: true },
    });
    expect(
      screen.getByRole("checkbox", { name: "Select all rows" }),
    ).toBeDisabled();
    const skeleton = container.querySelector('tbody tr[aria-hidden="true"]')!;
    expect(skeleton.querySelectorAll("td")).toHaveLength(4);
  });

  it("translates the selection labels with the global language", async () => {
    const { setLanguage } = await import("../../config/i18n");
    setLanguage("fr");
    try {
      render(AnyTable, {
        props: { columns, data: people, rowKey, rowSelection: {} },
      });
      expect(
        screen.getByRole("checkbox", { name: "Sélectionner la ligne 1" }),
      ).toBeTruthy();
    } finally {
      setLanguage("en");
    }
  });
});

describe("Table scroll region", () => {
  it("is not a region or tab stop without scrolling", () => {
    render(AnyTable, {
      props: { columns, data: people },
      attrs: { "aria-label": "People" },
    });
    expect(screen.queryByRole("region")).toBeNull();
  });

  it("makes the scrolling wrapper a focusable region named after the table", async () => {
    const user = userEvent.setup();
    render(AnyTable, {
      props: {
        columns: [{ key: "name", header: "Name" }],
        data: people,
        scroll: { y: 200 },
      },
      attrs: { "aria-label": "People" },
    });
    const region = screen.getByRole("region", { name: "People" });
    expect(region).toHaveAttribute("tabindex", "0");
    expect(region).toContainElement(screen.getByRole("table"));
    await user.tab();
    expect(region).toHaveFocus();
  });

  it("uses a localized default name and aria-labelledby", () => {
    const { unmount } = render(TableRoot, {
      props: { scroll: { x: 900 } },
      slots: { default: () => h("tbody") },
    });
    expect(
      screen.getByRole("region", { name: "Scrollable table" }),
    ).toBeTruthy();
    unmount();
    render(
      defineComponent(() => () => [
        h("h2", { id: "people-title" }, "People list"),
        h(
          TableRoot,
          { scroll: { x: 900 }, "aria-labelledby": "people-title" },
          () => h("tbody"),
        ),
      ]),
    );
    const region = screen.getByRole("region", { name: "People list" });
    expect(region).not.toHaveAttribute("aria-label");
  });

  it("becomes a region when the content overflows the wrapper", async () => {
    const widths = vi
      .spyOn(HTMLElement.prototype, "scrollWidth", "get")
      .mockReturnValue(800);
    const client = vi
      .spyOn(HTMLElement.prototype, "clientWidth", "get")
      .mockReturnValue(300);
    try {
      render(AnyTable, {
        props: { columns, data: people },
        attrs: { "aria-label": "Wide" },
      });
      expect(
        await screen.findByRole("region", { name: "Wide" }),
      ).toHaveAttribute("tabindex", "0");
    } finally {
      widths.mockRestore();
      client.mockRestore();
    }
  });

  it("tracks overflow without ResizeObserver and disconnects on unmount", () => {
    const original = globalThis.ResizeObserver;
    const disconnect = vi.fn();
    globalThis.ResizeObserver = class {
      observe() {}
      disconnect = disconnect;
    } as unknown as typeof ResizeObserver;
    const { unmount } = render(TableRoot, {
      slots: { default: () => h("tbody") },
    });
    unmount();
    expect(disconnect).toHaveBeenCalled();
    // @ts-expect-error simulate an environment without ResizeObserver
    globalThis.ResizeObserver = undefined;
    try {
      render(TableRoot, { slots: { default: () => h("tbody") } });
      expect(screen.getByRole("table")).toBeTruthy();
    } finally {
      globalThis.ResizeObserver = original;
    }
  });
});

import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { defineComponent, h, ref } from "vue";
import {
  DataTable,
  Table,
  type TableColumn,
  type TableRowKey,
  type TableSortState,
} from ".";

interface Row {
  id: number;
  name: string;
}

const rows: Row[] = [
  { id: 1, name: "Alpha" },
  { id: 2, name: "Beta" },
];

const columns: TableColumn<Row>[] = [
  { key: "name", header: "Name" },
  {
    key: "actions",
    header: "Actions",
    render: (row) => [
      h("button", { type: "button" }, `Edit ${row.name}`),
      h("a", { href: `#${row.id}` }, `View ${row.name}`),
    ],
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AnyTable = Table as any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AnyDataTable = DataTable as any;

describe("Table keyboard", () => {
  it("is not a tab stop itself and reaches interactive cell content in row order", async () => {
    const user = userEvent.setup();
    render(AnyTable, {
      props: { columns, data: rows, rowKey: (r: Row) => r.id },
      attrs: { "aria-label": "Records" },
    });
    const table = screen.getByRole("table", { name: "Records" });
    expect(table).not.toHaveAttribute("tabindex");
    await user.tab();
    expect(screen.getByRole("button", { name: "Edit Alpha" })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole("link", { name: "View Alpha" })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole("button", { name: "Edit Beta" })).toHaveFocus();
    await user.tab({ shift: true });
    expect(screen.getByRole("link", { name: "View Alpha" })).toHaveFocus();
  });

  it("operates interactive cell content with Enter and Space", async () => {
    const user = userEvent.setup();
    const onEdit = vi.fn();
    render(AnyTable, {
      props: {
        columns: [
          {
            key: "edit",
            header: "Edit",
            render: (row: Row) =>
              h(
                "button",
                { type: "button", onClick: () => onEdit(row.id) },
                `Edit ${row.name}`,
              ),
          },
        ],
        data: rows,
      },
    });
    await user.tab();
    await user.keyboard("{Enter}");
    await user.tab();
    await user.keyboard(" ");
    expect(onEdit.mock.calls).toEqual([[1], [2]]);
  });

  it("forwards aria-* attributes, class and style to the table", () => {
    render(AnyTable, {
      props: { columns, data: rows },
      attrs: {
        "aria-label": "Records",
        "aria-describedby": "records-help",
        class: "custom",
        style: { color: "red" },
      },
    });
    const table = screen.getByRole("table", { name: "Records" });
    expect(table).toHaveAttribute("aria-describedby", "records-help");
    expect(table).toHaveClass("custom");
    expect(table.style.color).toBe("red");
  });
});

describe("DataTable", () => {
  it("marks itself busy while loading and shows skeletons even if an error is set", () => {
    const { container } = render(AnyDataTable, {
      props: { columns, data: rows, loading: true, error: "Boom" },
    });
    const root = container.firstElementChild!;
    expect(root).toHaveAttribute("aria-busy", "true");
    expect(root).toHaveClass("dataTable");
    expect(root).toHaveAttribute("data-minerva", "data-table");
    expect(root).toHaveAttribute("data-part", "root");
    expect(root).toHaveAttribute("data-loading", "");
    expect(root).toHaveAttribute("data-size", "medium");
    expect(root).toHaveAttribute("data-variant", "simple");
    expect(screen.queryByRole("alert")).toBeNull();
    expect(
      container.querySelectorAll('tbody tr[aria-hidden="true"]'),
    ).toHaveLength(5);
  });

  it("is not busy when idle and forwards attributes to the table", () => {
    const { container } = render(AnyDataTable, {
      props: { columns, data: rows, size: "small", variant: "striped" },
      attrs: { "aria-label": "Records" },
    });
    const root = container.firstElementChild!;
    expect(root).not.toHaveAttribute("aria-busy");
    expect(root).toHaveAttribute("data-size", "small");
    expect(root).toHaveAttribute("data-variant", "striped");
    expect(screen.getByRole("table", { name: "Records" })).toHaveClass(
      "small",
      "striped",
    );
  });

  it("announces errors as an alert and offers a labelled retry", async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();
    render(AnyDataTable, {
      props: {
        columns,
        data: rows,
        error: "Failed to load",
        retryLabel: "Try again",
        onRetry,
      },
    });
    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent("Failed to load");
    expect(alert).toHaveAttribute("data-part", "error");
    expect(screen.queryByRole("table")).toBeNull();
    await user.click(screen.getByRole("button", { name: "Try again" }));
    expect(onRetry).toHaveBeenCalledOnce();
  });

  it("uses the localized retry label by default and accepts an error slot", () => {
    render(AnyDataTable, {
      props: { columns, data: rows, onRetry: () => {} },
      slots: { error: () => h("b", "Slot failure") },
    });
    expect(screen.getByRole("alert")).toHaveTextContent("Slot failure");
    expect(screen.getByRole("button", { name: "Retry" })).toBeTruthy();
  });

  it("omits the retry action without a retry listener", () => {
    render(AnyDataTable, { props: { columns, data: rows, error: "Failed" } });
    expect(screen.getByRole("alert")).toBeTruthy();
    expect(screen.queryByRole("button")).toBeNull();
  });

  it.each([
    ["Enter", "{Enter}"],
    ["Space", " "],
  ])("activates the retry action with %s", async (_, key) => {
    const user = userEvent.setup();
    const onRetry = vi.fn();
    render(AnyDataTable, {
      props: { columns, data: [], error: "Could not load", onRetry },
    });
    await user.tab();
    expect(screen.getByRole("button", { name: "Retry" })).toHaveFocus();
    await user.keyboard(key);
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("keeps supplied server-page rows on page two and emits page changes", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { container } = render(AnyDataTable, {
      props: {
        columns: [{ key: "name", header: "Name" }],
        data: [{ name: "Page two row" }],
        pagination: { current: 2, pageSize: 10, total: 30, onChange },
      },
    });
    expect(container.querySelector("tbody")?.textContent).toContain(
      "Page two row",
    );
    await user.click(screen.getByRole("button", { name: "Next page" }));
    expect(onChange).toHaveBeenCalledWith(3, 10);
  });

  it("reaches the pagination after the table content", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(AnyDataTable, {
      props: { columns, data: rows, pagination: { total: 30, onChange } },
    });
    await user.tab();
    await user.tab();
    await user.tab();
    await user.tab();
    expect(screen.getByRole("link", { name: "View Beta" })).toHaveFocus();
    // Previous page is disabled on page 1: the first page button is next
    await user.tab();
    expect(screen.getByRole("button", { name: "Page 1" })).toHaveFocus();
    await user.tab();
    await user.keyboard("{Enter}");
    expect(onChange).toHaveBeenCalledWith(2, 10);
  });

  it("renders the pagination slot instead of the pagination prop", () => {
    render(AnyDataTable, {
      props: { columns, data: rows, pagination: { total: 30 } },
      slots: { pagination: () => h("p", "Custom pager") },
    });
    expect(screen.getByText("Custom pager")).toBeTruthy();
    expect(screen.queryByRole("navigation")).toBeNull();
  });

  it("shows retry instead of stale rows and hides pagination on error", async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();
    const { container } = render(AnyDataTable, {
      props: {
        columns: [{ key: "name", header: "Name" }],
        data: [{ name: "stale row" }],
        error: "Request failed",
        onRetry,
        pagination: { current: 1, pageSize: 10, total: 20 },
      },
    });
    expect(container.textContent).toContain("Request failed");
    expect(container.textContent).not.toContain("stale row");
    expect(container.querySelector("nav")).toBeNull();
    await user.click(screen.getByRole("button"));
    expect(onRetry).toHaveBeenCalledOnce();
  });

  it("exposes no tab stops in the hidden loading skeleton rows", async () => {
    const user = userEvent.setup();
    render(AnyDataTable, { props: { columns, data: rows, loading: true } });
    await user.tab();
    expect(document.body).toHaveFocus();
  });

  it("forwards slots, v-model:sortState and v-model:selectedRowKeys to the Table", async () => {
    const user = userEvent.setup();
    const sort = ref<TableSortState | null>(null);
    const keys = ref<TableRowKey[]>([]);
    const onSortChange = vi.fn();
    const onSelectionChange = vi.fn();
    render(
      defineComponent(
        () => () =>
          h(
            AnyDataTable,
            {
              columns: [{ key: "name", header: "Name", sortable: true }],
              data: rows,
              rowKey: (r: Row) => r.id,
              sortState: sort.value,
              "onUpdate:sortState": (v: TableSortState) => (sort.value = v),
              onSortChange,
              selectedRowKeys: keys.value,
              "onUpdate:selectedRowKeys": (v: TableRowKey[]) =>
                (keys.value = v),
              onSelectionChange,
            },
            {
              "cell-name": ({ row }: { row: Row }) => `Cell ${row.name}`,
              "header-name": () => "Label",
            },
          ),
      ),
    );
    expect(screen.getByText("Cell Alpha")).toBeTruthy();
    await user.click(screen.getByRole("button", { name: "Label" }));
    expect(sort.value).toEqual({ key: "name", order: "ascend" });
    expect(onSortChange).toHaveBeenCalledWith({ key: "name", order: "ascend" });
    await user.click(screen.getByRole("checkbox", { name: "Select row 2" }));
    expect(keys.value).toEqual([2]);
    expect(onSelectionChange).toHaveBeenCalledWith([2], [rows[1]]);
    expect(
      screen.getByRole("checkbox", { name: "Select row 2" }),
    ).toBeChecked();
  });

  it("renders the empty slot through the Table", () => {
    render(AnyDataTable, {
      props: { columns, data: [] },
      slots: { empty: () => "Nothing here" },
    });
    expect(screen.getByRole("cell", { name: "Nothing here" })).toBeTruthy();
  });
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { DataTable, Table } from ".";
import type { TableColumn } from ".";

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
    render: (row) => (
      <>
        <button type="button">{`Edit ${row.name}`}</button>
        <a href={`#${row.id}`}>{`View ${row.name}`}</a>
      </>
    ),
  },
];

describe("Table keyboard", () => {
  it("is not a tab stop itself and reaches interactive cell content in row order", async () => {
    const user = userEvent.setup();
    render(
      <Table
        aria-label="Records"
        columns={columns}
        data={rows}
        rowKey={(r) => r.id}
      />,
    );
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
    render(
      <Table
        columns={[
          {
            key: "edit",
            header: "Edit",
            render: (row: Row) => (
              <button type="button" onClick={() => onEdit(row.id)}>
                {`Edit ${row.name}`}
              </button>
            ),
          },
        ]}
        data={rows}
      />,
    );
    await user.tab();
    await user.keyboard("{Enter}");
    await user.tab();
    await user.keyboard(" ");
    expect(onEdit.mock.calls).toEqual([[1], [2]]);
  });

  it("forwards aria-* attributes, className and style to the table", () => {
    render(
      <Table
        columns={columns}
        data={rows}
        aria-label="Records"
        aria-describedby="records-help"
        className="custom"
        style={{ color: "red" }}
      />,
    );
    const table = screen.getByRole("table", { name: "Records" });
    expect(table).toHaveAttribute("aria-describedby", "records-help");
    expect(table).toHaveClass("custom");
    expect(table.style.color).toBe("red");
  });
});

describe("DataTable keyboard", () => {
  it("reaches the pagination after the table content", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <DataTable
        columns={columns}
        data={rows}
        pagination={{ total: 30, onChange }}
      />,
    );
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

  it.each([
    ["Enter", "{Enter}"],
    ["Space", " "],
  ])("activates the retry action with %s", async (_, key) => {
    const user = userEvent.setup();
    const onRetry = vi.fn();
    render(
      <DataTable
        columns={columns}
        data={[]}
        error="Could not load"
        onRetry={onRetry}
      />,
    );
    await user.tab();
    expect(screen.getByRole("button", { name: "Retry" })).toHaveFocus();
    await user.keyboard(key);
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("exposes no tab stops in the hidden loading skeleton rows", async () => {
    const user = userEvent.setup();
    render(<DataTable columns={columns} data={rows} loading />);
    await user.tab();
    expect(document.body).toHaveFocus();
  });
});

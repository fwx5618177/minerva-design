import { useState } from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Table, TableRoot, type TableColumn, type TableSortState } from ".";

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
  {
    key: "age",
    header: "Age",
    sortable: (a, b) => a.age - b.age,
  },
  { key: "id", header: "ID" },
];

/** First-column text of every body row */
const names = (column = 0) =>
  within(screen.getAllByRole("rowgroup")[1])
    .getAllByRole("row")
    .map((row) => within(row).getAllByRole("cell")[column].textContent);

const header = (name: string) => screen.getByRole("columnheader", { name });

describe("Table sorting", () => {
  it("renders sort buttons only in sortable headers, with aria-sort", () => {
    render(<Table columns={columns} data={people} rowKey={(r) => r.id} />);
    expect(
      within(header("Name")).getByRole("button", { name: "Name" }),
    ).toHaveAttribute("type", "button");
    expect(header("Name")).toHaveAttribute("aria-sort", "none");
    expect(header("Age")).toHaveAttribute("aria-sort", "none");
    expect(header("ID")).not.toHaveAttribute("aria-sort");
    expect(header("Name")).toHaveAttribute("data-sort", "none");
    expect(header("ID")).not.toHaveAttribute("data-sort");
    expect(within(header("ID")).queryByRole("button")).toBeNull();
    // Decorative indicator
    expect(header("Name").querySelector("svg")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  it("cycles ascend, descend and none with the keyboard (uncontrolled)", async () => {
    const user = userEvent.setup();
    const onSortChange = vi.fn();
    render(
      <Table
        columns={columns}
        data={people}
        rowKey={(r) => r.id}
        onSortChange={onSortChange}
      />,
    );
    await user.tab();
    const button = screen.getByRole("button", { name: "Name" });
    expect(button).toHaveFocus();

    await user.keyboard("{Enter}");
    expect(header("Name")).toHaveAttribute("aria-sort", "ascending");
    expect(header("Name")).toHaveAttribute("data-sort", "ascending");
    expect(names()).toEqual(["alice", "Bob", "Charlie"]);

    await user.keyboard(" ");
    expect(header("Name")).toHaveAttribute("aria-sort", "descending");
    expect(header("Name")).toHaveAttribute("data-sort", "descending");
    expect(header("Age")).toHaveAttribute("data-sort", "none");
    expect(names()).toEqual(["Charlie", "Bob", "alice"]);

    await user.keyboard("{Enter}");
    expect(header("Name")).toHaveAttribute("aria-sort", "none");
    expect(header("Name")).toHaveAttribute("data-sort", "none");
    expect(names()).toEqual(["Charlie", "alice", "Bob"]);

    expect(onSortChange.mock.calls).toEqual([
      [{ key: "name", order: "ascend" }],
      [{ key: "name", order: "descend" }],
      [{ key: "name", order: null }],
    ]);
  });

  it("uses a compare function and switches columns", async () => {
    const user = userEvent.setup();
    render(
      <Table
        columns={columns}
        data={people}
        rowKey={(r) => r.id}
        defaultSortState={{ key: "name", order: "descend" }}
      />,
    );
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
    const data = [
      { code: "item10" },
      { code: undefined },
      { code: "item2" },
      { code: "item1" },
    ];
    render(
      <Table
        columns={[{ key: "code", header: "Code", sortable: true }]}
        data={data}
      />,
    );
    await user.click(screen.getByRole("button", { name: "Code" }));
    expect(names()).toEqual(["item1", "item2", "item10", ""]);
  });

  it("follows the controlled sort state and reports changes", async () => {
    const user = userEvent.setup();
    const onSortChange = vi.fn();
    const { rerender } = render(
      <Table
        columns={columns}
        data={people}
        rowKey={(r) => r.id}
        sortState={{ key: "age", order: "descend" }}
        onSortChange={onSortChange}
      />,
    );
    expect(names()).toEqual(["Bob", "Charlie", "alice"]);
    await user.click(screen.getByRole("button", { name: "Age" }));
    expect(onSortChange).toHaveBeenCalledWith({ key: "age", order: null });
    // Not applied until the parent updates the prop
    expect(header("Age")).toHaveAttribute("aria-sort", "descending");
    rerender(
      <Table
        columns={columns}
        data={people}
        rowKey={(r) => r.id}
        sortState={null}
        onSortChange={onSortChange}
      />,
    );
    expect(header("Age")).toHaveAttribute("aria-sort", "none");
    expect(names()).toEqual(["Charlie", "alice", "Bob"]);
  });

  it("works as a controlled component driven by state", async () => {
    const user = userEvent.setup();
    const Controlled = () => {
      const [sort, setSort] = useState<TableSortState | null>(null);
      return (
        <Table
          columns={columns}
          data={people}
          rowKey={(r) => r.id}
          sortState={sort}
          onSortChange={setSort}
        />
      );
    };
    render(<Controlled />);
    await user.click(screen.getByRole("button", { name: "Age" }));
    expect(header("Age")).toHaveAttribute("aria-sort", "ascending");
    expect(names()).toEqual(["alice", "Charlie", "Bob"]);
  });

  it("does not reorder rows with manualSort", async () => {
    const user = userEvent.setup();
    const onSortChange = vi.fn();
    render(
      <Table
        columns={columns}
        data={people}
        rowKey={(r) => r.id}
        manualSort
        onSortChange={onSortChange}
      />,
    );
    await user.click(screen.getByRole("button", { name: "Name" }));
    expect(header("Name")).toHaveAttribute("aria-sort", "ascending");
    expect(names()).toEqual(["Charlie", "alice", "Bob"]);
    expect(onSortChange).toHaveBeenCalledWith({ key: "name", order: "ascend" });
  });
});

describe("Table row selection", () => {
  const rowLabel = (r: Person) => r.name;

  it("toggles a row checkbox with Space and reports keys and rows", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <Table
        columns={columns}
        data={people}
        rowKey={(r) => r.id}
        rowSelection={{ onChange, getRowLabel: rowLabel }}
      />,
    );
    const selectAll = screen.getByRole("checkbox", { name: "Select all rows" });
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
    expect(selectAll).toBePartiallyChecked();

    await user.keyboard(" ");
    expect(alice).not.toBeChecked();
    expect(alice.closest("tr")).not.toHaveAttribute("aria-selected");
    expect(alice.closest("tr")).not.toHaveAttribute("data-selected");
    expect(onChange).toHaveBeenLastCalledWith([], []);
    expect(selectAll).not.toBePartiallyChecked();
  });

  it("labels rows with the row key by default", () => {
    render(
      <Table
        columns={columns}
        data={people}
        rowKey={(r) => r.id}
        rowSelection={{}}
      />,
    );
    expect(
      screen.getByRole("checkbox", { name: "Select row 3" }),
    ).toBeInTheDocument();
  });

  it("selects and clears all rows, skipping disabled rows", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <Table
        columns={columns}
        data={people}
        rowKey={(r) => r.id}
        rowSelection={{
          onChange,
          getRowLabel: rowLabel,
          getCheckboxProps: (r) => ({ disabled: r.id === 3 }),
        }}
      />,
    );
    const selectAll = screen.getByRole("checkbox", { name: "Select all rows" });
    expect(
      screen.getByRole("checkbox", { name: "Select row Bob" }),
    ).toBeDisabled();

    selectAll.focus();
    await user.keyboard(" ");
    expect(onChange).toHaveBeenLastCalledWith([1, 2], [people[0], people[1]]);
    expect(selectAll).toBeChecked();
    expect(selectAll).not.toBePartiallyChecked();
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
    render(
      <Table
        columns={columns}
        data={people}
        rowKey={(r) => r.id}
        rowSelection={{
          defaultSelectedRowKeys: [3, 99],
          onChange,
          getCheckboxProps: (r) => ({ disabled: r.id === 3 }),
        }}
      />,
    );
    const selectAll = screen.getByRole("checkbox", { name: "Select all rows" });
    expect(selectAll).toBePartiallyChecked();
    await user.click(selectAll);
    expect(onChange).toHaveBeenLastCalledWith(
      [3, 99, 1, 2],
      [people[0], people[1], people[2]],
    );
    await user.click(selectAll);
    expect(onChange).toHaveBeenLastCalledWith([3, 99], [people[2]]);
  });

  it("follows controlled selectedRowKeys", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    const { rerender } = render(
      <Table
        columns={columns}
        data={people}
        rowKey={(r) => r.id}
        rowSelection={{ selectedRowKeys: [1], onChange, getRowLabel: rowLabel }}
      />,
    );
    const charlie = screen.getByRole("checkbox", {
      name: "Select row Charlie",
    });
    expect(charlie).toBeChecked();
    await user.click(charlie);
    expect(onChange).toHaveBeenCalledWith([], []);
    expect(charlie).toBeChecked();
    rerender(
      <Table
        columns={columns}
        data={people}
        rowKey={(r) => r.id}
        rowSelection={{ selectedRowKeys: [], onChange, getRowLabel: rowLabel }}
      />,
    );
    expect(charlie).not.toBeChecked();
  });

  it("keeps the selection on the same rows after sorting", async () => {
    const user = userEvent.setup();
    render(
      <Table
        columns={columns}
        data={people}
        rowKey={(r) => r.id}
        rowSelection={{ getRowLabel: rowLabel }}
      />,
    );
    await user.click(screen.getByRole("checkbox", { name: "Select row Bob" }));
    await user.click(screen.getByRole("button", { name: "Name" }));
    expect(names(1)).toEqual(["alice", "Bob", "Charlie"]);
    const selectedRow = screen
      .getAllByRole("row")
      .find((row) => row.getAttribute("aria-selected") === "true");
    expect(selectedRow).toHaveTextContent("Bob");
  });

  it("spans the selection column in the empty row and disables select-all", () => {
    render(<Table columns={columns} data={[]} rowSelection={{}} />);
    expect(screen.getByText("No data")).toHaveAttribute("colspan", "4");
    expect(
      screen.getByRole("checkbox", { name: "Select all rows" }),
    ).toBeDisabled();
  });
});

describe("Table scroll region", () => {
  it("is not a region or tab stop without scrolling", () => {
    render(<Table aria-label="People" columns={columns} data={people} />);
    expect(screen.queryByRole("region")).toBeNull();
  });

  it("makes the scrolling wrapper a focusable region named after the table", async () => {
    const user = userEvent.setup();
    render(
      <Table
        aria-label="People"
        columns={[{ key: "name", header: "Name" }]}
        data={people}
        scroll={{ y: 200 }}
      />,
    );
    const region = screen.getByRole("region", { name: "People" });
    expect(region).toHaveAttribute("tabindex", "0");
    expect(region).toContainElement(screen.getByRole("table"));
    await user.tab();
    expect(region).toHaveFocus();
  });

  it("uses a localized default name and aria-labelledby", () => {
    const { unmount } = render(
      <TableRoot scroll={{ x: 900 }}>
        <tbody />
      </TableRoot>,
    );
    expect(
      screen.getByRole("region", { name: "Scrollable table" }),
    ).toBeInTheDocument();
    unmount();
    render(
      <>
        <h2 id="people-title">People list</h2>
        <TableRoot scroll={{ x: 900 }} aria-labelledby="people-title">
          <tbody />
        </TableRoot>
      </>,
    );
    const region = screen.getByRole("region", { name: "People list" });
    expect(region).not.toHaveAttribute("aria-label");
  });

  it("becomes a region when the content overflows the wrapper", () => {
    const widths = vi
      .spyOn(HTMLElement.prototype, "scrollWidth", "get")
      .mockReturnValue(800);
    const client = vi
      .spyOn(HTMLElement.prototype, "clientWidth", "get")
      .mockReturnValue(300);
    try {
      render(<Table aria-label="Wide" columns={columns} data={people} />);
      expect(screen.getByRole("region", { name: "Wide" })).toHaveAttribute(
        "tabindex",
        "0",
      );
    } finally {
      widths.mockRestore();
      client.mockRestore();
    }
  });
});

import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, it, expect, vi } from "vitest";
import { AutoComplete, Table, NavTree, CodeEditor } from "./index";
afterEach(cleanup);
describe("completed controls through native-web", () => {
  it("commits an autocomplete option after browser focus moves from the input", async () => {
    const select = vi.fn();
    const user = userEvent.setup();
    render(
      <AutoComplete
        label="Fruit"
        options={[{ value: "a", label: "Apple" }]}
        onSelect={select}
      />,
    );
    await user.type(screen.getByLabelText("Fruit"), "ap");
    await user.click(screen.getByRole("button", { name: "Apple" }));
    expect(select).toHaveBeenCalledWith({ value: "a", label: "Apple" });
    expect(screen.getByLabelText("Fruit")).toHaveValue("Apple");
  });
  it("can collapse the active leaf ancestor", async () => {
    render(
      <NavTree
        activeId="leaf"
        sections={[
          {
            id: "a",
            items: [
              {
                id: "branch",
                label: "Branch",
                children: [{ id: "leaf", label: "Leaf" }],
              },
            ],
          },
        ]}
      />,
    );
    expect(screen.getByText("Leaf")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Branch" }));
    expect(screen.queryByText("Leaf")).not.toBeInTheDocument();
  });
  it("provides a selectable table and controlled sort requests", async () => {
    const sort = vi.fn();
    render(
      <Table
        accessibilityLabel="People"
        data={[
          { id: 1, name: "Ada" },
          { id: 2, name: "Lin" },
        ]}
        columns={[{ key: "name", header: "Name", sortable: true }]}
        sortState={null}
        onSortChange={sort}
        rowSelection={{
          getCheckboxProps: (row) => ({ disabled: row.id === 2 }),
        }}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Name" }));
    expect(sort).toHaveBeenCalledWith({ key: "name", order: "ascend" });
    fireEvent.click(screen.getByRole("checkbox", { name: "Select all rows" }));
    expect(
      screen.getByRole("checkbox", { name: "Select row 0" }),
    ).toBeChecked();
    expect(
      screen.getByRole("checkbox", { name: "Select row 1" }),
    ).not.toBeChecked();
  });
  it("protects typed edits from a stale asynchronous formatter", async () => {
    let resolve!: (text: string) => void;
    const format = () => new Promise<string>((r) => (resolve = r));
    render(<CodeEditor label="Source" defaultValue="old" format={format} />);
    fireEvent.click(screen.getByRole("button", { name: "Format code" }));
    fireEvent.change(screen.getByLabelText("Source"), {
      target: { value: "new" },
    });
    resolve("old formatted");
    await screen.findByRole("button", { name: "Format code" });
    expect(screen.getByLabelText("Source")).toHaveValue("new");
  });
});
it("exposes PageTabs as a tablist with keyboard navigation that skips disabled tabs", async () => {
  const { PageTabs, PageTab } = await import("./index");
  const select = vi.fn();
  render(
    <PageTabs activeValue="a">
      <PageTab value="a" label="A" onSelect={() => select("a")} />
      <PageTab value="b" label="B" disabled />
      <PageTab value="c" label="C" onSelect={() => select("c")} />
    </PageTabs>,
  );
  expect(screen.getByRole("tablist")).toBeInTheDocument();
  const first = screen.getByRole("tab", { name: "A" });
  (first as unknown as { focus(): void }).focus();
  fireEvent.keyDown(first, { key: "ArrowRight" });
  expect(select).toHaveBeenCalledWith("c");
  expect(screen.getByRole("tab", { name: "C" })).toHaveFocus();
});

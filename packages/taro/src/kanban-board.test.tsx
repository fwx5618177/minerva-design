import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import * as M from "./index";

describe("Taro KanbanBoard", () => {
  it("renders a labelled region of columns with the sizes", () => {
    render(
      <M.KanbanBoard columnWidth={240} gap="1rem" maxHeight={400} fill>
        <M.KanbanColumn title="To do" count={2}>
          <M.Card>Write spec</M.Card>
          <M.Card>Review</M.Card>
        </M.KanbanColumn>
        <M.KanbanColumn title="Done" />
      </M.KanbanBoard>,
    );
    const board = screen.getByRole("region", { name: "Board" });
    expect(board).toHaveAttribute("data-minerva", "kanban-board");
    expect(board).toHaveClass("mn-kanban-board", "mn-fill");
    expect(board.style.getPropertyValue("--kanban-column-width")).toBe("240px");
    expect(board.style.getPropertyValue("--kanban-gap")).toBe("1rem");
    const scroll = board.firstElementChild as HTMLElement;
    expect(scroll.style.maxHeight).toBe("400px");
    const todo = screen.getByRole("group", { name: "To do, 2 items" });
    const items = within(within(todo).getByRole("list")).getAllByRole(
      "listitem",
    );
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent("Write spec");
    const done = screen.getByRole("group", { name: "Done" });
    expect(within(done).getByText("No items")).toBeInTheDocument();
  });

  it("renders the accent, description, actions, empty and footer", () => {
    const { rerender } = render(
      <M.KanbanColumn
        title="Ideas"
        count={1}
        color="success"
        description="Not triaged"
        actions={<M.Button>Add</M.Button>}
        empty="Nothing yet"
        footer={<M.Button>Add card</M.Button>}
      />,
    );
    let column = screen.getByRole("group", { name: "Ideas, 1 item" });
    expect(column).toHaveAttribute("data-color", "success");
    expect(column).toHaveClass("mn-color-success");
    expect(column.querySelector('[data-part="indicator"]')).toBeInTheDocument();
    expect(within(column).getByText("Not triaged")).toBeInTheDocument();
    expect(within(column).getByText("Nothing yet")).toBeInTheDocument();
    expect(within(column).getByText("Add card")).toBeInTheDocument();
    rerender(<M.KanbanColumn title="Ideas" color="#7c3aed" />);
    column = screen.getByRole("group", { name: "Ideas" });
    expect(column).not.toHaveAttribute("data-color");
    expect(column.style.getPropertyValue("--kanban-column-color")).toBe(
      "#7c3aed",
    );
  });

  it("is labelled by a rich title and its count", () => {
    render(
      <M.KanbanColumn title={<strong>Blocked</strong>} count={3}>
        <M.Card>Card</M.Card>
      </M.KanbanColumn>,
    );
    expect(screen.getByRole("group", { name: "Blocked 3" })).toBeTruthy();
  });

  it("translates the labels", () => {
    render(
      <M.ConfigProvider locale={{ language: "zh" }}>
        <M.KanbanBoard>
          <M.KanbanColumn title="待办" count={3} />
        </M.KanbanBoard>
      </M.ConfigProvider>,
    );
    expect(screen.getByRole("region", { name: "看板" })).toBeTruthy();
    expect(screen.getByRole("group", { name: "待办，3 项" })).toBeTruthy();
    expect(screen.getByText("暂无项目")).toBeTruthy();
  });
});

import { act, render, screen, within } from "@testing-library/react";
import { createRef } from "react";
import { afterEach, describe, expect, it } from "vitest";
import i18n from "../../config/i18n";
import { KanbanBoard, KanbanColumn } from ".";

describe("KanbanBoard", () => {
  it("renders a labelled, focusable region with the column width and gap", () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <KanbanBoard ref={ref} columnWidth={240} gap="1rem" maxHeight={400}>
        <KanbanColumn title="To do" />
      </KanbanBoard>,
    );
    const board = screen.getByRole("region", { name: "Board" });
    expect(ref.current).toBe(board);
    expect(board).toHaveAttribute("tabindex", "0");
    expect(board.style.getPropertyValue("--kanban-column-width")).toBe("240px");
    expect(board.style.getPropertyValue("--kanban-gap")).toBe("1rem");
    expect(board.style.maxHeight).toBe("400px");
    expect(board).toHaveAttribute("data-minerva", "kanban-board");
  });

  it("accepts a custom label, labelledby and fill", () => {
    const { rerender } = render(
      <KanbanBoard aria-label="Sprint 12" fill height="60vh" />,
    );
    const board = screen.getByRole("region", { name: "Sprint 12" });
    expect(board.className).toMatch(/fill/);
    expect(board.style.height).toBe("60vh");
    rerender(
      <>
        <h2 id="t">Roadmap</h2>
        <KanbanBoard aria-labelledby="t" />
      </>,
    );
    expect(screen.getByRole("region", { name: "Roadmap" })).not.toHaveAttribute(
      "aria-label",
    );
  });
});

describe("KanbanColumn", () => {
  it("is a group named by its title and count, with a list of cards", () => {
    render(
      <KanbanColumn title="To do" count={2}>
        <div>Write spec</div>
        <div>Review</div>
      </KanbanColumn>,
    );
    const column = screen.getByRole("group", { name: "To do, 2 items" });
    const list = within(column).getByRole("list");
    const items = within(list).getAllByRole("listitem");
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent("Write spec");
    expect(within(column).getByText("2")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    expect(screen.queryByText("No items")).not.toBeInTheDocument();
  });

  it("uses the singular label and hides the badge without a count", () => {
    const { rerender } = render(<KanbanColumn title="Doing" count={1} />);
    expect(
      screen.getByRole("group", { name: "Doing, 1 item" }),
    ).toBeInTheDocument();
    rerender(<KanbanColumn title="Doing" count={-1} />);
    const column = screen.getByRole("group", { name: "Doing" });
    expect(column.querySelector('[data-part="count"]')).toBeNull();
  });

  it("is labelled by a rich title and its count", () => {
    render(
      <KanbanColumn title={<strong>Blocked</strong>} count={3}>
        <div>Card</div>
      </KanbanColumn>,
    );
    expect(
      screen.getByRole("group", { name: "Blocked 3" }),
    ).toBeInTheDocument();
  });

  it("shows the default or custom empty content without cards", () => {
    const { rerender } = render(<KanbanColumn title="Done" />);
    expect(screen.getByText("No items")).toBeInTheDocument();
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
    rerender(<KanbanColumn title="Done" empty="Nothing shipped yet" />);
    expect(screen.getByText("Nothing shipped yet")).toBeInTheDocument();
  });

  it("renders the description, actions and footer", () => {
    render(
      <KanbanColumn
        title="Ideas"
        description="Not triaged"
        actions={<button type="button">Add</button>}
        footer={<button type="button">Add card</button>}
      />,
    );
    const column = screen.getByRole("group", { name: "Ideas" });
    expect(within(column).getByText("Not triaged")).toBeInTheDocument();
    expect(
      within(column).getByRole("button", { name: "Add" }),
    ).toBeInTheDocument();
    expect(
      within(column).getByRole("button", { name: "Add card" }),
    ).toBeInTheDocument();
  });

  it("names a theme accent with data-color and sets a custom color", () => {
    const { rerender } = render(<KanbanColumn title="Done" color="success" />);
    let column = screen.getByRole("group", { name: "Done" });
    expect(column).toHaveAttribute("data-color", "success");
    expect(column.querySelector('[data-part="indicator"]')).not.toBeNull();
    rerender(<KanbanColumn title="Done" color="#7c3aed" />);
    column = screen.getByRole("group", { name: "Done" });
    expect(column).not.toHaveAttribute("data-color");
    expect(column.style.getPropertyValue("--kanban-column-color")).toBe(
      "#7c3aed",
    );
    rerender(<KanbanColumn title="Done" />);
    column = screen.getByRole("group", { name: "Done" });
    expect(column.querySelector('[data-part="indicator"]')).toBeNull();
  });
});

describe("KanbanBoard localization", () => {
  afterEach(() => {
    act(() => {
      i18n.changeLanguage("en");
    });
  });

  it("translates the labels and the empty text", () => {
    act(() => {
      i18n.changeLanguage("zh");
    });
    render(
      <KanbanBoard>
        <KanbanColumn title="待办" count={3} />
      </KanbanBoard>,
    );
    expect(screen.getByRole("region", { name: "看板" })).toBeInTheDocument();
    expect(
      screen.getByRole("group", { name: "待办，3 项" }),
    ).toBeInTheDocument();
    expect(screen.getByText("暂无项目")).toBeInTheDocument();
  });
});

import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { createRef } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import i18n from "../../config/i18n";
import { DashboardColumns, DashboardCard, DashboardColumn } from ".";
import type { DashboardColumnsProps } from ".";

describe("DashboardColumns", () => {
  it("renders a labelled, focusable region with the column width and gap", () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <DashboardColumns ref={ref} columnWidth={240} gap="1rem" maxHeight={400}>
        <DashboardColumn title="To do" />
      </DashboardColumns>,
    );
    const board = screen.getByRole("region", { name: "Board" });
    expect(ref.current).toBe(board);
    expect(board).toHaveAttribute("tabindex", "0");
    expect(board.style.getPropertyValue("--dashboard-column-width")).toBe(
      "240px",
    );
    expect(board.style.getPropertyValue("--dashboard-gap")).toBe("1rem");
    expect(board.style.maxHeight).toBe("400px");
    expect(board).toHaveAttribute("data-minerva", "dashboard-columns");
  });

  it("accepts a custom label, labelledby and fill", () => {
    const { rerender } = render(
      <DashboardColumns aria-label="Sprint 12" fill height="60vh" />,
    );
    const board = screen.getByRole("region", { name: "Sprint 12" });
    expect(board.className).toMatch(/fill/);
    expect(board.style.height).toBe("60vh");
    rerender(
      <>
        <h2 id="t">Roadmap</h2>
        <DashboardColumns aria-labelledby="t" />
      </>,
    );
    expect(screen.getByRole("region", { name: "Roadmap" })).not.toHaveAttribute(
      "aria-label",
    );
  });
});

describe("DashboardColumn", () => {
  it("is a group named by its title and count, with a list of cards", () => {
    render(
      <DashboardColumn title="To do" count={2}>
        <div>Write spec</div>
        <div>Review</div>
      </DashboardColumn>,
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
    const { rerender } = render(<DashboardColumn title="Doing" count={1} />);
    expect(
      screen.getByRole("group", { name: "Doing, 1 item" }),
    ).toBeInTheDocument();
    rerender(<DashboardColumn title="Doing" count={-1} />);
    const column = screen.getByRole("group", { name: "Doing" });
    expect(column.querySelector('[data-part="count"]')).toBeNull();
  });

  it("is labelled by a rich title and its count", () => {
    render(
      <DashboardColumn title={<strong>Blocked</strong>} count={3}>
        <div>Card</div>
      </DashboardColumn>,
    );
    expect(
      screen.getByRole("group", { name: "Blocked 3" }),
    ).toBeInTheDocument();
  });

  it("shows the default or custom empty content without cards", () => {
    const { rerender } = render(<DashboardColumn title="Done" />);
    expect(screen.getByText("No items")).toBeInTheDocument();
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
    rerender(<DashboardColumn title="Done" empty="Nothing shipped yet" />);
    expect(screen.getByText("Nothing shipped yet")).toBeInTheDocument();
  });

  it("renders the description, actions and footer", () => {
    render(
      <DashboardColumn
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
    const { rerender } = render(
      <DashboardColumn title="Done" color="success" />,
    );
    let column = screen.getByRole("group", { name: "Done" });
    expect(column).toHaveAttribute("data-color", "success");
    expect(column.querySelector('[data-part="indicator"]')).not.toBeNull();
    rerender(<DashboardColumn title="Done" color="#7c3aed" />);
    column = screen.getByRole("group", { name: "Done" });
    expect(column).not.toHaveAttribute("data-color");
    expect(column.style.getPropertyValue("--dashboard-column-color")).toBe(
      "#7c3aed",
    );
    rerender(<DashboardColumn title="Done" />);
    column = screen.getByRole("group", { name: "Done" });
    expect(column.querySelector('[data-part="indicator"]')).toBeNull();
  });
});

describe("DashboardColumns localization", () => {
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
      <DashboardColumns>
        <DashboardColumn title="待办" count={3} />
      </DashboardColumns>,
    );
    expect(
      screen.getByRole("region", { name: "分栏面板" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("group", { name: "待办，3 项" }),
    ).toBeInTheDocument();
    expect(screen.getByText("暂无项目")).toBeInTheDocument();
  });
});

describe("DashboardColumns drag and drop", () => {
  const box = (
    element: Element,
    left: number,
    top: number,
    w: number,
    h: number,
  ) => {
    element.getBoundingClientRect = () =>
      ({
        left,
        top,
        width: w,
        height: h,
        right: left + w,
        bottom: top + h,
        x: left,
        y: top,
        toJSON: () => ({}),
      }) as DOMRect;
  };

  /** Two 200px columns of 50px cards: "todo" (a, b) and "done" (c) */
  const renderBoard = (props: Partial<DashboardColumnsProps> = {}) => {
    const onCardMove = vi.fn();
    render(
      <DashboardColumns draggable onCardMove={onCardMove} {...props}>
        <DashboardColumn title="To do" value="todo">
          <DashboardCard value="a">Write spec</DashboardCard>
          <DashboardCard value="b" label="Review the spec">
            Review
          </DashboardCard>
        </DashboardColumn>
        <DashboardColumn title="Done" value="done">
          <DashboardCard value="c">Ship</DashboardCard>
        </DashboardColumn>
      </DashboardColumns>,
    );
    const board = screen.getByRole("region");
    box(board, 0, 0, 500, 400);
    board.querySelectorAll("[data-dashboard-column]").forEach((column, i) => {
      box(column, i * 220, 0, 200, 400);
      column
        .querySelectorAll("[data-dashboard-card]")
        .forEach((card, j) => box(card, i * 220, 40 + j * 60, 200, 50));
    });
    return { board, onCardMove };
  };

  const pointer = (type: string, target: EventTarget, x: number, y: number) =>
    fireEvent(
      target as Element,
      new PointerEvent(type, {
        bubbles: true,
        cancelable: true,
        clientX: x,
        clientY: y,
        pointerId: 1,
        pointerType: "mouse",
        isPrimary: true,
      }),
    );

  it("renders plain cards and no drag layer by default", () => {
    render(
      <DashboardColumns>
        <DashboardColumn title="To do" value="todo">
          <DashboardCard value="a">Write spec</DashboardCard>
        </DashboardColumn>
      </DashboardColumns>,
    );
    const card = screen.getByText("Write spec");
    expect(card).toHaveAttribute("data-dashboard-card", "a");
    expect(card).not.toHaveAttribute("tabindex");
    expect(card).not.toHaveAttribute("role");
    expect(document.querySelector("[data-dashboard-layer]")).toBeNull();
  });

  it("makes the cards focusable buttons described by the instructions", () => {
    renderBoard();
    const card = screen.getByRole("button", { name: "Review the spec" });
    expect(card).toHaveAttribute("tabindex", "0");
    expect(card).toHaveAccessibleDescription(/Press Space or Enter/);
    expect(screen.getByRole("group", { name: "To do" })).toHaveAttribute(
      "data-dashboard-column",
      "todo",
    );
  });

  it("reports a card dragged with the pointer to another column", () => {
    const { onCardMove } = renderBoard();
    pointer("pointerdown", screen.getByText("Write spec"), 100, 60);
    pointer("pointermove", document, 110, 60);
    pointer("pointermove", document, 300, 120);
    expect(screen.getByRole("group", { name: "Done" })).toHaveAttribute(
      "data-dashboard-drop-target",
    );
    pointer("pointerup", document, 300, 120);
    expect(onCardMove).toHaveBeenCalledExactlyOnceWith({
      cardKey: "a",
      fromColumn: "todo",
      fromIndex: 0,
      toColumn: "done",
      toIndex: 1,
    });
  });

  it("moves a card with the keyboard and announces it", () => {
    const { onCardMove } = renderBoard();
    const card = screen.getByRole("button", { name: "Write spec" });
    act(() => card.focus());
    fireEvent.keyDown(card, { key: " " });
    expect(screen.getByRole("status")).toHaveTextContent(
      "Picked up Write spec: position 1 of 2 in To do.",
    );
    fireEvent.keyDown(card, { key: "ArrowRight" });
    expect(screen.getByRole("status")).toHaveTextContent(
      "Write spec: position 1 of 2 in Done.",
    );
    fireEvent.keyDown(card, { key: "Enter" });
    expect(onCardMove).toHaveBeenCalledExactlyOnceWith({
      cardKey: "a",
      fromColumn: "todo",
      fromIndex: 0,
      toColumn: "done",
      toIndex: 0,
    });
  });

  it("cancels with Escape and respects canDrop", () => {
    const canDrop = vi.fn(() => false);
    const { onCardMove } = renderBoard({ canDrop });
    const card = screen.getByRole("button", { name: "Write spec" });
    act(() => card.focus());
    fireEvent.keyDown(card, { key: " " });
    fireEvent.keyDown(card, { key: "ArrowRight" });
    fireEvent.keyDown(card, { key: "ArrowDown" });
    fireEvent.keyDown(card, { key: " " });
    expect(canDrop).toHaveBeenCalled();
    expect(onCardMove).not.toHaveBeenCalled();
    fireEvent.keyDown(card, { key: " " });
    fireEvent.keyDown(card, { key: "Escape" });
    expect(screen.getByRole("status")).toHaveTextContent(
      "Move cancelled: Write spec stays in To do.",
    );
    expect(card).not.toHaveAttribute("data-dashboard-dragging");
  });

  it("removes the drag layer when draggable turns off", () => {
    const { rerender } = render(<DashboardColumns draggable />);
    expect(document.querySelector("[data-dashboard-layer]")).not.toBeNull();
    rerender(<DashboardColumns />);
    expect(document.querySelector("[data-dashboard-layer]")).toBeNull();
  });
});

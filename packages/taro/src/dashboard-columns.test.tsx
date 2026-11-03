import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import * as M from "./index";

describe("Taro DashboardColumns", () => {
  it("renders a labelled region of columns with the sizes", () => {
    render(
      <M.DashboardColumns columnWidth={240} gap="1rem" maxHeight={400} fill>
        <M.DashboardColumn title="To do" count={2}>
          <M.Card>Write spec</M.Card>
          <M.Card>Review</M.Card>
        </M.DashboardColumn>
        <M.DashboardColumn title="Done" />
      </M.DashboardColumns>,
    );
    const board = screen.getByRole("region", { name: "Board" });
    expect(board).toHaveAttribute("data-minerva", "dashboard-columns");
    expect(board).toHaveClass("mn-dashboard-columns", "mn-fill");
    expect(board.style.getPropertyValue("--dashboard-column-width")).toBe(
      "240px",
    );
    expect(board.style.getPropertyValue("--dashboard-gap")).toBe("1rem");
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
      <M.DashboardColumn
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
    rerender(<M.DashboardColumn title="Ideas" color="#7c3aed" />);
    column = screen.getByRole("group", { name: "Ideas" });
    expect(column).not.toHaveAttribute("data-color");
    expect(column.style.getPropertyValue("--dashboard-column-color")).toBe(
      "#7c3aed",
    );
  });

  it("is labelled by a rich title and its count", () => {
    render(
      <M.DashboardColumn title={<strong>Blocked</strong>} count={3}>
        <M.Card>Card</M.Card>
      </M.DashboardColumn>,
    );
    expect(screen.getByRole("group", { name: "Blocked 3" })).toBeTruthy();
  });

  it("translates the labels", () => {
    render(
      <M.ConfigProvider locale={{ language: "zh" }}>
        <M.DashboardColumns>
          <M.DashboardColumn title="待办" count={3} />
        </M.DashboardColumns>
      </M.ConfigProvider>,
    );
    expect(screen.getByRole("region", { name: "分栏面板" })).toBeTruthy();
    expect(screen.getByRole("group", { name: "待办，3 项" })).toBeTruthy();
    expect(screen.getByText("暂无项目")).toBeTruthy();
  });
});

describe("Taro DashboardColumns drag and drop", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  const place = (element: Element, box: [number, number, number, number]) => {
    const [left, top, width, height] = box;
    element.getBoundingClientRect = () =>
      ({
        left,
        top,
        width,
        height,
        right: left + width,
        bottom: top + height,
        x: left,
        y: top,
        toJSON: () => ({}),
      }) as DOMRect;
  };

  /** Two 200px columns of 50px cards: "todo" (a, b) and "done" (c) */
  const renderBoard = (canDrop?: (move: M.DashboardCardMove) => boolean) => {
    const onCardMove = vi.fn();
    const { container } = render(
      <M.DashboardColumns draggable onCardMove={onCardMove} canDrop={canDrop}>
        <M.DashboardColumn title="To do" value="todo">
          <M.DashboardCard value="a">Write spec</M.DashboardCard>
          <M.DashboardCard value="b">Review</M.DashboardCard>
        </M.DashboardColumn>
        <M.DashboardColumn title="Done" value="done">
          <M.DashboardCard value="c">Ship</M.DashboardCard>
        </M.DashboardColumn>
      </M.DashboardColumns>,
    );
    const board = screen.getByRole("region");
    place(board, [0, 0, 500, 400]);
    board.querySelectorAll("[data-dashboard-column]").forEach((column, i) => {
      place(column, [i * 220, 0, 200, 400]);
      column
        .querySelectorAll("[data-dashboard-card]")
        .forEach((card, j) => place(card, [i * 220, 40 + j * 60, 200, 50]));
    });
    const card = (value: string) =>
      container.querySelector<HTMLElement>(`[data-dashboard-card="${value}"]`)!;
    return { board, card, onCardMove, container };
  };

  const touch = (x: number, y: number) => ({
    touches: [{ clientX: x, clientY: y }],
    changedTouches: [{ clientX: x, clientY: y }],
  });

  it("keys the columns and cards", () => {
    const { card } = renderBoard();
    expect(screen.getByRole("group", { name: "To do" })).toHaveAttribute(
      "data-dashboard-column",
      "todo",
    );
    expect(card("a")).toHaveClass("mn-dashboard-card", "mn-draggable");
    expect(card("a")).toHaveAttribute("data-minerva", "dashboard-card");
  });

  it("moves a card with a long press and drag", () => {
    vi.useFakeTimers();
    const { board, card, onCardMove, container } = renderBoard();
    fireEvent.touchStart(card("a"), touch(100, 60));
    act(() => {
      vi.advanceTimersByTime(400);
    });
    expect(board).toHaveClass("mn-dragging");
    expect(card("a")).toHaveClass("mn-dragging");
    expect(
      container.querySelector(".mn-dashboard-columns__ghost"),
    ).toHaveTextContent("Write spec");
    fireEvent.touchMove(card("a"), touch(300, 120));
    expect(screen.getByRole("group", { name: "Done" })).toHaveClass(
      "mn-drop-target",
    );
    const line = container.querySelector<HTMLElement>(
      ".mn-dashboard-columns__drop-line",
    )!;
    // below "c" (40..90)
    expect(line.style.top).toBe("93px");
    fireEvent.touchEnd(card("a"), touch(300, 120));
    expect(onCardMove).toHaveBeenCalledExactlyOnceWith({
      cardKey: "a",
      fromColumn: "todo",
      fromIndex: 0,
      toColumn: "done",
      toIndex: 1,
    });
    expect(board).not.toHaveClass("mn-dragging");
    expect(container.querySelector(".mn-dashboard-columns__ghost")).toBeNull();
  });

  it("scrolls instead when the finger moves before the long press", () => {
    vi.useFakeTimers();
    const { board, card, onCardMove } = renderBoard();
    fireEvent.touchStart(card("a"), touch(100, 60));
    fireEvent.touchMove(card("a"), touch(100, 90));
    act(() => {
      vi.advanceTimersByTime(400);
    });
    expect(board).not.toHaveClass("mn-dragging");
    fireEvent.touchEnd(card("a"), touch(100, 90));
    expect(onCardMove).not.toHaveBeenCalled();
  });

  it("does not drop where canDrop refuses", () => {
    vi.useFakeTimers();
    const { card, onCardMove } = renderBoard(
      (move) => move.toColumn !== "done",
    );
    fireEvent.touchStart(card("a"), touch(100, 60));
    act(() => {
      vi.advanceTimersByTime(400);
    });
    fireEvent.touchMove(card("a"), touch(300, 120));
    expect(screen.getByRole("group", { name: "Done" })).not.toHaveClass(
      "mn-drop-target",
    );
    fireEvent.touchEnd(card("a"), touch(300, 120));
    expect(onCardMove).not.toHaveBeenCalled();
  });
});

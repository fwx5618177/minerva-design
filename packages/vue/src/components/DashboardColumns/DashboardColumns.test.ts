import { h } from "vue";
import { fireEvent, render, screen, within } from "@testing-library/vue";
import { describe, expect, it, vi } from "vitest";
import ConfigProvider from "../../config/ConfigProvider.vue";
import { DashboardColumns, DashboardCard, DashboardColumn } from ".";

describe("DashboardColumns", () => {
  it("renders a labelled, focusable region with the sizes", () => {
    render(DashboardColumns, {
      props: { columnWidth: 240, gap: "1rem", maxHeight: 400 },
      slots: { default: () => h(DashboardColumn, { title: "To do" }) },
    });
    const board = screen.getByRole("region", { name: "Board" });
    expect(board).toHaveAttribute("tabindex", "0");
    expect(board).toHaveAttribute("data-minerva", "dashboard-columns");
    expect(board.style.getPropertyValue("--dashboard-column-width")).toBe(
      "240px",
    );
    expect(board.style.getPropertyValue("--dashboard-gap")).toBe("1rem");
    expect(board.style.maxHeight).toBe("400px");
  });

  it("accepts a custom label and fill", () => {
    render(DashboardColumns, {
      props: { "aria-label": "Sprint 12", fill: true, height: "60vh" },
    });
    const board = screen.getByRole("region", { name: "Sprint 12" });
    expect(board.className).toMatch(/fill/);
    expect(board.style.height).toBe("60vh");
  });

  it("accepts a custom column label", () => {
    render(DashboardColumn, {
      props: { title: "To do", count: 2, "aria-label": "Backlog" },
    });
    expect(screen.getByRole("group", { name: "Backlog" })).toBeTruthy();
  });
});

describe("DashboardColumn", () => {
  it("is a group named by its title and count, with a list of cards", () => {
    render(DashboardColumn, {
      props: { title: "To do", count: 2 },
      slots: {
        default: () => [h("div", "Write spec"), h("div", "Review")],
      },
    });
    const column = screen.getByRole("group", { name: "To do, 2 items" });
    const items = within(within(column).getByRole("list")).getAllByRole(
      "listitem",
    );
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent("Write spec");
    expect(within(column).getByText("2")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    expect(screen.queryByText("No items")).toBeNull();
  });

  it("flattens fragments and drops v-if comments", () => {
    render(DashboardColumn, {
      props: { title: "Doing", count: 1 },
      slots: {
        default: () => [[h("div", "A"), h("div", "B")], null],
      },
    });
    expect(
      screen.getByRole("group", { name: "Doing, 1 item" }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  it("is labelled by a rich title slot and its count", () => {
    render(DashboardColumn, {
      props: { count: 3 },
      slots: { title: () => h("strong", "Blocked") },
    });
    expect(
      screen.getByRole("group", { name: "Blocked 3" }),
    ).toBeInTheDocument();
  });

  it("shows the default, prop or slotted empty content", async () => {
    const { rerender } = render(DashboardColumn, { props: { title: "Done" } });
    expect(screen.getByText("No items")).toBeInTheDocument();
    expect(screen.queryByRole("list")).toBeNull();
    await rerender({ title: "Done", empty: "Nothing shipped" });
    expect(screen.getByText("Nothing shipped")).toBeInTheDocument();
  });

  it("renders the description, actions and footer", () => {
    render(DashboardColumn, {
      props: { title: "Ideas", description: "Not triaged" },
      slots: {
        actions: () => h("button", { type: "button" }, "Add"),
        footer: () => h("button", { type: "button" }, "Add card"),
      },
    });
    const column = screen.getByRole("group", { name: "Ideas" });
    expect(within(column).getByText("Not triaged")).toBeInTheDocument();
    expect(within(column).getByRole("button", { name: "Add" })).toBeTruthy();
    expect(
      within(column).getByRole("button", { name: "Add card" }),
    ).toBeTruthy();
  });

  it("names a theme accent with data-color and sets a custom color", async () => {
    const { rerender } = render(DashboardColumn, {
      props: { title: "Done", color: "success" },
    });
    let column = screen.getByRole("group", { name: "Done" });
    expect(column).toHaveAttribute("data-color", "success");
    expect(column.querySelector('[data-part="indicator"]')).not.toBeNull();
    await rerender({ title: "Done", color: "#7c3aed" });
    column = screen.getByRole("group", { name: "Done" });
    expect(column).not.toHaveAttribute("data-color");
    expect(column.style.getPropertyValue("--dashboard-column-color")).toBe(
      "#7c3aed",
    );
  });

  it("translates the labels and the empty text", () => {
    render({
      render: () =>
        h(ConfigProvider, { locale: { language: "zh" } }, () =>
          h(DashboardColumns, null, () =>
            h(DashboardColumn, { title: "待办", count: 3 }),
          ),
        ),
    });
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
    width: number,
    height: number,
  ) => {
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
  const renderBoard = (props: Record<string, unknown> = {}) => {
    const view = render(DashboardColumns, {
      props: { draggable: true, ...props },
      slots: {
        default: () => [
          h(DashboardColumn, { title: "To do", value: "todo" }, () => [
            h(DashboardCard, { value: "a" }, () => "Write spec"),
            h(
              DashboardCard,
              { value: "b", label: "Review the spec" },
              () => "Review",
            ),
          ]),
          h(DashboardColumn, { title: "Done", value: "done" }, () => [
            h(DashboardCard, { value: "c" }, () => "Ship"),
          ]),
        ],
      },
    });
    const board = screen.getByRole("region");
    box(board, 0, 0, 500, 400);
    board.querySelectorAll("[data-dashboard-column]").forEach((column, i) => {
      box(column, i * 220, 0, 200, 400);
      column
        .querySelectorAll("[data-dashboard-card]")
        .forEach((card, j) => box(card, i * 220, 40 + j * 60, 200, 50));
    });
    return view;
  };

  const pointer = (type: string, target: EventTarget, x: number, y: number) =>
    target.dispatchEvent(
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

  it("renders plain cards by default", () => {
    render(DashboardColumns, {
      slots: {
        default: () =>
          h(DashboardColumn, { title: "To do", value: "todo" }, () =>
            h(DashboardCard, { value: "a" }, () => "Write spec"),
          ),
      },
    });
    const card = screen.getByText("Write spec");
    expect(card).toHaveAttribute("data-dashboard-card", "a");
    expect(card).not.toHaveAttribute("tabindex");
    expect(screen.getByRole("group")).toHaveAttribute(
      "data-dashboard-column",
      "todo",
    );
    expect(document.querySelector("[data-dashboard-layer]")).toBeNull();
  });

  it("emits card-move for a pointer drag to another column", () => {
    const { emitted } = renderBoard();
    expect(
      screen.getByRole("button", { name: "Review the spec" }),
    ).toHaveAccessibleDescription(/Press Space or Enter/);
    pointer("pointerdown", screen.getByText("Write spec"), 100, 60);
    pointer("pointermove", document, 110, 60);
    pointer("pointermove", document, 300, 120);
    pointer("pointerup", document, 300, 120);
    expect(emitted("card-move")).toEqual([
      [
        {
          cardKey: "a",
          fromColumn: "todo",
          fromIndex: 0,
          toColumn: "done",
          toIndex: 1,
        },
      ],
    ]);
  });

  it("moves a card with the keyboard and announces it", async () => {
    const { emitted } = renderBoard();
    const card = screen.getByRole("button", { name: "Write spec" });
    card.focus();
    await fireEvent.keyDown(card, { key: " " });
    expect(screen.getByRole("status")).toHaveTextContent(
      "Picked up Write spec: position 1 of 2 in To do.",
    );
    await fireEvent.keyDown(card, { key: "ArrowRight" });
    await fireEvent.keyDown(card, { key: "Enter" });
    expect(emitted("card-move")).toEqual([
      [
        {
          cardKey: "a",
          fromColumn: "todo",
          fromIndex: 0,
          toColumn: "done",
          toIndex: 0,
        },
      ],
    ]);
  });

  it("cancels with Escape and respects canDrop", async () => {
    const canDrop = vi.fn(() => false);
    const { emitted } = renderBoard({ canDrop });
    const card = screen.getByRole("button", { name: "Write spec" });
    card.focus();
    await fireEvent.keyDown(card, { key: " " });
    await fireEvent.keyDown(card, { key: "ArrowRight" });
    await fireEvent.keyDown(card, { key: " " });
    expect(canDrop).toHaveBeenCalled();
    await fireEvent.keyDown(card, { key: " " });
    await fireEvent.keyDown(card, { key: "Escape" });
    expect(screen.getByRole("status")).toHaveTextContent(
      "Move cancelled: Write spec stays in To do.",
    );
    expect(emitted("card-move")).toBeUndefined();
  });

  it("removes the drag layer when draggable turns off", async () => {
    const { rerender } = render(DashboardColumns, {
      props: { draggable: true },
    });
    expect(document.querySelector("[data-dashboard-layer]")).not.toBeNull();
    await rerender({ draggable: false });
    expect(document.querySelector("[data-dashboard-layer]")).toBeNull();
  });
});

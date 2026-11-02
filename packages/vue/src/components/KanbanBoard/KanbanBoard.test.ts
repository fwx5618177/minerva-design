import { h } from "vue";
import { render, screen, within } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import ConfigProvider from "../../config/ConfigProvider.vue";
import { KanbanBoard, KanbanColumn } from ".";

describe("KanbanBoard", () => {
  it("renders a labelled, focusable region with the sizes", () => {
    render(KanbanBoard, {
      props: { columnWidth: 240, gap: "1rem", maxHeight: 400 },
      slots: { default: () => h(KanbanColumn, { title: "To do" }) },
    });
    const board = screen.getByRole("region", { name: "Board" });
    expect(board).toHaveAttribute("tabindex", "0");
    expect(board).toHaveAttribute("data-minerva", "kanban-board");
    expect(board.style.getPropertyValue("--kanban-column-width")).toBe("240px");
    expect(board.style.getPropertyValue("--kanban-gap")).toBe("1rem");
    expect(board.style.maxHeight).toBe("400px");
  });

  it("accepts a custom label and fill", () => {
    render(KanbanBoard, {
      props: { "aria-label": "Sprint 12", fill: true, height: "60vh" },
    });
    const board = screen.getByRole("region", { name: "Sprint 12" });
    expect(board.className).toMatch(/fill/);
    expect(board.style.height).toBe("60vh");
  });

  it("accepts a custom column label", () => {
    render(KanbanColumn, {
      props: { title: "To do", count: 2, "aria-label": "Backlog" },
    });
    expect(screen.getByRole("group", { name: "Backlog" })).toBeTruthy();
  });
});

describe("KanbanColumn", () => {
  it("is a group named by its title and count, with a list of cards", () => {
    render(KanbanColumn, {
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
    render(KanbanColumn, {
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
    render(KanbanColumn, {
      props: { count: 3 },
      slots: { title: () => h("strong", "Blocked") },
    });
    expect(
      screen.getByRole("group", { name: "Blocked 3" }),
    ).toBeInTheDocument();
  });

  it("shows the default, prop or slotted empty content", async () => {
    const { rerender } = render(KanbanColumn, { props: { title: "Done" } });
    expect(screen.getByText("No items")).toBeInTheDocument();
    expect(screen.queryByRole("list")).toBeNull();
    await rerender({ title: "Done", empty: "Nothing shipped" });
    expect(screen.getByText("Nothing shipped")).toBeInTheDocument();
  });

  it("renders the description, actions and footer", () => {
    render(KanbanColumn, {
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
    const { rerender } = render(KanbanColumn, {
      props: { title: "Done", color: "success" },
    });
    let column = screen.getByRole("group", { name: "Done" });
    expect(column).toHaveAttribute("data-color", "success");
    expect(column.querySelector('[data-part="indicator"]')).not.toBeNull();
    await rerender({ title: "Done", color: "#7c3aed" });
    column = screen.getByRole("group", { name: "Done" });
    expect(column).not.toHaveAttribute("data-color");
    expect(column.style.getPropertyValue("--kanban-column-color")).toBe(
      "#7c3aed",
    );
  });

  it("translates the labels and the empty text", () => {
    render({
      render: () =>
        h(ConfigProvider, { locale: { language: "zh" } }, () =>
          h(KanbanBoard, null, () =>
            h(KanbanColumn, { title: "待办", count: 3 }),
          ),
        ),
    });
    expect(screen.getByRole("region", { name: "看板" })).toBeInTheDocument();
    expect(
      screen.getByRole("group", { name: "待办，3 项" }),
    ).toBeInTheDocument();
    expect(screen.getByText("暂无项目")).toBeInTheDocument();
  });
});

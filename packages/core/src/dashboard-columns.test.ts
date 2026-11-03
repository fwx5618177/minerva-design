import { describe, expect, it } from "vitest";
import {
  isDashboardNoop,
  dashboardAccent,
  dashboardAccentValue,
  dashboardCardMove,
  dashboardCount,
  dashboardFind,
  dashboardInsertIndex,
  dashboardKeyAction,
  dashboardKeyboardTarget,
  dashboardLength,
  dashboardSlots,
  moveDashboardCard,
  type DashboardLayoutColumn,
} from "./dashboard-columns";
import * as dashboard from "./dashboard-columns";

describe("deprecated kanban aliases", () => {
  it("are the dashboard exports", () => {
    expect(dashboard.moveKanbanCard).toBe(moveDashboardCard);
    expect(dashboard.kanbanKeyAction).toBe(dashboardKeyAction);
    expect(dashboard.isKanbanNoop).toBe(isDashboardNoop);
    expect(dashboard.KANBAN_COLORS).toBe(dashboard.DASHBOARD_COLORS);
    expect(dashboard.KANBAN_GAP).toBe(dashboard.DASHBOARD_GAP);
  });
});

describe("dashboard", () => {
  it("splits theme colors from custom CSS colors", () => {
    expect(dashboardAccent("success")).toEqual({ scheme: "success" });
    expect(dashboardAccent(" #7c3aed ")).toEqual({ custom: "#7c3aed" });
    expect(dashboardAccent("")).toEqual({});
    expect(dashboardAccent(undefined)).toEqual({});
    expect(dashboardAccentValue("danger")).toBe("var(--danger-color)");
    expect(dashboardAccentValue("neutral")).toBe("var(--text-muted-color)");
    expect(dashboardAccentValue("rgb(1, 2, 3)")).toBe("rgb(1, 2, 3)");
    expect(dashboardAccentValue(null)).toBe("");
  });

  it("keeps valid counts only", () => {
    expect(dashboardCount(3)).toBe(3);
    expect(dashboardCount(0)).toBe(0);
    expect(dashboardCount(2.7)).toBe(2);
    expect(dashboardCount("4")).toBe(4);
    expect(dashboardCount(-1)).toBeUndefined();
    expect(dashboardCount(Number.NaN)).toBeUndefined();
    expect(dashboardCount(undefined)).toBeUndefined();
    expect(dashboardCount("")).toBeUndefined();
  });

  it("resolves lengths", () => {
    expect(dashboardLength(280)).toBe("280px");
    expect(dashboardLength("18rem")).toBe("18rem");
    expect(dashboardLength("240")).toBe("240px");
    expect(dashboardLength("")).toBeUndefined();
    expect(dashboardLength(undefined)).toBeUndefined();
    expect(dashboardLength(Number.POSITIVE_INFINITY)).toBeUndefined();
  });
});

describe("dashboard drag and drop", () => {
  const layout: DashboardLayoutColumn[] = [
    { key: "todo", cards: ["a", "b", "c"] },
    { key: "doing", cards: ["d"] },
    { key: "done", cards: [] },
  ];

  it("finds cards and counts the positions of a column", () => {
    expect(dashboardFind(layout, "b")).toEqual({ column: "todo", index: 1 });
    expect(dashboardFind(layout, "x")).toBeUndefined();
    expect(dashboardSlots(layout, "a", "todo")).toBe(3);
    expect(dashboardSlots(layout, "a", "doing")).toBe(2);
    expect(dashboardSlots(layout, "a", "done")).toBe(1);
    expect(dashboardSlots(layout, "a", "nope")).toBe(0);
  });

  it("builds moves with the final index, clamped", () => {
    expect(
      dashboardCardMove(layout, "a", { column: "doing", index: 9 }),
    ).toEqual({
      cardKey: "a",
      fromColumn: "todo",
      fromIndex: 0,
      toColumn: "doing",
      toIndex: 1,
    });
    const same = dashboardCardMove(layout, "b", { column: "todo", index: 1 })!;
    expect(isDashboardNoop(same)).toBe(true);
    expect(dashboardCardMove(layout, "x", { column: "todo", index: 0 })).toBe(
      undefined,
    );
    expect(dashboardCardMove(layout, "a", { column: "nope", index: 0 })).toBe(
      undefined,
    );
  });

  it("computes the insertion index from the midpoints", () => {
    expect(dashboardInsertIndex([10, 30, 50], 5)).toBe(0);
    expect(dashboardInsertIndex([10, 30, 50], 31)).toBe(2);
    expect(dashboardInsertIndex([10, 30, 50], 99)).toBe(3);
    expect(dashboardInsertIndex([], 99)).toBe(0);
  });

  it("resolves keyboard moves within and across columns", () => {
    const at = { column: "todo", index: 1 };
    expect(dashboardKeyboardTarget(layout, "b", at, "up")).toEqual({
      column: "todo",
      index: 0,
    });
    expect(dashboardKeyboardTarget(layout, "b", at, "down")).toEqual({
      column: "todo",
      index: 2,
    });
    expect(
      dashboardKeyboardTarget(
        layout,
        "b",
        { column: "todo", index: 2 },
        "down",
      ),
    ).toBeUndefined();
    expect(dashboardKeyboardTarget(layout, "b", at, "left")).toBeUndefined();
    expect(dashboardKeyboardTarget(layout, "b", at, "right")).toEqual({
      column: "doing",
      index: 1,
    });
    // the index is clamped to the (empty) column
    expect(
      dashboardKeyboardTarget(
        layout,
        "b",
        { column: "doing", index: 1 },
        "right",
      ),
    ).toEqual({ column: "done", index: 0 });
  });

  it("skips the positions canDrop rejects", () => {
    const accept = (move: { toColumn: string }) => move.toColumn !== "doing";
    expect(
      dashboardKeyboardTarget(
        layout,
        "b",
        { column: "todo", index: 1 },
        "right",
        accept,
      ),
    ).toEqual({ column: "done", index: 0 });
    // the original position stays reachable
    expect(
      dashboardKeyboardTarget(
        layout,
        "b",
        { column: "todo", index: 0 },
        "down",
        () => false,
      ),
    ).toEqual({ column: "todo", index: 1 });
  });

  it("maps keys to actions (arrows follow the reading direction)", () => {
    expect(dashboardKeyAction(" ")).toBe("toggle");
    expect(dashboardKeyAction("Enter")).toBe("toggle");
    expect(dashboardKeyAction("Escape")).toBe("cancel");
    expect(dashboardKeyAction("ArrowUp")).toBe("up");
    expect(dashboardKeyAction("ArrowDown")).toBe("down");
    expect(dashboardKeyAction("ArrowLeft")).toBe("left");
    expect(dashboardKeyAction("ArrowLeft", true)).toBe("right");
    expect(dashboardKeyAction("ArrowRight", true)).toBe("left");
    expect(dashboardKeyAction("a")).toBeUndefined();
  });

  it("applies a move to plain lists without mutating them", () => {
    const lists = {
      todo: [{ id: 1 }, { id: 2 }, { id: 3 }],
      done: [{ id: 4 }],
    };
    const within = moveDashboardCard(
      lists,
      {
        cardKey: "1",
        fromColumn: "todo",
        fromIndex: 0,
        toColumn: "todo",
        toIndex: 2,
      },
      (item) => item.id,
    );
    expect(within.todo!.map((item) => item.id)).toEqual([2, 3, 1]);
    expect(lists.todo.map((item) => item.id)).toEqual([1, 2, 3]);
    const across = moveDashboardCard(
      lists,
      {
        cardKey: "2",
        fromColumn: "todo",
        fromIndex: 1,
        toColumn: "done",
        toIndex: 0,
      },
      (item) => item.id,
    );
    expect(across.todo!.map((item) => item.id)).toEqual([1, 3]);
    expect(across.done!.map((item) => item.id)).toEqual([2, 4]);
  });
});

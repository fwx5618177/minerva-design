import { describe, expect, it } from "vitest";
import {
  isKanbanNoop,
  kanbanAccent,
  kanbanAccentValue,
  kanbanCardMove,
  kanbanCount,
  kanbanFind,
  kanbanInsertIndex,
  kanbanKeyAction,
  kanbanKeyboardTarget,
  kanbanLength,
  kanbanSlots,
  moveKanbanCard,
  type KanbanLayoutColumn,
} from "./kanban";

describe("kanban", () => {
  it("splits theme colors from custom CSS colors", () => {
    expect(kanbanAccent("success")).toEqual({ scheme: "success" });
    expect(kanbanAccent(" #7c3aed ")).toEqual({ custom: "#7c3aed" });
    expect(kanbanAccent("")).toEqual({});
    expect(kanbanAccent(undefined)).toEqual({});
    expect(kanbanAccentValue("danger")).toBe("var(--danger-color)");
    expect(kanbanAccentValue("neutral")).toBe("var(--text-muted-color)");
    expect(kanbanAccentValue("rgb(1, 2, 3)")).toBe("rgb(1, 2, 3)");
    expect(kanbanAccentValue(null)).toBe("");
  });

  it("keeps valid counts only", () => {
    expect(kanbanCount(3)).toBe(3);
    expect(kanbanCount(0)).toBe(0);
    expect(kanbanCount(2.7)).toBe(2);
    expect(kanbanCount("4")).toBe(4);
    expect(kanbanCount(-1)).toBeUndefined();
    expect(kanbanCount(Number.NaN)).toBeUndefined();
    expect(kanbanCount(undefined)).toBeUndefined();
    expect(kanbanCount("")).toBeUndefined();
  });

  it("resolves lengths", () => {
    expect(kanbanLength(280)).toBe("280px");
    expect(kanbanLength("18rem")).toBe("18rem");
    expect(kanbanLength("240")).toBe("240px");
    expect(kanbanLength("")).toBeUndefined();
    expect(kanbanLength(undefined)).toBeUndefined();
    expect(kanbanLength(Number.POSITIVE_INFINITY)).toBeUndefined();
  });
});

describe("kanban drag and drop", () => {
  const layout: KanbanLayoutColumn[] = [
    { key: "todo", cards: ["a", "b", "c"] },
    { key: "doing", cards: ["d"] },
    { key: "done", cards: [] },
  ];

  it("finds cards and counts the positions of a column", () => {
    expect(kanbanFind(layout, "b")).toEqual({ column: "todo", index: 1 });
    expect(kanbanFind(layout, "x")).toBeUndefined();
    expect(kanbanSlots(layout, "a", "todo")).toBe(3);
    expect(kanbanSlots(layout, "a", "doing")).toBe(2);
    expect(kanbanSlots(layout, "a", "done")).toBe(1);
    expect(kanbanSlots(layout, "a", "nope")).toBe(0);
  });

  it("builds moves with the final index, clamped", () => {
    expect(kanbanCardMove(layout, "a", { column: "doing", index: 9 })).toEqual({
      cardKey: "a",
      fromColumn: "todo",
      fromIndex: 0,
      toColumn: "doing",
      toIndex: 1,
    });
    const same = kanbanCardMove(layout, "b", { column: "todo", index: 1 })!;
    expect(isKanbanNoop(same)).toBe(true);
    expect(kanbanCardMove(layout, "x", { column: "todo", index: 0 })).toBe(
      undefined,
    );
    expect(kanbanCardMove(layout, "a", { column: "nope", index: 0 })).toBe(
      undefined,
    );
  });

  it("computes the insertion index from the midpoints", () => {
    expect(kanbanInsertIndex([10, 30, 50], 5)).toBe(0);
    expect(kanbanInsertIndex([10, 30, 50], 31)).toBe(2);
    expect(kanbanInsertIndex([10, 30, 50], 99)).toBe(3);
    expect(kanbanInsertIndex([], 99)).toBe(0);
  });

  it("resolves keyboard moves within and across columns", () => {
    const at = { column: "todo", index: 1 };
    expect(kanbanKeyboardTarget(layout, "b", at, "up")).toEqual({
      column: "todo",
      index: 0,
    });
    expect(kanbanKeyboardTarget(layout, "b", at, "down")).toEqual({
      column: "todo",
      index: 2,
    });
    expect(
      kanbanKeyboardTarget(layout, "b", { column: "todo", index: 2 }, "down"),
    ).toBeUndefined();
    expect(kanbanKeyboardTarget(layout, "b", at, "left")).toBeUndefined();
    expect(kanbanKeyboardTarget(layout, "b", at, "right")).toEqual({
      column: "doing",
      index: 1,
    });
    // the index is clamped to the (empty) column
    expect(
      kanbanKeyboardTarget(layout, "b", { column: "doing", index: 1 }, "right"),
    ).toEqual({ column: "done", index: 0 });
  });

  it("skips the positions canDrop rejects", () => {
    const accept = (move: { toColumn: string }) => move.toColumn !== "doing";
    expect(
      kanbanKeyboardTarget(
        layout,
        "b",
        { column: "todo", index: 1 },
        "right",
        accept,
      ),
    ).toEqual({ column: "done", index: 0 });
    // the original position stays reachable
    expect(
      kanbanKeyboardTarget(
        layout,
        "b",
        { column: "todo", index: 0 },
        "down",
        () => false,
      ),
    ).toEqual({ column: "todo", index: 1 });
  });

  it("maps keys to actions (arrows follow the reading direction)", () => {
    expect(kanbanKeyAction(" ")).toBe("toggle");
    expect(kanbanKeyAction("Enter")).toBe("toggle");
    expect(kanbanKeyAction("Escape")).toBe("cancel");
    expect(kanbanKeyAction("ArrowUp")).toBe("up");
    expect(kanbanKeyAction("ArrowDown")).toBe("down");
    expect(kanbanKeyAction("ArrowLeft")).toBe("left");
    expect(kanbanKeyAction("ArrowLeft", true)).toBe("right");
    expect(kanbanKeyAction("ArrowRight", true)).toBe("left");
    expect(kanbanKeyAction("a")).toBeUndefined();
  });

  it("applies a move to plain lists without mutating them", () => {
    const lists = {
      todo: [{ id: 1 }, { id: 2 }, { id: 3 }],
      done: [{ id: 4 }],
    };
    const within = moveKanbanCard(
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
    const across = moveKanbanCard(
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

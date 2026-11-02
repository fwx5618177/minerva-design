import { afterEach, describe, expect, it, vi } from "vitest";
import type { KanbanCardMove } from "@minerva/core";
import {
  createKanbanDrag,
  kanbanDataAdapter,
  type KanbanDrag,
  type KanbanDragOptions,
} from "./kanban-drag";

interface Box {
  left: number;
  top: number;
  width: number;
  height: number;
}

const place = (element: Element, { left, top, width, height }: Box) => {
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

/**
 * A board in the data-attribute markup of React / Vue / Angular, laid out
 * as two 200px columns ("todo": a, b; "done": c) of 50px cards
 */
function board(
  columns: Record<string, string[]> = { todo: ["a", "b"], done: ["c"] },
) {
  const root = document.createElement("div");
  root.setAttribute("data-minerva", "kanban-board");
  place(root, { left: 0, top: 0, width: 500, height: 400 });
  Object.entries(columns).forEach(([key, cards], columnIndex) => {
    const left = columnIndex * 220;
    const column = document.createElement("section");
    column.setAttribute("data-kanban-column", key);
    place(column, { left, top: 0, width: 200, height: 400 });
    const title = document.createElement("h3");
    title.setAttribute("data-minerva", "kanban-column");
    title.setAttribute("data-part", "title");
    title.textContent = key.toUpperCase();
    const list = document.createElement("div");
    list.setAttribute("data-minerva", "kanban-column");
    list.setAttribute("data-part", "list");
    place(list, { left, top: 30, width: 200, height: 370 });
    cards.forEach((value, index) => {
      const card = document.createElement("div");
      card.setAttribute("data-kanban-card", value);
      card.tabIndex = 0;
      card.textContent = `Card ${value}`;
      place(card, { left, top: 40 + index * 60, width: 200, height: 50 });
      list.append(card);
    });
    column.append(title, list);
    root.append(column);
  });
  document.body.append(root);
  return root;
}

let drag: KanbanDrag | undefined;

function attach(root: HTMLElement, options: Partial<KanbanDragOptions> = {}) {
  const onMove = vi.fn<(move: KanbanCardMove) => void>();
  drag = createKanbanDrag(root, {
    ...kanbanDataAdapter(root),
    scroller: () => root,
    hintId: "hint",
    enabled: () => true,
    onMove,
    t: (key, params) => `${key}${params ? ` ${JSON.stringify(params)}` : ""}`,
    ...options,
  });
  return onMove;
}

const card = (root: HTMLElement, key: string) =>
  root.querySelector<HTMLElement>(`[data-kanban-card="${key}"]`)!;

const pointer = (
  type: string,
  target: EventTarget,
  x: number,
  y: number,
  pointerType = "mouse",
) =>
  target.dispatchEvent(
    new PointerEvent(type, {
      bubbles: true,
      composed: true,
      cancelable: true,
      clientX: x,
      clientY: y,
      pointerId: 1,
      pointerType,
      isPrimary: true,
      button: 0,
    }),
  );

const key = (target: EventTarget, value: string) =>
  target.dispatchEvent(
    new KeyboardEvent("keydown", {
      key: value,
      bubbles: true,
      composed: true,
      cancelable: true,
    }),
  );

const live = (root: HTMLElement) =>
  root.querySelector('[data-kanban-layer] [role="status"]')!.textContent;

afterEach(() => {
  drag?.destroy();
  drag = undefined;
  document.body.innerHTML = "";
  vi.useRealTimers();
});

describe("kanbanDataAdapter", () => {
  it("reads columns, cards, keys, labels and bodies from the markup", () => {
    const root = board();
    const adapter = kanbanDataAdapter(root);
    const [todo, done] = adapter.columns();
    expect(adapter.columnKey(todo!)).toBe("todo");
    expect(adapter.columnLabel(done!)).toBe("DONE");
    expect(adapter.cards(todo!).map(adapter.cardKey)).toEqual(["a", "b"]);
    expect(adapter.cardLabel(card(root, "c"))).toBe("Card c");
    expect(adapter.body(todo!)?.dataset.part).toBe("list");
  });
});

describe("createKanbanDrag: pointer", () => {
  it("reports the move of a card dragged with the mouse to another column", () => {
    const root = board();
    const onMove = attach(root);
    pointer("pointerdown", card(root, "a"), 100, 60);
    pointer("pointermove", document, 110, 60);
    expect(root.getAttribute("data-kanban-dragging")).toBe("pointer");
    expect(card(root, "a").getAttribute("data-kanban-dragging")).toBe(
      "pointer",
    );
    expect(root.querySelector("[data-kanban-ghost]")).not.toBeNull();
    // below the midpoint of "c" in "done"
    pointer("pointermove", document, 300, 120);
    expect(
      root
        .querySelector('[data-kanban-column="done"]')!
        .hasAttribute("data-kanban-drop-target"),
    ).toBe(true);
    expect(root.querySelector("[data-kanban-drop-line]")).not.toBeNull();
    pointer("pointerup", document, 300, 120);
    expect(onMove).toHaveBeenCalledExactlyOnceWith({
      cardKey: "a",
      fromColumn: "todo",
      fromIndex: 0,
      toColumn: "done",
      toIndex: 1,
    });
    expect(root.hasAttribute("data-kanban-dragging")).toBe(false);
    expect(root.querySelector("[data-kanban-ghost]")).toBeNull();
    expect(root.querySelector("[data-kanban-drop-target]")).toBeNull();
  });

  it("reorders within a column", () => {
    const root = board();
    const onMove = attach(root);
    pointer("pointerdown", card(root, "a"), 100, 60);
    pointer("pointermove", document, 100, 70);
    // below the midpoint of "b" (the only other card): last position
    pointer("pointermove", document, 100, 140);
    pointer("pointerup", document, 100, 140);
    expect(onMove).toHaveBeenCalledWith(
      expect.objectContaining({ toColumn: "todo", fromIndex: 0, toIndex: 1 }),
    );
  });

  it("ignores a click without movement and a drop in place", () => {
    const root = board();
    const onMove = attach(root);
    pointer("pointerdown", card(root, "a"), 100, 60);
    pointer("pointerup", document, 100, 60);
    expect(root.hasAttribute("data-kanban-dragging")).toBe(false);
    pointer("pointerdown", card(root, "a"), 100, 60);
    pointer("pointermove", document, 100, 66);
    pointer("pointerup", document, 100, 66);
    expect(onMove).not.toHaveBeenCalled();
  });

  it("cancels with Escape", () => {
    const root = board();
    const onMove = attach(root);
    pointer("pointerdown", card(root, "a"), 100, 60);
    pointer("pointermove", document, 300, 120);
    key(document, "Escape");
    expect(root.hasAttribute("data-kanban-dragging")).toBe(false);
    expect(live(root)).toContain("kanban.cancelled");
    pointer("pointerup", document, 300, 120);
    expect(onMove).not.toHaveBeenCalled();
  });

  it("does not drop where canDrop refuses", () => {
    const root = board();
    const canDrop = vi.fn((move: KanbanCardMove) => move.toColumn !== "done");
    const onMove = attach(root, { canDrop });
    pointer("pointerdown", card(root, "a"), 100, 60);
    pointer("pointermove", document, 300, 120);
    expect(root.querySelector("[data-kanban-drop-target]")).toBeNull();
    pointer("pointerup", document, 300, 120);
    expect(canDrop).toHaveBeenCalled();
    expect(onMove).not.toHaveBeenCalled();
  });

  it("picks a card up with a touch long press, not with a swipe", () => {
    vi.useFakeTimers();
    const root = board();
    const onMove = attach(root);
    pointer("pointerdown", card(root, "a"), 100, 60, "touch");
    pointer("pointermove", document, 100, 90, "touch");
    vi.advanceTimersByTime(300);
    expect(root.hasAttribute("data-kanban-dragging")).toBe(false);
    pointer("pointerup", document, 100, 90, "touch");

    pointer("pointerdown", card(root, "a"), 100, 60, "touch");
    vi.advanceTimersByTime(300);
    expect(root.getAttribute("data-kanban-dragging")).toBe("pointer");
    pointer("pointermove", document, 300, 50, "touch");
    pointer("pointerup", document, 300, 50, "touch");
    expect(onMove).toHaveBeenCalledWith(
      expect.objectContaining({ cardKey: "a", toColumn: "done", toIndex: 0 }),
    );
  });

  it("does not drag from a control inside a card", () => {
    const root = board();
    const onMove = attach(root);
    const button = document.createElement("button");
    card(root, "a").append(button);
    pointer("pointerdown", button, 100, 60);
    pointer("pointermove", document, 300, 120);
    pointer("pointerup", document, 300, 120);
    expect(root.hasAttribute("data-kanban-dragging")).toBe(false);
    expect(onMove).not.toHaveBeenCalled();
  });

  it("does nothing while disabled", () => {
    const root = board();
    const onMove = attach(root, { enabled: () => false });
    expect(root.querySelector("[data-kanban-layer]")).toBeNull();
    pointer("pointerdown", card(root, "a"), 100, 60);
    pointer("pointermove", document, 300, 120);
    pointer("pointerup", document, 300, 120);
    expect(root.hasAttribute("data-kanban-dragging")).toBe(false);
    expect(onMove).not.toHaveBeenCalled();
  });
});

describe("createKanbanDrag: keyboard", () => {
  it("picks up, moves and drops with the keyboard, announcing each step", () => {
    const root = board();
    const onMove = attach(root);
    expect(document.getElementById("hint")?.textContent).toBe(
      "kanban.dragHint",
    );
    const a = card(root, "a");
    a.focus();
    key(a, " ");
    expect(a.getAttribute("data-kanban-dragging")).toBe("keyboard");
    expect(live(root)).toContain("kanban.lifted");
    expect(live(root)).toContain('"position":1');
    key(a, "ArrowRight");
    expect(live(root)).toContain("kanban.over");
    expect(live(root)).toContain('"column":"DONE"');
    key(a, "ArrowDown");
    expect(live(root)).toContain('"position":2');
    key(a, "Enter");
    expect(onMove).toHaveBeenCalledExactlyOnceWith({
      cardKey: "a",
      fromColumn: "todo",
      fromIndex: 0,
      toColumn: "done",
      toIndex: 1,
    });
    expect(live(root)).toContain("kanban.dropped");
    expect(a.hasAttribute("data-kanban-dragging")).toBe(false);
  });

  it("cancels with Escape and on blur", () => {
    const root = board();
    const onMove = attach(root);
    const a = card(root, "a");
    a.focus();
    key(a, "Enter");
    key(a, "ArrowDown");
    key(a, "Escape");
    expect(a.hasAttribute("data-kanban-dragging")).toBe(false);
    expect(live(root)).toContain("kanban.cancelled");
    key(a, "Enter");
    a.blur();
    expect(a.hasAttribute("data-kanban-dragging")).toBe(false);
    expect(onMove).not.toHaveBeenCalled();
  });

  it("skips the positions canDrop refuses", () => {
    const root = board({ todo: ["a"], blocked: [], done: [] });
    const onMove = attach(root, {
      canDrop: (move) => move.toColumn !== "blocked",
    });
    const a = card(root, "a");
    a.focus();
    key(a, " ");
    key(a, "ArrowRight");
    key(a, " ");
    expect(onMove).toHaveBeenCalledWith(
      expect.objectContaining({ toColumn: "done", toIndex: 0 }),
    );
  });

  it("swaps Left / Right in right-to-left boards", () => {
    const root = board();
    root.dir = "rtl";
    const onMove = attach(root);
    const c = card(root, "c");
    c.focus();
    key(c, " ");
    key(c, "ArrowRight");
    key(c, " ");
    expect(onMove).toHaveBeenCalledWith(
      expect.objectContaining({ cardKey: "c", toColumn: "todo" }),
    );
  });
});

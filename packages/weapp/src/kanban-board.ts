// KanbanBoard / KanbanColumn / KanbanCard of the native WeChat build: a
// region around a scroll-view (scroll-x) laying out equal-width status
// columns; each column has an accent dot, a title, a count badge, an actions
// slot, a role=list body (default slot), translated empty text and a footer
// slot.
//
// Drag and drop (draggable boards): slotted columns and cards are separate
// native components, so they find their board through `relations` (board ↔
// column ↔ card, linked / unlinked). A long press on a KanbanCard picks it
// up: every linked column and card measures its root with its own
// createSelectorQuery (slotted nodes are outside the board's template), the
// board orders them by position (columns left to right, cards top to bottom)
// and hit-tests the finger with the shared core functions. A fixed copy of
// the card's label follows the finger, a fixed line and a highlighted column
// show the drop position. The board stays controlled: it emits `cardmove`.
import {
  isKanbanNoop,
  kanbanAccent,
  kanbanCardMove,
  kanbanCount,
  kanbanFind,
  kanbanInsertIndex,
  kanbanLength,
  type KanbanCardMove,
  type KanbanLayoutColumn,
  type KanbanPosition,
} from "@minerva/core";
import { nativeTranslate } from "./configuration";

type Instance = Pick<
  WechatMiniprogram.Component.TrivialInstance,
  "data" | "setData"
>;
/** A board, column or card instance (relations hand out method callers) */
type Node = Pick<
  WechatMiniprogram.Component.TrivialInstance,
  "data" | "setData" | "triggerEvent" | "createSelectorQuery"
>;
const flag = (value = false) => ({ type: Boolean, value });
const text = (value = "") => ({ type: String, value });
/** A length property: a number is pixels, a string any CSS length */
const length = () => ({
  type: null,
  optionalTypes: [Number, String],
  value: null,
});
const css = (entries: Record<string, string | undefined>) =>
  Object.entries(entries)
    .filter(([, value]) => value)
    .map(([key, value]) => `${key}:${value}`)
    .join(";");

// Relation targets: behaviors in WeChat (strings when the module is loaded
// outside a mini-program, e.g. by the build script)
const marker = (name: string) =>
  typeof Behavior === "function" ? Behavior({}) : `minerva-kanban-${name}`;
const boardMarker = marker("board");
const columnMarker = marker("column");
const cardMarker = marker("card");

/** A box in viewport coordinates */
interface Box {
  left: number;
  top: number;
  width: number;
  height: number;
}

interface Session {
  card: Node;
  key: string;
  layout: KanbanLayoutColumn[];
  columns: Map<string, { node: Node; box: Box }>;
  cards: Map<string, Box>;
  board: Box | null;
  target: KanbanPosition | null;
  grab: { x: number; y: number };
  last: { x: number; y: number };
  ready: boolean;
}

interface BoardState {
  columns: Set<Node>;
  cards: Set<Node>;
  session: Session | null;
}

const boards = new WeakMap<object, BoardState>();
/** The board of a linked card */
const boardOf = new WeakMap<object, Node>();
/** The column of a linked card */
const columnOf = new WeakMap<object, Node>();

function stateOf(board: object): BoardState {
  let state = boards.get(board);
  if (!state) {
    state = { columns: new Set(), cards: new Set(), session: null };
    boards.set(board, state);
  }
  return state;
}

const keyOf = (node: Node | undefined) => {
  const value: unknown = node?.data.value;
  return typeof value === "string" && value ? value : undefined;
};

const toBox = (rect: unknown): Box | null => {
  const r = rect as Partial<Box> | null | undefined;
  return r && !Array.isArray(r) && typeof r.width === "number"
    ? {
        left: r.left ?? 0,
        top: r.top ?? 0,
        width: r.width,
        height: r.height ?? 0,
      }
    : null;
};

/** Measures the root (`selector`) of a component in viewport coordinates */
function measure(
  node: Node,
  selector: string,
  done: (box: Box | null) => void,
) {
  try {
    const query = node.createSelectorQuery();
    query.select(selector).boundingClientRect((rect) => done(toBox(rect)));
    query.exec();
  } catch {
    done(null);
  }
}

type TouchLike = {
  clientX?: number;
  clientY?: number;
  pageX?: number;
  pageY?: number;
  x?: number;
  y?: number;
};
interface TouchEventLike {
  touches?: ArrayLike<TouchLike>;
  changedTouches?: ArrayLike<TouchLike>;
  detail?: { x?: number; y?: number };
}

/** The first touch of a touch event, in viewport coordinates */
function touchPoint(event: unknown): { x: number; y: number } | undefined {
  const e = event as TouchEventLike | null;
  const touch = e?.touches?.[0] ?? e?.changedTouches?.[0];
  const x = touch?.clientX ?? touch?.pageX ?? touch?.x ?? e?.detail?.x;
  const y = touch?.clientY ?? touch?.pageY ?? touch?.y ?? e?.detail?.y;
  return typeof x === "number" && typeof y === "number" ? { x, y } : undefined;
}

/** Whether a move may land: in place, or into a column that takes drops */
const accepts = (s: Session, move: KanbanCardMove) =>
  isKanbanNoop(move) || !s.columns.get(move.toColumn)?.node.data.dropDisabled;

function targetAt(s: Session, x: number, y: number): KanbanPosition | null {
  if (
    s.board &&
    (y < s.board.top - 48 || y > s.board.top + s.board.height + 48)
  )
    return null;
  let best: KanbanLayoutColumn | null = null;
  let distance = Infinity;
  for (const column of s.layout) {
    const box = s.columns.get(column.key)!.box;
    const right = box.left + box.width;
    const d = x < box.left ? box.left - x : x > right ? x - right : 0;
    if (d < distance) {
      distance = d;
      best = column;
    }
  }
  if (!best) return null;
  const midpoints = best.cards
    .filter((key) => key !== s.key)
    .map((key) => s.cards.get(key)!)
    .map((box) => box.top + box.height / 2);
  const move = kanbanCardMove(s.layout, s.key, {
    column: best.key,
    index: kanbanInsertIndex(midpoints, y),
  });
  return move && accepts(s, move)
    ? { column: move.toColumn, index: move.toIndex }
    : null;
}

/** Style of the drop line for a target (empty: no line) */
function lineFor(s: Session, target: KanbanPosition | null): string {
  if (!target) return "";
  const column = s.layout.find((entry) => entry.key === target.column);
  const box = s.columns.get(target.column)?.box;
  if (!column || !box) return "";
  const others = column.cards
    .filter((key) => key !== s.key)
    .map((key) => s.cards.get(key)!);
  const line = (left: number, top: number, width: number) =>
    `left:${left}px;top:${top}px;width:${width}px`;
  if (others.length === 0)
    return line(
      box.left + 8,
      box.top + box.height / 2,
      Math.max(0, box.width - 16),
    );
  const next = others[target.index];
  const previous = others[target.index - 1];
  const top =
    next && previous
      ? (previous.top + previous.height + next.top) / 2
      : next
        ? next.top - 4
        : previous!.top + previous!.height + 4;
  return line(others[0]!.left, top - 1, others[0]!.width);
}

const samePosition = (a: KanbanPosition | null, b: KanbanPosition | null) =>
  a === b || (!!a && !!b && a.column === b.column && a.index === b.index);

/** Moves the copy to the finger and updates the drop indicator */
function render(board: Node, s: Session) {
  const { x, y } = s.last;
  const target = targetAt(s, x, y);
  const changed = !samePosition(target, s.target);
  if (changed) {
    const before = s.target?.column;
    s.target = target;
    for (const [key, { node }] of s.columns)
      if (key === before || key === target?.column)
        node.setData({ dropTarget: key === target?.column });
  }
  const card = s.cards.get(s.key)!;
  board.setData({
    ghostStyle: `left:${x - s.grab.x}px;top:${y - s.grab.y}px;width:${card.width}px`,
    ...(changed || !board.data.dragging
      ? { lineStyle: lineFor(s, target), dropTarget: target }
      : {}),
  });
}

/** Measures every linked column and card, then builds the layout */
function measureAll(
  board: Node,
  state: BoardState,
  done: (
    measured: Pick<Session, "layout" | "columns" | "cards" | "board">,
  ) => void,
) {
  const columns = Array.from(state.columns);
  const cards = Array.from(state.cards);
  const columnBoxes = new Map<Node, Box | null>();
  const cardBoxes = new Map<Node, Box | null>();
  let boardBox: Box | null = null;
  let waiting = columns.length + cards.length + 1;
  const settle = () => {
    if (--waiting > 0) return;
    const keyed = columns
      .map((node) => ({ node, key: keyOf(node), box: columnBoxes.get(node) }))
      .filter(
        (entry): entry is { node: Node; key: string; box: Box } =>
          !!entry.key && !!entry.box,
      )
      .sort((a, b) => a.box.left - b.box.left);
    const cardRects = new Map<string, Box>();
    const layout = keyed.map(({ node: column, key }) => {
      const own = cards
        .filter((card) => columnOf.get(card) === column)
        .map((card) => ({ key: keyOf(card), box: cardBoxes.get(card) }))
        .filter(
          (entry): entry is { key: string; box: Box } =>
            !!entry.key && !!entry.box,
        )
        .sort((a, b) => a.box.top - b.box.top);
      for (const card of own) cardRects.set(card.key, card.box);
      return { key, cards: own.map((card) => card.key) };
    });
    done({
      layout,
      columns: new Map(keyed.map(({ key, node, box }) => [key, { node, box }])),
      cards: cardRects,
      board: boardBox,
    });
  };
  measure(board, ".mn-kanban-board", (box) => {
    boardBox = box;
    settle();
  });
  for (const node of columns)
    measure(node, ".mn-kanban-column", (box) => {
      columnBoxes.set(node, box);
      settle();
    });
  for (const node of cards)
    measure(node, ".mn-kanban-card", (box) => {
      cardBoxes.set(node, box);
      settle();
    });
}

function lift(board: Node, card: Node, x: number, y: number) {
  const state = stateOf(board);
  const key = keyOf(card);
  if (!board.data.draggable || state.session || !key) return;
  const s: Session = {
    card,
    key,
    layout: [],
    columns: new Map(),
    cards: new Map(),
    board: null,
    target: null,
    grab: { x: 0, y: 0 },
    last: { x, y },
    ready: false,
  };
  state.session = s;
  // Stop the column and page scrolling from now on (see the card template)
  card.setData({ scrollLock: "onScrollLock" });
  measureAll(board, state, (measured) => {
    if (state.session !== s) return;
    Object.assign(s, measured);
    const from = kanbanFind(s.layout, key);
    const box = s.cards.get(key);
    if (!from || !box) {
      finish(board, state);
      return;
    }
    s.target = from;
    s.grab = { x: x - box.left, y: y - box.top };
    s.ready = true;
    s.columns.get(from.column)?.node.setData({ dropTarget: true });
    card.setData({ dragging: true });
    board.setData({
      dragging: true,
      dragLabel: card.data.label || key,
      lineStyle: lineFor(s, from),
      dropTarget: from,
    });
    render(board, s);
  });
}

/** Ends the drag (drop or cancel): clears every indicator */
function finish(board: Node, state: BoardState) {
  const s = state.session;
  state.session = null;
  if (!s) return;
  s.card.setData({ dragging: false, scrollLock: "" });
  for (const { node } of s.columns.values())
    if (node.data.dropTarget) node.setData({ dropTarget: false });
  board.setData({
    dragging: false,
    dragLabel: "",
    ghostStyle: "",
    lineStyle: "",
    dropTarget: null,
  });
}

function drop(board: Node) {
  const state = stateOf(board);
  const s = state.session;
  finish(board, state);
  if (!s?.ready || !s.target) return;
  const move = kanbanCardMove(s.layout, s.key, s.target);
  if (move && !isKanbanNoop(move) && accepts(s, move))
    board.triggerEvent("cardmove", move);
}

/** The session of the board of `card` when `card` is the one dragged */
function activeBoard(card: Node) {
  const board = boardOf.get(card);
  return board && stateOf(board).session?.card === card ? board : undefined;
}

function syncBoard(self: Instance) {
  self.setData({
    boardStyle: css({
      "--kanban-column-width": kanbanLength(self.data.columnWidth),
      "--kanban-gap": kanbanLength(self.data.gap),
    }),
    scrollStyle: css({
      height: kanbanLength(self.data.height),
      "max-height": kanbanLength(self.data.maxHeight),
    }),
    boardLabel: self.data.ariaLabel || nativeTranslate(self, "kanban.label"),
  });
}

function syncColumn(self: Instance) {
  const count = kanbanCount(self.data.count);
  const { scheme, custom } = kanbanAccent(self.data.color);
  const title: string = self.data.title;
  self.setData({
    shown: count ?? -1,
    scheme: scheme ?? "",
    hasAccent: !!(scheme || custom),
    accentStyle: custom ? `--kanban-column-color:${custom}` : "",
    columnLabel:
      self.data.ariaLabel ||
      (title && count !== undefined
        ? nativeTranslate(self, "kanban.columnLabel", { title, count })
        : title),
    emptyText: self.data.empty || nativeTranslate(self, "kanban.empty"),
  });
}

export const kanbanBoardTemplate = `<view class="mn-kanban-board {{fill ? 'mn-fill' : ''}} {{dragging ? 'mn-dragging' : ''}}" role="region" aria-label="{{boardLabel}}" style="{{boardStyle}}"><scroll-view scroll-x="{{!dragging}}" enable-flex class="mn-kanban-board__scroll" style="{{scrollStyle}}"><view class="mn-kanban-board__track"><slot/></view></scroll-view><view wx:if="{{lineStyle}}" class="mn-kanban-board__drop-line" aria-hidden="true" style="{{lineStyle}}"></view><view wx:if="{{ghostStyle}}" class="mn-kanban-board__ghost mn-kanban-board__ghost--label" aria-hidden="true" style="{{ghostStyle}}"><text>{{dragLabel}}</text></view></view>`;

export const kanbanBoardProperties = {
  columnWidth: length(),
  fill: flag(),
  gap: length(),
  height: length(),
  maxHeight: length(),
  draggable: flag(),
  ariaLabel: text(),
};

export const kanbanBoardExtra = {
  data: {
    boardStyle: "",
    scrollStyle: "",
    boardLabel: "",
    dragging: false,
    dragLabel: "",
    ghostStyle: "",
    lineStyle: "",
    dropTarget: null,
  },
  behaviors: [boardMarker],
  relations: {
    minervaKanbanColumns: {
      type: "descendant",
      target: columnMarker,
      linked(this: Node, column: Node) {
        stateOf(this).columns.add(column);
      },
      unlinked(this: Node, column: Node) {
        stateOf(this).columns.delete(column);
      },
    },
    minervaKanbanCards: {
      type: "descendant",
      target: cardMarker,
      linked(this: Node, card: Node) {
        stateOf(this).cards.add(card);
      },
      unlinked(this: Node, card: Node) {
        const state = stateOf(this);
        state.cards.delete(card);
        if (state.session?.card === card) finish(this, state);
      },
    },
  },
  observers: {
    "columnWidth,gap,height,maxHeight,ariaLabel,localeLanguage": function (
      this: Instance,
    ) {
      syncBoard(this);
    },
    draggable(this: Node, draggable: boolean) {
      const state = stateOf(this);
      if (!draggable) finish(this, state);
      for (const card of state.cards) card.setData({ draggable: !!draggable });
    },
  },
  lifetimes: {
    attached(this: Instance) {
      syncBoard(this);
    },
    detached(this: Node) {
      const state = boards.get(this);
      if (state) state.session = null;
    },
  },
};

export const kanbanColumnTemplate = `<view class="mn-kanban-column {{scheme ? 'mn-color-' + scheme : ''}} {{dropTarget ? 'mn-drop-target' : ''}}" role="group" aria-label="{{columnLabel}}" data-kanban-column="{{value}}" style="{{accentStyle}}"><view class="mn-kanban-column__header"><view wx:if="{{hasAccent}}" class="mn-kanban-column__indicator" aria-hidden="true"></view><view class="mn-kanban-column__title"><text wx:if="{{title}}">{{title}}</text><slot name="title"/></view><view wx:if="{{shown >= 0}}" class="mn-kanban-column__count" aria-hidden="{{columnLabel ? 'true' : 'false'}}"><text>{{shown}}</text></view><view class="mn-kanban-column__actions"><slot name="actions"/></view></view><view wx:if="{{description}}" class="mn-kanban-column__description"><text>{{description}}</text></view><view wx:if="{{shown !== 0}}" class="mn-kanban-column__list" role="list"><slot/></view><view wx:else class="mn-kanban-column__empty"><text>{{emptyText}}</text></view><view class="mn-kanban-column__footer"><slot name="footer"/></view></view>`;

export const kanbanColumnProperties = {
  title: text(),
  value: text(),
  count: { type: null, optionalTypes: [Number, String], value: null },
  color: text(),
  description: text(),
  empty: text(),
  dropDisabled: flag(),
  ariaLabel: text(),
};

export const kanbanColumnExtra = {
  data: {
    shown: -1,
    scheme: "",
    hasAccent: false,
    accentStyle: "",
    columnLabel: "",
    emptyText: "",
    dropTarget: false,
  },
  behaviors: [columnMarker],
  relations: {
    minervaKanbanBoard: { type: "ancestor", target: boardMarker },
    minervaKanbanColumnCards: { type: "descendant", target: cardMarker },
  },
  observers: {
    "title,count,color,empty,ariaLabel,localeLanguage": function (
      this: Instance,
    ) {
      syncColumn(this);
    },
  },
  lifetimes: {
    attached(this: Instance) {
      syncColumn(this);
    },
  },
};

// The root listens to touchmove in the capture phase (it never blocks
// scrolling by itself); the inner view catches touchmove only while the card
// is picked up (`scrollLock` names a handler then, an empty binding is off),
// which stops the column, the board and the page from scrolling under the
// finger.
export const kanbanCardTemplate = `<view class="mn-kanban-card {{draggable ? 'mn-draggable' : ''}} {{dragging ? 'mn-dragging' : ''}}" role="listitem" data-minerva="kanban-card" data-part="root" data-kanban-card="{{value}}" bindlongpress="onLongPress" capture-bind:touchmove="onTouchMove" bindtouchend="onTouchEnd" bindtouchcancel="onTouchCancel"><view class="mn-kanban-card__content" catchtouchmove="{{scrollLock}}"><slot/></view></view>`;

export const kanbanCardProperties = {
  value: text(),
  label: text(),
};

export const kanbanCardMethods = {
  onLongPress(this: Node, event: unknown) {
    const board = boardOf.get(this);
    const point = touchPoint(event);
    if (board && point && this.data.draggable)
      lift(board, this, point.x, point.y);
  },
  onTouchMove(this: Node, event: unknown) {
    const board = activeBoard(this);
    const point = touchPoint(event);
    if (!board || !point) return;
    const s = stateOf(board).session!;
    s.last = point;
    if (s.ready) render(board, s);
  },
  onTouchEnd(this: Node) {
    const board = activeBoard(this);
    if (board) drop(board);
  },
  onTouchCancel(this: Node) {
    const board = activeBoard(this);
    if (board) finish(board, stateOf(board));
  },
  /** Bound (catchtouchmove) while the card is dragged: blocks scrolling */
  onScrollLock() {},
};

export const kanbanCardExtra = {
  data: { draggable: false, dragging: false, scrollLock: "" },
  behaviors: [cardMarker],
  relations: {
    minervaKanbanCardBoard: {
      type: "ancestor",
      target: boardMarker,
      linked(this: Node, board: Node) {
        boardOf.set(this, board);
        this.setData({ draggable: !!board.data.draggable });
      },
      unlinked(this: Node) {
        boardOf.delete(this);
        this.setData({ draggable: false, dragging: false, scrollLock: "" });
      },
    },
    minervaKanbanCardColumn: {
      type: "ancestor",
      target: columnMarker,
      linked(this: Node, column: Node) {
        columnOf.set(this, column);
      },
      unlinked(this: Node) {
        columnOf.delete(this);
      },
    },
  },
};

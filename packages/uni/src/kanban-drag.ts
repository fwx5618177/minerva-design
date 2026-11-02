// Drag and drop of the cards of the uni KanbanBoard. Mini-program slots
// cannot be read or wrapped, so the columns and the KanbanCard components
// register with their board (provide / inject) and measure themselves when
// a card is picked up: the board orders them by position (columns left to
// right, cards top to bottom) and hit-tests the finger against them. The
// board stays controlled: it emits a `KanbanCardMove`.
import {
  computed,
  getCurrentInstance,
  inject,
  onBeforeUnmount,
  onMounted,
  ref,
  type ComputedRef,
  type InjectionKey,
  type Ref,
} from "vue";
import {
  isKanbanNoop,
  kanbanCardMove,
  kanbanFind,
  kanbanInsertIndex,
  type KanbanCardMove,
  type KanbanLayoutColumn,
  type KanbanPosition,
} from "@minerva/core";

/** Long press (ms) that picks a card up */
const LONG_PRESS = 350;
/** Distance (px) the finger may move during the long press (more: a scroll) */
const TOLERANCE = 8;

/** A box in viewport coordinates */
export interface KanbanBox {
  left: number;
  top: number;
  width: number;
  height: number;
}

type Measure = (done: (box: KanbanBox | null) => void) => void;

interface Entry {
  key: () => string | undefined;
  measure: Measure;
}

interface CardEntry extends Entry {
  column: () => string | undefined;
  label: () => string;
}

/** What the board shows while a card is picked up */
export interface KanbanDragView {
  card: string;
  label: string;
  target: KanbanPosition | null;
  ghost?: { left: number; top: number; width: number };
  line?: { left: number; top: number; width: number };
}

export interface KanbanBoardDrag {
  draggable: ComputedRef<boolean>;
  view: Ref<KanbanDragView | null>;
  registerColumn(entry: Entry): () => void;
  registerCard(entry: CardEntry): () => void;
  lift(card: string, x: number, y: number): void;
  active(card: string): boolean;
  move(x: number, y: number): void;
  drop(): void;
  cancel(): void;
}

export const KANBAN_BOARD: InjectionKey<KanbanBoardDrag> =
  Symbol("MinervaKanbanBoard");
export const KANBAN_COLUMN: InjectionKey<ComputedRef<string | undefined>> =
  Symbol("MinervaKanbanColumn");

const toBox = (
  rect: Partial<KanbanBox> | null | undefined,
): KanbanBox | null =>
  rect && typeof rect.width === "number"
    ? {
        left: rect.left ?? 0,
        top: rect.top ?? 0,
        width: rect.width,
        height: rect.height ?? 0,
      }
    : null;

/**
 * Measures the root element of the current component (id `id`): its DOM
 * box on H5, a selector query scoped to the component on mini programs
 */
export function useMeasure(id: string): Measure {
  const instance = getCurrentInstance();
  return (done) => {
    const el = instance?.proxy?.$el as Element | undefined;
    if (el?.getBoundingClientRect) {
      done(toBox(el.getBoundingClientRect()));
      return;
    }
    try {
      uni
        .createSelectorQuery()
        .in(instance?.proxy)
        .select(`#${id}`)
        .boundingClientRect((rect) =>
          done(toBox(rect as Partial<KanbanBox> | null)),
        )
        .exec();
    } catch {
      done(null);
    }
  };
}

type TouchList = ArrayLike<{ clientX?: number; clientY?: number }>;
type TouchLike = { touches?: TouchList; changedTouches?: TouchList } | null;

/** The first touch of a touch event, in viewport coordinates */
export function touchPoint(
  event: unknown,
): { x: number; y: number } | undefined {
  const touches = event as TouchLike;
  const touch = touches?.touches?.[0] ?? touches?.changedTouches?.[0];
  return touch && typeof touch.clientX === "number"
    ? { x: touch.clientX, y: touch.clientY ?? 0 }
    : undefined;
}

interface Session {
  card: string;
  layout: KanbanLayoutColumn[];
  columns: Map<string, KanbanBox>;
  cards: Map<string, KanbanBox>;
  board: KanbanBox | null;
  target: KanbanPosition | null;
  grab: { x: number; y: number };
  last: { x: number; y: number };
  ready: boolean;
}

/** The drag and drop state of a board (provided to its columns and cards) */
export function useKanbanBoardDrag(options: {
  draggable: () => boolean;
  canDrop: () => ((move: KanbanCardMove) => boolean) | undefined;
  measureBoard: Measure;
  onMove: (move: KanbanCardMove) => void;
}): KanbanBoardDrag {
  const columns = new Set<Entry>();
  const cards = new Set<CardEntry>();
  const view = ref<KanbanDragView | null>(null);
  let session: Session | null = null;

  const accept = (move: KanbanCardMove) => {
    const canDrop = options.canDrop();
    return isKanbanNoop(move) || !canDrop || canDrop(move);
  };

  const targetAt = (s: Session, x: number, y: number) => {
    if (
      s.board &&
      (y < s.board.top - 48 || y > s.board.top + s.board.height + 48)
    )
      return null;
    let best: KanbanLayoutColumn | null = null;
    let distance = Infinity;
    for (const column of s.layout) {
      const box = s.columns.get(column.key)!;
      const right = box.left + box.width;
      const d = x < box.left ? box.left - x : x > right ? x - right : 0;
      if (d < distance) {
        distance = d;
        best = column;
      }
    }
    if (!best) return null;
    const midpoints = best.cards
      .filter((key) => key !== s.card)
      .map((key) => s.cards.get(key)!)
      .map((box) => box.top + box.height / 2);
    const move = kanbanCardMove(s.layout, s.card, {
      column: best.key,
      index: kanbanInsertIndex(midpoints, y),
    });
    return move && accept(move)
      ? { column: move.toColumn, index: move.toIndex }
      : null;
  };

  const lineFor = (s: Session, target: KanbanPosition | null) => {
    if (!target) return undefined;
    const column = s.layout.find((entry) => entry.key === target.column);
    const box = s.columns.get(target.column);
    if (!column || !box) return undefined;
    const others = column.cards
      .filter((key) => key !== s.card)
      .map((key) => s.cards.get(key)!);
    if (others.length === 0)
      return {
        left: box.left + 8,
        top: box.top + box.height / 2,
        width: Math.max(0, box.width - 16),
      };
    const next = others[target.index];
    const previous = others[target.index - 1];
    const top =
      next && previous
        ? (previous.top + previous.height + next.top) / 2
        : next
          ? next.top - 4
          : previous!.top + previous!.height + 4;
    return { left: others[0]!.left, top: top - 1, width: others[0]!.width };
  };

  const update = (s: Session) => {
    const current = view.value;
    if (!current) return;
    const { x, y } = s.last;
    const target = targetAt(s, x, y);
    const same =
      target === s.target ||
      (target &&
        s.target &&
        target.column === s.target.column &&
        target.index === s.target.index);
    if (!same) s.target = target;
    view.value = {
      ...current,
      target: s.target,
      line: same ? current.line : lineFor(s, target),
      ghost: current.ghost && {
        ...current.ghost,
        left: x - s.grab.x,
        top: y - s.grab.y,
      },
    };
  };

  /** Measures every registered column and card, then builds the layout */
  const measureAll = (
    done: (
      measured: Omit<Session, "card" | "target" | "grab" | "last" | "ready">,
    ) => void,
  ) => {
    const columnList = Array.from(columns);
    const cardList = Array.from(cards);
    const columnBoxes = new Map<Entry, KanbanBox | null>();
    const cardBoxes = new Map<CardEntry, KanbanBox | null>();
    let board: KanbanBox | null = null;
    let waiting = columnList.length + cardList.length + 1;
    const settle = () => {
      if (--waiting > 0) return;
      const keyedColumns = columnList
        .map((entry) => ({ key: entry.key(), box: columnBoxes.get(entry) }))
        .filter(
          (entry): entry is { key: string; box: KanbanBox } =>
            !!entry.key && !!entry.box,
        )
        .sort((a, b) => a.box.left - b.box.left);
      const columnRects = new Map(keyedColumns.map((c) => [c.key, c.box]));
      const cardRects = new Map<string, KanbanBox>();
      const layout = keyedColumns.map(({ key }) => {
        const own = cardList
          .map((entry) => ({
            key: entry.key(),
            column: entry.column(),
            box: cardBoxes.get(entry),
          }))
          .filter(
            (entry): entry is { key: string; column: string; box: KanbanBox } =>
              !!entry.key && entry.column === key && !!entry.box,
          )
          .sort((a, b) => a.box.top - b.box.top);
        for (const card of own) cardRects.set(card.key, card.box);
        return { key, cards: own.map((card) => card.key) };
      });
      done({ layout, columns: columnRects, cards: cardRects, board });
    };
    options.measureBoard((box) => {
      board = box;
      settle();
    });
    for (const entry of columnList)
      entry.measure((box) => {
        columnBoxes.set(entry, box);
        settle();
      });
    for (const entry of cardList)
      entry.measure((box) => {
        cardBoxes.set(entry, box);
        settle();
      });
  };

  const drag: KanbanBoardDrag = {
    draggable: computed(() => options.draggable()),
    view,
    registerColumn(entry) {
      columns.add(entry);
      return () => columns.delete(entry);
    },
    registerCard(entry) {
      cards.add(entry);
      return () => cards.delete(entry);
    },
    lift(card, x, y) {
      if (!options.draggable() || session) return;
      const entry = Array.from(cards).find((c) => c.key() === card);
      if (!entry) return;
      const s: Session = {
        card,
        layout: [],
        columns: new Map(),
        cards: new Map(),
        board: null,
        target: null,
        grab: { x: 0, y: 0 },
        last: { x, y },
        ready: false,
      };
      session = s;
      measureAll((measured) => {
        if (session !== s) return;
        Object.assign(s, measured);
        const from = kanbanFind(s.layout, card);
        const box = s.cards.get(card);
        if (!from || !box) {
          session = null;
          return;
        }
        s.target = from;
        s.grab = { x: x - box.left, y: y - box.top };
        s.ready = true;
        view.value = {
          card,
          label: entry.label(),
          target: from,
          line: lineFor(s, from),
          ghost: { left: box.left, top: box.top, width: box.width },
        };
        update(s);
      });
    },
    active: (card) => session?.card === card,
    move(x, y) {
      if (!session) return;
      session.last = { x, y };
      if (session.ready) update(session);
    },
    drop() {
      const s = session;
      session = null;
      view.value = null;
      if (!s?.ready || !s.target) return;
      const move = kanbanCardMove(s.layout, s.card, s.target);
      if (move && !isKanbanNoop(move) && accept(move)) options.onMove(move);
    },
    cancel() {
      session = null;
      view.value = null;
    },
  };
  return drag;
}

/**
 * The long press and the finger moves of a KanbanCard: the touch handlers
 * of its root view
 */
export function useKanbanCardGesture(
  board: KanbanBoardDrag | null,
  key: () => string,
) {
  let press: {
    x: number;
    y: number;
    timer: ReturnType<typeof setTimeout>;
  } | null = null;
  const stop = () => {
    if (press) clearTimeout(press.timer);
    press = null;
  };
  onBeforeUnmount(stop);
  const enabled = () => !!board?.draggable.value;
  return {
    onTouchStart(event: unknown) {
      stop();
      const point = touchPoint(event);
      const fingers = (event as TouchLike)?.touches?.length ?? 1;
      if (!enabled() || !point || fingers > 1) return;
      press = {
        ...point,
        timer: setTimeout(() => {
          press = null;
          board!.lift(key(), point.x, point.y);
        }, LONG_PRESS),
      };
    },
    onTouchMove(event: unknown) {
      const point = touchPoint(event);
      if (!board || !point) return;
      if (board.active(key())) {
        board.move(point.x, point.y);
        return;
      }
      // moving before the long press is a scroll
      if (press && Math.hypot(point.x - press.x, point.y - press.y) > TOLERANCE)
        stop();
    },
    onTouchEnd() {
      stop();
      if (board?.active(key())) board.drop();
    },
    onTouchCancel() {
      stop();
      if (board?.active(key())) board.cancel();
    },
  };
}

/** Registers a column or card with its board while mounted */
export function useKanbanRegistration(register: (() => () => void) | null) {
  let unregister: (() => void) | undefined;
  onMounted(() => {
    unregister = register?.();
  });
  onBeforeUnmount(() => unregister?.());
}

/** The board and column a card or column belongs to */
export const injectKanbanBoard = () => inject(KANBAN_BOARD, null);
export const injectKanbanColumn = () => inject(KANBAN_COLUMN, null);

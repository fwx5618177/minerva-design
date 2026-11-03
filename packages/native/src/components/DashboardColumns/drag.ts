// Drag and drop of the cards of a native DashboardColumns. The board stays
// controlled: it shows where a card would land (a floating copy under the
// finger, a drop line, the target column highlighted) and reports a
// `DashboardCardMove`.
//
// - touch: a long press on a card picks it up (the board stops scrolling),
//   moving the finger moves it, lifting the finger drops it. Columns and
//   cards are measured once, when the card is picked up.
// - screen readers: each card offers accessibility actions ("Move up",
//   "Move down", "Move to <column>") that report the move at once.
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AccessibilityInfo, Animated, type View } from "react-native";
import {
  isDashboardNoop,
  dashboardCardMove,
  dashboardFind,
  dashboardInsertIndex,
  dashboardKeyboardTarget,
  dashboardSlots,
  type DashboardCardMove,
  type DashboardDirection,
  type DashboardLayoutColumn,
  type DashboardPosition,
} from "@minerva/core";

/** A box in page coordinates */
interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

/** A column of the board as read from its children */
export interface DashboardMeasuredColumn extends DashboardLayoutColumn {
  /** Name of the column in the announcements and action labels */
  label: string;
}

export interface DashboardDragOptions {
  enabled: boolean;
  columns: readonly DashboardMeasuredColumn[];
  /** Name of each card in the announcements */
  cardLabels: Readonly<Record<string, string>>;
  onCardMove?: (move: DashboardCardMove) => void;
  canDrop?: (move: DashboardCardMove) => boolean;
  t: (key: string, params?: Record<string, string | number>) => string;
}

/** The drop line, relative to the drag layer */
export interface DashboardDropLine {
  left: number;
  top: number;
  width: number;
}

/** What the board, columns and cards render while a card is picked up */
export interface DashboardDragState {
  card: string;
  target: DashboardPosition | null;
  /** Content of the floating copy (the card's children) */
  content?: ReactNode;
  /** Size of the floating copy (once measured) */
  width?: number;
  line?: DashboardDropLine;
}

/** The drag and drop API of a board, given to its columns and cards */
export interface DashboardDragApi {
  enabled: boolean;
  state: DashboardDragState | null;
  /** Position of the floating copy, relative to the drag layer */
  ghost: Animated.ValueXY;
  registerLayer(view: View | null): void;
  registerColumn(key: string, part: "root" | "body", view: View | null): void;
  registerCard(key: string, view: View | null): void;
  /** Records the content of a card (rendered by the floating copy) */
  setContent(key: string, content: ReactNode | undefined): void;
  lift(card: string, pageX: number, pageY: number): void;
  /** Whether `card` is picked up (by a touch: it owns the gesture) */
  active(card: string): boolean;
  move(pageX: number, pageY: number): void;
  drop(): void;
  cancel(): void;
  actions(card: string): { name: string; label: string }[];
  act(card: string, action: string): void;
}

/** Accessibility actions of a draggable card */
const ACTIONS: Record<string, DashboardDirection> = {
  moveUp: "up",
  moveDown: "down",
  movePrevious: "left",
  moveNext: "right",
};

/** Rows the drop target may be above / below the board (dp) */
const OUTSIDE = 48;

const measure = (view: View | null | undefined) =>
  new Promise<Rect | null>((resolve) => {
    if (!view || typeof view.measure !== "function") return resolve(null);
    view.measure((_x, _y, width, height, pageX, pageY) =>
      resolve(width || height ? { x: pageX, y: pageY, width, height } : null),
    );
  });

interface Session {
  card: string;
  target: DashboardPosition | null;
  ready: boolean;
  last: { x: number; y: number };
  grab: { x: number; y: number };
  origin: { x: number; y: number };
  board: Rect | null;
  columns: Map<string, Rect>;
  bodies: Map<string, Rect>;
  cards: Map<string, Rect>;
}

export function useDashboardDrag(
  options: DashboardDragOptions,
): DashboardDragApi {
  const latest = useRef(options);
  useEffect(() => {
    latest.current = options;
  });
  // registered views and card contents (read in callbacks only)
  const views = useRef({
    layer: null as View | null,
    columns: new Map<string, View>(),
    bodies: new Map<string, View>(),
    cards: new Map<string, View>(),
    contents: new Map<string, ReactNode>(),
  });
  const [ghost] = useState(() => new Animated.ValueXY());
  const [state, setState] = useState<DashboardDragState | null>(null);
  const session = useRef<Session | null>(null);

  const accept = useCallback((move: DashboardCardMove) => {
    const { canDrop } = latest.current;
    return isDashboardNoop(move) || !canDrop || canDrop(move);
  }, []);

  const announce = useCallback(
    (message: string, card: string, position: DashboardPosition) => {
      const { columns, cardLabels, t } = latest.current;
      const column = columns.find((entry) => entry.key === position.column);
      AccessibilityInfo.announceForAccessibility?.(
        t(`dashboard.${message}`, {
          card: cardLabels[card] ?? card,
          column: column?.label ?? position.column,
          position: position.index + 1,
          total: dashboardSlots(columns, card, position.column),
        }),
      );
    },
    [],
  );

  /** Where the card would land with the finger at (x, y) */
  const targetAt = useCallback(
    (s: Session, x: number, y: number): DashboardPosition | null => {
      const { columns } = latest.current;
      if (
        s.board &&
        (y < s.board.y - OUTSIDE || y > s.board.y + s.board.height + OUTSIDE)
      )
        return null;
      let best: DashboardMeasuredColumn | null = null;
      let distance = Infinity;
      for (const column of columns) {
        const box = s.columns.get(column.key);
        if (!box) continue;
        const d =
          x < box.x
            ? box.x - x
            : x > box.x + box.width
              ? x - box.x - box.width
              : 0;
        if (d < distance) {
          distance = d;
          best = column;
        }
      }
      if (!best) return null;
      const midpoints = best.cards
        .filter((key) => key !== s.card)
        .map((key) => s.cards.get(key))
        .filter((box): box is Rect => !!box)
        .map((box) => box.y + box.height / 2);
      const move = dashboardCardMove(columns, s.card, {
        column: best.key,
        index: dashboardInsertIndex(midpoints, y),
      });
      return move && accept(move)
        ? { column: move.toColumn, index: move.toIndex }
        : null;
    },
    [accept],
  );

  const lineFor = useCallback(
    (
      s: Session,
      target: DashboardPosition | null,
    ): DashboardDropLine | undefined => {
      if (!target) return undefined;
      const column = latest.current.columns.find(
        (entry) => entry.key === target.column,
      );
      const body = s.bodies.get(target.column) ?? s.columns.get(target.column);
      if (!column || !body) return undefined;
      const others = column.cards
        .filter((key) => key !== s.card)
        .map((key) => s.cards.get(key))
        .filter((box): box is Rect => !!box);
      let y: number;
      let left = body.x + 8;
      let width = Math.max(0, body.width - 16);
      if (others.length === 0) {
        y = body.y + Math.min(8, body.height / 2);
      } else {
        const next = others[target.index];
        const previous = others[target.index - 1];
        if (next && previous) y = (previous.y + previous.height + next.y) / 2;
        else if (next) y = next.y - 4;
        else y = previous!.y + previous!.height + 4;
        left = others[0]!.x;
        width = others[0]!.width;
      }
      return {
        left: left - s.origin.x,
        top: y - 1 - s.origin.y,
        width,
      };
    },
    [],
  );

  const update = useCallback(
    (s: Session) => {
      const { x, y } = s.last;
      ghost.setValue({
        x: x - s.grab.x - s.origin.x,
        y: y - s.grab.y - s.origin.y,
      });
      const target = targetAt(s, x, y);
      const same =
        target === s.target ||
        (target &&
          s.target &&
          target.column === s.target.column &&
          target.index === s.target.index);
      if (same) return;
      s.target = target;
      setState((current) =>
        current && current.card === s.card
          ? { ...current, target, line: lineFor(s, target) }
          : current,
      );
    },
    [ghost, lineFor, targetAt],
  );

  const lift = useCallback(
    (card: string, pageX: number, pageY: number) => {
      const { enabled, columns } = latest.current;
      const from = dashboardFind(columns, card);
      if (!enabled || !from || session.current) return;
      const s: Session = {
        card,
        target: from,
        ready: false,
        last: { x: pageX, y: pageY },
        grab: { x: 0, y: 0 },
        origin: { x: 0, y: 0 },
        board: null,
        columns: new Map(),
        bodies: new Map(),
        cards: new Map(),
      };
      session.current = s;
      setState({
        card,
        target: from,
        content: views.current.contents.get(card),
      });
      announce("lifted", card, from);
      const measured = (map: Map<string, View>, into: Map<string, Rect>) =>
        Array.from(map, ([key, view]) =>
          measure(view).then((box) => {
            if (box) into.set(key, box);
          }),
        );
      const { layer, columns: columnViews, bodies, cards } = views.current;
      void Promise.all([
        measure(layer).then((box) => {
          s.board = box;
          if (box) s.origin = { x: box.x, y: box.y };
        }),
        ...measured(columnViews, s.columns),
        ...measured(bodies, s.bodies),
        ...measured(cards, s.cards),
      ]).then(() => {
        if (session.current !== s) return;
        const box = s.cards.get(card);
        if (box) s.grab = { x: pageX - box.x, y: pageY - box.y };
        s.ready = true;
        // the copy appears where the card is, then follows the finger
        ghost.setValue({
          x: pageX - s.grab.x - s.origin.x,
          y: pageY - s.grab.y - s.origin.y,
        });
        setState((current) =>
          current && current.card === card
            ? { ...current, width: box?.width, line: lineFor(s, s.target) }
            : current,
        );
        update(s);
      });
    },
    [announce, ghost, lineFor, update, views],
  );

  const move = useCallback(
    (pageX: number, pageY: number) => {
      const s = session.current;
      if (!s) return;
      s.last = { x: pageX, y: pageY };
      if (s.ready) update(s);
    },
    [update],
  );

  const cancel = useCallback(() => {
    const s = session.current;
    if (!s) return;
    session.current = null;
    setState(null);
    const from = dashboardFind(latest.current.columns, s.card);
    if (from) announce("cancelled", s.card, from);
  }, [announce]);

  const drop = useCallback(() => {
    const s = session.current;
    if (!s) return;
    const move =
      s.ready && s.target
        ? dashboardCardMove(latest.current.columns, s.card, s.target)
        : undefined;
    if (!move || !accept(move)) {
      cancel();
      return;
    }
    session.current = null;
    setState(null);
    announce("dropped", s.card, { column: move.toColumn, index: move.toIndex });
    if (!isDashboardNoop(move)) latest.current.onCardMove?.(move);
  }, [accept, announce, cancel]);

  // read while rendering the cards: the current options, not `latest`
  const { columns, t, canDrop } = options;
  const actions = useCallback(
    (card: string) => {
      const from = dashboardFind(columns, card);
      if (!from) return [];
      const allowed = (move: DashboardCardMove) =>
        isDashboardNoop(move) || !canDrop || canDrop(move);
      const list: { name: string; label: string }[] = [];
      for (const [name, direction] of Object.entries(ACTIONS)) {
        const target = dashboardKeyboardTarget(
          columns,
          card,
          from,
          direction,
          allowed,
        );
        if (!target) continue;
        const column = columns.find((entry) => entry.key === target.column);
        list.push({
          name,
          label:
            direction === "up"
              ? t("dashboard.moveUp")
              : direction === "down"
                ? t("dashboard.moveDown")
                : t("dashboard.moveTo", {
                    column: column?.label ?? target.column,
                  }),
        });
      }
      return list;
    },
    [columns, t, canDrop],
  );

  const act = useCallback(
    (card: string, action: string) => {
      const direction = ACTIONS[action];
      const { columns } = latest.current;
      const from = dashboardFind(columns, card);
      if (!direction || !from) return;
      const target = dashboardKeyboardTarget(
        columns,
        card,
        from,
        direction,
        accept,
      );
      const move = target && dashboardCardMove(columns, card, target);
      if (!move || isDashboardNoop(move)) return;
      announce("dropped", card, { column: move.toColumn, index: move.toIndex });
      latest.current.onCardMove?.(move);
    },
    [accept, announce],
  );

  const register = useCallback(
    (map: Map<string, View>, key: string, view: View | null) => {
      if (view) map.set(key, view);
      else map.delete(key);
    },
    [],
  );

  // turning dragging off drops nothing
  useEffect(() => {
    if (!options.enabled) cancel();
  }, [options.enabled, cancel]);

  return useMemo<DashboardDragApi>(
    () => ({
      enabled: options.enabled,
      state,
      ghost,
      registerLayer: (view) => {
        views.current.layer = view;
      },
      registerColumn: (key, which, view) =>
        register(
          which === "root" ? views.current.columns : views.current.bodies,
          key,
          view,
        ),
      registerCard: (key, view) => register(views.current.cards, key, view),
      setContent: (key, content) => {
        if (content === undefined) views.current.contents.delete(key);
        else views.current.contents.set(key, content);
      },
      lift,
      active: (card) => session.current?.card === card,
      move,
      drop,
      cancel,
      actions,
      act,
    }),
    [
      options.enabled,
      state,
      ghost,
      register,
      lift,
      move,
      drop,
      cancel,
      actions,
      act,
    ],
  );
}

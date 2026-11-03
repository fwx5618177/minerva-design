import Taro from "@tarojs/taro";
import {
  Children,
  createContext,
  isValidElement,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from "react";
import { ScrollView, View, Text } from "@tarojs/components";
import {
  cn,
  isDashboardNoop,
  dashboardAccent,
  dashboardCardMove,
  dashboardCount,
  dashboardFind,
  dashboardInsertIndex,
  dashboardLength,
  type DashboardCardMove,
  type DashboardLayoutColumn,
  type DashboardPosition,
} from "@minerva/core";
import { useI18n } from "./theme";
import { Part, type NativeProps } from "./shared";

export type { DashboardCardMove };

/** A length: a number of pixels or any CSS length ("288px", "40vh") */
export type DashboardLength = number | string;

export interface DashboardColumnsProps extends NativeProps {
  /** Width of every column (a number is pixels; default 18rem / 288px); with `fill` the minimum width */
  columnWidth?: DashboardLength;
  /** Stretches the columns equally to fill the board when they fit (default false) */
  fill?: boolean;
  /** Space between the columns (a number is pixels; default 12px) */
  gap?: DashboardLength;
  /** Height of the board: the column bodies scroll vertically within it */
  height?: DashboardLength;
  /** Maximum height of the board: the column bodies scroll vertically within it */
  maxHeight?: DashboardLength;
  /**
   * Lets the DashboardCard children of keyed columns (`value`) be dragged: a
   * long press picks a card up (the board stops scrolling), moving the
   * finger moves it, lifting the finger drops it (default false). The board
   * is controlled: it reports the move (`onCardMove`)
   */
  draggable?: boolean;
  /** Called when a card is dropped at a new position: move it in your data (`moveDashboardCard`) */
  onCardMove?: (move: DashboardCardMove) => void;
  /** Whether a card may be dropped at a position (refused positions show no drop line) */
  canDrop?: (move: DashboardCardMove) => boolean;
}

export interface DashboardColumnProps extends Omit<NativeProps, "children"> {
  /** Title of the column (also its accessible name) */
  title: ReactNode;
  /** Key of the column, reported as `fromColumn` / `toColumn` by a draggable board */
  value?: string;
  /** Number of items shown as a badge (and announced with the title); omit to hide it */
  count?: number;
  /** Accent (a dot before the title): a theme color or any CSS color */
  color?: string;
  /** Supporting text under the header */
  description?: ReactNode;
  /** Header controls on the end side (e.g. an add button) */
  actions?: ReactNode;
  /** Content shown when the column has no cards (default: translated "No items") */
  empty?: ReactNode;
  /** Footer below the cards (e.g. an "Add card" button) */
  footer?: ReactNode;
  /** The cards: each child is wrapped in a role="listitem" view */
  children?: ReactNode;
}

export interface DashboardCardProps extends NativeProps {
  /** Key of the card, reported as `cardKey` by a draggable board */
  value: string;
}

/** Long press (ms) that picks a card up */
const LONG_PRESS = 350;
/** Distance (px) the finger may move during the long press (more: a scroll) */
const TOLERANCE = 8;

/** A box in viewport coordinates */
interface Box {
  left: number;
  top: number;
  width: number;
  height: number;
}

interface Measured {
  board: Box | null;
  columns: Map<string, Box>;
  cards: Map<string, Box>;
}

interface Session extends Measured {
  card: string;
  target: DashboardPosition | null;
  grab: { x: number; y: number };
}

/** What the board shows while a card is picked up */
interface DragView {
  card: string;
  target: DashboardPosition | null;
  line?: { left: number; top: number; width: number };
  width?: number;
  /** Where the floating copy starts (the card's own place) */
  ghost: { x: number; y: number };
}

interface DashboardDragContext {
  draggable: boolean;
  view: DragView | null;
  lift(card: string, x: number, y: number): void;
  active(card: string): boolean;
  move(x: number, y: number): void;
  drop(): void;
  cancel(): void;
  setContent(card: string, content: ReactNode | undefined): void;
}

const DragContext = createContext<DashboardDragContext | null>(null);

/** Keyed columns and their keyed DashboardCard children, read from the board's children */
function readLayout(children: ReactNode): DashboardLayoutColumn[] {
  const layout: DashboardLayoutColumn[] = [];
  for (const child of Children.toArray(children)) {
    if (!isValidElement(child) || child.type !== DashboardColumn) continue;
    const column = (child as ReactElement<DashboardColumnProps>).props;
    if (!column.value) continue;
    const cards = Children.toArray(column.children)
      .filter(
        (item): item is ReactElement<DashboardCardProps> =>
          isValidElement(item) && item.type === DashboardCard,
      )
      .map((item) => item.props.value)
      .filter(Boolean);
    layout.push({ key: column.value, cards });
  }
  return layout;
}

const touchPoint = (event: unknown) => {
  const touch =
    (
      event as {
        touches?: ArrayLike<{ clientX?: number; clientY?: number }>;
        changedTouches?: ArrayLike<{ clientX?: number; clientY?: number }>;
      }
    ).touches?.[0] ??
    (
      event as {
        changedTouches?: ArrayLike<{ clientX?: number; clientY?: number }>;
      }
    ).changedTouches?.[0];
  return touch && typeof touch.clientX === "number"
    ? { x: touch.clientX, y: touch.clientY ?? 0 }
    : undefined;
};

/**
 * Measures the board, its columns and its cards: `createSelectorQuery` on
 * the mini-program hosts, the DOM on H5
 */
function measureBoard(boardId: string, done: (measured: Measured) => void) {
  type Result = Partial<Box> & { dataset?: Record<string, string> };
  const box = (r: Result | null | undefined): Box | null =>
    r && typeof r.width === "number"
      ? {
          left: r.left ?? 0,
          top: r.top ?? 0,
          width: r.width,
          height: r.height ?? 0,
        }
      : null;
  const collect = (
    board: Result | null | undefined,
    columns: Result[],
    cards: Result[],
  ) => {
    const keyed = (list: Result[], key: string) => {
      const map = new Map<string, Box>();
      for (const entry of list) {
        const value = entry.dataset?.[key];
        const measured = box(entry);
        if (value && measured && !map.has(value)) map.set(value, measured);
      }
      return map;
    };
    done({
      board: box(board),
      columns: keyed(columns, "dashboardColumn"),
      cards: keyed(cards, "dashboardCard"),
    });
  };
  const query = Taro.createSelectorQuery?.();
  if (query) {
    const fields = { dataset: true, rect: true, size: true };
    query.select(`#${boardId}`).boundingClientRect();
    query.selectAll(`#${boardId} .mn-dashboard-column`).fields(fields);
    query.selectAll(`#${boardId} .mn-dashboard-card`).fields(fields);
    query.exec((results: unknown[]) =>
      collect(
        results?.[0] as Result,
        (results?.[1] as Result[]) ?? [],
        (results?.[2] as Result[]) ?? [],
      ),
    );
    return;
  }
  if (typeof document === "undefined") return;
  const root = document.getElementById(boardId);
  if (!root) return;
  const read = (selector: string) =>
    Array.from(root.querySelectorAll<HTMLElement>(selector)).map((element) => ({
      ...pick(element.getBoundingClientRect()),
      dataset: { ...element.dataset } as Record<string, string>,
    }));
  collect(
    pick(root.getBoundingClientRect()),
    read("[data-dashboard-column]"),
    read("[data-dashboard-card]"),
  );
}

const pick = (rect: DOMRect): Box => ({
  left: rect.left,
  top: rect.top,
  width: rect.width,
  height: rect.height,
});

/** The floating copy of the picked-up card; it alone re-renders on moves */
function DashboardGhost({
  width,
  content,
  initial,
  position,
}: {
  width: number;
  content: ReactNode;
  initial: { x: number; y: number };
  position: { current: ((x: number, y: number) => void) | null };
}) {
  const [at, setAt] = useState(initial);
  useEffect(() => {
    position.current = (x, y) => setAt({ x, y });
    return () => {
      position.current = null;
    };
  }, [position]);
  return (
    <View
      aria-hidden
      className="mn-dashboard-columns__ghost"
      style={{ left: `${at.x}px`, top: `${at.y}px`, width: `${width}px` }}
    >
      {content}
    </View>
  );
}

/**
 * A board of status columns in a horizontal scroll-view (`scrollX`):
 * equal-width columns (`columnWidth`), stretched equally with `fill` when
 * they fit, column bodies scrolling vertically within a bounded `height` /
 * `maxHeight`. `draggable` lets the DashboardCard children of keyed columns be
 * moved with a long press and drag (columns and cards are measured when a
 * card is picked up); the board is controlled and reports each move
 * (`onCardMove`).
 */
export function DashboardColumns({
  columnWidth,
  fill = false,
  gap,
  height,
  maxHeight,
  draggable = false,
  onCardMove,
  canDrop,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  className,
  style,
  id,
  children,
}: DashboardColumnsProps) {
  const { t } = useI18n();
  const generated = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const boardId = id ?? `mn-dashboard-columns-${generated}`;
  const length = (value: DashboardLength | undefined) => dashboardLength(value);
  const layout = useMemo(() => readLayout(children), [children]);
  const latest = useRef({ layout, onCardMove, canDrop });
  useEffect(() => {
    latest.current = { layout, onCardMove, canDrop };
  });
  const [view, setView] = useState<DragView | null>(null);
  const session = useRef<Session | null>(null);
  const pending = useRef<{ card: string; x: number; y: number } | null>(null);
  const last = useRef({ x: 0, y: 0 });
  const ghost = useRef<((x: number, y: number) => void) | null>(null);
  const [contents] = useState(() => new Map<string, ReactNode>());

  const accept = (move: DashboardCardMove) =>
    isDashboardNoop(move) ||
    !latest.current.canDrop ||
    latest.current.canDrop(move);

  const targetAt = (s: Session, x: number, y: number) => {
    const { layout: columns } = latest.current;
    if (
      s.board &&
      (y < s.board.top - 48 || y > s.board.top + s.board.height + 48)
    )
      return null;
    let best: DashboardLayoutColumn | null = null;
    let distance = Infinity;
    for (const column of columns) {
      const box = s.columns.get(column.key);
      if (!box) continue;
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
      .map((key) => s.cards.get(key))
      .filter((box): box is Box => !!box)
      .map((box) => box.top + box.height / 2);
    const move = dashboardCardMove(columns, s.card, {
      column: best.key,
      index: dashboardInsertIndex(midpoints, y),
    });
    return move && accept(move)
      ? { column: move.toColumn, index: move.toIndex }
      : null;
  };

  const lineFor = (s: Session, target: DashboardPosition | null) => {
    if (!target) return undefined;
    const column = latest.current.layout.find((c) => c.key === target.column);
    const box = s.columns.get(target.column);
    if (!column || !box) return undefined;
    const others = column.cards
      .filter((key) => key !== s.card)
      .map((key) => s.cards.get(key))
      .filter((entry): entry is Box => !!entry);
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
    const { x, y } = last.current;
    ghost.current?.(x - s.grab.x, y - s.grab.y);
    const target = targetAt(s, x, y);
    const same =
      target === s.target ||
      (target &&
        s.target &&
        target.column === s.target.column &&
        target.index === s.target.index);
    if (same) return;
    s.target = target;
    setView((current) =>
      current ? { ...current, target, line: lineFor(s, target) } : current,
    );
  };

  const context: DashboardDragContext = {
    draggable,
    view,
    lift(card, x, y) {
      const from = dashboardFind(latest.current.layout, card);
      if (!draggable || !from || session.current || pending.current) return;
      pending.current = { card, x, y };
      last.current = { x, y };
      measureBoard(boardId, (measured) => {
        if (pending.current?.card !== card) return;
        pending.current = null;
        const box = measured.cards.get(card);
        const s: Session = {
          ...measured,
          card,
          target: from,
          grab: box ? { x: x - box.left, y: y - box.top } : { x: 0, y: 0 },
        };
        session.current = s;
        setView({
          card,
          target: from,
          width: box?.width,
          line: lineFor(s, from),
          ghost: { x: x - s.grab.x, y: y - s.grab.y },
        });
        // a finger that moved while measuring
        update(s);
      });
    },
    active: (card) =>
      session.current?.card === card || pending.current?.card === card,
    move(x, y) {
      last.current = { x, y };
      if (session.current) update(session.current);
    },
    drop() {
      const s = session.current;
      pending.current = null;
      if (!s) return;
      session.current = null;
      setView(null);
      const move = s.target
        ? dashboardCardMove(latest.current.layout, s.card, s.target)
        : undefined;
      if (move && !isDashboardNoop(move) && accept(move))
        latest.current.onCardMove?.(move);
    },
    cancel() {
      pending.current = null;
      session.current = null;
      setView(null);
    },
    setContent(card, content) {
      if (content === undefined) contents.delete(card);
      else contents.set(card, content);
    },
  };

  return (
    <View
      id={boardId}
      role="region"
      aria-label={
        ariaLabelledBy ? ariaLabel : (ariaLabel ?? t("dashboard.label"))
      }
      aria-labelledby={ariaLabelledBy}
      data-minerva="dashboard-columns"
      data-part="root"
      className={cn(
        "mn-dashboard-columns",
        fill && "mn-fill",
        view && "mn-dragging",
        className,
      )}
      style={
        {
          "--dashboard-column-width": length(columnWidth),
          "--dashboard-gap": length(gap),
          ...style,
        } as CSSProperties
      }
    >
      <DragContext.Provider value={context}>
        <ScrollView
          scrollX={!view}
          enhanced
          showScrollbar
          className="mn-dashboard-columns__scroll"
          style={{ height: length(height), maxHeight: length(maxHeight) }}
        >
          <View className="mn-dashboard-columns__track">{children}</View>
        </ScrollView>
      </DragContext.Provider>
      {view?.line ? (
        <View
          aria-hidden
          className="mn-dashboard-columns__drop-line"
          style={{
            left: `${view.line.left}px`,
            top: `${view.line.top}px`,
            width: `${view.line.width}px`,
          }}
        />
      ) : null}
      {view?.width !== undefined ? (
        <DashboardGhost
          width={view.width}
          content={contents.get(view.card)}
          initial={view.ghost}
          position={ghost}
        />
      ) : null}
    </View>
  );
}

/**
 * A status column of a DashboardColumns: an accent dot (`color`), the `title`,
 * a `count` badge and `actions` in the header; the cards (children) as a
 * role="list" of role="listitem" views; `empty` content without cards and a
 * `footer`. The column is a role="group" named by its title and count.
 */
export function DashboardColumn({
  title,
  value,
  count: countProp,
  color,
  description,
  actions,
  empty,
  footer,
  children,
  "aria-label": ariaLabel,
  className,
  style,
  ...props
}: DashboardColumnProps) {
  const { t } = useI18n();
  const drag = useContext(DragContext);
  const dropTarget =
    value !== undefined && drag?.view?.target?.column === value;
  const titleId = `mn-dashboard-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const count = dashboardCount(countProp);
  const { scheme, custom } = dashboardAccent(color);
  const items = Children.toArray(children);
  const textTitle =
    typeof title === "string" || typeof title === "number"
      ? String(title)
      : undefined;
  const label =
    ariaLabel ??
    (textTitle !== undefined && count !== undefined
      ? t("dashboard.columnLabel", { title: textTitle, count })
      : textTitle);
  return (
    <Part
      name="dashboard-column"
      role="group"
      {...props}
      aria-label={label}
      aria-labelledby={
        label === undefined
          ? count !== undefined
            ? `${titleId} ${titleId}-count`
            : titleId
          : undefined
      }
      {...(scheme ? { "data-color": scheme } : null)}
      {...(value ? { "data-dashboard-column": value } : null)}
      className={cn(
        scheme && `mn-color-${scheme}`,
        dropTarget && "mn-drop-target",
        className,
      )}
      style={
        {
          ...(custom ? { "--dashboard-column-color": custom } : null),
          ...style,
        } as CSSProperties
      }
    >
      <ColumnPart part="header">
        {scheme || custom ? <ColumnPart part="indicator" aria-hidden /> : null}
        <ColumnPart part="title" id={titleId}>
          {typeof title === "string" || typeof title === "number" ? (
            <Text>{title}</Text>
          ) : (
            title
          )}
        </ColumnPart>
        {count !== undefined ? (
          <ColumnPart
            part="count"
            id={`${titleId}-count`}
            aria-hidden={label !== undefined || undefined}
          >
            <Text>{count}</Text>
          </ColumnPart>
        ) : null}
        {actions != null && actions !== false ? (
          <ColumnPart part="actions">{actions}</ColumnPart>
        ) : null}
      </ColumnPart>
      {description != null && description !== false ? (
        <ColumnPart part="description">
          {typeof description === "string" ? (
            <Text>{description}</Text>
          ) : (
            description
          )}
        </ColumnPart>
      ) : null}
      {items.length > 0 ? (
        <ColumnPart part="list" role="list">
          {items.map((item, index) => (
            <View
              key={isValidElement(item) && item.key != null ? item.key : index}
              role="listitem"
              className="mn-dashboard-column__item"
            >
              {item}
            </View>
          ))}
        </ColumnPart>
      ) : (
        <ColumnPart part="empty">
          {empty ?? <Text>{t("dashboard.empty")}</Text>}
        </ColumnPart>
      )}
      {footer != null && footer !== false ? (
        <ColumnPart part="footer">{footer}</ColumnPart>
      ) : null}
    </Part>
  );
}

/** A part of a column: its own BEM class only (not the root's) */
function ColumnPart({
  part,
  children,
  ...props
}: {
  part: string;
  children?: ReactNode;
  id?: string;
  role?: string;
  "aria-hidden"?: boolean;
}) {
  return (
    <View
      {...props}
      data-minerva="dashboard-column"
      data-part={part}
      className={`mn-dashboard-column__${part}`}
    >
      {children}
    </View>
  );
}

/**
 * A card of a DashboardColumn, keyed by `value`. In a draggable board a long
 * press picks it up; it then follows the finger and drops where the finger
 * lifts.
 */
export function DashboardCard({
  value,
  children,
  className,
  ...props
}: DashboardCardProps) {
  const drag = useContext(DragContext);
  const enabled = !!drag?.draggable;
  const dragging = drag?.view?.card === value;
  // the floating copy renders the card's content
  const setContent = drag?.setContent;
  useEffect(() => {
    setContent?.(value, children);
  });
  useEffect(() => () => setContent?.(value, undefined), [setContent, value]);

  // a press waiting for the long press
  const press = useRef<{
    x: number;
    y: number;
    timer: ReturnType<typeof setTimeout>;
  } | null>(null);
  const stopPress = () => {
    if (press.current) clearTimeout(press.current.timer);
    press.current = null;
  };
  useEffect(
    () => () => {
      if (press.current) clearTimeout(press.current.timer);
    },
    [],
  );

  const gestures = enabled
    ? {
        onTouchStart: (event: unknown) => {
          stopPress();
          const point = touchPoint(event);
          const touches = (event as { touches?: ArrayLike<unknown> }).touches;
          if (!point || (touches?.length ?? 1) > 1) return;
          press.current = {
            ...point,
            timer: setTimeout(() => {
              press.current = null;
              drag!.lift(value, point.x, point.y);
            }, LONG_PRESS),
          };
        },
        onTouchMove: (event: unknown) => {
          const point = touchPoint(event);
          if (!point) return;
          if (drag!.active(value)) {
            drag!.move(point.x, point.y);
            return;
          }
          // moving before the long press is a scroll
          const current = press.current;
          if (
            current &&
            Math.hypot(point.x - current.x, point.y - current.y) > TOLERANCE
          )
            stopPress();
        },
        onTouchEnd: () => {
          stopPress();
          if (drag!.active(value)) drag!.drop();
        },
        onTouchCancel: () => {
          stopPress();
          if (drag!.active(value)) drag!.cancel();
        },
      }
    : null;

  return (
    <Part
      name="dashboard-card"
      {...props}
      {...gestures}
      data-dashboard-card={value}
      className={cn(
        enabled && "mn-draggable",
        dragging && "mn-dragging",
        className,
      )}
    >
      {children}
    </Part>
  );
}

// Deprecated aliases (the component was called KanbanBoard), not documented.
/** @deprecated Use `DashboardColumns` */
export const KanbanBoard = DashboardColumns;
/** @deprecated Use `DashboardColumn` */
export const KanbanColumn = DashboardColumn;
/** @deprecated Use `DashboardCard` */
export const KanbanCard = DashboardCard;
/** @deprecated Use `DashboardColumnsProps` */
export type KanbanBoardProps = DashboardColumnsProps;
/** @deprecated Use `DashboardColumnProps` */
export type KanbanColumnProps = DashboardColumnProps;
/** @deprecated Use `DashboardCardProps` */
export type KanbanCardProps = DashboardCardProps;
/** @deprecated Use `DashboardCardMove` */
export type KanbanCardMove = DashboardCardMove;
/** @deprecated Use `DashboardLength` */
export type KanbanLength = DashboardLength;

import {
  Children,
  createContext,
  useContext,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  type CSSProperties,
} from "react";
import {
  kanbanAccent,
  kanbanCount,
  kanbanLength,
  type KanbanCardMove,
} from "@minerva/core";
import {
  createKanbanDrag,
  kanbanDataAdapter,
  type KanbanDrag,
} from "@minerva/dom";
import { cn } from "../../utils/cn";
import useI18n, { type TranslateFn } from "../../hooks/useI18n";
import { hooks } from "../../internal/stylingHooks";
import { useMergedRefs } from "../../internal/mergeRefs";
import styles from "./kanbanBoard.module.scss";
import type {
  KanbanBoardProps,
  KanbanCardProps,
  KanbanColumnProps,
} from "./types";

type StyleWithVars = CSSProperties & Record<`--${string}`, string | undefined>;

/** What the cards of a board need to know about dragging */
const KanbanDragContext = createContext<{
  draggable: boolean;
  hintId?: string;
}>({ draggable: false });

/**
 * KanbanBoard: a horizontally scrolling board of status columns
 * (KanbanColumn), equal-width by default (`columnWidth`, 18rem). `fill`
 * stretches the columns equally when they fit; `height` / `maxHeight` bound
 * the board so that the column bodies scroll vertically. The board is a
 * labelled `role="region"` and a tab stop, so the keyboard can scroll it;
 * on narrow screens the columns keep their width and snap while scrolling.
 *
 * `draggable` lets the KanbanCard children of keyed columns (`value`) be
 * dragged with the mouse, touch (long press) or the keyboard. The board is
 * controlled: it reports each move (`onCardMove`) and the app updates the
 * columns' data.
 */
const KanbanBoard = ({
  children,
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
  ref,
}: KanbanBoardProps) => {
  const { t } = useI18n();
  const hintId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const mergedRef = useMergedRefs(rootRef, ref);
  const dragRef = useRef<KanbanDrag | null>(null);
  // the controller lives as long as the board and reads the latest props
  const latest = useRef<{
    draggable: boolean;
    onCardMove?: (move: KanbanCardMove) => void;
    canDrop?: (move: KanbanCardMove) => boolean;
    t: TranslateFn;
  }>({ draggable, onCardMove, canDrop, t });

  useLayoutEffect(() => {
    latest.current = { draggable, onCardMove, canDrop, t };
    dragRef.current?.refresh();
  });

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const drag = createKanbanDrag(root, {
      ...kanbanDataAdapter(root),
      scroller: () => root,
      hintId,
      enabled: () => latest.current.draggable,
      canDrop: (move) => latest.current.canDrop?.(move) ?? true,
      onMove: (move) => latest.current.onCardMove?.(move),
      t: (key, params) => latest.current.t(key, params),
    });
    dragRef.current = drag;
    return () => {
      drag.destroy();
      dragRef.current = null;
    };
  }, [hintId]);

  const dragContext = useMemo(
    () => ({ draggable, hintId }),
    [draggable, hintId],
  );
  const boardStyle: StyleWithVars = {
    "--kanban-column-width": kanbanLength(columnWidth),
    "--kanban-gap": kanbanLength(gap),
    height: kanbanLength(height),
    maxHeight: kanbanLength(maxHeight),
    ...style,
  };
  return (
    <div
      ref={mergedRef}
      id={id}
      role="region"
      aria-label={ariaLabelledBy ? ariaLabel : (ariaLabel ?? t("kanban.label"))}
      aria-labelledby={ariaLabelledBy}
      tabIndex={0}
      className={cn(styles.board, fill && styles.fill, className)}
      style={boardStyle}
      {...hooks("kanban-board", "root")}
    >
      <KanbanDragContext.Provider value={dragContext}>
        {children}
      </KanbanDragContext.Provider>
    </div>
  );
};

/**
 * KanbanColumn: a status column of a KanbanBoard. The header shows an
 * optional accent dot (`color`: a theme color or any CSS color), the
 * `title`, a `count` badge and `actions`; the cards (children) form a
 * `role="list"` (each child is wrapped in a `role="listitem"`) that scrolls
 * vertically within a bounded board; `empty` replaces the list when there
 * are no cards, and `footer` sits below. The column is a `role="group"`
 * named by its title and count ("To do, 3 items"). `value` keys the column
 * for drag and drop.
 */
const KanbanColumn = ({
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
  id,
  ref,
}: KanbanColumnProps) => {
  const { t } = useI18n();
  const titleId = useId();
  const count = kanbanCount(countProp);
  const { scheme, custom } = kanbanAccent(color);
  const items = Children.toArray(children);
  const textTitle =
    typeof title === "string" || typeof title === "number"
      ? String(title)
      : undefined;
  const label =
    ariaLabel ??
    (textTitle !== undefined && count !== undefined
      ? t("kanban.columnLabel", { title: textTitle, count })
      : textTitle);
  const columnStyle: StyleWithVars = {
    "--kanban-column-color": custom,
    ...style,
  };
  return (
    <section
      ref={ref}
      id={id}
      role="group"
      aria-label={label}
      aria-labelledby={
        label === undefined
          ? count !== undefined
            ? `${titleId} ${titleId}-count`
            : titleId
          : undefined
      }
      className={cn(styles.column, scheme && styles[scheme], className)}
      style={columnStyle}
      data-kanban-column={value || undefined}
      {...hooks("kanban-column", "root", { color: scheme })}
    >
      <div className={styles.header} {...hooks("kanban-column", "header")}>
        {scheme || custom ? (
          <span
            className={styles.indicator}
            aria-hidden
            {...hooks("kanban-column", "indicator")}
          />
        ) : null}
        <span
          id={titleId}
          className={styles.title}
          {...hooks("kanban-column", "title")}
        >
          {title}
        </span>
        {count !== undefined ? (
          <span
            id={`${titleId}-count`}
            className={styles.count}
            aria-hidden={label !== undefined || undefined}
            {...hooks("kanban-column", "count")}
          >
            {count}
          </span>
        ) : null}
        {actions != null && actions !== false ? (
          <div
            className={styles.actions}
            {...hooks("kanban-column", "actions")}
          >
            {actions}
          </div>
        ) : null}
      </div>
      {description != null && description !== false ? (
        <p
          className={styles.description}
          {...hooks("kanban-column", "description")}
        >
          {description}
        </p>
      ) : null}
      {items.length > 0 ? (
        <div
          role="list"
          className={styles.list}
          {...hooks("kanban-column", "list")}
        >
          {items.map((item, index) => (
            <div
              role="listitem"
              key={
                typeof item === "object" && "key" in item && item.key != null
                  ? item.key
                  : index
              }
              className={styles.item}
            >
              {item}
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.empty} {...hooks("kanban-column", "empty")}>
          {empty ?? t("kanban.empty")}
        </div>
      )}
      {footer != null && footer !== false ? (
        <div className={styles.footer} {...hooks("kanban-column", "footer")}>
          {footer}
        </div>
      ) : null}
    </section>
  );
};

/**
 * KanbanCard: a card of a KanbanColumn, keyed by `value`. In a draggable
 * board it is a focusable `role="button"` described by the drag
 * instructions; otherwise it renders a plain wrapper. Controls inside a
 * draggable card keep working (a drag never starts on them), but keep them
 * few: they sit inside the button.
 */
const KanbanCard = ({
  value,
  label,
  children,
  className,
  style,
  id,
  ref,
}: KanbanCardProps) => {
  const { draggable, hintId } = useContext(KanbanDragContext);
  // a draggable card is a focusable button described by the instructions
  const interactive = draggable
    ? {
        role: "button",
        tabIndex: 0,
        "aria-label": label,
        "aria-describedby": hintId,
        "data-draggable": true,
      }
    : null;
  return (
    <div
      ref={ref}
      id={id}
      {...interactive}
      data-kanban-card={value}
      className={cn(styles.card, className)}
      style={style}
      {...hooks("kanban-card", "root")}
    >
      {children}
    </div>
  );
};

export { KanbanBoard, KanbanCard, KanbanColumn };
export default KanbanBoard;

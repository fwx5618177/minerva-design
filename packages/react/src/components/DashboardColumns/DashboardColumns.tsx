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
  dashboardAccent,
  dashboardCount,
  dashboardLength,
  type DashboardCardMove,
} from "@minerva/core";
import {
  createDashboardDrag,
  dashboardDataAdapter,
  type DashboardDrag,
} from "@minerva/dom";
import { cn } from "../../utils/cn";
import useI18n, { type TranslateFn } from "../../hooks/useI18n";
import { hooks } from "../../internal/stylingHooks";
import { useMergedRefs } from "../../internal/mergeRefs";
import styles from "./dashboardColumns.module.scss";
import type {
  DashboardColumnsProps,
  DashboardCardProps,
  DashboardColumnProps,
} from "./types";

type StyleWithVars = CSSProperties & Record<`--${string}`, string | undefined>;

/** What the cards of a board need to know about dragging */
const DashboardDragContext = createContext<{
  draggable: boolean;
  hintId?: string;
}>({ draggable: false });

/**
 * DashboardColumns: a horizontally scrolling board of status columns
 * (DashboardColumn), equal-width by default (`columnWidth`, 18rem). `fill`
 * stretches the columns equally when they fit; `height` / `maxHeight` bound
 * the board so that the column bodies scroll vertically. The board is a
 * labelled `role="region"` and a tab stop, so the keyboard can scroll it;
 * on narrow screens the columns keep their width and snap while scrolling.
 *
 * `draggable` lets the DashboardCard children of keyed columns (`value`) be
 * dragged with the mouse, touch (long press) or the keyboard. The board is
 * controlled: it reports each move (`onCardMove`) and the app updates the
 * columns' data.
 */
const DashboardColumns = ({
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
}: DashboardColumnsProps) => {
  const { t } = useI18n();
  const hintId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const mergedRef = useMergedRefs(rootRef, ref);
  const dragRef = useRef<DashboardDrag | null>(null);
  // the controller lives as long as the board and reads the latest props
  const latest = useRef<{
    draggable: boolean;
    onCardMove?: (move: DashboardCardMove) => void;
    canDrop?: (move: DashboardCardMove) => boolean;
    t: TranslateFn;
  }>({ draggable, onCardMove, canDrop, t });

  useLayoutEffect(() => {
    latest.current = { draggable, onCardMove, canDrop, t };
    dragRef.current?.refresh();
  });

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const drag = createDashboardDrag(root, {
      ...dashboardDataAdapter(root),
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
    "--dashboard-column-width": dashboardLength(columnWidth),
    "--dashboard-gap": dashboardLength(gap),
    height: dashboardLength(height),
    maxHeight: dashboardLength(maxHeight),
    ...style,
  };
  return (
    <div
      ref={mergedRef}
      id={id}
      role="region"
      aria-label={
        ariaLabelledBy ? ariaLabel : (ariaLabel ?? t("dashboard.label"))
      }
      aria-labelledby={ariaLabelledBy}
      tabIndex={0}
      className={cn(styles.board, fill && styles.fill, className)}
      style={boardStyle}
      {...hooks("dashboard-columns", "root")}
    >
      <DashboardDragContext.Provider value={dragContext}>
        {children}
      </DashboardDragContext.Provider>
    </div>
  );
};

/**
 * DashboardColumn: a status column of a DashboardColumns. The header shows an
 * optional accent dot (`color`: a theme color or any CSS color), the
 * `title`, a `count` badge and `actions`; the cards (children) form a
 * `role="list"` (each child is wrapped in a `role="listitem"`) that scrolls
 * vertically within a bounded board; `empty` replaces the list when there
 * are no cards, and `footer` sits below. The column is a `role="group"`
 * named by its title and count ("To do, 3 items"). `value` keys the column
 * for drag and drop.
 */
const DashboardColumn = ({
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
}: DashboardColumnProps) => {
  const { t } = useI18n();
  const titleId = useId();
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
  const columnStyle: StyleWithVars = {
    "--dashboard-column-color": custom,
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
      data-dashboard-column={value || undefined}
      {...hooks("dashboard-column", "root", { color: scheme })}
    >
      <div className={styles.header} {...hooks("dashboard-column", "header")}>
        {scheme || custom ? (
          <span
            className={styles.indicator}
            aria-hidden
            {...hooks("dashboard-column", "indicator")}
          />
        ) : null}
        <span
          id={titleId}
          className={styles.title}
          {...hooks("dashboard-column", "title")}
        >
          {title}
        </span>
        {count !== undefined ? (
          <span
            id={`${titleId}-count`}
            className={styles.count}
            aria-hidden={label !== undefined || undefined}
            {...hooks("dashboard-column", "count")}
          >
            {count}
          </span>
        ) : null}
        {actions != null && actions !== false ? (
          <div
            className={styles.actions}
            {...hooks("dashboard-column", "actions")}
          >
            {actions}
          </div>
        ) : null}
      </div>
      {description != null && description !== false ? (
        <p
          className={styles.description}
          {...hooks("dashboard-column", "description")}
        >
          {description}
        </p>
      ) : null}
      {items.length > 0 ? (
        <div
          role="list"
          className={styles.list}
          {...hooks("dashboard-column", "list")}
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
        <div className={styles.empty} {...hooks("dashboard-column", "empty")}>
          {empty ?? t("dashboard.empty")}
        </div>
      )}
      {footer != null && footer !== false ? (
        <div className={styles.footer} {...hooks("dashboard-column", "footer")}>
          {footer}
        </div>
      ) : null}
    </section>
  );
};

/**
 * DashboardCard: a card of a DashboardColumn, keyed by `value`. In a draggable
 * board it is a focusable `role="button"` described by the drag
 * instructions; otherwise it renders a plain wrapper. Controls inside a
 * draggable card keep working (a drag never starts on them), but keep them
 * few: they sit inside the button.
 */
const DashboardCard = ({
  value,
  label,
  children,
  className,
  style,
  id,
  ref,
}: DashboardCardProps) => {
  const { draggable, hintId } = useContext(DashboardDragContext);
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
      data-dashboard-card={value}
      className={cn(styles.card, className)}
      style={style}
      {...hooks("dashboard-card", "root")}
    >
      {children}
    </div>
  );
};

export { DashboardColumns, DashboardCard, DashboardColumn };
export default DashboardColumns;

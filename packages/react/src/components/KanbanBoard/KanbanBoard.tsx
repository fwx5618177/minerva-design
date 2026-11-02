import { Children, useId, type CSSProperties } from "react";
import { kanbanAccent, kanbanCount, kanbanLength } from "@minerva/core";
import { cn } from "../../utils/cn";
import useI18n from "../../hooks/useI18n";
import { hooks } from "../../internal/stylingHooks";
import styles from "./kanbanBoard.module.scss";
import type { KanbanBoardProps, KanbanColumnProps } from "./types";

type StyleWithVars = CSSProperties & Record<`--${string}`, string | undefined>;

/**
 * KanbanBoard: a horizontally scrolling board of status columns
 * (KanbanColumn), equal-width by default (`columnWidth`, 18rem). `fill`
 * stretches the columns equally when they fit; `height` / `maxHeight` bound
 * the board so that the column bodies scroll vertically. The board is a
 * labelled `role="region"` and a tab stop, so the keyboard can scroll it;
 * on narrow screens the columns keep their width and snap while scrolling.
 *
 * Drag and drop is not built in: move cards with your own actions (a menu,
 * buttons) and update the columns' data.
 */
const KanbanBoard = ({
  children,
  columnWidth,
  fill = false,
  gap,
  height,
  maxHeight,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  className,
  style,
  id,
  ref,
}: KanbanBoardProps) => {
  const { t } = useI18n();
  const boardStyle: StyleWithVars = {
    "--kanban-column-width": kanbanLength(columnWidth),
    "--kanban-gap": kanbanLength(gap),
    height: kanbanLength(height),
    maxHeight: kanbanLength(maxHeight),
    ...style,
  };
  return (
    <div
      ref={ref}
      id={id}
      role="region"
      aria-label={ariaLabelledBy ? ariaLabel : (ariaLabel ?? t("kanban.label"))}
      aria-labelledby={ariaLabelledBy}
      tabIndex={0}
      className={cn(styles.board, fill && styles.fill, className)}
      style={boardStyle}
      {...hooks("kanban-board", "root")}
    >
      {children}
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
 * named by its title and count ("To do, 3 items").
 */
const KanbanColumn = ({
  title,
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

export { KanbanBoard, KanbanColumn };
export default KanbanBoard;

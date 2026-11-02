import {
  Children,
  isValidElement,
  useId,
  type CSSProperties,
  type ReactNode,
} from "react";
import { ScrollView, View, Text } from "@tarojs/components";
import { cn, kanbanAccent, kanbanCount, kanbanLength } from "@minerva/core";
import { useI18n } from "./theme";
import { Part, type NativeProps } from "./shared";

/** A length: a number of pixels or any CSS length ("288px", "40vh") */
export type KanbanLength = number | string;

export interface KanbanBoardProps extends NativeProps {
  /** Width of every column (a number is pixels; default 18rem / 288px); with `fill` the minimum width */
  columnWidth?: KanbanLength;
  /** Stretches the columns equally to fill the board when they fit (default false) */
  fill?: boolean;
  /** Space between the columns (a number is pixels; default 12px) */
  gap?: KanbanLength;
  /** Height of the board: the column bodies scroll vertically within it */
  height?: KanbanLength;
  /** Maximum height of the board: the column bodies scroll vertically within it */
  maxHeight?: KanbanLength;
}

export interface KanbanColumnProps extends Omit<NativeProps, "children"> {
  /** Title of the column (also its accessible name) */
  title: ReactNode;
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

/**
 * A board of status columns in a horizontal scroll-view (`scrollX`):
 * equal-width columns (`columnWidth`), stretched equally with `fill` when
 * they fit, column bodies scrolling vertically within a bounded `height` /
 * `maxHeight`. Drag and drop is not built in: move cards with your own
 * actions and update the columns' data.
 */
export function KanbanBoard({
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
  children,
}: KanbanBoardProps) {
  const { t } = useI18n();
  const length = (value: KanbanLength | undefined) => kanbanLength(value);
  return (
    <View
      id={id}
      role="region"
      aria-label={ariaLabelledBy ? ariaLabel : (ariaLabel ?? t("kanban.label"))}
      aria-labelledby={ariaLabelledBy}
      data-minerva="kanban-board"
      data-part="root"
      className={cn("mn-kanban-board", fill && "mn-fill", className)}
      style={
        {
          "--kanban-column-width": length(columnWidth),
          "--kanban-gap": length(gap),
          ...style,
        } as CSSProperties
      }
    >
      <ScrollView
        scrollX
        enhanced
        showScrollbar
        className="mn-kanban-board__scroll"
        style={{ height: length(height), maxHeight: length(maxHeight) }}
      >
        <View className="mn-kanban-board__track">{children}</View>
      </ScrollView>
    </View>
  );
}

/**
 * A status column of a KanbanBoard: an accent dot (`color`), the `title`,
 * a `count` badge and `actions` in the header; the cards (children) as a
 * role="list" of role="listitem" views; `empty` content without cards and a
 * `footer`. The column is a role="group" named by its title and count.
 */
export function KanbanColumn({
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
  ...props
}: KanbanColumnProps) {
  const { t } = useI18n();
  const titleId = `mn-kanban-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
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
  return (
    <Part
      name="kanban-column"
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
      className={cn(scheme && `mn-color-${scheme}`, className)}
      style={
        {
          ...(custom ? { "--kanban-column-color": custom } : null),
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
              className="mn-kanban-column__item"
            >
              {item}
            </View>
          ))}
        </ColumnPart>
      ) : (
        <ColumnPart part="empty">
          {empty ?? <Text>{t("kanban.empty")}</Text>}
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
      data-minerva="kanban-column"
      data-part={part}
      className={`mn-kanban-column__${part}`}
    >
      {children}
    </View>
  );
}

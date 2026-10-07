import { cn } from "../../utils/cn";
import type { TableCellContentProps } from "./types";
import styles from "./table.module.scss";

/**
 * TableCellContent: bounded, wrapping content inside a table cell (not a
 * replacement for `<td>`), with an optional muted secondary line.
 */
export const TableCellContent = ({
  primary,
  secondary,
  monospace = false,
  maxWidth = 360,
  className,
  style,
  ref,
  ...rest
}: TableCellContentProps) => {
  const Primary = monospace ? "code" : "div";
  const hasSecondary = secondary != null;
  return (
    <div
      ref={ref}
      className={cn(styles.cellContent, "ui-table-cell-content", className)}
      data-secondary={hasSecondary || undefined}
      style={{ maxWidth, ...style }}
      {...rest}
    >
      <Primary
        className={cn(
          styles.cellPrimary,
          monospace && styles.cellMono,
          hasSecondary && styles.cellStrong,
          "ui-table-cell-primary",
        )}
      >
        {primary}
      </Primary>
      {hasSecondary && (
        <div className={cn(styles.cellSecondary, "ui-table-cell-secondary")}>
          {secondary}
        </div>
      )}
    </div>
  );
};

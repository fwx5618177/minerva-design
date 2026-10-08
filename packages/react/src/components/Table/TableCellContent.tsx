import { cn } from "../../utils/cn";
import type { TableCellContentProps } from "./types";
import { hooks } from "../../internal/stylingHooks";
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
      className={cn(styles.cellContent, className)}
      style={{ maxWidth, ...style }}
      {...rest}
      {...hooks("table-cell-content", "root")}
    >
      <Primary
        className={cn(
          styles.cellPrimary,
          monospace && styles.cellMono,
          hasSecondary && styles.cellStrong,
        )}
        {...hooks("table-cell-content", "primary")}
      >
        {primary}
      </Primary>
      {hasSecondary && (
        <div
          className={styles.cellSecondary}
          {...hooks("table-cell-content", "secondary")}
        >
          {secondary}
        </div>
      )}
    </div>
  );
};

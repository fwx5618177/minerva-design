import type { CSSProperties, ElementType } from "react";
import { cn } from "../../utils/cn";
import { resolveSpace } from "../../internal/space";
import type { ResponsiveGridProps } from "./types";
import styles from "./responsiveGrid.module.scss";

const BREAKPOINTS = ["base", "sm", "md", "lg"] as const;

/**
 * ResponsiveGrid: an equal-width column grid whose column count follows its own
 * available width (container queries at 480 / 768 / 1200px), not the viewport.
 */
const ResponsiveGrid = ({
  as = "div",
  columns = 1,
  gap = 4,
  rowGap = gap,
  columnGap = gap,
  children,
  className,
  style,
  ...rest
}: ResponsiveGridProps) => {
  const Tag = as as ElementType;
  const counts = typeof columns === "number" ? { base: columns } : columns;
  const variables: Record<string, string | number> = {};
  let previous = 1;
  for (const key of BREAKPOINTS) {
    const value = counts[key] ?? previous;
    if (!Number.isInteger(value) || value < 1 || value > 12) {
      throw new RangeError(
        "ResponsiveGrid columns must be integers from 1 to 12",
      );
    }
    variables[`--grid-columns-${key}`] = value;
    previous = value;
  }
  variables["--grid-row-gap"] = resolveSpace(rowGap);
  variables["--grid-column-gap"] = resolveSpace(columnGap);

  return (
    <Tag
      className={cn(styles.root, className)}
      style={{ ...variables, ...style } as CSSProperties}
      {...rest}
    >
      <div className={styles.layout}>{children}</div>
    </Tag>
  );
};

export default ResponsiveGrid;

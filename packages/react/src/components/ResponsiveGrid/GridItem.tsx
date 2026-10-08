import { Slot } from "../../internal/Slot";
import { cn } from "../../utils/cn";
import type { GridItemProps } from "./types";
import styles from "./responsiveGrid.module.scss";
import { hooks } from "../../internal/stylingHooks";

/**
 * GridItem: a cell of a ResponsiveGrid (or any CSS grid). `fullWidth` spans the
 * whole row; `asChild` applies the item to its single child without a wrapper.
 */
const GridItem = ({
  fullWidth = false,
  asChild = false,
  className,
  ...rest
}: GridItemProps) => {
  const Component = asChild ? Slot : "div";
  return (
    <Component
      className={cn(styles.item, fullWidth && styles.fullWidth, className)}
      {...rest}
      {...hooks("grid-item", "root")}
    />
  );
};

export default GridItem;

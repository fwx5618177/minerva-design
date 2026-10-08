import { cn } from "../../utils/cn";
import type { ListProps } from "./types";
import styles from "./list.module.scss";
import { hooks } from "../../internal/stylingHooks";

/**
 * List: a quiet operational list on a native <ul> (markers removed, list
 * semantics kept with role="list"). Rows are ListItem elements.
 */
export const List = ({
  density = "default",
  dividers = true,
  bordered = false,
  role = "list",
  className,
  ref,
  ...rest
}: ListProps) => (
  <ul
    ref={ref}
    role={role}
    className={cn(
      styles.list,
      density === "compact" && styles.compact,
      density === "comfortable" && styles.comfortable,
      bordered && styles.bordered,
      dividers && styles.dividers,
      className,
    )}
    {...rest}
    {...hooks("list", "root")}
  />
);

export default List;

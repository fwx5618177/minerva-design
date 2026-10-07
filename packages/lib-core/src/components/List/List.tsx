import { cn } from "../../utils/cn";
import type { ListProps } from "./types";
import styles from "./list.module.scss";

/**
 * List: a quiet operational list on a native <ul> (markers removed, list
 * semantics kept with role="list"). Rows are ListItem elements.
 */
export const List = ({
  density = "default",
  dividers = true,
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
      dividers && styles.dividers,
      "ui-list",
      `ui-list-density-${density}`,
      dividers && "ui-list-dividers",
      className,
    )}
    {...rest}
  />
);

export default List;

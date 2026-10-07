import { cn } from "../../utils/cn";
import type { ListItemProps } from "./types";
import styles from "./list.module.scss";

/** Optional slots skip null, booleans and empty strings (0 is content) */
const hasContent = (value: React.ReactNode) =>
  value != null && typeof value !== "boolean" && value !== "";

/**
 * ListItem: a native <li> row with primary / secondary text, a decorative icon
 * and trailing actions. It adds no selection state, tab stop or row command.
 */
export const ListItem = ({
  primary,
  secondary,
  icon,
  actions,
  className,
  ref,
  ...rest
}: ListItemProps) => (
  <li ref={ref} className={cn(styles.item, className)} {...rest}>
    {hasContent(icon) && (
      <div className={styles.icon} aria-hidden="true">
        {icon}
      </div>
    )}
    <div className={styles.content}>
      <div className={styles.primary}>{primary}</div>
      {hasContent(secondary) && (
        <div className={styles.secondary}>{secondary}</div>
      )}
    </div>
    {hasContent(actions) && <div className={styles.actions}>{actions}</div>}
  </li>
);

export default ListItem;

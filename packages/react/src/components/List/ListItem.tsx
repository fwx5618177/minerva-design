import { cn } from "../../utils/cn";
import type { ListItemProps } from "./types";
import styles from "./list.module.scss";
import { hooks } from "../../internal/stylingHooks";

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
  <li
    ref={ref}
    className={cn(styles.item, className)}
    {...rest}
    {...hooks("list-item", "root")}
  >
    {hasContent(icon) && (
      <div
        className={styles.icon}
        aria-hidden="true"
        {...hooks("list-item", "icon")}
      >
        {icon}
      </div>
    )}
    <div className={styles.content}>
      <div className={styles.primary} {...hooks("list-item", "label")}>
        {primary}
      </div>
      {hasContent(secondary) && (
        <div
          className={styles.secondary}
          {...hooks("list-item", "description")}
        >
          {secondary}
        </div>
      )}
    </div>
    {hasContent(actions) && (
      <div className={styles.actions} {...hooks("list-item", "actions")}>
        {actions}
      </div>
    )}
  </li>
);

export default ListItem;

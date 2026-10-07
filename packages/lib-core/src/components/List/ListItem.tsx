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
  <li
    ref={ref}
    className={cn(styles.item, "ui-list-item", className)}
    {...rest}
  >
    {hasContent(icon) && (
      <div className={cn(styles.icon, "ui-list-item-icon")} aria-hidden="true">
        {icon}
      </div>
    )}
    <div className={cn(styles.content, "ui-list-item-content")}>
      <div className={cn(styles.primary, "ui-list-item-primary")}>
        {primary}
      </div>
      {hasContent(secondary) && (
        <div className={cn(styles.secondary, "ui-list-item-secondary")}>
          {secondary}
        </div>
      )}
    </div>
    {hasContent(actions) && (
      <div className={cn(styles.actions, "ui-list-item-actions")}>
        {actions}
      </div>
    )}
  </li>
);

export default ListItem;

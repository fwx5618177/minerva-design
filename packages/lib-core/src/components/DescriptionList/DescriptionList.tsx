import { cn } from "../../utils/cn";
import type { DescriptionListProps } from "./types";
import styles from "./descriptionList.module.scss";
import { hooks } from "../../internal/stylingHooks";

/**
 * DescriptionList: labeled metadata fields as a native <dl>. Each item is a
 * row (<div>) holding one <dt> / <dd> pair; rows stack on narrow screens.
 */
export const DescriptionList = ({
  items,
  bordered = false,
  striped = false,
  className,
  ref,
  ...rest
}: DescriptionListProps) => (
  <dl
    ref={ref}
    className={cn(
      styles.descriptionList,
      bordered && styles.bordered,
      striped && styles.striped,
      className,
    )}
    {...rest}
    {...hooks("description-list", "root")}
  >
    {items.map((item) => (
      <div
        className={styles.row}
        key={item.key}
        {...hooks("description-list", "row")}
      >
        <dt {...hooks("description-list", "term")}>{item.label}</dt>
        <dd {...hooks("description-list", "description")}>{item.value}</dd>
      </div>
    ))}
  </dl>
);

export default DescriptionList;

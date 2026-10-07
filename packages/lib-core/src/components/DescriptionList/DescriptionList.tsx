import { cn } from "../../utils/cn";
import type { DescriptionListProps } from "./types";
import styles from "./descriptionList.module.scss";

/**
 * DescriptionList: labeled metadata fields as a native <dl>. Each item is a
 * row (<div>) holding one <dt> / <dd> pair; rows stack on narrow screens.
 */
export const DescriptionList = ({
  items,
  className,
  ref,
  ...rest
}: DescriptionListProps) => (
  <dl
    ref={ref}
    className={cn(styles.descriptionList, "ui-description-list", className)}
    {...rest}
  >
    {items.map((item) => (
      <div className={cn(styles.row, "ui-description-row")} key={item.key}>
        <dt>{item.label}</dt>
        <dd>{item.value}</dd>
      </div>
    ))}
  </dl>
);

export default DescriptionList;

import { cn } from "../../utils/cn";
import ResponsiveGrid from "../ResponsiveGrid/ResponsiveGrid";
import type { FormLayoutProps } from "./types";
import styles from "./formLayout.module.scss";

/**
 * FormLayout: a native <form> laying its fields out on a ResponsiveGrid.
 * Form attributes, handlers and `ref` go to the <form>; submit, reset and
 * native validation are left to the browser and the consumer.
 */
export const FormLayout = ({
  columns,
  gap,
  rowGap,
  columnGap,
  className,
  children,
  ref,
  ...rest
}: FormLayoutProps) => (
  <form
    ref={ref}
    className={cn(styles.root, "ui-form-layout", className)}
    {...rest}
  >
    <ResponsiveGrid
      columns={columns}
      gap={gap}
      rowGap={rowGap}
      columnGap={columnGap}
    >
      {children}
    </ResponsiveGrid>
  </form>
);

export default FormLayout;

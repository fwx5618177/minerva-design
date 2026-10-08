import type { FormHTMLAttributes, Ref } from "react";
import type { ResponsiveGridColumns } from "../ResponsiveGrid/types";

export interface FormLayoutProps extends FormHTMLAttributes<HTMLFormElement> {
  /**
   * Column counts of the inner ResponsiveGrid: a number, or `{ base, sm, md, lg }`
   * (container widths 480 / 768 / 1200px). Integers 1-12
   * @default 1
   */
  columns?: ResponsiveGridColumns;
  /**
   * Gap between fields: numbers and numeric strings select spacing tokens,
   * other strings are CSS values
   * @default 4
   */
  gap?: string | number;
  /** Gap between rows; defaults to `gap` */
  rowGap?: string | number;
  /** Gap between columns; defaults to `gap` */
  columnGap?: string | number;
  /** Ref to the <form> element */
  ref?: Ref<HTMLFormElement>;
}

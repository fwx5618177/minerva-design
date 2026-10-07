import type { ElementType, HTMLAttributes, Ref } from "react";

/** Flex direction of a Stack */
export type StackDirection =
  "row" | "column" | "row-reverse" | "column-reverse";
/** Cross-axis alignment of a Stack (`align-items`) */
export type StackAlign = "start" | "center" | "end" | "stretch" | "baseline";
/** Main-axis distribution of a Stack (`justify-content`) */
export type StackJustify =
  "start" | "center" | "end" | "between" | "around" | "evenly";

export interface StackProps extends HTMLAttributes<HTMLElement> {
  /** Ref to the rendered element */
  ref?: Ref<HTMLElement>;
  /**
   * Element or component to render
   * @default "div"
   */
  as?: ElementType;
  /**
   * Flex direction
   * @default "column"
   */
  direction?: StackDirection;
  /**
   * Gap between items: numbers and numeric strings select spacing tokens
   * (`2` -> `var(--space-2)`), other strings are CSS values. No gap when omitted.
   */
  gap?: string | number;
  /** Cross-axis alignment (`align-items`); unset when omitted */
  align?: StackAlign;
  /** Main-axis distribution (`justify-content`); unset when omitted */
  justify?: StackJustify;
  /**
   * Wraps items onto multiple lines
   * @default false
   */
  wrap?: boolean;
}

/** Props of HStack / VStack: a Stack with a fixed direction */
export type HStackProps = Omit<StackProps, "direction">;
/** Props of VStack: a Stack with a fixed column direction */
export type VStackProps = Omit<StackProps, "direction">;

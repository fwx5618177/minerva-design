import type { CSSProperties, ElementType } from "react";
import { cn } from "../../utils/cn";
import { resolveSpace } from "../../internal/space";
import type {
  HStackProps,
  StackAlign,
  StackJustify,
  StackProps,
  VStackProps,
} from "./types";
import styles from "./stack.module.scss";

const alignMap: Record<StackAlign, string> = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  stretch: "stretch",
  baseline: "baseline",
};

const justifyMap: Record<StackJustify, string> = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  between: "space-between",
  around: "space-around",
  evenly: "space-evenly",
};

/**
 * Stack: a flex container that lays out its children in a row or column with a
 * token-based gap. Unlike `Space` it does not wrap each child in an item element.
 */
export const Stack = ({
  as = "div",
  direction = "column",
  gap,
  align,
  justify,
  wrap,
  style,
  className,
  ...rest
}: StackProps) => {
  const Tag = as as ElementType;
  const computed: CSSProperties = {
    ...(gap !== undefined && { gap: resolveSpace(gap) }),
    ...(align && { alignItems: alignMap[align] }),
    ...(justify && { justifyContent: justifyMap[justify] }),
    ...style,
  };

  return (
    <Tag
      className={cn(
        styles.stack,
        styles[direction],
        wrap && styles.wrap,
        "ui-stack",
        `ui-stack-${direction}`,
        wrap && "ui-stack-wrap",
        className,
      )}
      style={computed}
      {...rest}
    />
  );
};

/** HStack: a horizontal Stack, centered on the cross axis by default. */
export const HStack = ({ align, ...props }: HStackProps) => (
  <Stack {...props} direction="row" align={align ?? "center"} />
);

/** VStack: a vertical Stack, stretched on the cross axis by default. */
export const VStack = ({ align, ...props }: VStackProps) => (
  <Stack {...props} direction="column" align={align ?? "stretch"} />
);

export default Stack;

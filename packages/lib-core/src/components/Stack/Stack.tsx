import { Children, Fragment, isValidElement } from "react";
import type { CSSProperties, ElementType, ReactNode } from "react";
import { cn } from "../../utils/cn";
import { resolveSpace } from "@minerva/core";
import type {
  HStackProps,
  StackAlign,
  StackJustify,
  StackProps,
  VStackProps,
} from "./types";
import styles from "./stack.module.scss";
import { hooks } from "../../internal/stylingHooks";

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

/** Styling hook component of a stack (`data-minerva`) */
type StackHookName = "stack" | "hstack" | "vstack";

/**
 * Stack: a flex container that lays out its children in a row or column with a
 * token-based gap. It does not wrap children in item elements; an optional
 * `separator` is inserted between them, and `attached` joins them into one
 * group (shared borders, outer corners only).
 */
export const Stack = (props: StackProps) => (
  <StackBase {...props} hookName="stack" />
);

const StackBase = ({
  hookName,
  as = "div",
  direction = "column",
  gap,
  align,
  justify,
  wrap,
  separator,
  attached = false,
  style,
  className,
  children,
  ...rest
}: StackProps & { hookName: StackHookName }) => {
  const Tag = as as ElementType;
  const computed: CSSProperties = {
    ...(gap !== undefined && !attached && { gap: resolveSpace(gap) }),
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
        attached && styles.attached,
        className,
      )}
      style={computed}
      role={attached ? "group" : undefined}
      {...rest}
      {...hooks(
        hookName,
        "root",
        hookName === "stack"
          ? {
              orientation: direction.startsWith("row")
                ? "horizontal"
                : "vertical",
            }
          : undefined,
      )}
    >
      {separator === undefined || separator === null
        ? children
        : withSeparators(children, separator)}
    </Tag>
  );
};

/** Interleaves `separator` between the non-empty children, keeping their keys. */
const withSeparators = (children: ReactNode, separator: ReactNode) =>
  Children.toArray(children).map((child, i) => {
    const key = isValidElement(child) ? child.key : i;
    return (
      <Fragment key={key}>
        {i > 0 && separator}
        {child}
      </Fragment>
    );
  });

/** HStack: a horizontal Stack, centered on the cross axis by default. */
export const HStack = ({ align, ...props }: HStackProps) => (
  <StackBase
    {...props}
    hookName="hstack"
    direction="row"
    align={align ?? "center"}
  />
);

/** VStack: a vertical Stack, stretched on the cross axis by default. */
export const VStack = ({ align, ...props }: VStackProps) => (
  <StackBase
    {...props}
    hookName="vstack"
    direction="column"
    align={align ?? "stretch"}
  />
);

export default Stack;

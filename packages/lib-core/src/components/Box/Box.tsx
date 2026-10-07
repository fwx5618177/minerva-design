import type { CSSProperties, ElementType } from "react";
import { resolveSpace } from "../../internal/space";
import type { BoxProps, BoxSize } from "./types";

/** Surface aliases accepted by `bg` (novel `bg.*` names -> Minerva tokens) */
const backgrounds: Record<string, string> = {
  bg: "var(--surface-color)",
  "bg.subtle": "var(--surface-subtle-color)",
  "bg.muted": "var(--surface-muted-color)",
  "bg.emphasis": "var(--surface-muted-color)",
  "bg.canvas": "var(--canvas-color)",
  "bg.elevated": "var(--surface-elevated-color)",
};

const radii = ["none", "sm", "md", "lg", "xl", "2xl", "full"];
const shadows = ["sm", "md", "lg", "xl"];

const size = (value: BoxSize) =>
  typeof value === "number" ? `${value}px` : value;

/**
 * Box: a polymorphic container with a small set of style shorthands
 * (padding, margin, size, background, radius, shadow, border).
 * Inline `style` wins over the generated declarations; side props win over axis
 * props, which win over the all-sides shorthand.
 */
const Box = ({
  as = "div",
  p,
  px,
  py,
  pt,
  pr,
  pb,
  pl,
  m,
  mx,
  my,
  mt,
  mr,
  mb,
  ml,
  w,
  h,
  minW,
  minH,
  maxW,
  maxH,
  bg,
  rounded,
  boxShadow,
  border,
  style,
  ...rest
}: BoxProps) => {
  const Tag = as as ElementType;
  const computed: CSSProperties = {
    ...(p !== undefined && { padding: resolveSpace(p) }),
    ...(px !== undefined && {
      paddingLeft: resolveSpace(px),
      paddingRight: resolveSpace(px),
    }),
    ...(py !== undefined && {
      paddingTop: resolveSpace(py),
      paddingBottom: resolveSpace(py),
    }),
    ...(pt !== undefined && { paddingTop: resolveSpace(pt) }),
    ...(pr !== undefined && { paddingRight: resolveSpace(pr) }),
    ...(pb !== undefined && { paddingBottom: resolveSpace(pb) }),
    ...(pl !== undefined && { paddingLeft: resolveSpace(pl) }),
    ...(m !== undefined && { margin: resolveSpace(m) }),
    ...(mx !== undefined && {
      marginLeft: resolveSpace(mx),
      marginRight: resolveSpace(mx),
    }),
    ...(my !== undefined && {
      marginTop: resolveSpace(my),
      marginBottom: resolveSpace(my),
    }),
    ...(mt !== undefined && { marginTop: resolveSpace(mt) }),
    ...(mr !== undefined && { marginRight: resolveSpace(mr) }),
    ...(mb !== undefined && { marginBottom: resolveSpace(mb) }),
    ...(ml !== undefined && { marginLeft: resolveSpace(ml) }),
    ...(w !== undefined && { width: size(w) }),
    ...(h !== undefined && { height: size(h) }),
    ...(minW !== undefined && { minWidth: size(minW) }),
    ...(minH !== undefined && { minHeight: size(minH) }),
    ...(maxW !== undefined && { maxWidth: size(maxW) }),
    ...(maxH !== undefined && { maxHeight: size(maxH) }),
    ...(bg !== undefined && { background: backgrounds[bg] ?? bg }),
    ...(rounded !== undefined && {
      borderRadius: radii.includes(rounded)
        ? `var(--radius-${rounded})`
        : rounded,
    }),
    ...(boxShadow !== undefined && {
      boxShadow: shadows.includes(boxShadow)
        ? `var(--shadow-${boxShadow})`
        : boxShadow,
    }),
    ...(border !== undefined && { border }),
    ...style,
  };

  return <Tag style={computed} {...rest} />;
};

export default Box;

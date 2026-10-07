import type { CSSProperties } from "react";
import { Tag } from "@minerva/lib-core";

// --tag-<color>-bg and --tag-<color>-text override the colors of a color; set
// them inline, in a class or in a theme to restyle every tag of that color.
const violet = {
  "--tag-primary-bg": "#ede9fe",
  "--tag-primary-text": "#5b21b6",
} as CSSProperties;

const dark = {
  "--tag-neutral-bg": "#0f172a",
  "--tag-neutral-text": "#f8fafc",
} as CSSProperties;

export default function CustomColorsDemo() {
  return (
    <>
      <Tag color="primary" variant="outline" style={violet}>
        Violet
      </Tag>
      <Tag style={dark}>Dark</Tag>
      <Tag style={{ fontStyle: "italic" }} ripple={false} clickable>
        No ripple
      </Tag>
    </>
  );
}

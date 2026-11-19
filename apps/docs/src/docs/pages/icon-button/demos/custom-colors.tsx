import { ZapIcon, TeardropIcon } from "minerva-design/icons";
import type { CSSProperties } from "react";
import { IconButton } from "minerva-design";

// CSS custom properties override the resolved colors; set them inline, in a
// class, or on an ancestor to restyle a whole toolbar.
const amber = {
  "--icon-button-color": "#b45309",
  "--icon-button-hover-bg": "rgba(245, 158, 11, 0.16)",
} as CSSProperties;

const sky = {
  "--icon-button-color": "#0ea5e9",
  "--icon-button-pressed-color": "#ffffff",
  "--icon-button-pressed-bg": "#0369a1",
} as CSSProperties;

export default function CustomColorsDemo() {
  return (
    <>
      <IconButton icon={<ZapIcon size="1em" />} style={amber} label="Energy" />
      <IconButton
        icon={<TeardropIcon size="1em" />}
        style={sky}
        defaultPressed
        label="Water"
      />
    </>
  );
}

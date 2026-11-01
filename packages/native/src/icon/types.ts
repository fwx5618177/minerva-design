// Props of the React Native bindings (minerva-design/native/icons).

import type { SvgProps } from "react-native-svg";
import type { IconDefinition } from "@minerva/icons/core";

export interface IconProps extends Omit<
  SvgProps,
  | "color"
  | "stroke"
  | "strokeWidth"
  | "fill"
  | "width"
  | "height"
  | "viewBox"
  | "title"
  | "children"
  | "name"
> {
  /** The icon to draw: a built-in one (e.g. `searchIcon`) or a `defineIcon` result */
  icon: IconDefinition;
  /** Width and height in dp @default 24 */
  size?: number;
  /** Stroke color; per-path `colors` of the icon win @default the theme's text color (`text-color` token) */
  color?: string;
  /** Stroke width on the 24×24 grid (scales with the size) @default 2 */
  strokeWidth?: number;
  /** Keeps `strokeWidth` in dp whatever the size @default false */
  absoluteStrokeWidth?: boolean;
  /** Accessible name: the icon becomes an `image` with this label; without it (or an `accessibilityLabel`) the icon is hidden from assistive technologies */
  title?: string;
}

/** Props of the named icon components (`SearchIcon`, …): `IconProps` without `icon` */
export type NamedIconProps = Omit<IconProps, "icon">;

export interface DynamicIconProps extends NamedIconProps {
  /** Name of a built-in icon (e.g. `"arrow-up"`); unknown names render nothing */
  name: string;
}

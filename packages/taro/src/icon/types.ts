// Props of the Taro bindings (minerva-design/taro/icons).

import type { ComponentProps } from "react";
import type { Image } from "@tarojs/components";
import type { IconDefinition } from "@minerva/icons/core";

type ImageProps = ComponentProps<typeof Image>;

export interface IconProps extends Omit<ImageProps, "src" | "mode"> {
  /** The icon to draw: a built-in one (e.g. `searchIcon`) or a `defineIcon` result */
  icon: IconDefinition;
  /** Width and height (a number is in px, a string is any CSS length, e.g. `"48rpx"`) @default 24 */
  size?: number | string;
  /** Stroke color, written into the SVG (images have no `currentColor`); per-path `colors` of the icon win @default the theme's text color (`text-color` token) of the active light / dark mode */
  color?: string;
  /** Stroke width on the 24×24 grid (scales with the size) @default 2 */
  strokeWidth?: number;
  /** Keeps `strokeWidth` in px whatever the (numeric) size @default false */
  absoluteStrokeWidth?: boolean;
  /** Accessible name: the image gets `ariaRole="img"` and this `ariaLabel`; without it the icon is hidden from assistive technologies */
  title?: string;
}

/** Props of the named icon components (`SearchIcon`, …): `IconProps` without `icon` */
export type NamedIconProps = Omit<IconProps, "icon">;

export interface DynamicIconProps extends NamedIconProps {
  /** Name of a built-in icon (e.g. `"arrow-up"`); unknown names render nothing */
  name: string;
}

import { h, type FunctionalComponent } from "vue";
import type {
  IconDefinition,
  IconRendererKind,
} from "minerva-design/icons/core";
import Icon from "./Icon.vue";
import type { IconRenderer } from "./props";

/** Props of the named icon components (`SearchIcon`, …): the props of `Icon` without `icon` */
export interface NamedIconProps {
  /** Width and height (a number is in pixels) @default 24 */
  size?: number | string;
  /** Stroke color, any CSS color @default "currentColor" */
  color?: string;
  /** Stroke width on the 24×24 grid @default 2 */
  strokeWidth?: number;
  /** Keeps `strokeWidth` in pixels whatever the size @default false */
  absoluteStrokeWidth?: boolean;
  /** Accessible name (`role="img"`) */
  title?: string;
  /** Inline SVG (default) or a canvas backend @default "svg" */
  renderer?: IconRenderer;
}

/** Events of the named icon components */
export type NamedIconEmits = {
  /** Canvas renderers: the backend that drew the icon */
  rendererChange: (kind: IconRendererKind) => void;
};

/** A named icon component (`SearchIcon`, or a `createIcon` result) */
export type IconComponent = FunctionalComponent<NamedIconProps, NamedIconEmits>;

const pascal = (name: string) =>
  name.replace(/(^|-)([a-z0-9])/g, (_, __, c: string) => c.toUpperCase());

/**
 * A component for one icon (`createIcon(myIcon)` -> `<MyIcon :size="20" />`),
 * like the built-in `SearchIcon`, `ArrowUpIcon`, … Only that icon is bundled.
 */
export function createIcon(icon: IconDefinition): IconComponent {
  // functional and prop-less: every attribute, prop and listener goes to Icon
  const NamedIcon: IconComponent = (_props, { attrs }) =>
    h(Icon, { ...attrs, icon });
  NamedIcon.displayName = `${pascal(icon.name)}Icon`;
  return NamedIcon;
}

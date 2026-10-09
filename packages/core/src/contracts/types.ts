/**
 * Component contracts: platform-neutral runtime metadata describing every
 * Minerva component once (props, events, slots, platform support), shared by
 * all renderers (React DOM, Web Components, and the planned Vue / Angular /
 * React Native / Taro / WeChat / uni-app renderers), the docs and the
 * cross-platform contract tests (tests/contracts).
 */

/** Renderers of Minerva, existing and planned */
export type Platform =
  "react" | "wc" | "vue" | "angular" | "native" | "taro" | "weapp" | "uni";

/**
 * Support of a component on one platform:
 * - `stable`: shipped and covered by the contract tests
 * - `beta`: shipped, API may still change
 * - `planned`: on the roadmap, not implemented yet
 * - `n/a`: deliberately not a component on this platform (e.g. a React
 *   composition part such as `ModalTrigger`, or a custom element whose React
 *   counterpart is a data object such as `<minerva-menu-item>` -> `items`);
 *   `notes` says what to use instead
 */
export type SupportStatus = "planned" | "beta" | "stable" | "n/a";

export interface PlatformSupport {
  status: SupportStatus;
  /** Version that shipped it (`beta` / `stable`) */
  since?: string;
  notes?: string;
}

export type PlatformMatrix = Record<Platform, PlatformSupport>;

/** Product tracks a component is designed for (B2B back-office, B2C apps) */
export type Track = "toB" | "toC";

/** Platform-neutral kind of a prop value */
export type PropKind =
  | "string"
  | "number"
  | "boolean"
  | "enum"
  | "function"
  | "node"
  | "array"
  | "object"
  | "union";

/** A JSON literal default value */
export type DefaultValue = string | number | boolean | null;

export interface PropContract {
  /** Prop / property name (camelCase, the React prop and the element property) */
  name: string;
  kind: PropKind;
  /** String literal values of an `enum` prop (sorted) */
  values?: string[];
  /** Literal default (omitted when computed at runtime or undefined) */
  default?: DefaultValue;
  required: boolean;
  description?: string;
  /** HTML attribute of the custom element (`wc` side), when reflected */
  attribute?: string;
  /**
   * Present on one platform only (React composition, element vocabulary,
   * native-only mobile components)
   */
  only?: "react" | "wc" | "native";
}

export interface EventContract {
  /**
   * Event name: the custom element event (`minerva-change`, `change`), or
   * the kebab-case React callback name when React-only (`dismiss`)
   */
  name: string;
  /** React callback prop (`onCheckedChange`) */
  react?: string;
  /** Custom element event (`minerva-change`) */
  wc?: string;
  /**
   * React Native callback prop of minerva-design/native (`onChange`; the
   * RN idiom `onPress` for `onClick`)
   */
  native?: string;
  /** Fields of `event.detail` (custom element) */
  detail?: string[];
  description?: string;
}

export interface SlotContract {
  /** `default` for the unnamed slot */
  name: string;
  description?: string;
}

export interface ComponentContract {
  /** Component name (the React export, else the PascalCase tag name) */
  name: string;
  /** Custom element tag name, when the component exists as an element */
  tag?: string;
  /** Docs page id (`/button`), when documented */
  docs?: string;
  /** i18n key of the description in the docs strings (`docs.<page>.description`) */
  descriptionKey?: string;
  /** English one-line description */
  description?: string;
  tracks: Track[];
  props: PropContract[];
  events: EventContract[];
  slots: SlotContract[];
  /** React: accepts `children` */
  children: boolean;
  platforms: PlatformMatrix;
}

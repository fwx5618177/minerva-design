import type { ColorScheme } from "@minerva/core";

/**
 * Visual style: `line` (underline indicator), `enclosed` (browser-like
 * tabs), `soft` (segmented control) or `pills` (separated rounded tabs)
 */
export type TabsVariant = "line" | "enclosed" | "soft" | "pills";

/** Layout / keyboard direction of the tab list */
export type TabsOrientation = "horizontal" | "vertical";

/** Props of `Tabs`, the root of a tabs group (React `TabsProps`) */
export interface TabsProps {
  /** Value of the selected tab (controlled: `v-model`) */
  modelValue?: string;
  /** Value of the initially selected tab (uncontrolled) */
  defaultValue?: string;
  /**
   * Layout and arrow-key direction
   * @default "horizontal"
   */
  orientation?: TabsOrientation;
  /**
   * `automatic` selects a tab when it receives focus; `manual` only on
   * Enter / Space / click, so the parent can confirm before switching
   * @default "automatic"
   */
  activationMode?: "automatic" | "manual";
  /** Reading direction (affects arrow keys) */
  dir?: "ltr" | "rtl";
  /**
   * Visual style
   * @default "line"
   */
  variant?: TabsVariant;
  /**
   * Color of the selection
   * @default "primary"
   */
  color?: ColorScheme;
}

/** Props of `TabList`, the `role="tablist"` container of the tabs */
export interface TabListProps {
  /**
   * Moves focus from the last tab to the first (and back) with the arrow keys
   * @default true
   */
  loop?: boolean;
}

/** Props of `Tab`, a `role="tab"` button */
export interface TabProps {
  /** Value identifying the tab and its panel (must not contain whitespace) */
  value: string;
  /**
   * Disables the tab (skipped by arrow keys)
   * @default false
   */
  disabled?: boolean;
  /**
   * Overrides the group color; an explicitly colored tab keeps a tinted
   * background while inactive
   */
  color?: ColorScheme;
}

/** Props of `TabPanel`, the `role="tabpanel"` content of a tab */
export interface TabPanelProps {
  /** Value of the tab this panel belongs to */
  value: string;
  /**
   * Keeps the panel mounted (hidden) while its tab is not selected
   * @default false
   */
  forceMount?: boolean;
}

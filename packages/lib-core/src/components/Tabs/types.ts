import type {
  HTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
  Ref,
} from "react";

/**
 * Visual style: `line` (underline indicator), `enclosed` (browser-like
 * tabs), `soft` (segmented control) or `pills` (separated rounded tabs)
 */
export type TabsVariant = "line" | "enclosed" | "soft" | "pills";

/** Semantic color of the selection (and of explicitly colored tabs) */
export type TabsColor =
  "primary" | "neutral" | "success" | "warning" | "danger" | "info";

/** Layout / keyboard direction of the tab list */
export type TabsOrientation = "horizontal" | "vertical";

/** Props of `Tabs`, the root of a tabs group (Radix Tabs) */
export interface TabsProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange" | "defaultValue" | "dir" | "color"
> {
  /** Value of the selected tab (controlled; pair with onChange) */
  value?: string;
  /** Value of the initially selected tab (uncontrolled) */
  defaultValue?: string;
  /** Called with the value of the newly selected tab */
  onChange?: (value: string) => void;
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
  color?: TabsColor;
  /** `TabList` and `TabPanel` elements */
  children?: ReactNode;
  /** Ref to the root `<div>` element */
  ref?: Ref<HTMLDivElement>;
}

/** Props of `TabList`, the `role="tablist"` container of the tabs */
export interface TabListProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Moves focus from the last tab to the first (and back) with the arrow keys
   * @default true
   */
  loop?: boolean;
  /** Ref to the tab list `<div>` element */
  ref?: Ref<HTMLDivElement>;
}

/** Props of `Tab`, a `role="tab"` button */
export interface TabProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "value" | "color"
> {
  /** Value identifying the tab and its panel (must not contain whitespace) */
  value: string;
  /** Tab content */
  children: ReactNode;
  /**
   * Disables the tab (skipped by arrow keys)
   * @default false
   */
  disabled?: boolean;
  /**
   * Overrides the group color; an explicitly colored tab keeps a tinted
   * background while inactive
   */
  color?: TabsColor;
  /** Ref to the `<button>` element */
  ref?: Ref<HTMLButtonElement>;
}

/** Props of `TabPanel`, the `role="tabpanel"` content of a tab */
export interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
  /** Value of the tab this panel belongs to */
  value: string;
  /**
   * Keeps the panel mounted (hidden) while its tab is not selected
   * @default false
   */
  forceMount?: boolean;
  /** Ref to the panel `<div>` element */
  ref?: Ref<HTMLDivElement>;
}

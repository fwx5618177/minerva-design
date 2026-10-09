/**
 * Desktop sidebar mode: `expanded` (full width), `compact` (icon rail) or
 * `floating` (rail that overlays content while hovered / keyboard-focused)
 */
export type AppShellSidebarMode = "expanded" | "compact" | "floating";

/** State passed to the `navigation` scoped slot */
export interface AppShellNavigationState {
  /** The desktop sidebar currently shows the compact rail */
  collapsed: boolean;
  /** Navigation is rendered inside the mobile drawer (viewport <= 768px) */
  isMobile: boolean;
  /** Closes the mobile navigation drawer (call it when an item is selected) */
  closeNavigation: () => void;
  /** Switches the sidebar to `expanded` (e.g. when a compact group is opened) */
  expandNavigation: () => void;
}

/** Accessible names of the AppShell controls */
export interface AppShellLabels {
  /** Name of the toggle that expands the sidebar */
  expand: string;
  /** Name of the toggle that collapses the sidebar */
  collapse: string;
  /** Name of the pin toggle when floating mode is off */
  enableFloating: string;
  /** Name of the pin toggle when floating mode is on */
  disableFloating: string;
  /** Name of the header button that opens the mobile navigation */
  openNavigation: string;
  /** Name of the close button of the mobile navigation */
  closeNavigation: string;
}

/**
 * Props of `AppShell` (same names and defaults as React; `sidebarMode` is
 * `v-model:sidebar-mode`, `onSidebarModeChange` the `sidebarModeChange`
 * emit). The navigation is the `navigation` scoped slot (receiving
 * `AppShellNavigationState`); `brand-icon`, `header-actions`,
 * `page-navigation` and the default slot (the page) are slots too.
 */
export interface AppShellProps {
  /** Brand shown at the top of the sidebar (not a page heading), or the `brand` slot */
  brand?: string;
  /**
   * Accessible name of the sidebar landmark and title of the mobile drawer
   * @default "Navigation" (localized)
   */
  navigationLabel?: string;
  /** Change it when a route commits to dismiss the mobile navigation */
  navigationKey?: string;
  /** Sidebar mode (controlled, `v-model:sidebar-mode`) */
  sidebarMode?: AppShellSidebarMode;
  /**
   * Initial sidebar mode (uncontrolled)
   * @default "expanded"
   */
  defaultSidebarMode?: AppShellSidebarMode;
  /** Overrides of the control names (localized defaults) */
  labels?: Partial<AppShellLabels>;
  /**
   * "Skip to content" link rendered as the first focusable element (visually
   * hidden until focused); it moves focus to `main`. A string replaces its
   * text, `false` removes it
   * @default true
   */
  skipLink?: boolean | string;
}

import type { HTMLAttributes, ReactNode, Ref } from "react";

/**
 * Desktop sidebar mode: `expanded` (full width), `compact` (icon rail) or
 * `floating` (rail that overlays content while hovered / keyboard-focused)
 */
export type AppShellSidebarMode = "expanded" | "compact" | "floating";

/** State passed to the `navigation` render function */
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

export interface AppShellProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "children"
> {
  /** Ref to the root div */
  ref?: Ref<HTMLDivElement>;
  /** Brand shown at the top of the sidebar (not a page heading) */
  brand: ReactNode;
  /** Decorative brand icon, still visible in the compact rail */
  brandIcon?: ReactNode;
  /**
   * Renders the navigation; called with the current state. The navigation is
   * rendered in exactly one place: the sidebar on desktop, the drawer on mobile.
   */
  navigation: (state: AppShellNavigationState) => ReactNode;
  /**
   * Accessible name of the sidebar landmark and title of the mobile drawer
   * @default "Navigation" (localized)
   */
  navigationLabel?: string;
  /** Change it when a route commits to dismiss the mobile navigation */
  navigationKey?: string;
  /** Content of the top header bar (account menu, search...), outside `main` */
  headerActions?: ReactNode;
  /** Rendered between the header and `main` (e.g. open-page tabs) */
  pageNavigation?: ReactNode;
  /** Page content, rendered inside the single `main` landmark */
  children?: ReactNode;
  /** Sidebar mode (controlled) */
  sidebarMode?: AppShellSidebarMode;
  /**
   * Initial sidebar mode (uncontrolled)
   * @default "expanded"
   */
  defaultSidebarMode?: AppShellSidebarMode;
  /** Called with the next mode when the user changes it */
  onSidebarModeChange?: (mode: AppShellSidebarMode) => void;
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

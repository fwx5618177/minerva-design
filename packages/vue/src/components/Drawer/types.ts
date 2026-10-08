import type { HTMLAttributes } from "vue";

/** Edge of the viewport the drawer slides in from. */
export type DrawerSide = "left" | "right" | "top" | "bottom";

/** Size preset: width for left/right drawers, height for top/bottom drawers. */
export type DrawerSize = "small" | "medium" | "large" | "full";

/** Props of the compound `DrawerRoot` (owns the open state). */
export interface DrawerRootProps {
  /** Controlled open state (`v-model:open`); leave `undefined` for uncontrolled. */
  open?: boolean;
  /**
   * Initial open state while uncontrolled
   * @default false
   */
  defaultOpen?: boolean;
  /**
   * Modal mode: renders the overlay, traps focus, locks page scrolling and
   * blocks / hides the page behind. Non-modal drawers close on outside click /
   * focus instead.
   * @default true
   */
  modal?: boolean;
}

/** Props of `DrawerTrigger` / `DrawerClose` (a native button, or the child with `asChild`). */
export interface DrawerTriggerProps {
  /**
   * Merges the behaviour onto the single child element instead of rendering a `<button>`
   * @default false
   */
  asChild?: boolean;
}

/** Props of `DrawerContent`: the teleported overlay + sliding panel. */
export interface DrawerContentProps {
  /**
   * ARIA role of the panel
   * @default "dialog"
   */
  role?: "dialog" | "alertdialog";
  /**
   * Keeps the panel mounted while closed (`data-state="closed"`), e.g. for
   * animation libraries
   * @default false
   */
  forceMount?: boolean;
  /**
   * Edge the panel slides in from
   * @default "right"
   */
  side?: DrawerSide;
  /**
   * Size preset
   * @default "medium"
   */
  size?: DrawerSize;
  /**
   * Hides the close (×) button
   * @default false
   */
  hideCloseButton?: boolean;
  /** Accessible label of the close button; defaults to the localized "Close". */
  closeLabel?: string;
  /**
   * Text of the visually hidden description rendered when `description` is
   * not set; defaults to the localized "Drawer content".
   */
  hiddenDescription?: string;
  /**
   * Visible description below the title (or the `description` slot). Without
   * it a visually hidden generic description is rendered.
   */
  description?: string;
  /** Class of the overlay (backdrop). */
  overlayClass?: HTMLAttributes["class"];
}

/** Props of the all-in-one `Drawer` (same names and defaults as React). */
export interface DrawerProps {
  /** Controlled open state (`v-model:open`); leave `undefined` for uncontrolled. */
  open?: boolean;
  /**
   * Initial open state while uncontrolled
   * @default false
   */
  defaultOpen?: boolean;
  /**
   * Edge the panel slides in from
   * @default "right"
   */
  side?: DrawerSide;
  /**
   * Size preset
   * @default "medium"
   */
  size?: DrawerSize;
  /** Title rendered as the drawer's accessible name (or the `title` slot). */
  title?: string;
  /** Description rendered below the title (or the `description` slot). */
  description?: string;
  /**
   * Hides the close (×) button
   * @default false
   */
  hideCloseButton?: boolean;
  /** Accessible label of the close button; defaults to the localized "Close". */
  closeLabel?: string;
  /**
   * Text of the visually hidden description rendered when `description` is
   * not set; defaults to the localized "Drawer content".
   */
  hiddenDescription?: string;
}

/**
 * Props of `DrawerHeader` / `DrawerBody` / `DrawerFooter` (attributes fall
 * through to the section element).
 */
export type DrawerSectionProps = Record<string, never>;

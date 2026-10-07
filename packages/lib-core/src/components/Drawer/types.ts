import type {
  ComponentPropsWithRef,
  HTMLAttributes,
  ReactNode,
  Ref,
} from "react";
import type { DialogContentProps } from "@radix-ui/react-dialog";

/** Edge of the viewport the drawer slides in from. */
export type DrawerSide = "left" | "right" | "top" | "bottom";

/** Size preset: width for left/right drawers, height for top/bottom drawers. */
export type DrawerSize = "small" | "medium" | "large" | "full";

/** Props of the compound `DrawerRoot` (owns the open state). */
export interface DrawerRootProps {
  /** Controlled open state; leave `undefined` for uncontrolled. */
  open?: boolean;
  /**
   * Initial open state while uncontrolled
   * @default false
   */
  defaultOpen?: boolean;
  /** Called with the requested open state (trigger, close button, Escape, overlay click). */
  onOpenChange?: (open: boolean) => void;
  /**
   * Modal mode: traps focus and blocks interaction with the page behind
   * @default true
   */
  modal?: boolean;
  /** Trigger and content. */
  children?: ReactNode;
}

/** Props of `DrawerTrigger` / `DrawerClose` (a native button, or the child with `asChild`). */
export interface DrawerTriggerProps extends ComponentPropsWithRef<"button"> {
  /**
   * Merges the behaviour onto the single child element instead of rendering a `<button>`
   * @default false
   */
  asChild?: boolean;
}

/** Props of `DrawerContent`: the portalled overlay + sliding panel. */
export interface DrawerContentProps extends Omit<
  DialogContentProps,
  "asChild"
> {
  /** Ref to the dialog element. */
  ref?: Ref<HTMLDivElement>;
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
   * Visible description below the title (accessible description). Without it a
   * visually hidden generic description is rendered.
   */
  description?: ReactNode;
  /** Class name of the overlay (backdrop). */
  overlayClassName?: string;
}

/** Props of `DrawerHeader` / `DrawerBody` / `DrawerFooter`. */
export interface DrawerSectionProps extends HTMLAttributes<HTMLDivElement> {
  /** Ref to the section element. */
  ref?: Ref<HTMLDivElement>;
}

/** Props of the all-in-one `Drawer`. */
export interface DrawerProps {
  /** Controlled open state; leave `undefined` for uncontrolled. */
  open?: boolean;
  /**
   * Initial open state while uncontrolled
   * @default false
   */
  defaultOpen?: boolean;
  /** Called with the requested open state. */
  onOpenChange?: (open: boolean) => void;
  /** Element that opens the drawer on click (rendered with `asChild`, so pass a single element). */
  trigger?: ReactNode;
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
  /** Title rendered as the drawer's accessible name. */
  title?: ReactNode;
  /** Description rendered below the title (accessible description). */
  description?: ReactNode;
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
  /** Additional class name of the panel. */
  className?: string;
  /** Ref to the dialog element. */
  ref?: Ref<HTMLDivElement>;
  /** Content: usually `DrawerBody` + `DrawerFooter`. */
  children?: ReactNode;
}

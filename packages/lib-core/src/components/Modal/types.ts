import type {
  ComponentPropsWithRef,
  HTMLAttributes,
  ReactNode,
  Ref,
} from "react";
import type { DialogContentProps } from "@radix-ui/react-dialog";

/** Width preset of a Modal. */
export type ModalSize = "small" | "medium" | "large" | "xlarge" | "full";

/** Props of the compound `ModalRoot` (owns the open state). */
export interface ModalRootProps {
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
   * Modal mode: traps focus, blocks outside interaction and hides the rest of
   * the page from assistive technology
   * @default true
   */
  modal?: boolean;
  /** Trigger and content. */
  children?: ReactNode;
}

/** Props of `ModalTrigger` / `ModalClose` (a native button, or the child with `asChild`). */
export interface ModalTriggerProps extends ComponentPropsWithRef<"button"> {
  /**
   * Merges the behaviour onto the single child element instead of rendering a `<button>`
   * @default false
   */
  asChild?: boolean;
}

/** Props of `ModalContent`: the portalled overlay + dialog panel. */
export interface ModalContentProps extends Omit<DialogContentProps, "asChild"> {
  /** Ref to the dialog element. */
  ref?: Ref<HTMLDivElement>;
  /**
   * Width preset
   * @default "medium"
   */
  size?: ModalSize;
  /**
   * Hides the close (×) button in the top-right corner
   * @default false
   */
  hideCloseButton?: boolean;
  /** Accessible label of the close button; defaults to the localized "Close". */
  closeLabel?: string;
  /**
   * Visible description below the title, also used as the dialog's accessible
   * description. Without it a visually hidden empty description is rendered.
   */
  description?: ReactNode;
  /** Class name of the overlay (backdrop). */
  overlayClassName?: string;
}

/** Props of `ModalHeader` (the dialog title). */
export interface ModalHeaderProps extends HTMLAttributes<HTMLDivElement> {
  /** Ref to the header element. */
  ref?: Ref<HTMLDivElement>;
}

/** Props of `ModalBody` (scrollable content area). */
export interface ModalBodyProps extends HTMLAttributes<HTMLDivElement> {
  /** Ref to the body element. */
  ref?: Ref<HTMLDivElement>;
}

/** Props of `ModalFooter` (action row). */
export interface ModalFooterProps extends HTMLAttributes<HTMLDivElement> {
  /** Ref to the footer element. */
  ref?: Ref<HTMLDivElement>;
}

/** Props of the all-in-one `Modal`. */
export interface ModalProps {
  /** Controlled open state; leave `undefined` for uncontrolled. */
  open?: boolean;
  /**
   * Initial open state while uncontrolled
   * @default false
   */
  defaultOpen?: boolean;
  /** Called with the requested open state (close button, Escape, overlay click, trigger). */
  onOpenChange?: (open: boolean) => void;
  /** Element that opens the modal on click (rendered with `asChild`, so pass a single element). */
  trigger?: ReactNode;
  /** Title rendered as the dialog's accessible name. */
  title?: ReactNode;
  /** Description rendered below the title (accessible description). */
  description?: ReactNode;
  /**
   * Width preset
   * @default "medium"
   */
  size?: ModalSize;
  /**
   * Hides the close (×) button
   * @default false
   */
  hideCloseButton?: boolean;
  /** Accessible label of the close button; defaults to the localized "Close". */
  closeLabel?: string;
  /** Additional class name of the dialog panel. */
  className?: string;
  /** Ref to the dialog element. */
  ref?: Ref<HTMLDivElement>;
  /** Body: usually `ModalBody` + `ModalFooter`, or a `<form>` wrapping them. */
  children?: ReactNode;
}

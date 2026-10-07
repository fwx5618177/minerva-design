import type { ComponentPropsWithRef, ReactNode, Ref } from "react";
import type { PopoverContentProps as RadixPopoverContentProps } from "@radix-ui/react-popover";

/** Side of the trigger the panel is placed on. */
export type PopoverSide = "top" | "right" | "bottom" | "left";

/** Alignment of the panel along the trigger. */
export type PopoverAlign = "start" | "center" | "end";

/** Props of `Popover` (the root; owns the open state). */
export interface PopoverProps {
  /** Controlled open state; leave `undefined` for uncontrolled. */
  open?: boolean;
  /**
   * Initial open state while uncontrolled
   * @default false
   */
  defaultOpen?: boolean;
  /** Called with the requested open state (trigger, Escape, outside click, `PopoverClose`). */
  onOpenChange?: (open: boolean) => void;
  /**
   * Modal mode: traps focus inside the panel and blocks outside interaction
   * @default false
   */
  modal?: boolean;
  /** `PopoverTrigger` / `PopoverAnchor` and `PopoverContent`. */
  children?: ReactNode;
}

/** Props of `PopoverTrigger` / `PopoverClose` (a native button, or the child with `asChild`). */
export interface PopoverTriggerProps extends ComponentPropsWithRef<"button"> {
  /**
   * Merges the behaviour onto the single child element instead of rendering a `<button>`
   * @default false
   */
  asChild?: boolean;
}

/** Props of `PopoverAnchor`: positions the panel against another element than the trigger. */
export interface PopoverAnchorProps extends ComponentPropsWithRef<"div"> {
  /**
   * Merges onto the single child element instead of rendering a `<div>`
   * @default false
   */
  asChild?: boolean;
}

/** Props of `PopoverContent`: the portalled, anchored panel (role="dialog"). */
export interface PopoverContentProps extends Omit<
  RadixPopoverContentProps,
  "asChild" | "side" | "align" | "sideOffset"
> {
  /** Ref to the panel element. */
  ref?: Ref<HTMLDivElement>;
  /**
   * Preferred side; flips when there is not enough room
   * @default "bottom"
   */
  side?: PopoverSide;
  /**
   * Alignment along the trigger
   * @default "center"
   */
  align?: PopoverAlign;
  /**
   * Gap to the trigger in pixels
   * @default 6
   */
  sideOffset?: number;
  /**
   * Renders an arrow pointing at the trigger
   * @default false
   */
  arrow?: boolean;
  /**
   * Renders the panel into a portal on `document.body`
   * @default true
   */
  portal?: boolean;
}

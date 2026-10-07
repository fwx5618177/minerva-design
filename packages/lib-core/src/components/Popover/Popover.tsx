import * as RadixPopover from "@radix-ui/react-popover";
import { cn } from "../../utils/cn";
import type {
  PopoverAnchorProps,
  PopoverContentProps,
  PopoverProps,
  PopoverTriggerProps,
} from "./types";
import styles from "./popover.module.scss";
import { usePortalContainer } from "../../internal/themeScope";

/**
 * Popover: a click-triggered, interactive floating panel (Radix Popover).
 * Unlike Tooltip it holds focusable content; unlike Popper it manages its own
 * trigger, focus, Escape and outside-click dismissal.
 */
export const Popover = (props: PopoverProps) => (
  <RadixPopover.Root {...props} />
);

/** Toggles the popover; a `<button>` or, with `asChild`, the child element. */
export const PopoverTrigger = (props: PopoverTriggerProps) => (
  <RadixPopover.Trigger {...props} />
);

/** Positions the popover against this element instead of the trigger. */
export const PopoverAnchor = (props: PopoverAnchorProps) => (
  <RadixPopover.Anchor {...props} />
);

/** Closes the popover; a `<button>` or, with `asChild`, the child element. */
export const PopoverClose = (props: PopoverTriggerProps) => (
  <RadixPopover.Close {...props} />
);

/** PopoverContent: the anchored panel; flips / shifts to stay in view. */
export const PopoverContent = ({
  className,
  children,
  arrow = false,
  portal = true,
  sideOffset = 6,
  collisionPadding = 8,
  ...rest
}: PopoverContentProps) => {
  const portalContainer = usePortalContainer();
  const content = (
    <RadixPopover.Content
      sideOffset={sideOffset}
      collisionPadding={collisionPadding}
      className={cn(styles.content, className)}
      {...rest}
    >
      {children}
      {arrow && <RadixPopover.Arrow className={styles.arrow} />}
    </RadixPopover.Content>
  );
  return portal ? (
    <RadixPopover.Portal container={portalContainer}>
      {content}
    </RadixPopover.Portal>
  ) : (
    content
  );
};

export default Popover;

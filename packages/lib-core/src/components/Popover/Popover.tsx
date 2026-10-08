import {
  createContext,
  useContext,
  useId,
  useMemo,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type Ref,
} from "react";
import { parsePlacement, toPlacement } from "@minerva/core";
import { composeEventHandlers } from "../../internal/composeEventHandlers";
import { useMergedRefs } from "../../internal/mergeRefs";
import { Portal } from "../../internal/Portal";
import { Slot } from "../../internal/Slot";
import { useAnchoredPosition } from "../../internal/useAnchoredPosition";
import { useControllableState } from "../../internal/useControllableState";
import { warnControlledProps } from "../../internal/devWarnings";
import {
  LayerContext,
  useDismissableLayer,
  useLayerParent,
} from "../../internal/useDismissableLayer";
import { useFocusScope } from "../../internal/useFocusScope";
import { useHideOthers } from "../../internal/useHideOthers";
import { usePresence } from "../../internal/usePresence";
import { useScrollLock } from "../../internal/useScrollLock";
import { adjacentTabbable, tabLeavesPanel } from "../../internal/tabbing";
import { usePortalDirection } from "../../internal/direction";
import { cn } from "../../utils/cn";
import { hooks } from "../../internal/stylingHooks";
import type {
  PopoverAnchorProps,
  PopoverContentProps,
  PopoverProps,
  PopoverTriggerProps,
} from "./types";
import styles from "./popover.module.scss";

/** Size of the arrow (width x height, px). */
const ARROW_WIDTH = 10;
const ARROW_HEIGHT = 5;

interface PopoverContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  modal: boolean;
  contentId: string;
  trigger: HTMLElement | null;
  setTrigger: (node: HTMLElement | null) => void;
  anchor: HTMLElement | null;
  setAnchor: (node: HTMLElement | null) => void;
}

const PopoverContext = createContext<PopoverContextValue | null>(null);

const usePopoverContext = (component: string) => {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error(`<${component}> must be used inside <Popover>`);
  }
  return context;
};

/**
 * Popover: a click-triggered, interactive floating panel anchored to its
 * trigger (or a `PopoverAnchor`). The primary component for anchored panels:
 * unlike Tooltip it holds focusable content and manages focus, Escape and
 * outside-click dismissal itself.
 */
export const Popover = ({
  open: openProp,
  defaultOpen,
  onOpenChange,
  modal = false,
  children,
}: PopoverProps) => {
  if (process.env.NODE_ENV !== "production") {
    warnControlledProps("Popover", {
      prop: "open",
      value: openProp,
      defaultProp: "defaultOpen",
      defaultValue: defaultOpen,
      handlerProp: "onOpenChange",
      handler: onOpenChange,
    });
  }
  const [open, setOpen] = useControllableState({
    value: openProp,
    defaultValue: defaultOpen ?? false,
    onChange: onOpenChange,
    name: "Popover",
    prop: "open",
  });
  const contentId = useId();
  const [trigger, setTrigger] = useState<HTMLElement | null>(null);
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const value = useMemo<PopoverContextValue>(
    () => ({
      open,
      setOpen,
      modal,
      contentId,
      trigger,
      setTrigger,
      anchor,
      setAnchor,
    }),
    [open, setOpen, modal, contentId, trigger, anchor],
  );
  return (
    <PopoverContext.Provider value={value}>{children}</PopoverContext.Provider>
  );
};

/**
 * Toggles the popover (`aria-haspopup="dialog"`, `aria-expanded`,
 * `aria-controls` while open, `data-state`); a `<button>` or, with
 * `asChild`, the child element. Clicking it while open closes the popover.
 */
export const PopoverTrigger = ({
  asChild = false,
  onClick,
  ref,
  ...rest
}: PopoverTriggerProps) => {
  const { open, setOpen, contentId, setTrigger } =
    usePopoverContext("PopoverTrigger");
  const mergedRef = useMergedRefs<HTMLElement>(
    setTrigger,
    ref as Ref<HTMLElement>,
  );
  const props = {
    "aria-haspopup": "dialog" as const,
    "aria-expanded": open,
    "aria-controls": open ? contentId : undefined,
    ...rest,
    // The native button only: with asChild the child keeps its own hooks.
    ...(asChild
      ? undefined
      : hooks("popover", "trigger", { state: open ? "open" : "closed" })),
    onClick: composeEventHandlers(onClick, () => setOpen(!open)),
  };
  return asChild ? (
    <Slot ref={mergedRef} {...props} />
  ) : (
    <button
      type="button"
      ref={mergedRef as Ref<HTMLButtonElement>}
      {...props}
    />
  );
};

/** Positions the popover against this element instead of the trigger. */
export const PopoverAnchor = ({
  asChild = false,
  ref,
  ...rest
}: PopoverAnchorProps) => {
  const { setAnchor } = usePopoverContext("PopoverAnchor");
  const mergedRef = useMergedRefs<HTMLElement>(
    setAnchor,
    ref as Ref<HTMLElement>,
  );
  return asChild ? (
    <Slot ref={mergedRef} {...rest} />
  ) : (
    <div ref={mergedRef as Ref<HTMLDivElement>} {...rest} />
  );
};

/** Closes the popover; a `<button>` or, with `asChild`, the child element. */
export const PopoverClose = ({
  asChild = false,
  onClick,
  ...rest
}: PopoverTriggerProps) => {
  const { setOpen } = usePopoverContext("PopoverClose");
  const props = {
    ...rest,
    onClick: composeEventHandlers(onClick, () => setOpen(false)),
  };
  return asChild ? <Slot {...props} /> : <button type="button" {...props} />;
};

/** Off-screen until the first position is computed (no flash at 0,0). */
const UNPOSITIONED: CSSProperties = { transform: "translate(0, -200%)" };

/**
 * PopoverContent: the anchored panel (`role="dialog"`); flips / shifts to
 * stay in view.
 *
 * - Focus moves to its first tabbable (or the panel) on open and returns to
 *   the trigger on close.
 * - Escape (topmost layer only), a pointer down outside or focus leaving it
 *   close it; overlays opened inside it are child layers, and a Popover
 *   inside a Modal is a child layer of the Modal.
 * - Non-modal: Tab past its last tabbable (Shift+Tab before its first)
 *   closes it and moves focus to the tabbable after (before) the trigger
 *   in document order; Tab never loops inside the panel.
 * - `modal` (on the root): focus trap (Tab loops inside), scroll lock, the
 *   rest of the page hidden from assistive technology, outside pointer
 *   events disabled.
 * - Stays mounted during the `data-state="closed"` exit animation.
 */
export const PopoverContent = ({
  ref,
  className,
  style,
  children,
  side = "bottom",
  align = "center",
  sideOffset = 6,
  alignOffset = 0,
  collisionPadding = 8,
  matchAnchorWidth = false,
  arrow = false,
  portal = true,
  forceMount = false,
  onOpenAutoFocus,
  onCloseAutoFocus,
  onEscapeKeyDown,
  onPointerDownOutside,
  onFocusOutside,
  onInteractOutside,
  onKeyDown,
  ...rest
}: PopoverContentProps) => {
  const { open, setOpen, modal, contentId, trigger, anchor } =
    usePopoverContext("PopoverContent");
  // Tab moves on within the enclosing layer (e.g. a Modal), else the page.
  const tabContainer = useLayerParent();
  const [element, setElement] = useState<HTMLDivElement | null>(null);
  const [arrowElement, setArrowElement] = useState<HTMLSpanElement | null>(
    null,
  );
  const present = usePresence(open, element);
  const active = open && !!element;

  const {
    setFloating,
    floatingStyles,
    placement: finalPlacement,
    arrowStyles,
    isPositioned,
  } = useAnchoredPosition({
    open: present,
    anchor: anchor ?? trigger,
    placement: toPlacement(side, align),
    offset: {
      mainAxis: sideOffset + (arrow ? ARROW_HEIGHT : 0),
      crossAxis: alignOffset,
    },
    matchAnchorWidth,
    padding: collisionPadding,
    arrowElement: arrow ? arrowElement : null,
  });
  const contentRef = useMergedRefs<HTMLDivElement>(setElement, ref);
  // Portalled content keeps the reading direction of its anchor.
  const dir = usePortalDirection(element, anchor ?? trigger, open);
  const placement = parsePlacement(finalPlacement);

  useDismissableLayer(element, {
    enabled: active,
    disableOutsidePointerEvents: modal,
    branches: () => [trigger],
    onEscapeKeyDown,
    onPointerDownOutside,
    // Focus is trapped while modal: never dismiss on focus outside.
    onFocusOutside: (event) => {
      onFocusOutside?.(event);
      if (modal) event.preventDefault();
    },
    onInteractOutside,
    onDismiss: () => setOpen(false),
  });
  useFocusScope(element, {
    enabled: active,
    trapped: modal,
    loop: modal,
    restoreFocus: () => trigger,
    onMountAutoFocus: onOpenAutoFocus,
    onUnmountAutoFocus: onCloseAutoFocus,
  });
  useScrollLock(active && modal);
  useHideOthers(element, active && modal);

  // Non-modal: Tab out of the panel continues from the trigger.
  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (
      modal ||
      !element ||
      !trigger ||
      event.key !== "Tab" ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey
    )
      return;
    const backwards = event.shiftKey;
    // Ignore keys from nested (portalled) layers rendered inside the panel.
    if (!tabLeavesPanel(element, event.target as Element, backwards)) return;
    event.preventDefault();
    const container = tabContainer ?? trigger.ownerDocument.body;
    const next = adjacentTabbable(trigger, container, backwards) ?? trigger;
    next.focus();
    setOpen(false);
  };

  if (!present && !forceMount) return null;

  const state = open ? "open" : "closed";
  const panel = (
    // The positioned wrapper keeps `transform` free for the panel animation.
    <div
      ref={setFloating}
      className={styles.positioner}
      style={
        isPositioned ? floatingStyles : { ...floatingStyles, ...UNPOSITIONED }
      }
      data-side={placement.side}
      data-align={placement.align}
    >
      <LayerContext.Provider value={element}>
        {/* The dialog only intercepts Tab bubbling from its content (focus
            management), it is not itself a control. */}
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
        <div
          ref={contentRef}
          id={contentId}
          role="dialog"
          aria-modal={modal || undefined}
          tabIndex={-1}
          dir={dir}
          className={cn(styles.content, className)}
          style={style}
          {...rest}
          {...hooks("popover", "content", {
            state,
            side: placement.side,
            align: placement.align,
            placement: finalPlacement,
          })}
          onKeyDown={composeEventHandlers(onKeyDown, handleKeyDown)}
        >
          {children}
          {arrow && (
            <span
              ref={setArrowElement}
              className={styles.arrowWrapper}
              style={arrowStyles}
              aria-hidden="true"
              {...hooks("popover", "arrow")}
            >
              <svg
                className={styles.arrow}
                width={ARROW_WIDTH}
                height={ARROW_HEIGHT}
                viewBox="0 0 30 10"
                preserveAspectRatio="none"
              >
                <polygon points="0,0 30,0 15,10" />
              </svg>
            </span>
          )}
        </div>
      </LayerContext.Provider>
    </div>
  );
  return portal ? <Portal>{panel}</Portal> : panel;
};

export default Popover;

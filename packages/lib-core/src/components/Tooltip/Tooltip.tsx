import React, {
  cloneElement,
  isValidElement,
  useEffect,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPointerGrace, parsePlacement } from "@minerva/core";
import { cn } from "../../utils/cn";
import { Slot } from "../../internal/Slot";
import type { TooltipProps } from "./types";
import { useFloatingLayer } from "../../internal/FloatingPanel";
import { Portal } from "../../internal/Portal";
import type { VirtualElement } from "../../internal/useAnchoredPosition";
import { LayerContext } from "../../internal/useDismissableLayer";
import { useControllableState } from "../../internal/useControllableState";
import { useMergedRefs } from "../../internal/mergeRefs";
import { useTooltipConfig } from "./TooltipProvider";
import styles from "./tooltip.module.scss";

/** Extra gap so the arrow does not overlap the trigger. */
const ARROW_GAP = 6;
/**
 * How long the pointer may travel from the trigger to the tooltip (through
 * the gap between them) before the tooltip closes (WCAG 1.4.13 hoverable).
 */
const HOVER_GRACE_MS = 300;

type TriggerChildProps = {
  "aria-describedby"?: string;
};

/**
 * Tooltip: shows informative content when the wrapped element is hovered or
 * focused. Flips / shifts to stay inside the viewport.
 *
 * WCAG 1.4.13: dismissable with Escape (a non-modal layer: only when it is
 * the topmost one, so in an open Popover the first Escape closes the
 * tooltip only), hoverable (the pointer can move from the trigger onto the
 * tooltip through the gap between them) and persistent.
 */
const Tooltip = ({
  ref,
  content,
  children,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  placement = "top",
  color = "neutral",
  variant = "solid",
  shape = "default",
  animation = "fade",
  enterDelay: enterDelayProp,
  leaveDelay: leaveDelayProp,
  offset,
  disabled = false,
  followCursor = false,
  className = "",
  zIndex = 1500,
  arrow = false,
  onOpen,
  onClose,
  ariaLabel,
  asChild = false,
  contentClassName,
  contentRef,
}: TooltipProps) => {
  const config = useTooltipConfig();
  const enterDelay = enterDelayProp ?? config?.enterDelay ?? 200;
  const leaveDelay = leaveDelayProp ?? config?.leaveDelay ?? 0;
  const [open, setOpen] = useControllableState({
    value: openProp,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });
  const [triggerEl, setTriggerEl] = useState<HTMLElement | null>(null);
  const [arrowEl, setArrowEl] = useState<HTMLDivElement | null>(null);
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);
  const enterTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const leaveTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const tooltipId = `tooltip-${useId().replace(/:/g, "")}`;

  // Pointer travelling from the trigger towards the tooltip
  const [grace] = useState(() => createPointerGrace({ timeout: 0 }));

  const clearTimers = () => {
    clearTimeout(enterTimeoutRef.current);
    clearTimeout(leaveTimeoutRef.current);
    grace.clear();
  };
  useEffect(
    () => () => {
      clearTimeout(enterTimeoutRef.current);
      clearTimeout(leaveTimeoutRef.current);
    },
    [],
  );

  const show = () => {
    if (open) return;
    setOpen(true);
    onOpen?.();
  };
  const hide = () => {
    if (!open) return;
    config?.markClosed();
    setOpen(false);
    onClose?.();
  };

  useImperativeHandle(
    ref,
    () => ({
      open: () => setOpen(true),
      close: () => setOpen(false),
      toggle: () => setOpen((prev) => !prev),
    }),
    [setOpen],
  );

  // A virtual element at the cursor position when following the cursor
  const cursorAnchor = useMemo<VirtualElement | null>(
    () =>
      followCursor && cursor
        ? {
            getBoundingClientRect: () =>
              DOMRect.fromRect({
                x: cursor.x,
                y: cursor.y,
                width: 0,
                height: 0,
              }),
          }
        : null,
    [followCursor, cursor],
  );

  const isVertical =
    placement.startsWith("top") || placement.startsWith("bottom");
  const gap = arrow ? ARROW_GAP : 0;
  const visible = open && !disabled;
  const layer = useFloatingLayer({
    open: visible,
    anchor: cursorAnchor ?? triggerEl,
    placement,
    offset: offset
      ? {
          mainAxis: (isVertical ? offset[1] : offset[0]) + gap,
          crossAxis: isVertical ? offset[0] : offset[1],
        }
      : { mainAxis: 8 + gap },
    arrowElement: arrow ? arrowEl : null,
    branches: () => [triggerEl],
    // Escape only (topmost layer); hover / focus handle the rest
    dismissOnPointerDownOutside: false,
    dismissOnFocusOutside: false,
    onDismiss: () => {
      clearTimers();
      hide();
    },
  });
  const {
    floatingStyles,
    placement: finalPlacement,
    isPositioned,
    arrowStyles,
  } = layer;
  const setContentRef = useMergedRefs<HTMLElement>(
    layer.ref,
    contentRef as React.Ref<HTMLElement>,
  );

  // Track the cursor while open (followCursor)
  useEffect(() => {
    if (!followCursor || !open) return;
    const handleMouseMove = (e: MouseEvent) =>
      setCursor({ x: e.clientX, y: e.clientY });
    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [followCursor, open]);

  const scheduleHide = () => {
    clearTimeout(leaveTimeoutRef.current);
    leaveTimeoutRef.current = setTimeout(hide, leaveDelay);
  };

  // Hoverable (WCAG 1.4.13): while the pointer heads from the trigger to the
  // tooltip through the gap between them, keep it open.
  useEffect(() => {
    if (!open || followCursor) return;
    const handlePointerMove = (e: PointerEvent) => {
      if (!grace.getArea()) return;
      const target = e.target as Node | null;
      const floating = layer.element;
      if (
        target &&
        (triggerEl?.contains(target) || floating?.contains(target))
      ) {
        return;
      }
      if (grace.isInGraceArea({ x: e.clientX, y: e.clientY })) return;
      grace.clear();
      scheduleHide();
    };
    document.addEventListener("pointermove", handlePointerMove);
    return () => document.removeEventListener("pointermove", handlePointerMove);
  });

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (disabled) return;
    if (followCursor) setCursor({ x: e.clientX, y: e.clientY });
    clearTimers();
    // Within a provider, moving quickly between tooltips skips the delay
    if (enterDelay <= 0 || config?.shouldSkipDelay()) {
      show();
      return;
    }
    enterTimeoutRef.current = setTimeout(show, enterDelay);
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    if (disabled) return;
    clearTimers();
    const rect = layer.element?.getBoundingClientRect();
    if (open && !followCursor && rect && rect.width > 0 && rect.height > 0) {
      // Heading for the tooltip: keep it open while the pointer crosses the
      // gap (pointermove above), at most HOVER_GRACE_MS.
      grace.start(
        { x: e.clientX, y: e.clientY },
        rect,
        parsePlacement(finalPlacement).side,
      );
      leaveTimeoutRef.current = setTimeout(
        hide,
        Math.max(leaveDelay, HOVER_GRACE_MS),
      );
      return;
    }
    scheduleHide();
  };

  // The pointer reached the tooltip: stay open until it leaves it
  const handleContentMouseEnter = () => {
    if (disabled) return;
    clearTimers();
  };

  // Keyboard users get the tooltip when the wrapped (interactive) child
  // receives focus. Activation keys are left alone so they still reach it.
  const handleFocus = () => {
    if (disabled) return;
    clearTimers();
    show();
  };

  const handleBlur = () => {
    if (disabled) return;
    clearTimers();
    hide();
  };

  const describedBy = visible ? tooltipId : undefined;

  // Point the interactive child at the tooltip; fall back to the wrapper
  // when children is not a single element (e.g. plain text).
  const isElementChild = isValidElement<TriggerChildProps>(children);
  const childProps: TriggerChildProps = isElementChild
    ? (children.props as TriggerChildProps)
    : {};
  const childDescribedBy =
    [childProps["aria-describedby"], describedBy].filter(Boolean).join(" ") ||
    undefined;
  const useChildAsTrigger = asChild && isElementChild;

  let triggerNode: React.ReactNode;
  if (useChildAsTrigger) {
    // Disabled: render the child untouched (no handlers, no state hooks)
    triggerNode = disabled ? (
      children
    ) : (
      <Slot
        ref={setTriggerEl}
        className={className || undefined}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        {cloneElement(children, { "aria-describedby": childDescribedBy })}
      </Slot>
    );
  } else {
    triggerNode = (
      <div
        ref={setTriggerEl}
        className={cn(styles.tooltipTrigger, className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        aria-describedby={isElementChild ? undefined : describedBy}
      >
        {isElementChild
          ? cloneElement(children, { "aria-describedby": childDescribedBy })
          : children}
      </div>
    );
  }

  return (
    <>
      {triggerNode}
      {visible && (
        <Portal>
          <div
            ref={setContentRef}
            id={tooltipId}
            role="tooltip"
            aria-label={ariaLabel}
            data-placement={finalPlacement}
            onMouseEnter={handleContentMouseEnter}
            onMouseLeave={followCursor || disabled ? undefined : scheduleHide}
            className={cn(
              styles.tooltip,
              styles[color],
              styles[variant],
              styles[shape],
              styles[`animation-${animation}`],
              followCursor && styles.followCursor,
              arrow && styles.arrow,
              isPositioned && styles.show,
              contentClassName,
            )}
            style={{
              ...floatingStyles,
              zIndex,
            }}
          >
            <LayerContext.Provider value={layer.element}>
              {content}
            </LayerContext.Provider>
            {arrow && (
              <div
                ref={setArrowEl}
                className={styles.tooltipArrow}
                style={arrowStyles}
              />
            )}
          </div>
        </Portal>
      )}
    </>
  );
};

export default React.memo(Tooltip);

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
import { createPortal } from "react-dom";
import classNames from "classnames";
import type { TooltipProps } from "./types";
import {
  useAnchoredPosition,
  type VirtualElement,
} from "../../internal/useAnchoredPosition";
import { useControllableState } from "../../internal/useControllableState";
import { useIsClient } from "../../internal/useIsClient";
import styles from "./tooltip.module.scss";

/** Extra gap so the arrow does not overlap the trigger. */
const ARROW_GAP = 6;

/**
 * Tooltip: shows informative content when the wrapped element is hovered or
 * focused. Flips / shifts to stay inside the viewport.
 */
const Tooltip = ({
  ref,
  content,
  children,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  placement = "top",
  variant = "dark",
  shape = "default",
  animation = "fade",
  enterDelay = 200,
  leaveDelay = 0,
  offset,
  disabled = false,
  followCursor = false,
  className = "",
  zIndex = 1500,
  bgColor,
  textColor,
  arrow = false,
  onOpen,
  onClose,
  ariaLabel,
}: TooltipProps) => {
  const isClient = useIsClient();
  const [open, setOpen] = useControllableState({
    value: openProp,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });
  const [triggerEl, setTriggerEl] = useState<HTMLDivElement | null>(null);
  const [arrowEl, setArrowEl] = useState<HTMLDivElement | null>(null);
  const [cursor, setCursor] = useState<{ x: number; y: number } | null>(null);
  const enterTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const leaveTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const tooltipId = `tooltip-${useId().replace(/:/g, "")}`;

  const clearTimers = () => {
    clearTimeout(enterTimeoutRef.current);
    clearTimeout(leaveTimeoutRef.current);
  };
  useEffect(() => clearTimers, []);

  const show = () => {
    if (open) return;
    setOpen(true);
    onOpen?.();
  };
  const hide = () => {
    if (!open) return;
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
  const {
    setFloating,
    floatingStyles,
    placement: finalPlacement,
    isPositioned,
    arrowStyles,
  } = useAnchoredPosition({
    open: open && !disabled,
    anchor: cursorAnchor ?? triggerEl,
    placement,
    offset: offset
      ? {
          mainAxis: (isVertical ? offset[1] : offset[0]) + gap,
          crossAxis: isVertical ? offset[0] : offset[1],
        }
      : { mainAxis: 8 + gap },
    arrowElement: arrow ? arrowEl : null,
  });

  // Track the cursor while open (followCursor)
  useEffect(() => {
    if (!followCursor || !open) return;
    const handleMouseMove = (e: MouseEvent) =>
      setCursor({ x: e.clientX, y: e.clientY });
    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [followCursor, open]);

  // Escape dismisses the tooltip wherever focus is (WCAG 1.4.13)
  const hideRef = useRef(hide);
  useEffect(() => {
    hideRef.current = hide;
  });
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        clearTimers();
        hideRef.current();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (disabled) return;
    if (followCursor) setCursor({ x: e.clientX, y: e.clientY });
    clearTimers();
    enterTimeoutRef.current = setTimeout(show, enterDelay);
  };

  const handleMouseLeave = () => {
    if (disabled) return;
    clearTimers();
    leaveTimeoutRef.current = setTimeout(hide, leaveDelay);
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

  const visible = open && !disabled;
  const describedBy = visible ? tooltipId : undefined;

  // Point the interactive child at the tooltip; fall back to the wrapper
  // when children is not a single element (e.g. plain text).
  const trigger = isValidElement<{ "aria-describedby"?: string }>(children)
    ? cloneElement(children, {
        "aria-describedby":
          [children.props["aria-describedby"], describedBy]
            .filter(Boolean)
            .join(" ") || undefined,
      })
    : children;

  const background = bgColor?.includes("gradient")
    ? { background: bgColor }
    : { backgroundColor: bgColor };

  return (
    <>
      <div
        ref={setTriggerEl}
        className={classNames(styles.tooltipTrigger, className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        aria-describedby={isValidElement(children) ? undefined : describedBy}
      >
        {trigger}
      </div>
      {visible &&
        isClient &&
        createPortal(
          <div
            ref={setFloating}
            id={tooltipId}
            role="tooltip"
            aria-label={ariaLabel}
            data-placement={finalPlacement}
            className={classNames(
              styles.tooltip,
              styles[variant],
              styles[shape],
              styles[`animation-${animation}`],
              followCursor && styles.followCursor,
              arrow && styles.arrow,
              isPositioned && styles.show,
            )}
            style={{
              ...floatingStyles,
              ...background,
              color: textColor,
              zIndex,
            }}
          >
            {content}
            {arrow && (
              <div
                ref={setArrowEl}
                className={styles.tooltipArrow}
                style={{ ...background, ...arrowStyles }}
              />
            )}
          </div>,
          document.body,
        )}
    </>
  );
};

export default React.memo(Tooltip);

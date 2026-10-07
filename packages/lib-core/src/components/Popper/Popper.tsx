import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import classNames from "classnames";
import { POPPER_SIZE_CONFIG } from "./constants";
import type {
  PopperProps,
  PopperPlacement,
  PopperAnimation,
  PopperCustomStyle,
} from "./types";
import {
  toCamelPlacement,
  toPlacement,
  useAnchoredPosition,
} from "../../internal/useAnchoredPosition";
import { useMergedRefs } from "../../internal/mergeRefs";
import { useIsClient } from "../../internal/useIsClient";
import styles from "./popper.module.scss";
import { usePortalContainer } from "../../internal/themeScope";

/**
 * Stable default prop values, hoisted so omitting them does not create a new
 * object every render.
 */
const DEFAULT_ANIMATION: Readonly<PopperAnimation> = Object.freeze({
  duration: 200,
  easing: "ease",
});
const DEFAULT_POPPER_STYLE: Readonly<PopperCustomStyle> = Object.freeze({});

const DEFAULT_ROLE = {
  menu: "menu",
  tooltip: "tooltip",
  select: "dialog",
  default: "dialog",
} as const;

/**
 * Popper: floating content anchored to an element.
 *
 * Positioning uses flip + shift so the popper stays inside the viewport and
 * follows the anchor while scrolling / resizing. The visible state is
 * controlled by the parent (`visible` + `onVisibleChange`).
 */
const Popper = ({
  ref,
  id,
  anchorEl,
  visible,
  children,
  placement = "bottom",
  variant = "default",
  type = "default",
  size = "auto",
  offset,
  flip = true,
  shift = true,
  matchAnchorWidth = false,
  closeOnEscape = true,
  animation = DEFAULT_ANIMATION,
  arrow = false,
  zIndex = 1000,
  onClickAway,
  className = "",
  popperStyle = DEFAULT_POPPER_STYLE,
  tabIndex = 0,
  ariaLabel,
  role,
  multiline = false,
  trigger = "click",
  onVisibleChange,
  scrollable = true,
  width,
  height,
}: PopperProps) => {
  const isClient = useIsClient();
  const portalContainer = usePortalContainer();
  const popperRef = useRef<HTMLDivElement>(null);
  const [arrowEl, setArrowEl] = useState<HTMLSpanElement | null>(null);

  const isVertical =
    placement.startsWith("top") || placement.startsWith("bottom");
  const position = useAnchoredPosition({
    open: visible,
    anchor: anchorEl,
    placement: toPlacement(placement),
    offset: offset
      ? {
          mainAxis: isVertical ? offset.y : offset.x,
          crossAxis: isVertical ? offset.x : offset.y,
        }
      : undefined,
    flip,
    shift,
    matchAnchorWidth,
    arrowElement: arrow ? arrowEl : null,
  });
  const { setFloating } = position;
  const setPopperRef = useMergedRefs<HTMLDivElement>(popperRef, ref);
  const setRefs = useMergedRefs<HTMLDivElement>(setPopperRef, setFloating);
  const finalPlacement = toCamelPlacement(
    position.placement,
  ) as PopperPlacement;

  // Latest callbacks for the document listeners below, so they are not
  // re-attached when the parent passes new inline callbacks.
  const callbacksRef = useRef({ onClickAway, onVisibleChange });
  useEffect(() => {
    callbacksRef.current = { onClickAway, onVisibleChange };
  });

  // Click away
  useEffect(() => {
    if (!visible || !onClickAway) return;
    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;
      if (popperRef.current?.contains(target)) return;
      if (anchorEl?.contains(target)) return;
      callbacksRef.current.onClickAway?.(event);
    };
    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [visible, anchorEl, onClickAway]);

  // Escape closes; focus inside the popper returns to the anchor
  useEffect(() => {
    if (!visible || !closeOnEscape) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || event.defaultPrevented) return;
      const target = event.target as Node;
      const inPopper = popperRef.current?.contains(target) ?? false;
      const onAnchor = anchorEl?.contains(target) ?? false;
      if (!inPopper && !onAnchor) return;
      callbacksRef.current.onVisibleChange?.(false);
      if (inPopper && anchorEl instanceof HTMLElement) anchorEl.focus();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [visible, closeOnEscape, anchorEl]);

  // Keep wheel scrolling inside a scrollable popper
  useEffect(() => {
    const popper = popperRef.current;
    if (!visible || !scrollable || !popper) return;
    const handleWheel = (e: WheelEvent) => {
      const { scrollTop, scrollHeight, clientHeight } = popper;
      if (scrollHeight <= clientHeight) return;
      const isAtTop = scrollTop === 0;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight;
      if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
        e.preventDefault();
      }
    };
    popper.addEventListener("wheel", handleWheel, { passive: false });
    return () => popper.removeEventListener("wheel", handleWheel);
  }, [visible, scrollable]);

  // Anchor interactions that request a visibility change
  useEffect(() => {
    if (!anchorEl || trigger === "manual") return;
    const request = (next: boolean) =>
      callbacksRef.current.onVisibleChange?.(next);

    const listeners: Array<[string, EventListener]> = [];
    if (trigger === "click") {
      listeners.push(["click", () => request(!visible)]);
    } else if (trigger === "hover") {
      listeners.push(["mouseenter", () => request(true)]);
      listeners.push(["mouseleave", () => request(false)]);
    } else if (trigger === "focus") {
      listeners.push(["focus", () => request(true)]);
      listeners.push(["blur", () => request(false)]);
    } else if (trigger === "contextMenu") {
      listeners.push([
        "contextmenu",
        (e) => {
          e.preventDefault();
          request(true);
        },
      ]);
    }
    listeners.forEach(([event, handler]) =>
      anchorEl.addEventListener(event, handler),
    );
    return () =>
      listeners.forEach(([event, handler]) =>
        anchorEl.removeEventListener(event, handler),
      );
  }, [anchorEl, trigger, visible]);

  const { floatingStyles } = position;
  const combinedStyles = useMemo<React.CSSProperties>(
    () => ({
      ...floatingStyles,
      zIndex,
      transition: `opacity ${animation.duration}ms ${animation.easing}, visibility ${animation.duration}ms ${animation.easing}, transform ${animation.duration}ms ${animation.easing}`,
      ...(size === "auto"
        ? { width: width || undefined, height: height || undefined }
        : {
            width: width || POPPER_SIZE_CONFIG[size].width,
            height: height || POPPER_SIZE_CONFIG[size].height,
          }),
      ...popperStyle,
      // Keep the outer box unclipped so the arrow can overflow its edge;
      // scrolling happens on the content wrapper instead.
      ...(arrow ? { overflow: "visible" } : {}),
    }),
    [
      floatingStyles,
      zIndex,
      animation.duration,
      animation.easing,
      popperStyle,
      width,
      height,
      size,
      arrow,
    ],
  );

  // Overflow handling lives on the content so it never clips the arrow
  const contentStyles = useMemo<React.CSSProperties>(
    () => ({
      maxWidth: "inherit",
      maxHeight: "inherit",
      height: "100%",
      ...(size === "auto"
        ? {
            overflowX: scrollable ? "auto" : "hidden",
            overflowY: scrollable ? "auto" : "visible",
          }
        : multiline
          ? { overflowY: scrollable ? "auto" : "visible", overflowX: "hidden" }
          : { overflowY: "hidden", overflowX: scrollable ? "auto" : "hidden" }),
    }),
    [size, scrollable, multiline],
  );

  if (!visible || !isClient) return null;

  return createPortal(
    <div
      ref={setRefs}
      id={id}
      className={classNames(
        styles.popper,
        styles[variant],
        styles[type],
        styles[size],
        multiline ? styles.multiline : styles.singleline,
        position.isPositioned && styles.visible,
        scrollable && styles.scrollable,
        className,
      )}
      style={combinedStyles}
      data-placement={finalPlacement}
      role={role ?? DEFAULT_ROLE[type]}
      tabIndex={tabIndex}
      aria-label={ariaLabel}
    >
      <div className={styles.popperContent} style={contentStyles}>
        {children}
      </div>
      {arrow && (
        <span
          ref={setArrowEl}
          className={styles.popperArrow}
          data-placement={finalPlacement}
          style={{
            backgroundColor: popperStyle.backgroundColor,
            borderColor: popperStyle.borderColor,
            ...position.arrowStyles,
          }}
          aria-hidden="true"
        />
      )}
    </div>,
    portalContainer ?? document.body,
  );
};

export default React.memo(Popper);

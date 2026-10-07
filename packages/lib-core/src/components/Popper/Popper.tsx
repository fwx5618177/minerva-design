import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import { createPortal } from "react-dom";
import { POPPER_SIZE_CONFIG } from "./constants";
import type {
  PopperProps,
  PopperPlacement,
  PopperOffset,
  PopperAnimation,
  PopperCustomStyle,
} from "./types";
import styles from "./popper.module.scss";

/**
 * Stable default prop values. Hoisted to module scope so that omitting these
 * props does not create a new object every render (which would invalidate the
 * memos/effects that depend on them).
 */
const DEFAULT_OFFSET: Readonly<PopperOffset> = Object.freeze({ x: 0, y: 8 });
const DEFAULT_ANIMATION: Readonly<PopperAnimation> = Object.freeze({
  duration: 200,
  easing: "ease",
});
const DEFAULT_POPPER_STYLE: Readonly<PopperCustomStyle> = Object.freeze({});

/**
 * Position calculation map for different placements
 */
const POSITION_MAP: Record<
  PopperPlacement,
  (
    anchorRect: DOMRect,
    popperRect: DOMRect,
    offset: { x: number; y: number },
  ) => { top: number; left: number }
> = {
  top: (anchor, popper, offset) => ({
    top: anchor.top - popper.height - offset.y - 8,
    left: anchor.left + (anchor.width - popper.width) / 2,
  }),
  topStart: (anchor, popper, offset) => ({
    top: anchor.top - popper.height - offset.y,
    left: anchor.left,
  }),
  topEnd: (anchor, popper, offset) => ({
    top: anchor.top - popper.height - offset.y,
    left: anchor.right - popper.width,
  }),
  bottom: (anchor, popper, offset) => ({
    top: anchor.bottom + offset.y + 8,
    left: anchor.left + (anchor.width - popper.width) / 2,
  }),
  bottomStart: (anchor, popper, offset) => ({
    top: anchor.bottom + offset.y,
    left: anchor.left,
  }),
  bottomEnd: (anchor, popper, offset) => ({
    top: anchor.bottom + offset.y,
    left: anchor.right - popper.width,
  }),
  left: (anchor, popper, offset) => ({
    top: anchor.top + (anchor.height - popper.height) / 2,
    left: anchor.left - popper.width - offset.x - 8,
  }),
  leftStart: (anchor, popper, offset) => ({
    top: anchor.top,
    left: anchor.left - popper.width - offset.x,
  }),
  leftEnd: (anchor, popper, offset) => ({
    top: anchor.bottom - popper.height,
    left: anchor.left - popper.width - offset.x,
  }),
  right: (anchor, popper, offset) => ({
    top: anchor.top + (anchor.height - popper.height) / 2,
    left: anchor.right + offset.x + 8,
  }),
  rightStart: (anchor, popper, offset) => ({
    top: anchor.top,
    left: anchor.right + offset.x,
  }),
  rightEnd: (anchor, popper, offset) => ({
    top: anchor.bottom - popper.height,
    left: anchor.right + offset.x,
  }),
};

/**
 * Arrow component for the Popper.
 * Rendered as a rotated square sitting on the edge facing the anchor element;
 * it inherits the popper's background / border colors unless overridden.
 */
const PopperArrow = ({
  placement,
  style,
}: {
  placement: PopperPlacement;
  style?: React.CSSProperties;
}) => (
  <span
    className={styles.popperArrow}
    data-placement={placement}
    style={style}
    aria-hidden="true"
  />
);

/**
 * Popper Component
 * @param anchorEl - Element to anchor the popper to
 * @param visible - Whether the popper is visible
 * @param children - Additional React children (combined with content)
 * @param placement - Placement relative to anchor
 * @param variant - Visual variant
 * @param type - Functional type
 * @param size - Size variant
 * @param offset - Position offset
 * @param animation - Animation settings
 * @param arrow - Show arrow indicator
 * @param zIndex - Z-index level
 * @param onClickAway - Click outside handler
 * @param className - Custom class name
 * @param popperStyle - Custom popper styles
 * @param tabIndex - Focus management
 * @param ariaLabel - Accessibility label
 * @param multiline - Whether to allow text wrapping
 * @param trigger - Trigger mode
 * @param onVisibleChange - Callback when visibility changes
 * @param scrollable - Whether to allow content scrolling
 * @param width - Fixed width
 * @param height - Fixed height
 */
const Popper: React.FC<PopperProps> = ({
  anchorEl,
  visible,
  children,
  placement = "bottom",
  variant = "default",
  type = "default",
  size = "auto",
  offset = DEFAULT_OFFSET,
  animation = DEFAULT_ANIMATION,
  arrow = false,
  zIndex = 1000,
  onClickAway,
  className = "",
  popperStyle = DEFAULT_POPPER_STYLE,
  tabIndex = 0,
  ariaLabel,
  multiline = false,
  trigger = "click",
  onVisibleChange,
  scrollable = true,
  width,
  height,
}: PopperProps) => {
  const popperRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const getPosition = useMemo(() => POSITION_MAP[placement], [placement]);

  // Handle outside click
  useEffect(() => {
    if (!visible || !onClickAway) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        popperRef.current &&
        !popperRef.current.contains(event.target as Node) &&
        anchorEl &&
        !anchorEl.contains(event.target as Node)
      ) {
        onClickAway(event);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [visible, anchorEl, onClickAway]);

  // Update position with RAF for better performance
  const updatePosition = useCallback(() => {
    if (!anchorEl || !popperRef.current) return;

    requestAnimationFrame(() => {
      const anchorRect = anchorEl.getBoundingClientRect();
      const popperElement = popperRef.current;
      if (!popperElement) return; // Ensure popperElement is not null

      const popperRect = popperElement.getBoundingClientRect();
      const { top: calcTop, left: calcLeft } = getPosition(
        anchorRect,
        popperRect,
        offset,
      );

      // Viewport boundaries
      const viewportWidth = document.documentElement.clientWidth;
      const viewportHeight = document.documentElement.clientHeight;

      let finalLeft = calcLeft;
      let finalTop = calcTop;

      // Boundary checks
      if (finalLeft + popperRect.width > viewportWidth) {
        finalLeft = viewportWidth - popperRect.width;
      }
      if (finalLeft < 0) finalLeft = 0;
      if (finalTop < 0) finalTop = 0;
      if (finalTop + popperRect.height > viewportHeight) {
        finalTop = viewportHeight - popperRect.height;
      }

      const top = finalTop + window.scrollY;
      const left = finalLeft + window.scrollX;
      // Bail out when unchanged so callers passing an inline `offset` object
      // cannot trigger an endless measure/re-render loop.
      setPosition((prev) =>
        prev.top === top && prev.left === left ? prev : { top, left },
      );
    });
  }, [anchorEl, getPosition, offset]);

  // Update position when necessary
  useEffect(() => {
    if (!visible || !anchorEl) return;

    updatePosition();

    // Only listen to scroll events on the document
    const handleScroll = () => {
      if (document.contains(anchorEl)) {
        updatePosition();
      }
    };

    // Minimal event listeners
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", handleScroll, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [visible, anchorEl, updatePosition]);

  // Update scroll handling
  useEffect(() => {
    if (!visible || scrollable === false) return;

    const handleWheel = (e: WheelEvent) => {
      const popper = popperRef.current;
      if (!popper) return;

      // Check if at scroll boundaries
      const { scrollTop, scrollHeight, clientHeight } = popper;
      const isAtTop = scrollTop === 0;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight;

      // Prevent scroll propagation at boundaries
      if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
        e.preventDefault();
      }
    };

    const popperElement = popperRef.current;
    if (popperElement) {
      popperElement.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (popperElement) {
        popperElement.removeEventListener("wheel", handleWheel);
      }
    };
  }, [visible, scrollable]);

  // Combine custom styles with default styles
  const combinedStyles: React.CSSProperties = useMemo(
    () => ({
      position: "absolute" as const,
      top: position.top,
      left: position.left,
      zIndex,
      transition: `
        opacity ${animation.duration}ms ${animation.easing},
        visibility ${animation.duration}ms ${animation.easing},
        transform ${animation.duration}ms ${animation.easing}
      `,
      ...(size === "auto"
        ? {
            width: width || "auto",
            height: height || "auto",
          }
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
      position.top,
      position.left,
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
  const contentStyles: React.CSSProperties = useMemo(
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
          ? {
              overflowY: scrollable ? "auto" : "visible",
              overflowX: "hidden",
            }
          : {
              overflowY: "hidden",
              overflowX: scrollable ? "auto" : "hidden",
            }),
    }),
    [size, scrollable, multiline],
  );

  // Arrow styles
  const arrowStyle = useMemo(
    () => ({
      backgroundColor: popperStyle.backgroundColor,
      borderColor: popperStyle.borderColor,
    }),
    [popperStyle.backgroundColor, popperStyle.borderColor],
  );

  useEffect(() => {
    if (!anchorEl) return;

    const handleTrigger = () => {
      if (trigger === "manual") return;
      onVisibleChange?.(!visible);
    };

    const handleMouseEnter = () => {
      if (trigger === "hover") {
        onVisibleChange?.(true);
      }
    };

    const handleMouseLeave = () => {
      if (trigger === "hover") {
        onVisibleChange?.(false);
      }
    };

    const handleFocus = () => {
      if (trigger === "focus") {
        onVisibleChange?.(true);
      }
    };

    const handleBlur = () => {
      if (trigger === "focus") {
        onVisibleChange?.(false);
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      if (trigger === "contextMenu") {
        e.preventDefault();
        onVisibleChange?.(true);
      }
    };

    if (trigger === "click") {
      anchorEl.addEventListener("click", handleTrigger);
    } else if (trigger === "hover") {
      anchorEl.addEventListener("mouseenter", handleMouseEnter);
      anchorEl.addEventListener("mouseleave", handleMouseLeave);
    } else if (trigger === "focus") {
      anchorEl.addEventListener("focus", handleFocus);
      anchorEl.addEventListener("blur", handleBlur);
    } else if (trigger === "contextMenu") {
      anchorEl.addEventListener("contextmenu", handleContextMenu);
    }

    return () => {
      anchorEl.removeEventListener("click", handleTrigger);
      anchorEl.removeEventListener("mouseenter", handleMouseEnter);
      anchorEl.removeEventListener("mouseleave", handleMouseLeave);
      anchorEl.removeEventListener("focus", handleFocus);
      anchorEl.removeEventListener("blur", handleBlur);
      anchorEl.removeEventListener("contextmenu", handleContextMenu);
    };
  }, [anchorEl, trigger, visible, onVisibleChange]);

  if (!visible) return null;

  return createPortal(
    <div
      ref={popperRef}
      className={`
        ${styles.popper}
        ${styles[variant]}
        ${styles[type]}
        ${styles[size]}
        ${multiline ? styles.multiline : styles.singleline}
        ${visible ? styles.visible : ""}
        ${scrollable ? styles.scrollable : ""}
        ${className}
      `}
      style={combinedStyles}
      role={type === "menu" ? "menu" : "dialog"}
      tabIndex={tabIndex}
      aria-hidden={!visible}
      aria-label={ariaLabel}
    >
      <div className={styles.popperContent} style={contentStyles}>
        {children}
      </div>
      {arrow && <PopperArrow placement={placement} style={arrowStyle} />}
    </div>,

    document.body,
  );
};

export default React.memo(Popper);

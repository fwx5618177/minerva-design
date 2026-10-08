import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import type { Placement, VirtualElement } from "@minerva/core";
import { Slot } from "../../internal/Slot";
import { useInheritedDirection } from "../../internal/direction";
import { useControllableState } from "../../internal/useControllableState";
import { useLayerParent } from "../../internal/useDismissableLayer";
import { MenuRoot, triggerHooks, type FocusIntent } from "./MenuItems";
import type { ContextMenuProps } from "./types";

/** Touch long press duration that opens the menu (ms). */
export const LONG_PRESS_DELAY = 700;

interface Position {
  anchor: Element | VirtualElement;
  placement: Placement;
  offset: { mainAxis: number; crossAxis: number };
}

/** A zero-size anchor at a viewport point (the pointer). */
const pointAnchor = (
  x: number,
  y: number,
  contextElement: Element,
): VirtualElement => ({
  contextElement,
  getBoundingClientRect: () => ({
    x,
    y,
    left: x,
    top: y,
    right: x,
    bottom: y,
    width: 0,
    height: 0,
  }),
});

const AT_POINTER = { mainAxis: 2, crossAxis: 0 };
const AT_ELEMENT = { mainAxis: 4, crossAxis: 0 };

/**
 * ContextMenu: the Menu entries opened at the pointer on right click (long
 * press on touch); Shift+F10 or the ContextMenu key open it at the area.
 * A right click while open moves the menu. Focus moves to the first item
 * and returns to the area (or the element focused in it) on close.
 */
const ContextMenu = ({
  children,
  items,
  onSelect,
  closeOnSelect = true,
  size = "medium",
  onOpenChange,
  disabled = false,
  modal = true,
  loop = true,
  dir: dirProp,
  className,
  "aria-label": ariaLabel,
}: ContextMenuProps) => {
  const [open, setOpen] = useControllableState({
    defaultValue: false,
    onChange: onOpenChange,
    name: "ContextMenu",
    prop: "open",
  });
  const [area, setArea] = useState<HTMLElement | null>(null);
  // Without `dir`, the menu follows the direction inherited by the area.
  const inheritedDir = useInheritedDirection(area, dirProp === undefined);
  const dir = dirProp ?? inheritedDir;
  const [position, setPosition] = useState<Position | null>(null);
  const tabContainer = useLayerParent();
  const contentId = useId();
  const restoreTarget = useRef<HTMLElement | null>(null);
  const longPress = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  const clearLongPress = () => {
    clearTimeout(longPress.current);
    longPress.current = undefined;
  };
  useEffect(() => () => clearTimeout(longPress.current), []);

  const openAt = (next: Position) => {
    if (!area) return;
    if (!open) {
      const focused = area.ownerDocument.activeElement;
      restoreTarget.current =
        focused instanceof HTMLElement && area.contains(focused)
          ? focused
          : area;
    }
    setPosition(next);
    setOpen(true);
  };
  const openAtPoint = (x: number, y: number) =>
    area &&
    openAt({
      anchor: pointAnchor(x, y, area),
      placement: dir === "rtl" ? "left-start" : "right-start",
      offset: AT_POINTER,
    });

  const onContextMenu = (event: ReactMouseEvent<HTMLElement>) => {
    if (disabled || event.defaultPrevented) return;
    event.preventDefault();
    clearLongPress();
    openAtPoint(event.clientX, event.clientY);
  };

  const onKeyDown = (event: ReactKeyboardEvent<HTMLElement>) => {
    if (disabled || event.defaultPrevented || !area) return;
    if (
      event.key === "ContextMenu" ||
      (event.shiftKey && event.key === "F10")
    ) {
      event.preventDefault();
      openAt({
        anchor: area,
        placement: dir === "rtl" ? "bottom-end" : "bottom-start",
        offset: AT_ELEMENT,
      });
    }
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLElement>) => {
    if (disabled || event.pointerType !== "touch") return;
    clearLongPress();
    const { clientX, clientY } = event;
    longPress.current = setTimeout(() => {
      longPress.current = undefined;
      openAtPoint(clientX, clientY);
    }, LONG_PRESS_DELAY);
  };
  const onTouchEnd = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch") clearLongPress();
  };

  const consumeIntent = useCallback((): FocusIntent => "first", []);
  const getRestoreTarget = useCallback(() => restoreTarget.current, []);

  const style: CSSProperties | undefined = disabled
    ? undefined
    : {
        WebkitTouchCallout: "none",
        // Keep right clicks reaching the area while a modal menu disables
        // pointer events on the page (they move the menu).
        ...(open && modal ? { pointerEvents: "auto" } : {}),
      };

  return (
    <>
      <Slot
        ref={setArea}
        {...triggerHooks("context-menu", children, open, !!disabled)}
        style={style}
        onContextMenu={onContextMenu}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onTouchEnd}
        onPointerUp={onTouchEnd}
        onPointerCancel={onTouchEnd}
      >
        {children}
      </Slot>
      <MenuRoot
        component="context-menu"
        items={items}
        onSelect={onSelect}
        closeOnSelect={closeOnSelect}
        size={size}
        loop={loop}
        dir={dir}
        modal={modal}
        className={className}
        aria-label={ariaLabel}
        open={open && !disabled && !!position}
        setOpen={setOpen}
        anchor={position?.anchor ?? null}
        placement={position?.placement ?? "right-start"}
        offset={position?.offset ?? AT_POINTER}
        contentId={contentId}
        trigger={null}
        getRestoreTarget={getRestoreTarget}
        consumeIntent={consumeIntent}
        onPointerDownOutside={(event) => {
          // A right click in the area moves the menu instead of closing it.
          if (
            event.button === 2 &&
            area &&
            event.target instanceof Node &&
            area.contains(event.target)
          ) {
            event.preventDefault();
          }
        }}
        tabContainer={tabContainer}
      />
    </>
  );
};

export default ContextMenu;

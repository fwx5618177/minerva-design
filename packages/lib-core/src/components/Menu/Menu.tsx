import {
  useCallback,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { toPlacement } from "@minerva/core";
import { Slot } from "../../internal/Slot";
import { useInheritedDirection } from "../../internal/direction";
import { useControllableState } from "../../internal/useControllableState";
import { useLayerParent } from "../../internal/useDismissableLayer";
import { MenuRoot, type FocusIntent } from "./MenuItems";
import type { MenuProps } from "./types";

const OFFSET = { mainAxis: 6, crossAxis: 0 };

/**
 * Menu: an action menu opened from a trigger button (WAI-ARIA menu button).
 * Supports icons, shortcuts, separators, groups, checkbox items, radio
 * groups, submenus, typeahead and full keyboard navigation. For a
 * select-like list of options see Select.
 *
 * - Trigger: click, Enter, Space or ArrowDown open the menu and focus the
 *   first item (a pointer click focuses the panel); ArrowUp focuses the last.
 * - Inside: arrows (wrapping with `loop`), Home / End, typeahead, Enter /
 *   Space activate; Escape closes (a submenu only) and returns focus; Tab
 *   closes the menu and moves on from the trigger.
 * - Submenus open with ArrowRight (ArrowLeft in RTL), Enter, Space or hover,
 *   and stay open while the pointer moves towards them.
 * - `modal` (default): outside pointer events disabled, focus trapped,
 *   scroll locked, the rest of the page hidden from assistive technology.
 */
const Menu = ({
  children,
  items,
  onSelect,
  closeOnSelect = true,
  size = "medium",
  align = "end",
  side = "bottom",
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  disabled = false,
  modal = true,
  loop = true,
  dir: dirProp,
  className,
  "aria-label": ariaLabel,
}: MenuProps) => {
  const [open, setOpen] = useControllableState({
    value: openProp,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });
  const [trigger, setTrigger] = useState<HTMLElement | null>(null);
  // Without `dir`, the menu (portalled out of the trigger's subtree) follows
  // the reading direction inherited by the trigger, read when it opens.
  const inheritedDir = useInheritedDirection(
    trigger,
    open && dirProp === undefined,
  );
  const dir = dirProp ?? inheritedDir;
  const tabContainer = useLayerParent();
  const generatedId = useId();
  const contentId = useId();
  const childId = (children.props as { id?: string }).id;
  const triggerId = childId ?? generatedId;

  const intent = useRef<FocusIntent>("content");
  const consumeIntent = useCallback(() => {
    const value = intent.current;
    intent.current = "content";
    return value;
  }, []);
  const getRestoreTarget = useCallback(() => trigger, [trigger]);

  const openWith = (next: FocusIntent) => {
    intent.current = next;
    setOpen(true);
  };

  const onKeyDown = (event: ReactKeyboardEvent<HTMLElement>) => {
    if (disabled || event.defaultPrevented) return;
    switch (event.key) {
      case "Enter":
      case " ":
        event.preventDefault();
        if (open) setOpen(false);
        else openWith("first");
        break;
      case "ArrowDown":
        event.preventDefault();
        openWith("first");
        break;
      case "ArrowUp":
        event.preventDefault();
        openWith("last");
        break;
    }
  };

  const onClick = (event: ReactMouseEvent<HTMLElement>) => {
    if (disabled || event.defaultPrevented) return;
    if (open) setOpen(false);
    // detail 0: a keyboard / programmatic click
    else openWith(event.detail === 0 ? "first" : "content");
  };

  return (
    <>
      <Slot
        ref={setTrigger}
        id={triggerId}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? contentId : undefined}
        data-state={open ? "open" : "closed"}
        data-disabled={disabled ? "" : undefined}
        {...{ disabled: disabled || undefined }}
        onKeyDown={onKeyDown}
        onClick={onClick}
      >
        {children}
      </Slot>
      <MenuRoot
        items={items}
        onSelect={onSelect}
        closeOnSelect={closeOnSelect}
        size={size}
        loop={loop}
        dir={dir}
        modal={modal}
        className={className}
        aria-label={ariaLabel}
        labelledBy={triggerId}
        open={open && !disabled}
        setOpen={setOpen}
        anchor={trigger}
        placement={toPlacement(side, align)}
        offset={OFFSET}
        contentId={contentId}
        trigger={trigger}
        getRestoreTarget={getRestoreTarget}
        consumeIntent={consumeIntent}
        tabContainer={tabContainer}
      />
    </>
  );
};

export default Menu;

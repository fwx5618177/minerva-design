import React, {
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import classNames from "classnames";
import styles from "./dropdown.module.scss";
import type { DropdownProps, DropdownOption } from "./types";
import Button from "../Button/Button";
import { useAnchoredPosition } from "../../internal/useAnchoredPosition";
import { useControllableState } from "../../internal/useControllableState";
import { useMergedRefs } from "../../internal/mergeRefs";

const DIRECTION_PLACEMENT = {
  down: "bottom-start",
  up: "top-start",
  left: "left-start",
  right: "right-start",
} as const;

/** Native elements that are already focusable / keyboard operable. */
const INTERACTIVE_TAGS = new Set([
  "button",
  "a",
  "input",
  "select",
  "textarea",
]);

type TriggerA11yProps = {
  "aria-haspopup": "menu";
  "aria-expanded": boolean;
  "aria-controls"?: string;
  "aria-disabled"?: boolean;
  role?: string;
  tabIndex?: number;
};

const findEnabledIndex = (
  items: DropdownOption[],
  start: number,
  step: 1 | -1,
): number => {
  const count = items.length;
  if (count === 0) return -1;
  for (let i = 0; i < count; i += 1) {
    const index = (((start + step * i) % count) + count) % count;
    if (!items[index].disabled) return index;
  }
  return -1;
};

/**
 * Dropdown component
 * @param className - Additional classes to be added to the dropdown
 * @param ariaLabel - The aria-label attribute for the dropdown menu, used for accessibility
 * @param disabled - Whether the dropdown is disabled
 * @param items - The items to be displayed in the dropdown menu
 * @param onSelect - Function to be called when an item is selected
 * @param menuBgColor - Background color of the menu
 * @param menuTextColor - Text color of the menu
 * @param menuBoxShadow - Box shadow of the menu
 * @param direction - Direction of the menu (down, up, left, right)
 * @param children - The trigger element for the dropdown
 * @returns A dropdown component
 */
const Dropdown = ({
  ref,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  className = "",
  ariaLabel,
  disabled = false,
  items = [],
  onSelect,
  menuBgColor = "var(--surface-elevated-color)",
  menuTextColor = "var(--text-color)",
  menuBoxShadow = "var(--shadow-md)",
  direction = "down",
  children,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useControllableState({
    value: openProp,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });
  // Index of the item that owns focus (roving focus); -1 = none yet.
  const [activeIndex, setActiveIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const setDropdownRef = useMergedRefs(dropdownRef, ref);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [triggerEl, setTriggerEl] = useState<HTMLDivElement | null>(null);
  const setTriggerRef = useMergedRefs(triggerRef, setTriggerEl);
  const menuRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);
  const baseId = useId().replace(/:/g, "");
  const menuId = `dropdown-menu-${baseId}`;

  const { setFloating, floatingStyles, placement } = useAnchoredPosition({
    open: isOpen,
    anchor: triggerEl,
    placement: DIRECTION_PLACEMENT[direction],
    offset: { mainAxis: 4 },
  });
  const setMenuRef = useMergedRefs(menuRef, setFloating);

  const openMenu = useCallback(
    (focusIndex: number) => {
      setIsOpen(true);
      setActiveIndex(focusIndex);
    },
    [setIsOpen],
  );

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    setActiveIndex(-1);
  }, [setIsOpen]);

  const focusTrigger = () => {
    const wrapper = triggerRef.current;
    if (!wrapper) return;
    const target = wrapper.matches("[aria-haspopup]")
      ? wrapper
      : wrapper.querySelector<HTMLElement>("[aria-haspopup]");
    target?.focus();
  };

  // Move DOM focus to the active item whenever it changes.
  useEffect(() => {
    if (isOpen && activeIndex >= 0) {
      itemRefs.current[activeIndex]?.focus();
    }
  }, [isOpen, activeIndex]);

  const handleToggle = () => {
    if (disabled) return;
    if (isOpen) {
      closeMenu();
    } else {
      openMenu(-1);
    }
  };

  const handleSelect = (item: DropdownOption) => {
    if (item.disabled) return;
    onSelect?.(item);
    closeMenu();
  };

  const handleTriggerKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;
    switch (event.key) {
      case "Enter":
      case " ":
      case "ArrowDown":
        event.preventDefault();
        openMenu(findEnabledIndex(items, 0, 1));
        break;
      case "ArrowUp":
        event.preventDefault();
        openMenu(findEnabledIndex(items, items.length - 1, -1));
        break;
      case "Escape":
        if (isOpen) {
          event.preventDefault();
          closeMenu();
        }
        break;
      default:
        break;
    }
  };

  // Some browsers activate buttons on Space keyup; the keydown already
  // opened the menu, so stop the synthetic click from toggling it closed.
  const handleTriggerKeyUp = (event: React.KeyboardEvent) => {
    if (event.key === " ") event.preventDefault();
  };

  const handleMenuKeyDown = (event: React.KeyboardEvent) => {
    const current = activeIndex;
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setActiveIndex(findEnabledIndex(items, current + 1, 1));
        break;
      case "ArrowUp":
        event.preventDefault();
        setActiveIndex(
          findEnabledIndex(
            items,
            current < 0 ? items.length - 1 : current - 1,
            -1,
          ),
        );
        break;
      case "Home":
        event.preventDefault();
        setActiveIndex(findEnabledIndex(items, 0, 1));
        break;
      case "End":
        event.preventDefault();
        setActiveIndex(findEnabledIndex(items, items.length - 1, -1));
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        if (current >= 0 && items[current]) {
          handleSelect(items[current]);
          if (!items[current].disabled) focusTrigger();
        }
        break;
      case "Escape":
        event.preventDefault();
        event.stopPropagation();
        closeMenu();
        focusTrigger();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeMenu();
      }
    };

    const handleFocusOut = (event: FocusEvent) => {
      const relatedTarget = event.relatedTarget as Node;
      if (
        dropdownRef.current &&
        menuRef.current &&
        !dropdownRef.current.contains(relatedTarget) &&
        !menuRef.current.contains(relatedTarget)
      ) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("focusout", handleFocusOut);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("focusout", handleFocusOut);
    };
  }, [isOpen, closeMenu]);

  const triggerA11yProps: TriggerA11yProps = {
    "aria-haspopup": "menu",
    "aria-expanded": isOpen,
    "aria-controls": isOpen ? menuId : undefined,
  };

  // Toggle / keyboard handlers live on the interactive element itself (the
  // child, the default button, or the wrapper acting as a button for plain
  // text), which also receives the menu button semantics.
  const triggerHandlers = {
    onClick: handleToggle,
    onKeyDown: handleTriggerKeyDown,
    onKeyUp: handleTriggerKeyUp,
  };
  type TriggerChildProps = Partial<TriggerA11yProps> & {
    onClick?: (event: React.MouseEvent) => void;
    onKeyDown?: (event: React.KeyboardEvent) => void;
    onKeyUp?: (event: React.KeyboardEvent) => void;
  };

  let triggerWrapper: React.ReactNode;
  if (children === undefined || children === null) {
    triggerWrapper = (
      <div ref={setTriggerRef} className={styles.trigger}>
        <Button
          size="small"
          disabled={disabled}
          {...triggerA11yProps}
          {...triggerHandlers}
        >
          Dropdown
        </Button>
      </div>
    );
  } else if (isValidElement<TriggerChildProps>(children)) {
    const childProps = children.props;
    const isNonInteractiveTag =
      typeof children.type === "string" && !INTERACTIVE_TAGS.has(children.type);
    triggerWrapper = (
      <div ref={setTriggerRef} className={styles.trigger}>
        {cloneElement(children, {
          ...triggerA11yProps,
          ...(isNonInteractiveTag
            ? {
                role: childProps.role ?? "button",
                tabIndex: disabled ? -1 : (childProps.tabIndex ?? 0),
                "aria-disabled": disabled || undefined,
              }
            : {}),
          onClick: (event: React.MouseEvent) => {
            childProps.onClick?.(event);
            handleToggle();
          },
          onKeyDown: (event: React.KeyboardEvent) => {
            childProps.onKeyDown?.(event);
            handleTriggerKeyDown(event);
          },
          onKeyUp: (event: React.KeyboardEvent) => {
            childProps.onKeyUp?.(event);
            handleTriggerKeyUp(event);
          },
        })}
      </div>
    );
  } else {
    triggerWrapper = (
      <div
        ref={setTriggerRef}
        className={styles.trigger}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled || undefined}
        {...triggerA11yProps}
        {...triggerHandlers}
      >
        {children}
      </div>
    );
  }

  const firstEnabledIndex = findEnabledIndex(items, 0, 1);

  return (
    <div
      className={classNames(styles.dropdown, className)}
      ref={setDropdownRef}
    >
      {triggerWrapper}
      {isOpen && (
        <div
          ref={setMenuRef}
          className={classNames(styles.menu, styles[direction])}
          data-placement={placement}
          style={{
            ...floatingStyles,
            backgroundColor: menuBgColor,
            boxShadow: menuBoxShadow,
          }}
        >
          <ul
            id={menuId}
            className={styles.menuList}
            role="menu"
            aria-label={ariaLabel}
          >
            {items.map((item, index) => {
              const isTabStop =
                index === activeIndex ||
                (activeIndex < 0 && index === firstEnabledIndex);
              return (
                <li
                  key={`${item.value}-${index}`}
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  id={`${menuId}-item-${index}`}
                  className={`${styles.menuItem} ${item.disabled ? styles.disabled : ""}`}
                  onClick={() => handleSelect(item)}
                  onKeyDown={handleMenuKeyDown}
                  onFocus={() => {
                    if (!item.disabled) setActiveIndex(index);
                  }}
                  style={{
                    color: item.disabled
                      ? "var(--text-disabled-color)"
                      : menuTextColor,
                  }}
                  role="menuitem"
                  aria-disabled={item.disabled || undefined}
                  tabIndex={!item.disabled && isTabStop ? 0 : -1}
                >
                  {item.label}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default React.memo(Dropdown);

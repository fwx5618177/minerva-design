import React, {
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import styles from "./dropdown.module.scss";
import { DropdownProps, DropdownOption } from "./types";
import { Button } from "..";

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
const Dropdown: React.FC<DropdownProps> = ({
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
}) => {
  const [isOpen, setIsOpen] = useState(false);
  // Index of the item that owns focus (roving focus); -1 = none yet.
  const [activeIndex, setActiveIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);
  const baseId = useId().replace(/:/g, "");
  const menuId = `dropdown-menu-${baseId}`;

  const openMenu = useCallback((focusIndex: number) => {
    setIsOpen(true);
    setActiveIndex(focusIndex);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    setActiveIndex(-1);
  }, []);

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
  }, [closeMenu]);

  const triggerA11yProps: TriggerA11yProps = {
    "aria-haspopup": "menu",
    "aria-expanded": isOpen,
    "aria-controls": isOpen ? menuId : undefined,
  };

  // The trigger child stays the interactive element; it receives the menu
  // button semantics. Plain text children fall back to the wrapper.
  let trigger: React.ReactNode;
  let wrapperA11yProps: Partial<TriggerA11yProps> = {};
  if (children === undefined || children === null) {
    trigger = (
      <Button size="small" disabled={disabled} {...triggerA11yProps}>
        Dropdown
      </Button>
    );
  } else if (isValidElement<Partial<TriggerA11yProps>>(children)) {
    const isNonInteractiveTag =
      typeof children.type === "string" && !INTERACTIVE_TAGS.has(children.type);
    trigger = cloneElement(children, {
      ...triggerA11yProps,
      ...(isNonInteractiveTag
        ? {
            role: children.props.role ?? "button",
            tabIndex: disabled ? -1 : (children.props.tabIndex ?? 0),
            "aria-disabled": disabled || undefined,
          }
        : {}),
    });
  } else {
    trigger = children;
    wrapperA11yProps = {
      ...triggerA11yProps,
      role: "button",
      tabIndex: disabled ? -1 : 0,
      "aria-disabled": disabled || undefined,
    };
  }

  const firstEnabledIndex = findEnabledIndex(items, 0, 1);

  return (
    <div className={`${styles.dropdown} ${className}`} ref={dropdownRef}>
      <div
        ref={triggerRef}
        className={styles.trigger}
        onClick={handleToggle}
        onKeyDown={handleTriggerKeyDown}
        onKeyUp={handleTriggerKeyUp}
        {...wrapperA11yProps}
      >
        {trigger}
      </div>
      {isOpen && (
        <div
          ref={menuRef}
          className={`${styles.menu} ${styles[direction]}`}
          style={{
            backgroundColor: menuBgColor,
            boxShadow: menuBoxShadow,
          }}
        >
          <ul
            id={menuId}
            className={styles.menuList}
            role="menu"
            aria-label={ariaLabel}
            onKeyDown={handleMenuKeyDown}
          >
            {items.map((item, index) => {
              const isTabStop =
                index === activeIndex ||
                (activeIndex < 0 && index === firstEnabledIndex);
              return (
                <li
                  key={index}
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  id={`${menuId}-item-${index}`}
                  className={`${styles.menuItem} ${item.disabled ? styles.disabled : ""}`}
                  onClick={() => handleSelect(item)}
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

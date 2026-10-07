import * as DropdownPrimitive from "@radix-ui/react-dropdown-menu";
import MenuItems, { contentClassName } from "./MenuItems";
import type { MenuProps } from "./types";
import { usePortalContainer } from "../../internal/themeScope";

/**
 * Menu: an action menu opened from a trigger button (Radix DropdownMenu).
 * Supports icons, shortcuts, separators, groups, submenus, typeahead and full
 * keyboard navigation. For a select-like list of options see Dropdown.
 */
const Menu = ({
  children,
  items,
  onSelect,
  size = "medium",
  align = "end",
  side = "bottom",
  open,
  defaultOpen,
  onOpenChange,
  disabled = false,
  modal = true,
  className,
  ariaLabel,
}: MenuProps) => {
  const portalContainer = usePortalContainer();
  return (
    <DropdownPrimitive.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      modal={modal}
    >
      <DropdownPrimitive.Trigger asChild disabled={disabled}>
        {children}
      </DropdownPrimitive.Trigger>
      <DropdownPrimitive.Portal container={portalContainer}>
        <DropdownPrimitive.Content
          className={contentClassName(size, className)}
          aria-label={ariaLabel}
          // An explicit label replaces the default "labelled by the trigger"
          {...(ariaLabel ? { "aria-labelledby": undefined } : {})}
          align={align}
          side={side}
          sideOffset={6}
          collisionPadding={8}
        >
          <MenuItems items={items} onSelect={onSelect} size={size} />
        </DropdownPrimitive.Content>
      </DropdownPrimitive.Portal>
    </DropdownPrimitive.Root>
  );
};

export default Menu;

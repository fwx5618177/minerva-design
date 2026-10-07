import * as ContextPrimitive from "@radix-ui/react-context-menu";
import MenuItems, { contentClassName } from "./MenuItems";
import type { ContextMenuProps } from "./types";

/**
 * ContextMenu: the Menu entries opened at the pointer on right click
 * (long press on touch, Shift+F10 / ContextMenu key from the keyboard).
 */
const ContextMenu = ({
  children,
  items,
  onSelect,
  size = "medium",
  onOpenChange,
  disabled = false,
  modal = true,
  className,
  ariaLabel,
}: ContextMenuProps) => (
  <ContextPrimitive.Root onOpenChange={onOpenChange} modal={modal}>
    <ContextPrimitive.Trigger asChild disabled={disabled}>
      {children}
    </ContextPrimitive.Trigger>
    <ContextPrimitive.Portal>
      <ContextPrimitive.Content
        className={contentClassName(size, className)}
        aria-label={ariaLabel}
        collisionPadding={8}
      >
        <MenuItems items={items} onSelect={onSelect} context size={size} />
      </ContextPrimitive.Content>
    </ContextPrimitive.Portal>
  </ContextPrimitive.Root>
);

export default ContextMenu;

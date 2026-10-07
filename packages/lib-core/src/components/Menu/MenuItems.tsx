import * as DropdownPrimitive from "@radix-ui/react-dropdown-menu";
import * as ContextPrimitive from "@radix-ui/react-context-menu";
import classNames from "classnames";
import { LuChevronRight } from "react-icons/lu";
import type { MenuAction, MenuEntry, MenuSize } from "./types";
import styles from "./menu.module.scss";

/** Classes of a menu panel (root menu or submenu). */
export const contentClassName = (size: MenuSize, className?: string) =>
  classNames(
    "ui-menu-content",
    `ui-menu-size-${size === "small" ? "sm" : "md"}`,
    styles.content,
    size === "small" && styles.small,
    className,
  );

interface MenuItemsProps {
  items: MenuEntry[];
  onSelect?: (item: MenuAction) => void;
  /** Use the context-menu primitives instead of the dropdown ones */
  context?: boolean;
  size: MenuSize;
}

/** Renders entries (items, separators, groups, submenus) recursively. */
const MenuItems = ({
  items,
  onSelect,
  context = false,
  size,
}: MenuItemsProps) => {
  const P = context ? ContextPrimitive : DropdownPrimitive;
  return (
    <>
      {items.map((item) => {
        if ("type" in item) {
          if (item.type === "separator") {
            return (
              <P.Separator
                key={item.key}
                className={classNames("ui-menu-separator", styles.separator)}
              />
            );
          }
          return (
            <P.Group key={item.key}>
              <P.Label className={classNames("ui-menu-label", styles.label)}>
                {item.label}
              </P.Label>
              <MenuItems
                items={item.items}
                onSelect={onSelect}
                context={context}
                size={size}
              />
            </P.Group>
          );
        }
        const content = (
          <>
            {item.icon && (
              <span
                className={classNames("ui-menu-icon", styles.icon)}
                aria-hidden="true"
              >
                {item.icon}
              </span>
            )}
            <span className={classNames("ui-menu-text", styles.text)}>
              {item.label}
            </span>
            {item.shortcut && (
              <span className={classNames("ui-menu-shortcut", styles.shortcut)}>
                {item.shortcut}
              </span>
            )}
          </>
        );
        const itemClassName = classNames("ui-menu-item", styles.item);
        if (item.children?.length) {
          return (
            <P.Sub key={item.key}>
              <P.SubTrigger
                className={itemClassName}
                disabled={item.disabled}
                textValue={item.textValue}
              >
                {content}
                <LuChevronRight
                  className={classNames("ui-menu-chevron", styles.chevron)}
                  size={16}
                  aria-hidden="true"
                />
              </P.SubTrigger>
              <P.Portal>
                <P.SubContent
                  className={contentClassName(size)}
                  collisionPadding={8}
                  sideOffset={4}
                >
                  <MenuItems
                    items={item.children}
                    onSelect={onSelect}
                    context={context}
                    size={size}
                  />
                </P.SubContent>
              </P.Portal>
            </P.Sub>
          );
        }
        return (
          <P.Item
            key={item.key}
            className={itemClassName}
            disabled={item.disabled}
            textValue={item.textValue}
            onSelect={() => onSelect?.(item)}
          >
            {content}
          </P.Item>
        );
      })}
    </>
  );
};

export default MenuItems;

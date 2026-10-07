---
"@minerva/lib-core": major
---

Every interaction is now developed in house on `@minerva/core`; no Radix UI package is used anymore.

**Dependencies**

- Removed: `@radix-ui/react-context-menu`, `@radix-ui/react-dialog`, `@radix-ui/react-dropdown-menu`, `@radix-ui/react-popover`, `@radix-ui/react-select`, `@radix-ui/react-slot`, `@radix-ui/react-tabs` (the unused checkbox / radio-group / switch / tooltip packages are listed in the dedupe changeset) and `@floating-ui/react-dom`.
- Added: `@minerva/core` (installed automatically). `style.css` still contains every design token (bundled from `@minerva/core/tokens.css`). The theme helpers, theme types, themes, palettes and i18n resources now live in `@minerva/core`; `@minerva/lib-core` and `@minerva/lib-core/theme-utils` re-export them under the same names.

**Shared overlay implementation**

- Modal, Drawer, the AppShell mobile drawer, Popover, Tooltip, Menu, ContextMenu, Select, AutoComplete, Cascader and TimePicker share one layer stack (Escape closes the innermost overlay first; clicks inside child layers never close their parents), one focus implementation (trap where modal, focus returns to the opener — also when opened from state) and one positioning engine. All of them render into the portal container of the closest theme scope, so nested `ConfigProvider` themes apply to their popups.

**Removed / changed APIs**

- `Popper` is removed (with `PopperProps` and its types): use `Popover`. `PopoverContent` gains `matchAnchorWidth`; `collisionPadding` now really sets the distance kept to the viewport edges.
- The `useDialogFocusReturn` hook is removed: dialogs restore focus to the opener on their own.
- `ModalContent` / `DrawerContent` / `PopoverContent` props no longer extend Radix types; they accept their own explicit props (`onOpenAutoFocus`, `onCloseAutoFocus`, `onEscapeKeyDown`, `onPointerDownOutside`, `onInteractOutside`, `forceMount`, plus `onFocusOutside` on `PopoverContent`, and the `<div>` attributes).
- `AutoComplete`: the `multiple` mode (`multiple`, `maxTagCount`, `selectedOptions`) is removed — use `TagInput` for multiple values; `popperProps` is replaced by `dropdownClassName`.
- `Select` uses popper positioning (the list opens below the trigger, at least as wide, flipping when needed) instead of item-aligned positioning; the scroll buttons are gone. A hidden native `<select>` carries `name` / `required`, so `FormData`, native validation and form reset work.

**New behaviour**

- `Slot` / `asChild` are in house (props merged, event handlers composed child first, refs merged, `className` / `style` merged).
- `Tabs`: in-house roving focus with automatic / manual activation, orientation, RTL, `loop`, `forceMount` and full ARIA wiring.
- `Menu` / `ContextMenu`: submenus with a pointer safe triangle, typeahead, checkbox and radio items, `closeOnSelect` (checkbox / radio items keep the menu open), `loop` (default `true`), `dir` (RTL), ArrowUp on the trigger opens on the last item, focus returns to the trigger, the context menu opens at the pointer (and with Shift+F10 / the ContextMenu key or a long press).
- `Tooltip` stays open while the pointer moves onto it (WCAG 1.4.13) and its Escape only closes the topmost overlay.

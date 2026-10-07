---
"@minerva/lib-core": major
"@minerva/lib-web-components": minor
---

React 19 and a component bug-fix sweep.

**Breaking (lib-core)**

- Requires React 19: peer dependencies are now `react` / `react-dom` `^19.0.0`. Stay on 1.x for React 18.
- `ref` is a regular prop on every component (no `forwardRef`). Refs reach the root element, or the `<input>` / `<button>` for form controls.
- The built entry starts with `"use client"`, so it can be imported from React Server Components.
- Behaviour changes that fix bugs:
  - Cascader with `loadData` expands lazy options (and calls `loadData`) instead of selecting them; it no longer opens on focus alone; at `maxLevel` the last-level option is selected; the input has `role="combobox"`.
  - TimePicker `value` is fully controlled (`Date | null`); the clear button is labelled.
  - Popper / Tooltip `offset` is now the gap from the anchor (8px by default) on the main axis; Popper `type="tooltip"` has `role="tooltip"`.
  - AutoComplete `onDropdownVisibleChange` no longer fires on mount.
  - Message: error / warning use `role="alert"`, others `role="status"`. Alert does the same.
  - Pagination items are native buttons; a passed `pageSize` is controlled.
  - Tag / Chip that are both clickable and closable render two sibling buttons instead of nested interactive elements.

**Features (lib-core)**

- Popper, Tooltip, Dropdown, AutoComplete, Cascader and TimePicker are positioned with `@floating-ui/react-dom`: they flip and shift to stay in the viewport and follow the anchor on scroll / resize. Popper gains `flip`, `shift`, `matchAnchorWidth`, `closeOnEscape`, `role`, `id`.
- Controlled / uncontrolled pairs: Tooltip `onOpenChange`, Dropdown `open` / `defaultOpen` / `onOpenChange`, AutoComplete `selectedOptions` / `defaultSelectedOptions` / `onSelectedOptionsChange`, InteractiveIconButton `pressed` / `defaultPressed`, Alert `expanded`, Pagination `defaultCurrent` / `defaultPageSize`, TextField `defaultValue`, TimePicker `onOpenChange`.
- Accessibility: InteractiveIconButton exposes `aria-pressed` and accepts `aria-label`; labels for icon-only controls; keyboard support for Cascader columns and TimePicker columns; Escape + focus return for overlays.
- Every built-in text is localized (en / zh / fr), with props to override it (e.g. Pagination `labels`, Alert `closeLabel`).
- `message.config({ maxCount, duration, placement })`.

**Fixes (lib-core)**

- Switch: label shown for `labelPlacement="top"` / `"bottom"`.
- Badge: a standalone badge renders inline instead of overlaying its neighbours.
- AutoComplete: dropdown aligned with the input (was centered ~70px off) and at least as wide; multiple mode keeps the dropdown open between picks; Enter does not submit the form.
- Cascader: dropdown grows with its columns instead of squeezing them.
- Callbacks are never invoked inside state updaters, so they fire once under StrictMode (Alert `onExpand`, InteractiveIconButton `onChange`, ...).
- Many more controlled-state, focus, keyboard, SSR-safety and cleanup fixes (see the PR).

**lib-web-components**

- `<minerva-button>` consumes lib-core's design tokens (`--primary-color`, `--danger-color`, `--text-inverse-color`, ...) with fallbacks, so theme changes apply to it; it has a visible focus ring.
- With React 19, boolean props such as `loading={false}` work as expected; the optional JSX typings target React 19 (`@types/react >= 19`).

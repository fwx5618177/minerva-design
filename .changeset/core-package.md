---
"@minerva/core": major
---

First release of `@minerva/core` (1.0.0): framework-agnostic TypeScript (DOM only, no React / Lit) shared by `@minerva/lib-core` and, later, `@minerva/lib-web-components`.

**Interaction primitives**

- `createFocusScope`: focus on activation, Tab trapping with loop, focus restore on deactivation, a scope stack (a new trapped scope pauses the previous one).
- `createDismissableLayer` / `getLayerStack`: a global layer stack. Escape is handled by the topmost layer only; pointer down / focus outside dismiss with `branches`, `excludeFromOutside` and an explicit `parent`, so clicks in child layers (submenus, a Select in a Modal) never dismiss their parents. `disableOutsidePointerEvents` for modal layers. Handlers can cancel with `preventDefault()` or by returning `false`.
- `lockScroll` / `isScrollLocked` / `getScrollbarGap`: reference-counted scroll lock with scrollbar-gap compensation (`--minerva-scrollbar-gap`).
- `hideOthers`: hides everything but the given elements from assistive technology (`aria-hidden` or `inert`), nested-safe; `[aria-live]` and `[data-minerva-keep-visible]` stay visible.
- `getNextIndex`, `createTypeahead`, `createRovingFocus`: list navigation (arrows, Home / End, PageUp / PageDown, loop, orientation, RTL) and typeahead.
- `createPointerGrace` / `getGraceArea` / `isPointInPolygon`: the submenu safe triangle.
- `computeAnchoredPosition`, `autoPosition`, `applyPosition`, placement helpers: positioning over `@floating-ui/dom` (offset, flip, shift with `limitShift`, size, arrow, collision `padding`) — the only third-party runtime dependency.
- `getPortalContainer` / `createPortalHost`, `waitForExitAnimation`, `createId`, `createControllableState`, DOM helpers (`getTabbables`, `getFocusables`, `focusElement`, `contains`, `getActiveElement`, ...).

**Theming and i18n**

- Theme utilities (`THEME_INIT_SCRIPT`, cookie parsing / serialization, `PALETTES`), theme types, built-in themes and palettes, and the design tokens published as `@minerva/core/tokens.css`.
- The translation messages of every supported language and `mergeMessages`.

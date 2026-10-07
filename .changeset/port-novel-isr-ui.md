---
"@minerva/lib-core": minor
---

Port everything from `@novel-isr/ui` into Minerva: Minerva is now the single component library.

**Theming platform**

- Palette dimension next to the light / dark / system mode: `editorial`, `tech`, `graphite`, `cool` (ported token values, Minerva token names). `ConfigProvider` gains `palette`, `persist` (cookie persistence), `onThemeChange` / `onPaletteChange`, the `"system"` alias, and `mode` / `resolvedMode` / `palette` / `setTheme` / `setPalette` in its context. It also sets `data-theme` / `data-palette` and `color-scheme` on `<html>`.
- `ThemeProvider` / `useTheme` (a preset over `ConfigProvider`, one source of truth), `ThemeToggle`, `PaletteToggle`, the `palettes` map.
- New server-safe entry `@minerva/lib-core/theme-utils` (no `"use client"`): `THEME_INIT_SCRIPT`, `createThemeInitScript`, `parseThemeCookie(s)`, `parsePaletteCookie`, `readCookieValue`, `serializeThemeCookie`, cookie names, `PALETTES`.
- New tokens: spacing / typography / layering / motion scales (`--space-*`, `--font-size-*`, `--z-*`, `--transition-*`, ...) and semantic tokens (`--surface-subtle-color`, `--canvas-color`, `--control-color`, `--hover-color`, `--selected-color`, `--text-muted-color`, `--accent-color` + role tokens).
- `useDisclosure`, `useDialogFocusReturn`, `cn`.

**Entries**

- `@minerva/lib-core/monaco`: `MonacoCodeEditor` (optional peers `@monaco-editor/react` and `monaco-editor`).
- `@minerva/lib-core/compat` (+ `/compat/theme-utils`, `compat.css`): `@novel-isr/ui`'s exact export names and prop shapes on top of Minerva, so `@novel-isr/ui` can become `export * from "@minerva/lib-core/compat"`.
- `@minerva/lib-core/prose.scss`: Sass adapter for long-form typography.

**Components**

New and merged components are listed in `docs/migration/novel-isr-ui.md` and on the docs site ("Migration from @novel-isr/ui").

**Accessibility**

- `eslint-plugin-jsx-a11y` (recommended) now lints the library. Fixes: Cascader expanded options use `aria-controls` instead of `aria-expanded`; TimePicker options are keyboard-selectable; VirtualList's scroll container is a labelled region; `StatusIndicator` is no longer focusable (it is a `role="status"` live region; its disabled state is exposed as `data-disabled` instead of `aria-disabled`).

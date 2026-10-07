---
"@minerva/lib-core": minor
---

Theming platform, new entries and a large set of new components.

**Theming platform**

- Palette dimension next to the light / dark / system mode: `editorial`, `tech`, `graphite`, `cool`. `ConfigProvider` gains `palette`, `persist` (cookie persistence), `onThemeChange` / `onPaletteChange`, the `"system"` alias, and `mode` / `resolvedMode` / `palette` / `setTheme` / `setPalette` in its context. It also sets `data-theme` / `data-palette` and `color-scheme` on `<html>`.
- `ThemeProvider` / `useTheme` (a preset over `ConfigProvider`, one source of truth), `ThemeToggle`, `PaletteToggle`, the `palettes` map.
- New server-safe entry `@minerva/lib-core/theme-utils` (no `"use client"`): `THEME_INIT_SCRIPT`, `createThemeInitScript`, `parseThemeCookie(s)`, `parsePaletteCookie`, `readCookieValue`, `serializeThemeCookie`, cookie names, `PALETTES`.
- New tokens: spacing / typography / layering / motion scales (`--space-*`, `--font-size-*`, `--z-*`, `--transition-*`, ...) and semantic tokens (`--surface-subtle-color`, `--canvas-color`, `--control-color`, `--hover-color`, `--selected-color`, `--text-muted-color`, `--accent-color` + role tokens).
- `useDisclosure`, `useDialogFocusReturn`, `cn`.

**Entries**

- `@minerva/lib-core/monaco`: `MonacoCodeEditor` (optional peers `@monaco-editor/react` and `monaco-editor`).
- `@minerva/lib-core/prose.scss`: Sass adapter for long-form typography.

**New components**

- Layout: `Box`, `Stack` / `HStack` / `VStack`, `ResponsiveGrid` / `GridItem`, `SplitLayout`, `AppShell`, `Page` / `PageHeader` / `PageSection` / `Toolbar` / `StatCard`.
- Forms: `FormControl` (+ label / helper / error parts and `useFormControlProps`), `FormLayout`, `Input`, `Textarea`, `NumberInput`, `Select` (+ items, groups, labels, separators), `TagInput`, `JsonField`, `KeyValueEditor`, `Rating`, `Upload`.
- Overlays: `Modal`, `Drawer`, `Popover`, `ConfirmDialog` / `confirm()` / `useConfirm`, `Menu` / `ContextMenu`, `CommandDialog`.
- Data display and navigation: `Table` / `DataTable`, `List`, `DescriptionList`, `Tabs`, `PageTabs`, `NavTree`, `Steps`, `MonthCalendar`, `CodeBlock`, `HtmlPreview`, `Prose`, `TextLink`.
- Feedback: `Toast` (`ToastProvider`, `toast`, `useToast`), `Spinner`, `LoadingState`.

**Component enhancements**

- Button: `appearance` (token-based look), `startIcon` / `endIcon`, `loadingText`, `fullWidth`; labels wrap inside layouts that set `--button-label-white-space: normal`.
- Card: `padding`, `interactive`, `as`, `htmlType` and the `subtle` / `ghost` variants. Badge: `appearance`, `dot`. Avatar: fallbacks, `shape="rounded"`, numeric sizes. Tag: `closeLabel`.
- Checkbox, Radio, Switch, AutoComplete, Pagination, Divider, Skeleton, Empty, Alert and Tooltip gain new options (indeterminate and error states, segmented switch, grouped / highlighted AutoComplete options, compact Pagination with translatable labels, `TooltipProvider` delays, ...).
- Every built-in string is translatable through the locale or a `*Label` prop.

**Accessibility**

- `eslint-plugin-jsx-a11y` (recommended) now lints the library. Fixes: Cascader expanded options use `aria-controls` instead of `aria-expanded`; TimePicker options are keyboard-selectable; VirtualList's scroll container is a labelled region; `StatusIndicator` is no longer focusable (it is a `role="status"` live region; its disabled state is exposed as `data-disabled` instead of `aria-disabled`).

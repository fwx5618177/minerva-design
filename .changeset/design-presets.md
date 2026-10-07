---
"@minerva/core": minor
"@minerva/lib-core": minor
---

Global design switch: design presets and design axes.

- `ConfigProvider` accepts `preset` (`"minerva"`, `"editorial"` — restrained, reading-oriented, with the editorial palette as its default palette — and `"compact"`), plus the individual axes `density` (`compact` / `standard` / `comfortable`), `radius` (`none` / `small` / `medium` / `large`), `shadow` (`none` / `subtle` / `standard`) and `fontScale` (`small` / `standard` / `large`). Explicit axes and `palette` win over the preset. `useConfig().design` returns the resolved axes.
- The root provider writes `data-density` / `data-radius` / `data-shadow` / `data-font-scale` on `<html>` (standard values omitted) and restores them on unmount; nested providers inherit the parent's design and scope overrides to their subtree and portal host (every axis is written there, so a scope can switch back to "standard").
- New design tokens: `--control-height-{xs..xl}`, `--control-padding-x-{xs..xl}`, `--row-padding-y`, `--row-padding-x`; the axes switch them together with the radius, shadow and font-size scales. Every component reads them.
- SSR: `designAttributes()` (server-safe, from `@minerva/lib-core/theme-utils` / `@minerva/core`) for the `<html>` of a root layout, and `createThemeInitScript({ design })`, which also uses the preset's palette as default palette. `resolveDesign`, `designPresets`, `DESIGN_PRESETS`, ... are exported from the same entries.
- `tokens.css` reduces the `--transition-*` tokens to `0s` under `prefers-reduced-motion: reduce` and uses `Highlight` for the focus ring under `forced-colors: active`.

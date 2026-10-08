---
"@minerva/core": minor
"@minerva/lib-core": minor
"@minerva/lib-web-components": minor
---

First public release.

- **`@minerva/core`**: framework-agnostic, side-effect-free and SSR-safe TypeScript shared by both component libraries. Interaction primitives (focus scope, dismissable layer stack, reference-counted scroll lock, hide-others, roving focus and typeahead, pointer grace area, presence, portal host, anchored positioning over `@floating-ui/dom`), the theme system (light / dark / system modes, the `editorial`, `tech`, `graphite` and `cool` palettes, design presets and axes, `THEME_INIT_SCRIPT` and cookie helpers, design tokens as `@minerva/core/tokens.css`), the built-in translator and messages (en, zh, ja, fr), link URL sanitization (`sanitizeUrl`, `linkRel`) and the pure helpers both libraries share. ESM and CJS.
- **`@minerva/lib-core`**: the React 19 component library (layout, forms, overlays, data display, navigation, editors, theming) built on `@minerva/core`. Published module by module with `"use client"` on client modules, server-safe `theme-utils` (incl. `THEME_INIT_SCRIPT_HASH` for strict CSP) and `utils` entries (the non-component functions and data, for React Server Components), an optional `monaco` entry, the all-in-one `style.css` and per-component `styles/*.css`. Keyboard support and ARIA per WAI-ARIA patterns, RTL, StrictMode-, SSR- and hydration-safe. ESM and CJS.
- **`@minerva/lib-web-components`**: the same component set as standard custom elements built with Lit, for plain HTML, Vue, Angular, Svelte, Solid and React: the lib-core look and API vocabulary, form-associated controls (`ElementInternals`), `minerva-*` events, `<minerva-config>` for theme and locale, per-element entries, a self-contained `cdn` bundle, the Custom Elements Manifest, VS Code custom data and framework typings. ESM only.

All three packages are versioned together (`fixed` in `.changeset/config.json`).

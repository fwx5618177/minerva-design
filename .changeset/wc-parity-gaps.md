---
"@minerva/core": minor
"@minerva/lib-core": patch
"@minerva/lib-web-components": minor
---

**Closes the remaining gaps between `@minerva/lib-web-components` and `@minerva/lib-core`.**

`@minerva/lib-web-components`

- **`<minerva-code-editor>`** (Monaco), published as the optional entry `@minerva/lib-web-components/code-editor` (not part of the all-in-one entry nor of the CDN bundle) with `monaco-editor` as an optional peer dependency, like lib-core's `MonacoCodeEditor`: the local engine is injected (`editor.monaco = monaco`, never loaded from a CDN), the Monaco theme follows the element's theme scope live, loading state, textarea fallback with Retry after `load-timeout` or an engine error (`minerva-error`), form-associated value (`name`, `required`, `form.reset()`, `<fieldset disabled>`).
- **Scoped confirmations** (lib-core's `useConfirm` / `ConfirmProvider`): `confirm({ host })` and `confirmFor(host)` render the dialog inside the caller's `<minerva-config>` scope (theme, palette, language); the new `<minerva-confirm-provider>` queues the confirmations of its subtree and cancels them when removed. `confirmScopeOf()` is exported.
- **Overlay animations**: closing menus (and submenus) stay rendered with `data-state="closed"` until their exit animation ends, then are removed, like lib-core's presence; with `prefers-reduced-motion: reduce` they are removed immediately.
- **Toast region**: hidden from assistive technologies by an open modal's hide-others and exposed again on close, the same treatment as lib-core's toast viewport.
- **Development warnings** now use lib-core's channel and format: `console.error("[minerva] <minerva-tag>: ...")` (core's `formatDevMessage`), still only when `process.env.NODE_ENV !== "production"`.
- **`<minerva-stack>` separators** also work where `HTMLSlotElement.assign()` is missing (named-slot fallback).
- **`<minerva-tab-panel>`**: a `<template>` child is mounted only while the panel is active (React's default unmounting); `force-mount` keeps it mounted while hidden, like `forceMount`. Regular children stay mounted and hidden.
- **Smaller bundles**: each stylesheet is one shared constructable stylesheet adopted by every element that uses it, the inline `css` / `html` templates are minified at build time and the CDN bundle is fully minified (CDN bundle 784 → 643 kB, 191 → 170 kB gzip).
- `customElements` in `package.json` now points at the published `custom-elements.json`; `publishConfig.registry` is pinned to npmjs.org.

`@minerva/core`

- New `formatDevMessage()` / `DEV_MESSAGE_PREFIX`, the shared format of the development messages of both libraries.
- Fully tree-shakable: the module-level i18n bundles, theme key list, placement map and theme init script are pure, so importing one helper no longer pulls the i18n messages and theme tables into the consumer's bundle.

`@minerva/lib-core`

- Development warnings are built with core's `formatDevMessage()` (same output).
- Menus animate in and out (`data-state="closed"` exit animation), disabled under `prefers-reduced-motion: reduce`.
- The package now ships a README.

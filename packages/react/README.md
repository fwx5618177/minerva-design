# @minerva/react (private)

Sources of the Minerva React 19 components (layout, forms, overlays, data
display, navigation, editors, theming), their SCSS stylesheets (shared with
the web components) and their unit tests.

This workspace package is **private**: it is published as the React entries
of [`minerva-design`](../minerva-design/README.md) (`minerva-design`,
`minerva-design/utils`, `minerva-design/theme-utils`, `minerva-design/monaco`,
`minerva-design/style.css`, `minerva-design/styles/*.css`,
`minerva-design/prose.scss`).

`pnpm --filter @minerva/react build` writes
`packages/minerva-design/dist/react/`: one ESM + CJS module per source
module, `"use client"` on every module but the server-safe `theme-utils` and
`utils` entries, `.d.ts` / `.d.cts` declarations and the stylesheets (inside
`@layer minerva`). `@minerva/core` imports become relative imports of the
shared `dist/core/` (`tools/core-imports.mjs`).

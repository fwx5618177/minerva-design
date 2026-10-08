# @minerva/web-components (private)

Sources of the Minerva Web Components: Lit custom elements that render the
DOM and compile the stylesheets of `@minerva/react` into their shadow root,
with the interaction primitives of `@minerva/core` behind Lit controllers.
Also the generators of the Custom Elements Manifest
(`scripts/generate-manifest.mjs`, written to
`packages/minerva-design/custom-elements.json`), of the framework typings and
VS Code data (`scripts/generate-typings.mjs`) and of the icons
(`scripts/generate-icons.mjs`).

This workspace package is **private**: it is published as
`minerva-design/web-components` (and `minerva-design/web-components/<name>`,
`/cdn`, `/react`, `/vue`, `/svelte`, `/solid`) of
[`minerva-design`](../minerva-design/README.md).

`pnpm --filter @minerva/web-components build` writes
`packages/minerva-design/dist/web-components/`: one ESM module per source
module, a define entry per element (`elements/*.js`), the self-contained CDN
bundle (`cdn/minerva.js`), `types/*.d.ts` and `html-custom-data.json`.
`@minerva/core` imports become relative imports of the shared `dist/core/`
(`tools/core-imports.mjs`). After adding an element, run
`pnpm --filter @minerva/web-components manifest` and
`pnpm --filter minerva-design sync:package` (exports map).

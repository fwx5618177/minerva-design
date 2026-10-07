---
"@minerva/core": minor
"@minerva/lib-core": minor
"@minerva/lib-web-components": minor
---

Packaging for production apps.

- `@minerva/lib-core` is published module by module (preserved modules for ESM and CJS) and is side-effect free except for its CSS: importing one component no longer pulls the others (`import { Button }` bundles to ~2.7 KB minified instead of ~76 KB). Every client module carries `"use client"` (deep imports produced by barrel optimisation stay client modules); `theme-utils` stays server-safe.
- Per-component stylesheets: `@minerva/lib-core/styles/<component>.css` (kebab-case component folder, e.g. `styles/tag-input.css`; each includes the styles of the components it renders) plus `@minerva/lib-core/styles/tokens.css`. The all-in-one `style.css` is unchanged.
- Correct types for every condition of the exports maps: `.d.ts` (with explicit `.js` specifiers) for `import`, `.d.cts` for `require`, `typesVersions` for node10 resolution of the sub-entries. `publint` and `@arethetypeswrong/cli` report no problems (`pnpm check:package`).
- `engines.node` is declared (`^20.19.0 || >=22.12.0`).

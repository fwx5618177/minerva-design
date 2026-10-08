# @minerva/core (private)

The **platform-neutral** core of Minerva, shared by every renderer (React DOM
and Web Components today; Vue, Angular, React Native, Taro, WeChat and uni-app
later): design tokens (TypeScript source of truth and generators), theme
types / palettes / design presets, the translator and message bundles, the
headless state machines (`src/machines`), the component contracts
(`src/contracts`), the styling hooks manifest and the pure helpers (ids,
controllable state, keyboard navigation and typeahead math, validation, URL
sanitizing, pagination, dates...).

Nothing in this package touches `document`, `window` or any DOM API: the
`no-restricted-globals` / `no-restricted-imports` ESLint rules of
`eslint.config.js` and `src/platform-neutral.test.ts` (Node environment,
missing `Intl.PluralRules` like Hermes / mini-program engines) enforce it, and
`tsconfig.json` has no `DOM` lib. The DOM primitives live in
[`@minerva/dom`](../dom/README.md).

This workspace package is **private**: it is published inside
[`minerva-design`](../minerva-design/README.md), never on its own.

| Built by `pnpm --filter @minerva/core build` into    | Published as                                            |
| ---------------------------------------------------- | ------------------------------------------------------- |
| `packages/minerva-design/dist/core/index.*`          | internal (re-exported by `minerva-design/core`)         |
| `packages/minerva-design/dist/core/styling-hooks.*`  | `minerva-design/styling-hooks`                          |
| `packages/minerva-design/dist/core/tokens.css`       | `minerva-design/tokens.css`                             |
| `packages/minerva-design/dist/core/tokens.mini*.css` | internal (mini-program stylesheets, later `dist/weapp`) |

`minerva-design/core` is `dist/dom/core-web.*`: this package plus
`@minerva/dom`, the API it exposed before the split. Renderer builds keep
`@minerva/core` external and rewrite its imports to the one copy in
`dist/core/` (`tools/core-imports.mjs`), so no core code is duplicated between
entry graphs. Inside the workspace the `exports` of this package point at the
TypeScript sources (tests and type-checking need no build).

- Design tokens: `src/tokens` (data + generators) is the single source of
  truth. The build emits `tokens.css` and the `tokens.mini*.css` files from
  it; `src/theme/tokens.css` (the unlayered stylesheet behind
  `@minerva/core/tokens.css`, bundled by `@minerva/react`) is committed and
  regenerated with `pnpm --filter @minerva/core tokens:generate` (a test
  fails when it drifts). `src/tokens/__fixtures__/tokens.golden.css` is the
  pre-TypeScript Sass output plus the documented `touch` delta.
- `pnpm hooks:lock` (root) regenerates `styling-hooks.lock.json`: adding a
  hook is a minor change, removing or renaming one is a major change.
- Public API and usage: see the `Core (advanced)` section of the
  [minerva-design README](../minerva-design/README.md).

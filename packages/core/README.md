# @minerva/core (private)

Sources of the framework-agnostic primitives and theming of Minerva: focus
scope, dismissable layer stack, scroll lock, hide-others, roving focus and
typeahead, pointer grace area, presence, portal host, anchored positioning
(`@floating-ui/dom`), the theme system and design tokens, the built-in
translator and messages, the styling hooks manifest and the pure helpers
shared by `@minerva/react` and `@minerva/web-components`.

This workspace package is **private**: it is published inside
[`minerva-design`](../minerva-design/README.md), never on its own.

| Built by `pnpm --filter @minerva/core build` into   | Published as                   |
| --------------------------------------------------- | ------------------------------ |
| `packages/minerva-design/dist/core/index.*`         | `minerva-design/core`          |
| `packages/minerva-design/dist/core/styling-hooks.*` | `minerva-design/styling-hooks` |
| `packages/minerva-design/dist/core/tokens.css`      | `minerva-design/tokens.css`    |

The React and web component builds keep `@minerva/core` external and
rewrite its imports to that one copy (`tools/core-imports.mjs`), so no core
code is duplicated between the two entry graphs. Inside the workspace the
`exports` of this package point at the TypeScript sources (tests and
type-checking need no build).

- `pnpm hooks:lock` (root) regenerates `styling-hooks.lock.json`: adding a
  hook is a minor change, removing or renaming one is a major change.
- Public API and usage: see the `Core (advanced)` section of the
  [minerva-design README](../minerva-design/README.md).

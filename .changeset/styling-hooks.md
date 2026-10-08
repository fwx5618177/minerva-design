---
"@minerva/core": minor
"@minerva/lib-core": minor
"@minerva/lib-web-components": minor
---

Public styling hooks, maintained as public API (part of the initial release).

- **Hooks**: every React component renders `data-minerva="<component>"` and `data-part="<part>"` on its styled elements, plus a shared state vocabulary (`data-state="open|closed|checked|unchecked|indeterminate|active|inactive"`, `data-disabled`, `data-invalid`, `data-readonly`, `data-loading`, `data-required`, `data-highlighted`, `data-current`, `data-dragging`, `data-size`, `data-variant`, `data-color`, `data-orientation`, `data-side`, `data-align`, `data-placement`, `data-shape`, `data-status`). The web components expose the same names: the `<minerva-<component>>` tag, `::part(<part>)` and custom states (`:state(open)`, `:state(disabled)`, `:state(size-small)`), which add no host attribute (hydration-safe). Recommended selectors: `[data-minerva="button"][data-part="label"]` ⇔ `minerva-button::part(label)`.
- **`@minerva/core/styling-hooks`**: the manifest of the hook surface (component → parts → states, with values) and selector helpers (`reactSelector`, `wcSelector`, `customStateName`...). It is the single source of truth of the docs "Styling hooks" sections, of the contract tests (every documented hook is rendered, nothing undocumented is) and of `packages/core/styling-hooks.lock.json`: adding a hook is a minor change, removing or renaming one is a major change.
- **Cascade layer**: every published stylesheet (`@minerva/core/tokens.css`, `@minerva/lib-core/style.css`, `styles/*.css`, `@minerva/lib-web-components/tokens.css`) is wrapped in `@layer minerva`, so unlayered application CSS overrides the library without `!important`. Apps that layer their own CSS declare the order, e.g. `@layer reset, minerva, app;`.
- Web component CSS parts were renamed to the shared vocabulary (e.g. `base` / `button` → `root`, `panel` → `content`).

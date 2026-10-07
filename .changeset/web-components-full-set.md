---
"@minerva/lib-web-components": major
---

**The full Minerva component set as custom elements.**

`@minerva/lib-web-components` now implements the Minerva components as standard, framework-agnostic custom elements built with Lit (`<minerva-button>`, `<minerva-input>`, `<minerva-select>`, `<minerva-modal>`, `<minerva-tabs>`, `<minerva-config>`...), for plain HTML, Vue, Angular, Svelte, Solid and React.

- **Same look and behaviour as `@minerva/lib-core`**: each element renders the React component's DOM and compiles its SCSS module into the shadow root, so the visuals, design tokens and `--<component>-*` CSS variables are identical. Focus scopes, the dismissable layer stack, scroll lock, hide-others, roving focus, typeahead and positioning come from `@minerva/core` through Lit controllers, with the same keyboard support and ARIA roles / states. Overlays use the top layer (Popover API) without leaving their theme scope.
- **API**: the lib-core vocabulary (`color`, `variant`, `size`, `disabled`, `open`, `value`...) as reflected attributes and camelCase properties; `ReactNode` props become slots; data props (`options`, `items`, `columns`...) are properties; key internals are exposed as CSS parts. Events are `minerva-*` CustomEvents that bubble and are composed (`minerva-change`, `minerva-input`, `minerva-open-change`, `minerva-select`...); events announcing a user-requested state change are cancelable (`preventDefault()` keeps the current state).
- **Forms**: the controls are form-associated (`ElementInternals`): `name`, `required`, `FormData`, constraint validation with localized messages, `setCustomValidity()`, `form.reset()`, `<fieldset disabled>`, `<label for>` and state restoration. `<minerva-button type="submit" | "reset">` acts on its form.
- **Theme and locale**: `<minerva-config theme palette design density radius shadow font-scale locale root>` is the `ConfigProvider` counterpart; built-in texts follow `lang` / `locale`.
- **Development warnings** for invalid attribute combinations and misuse (`process.env.NODE_ENV !== "production"`, dropped by bundlers in production builds).
- **Entries**: `.` registers every element and exports the classes plus the authoring utilities (`defineElement`, `emit`, `MinervaElement`, `hostStyles`, `FormAssociatedElement`, `LocaleController`, `resolveLanguage`, `AriaController`, `HasSlotController`, the controllers, `popoverResetStyles`); `./<name>` registers a single element and its dependencies (tree-shakeable); `./cdn` is a self-contained minified ES module bundle; `./tokens.css`; `./custom-elements.json` (Custom Elements Manifest) and `./html-custom-data.json` (VS Code); `./react`, `./vue`, `./svelte` and `./solid` template typings. Every element is declared in `HTMLElementTagNameMap`. `defineElement()` is idempotent and a no-op without `customElements` (SSR-safe imports).

**BREAKING**

- The package is ESM only: the CommonJS build (`require()`) is removed.
- `<minerva-button>` uses lib-core's `Button` API: `color` (`primary`, `neutral`, `success`, `warning`, `danger`, `info`) + `variant` (`solid`, `outline`, `ghost`, `link`), sizes `xsmall` to `xlarge` and shapes `square` / `rounded` / `circle`. The previous variants (`primary`, `secondary`, `success`, `warning`, `error`, `info`, `ghost`, `retry`, `back`), the `tiny` size and the `pill` shape are removed. Migration: `variant="primary"` → no attribute (default), `variant="error"` → `color="danger"`, `variant="success" | "warning" | "info"` → the same `color`, `variant="secondary"` → `color="neutral"`, `variant="ghost"` stays a `variant` (combined with any `color`), `retry` / `back` → a `color` + an icon in the `start` slot, `size="tiny"` → `size="xsmall"`, `shape="pill"` → `--button-radius: 999px` (or `shape="circle"` for icon-only buttons).
- The element styles read the design tokens: load `@minerva/lib-web-components/tokens.css` (or `@minerva/lib-core/style.css`) once.

# @minerva/lib-web-components

The Minerva component set as standard, framework-agnostic custom elements, built with [Lit](https://lit.dev). Use them in plain HTML, Vue, Angular, Svelte, Solid, React or any other stack.

- **Same components as `@minerva/lib-core`**: the elements render the same DOM and compile the same stylesheets into their shadow root, so they look identical, read the same design tokens and expose the same `--<component>-*` CSS variables.
- **Same behaviour**: focus scopes, the dismissable layer stack, roving focus, typeahead and positioning come from `@minerva/core`, with the same keyboard support and ARIA roles / states as the React components.
- **Native forms**: form controls are form-associated (`ElementInternals`): `name`, `required`, `FormData`, constraint validation, `form.reset()`, `<fieldset disabled>`, `<label for>`.
- **Framework friendly**: `minerva-*` CustomEvents (bubbling, composed), properties for data, slots for content, `::part()` for styling, typings for React, Vue, Svelte and Solid, VS Code HTML custom data.
- **ESM only**, side-effect free except the define entries; no peer dependencies.

Documentation and live demos: <https://fwx5618177.github.io/minerva/#/web-components>

## Install

```bash
pnpm add @minerva/lib-web-components
# or: npm install @minerva/lib-web-components
```

## Usage

```ts
// register every element
import "@minerva/lib-web-components";

// design tokens, once per page (already included in @minerva/lib-core/style.css)
import "@minerva/lib-web-components/tokens.css";
```

```html
<minerva-config theme="system" locale="en">
  <form>
    <label for="email">Email</label>
    <minerva-input
      id="email"
      name="email"
      type="email"
      required
    ></minerva-input>

    <minerva-select name="plan" value="pro" aria-label="Plan">
      <minerva-option value="free">Free</minerva-option>
      <minerva-option value="pro">Pro</minerva-option>
    </minerva-select>

    <minerva-button type="submit">Save</minerva-button>
  </form>
</minerva-config>

<script type="module">
  document
    .querySelector("minerva-select")
    .addEventListener("minerva-change", (event) =>
      console.log(event.detail.value),
    );
</script>
```

Attributes are kebab-case strings / booleans (`full-width`, `hide-close-button`); properties are camelCase and accept any value (arrays, objects and functions are properties only). Setting a property never fires an event; user actions fire `minerva-change`, `minerva-input`, `minerva-open-change` (cancelable: `preventDefault()` keeps the current state)...

### Without a build step

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@minerva/lib-web-components@1/dist/tokens.css"
/>
<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/@minerva/lib-web-components@1/dist/cdn/minerva.js"
></script>
```

The CDN bundle is self-contained (every element, Lit and `@minerva/core`, minified, production mode).

## Entries

| Entry                                                               | Contents                                                                                              |
| ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `@minerva/lib-web-components`                                       | Registers every element; exports the element classes, their types and the authoring utilities         |
| `@minerva/lib-web-components/<name>`                                | Registers one element (and its parts / dependencies), e.g. `/button`, `/select`, `/modal`, `/config`  |
| `@minerva/lib-web-components/cdn`                                   | Self-contained ES module bundle (`dist/cdn/minerva.js`)                                               |
| `@minerva/lib-web-components/code-editor`                           | Optional: `<minerva-code-editor>` (Monaco), needs the optional peer `monaco-editor`; not in `.` / CDN |
| `@minerva/lib-web-components/tokens.css`                            | Design tokens (same file as `@minerva/core/tokens.css`)                                               |
| `@minerva/lib-web-components/custom-elements.json`                  | [Custom Elements Manifest](https://github.com/webcomponents/custom-elements-manifest)                 |
| `@minerva/lib-web-components/html-custom-data.json`                 | VS Code HTML custom data                                                                              |
| `@minerva/lib-web-components/react` · `/vue` · `/svelte` · `/solid` | Template typings (types only)                                                                         |

The code editor runs on your own Monaco engine (never loaded from a CDN) and follows the theme of its scope; until the engine is set (or if it fails) it shows a loading state, then an editable textarea fallback:

```ts
import "@minerva/lib-web-components/code-editor";
import * as monaco from "monaco-editor"; // configure its workers (MonacoEnvironment) in your app

document.querySelector("minerva-code-editor")!.monaco = monaco;
```

Imperative confirmations: `confirm({ title, host: button })` (or `const ask = confirmFor(button)`, then `ask({ title })`) renders the dialog in the caller's `<minerva-config>` scope, like lib-core's `useConfirm()`; wrap the app in `<minerva-confirm-provider>` to queue them per subtree (lib-core's `ConfirmProvider`).

`defineElement()` is idempotent and does nothing without a `customElements` registry, so the entries can be imported during server-side rendering.

## Typings

Every element is declared in `HTMLElementTagNameMap` (`document.querySelector("minerva-select")` is a `MinervaSelect`). For framework templates:

```ts
// React 19 (global.d.ts)
/// <reference types="@minerva/lib-web-components/react" />
// Svelte 5 (src/app.d.ts)
/// <reference types="@minerva/lib-web-components/svelte" />
// Solid
/// <reference types="@minerva/lib-web-components/solid" />
```

Vue (Volar): add `"@minerva/lib-web-components/vue"` to `compilerOptions.types` in `tsconfig.json`, and mark the tags as custom elements (`isCustomElement: (tag) => tag.startsWith("minerva-")`).

VS Code (plain HTML):

```json
{
  "html.customData": [
    "./node_modules/@minerva/lib-web-components/dist/html-custom-data.json"
  ]
}
```

## Server rendering and hydration

The modules import in Node without a DOM. Elements in server-rendered markup (for example a React 19 page that renders the tags) upgrade without touching their host attributes: default property values are not reflected (only values you set are), and the implicit ARIA of items (`role`, `aria-selected`, `aria-checked`...) goes through `ElementInternals`, so frameworks hydrate without attribute mismatches. Properties set before an element is connected (or before its definition loads) are kept. Moving an element in the DOM re-acquires its resources, and an open overlay stays open and working.

Composite items also write host attributes of their own: the roving `tabindex` of `<minerva-tab>` / `<minerva-radio>`, the `tabindex` of `<minerva-tab-panel>`, the generated ids and `aria-controls` / `aria-labelledby` references between tabs and panels (and option groups and their labels), `slot`, `hidden` and `data-state` / `data-disabled`. Elements that may be server-rendered markup (upgraded in place, or parsed while the document is loading) defer these writes until hydration has had a chance to run: after the next animation frame, then the next idle period (or task). So you can register the elements before `hydrateRoot()` and React reports no mismatch. Elements created by script (`document.createElement`, client rendering) write them right away. Until then, inactive panels hide their content from inside the shadow DOM, and the tabs are not keyboard-focusable yet. The reflected `selected` (tab) and `checked` (radio) attributes are written on upgrade; React's hydration ignores those two names. Tab panels using a `<template>` child stamp it only after that point, so the hydrated light DOM stays unchanged.

## Development warnings

Invalid attribute combinations and common mistakes are logged with `console.error` (the channel and `[minerva] <subject>: ...` format of the React components of `@minerva/lib-core`: `[minerva] <minerva-x>: ...`), once per message, when `process.env.NODE_ENV !== "production"`. Bundlers replace that expression, so production builds drop the checks; the CDN bundle is built for production.

## Links

- [Getting started](https://fwx5618177.github.io/minerva/#/web-components)
- [Plain HTML](https://fwx5618177.github.io/minerva/#/wc-plain-html) · [Vue](https://fwx5618177.github.io/minerva/#/wc-vue) · [Angular](https://fwx5618177.github.io/minerva/#/wc-angular) · [Svelte](https://fwx5618177.github.io/minerva/#/wc-svelte)
- [Forms](https://fwx5618177.github.io/minerva/#/wc-forms) · [Theming](https://fwx5618177.github.io/minerva/#/wc-theming)
- [Repository](https://github.com/fwx5618177/minerva) · [Issues](https://github.com/fwx5618177/minerva/issues)

## Browser support

ES2022, custom elements v1 and shadow DOM on evergreen browsers (fully supported: Chrome / Edge 120+, Firefox 125+, Safari 17+). Feature-detected with fallbacks: the Popover API (overlays fall back to `position: fixed`), `ElementInternals` (without it the controls do not take part in forms; `element-internals-polyfill` works) and constructable stylesheets. The feature matrix and fallbacks are in the [repository README](https://github.com/fwx5618177/minerva#-browser-support).

## License

MIT

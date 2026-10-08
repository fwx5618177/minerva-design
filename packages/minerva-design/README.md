# minerva-design

The Minerva design system in one package: accessible **React 19** components
(SSR / React Server Components ready) and the same component set as
framework-agnostic **Web Components** (Lit) for plain HTML, Vue, Angular,
Svelte, Solid or React, with design tokens, theming (light / dark / system,
palettes, design presets) and built-in translations (en, zh, ja, fr).

Documentation and live demos: <https://fwx5618177.github.io/minerva/>

## Install

```sh
pnpm add minerva-design
# or: npm install minerva-design / yarn add minerva-design
```

- **React**: `react` and `react-dom` `^19.0.0` are (optional) peer dependencies, needed only by the React entries. React 18 is not supported.
- **Web Components**: nothing else to install. Lit is a regular dependency; React-only apps never load it (the web component entries are separate modules).
- **Monaco editor** (optional): `minerva-design/monaco` and `minerva-design/web-components/code-editor` use the optional peers `@monaco-editor/react` / `monaco-editor`.

## React

Import the global stylesheet **once**, in the app entry (`src/main.tsx`, or the root `app/layout.tsx` with the Next.js App Router), then the components:

```tsx
import { Button, ConfigProvider, ToastProvider, toast } from "minerva-design";
import "minerva-design/style.css";

export default function App() {
  return (
    <ConfigProvider>
      <ToastProvider>
        <Button onClick={() => toast.success("Saved")}>Save</Button>
      </ToastProvider>
    </ConfigProvider>
  );
}
```

Every stylesheet ships inside `@layer minerva`: your unlayered CSS overrides
the library without `!important` (layered apps: `@layer reset, minerva, app;`).

Styling hooks (public API): each component renders `data-minerva="<component>"`,
`data-part="<part>"` and state attributes (`data-state`, `data-disabled`,
`data-size`, `data-variant`...), e.g.
`[data-minerva="button"][data-part="label"]`. Repeated items carry their own
states on the item element, e.g.
`[data-minerva="menu"][data-part="item"][data-highlighted]`,
`[data-minerva="option"][data-selected]` or
`[data-minerva="data-table"][data-part="header-cell"][data-sort="ascending"]`.
The hooks of every component are listed on its docs page and in
`minerva-design/styling-hooks`.

Every client module starts with `"use client"`; `minerva-design/utils` and `minerva-design/theme-utils` are server-safe (no `"use client"`, no React) for React Server Components and servers.

## Web Components

```ts
// register every element
import "minerva-design/web-components";

// design tokens, once per page (already included in minerva-design/style.css)
import "minerva-design/tokens.css";
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
  href="https://cdn.jsdelivr.net/npm/minerva-design@0/dist/core/tokens.css"
/>
<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/minerva-design@0/dist/web-components/cdn/minerva.js"
></script>
```

The CDN bundle is self-contained (every element, Lit and `minerva-design/core`, minified, production mode).

The code editor runs on your own Monaco engine (never loaded from a CDN) and follows the theme of its scope; until the engine is set (or if it fails) it shows a loading state, then an editable textarea fallback:

```ts
import "minerva-design/web-components/code-editor";
import * as monaco from "monaco-editor"; // configure its workers (MonacoEnvironment) in your app

document.querySelector("minerva-code-editor")!.monaco = monaco;
```

Imperative confirmations: `confirm({ title, host: button })` (or `const ask = confirmFor(button)`, then `ask({ title })`) renders the dialog in the caller's `<minerva-config>` scope, like the React library's `useConfirm()`; wrap the app in `<minerva-confirm-provider>` to queue them per subtree (the React library's `ConfirmProvider`).

`defineElement()` is idempotent and does nothing without a `customElements` registry, so the entries can be imported during server-side rendering.

### Typings

Every element is declared in `HTMLElementTagNameMap` (`document.querySelector("minerva-select")` is a `MinervaSelect`). For framework templates:

```ts
// React 19 (global.d.ts)
/// <reference types="minerva-design/web-components/react" />
// Svelte 5 (src/app.d.ts)
/// <reference types="minerva-design/web-components/svelte" />
// Solid
/// <reference types="minerva-design/web-components/solid" />
```

Vue (Volar): add `"minerva-design/web-components/vue"` to `compilerOptions.types` in `tsconfig.json`, and mark the tags as custom elements (`isCustomElement: (tag) => tag.startsWith("minerva-")`).

VS Code (plain HTML):

```json
{
  "html.customData": [
    "./node_modules/minerva-design/dist/web-components/html-custom-data.json"
  ]
}
```

### Styling

The elements read the design tokens and the same `--<component>-*` CSS
variables as the React components. Their public styling hooks use the shared
Minerva vocabulary: the tag, CSS parts and custom states of the host
(`ElementInternals.states`), which add no host attribute:

```css
minerva-button::part(label) {
  letter-spacing: 0.02em;
}
minerva-modal:state(open)::part(content) {
  border: 1px solid var(--border-color);
}
minerva-button:state(size-small):state(variant-ghost) {
  --button-radius: 999px;
}
```

React's `[data-state="open"]`, `[data-disabled]` and `[data-size="small"]` are
`:state(open)`, `:state(disabled)` and `:state(size-small)` here (Chromium
90-124: `:--open`).

Items rendered in a shadow root (menu items, options from the `options`
property, table rows and headers, pages, steps, days, toasts, files...)
expose their own states as `<part>--<state>` part names next to the part name
(`<part>--<key>-<value>` for keyed states). `::part()` matches elements that
carry every listed name, and needs no `:state()` support:

```css
minerva-menu::part(item item--highlighted) {
  background: var(--primary-color-subtle);
}
minerva-data-table::part(header-cell header-cell--sort-ascending) {
  color: var(--primary-color);
}
minerva-toast-region::part(toast toast--color-success) {
  border-inline-start: 4px solid var(--success-color);
}
/* items that are elements of their own: their custom states */
minerva-option:state(selected)::part(root) {
  font-weight: 600;
}
```

The hooks of every element are listed on its docs page and in
`minerva-design/styling-hooks`. `tokens.css` ships inside `@layer minerva`.

### Server rendering and hydration

The modules import in Node without a DOM. Elements in server-rendered markup (for example a React 19 page that renders the tags) upgrade without touching their host attributes: default property values are not reflected (only values you set are), and the implicit ARIA of items (`role`, `aria-selected`, `aria-checked`...) goes through `ElementInternals`, so frameworks hydrate without attribute mismatches. Properties set before an element is connected (or before its definition loads) are kept. Moving an element in the DOM re-acquires its resources, and an open overlay stays open and working.

Composite items also write host attributes of their own: the roving `tabindex` of `<minerva-tab>` / `<minerva-radio>`, the `tabindex` of `<minerva-tab-panel>`, the generated ids and `aria-controls` / `aria-labelledby` references between tabs and panels (and option groups and their labels), `slot`, `hidden` and `data-state` / `data-selected` / `data-highlighted` / `data-disabled`. Elements that may be server-rendered markup (upgraded in place, or parsed while the document is loading) defer these writes until hydration has had a chance to run: after the next animation frame, then the next idle period (or task). So you can register the elements before `hydrateRoot()` and React reports no mismatch. Elements created by script (`document.createElement`, client rendering) write them right away. Until then, inactive panels hide their content from inside the shadow DOM, and the tabs are not keyboard-focusable yet. The reflected `selected` (tab) and `checked` (radio) attributes are written on upgrade; React's hydration ignores those two names. Tab panels using a `<template>` child stamp it only after that point, so the hydrated light DOM stays unchanged.

### Development warnings

Invalid attribute combinations and common mistakes are logged with `console.error` (the channel and `[minerva] <subject>: ...` format of the React components of `minerva-design`: `[minerva] <minerva-x>: ...`), once per message, when `process.env.NODE_ENV !== "production"`. Bundlers replace that expression, so production builds drop the checks; the CDN bundle is built for production.

## Core (advanced)

`minerva-design/core` is the framework-agnostic, side-effect-free and SSR-safe
TypeScript both libraries are built on (plain DOM APIs; the only runtime
dependency is `@floating-ui/dom`). The React and web component entries import
the same copy, so an app using both loads it once.

| Module              | API                                                                                               |
| ------------------- | ------------------------------------------------------------------------------------------------- |
| `id`                | `createId(prefix?)`                                                                               |
| `controllable`      | `createControllableState({ value, defaultValue, onChange })`                                      |
| `dom`               | `canUseDOM`, `getActiveElement`, `contains`, `getTabbables`, `getFocusables`, `focusElement`, ... |
| `focus-scope`       | `createFocusScope(container, { trapped, loop, autoFocus, restoreFocus })`                         |
| `dismissable-layer` | `createDismissableLayer(element, { onDismiss, branches, disableOutsidePointerEvents, ... })`      |
| `scroll-lock`       | `lockScroll(target?)` returns `unlock()`                                                          |
| `hide-others`       | `hideOthers(targets, { root, attribute })` returns `undo()`                                       |
| `roving-focus`      | `getNextIndex(...)`, `createTypeahead()`, `createRovingFocus(container, options)`                 |
| `portal`            | `getPortalContainer(explicit?)`, `createPortalHost({ id, attributes, parent })`                   |
| `positioning`       | `computeAnchoredPosition`, `autoPosition`, `applyPosition`, placement helpers                     |
| `pointer-grace`     | `createPointerGrace()`, `getGraceArea`, `isPointInPolygon`                                        |
| `presence`          | `waitForExitAnimation(el)`                                                                        |
| `theme`             | theme types, `light` / `dark` / `githubDark` / `themes`, `palettes`, `applyThemeStyles`, ...      |
| `theme/theme-utils` | `THEME_INIT_SCRIPT`, `parseThemeCookies`, `serializeThemeCookie`, `PALETTES`, ... (server-safe)   |
| `i18n`              | `messages`, `SUPPORTED_LANGUAGES`, `mergeMessages`, `createTranslator`, `translate`, ...          |

```ts
import {
  autoPosition,
  applyPosition,
  createDismissableLayer,
  createFocusScope,
} from "minerva-design/core";

const trigger = document.querySelector<HTMLElement>("#trigger")!;
const popover = document.querySelector<HTMLElement>("#popover")!;

const stop = autoPosition(
  trigger,
  popover,
  { placement: "bottom-start" },
  (r) => applyPosition(popover, r),
);
const scope = createFocusScope(popover, { trapped: true, loop: true });
scope.activate();
const layer = createDismissableLayer(popover, {
  branches: () => [trigger],
  onDismiss: () => {
    stop();
    scope.deactivate();
    layer.destroy();
    popover.remove();
  },
});
```

React adapters should use `React.useId()` rather than `createId()`, because
`useId` keeps ids stable between the server and client render.

The styling hooks manifest (component → parts → states) and its selector
helpers are published as `minerva-design/styling-hooks`.

## Entries

| Entry                                                                 | Contents                                                                                                         |
| --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `minerva-design`                                                      | Every React component, hook and theme utility (ESM + CJS, TypeScript types, `"use client"`)                      |
| `minerva-design/style.css`                                            | All component styles and the design tokens (import once, in the app entry)                                       |
| `minerva-design/styles/*.css`                                         | Per-component stylesheets (`styles/button.css`...; `styles/tokens.css` for the tokens alone)                     |
| `minerva-design/tokens.css`                                           | The design tokens only (e.g. for the web components)                                                             |
| `minerva-design/prose.scss`                                           | The typography mixins of `Prose`                                                                                 |
| `minerva-design/theme-utils`                                          | Server-safe theme helpers (`THEME_INIT_SCRIPT`, `THEME_INIT_SCRIPT_HASH`, cookie parsing, design presets)        |
| `minerva-design/utils`                                                | Server-safe non-component utilities (`cn`, `themes`, `palettes`, `resolveTheme`, ...) for Server Components      |
| `minerva-design/monaco`                                               | `MonacoCodeEditor` (optional peers `@monaco-editor/react` and `monaco-editor`)                                   |
| `minerva-design/web-components`                                       | Registers every custom element; exports the element classes, their types and the authoring utilities (ESM)       |
| `minerva-design/web-components/<name>`                                | Registers one element (and its parts / dependencies), e.g. `/button`, `/select`, `/modal`, `/config`             |
| `minerva-design/web-components/code-editor`                           | Optional: `<minerva-code-editor>` (Monaco), needs the optional peer `monaco-editor`; not in the all-in-one / CDN |
| `minerva-design/web-components/cdn`                                   | Self-contained ES module bundle (`dist/web-components/cdn/minerva.js`)                                           |
| `minerva-design/web-components/react` · `/vue` · `/svelte` · `/solid` | Template typings of the custom elements (types only)                                                             |
| `minerva-design/custom-elements.json`                                 | [Custom Elements Manifest](https://github.com/webcomponents/custom-elements-manifest)                            |
| `minerva-design/html-custom-data.json`                                | VS Code HTML custom data                                                                                         |
| `minerva-design/core`                                                 | Advanced: the framework-agnostic primitives (ESM + CJS)                                                          |
| `minerva-design/styling-hooks`                                        | The styling hooks manifest and selector helpers (ESM + CJS)                                                      |

## Links

- [Installation](https://fwx5618177.github.io/minerva/#/installation) · [React Server Components](https://fwx5618177.github.io/minerva/#/rsc-guide) · [Theming](https://fwx5618177.github.io/minerva/#/theming)
- Web Components: [getting started](https://fwx5618177.github.io/minerva/#/web-components) · [plain HTML](https://fwx5618177.github.io/minerva/#/wc-plain-html) · [Vue](https://fwx5618177.github.io/minerva/#/wc-vue) · [Angular](https://fwx5618177.github.io/minerva/#/wc-angular) · [Svelte](https://fwx5618177.github.io/minerva/#/wc-svelte) · [forms](https://fwx5618177.github.io/minerva/#/wc-forms) · [theming](https://fwx5618177.github.io/minerva/#/wc-theming)
- [Repository](https://github.com/fwx5618177/minerva) · [Issues](https://github.com/fwx5618177/minerva/issues)

## Browser support

- **React components**: React 19 on evergreen browsers (fully supported: Chrome / Edge 120+, Firefox 125+, Safari 17+; down to Chrome 111, Firefox 113, Safari 16.4 with minor styling degradations: `color-mix()`, `:has()`, `:dir()`, container queries). Overlays render in a portal (no Popover API needed).
- **Web Components**: ES2022, custom elements v1 and shadow DOM on the same browsers. Feature-detected with fallbacks: the Popover API (overlays fall back to `position: fixed`), `ElementInternals` (without it the controls do not take part in forms; `element-internals-polyfill` works) and constructable stylesheets.
- **Core**: ES2020 and DOM APIs only.

The feature matrix and fallbacks are in the [repository README](https://github.com/fwx5618177/minerva#-browser-support).

## License

MIT

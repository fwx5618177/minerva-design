# Architecture

A platform-neutral core shared by React, Vue, Angular, Web Components, React Native, Taro, native WeChat and uni-app; web renderers additionally use DOM primitives.

Package: minerva-design@1.19.3

Renderer: taro

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "19932861fda2d088219d708a8ca132bea760a32b",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:c2b9c6e66069aa1acd454efc20d52cde92c1a1c820c1b3ab5302d01929cb4c39"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

### Packages

Minerva is a pnpm monorepo publishing one package, minerva-design, with one entry per renderer. Behaviour (headless state machines), component contracts, design tokens, theming data and translations are written once in the core; renderers only add rendering.

Package

The web core API: the whole platform-neutral core (dist/core) plus the DOM primitives of the DOM layer (dist/dom): focus scopes, the dismissable layer stack, scroll lock, hide-others, roving focus, positioning, portal hosts, theme cookies and the no-flash init script. Same API as before the split.

The React 19 component library. Components use thin hooks over the core primitives (src/internal), so every overlay shares one implementation. Re-exports the theme helpers and types of its public API, and bundles the core tokens into style.css.

Lit custom elements implementing the whole component set for any framework or none. Their behaviour comes from the same core primitives through Lit controllers, and they compile the React library's stylesheets into their shadow roots, so both libraries look and behave the same.

Two internal layers implement it, built from private workspace packages. Native renderers (React Native, mini-programs) only use the first one, so no DOM code reaches them.

Internal layers

Platform-neutral TypeScript with no DOM access (enforced by lint rules and a test in a Node environment without Intl.PluralRules): headless state machines, component contracts, design tokens (TypeScript source, generated tokens.css / tokens.mini.css, resolveTokens for concrete values), theme types, palettes and design presets, i18n messages and the translator, keyboard navigation and typeahead math, ids, controllable state, validation and URL sanitizing.

The DOM half for web renderers: focus scope, dismissable layers, scroll lock, hide-others, the roving focus DOM binding, positioning with @floating-ui/dom, portal hosts, pointer grace, presence (exit animations), reading direction and the theme's DOM / cookie helpers.

### Platforms

Renderers expose separate entries in minerva-design. Web hosts add DOM primitives; React Native uses resolved native values and mini-programs use class-scoped CSS tokens. Statuses below are derived from the component support matrix.

Platform

Entry

Renderer

Shared layers

Status

Stable

Planned

Per-component support: see Platform support.

React (web)

React 19 DOM components, SSR / RSC ready

Web Components

Lit custom elements, any framework or none

Vue 3

Native single-file components (until then: the Web Components)

Angular

Native standalone components with signals (until then: the Web Components)

React Native + Expo

React Native components, tokens resolved with resolveTokens

Taro

React-syntax components for mini-programs and H5, tokens.mini.css

WeChat mini-program

Native custom components (WXML / WXSS), tokens.mini.css

uni-app

Vue 3 components with uni-app built-ins, tokens.mini.css

Beta

### Shared headless layer

Shared contracts, tokens and state logic reduce divergence; rendering and host integration remain in each renderer.

State machines (core/machines): framework-neutral stores { getState, send, subscribe } for disclosure and presence, the toast queue, selection, tabs, picker columns, fields and validation, pagination, rating, number stepper and toggles. The React and Web Component toasts, tabs, pagination and rating already run on them.

Component contracts (core/contracts): runtime metadata per component (props with enum values and defaults, events, slots, tracks, a support status per platform), checked against the React types and custom-elements.json.

Design tokens: TypeScript data generates tokens.css (byte-identical to the previous Sass output), class-based tokens.mini.css for mini-programs (split per palette) and resolveTokens() with an sRGB color-mix matching CSS.

Shared contract tests and renderer-specific unit and browser tests check the documented APIs. See Platform support for SDK, simulator and device verification boundaries.

### DOM primitives

The DOM primitives (dist/dom) are small functions working on DOM elements, returning a cleanup or controller object. They are nested-safe: a stack decides which overlay reacts first. Their platform-neutral parts (keyboard navigation, typeahead, controllable state) live in the core (dist/core).

createFocusScope: focus on open, Tab trapping with loop, focus restored to the opener on close; nested scopes pause the outer one.

createDismissableLayer: Escape, pointer down outside and focus outside dismiss only the topmost layer; clicks in child layers (submenus, a Select in a Modal) never close their parents.

lockScroll: reference-counted page scroll lock that compensates the scrollbar width.

hideOthers: hides everything except the modal from assistive technology (aria-hidden or inert), restored correctly when modals nest.

getNextIndex and createTypeahead (core) with createRovingFocus (DOM): arrow keys, Home / End, wrap-around, orientation, right-to-left and typeahead for menus, listboxes and tabs.

computeAnchoredPosition / autoPosition: anchored placement with offset, flip, shift, size and arrow, kept in place while scrolling and resizing.

createPointerGrace: the safe triangle that keeps a submenu open while the pointer moves towards it.

getPortalContainer / createPortalHost: where overlays are rendered; nested ConfigProviders create a portal host per theme scope.

createId and createControllableState: unique ids and controlled / uncontrolled state without a framework.

Theme utilities: cookie parsing, the no-flash init script, palettes and the design tokens.

### One implementation for every overlay

Modal, Drawer, the AppShell mobile navigation, Popover, Tooltip, Menu, ContextMenu, Select, AutoComplete, Cascader and TimePicker all register with the same layer stack, use the same focus handling and the same positioning. Escape always closes the innermost overlay first, and focus returns to where it came from.

All of them render through the portal container of the closest theme scope, so a nested ConfigProvider with its own theme also themes its popups.

### Dependencies

Floating UI (@floating-ui/dom) is the only third-party interaction dependency, used solely inside the positioning module of the DOM layer (dist/dom). There is no Radix UI or other headless library: Slot / asChild, Tabs, dialogs, menus and the select are developed in this repository and tested with Vitest, happy-dom, Testing Library and user-event.

### Implementation and acceptance

All listed renderer packages contain implementations. Beta status records their current maturity, not full device or production acceptance. The platform support matrix is the source of component-level status.

Shared core and DOM layer: state machines, contracts, tokens, translations and test infrastructure are implemented.

Vue 3 and Angular: native renderers and executable documentation examples are implemented.

React Native and Expo: native components and simulator checks are implemented; physical-device and standalone release acceptance remain open.

Taro, native WeChat and uni-app: implementations, official WeChat target compilation fixtures and documented browser/simulator checks are present.

Touch presets and mobile extensions: use the documented platform-specific APIs; host limitations and acceptance boundaries remain explicit.

### Next steps

Install the packages and import the stylesheet.

Use the custom elements in plain HTML, Vue, Angular or Svelte.

### Component metadata for tools

The read-only contracts entry describes renderer-specific imports, props, events, slots and bindings. Read referenced type nodes only as needed. It is independent of React, the DOM and native renderers.

```tsx
import { contractsMetadata, getRendererContract, getType } from "minerva-design/contracts";

const input = getRendererContract("Input", "vue");
console.log(input?.import, input?.bindings);
const value = input?.props?.find(prop => prop.name === "modelValue");
const type = value?.typeRef ? getType(value.typeRef) : undefined;
console.log(contractsMetadata.packageVersion, type);
```

schemaVersion describes the metadata format; packageVersion matches the package. sourceCommit is the generation baseline and sourceDigest identifies the exact source snapshot. Static Markdown / JSON and complete recipes are available from the text index.

```text
core (dist/core)   platform-neutral TypeScript (no DOM): React Native, mini-programs, Node
  ├─ headless state machines (machines/): disclosure, toast queue, tabs, selection, field...
  ├─ component contracts (contracts/): props, events, slots, platform support
  ├─ tokens: TypeScript source → tokens.css, tokens.mini.css, resolveTokens()
  └─ theme data, design presets, i18n messages + translator, pure helpers
        ▲
        │                             web only
        │   dom (dist/dom)   focus scope, layers, scroll lock, roving focus,
        │        ▲         positioning (@floating-ui/dom), portal, theme DOM helpers
        │        │
 ┌──────┴────────┴──────────────┬─────────────────────────┬──────────────────────┐
 minerva-design         minerva-design/web-components   minerva-design/vue · /angular
 React 19 (DOM)         Lit custom elements             (native renderers)
        │
 minerva-design/native · /taro · /uni · miniprogram → dist/weapp   (native host renderers)

minerva-design/core = core + dom (the web API)
```

```ts
import { createDismissableLayer, createFocusScope, lockScroll } from "minerva-design/core";

// A framework-free modal: trap focus, dismiss on Escape / outside click,
// lock page scroll. Every React overlay is built from the same pieces.
const scope = createFocusScope(dialog, { trapped: true, loop: true });
const layer = createDismissableLayer(dialog, { onDismiss: close });
const unlock = lockScroll();
scope.activate();

function close() {
  layer.destroy();
  scope.deactivate(); // restores focus to the opener
  unlock();
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

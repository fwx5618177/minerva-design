# Platform support

Source implementation coverage for React, Web Components, Vue, Angular, React Native, Taro, WeChat and uni-app. This matrix does not indicate npm publication or complete API, visual or device parity.

Package: minerva-design@1.22.3

Renderer: wc

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.3",
  "sourceCommit": "29f678e6c83b155a4b25bb6ba161bd1343a30a05",
  "sourceDigest": "sha256:62e49d8be55ca2bb85e8afd17b7862d068358e8ea94178c66288911996ed036e",
  "referenceSourceDigest": "sha256:0412dc239078e986227cd3204e2571665b3114a1b01c61132429483ed5a82f88"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.3/types.json) or getType() from minerva-design/contracts.

## Documentation

Platforms

Shared contracts describe component props, events and slots. Each renderer implements the behavior using its platform primitives. A source implementation can still have API and interaction gaps; consult the matrix notes and platform manifests for its tested scope.

Platform

Components

React

React 19 components for the DOM (minerva-design).

Web Components

Lit custom elements for web frameworks. Vue and Angular also provide native framework components through their own entries.

Vue

Native Vue 3 SFC components (minerva-design/vue), with dedicated demos and API tables.

Angular

Native standalone Angular components (minerva-design/angular). See the matrix for each component’s implementation status.

React Native

React Native components for iOS and Android with Expo. Expo Go 57.0.9 simulator checks cover iOS 26.1 and Android 16: input, tables, menus, WebView and virtual lists; Android system document selection and clipboard copy/paste also passed. Physical devices and standalone release installation remain unverified.

Taro

Taro components for mini-programs and H5. The main entry passes the official Taro 4.3 WeChat compiler fixture. H5 keyboard, focus, uploads and sandboxed previews are covered by happy-dom tests (no real browser runs); minerva-design/taro/monaco is an optional H5 entry using an application-supplied Monaco engine. Mini-program hosts cannot run Monaco.

WeChat

Native WeChat component definitions, with composition parts expressed through parent properties or slots where documented. Selected interactions have been exercised in the WeChat DevTools simulator. This is not physical-device or complete API verification. Monaco cannot run in the native WeChat component host.

uni-app

uni-app source SFCs compiled with the official uni-app 5.31 Vue 3 compiler for WeChat; the fixture registers all library SFCs except H5-only Monaco. H5 has keyboard, modal focus, portals, file input, sandboxed preview and optional minerva-design/uni/monaco support. The application supplies the Monaco engine; native mini-program hosts cannot run it.

Stable

Beta

Planned

N/A

Implemented with automated validation for its documented scope. Does not indicate a published npm release or complete cross-platform parity.

Implemented with platform-specific scope and remaining API or validation gaps. Read its matrix note and manifest before adopting it.

on the roadmap, not available yet.

not a component on this platform by design: the platform covers it another way (hover the badge for details).

A data object in React: an item of the parent component's items / entries prop.

A React-only composition part or provider: the custom elements cover it with attributes or the parent element.

Support matrix

Every component and custom element, by platform. Filter by product track: back-office applications (toB) or consumer apps (toC).

Product track

All

toB

toC

Components shown: {{count}}

Component

Tracks

Component contracts

The matrix is generated from the component contracts: metadata extracted from the React props types and the Custom Elements Manifest (props with their kinds, enum values and defaults, events with their detail fields, slots, tracks and the support of every platform). A test fails when a prop, attribute or event changes without regenerating them, and when React and the custom elements disagree on enum values or defaults.

Shared contract tests and renderer unit and integration tests (Vitest with happy-dom, no real browser) cover documented interactions, translations and tokens. Independent CI fixtures compile the Taro main entry and uni-app SFCs with the official WeChat target SDKs. WeChat DevTools 2.01.2510280 / base library 3.17.2 simulator checks recorded button/retry, disabled choices, selection, modal opening and scoped themes. A recheck verified native keyboard input hello and controlled uppercase feedback HELLO. Deprecated system-info and component WXSS selector warnings were fixed and disappeared after recompilation. Tourist-account automator RPC timed out and the platform security-info API still reports errors. Physical devices, other platform targets and all platform APIs remain unverified; simulator evidence does not establish complete visual or API parity.

Native framework and mini-program quick start

Import the platform entry and follow its peer dependencies and host adapter requirements. uni-app ships source SFCs for its platform compiler. Optional H5 Monaco entries are minerva-design/taro/monaco and minerva-design/uni/monaco; provide the locally installed Monaco engine and configure its workers in your application. They are not native mini-program editors. Official WeChat-target SDK compilation is verified separately from H5/browser testing and the documented DevTools simulator flows; physical-device validation is still required.

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

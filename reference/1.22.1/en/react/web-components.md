# Web Components

The whole Minerva component set as standard custom elements, for plain HTML, Vue, Angular, Svelte, Solid, React or any other framework.

Package: minerva-design@1.22.1

Renderer: react

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.1",
  "sourceCommit": "a07dc9a260690841cc0eea98acdc24ac32032a2c",
  "sourceDigest": "sha256:cbdfa6292d29dec33adda7a3e9cf0e027da50858956b8d08e3f7f3ed59c8d78a",
  "referenceSourceDigest": "sha256:6d534260f2c14247d5360acc167a35134052fa342938ee2bdd089ae303d95f7c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.1/types.json) or getType() from minerva-design/contracts.

## Documentation

### What it is

minerva-design/web-components implements every Minerva component as a standard custom element (, , ...), built with Lit. Once registered, the elements behave like built-in HTML tags: they work in a static page, in a server-rendered template and in every framework that renders HTML.

They are not wrappers of the React components: they render the same DOM structure and compile the same stylesheets into their shadow root, so they look identical, read the same design tokens and expose the same ---* CSS variables. Keyboard and focus behaviour (focus scopes, the dismissable layer stack, roving focus, typeahead, positioning) comes from the same minerva-design/core primitives, with the same ARIA roles and states.

The API follows the React vocabulary: color, variant, size, disabled, open, value... become attributes and properties, ReactNode props become slots, callbacks become minerva-* events, and form controls take part in native s.

### Install

The package is ESM only and has no peer dependencies: Lit, minerva-design/core (with Floating UI), DOMPurify and jsonc-parser are regular dependencies. React is not needed.

### Load the elements

With a bundler, import the package once (for instance in your entry file) to register every element:

Or import one entry per element for smaller bundles. Each entry registers its element, its parts and the Minerva elements it renders, and nothing else; the modules are side-effect free otherwise, so unused elements are never bundled. Importing an element twice (or the all-in-one entry afterwards) is harmless.

Without any build step, load the self-contained bundle from a CDN with a module script. It contains every element, Lit and minerva-design/core, minified:

Pin a version in CDN URLs in production. The bundle is also published as the ./cdn export (minerva-design/web-components/cdn) if you want to host it yourself.

### Design tokens

The elements style themselves (their CSS lives in their shadow root), but read the design tokens (--primary-color, --radius-md, --space-2, ...) from the page. Load minerva-design/tokens.css once, as a stylesheet link or a CSS import. It is the same file as minerva-design/tokens.css: if the page already loads minerva-design/style.css (React and Web Components side by side), the tokens are already there. See Theming for themes, palettes and per-component variables.

### Attributes and properties

Every option is a property (camelCase, any JavaScript value) and, when it is a string, number or boolean, an attribute too (kebab-case: full-width, close-label, activation-mode). Boolean attributes are on when present; options whose React default is true are inverted (hide-close-button, no-loop). State-like attributes (open, disabled, variant, size, color, checked...) are reflected, so CSS can select them. Arrays, objects and functions (options, items, columns, render callbacks) are properties only.

Form controls follow native inputs: the value (or checked) attribute is the initial value, restored by form.reset(), while the value / checked property is the current value. Set the property to change it from script.

### Events

Elements announce what the user did with CustomEvents named minerva-. They bubble and are composed (they cross shadow roots), and carry the new state in event.detail:

minerva-change: a committed value change ({ value }, or { checked, value } for checkboxes and switches).

minerva-input: the value is changing while the user types ({ value }).

minerva-open-change: the user asked to open or close a popup ({ open, ... }). It is cancelable: preventDefault() keeps the current state, the equivalent of a controlled open prop in React. Selection changes of tabs are cancelable too.

More specific events use the same scheme: minerva-select, minerva-close, minerva-clear, minerva-page-change, minerva-sort-change, minerva-selection-change, minerva-after-open, minerva-after-close... Each component page lists the events of its elements.

Native events keep their meaning where an element mirrors a native control: click, focus, blur, input and change (re-dispatched on the host).

Setting a property from script never fires an event: events always mean that the user did something, so syncing state into an element cannot loop.

### Slots and parts

Rich content goes into slots: the default slot for the main content, and named slots (slot="footer", "prefix", "start", "icon"...) where the React component takes a ReactNode. Elements expose their key internals as CSS parts (root, label, content, item, input...) and their states as custom states (:state(open)...), which you can style from the page with ::part() without depending on their internal class names. Slots and parts are listed on every component page.

### TypeScript and editor support

Every element class adds itself to HTMLElementTagNameMap, so document.querySelector and createElement return the right type. The classes and their string-literal unions are exported from the package.

Typings for framework templates are generated from the Custom Elements Manifest (custom-elements.json, also published): attributes, properties and events are type-checked in React, Vue, Svelte and Solid templates. Reference the file that matches your framework once:

```tsx
For plain HTML files, point VS Code at the bundled HTML custom data to get tag and attribute completion with documentation:
```

### Use from React 19

React 19 supports custom elements natively: props that exist on the element are set as properties (so booleans, arrays and objects work as is) and props named on + the event name subscribe to custom events, e.g. onminerva-change. onClick and other standard events work as with native elements.

In React apps the React components of minerva-design are usually the better fit. The custom elements are useful when the same widgets are shared with non-React code (micro-frontends, CMS content, server templates).

### Server-side rendering

The modules can be imported in Node (Next.js, Nuxt, SvelteKit, Angular SSR, Astro...): nothing touches the DOM at import time, and defineElement() is idempotent and does nothing when the environment has no customElements registry. The elements are not pre-rendered (no declarative shadow DOM): the server sends the tags with their attributes and light DOM content, and the browser upgrades them once the definitions load.

Server-rendered markup hydrates without mismatches, even when the definitions are registered before hydrateRoot(): composite items (tabs and panels, radios, options) defer the host attributes they write themselves (roving tabindex, generated ids, aria-controls / aria-labelledby, slot, hidden, data-state) until after the next animation frame and idle period. Elements created by script write them immediately.

Hide undefined elements with :not(:defined) to avoid a flash of unstyled content.

### Development warnings

Invalid attribute combinations and common mistakes (a value that matches no option, min greater than max, an icon-only button without aria-label, the package loaded twice...) are reported with console.error (the channel of the React components' warnings, like React's own prop warnings), once per message, in the same format as the React library: "[minerva] : message". The checks are guarded by process.env.NODE_ENV !== "production", which bundlers replace: production builds drop them. Without a bundler (the CDN build, or a module loaded where process does not exist), warnings are off.

### Authoring your own elements

The building blocks of the Minerva elements are exported, so your own custom elements can share their conventions, theme scope and accessibility behaviour:

defineElement(Class): registers an element and its static dependencies; idempotent, warns in development when another class already owns the tag, no-op without customElements.

emit(target, name, detail, { cancelable }): dispatches a bubbling, composed minerva-* CustomEvent and returns false when a listener called preventDefault().

MinervaElement: the LitElement base class (static tagName, static dependencies, this.emit()).

hostStyles: shared :host rules (box-sizing, the hidden attribute, a .visually-hidden helper).

FormAssociatedElement: base class of form controls on ElementInternals (name, disabled, required, validity, custom validity, reset, fieldset and state restoration).

LocaleController: built-in texts through the core translator (this.locale.t("modal.close")), following lang and .

resolveLanguage(element): the supported language of an element's scope.

AriaController: forwards aria-label / aria-labelledby / aria-describedby and  from the host to an inner control (ids cannot cross shadow roots).

HasSlotController: whether a named slot has content, to drop empty wrappers.

Lit controllers over the core primitives: FloatingLayerController (anchored popup: position, dismissable layer, optional focus scope), AnchoredPositionController, DismissableLayerController, FocusScopeController, ModalController (scroll lock and hide-others), RovingFocusController and TypeaheadController.

popoverResetStyles: resets the UA styles of a popover="manual" panel rendered in the top layer.

### One page, every framework

Every component page has a framework selector (React, Vue, Angular, Svelte, Solid, HTML) whose choice is kept for the whole site and in the ?framework= link. The Vue, Angular, Svelte, Solid and HTML examples run the real custom elements; their source is generated at build time from the page's Web Component demo (HTML + its setup script) by a deterministic transformer, so every framework always shows the same, tested example:

root.querySelector("#id") → an element reference: ref() in Vue, #ref + @ViewChild in Angular, bind:this in Svelte, ref={el} in Solid.

el.addEventListener("minerva-change", handler) → a template listener: @minerva-change, (minerva-change), onminerva-change, on:minerva-change; the matching removeEventListener is dropped, the framework removes it.

el.items = [...] at setup → a property binding: :items.prop, [items], items={…}, prop:items={…}.

An element only written through textContent (or the value of an ) → reactive state rendered in the template (ref, field, $state, signal).

Other declarations become component state and functions, other statements run on mount (onMounted, ngAfterViewInit, onMount) and the rest of the cleanup on unmount. Plain HTML keeps the script as is, with document instead of the demo root.

Code the rules cannot express keeps the original setup function, called on mount with a container ref, so the generated example stays correct.

### Guides

```ts
// main.ts: every element (Vite, webpack, Rspack, esbuild...)
import "minerva-design/web-components";
import "minerva-design/tokens.css";
```

```ts
// only what you use: each entry registers one element (and its parts,
// e.g. <minerva-option> with <minerva-select>) plus the Minerva elements it renders
import "minerva-design/web-components/button";
import "minerva-design/web-components/select";
import "minerva-design/web-components/modal";
```

```html
<!-- no build step: a self-contained ES module (Lit and minerva-design/core included) -->
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/minerva-design@1.22.1/dist/core/tokens.css"
/>
<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/minerva-design@1.22.1/dist/web-components/cdn/minerva.js"
></script>
<!-- unpkg works too: https://unpkg.com/minerva-design@1.22.1/dist/web-components/cdn/minerva.js -->
```

```html
<!-- attributes: strings, kebab-case; booleans are on when present -->
<minerva-input name="email" type="email" placeholder="you@example.com" clearable required></minerva-input>
<minerva-button color="danger" variant="outline" full-width>Delete</minerva-button>

<script type="module">
  const input = document.querySelector("minerva-input");
  input.value = "ada@example.com"; // properties: camelCase, any type
  input.disabled = true;

  // data (arrays, objects, functions) is set as a property only
  document.querySelector("minerva-select").options = [
    { value: "free", label: "Free" },
    { value: "pro", label: "Pro" },
  ];
</script>
```

```ts
const select = document.querySelector("minerva-select");
const output = document.querySelector("#plan-output");

// committed value change: bubbles and crosses shadow roots (composed)
select.addEventListener("minerva-change", (event) => {
  output.textContent = `Plan: ${event.detail.value}`;
});

// "controlled" pattern: open-change events are cancelable
const modal = document.querySelector("minerva-modal");
modal.addEventListener("minerva-open-change", (event) => {
  if (!event.detail.open && hasUnsavedChanges()) {
    event.preventDefault(); // the modal stays open
  }
});
```

```html
<minerva-modal label="Delete project?">
  <p>This cannot be undone.</p>
  <div slot="footer">
    <minerva-button variant="ghost">Cancel</minerva-button>
    <minerva-button color="danger">Delete</minerva-button>
  </div>
</minerva-modal>

<style>
  /* style the parts an element exposes (::part) in its states (:state) */
  minerva-modal:state(open)::part(content) {
    border-radius: 24px;
  }
  minerva-input::part(input) {
    font-variant-numeric: tabular-nums;
  }
</style>
```

```ts
// every element is in HTMLElementTagNameMap: querySelector is typed
const select = document.querySelector("minerva-select"); // MinervaSelect | null
const output = document.querySelector("output"); // HTMLOutputElement | null
select?.addEventListener("minerva-change", () => {
  if (output) output.value = select.value; // string
});

// element classes and their string-literal unions are exported
import type { MinervaButton, ButtonVariant } from "minerva-design/web-components";
```

```ts
// React 19 (global.d.ts)
/// <reference types="minerva-design/web-components/react" />

// Svelte 5 (src/app.d.ts)
/// <reference types="minerva-design/web-components/svelte" />

// Solid (global.d.ts)
/// <reference types="minerva-design/web-components/solid" />

// Vue / Volar (tsconfig.json)
{ "compilerOptions": { "types": ["minerva-design/web-components/vue"] } }
```

```json
// .vscode/settings.json: completion and hover docs in .html files
{
  "html.customData": [
    "./node_modules/minerva-design/dist/web-components/html-custom-data.json"
  ]
}
```

```tsx
// global.d.ts
/// <reference types="minerva-design/web-components/react" />

// Settings.tsx
import { useState } from "react";
import "minerva-design/web-components/switch";

export function Settings() {
  const [on, setOn] = useState(false);
  return (
    <minerva-switch
      label="Email notifications"
      checked={on} // a property: React 19 passes it as is
      onminerva-change={(e: CustomEvent<{ checked: boolean }>) =>
        setOn(e.detail.checked)
      }
    />
  );
}
```

```ts
// Safe on the server: nothing touches the DOM when the module loads, and
// defineElement() skips registration when there is no customElements registry.
import "minerva-design/web-components";

// The markup is sent as is and upgraded in the browser:
// :where(minerva-select, minerva-tabs):not(:defined) { visibility: hidden; }
```

```ts
// Logged in development only, once per message:
// [minerva] <minerva-tabs>: value "billing" does not match any <minerva-tab>.

// Vite, webpack, Rollup (+ replace) and esbuild (define) replace
// process.env.NODE_ENV: production bundles drop the checks and messages.
// The CDN bundle is built for production: no warnings.
```

```ts
import { html, css } from "lit";
import {
  MinervaElement,
  RovingFocusController,
  defineElement,
  hostStyles,
} from "minerva-design/web-components";

/** A toolbar: one Tab stop, arrow keys / Home / End move between buttons. */
export class AppToolbar extends MinervaElement {
  static override tagName = "app-toolbar";
  static override styles = [
    hostStyles,
    css`
      :host {
        display: flex;
        gap: var(--space-2, 8px);
      }
    `,
  ];

  // core's createRovingFocus, attached / destroyed with the element
  private readonly roving = new RovingFocusController(this, () => ({
    getItems: () => [...this.querySelectorAll<HTMLElement>("minerva-button")],
    orientation: "horizontal",
  }));

  override connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "toolbar");
  }

  protected override firstUpdated() {
    this.roving.attach(this);
  }

  protected override render() {
    return html`<slot @slotchange=${() => this.roving.refresh()}></slot>`;
  }
}

defineElement(AppToolbar); // idempotent, no-op without customElements
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: React 19

Minerva custom elements rendered from React state: value, checked and disabled are passed as properties, and onminerva-input / onminerva-change subscribe to the custom events.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/web-components/demos/react.tsx

```tsx
import { useState } from "react";
// Registers every <minerva-*> element (later imports are no-ops). Typings:
// /// <reference types="minerva-design/web-components/react" /> in global.d.ts
import "minerva-design/web-components";

type ValueEvent = CustomEvent<{ value: string }>;
type CheckedEvent = CustomEvent<{ checked: boolean }>;

export default function ReactDemo() {
  const [name, setName] = useState("Ada");
  const [plan, setPlan] = useState("pro");
  const [notify, setNotify] = useState(true);
  const [saved, setSaved] = useState("");

  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 360 }}>
      {/* React 19 sets value / checked / disabled as properties */}
      <minerva-input
        aria-label="Name"
        value={name}
        clearable
        onminerva-input={(e: ValueEvent) => setName(e.detail.value)}
      />
      <minerva-select
        aria-label="Plan"
        value={plan}
        onminerva-change={(e: ValueEvent) => setPlan(e.detail.value)}
      >
        <minerva-option value="free">Free</minerva-option>
        <minerva-option value="pro">Pro</minerva-option>
        <minerva-option value="team">Team</minerva-option>
      </minerva-select>
      <minerva-switch
        label="Email notifications"
        checked={notify}
        onminerva-change={(e: CheckedEvent) => setNotify(e.detail.checked)}
      />
      <minerva-button
        disabled={!name.trim()}
        onClick={() =>
          setSaved(`${name} · ${plan} · ${notify ? "emails on" : "emails off"}`)
        }
      >
        Save
      </minerva-button>
      <output aria-live="polite">{saved || "Nothing saved yet"}</output>
    </div>
  );
}

```

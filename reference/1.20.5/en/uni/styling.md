# Styling & customization

Restyle any Minerva component from your own CSS: design tokens and CSS variables, the public data-minerva / data-part / state hooks, ::part() and :state() for the web components, and the minerva cascade layer.

Package: minerva-design@1.20.5

Renderer: uni

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.5",
  "sourceCommit": "fe15b45f84b480cdd9cfec147df037927ba34a6b",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:0dc58bd28a1a59067b94630bd49c5b94d839bdc57ee30a0eaa7de1d0a9681cfb"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.5/types.json) or getType() from minerva-design/contracts.

## Documentation

### Three public layers

Minerva gives you three stable ways to customize a component, from the lightest touch to the most specific. They are public API: they keep working across minor releases, unlike internal class names and DOM structure.

Design tokens and component CSS variables: colors, radii, spacing, control heights... on :root, a theme scope or any element.

Styling hooks: data-minerva (component), data-part (part) and state attributes (data-state, data-disabled, data-size...) in React; the tag, ::part() and :state() on the web components. Same names in both libraries.

The minerva cascade layer: every library stylesheet ships inside @layer minerva, so your unlayered CSS wins without !important.

### CSS variables

Start with variables: they adapt to the theme and keep the component's own states (hover, focus, disabled) consistent. Each component page lists its ---* variables; tokens are described in Theming. Variables combine with the hooks below: set a variable for one variant, size or state instead of rewriting declarations.

### Styling hooks (React)

Every React component renders data-minerva="" and data-part="" on the elements you can style, and its state as attributes from one shared vocabulary. The root of a component is data-part="root"; parts of portalled overlays (popups, dialogs, toasts) carry data-minerva too, so they are matched wherever they render. Values are rendered on the server exactly as on the client (no hydration mismatch).

Recommended pattern: the compound selector [data-minerva="x"][data-part="y"] (specificity 0,2,0), plus state attributes. It is unaffected by nesting (a Button inside a Modal is its own component) and by portals. Avoid descendant chains of internal class names: they are private and change between releases. To scope a rule, prefix it with your own container class, or add a className to the component (it lands on the root or on the part the prop documents).

### State vocabulary

Every component uses the same state names. In React they are data-* attributes on the root (and on the parts that carry them, such as floating content); on the web components they are custom states of the host element.

Parts follow one vocabulary too: root, label, description, icon, start-icon, end-icon, spinner, trigger, content, overlay, header, body, footer, title, close-button, list, item, item-indicator, group, separator, input, control, thumb, track, indicator... The "Styling hooks" section of each component page lists its parts, selectors and states for React and for the web components.

### Styling items and their states

Repeated elements of a component (menu items, options, tabs, table rows and sorted headers, pages, steps, tree items, calendar days, toasts, files, stars...) have public states of their own: highlighted, selected, disabled, checked, current, expanded, sort, status... They use the same vocabulary as the component states and mirror the ARIA state of the item (aria-selected, aria-checked, aria-current, aria-expanded, aria-sort).

React: the state is an attribute of the item element itself, next to data-minerva and data-part: [data-minerva="menu"][data-part="item"][data-highlighted].

Web components, items rendered in the shadow root: every item state is an extra part name -- (keyed states: ---) next to the part name. Combine them in ::part() — it matches elements carrying all the listed names: minerva-menu::part(item item--highlighted), minerva-data-table::part(header-cell header-cell--sort-ascending). The convention follows Shoelace / Web Awesome (item--selected) and needs no :state() support.

Web components, items that are custom elements of their own (, , , ...): their states are custom states of the item element, like any component: minerva-option:state(selected)::part(root). Attributes you set on these elements yourself ([closable], [disabled]) are stable selectors too.

Item hooks follow the interaction: arrow keys move [data-highlighted] / item--highlighted from item to item, sorting a column switches data-sort, dismissing a toast sets data-state="closed" during its exit animation. Shadow part names and custom states never add an attribute to a host, so server-rendered markup hydrates without mismatches.

The examples below restyle a highlighted menu item, the selected option of a select, the current page, a sorted table header and success toasts, in React and with the web components.

### Cascade layers: @layer minerva

minerva-design/tokens.css, minerva-design/style.css, styles/*.css and minerva-design/tokens.css are wrapped in @layer minerva. Unlayered CSS beats every layer whatever its specificity or source order, so your rules override the library without !important. If your app uses layers, declare the order once, before any stylesheet.

Consequence: unlayered global resets (button { background: none }, normalize.css...) now override Minerva's styles too. Import them into a layer listed before minerva (layer(reset)), as shown above.

### Visual rules: borders and focus

No one-sided borders: Minerva never marks state with a stripe on one edge (no left accent bar on a highlighted item, no underline border on a selected tab, no alert or blockquote stripe, no one-sided inset shadow). Indicators are full shapes: a background fill, a full ring, a rounded pill or a dot. Dividers between rows and sections are separator shapes (a 1px line drawn by a pseudo-element or a separator element), never a border-bottom of the row. Follow the same rule in your overrides; table grid lines and the Divider element itself are the only documented exceptions.

Focus on text-like controls (Input, Textarea, Select trigger, NumberInput, TagInput, AutoComplete, TimePicker, Cascader, JsonField, KeyValueEditor, the Command search, Pagination fields) replaces the native browser outline: the border switches to the focus color and a box-shadow ring surrounds the control. Text fields show it on every focus, mouse included (:focus / :focus-within); triggers that are buttons use :focus-visible. The ring color comes from the theme's --focus-ring-color, tuned per palette for light and dark. Customize it with the variables below, on :root, a theme scope or one control.

Forced colors (Windows High Contrast): box-shadows are not painted there, so every focus rule also sets outline: 2px solid transparent. The system turns that outline into a visible system color, so focus never disappears. Keep it if you restyle the ring.

### Stability policy

The hook surface is machine-readable: minerva-design/styling-hooks exports the manifest (component → parts → states, with their values) the docs are generated from. Contract tests render every React component and every custom element in their states and fail if a documented hook is missing or an undocumented part appears; a lock file (styling-hooks.lock.json) fails the build on any change to the surface until it is updated on purpose.

Minor release: adding a component, a part, a state (component or item state) or a state value.

Major release: removing or renaming any of them, or moving a state to another part.

Not covered: class names, the DOM structure of elements without hooks, and !important overrides of internals.

### Next steps

Themes, palettes and design tokens.

Tokens, themes and locales for the web components.

```css
/* 1. Design tokens: the whole app (or a theme scope) */
:root {
  --primary-color: #7c3aed;
  --radius-md: 10px;
}

/* 2. Component variables (listed on each component page)... */
.toolbar {
  --button-height: 32px;
}

/* 3. ...combined with hooks: variables for one variant / state */
[data-minerva="button"][data-variant="ghost"] {
  --button-radius: 999px;
}
minerva-button:state(variant-ghost) {
  --button-radius: 999px; /* variables inherit into the shadow root */
}
```

```css
/* component root */
[data-minerva="tabs"] { }
/* a part (also matches portalled parts: popups, dialogs) */
[data-minerva="select"][data-part="content"] { }
/* a part in a state */
[data-minerva="modal"][data-part="content"][data-state="open"] { }
/* a part of a component in a state (state on the root) */
[data-minerva="button"][data-loading] [data-part="spinner"] { }
```

```css
/* component: the tag */
minerva-tabs { }
/* a part: ::part() */
minerva-select::part(content) { }
/* states are custom states of the host: :state() */
minerva-modal:state(open)::part(content) { }
minerva-button:state(loading)::part(spinner) { }
minerva-button:state(size-small):state(variant-ghost) { }
```

```css
/* React: item states are attributes of the item element itself */
[data-minerva="menu"][data-part="item"][data-highlighted] { }
[data-minerva="menu"][data-part="item"][data-state="checked"] { }
[data-minerva="option"][data-selected] { }
[data-minerva="pagination"][data-part="item"][data-current] { }
[data-minerva="data-table"][data-part="header-cell"][data-sort="ascending"] { }
[data-minerva="toast-region"][data-part="toast"][data-color="success"] { }
/* the trigger of a menu (a native element child) while the menu is open */
[data-minerva="menu"][data-part="trigger"][data-state="open"] { }

/* Web components, items in the shadow root: <part>--<state> part names */
minerva-menu::part(item item--highlighted) { }
minerva-menu::part(item item--checked) { }
minerva-select::part(item item--selected) { }
minerva-pagination::part(item item--current) { }
minerva-data-table::part(header-cell header-cell--sort-ascending) { }
minerva-toast-region::part(toast toast--color-success) { }
minerva-upload::part(item item--status-error) { }

/* Web components, items that are elements of their own: :state() */
minerva-option:state(selected)::part(root) { }
minerva-tab:state(active)::part(root) { }
minerva-page-tab:state(current) { }
/* your slotted trigger, from the states of its host */
minerva-menu:state(open) > [slot="trigger"] { }
```

```css
/* The library ships inside @layer minerva: unlayered rules win,
   whatever their specificity or order */
.my-button {
  border-radius: 0; /* beats the library, no !important */
}

/* Layered app? Declare the order once, before any stylesheet */
@layer reset, minerva, app;

/* Tailwind CSS v4 */
@layer theme, base, minerva, components, utilities;

/* Unlayered resets now beat the library too: layer them */
@import url("modern-normalize.css") layer(reset);
```

```css
/* The focus ring of every text-like control. Unset by default: the
   ring falls back to the theme's --focus-ring-color (per palette, light
   and dark), a 3px width and --primary-color for the border */
:root {
  --minerva-focus-ring-width: 4px;
  --minerva-focus-border-color: var(--primary-color-text);
}

/* One control: component variables still win for the border */
.search-field {
  --input-focus-color: var(--success-color);
  --minerva-focus-ring-color: color-mix(in srgb, var(--success-color) 45%, transparent);
}

/* Restyling the ring yourself? Keep the transparent outline:
   forced colors (High Contrast) paint it, box-shadows are dropped */
[data-minerva="input"][data-part="root"]:focus-within {
  box-shadow: 0 0 0 2px var(--primary-color);
  outline: 2px solid transparent;
}
```

```ts
import { stylingHooks, wcSelector } from "minerva-design/styling-hooks";

stylingHooks.modal.parts; // overlay, content, header, description, body, footer, close-button
stylingHooks.modal.states; // { state: ["open", "closed"], size: [...] }
wcSelector("modal", "content", { state: "open" });
// "minerva-modal:state(open)::part(content)"
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

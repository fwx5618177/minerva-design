# Styling & customization

Restyle any Minerva component from your own CSS: design tokens and CSS variables, the public data-minerva / data-part / state hooks, ::part() and :state() for the web components, and the minerva cascade layer.

Package: minerva-design@1.22.0

Renderer: react

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.0",
  "sourceCommit": "330c90a7382a7141543dcdad732a4da31d58a37e",
  "sourceDigest": "sha256:cbdfa6292d29dec33adda7a3e9cf0e027da50858956b8d08e3f7f3ed59c8d78a",
  "referenceSourceDigest": "sha256:e3be8c06635194769da4944bbccaf8bcffec3fe4bddbd369b74caf5e4553345b"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.0/types.json) or getType() from minerva-design/contracts.

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

## Example: Highlighted menu item

Open a menu and move with the arrow keys: the highlighted item gets a tinted background and a bar, checked items are bold, disabled ones struck through. React panels are scoped with the menu className; the web component uses ::part(item item--highlighted).

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/styling/demos/items-menu.tsx

```tsx
import { Button, HStack, Menu } from "minerva-design";
import "minerva-design/web-components";

const css = `
/* the highlighted item follows the keyboard (arrows) and the pointer
   (React: the panel is portalled, scope it with its className) */
.accent-menu [data-minerva="menu"][data-part="item"][data-highlighted],
minerva-menu.accent-menu::part(item item--highlighted) {
  background: color-mix(in srgb, var(--primary-color) 18%, transparent);
  color: var(--primary-color);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--primary-color) 40%, transparent);
}
/* checked checkbox / radio items, disabled items */
.accent-menu [data-minerva="menu"][data-part="item"][data-state="checked"],
minerva-menu.accent-menu::part(item item--checked) {
  font-weight: 600;
}
.accent-menu [data-minerva="menu"][data-part="item"][data-disabled],
minerva-menu.accent-menu::part(item item--disabled) {
  text-decoration: line-through;
}
`;

export default function ItemsMenu() {
  return (
    <HStack gap={16} wrap className="accent-menu-demo">
      <style>{css}</style>
      <Menu
        className="accent-menu"
        items={[
          { key: "edit", label: "Edit", shortcut: "⌘E" },
          { key: "copy", label: "Duplicate", shortcut: "⌘D" },
          {
            type: "checkbox",
            key: "pin",
            label: "Pinned",
            defaultChecked: true,
          },
          { key: "delete", label: "Delete", disabled: true },
        ]}
      >
        <Button color="neutral" variant="outline">
          React menu
        </Button>
      </Menu>
      <minerva-menu class="accent-menu">
        <minerva-button slot="trigger" color="neutral" variant="outline">
          Web Component menu
        </minerva-button>
        <minerva-menu-item value="edit" shortcut="⌘E">
          Edit
        </minerva-menu-item>
        <minerva-menu-item value="copy" shortcut="⌘D">
          Duplicate
        </minerva-menu-item>
        <minerva-menu-checkbox-item value="pin" checked>
          Pinned
        </minerva-menu-checkbox-item>
        <minerva-menu-item value="delete" disabled>
          Delete
        </minerva-menu-item>
      </minerva-menu>
    </HStack>
  );
}

```

## Example: Current pagination page

Round page buttons with a ringed current page ([data-current] / item--current) and faded disabled previous / next buttons.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/styling/demos/items-pagination.tsx

```tsx
import { Pagination, VStack } from "minerva-design";
import "minerva-design/web-components";

const css = `
.ring-pages [data-minerva="pagination"][data-part="item"],
.ring-pages minerva-pagination::part(item) {
  border-radius: 999px;
}
/* the current page: aria-current="page" mirrored as a public hook */
.ring-pages [data-minerva="pagination"][data-part="item"][data-current],
.ring-pages minerva-pagination::part(item item--current) {
  background: transparent;
  color: var(--primary-color);
  box-shadow: inset 0 0 0 2px var(--primary-color);
  font-weight: 700;
}
.ring-pages [data-minerva="pagination"][data-part="item"][data-disabled],
.ring-pages minerva-pagination::part(item item--disabled) {
  opacity: 0.3;
}
`;

export default function ItemsPagination() {
  return (
    <VStack className="ring-pages" gap={16}>
      <style>{css}</style>
      <Pagination defaultCurrent={1} total={50} aria-label="React pages" />
      <minerva-pagination
        current={1}
        total={50}
        aria-label="Web Component pages"
      />
    </VStack>
  );
}

```

## Example: Selected select option

The selected option is filled, the highlighted one outlined. React options are SelectItem components (data-minerva="option"); the web component rendered from the options property exposes ::part(item item--selected), and <minerva-option> children their own :state(selected).

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/styling/demos/items-select.tsx

```tsx
import { HStack, Select, SelectItem } from "minerva-design";
import "minerva-design/web-components";

const options = [
  { value: "en", label: "English" },
  { value: "zh", label: "Chinese" },
  { value: "fr", label: "French" },
  { value: "ja", label: "Japanese", disabled: true },
];

const css = `
/* React options are SelectItem components: data-minerva="option" */
.bold-options [data-minerva="option"][data-selected],
minerva-select.bold-options::part(item item--selected),
minerva-option.bold-option:state(selected)::part(root) {
  background: var(--primary-color);
  color: #fff;
  font-weight: 600;
}
.bold-options [data-minerva="option"][data-highlighted]:not([data-selected]),
minerva-select.bold-options::part(item item--highlighted),
minerva-option.bold-option:state(highlighted)::part(root) {
  outline: 2px dashed var(--primary-color);
  outline-offset: -2px;
}
`;

export default function ItemsSelect() {
  return (
    <HStack gap={16} wrap>
      <style>{css}</style>
      <div style={{ width: 200 }}>
        <Select
          aria-label="Language (React)"
          defaultValue="zh"
          contentClassName="bold-options"
        >
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div style={{ width: 200 }}>
        {/* options property: items rendered in the shadow root (::part) */}
        <minerva-select
          class="bold-options"
          aria-label="Language (options property)"
          value="zh"
          options={options}
        />
      </div>
      <div style={{ width: 200 }}>
        {/* <minerva-option> children: elements of their own (:state) */}
        <minerva-select aria-label="Language (minerva-option)" value="zh">
          {options.map((option) => (
            <minerva-option
              key={option.value}
              class="bold-option"
              value={option.value}
              disabled={option.disabled || undefined}
            >
              {option.label}
            </minerva-option>
          ))}
        </minerva-select>
      </div>
    </HStack>
  );
}

```

## Example: Sorted table header

Click a header to sort: the sorted column header is underlined (data-sort / header-cell--sort-<direction>), unsorted sortable headers are muted, selected rows tinted.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/styling/demos/items-table.tsx

```tsx
import { Table, VStack, type TableColumn } from "minerva-design";
import "minerva-design/web-components";

interface Service {
  id: number;
  name: string;
  latency: number;
}

const services: Service[] = [
  { id: 1, name: "auth-api", latency: 42 },
  { id: 2, name: "billing", latency: 118 },
  { id: 3, name: "search", latency: 73 },
];

const columns: TableColumn<Service>[] = [
  { key: "name", header: "Service", sortable: true },
  {
    key: "latency",
    header: "Latency",
    align: "right",
    sortable: (a, b) => a.latency - b.latency,
  },
];

const css = `
/* sorted column header: data-sort / header-cell--sort-<direction> */
.sorted-headers [data-minerva="data-table"][data-part="header-cell"][data-sort="ascending"],
.sorted-headers [data-minerva="data-table"][data-part="header-cell"][data-sort="descending"],
.sorted-headers minerva-data-table::part(header-cell header-cell--sort-ascending),
.sorted-headers minerva-data-table::part(header-cell header-cell--sort-descending) {
  color: var(--primary-color);
  box-shadow: inset 0 -3px 0 var(--primary-color);
}
.sorted-headers [data-minerva="data-table"][data-part="header-cell"][data-sort="none"],
.sorted-headers minerva-data-table::part(header-cell header-cell--sort-none) {
  color: var(--text-secondary-color);
}
/* selected rows */
.sorted-headers [data-minerva="data-table"][data-part="row"][data-selected] [data-part="cell"],
.sorted-headers minerva-data-table::part(row row--selected) {
  background: color-mix(in srgb, var(--primary-color) 12%, transparent);
}
`;

export default function ItemsTable() {
  return (
    <VStack className="sorted-headers" gap={24}>
      <style>{css}</style>
      <Table
        aria-label="Services (React)"
        columns={columns}
        data={services}
        rowKey={(row) => row.id}
        defaultSortState={{ key: "latency", order: "ascend" }}
        rowSelection={{ defaultSelectedRowKeys: [2] }}
      />
      <minerva-data-table
        aria-label="Services (Web Component)"
        row-key="id"
        columns={columns}
        rows={services}
        sortState={{ key: "latency", order: "ascend" }}
        selectable
        selectedRowKeys={[2]}
      />
    </VStack>
  );
}

```

## Example: Success toasts

Success toasts get a green outline and background, and leaving toasts fade while data-state="closed" / toast--closed. React toasts are portalled: the compound selector still matches them.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/styling/demos/items-toast.tsx

```tsx
import { useRef } from "react";
import { Button, HStack, ToastProvider, toast } from "minerva-design";
import "minerva-design/web-components";

type Region = HTMLElement & {
  toast: { success: (title: string) => void; info: (title: string) => void };
};

const css = `
/* React toasts are portalled to the toast region: the compound selector
   matches them wherever they render */
[data-minerva="toast-region"][data-part="toast"][data-color="success"],
minerva-toast-region.success-toasts::part(toast toast--color-success) {
  /* a full outline, not a one-sided stripe */
  border-color: var(--success-color);
  box-shadow: inset 0 0 0 1px var(--success-color);
  background: var(--success-color-subtle);
}
/* leaving toast (data-state="closed" during its exit animation) */
[data-minerva="toast-region"][data-part="toast"][data-state="closed"],
minerva-toast-region.success-toasts::part(toast toast--closed) {
  opacity: 0.4;
}
`;

export default function ItemsToast() {
  const region = useRef<Region>(null);
  return (
    <HStack gap={8} wrap>
      <style>{css}</style>
      {/* mount one ToastProvider near the root of an app */}
      <ToastProvider position="bottom-right" />
      <Button color="success" onClick={() => toast.success("Saved (React)")}>
        React success toast
      </Button>
      <Button
        color="success"
        variant="outline"
        onClick={() => region.current?.toast.success("Saved (Web Component)")}
      >
        Web Component success toast
      </Button>
      <minerva-toast-region
        ref={region}
        class="success-toasts"
        position="bottom-left"
      />
    </HStack>
  );
}

```

## Example: Restyle Button

Pill-shaped buttons through --button-* variables, a thicker outline variant, uppercase labels and a colored spinner while loading: React (data-* hooks) on the first row, <minerva-button> (::part() / :state()) on the second.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/styling/demos/restyle-button.tsx

```tsx
import { Button, HStack, VStack } from "minerva-design";
import "minerva-design/web-components";

// Plain, unlayered CSS: it wins over the library (inside @layer minerva)
// without !important. Variables and hooks combine.
const css = `
.pill-buttons [data-minerva="button"][data-part="root"],
.pill-buttons minerva-button {
  --button-radius: 999px;
  --button-padding-x: 20px;
}
.pill-buttons [data-minerva="button"][data-part="root"][data-variant="outline"] {
  border-width: 2px;
}
.pill-buttons minerva-button:state(variant-outline)::part(root) {
  border-width: 2px;
}
.pill-buttons [data-minerva="button"][data-part="label"],
.pill-buttons minerva-button::part(label) {
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.pill-buttons [data-minerva="button"][data-loading] [data-part="spinner"],
.pill-buttons minerva-button:state(loading)::part(spinner) {
  color: var(--warning-color);
}
`;

export default function RestyleButton() {
  return (
    <VStack className="pill-buttons" gap={12}>
      <style>{css}</style>
      <HStack gap={8} wrap>
        <Button>React</Button>
        <Button variant="outline">Outline</Button>
        <Button loading variant="ghost">
          Saving
        </Button>
      </HStack>
      <HStack gap={8} wrap>
        <minerva-button>Web Component</minerva-button>
        <minerva-button variant="outline">Outline</minerva-button>
        <minerva-button loading variant="ghost">
          Saving
        </minerva-button>
      </HStack>
    </VStack>
  );
}

```

## Example: Restyle Modal

A blurred overlay, a bordered panel and a colored title while open. The React panel is portalled to <body>; the compound [data-minerva][data-part] selector still matches it.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/styling/demos/restyle-modal.tsx

```tsx
import {
  Button,
  HStack,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalRoot,
  ModalTrigger,
} from "minerva-design";
import "minerva-design/web-components";

// The React content is portalled to <body>: the compound selector
// [data-minerva][data-part] matches it wherever it renders (a class on the
// trigger's container would not).
const css = `
[data-minerva="modal"][data-part="overlay"].glass-overlay,
minerva-modal.glass::part(overlay) {
  backdrop-filter: blur(6px);
}
[data-minerva="modal"][data-part="content"].glass-content,
minerva-modal.glass::part(content) {
  border: 1px solid var(--primary-color);
  box-shadow: 0 24px 48px color-mix(in srgb, var(--primary-color) 25%, transparent);
}
[data-minerva="modal"][data-part="content"][data-state="open"].glass-content [data-part="header"],
minerva-modal.glass:state(open)::part(header) {
  color: var(--primary-color);
}
`;

export default function RestyleModal() {
  return (
    <HStack gap={8} wrap>
      <style>{css}</style>
      <ModalRoot>
        <ModalTrigger asChild>
          <Button variant="outline">React modal</Button>
        </ModalTrigger>
        <ModalContent
          className="glass-content"
          overlayClassName="glass-overlay"
        >
          <ModalHeader>Restyled with hooks</ModalHeader>
          <ModalBody>
            The overlay, panel and title are styled from the page.
          </ModalBody>
        </ModalContent>
      </ModalRoot>
      <minerva-modal class="glass" label="Restyled with hooks">
        <minerva-button slot="trigger" variant="outline">
          Web Component modal
        </minerva-button>
        The overlay, panel and title are styled from the page.
      </minerva-modal>
    </HStack>
  );
}

```

## Example: Restyle Table

Uppercase header cells and a highlighted hovered row through the data table's parts, plus zebra rows in React (::part() only accepts user-action pseudo-classes such as :hover, not :nth-child).

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/styling/demos/restyle-table.tsx

```tsx
import { Table, VStack, type TableColumn } from "minerva-design";
import "minerva-design/web-components";

interface Book {
  id: number;
  title: string;
  author: string;
  score: number;
}

const books: Book[] = [
  { id: 1, title: "Dune", author: "Frank Herbert", score: 9.1 },
  { id: 2, title: "Solaris", author: "Stanisław Lem", score: 8.7 },
  { id: 3, title: "Hyperion", author: "Dan Simmons", score: 8.9 },
];

const columns: TableColumn<Book>[] = [
  { key: "title", header: "Title" },
  { key: "author", header: "Author" },
  { key: "score", header: "Score", align: "right" },
];

const css = `
.ledger [data-minerva="data-table"][data-part="header-cell"],
.ledger minerva-data-table::part(header-cell) {
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-size: 12px;
  color: var(--primary-color);
}
/* ::part() only takes user-action pseudo-classes (:hover, :focus-visible...):
   keep structural ones (:nth-child) in a React-only rule */
.ledger [data-minerva="data-table"][data-part="row"]:nth-child(even) [data-part="cell"] {
  background: color-mix(in srgb, var(--primary-color) 6%, transparent);
}
.ledger [data-minerva="data-table"][data-part="row"]:hover [data-part="cell"],
.ledger minerva-data-table::part(row):hover {
  background: color-mix(in srgb, var(--primary-color) 14%, transparent);
}
`;

export default function RestyleTable() {
  return (
    <VStack className="ledger" gap={24}>
      <style>{css}</style>
      <Table
        aria-label="Books (React)"
        columns={columns}
        data={books}
        rowKey={(book) => book.id}
      />
      <minerva-data-table
        aria-label="Books (Web Component)"
        row-key="id"
        columns={columns}
        rows={books}
      />
    </VStack>
  );
}

```

## Example: Restyle Tabs

Rounded pill tabs with a tinted, fully outlined active tab and a muted disabled one, from the tab component's state hooks.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/styling/demos/restyle-tabs.tsx

```tsx
import { Tab, TabList, TabPanel, Tabs, VStack } from "minerva-design";
import "minerva-design/web-components";

const css = `
/* Library rule: no one-sided borders. The active tab is a full shape (a
   tinted pill with a full ring), not an underline. */
.pill-tabs [data-minerva="tabs"][data-part="list"],
.pill-tabs minerva-tabs::part(list) {
  gap: 4px;
}
.pill-tabs [data-minerva="tab"][data-part="root"],
.pill-tabs minerva-tab::part(root) {
  border-radius: 999px;
  font-weight: 500;
}
.pill-tabs [data-minerva="tab"][data-state="active"],
.pill-tabs minerva-tab:state(active)::part(root) {
  color: var(--primary-color-text);
  background: var(--primary-color-subtle);
  box-shadow: inset 0 0 0 1px var(--primary-color);
}
.pill-tabs [data-minerva="tab"][data-disabled],
.pill-tabs minerva-tab:state(disabled)::part(root) {
  opacity: 0.4;
}
`;

export default function RestyleTabs() {
  return (
    <VStack className="pill-tabs" gap={24}>
      <style>{css}</style>
      <Tabs defaultValue="overview" variant="soft">
        <TabList aria-label="React tabs">
          <Tab value="overview">Overview</Tab>
          <Tab value="activity">Activity</Tab>
          <Tab value="archive" disabled>
            Archive
          </Tab>
        </TabList>
        <TabPanel value="overview">React: data-* hooks</TabPanel>
        <TabPanel value="activity">Activity</TabPanel>
        <TabPanel value="archive">Archive</TabPanel>
      </Tabs>
      <minerva-tabs value="overview" variant="soft" label="Web Component tabs">
        <minerva-tab value="overview">Overview</minerva-tab>
        <minerva-tab value="activity">Activity</minerva-tab>
        <minerva-tab value="archive" disabled>
          Archive
        </minerva-tab>
        <minerva-tab-panel value="overview">
          Web Components: ::part() and :state()
        </minerva-tab-panel>
        <minerva-tab-panel value="activity">Activity</minerva-tab-panel>
        <minerva-tab-panel value="archive">Archive</minerva-tab-panel>
      </minerva-tabs>
    </VStack>
  );
}

```

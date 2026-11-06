# Tabs

Organise le contenu en panneaux affichés un par un. Onglets accessibles avec navigation aux flèches, variantes line / enclosed / soft / pills, couleurs sémantiques et orientation verticale.

Package: minerva-design@1.21.1

Renderer: wc

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.1",
  "sourceCommit": "8b898b8bac966669d23d1fba972e2a3289cdb5b5",
  "sourceDigest": "sha256:a33fb5e0b8f01ae452ce95d2b723ab0cd9905636d574c72fd12c1459f4c09d3a",
  "referenceSourceDigest": "sha256:8ed3473bb098d663e523782b06fce57a42cde419daa8bbcc5c6b1f0e37e3e50e"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.1/types.json) or getType() from minerva-design/contracts.

## Documentation

## Tab

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/tab",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "value",
    "typeText": "string",
    "attribute": "value",
    "required": false
  },
  {
    "name": "disabled",
    "typeText": "boolean",
    "attribute": "disabled",
    "required": false
  },
  {
    "name": "color",
    "typeText": "\"primary\" | \"neutral\" | \"success\" | \"warning\" | \"danger\" | \"info\" | undefined",
    "attribute": "color",
    "required": false
  },
  {
    "name": "selected",
    "typeText": "boolean",
    "attribute": "selected",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "description": "Tab content"
  }
]
```

## TabList

Support: n/a

React-only API (composition part or provider); the custom elements cover it with attributes or the parent element.

## TabPanel

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/tab-panel",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "value",
    "typeText": "string",
    "attribute": "value",
    "required": false
  },
  {
    "name": "forceMount",
    "typeText": "boolean",
    "attribute": "force-mount",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "description": "Panel content (or a `<template>` stamped only while active)"
  }
]
```

## Tabs

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/tabs",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "value",
    "typeText": "string | undefined",
    "attribute": "value",
    "required": false
  },
  {
    "name": "variant",
    "typeText": "\"line\" | \"enclosed\" | \"soft\" | \"pills\"",
    "attribute": "variant",
    "required": false
  },
  {
    "name": "color",
    "typeText": "\"primary\" | \"neutral\" | \"success\" | \"warning\" | \"danger\" | \"info\"",
    "attribute": "color",
    "required": false
  },
  {
    "name": "orientation",
    "typeText": "\"horizontal\" | \"vertical\"",
    "attribute": "orientation",
    "required": false
  },
  {
    "name": "activationMode",
    "typeText": "\"automatic\" | \"manual\"",
    "attribute": "activation-mode",
    "required": false
  },
  {
    "name": "noLoop",
    "typeText": "boolean",
    "attribute": "no-loop",
    "required": false
  },
  {
    "name": "label",
    "typeText": "string",
    "attribute": "label",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "minerva-change",
    "typeText": "CustomEvent<{ value: string; }>",
    "detailType": {
      "typeText": "{ value: string; }",
      "typeRef": "type:cbd8724ac5dadadf272f"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": true,
    "description": "The user selected a tab (`detail: { value }`); cancelable: `preventDefault()` keeps the current selection (controlled pattern)"
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "description": "`<minerva-tab-panel>` elements"
  },
  {
    "name": "tab",
    "description": "`<minerva-tab>` elements (assigned automatically)"
  }
]
```

## API

```json
{
  "wc:minerva-tabs": {
    "kind": "element",
    "source": "web-components/src/components/tabs/tabs.ts",
    "className": "MinervaTabs",
    "summary": "Tabs with a tablist, roving focus and automatic or manual activation.",
    "description": "Accessible tabs (WAI-ARIA tabs pattern, `<Tabs>` / `<TabList>` of React) with line / enclosed / soft / pills variants, semantic colors and horizontal or vertical orientation. Tabs (`<minerva-tab>`) and panels (`<minerva-tab-panel>`) are light DOM children paired by `value`; the element renders the `role=\"tablist\"` around the tabs (they go to the `tab` slot automatically) and wires `aria-selected` / `aria-controls` / `aria-labelledby` with ids in the light DOM. Arrow keys (per orientation and direction), Home and End move focus among the enabled tabs (core roving focus); with `activation-mode=\"automatic\"` the focused tab is selected, with `\"manual\"` only Enter / Space / click select.",
    "properties": [
      {
        "name": "value",
        "attribute": "value",
        "type": "string | undefined",
        "description": "Value of the selected tab"
      },
      {
        "name": "variant",
        "attribute": "variant",
        "type": "\"line\" | \"enclosed\" | \"soft\" | \"pills\"",
        "default": "\"line\"",
        "description": "Visual style"
      },
      {
        "name": "color",
        "attribute": "color",
        "type": "\"primary\" | \"neutral\" | \"success\" | \"warning\" | \"danger\" | \"info\"",
        "default": "\"primary\"",
        "description": "Color of the selection"
      },
      {
        "name": "orientation",
        "attribute": "orientation",
        "type": "\"horizontal\" | \"vertical\"",
        "default": "\"horizontal\"",
        "description": "Layout and arrow-key direction"
      },
      {
        "name": "activationMode",
        "attribute": "activation-mode",
        "type": "\"automatic\" | \"manual\"",
        "default": "\"automatic\"",
        "description": "`automatic` selects a tab when it receives focus; `manual` only on Enter / Space / click"
      },
      {
        "name": "noLoop",
        "attribute": "no-loop",
        "type": "boolean",
        "default": "false",
        "description": "Stops arrow keys at the first / last tab instead of wrapping"
      },
      {
        "name": "label",
        "attribute": "label",
        "type": "string",
        "default": "\"\"",
        "description": "Accessible name of the tab list (`aria-label` / `aria-labelledby` on the element work too)"
      },
      {
        "name": "tabs",
        "type": "MinervaTab[]",
        "readonly": true,
        "description": "The `<minerva-tab>` elements of this group (not of nested groups)."
      },
      {
        "name": "panels",
        "type": "MinervaTabPanel[]",
        "readonly": true,
        "description": "The `<minerva-tab-panel>` elements of this group."
      }
    ],
    "methods": [
      {
        "name": "select",
        "signature": "(value: string) => void",
        "description": "Called by a tab (click / Enter / Space / focus): selects `value`."
      }
    ],
    "events": [
      {
        "name": "minerva-change",
        "description": "The user selected a tab (`detail: { value }`); cancelable: `preventDefault()` keeps the current selection (controlled pattern)"
      }
    ],
    "slots": [
      {
        "name": "",
        "description": "`<minerva-tab-panel>` elements"
      },
      {
        "name": "tab",
        "description": "`<minerva-tab>` elements (assigned automatically)"
      }
    ],
    "parts": [
      {
        "name": "root",
        "description": "The root wrapper of the tab list and the panels"
      },
      {
        "name": "list",
        "description": "The role=tablist container of the tabs"
      }
    ],
    "cssProperties": [
      {
        "name": "--tabs-gap",
        "description": "Space between the tabs of the list"
      },
      {
        "name": "--tabs-font-size",
        "description": "Font size of the tabs"
      },
      {
        "name": "--tabs-trigger-padding-x",
        "description": "Horizontal padding of a tab (every variant)"
      },
      {
        "name": "--tabs-trigger-padding-y",
        "description": "Vertical padding of a tab (every variant)"
      },
      {
        "name": "--tabs-trigger-min-height",
        "description": "Minimum height of a tab (pills default to the density's control height minus 4px)"
      },
      {
        "name": "--tabs-radius",
        "description": "Corner radius of enclosed / soft / pill tabs (defaults to --radius-md)"
      },
      {
        "name": "--tabs-indicator-width",
        "description": "Thickness of the line indicator"
      },
      {
        "name": "--tabs-panel-padding",
        "description": "Padding of the panel"
      }
    ]
  },
  "wc:minerva-tab": {
    "kind": "element",
    "source": "web-components/src/components/tabs/tabs.ts",
    "className": "MinervaTab",
    "summary": "A `role=\"tab\"` trigger of `<minerva-tabs>`.",
    "description": "A tab of a `<minerva-tabs>` (`<Tab>` of React). The element itself is the `role=\"tab\"` (focusable, `aria-selected`, `aria-controls` pointing at the panel with the same `value`).",
    "properties": [
      {
        "name": "value",
        "attribute": "value",
        "type": "string",
        "default": "\"\"",
        "description": "Value identifying the tab and its panel (must not contain whitespace)"
      },
      {
        "name": "disabled",
        "attribute": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disables the tab (skipped by arrow keys)"
      },
      {
        "name": "color",
        "attribute": "color",
        "type": "\"primary\" | \"neutral\" | \"success\" | \"warning\" | \"danger\" | \"info\" | undefined",
        "description": "Overrides the group color (the tab stays tinted while inactive)"
      },
      {
        "name": "selected",
        "attribute": "selected",
        "type": "boolean",
        "default": "false",
        "description": "Whether the tab is the selected one (set by `<minerva-tabs>`)"
      }
    ],
    "methods": [],
    "events": [],
    "slots": [
      {
        "name": "",
        "description": "Tab content"
      }
    ],
    "parts": [
      {
        "name": "root",
        "description": "The visual tab trigger"
      }
    ],
    "cssProperties": [
      {
        "name": "--tabs-gap",
        "description": "Space between the tabs of the list"
      },
      {
        "name": "--tabs-font-size",
        "description": "Font size of the tabs"
      },
      {
        "name": "--tabs-trigger-padding-x",
        "description": "Horizontal padding of a tab (every variant)"
      },
      {
        "name": "--tabs-trigger-padding-y",
        "description": "Vertical padding of a tab (every variant)"
      },
      {
        "name": "--tabs-trigger-min-height",
        "description": "Minimum height of a tab (pills default to the density's control height minus 4px)"
      },
      {
        "name": "--tabs-radius",
        "description": "Corner radius of enclosed / soft / pill tabs (defaults to --radius-md)"
      },
      {
        "name": "--tabs-indicator-width",
        "description": "Thickness of the line indicator"
      },
      {
        "name": "--tabs-panel-padding",
        "description": "Padding of the panel"
      }
    ]
  },
  "wc:minerva-tab-panel": {
    "kind": "element",
    "source": "web-components/src/components/tabs/tabs.ts",
    "className": "MinervaTabPanel",
    "summary": "A `role=\"tabpanel\"` of `<minerva-tabs>`.",
    "description": "The `role=\"tabpanel\"` content of the tab with the same `value` (`<TabPanel>` of React). Inactive panels: React's `<TabPanel>` unmounts them by default and keeps them in the DOM with `hidden` only with `forceMount`. Light DOM children belong to the page, so a custom element cannot unmount them: regular children behave like React's `forceMount` (the panel is `hidden`, its content stays in the DOM, keeps its state and its form fields are still submitted). For React's default semantics, put the content in a `<template>` child: it is stamped while the panel is active and removed when it becomes inactive (state reset, elements disconnected, nothing submitted); add `force-mount` to keep it mounted (hidden) while inactive, like `forceMount`.",
    "properties": [
      {
        "name": "value",
        "attribute": "value",
        "type": "string",
        "default": "\"\"",
        "description": "Value of the tab this panel belongs to"
      },
      {
        "name": "forceMount",
        "attribute": "force-mount",
        "type": "boolean",
        "default": "false",
        "description": "Mounts the content of a `<template>` child even while the panel is inactive (hidden), like React's `forceMount`. Regular children are always mounted"
      }
    ],
    "methods": [],
    "events": [],
    "slots": [
      {
        "name": "",
        "description": "Panel content (or a `<template>` stamped only while active)"
      }
    ],
    "parts": [
      {
        "name": "root",
        "description": "The panel wrapper"
      }
    ],
    "cssProperties": [
      {
        "name": "--tabs-gap",
        "description": "Space between the tabs of the list"
      },
      {
        "name": "--tabs-font-size",
        "description": "Font size of the tabs"
      },
      {
        "name": "--tabs-trigger-padding-x",
        "description": "Horizontal padding of a tab (every variant)"
      },
      {
        "name": "--tabs-trigger-padding-y",
        "description": "Vertical padding of a tab (every variant)"
      },
      {
        "name": "--tabs-trigger-min-height",
        "description": "Minimum height of a tab (pills default to the density's control height minus 4px)"
      },
      {
        "name": "--tabs-radius",
        "description": "Corner radius of enclosed / soft / pill tabs (defaults to --radius-md)"
      },
      {
        "name": "--tabs-indicator-width",
        "description": "Thickness of the line indicator"
      },
      {
        "name": "--tabs-panel-padding",
        "description": "Padding of the panel"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:Tabs": {
    "kind": "cssVars",
    "source": "react/src/components/Tabs",
    "vars": [
      {
        "name": "--tabs-gap",
        "description": "Space between the tabs of the list"
      },
      {
        "name": "--tabs-font-size",
        "description": "Font size of the tabs"
      },
      {
        "name": "--tabs-trigger-padding-x",
        "description": "Horizontal padding of a tab (every variant)"
      },
      {
        "name": "--tabs-trigger-padding-y",
        "description": "Vertical padding of a tab (every variant)"
      },
      {
        "name": "--tabs-trigger-min-height",
        "description": "Minimum height of a tab (pills default to the density's control height minus 4px)"
      },
      {
        "name": "--tabs-radius",
        "description": "Corner radius of enclosed / soft / pill tabs (defaults to --radius-md)"
      },
      {
        "name": "--tabs-indicator-width",
        "description": "Thickness of the line indicator"
      },
      {
        "name": "--tabs-panel-padding",
        "description": "Padding of the panel"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Utilisation de base

Les éléments <minerva-tab> rejoignent automatiquement la liste d’onglets ; chaque <minerva-tab-panel> est lié à l’onglet de même value. label nomme la liste ; les flèches ignorent les onglets désactivés.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/tabs/wc/basic.html

```html
<minerva-tabs label="Account settings" value="profile">
  <minerva-tab value="profile">Profile</minerva-tab>
  <minerva-tab value="security">Security</minerva-tab>
  <minerva-tab value="billing" disabled>Billing</minerva-tab>
  <minerva-tab value="notifications">Notifications</minerva-tab>
  <minerva-tab-panel value="profile"
    >Your name, avatar and bio.</minerva-tab-panel
  >
  <minerva-tab-panel value="security"
    >Password and two-factor authentication.</minerva-tab-panel
  >
  <minerva-tab-panel value="billing"
    >Invoices and payment methods.</minerva-tab-panel
  >
  <minerva-tab-panel value="notifications"
    >Email and push preferences.</minerva-tab-panel
  >
</minerva-tabs>

```

## Example: Annuler un changement

minerva-change est annulable : tant que la case est cochée, preventDefault() conserve l’onglet courant. Décochez-la pour changer d’onglet.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/tabs/wc/controlled.html

```html
<div style="display: grid; gap: 12px">
  <label style="display: flex; gap: 8px; align-items: center">
    <input id="dirty" type="checkbox" checked />
    Unsaved changes in the current tab
  </label>
  <minerva-tabs id="editor" label="Editor" value="draft">
    <minerva-tab value="draft">Draft</minerva-tab>
    <minerva-tab value="preview">Preview</minerva-tab>
    <minerva-tab value="history">History</minerva-tab>
    <minerva-tab-panel value="draft"
      >Write your article here.</minerva-tab-panel
    >
    <minerva-tab-panel value="preview">Rendered article.</minerva-tab-panel>
    <minerva-tab-panel value="history">Previous versions.</minerva-tab-panel>
  </minerva-tabs>
  <output id="status" aria-live="polite"></output>
</div>

```

### apps/docs/src/docs/pages/tabs/wc/controlled.ts

```tsx
// minerva-change is cancelable: preventDefault() keeps the current tab, e.g.
// while the open tab has unsaved changes.
export function setup(root: HTMLElement) {
  const tabs = root.querySelector<HTMLElement>("#editor")!;
  const dirty = root.querySelector<HTMLInputElement>("#dirty")!;
  const status = root.querySelector<HTMLOutputElement>("#status")!;
  const onChange = (event: Event) => {
    const { value } = (event as CustomEvent<{ value: string }>).detail;
    if (dirty.checked) {
      event.preventDefault();
      status.value = `Save or discard your changes before opening "${value}".`;
    } else {
      status.value = `Opened "${value}".`;
    }
  };
  tabs.addEventListener("minerva-change", onChange);
  return () => tabs.removeEventListener("minerva-change", onChange);
}

```

## Example: Panneaux inactifs : montés ou non

Le <TabPanel> de React démonte par défaut les panneaux inactifs et ne les garde (masqués) qu'avec forceMount. Les enfants du light DOM appartiennent à la page : <minerva-tab-panel> ne peut pas les démonter, et les enfants ordinaires se comportent comme forceMount (masqués, état conservé, champs de formulaire toujours envoyés). Placez le contenu dans un <template> pour le comportement par défaut de React (créé quand le panneau est actif, retiré ensuite), et ajoutez force-mount pour le garder monté pendant qu'il est masqué.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/tabs/wc/panels.html

```html
<minerva-tabs label="Report" value="summary">
  <minerva-tab value="summary">Summary</minerva-tab>
  <minerva-tab value="draft">Draft (template)</minerva-tab>
  <minerva-tab value="notes">Notes (force-mount)</minerva-tab>
  <!-- Regular children: always in the DOM, hidden while inactive
       (React's <TabPanel forceMount>) -->
  <minerva-tab-panel value="summary">
    <p>Regular content stays mounted: type here, switch tabs, come back.</p>
    <input aria-label="Kept text" placeholder="Kept while hidden" />
  </minerva-tab-panel>
  <!-- <template>: mounted only while active (React's default) -->
  <minerva-tab-panel value="draft">
    <template>
      <p>Template content is created on activation and removed afterwards.</p>
      <input aria-label="Reset text" placeholder="Reset when you leave" />
    </template>
  </minerva-tab-panel>
  <!-- <template> + force-mount: mounted (hidden) even while inactive -->
  <minerva-tab-panel value="notes" force-mount>
    <template>
      <p>force-mount stamps the template up front and keeps it.</p>
      <input aria-label="Notes" placeholder="Kept while hidden" />
    </template>
  </minerva-tab-panel>
</minerva-tabs>

```

## Example: Variantes et couleurs

variant choisit line, enclosed, soft ou pills ; color teinte la sélection, et un color sur un <minerva-tab> le garde teinté même inactif.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/tabs/wc/variants.html

```html
<div style="display: grid; gap: 20px">
  <minerva-tabs label="Line" value="a">
    <minerva-tab value="a">Overview</minerva-tab>
    <minerva-tab value="b">Activity</minerva-tab>
    <minerva-tab value="c">Settings</minerva-tab>
  </minerva-tabs>
  <minerva-tabs label="Enclosed" variant="enclosed" value="a">
    <minerva-tab value="a">Overview</minerva-tab>
    <minerva-tab value="b">Activity</minerva-tab>
    <minerva-tab value="c">Settings</minerva-tab>
  </minerva-tabs>
  <minerva-tabs label="Soft" variant="soft" color="success" value="a">
    <minerva-tab value="a">Overview</minerva-tab>
    <minerva-tab value="b">Activity</minerva-tab>
    <minerva-tab value="c">Settings</minerva-tab>
  </minerva-tabs>
  <minerva-tabs label="Pills" variant="pills" color="info" value="a">
    <minerva-tab value="a">Overview</minerva-tab>
    <minerva-tab value="b">Activity</minerva-tab>
    <minerva-tab value="c" color="danger">Danger zone</minerva-tab>
  </minerva-tabs>
</div>

```

## Example: Vertical et activation manuelle

orientation="vertical" empile les onglets (ArrowUp / ArrowDown). Avec activation-mode="manual", le focus se déplace sans sélectionner jusqu’à Entrée ou Espace ; no-loop s’arrête au premier / dernier onglet.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/tabs/wc/vertical.html

```html
<minerva-tabs
  label="Documentation"
  orientation="vertical"
  activation-mode="manual"
  no-loop
  value="install"
>
  <minerva-tab value="install">Installation</minerva-tab>
  <minerva-tab value="usage">Usage</minerva-tab>
  <minerva-tab value="theming">Theming</minerva-tab>
  <minerva-tab-panel value="install"
    >npm install minerva-design</minerva-tab-panel
  >
  <minerva-tab-panel value="usage"
    >Import the package once, then use the elements in any
    HTML.</minerva-tab-panel
  >
  <minerva-tab-panel value="theming"
    >Override the CSS variables on :root or on an element.</minerva-tab-panel
  >
</minerva-tabs>

```

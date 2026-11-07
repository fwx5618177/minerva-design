# Popover

Un panneau flottant ouvert au clic et ancré à son déclencheur, pour du contenu interactif comme des filtres ou un menu de compte. Contrairement à Tooltip, il contient des éléments focalisables et gère lui-même le focus, Échap et les clics extérieurs ; dans une Modal, il se ferme en premier.

Package: minerva-design@1.23.0

Renderer: wc

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "9a519eee781183dcbac39a62a86bec9e0bd877a9",
  "sourceDigest": "sha256:0d31b0bc3c28394756a1142132ddf7b2beac9f7ce2f5b2253e04712431d7c736",
  "referenceSourceDigest": "sha256:0a033a9f6bc21722c87a78202ae3fce0d891270ea8a01d043a5a748c0439d696"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

## Documentation

## Popover

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/popover",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "open",
    "typeText": "boolean",
    "attribute": "open",
    "required": false
  },
  {
    "name": "modal",
    "typeText": "boolean",
    "attribute": "modal",
    "required": false
  },
  {
    "name": "side",
    "typeText": "\"top\" | \"right\" | \"bottom\" | \"left\"",
    "attribute": "side",
    "required": false
  },
  {
    "name": "align",
    "typeText": "\"start\" | \"center\" | \"end\"",
    "attribute": "align",
    "required": false
  },
  {
    "name": "sideOffset",
    "typeText": "number",
    "attribute": "side-offset",
    "required": false
  },
  {
    "name": "alignOffset",
    "typeText": "number",
    "attribute": "align-offset",
    "required": false
  },
  {
    "name": "collisionPadding",
    "typeText": "number",
    "attribute": "collision-padding",
    "required": false
  },
  {
    "name": "matchAnchorWidth",
    "typeText": "false | \"min\" | \"exact\"",
    "attribute": "match-anchor-width",
    "required": false
  },
  {
    "name": "arrow",
    "typeText": "boolean",
    "attribute": "arrow",
    "required": false
  },
  {
    "name": "label",
    "typeText": "string",
    "attribute": "label",
    "required": false
  },
  {
    "name": "anchor",
    "typeText": "string",
    "attribute": "anchor",
    "required": false
  },
  {
    "name": "anchorElement",
    "typeText": "Element | null",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "minerva-open-change",
    "typeText": "CustomEvent<{ open: boolean; reason: PopoverChangeReason; }>",
    "detailType": {
      "typeText": "{ open: boolean; reason: PopoverChangeReason; }",
      "typeRef": "type:d2f63c456610958f492d"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": true,
    "description": "The user asked to open / close (`detail: { open, reason }`); cancelable: `preventDefault()` keeps the current state"
  },
  {
    "name": "minerva-after-open",
    "typeText": "CustomEvent<undefined>",
    "bubbles": true,
    "composed": true,
    "cancelable": false,
    "description": "The popover is open"
  },
  {
    "name": "minerva-after-close",
    "typeText": "CustomEvent<undefined>",
    "bubbles": true,
    "composed": true,
    "cancelable": false,
    "description": "The popover finished closing (after its exit animation)"
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "description": "Panel content"
  },
  {
    "name": "trigger",
    "description": "Element that toggles the popover when clicked"
  }
]
```

## PopoverAnchor

Support: n/a

React-only API (composition part or provider); the custom elements cover it with attributes or the parent element.

## PopoverClose

Support: n/a

React-only API (composition part or provider); the custom elements cover it with attributes or the parent element.

## PopoverContent

Support: n/a

React-only API (composition part or provider); the custom elements cover it with attributes or the parent element.

## PopoverTrigger

Support: n/a

React-only API (composition part or provider); the custom elements cover it with attributes or the parent element.

## API

```json
{
  "wc:minerva-popover": {
    "kind": "element",
    "source": "web-components/src/components/popover/popover.ts",
    "className": "MinervaPopover",
    "summary": "Anchored interactive panel with focus management and dismissal.",
    "description": "Popover (`<Popover>` of React): a click-triggered, interactive panel (`role=\"dialog\"`) anchored to its trigger (or to the `anchor` element). Unlike a tooltip it holds focusable content and manages focus itself: - focus moves to its first tabbable (or the panel) on open and returns to the trigger on close; - Escape (topmost layer only), a pointer down outside or focus leaving it close it; overlays opened inside it are child layers, and a popover inside a modal is a child layer of the modal; - non-modal (default): Tab past its last tabbable (Shift+Tab before its first) closes it and moves focus to the tabbable after (before) the trigger; Tab never loops inside the panel; - `modal`: focus trap (Tab loops), scroll lock, the rest of the page hidden from assistive technologies, outside pointer events disabled. The panel is shown in the top layer (Popover API) but stays in the DOM where the element is, so it inherits the theme of its scope. The trigger gets `aria-haspopup=\"dialog\"`, `aria-expanded` and `data-state`. Light DOM elements with `data-popover-close` close the popover when clicked (the React library's `PopoverClose`).",
    "properties": [
      {
        "name": "open",
        "attribute": "open",
        "type": "boolean",
        "default": "false",
        "description": "Whether the popover is open"
      },
      {
        "name": "modal",
        "attribute": "modal",
        "type": "boolean",
        "default": "false",
        "description": "Modal popover: focus trap, scroll lock, page hidden and inert"
      },
      {
        "name": "side",
        "attribute": "side",
        "type": "\"top\" | \"right\" | \"bottom\" | \"left\"",
        "default": "\"bottom\"",
        "description": "Preferred side; flips when there is not enough room"
      },
      {
        "name": "align",
        "attribute": "align",
        "type": "\"start\" | \"center\" | \"end\"",
        "default": "\"center\"",
        "description": "Alignment against the anchor"
      },
      {
        "name": "sideOffset",
        "attribute": "side-offset",
        "type": "number",
        "default": "6",
        "description": "Distance from the anchor (px)"
      },
      {
        "name": "alignOffset",
        "attribute": "align-offset",
        "type": "number",
        "default": "0",
        "description": "Shift along the anchor (px)"
      },
      {
        "name": "collisionPadding",
        "attribute": "collision-padding",
        "type": "number",
        "default": "8",
        "description": "Minimum distance kept from the viewport edges (px)"
      },
      {
        "name": "matchAnchorWidth",
        "attribute": "match-anchor-width",
        "type": "false | \"min\" | \"exact\"",
        "default": "false",
        "description": "Sizes the panel after the anchor: at least (`min`) or exactly (`exact`) its width"
      },
      {
        "name": "arrow",
        "attribute": "arrow",
        "type": "boolean",
        "default": "false",
        "description": "Renders an arrow pointing at the anchor"
      },
      {
        "name": "label",
        "attribute": "label",
        "type": "string",
        "default": "\"\"",
        "description": "Accessible name of the panel (or set `aria-label` on the element)"
      },
      {
        "name": "anchor",
        "attribute": "anchor",
        "type": "string",
        "default": "\"\"",
        "description": "Id of the element (same tree) to anchor to"
      },
      {
        "name": "anchorElement",
        "type": "Element | null",
        "default": "null",
        "description": "Element the panel is positioned against instead of the trigger (the React library's `PopoverAnchor`); the `anchor` attribute takes an id in the element's tree"
      }
    ],
    "methods": [
      {
        "name": "show",
        "signature": "() => void",
        "description": "Opens the popover"
      },
      {
        "name": "hide",
        "signature": "() => void",
        "description": "Closes the popover"
      },
      {
        "name": "toggle",
        "signature": "() => void",
        "description": "Toggles the popover"
      }
    ],
    "events": [
      {
        "name": "minerva-open-change",
        "description": "The user asked to open / close (`detail: { open, reason }`); cancelable: `preventDefault()` keeps the current state"
      },
      {
        "name": "minerva-after-open",
        "description": "The popover is open"
      },
      {
        "name": "minerva-after-close",
        "description": "The popover finished closing (after its exit animation)"
      }
    ],
    "slots": [
      {
        "name": "",
        "description": "Panel content"
      },
      {
        "name": "trigger",
        "description": "Element that toggles the popover when clicked"
      }
    ],
    "parts": [
      {
        "name": "content",
        "description": "The positioned panel (`role=\"dialog\"`)"
      },
      {
        "name": "arrow",
        "description": "The arrow pointing at the anchor (with `arrow`)"
      }
    ],
    "cssProperties": [
      {
        "name": "--popover-min-width",
        "description": "Minimum width of the panel"
      },
      {
        "name": "--popover-max-width",
        "description": "Maximum width of the panel"
      },
      {
        "name": "--popover-padding",
        "description": "Inner padding of the panel"
      },
      {
        "name": "--popover-radius",
        "description": "Corner radius of the panel (defaults to --radius-lg)"
      },
      {
        "name": "--popover-background",
        "description": "Background of the panel and its arrow"
      },
      {
        "name": "--popover-border-color",
        "description": "Border color of the panel and its arrow"
      },
      {
        "name": "--popover-shadow",
        "description": "Shadow of the panel (defaults to --shadow-lg, --shadow-xl in dark themes)"
      },
      {
        "name": "--popover-z-index",
        "description": "Stacking order of the panel (defaults to --z-popover)"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:Popover": {
    "kind": "cssVars",
    "source": "react/src/components/Popover",
    "vars": [
      {
        "name": "--popover-min-width",
        "description": "Minimum width of the panel"
      },
      {
        "name": "--popover-max-width",
        "description": "Maximum width of the panel"
      },
      {
        "name": "--popover-padding",
        "description": "Inner padding of the panel"
      },
      {
        "name": "--popover-radius",
        "description": "Corner radius of the panel (defaults to --radius-lg)"
      },
      {
        "name": "--popover-background",
        "description": "Background of the panel and its arrow"
      },
      {
        "name": "--popover-border-color",
        "description": "Border color of the panel and its arrow"
      },
      {
        "name": "--popover-shadow",
        "description": "Shadow of the panel (defaults to --shadow-lg, --shadow-xl in dark themes)"
      },
      {
        "name": "--popover-z-index",
        "description": "Stacking order of the panel (defaults to --z-popover)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Ancre et modale

anchor positionne le panneau contre un autre élément (par id) tandis qu'un bouton quelconque l'ouvre avec show() ; modal piège le focus et bloque le reste de la page.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/popover/wc/anchor.html

```html
<div style="display: flex; flex-wrap: wrap; gap: 12px; align-items: center">
  <span
    id="avatar-anchor"
    style="
      display: inline-grid;
      place-items: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: var(--color-primary-100, #dbeafe);
    "
    >AL</span
  >
  <minerva-button id="edit-profile" variant="outline"
    >Edit profile</minerva-button
  >
  <minerva-popover
    id="profile"
    anchor="avatar-anchor"
    side="right"
    modal
    label="Edit profile"
  >
    <form id="profile-form" style="display: grid; gap: 8px; width: 220px">
      <label style="display: grid; gap: 4px"
        >Display name <input name="name" value="Ada Lovelace" required
      /></label>
      <minerva-button type="submit" size="small">Save</minerva-button>
    </form>
  </minerva-popover>
</div>
<p id="profile-log" style="margin: 8px 0 0"></p>

```

### apps/docs/src/docs/pages/popover/wc/anchor.ts

```tsx
// The panel is positioned against `anchor` (an element id) while an
// external button opens it; `modal` traps focus until it closes.
type Popover = HTMLElement & { show(): void; hide(): void };
type OpenChange = CustomEvent<{ open: boolean; reason: string }>;

export function setup(root: HTMLElement) {
  const button = root.querySelector<HTMLElement>("#edit-profile")!;
  const popover = root.querySelector<Popover>("#profile")!;
  const form = root.querySelector<HTMLFormElement>("#profile-form")!;
  const log = root.querySelector<HTMLElement>("#profile-log")!;
  const onClick = () => popover.show();
  const onSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    log.textContent = `Saved "${new FormData(form).get("name")}"`;
    popover.hide();
  };
  const onChange = (event: Event) => {
    const { open, reason } = (event as OpenChange).detail;
    if (!open) log.textContent = `Closed (reason: ${reason})`;
  };
  button.addEventListener("click", onClick);
  form.addEventListener("submit", onSubmit);
  popover.addEventListener("minerva-open-change", onChange);
  return () => {
    button.removeEventListener("click", onClick);
    form.removeEventListener("submit", onSubmit);
    popover.removeEventListener("minerva-open-change", onChange);
  };
}

```

## Example: Utilisation de base

Le slot trigger ouvre ou ferme un panneau interactif ; le focus y entre puis revient à la fermeture. Échap, un clic à l'extérieur ou un élément data-popover-close le ferment.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/popover/wc/basic.html

```html
<minerva-popover label="Share link" arrow>
  <minerva-button slot="trigger" variant="outline">Share</minerva-button>
  <div style="display: grid; gap: 8px; width: 240px">
    <strong>Share this document</strong>
    <input value="https://minerva.dev/d/42" readonly aria-label="Link" />
    <div style="display: flex; justify-content: end; gap: 8px">
      <minerva-button data-popover-close size="small" variant="ghost"
        >Done</minerva-button
      >
    </div>
  </div>
</minerva-popover>

```

## Example: Placement

side et align placent le panneau autour du déclencheur, side-offset règle l'écart et arrow ajoute une flèche ; il se retourne et se décale pour rester visible.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/popover/wc/placement.html

```html
<div style="display: grid; gap: 12px; justify-items: start">
  <div
    id="placement-controls"
    style="display: flex; flex-wrap: wrap; gap: 12px"
  >
    <label
      >side
      <select name="side">
        <option>top</option>
        <option>right</option>
        <option selected>bottom</option>
        <option>left</option>
      </select>
    </label>
    <label
      >align
      <select name="align">
        <option>start</option>
        <option selected>center</option>
        <option>end</option>
      </select>
    </label>
  </div>
  <minerva-popover
    id="placed"
    side="bottom"
    align="center"
    side-offset="8"
    arrow
    label="Placement"
  >
    <minerva-button slot="trigger">Toggle popover</minerva-button>
    <p style="margin: 0; max-width: 220px">
      Flips and shifts to stay within the viewport (collision-padding).
    </p>
  </minerva-popover>
</div>

```

### apps/docs/src/docs/pages/popover/wc/placement.ts

```tsx
// side / align are reflected properties: changing them moves the open panel.
type Popover = HTMLElement & { side: string; align: string };

export function setup(root: HTMLElement) {
  const controls = root.querySelector<HTMLElement>("#placement-controls")!;
  const popover = root.querySelector<Popover>("#placed")!;
  const onChange = (event: Event) => {
    const select = event.target as HTMLSelectElement;
    if (select.name === "side") popover.side = select.value;
    if (select.name === "align") popover.align = select.value;
  };
  controls.addEventListener("change", onChange);
  return () => controls.removeEventListener("change", onChange);
}

```

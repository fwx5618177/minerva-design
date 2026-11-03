# Drawer

Un panneau qui glisse depuis un bord de la fenêtre pour des tâches secondaires comme les filtres ou les détails. Il se comporte comme une modale : focus piégé, Échap, clic sur le fond et retour du focus.

Package: minerva-design@1.20.0

Renderer: wc

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.0",
  "sourceCommit": "09013eec9b429ff5907c596bcb5edf1281361bc0",
  "sourceDigest": "sha256:c9ed2b706b61413d29e506a3f04f3d35c044a4b57ec0e284935054f9e1898c7e",
  "referenceSourceDigest": "sha256:b368e6fa7c621870e513621690cab70035abb6a658e8344f3df3b0cb0be55a18"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.0/types.json) or getType() from minerva-design/contracts.

## Documentation

## Drawer

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/drawer",
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
    "name": "label",
    "typeText": "string",
    "attribute": "label",
    "required": false
  },
  {
    "name": "description",
    "typeText": "string",
    "attribute": "description",
    "required": false
  },
  {
    "name": "hiddenDescription",
    "typeText": "string | undefined",
    "attribute": "hidden-description",
    "required": false
  },
  {
    "name": "side",
    "typeText": "\"left\" | \"right\" | \"top\" | \"bottom\"",
    "attribute": "side",
    "required": false
  },
  {
    "name": "size",
    "typeText": "\"small\" | \"medium\" | \"large\" | \"full\"",
    "attribute": "size",
    "required": false
  },
  {
    "name": "hideCloseButton",
    "typeText": "boolean",
    "attribute": "hide-close-button",
    "required": false
  },
  {
    "name": "closeLabel",
    "typeText": "string | undefined",
    "attribute": "close-label",
    "required": false
  },
  {
    "name": "dialogRole",
    "typeText": "\"dialog\" | \"alertdialog\"",
    "attribute": "dialog-role",
    "required": false
  },
  {
    "name": "nonModal",
    "typeText": "boolean",
    "attribute": "non-modal",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "minerva-open-change",
    "typeText": "CustomEvent<{ open: boolean; reason: DrawerChangeReason; }>",
    "detailType": {
      "typeText": "{ open: boolean; reason: DrawerChangeReason; }",
      "typeRef": "type:cf54bb1b87203c0672d4"
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
    "description": "The drawer is open and focus moved in"
  },
  {
    "name": "minerva-after-close",
    "typeText": "CustomEvent<undefined>",
    "bubbles": true,
    "composed": true,
    "cancelable": false,
    "description": "The drawer finished closing (after its exit animation)"
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "description": "Body content"
  },
  {
    "name": "header",
    "description": "Title (alternative to the `label` attribute)"
  },
  {
    "name": "footer",
    "description": "Actions row"
  },
  {
    "name": "trigger",
    "description": "Element that opens the drawer when clicked"
  }
]
```

## DrawerBody

Support: n/a

React-only API (composition part or provider); the custom elements cover it with attributes or the parent element.

## DrawerClose

Support: n/a

React-only API (composition part or provider); the custom elements cover it with attributes or the parent element.

## DrawerContent

Support: n/a

React-only API (composition part or provider); the custom elements cover it with attributes or the parent element.

## DrawerFooter

Support: n/a

React-only API (composition part or provider); the custom elements cover it with attributes or the parent element.

## DrawerHeader

Support: n/a

React-only API (composition part or provider); the custom elements cover it with attributes or the parent element.

## DrawerRoot

Support: n/a

React-only API (composition part or provider); the custom elements cover it with attributes or the parent element.

## DrawerTrigger

Support: n/a

React-only API (composition part or provider); the custom elements cover it with attributes or the parent element.

## API

```json
{
  "wc:minerva-drawer": {
    "kind": "element",
    "source": "web-components/src/components/drawer/drawer.ts",
    "className": "MinervaDrawer",
    "summary": "Side panel dialog with focus trap, Escape / overlay dismissal and focus return.",
    "description": "Side panel (`<Drawer>` of React) sliding in from an edge of the viewport over an overlay. Same behaviour as `<minerva-modal>` (WAI-ARIA dialog): focus moves in and is trapped (Tab loops), Escape (topmost layer only) and an overlay click close it, page scroll is locked, the rest of the page is hidden from assistive technologies and focus returns to the opener. `non-modal` drawers keep the page interactive and close on outside interaction instead. The panel is shown in the top layer (Popover API) but stays in the DOM where the element is, so it inherits the theme of its scope. Without a `description`, a visually hidden localized description (\"Drawer content\") describes the dialog, like React. Any light DOM element with `data-drawer-close` closes the drawer when clicked (the React library's `DrawerClose`).",
    "properties": [
      {
        "name": "open",
        "attribute": "open",
        "type": "boolean",
        "default": "false",
        "description": "Whether the drawer is open"
      },
      {
        "name": "label",
        "attribute": "label",
        "type": "string",
        "default": "\"\"",
        "description": "Title text (or use the `header` slot); names the dialog"
      },
      {
        "name": "description",
        "attribute": "description",
        "type": "string",
        "default": "\"\"",
        "description": "Visible description below the title (accessible description)"
      },
      {
        "name": "hiddenDescription",
        "attribute": "hidden-description",
        "type": "string | undefined",
        "description": "Text of the visually hidden description used when `description` is not set (default: localized \"Drawer content\")"
      },
      {
        "name": "side",
        "attribute": "side",
        "type": "\"left\" | \"right\" | \"top\" | \"bottom\"",
        "default": "\"right\"",
        "description": "Edge the panel slides in from"
      },
      {
        "name": "size",
        "attribute": "size",
        "type": "\"small\" | \"medium\" | \"large\" | \"full\"",
        "default": "\"medium\"",
        "description": "Size preset (width of left / right drawers, height of top / bottom ones)"
      },
      {
        "name": "hideCloseButton",
        "attribute": "hide-close-button",
        "type": "boolean",
        "default": "false",
        "description": "Hides the close (×) button"
      },
      {
        "name": "closeLabel",
        "attribute": "close-label",
        "type": "string | undefined",
        "description": "Accessible label of the close button (default: localized \"Close\")"
      },
      {
        "name": "dialogRole",
        "attribute": "dialog-role",
        "type": "\"dialog\" | \"alertdialog\"",
        "default": "\"dialog\"",
        "description": "ARIA role of the panel"
      },
      {
        "name": "nonModal",
        "attribute": "non-modal",
        "type": "boolean",
        "default": "false",
        "description": "Non-modal drawer: no overlay, no focus trap, no scroll lock; closes on outside pointer down / focus (React `DrawerRoot modal={false}`)"
      }
    ],
    "methods": [
      {
        "name": "show",
        "signature": "() => void",
        "description": "Opens the drawer"
      },
      {
        "name": "hide",
        "signature": "() => void",
        "description": "Closes the drawer"
      }
    ],
    "events": [
      {
        "name": "minerva-open-change",
        "description": "The user asked to open / close (`detail: { open, reason }`); cancelable: `preventDefault()` keeps the current state"
      },
      {
        "name": "minerva-after-open",
        "description": "The drawer is open and focus moved in"
      },
      {
        "name": "minerva-after-close",
        "description": "The drawer finished closing (after its exit animation)"
      }
    ],
    "slots": [
      {
        "name": "",
        "description": "Body content"
      },
      {
        "name": "header",
        "description": "Title (alternative to the `label` attribute)"
      },
      {
        "name": "footer",
        "description": "Actions row"
      },
      {
        "name": "trigger",
        "description": "Element that opens the drawer when clicked"
      }
    ],
    "parts": [
      {
        "name": "overlay",
        "description": "The backdrop"
      },
      {
        "name": "content",
        "description": "The dialog panel (`role=\"dialog\"`)"
      },
      {
        "name": "header",
        "description": "The title (accessible name of the dialog)"
      },
      {
        "name": "description",
        "description": "The description below the title (visually hidden when no description is given)"
      },
      {
        "name": "body",
        "description": "The scrollable body"
      },
      {
        "name": "footer",
        "description": "The actions row"
      },
      {
        "name": "close-button",
        "description": "The close (×) button"
      }
    ],
    "cssProperties": [
      {
        "name": "--drawer-width",
        "description": "Width of a left / right drawer (every size; defaults to the width of the size)"
      },
      {
        "name": "--drawer-height",
        "description": "Height of a top / bottom drawer (every size; defaults to the height of the size)"
      },
      {
        "name": "--drawer-padding",
        "description": "Horizontal padding of the header, description, body and footer"
      },
      {
        "name": "--drawer-radius",
        "description": "Corner radius of the inner edge (defaults to --radius-lg)"
      },
      {
        "name": "--drawer-shadow",
        "description": "Shadow of the panel (defaults to --shadow-xl)"
      },
      {
        "name": "--drawer-background",
        "description": "Background of the panel"
      },
      {
        "name": "--drawer-z-index",
        "description": "Stacking order of the panel (defaults to --z-modal)"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:Drawer": {
    "kind": "cssVars",
    "source": "react/src/components/Drawer",
    "vars": [
      {
        "name": "--drawer-width",
        "description": "Width of a left / right drawer (every size; defaults to the width of the size)"
      },
      {
        "name": "--drawer-height",
        "description": "Height of a top / bottom drawer (every size; defaults to the height of the size)"
      },
      {
        "name": "--drawer-padding",
        "description": "Horizontal padding of the header, description, body and footer"
      },
      {
        "name": "--drawer-radius",
        "description": "Corner radius of the inner edge (defaults to --radius-lg)"
      },
      {
        "name": "--drawer-shadow",
        "description": "Shadow of the panel (defaults to --shadow-xl)"
      },
      {
        "name": "--drawer-background",
        "description": "Background of the panel"
      },
      {
        "name": "--drawer-z-index",
        "description": "Stacking order of the panel (defaults to --z-modal)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Utilisation de base

Un panneau latéral ouvert par son slot trigger. Tout élément du light DOM portant data-drawer-close (ici les boutons du pied) le ferme.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/drawer/wc/basic.html

```html
<minerva-drawer
  label="Filters"
  description="Narrow down the list of orders."
  size="small"
>
  <minerva-button slot="trigger">Open drawer</minerva-button>
  <fieldset style="display: grid; gap: 8px; border: 0; padding: 0; margin: 0">
    <label><input type="checkbox" checked /> Paid</label>
    <label><input type="checkbox" /> Refunded</label>
    <label><input type="checkbox" /> Shipped</label>
  </fieldset>
  <minerva-button
    slot="footer"
    data-drawer-close
    color="neutral"
    variant="outline"
    >Cancel</minerva-button
  >
  <minerva-button slot="footer" data-drawer-close>Apply</minerva-button>
</minerva-drawer>

```

## Example: Non modal

Avec non-modal la page reste interactive : pas d'overlay ni de piège de focus, et un clic à l'extérieur ferme le tiroir. minerva-open-change indique la raison.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/drawer/wc/non-modal.html

```html
<minerva-drawer id="help" non-modal side="left" size="small" label="Help">
  <minerva-button slot="trigger" variant="outline"
    >Toggle help panel</minerva-button
  >
  <p style="margin: 0">
    A non-modal drawer has no overlay: the page stays interactive, focus is not
    trapped and an outside click closes it.
  </p>
</minerva-drawer>
<p id="help-state" style="margin: 8px 0 0">Closed</p>

```

### apps/docs/src/docs/pages/drawer/wc/non-modal.ts

```tsx
// minerva-open-change reports why the drawer opens / closes.
type OpenChange = CustomEvent<{ open: boolean; reason: string }>;

export function setup(root: HTMLElement) {
  const drawer = root.querySelector<HTMLElement>("#help")!;
  const state = root.querySelector<HTMLElement>("#help-state")!;
  const onChange = (event: Event) => {
    const { open, reason } = (event as OpenChange).detail;
    state.textContent = `${open ? "Opened" : "Closed"} (reason: ${reason})`;
  };
  drawer.addEventListener("minerva-open-change", onChange);
  return () => drawer.removeEventListener("minerva-open-change", onChange);
}

```

## Example: Côtés

side choisit le bord d'où glisse le tiroir ; size est une largeur pour gauche / droite et une hauteur pour haut / bas.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/drawer/wc/sides.html

```html
<div id="sides" style="display: flex; flex-wrap: wrap; gap: 8px">
  <minerva-button data-side="left" variant="outline">Left</minerva-button>
  <minerva-button data-side="right" variant="outline">Right</minerva-button>
  <minerva-button data-side="top" variant="outline">Top</minerva-button>
  <minerva-button data-side="bottom" variant="outline">Bottom</minerva-button>
</div>
<minerva-drawer id="sided" size="small">
  <span slot="header" id="sided-title"></span>
  <p style="margin: 0">
    size sets the width of left / right drawers and the height of top / bottom
    ones.
  </p>
</minerva-drawer>

```

### apps/docs/src/docs/pages/drawer/wc/sides.ts

```tsx
// Set `side` (and optionally `size`), then open with show().
type Drawer = HTMLElement & { side: string; show(): void };

export function setup(root: HTMLElement) {
  const buttons = root.querySelector<HTMLElement>("#sides")!;
  const drawer = root.querySelector<Drawer>("#sided")!;
  const title = root.querySelector<HTMLElement>("#sided-title")!;
  const onClick = (event: Event) => {
    const side = (event.target as Element)
      .closest("[data-side]")
      ?.getAttribute("data-side");
    if (!side) return;
    drawer.side = side;
    title.textContent = `Drawer from the ${side}`;
    drawer.show();
  };
  buttons.addEventListener("click", onClick);
  return () => buttons.removeEventListener("click", onClick);
}

```

# Tag

Petites étiquettes pour marquer et catégoriser du contenu ; elles peuvent être fermables ou cliquables.

Package: minerva-design@1.23.0

Renderer: wc

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "19d3efc34af8ba4e23df0f24d9fbb0a587e1b452",
  "sourceDigest": "sha256:2005faebbf738765fe81a5c952fa47a51311aa5d05e3220f71c542b8b1fe369b",
  "referenceSourceDigest": "sha256:ec29900df0d5b5c8d741436acb4a250ec29e5f40ce1f4110def33ac2d66baaa5"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

## Documentation

### Accessibilité

Avec clickable, le tag reçoit role="button" et tabIndex=0, et Entrée ou Espace déclenchent onClick comme un clic. Réservez-le aux actions ou bascules, pas à la navigation (utilisez un lien).

Le bouton de fermeture est un  natif avec son propre arrêt de tabulation. Son nom accessible est « Close » par défaut ; définissez closeLabel (ex. « Remove React ») pour indiquer quel tag il supprime.

Un tag cliquable désactivé conserve role="button" avec aria-disabled="true" et est ignoré par Tab. Si l'état sélectionné compte, exprimez-le aussi par du texte ou des attributs aria, pas seulement par la couleur.

## Tag

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/tag",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "color",
    "typeText": "\"primary\" | \"neutral\" | \"success\" | \"warning\" | \"danger\" | \"info\"",
    "attribute": "color",
    "required": false
  },
  {
    "name": "variant",
    "typeText": "\"subtle\" | \"outline\" | \"solid\"",
    "attribute": "variant",
    "required": false
  },
  {
    "name": "size",
    "typeText": "\"small\" | \"medium\" | \"large\"",
    "attribute": "size",
    "required": false
  },
  {
    "name": "shape",
    "typeText": "\"square\" | \"rounded\" | \"circle\"",
    "attribute": "shape",
    "required": false
  },
  {
    "name": "closable",
    "typeText": "boolean",
    "attribute": "closable",
    "required": false
  },
  {
    "name": "clickable",
    "typeText": "boolean",
    "attribute": "clickable",
    "required": false
  },
  {
    "name": "pressed",
    "typeText": "boolean | undefined",
    "attribute": "pressed",
    "required": false
  },
  {
    "name": "toggle",
    "typeText": "boolean",
    "attribute": "toggle",
    "required": false
  },
  {
    "name": "loading",
    "typeText": "boolean",
    "attribute": "loading",
    "required": false
  },
  {
    "name": "elevation",
    "typeText": "boolean",
    "attribute": "elevation",
    "required": false
  },
  {
    "name": "disabled",
    "typeText": "boolean",
    "attribute": "disabled",
    "required": false
  },
  {
    "name": "closeLabel",
    "typeText": "string | undefined",
    "attribute": "close-label",
    "required": false
  },
  {
    "name": "noRipple",
    "typeText": "boolean",
    "attribute": "no-ripple",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "minerva-close",
    "typeText": "CustomEvent<{}>",
    "detailType": {
      "typeText": "{}",
      "typeRef": "type:436fa1028160295b25cf"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": false,
    "description": "The close button was activated (`detail: {}`)"
  },
  {
    "name": "minerva-change",
    "typeText": "CustomEvent<{ pressed: boolean; }>",
    "detailType": {
      "typeText": "{ pressed: boolean; }",
      "typeRef": "type:54cf9ee20d418c7c41e0"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": false,
    "description": "A `toggle` tag was toggled (`detail: { pressed }`)"
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "description": "Label of the tag"
  },
  {
    "name": "icon",
    "description": "Icon displayed before the label"
  },
  {
    "name": "avatar",
    "description": "Avatar (small `<minerva-avatar>` or image) before the label"
  },
  {
    "name": "close-icon",
    "description": "Custom close icon"
  }
]
```

## API

```json
{
  "wc:minerva-tag": {
    "kind": "element",
    "source": "web-components/src/components/tag/tag.ts",
    "className": "MinervaTag",
    "summary": "Small label / chip, optionally clickable, toggleable or closable.",
    "description": "A small label for marking and categorizing (`<Tag>` of React). The root is a plain (non-interactive) element. With `clickable` the content is a native `<button>` (focusable, Enter / Space, ripple) whose clicks reach the host as regular `click` events; with `closable` the close control is a sibling `<button>` (never nested) that fires `minerva-close` (its clicks do not bubble as `click`, so they never trigger the tag's own action). A clickable tag with `pressed` (or `toggle`) is a toggle button (`aria-pressed`), e.g. a selectable filter; with `toggle` a click flips `pressed` itself and fires `minerva-change`.",
    "properties": [
      {
        "name": "color",
        "attribute": "color",
        "type": "\"primary\" | \"neutral\" | \"success\" | \"warning\" | \"danger\" | \"info\"",
        "default": "\"neutral\"",
        "description": "Semantic color"
      },
      {
        "name": "variant",
        "attribute": "variant",
        "type": "\"subtle\" | \"outline\" | \"solid\"",
        "default": "\"subtle\"",
        "description": "Visual style: subtle (tinted), outline (tinted + border) or solid"
      },
      {
        "name": "size",
        "attribute": "size",
        "type": "\"small\" | \"medium\" | \"large\"",
        "default": "\"medium\"",
        "description": "Tag size"
      },
      {
        "name": "shape",
        "attribute": "shape",
        "type": "\"square\" | \"rounded\" | \"circle\"",
        "default": "\"rounded\"",
        "description": "Tag shape"
      },
      {
        "name": "closable",
        "attribute": "closable",
        "type": "boolean",
        "default": "false",
        "description": "Shows a close button (fires `minerva-close`)"
      },
      {
        "name": "clickable",
        "attribute": "clickable",
        "type": "boolean",
        "default": "false",
        "description": "Renders the content as a native button (focusable, Enter / Space)"
      },
      {
        "name": "pressed",
        "attribute": "pressed",
        "type": "boolean | undefined",
        "description": "Pressed (selected) state of a toggle tag (requires `clickable`); sets aria-pressed and the selected style"
      },
      {
        "name": "toggle",
        "attribute": "toggle",
        "type": "boolean",
        "default": "false",
        "description": "Makes a clickable tag a toggle: clicks flip `pressed` and fire `minerva-change`"
      },
      {
        "name": "loading",
        "attribute": "loading",
        "type": "boolean",
        "default": "false",
        "description": "Shows a spinner, marks the tag busy, blocks its action and hides the close button"
      },
      {
        "name": "elevation",
        "attribute": "elevation",
        "type": "boolean",
        "default": "false",
        "description": "Shows a shadow"
      },
      {
        "name": "disabled",
        "attribute": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disables the tag and its close button"
      },
      {
        "name": "closeLabel",
        "attribute": "close-label",
        "type": "string | undefined",
        "description": "Accessible label of the close button (default: localized \"Remove {label}\" / \"Close\")"
      },
      {
        "name": "noRipple",
        "attribute": "no-ripple",
        "type": "boolean",
        "default": "false",
        "description": "Disables the ripple effect of clickable tags"
      }
    ],
    "methods": [
      {
        "name": "focus",
        "signature": "(options?: FocusOptions) => void"
      }
    ],
    "events": [
      {
        "name": "minerva-close",
        "description": "The close button was activated (`detail: {}`)"
      },
      {
        "name": "minerva-change",
        "description": "A `toggle` tag was toggled (`detail: { pressed }`)"
      }
    ],
    "slots": [
      {
        "name": "",
        "description": "Label of the tag"
      },
      {
        "name": "icon",
        "description": "Icon displayed before the label"
      },
      {
        "name": "avatar",
        "description": "Avatar (small `<minerva-avatar>` or image) before the label"
      },
      {
        "name": "close-icon",
        "description": "Custom close icon"
      }
    ],
    "parts": [
      {
        "name": "root",
        "description": "The tag (a plain, non-interactive element); state active while a clickable tag is pressed, inactive otherwise"
      },
      {
        "name": "action",
        "description": "The native <button> of a clickable tag"
      },
      {
        "name": "label",
        "description": "The label wrapper"
      },
      {
        "name": "icon",
        "description": "The icon before the label"
      },
      {
        "name": "avatar",
        "description": "The avatar before the label"
      },
      {
        "name": "spinner",
        "description": "The loading spinner (while loading)"
      },
      {
        "name": "close-button",
        "description": "The close button"
      }
    ],
    "cssProperties": [
      {
        "name": "--tag-height",
        "description": "Minimum height (every size; default: the content height)"
      },
      {
        "name": "--tag-padding-x",
        "description": "Horizontal padding (every size)"
      },
      {
        "name": "--tag-font-size",
        "description": "Font size (every size)"
      },
      {
        "name": "--tag-radius",
        "description": "Corner radius of the rounded shape (defaults to --radius-sm)"
      },
      {
        "name": "--tag-gap",
        "description": "Space between the icon, the label and the close button"
      },
      {
        "name": "--tag-ring-color",
        "description": "Color of the hairline ring of the tinted (default) variant (defaults to the text color at 16%)"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:Tag": {
    "kind": "cssVars",
    "source": "react/src/components/Tag",
    "vars": [
      {
        "name": "--tag-height",
        "description": "Minimum height (every size; default: the content height)"
      },
      {
        "name": "--tag-padding-x",
        "description": "Horizontal padding (every size)"
      },
      {
        "name": "--tag-font-size",
        "description": "Font size (every size)"
      },
      {
        "name": "--tag-radius",
        "description": "Corner radius of the rounded shape (defaults to --radius-sm)"
      },
      {
        "name": "--tag-gap",
        "description": "Space between the icon, the label and the close button"
      },
      {
        "name": "--tag-ring-color",
        "description": "Color of the hairline ring of the tinted (default) variant (defaults to the text color at 16%)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Utilisation de base

Une petite étiquette ; color définit sa tonalité sémantique.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/tag/wc/basic.html

```html
<div style="display: flex; flex-wrap: wrap; gap: 8px">
  <minerva-tag>Neutral</minerva-tag>
  <minerva-tag color="primary">Primary</minerva-tag>
  <minerva-tag color="success">Success</minerva-tag>
  <minerva-tag color="warning">Warning</minerva-tag>
  <minerva-tag color="danger">Danger</minerva-tag>
  <minerva-tag color="info">Info</minerva-tag>
</div>

```

## Example: Fermable

closable ajoute un bouton de fermeture qui déclenche minerva-close : retirez l'étiquette dans l'écouteur et déplacez le focus vers une voisine. close-label et le slot close-icon le personnalisent.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/tag/wc/closable.html

```html
<div style="display: grid; gap: 12px">
  <div id="tags" style="display: flex; flex-wrap: wrap; gap: 8px">
    <minerva-tag closable color="primary">React</minerva-tag>
    <minerva-tag closable color="success">Vue</minerva-tag>
    <minerva-tag closable color="warning">Svelte</minerva-tag>
    <minerva-tag closable color="info" close-label="Remove Angular"
      >Angular
      <span slot="close-icon" aria-hidden="true">✕</span>
    </minerva-tag>
  </div>
  <div>
    <minerva-button id="restore" size="small" variant="outline"
      >Restore</minerva-button
    >
  </div>
</div>

```

### apps/docs/src/docs/pages/tag/wc/closable.ts

```tsx
// The close button fires `minerva-close`: remove (here: hide) the tag in the
// listener, and move focus to a neighbour so it is not lost.
export function setup(root: HTMLElement) {
  const tags = root.querySelector<HTMLElement>("#tags")!;
  const restore = root.querySelector<HTMLElement>("#restore")!;
  const all = () => [...tags.children] as HTMLElement[];
  const onClose = (event: Event) => {
    const tag = event.target as HTMLElement;
    const visible = all().filter((t) => !t.hidden);
    const index = visible.indexOf(tag);
    const next = visible[index + 1] ?? visible[index - 1] ?? restore;
    tag.hidden = true;
    next.focus();
  };
  const onRestore = () => all().forEach((tag) => (tag.hidden = false));
  tags.addEventListener("minerva-close", onClose);
  restore.addEventListener("click", onRestore);
  return () => {
    tags.removeEventListener("minerva-close", onClose);
    restore.removeEventListener("click", onRestore);
  };
}

```

## Example: Filtres à bascule

Les étiquettes clickable toggle sont des boutons à bascule (aria-pressed) : un clic inverse pressed et déclenche minerva-change. Une étiquette simplement cliquable déclenche click.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/tag/wc/toggle.html

```html
<div style="display: grid; gap: 12px">
  <div
    id="filters"
    role="group"
    aria-label="Filter by status"
    style="display: flex; flex-wrap: wrap; gap: 8px"
  >
    <minerva-tag clickable toggle pressed color="primary" data-status="open"
      >Open</minerva-tag
    >
    <minerva-tag clickable toggle color="primary" data-status="review"
      >In review</minerva-tag
    >
    <minerva-tag clickable toggle color="primary" data-status="done"
      >Done</minerva-tag
    >
    <minerva-tag clickable no-ripple color="neutral" id="clear"
      >Clear</minerva-tag
    >
  </div>
  <output id="active">Showing: open</output>
</div>

```

### apps/docs/src/docs/pages/tag/wc/toggle.ts

```tsx
// `clickable toggle` tags are toggle buttons (aria-pressed): a click flips
// `pressed` and fires `minerva-change`. A plain clickable tag fires `click`.
type Tag = HTMLElement & { pressed?: boolean };

export function setup(root: HTMLElement) {
  const filters = root.querySelector<HTMLElement>("#filters")!;
  const clear = root.querySelector<Tag>("#clear")!;
  const active = root.querySelector<HTMLOutputElement>("#active")!;
  const toggles = [...filters.querySelectorAll<Tag>("[toggle]")];
  const render = () => {
    const on = toggles.filter((t) => t.pressed).map((t) => t.dataset.status);
    active.value = `Showing: ${on.length ? on.join(", ") : "everything"}`;
  };
  const onClear = () => {
    toggles.forEach((t) => (t.pressed = false));
    render();
  };
  filters.addEventListener("minerva-change", render);
  clear.addEventListener("click", onClear);
  return () => {
    filters.removeEventListener("minerva-change", render);
    clear.removeEventListener("click", onClear);
  };
}

```

## Example: Variantes, tailles et contenu

Trois variantes, tailles et formes, elevation, les slots icon et avatar, loading et disabled.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/tag/wc/variants-sizes.html

```html
<div style="display: grid; gap: 12px">
  <div style="display: flex; flex-wrap: wrap; gap: 8px">
    <minerva-tag color="primary" variant="subtle">Subtle</minerva-tag>
    <minerva-tag color="primary" variant="outline">Outline</minerva-tag>
    <minerva-tag color="primary" variant="solid">Solid</minerva-tag>
    <minerva-tag color="primary" elevation>Elevation</minerva-tag>
  </div>
  <div style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center">
    <minerva-tag size="small">Small</minerva-tag>
    <minerva-tag size="medium">Medium</minerva-tag>
    <minerva-tag size="large">Large</minerva-tag>
    <minerva-tag shape="square">Square</minerva-tag>
    <minerva-tag shape="rounded">Rounded</minerva-tag>
    <minerva-tag shape="circle">Circle</minerva-tag>
  </div>
  <div style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center">
    <minerva-tag color="success">
      <span slot="icon" aria-hidden="true">✓</span>
      Deployed
    </minerva-tag>
    <minerva-tag variant="outline">
      <minerva-avatar
        slot="avatar"
        size="xsmall"
        name="Ada Lovelace"
      ></minerva-avatar>
      Ada Lovelace
    </minerva-tag>
    <minerva-tag loading>Syncing</minerva-tag>
    <minerva-tag disabled closable>Disabled</minerva-tag>
  </div>
</div>

```

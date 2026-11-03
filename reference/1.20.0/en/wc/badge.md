# Badge

A small count or status indicator attached to the corner of another element.

Package: minerva-design@1.20.0

Renderer: wc

Locale: en

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

## Badge

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/badge",
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
    "typeText": "\"solid\" | \"subtle\" | \"outline\"",
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
    "name": "content",
    "typeText": "string | undefined",
    "attribute": "content",
    "required": false
  },
  {
    "name": "position",
    "typeText": "\"top-right\" | \"top-left\" | \"bottom-right\" | \"bottom-left\"",
    "attribute": "position",
    "required": false
  },
  {
    "name": "dot",
    "typeText": "boolean",
    "attribute": "dot",
    "required": false
  },
  {
    "name": "borderRadius",
    "typeText": "string | undefined",
    "attribute": "border-radius",
    "required": false
  },
  {
    "name": "borderWidth",
    "typeText": "string | undefined",
    "attribute": "border-width",
    "required": false
  },
  {
    "name": "badgeRole",
    "typeText": "string",
    "attribute": "badge-role",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "description": "Element the badge is attached to, or the text of a standalone badge"
  },
  {
    "name": "content",
    "description": "Rich content of the badge (instead of `content`)"
  },
  {
    "name": "icon",
    "description": "Icon displayed before the content"
  }
]
```

## API

```json
{
  "wc:minerva-badge": {
    "kind": "element",
    "source": "web-components/src/components/badge/badge.ts",
    "className": "MinervaBadge",
    "summary": "Count / status indicator, standalone or attached to an element.",
    "description": "A small count or status indicator (`<Badge>` of React). - With element children (default slot) the badge is attached to a corner of them (`position`), inside a relatively positioned wrapper; its text comes from `content` / the `content` slot (localized \"Badge\" otherwise). - Without children, or with plain text children, it is a standalone badge rendered inline (the text is the badge's content). The badge is a polite `role=\"status\"` region by default; set `badge-role=\"presentation\"` when it must not be announced.",
    "properties": [
      {
        "name": "color",
        "attribute": "color",
        "type": "\"primary\" | \"neutral\" | \"success\" | \"warning\" | \"danger\" | \"info\"",
        "default": "\"primary\"",
        "description": "Semantic color"
      },
      {
        "name": "variant",
        "attribute": "variant",
        "type": "\"solid\" | \"subtle\" | \"outline\"",
        "default": "\"solid\"",
        "description": "Visual style: solid (filled), subtle (tinted) or outline (bordered)"
      },
      {
        "name": "size",
        "attribute": "size",
        "type": "\"small\" | \"medium\" | \"large\"",
        "default": "\"medium\"",
        "description": "Badge size"
      },
      {
        "name": "content",
        "attribute": "content",
        "type": "string | undefined",
        "description": "Text of the badge (count, short text); use the `content` slot for rich content"
      },
      {
        "name": "position",
        "attribute": "position",
        "type": "\"top-right\" | \"top-left\" | \"bottom-right\" | \"bottom-left\"",
        "default": "\"top-right\"",
        "description": "Corner of the children the badge is placed on (ignored by standalone badges)"
      },
      {
        "name": "dot",
        "attribute": "dot",
        "type": "boolean",
        "default": "false",
        "description": "Renders a small dot instead of content"
      },
      {
        "name": "borderRadius",
        "attribute": "border-radius",
        "type": "string | undefined",
        "description": "Custom border radius (CSS value)"
      },
      {
        "name": "borderWidth",
        "attribute": "border-width",
        "type": "string | undefined",
        "description": "Custom border width (CSS value)"
      },
      {
        "name": "badgeRole",
        "attribute": "badge-role",
        "type": "string",
        "default": "\"status\"",
        "description": "ARIA role of the badge (\"presentation\" / \"none\" to stop announcing it)"
      }
    ],
    "methods": [],
    "events": [],
    "slots": [
      {
        "name": "",
        "description": "Element the badge is attached to, or the text of a standalone badge"
      },
      {
        "name": "content",
        "description": "Rich content of the badge (instead of `content`)"
      },
      {
        "name": "icon",
        "description": "Icon displayed before the content"
      }
    ],
    "parts": [
      {
        "name": "root",
        "description": "The outermost element: the badge itself when standalone, the wrapper of the children when attached"
      },
      {
        "name": "badge",
        "description": "The badge attached to a corner of the children (a standalone badge is the root)"
      },
      {
        "name": "icon",
        "description": "The icon before the content"
      }
    ],
    "cssProperties": [
      {
        "name": "--badge-bg",
        "description": "Background color (overrides the color and variant)"
      },
      {
        "name": "--badge-fg",
        "description": "Text color (overrides the color and variant)"
      },
      {
        "name": "--badge-border",
        "description": "Border color of the subtle and outline variants"
      },
      {
        "name": "--badge-radius",
        "description": "Corner radius (defaults to --radius-sm)"
      },
      {
        "name": "--badge-padding-y",
        "description": "Vertical padding (every size)"
      },
      {
        "name": "--badge-padding-x",
        "description": "Horizontal padding (every size)"
      },
      {
        "name": "--badge-font-size",
        "description": "Font size (every size)"
      },
      {
        "name": "--badge-dot-size",
        "description": "Diameter of the dot badge"
      },
      {
        "name": "--badge-ring-color",
        "description": "Color of the ring separating an attached (corner) badge from its content (defaults to --surface-color)"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:Badge": {
    "kind": "cssVars",
    "source": "react/src/components/Badge",
    "vars": [
      {
        "name": "--badge-bg",
        "description": "Background color (overrides the color and variant)"
      },
      {
        "name": "--badge-fg",
        "description": "Text color (overrides the color and variant)"
      },
      {
        "name": "--badge-border",
        "description": "Border color of the subtle and outline variants"
      },
      {
        "name": "--badge-radius",
        "description": "Corner radius (defaults to --radius-sm)"
      },
      {
        "name": "--badge-padding-y",
        "description": "Vertical padding (every size)"
      },
      {
        "name": "--badge-padding-x",
        "description": "Horizontal padding (every size)"
      },
      {
        "name": "--badge-font-size",
        "description": "Font size (every size)"
      },
      {
        "name": "--badge-dot-size",
        "description": "Diameter of the dot badge"
      },
      {
        "name": "--badge-ring-color",
        "description": "Color of the ring separating an attached (corner) badge from its content (defaults to --surface-color)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Basic usage

With an element child the badge is attached to its corner and shows content; with text only it is a standalone badge.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/badge/wc/basic.html

```html
<div style="display: flex; flex-wrap: wrap; gap: 24px; align-items: center">
  <minerva-badge content="5" aria-label="5 unread messages">
    <minerva-button variant="outline" color="neutral">Inbox</minerva-button>
  </minerva-badge>
  <minerva-badge dot color="danger" aria-label="New activity">
    <minerva-avatar name="Ada Lovelace"></minerva-avatar>
  </minerva-badge>
  <minerva-badge>New</minerva-badge>
  <minerva-badge color="success" variant="subtle">Active</minerva-badge>
</div>

```

## Example: Colors, variants and sizes

Six colors, three variants and three sizes; border-radius and border-width customize the shape.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/badge/wc/colors-variants.html

```html
<div style="display: grid; gap: 12px">
  <div style="display: flex; flex-wrap: wrap; gap: 8px">
    <minerva-badge color="primary">Primary</minerva-badge>
    <minerva-badge color="success">Success</minerva-badge>
    <minerva-badge color="warning">Warning</minerva-badge>
    <minerva-badge color="danger">Danger</minerva-badge>
    <minerva-badge color="info">Info</minerva-badge>
    <minerva-badge color="neutral">Neutral</minerva-badge>
  </div>
  <div style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center">
    <minerva-badge variant="solid">Solid</minerva-badge>
    <minerva-badge variant="subtle">Subtle</minerva-badge>
    <minerva-badge variant="outline">Outline</minerva-badge>
    <minerva-badge size="small">Small</minerva-badge>
    <minerva-badge size="medium">Medium</minerva-badge>
    <minerva-badge size="large">Large</minerva-badge>
    <minerva-badge border-radius="4px" border-width="2px" variant="outline"
      >Custom</minerva-badge
    >
  </div>
</div>

```

## Example: Positions and dots

position picks the corner of the child. A dot badge has no text: give it an aria-label, or badge-role="presentation" when it must not be announced.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/badge/wc/positions.html

```html
<div style="display: flex; flex-wrap: wrap; gap: 32px; align-items: center">
  <minerva-badge position="top-right" content="3" badge-role="presentation">
    <minerva-avatar shape="rounded" name="Top Right"></minerva-avatar>
  </minerva-badge>
  <minerva-badge position="top-left" content="3" badge-role="presentation">
    <minerva-avatar shape="rounded" name="Top Left"></minerva-avatar>
  </minerva-badge>
  <minerva-badge
    position="bottom-right"
    dot
    color="success"
    aria-label="Online"
  >
    <minerva-avatar name="Bottom Right"></minerva-avatar>
  </minerva-badge>
  <minerva-badge position="bottom-left" dot color="warning" aria-label="Away">
    <minerva-avatar name="Bottom Left"></minerva-avatar>
  </minerva-badge>
</div>

```

## Example: Icons, rich content and updates

The icon slot adds an icon, the content slot rich content. content is a property: click the button to update the count.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/badge/wc/slots.html

```html
<div style="display: flex; flex-wrap: wrap; gap: 24px; align-items: center">
  <minerva-badge id="cart" content="0" color="danger">
    <minerva-button id="add" variant="outline" color="neutral"
      >Add to cart</minerva-button
    >
  </minerva-badge>
  <minerva-badge color="success" variant="subtle">
    <span slot="icon" aria-hidden="true">✓</span>
    Verified
  </minerva-badge>
  <minerva-badge color="info">
    <minerva-button variant="ghost" color="neutral">Updates</minerva-button>
    <span slot="content"><strong>99</strong>+</span>
  </minerva-badge>
</div>

```

### apps/docs/src/docs/pages/badge/wc/slots.ts

```tsx
// `content` is a regular property: update it and the polite status badge
// announces the new count.
export function setup(root: HTMLElement) {
  const cart = root.querySelector<HTMLElement & { content: string }>("#cart")!;
  const add = root.querySelector<HTMLElement>("#add")!;
  let count = 0;
  const onClick = () => (cart.content = String(++count));
  add.addEventListener("click", onClick);
  return () => add.removeEventListener("click", onClick);
}

```

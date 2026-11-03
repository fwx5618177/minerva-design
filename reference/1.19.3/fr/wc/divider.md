# Divider

Une fine ligne qui sépare du contenu, horizontalement ou verticalement, éventuellement avec du texte.

Package: minerva-design@1.19.3

Renderer: wc

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "19932861fda2d088219d708a8ca132bea760a32b",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:ed8b6b1bf30e9055934099f84afd6b8369eee155b0404de5e8db004c3d91bce6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

## Divider

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/divider",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "variant",
    "typeText": "\"solid\" | \"dashed\" | \"dotted\"",
    "attribute": "variant",
    "required": false
  },
  {
    "name": "orientation",
    "typeText": "\"horizontal\" | \"vertical\"",
    "attribute": "orientation",
    "required": false
  },
  {
    "name": "thickness",
    "typeText": "number",
    "attribute": "thickness",
    "required": false
  },
  {
    "name": "length",
    "typeText": "string | number | undefined",
    "attribute": "length",
    "required": false
  },
  {
    "name": "spacing",
    "typeText": "number",
    "attribute": "spacing",
    "required": false
  },
  {
    "name": "textAlign",
    "typeText": "\"left\" | \"center\" | \"right\"",
    "attribute": "text-align",
    "required": false
  },
  {
    "name": "elevation",
    "typeText": "boolean",
    "attribute": "elevation",
    "required": false
  },
  {
    "name": "flexItem",
    "typeText": "boolean",
    "attribute": "flex-item",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "description": "Optional text of a horizontal divider (ignored when vertical)"
  }
]
```

## API

```json
{
  "wc:minerva-divider": {
    "kind": "element",
    "source": "web-components/src/components/divider/divider.ts",
    "className": "MinervaDivider",
    "summary": "Separator line, optionally with text.",
    "description": "A horizontal or vertical separator line (`<Divider>` of React). Without content it renders a native `<hr>` (implicit `separator` role); text in the default slot is rendered between the two halves of a horizontal divider (`role=\"separator\"`). The line color comes from `--divider-color`. Vertical dividers are inline (1em high); `flex-item` stretches one to the height of its flex container.",
    "properties": [
      {
        "name": "variant",
        "attribute": "variant",
        "type": "\"solid\" | \"dashed\" | \"dotted\"",
        "default": "\"solid\"",
        "description": "Line style"
      },
      {
        "name": "orientation",
        "attribute": "orientation",
        "type": "\"horizontal\" | \"vertical\"",
        "default": "\"horizontal\"",
        "description": "Divider direction"
      },
      {
        "name": "thickness",
        "attribute": "thickness",
        "type": "number",
        "default": "1",
        "description": "Line thickness in pixels"
      },
      {
        "name": "length",
        "attribute": "length",
        "type": "string | number | undefined",
        "description": "Length of the line (width when horizontal, height when vertical): px number or CSS length"
      },
      {
        "name": "spacing",
        "attribute": "spacing",
        "type": "number",
        "default": "16",
        "description": "Margin around the divider in pixels (block axis when horizontal, inline axis when vertical)"
      },
      {
        "name": "textAlign",
        "attribute": "text-align",
        "type": "\"left\" | \"center\" | \"right\"",
        "default": "\"center\"",
        "description": "Position of the text"
      },
      {
        "name": "elevation",
        "attribute": "elevation",
        "type": "boolean",
        "default": "false",
        "description": "Adds a subtle shadow"
      },
      {
        "name": "flexItem",
        "attribute": "flex-item",
        "type": "boolean",
        "default": "false",
        "description": "Vertical divider stretching to the height of its flex container"
      }
    ],
    "methods": [],
    "events": [],
    "slots": [
      {
        "name": "",
        "description": "Optional text of a horizontal divider (ignored when vertical)"
      }
    ],
    "parts": [
      {
        "name": "root",
        "description": "The <hr>, or the role=separator element of a divider with text (align: position of the text)"
      },
      {
        "name": "label",
        "description": "The text between the two halves of the line"
      }
    ],
    "cssProperties": [
      {
        "name": "--divider-color",
        "description": "Line color (defaults to --border-color)"
      },
      {
        "name": "--divider-thickness",
        "description": "Line thickness"
      },
      {
        "name": "--divider-spacing",
        "description": "Inline margin around a vertical divider"
      },
      {
        "name": "--divider-text-gap",
        "description": "Space between the text and the lines"
      },
      {
        "name": "--divider-text-font-size",
        "description": "Font size of the text"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:Divider": {
    "kind": "cssVars",
    "source": "react/src/components/Divider",
    "vars": [
      {
        "name": "--divider-color",
        "description": "Line color (defaults to --border-color)"
      },
      {
        "name": "--divider-thickness",
        "description": "Line thickness"
      },
      {
        "name": "--divider-spacing",
        "description": "Inline margin around a vertical divider"
      },
      {
        "name": "--divider-text-gap",
        "description": "Space between the text and the lines"
      },
      {
        "name": "--divider-text-font-size",
        "description": "Font size of the text"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Utilisation de base

Un séparateur horizontal distingue les première et deuxième sections.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/divider/wc/basic.html

```html
<div style="width: 100%">
  <p>Content above the divider.</p>
  <minerva-divider></minerva-divider>
  <p>Content below the divider.</p>
</div>

```

## Example: Style personnalisé

Définissez la couleur de la ligne avec la propriété personnalisée CSS --divider-color (style en ligne, classe ou ancêtre), et personnalisez l'épaisseur, la longueur, l'espacement et l'ombre elevation.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/divider/wc/custom-style.html

```html
<div style="width: 100%">
  <minerva-divider
    style="--divider-color: #7c3aed"
    thickness="2"
  ></minerva-divider
  ><minerva-divider
    style="--divider-color: #16a34a"
    thickness="3"
    variant="dashed"
    length="50%"
  ></minerva-divider
  ><minerva-divider style="--divider-color: #7c3aed">Section</minerva-divider
  ><minerva-divider spacing="32" elevation></minerva-divider>
</div>

```

## Example: Dans un conteneur flex

flexItem étire un séparateur vertical sur la hauteur de son conteneur flex.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/divider/wc/flex-item.html

```html
<div style="display: flex; align-items: center; gap: 12px; height: 48px">
  <span>Edit</span
  ><minerva-divider
    orientation="vertical"
    flex-item
    spacing="0"
  ></minerva-divider
  ><span>Share</span
  ><minerva-divider
    orientation="vertical"
    flex-item
    spacing="0"
  ></minerva-divider
  ><span>Delete</span>
</div>

```

## Example: Styles de ligne

Pleine (par défaut), tirets ou pointillés.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/divider/wc/variants.html

```html
<div style="width: 100%">
  <minerva-divider variant="solid"></minerva-divider
  ><minerva-divider variant="dashed"></minerva-divider
  ><minerva-divider variant="dotted"></minerva-divider>
</div>

```

## Example: Vertical

Des séparateurs verticaux distinguent Home, Products et About.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/divider/wc/vertical.html

```html
<div style="display: flex; align-items: center">
  <span>Home</span
  ><minerva-divider
    orientation="vertical"
    length="16"
    spacing="12"
  ></minerva-divider
  ><span>Products</span
  ><minerva-divider
    orientation="vertical"
    length="16"
    spacing="12"
  ></minerva-divider
  ><span>About</span>
</div>

```

## Example: Avec texte

Comparer les libellés Left, Center et Right ; le séparateur aligné à droite est en pointillés.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/divider/wc/with-text.html

```html
<div style="width: 100%">
  <minerva-divider text-align="left">Left</minerva-divider
  ><minerva-divider>Center</minerva-divider
  ><minerva-divider text-align="right" variant="dashed" thickness="3"
    >Right</minerva-divider
  >
</div>

```

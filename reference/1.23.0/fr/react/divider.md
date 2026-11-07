# Divider

Une fine ligne qui sépare du contenu, horizontalement ou verticalement, éventuellement avec du texte.

Package: minerva-design@1.23.0

Renderer: react

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

## Divider

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "Divider"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "variant",
    "source": "packages/react/src/components/Divider/types.ts",
    "kind": "enum",
    "values": [
      "dashed",
      "dotted",
      "solid"
    ],
    "typeText": "DividerVariant | undefined",
    "typeRef": "type:8fbf4858d9d96a607668",
    "default": "solid",
    "required": false,
    "description": "Line style"
  },
  {
    "name": "orientation",
    "source": "packages/react/src/components/Divider/types.ts",
    "kind": "enum",
    "values": [
      "horizontal",
      "vertical"
    ],
    "typeText": "DividerOrientation | undefined",
    "typeRef": "type:a43f1cfe4f5f39a5ea1b",
    "default": "horizontal",
    "required": false,
    "description": "Divider direction"
  },
  {
    "name": "thickness",
    "source": "packages/react/src/components/Divider/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 1,
    "required": false,
    "description": "Line thickness in pixels"
  },
  {
    "name": "length",
    "source": "packages/react/src/components/Divider/types.ts",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "required": false,
    "description": "Length of the line (width when horizontal, height when vertical)"
  },
  {
    "name": "spacing",
    "source": "packages/react/src/components/Divider/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 16,
    "required": false,
    "description": "Margin around the divider in pixels (top/bottom when horizontal, left/right when vertical)"
  },
  {
    "name": "textAlign",
    "source": "packages/react/src/components/Divider/types.ts",
    "kind": "enum",
    "values": [
      "center",
      "left",
      "right"
    ],
    "typeText": "DividerTextAlign | undefined",
    "typeRef": "type:18ff15a8c48cf9f8688f",
    "default": "center",
    "required": false,
    "description": "Position of the text"
  },
  {
    "name": "elevation",
    "source": "packages/react/src/components/Divider/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Adds a subtle shadow"
  },
  {
    "name": "flexItem",
    "source": "packages/react/src/components/Divider/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Vertical divider inside a flex container: stretches to the container height (align-self: stretch) instead of the 1em inline height"
  }
]
```

### slots

```json
[
  {
    "name": "children"
  }
]
```

## API

```json
{
  "DividerProps": {
    "source": "react/src/components/Divider/types.ts",
    "description": "The line color comes from the `--divider-color` CSS custom property (default `var(--border-color)`); set it through `className` or `style`.",
    "kind": "interface",
    "extends": [
      "Omit<HTMLAttributes<HTMLElement>, \"children\" | \"color\">"
    ],
    "props": [
      {
        "name": "variant",
        "type": "DividerVariant",
        "required": false,
        "default": "\"solid\"",
        "description": "Line style"
      },
      {
        "name": "orientation",
        "type": "DividerOrientation",
        "required": false,
        "default": "\"horizontal\"",
        "description": "Divider direction"
      },
      {
        "name": "thickness",
        "type": "number",
        "required": false,
        "default": "1",
        "description": "Line thickness in pixels"
      },
      {
        "name": "length",
        "type": "number | string",
        "required": false,
        "description": "Length of the line (width when horizontal, height when vertical)"
      },
      {
        "name": "spacing",
        "type": "number",
        "required": false,
        "default": "16",
        "description": "Margin around the divider in pixels (top/bottom when horizontal, left/right when vertical)"
      },
      {
        "name": "children",
        "type": "React.ReactNode",
        "required": false,
        "description": "Optional text rendered inside a horizontal divider (ignored when vertical). Without text the divider is a native <hr>"
      },
      {
        "name": "textAlign",
        "type": "DividerTextAlign",
        "required": false,
        "default": "\"center\"",
        "description": "Position of the text"
      },
      {
        "name": "elevation",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Adds a subtle shadow"
      },
      {
        "name": "flexItem",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Vertical divider inside a flex container: stretches to the container height (align-self: stretch) instead of the 1em inline height"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional class name"
      },
      {
        "name": "style",
        "type": "React.CSSProperties",
        "required": false,
        "description": "Inline styles"
      },
      {
        "name": "ref",
        "type": "Ref<HTMLElement>",
        "required": false,
        "description": "Ref to the root element (<hr>, or <div> when rendering text)"
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

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/divider/demos/basic.tsx

```tsx
import { Divider } from "minerva-design";

export default function BasicDemo() {
  return (
    <div style={{ width: "100%" }}>
      <p>Content above the divider.</p>
      <Divider />
      <p>Content below the divider.</p>
    </div>
  );
}

```

## Example: Style personnalisé

Définissez la couleur de la ligne avec la propriété personnalisée CSS --divider-color (style en ligne, classe ou ancêtre), et personnalisez l'épaisseur, la longueur, l'espacement et l'ombre elevation.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/divider/demos/custom-style.tsx

```tsx
import type { CSSProperties } from "react";
import { Divider } from "minerva-design";

// The line color comes from the --divider-color custom property; set it
// inline, in a class or on an ancestor.
const violet = { "--divider-color": "#7c3aed" } as CSSProperties;
const green = { "--divider-color": "#16a34a" } as CSSProperties;

export default function CustomStyleDemo() {
  return (
    <div style={{ width: "100%" }}>
      <Divider style={violet} thickness={2} />
      <Divider style={green} thickness={3} variant="dashed" length="50%" />
      <Divider style={violet}>Section</Divider>
      <Divider spacing={32} elevation />
    </div>
  );
}

```

## Example: Dans un conteneur flex

flexItem étire un séparateur vertical sur la hauteur de son conteneur flex.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/divider/demos/flex-item.tsx

```tsx
import { Divider } from "minerva-design";

export default function FlexItemDemo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, height: 48 }}>
      <span>Edit</span>
      <Divider orientation="vertical" flexItem spacing={0} />
      <span>Share</span>
      <Divider orientation="vertical" flexItem spacing={0} />
      <span>Delete</span>
    </div>
  );
}

```

## Example: Styles de ligne

Pleine (par défaut), tirets ou pointillés.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/divider/demos/variants.tsx

```tsx
import { Divider } from "minerva-design";

export default function VariantsDemo() {
  return (
    <div style={{ width: "100%" }}>
      <Divider variant="solid" />
      <Divider variant="dashed" />
      <Divider variant="dotted" />
    </div>
  );
}

```

## Example: Vertical

Des séparateurs verticaux distinguent Home, Products et About.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/divider/demos/vertical.tsx

```tsx
import { Divider } from "minerva-design";

export default function VerticalDemo() {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <span>Home</span>
      <Divider orientation="vertical" length={16} spacing={12} />
      <span>Products</span>
      <Divider orientation="vertical" length={16} spacing={12} />
      <span>About</span>
    </div>
  );
}

```

## Example: Avec texte

Comparer les libellés Left, Center et Right ; le séparateur aligné à droite est en pointillés.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/divider/demos/with-text.tsx

```tsx
import { Divider } from "minerva-design";

export default function WithTextDemo() {
  return (
    <div style={{ width: "100%" }}>
      <Divider textAlign="left">Left</Divider>
      <Divider>Center</Divider>
      <Divider textAlign="right" variant="dashed" thickness={3}>
        Right
      </Divider>
    </div>
  );
}

```

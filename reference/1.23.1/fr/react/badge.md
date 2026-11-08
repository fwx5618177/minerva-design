# Badge

Petit compteur ou indicateur d'état attaché au coin d'un autre élément.

Package: minerva-design@1.23.1

Renderer: react

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "6ccf4f2c7a65dd5b27e517c9a50ea4867f8e7980",
  "sourceDigest": "sha256:2005faebbf738765fe81a5c952fa47a51311aa5d05e3220f71c542b8b1fe369b",
  "referenceSourceDigest": "sha256:3616b5d4e7cf7e0eb1fbe04c879d1630cc3dfd5c28f16762b8ad6f3f3525ef82"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

## Documentation

## Badge

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "Badge"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "color",
    "source": "packages/react/src/components/Badge/types.ts",
    "kind": "enum",
    "values": [
      "danger",
      "info",
      "neutral",
      "primary",
      "success",
      "warning"
    ],
    "typeText": "ColorScheme | undefined",
    "typeRef": "type:67f905b25ade366da2d8",
    "default": "primary",
    "required": false,
    "description": "Semantic color of the badge"
  },
  {
    "name": "variant",
    "source": "packages/react/src/components/Badge/types.ts",
    "kind": "enum",
    "values": [
      "outline",
      "solid",
      "subtle"
    ],
    "typeText": "\"solid\" | \"subtle\" | \"outline\" | undefined",
    "typeRef": "type:2399c7b51bc7a672b1d1",
    "default": "solid",
    "required": false,
    "description": "Visual style: `solid` (filled), `subtle` (tinted background) or `outline` (bordered)"
  },
  {
    "name": "size",
    "source": "packages/react/src/components/Badge/types.ts",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "small"
    ],
    "typeText": "\"small\" | \"medium\" | \"large\" | undefined",
    "typeRef": "type:8d5b6882dc615b54818b",
    "default": "medium",
    "required": false,
    "description": "Badge size"
  },
  {
    "name": "content",
    "source": "packages/react/src/components/Badge/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Content displayed inside the badge (count, short text, icon + text...). Use it instead of children for rich content of a standalone badge"
  },
  {
    "name": "position",
    "source": "packages/react/src/components/Badge/types.ts",
    "kind": "enum",
    "values": [
      "bottom-left",
      "bottom-right",
      "top-left",
      "top-right"
    ],
    "typeText": "\"top-right\" | \"top-left\" | \"bottom-right\" | \"bottom-left\" | undefined",
    "typeRef": "type:05a7a827619b4457785a",
    "default": "top-right",
    "required": false,
    "description": "Corner of the children the badge is placed on (ignored by standalone badges)"
  },
  {
    "name": "dot",
    "source": "packages/react/src/components/Badge/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Renders a small dot instead of content"
  },
  {
    "name": "borderRadius",
    "source": "packages/react/src/components/Badge/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Custom border radius (CSS value)"
  },
  {
    "name": "borderWidth",
    "source": "packages/react/src/components/Badge/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Custom border width (CSS value)"
  },
  {
    "name": "aria-label",
    "source": "packages/react/src/components/Badge/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label of the badge, e.g. \"5 unread messages\""
  },
  {
    "name": "icon",
    "source": "packages/react/src/components/Badge/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Icon displayed before the content"
  },
  {
    "name": "role",
    "source": "packages/react/src/components/Badge/types.ts",
    "kind": "union",
    "typeText": "AriaRole | undefined",
    "typeRef": "type:40806c1dba45f4ea6730",
    "default": "status",
    "required": false,
    "description": "ARIA role of the badge element; set it to \"presentation\" or \"none\" when the badge must not be announced as a live status"
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
  "BadgeProps": {
    "source": "react/src/components/Badge/types.ts",
    "description": "Props of the Badge. Colors come from the theme tokens of `color`. To override them for a single badge, set these CSS custom properties (e.g. through `style` or a class): `--badge-bg` (background), `--badge-fg` (text) and `--badge-border` (border color of the `outline` variant).",
    "kind": "interface",
    "extends": [
      "Omit<HTMLAttributes<HTMLSpanElement>, \"children\" | \"content\" | \"color\">"
    ],
    "props": [
      {
        "name": "children",
        "type": "React.ReactNode",
        "required": false,
        "description": "Element the badge is attached to. Without children (or with plain text / number children, used as the content) the badge renders inline in the normal flow instead of being positioned on a corner"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "default": "\"\"",
        "description": "Additional class name of the badge"
      },
      {
        "name": "color",
        "type": "ColorScheme",
        "required": false,
        "default": "\"primary\"",
        "description": "Semantic color of the badge"
      },
      {
        "name": "variant",
        "type": "\"solid\" | \"subtle\" | \"outline\"",
        "required": false,
        "default": "\"solid\"",
        "description": "Visual style: `solid` (filled), `subtle` (tinted background) or `outline` (bordered)"
      },
      {
        "name": "size",
        "type": "\"small\" | \"medium\" | \"large\"",
        "required": false,
        "default": "\"medium\"",
        "description": "Badge size"
      },
      {
        "name": "content",
        "type": "React.ReactNode",
        "required": false,
        "description": "Content displayed inside the badge (count, short text, icon + text...). Use it instead of children for rich content of a standalone badge"
      },
      {
        "name": "position",
        "type": "\"top-right\" | \"top-left\" | \"bottom-right\" | \"bottom-left\"",
        "required": false,
        "default": "\"top-right\"",
        "description": "Corner of the children the badge is placed on (ignored by standalone badges)"
      },
      {
        "name": "dot",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Renders a small dot instead of content"
      },
      {
        "name": "borderRadius",
        "type": "string",
        "required": false,
        "description": "Custom border radius (CSS value)"
      },
      {
        "name": "borderWidth",
        "type": "string",
        "required": false,
        "description": "Custom border width (CSS value)"
      },
      {
        "name": "aria-label",
        "type": "string",
        "required": false,
        "description": "Accessible label of the badge, e.g. \"5 unread messages\""
      },
      {
        "name": "icon",
        "type": "React.ReactNode",
        "required": false,
        "description": "Icon displayed before the content"
      },
      {
        "name": "role",
        "type": "React.AriaRole",
        "required": false,
        "default": "\"status\"",
        "description": "ARIA role of the badge element; set it to \"presentation\" or \"none\" when the badge must not be announced as a live status"
      },
      {
        "name": "ref",
        "type": "Ref<HTMLElement>",
        "required": false,
        "description": "Ref to the root element: the wrapper when attached to children, otherwise the badge itself"
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

## Example: Utilisation de base

Les notifications et messages affichent 5 et 99+ ; les badges en ligne indiquent Inbox 12 et New.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-icons

Documentation context imports: none

### apps/docs/src/docs/pages/badge/demos/basic.tsx

```tsx
import { Badge } from "minerva-design";
import { FaBell, FaEnvelope } from "react-icons/fa";

export default function BasicDemo() {
  return (
    <>
      <Badge content={5} aria-label="5 unread notifications">
        <FaBell size={24} aria-label="Notifications" />
      </Badge>
      <Badge content="99+" aria-label="More than 99 messages">
        <FaEnvelope size={24} aria-label="Messages" />
      </Badge>
      <span>
        Inbox <Badge content={12} color="info" aria-label="12 unread" /> and
        changelog <Badge color="success">New</Badge>
      </span>
    </>
  );
}

```

## Example: Couleurs

color définit la couleur sémantique : primary (par défaut), neutral, success, warning, danger et info.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-icons

Documentation context imports: none

### apps/docs/src/docs/pages/badge/demos/colors.tsx

```tsx
import { Badge } from "minerva-design";
import { FaBell } from "react-icons/fa";

const colors = [
  "primary",
  "neutral",
  "success",
  "warning",
  "danger",
  "info",
] as const;

export default function ColorsDemo() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
      {colors.map((color, index) => (
        <Badge
          key={color}
          color={color}
          content={index + 1}
          aria-label={`${color} badge`}
        >
          <FaBell size={24} title={color} />
        </Badge>
      ))}
    </div>
  );
}

```

## Example: Styles personnalisés

borderRadius et borderWidth ajustent la forme. Pour changer les couleurs, définissez les propriétés personnalisées CSS --badge-bg, --badge-fg et --badge-border (en ligne, dans une classe ou sur un élément parent).

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-icons

Documentation context imports: none

### apps/docs/src/docs/pages/badge/demos/custom-style.tsx

```tsx
import type { CSSProperties } from "react";
import { Badge } from "minerva-design";
import { FaBell } from "react-icons/fa";

// --badge-bg, --badge-fg and --badge-border override the theme colors; they
// can also be set from a stylesheet, for a single badge or a whole subtree.
const brand = {
  "--badge-bg": "#7c3aed",
  "--badge-fg": "#ffffff",
} as CSSProperties;

const outlined = {
  "--badge-fg": "#e65100",
  "--badge-border": "#e65100",
} as CSSProperties;

export default function CustomStyleDemo() {
  return (
    <div style={{ display: "flex", gap: 24 }}>
      <Badge content={1} borderRadius="12px" style={brand}>
        <FaBell size={24} />
      </Badge>
      <Badge content={2} variant="outline" borderWidth="2px" style={outlined}>
        <FaBell size={24} />
      </Badge>
    </div>
  );
}

```

## Example: Point

dot remplace le contenu par un petit point, pour signaler « quelque chose de nouveau ».

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-icons

Documentation context imports: none

### apps/docs/src/docs/pages/badge/demos/dot.tsx

```tsx
import { Badge } from "minerva-design";
import { FaBell } from "react-icons/fa";

export default function DotDemo() {
  return (
    <>
      <Badge dot color="primary" aria-label="New activity">
        <FaBell size={24} />
      </Badge>
      <Badge dot color="success" aria-label="Online">
        <FaBell size={24} />
      </Badge>
      <Badge dot color="danger" aria-label="Danger">
        <FaBell size={24} />
      </Badge>
    </>
  );
}

```

## Example: Positions

Placez le badge sur n'importe quel coin avec position.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-icons

Documentation context imports: none

### apps/docs/src/docs/pages/badge/demos/positions.tsx

```tsx
import { Badge } from "minerva-design";
import { FaBell } from "react-icons/fa";

const positions = [
  "top-right",
  "top-left",
  "bottom-right",
  "bottom-left",
] as const;

export default function PositionsDemo() {
  return (
    <div style={{ display: "flex", gap: 32 }}>
      {positions.map((position, index) => (
        <Badge key={position} position={position} content={index + 1}>
          <FaBell size={24} />
        </Badge>
      ))}
    </div>
  );
}

```

## Example: Tailles

Trois tailles : small, medium (par défaut) et large.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-icons

Documentation context imports: none

### apps/docs/src/docs/pages/badge/demos/sizes.tsx

```tsx
import { Badge } from "minerva-design";
import { FaBell } from "react-icons/fa";

export default function SizesDemo() {
  return (
    <>
      <Badge size="small" content="S">
        <FaBell size={24} />
      </Badge>
      <Badge size="medium" content="M">
        <FaBell size={24} />
      </Badge>
      <Badge size="large" content="L">
        <FaBell size={24} />
      </Badge>
    </>
  );
}

```

## Example: Point de statut

Un point autonome à côté d’un libellé indique le statut d’un élément ou la présence d’un utilisateur. Donnez au point role="presentation" quand le texte nomme déjà le statut, sinon un aria-label.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/badge/demos/status.tsx

```tsx
import { Badge, HStack } from "minerva-design";

const statuses = [
  { color: "success", label: "Online" },
  { color: "warning", label: "Away" },
  { color: "danger", label: "Busy" },
  { color: "neutral", label: "Offline" },
] as const;

export default function StatusDemo() {
  return (
    <HStack gap={4} wrap>
      {statuses.map(({ color, label }) => (
        <HStack key={label} gap={2} align="center">
          {/* The visible text names the status, so the dot is decorative */}
          <Badge dot color={color} role="presentation" />
          <span>{label}</span>
        </HStack>
      ))}
    </HStack>
  );
}

```

## Example: Variantes

variant définit le style visuel : solid (par défaut, plein), subtle (fond teinté) ou outline (bordé). Chaque variante fonctionne avec chaque couleur.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/badge/demos/variants.tsx

```tsx
import { Badge, HStack, VStack } from "minerva-design";

const variants = ["solid", "subtle", "outline"] as const;
const colors = [
  "primary",
  "neutral",
  "success",
  "warning",
  "danger",
  "info",
] as const;

export default function VariantsDemo() {
  return (
    <VStack gap={3}>
      {variants.map((variant) => (
        <HStack key={variant} gap={2} wrap>
          {colors.map((color) => (
            <Badge key={color} variant={variant} color={color}>
              {variant} {color}
            </Badge>
          ))}
        </HStack>
      ))}
    </VStack>
  );
}

```

## Example: Avec icône

icon s'affiche avant le contenu.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-icons

Documentation context imports: none

### apps/docs/src/docs/pages/badge/demos/with-icon.tsx

```tsx
import { Badge } from "minerva-design";
import { FaCheck, FaStar, FaUser } from "react-icons/fa";

export default function WithIconDemo() {
  return (
    <div style={{ display: "flex", gap: 48 }}>
      <Badge
        color="success"
        icon={<FaCheck />}
        content="OK"
        aria-label="Verified"
      >
        <FaUser size={24} />
      </Badge>
      <Badge
        color="warning"
        icon={<FaStar />}
        content="Top"
        aria-label="Top rated"
      >
        <FaUser size={24} />
      </Badge>
    </div>
  );
}

```

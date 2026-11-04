# Card

Un conteneur qui regroupe du contenu et des actions liés, composé de CardHeader, CardTitle, CardDescription, CardContent et CardFooter.

Package: minerva-design@1.20.2

Renderer: react

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.2",
  "sourceCommit": "8d5d0df3644b1fa1c267b3dd6809b0e7eb1ce75b",
  "sourceDigest": "sha256:2862a9e3a864c9423aed5d287db6fac7e8ddf58b9f5d144c61e7ff4a2630890e",
  "referenceSourceDigest": "sha256:b329acf9d5eb6cf4b4b42169ce925c67b033f581b616664bf07fc6d664de45f0"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.2/types.json) or getType() from minerva-design/contracts.

## Documentation

## Card

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "Card"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "variant",
    "source": "packages/react/src/components/Card/types.ts",
    "kind": "enum",
    "values": [
      "default",
      "elevated",
      "filled",
      "ghost",
      "outline"
    ],
    "typeText": "CardVariant | undefined",
    "typeRef": "type:5d20318adea570c6676c",
    "default": "default",
    "required": false,
    "description": "Visual style of the card: bordered (`default`, `outline`), shadowed (`elevated`), a muted block (`filled`) or transparent until hovered when interactive (`ghost`)"
  },
  {
    "name": "padding",
    "source": "packages/react/src/components/Card/types.ts",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "none",
      "small"
    ],
    "typeText": "CardPadding | undefined",
    "typeRef": "type:e634401793582eb9944c",
    "required": false,
    "description": "Pads the card itself (sections then sit flush, separated by spacing and a footer rule). When omitted the classic layout is used: each section pads itself and has its own background and divider"
  },
  {
    "name": "interactive",
    "source": "packages/react/src/components/Card/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Adds hover and focus-visible feedback for clickable cards (combine with `as=\"a\"` / `as=\"button\"`)"
  },
  {
    "name": "as",
    "source": "packages/react/src/components/Card/types.ts",
    "kind": "union",
    "typeText": "ElementType | undefined",
    "typeRef": "type:a576b79e37ed7758f7d3",
    "parameters": [
      {
        "name": "props",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "any",
        "typeRef": "type:60147dc54bd779d71e81"
      }
    ],
    "returnType": {
      "typeText": "ReactNode | Promise<ReactNode>",
      "typeRef": "type:e41c0ac1000472a34131"
    },
    "default": "div",
    "required": false,
    "description": "Element or component rendered as the root, e.g. \"a\", \"button\", \"article\""
  },
  {
    "name": "type",
    "source": "packages/react/src/components/Card/types.ts",
    "kind": "enum",
    "values": [
      "button",
      "reset",
      "submit"
    ],
    "typeText": "\"button\" | \"submit\" | \"reset\" | undefined",
    "typeRef": "type:212fa332b39b336d0842",
    "default": "button",
    "required": false,
    "description": "Native `type` of the root when `as=\"button\"`"
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

## CardContent

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "CardContent"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "animation",
    "source": "packages/react/src/components/Card/types.ts",
    "kind": "enum",
    "values": [
      "fadeIn",
      "slideIn",
      "zoomIn"
    ],
    "typeText": "\"fadeIn\" | \"slideIn\" | \"zoomIn\" | undefined",
    "typeRef": "type:25f7212df20e4aa165f1",
    "required": false,
    "description": "Entrance animation of the content"
  },
  {
    "name": "padding",
    "source": "packages/react/src/components/Card/types.ts",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "none",
      "small"
    ],
    "typeText": "CardPadding | undefined",
    "typeRef": "type:e634401793582eb9944c",
    "required": false,
    "description": "Overrides the inner spacing of this section"
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

## CardDescription

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "CardDescription"
  ],
  "kind": "named"
}
```

### slots

```json
[
  {
    "name": "children"
  }
]
```

## CardFooter

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "CardFooter"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "padding",
    "source": "packages/react/src/components/Card/types.ts",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "none",
      "small"
    ],
    "typeText": "CardPadding | undefined",
    "typeRef": "type:e634401793582eb9944c",
    "required": false,
    "description": "Overrides the inner spacing of this section"
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

## CardHeader

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "CardHeader"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "padding",
    "source": "packages/react/src/components/Card/types.ts",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "none",
      "small"
    ],
    "typeText": "CardPadding | undefined",
    "typeRef": "type:e634401793582eb9944c",
    "required": false,
    "description": "Overrides the inner spacing of this section"
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

## CardTitle

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "CardTitle"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "as",
    "source": "packages/react/src/components/Card/types.ts",
    "kind": "enum",
    "values": [
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6"
    ],
    "typeText": "\"h1\" | \"h2\" | \"h3\" | \"h4\" | \"h5\" | \"h6\" | undefined",
    "typeRef": "type:50add79571d672ce8802",
    "default": "h3",
    "required": false,
    "description": "Heading level rendered"
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
  "CardProps": {
    "source": "react/src/components/Card/types.ts",
    "kind": "interface",
    "extends": [
      "CardRootAttributes"
    ],
    "props": [
      {
        "name": "children",
        "type": "React.ReactNode",
        "required": false,
        "description": "Card content, usually CardHeader, CardContent and CardFooter"
      },
      {
        "name": "variant",
        "type": "CardVariant",
        "required": false,
        "default": "\"default\"",
        "description": "Visual style of the card: bordered (`default`, `outline`), shadowed (`elevated`), a muted block (`filled`) or transparent until hovered when interactive (`ghost`)"
      },
      {
        "name": "padding",
        "type": "CardPadding",
        "required": false,
        "description": "Pads the card itself (sections then sit flush, separated by spacing and a footer rule). When omitted the classic layout is used: each section pads itself and has its own background and divider"
      },
      {
        "name": "interactive",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Adds hover and focus-visible feedback for clickable cards (combine with `as=\"a\"` / `as=\"button\"`)"
      },
      {
        "name": "as",
        "type": "ElementType",
        "required": false,
        "default": "\"div\"",
        "description": "Element or component rendered as the root, e.g. \"a\", \"button\", \"article\""
      },
      {
        "name": "type",
        "type": "\"button\" | \"submit\" | \"reset\"",
        "required": false,
        "default": "\"button\"",
        "description": "Native `type` of the root when `as=\"button\"`"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "default": "\"\"",
        "description": "Additional class name"
      },
      {
        "name": "ref",
        "type": "Ref<HTMLElement>",
        "required": false,
        "description": "Ref to the root element"
      }
    ]
  },
  "CardHeaderProps": {
    "source": "react/src/components/Card/types.ts",
    "kind": "interface",
    "extends": [
      "Omit<HTMLAttributes<HTMLDivElement>, \"children\">"
    ],
    "props": [
      {
        "name": "children",
        "type": "React.ReactNode",
        "required": false,
        "description": "Header content, usually CardTitle and CardDescription"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "default": "\"\"",
        "description": "Additional class name"
      },
      {
        "name": "padding",
        "type": "CardPadding",
        "required": false,
        "description": "Overrides the inner spacing of this section"
      },
      {
        "name": "ref",
        "type": "Ref<HTMLDivElement>",
        "required": false,
        "description": "Ref to the root <div> element"
      }
    ]
  },
  "CardTitleProps": {
    "source": "react/src/components/Card/types.ts",
    "kind": "interface",
    "extends": [
      "Omit<HTMLAttributes<HTMLHeadingElement>, \"children\">"
    ],
    "props": [
      {
        "name": "children",
        "type": "React.ReactNode",
        "required": false,
        "description": "Title text"
      },
      {
        "name": "as",
        "type": "\"h1\" | \"h2\" | \"h3\" | \"h4\" | \"h5\" | \"h6\"",
        "required": false,
        "default": "\"h3\"",
        "description": "Heading level rendered"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "default": "\"\"",
        "description": "Additional class name"
      },
      {
        "name": "ref",
        "type": "Ref<HTMLHeadingElement>",
        "required": false,
        "description": "Ref to the heading element"
      }
    ]
  },
  "CardDescriptionProps": {
    "source": "react/src/components/Card/types.ts",
    "kind": "interface",
    "extends": [
      "Omit<HTMLAttributes<HTMLParagraphElement>, \"children\">"
    ],
    "props": [
      {
        "name": "children",
        "type": "React.ReactNode",
        "required": false,
        "description": "Secondary text shown below the title"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "default": "\"\"",
        "description": "Additional class name"
      },
      {
        "name": "ref",
        "type": "Ref<HTMLParagraphElement>",
        "required": false,
        "description": "Ref to the root <p> element"
      }
    ]
  },
  "CardContentProps": {
    "source": "react/src/components/Card/types.ts",
    "kind": "interface",
    "extends": [
      "Omit<HTMLAttributes<HTMLDivElement>, \"children\">"
    ],
    "props": [
      {
        "name": "children",
        "type": "React.ReactNode",
        "required": false,
        "description": "Main content of the card"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "default": "\"\"",
        "description": "Additional class name"
      },
      {
        "name": "animation",
        "type": "\"fadeIn\" | \"slideIn\" | \"zoomIn\"",
        "required": false,
        "description": "Entrance animation of the content"
      },
      {
        "name": "padding",
        "type": "CardPadding",
        "required": false,
        "description": "Overrides the inner spacing of this section"
      },
      {
        "name": "ref",
        "type": "Ref<HTMLDivElement>",
        "required": false,
        "description": "Ref to the root <div> element"
      }
    ]
  },
  "CardFooterProps": {
    "source": "react/src/components/Card/types.ts",
    "kind": "interface",
    "extends": [
      "Omit<HTMLAttributes<HTMLDivElement>, \"children\">"
    ],
    "props": [
      {
        "name": "children",
        "type": "React.ReactNode",
        "required": false,
        "description": "Footer content, e.g. actions"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "default": "\"\"",
        "description": "Additional class name"
      },
      {
        "name": "padding",
        "type": "CardPadding",
        "required": false,
        "description": "Overrides the inner spacing of this section"
      },
      {
        "name": "ref",
        "type": "Ref<HTMLDivElement>",
        "required": false,
        "description": "Ref to the root <div> element"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:Card": {
    "kind": "cssVars",
    "source": "react/src/components/Card",
    "vars": [
      {
        "name": "--card-bg-color",
        "description": "Background color of the card"
      },
      {
        "name": "--card-bg-color-content",
        "description": "Background color of the content section (sections layout)"
      },
      {
        "name": "--card-border-color",
        "description": "Color of the border and of the section dividers"
      },
      {
        "name": "--card-radius",
        "description": "Corner radius (defaults to --radius-sm, --radius-lg with the padding prop)"
      },
      {
        "name": "--card-shadow",
        "description": "Shadow of the default and elevated variants (defaults to --shadow-sm / --shadow-lg)"
      },
      {
        "name": "--card-padding",
        "description": "Padding of the header, content and footer sections (sections layout; the padding props win)"
      },
      {
        "name": "--card-header-bg-color",
        "description": "Background color of the header section (sections layout)"
      },
      {
        "name": "--card-title-font-size",
        "description": "Font size of the title"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Animation du contenu

CardContent peut jouer une animation d'entrée fadeIn, slideIn ou zoomIn.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/card/demos/animation.tsx

```tsx
import { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "minerva-design";

const animations = ["fadeIn", "slideIn", "zoomIn"] as const;

export default function AnimationDemo() {
  const [round, setRound] = useState(0);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        width: "100%",
      }}
    >
      <div>
        <Button size="small" onClick={() => setRound((r) => r + 1)}>
          Replay
        </Button>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: 16,
        }}
      >
        {animations.map((animation) => (
          <Card key={animation}>
            <CardHeader>
              <CardTitle>{animation}</CardTitle>
            </CardHeader>
            <CardContent key={round} animation={animation}>
              Animated content
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

```

## Example: Utilisation de base

Ouvrir Project Apollo affiche « Opened Project Apollo » sous la carte.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/card/demos/basic.tsx

```tsx
import { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "minerva-design";

export default function BasicDemo() {
  const [opened, setOpened] = useState(false);
  return (
    <div style={{ width: 340 }}>
      <Card>
        <CardHeader>
          <CardTitle>Project Apollo</CardTitle>
          <CardDescription>Updated 2 hours ago</CardDescription>
        </CardHeader>
        <CardContent>
          A design system for building accessible, themeable interfaces.
        </CardContent>
        <CardFooter>
          <Button size="small" onClick={() => setOpened(true)}>
            Open
          </Button>
        </CardFooter>
      </Card>
      {opened && <p role="status">Opened Project Apollo</p>}
    </div>
  );
}

```

## Example: Couleurs personnalisées

Donnez ses couleurs à une section avec style (ou className) ; omettez CardHeader ou CardFooter pour ne pas les afficher.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/card/demos/custom-colors.tsx

```tsx
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "minerva-design";

export default function CustomColorsDemo() {
  return (
    <div style={{ width: 340 }}>
      <Card variant="outline">
        <CardHeader style={{ backgroundColor: "#4f46e5", color: "#ffffff" }}>
          <CardTitle>Pro plan</CardTitle>
          <CardDescription>Everything in Free, plus more</CardDescription>
        </CardHeader>
        <CardContent style={{ backgroundColor: "#eef2ff", color: "#312e81" }}>
          Unlimited projects, priority support and advanced analytics.
        </CardContent>
        <CardFooter style={{ backgroundColor: "#e0e7ff", color: "#312e81" }}>
          <Button size="small">Upgrade</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

```

## Example: Cartes interactives

interactive ajoute un retour au survol et au focus clavier ; as rend la carte sous forme de lien ou de bouton.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/card/demos/interactive.tsx

```tsx
import { Card, CardDescription, CardTitle } from "minerva-design";

export default function InteractiveDemo() {
  return (
    <div style={{ display: "grid", gap: 12, width: 320 }}>
      <Card
        as="a"
        href="#books/1"
        variant="outline"
        padding="small"
        interactive
      >
        <CardTitle as="h4">The Three-Body Problem</CardTitle>
        <CardDescription>
          A link card with hover and focus feedback
        </CardDescription>
      </Card>
      <Card as="button" variant="ghost" padding="small" interactive>
        <CardTitle as="h4">Ghost button card</CardTitle>
        <CardDescription>Transparent until hovered</CardDescription>
      </Card>
    </div>
  );
}

```

## Example: Mise en page avec marge

padding fait porter la marge intérieure par la carte ; les sections s'enchaînent, séparées par un espacement et un filet avant le pied. Fonctionne avec toutes les variantes, y compris filled et ghost.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/card/demos/padded.tsx

```tsx
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "minerva-design";

export default function PaddedDemo() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: 16,
        width: "100%",
      }}
    >
      {(["outline", "elevated", "filled", "ghost"] as const).map((variant) => (
        <Card key={variant} variant={variant} padding="medium">
          <CardHeader>
            <CardTitle>{variant}</CardTitle>
            <CardDescription>padding=&quot;medium&quot;</CardDescription>
          </CardHeader>
          <CardContent>The card pads itself; sections sit flush.</CardContent>
          <CardFooter>
            <Button size="small" color="neutral" variant="outline">
              Details
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

```

## Example: Variantes

Comparer elevated, outlined, filled, ghost et glass avec la même structure de contenu.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/card/demos/variants.tsx

```tsx
import { Card, CardContent, CardHeader, CardTitle } from "minerva-design";

const variants = ["default", "outline", "elevated", "filled", "ghost"] as const;

export default function VariantsDemo() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
        gap: 16,
        width: "100%",
      }}
    >
      {variants.map((variant) => (
        <Card key={variant} variant={variant}>
          <CardHeader>
            <CardTitle>{variant}</CardTitle>
          </CardHeader>
          <CardContent>variant=&quot;{variant}&quot;</CardContent>
        </Card>
      ))}
    </div>
  );
}

```

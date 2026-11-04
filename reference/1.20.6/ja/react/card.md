# Card カード

関連するコンテンツと操作をまとめるコンテナ。CardHeader、CardTitle、CardDescription、CardContent、CardFooter で構成します。

Package: minerva-design@1.20.6

Renderer: react

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.6",
  "sourceCommit": "63ce45656d8f3d1bfbee71026e84674640ae9abf",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:fa9a782f68a5d5b512762e2152b2ad065da3de6937bac96eef63709ddba3b95b"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.6/types.json) or getType() from minerva-design/contracts.

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

## Example: コンテンツのアニメーション

CardContent では fadeIn、slideIn、zoomIn の登場アニメーションを再生できます。

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

## Example: 基本的な使い方

Project Apollo の Open を押すと、カードの下に「Opened Project Apollo」が表示されます。

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

## Example: カスタムカラー

style（または className）で各セクションに色を付けます。不要なら CardHeader や CardFooter を省略します。

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

## Example: インタラクティブカード

interactive はホバーとフォーカス表示のフィードバックを追加し、as でカードをリンクやボタンとして描画します。

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

## Example: パディングレイアウト

padding を指定するとカード自体に余白が付き、各セクションは間隔とフッターの区切り線で並びます。filled や ghost を含むすべてのバリアントで使えます。

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

## Example: バリアント

同じ内容構造で elevated、outlined、filled、ghost、glass を比較します。

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

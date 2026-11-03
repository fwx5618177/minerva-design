# Badge バッジ

他の要素の角に付ける、数値や状態を示す小さなインジケーターです。

Package: minerva-design@1.20.0

Renderer: react

Locale: ja

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

## Example: 基本的な使い方

通知とメッセージに 5 と 99+ を表示し、インラインで Inbox 12 と New の更新を示します。

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

## Example: カラー

color でセマンティックカラーを指定します：primary（既定）、neutral、success、warning、danger、info。

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

## Example: カスタムスタイル

borderRadius と borderWidth で形を調整します。色を変えるには CSS カスタムプロパティ --badge-bg・--badge-fg・--badge-border を（インライン、クラス、または親要素に）設定します。

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

## Example: ドット

dot は内容の代わりに小さな点を表示し、「新着あり」の表示に使います。

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

## Example: 位置

position でバッジを任意の角に配置します。

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

## Example: サイズ

small、medium（既定）、large の 3 サイズ。

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

## Example: ステータスドット

単独のドットとテキストラベルで、項目の状態やユーザーのプレゼンスを表します。テキストが状態を示している場合はドットに role="presentation" を、そうでなければ aria-label を指定します。

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

## Example: バリアント

variant で見た目のスタイルを指定します：solid（既定・塗りつぶし）、subtle（淡い背景）、outline（枠線）。どのバリアントもすべてのカラーと組み合わせられます。

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

## Example: アイコン付き

icon は内容の前に表示されます。

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

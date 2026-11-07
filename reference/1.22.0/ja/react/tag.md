# Tag タグ

コンテンツのマーキングや分類に使う小さなラベル。閉じたりクリックしたりできます。

Package: minerva-design@1.22.0

Renderer: react

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.0",
  "sourceCommit": "330c90a7382a7141543dcdad732a4da31d58a37e",
  "sourceDigest": "sha256:cbdfa6292d29dec33adda7a3e9cf0e027da50858956b8d08e3f7f3ed59c8d78a",
  "referenceSourceDigest": "sha256:e3be8c06635194769da4944bbccaf8bcffec3fe4bddbd369b74caf5e4553345b"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.0/types.json) or getType() from minerva-design/contracts.

## Documentation

### アクセシビリティ

clickable を指定するとタグに role="button" と tabIndex=0 が付き、Enter または Space でマウスクリックと同様に onClick が呼ばれます。操作や切り替えに使い、ページ遷移にはリンクを使ってください。

閉じるボタンはネイティブの  で、独立したタブ位置を持ちます。アクセシブルな名前は既定で「Close」です。どのタグを削除するか分かるよう closeLabel（例：「Remove React」）を設定してください。

無効なクリック可能タグは role="button" と aria-disabled="true" を保持し、Tab ではスキップされます。選択状態が重要な場合は、色だけでなくテキストや aria 属性でも伝えてください。

## Tag

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "Tag"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "color",
    "source": "packages/react/src/components/Tag/types.ts",
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
    "default": "neutral",
    "required": false,
    "description": "Semantic color of the tag"
  },
  {
    "name": "variant",
    "source": "packages/react/src/components/Tag/types.ts",
    "kind": "enum",
    "values": [
      "outline",
      "solid",
      "subtle"
    ],
    "typeText": "\"solid\" | \"subtle\" | \"outline\" | undefined",
    "typeRef": "type:2399c7b51bc7a672b1d1",
    "default": "subtle",
    "required": false,
    "description": "Visual style: `subtle` (tinted background), `outline` (tinted background with a border) or `solid` (filled with the color, inverse text)"
  },
  {
    "name": "size",
    "source": "packages/react/src/components/Tag/types.ts",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "small"
    ],
    "typeText": "TagSize | undefined",
    "typeRef": "type:1b50c44a085ea5bc5559",
    "default": "medium",
    "required": false,
    "description": "Tag size"
  },
  {
    "name": "shape",
    "source": "packages/react/src/components/Tag/types.ts",
    "kind": "enum",
    "values": [
      "circle",
      "rounded",
      "square"
    ],
    "typeText": "TagShape | undefined",
    "typeRef": "type:af174b62ef533e028049",
    "default": "rounded",
    "required": false,
    "description": "Tag shape"
  },
  {
    "name": "closable",
    "source": "packages/react/src/components/Tag/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows a close button"
  },
  {
    "name": "clickable",
    "source": "packages/react/src/components/Tag/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Renders the tag content as a native button (focusable, activated with Enter / Space). With closable, the close button is a sibling button"
  },
  {
    "name": "pressed",
    "source": "packages/react/src/components/Tag/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Pressed (selected) state of a toggle tag, e.g. a selectable filter (requires clickable); sets aria-pressed and the selected style"
  },
  {
    "name": "icon",
    "source": "packages/react/src/components/Tag/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Icon displayed before the content"
  },
  {
    "name": "avatar",
    "source": "packages/react/src/components/Tag/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Avatar (e.g. a small Avatar or image) displayed before the content"
  },
  {
    "name": "loading",
    "source": "packages/react/src/components/Tag/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows a spinner instead of the icon / avatar, marks the tag busy and blocks its action; the close button is hidden"
  },
  {
    "name": "elevation",
    "source": "packages/react/src/components/Tag/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows a shadow"
  },
  {
    "name": "disabled",
    "source": "packages/react/src/components/Tag/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Disables the tag and its close button"
  },
  {
    "name": "closeIcon",
    "source": "packages/react/src/components/Tag/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Custom close icon"
  },
  {
    "name": "closeLabel",
    "source": "packages/react/src/components/Tag/types.ts",
    "kind": "union",
    "typeText": "string | ((label: string) => string) | undefined",
    "typeRef": "type:e1462d484de2d1b228ea",
    "parameters": [
      {
        "name": "label",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "string",
        "typeRef": "type:e15e314d298fc0d116fc"
      }
    ],
    "returnType": {
      "typeText": "string",
      "typeRef": "type:e15e314d298fc0d116fc"
    },
    "required": false,
    "description": "Accessible label of the close button: a string, or a function of the tag's text label (the text of its children)"
  },
  {
    "name": "ripple",
    "source": "packages/react/src/components/Tag/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Shows a ripple effect when a clickable tag is activated"
  }
]
```

### events

```json
[
  {
    "name": "onClose",
    "source": "packages/react/src/components/Tag/types.ts",
    "kind": "function",
    "typeText": "((e: MouseEvent<HTMLElement, MouseEvent>) => void) | undefined",
    "typeRef": "type:b4c67073b20324f2ff46",
    "parameters": [
      {
        "name": "e",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "MouseEvent<HTMLElement, MouseEvent>",
        "typeRef": "type:8a31e3515c88e9f54069"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the close button is clicked"
  },
  {
    "name": "onClick",
    "source": "packages/react/src/components/Tag/types.ts",
    "kind": "function",
    "typeText": "((e: MouseEvent<HTMLElement, MouseEvent>) => void) | undefined",
    "typeRef": "type:e4d4f3dc8f62a537d140",
    "parameters": [
      {
        "name": "e",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "MouseEvent<HTMLElement, MouseEvent>",
        "typeRef": "type:8a31e3515c88e9f54069"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the tag is activated (requires clickable)"
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
  "TagProps": {
    "source": "react/src/components/Tag/types.ts",
    "description": "Props of the Tag. The colors of each `color` can be overridden with CSS custom properties (e.g. through `style`, a class or a theme): `--tag-<color>-bg` (background of the `subtle` and `outline` variants) and `--tag-<color>-text` (text and border color of those variants), e.g. `--tag-danger-bg`, `--tag-neutral-text`.",
    "kind": "interface",
    "extends": [
      "Omit<HTMLAttributes<HTMLDivElement>, \"children\" | \"onClick\" | \"color\">"
    ],
    "props": [
      {
        "name": "children",
        "type": "React.ReactNode",
        "required": false,
        "description": "Content of the tag"
      },
      {
        "name": "color",
        "type": "ColorScheme",
        "required": false,
        "default": "\"neutral\"",
        "description": "Semantic color of the tag"
      },
      {
        "name": "variant",
        "type": "\"subtle\" | \"outline\" | \"solid\"",
        "required": false,
        "default": "\"subtle\"",
        "description": "Visual style: `subtle` (tinted background), `outline` (tinted background with a border) or `solid` (filled with the color, inverse text)"
      },
      {
        "name": "size",
        "type": "TagSize",
        "required": false,
        "default": "\"medium\"",
        "description": "Tag size"
      },
      {
        "name": "shape",
        "type": "TagShape",
        "required": false,
        "default": "\"rounded\"",
        "description": "Tag shape"
      },
      {
        "name": "closable",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Shows a close button"
      },
      {
        "name": "onClose",
        "type": "(e: React.MouseEvent<HTMLElement>) => void",
        "required": false,
        "description": "Called when the close button is clicked"
      },
      {
        "name": "clickable",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Renders the tag content as a native button (focusable, activated with Enter / Space). With closable, the close button is a sibling button"
      },
      {
        "name": "onClick",
        "type": "(e: React.MouseEvent<HTMLElement>) => void",
        "required": false,
        "description": "Called when the tag is activated (requires clickable)"
      },
      {
        "name": "pressed",
        "type": "boolean",
        "required": false,
        "description": "Pressed (selected) state of a toggle tag, e.g. a selectable filter (requires clickable); sets aria-pressed and the selected style"
      },
      {
        "name": "icon",
        "type": "React.ReactNode",
        "required": false,
        "description": "Icon displayed before the content"
      },
      {
        "name": "avatar",
        "type": "React.ReactNode",
        "required": false,
        "description": "Avatar (e.g. a small Avatar or image) displayed before the content"
      },
      {
        "name": "loading",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Shows a spinner instead of the icon / avatar, marks the tag busy and blocks its action; the close button is hidden"
      },
      {
        "name": "elevation",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Shows a shadow"
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
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables the tag and its close button"
      },
      {
        "name": "closeIcon",
        "type": "React.ReactNode",
        "required": false,
        "description": "Custom close icon"
      },
      {
        "name": "closeLabel",
        "type": "string | ((label: string) => string)",
        "required": false,
        "default": "\"Remove {label}\" (localized), or \"Close\" when the tag has no text",
        "description": "Accessible label of the close button: a string, or a function of the tag's text label (the text of its children)"
      },
      {
        "name": "ripple",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Shows a ripple effect when a clickable tag is activated"
      },
      {
        "name": "ref",
        "type": "Ref<HTMLDivElement>",
        "required": false,
        "description": "Ref to the root element"
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

## Example: アバターと読み込み中

avatar は内容の前にアバターを表示します。loading はアイコン / アバターをスピナーに置き換え、タグをビジー状態にして操作を無効にし、閉じるボタンを隠します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-icons

Documentation context imports: none

### apps/docs/src/docs/pages/tag/demos/avatar-loading.tsx

```tsx
import { Avatar, Tag } from "minerva-design";
import { LuCode } from "react-icons/lu";

export default function AvatarLoadingDemo() {
  return (
    <>
      <Tag avatar={<Avatar name="Mia Rossi" size="xsmall" />} shape="circle">
        Mia Rossi
      </Tag>
      <Tag icon={<LuCode />} color="info" variant="outline">
        Frontend
      </Tag>
      <Tag loading color="info">
        Uploading
      </Tag>
      <Tag loading closable>
        Saving
      </Tag>
    </>
  );
}

```

## Example: クリック可能（選択式）

clickable は内容をネイティブのボタンとして描画します。Tab でフォーカスし、クリック・Enter・Space で実行します。ここではタグで選択を切り替え、pressed で支援技術に状態を伝えます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/tag/demos/clickable.tsx

```tsx
import { useState } from "react";
import { Tag } from "minerva-design";

const topics = ["Design", "Frontend", "Backend", "Testing", "DevOps"];

export default function ClickableDemo() {
  const [selected, setSelected] = useState<string[]>(["Frontend"]);

  const toggle = (topic: string) =>
    setSelected((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic],
    );

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {topics.map((topic) => (
          <Tag
            key={topic}
            clickable
            pressed={selected.includes(topic)}
            color={selected.includes(topic) ? "primary" : "neutral"}
            variant="outline"
            onClick={() => toggle(topic)}
          >
            {topic}
          </Tag>
        ))}
      </div>
      <p>Selected: {selected.join(", ") || "none"}</p>
    </div>
  );
}

```

## Example: 閉じられるタグ

Tag 1、Tag 2、Tag 3 を削除します。すべて削除すると Reset で復元できます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-icons

Documentation context imports: none

### apps/docs/src/docs/pages/tag/demos/closable.tsx

```tsx
import { useState } from "react";
import { Tag, Button } from "minerva-design";
import { FaTimesCircle } from "react-icons/fa";

const initialTags = ["Tag 1", "Tag 2", "Tag 3"];

export default function ClosableDemo() {
  const [tags, setTags] = useState(initialTags);
  const [opened, setOpened] = useState<string>();

  return (
    <>
      {tags.map((tag, index) => (
        <Tag
          key={tag}
          closable
          closeLabel={(label) => `Remove ${label}`}
          closeIcon={index === 2 ? <FaTimesCircle aria-hidden /> : undefined}
          onClose={() => setTags((prev) => prev.filter((t) => t !== tag))}
          // clickable + closable: the tag and its close button are two
          // separate buttons, both reachable with Tab
          clickable={index === 0}
          onClick={() => setOpened(tag)}
        >
          {tag}
        </Tag>
      ))}
      {opened && <span>Opened: {opened}</span>}
      {tags.length === 0 && (
        <Button type="button" onClick={() => setTags(initialTags)}>
          Reset
        </Button>
      )}
    </>
  );
}

```

## Example: カラー

color で意味を表します：neutral（既定）、primary、success、warning、danger、info。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/tag/demos/colors.tsx

```tsx
import { Tag } from "minerva-design";

export default function ColorsDemo() {
  return (
    <>
      <Tag>Neutral</Tag>
      <Tag color="primary">Primary</Tag>
      <Tag color="success">Success</Tag>
      <Tag color="warning">Warning</Tag>
      <Tag color="danger">Danger</Tag>
      <Tag color="info">Info</Tag>
    </>
  );
}

```

## Example: カスタムカラー

CSS カスタムプロパティ --tag-<color>-bg と --tag-<color>-text で各カラーの配色を上書きします（インライン、クラス、テーマで指定可能）。ripple={false} でクリック時のリップルを無効にします。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/tag/demos/custom-colors.tsx

```tsx
import type { CSSProperties } from "react";
import { Tag } from "minerva-design";

// --tag-<color>-bg and --tag-<color>-text override the colors of a color; set
// them inline, in a class or in a theme to restyle every tag of that color.
const violet = {
  "--tag-primary-bg": "#ede9fe",
  "--tag-primary-text": "#5b21b6",
} as CSSProperties;

const dark = {
  "--tag-neutral-bg": "#0f172a",
  "--tag-neutral-text": "#f8fafc",
} as CSSProperties;

export default function CustomColorsDemo() {
  return (
    <>
      <Tag color="primary" variant="outline" style={violet}>
        Violet
      </Tag>
      <Tag style={dark}>Dark</Tag>
      <Tag style={{ fontStyle: "italic" }} ripple={false} clickable>
        No ripple
      </Tag>
    </>
  );
}

```

## Example: 無効状態

無効なタグはクリックを無視し、タブ順から外れ、閉じるボタンも無効になります。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/tag/demos/disabled.tsx

```tsx
import { Tag } from "minerva-design";

export default function DisabledDemo() {
  return (
    <>
      <Tag disabled>Disabled</Tag>
      <Tag disabled closable color="primary">
        Disabled closable
      </Tag>
      <Tag disabled clickable color="info">
        Disabled clickable
      </Tag>
    </>
  );
}

```

## Example: サイズと形状

3 つのサイズと 3 つの形状：square、rounded（既定）、circle。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/tag/demos/sizes-shapes.tsx

```tsx
import { Tag } from "minerva-design";

export default function SizesShapesDemo() {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <Tag size="small" color="primary">
          Small
        </Tag>
        <Tag size="medium" color="primary">
          Medium
        </Tag>
        <Tag size="large" color="primary">
          Large
        </Tag>
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <Tag shape="square" color="info">
          Square
        </Tag>
        <Tag shape="rounded" color="info">
          Rounded
        </Tag>
        <Tag shape="circle" color="info">
          Circle
        </Tag>
      </div>
    </div>
  );
}

```

## Example: バリアント

variant で見た目のスタイルを指定します：subtle（既定・淡い背景）、outline（枠線を追加）、solid（色で塗りつぶし）。elevation はどのバリアントにも影を付けます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/tag/demos/variants.tsx

```tsx
import { HStack, Tag, VStack } from "minerva-design";

const variants = ["subtle", "outline", "solid"] as const;
const colors = [
  "neutral",
  "primary",
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
            <Tag key={color} variant={variant} color={color}>
              {variant}
            </Tag>
          ))}
        </HStack>
      ))}
      <HStack gap={2} wrap>
        <Tag elevation color="success">
          Elevation
        </Tag>
        <Tag variant="outline" elevation>
          Outline + elevation
        </Tag>
      </HStack>
    </VStack>
  );
}

```

## Example: アイコン付き

icon は内容の前に表示されます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-icons

Documentation context imports: none

### apps/docs/src/docs/pages/tag/demos/with-icon.tsx

```tsx
import { Tag } from "minerva-design";
import { FaBug, FaCheck, FaClock } from "react-icons/fa";

export default function WithIconDemo() {
  return (
    <>
      <Tag icon={<FaCheck />} color="success">
        Done
      </Tag>
      <Tag icon={<FaClock />} color="warning">
        In progress
      </Tag>
      <Tag icon={<FaBug />} color="danger">
        Bug
      </Tag>
    </>
  );
}

```

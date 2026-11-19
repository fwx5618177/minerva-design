# IconButton アイコンボタン

アイコンのみを表示するコンパクトなボタン。pressed / defaultPressed を指定するとトグルボタン（お気に入り、いいね、ミュートなど）になります。

Package: minerva-design@1.24.3

Renderer: react

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.24.3",
  "sourceCommit": "e8c253c3c4ff080aa45e0b73b5132eaefca86209",
  "sourceDigest": "sha256:b9a39dcfe8b09a5d0967efee074963c408a37abb72fbe1d4c7a1eda21075df1d",
  "referenceSourceDigest": "sha256:db3e755233f56f2ed326cfe2cf1eb7099c6b0bea2a5e432b6c94ae08d637c24c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.24.3/types.json) or getType() from minerva-design/contracts.

## Documentation

## IconButton

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "IconButton"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "icon",
    "source": "packages/react/src/components/IconButton/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Icon element to display (children are used when omitted)"
  },
  {
    "name": "label",
    "source": "packages/react/src/components/IconButton/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible name of the button, also shown as its tooltip (unless showTooltip is false). Takes precedence over aria-label"
  },
  {
    "name": "color",
    "source": "packages/react/src/components/IconButton/types.ts",
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
    "description": "Semantic color of the button"
  },
  {
    "name": "variant",
    "source": "packages/react/src/components/IconButton/types.ts",
    "kind": "enum",
    "values": [
      "ghost",
      "outline",
      "solid"
    ],
    "typeText": "\"solid\" | \"outline\" | \"ghost\" | undefined",
    "typeRef": "type:da3cbf1bd0de7cd633f9",
    "default": "ghost",
    "required": false,
    "description": "Visual style: `ghost` (transparent until hovered), `solid` (filled with the color) or `outline` (bordered)"
  },
  {
    "name": "size",
    "source": "packages/react/src/components/IconButton/types.ts",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "small",
      "xsmall"
    ],
    "typeText": "\"xsmall\" | \"small\" | \"medium\" | \"large\" | undefined",
    "typeRef": "type:f0e395a4986e48b320c4",
    "default": "medium",
    "required": false,
    "description": "Button size"
  },
  {
    "name": "shape",
    "source": "packages/react/src/components/IconButton/types.ts",
    "kind": "enum",
    "values": [
      "circle",
      "square"
    ],
    "typeText": "\"circle\" | \"square\" | undefined",
    "typeRef": "type:53f830419be13b669ce8",
    "default": "circle",
    "required": false,
    "description": "Button shape"
  },
  {
    "name": "disabled",
    "source": "packages/react/src/components/IconButton/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Disables the button and removes it from the tab order"
  },
  {
    "name": "loading",
    "source": "packages/react/src/components/IconButton/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Replaces the icon with a spinner and ignores activation (click, Enter, Space, form submission) while staying focusable: exposed as aria-busy + aria-disabled instead of the native disabled attribute"
  },
  {
    "name": "pressed",
    "source": "packages/react/src/components/IconButton/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Pressed state of a toggle button (controlled; pair with onPressedChange). Setting pressed, defaultPressed or onPressedChange makes the button a toggle: clicking flips the state and it is exposed as aria-pressed"
  },
  {
    "name": "defaultPressed",
    "source": "packages/react/src/components/IconButton/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Initial pressed state of an uncontrolled toggle button"
  },
  {
    "name": "tooltip",
    "source": "packages/react/src/components/IconButton/types.ts",
    "kind": "object",
    "typeText": "IconButtonTooltip | undefined",
    "typeRef": "type:9a52846262864f9be3a9",
    "required": false,
    "description": "Tooltip configuration (content, color, variant, shape, arrow); requires showTooltip"
  },
  {
    "name": "showTooltip",
    "source": "packages/react/src/components/IconButton/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Shows the tooltip on hover and focus (its content is tooltip.content, or the label)"
  },
  {
    "name": "aria-label",
    "source": "packages/react/src/components/IconButton/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label; always set it, since the button only contains an icon"
  }
]
```

### events

```json
[
  {
    "name": "onPressedChange",
    "source": "packages/react/src/components/IconButton/types.ts",
    "kind": "function",
    "typeText": "((pressed: boolean) => void) | undefined",
    "typeRef": "type:709b19c66c1362e8395c",
    "parameters": [
      {
        "name": "pressed",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "boolean",
        "typeRef": "type:7087acd01ef7dd9f1d5c"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called with the new pressed state when a toggle button is activated"
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

### bindings

```json
[
  {
    "prop": "pressed",
    "event": "onPressedChange",
    "syntax": "pressed={pressed} onPressedChange={handler}"
  }
]
```

## API

```json
{
  "IconButtonProps": {
    "source": "react/src/components/IconButton/types.ts",
    "description": "Styling hooks (CSS custom properties, set them on the button or an ancestor): `--icon-button-color` (icon color), `--icon-button-hover-bg` (hover background), `--icon-button-pressed-color` and `--icon-button-pressed-bg` (pressed toggle state).",
    "kind": "interface",
    "extends": [
      "Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, \"color\">"
    ],
    "props": [
      {
        "name": "ref",
        "type": "Ref<HTMLButtonElement>",
        "required": false,
        "description": "Ref to the <button> element"
      },
      {
        "name": "icon",
        "type": "React.ReactNode",
        "required": false,
        "description": "Icon element to display (children are used when omitted)"
      },
      {
        "name": "children",
        "type": "React.ReactNode",
        "required": false,
        "description": "Icon element, alternative to the icon prop"
      },
      {
        "name": "label",
        "type": "string",
        "required": false,
        "description": "Accessible name of the button, also shown as its tooltip (unless showTooltip is false). Takes precedence over aria-label"
      },
      {
        "name": "color",
        "type": "ColorScheme",
        "required": false,
        "default": "\"neutral\"",
        "description": "Semantic color of the button"
      },
      {
        "name": "variant",
        "type": "\"ghost\" | \"solid\" | \"outline\"",
        "required": false,
        "default": "\"ghost\"",
        "description": "Visual style: `ghost` (transparent until hovered), `solid` (filled with the color) or `outline` (bordered)"
      },
      {
        "name": "size",
        "type": "\"xsmall\" | \"small\" | \"medium\" | \"large\"",
        "required": false,
        "default": "\"medium\"",
        "description": "Button size"
      },
      {
        "name": "shape",
        "type": "\"circle\" | \"square\"",
        "required": false,
        "default": "\"circle\"",
        "description": "Button shape"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables the button and removes it from the tab order"
      },
      {
        "name": "loading",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Replaces the icon with a spinner and ignores activation (click, Enter, Space, form submission) while staying focusable: exposed as aria-busy + aria-disabled instead of the native disabled attribute"
      },
      {
        "name": "pressed",
        "type": "boolean",
        "required": false,
        "description": "Pressed state of a toggle button (controlled; pair with onPressedChange). Setting pressed, defaultPressed or onPressedChange makes the button a toggle: clicking flips the state and it is exposed as aria-pressed"
      },
      {
        "name": "defaultPressed",
        "type": "boolean",
        "required": false,
        "description": "Initial pressed state of an uncontrolled toggle button"
      },
      {
        "name": "onPressedChange",
        "type": "(pressed: boolean) => void",
        "required": false,
        "description": "Called with the new pressed state when a toggle button is activated"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "default": "\"\"",
        "description": "Additional class name"
      },
      {
        "name": "tooltip",
        "type": "IconButtonTooltip",
        "required": false,
        "description": "Tooltip configuration (content, color, variant, shape, arrow); requires showTooltip"
      },
      {
        "name": "showTooltip",
        "type": "boolean",
        "required": false,
        "default": "true when label is set, otherwise false",
        "description": "Shows the tooltip on hover and focus (its content is tooltip.content, or the label)"
      },
      {
        "name": "aria-label",
        "type": "string",
        "required": false,
        "default": "\"icon button\" (localized)",
        "description": "Accessible label; always set it, since the button only contains an icon"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:IconButton": {
    "kind": "cssVars",
    "source": "react/src/components/IconButton",
    "vars": [
      {
        "name": "--icon-button-color",
        "description": "Icon color"
      },
      {
        "name": "--icon-button-hover-bg",
        "description": "Background on hover"
      },
      {
        "name": "--icon-button-pressed-color",
        "description": "Icon color of a pressed toggle"
      },
      {
        "name": "--icon-button-pressed-bg",
        "description": "Background of a pressed toggle"
      },
      {
        "name": "--icon-button-size",
        "description": "Width and height of the button (every size; defaults follow the density's control heights)"
      },
      {
        "name": "--icon-button-icon-size",
        "description": "Font size of the icon (every size)"
      },
      {
        "name": "--icon-button-radius",
        "description": "Corner radius of the square shape (defaults to --radius-lg)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 基本的な使い方

Add は件数を増やします。Settings と Delete は読み上げ名を持つアイコン操作の例です。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/icon-button/demos/basic.tsx

```tsx
import { PlusIcon, SettingsIcon, TrashIcon } from "minerva-design/icons";
import { useState } from "react";
import { HStack, IconButton } from "minerva-design";

export default function BasicDemo() {
  const [count, setCount] = useState(0);
  return (
    <HStack gap={3} align="center" wrap>
      <IconButton
        icon={<PlusIcon size="1em" />}
        aria-label="Add"
        onClick={() => setCount((n) => n + 1)}
      />
      <IconButton icon={<SettingsIcon size="1em" />} aria-label="Settings" />
      <IconButton icon={<TrashIcon size="1em" />} aria-label="Delete" />
      <output aria-live="polite">
        {count === 0 ? "Nothing added yet" : `Added ${count} item(s)`}
      </output>
    </HStack>
  );
}

```

## Example: カラー

color でセマンティックカラーを指定します：neutral（デフォルト）、primary、success、warning、danger、info。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/icon-button/demos/colors.tsx

```tsx
import { HeartIcon } from "minerva-design/icons";
import { IconButton } from "minerva-design";

const colors = [
  "neutral",
  "primary",
  "success",
  "warning",
  "danger",
  "info",
] as const;

export default function ColorsDemo() {
  return (
    <>
      {colors.map((color) => (
        <IconButton
          key={color}
          icon={<HeartIcon size="1em" />}
          color={color}
          label={color}
        />
      ))}
    </>
  );
}

```

## Example: カスタムカラー

CSS カスタムプロパティで色を上書きします：--icon-button-color（アイコン）、--icon-button-hover-bg（ホバー時の背景）、--icon-button-pressed-color と --icon-button-pressed-bg（トグルの押下状態）。インラインスタイル、クラス、祖先要素のいずれでも指定できます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/icon-button/demos/custom-colors.tsx

```tsx
import { ZapIcon, TeardropIcon } from "minerva-design/icons";
import type { CSSProperties } from "react";
import { IconButton } from "minerva-design";

// CSS custom properties override the resolved colors; set them inline, in a
// class, or on an ancestor to restyle a whole toolbar.
const amber = {
  "--icon-button-color": "#b45309",
  "--icon-button-hover-bg": "rgba(245, 158, 11, 0.16)",
} as CSSProperties;

const sky = {
  "--icon-button-color": "#0ea5e9",
  "--icon-button-pressed-color": "#ffffff",
  "--icon-button-pressed-bg": "#0369a1",
} as CSSProperties;

export default function CustomColorsDemo() {
  return (
    <>
      <IconButton icon={<ZapIcon size="1em" />} style={amber} label="Energy" />
      <IconButton
        icon={<TeardropIcon size="1em" />}
        style={sky}
        defaultPressed
        label="Water"
      />
    </>
  );
}

```

## Example: ラベルとツールチップ

label はボタンのアクセシブルな名前になり、ツールチップとしても表示されます。アイコンは children で渡せます。variant で見た目のスタイル、color でセマンティックカラーを指定します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/icon-button/demos/label.tsx

```tsx
import { EditIcon, RefreshIcon, TrashIcon } from "minerva-design/icons";
import { IconButton } from "minerva-design";

export default function LabelDemo() {
  return (
    <>
      <IconButton label="Refresh" shape="square">
        <RefreshIcon size="1em" />
      </IconButton>
      <IconButton label="Edit" variant="outline" color="primary">
        <EditIcon size="1em" />
      </IconButton>
      <IconButton label="Delete" variant="solid" color="danger" size="small">
        <TrashIcon size="1em" />
      </IconButton>
    </>
  );
}

```

## Example: 検索ボタン

検索操作は検索アイコンとラベルを持つ IconButton です。type="submit" でフォームを送信し、loading で検索中の再実行を防ぎます。表示テキストが必要な場合は Button を使います。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/icon-button/demos/search.tsx

```tsx
import { SearchIcon } from "minerva-design/icons";
import { useState } from "react";
import { Button, IconButton, Input } from "minerva-design";

export default function SearchDemo() {
  const [loading, setLoading] = useState(false);

  const search = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <form
      onSubmit={search}
      style={{ display: "flex", gap: 8, alignItems: "center" }}
    >
      <Input aria-label="Query" placeholder="Search books" clearable />
      <IconButton
        type="submit"
        icon={<SearchIcon size="1em" />}
        label="Search"
        color="primary"
        variant="solid"
        loading={loading}
      />
      <Button type="submit" color="neutral" variant="outline" loading={loading}>
        Search
      </Button>
    </form>
  );
}

```

## Example: サイズと形状

3 つのサイズ（small、medium、large）と 2 つの形状（circle、square）。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/icon-button/demos/sizes-and-shapes.tsx

```tsx
import { StarIcon } from "minerva-design/icons";
import { IconButton } from "minerva-design";

export default function SizesAndShapesDemo() {
  return (
    <>
      <IconButton
        icon={<StarIcon size="1em" />}
        size="small"
        aria-label="Small"
      />
      <IconButton
        icon={<StarIcon size="1em" />}
        size="medium"
        aria-label="Medium"
      />
      <IconButton
        icon={<StarIcon size="1em" />}
        size="large"
        aria-label="Large"
      />
      <IconButton
        icon={<StarIcon size="1em" />}
        shape="square"
        size="small"
        aria-label="Small square"
      />
      <IconButton
        icon={<StarIcon size="1em" />}
        shape="square"
        aria-label="Medium square"
      />
      <IconButton
        icon={<StarIcon size="1em" />}
        shape="square"
        size="large"
        aria-label="Large square"
      />
    </>
  );
}

```

## Example: 状態

loading はアイコンをスピナーに置き換え、操作を無視しつつボタンをフォーカス可能なままにします（aria-busy + aria-disabled）。pressed はトグルがオンであることを示し、disabled はネイティブの disabled 属性を設定してボタンをタブ順序から外します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/icon-button/demos/states.tsx

```tsx
import { CloudUploadIcon, MicIcon, TrashIcon } from "minerva-design/icons";
import { useState } from "react";
import { IconButton } from "minerva-design";

export default function StatesDemo() {
  const [loading, setLoading] = useState(false);
  const [muted, setMuted] = useState(false);

  const upload = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <>
      <IconButton
        icon={<CloudUploadIcon size="1em" />}
        color="primary"
        loading={loading}
        onClick={upload}
        aria-label="Upload"
      />
      <IconButton
        icon={<MicIcon size="1em" />}
        pressed={muted}
        onPressedChange={setMuted}
        aria-label="Mute microphone"
      />
      <IconButton
        icon={<TrashIcon size="1em" />}
        disabled
        aria-label="Delete"
      />
    </>
  );
}

```

## Example: トグルボタン

Like はオフから開始し結果を表示します。Bookmark はオン、Mute はオフから開始します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/icon-button/demos/toggle.tsx

```tsx
import { BookmarkIcon, HeartIcon, MicOffIcon } from "minerva-design/icons";
import { useState } from "react";
import { IconButton } from "minerva-design";

export default function ToggleDemo() {
  const [liked, setLiked] = useState(false);

  return (
    <>
      {/* controlled: the button exposes aria-pressed={liked} */}
      <IconButton
        icon={<HeartIcon size="1em" />}
        label="Like"
        color="danger"
        pressed={liked}
        onPressedChange={setLiked}
      />
      <span>{liked ? "Liked" : "Not liked yet"}</span>
      {/* uncontrolled */}
      <IconButton
        icon={<BookmarkIcon size="1em" />}
        label="Bookmark"
        defaultPressed
      />
      <IconButton
        icon={<MicOffIcon size="1em" />}
        label="Mute"
        shape="square"
        defaultPressed={false}
      />
    </>
  );
}

```

## Example: ツールチップ

showTooltip と tooltip を設定すると、ホバー時とキーボードフォーカス時に操作内容を表示します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/icon-button/demos/tooltip.tsx

```tsx
import { CopyIcon, InfoIcon } from "minerva-design/icons";
import { IconButton } from "minerva-design";

export default function TooltipDemo() {
  return (
    <>
      <IconButton
        icon={<CopyIcon size="1em" />}
        aria-label="Copy"
        showTooltip
        tooltip={{ content: "Copy to clipboard" }}
      />
      <IconButton
        icon={<InfoIcon size="1em" />}
        color="info"
        aria-label="More information"
        showTooltip
        tooltip={{ content: "Hover or focus to see me", arrow: true }}
      />
    </>
  );
}

```

## Example: バリアント

variant で見た目のスタイルを指定します：ghost（デフォルト、ホバーまで透明）、solid（色で塗りつぶし）、outline（枠線）。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/icon-button/demos/variants.tsx

```tsx
import { HeartIcon } from "minerva-design/icons";
import { HStack, IconButton, VStack } from "minerva-design";

const variants = ["ghost", "solid", "outline"] as const;

export default function VariantsDemo() {
  return (
    <VStack gap={3}>
      {(["neutral", "primary", "danger"] as const).map((color) => (
        <HStack key={color} gap={2} wrap>
          {variants.map((variant) => (
            <IconButton
              key={variant}
              icon={<HeartIcon size="1em" />}
              color={color}
              variant={variant}
              label={`${color} ${variant}`}
            />
          ))}
        </HStack>
      ))}
    </VStack>
  );
}

```

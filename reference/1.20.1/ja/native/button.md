# Button ボタン

フォーム送信やダイアログを開くなど、アクションやイベントを実行します。

Package: minerva-design@1.20.1

Renderer: native

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.1",
  "sourceCommit": "3a9f5cdaae706f14fe6d8c65c5481eba719a66c4",
  "sourceDigest": "sha256:c9ed2b706b61413d29e506a3f04f3d35c044a4b57ec0e284935054f9e1898c7e",
  "referenceSourceDigest": "sha256:6c9ecba0079f25e53cd971e51f2be8604fc3d941c0ed1cfeec03c4a91913ad73"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.1/types.json) or getType() from minerva-design/contracts.

## Documentation

## Button

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "Button"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "color",
    "source": "packages/native/src/components/Button/Button.tsx",
    "kind": "enum",
    "values": [
      "danger",
      "info",
      "neutral",
      "primary",
      "success",
      "warning"
    ],
    "typeText": "NativeColor | undefined",
    "typeRef": "type:c1c4fb1afcf9f8ec5869",
    "default": "primary",
    "required": false,
    "description": "Semantic color of the button"
  },
  {
    "name": "variant",
    "source": "packages/native/src/components/Button/Button.tsx",
    "kind": "enum",
    "values": [
      "ghost",
      "link",
      "outline",
      "solid"
    ],
    "typeText": "ButtonVariant | undefined",
    "typeRef": "type:1e3b5884a3a7673a4553",
    "default": "solid",
    "required": false,
    "description": "Visual style: `solid` (filled), `outline` (border only), `ghost` (transparent, tinted while pressed) or `link` (text link look)"
  },
  {
    "name": "size",
    "source": "packages/native/src/components/Button/Button.tsx",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "small",
      "xlarge",
      "xsmall"
    ],
    "typeText": "ButtonSize | undefined",
    "typeRef": "type:4f1445f517e28a7afd60",
    "default": "medium",
    "required": false,
    "description": "Button size (heights from the `--control-height-*` tokens)"
  },
  {
    "name": "disabled",
    "source": "packages/native/src/components/Button/Button.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Disables the button"
  },
  {
    "name": "loading",
    "source": "packages/native/src/components/Button/Button.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows a spinner and ignores presses (`accessibilityState.busy`)"
  },
  {
    "name": "loadingText",
    "source": "packages/native/src/components/Button/Button.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Text shown instead of the label while loading"
  },
  {
    "name": "startIcon",
    "source": "packages/native/src/components/Button/Button.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Element rendered before the label"
  },
  {
    "name": "endIcon",
    "source": "packages/native/src/components/Button/Button.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Element rendered after the label"
  },
  {
    "name": "fullWidth",
    "source": "packages/native/src/components/Button/Button.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Stretches the button to the full width of its container"
  },
  {
    "name": "active",
    "source": "packages/native/src/components/Button/Button.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Renders the button in its pressed / active state"
  },
  {
    "name": "shape",
    "source": "packages/native/src/components/Button/Button.tsx",
    "kind": "enum",
    "values": [
      "circle",
      "rounded",
      "square"
    ],
    "typeText": "\"square\" | \"rounded\" | \"circle\" | undefined",
    "typeRef": "type:bc311df462bffff00236",
    "default": "rounded",
    "required": false,
    "description": "Preset shape: `rounded` (theme radius), `square` (no radius) or `circle` (pill; a square button when the label is an icon)"
  },
  {
    "name": "textStyle",
    "source": "packages/native/src/components/Button/Button.tsx",
    "kind": "union",
    "typeText": "StyleProp<TextStyle>",
    "typeRef": "type:175f7626ef7c69988283",
    "required": false,
    "description": "Style of the label text"
  }
]
```

### events

```json
[
  {
    "name": "onPress",
    "source": "packages/native/src/components/Button/Button.tsx",
    "kind": "function",
    "typeText": "((event: GestureResponderEvent) => void) | undefined",
    "typeRef": "type:79e82a664defccdac2e6",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "GestureResponderEvent",
        "typeRef": "type:2a25eb9466bc75075bdf"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called on press (not while disabled or loading)"
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
  "native:ButtonProps": {
    "source": "native/src/components/Button/Button.tsx",
    "kind": "interface",
    "extends": [
      "Omit<PressableProps, \"children\" | \"style\" | \"disabled\" | \"onPress\">"
    ],
    "props": [
      {
        "name": "children",
        "type": "ReactNode",
        "required": false,
        "description": "Label: a string (rendered as Text) or any element"
      },
      {
        "name": "color",
        "type": "NativeColor",
        "required": false,
        "default": "\"primary\"",
        "description": "Semantic color of the button"
      },
      {
        "name": "variant",
        "type": "ButtonVariant",
        "required": false,
        "default": "\"solid\"",
        "description": "Visual style: `solid` (filled), `outline` (border only), `ghost` (transparent, tinted while pressed) or `link` (text link look)"
      },
      {
        "name": "size",
        "type": "ButtonSize",
        "required": false,
        "default": "\"medium\"",
        "description": "Button size (heights from the `--control-height-*` tokens)"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables the button"
      },
      {
        "name": "loading",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Shows a spinner and ignores presses (`accessibilityState.busy`)"
      },
      {
        "name": "loadingText",
        "type": "ReactNode",
        "required": false,
        "description": "Text shown instead of the label while loading"
      },
      {
        "name": "startIcon",
        "type": "ReactNode",
        "required": false,
        "description": "Element rendered before the label"
      },
      {
        "name": "endIcon",
        "type": "ReactNode",
        "required": false,
        "description": "Element rendered after the label"
      },
      {
        "name": "fullWidth",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Stretches the button to the full width of its container"
      },
      {
        "name": "active",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Renders the button in its pressed / active state"
      },
      {
        "name": "shape",
        "type": "\"square\" | \"rounded\" | \"circle\"",
        "required": false,
        "default": "\"rounded\"",
        "description": "Preset shape: `rounded` (theme radius), `square` (no radius) or `circle` (pill; a square button when the label is an icon)"
      },
      {
        "name": "onPress",
        "type": "(event: GestureResponderEvent) => void",
        "required": false,
        "description": "Called on press (not while disabled or loading)"
      },
      {
        "name": "style",
        "type": "StyleProp<ViewStyle>",
        "required": false,
        "description": "Style of the pressable container"
      },
      {
        "name": "textStyle",
        "type": "StyleProp<TextStyle>",
        "required": false,
        "description": "Style of the label text"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:Button": {
    "kind": "cssVars",
    "source": "react/src/components/Button",
    "vars": [
      {
        "name": "--button-height",
        "description": "Minimum height (every size; defaults to the density's control height of the size)"
      },
      {
        "name": "--button-padding-x",
        "description": "Horizontal padding (every size)"
      },
      {
        "name": "--button-radius",
        "description": "Corner radius (defaults to --radius-md; the shape / borderRadius props win)"
      },
      {
        "name": "--button-font-size",
        "description": "Font size (every size)"
      },
      {
        "name": "--button-font-weight",
        "description": "Font weight"
      },
      {
        "name": "--button-gap",
        "description": "Space between the icons and the label"
      },
      {
        "name": "--button-label-white-space",
        "description": "White-space of the label: nowrap (default, truncates) or normal (wraps)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 基本的な使い方

ボタンを押すたびに表示される回数が 1 増えます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/button/native/basic.tsx

```tsx
import { useState } from "react";
import { Text } from "react-native";
import { Button, HStack, useTheme } from "minerva-design/native";

export default function Basic() {
  const { colors } = useTheme();
  const [count, setCount] = useState(0);
  return (
    <HStack gap={3} wrap align="center">
      <Button onPress={() => setCount((c) => c + 1)}>Click me</Button>
      <Text role="status" style={{ color: colors["text-secondary-color"] }}>
        Clicked {count} times
      </Text>
    </HStack>
  );
}

```

## Example: カラー

color でセマンティックカラーを指定します：primary（デフォルト）、neutral、success、warning、danger、info。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/button/native/colors.tsx

```tsx
import { View } from "react-native";
import { Button } from "minerva-design/native";

export default function ColorsDemo() {
  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
      <Button color="primary">Primary</Button>
      <Button color="neutral">Neutral</Button>
      <Button color="success">Success</Button>
      <Button color="warning">Warning</Button>
      <Button color="danger">Danger</Button>
      <Button color="info">Info</Button>
    </View>
  );
}

```

## Example: フォーム内の type

Button の既定は type="button" なので、<form> 内のボタン（プレビュー、行の追加、ダイアログを開くなど）が誤ってフォームを送信することはありません。送信ボタンには type="submit"、リセットには type="reset" を明示してください。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/button/native/form.tsx

```tsx
import { useState } from "react";
import { Text, View } from "react-native";
import { Button, Input, useTheme } from "minerva-design/native";

export default function FormDemo() {
  const { colors } = useTheme();
  const [title, setTitle] = useState("Draft");
  const [log, setLog] = useState("Nothing yet");
  return (
    <View style={{ gap: 8 }}>
      <Input accessibilityLabel="Title" value={title} onChange={setTitle} />
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
        <Button
          color="neutral"
          variant="outline"
          onPress={() => setLog("Preview opened (form not submitted)")}
        >
          Preview
        </Button>
        <Button
          color="neutral"
          variant="ghost"
          onPress={() => {
            setTitle("Draft");
            setLog("Reset");
          }}
        >
          Reset
        </Button>
        <Button onPress={() => setLog(`Submitted "${title}"`)}>Save</Button>
      </View>
      <Text role="status" style={{ color: colors["text-color"] }}>
        {log}
      </Text>
    </View>
  );
}

```

## Example: アイコン・読み込みテキスト・全幅

startIcon / endIcon でラベルの前後にアイコンを表示し、loadingText は読み込み中に内容を置き換え、fullWidth でボタンを全幅にします。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/button/native/icons-loading.tsx

```tsx
import { View, Text } from "react-native";
import { useState } from "react";
import { Button } from "minerva-design/native";

export default function IconsLoadingDemo() {
  const [saving, setSaving] = useState(false);
  const save = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 1500);
  };

  return (
    <View style={{ gap: 12, maxWidth: 320 }}>
      <Button startIcon={<Text accessible={false}>+</Text>}>Add item</Button>
      <Button variant="outline" endIcon={<Text accessible={false}>→</Text>}>
        Continue
      </Button>
      <Button
        color="success"
        fullWidth
        loading={saving}
        loadingText="Saving..."
        onPress={save}
      >
        Save
      </Button>
    </View>
  );
}

```

## Example: 形状と角丸

プリセットの形状、または borderRadius のプリセット / ピクセル値で角丸を指定します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/button/native/shapes.tsx

```tsx
import { View } from "react-native";
import { Button } from "minerva-design/native";

export default function ShapesDemo() {
  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
      <Button shape="square">Square</Button>
      <Button shape="rounded">Rounded</Button>
      <Button shape="circle" accessibilityLabel="Add">
        +
      </Button>
      <Button style={{ borderRadius: 0 }}>No radius</Button>
      <Button style={{ borderRadius: 12 }}>12px radius</Button>
    </View>
  );
}

```

## Example: サイズ

xsmall、small、medium（デフォルト）、large、xlarge の 5 種類。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/button/native/sizes.tsx

```tsx
import { View } from "react-native";
import { Button } from "minerva-design/native";

export default function SizesDemo() {
  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
      <Button size="xsmall">XSmall</Button>
      <Button size="small">Small</Button>
      <Button size="medium">Medium</Button>
      <Button size="large">Large</Button>
      <Button size="xlarge">XLarge</Button>
    </View>
  );
}

```

## Example: 状態

読み込み中・無効・アクティブ状態。読み込み中は処理の実行中にクリック（およびフォーム送信）をブロックしますが、キーボードフォーカスはボタンに残ります。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/button/native/states.tsx

```tsx
import { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { Button } from "minerva-design/native";
export default function States() {
  const [saving, setSaving] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  function save() {
    setSaving(true);
    timer.current = setTimeout(() => setSaving(false), 1500);
  }
  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
      <Button loading={saving} onPress={save}>
        {saving ? "Saving…" : "Save"}
      </Button>
      <Button disabled>Disabled</Button>
      <Button active>Active</Button>
    </View>
  );
}

```

## Example: バリアント

variant で見た目のスタイルを指定します：solid（デフォルト）、outline、ghost、link。どの色とも組み合わせられます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/button/native/variants.tsx

```tsx
import { View } from "react-native";
import { Button } from "minerva-design/native";

const variants = ["solid", "outline", "ghost", "link"] as const;

export default function VariantsDemo() {
  return (
    <View style={{ gap: 12 }}>
      {(["primary", "neutral", "danger"] as const).map((color) => (
        <View
          key={color}
          style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}
        >
          {variants.map((variant) => (
            <Button key={variant} color={color} variant={variant}>
              {variant}
            </Button>
          ))}
        </View>
      ))}
    </View>
  );
}

```

## Example: アイコン付き

startIcon / endIcon でテキストとアイコンを組み合わせます（例：danger の再試行ボタン、neutral の ghost の戻るボタン）。アイコンのみのボタンには aria-label を指定してください。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/button/native/with-icon.tsx

```tsx
import { View, Text } from "react-native";
import { Button } from "minerva-design/native";

export default function WithIconDemo() {
  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
      <Button startIcon={<Text accessible={false}>+</Text>}>Add</Button>
      <Button color="danger" startIcon={<Text accessible={false}>↻</Text>}>
        Retry
      </Button>
      <Button
        color="neutral"
        variant="ghost"
        startIcon={<Text accessible={false}>←</Text>}
      >
        Back
      </Button>
      <Button color="danger" variant="outline" accessibilityLabel="Delete item">
        <Text accessible={false}>×</Text>
      </Button>
    </View>
  );
}

```

# Tag 标签

用于标记和分类内容的小标签，可关闭或可点击。

Package: minerva-design@1.22.3

Renderer: native

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.3",
  "sourceCommit": "05d8029dbc66b57df26a3da7707f0fa0e4a02bde",
  "sourceDigest": "sha256:0d31b0bc3c28394756a1142132ddf7b2beac9f7ce2f5b2253e04712431d7c736",
  "referenceSourceDigest": "sha256:98c68657ee3e6708d0ba87e44b497d1aba974e208ad5676dbbb9902bc229d648"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.3/types.json) or getType() from minerva-design/contracts.

## Documentation

### 无障碍

设置 clickable 后，标签具有 role="button" 和 tabIndex=0，Enter 或空格键会像鼠标点击一样触发 onClick。请用于操作或切换，而非页面跳转（跳转请使用链接）。

关闭按钮是原生 ，可单独聚焦。其无障碍名称默认为“Close”，请设置 closeLabel（如“Remove React”），让读屏用户知道移除的是哪个标签。

禁用的可点击标签保留 role="button" 并带有 aria-disabled="true"，Tab 键会跳过它。若选中状态很重要，请同时通过文字或 aria 属性表达，而不要只依赖颜色。

## Tag

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
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
    "source": "packages/native/src/components/Tag/Tag.tsx",
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
    "default": "neutral",
    "required": false,
    "description": "Semantic color of the tag"
  },
  {
    "name": "variant",
    "source": "packages/native/src/components/Tag/Tag.tsx",
    "kind": "enum",
    "values": [
      "outline",
      "solid",
      "subtle"
    ],
    "typeText": "TagVariant | undefined",
    "typeRef": "type:91c0584f07cc01312f89",
    "default": "subtle",
    "required": false,
    "description": "Visual style: `subtle` (tinted background), `outline` (tinted background with a border) or `solid` (filled)"
  },
  {
    "name": "size",
    "source": "packages/native/src/components/Tag/Tag.tsx",
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
    "source": "packages/native/src/components/Tag/Tag.tsx",
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
    "source": "packages/native/src/components/Tag/Tag.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows a close button"
  },
  {
    "name": "closeLabel",
    "source": "packages/native/src/components/Tag/Tag.tsx",
    "kind": "union",
    "typeText": "string | ((label: string) => string) | undefined",
    "typeRef": "type:6adc4ca38cf3ef1601c9",
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
    "description": "Accessible label of the close button, or a function of the tag's text"
  },
  {
    "name": "closeIcon",
    "source": "packages/native/src/components/Tag/Tag.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Custom close icon"
  },
  {
    "name": "clickable",
    "source": "packages/native/src/components/Tag/Tag.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Makes the tag pressable (`accessibilityRole=\"button\"`); implied by `onPress`, `pressed` and `defaultPressed`"
  },
  {
    "name": "pressed",
    "source": "packages/native/src/components/Tag/Tag.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Pressed (selected) state of a toggle tag, e.g. a selectable filter (controlled; pair with onPressedChange)"
  },
  {
    "name": "defaultPressed",
    "source": "packages/native/src/components/Tag/Tag.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Initial pressed state of an uncontrolled toggle tag"
  },
  {
    "name": "disabled",
    "source": "packages/native/src/components/Tag/Tag.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Disables the tag and its close button"
  },
  {
    "name": "loading",
    "source": "packages/native/src/components/Tag/Tag.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows a spinner instead of the icon, marks the tag busy and blocks its action; the close button is hidden"
  },
  {
    "name": "icon",
    "source": "packages/native/src/components/Tag/Tag.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Icon displayed before the content"
  },
  {
    "name": "avatar",
    "source": "packages/native/src/components/Tag/Tag.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Avatar (e.g. a small Avatar) displayed before the content"
  },
  {
    "name": "elevation",
    "source": "packages/native/src/components/Tag/Tag.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows a shadow"
  },
  {
    "name": "textStyle",
    "source": "packages/native/src/components/Tag/Tag.tsx",
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
    "name": "onClose",
    "source": "packages/native/src/components/Tag/Tag.tsx",
    "kind": "function",
    "typeText": "((event: GestureResponderEvent) => void) | undefined",
    "typeRef": "type:ab764edb31ce54e27294",
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
    "description": "Called when the close button is pressed"
  },
  {
    "name": "onPress",
    "source": "packages/native/src/components/Tag/Tag.tsx",
    "kind": "function",
    "typeText": "((event: GestureResponderEvent) => void) | undefined",
    "typeRef": "type:b87e0778f6c67dfacb7b",
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
    "description": "Called when the tag is pressed"
  },
  {
    "name": "onPressedChange",
    "source": "packages/native/src/components/Tag/Tag.tsx",
    "kind": "function",
    "typeText": "((pressed: boolean) => void) | undefined",
    "typeRef": "type:9d9bb7fa4d4bc0d36453",
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
    "description": "Called with the requested pressed state of a toggle tag"
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
  "native:TagProps": {
    "source": "native/src/components/Tag/Tag.tsx",
    "kind": "interface",
    "extends": [
      "Omit<ViewProps, \"style\" | \"children\">"
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
        "default": "\"neutral\"",
        "description": "Semantic color of the tag"
      },
      {
        "name": "variant",
        "type": "TagVariant",
        "required": false,
        "default": "\"subtle\"",
        "description": "Visual style: `subtle` (tinted background), `outline` (tinted background with a border) or `solid` (filled)"
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
        "type": "(event: GestureResponderEvent) => void",
        "required": false,
        "description": "Called when the close button is pressed"
      },
      {
        "name": "closeLabel",
        "type": "string | ((label: string) => string)",
        "required": false,
        "description": "Accessible label of the close button, or a function of the tag's text"
      },
      {
        "name": "closeIcon",
        "type": "ReactNode",
        "required": false,
        "description": "Custom close icon"
      },
      {
        "name": "clickable",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Makes the tag pressable (`accessibilityRole=\"button\"`); implied by `onPress`, `pressed` and `defaultPressed`"
      },
      {
        "name": "onPress",
        "type": "(event: GestureResponderEvent) => void",
        "required": false,
        "description": "Called when the tag is pressed"
      },
      {
        "name": "pressed",
        "type": "boolean",
        "required": false,
        "description": "Pressed (selected) state of a toggle tag, e.g. a selectable filter (controlled; pair with onPressedChange)"
      },
      {
        "name": "defaultPressed",
        "type": "boolean",
        "required": false,
        "description": "Initial pressed state of an uncontrolled toggle tag"
      },
      {
        "name": "onPressedChange",
        "type": "(pressed: boolean) => void",
        "required": false,
        "description": "Called with the requested pressed state of a toggle tag"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables the tag and its close button"
      },
      {
        "name": "loading",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Shows a spinner instead of the icon, marks the tag busy and blocks its action; the close button is hidden"
      },
      {
        "name": "icon",
        "type": "ReactNode",
        "required": false,
        "description": "Icon displayed before the content"
      },
      {
        "name": "avatar",
        "type": "ReactNode",
        "required": false,
        "description": "Avatar (e.g. a small Avatar) displayed before the content"
      },
      {
        "name": "elevation",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Shows a shadow"
      },
      {
        "name": "style",
        "type": "StyleProp<ViewStyle>",
        "required": false,
        "description": "Style of the tag"
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

## Example: 可关闭

依次移除 Tag 1、Tag 2 和 Tag 3；全部移除后，用 Reset 恢复标签。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/tag/native/closable.tsx

```tsx
import { useState } from "react";
import { Text, View } from "react-native";
import { Tag, Button, useTheme } from "minerva-design/native";
const initialTags = ["Tag 1", "Tag 2", "Tag 3"];
export default function Closable() {
  const [tags, setTags] = useState(initialTags);
  const [opened, setOpened] = useState<string>();
  const { colors } = useTheme();
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 8,
      }}
    >
      {tags.map((tag, index) => (
        <Tag
          key={tag}
          closable
          closeLabel={(label) => `Remove ${label}`}
          closeIcon={index === 2 ? <Text>⊗</Text> : undefined}
          onClose={() => setTags((prev) => prev.filter((t) => t !== tag))}
          clickable={index === 0}
          onPress={() => setOpened(tag)}
        >
          {tag}
        </Tag>
      ))}
      {opened && (
        <Text style={{ color: colors["text-color"] }}>Opened: {opened}</Text>
      )}
      {tags.length === 0 && (
        <Button onPress={() => setTags(initialTags)}>Reset</Button>
      )}
    </View>
  );
}

```

## Example: colors-variants

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/tag/native/colors-variants.tsx

```tsx
import { Text, View } from "react-native";
import { Tag } from "minerva-design/native";

const COLORS = [
  "neutral",
  "primary",
  "success",
  "warning",
  "danger",
  "info",
] as const;
const VARIANTS = ["subtle", "outline", "solid"] as const;

export default function ColorsVariants() {
  return (
    <View style={{ gap: 12 }}>
      {VARIANTS.map((variant) => (
        <View
          key={variant}
          style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}
        >
          {COLORS.map((color) => (
            <Tag key={color} color={color} variant={variant}>
              {color}
            </Tag>
          ))}
        </View>
      ))}
      <View style={{ flexDirection: "row", gap: 8, alignItems: "center" }}>
        <Tag size="small" shape="square" color="danger" variant="solid">
          -30%
        </Tag>
        <Tag shape="circle" color="success" icon={<Text>🚚</Text>}>
          Free delivery
        </Tag>
        <Tag size="large" color="primary" elevation>
          Bestseller
        </Tag>
      </View>
    </View>
  );
}

```

## Example: selectable

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/tag/native/selectable.tsx

```tsx
import { useState } from "react";
import { Text, View } from "react-native";
import { Tag, useTheme } from "minerva-design/native";

const FILTERS = ["Vegan", "Spicy", "Under $10", "Free delivery", "Top rated"];

export default function Selectable() {
  const { colors } = useTheme();
  const [selected, setSelected] = useState<string[]>(["Spicy"]);
  const toggle = (name: string, on: boolean) =>
    setSelected((s) => (on ? [...s, name] : s.filter((x) => x !== name)));
  return (
    <View style={{ gap: 12 }}>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
        {FILTERS.map((name) => (
          <Tag
            key={name}
            shape="circle"
            variant="outline"
            pressed={selected.includes(name)}
            onPressedChange={(on) => toggle(name, on)}
          >
            {name}
          </Tag>
        ))}
        <Tag shape="circle" variant="outline" clickable disabled>
          Open now
        </Tag>
      </View>
      <Text style={{ color: colors["text-secondary-color"] }}>
        Filters: {selected.length ? selected.join(", ") : "none"}
      </Text>
    </View>
  );
}

```

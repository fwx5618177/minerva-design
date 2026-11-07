# Tabs 标签页

将内容分为一次显示一个的面板。无障碍标签页，支持方向键导航、line / enclosed / soft / pills 变体、语义色与垂直方向。

Package: minerva-design@1.22.2

Renderer: native

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.2",
  "sourceCommit": "93eaa8e002773e63a78341d4424f9e832b7305a9",
  "sourceDigest": "sha256:62e49d8be55ca2bb85e8afd17b7862d068358e8ea94178c66288911996ed036e",
  "referenceSourceDigest": "sha256:10025b0c7fa1af3c2b0e9de9a1b6d51e6e81c9a41c96e7fcba66a58604dda51c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.2/types.json) or getType() from minerva-design/contracts.

## Documentation

## Tab

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "Tab"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "value",
    "source": "packages/native/src/components/Tabs/Tabs.tsx",
    "kind": "string",
    "typeText": "string",
    "typeRef": "type:e15e314d298fc0d116fc",
    "required": true,
    "description": "Value identifying the tab and its panel"
  },
  {
    "name": "disabled",
    "source": "packages/native/src/components/Tabs/Tabs.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Disables the tab"
  },
  {
    "name": "color",
    "source": "packages/native/src/components/Tabs/Tabs.tsx",
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
    "required": false,
    "description": "Overrides the group color"
  },
  {
    "name": "badge",
    "source": "packages/native/src/components/Tabs/Tabs.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Count or short text shown in a small badge after the label"
  },
  {
    "name": "textStyle",
    "source": "packages/native/src/components/Tabs/Tabs.tsx",
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
    "source": "packages/native/src/components/Tabs/Tabs.tsx",
    "kind": "function",
    "typeText": "((event: GestureResponderEvent) => void) | undefined",
    "typeRef": "type:c4bb1fee25270a3f4c6f",
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
    "description": "Called on press (after the selection)"
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

## TabList

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "TabList"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "aria-label",
    "source": "packages/native/src/components/Tabs/Tabs.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label of the tab list (alias of `accessibilityLabel`)"
  },
  {
    "name": "loop",
    "source": "packages/native/src/components/Tabs/Tabs.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Moves focus from the last tab to the first (and back) with the arrow keys (react-native-web)"
  },
  {
    "name": "scrollable",
    "source": "packages/native/src/components/Tabs/Tabs.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Horizontal scrolling list (natural tab widths) instead of equal-width tabs"
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

## TabPanel

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "TabPanel"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "value",
    "source": "packages/native/src/components/Tabs/Tabs.tsx",
    "kind": "string",
    "typeText": "string",
    "typeRef": "type:e15e314d298fc0d116fc",
    "required": true,
    "description": "Value of the tab this panel belongs to"
  },
  {
    "name": "forceMount",
    "source": "packages/native/src/components/Tabs/Tabs.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Keeps the panel mounted (hidden) while its tab is not selected"
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

## Tabs

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "Tabs"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "value",
    "source": "packages/native/src/components/Tabs/Tabs.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Value of the selected tab (controlled; pair with onChange)"
  },
  {
    "name": "defaultValue",
    "source": "packages/native/src/components/Tabs/Tabs.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Value of the initially selected tab (uncontrolled); the first enabled tab when omitted"
  },
  {
    "name": "orientation",
    "source": "packages/native/src/components/Tabs/Tabs.tsx",
    "kind": "enum",
    "values": [
      "horizontal",
      "vertical"
    ],
    "typeText": "TabsMachineOrientation | undefined",
    "typeRef": "type:f6a249e5fd68af3e2950",
    "default": "horizontal",
    "required": false,
    "description": "Layout of the tab list"
  },
  {
    "name": "activationMode",
    "source": "packages/native/src/components/Tabs/Tabs.tsx",
    "kind": "enum",
    "values": [
      "automatic",
      "manual"
    ],
    "typeText": "TabsActivation | undefined",
    "typeRef": "type:39286d9036b83f169df7",
    "default": "automatic",
    "required": false,
    "description": "`automatic` selects a tab when it receives (keyboard) focus; `manual` only on press"
  },
  {
    "name": "variant",
    "source": "packages/native/src/components/Tabs/Tabs.tsx",
    "kind": "enum",
    "values": [
      "enclosed",
      "line",
      "pills",
      "soft"
    ],
    "typeText": "TabsVariant | undefined",
    "typeRef": "type:7a9b9d9d419b761fafaf",
    "default": "line",
    "required": false,
    "description": "Visual style: `line` (animated underline), `pills` (filled pill), `soft` (tinted background) or `enclosed` (segmented control)"
  },
  {
    "name": "color",
    "source": "packages/native/src/components/Tabs/Tabs.tsx",
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
    "description": "Color of the selection"
  },
  {
    "name": "items",
    "source": "packages/native/src/components/Tabs/Tabs.tsx",
    "kind": "array",
    "typeText": "readonly TabsItemData[] | undefined",
    "typeRef": "type:9d0c0f101a1285f58a11",
    "required": false,
    "description": "Data API: the tabs (and optional panel contents) rendered as a TabList (+ TabPanels) before the children"
  },
  {
    "name": "listLabel",
    "source": "packages/native/src/components/Tabs/Tabs.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label of the tab list rendered from `items`"
  },
  {
    "name": "scrollable",
    "source": "packages/native/src/components/Tabs/Tabs.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Scrollable tab list of the `items` API"
  }
]
```

### events

```json
[
  {
    "name": "onChange",
    "source": "packages/native/src/components/Tabs/Tabs.tsx",
    "kind": "function",
    "typeText": "((value: string) => void) | undefined",
    "typeRef": "type:400bf16e8d0ad46a4dc8",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "string",
        "typeRef": "type:e15e314d298fc0d116fc"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called with the value of the tab the user selects"
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
    "prop": "value",
    "event": "onChange",
    "syntax": "value={value} onChange={handler}"
  }
]
```

## API

```json
{
  "native:TabsProps": {
    "source": "native/src/components/Tabs/Tabs.tsx",
    "kind": "interface",
    "extends": [
      "Omit<ViewProps, \"style\" | \"children\">"
    ],
    "props": [
      {
        "name": "value",
        "type": "string",
        "required": false,
        "description": "Value of the selected tab (controlled; pair with onChange)"
      },
      {
        "name": "defaultValue",
        "type": "string",
        "required": false,
        "description": "Value of the initially selected tab (uncontrolled); the first enabled tab when omitted"
      },
      {
        "name": "onChange",
        "type": "(value: string) => void",
        "required": false,
        "description": "Called with the value of the tab the user selects"
      },
      {
        "name": "orientation",
        "type": "TabsMachineOrientation",
        "required": false,
        "default": "\"horizontal\"",
        "description": "Layout of the tab list"
      },
      {
        "name": "activationMode",
        "type": "TabsActivation",
        "required": false,
        "default": "\"automatic\"",
        "description": "`automatic` selects a tab when it receives (keyboard) focus; `manual` only on press"
      },
      {
        "name": "variant",
        "type": "TabsVariant",
        "required": false,
        "default": "\"line\"",
        "description": "Visual style: `line` (animated underline), `pills` (filled pill), `soft` (tinted background) or `enclosed` (segmented control)"
      },
      {
        "name": "color",
        "type": "TabsColor",
        "required": false,
        "default": "\"primary\"",
        "description": "Color of the selection"
      },
      {
        "name": "items",
        "type": "readonly TabsItemData[]",
        "required": false,
        "description": "Data API: the tabs (and optional panel contents) rendered as a TabList (+ TabPanels) before the children"
      },
      {
        "name": "listLabel",
        "type": "string",
        "required": false,
        "description": "Accessible label of the tab list rendered from `items`"
      },
      {
        "name": "scrollable",
        "type": "boolean",
        "required": false,
        "default": "true with more than 4 items",
        "description": "Scrollable tab list of the `items` API"
      },
      {
        "name": "children",
        "type": "ReactNode",
        "required": false,
        "description": "TabList and TabPanel elements (or any content)"
      },
      {
        "name": "style",
        "type": "StyleProp<ViewStyle>",
        "required": false,
        "description": "Style of the root view"
      }
    ]
  },
  "native:TabListProps": {
    "source": "native/src/components/Tabs/Tabs.tsx",
    "kind": "interface",
    "extends": [
      "Omit<ViewProps, \"style\" | \"children\">"
    ],
    "props": [
      {
        "name": "children",
        "type": "ReactNode",
        "required": false,
        "description": "The Tab elements"
      },
      {
        "name": "aria-label",
        "type": "string",
        "required": false,
        "description": "Accessible label of the tab list (alias of `accessibilityLabel`)"
      },
      {
        "name": "loop",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Moves focus from the last tab to the first (and back) with the arrow keys (react-native-web)"
      },
      {
        "name": "scrollable",
        "type": "boolean",
        "required": false,
        "default": "true with more than 4 tabs",
        "description": "Horizontal scrolling list (natural tab widths) instead of equal-width tabs"
      },
      {
        "name": "style",
        "type": "StyleProp<ViewStyle>",
        "required": false,
        "description": "Style of the list"
      }
    ]
  },
  "native:TabProps": {
    "source": "native/src/components/Tabs/Tabs.tsx",
    "kind": "interface",
    "extends": [
      "Omit<PressableProps, \"children\" | \"style\" | \"disabled\" | \"onPress\">"
    ],
    "props": [
      {
        "name": "value",
        "type": "string",
        "required": true,
        "description": "Value identifying the tab and its panel"
      },
      {
        "name": "children",
        "type": "ReactNode",
        "required": false,
        "description": "Label: a string (rendered as Text) or any element"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables the tab"
      },
      {
        "name": "color",
        "type": "TabsColor",
        "required": false,
        "description": "Overrides the group color"
      },
      {
        "name": "badge",
        "type": "ReactNode",
        "required": false,
        "description": "Count or short text shown in a small badge after the label"
      },
      {
        "name": "onPress",
        "type": "(event: GestureResponderEvent) => void",
        "required": false,
        "description": "Called on press (after the selection)"
      },
      {
        "name": "style",
        "type": "StyleProp<ViewStyle>",
        "required": false,
        "description": "Style of the tab"
      },
      {
        "name": "textStyle",
        "type": "StyleProp<TextStyle>",
        "required": false,
        "description": "Style of the label text"
      }
    ]
  },
  "native:TabPanelProps": {
    "source": "native/src/components/Tabs/Tabs.tsx",
    "kind": "interface",
    "extends": [
      "Omit<ViewProps, \"style\" | \"children\">"
    ],
    "props": [
      {
        "name": "value",
        "type": "string",
        "required": true,
        "description": "Value of the tab this panel belongs to"
      },
      {
        "name": "forceMount",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Keeps the panel mounted (hidden) while its tab is not selected"
      },
      {
        "name": "children",
        "type": "ReactNode",
        "required": false,
        "description": "Panel content"
      },
      {
        "name": "style",
        "type": "StyleProp<ViewStyle>",
        "required": false,
        "description": "Style of the panel"
      }
    ]
  },
  "native:TabsItemData": {
    "source": "native/src/components/Tabs/Tabs.tsx",
    "description": "A tab of the data API (`items`)",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "value",
        "type": "string",
        "required": true,
        "description": "Value identifying the tab and its panel"
      },
      {
        "name": "label",
        "type": "ReactNode",
        "required": true,
        "description": "Visible label of the tab"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "description": "Disables the tab"
      },
      {
        "name": "badge",
        "type": "ReactNode",
        "required": false,
        "description": "Count or short text shown in a small badge after the label"
      },
      {
        "name": "content",
        "type": "ReactNode",
        "required": false,
        "description": "Panel content (renders a TabPanel for the tab)"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:Tabs": {
    "kind": "cssVars",
    "source": "react/src/components/Tabs",
    "vars": [
      {
        "name": "--tabs-gap",
        "description": "Space between the tabs of the list"
      },
      {
        "name": "--tabs-font-size",
        "description": "Font size of the tabs"
      },
      {
        "name": "--tabs-trigger-padding-x",
        "description": "Horizontal padding of a tab (every variant)"
      },
      {
        "name": "--tabs-trigger-padding-y",
        "description": "Vertical padding of a tab (every variant)"
      },
      {
        "name": "--tabs-trigger-min-height",
        "description": "Minimum height of a tab (pills default to the density's control height minus 4px)"
      },
      {
        "name": "--tabs-radius",
        "description": "Corner radius of enclosed / soft / pill tabs (defaults to --radius-md)"
      },
      {
        "name": "--tabs-indicator-width",
        "description": "Thickness of the line indicator"
      },
      {
        "name": "--tabs-panel-padding",
        "description": "Padding of the panel"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 基础用法

初始显示 Overview；Reviews 展示评论，Similar books 保持禁用。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/tabs/native/basic.tsx

```tsx
import { Text } from "react-native";
import { Tabs, Tab, TabList, TabPanel, useTheme } from "minerva-design/native";
export default function Basic() {
  const { colors } = useTheme();
  const style = { color: colors["text-color"], paddingVertical: 16 };
  return (
    <Tabs defaultValue="overview">
      <TabList aria-label="Book sections">
        <Tab value="overview">Overview</Tab>
        <Tab value="reviews">Reviews</Tab>
        <Tab value="similar" disabled>
          Similar books
        </Tab>
      </TabList>
      <TabPanel value="overview">
        <Text style={style}>
          A desert planet, a noble family and a precious spice.
        </Text>
      </TabPanel>
      <TabPanel value="reviews">
        <Text style={style}>“A masterpiece of world building.”</Text>
      </TabPanel>
      <TabPanel value="similar">
        <Text style={style}>Coming soon.</Text>
      </TabPanel>
    </Tabs>
  );
}

```

## Example: compound

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/tabs/native/compound.tsx

```tsx
import { Text } from "react-native";
import { Tab, TabList, TabPanel, Tabs, useTheme } from "minerva-design/native";

export default function Compound() {
  const { colors } = useTheme();
  const text = { color: colors["text-color"], paddingVertical: 16 };
  return (
    <Tabs defaultValue="menu">
      <TabList aria-label="Restaurant">
        <Tab value="menu">Menu</Tab>
        <Tab value="reviews" badge="4.8">
          Reviews
        </Tab>
        <Tab value="info">Info</Tab>
        <Tab value="group" disabled>
          Group
        </Tab>
      </TabList>
      <TabPanel value="menu">
        <Text style={text}>Margherita pizza, truffle fries, tiramisu...</Text>
      </TabPanel>
      <TabPanel value="reviews">
        <Text style={text}>"Hot and on time, the crust was perfect."</Text>
      </TabPanel>
      <TabPanel value="info">
        <Text style={text}>Open 11:00 - 23:00 · Delivery in 25 min</Text>
      </TabPanel>
    </Tabs>
  );
}

```

## Example: scrollable

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/tabs/native/scrollable.tsx

```tsx
import { Text } from "react-native";
import { Tabs, useTheme } from "minerva-design/native";

const CATEGORIES = [
  "For you",
  "Burgers",
  "Sushi",
  "Pizza",
  "Salads",
  "Desserts",
  "Drinks",
  "Vegan",
];

export default function Scrollable() {
  const { colors } = useTheme();
  return (
    <Tabs
      defaultValue="Sushi"
      listLabel="Food categories"
      items={CATEGORIES.map((name) => ({
        value: name,
        label: name,
        content: (
          <Text style={{ color: colors["text-secondary-color"], padding: 16 }}>
            Top {name.toLowerCase()} restaurants near you
          </Text>
        ),
      }))}
    />
  );
}

```

## Example: 变体

同一组 Hot、New、Completed 标签展示 line、enclosed、soft、pills 四种外观，均默认选中 Hot。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/tabs/native/variants.tsx

```tsx
import { View } from "react-native";
import { Tabs, Tab, TabList } from "minerva-design/native";
const variants = ["line", "enclosed", "soft", "pills"] as const;
export default function Variants() {
  return (
    <View style={{ gap: 24 }}>
      {variants.map((variant) => (
        <Tabs key={variant} variant={variant} defaultValue="hot">
          <TabList aria-label={`${variant} tabs`}>
            <Tab value="hot">Hot</Tab>
            <Tab value="new">New</Tab>
            <Tab value="completed">Completed</Tab>
          </TabList>
        </Tabs>
      ))}
    </View>
  );
}

```

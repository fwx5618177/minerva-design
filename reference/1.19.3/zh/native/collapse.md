# Collapse 折叠面板

使用原生移动控件和共享设计变量构建的折叠面板。

Package: minerva-design@1.19.3

Renderer: native

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "1b65455cccbdd71bb609d7d859b1ef90f9e604c6",
  "sourceDigest": "sha256:a8b34eea01e9133306bb1fde48e7966deaaaa35d87c2dfd2e181d891c65e01c1",
  "referenceSourceDigest": "sha256:d3ed05a4228bc39ff766871c13b5ba292792f934f6ebc3d0d29af28589be129c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

## Collapse

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "Collapse"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "value",
    "source": "packages/native/src/components/Collapse/Collapse.tsx",
    "kind": "union",
    "typeText": "string | string[] | undefined",
    "typeRef": "type:5486fc2b13911672f74a",
    "required": false,
    "description": "Names of the expanded items (controlled; pair with `onChange`): an array, or a single name (`\"\"`: none) in `accordion` mode"
  },
  {
    "name": "defaultValue",
    "source": "packages/native/src/components/Collapse/Collapse.tsx",
    "kind": "union",
    "typeText": "string | string[] | undefined",
    "typeRef": "type:5486fc2b13911672f74a",
    "required": false,
    "description": "Names of the items expanded at first (uncontrolled)"
  },
  {
    "name": "accordion",
    "source": "packages/native/src/components/Collapse/Collapse.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Accordion: at most one item expanded at a time"
  },
  {
    "name": "border",
    "source": "packages/native/src/components/Collapse/Collapse.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Hairline borders above the list and under each item"
  }
]
```

### events

```json
[
  {
    "name": "onChange",
    "source": "packages/native/src/components/Collapse/Collapse.tsx",
    "kind": "function",
    "typeText": "((value: string | string[]) => void) | undefined",
    "typeRef": "type:95c4880b7af708b654ae",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "string | string[]",
        "typeRef": "type:2ccd9da2240d5a578b95"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called with the requested expanded names: an array, or the single expanded name (`\"\"`: none) in `accordion` mode"
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
  "native:CollapseProps": {
    "source": "native/src/components/Collapse/Collapse.tsx",
    "kind": "interface",
    "extends": [
      "Omit<ViewProps, \"style\" | \"children\">"
    ],
    "props": [
      {
        "name": "value",
        "type": "string | string[]",
        "required": false,
        "description": "Names of the expanded items (controlled; pair with `onChange`): an array, or a single name (`\"\"`: none) in `accordion` mode"
      },
      {
        "name": "defaultValue",
        "type": "string | string[]",
        "required": false,
        "default": "[] (\"\" in accordion mode)",
        "description": "Names of the items expanded at first (uncontrolled)"
      },
      {
        "name": "onChange",
        "type": "(value: string | string[]) => void",
        "required": false,
        "description": "Called with the requested expanded names: an array, or the single expanded name (`\"\"`: none) in `accordion` mode"
      },
      {
        "name": "accordion",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Accordion: at most one item expanded at a time"
      },
      {
        "name": "border",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Hairline borders above the list and under each item"
      },
      {
        "name": "children",
        "type": "ReactNode",
        "required": false,
        "description": "`CollapseItem` elements"
      },
      {
        "name": "style",
        "type": "StyleProp<ViewStyle>",
        "required": false,
        "description": "Style of the list"
      }
    ]
  },
  "native:CollapseItemProps": {
    "source": "native/src/components/Collapse/Collapse.tsx",
    "kind": "interface",
    "extends": [
      "Omit<ViewProps, \"style\" | \"children\">"
    ],
    "props": [
      {
        "name": "name",
        "type": "string",
        "required": true,
        "description": "Name identifying the item in the `Collapse` value"
      },
      {
        "name": "title",
        "type": "ReactNode",
        "required": false,
        "description": "Title of the header"
      },
      {
        "name": "label",
        "type": "ReactNode",
        "required": false,
        "description": "Secondary text under the title"
      },
      {
        "name": "value",
        "type": "ReactNode",
        "required": false,
        "description": "Text on the right of the header (before the chevron)"
      },
      {
        "name": "icon",
        "type": "ReactNode",
        "required": false,
        "description": "Element before the title"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables the item (cannot be toggled)"
      },
      {
        "name": "isLink",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Shows the chevron of the header"
      },
      {
        "name": "children",
        "type": "ReactNode",
        "required": false,
        "description": "Content shown while expanded"
      },
      {
        "name": "style",
        "type": "StyleProp<ViewStyle>",
        "required": false,
        "description": "Style of the item"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: accordion

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/collapse/native/accordion.tsx

```tsx
import { Text } from "react-native";
import { Collapse, CollapseItem, useTheme } from "minerva-design/native";

const FAQ = [
  {
    name: "cancel",
    q: "How do I cancel an order?",
    a: "Open Orders, pick the order and tap Cancel before it ships.",
  },
  {
    name: "pay",
    q: "Which payment methods work?",
    a: "Cards, Apple Pay, Google Pay and PayPal.",
  },
  {
    name: "track",
    q: "Where is my package?",
    a: "Tracking appears in Orders as soon as the parcel leaves the warehouse.",
  },
];

export default function Accordion() {
  const { colors } = useTheme();
  return (
    <Collapse accordion defaultValue="cancel">
      {FAQ.map((item) => (
        <CollapseItem key={item.name} name={item.name} title={item.q}>
          <Text style={{ color: colors["text-secondary-color"] }}>
            {item.a}
          </Text>
        </CollapseItem>
      ))}
    </Collapse>
  );
}

```

## Example: basic

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/collapse/native/basic.tsx

```tsx
import { useState } from "react";
import { Text } from "react-native";
import { Collapse, CollapseItem, useTheme } from "minerva-design/native";

export default function Basic() {
  const { colors } = useTheme();
  const [open, setOpen] = useState<string | string[]>(["shipping"]);
  const body = { color: colors["text-secondary-color"] };
  return (
    <>
      <Collapse value={open} onChange={setOpen}>
        <CollapseItem
          name="shipping"
          title="Shipping"
          value="Free"
          icon={<Text>🚚</Text>}
        >
          <Text style={body}>Arrives in 2–4 business days with tracking.</Text>
        </CollapseItem>
        <CollapseItem
          name="returns"
          title="Returns"
          label="30-day free returns"
          icon={<Text>↩️</Text>}
        >
          <Text style={body}>
            Drop the parcel at any pickup point for a full refund.
          </Text>
        </CollapseItem>
        <CollapseItem
          name="warranty"
          title="Warranty"
          value="Not included"
          icon={<Text>🛡️</Text>}
          disabled
        >
          <Text style={body}>This item has no extended warranty.</Text>
        </CollapseItem>
      </Collapse>
      <Text style={[body, { marginTop: 12 }]}>
        Expanded: {[open].flat().join(", ") || "none"}
      </Text>
    </>
  );
}

```

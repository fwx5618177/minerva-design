# SwipeCell

Native mobile swipe actions with accessible controls and shared design tokens.

Package: minerva-design@1.20.2

Renderer: native

Locale: en

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

## SwipeCell

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "SwipeCell"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "leftActions",
    "source": "packages/native/src/components/SwipeCell/SwipeCell.tsx",
    "kind": "array",
    "typeText": "readonly SwipeCellAction[] | undefined",
    "typeRef": "type:0300eb98166388ed7f2d",
    "required": false,
    "description": "Action buttons revealed by swiping right (shown on the left)"
  },
  {
    "name": "rightActions",
    "source": "packages/native/src/components/SwipeCell/SwipeCell.tsx",
    "kind": "array",
    "typeText": "readonly SwipeCellAction[] | undefined",
    "typeRef": "type:0300eb98166388ed7f2d",
    "required": false,
    "description": "Action buttons revealed by swiping left (shown on the right)"
  },
  {
    "name": "left",
    "source": "packages/native/src/components/SwipeCell/SwipeCell.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Custom content revealed on the left (replaces `leftActions`)"
  },
  {
    "name": "right",
    "source": "packages/native/src/components/SwipeCell/SwipeCell.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Custom content revealed on the right (replaces `rightActions`)"
  },
  {
    "name": "disabled",
    "source": "packages/native/src/components/SwipeCell/SwipeCell.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Disables swiping"
  },
  {
    "name": "closeOnActionPress",
    "source": "packages/native/src/components/SwipeCell/SwipeCell.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Closes the cell after an action button press"
  },
  {
    "name": "contentStyle",
    "source": "packages/native/src/components/SwipeCell/SwipeCell.tsx",
    "kind": "union",
    "typeText": "StyleProp<ViewStyle>",
    "typeRef": "type:e697903ddc58ec54def0",
    "required": false,
    "description": "Style of the sliding content"
  }
]
```

### events

```json
[
  {
    "name": "onOpen",
    "source": "packages/native/src/components/SwipeCell/SwipeCell.tsx",
    "kind": "function",
    "typeText": "((side: SwipeCellSide) => void) | undefined",
    "typeRef": "type:7a68a0deb4d36e8fd978",
    "parameters": [
      {
        "name": "side",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "SwipeCellSide",
        "typeRef": "type:8a9acbd5076117764c74"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when a side opens"
  },
  {
    "name": "onClose",
    "source": "packages/native/src/components/SwipeCell/SwipeCell.tsx",
    "kind": "function",
    "typeText": "(() => void) | undefined",
    "typeRef": "type:8b08c960e87ad5652c92",
    "parameters": [],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the cell closes"
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
  "native:SwipeCellProps": {
    "source": "native/src/components/SwipeCell/SwipeCell.tsx",
    "kind": "interface",
    "extends": [
      "Omit<ViewProps, \"style\" | \"children\">"
    ],
    "props": [
      {
        "name": "children",
        "type": "ReactNode",
        "required": false,
        "description": "Row content"
      },
      {
        "name": "leftActions",
        "type": "readonly SwipeCellAction[]",
        "required": false,
        "description": "Action buttons revealed by swiping right (shown on the left)"
      },
      {
        "name": "rightActions",
        "type": "readonly SwipeCellAction[]",
        "required": false,
        "description": "Action buttons revealed by swiping left (shown on the right)"
      },
      {
        "name": "left",
        "type": "ReactNode",
        "required": false,
        "description": "Custom content revealed on the left (replaces `leftActions`)"
      },
      {
        "name": "right",
        "type": "ReactNode",
        "required": false,
        "description": "Custom content revealed on the right (replaces `rightActions`)"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables swiping"
      },
      {
        "name": "closeOnActionPress",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Closes the cell after an action button press"
      },
      {
        "name": "onOpen",
        "type": "(side: SwipeCellSide) => void",
        "required": false,
        "description": "Called when a side opens"
      },
      {
        "name": "onClose",
        "type": "() => void",
        "required": false,
        "description": "Called when the cell closes"
      },
      {
        "name": "ref",
        "type": "Ref<SwipeCellHandle>",
        "required": false,
        "description": "Imperative `open(side)` / `close()`"
      },
      {
        "name": "style",
        "type": "StyleProp<ViewStyle>",
        "required": false,
        "description": "Style of the row container"
      },
      {
        "name": "contentStyle",
        "type": "StyleProp<ViewStyle>",
        "required": false,
        "description": "Style of the sliding content"
      }
    ]
  },
  "native:SwipeCellAction": {
    "source": "native/src/components/SwipeCell/SwipeCell.tsx",
    "description": "An action button revealed by a swipe",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "text",
        "type": "string",
        "required": true,
        "description": "Text of the button (also its accessibility action label)"
      },
      {
        "name": "name",
        "type": "string",
        "required": false,
        "default": "`text`",
        "description": "Accessibility action name"
      },
      {
        "name": "color",
        "type": "NativeColor",
        "required": false,
        "default": "\"danger\" for the last right action, else \"neutral\"",
        "description": "Background color role"
      },
      {
        "name": "onPress",
        "type": "() => void",
        "required": false,
        "description": "Called by the button and its accessibility action"
      }
    ]
  },
  "native:SwipeCellHandle": {
    "source": "native/src/components/SwipeCell/SwipeCell.tsx",
    "description": "Imperative handle of `SwipeCell` (`ref`)",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "open",
        "type": "(side?: SwipeCellSide) => void",
        "required": true,
        "description": "Reveals the actions of a side"
      },
      {
        "name": "close",
        "type": "() => void",
        "required": true,
        "description": "Hides the actions"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: basic

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/swipe-cell/native/basic.tsx

```tsx
import { useState } from "react";
import { Text, View } from "react-native";
import { Cell, SwipeCell, useTheme } from "minerva-design/native";

const CHATS = ["Anna Lee", "Pizza Palace", "Mom"];

export default function Basic() {
  const { colors } = useTheme();
  const [chats, setChats] = useState(CHATS);
  const [last, setLast] = useState("Swipe a row left or right");
  return (
    <View style={{ gap: 12 }}>
      {chats.map((name) => (
        <SwipeCell
          key={name}
          leftActions={[
            {
              text: "Pin",
              color: "primary",
              onPress: () => setLast(`Pinned ${name}`),
            },
          ]}
          rightActions={[
            { text: "Mute", onPress: () => setLast(`Muted ${name}`) },
            {
              text: "Delete",
              onPress: () => setChats((list) => list.filter((c) => c !== name)),
            },
          ]}
        >
          <Cell title={name} label="Tap to open the chat" />
        </SwipeCell>
      ))}
      <Text style={{ color: colors["text-secondary-color"] }}>{last}</Text>
    </View>
  );
}

```

## Example: custom-actions

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/swipe-cell/native/custom-actions.tsx

```tsx
import { useRef, useState } from "react";
import { Text, View } from "react-native";
import {
  Button,
  Cell,
  SwipeCell,
  useTheme,
  type SwipeCellHandle,
} from "minerva-design/native";

export default function CustomActions() {
  const { colors } = useTheme();
  const cell = useRef<SwipeCellHandle>(null);
  const [state, setState] = useState("closed");
  const [qty, setQty] = useState(1);
  const step = (delta: number) => (
    <Button
      variant="ghost"
      accessibilityRole="button"
      onPress={() => setQty((n) => Math.max(1, n + delta))}
      style={{ width: 56, justifyContent: "center", alignItems: "center" }}
    >
      <Text style={{ fontSize: 22, color: colors["primary-color"] }}>
        {delta > 0 ? "+" : "−"}
      </Text>
    </Button>
  );
  return (
    <View style={{ gap: 12 }}>
      <SwipeCell
        ref={cell}
        right={
          <View
            style={{
              flexDirection: "row",
              backgroundColor: colors["surface-muted-color"],
            }}
          >
            {step(-1)}
            {step(1)}
          </View>
        }
        onOpen={(side) => setState(`open (${side})`)}
        onClose={() => setState("closed")}
      >
        <Cell
          title="Margherita pizza"
          label="Large · $12.90"
          value={`× ${qty}`}
        />
      </SwipeCell>
      <View style={{ flexDirection: "row", gap: 8 }}>
        <Button size="small" onPress={() => cell.current?.open("right")}>
          Edit quantity
        </Button>
        <Button
          size="small"
          variant="outline"
          onPress={() => cell.current?.close()}
        >
          Done
        </Button>
      </View>
      <Text style={{ color: colors["text-secondary-color"] }}>
        Cell is {state}
      </Text>
    </View>
  );
}

```

# Steps ステップ

ワークフローの段階を表示し、段階間を移動できるようにします。

Package: minerva-design@1.21.0

Renderer: native

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.0",
  "sourceCommit": "cf7fb249651cd06c89d0951ac2c3a3aa74dc835a",
  "sourceDigest": "sha256:e0f51a94cc5272baf2775327d83ba025ee09228cfc17f4d529188b1653c78892",
  "referenceSourceDigest": "sha256:563c9bec5d90807342a94c02317519b3da937907129bda2d25ea49762fa828fd"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.0/types.json) or getType() from minerva-design/contracts.

## Documentation

## Steps

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "Steps"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "items",
    "source": "packages/native/src/components/Steps/Steps.tsx",
    "kind": "array",
    "typeText": "readonly StepsItem[]",
    "typeRef": "type:607435bca0196656c72f",
    "required": true,
    "description": "Steps, in order"
  },
  {
    "name": "value",
    "source": "packages/native/src/components/Steps/Steps.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Value of the current step (controlled; pair with onChange)"
  },
  {
    "name": "defaultValue",
    "source": "packages/native/src/components/Steps/Steps.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Value of the initial current step (uncontrolled)"
  },
  {
    "name": "readOnly",
    "source": "packages/native/src/components/Steps/Steps.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Renders the steps as a read-only progress indicator (no buttons)"
  },
  {
    "name": "direction",
    "source": "packages/native/src/components/Steps/Steps.tsx",
    "kind": "enum",
    "values": [
      "horizontal",
      "vertical"
    ],
    "typeText": "StepsDirection | undefined",
    "typeRef": "type:a1c4c98c3600726351ce",
    "default": "horizontal",
    "required": false,
    "description": "Layout of the steps"
  },
  {
    "name": "status",
    "source": "packages/native/src/components/Steps/Steps.tsx",
    "kind": "enum",
    "values": [
      "error",
      "finish",
      "process",
      "wait"
    ],
    "typeText": "StepStatus | undefined",
    "typeRef": "type:0fed48d49ccc8b9b9fd9",
    "default": "process",
    "required": false,
    "description": "Status of the current step (e.g. `error` when it failed)"
  },
  {
    "name": "aria-label",
    "source": "packages/native/src/components/Steps/Steps.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label of the list"
  }
]
```

### events

```json
[
  {
    "name": "onChange",
    "source": "packages/native/src/components/Steps/Steps.tsx",
    "kind": "function",
    "typeText": "((value: string) => void) | undefined",
    "typeRef": "type:81a26d826665baca731e",
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
    "description": "Called with the value of the step the user presses"
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
  "native:StepsProps": {
    "source": "native/src/components/Steps/Steps.tsx",
    "kind": "interface",
    "extends": [
      "Omit<ViewProps, \"style\" | \"children\">"
    ],
    "props": [
      {
        "name": "items",
        "type": "readonly StepsItem[]",
        "required": true,
        "description": "Steps, in order"
      },
      {
        "name": "value",
        "type": "string",
        "required": false,
        "description": "Value of the current step (controlled; pair with onChange)"
      },
      {
        "name": "defaultValue",
        "type": "string",
        "required": false,
        "default": "the first step",
        "description": "Value of the initial current step (uncontrolled)"
      },
      {
        "name": "onChange",
        "type": "(value: string) => void",
        "required": false,
        "description": "Called with the value of the step the user presses"
      },
      {
        "name": "readOnly",
        "type": "boolean",
        "required": false,
        "default": "true when onChange is not set, otherwise false",
        "description": "Renders the steps as a read-only progress indicator (no buttons)"
      },
      {
        "name": "direction",
        "type": "StepsDirection",
        "required": false,
        "default": "\"horizontal\"",
        "description": "Layout of the steps"
      },
      {
        "name": "status",
        "type": "StepStatus",
        "required": false,
        "default": "\"process\"",
        "description": "Status of the current step (e.g. `error` when it failed)"
      },
      {
        "name": "aria-label",
        "type": "string",
        "required": false,
        "default": "\"Steps\" (localized)",
        "description": "Accessible label of the list"
      },
      {
        "name": "style",
        "type": "StyleProp<ViewStyle>",
        "required": false,
        "description": "Style of the list"
      }
    ]
  },
  "native:StepsItem": {
    "source": "native/src/components/Steps/Steps.tsx",
    "description": "One step",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "value",
        "type": "string",
        "required": false,
        "default": "its index as a string",
        "description": "Unique value of the step, matched against the Steps value"
      },
      {
        "name": "title",
        "type": "ReactNode",
        "required": false,
        "description": "Visible title of the step"
      },
      {
        "name": "label",
        "type": "ReactNode",
        "required": false,
        "description": "Alias of `title` (React Steps vocabulary)"
      },
      {
        "name": "description",
        "type": "ReactNode",
        "required": false,
        "description": "Supporting text under the title"
      },
      {
        "name": "status",
        "type": "StepStatus",
        "required": false,
        "description": "Forces the status of this step (derived from the current step otherwise)"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "description": "Prevents navigating to this step"
      },
      {
        "name": "icon",
        "type": "ReactNode",
        "required": false,
        "description": "Custom indicator content (an icon) instead of the number / check"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:Steps": {
    "kind": "cssVars",
    "source": "react/src/components/Steps",
    "vars": [
      {
        "name": "--steps-gap",
        "description": "Space between the steps (row and column gap)"
      },
      {
        "name": "--steps-font-size",
        "description": "Font size of the labels"
      },
      {
        "name": "--steps-indicator-size",
        "description": "Diameter of the numbered indicator"
      },
      {
        "name": "--steps-accent-color",
        "description": "Color of the current / completed indicators (defaults to --primary-color)"
      },
      {
        "name": "--steps-current-background",
        "description": "Background of the current step's indicator"
      },
      {
        "name": "--steps-connector-color",
        "description": "Color of the line joining the upcoming steps (defaults to --border-color)"
      },
      {
        "name": "--steps-connector-complete-color",
        "description": "Color of the line after a completed step (defaults to the accent color)"
      },
      {
        "name": "--steps-connector-min-width",
        "description": "Minimum length of the line joining two steps"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 基本

初期選択は Review です。Draft に戻れますが、Publish は無効です。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/steps/native/basic.tsx

```tsx
import { useState } from "react";
import { Steps } from "minerva-design/native";

const items = [
  { value: "draft", label: "Draft" },
  { value: "review", label: "Review" },
  { value: "publish", label: "Publish", disabled: true },
];

export default function BasicDemo() {
  const [step, setStep] = useState("review");
  return <Steps items={items} value={step} onChange={setStep} />;
}

```

## Example: vertical

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/steps/native/vertical.tsx

```tsx
import { useState } from "react";
import { View } from "react-native";
import { Button, Steps } from "minerva-design/native";

const ITEMS = [
  { title: "Order placed", description: "Today, 12:04" },
  { title: "Restaurant confirmed", description: "Burger House, 12:06" },
  { title: "Courier on the way", description: "Alex picked up your order" },
  { title: "Delivered", description: "Estimated 12:40" },
];

export default function Vertical() {
  const [failed, setFailed] = useState(false);
  return (
    <View style={{ gap: 16 }}>
      <Steps
        direction="vertical"
        items={ITEMS}
        defaultValue="2"
        status={failed ? "error" : "process"}
        aria-label="Order tracking"
      />
      <Button
        variant="outline"
        color={failed ? "neutral" : "danger"}
        onPress={() => setFailed((f) => !f)}
      >
        {failed ? "Courier back on track" : "Report a delivery problem"}
      </Button>
    </View>
  );
}

```

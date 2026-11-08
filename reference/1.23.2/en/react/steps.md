# Steps

Shows the stages of a workflow and lets the user move between them.

Package: minerva-design@1.23.2

Renderer: react

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.2",
  "sourceCommit": "c6618fd81b2d3c2a9016cfe13a1d15983d533ff7",
  "sourceDigest": "sha256:1ce1c857f10d367f112c6e77d88ae3878570c428c4d39ed7a400c8c99645e9f6",
  "referenceSourceDigest": "sha256:8f6e89c1e214fedc2e52de014615037c54204a8ec5c0dbb40c58dc530906571e"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.2/types.json) or getType() from minerva-design/contracts.

## Documentation

## Steps

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
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
    "source": "packages/react/src/components/Steps/types.ts",
    "kind": "array",
    "typeText": "StepsItem[]",
    "typeRef": "type:a10c0fe86842ca4d17e9",
    "required": true,
    "description": "Steps, in order"
  },
  {
    "name": "value",
    "source": "packages/react/src/components/Steps/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Value of the current step (controlled; pair with onChange)"
  },
  {
    "name": "defaultValue",
    "source": "packages/react/src/components/Steps/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Value of the initial current step (uncontrolled)"
  },
  {
    "name": "readOnly",
    "source": "packages/react/src/components/Steps/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Renders the steps as a read-only progress indicator: plain list items without buttons, the current <li> marked aria-current=\"step\""
  },
  {
    "name": "aria-label",
    "source": "packages/react/src/components/Steps/types.ts",
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
    "source": "packages/react/src/components/Steps/types.ts",
    "kind": "function",
    "typeText": "((value: string) => void) | undefined",
    "typeRef": "type:9692bd8c59c98785ba77",
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
    "description": "Called with the value of the step the user navigates to. Steps only report navigation: validation and workflow transitions belong to the caller"
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
  "StepsProps": {
    "source": "react/src/components/Steps/types.ts",
    "kind": "interface",
    "extends": [
      "Omit<HTMLAttributes<HTMLOListElement>, \"onChange\" | \"defaultValue\" | \"children\">"
    ],
    "props": [
      {
        "name": "items",
        "type": "StepsItem[]",
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
        "description": "Value of the initial current step (uncontrolled)"
      },
      {
        "name": "onChange",
        "type": "(value: string) => void",
        "required": false,
        "description": "Called with the value of the step the user navigates to. Steps only report navigation: validation and workflow transitions belong to the caller"
      },
      {
        "name": "readOnly",
        "type": "boolean",
        "required": false,
        "default": "true when onChange is not set, otherwise false",
        "description": "Renders the steps as a read-only progress indicator: plain list items without buttons, the current <li> marked aria-current=\"step\""
      },
      {
        "name": "aria-label",
        "type": "string",
        "required": false,
        "default": "\"Steps\" (localized)",
        "description": "Accessible label of the list"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional class name"
      },
      {
        "name": "ref",
        "type": "Ref<HTMLOListElement>",
        "required": false,
        "description": "Ref to the root <ol> element"
      }
    ]
  },
  "StepsItem": {
    "source": "react/src/components/Steps/types.ts",
    "description": "One step of a Steps component",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "value",
        "type": "string",
        "required": true,
        "description": "Unique value of the step, matched against the Steps value"
      },
      {
        "name": "label",
        "type": "ReactNode",
        "required": true,
        "description": "Visible label of the step"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Prevents navigating to this step (e.g. a terminal state that is not reached yet)"
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

## Example: Basic usage

Review is initially selected. Choose Draft to go back; Publish is disabled.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/steps/demos/basic.tsx

```tsx
import { useState } from "react";
import { Steps } from "minerva-design";

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

## Example: Read-only progress

Without onChange the steps are a read-only progress indicator: a plain ordered list (no buttons) whose current item has aria-current="step".

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/steps/demos/read-only.tsx

```tsx
import { Steps } from "minerva-design";

export default function ReadOnlyDemo() {
  return (
    <Steps
      aria-label="Order progress"
      value="shipped"
      items={[
        { value: "paid", label: "Paid" },
        { value: "shipped", label: "Shipped" },
        { value: "delivered", label: "Delivered" },
      ]}
    />
  );
}

```

## Example: Styling

Completed steps show a check mark on a solid disc, the current one a soft halo, and the connectors fill in as steps complete. --steps-accent-color recolors them, --steps-connector-min-width / --steps-connector-color tune the lines.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/steps/demos/styling.tsx

```tsx
import type { CSSProperties } from "react";
import { Steps } from "minerva-design";

// Completed steps show a check on a solid disc, the current one a halo;
// connectors fill in as the steps complete.
const style = {
  "--steps-accent-color": "var(--success-color)",
  "--steps-connector-min-width": "3rem",
} as CSSProperties;

export default function StylingDemo() {
  return (
    <Steps
      aria-label="Deployment"
      value="deploy"
      style={style}
      items={[
        { value: "build", label: "Build" },
        { value: "test", label: "Test" },
        { value: "deploy", label: "Deploy" },
        { value: "verify", label: "Verify" },
      ]}
    />
  );
}

```

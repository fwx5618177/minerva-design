# Switch

Toggles a single setting on or off, with immediate effect.

Package: minerva-design@1.20.6

Renderer: react

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.6",
  "sourceCommit": "99b9ad1465abc6ea97d2a8c008f3026645edb983",
  "sourceDigest": "sha256:e0f51a94cc5272baf2775327d83ba025ee09228cfc17f4d529188b1653c78892",
  "referenceSourceDigest": "sha256:d66e13eea732bfeb1a6aaa7461bf92ea0d54944072977e762c106b87e877d062"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.6/types.json) or getType() from minerva-design/contracts.

## Documentation

## Switch

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "Switch"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "checked",
    "source": "packages/react/src/components/Switch/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Whether the switch is on (controlled)"
  },
  {
    "name": "defaultChecked",
    "source": "packages/react/src/components/Switch/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Initial state (uncontrolled)"
  },
  {
    "name": "disabled",
    "source": "packages/react/src/components/Switch/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Disables the switch. Inherited from an enclosing FormControl when not set; an explicit `false` overrides the FormControl"
  },
  {
    "name": "size",
    "source": "packages/react/src/components/Switch/types.ts",
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
    "description": "Switch size"
  },
  {
    "name": "color",
    "source": "packages/react/src/components/Switch/types.ts",
    "kind": "enum",
    "values": [
      "danger",
      "info",
      "primary",
      "success",
      "warning"
    ],
    "typeText": "\"primary\" | \"success\" | \"warning\" | \"danger\" | \"info\" | undefined",
    "typeRef": "type:55b92b1f55ce64573a84",
    "default": "primary",
    "required": false,
    "description": "Semantic color of the \"on\" state (checked thumb and track, active side label / segment)"
  },
  {
    "name": "shape",
    "source": "packages/react/src/components/Switch/types.ts",
    "kind": "enum",
    "values": [
      "round",
      "square"
    ],
    "typeText": "\"square\" | \"round\" | undefined",
    "typeRef": "type:20c454908c83baffbbc6",
    "default": "round",
    "required": false,
    "description": "Shape of the track and thumb"
  },
  {
    "name": "variant",
    "source": "packages/react/src/components/Switch/types.ts",
    "kind": "enum",
    "values": [
      "segmented",
      "slider"
    ],
    "typeText": "SwitchVariant | undefined",
    "typeRef": "type:ec4ff5b331bde7ae3341",
    "default": "slider",
    "required": false,
    "description": "\"slider\" is the classic track + thumb; \"segmented\" renders two pressable segments (requires offLabel and onLabel, otherwise falls back to slider)"
  },
  {
    "name": "label",
    "source": "packages/react/src/components/Switch/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Label displayed next to the switch"
  },
  {
    "name": "offLabel",
    "source": "packages/react/src/components/Switch/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Label of the \"off\" state. With onLabel, both labels are rendered as buttons on each side of the slider (they replace `label`) or as the segments of the segmented variant"
  },
  {
    "name": "onLabel",
    "source": "packages/react/src/components/Switch/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Label of the \"on\" state (see offLabel)"
  },
  {
    "name": "aria-label",
    "source": "packages/react/src/components/Switch/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label, required when the switch has no visible label. Set on the switch input (on the segment group for the segmented variant)"
  },
  {
    "name": "aria-labelledby",
    "source": "packages/react/src/components/Switch/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "id(s) of the element(s) labelling the switch (on the segment group for the segmented variant). Defaults to the enclosing FormControl's label for the segmented variant"
  },
  {
    "name": "aria-describedby",
    "source": "packages/react/src/components/Switch/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Extra id(s) of elements describing the switch, merged with the enclosing FormControl's helper / error text"
  },
  {
    "name": "name",
    "source": "packages/react/src/components/Switch/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Name of the input, used in forms"
  },
  {
    "name": "id",
    "source": "packages/react/src/components/Switch/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "id of the input (defaults to the enclosing FormControl's id)"
  },
  {
    "name": "value",
    "source": "packages/react/src/components/Switch/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Value submitted with the form when on"
  },
  {
    "name": "labelPlacement",
    "source": "packages/react/src/components/Switch/types.ts",
    "kind": "enum",
    "values": [
      "bottom",
      "end",
      "start",
      "top"
    ],
    "typeText": "\"start\" | \"end\" | \"top\" | \"bottom\" | undefined",
    "typeRef": "type:836915cb975032a1441f",
    "default": "end",
    "required": false,
    "description": "Position of the label relative to the switch"
  },
  {
    "name": "loading",
    "source": "packages/react/src/components/Switch/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows a loading state and blocks interaction"
  },
  {
    "name": "ripple",
    "source": "packages/react/src/components/Switch/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Shows a ripple effect on click"
  },
  {
    "name": "trackStyle",
    "source": "packages/react/src/components/Switch/types.ts",
    "kind": "object",
    "typeText": "CSSProperties | undefined",
    "typeRef": "type:40d68ed00bb536ce8766",
    "required": false,
    "description": "Inline styles of the track"
  },
  {
    "name": "thumbStyle",
    "source": "packages/react/src/components/Switch/types.ts",
    "kind": "object",
    "typeText": "CSSProperties | undefined",
    "typeRef": "type:40d68ed00bb536ce8766",
    "required": false,
    "description": "Inline styles of the thumb"
  },
  {
    "name": "icon",
    "source": "packages/react/src/components/Switch/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Custom icon"
  },
  {
    "name": "iconPlacement",
    "source": "packages/react/src/components/Switch/types.ts",
    "kind": "enum",
    "values": [
      "end",
      "start"
    ],
    "typeText": "\"start\" | \"end\" | undefined",
    "typeRef": "type:1684fd9f7d4ddbea3eb8",
    "default": "start",
    "required": false,
    "description": "Icon position: inside the thumb (\"start\") or after the switch (\"end\")"
  }
]
```

### events

```json
[
  {
    "name": "onChange",
    "source": "packages/react/src/components/Switch/types.ts",
    "kind": "function",
    "typeText": "((checked: boolean, event: ChangeEvent<HTMLInputElement, Element>) => void) | undefined",
    "typeRef": "type:b69e4fcf2e5a14f00d00",
    "parameters": [
      {
        "name": "checked",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "boolean",
        "typeRef": "type:7087acd01ef7dd9f1d5c"
      },
      {
        "name": "event",
        "position": 1,
        "required": true,
        "rest": false,
        "typeText": "ChangeEvent<HTMLInputElement, Element>",
        "typeRef": "type:2c785b2d98c38377d501"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the state changes"
  },
  {
    "name": "onFocus",
    "source": "packages/react/src/components/Switch/types.ts",
    "kind": "function",
    "typeText": "((event: FocusEvent<HTMLInputElement, Element>) => void) | undefined",
    "typeRef": "type:b4d98d120ed1bc6cf9c7",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "FocusEvent<HTMLInputElement, Element>",
        "typeRef": "type:20a1b75c939d080fd107"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the switch receives focus"
  },
  {
    "name": "onBlur",
    "source": "packages/react/src/components/Switch/types.ts",
    "kind": "function",
    "typeText": "((event: FocusEvent<HTMLInputElement, Element>) => void) | undefined",
    "typeRef": "type:f6fc3afd1ef6d3623d11",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "FocusEvent<HTMLInputElement, Element>",
        "typeRef": "type:20a1b75c939d080fd107"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the switch loses focus"
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
  "SwitchProps": {
    "source": "react/src/components/Switch/types.ts",
    "description": "`data-*` attributes are forwarded to the root element.",
    "kind": "interface",
    "extends": [
      "DataAttributes"
    ],
    "props": [
      {
        "name": "checked",
        "type": "boolean",
        "required": false,
        "description": "Whether the switch is on (controlled)"
      },
      {
        "name": "defaultChecked",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Initial state (uncontrolled)"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables the switch. Inherited from an enclosing FormControl when not set; an explicit `false` overrides the FormControl"
      },
      {
        "name": "size",
        "type": "\"small\" | \"medium\" | \"large\"",
        "required": false,
        "default": "\"medium\"",
        "description": "Switch size"
      },
      {
        "name": "color",
        "type": "Extract<ColorScheme, \"primary\" | \"success\" | \"info\" | \"warning\" | \"danger\">",
        "required": false,
        "default": "\"primary\"",
        "description": "Semantic color of the \"on\" state (checked thumb and track, active side label / segment)"
      },
      {
        "name": "shape",
        "type": "\"round\" | \"square\"",
        "required": false,
        "default": "\"round\"",
        "description": "Shape of the track and thumb"
      },
      {
        "name": "variant",
        "type": "SwitchVariant",
        "required": false,
        "default": "\"slider\"",
        "description": "\"slider\" is the classic track + thumb; \"segmented\" renders two pressable segments (requires offLabel and onLabel, otherwise falls back to slider)"
      },
      {
        "name": "label",
        "type": "React.ReactNode",
        "required": false,
        "description": "Label displayed next to the switch"
      },
      {
        "name": "children",
        "type": "React.ReactNode",
        "required": false,
        "description": "Label content (alternative to `label`; used when `label` is not set)"
      },
      {
        "name": "offLabel",
        "type": "React.ReactNode",
        "required": false,
        "description": "Label of the \"off\" state. With onLabel, both labels are rendered as buttons on each side of the slider (they replace `label`) or as the segments of the segmented variant"
      },
      {
        "name": "onLabel",
        "type": "React.ReactNode",
        "required": false,
        "description": "Label of the \"on\" state (see offLabel)"
      },
      {
        "name": "aria-label",
        "type": "string",
        "required": false,
        "description": "Accessible label, required when the switch has no visible label. Set on the switch input (on the segment group for the segmented variant)"
      },
      {
        "name": "aria-labelledby",
        "type": "string",
        "required": false,
        "description": "id(s) of the element(s) labelling the switch (on the segment group for the segmented variant). Defaults to the enclosing FormControl's label for the segmented variant"
      },
      {
        "name": "aria-describedby",
        "type": "string",
        "required": false,
        "description": "Extra id(s) of elements describing the switch, merged with the enclosing FormControl's helper / error text"
      },
      {
        "name": "name",
        "type": "string",
        "required": false,
        "description": "Name of the input, used in forms"
      },
      {
        "name": "id",
        "type": "string",
        "required": false,
        "description": "id of the input (defaults to the enclosing FormControl's id)"
      },
      {
        "name": "value",
        "type": "string",
        "required": false,
        "description": "Value submitted with the form when on"
      },
      {
        "name": "labelPlacement",
        "type": "\"start\" | \"end\" | \"top\" | \"bottom\"",
        "required": false,
        "default": "\"end\"",
        "description": "Position of the label relative to the switch"
      },
      {
        "name": "loading",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Shows a loading state and blocks interaction"
      },
      {
        "name": "ripple",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Shows a ripple effect on click"
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
        "description": "Inline styles of the root element"
      },
      {
        "name": "trackStyle",
        "type": "React.CSSProperties",
        "required": false,
        "description": "Inline styles of the track"
      },
      {
        "name": "thumbStyle",
        "type": "React.CSSProperties",
        "required": false,
        "description": "Inline styles of the thumb"
      },
      {
        "name": "onChange",
        "type": "(checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void",
        "required": false,
        "description": "Called when the state changes"
      },
      {
        "name": "onFocus",
        "type": "(event: React.FocusEvent<HTMLInputElement>) => void",
        "required": false,
        "description": "Called when the switch receives focus"
      },
      {
        "name": "onBlur",
        "type": "(event: React.FocusEvent<HTMLInputElement>) => void",
        "required": false,
        "description": "Called when the switch loses focus"
      },
      {
        "name": "icon",
        "type": "React.ReactNode",
        "required": false,
        "description": "Custom icon"
      },
      {
        "name": "iconPlacement",
        "type": "\"start\" | \"end\"",
        "required": false,
        "default": "\"start\"",
        "description": "Icon position: inside the thumb (\"start\") or after the switch (\"end\")"
      },
      {
        "name": "ref",
        "type": "Ref<HTMLInputElement>",
        "required": false,
        "description": "Ref to the underlying <input role=\"switch\"> element"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:Switch": {
    "kind": "cssVars",
    "source": "react/src/components/Switch",
    "vars": [
      {
        "name": "--switch-track-width",
        "description": "Width of the track (every size)"
      },
      {
        "name": "--switch-track-height",
        "description": "Height of the track (every size)"
      },
      {
        "name": "--switch-thumb-size",
        "description": "Width and height of the thumb (every size)"
      },
      {
        "name": "--switch-track-color",
        "description": "Background of the unchecked track"
      },
      {
        "name": "--switch-thumb-color",
        "description": "Background of the unchecked thumb"
      },
      {
        "name": "--switch-checked-color",
        "description": "Accent of the checked thumb, track and active segment (defaults to the color prop's accent)"
      },
      {
        "name": "--switch-label-gap",
        "description": "Space between the switch and its label"
      },
      {
        "name": "--switch-label-font-size",
        "description": "Font size of the label (every size)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Standalone recipes

- [React controlled project form](/minerva-design/reference/1.20.6/recipes/react-form/README.md) — react; verified package 1.20.6

## Example: Basic usage

Uncontrolled switches with a label; defaultChecked sets the initial state.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/switch/demos/basic.tsx

```tsx
import { Switch } from "minerva-design";

export default function BasicDemo() {
  return (
    <>
      <Switch label="Wi-Fi" defaultChecked />
      <Switch label="Bluetooth" />
    </>
  );
}

```

## Example: Side labels and segmented

offLabel and onLabel render clickable labels on both sides of the slider; variant="segmented" turns them into a two-segment control.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/switch/demos/bilateral-and-segmented.tsx

```tsx
import { useState } from "react";
import { Switch } from "minerva-design";

export default function BilateralAndSegmentedDemo() {
  const [mock, setMock] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Switch
        aria-label="Data source"
        offLabel="Business BFF"
        onLabel="Mock response"
        checked={mock}
        onChange={setMock}
      />
      <Switch
        variant="segmented"
        aria-label="Data source"
        offLabel="Business BFF"
        onLabel="Mock response"
        checked={mock}
        onChange={setMock}
      />
    </div>
  );
}

```

## Example: Colors

color takes a semantic color for the checked state: primary (default), success, info, warning or danger.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/switch/demos/colors.tsx

```tsx
import { Switch } from "minerva-design";

const colors = ["primary", "success", "info", "warning", "danger"] as const;

export default function ColorsDemo() {
  return (
    <>
      {colors.map((color) => (
        <Switch key={color} color={color} label={color} defaultChecked />
      ))}
    </>
  );
}

```

## Example: Controlled

Use checked together with onChange to drive the switch from your state.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/switch/demos/controlled.tsx

```tsx
import { useState } from "react";
import { Switch } from "minerva-design";

export default function ControlledDemo() {
  const [enabled, setEnabled] = useState(false);

  return (
    <>
      <Switch
        label="Email notifications"
        checked={enabled}
        onChange={(checked) => setEnabled(checked)}
      />
      <span>Notifications are {enabled ? "on" : "off"}</span>
    </>
  );
}

```

## Example: Shape and custom styles

Square shape, no ripple, and custom trackStyle / thumbStyle.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/switch/demos/custom-style.tsx

```tsx
import { Switch } from "minerva-design";

export default function CustomStyleDemo() {
  return (
    <>
      <Switch shape="square" label="Square" defaultChecked />
      <Switch label="No ripple" ripple={false} />
      <Switch
        label="Custom track & thumb"
        defaultChecked
        trackStyle={{ background: "linear-gradient(90deg, #06b6d4, #3b82f6)" }}
        thumbStyle={{ boxShadow: "0 0 0 2px #3b82f6" }}
      />
    </>
  );
}

```

## Example: Icons

Render a small icon inside the thumb with icon.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-icons

Documentation context imports: none

### apps/docs/src/docs/pages/switch/demos/icons.tsx

```tsx
import { Switch } from "minerva-design";
import { FaCheck, FaMoon } from "react-icons/fa";

export default function IconsDemo() {
  return (
    <>
      <Switch label="Dark mode" icon={<FaMoon size={10} />} defaultChecked />
      <Switch label="Auto-save" icon={<FaCheck size={10} />} />
    </>
  );
}

```

## Example: Label placement

Place the label before ("start"), after ("end", default), above ("top") or below ("bottom") the switch with labelPlacement.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/switch/demos/label-placement.tsx

```tsx
import { Switch } from "minerva-design";

const placements = ["start", "end", "top", "bottom"] as const;

export default function LabelPlacementDemo() {
  return (
    <>
      {placements.map((placement) => (
        <Switch
          key={placement}
          label={`Label at ${placement}`}
          labelPlacement={placement}
          defaultChecked
        />
      ))}
    </>
  );
}

```

## Example: Sizes

Three sizes: small, medium (default) and large.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/switch/demos/sizes.tsx

```tsx
import { Switch } from "minerva-design";

export default function SizesDemo() {
  return (
    <>
      <Switch size="small" label="Small" defaultChecked />
      <Switch size="medium" label="Medium" defaultChecked />
      <Switch size="large" label="Large" defaultChecked />
    </>
  );
}

```

## Example: Loading and disabled

loading shows a busy state and, like disabled, blocks interaction.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/switch/demos/states.tsx

```tsx
import { Switch } from "minerva-design";

export default function StatesDemo() {
  return (
    <>
      <Switch label="Loading" loading defaultChecked />
      <Switch label="Disabled" disabled />
      <Switch label="Disabled (on)" disabled defaultChecked />
    </>
  );
}

```

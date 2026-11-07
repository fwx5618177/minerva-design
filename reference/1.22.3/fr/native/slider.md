# Slider

Choisissez un nombre, ou une plage avec deux curseurs, en glissant le long d'une piste : pas ou graduations, libellé de valeur et infobulle, et un événement distinct quand l'utilisateur relâche.

Package: minerva-design@1.22.3

Renderer: native

Locale: fr

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

## Slider

Support: beta

Touch slider on the responder system (press the track, drag; the gesture is not stolen by a parent ScrollView), one or two thumbs, marks, value label and drag tooltip; each thumb is adjustable (increment / decrement). Horizontal or vertical (orientation; the vertical track runs bottom = min to top = max, 160 dp by default); no hidden form input (use FormField / onChangeEnd).

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "Slider"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "value",
    "source": "packages/native/src/components/Slider/Slider.tsx",
    "kind": "union",
    "typeText": "SliderValue | undefined",
    "typeRef": "type:57afcfaa304ddfd6ee22",
    "required": false,
    "description": "Value (controlled): a number, or `[start, end]` with `range`"
  },
  {
    "name": "defaultValue",
    "source": "packages/native/src/components/Slider/Slider.tsx",
    "kind": "union",
    "typeText": "SliderValue | undefined",
    "typeRef": "type:57afcfaa304ddfd6ee22",
    "required": false,
    "description": "Initial value (uncontrolled); defaults to min, or [min, max] with range"
  },
  {
    "name": "range",
    "source": "packages/native/src/components/Slider/Slider.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Two thumbs selecting `[start, end]`; the thumbs cannot cross"
  },
  {
    "name": "min",
    "source": "packages/native/src/components/Slider/Slider.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 0,
    "required": false,
    "description": "Smallest value"
  },
  {
    "name": "max",
    "source": "packages/native/src/components/Slider/Slider.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 100,
    "required": false,
    "description": "Largest value"
  },
  {
    "name": "step",
    "source": "packages/native/src/components/Slider/Slider.tsx",
    "kind": "number",
    "typeText": "number | null | undefined",
    "typeRef": "type:63da203dcb31379a7982",
    "default": 1,
    "required": false,
    "description": "Step between two values; `null` snaps to the marks only"
  },
  {
    "name": "marks",
    "source": "packages/native/src/components/Slider/Slider.tsx",
    "kind": "union",
    "typeText": "boolean | SliderMark[] | undefined",
    "typeRef": "type:3b548a81416903c4a3b0",
    "required": false,
    "description": "Ticks of the scale: `{ value, label? }[]`, or `true` for one tick per step"
  },
  {
    "name": "snapToMarks",
    "source": "packages/native/src/components/Slider/Slider.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Snaps the value to the closest mark (instead of the step)"
  },
  {
    "name": "disabled",
    "source": "packages/native/src/components/Slider/Slider.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Disables the slider (inherited from an enclosing FormField)"
  },
  {
    "name": "readOnly",
    "source": "packages/native/src/components/Slider/Slider.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "The user cannot change the value (inherited from an enclosing FormField)"
  },
  {
    "name": "invalid",
    "source": "packages/native/src/components/Slider/Slider.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Error state (inherited from an enclosing FormField)"
  },
  {
    "name": "size",
    "source": "packages/native/src/components/Slider/Slider.tsx",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "small"
    ],
    "typeText": "NativeSize | undefined",
    "typeRef": "type:3e1597e03bb6f7f3269e",
    "default": "medium",
    "required": false,
    "description": "Thumb and track size (thumbs are 20 / 24 / 28 dp: touch targets)"
  },
  {
    "name": "color",
    "source": "packages/native/src/components/Slider/Slider.tsx",
    "kind": "enum",
    "values": [
      "danger",
      "info",
      "primary",
      "success",
      "warning"
    ],
    "typeText": "SemanticColor | undefined",
    "typeRef": "type:fb510f224f696f21d0ad",
    "default": "primary",
    "required": false,
    "description": "Semantic color of the filled track and the thumbs"
  },
  {
    "name": "showValue",
    "source": "packages/native/src/components/Slider/Slider.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows the value after the track (above it when vertical)"
  },
  {
    "name": "tooltip",
    "source": "packages/native/src/components/Slider/Slider.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows the value in a bubble above the thumb (beside it when vertical) while it is dragged"
  },
  {
    "name": "formatValue",
    "source": "packages/native/src/components/Slider/Slider.tsx",
    "kind": "function",
    "typeText": "((value: number) => string) | undefined",
    "typeRef": "type:1d4a096fdfb17808fb89",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "number",
        "typeRef": "type:7d1137535c313783dadd"
      }
    ],
    "returnType": {
      "typeText": "string",
      "typeRef": "type:e15e314d298fc0d116fc"
    },
    "required": false,
    "description": "Formats a value for the value label, the tooltip and the accessibility value"
  },
  {
    "name": "orientation",
    "source": "packages/native/src/components/Slider/Slider.tsx",
    "kind": "enum",
    "values": [
      "horizontal",
      "vertical"
    ],
    "typeText": "SliderOrientation | undefined",
    "typeRef": "type:360548d575d55659ea42",
    "default": "horizontal",
    "required": false,
    "description": "Direction of the track. A vertical track runs from min (bottom) to max (top) and is 160 dp long by default: set a `height` in `style` to change its length"
  },
  {
    "name": "getAriaValueText",
    "source": "packages/native/src/components/Slider/Slider.tsx",
    "kind": "function",
    "typeText": "((value: number, index: number) => string) | undefined",
    "typeRef": "type:8c67c0ad89ab5c6a0ebe",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "number",
        "typeRef": "type:7d1137535c313783dadd"
      },
      {
        "name": "index",
        "position": 1,
        "required": true,
        "rest": false,
        "typeText": "number",
        "typeRef": "type:7d1137535c313783dadd"
      }
    ],
    "returnType": {
      "typeText": "string",
      "typeRef": "type:e15e314d298fc0d116fc"
    },
    "required": false,
    "description": "Accessibility value text of a thumb (index 0, or 1 for the end thumb)"
  }
]
```

### events

```json
[
  {
    "name": "onChange",
    "source": "packages/native/src/components/Slider/Slider.tsx",
    "kind": "function",
    "typeText": "((value: SliderValue) => void) | undefined",
    "typeRef": "type:f39a136d596f3f56dc7b",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "SliderValue",
        "typeRef": "type:35ce1d2f89f8eab1e586"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called with the new value while dragging and on each adjustment"
  },
  {
    "name": "onChangeEnd",
    "source": "packages/native/src/components/Slider/Slider.tsx",
    "kind": "function",
    "typeText": "((value: SliderValue) => void) | undefined",
    "typeRef": "type:375a038467627278e3e8",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "SliderValue",
        "typeRef": "type:35ce1d2f89f8eab1e586"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called with the final value when the gesture ends (release, screen reader adjustment): save here"
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
  "native:SliderProps": {
    "source": "native/src/components/Slider/Slider.tsx",
    "kind": "interface",
    "extends": [
      "Omit<ViewProps, \"style\">"
    ],
    "props": [
      {
        "name": "value",
        "type": "SliderValue",
        "required": false,
        "description": "Value (controlled): a number, or `[start, end]` with `range`"
      },
      {
        "name": "defaultValue",
        "type": "SliderValue",
        "required": false,
        "description": "Initial value (uncontrolled); defaults to min, or [min, max] with range"
      },
      {
        "name": "range",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Two thumbs selecting `[start, end]`; the thumbs cannot cross"
      },
      {
        "name": "min",
        "type": "number",
        "required": false,
        "default": "0",
        "description": "Smallest value"
      },
      {
        "name": "max",
        "type": "number",
        "required": false,
        "default": "100",
        "description": "Largest value"
      },
      {
        "name": "step",
        "type": "number | null",
        "required": false,
        "default": "1",
        "description": "Step between two values; `null` snaps to the marks only"
      },
      {
        "name": "marks",
        "type": "SliderMark[] | boolean",
        "required": false,
        "description": "Ticks of the scale: `{ value, label? }[]`, or `true` for one tick per step"
      },
      {
        "name": "snapToMarks",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Snaps the value to the closest mark (instead of the step)"
      },
      {
        "name": "onChange",
        "type": "(value: SliderValue) => void",
        "required": false,
        "description": "Called with the new value while dragging and on each adjustment"
      },
      {
        "name": "onChangeEnd",
        "type": "(value: SliderValue) => void",
        "required": false,
        "description": "Called with the final value when the gesture ends (release, screen reader adjustment): save here"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables the slider (inherited from an enclosing FormField)"
      },
      {
        "name": "readOnly",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "The user cannot change the value (inherited from an enclosing FormField)"
      },
      {
        "name": "invalid",
        "type": "boolean",
        "required": false,
        "description": "Error state (inherited from an enclosing FormField)"
      },
      {
        "name": "size",
        "type": "SliderSize",
        "required": false,
        "default": "\"medium\"",
        "description": "Thumb and track size (thumbs are 20 / 24 / 28 dp: touch targets)"
      },
      {
        "name": "color",
        "type": "SemanticColor",
        "required": false,
        "default": "\"primary\"",
        "description": "Semantic color of the filled track and the thumbs"
      },
      {
        "name": "showValue",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Shows the value after the track (above it when vertical)"
      },
      {
        "name": "tooltip",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Shows the value in a bubble above the thumb (beside it when vertical) while it is dragged"
      },
      {
        "name": "formatValue",
        "type": "(value: number) => string",
        "required": false,
        "description": "Formats a value for the value label, the tooltip and the accessibility value"
      },
      {
        "name": "orientation",
        "type": "SliderOrientation",
        "required": false,
        "default": "\"horizontal\"",
        "description": "Direction of the track. A vertical track runs from min (bottom) to max (top) and is 160 dp long by default: set a `height` in `style` to change its length"
      },
      {
        "name": "getAriaValueText",
        "type": "(value: number, index: number) => string",
        "required": false,
        "description": "Accessibility value text of a thumb (index 0, or 1 for the end thumb)"
      },
      {
        "name": "style",
        "type": "StyleProp<ViewStyle>",
        "required": false,
        "description": "Style of the root view"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:Slider": {
    "kind": "cssVars",
    "source": "react/src/components/Slider",
    "vars": [
      {
        "name": "--slider-accent",
        "description": "Color of the filled track and of the thumb border (defaults to the color prop's accent)"
      },
      {
        "name": "--slider-rail-color",
        "description": "Background of the empty track"
      },
      {
        "name": "--slider-thumb-color",
        "description": "Background of the thumbs"
      },
      {
        "name": "--slider-track-height",
        "description": "Thickness of the track (every size)"
      },
      {
        "name": "--slider-thumb-size",
        "description": "Width and height of the thumbs (every size)"
      },
      {
        "name": "--slider-length",
        "description": "Length of a vertical slider"
      },
      {
        "name": "--slider-min-length",
        "description": "Smallest length of a horizontal track, like the intrinsic size of a native range input (defaults to 10rem)"
      },
      {
        "name": "--slider-gap",
        "description": "Space between the track and the value label"
      },
      {
        "name": "--slider-value-font-size",
        "description": "Font size of the value label and of the mark labels"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Utilisation de base

Une valeur contrôlée avec showValue et une infobulle pendant le glissement ou le focus. Chaque curseur est un role="slider" : les flèches avancent d'un pas, PageUp / PageDown de 10 %, Home / End vont au min / max ; un clic sur la piste y saute.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/slider/native/basic.tsx

```tsx
import { useState } from "react";
import { Text, View } from "react-native";
import { Slider, type SliderValue } from "minerva-design/native";

export default function Basic() {
  const [volume, setVolume] = useState<SliderValue>(40);
  const [saved, setSaved] = useState<SliderValue>(40);
  const [price, setPrice] = useState<SliderValue>([20, 80]);
  return (
    <View style={{ gap: 24 }}>
      <Slider
        accessibilityLabel="Volume"
        value={volume}
        onChange={setVolume}
        onChangeEnd={setSaved}
        showValue
        tooltip
      />
      <Text>Saved on release: {String(saved)}</Text>
      <Slider
        accessibilityLabel="Price"
        range
        value={price}
        onChange={setPrice}
        step={10}
        marks
        color="success"
      />
    </View>
  );
}

```

## Example: vertical

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/slider/native/vertical.tsx

```tsx
import { useState } from "react";
import { View } from "react-native";
import { Slider, type SliderValue } from "minerva-design/native";

export default function Vertical() {
  const [volume, setVolume] = useState<SliderValue>(40);
  const [range, setRange] = useState<SliderValue>([20, 80]);
  return (
    <View style={{ flexDirection: "row", gap: 32 }}>
      <Slider
        accessibilityLabel="Volume"
        orientation="vertical"
        value={volume}
        onChange={setVolume}
        showValue
        tooltip
      />
      <Slider
        accessibilityLabel="Temperature"
        orientation="vertical"
        range
        value={range}
        onChange={setRange}
        step={10}
        marks={[
          { value: 0, label: "0°" },
          { value: 50, label: "50°" },
          { value: 100, label: "100°" },
        ]}
        color="success"
        style={{ height: 220 }}
      />
    </View>
  );
}

```

# Slider

Choisissez un nombre, ou une plage avec deux curseurs, en glissant le long d'une piste : pas ou graduations, libellé de valeur et infobulle, et un événement distinct quand l'utilisateur relâche.

Package: minerva-design@1.20.5

Renderer: react

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.5",
  "sourceCommit": "fe15b45f84b480cdd9cfec147df037927ba34a6b",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:0dc58bd28a1a59067b94630bd49c5b94d839bdc57ee30a0eaa7de1d0a9681cfb"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.5/types.json) or getType() from minerva-design/contracts.

## Documentation

## Slider

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
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
    "source": "packages/react/src/components/Slider/types.ts",
    "kind": "union",
    "typeText": "SliderValue | undefined",
    "typeRef": "type:57afcfaa304ddfd6ee22",
    "required": false,
    "description": "Value (controlled): a number, or `[start, end]` with `range`. Values are clamped to min..max and snapped to the step (or to the marks)"
  },
  {
    "name": "defaultValue",
    "source": "packages/react/src/components/Slider/types.ts",
    "kind": "union",
    "typeText": "SliderValue | undefined",
    "typeRef": "type:57afcfaa304ddfd6ee22",
    "required": false,
    "description": "Initial value (uncontrolled); defaults to min, or [min, max] with range"
  },
  {
    "name": "range",
    "source": "packages/react/src/components/Slider/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Two thumbs selecting `[start, end]`; the thumbs cannot cross"
  },
  {
    "name": "min",
    "source": "packages/react/src/components/Slider/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 0,
    "required": false,
    "description": "Smallest value"
  },
  {
    "name": "max",
    "source": "packages/react/src/components/Slider/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 100,
    "required": false,
    "description": "Largest value"
  },
  {
    "name": "step",
    "source": "packages/react/src/components/Slider/types.ts",
    "kind": "number",
    "typeText": "number | null | undefined",
    "typeRef": "type:63da203dcb31379a7982",
    "default": 1,
    "required": false,
    "description": "Step between two values; `null` snaps to the marks only"
  },
  {
    "name": "marks",
    "source": "packages/react/src/components/Slider/types.ts",
    "kind": "union",
    "typeText": "boolean | SliderMark[] | undefined",
    "typeRef": "type:3b548a81416903c4a3b0",
    "required": false,
    "description": "Ticks of the scale: an array of `{ value, label? }`, or `true` for one tick per step (up to 101 ticks)"
  },
  {
    "name": "snapToMarks",
    "source": "packages/react/src/components/Slider/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Snaps the value to the closest mark (instead of the step)"
  },
  {
    "name": "disabled",
    "source": "packages/react/src/components/Slider/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Disables the slider. Inherited from an enclosing FormControl when not set; an explicit `false` overrides the FormControl"
  },
  {
    "name": "readOnly",
    "source": "packages/react/src/components/Slider/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Focusable and submitted, but the user cannot change the value. Inherited from an enclosing FormControl when not set"
  },
  {
    "name": "size",
    "source": "packages/react/src/components/Slider/types.ts",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "small"
    ],
    "typeText": "SliderSize | undefined",
    "typeRef": "type:4fbf528ee7c9981740a9",
    "default": "medium",
    "required": false,
    "description": "Thumb and track size"
  },
  {
    "name": "color",
    "source": "packages/react/src/components/Slider/types.ts",
    "kind": "enum",
    "values": [
      "danger",
      "info",
      "primary",
      "success",
      "warning"
    ],
    "typeText": "SliderColor | undefined",
    "typeRef": "type:2d8d3f253b5a9af14f37",
    "default": "primary",
    "required": false,
    "description": "Semantic color of the filled track and the thumbs"
  },
  {
    "name": "showValue",
    "source": "packages/react/src/components/Slider/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows the value (formatted with formatValue) after the track"
  },
  {
    "name": "tooltip",
    "source": "packages/react/src/components/Slider/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows the value in a bubble above a thumb while it is dragged, hovered or focused"
  },
  {
    "name": "formatValue",
    "source": "packages/react/src/components/Slider/types.ts",
    "kind": "function",
    "typeText": "((value: number) => string) | undefined",
    "typeRef": "type:e369825a2c6efa847273",
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
    "description": "Formats a value for the value label, the tooltip and aria-valuetext"
  },
  {
    "name": "orientation",
    "source": "packages/react/src/components/Slider/types.ts",
    "kind": "enum",
    "values": [
      "horizontal",
      "vertical"
    ],
    "typeText": "SliderOrientation | undefined",
    "typeRef": "type:360548d575d55659ea42",
    "default": "horizontal",
    "required": false,
    "description": "Direction of the track"
  },
  {
    "name": "name",
    "source": "packages/react/src/components/Slider/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Name of the hidden form input(s); a range submits two entries under this name"
  },
  {
    "name": "aria-label",
    "source": "packages/react/src/components/Slider/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label of the thumbs (range: suffixed with \"Minimum\" / \"Maximum\"). Defaults to the enclosing FormControl's label"
  },
  {
    "name": "aria-labelledby",
    "source": "packages/react/src/components/Slider/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "id(s) of the element(s) labelling the thumbs"
  },
  {
    "name": "aria-describedby",
    "source": "packages/react/src/components/Slider/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Extra id(s) of elements describing the slider, merged with the enclosing FormControl's helper / error text"
  },
  {
    "name": "getAriaValueText",
    "source": "packages/react/src/components/Slider/types.ts",
    "kind": "function",
    "typeText": "((value: number, index: number) => string) | undefined",
    "typeRef": "type:e44922a6bc9eb00ddf0e",
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
    "description": "aria-valuetext of a thumb (index 0, or 1 for the end thumb of a range). Defaults to formatValue"
  }
]
```

### events

```json
[
  {
    "name": "onChange",
    "source": "packages/react/src/components/Slider/types.ts",
    "kind": "function",
    "typeText": "((value: SliderValue) => void) | undefined",
    "typeRef": "type:0b8e2ce9486c5e3b02dc",
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
    "description": "Called with the new value while dragging and on each key press"
  },
  {
    "name": "onChangeEnd",
    "source": "packages/react/src/components/Slider/types.ts",
    "kind": "function",
    "typeText": "((value: SliderValue) => void) | undefined",
    "typeRef": "type:043dcc192b182225ad46",
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
    "description": "Called with the final value when the interaction ends (pointer release, key press): save here"
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
  "SliderProps": {
    "source": "react/src/components/Slider/types.ts",
    "description": "`data-*` attributes are forwarded to the root element.",
    "kind": "interface",
    "extends": [
      "DataAttributes"
    ],
    "props": [
      {
        "name": "value",
        "type": "SliderValue",
        "required": false,
        "description": "Value (controlled): a number, or `[start, end]` with `range`. Values are clamped to min..max and snapped to the step (or to the marks)"
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
        "description": "Ticks of the scale: an array of `{ value, label? }`, or `true` for one tick per step (up to 101 ticks)"
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
        "description": "Called with the new value while dragging and on each key press"
      },
      {
        "name": "onChangeEnd",
        "type": "(value: SliderValue) => void",
        "required": false,
        "description": "Called with the final value when the interaction ends (pointer release, key press): save here"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables the slider. Inherited from an enclosing FormControl when not set; an explicit `false` overrides the FormControl"
      },
      {
        "name": "readOnly",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Focusable and submitted, but the user cannot change the value. Inherited from an enclosing FormControl when not set"
      },
      {
        "name": "size",
        "type": "SliderSize",
        "required": false,
        "default": "\"medium\"",
        "description": "Thumb and track size"
      },
      {
        "name": "color",
        "type": "SliderColor",
        "required": false,
        "default": "\"primary\"",
        "description": "Semantic color of the filled track and the thumbs"
      },
      {
        "name": "showValue",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Shows the value (formatted with formatValue) after the track"
      },
      {
        "name": "tooltip",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Shows the value in a bubble above a thumb while it is dragged, hovered or focused"
      },
      {
        "name": "formatValue",
        "type": "(value: number) => string",
        "required": false,
        "description": "Formats a value for the value label, the tooltip and aria-valuetext"
      },
      {
        "name": "orientation",
        "type": "SliderOrientation",
        "required": false,
        "default": "\"horizontal\"",
        "description": "Direction of the track"
      },
      {
        "name": "name",
        "type": "string",
        "required": false,
        "description": "Name of the hidden form input(s); a range submits two entries under this name"
      },
      {
        "name": "aria-label",
        "type": "string",
        "required": false,
        "description": "Accessible label of the thumbs (range: suffixed with \"Minimum\" / \"Maximum\"). Defaults to the enclosing FormControl's label"
      },
      {
        "name": "aria-labelledby",
        "type": "string",
        "required": false,
        "description": "id(s) of the element(s) labelling the thumbs"
      },
      {
        "name": "aria-describedby",
        "type": "string",
        "required": false,
        "description": "Extra id(s) of elements describing the slider, merged with the enclosing FormControl's helper / error text"
      },
      {
        "name": "getAriaValueText",
        "type": "(value: number, index: number) => string",
        "required": false,
        "description": "aria-valuetext of a thumb (index 0, or 1 for the end thumb of a range). Defaults to formatValue"
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
        "name": "ref",
        "type": "Ref<HTMLDivElement>",
        "required": false,
        "description": "Ref to the root element"
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

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/slider/demos/basic.tsx

```tsx
import { useState } from "react";
import { Slider, type SliderValue } from "minerva-design";

export default function BasicDemo() {
  const [volume, setVolume] = useState<SliderValue>(40);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%", maxWidth: 420 }}>
      <Slider
        aria-label="Volume"
        value={volume}
        onChange={setVolume}
        showValue
        tooltip
      />
      <Slider
        aria-label="Opacity"
        defaultValue={0.6}
        min={0}
        max={1}
        step={0.05}
        showValue
      />
    </div>
  );
}

```

## Example: Enregistrer au relâchement

onChange suit chaque mouvement ; onChangeEnd est appelé une seule fois au relâchement du pointeur (ou après une touche). Enregistrez là plutôt qu'à chaque changement.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/slider/demos/committed.tsx

```tsx
import { useState } from "react";
import { Slider, type SliderValue } from "minerva-design";

export default function CommittedDemo() {
  const [live, setLive] = useState<SliderValue>(50);
  const [saved, setSaved] = useState<SliderValue>(50);
  const [saves, setSaves] = useState(0);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%", maxWidth: 420 }}>
      <Slider
        aria-label="Brightness"
        value={live}
        onChange={setLive}
        onChangeEnd={(value) => {
          setSaved(value);
          setSaves((n) => n + 1);
        }}
      />
      <p style={{ margin: 0 }}>
        While dragging: {String(live)} · Saved on release: {String(saved)} (
        {saves} saves)
      </p>
    </div>
  );
}

```

## Example: Désactivé, lecture seule et formulaires

disabled bloque le curseur ; readOnly le garde focusable mais figé. Dans un FormControl, il reprend le libellé, la description et les états invalide / désactivé / lecture seule.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/slider/demos/disabled.tsx

```tsx
import { FormControl, FormHelperText, FormLabel, Slider } from "minerva-design";

export default function DisabledDemo() {
  return (
    <div style={{ display: "grid", gap: 16, width: "100%", maxWidth: 420 }}>
      <Slider aria-label="Disabled" defaultValue={40} disabled />
      <Slider aria-label="Read only" defaultValue={60} readOnly showValue />
      <FormControl invalid>
        <FormLabel>Daily goal (minutes)</FormLabel>
        <Slider defaultValue={5} max={120} step={5} showValue />
        <FormHelperText>Pick at least 10 minutes.</FormHelperText>
      </FormControl>
    </div>
  );
}

```

## Example: Graduations

marks={true} dessine une graduation par pas ; un tableau de { value, label } dessine des graduations libellées. step={null} (ou snapToMarks) s'aligne uniquement sur les graduations ; getAriaValueText nomme la valeur pour les lecteurs d'écran.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/slider/demos/marks.tsx

```tsx
import { Slider } from "minerva-design";

const levels = [
  { value: 0, label: "Off" },
  { value: 25, label: "Low" },
  { value: 50, label: "Medium" },
  { value: 75, label: "High" },
  { value: 100, label: "Max" },
];

export default function MarksDemo() {
  return (
    <div style={{ display: "grid", gap: 32, width: "100%", maxWidth: 420 }}>
      <Slider aria-label="Rating" defaultValue={6} max={10} marks showValue />
      <Slider
        aria-label="Fan speed"
        defaultValue={50}
        step={null}
        marks={levels}
        getAriaValueText={(v) =>
          levels.find((level) => level.value === v)?.label ?? String(v)
        }
      />
    </div>
  );
}

```

## Example: Plage

range sélectionne [début, fin] avec deux curseurs qui ne peuvent pas se croiser (le plus proche suit un clic sur la piste). formatValue formate l'infobulle et aria-valuetext ; name soumet deux champs cachés.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/slider/demos/range.tsx

```tsx
import { useState } from "react";
import { Slider, type SliderValue } from "minerva-design";

export default function RangeDemo() {
  const [price, setPrice] = useState<SliderValue>([20, 80]);
  const [low, high] = price as [number, number];

  return (
    <div style={{ display: "grid", gap: 12, width: "100%", maxWidth: 420 }}>
      <Slider
        aria-label="Price"
        range
        value={price}
        onChange={setPrice}
        step={5}
        formatValue={(v) => `$${v}`}
        tooltip
        name="price"
      />
      <p style={{ margin: 0 }}>
        From ${low} to ${high}
      </p>
    </div>
  );
}

```

## Example: Tailles et couleurs

Trois tailles et les cinq couleurs sémantiques de la piste remplie et des curseurs ; les variables du thème suivent les modes clair / sombre.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/slider/demos/sizes-colors.tsx

```tsx
import { Slider } from "minerva-design";

const colors = ["primary", "success", "info", "warning", "danger"] as const;

export default function SizesColorsDemo() {
  return (
    <div style={{ display: "grid", gap: 16, width: "100%", maxWidth: 420 }}>
      <Slider aria-label="Small" size="small" defaultValue={30} />
      <Slider aria-label="Medium" size="medium" defaultValue={50} />
      <Slider aria-label="Large" size="large" defaultValue={70} />
      {colors.map((color, index) => (
        <Slider
          key={color}
          aria-label={color}
          color={color}
          defaultValue={20 + index * 15}
        />
      ))}
    </div>
  );
}

```

# Slider

Choisissez un nombre, ou une plage avec deux curseurs, en glissant le long d'une piste : pas ou graduations, libellé de valeur et infobulle, et un événement distinct quand l'utilisateur relâche.

Package: minerva-design@1.20.0

Renderer: wc

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.0",
  "sourceCommit": "e5692a82f25163efee65ef771fb64a94e61cb359",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:07db3eb36ff2e4b5bb88e238b04c82819862c70d739534f627e7b6c73c0c6ef1"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.0/types.json) or getType() from minerva-design/contracts.

## Documentation

## Slider

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/slider",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "defaultValue",
    "typeText": "SliderValue | undefined",
    "attribute": "value",
    "required": false
  },
  {
    "name": "range",
    "typeText": "boolean",
    "attribute": "range",
    "required": false
  },
  {
    "name": "min",
    "typeText": "number",
    "attribute": "min",
    "required": false
  },
  {
    "name": "max",
    "typeText": "number",
    "attribute": "max",
    "required": false
  },
  {
    "name": "step",
    "typeText": "number | null",
    "attribute": "step",
    "required": false
  },
  {
    "name": "marks",
    "typeText": "SliderMark[] | boolean",
    "attribute": "marks",
    "required": false
  },
  {
    "name": "snapToMarks",
    "typeText": "boolean",
    "attribute": "snap-to-marks",
    "required": false
  },
  {
    "name": "readOnly",
    "typeText": "boolean",
    "attribute": "readonly",
    "required": false
  },
  {
    "name": "invalid",
    "typeText": "boolean",
    "attribute": "invalid",
    "required": false
  },
  {
    "name": "size",
    "typeText": "\"small\" | \"medium\" | \"large\"",
    "attribute": "size",
    "required": false
  },
  {
    "name": "color",
    "typeText": "SliderColor",
    "attribute": "color",
    "required": false
  },
  {
    "name": "showValue",
    "typeText": "boolean",
    "attribute": "show-value",
    "required": false
  },
  {
    "name": "tooltip",
    "typeText": "boolean",
    "attribute": "tooltip",
    "required": false
  },
  {
    "name": "orientation",
    "typeText": "\"horizontal\" | \"vertical\"",
    "attribute": "orientation",
    "required": false
  },
  {
    "name": "name",
    "typeText": "string",
    "attribute": "name",
    "required": false
  },
  {
    "name": "disabled",
    "typeText": "boolean",
    "attribute": "disabled",
    "required": false
  },
  {
    "name": "required",
    "typeText": "boolean",
    "attribute": "required",
    "required": false
  },
  {
    "name": "value",
    "typeText": "SliderValue | undefined",
    "required": false
  },
  {
    "name": "formatValue",
    "typeText": "((value: number) => string) | undefined",
    "required": false
  },
  {
    "name": "getAriaValueText",
    "typeText": "((value: number, index: number) => string) | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "input",
    "typeText": "Event",
    "description": "The value changed while dragging or with a key (native-like)"
  },
  {
    "name": "change",
    "typeText": "Event",
    "description": "The interaction ended (native-like)"
  },
  {
    "name": "minerva-change",
    "typeText": "CustomEvent<{ value: SliderValue; }>",
    "detailType": {
      "typeText": "{ value: SliderValue; }",
      "typeRef": "type:6ee5a2b2e6cbc23abf7c"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": false,
    "description": "The value changed (while dragging, on each key press); `detail: { value }`"
  },
  {
    "name": "minerva-change-end",
    "typeText": "CustomEvent<{ value: SliderValue; }>",
    "detailType": {
      "typeText": "{ value: SliderValue; }",
      "typeRef": "type:8e6ed5c72d3692ac0ec9"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": false,
    "description": "The interaction ended (pointer release, key press): save here; `detail: { value }`"
  }
]
```

## API

```json
{
  "wc:minerva-slider": {
    "kind": "element",
    "source": "web-components/src/components/slider/slider.ts",
    "className": "MinervaSlider",
    "summary": "Range input with one or two thumbs, marks, value label and tooltip.",
    "description": "Picks a number, or a `[start, end]` range with `range`, on a track (`<Slider>` of React). Each thumb is a `role=\"slider\"`: ArrowRight / ArrowUp add a step (ArrowLeft increases in RTL), PageUp / PageDown move by 10%, Home / End jump to the bounds. Clicking the track moves the closest thumb there; dragging captures the pointer. Form-associated: submits the value under `name` (a range submits two entries); supports `form.reset()` (restores the `value` attribute), `<fieldset disabled>` and state restoration.",
    "properties": [
      {
        "name": "defaultValue",
        "attribute": "value",
        "type": "SliderValue | undefined",
        "default": "undefined",
        "description": "Initial value, restored by `form.reset()` (the `value` attribute: \"30\" or \"20,80\")"
      },
      {
        "name": "range",
        "attribute": "range",
        "type": "boolean",
        "default": "false",
        "description": "Two thumbs selecting `[start, end]`; the thumbs cannot cross"
      },
      {
        "name": "min",
        "attribute": "min",
        "type": "number",
        "default": "0",
        "description": "Smallest value"
      },
      {
        "name": "max",
        "attribute": "max",
        "type": "number",
        "default": "100",
        "description": "Largest value"
      },
      {
        "name": "step",
        "attribute": "step",
        "type": "number | null",
        "default": "1",
        "description": "Step between two values; `null` (attribute \"null\") snaps to the marks only"
      },
      {
        "name": "marks",
        "attribute": "marks",
        "type": "SliderMark[] | boolean",
        "default": "false",
        "description": "Ticks of the scale: `{ value, label? }[]` (property or JSON attribute), or `true` (empty attribute) for one tick per step"
      },
      {
        "name": "snapToMarks",
        "attribute": "snap-to-marks",
        "type": "boolean",
        "default": "false",
        "description": "Snaps the value to the closest mark (instead of the step)"
      },
      {
        "name": "readOnly",
        "attribute": "readonly",
        "type": "boolean",
        "default": "false",
        "description": "Focusable and submitted, but the user cannot change the value"
      },
      {
        "name": "invalid",
        "attribute": "invalid",
        "type": "boolean",
        "default": "false",
        "description": "Error state (aria-invalid)"
      },
      {
        "name": "size",
        "attribute": "size",
        "type": "\"small\" | \"medium\" | \"large\"",
        "default": "\"medium\"",
        "description": "Thumb and track size"
      },
      {
        "name": "color",
        "attribute": "color",
        "type": "SliderColor",
        "default": "\"primary\"",
        "description": "Semantic color of the filled track and the thumbs"
      },
      {
        "name": "showValue",
        "attribute": "show-value",
        "type": "boolean",
        "default": "false",
        "description": "Shows the value after the track"
      },
      {
        "name": "tooltip",
        "attribute": "tooltip",
        "type": "boolean",
        "default": "false",
        "description": "Shows the value in a bubble above a thumb while it is dragged, hovered or focused"
      },
      {
        "name": "orientation",
        "attribute": "orientation",
        "type": "\"horizontal\" | \"vertical\"",
        "default": "\"horizontal\"",
        "description": "Direction of the track"
      },
      {
        "name": "name",
        "attribute": "name",
        "type": "string",
        "default": "\"\"",
        "description": "Name submitted with the form data"
      },
      {
        "name": "disabled",
        "attribute": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disables the control (not focusable, not submitted, not validated)"
      },
      {
        "name": "required",
        "attribute": "required",
        "type": "boolean",
        "default": "false",
        "description": "The control must have a value for the form to be submitted"
      },
      {
        "name": "value",
        "type": "SliderValue | undefined",
        "default": "undefined",
        "description": "Value: a number, or `[start, end]` with `range` (property; the `value` attribute sets `defaultValue`)"
      },
      {
        "name": "formatValue",
        "type": "((value: number) => string) | undefined",
        "default": "undefined",
        "description": "Formats a value for the value label, the tooltip and aria-valuetext (property)"
      },
      {
        "name": "getAriaValueText",
        "type": "((value: number, index: number) => string) | undefined",
        "default": "undefined",
        "description": "aria-valuetext of a thumb, index 0 or 1 (property; defaults to formatValue)"
      },
      {
        "name": "isDisabled",
        "type": "boolean",
        "readonly": true,
        "description": "Whether the control is disabled (itself or by a disabled fieldset)."
      },
      {
        "name": "form",
        "type": "HTMLFormElement | null",
        "readonly": true,
        "description": "The form owning the element"
      },
      {
        "name": "labels",
        "type": "NodeList | null",
        "readonly": true,
        "description": "`<label>` elements associated with the element"
      },
      {
        "name": "validity",
        "type": "ValidityState | undefined",
        "readonly": true,
        "description": "Validity state (same as `<input>.validity`)"
      },
      {
        "name": "validationMessage",
        "type": "string",
        "readonly": true,
        "description": "Message describing the current validation error (empty when valid)"
      },
      {
        "name": "willValidate",
        "type": "boolean",
        "readonly": true,
        "description": "Whether the element is a candidate for constraint validation"
      }
    ],
    "methods": [
      {
        "name": "focus",
        "signature": "(options?: FocusOptions) => void"
      },
      {
        "name": "blur",
        "signature": "() => void"
      },
      {
        "name": "checkValidity",
        "signature": "() => boolean",
        "description": "Checks validity; fires `invalid` when invalid."
      },
      {
        "name": "reportValidity",
        "signature": "() => boolean",
        "description": "Checks validity and shows the browser's validation message."
      },
      {
        "name": "setCustomValidity",
        "signature": "(message: string) => void",
        "description": "Sets (or clears, with `\"\"`) a custom validation error."
      },
      {
        "name": "formResetCallback",
        "signature": "() => void"
      },
      {
        "name": "formDisabledCallback",
        "signature": "(disabled: boolean) => void"
      },
      {
        "name": "formStateRestoreCallback",
        "signature": "(state: string | File | FormData | null) => void"
      }
    ],
    "events": [
      {
        "name": "input",
        "description": "The value changed while dragging or with a key (native-like)"
      },
      {
        "name": "change",
        "description": "The interaction ended (native-like)"
      },
      {
        "name": "minerva-change",
        "description": "The value changed (while dragging, on each key press); `detail: { value }`"
      },
      {
        "name": "minerva-change-end",
        "description": "The interaction ended (pointer release, key press): save here; `detail: { value }`"
      }
    ],
    "slots": [],
    "parts": [
      {
        "name": "root",
        "description": "The outermost element"
      },
      {
        "name": "control",
        "description": "The interactive area holding the rail, the marks and the thumbs"
      },
      {
        "name": "rail",
        "description": "The full-length track"
      },
      {
        "name": "range",
        "description": "The filled part of the track (up to the value, or between the thumbs)"
      },
      {
        "name": "thumb",
        "description": "A thumb (`role=slider`)"
      },
      {
        "name": "thumb--dragging",
        "description": "Item state of `thumb`: dragged"
      },
      {
        "name": "thumb--disabled",
        "description": "Item state of `thumb`: disabled"
      },
      {
        "name": "tooltip",
        "description": "The value bubble of a thumb (with `tooltip`, while dragging or focused)"
      },
      {
        "name": "mark",
        "description": "A tick of the scale"
      },
      {
        "name": "mark--active",
        "description": "Item state of `mark`: inside the filled range"
      },
      {
        "name": "mark--inactive",
        "description": "Item state of `mark`: outside the filled range"
      },
      {
        "name": "mark-label",
        "description": "The label of a mark"
      },
      {
        "name": "value",
        "description": "The inline value label (with `show-value`)"
      }
    ],
    "cssProperties": [
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

value est un attribut (il initialise la valeur et est restauré par form.reset()) ; minerva-change suit le glissement et les touches. show-value et tooltip affichent la valeur.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/slider/wc/basic.html

```html
<div style="display: grid; gap: 12px; width: 100%; max-width: 420px">
  <minerva-slider
    id="volume"
    aria-label="Volume"
    value="40"
    show-value
    tooltip
  ></minerva-slider>
  <minerva-slider
    aria-label="Opacity"
    value="0.6"
    min="0"
    max="1"
    step="0.05"
    show-value
  ></minerva-slider>
  <output id="volume-output">Volume: 40</output>
</div>

```

### apps/docs/src/docs/pages/slider/wc/basic.ts

```tsx
// value is an attribute ("40"); minerva-change follows the drag and the keys.
export function setup(root: HTMLElement) {
  const slider = root.querySelector<HTMLElement>("#volume")!;
  const output = root.querySelector<HTMLOutputElement>("#volume-output")!;
  const onChange = (e: Event) => {
    const { value } = (e as CustomEvent<{ value: number }>).detail;
    output.value = `Volume: ${value}`;
  };
  slider.addEventListener("minerva-change", onChange);
  return () => slider.removeEventListener("minerva-change", onChange);
}

```

## Example: Enregistrer au relâchement

minerva-change suit chaque mouvement ; minerva-change-end est émis une fois au relâchement (ou après une touche) : enregistrez là.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/slider/wc/committed.html

```html
<div style="display: grid; gap: 12px; width: 100%; max-width: 420px">
  <minerva-slider
    id="brightness"
    aria-label="Brightness"
    value="50"
  ></minerva-slider>
  <output id="brightness-output"
    >While dragging: 50 · Saved on release: 50</output
  >
</div>

```

### apps/docs/src/docs/pages/slider/wc/committed.ts

```tsx
// minerva-change follows the drag; minerva-change-end fires once on release
// (or after a key press): save there.
export function setup(root: HTMLElement) {
  const slider = root.querySelector<HTMLElement>("#brightness")!;
  const output = root.querySelector<HTMLOutputElement>("#brightness-output")!;
  let live: unknown = 50;
  let saved: unknown = 50;
  const render = () => {
    output.value = `While dragging: ${live} · Saved on release: ${saved}`;
  };
  const onChange = (e: Event) => {
    live = (e as CustomEvent<{ value: number }>).detail.value;
    render();
  };
  const onEnd = (e: Event) => {
    saved = (e as CustomEvent<{ value: number }>).detail.value;
    render();
  };
  slider.addEventListener("minerva-change", onChange);
  slider.addEventListener("minerva-change-end", onEnd);
  return () => {
    slider.removeEventListener("minerva-change", onChange);
    slider.removeEventListener("minerva-change-end", onEnd);
  };
}

```

## Example: Désactivé, lecture seule et invalide

disabled (aussi via un fieldset désactivé) bloque le curseur ; readonly le garde focusable et soumis ; invalid définit aria-invalid.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/slider/wc/disabled.html

```html
<div style="display: grid; gap: 16px; width: 100%; max-width: 420px">
  <minerva-slider aria-label="Disabled" value="40" disabled></minerva-slider>
  <minerva-slider
    aria-label="Read only"
    value="60"
    readonly
    show-value
  ></minerva-slider>
  <minerva-slider
    aria-label="Daily goal (minutes)"
    value="5"
    max="120"
    step="5"
    invalid
    show-value
  ></minerva-slider>
</div>

```

## Example: Graduations

Un attribut marks vide dessine une graduation par pas ; un tableau JSON des graduations libellées. step="null" s'aligne uniquement sur les graduations ; la propriété getAriaValueText nomme les valeurs.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/slider/wc/marks.html

```html
<div style="display: grid; gap: 32px; width: 100%; max-width: 420px">
  <minerva-slider
    aria-label="Rating"
    value="6"
    max="10"
    marks
    show-value
  ></minerva-slider>
  <minerva-slider
    id="fan"
    aria-label="Fan speed"
    value="50"
    step="null"
    marks='[{"value":0,"label":"Off"},{"value":25,"label":"Low"},{"value":50,"label":"Medium"},{"value":75,"label":"High"},{"value":100,"label":"Max"}]'
  ></minerva-slider>
</div>

```

### apps/docs/src/docs/pages/slider/wc/marks.ts

```tsx
// marks: an empty attribute draws a tick per step, a JSON array labelled
// marks; step="null" snaps to the marks only.
import type { MinervaSlider } from "minerva-design/web-components/slider";

const labels: Record<number, string> = {
  0: "Off",
  25: "Low",
  50: "Medium",
  75: "High",
  100: "Max",
};

export function setup(root: HTMLElement) {
  const fan = root.querySelector<MinervaSlider>("#fan")!;
  fan.getAriaValueText = (v) => labels[v] ?? String(v);
  return () => {
    fan.getAriaValueText = undefined;
  };
}

```

## Example: Plage

range avec value="20,80" sélectionne deux valeurs ; le formulaire soumet deux entrées sous name. formatValue est une propriété.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/slider/wc/range.html

```html
<form
  id="price-form"
  style="display: grid; gap: 12px; width: 100%; max-width: 420px"
>
  <minerva-slider
    id="price"
    aria-label="Price"
    name="price"
    range
    value="20,80"
    step="5"
    tooltip
  ></minerva-slider>
  <output id="price-output">From $20 to $80</output>
</form>

```

### apps/docs/src/docs/pages/slider/wc/range.ts

```tsx
// range takes a "start,end" value attribute; the form submits two "price"
// entries. formatValue is a property.
import type { MinervaSlider } from "minerva-design/web-components/slider";

export function setup(root: HTMLElement) {
  const slider = root.querySelector<MinervaSlider>("#price")!;
  const output = root.querySelector<HTMLOutputElement>("#price-output")!;
  slider.formatValue = (v) => `$${v}`;
  const onChange = (e: Event) => {
    const [low, high] = (e as CustomEvent<{ value: [number, number] }>).detail
      .value;
    output.value = `From $${low} to $${high}`;
  };
  slider.addEventListener("minerva-change", onChange);
  return () => slider.removeEventListener("minerva-change", onChange);
}

```

## Example: Tailles et couleurs

size et color sont des attributs reflétés (ainsi que les états personnalisés :state(size-small), :state(color-success) ...).

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/slider/wc/sizes-colors.html

```html
<div style="display: grid; gap: 16px; width: 100%; max-width: 420px">
  <minerva-slider aria-label="Small" size="small" value="30"></minerva-slider>
  <minerva-slider aria-label="Medium" value="50"></minerva-slider>
  <minerva-slider aria-label="Large" size="large" value="70"></minerva-slider>
  <minerva-slider aria-label="primary" value="20"></minerva-slider>
  <minerva-slider
    aria-label="success"
    color="success"
    value="35"
  ></minerva-slider>
  <minerva-slider aria-label="info" color="info" value="50"></minerva-slider>
  <minerva-slider
    aria-label="warning"
    color="warning"
    value="65"
  ></minerva-slider>
  <minerva-slider
    aria-label="danger"
    color="danger"
    value="80"
  ></minerva-slider>
</div>

```

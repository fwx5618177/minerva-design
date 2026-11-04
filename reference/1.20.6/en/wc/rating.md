# Rating

Displays a score as five stars on any scale, and collects scores with mouse or keyboard.

Package: minerva-design@1.20.6

Renderer: wc

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.6",
  "sourceCommit": "63ce45656d8f3d1bfbee71026e84674640ae9abf",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:fa9a782f68a5d5b512762e2152b2ad065da3de6937bac96eef63709ddba3b95b"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.6/types.json) or getType() from minerva-design/contracts.

## Documentation

## Rating

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/rating",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "defaultValue",
    "typeText": "number",
    "attribute": "value",
    "required": false
  },
  {
    "name": "max",
    "typeText": "number",
    "attribute": "max",
    "required": false
  },
  {
    "name": "size",
    "typeText": "\"small\" | \"medium\" | \"large\"",
    "attribute": "size",
    "required": false
  },
  {
    "name": "showValue",
    "typeText": "boolean",
    "attribute": "show-value",
    "required": false
  },
  {
    "name": "ratingCount",
    "typeText": "number | undefined",
    "attribute": "rating-count",
    "required": false
  },
  {
    "name": "interactive",
    "typeText": "boolean",
    "attribute": "interactive",
    "required": false
  },
  {
    "name": "readOnly",
    "typeText": "boolean",
    "attribute": "readonly",
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
    "typeText": "number",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "change",
    "typeText": "Event",
    "description": "The user changed the score"
  },
  {
    "name": "minerva-change",
    "typeText": "CustomEvent<{ value: number; }>",
    "detailType": {
      "typeText": "{ value: number; }",
      "typeRef": "type:42123c5042f86e6f217d"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": false,
    "description": "The user changed the score; `detail: { value }`"
  }
]
```

## RatingScale

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/rating-scale",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "max",
    "typeText": "number",
    "attribute": "max",
    "required": false
  },
  {
    "name": "size",
    "typeText": "\"small\" | \"medium\" | \"large\"",
    "attribute": "size",
    "required": false
  },
  {
    "name": "interactive",
    "typeText": "boolean",
    "attribute": "interactive",
    "required": false
  },
  {
    "name": "readOnly",
    "typeText": "boolean",
    "attribute": "readonly",
    "required": false
  },
  {
    "name": "hideValue",
    "typeText": "boolean",
    "attribute": "hide-value",
    "required": false
  },
  {
    "name": "dimensions",
    "typeText": "readonly RatingDimension[]",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "minerva-change",
    "typeText": "CustomEvent<{ key: string; value: number; dimensions: readonly RatingDimension[]; }>",
    "detailType": {
      "typeText": "{ key: string; value: number; dimensions: readonly RatingDimension[]; }",
      "typeRef": "type:9b5dee8dec73b0313b06"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": false,
    "description": "The user rated a dimension; `detail: { key, value, dimensions }` (`dimensions` is already updated)"
  }
]
```

## API

```json
{
  "wc:minerva-rating": {
    "kind": "element",
    "source": "web-components/src/components/rating/rating.ts",
    "className": "MinervaRating",
    "summary": "Star rating (display or interactive slider).",
    "description": "A score drawn as 5 stars on any 0..max scale (`<Rating>` of React), optionally followed by the value and the number of ratings. Display-only by default (`role=\"img\"`), like the React component without `onChange`. With `interactive`: hover previews, clicking the left / right half of a star picks a half / full star, and the stars are a slider: arrows step half a star (`max / 10`; in RTL ArrowLeft increases), PageUp / PageDown one whole star (`max / 5`), Home / End jump to 0 / `max`, all clamped to 0..max. `readonly` (or `disabled`) forces the display-only version again. Form-associated: submits `value` under `name`; `required` makes a 0 score invalid (`valueMissing`); supports `form.reset()` (restores the `value` attribute), `<fieldset disabled>` and state restoration.",
    "properties": [
      {
        "name": "defaultValue",
        "attribute": "value",
        "type": "number",
        "default": "0",
        "description": "Initial score, restored by `form.reset()` (the `value` attribute)"
      },
      {
        "name": "max",
        "attribute": "max",
        "type": "number",
        "default": "10",
        "description": "Highest score; the score is always drawn on 5 stars"
      },
      {
        "name": "size",
        "attribute": "size",
        "type": "\"small\" | \"medium\" | \"large\"",
        "default": "\"medium\"",
        "description": "Star size: 12px, 16px or 20px"
      },
      {
        "name": "showValue",
        "attribute": "show-value",
        "type": "boolean",
        "default": "false",
        "description": "Shows the score (one decimal) after the stars"
      },
      {
        "name": "ratingCount",
        "attribute": "rating-count",
        "type": "number | undefined",
        "description": "Number of ratings, shown after the score when show-value is set"
      },
      {
        "name": "interactive",
        "attribute": "interactive",
        "type": "boolean",
        "default": "false",
        "description": "Makes the rating an interactive slider (React: passing `onChange`); display-only otherwise"
      },
      {
        "name": "readOnly",
        "attribute": "readonly",
        "type": "boolean",
        "default": "false",
        "description": "Forces display mode even when `interactive` is set"
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
        "type": "number",
        "default": "0",
        "description": "Current score, from 0 to max (property; the `value` attribute sets `defaultValue`)"
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
        "name": "change",
        "description": "The user changed the score"
      },
      {
        "name": "minerva-change",
        "description": "The user changed the score; `detail: { value }`"
      }
    ],
    "slots": [],
    "parts": [
      {
        "name": "root",
        "description": "The root (role=\"slider\", or role=\"img\" when display-only)"
      },
      {
        "name": "stars",
        "description": "The star row"
      },
      {
        "name": "star",
        "description": "Each star"
      },
      {
        "name": "star--fill-full",
        "description": "Item state of `star`: fill full"
      },
      {
        "name": "star--fill-half",
        "description": "Item state of `star`: fill half"
      },
      {
        "name": "star--fill-empty",
        "description": "Item state of `star`: fill empty"
      },
      {
        "name": "value",
        "description": "The score and the count"
      },
      {
        "name": "count",
        "description": "The number of ratings"
      }
    ],
    "cssProperties": [
      {
        "name": "--rating-color",
        "description": "Color of the filled stars (defaults to --accent-color)"
      },
      {
        "name": "--rating-empty-color",
        "description": "Color of the empty stars and of the unfilled half"
      },
      {
        "name": "--rating-star-gap",
        "description": "Space between the stars"
      },
      {
        "name": "--rating-gap",
        "description": "Space between the stars and the value"
      },
      {
        "name": "--rating-value-font-size",
        "description": "Font size of the numeric value (every size)"
      },
      {
        "name": "--rating-scale-gap",
        "description": "Space between the rows of a RatingScale"
      },
      {
        "name": "--rating-empty-fill",
        "description": "Fill of the empty stars and of the unfilled half (defaults to --surface-muted-color)"
      },
      {
        "name": "--rating-hover-scale",
        "description": "Scale of the hovered star of an interactive rating (defaults to 1.15)"
      }
    ]
  },
  "wc:minerva-rating-scale": {
    "kind": "element",
    "source": "web-components/src/components/rating/rating.ts",
    "className": "MinervaRatingScale",
    "summary": "Several labelled ratings on one scale.",
    "description": "Several labelled ratings sharing one scale, e.g. plot / characters / writing (`<RatingScale>` of React). Each row is a `<minerva-rating>`; rows are display-only unless `interactive` (React: passing `onChange`). Not form-associated: submit the dimensions yourself, or use one named `<minerva-rating>` per dimension.",
    "properties": [
      {
        "name": "max",
        "attribute": "max",
        "type": "number",
        "default": "10",
        "description": "Highest score shared by every dimension"
      },
      {
        "name": "size",
        "attribute": "size",
        "type": "\"small\" | \"medium\" | \"large\"",
        "default": "\"medium\"",
        "description": "Star size"
      },
      {
        "name": "interactive",
        "attribute": "interactive",
        "type": "boolean",
        "default": "false",
        "description": "Makes the rows interactive (React: passing `onChange`)"
      },
      {
        "name": "readOnly",
        "attribute": "readonly",
        "type": "boolean",
        "default": "false",
        "description": "Forces display mode even when `interactive` is set"
      },
      {
        "name": "hideValue",
        "attribute": "hide-value",
        "type": "boolean",
        "default": "false",
        "description": "Hides the score at the end of each row"
      },
      {
        "name": "dimensions",
        "type": "readonly RatingDimension[]",
        "default": "[]",
        "description": "Dimensions to rate, one row each"
      }
    ],
    "methods": [],
    "events": [
      {
        "name": "minerva-change",
        "description": "The user rated a dimension; `detail: { key, value, dimensions }` (`dimensions` is already updated)"
      }
    ],
    "slots": [],
    "parts": [
      {
        "name": "root",
        "description": "The list of rows"
      },
      {
        "name": "row",
        "description": "Each row (a label and a rating)"
      },
      {
        "name": "label",
        "description": "The label of a row"
      }
    ],
    "cssProperties": [
      {
        "name": "--rating-color",
        "description": "Color of the filled stars (defaults to --accent-color)"
      },
      {
        "name": "--rating-empty-color",
        "description": "Color of the empty stars and of the unfilled half"
      },
      {
        "name": "--rating-star-gap",
        "description": "Space between the stars"
      },
      {
        "name": "--rating-gap",
        "description": "Space between the stars and the value"
      },
      {
        "name": "--rating-value-font-size",
        "description": "Font size of the numeric value (every size)"
      },
      {
        "name": "--rating-scale-gap",
        "description": "Space between the rows of a RatingScale"
      },
      {
        "name": "--rating-empty-fill",
        "description": "Fill of the empty stars and of the unfilled half (defaults to --surface-muted-color)"
      },
      {
        "name": "--rating-hover-scale",
        "description": "Scale of the hovered star of an interactive rating (defaults to 1.15)"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:Rating": {
    "kind": "cssVars",
    "source": "react/src/components/Rating",
    "vars": [
      {
        "name": "--rating-color",
        "description": "Color of the filled stars (defaults to --accent-color)"
      },
      {
        "name": "--rating-empty-color",
        "description": "Color of the empty stars and of the unfilled half"
      },
      {
        "name": "--rating-star-gap",
        "description": "Space between the stars"
      },
      {
        "name": "--rating-gap",
        "description": "Space between the stars and the value"
      },
      {
        "name": "--rating-value-font-size",
        "description": "Font size of the numeric value (every size)"
      },
      {
        "name": "--rating-scale-gap",
        "description": "Space between the rows of a RatingScale"
      },
      {
        "name": "--rating-empty-fill",
        "description": "Fill of the empty stars and of the unfilled half (defaults to --surface-muted-color)"
      },
      {
        "name": "--rating-hover-scale",
        "description": "Scale of the hovered star of an interactive rating (defaults to 1.15)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Display

Without interactive the stars are display-only (role="img"), like the React Rating without onChange: any 0..max score on 5 stars, with show-value and rating-count after them.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/rating/wc/basic.html

```html
<div style="display: grid; gap: 8px; justify-items: start">
  <minerva-rating value="8.6" size="small"></minerva-rating>
  <minerva-rating
    readonly
    value="7"
    show-value
    rating-count="3214"
  ></minerva-rating>
  <minerva-rating
    readonly
    value="3.5"
    max="5"
    size="large"
    show-value
  ></minerva-rating>
</div>

```

## Example: In a form

The element is form-associated: the score is submitted under name, required rejects a 0 score and Reset restores the value attribute.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/rating/wc/form.html

```html
<form id="review" style="display: grid; gap: 8px; justify-items: start">
  <label for="review-score">Your rating (required)</label>
  <minerva-rating
    id="review-score"
    interactive
    name="score"
    max="5"
    show-value
    required
  ></minerva-rating>
  <div style="display: flex; gap: 8px">
    <minerva-button type="submit">Send</minerva-button>
    <minerva-button type="reset" variant="ghost" color="neutral"
      >Reset</minerva-button
    >
  </div>
  <output id="result"></output>
</form>

```

### apps/docs/src/docs/pages/rating/wc/form.ts

```tsx
// The score is submitted under `name`; `required` rejects a 0 score
// (valueMissing) and form.reset() restores the `value` attribute.
export function setup(root: HTMLElement) {
  const form = root.querySelector<HTMLFormElement>("#review")!;
  const result = root.querySelector<HTMLOutputElement>("#result")!;
  const onSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    result.value = `score = ${new FormData(form).get("score")}`;
  };
  const onReset = () => (result.value = "");
  form.addEventListener("submit", onSubmit);
  form.addEventListener("reset", onReset);
  return () => {
    form.removeEventListener("submit", onSubmit);
    form.removeEventListener("reset", onReset);
  };
}

```

## Example: Interactive

Interactive by default: click the left or right half of a star, or focus it and use the arrows, PageUp / PageDown and Home / End. minerva-change reports the new score.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/rating/wc/interactive.html

```html
<minerva-rating
  id="score"
  interactive
  aria-label="Your score"
  value="6"
  size="large"
  show-value
></minerva-rating>
<output id="result" style="display: block; margin-top: 8px"></output>

```

### apps/docs/src/docs/pages/rating/wc/interactive.ts

```tsx
// Click the left / right half of a star, or use the arrow keys,
// PageUp / PageDown and Home / End once the stars are focused.
export function setup(root: HTMLElement) {
  const score = root.querySelector<HTMLElement>("#score")!;
  const result = root.querySelector<HTMLOutputElement>("#result")!;
  const onChange = (event: Event) => {
    const { value } = (event as CustomEvent<{ value: number }>).detail;
    result.value = `minerva-change: ${value}`;
  };
  score.addEventListener("minerva-change", onChange);
  return () => score.removeEventListener("minerva-change", onChange);
}

```

## Example: Rating scale

<minerva-rating-scale> rates several dimensions on one scale. dimensions is a JS property; minerva-change carries the key and the updated list, mirrored here in a readonly, hide-value copy.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/rating/wc/scale.html

```html
<div style="display: grid; gap: 16px">
  <minerva-rating-scale id="scale" interactive></minerva-rating-scale>
  <minerva-rating-scale
    id="summary"
    size="small"
    readonly
    hide-value
  ></minerva-rating-scale>
  <output id="result"></output>
</div>

```

### apps/docs/src/docs/pages/rating/wc/scale.ts

```tsx
// `dimensions` is a JS property. The scale updates it itself and re-emits
// each row's change with the dimension key.
interface Dimension {
  key: string;
  label: string;
  value: number;
  hint?: string;
}
type Scale = HTMLElement & { dimensions: readonly Dimension[] };

export function setup(root: HTMLElement) {
  const scale = root.querySelector<Scale>("#scale")!;
  const summary = root.querySelector<Scale>("#summary")!;
  const result = root.querySelector<HTMLOutputElement>("#result")!;
  scale.dimensions = [
    { key: "plot", label: "Plot", value: 8.2, hint: "Story and pacing" },
    { key: "characters", label: "Characters", value: 7.5 },
    { key: "writing", label: "Writing", value: 9 },
  ];
  summary.dimensions = scale.dimensions;
  const onChange = (event: Event) => {
    const { key, value, dimensions } = (
      event as CustomEvent<{
        key: string;
        value: number;
        dimensions: readonly Dimension[];
      }>
    ).detail;
    summary.dimensions = dimensions;
    result.value = `${key} = ${value}`;
  };
  scale.addEventListener("minerva-change", onChange);
  return () => scale.removeEventListener("minerva-change", onChange);
}

```

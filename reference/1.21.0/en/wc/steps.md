# Steps

Shows the stages of a workflow and lets the user move between them.

Package: minerva-design@1.21.0

Renderer: wc

Locale: en

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

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/steps",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "value",
    "typeText": "string",
    "attribute": "value",
    "required": false
  },
  {
    "name": "navigable",
    "typeText": "boolean",
    "attribute": "navigable",
    "required": false
  },
  {
    "name": "items",
    "typeText": "StepsItem[]",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "minerva-change",
    "typeText": "CustomEvent<{ value: string; }>",
    "detailType": {
      "typeText": "{ value: string; }",
      "typeRef": "type:3619c35366dbb3b5a4b2"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": true,
    "description": "The user navigated to a step (`detail: { value }`); cancelable: `preventDefault()` keeps the current step"
  }
]
```

## API

```json
{
  "wc:minerva-steps": {
    "kind": "element",
    "source": "web-components/src/components/steps/steps.ts",
    "className": "MinervaSteps",
    "summary": "Workflow steps, read-only or navigable.",
    "description": "The stages of a workflow as an ordered list (`<Steps>` of React). Earlier steps are marked complete and the current one with `aria-current=\"step\"`. By default the steps are a read-only progress indicator (no buttons, `aria-current` on the `<li>`); with `navigable` each step is a native button, and choosing one sets `value` and fires `minerva-change` (validation and workflow transitions belong to the caller: cancel the event to keep the current step).",
    "properties": [
      {
        "name": "value",
        "attribute": "value",
        "type": "string",
        "default": "\"\"",
        "description": "Value of the current step (\"\" matches no step)"
      },
      {
        "name": "navigable",
        "attribute": "navigable",
        "type": "boolean",
        "default": "false",
        "description": "Renders each step as a button the user can navigate with (default: read-only)"
      },
      {
        "name": "items",
        "type": "StepsItem[]",
        "default": "[]",
        "description": "Steps, in order"
      }
    ],
    "methods": [],
    "events": [
      {
        "name": "minerva-change",
        "description": "The user navigated to a step (`detail: { value }`); cancelable: `preventDefault()` keeps the current step"
      }
    ],
    "slots": [],
    "parts": [
      {
        "name": "root",
        "description": "The `<ol>`"
      },
      {
        "name": "item",
        "description": "A step `<li>` (the current step has aria-current=step)"
      },
      {
        "name": "item--current",
        "description": "Item state of `item`: current"
      },
      {
        "name": "item--disabled",
        "description": "Item state of `item`: disabled"
      },
      {
        "name": "item--status-complete",
        "description": "Item state of `item`: status complete"
      },
      {
        "name": "item--status-upcoming",
        "description": "Item state of `item`: status upcoming"
      },
      {
        "name": "button",
        "description": "The `<button>` of a step (navigable) or its static wrapper (read-only)"
      },
      {
        "name": "indicator",
        "description": "The numbered indicator of a step"
      },
      {
        "name": "label",
        "description": "The label of a step"
      }
    ],
    "cssProperties": [
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

## Example: Read-only progress

Steps come from the items property; earlier steps are complete and the current one has aria-current="step".

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/steps/wc/basic.html

```html
<minerva-steps id="order" value="shipped"></minerva-steps>

```

### apps/docs/src/docs/pages/steps/wc/basic.ts

```tsx
// Read-only progress: earlier steps are complete, the current one has
// aria-current="step". Steps are a JS property.
type Step = { value: string; label: string; disabled?: boolean };

export function setup(root: HTMLElement) {
  root.querySelector<HTMLElement & { items: Step[] }>("#order")!.items = [
    { value: "placed", label: "Order placed" },
    { value: "paid", label: "Payment confirmed" },
    { value: "shipped", label: "Shipped" },
    { value: "delivered", label: "Delivered" },
  ];
}

```

## Example: Navigable wizard

navigable turns each step into a button. minerva-change is cancelable: the caller validates the transition (accept the terms to leave the first step).

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/steps/wc/navigable.html

```html
<div style="display: grid; gap: 16px">
  <minerva-steps id="wizard" value="account" navigable></minerva-steps>
  <label style="display: flex; gap: 8px; align-items: center">
    <input id="terms" type="checkbox" />
    I accept the terms (required to leave the first step)
  </label>
  <div style="display: flex; gap: 8px">
    <minerva-button id="prev" variant="outline" color="neutral"
      >Previous</minerva-button
    >
    <minerva-button id="next">Next</minerva-button>
  </div>
  <output id="status"></output>
</div>

```

### apps/docs/src/docs/pages/steps/wc/navigable.ts

```tsx
// navigable renders each step as a button. minerva-change is cancelable:
// the caller validates the transition (here: the terms checkbox).
type Step = { value: string; label: string; disabled?: boolean };
type Steps = HTMLElement & { items: Step[]; value: string };

const steps: Step[] = [
  { value: "account", label: "Account" },
  { value: "team", label: "Team" },
  { value: "billing", label: "Billing" },
  { value: "done", label: "Done", disabled: true },
];

export function setup(root: HTMLElement) {
  const wizard = root.querySelector<Steps>("#wizard")!;
  const terms = root.querySelector<HTMLInputElement>("#terms")!;
  const prev = root.querySelector<HTMLElement>("#prev")!;
  const next = root.querySelector<HTMLElement>("#next")!;
  const status = root.querySelector<HTMLOutputElement>("#status")!;
  wizard.items = steps;

  const allowed = (from: string) => from !== "account" || terms.checked;
  const onChange = (e: Event) => {
    if (!allowed(wizard.value)) {
      e.preventDefault();
      status.value = "Accept the terms first.";
      return;
    }
    status.value = `Moved to ${(e as CustomEvent<{ value: string }>).detail.value}`;
  };
  const move = (delta: number) => () => {
    const index = steps.findIndex((s) => s.value === wizard.value) + delta;
    const target = steps[index];
    if (!target || target.disabled) return;
    if (!allowed(wizard.value) && delta > 0) {
      status.value = "Accept the terms first.";
      return;
    }
    wizard.value = target.value;
    status.value = `Moved to ${target.value}`;
  };
  const onPrev = move(-1);
  const onNext = move(1);
  wizard.addEventListener("minerva-change", onChange);
  prev.addEventListener("click", onPrev);
  next.addEventListener("click", onNext);
  return () => {
    wizard.removeEventListener("minerva-change", onChange);
    prev.removeEventListener("click", onPrev);
    next.removeEventListener("click", onNext);
  };
}

```

## Example: Styling

CSS variables set the accent color, indicator size and gap; ::part(label) styles the labels.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/steps/wc/styling.html

```html
<style>
  .brand-steps::part(label) {
    font-weight: 600;
  }
</style>
<minerva-steps
  id="styled"
  class="brand-steps"
  value="review"
  style="
    --steps-accent-color: var(--success-color);
    --steps-indicator-size: 2rem;
    --steps-gap: 24px;
    --steps-connector-min-width: 3rem;
  "
></minerva-steps>

```

### apps/docs/src/docs/pages/steps/wc/styling.ts

```tsx
type Step = { value: string; label: string };

export function setup(root: HTMLElement) {
  root.querySelector<HTMLElement & { items: Step[] }>("#styled")!.items = [
    { value: "draft", label: "Draft" },
    { value: "review", label: "Review" },
    { value: "publish", label: "Publish" },
  ];
}

```

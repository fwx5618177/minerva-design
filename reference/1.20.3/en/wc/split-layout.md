# SplitLayout

Main content with an optional aside that splits beside it once the layout's own width reaches a breakpoint.

Package: minerva-design@1.20.3

Renderer: wc

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.3",
  "sourceCommit": "ea7fb3e1f55d184b7d737316e9ae829f4f7ff223",
  "sourceDigest": "sha256:c9540edc3908d226375a01cf5e6bfe8ca6a4e20440f736c0dd9b40ae9ff2e645",
  "referenceSourceDigest": "sha256:4cf6057856184f16240d0d22153ec370842fc7a2dfaaa66364e189fed89e6ca3"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.3/types.json) or getType() from minerva-design/contracts.

## Documentation

## SplitLayout

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/split-layout",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "asideWidth",
    "typeText": "number",
    "attribute": "aside-width",
    "required": false
  },
  {
    "name": "collapseBelow",
    "typeText": "\"md\" | \"lg\"",
    "attribute": "collapse-below",
    "required": false
  },
  {
    "name": "gap",
    "typeText": "string | number",
    "attribute": "gap",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "description": "Main content"
  },
  {
    "name": "aside",
    "description": "Secondary content, after main"
  }
]
```

## API

```json
{
  "wc:minerva-split-layout": {
    "kind": "element",
    "source": "web-components/src/components/split-layout/split-layout.ts",
    "className": "MinervaSplitLayout",
    "summary": "Main + aside layout splitting at a container breakpoint.",
    "description": "Main content with an optional aside column that splits beside it once the layout's own width (container query) reaches a breakpoint (`<SplitLayout>` of React). Main always precedes the aside in reading order; without `aside` slot content the main column is full width.",
    "properties": [
      {
        "name": "asideWidth",
        "attribute": "aside-width",
        "type": "number",
        "default": "320",
        "description": "Requested aside width in pixels in split mode (the track is `min(asideWidth, 50%)`); must be finite and positive"
      },
      {
        "name": "collapseBelow",
        "attribute": "collapse-below",
        "type": "\"md\" | \"lg\"",
        "default": "\"md\"",
        "description": "Splits at container widths of at least 768px (`md`) or 1200px (`lg`) and stacks below"
      },
      {
        "name": "gap",
        "attribute": "gap",
        "type": "string | number",
        "default": "6",
        "description": "Gap between the slots (spacing token number or CSS value)"
      }
    ],
    "methods": [],
    "events": [],
    "slots": [
      {
        "name": "",
        "description": "Main content"
      },
      {
        "name": "aside",
        "description": "Secondary content, after main"
      }
    ],
    "parts": [
      {
        "name": "root",
        "description": "The query container"
      },
      {
        "name": "main",
        "description": "The main column"
      },
      {
        "name": "aside",
        "description": "The aside column (when there is aside content)"
      }
    ],
    "cssProperties": [
      {
        "name": "--split-layout-align-items",
        "description": "Vertical alignment of the main and aside columns (default: start)"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:SplitLayout": {
    "kind": "cssVars",
    "source": "react/src/components/SplitLayout",
    "vars": [
      {
        "name": "--split-layout-align-items",
        "description": "Vertical alignment of the main and aside columns (default: start)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Basic usage

Main content in the default slot, secondary content in the aside slot. The aside splits beside main once the layout is at least 768px wide, and stacks after it below.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/split-layout/wc/basic.html

```html
<minerva-split-layout>
  <minerva-box p="4" bg="bg.muted" rounded="md">
    <strong>Main</strong>
    <p>
      Primary content comes first in reading order and takes the remaining
      width.
    </p>
  </minerva-box>
  <minerva-box
    slot="aside"
    p="4"
    border="1px solid var(--border-color)"
    rounded="md"
  >
    <strong>Aside</strong>
    <p>Splits beside main once the layout is at least 768px wide.</p>
  </minerva-box>
</minerva-split-layout>

```

## Example: Width, breakpoint and gap

aside-width sets the aside column (capped at 50%), collapse-below="lg" waits for 1200px before splitting, gap uses spacing tokens. Drag the slider to resize the container.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/split-layout/wc/options.html

```html
<label style="display: flex; gap: 8px; align-items: center">
  Container width
  <input id="width" type="range" min="400" max="1300" step="10" value="1300" />
  <output id="value">1300px</output>
</label>
<div
  id="frame"
  style="
    max-width: 100%;
    width: 1300px;
    margin-top: 12px;
    padding: 8px;
    border: 1px dashed var(--border-color);
  "
>
  <minerva-split-layout aside-width="240" collapse-below="lg" gap="3">
    <minerva-box p="4" bg="bg.muted" rounded="md">
      Main: splits only from 1200px (collapse-below="lg").
    </minerva-box>
    <minerva-box slot="aside" p="4" bg="bg.subtle" rounded="md">
      Aside: 240px wide, gap="3".
    </minerva-box>
  </minerva-split-layout>
</div>

```

### apps/docs/src/docs/pages/split-layout/wc/options.ts

```tsx
// The split follows the layout's own width (container query).
export function setup(root: HTMLElement) {
  const input = root.querySelector<HTMLInputElement>("#width")!;
  const value = root.querySelector<HTMLOutputElement>("#value")!;
  const frame = root.querySelector<HTMLElement>("#frame")!;
  const onInput = () => {
    frame.style.width = `${input.value}px`;
    value.value = `${input.value}px`;
  };
  input.addEventListener("input", onInput);
  return () => input.removeEventListener("input", onInput);
}

```

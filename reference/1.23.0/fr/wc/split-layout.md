# SplitLayout

Contenu principal avec un panneau latéral facultatif placé à côté dès que la largeur de la mise en page atteint un seuil.

Package: minerva-design@1.23.0

Renderer: wc

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "19d3efc34af8ba4e23df0f24d9fbb0a587e1b452",
  "sourceDigest": "sha256:2005faebbf738765fe81a5c952fa47a51311aa5d05e3220f71c542b8b1fe369b",
  "referenceSourceDigest": "sha256:ec29900df0d5b5c8d741436acb4a250ec29e5f40ce1f4110def33ac2d66baaa5"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

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

## Example: Utilisation de base

Le contenu principal dans le slot par défaut, le contenu secondaire dans le slot aside. L'aside se place à côté dès que la mise en page atteint 768px de large, et s'empile après en dessous.

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

## Example: Largeur, point de rupture et espacement

aside-width fixe la colonne secondaire (50 % au maximum), collapse-below="lg" attend 1200px pour séparer, gap utilise les jetons d'espacement. Faites glisser le curseur pour redimensionner le conteneur.

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

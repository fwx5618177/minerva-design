# Divider 区切り線

コンテンツを水平または垂直に区切る細い線。テキストを含めることもできます。

Package: minerva-design@1.22.2

Renderer: wc

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.2",
  "sourceCommit": "93eaa8e002773e63a78341d4424f9e832b7305a9",
  "sourceDigest": "sha256:62e49d8be55ca2bb85e8afd17b7862d068358e8ea94178c66288911996ed036e",
  "referenceSourceDigest": "sha256:10025b0c7fa1af3c2b0e9de9a1b6d51e6e81c9a41c96e7fcba66a58604dda51c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.2/types.json) or getType() from minerva-design/contracts.

## Documentation

## Divider

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/divider",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "variant",
    "typeText": "\"solid\" | \"dashed\" | \"dotted\"",
    "attribute": "variant",
    "required": false
  },
  {
    "name": "orientation",
    "typeText": "\"horizontal\" | \"vertical\"",
    "attribute": "orientation",
    "required": false
  },
  {
    "name": "thickness",
    "typeText": "number",
    "attribute": "thickness",
    "required": false
  },
  {
    "name": "length",
    "typeText": "string | number | undefined",
    "attribute": "length",
    "required": false
  },
  {
    "name": "spacing",
    "typeText": "number",
    "attribute": "spacing",
    "required": false
  },
  {
    "name": "textAlign",
    "typeText": "\"left\" | \"center\" | \"right\"",
    "attribute": "text-align",
    "required": false
  },
  {
    "name": "elevation",
    "typeText": "boolean",
    "attribute": "elevation",
    "required": false
  },
  {
    "name": "flexItem",
    "typeText": "boolean",
    "attribute": "flex-item",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "description": "Optional text of a horizontal divider (ignored when vertical)"
  }
]
```

## API

```json
{
  "wc:minerva-divider": {
    "kind": "element",
    "source": "web-components/src/components/divider/divider.ts",
    "className": "MinervaDivider",
    "summary": "Separator line, optionally with text.",
    "description": "A horizontal or vertical separator line (`<Divider>` of React). Without content it renders a native `<hr>` (implicit `separator` role); text in the default slot is rendered between the two halves of a horizontal divider (`role=\"separator\"`). The line color comes from `--divider-color`. Vertical dividers are inline (1em high); `flex-item` stretches one to the height of its flex container.",
    "properties": [
      {
        "name": "variant",
        "attribute": "variant",
        "type": "\"solid\" | \"dashed\" | \"dotted\"",
        "default": "\"solid\"",
        "description": "Line style"
      },
      {
        "name": "orientation",
        "attribute": "orientation",
        "type": "\"horizontal\" | \"vertical\"",
        "default": "\"horizontal\"",
        "description": "Divider direction"
      },
      {
        "name": "thickness",
        "attribute": "thickness",
        "type": "number",
        "default": "1",
        "description": "Line thickness in pixels"
      },
      {
        "name": "length",
        "attribute": "length",
        "type": "string | number | undefined",
        "description": "Length of the line (width when horizontal, height when vertical): px number or CSS length"
      },
      {
        "name": "spacing",
        "attribute": "spacing",
        "type": "number",
        "default": "16",
        "description": "Margin around the divider in pixels (block axis when horizontal, inline axis when vertical)"
      },
      {
        "name": "textAlign",
        "attribute": "text-align",
        "type": "\"left\" | \"center\" | \"right\"",
        "default": "\"center\"",
        "description": "Position of the text"
      },
      {
        "name": "elevation",
        "attribute": "elevation",
        "type": "boolean",
        "default": "false",
        "description": "Adds a subtle shadow"
      },
      {
        "name": "flexItem",
        "attribute": "flex-item",
        "type": "boolean",
        "default": "false",
        "description": "Vertical divider stretching to the height of its flex container"
      }
    ],
    "methods": [],
    "events": [],
    "slots": [
      {
        "name": "",
        "description": "Optional text of a horizontal divider (ignored when vertical)"
      }
    ],
    "parts": [
      {
        "name": "root",
        "description": "The <hr>, or the role=separator element of a divider with text (align: position of the text)"
      },
      {
        "name": "label",
        "description": "The text between the two halves of the line"
      }
    ],
    "cssProperties": [
      {
        "name": "--divider-color",
        "description": "Line color (defaults to --border-color)"
      },
      {
        "name": "--divider-thickness",
        "description": "Line thickness"
      },
      {
        "name": "--divider-spacing",
        "description": "Inline margin around a vertical divider"
      },
      {
        "name": "--divider-text-gap",
        "description": "Space between the text and the lines"
      },
      {
        "name": "--divider-text-font-size",
        "description": "Font size of the text"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:Divider": {
    "kind": "cssVars",
    "source": "react/src/components/Divider",
    "vars": [
      {
        "name": "--divider-color",
        "description": "Line color (defaults to --border-color)"
      },
      {
        "name": "--divider-thickness",
        "description": "Line thickness"
      },
      {
        "name": "--divider-spacing",
        "description": "Inline margin around a vertical divider"
      },
      {
        "name": "--divider-text-gap",
        "description": "Space between the text and the lines"
      },
      {
        "name": "--divider-text-font-size",
        "description": "Font size of the text"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 基本的な使い方

横の区切り線で 1 番目と 2 番目のセクションを分けます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/divider/wc/basic.html

```html
<div style="width: 100%">
  <p>Content above the divider.</p>
  <minerva-divider></minerva-divider>
  <p>Content below the divider.</p>
</div>

```

## Example: カスタムスタイル

CSS カスタムプロパティ --divider-color（インラインスタイル、クラス、祖先要素）で線の色を設定し、太さ・長さ・余白・elevation の影をカスタマイズします。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/divider/wc/custom-style.html

```html
<div style="width: 100%">
  <minerva-divider
    style="--divider-color: #7c3aed"
    thickness="2"
  ></minerva-divider
  ><minerva-divider
    style="--divider-color: #16a34a"
    thickness="3"
    variant="dashed"
    length="50%"
  ></minerva-divider
  ><minerva-divider style="--divider-color: #7c3aed">Section</minerva-divider
  ><minerva-divider spacing="32" elevation></minerva-divider>
</div>

```

## Example: flex コンテナ内

flexItem を指定すると縦の区切り線が flex コンテナの高さまで伸びます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/divider/wc/flex-item.html

```html
<div style="display: flex; align-items: center; gap: 12px; height: 48px">
  <span>Edit</span
  ><minerva-divider
    orientation="vertical"
    flex-item
    spacing="0"
  ></minerva-divider
  ><span>Share</span
  ><minerva-divider
    orientation="vertical"
    flex-item
    spacing="0"
  ></minerva-divider
  ><span>Delete</span>
</div>

```

## Example: 線のスタイル

実線（デフォルト）、破線、点線。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/divider/wc/variants.html

```html
<div style="width: 100%">
  <minerva-divider variant="solid"></minerva-divider
  ><minerva-divider variant="dashed"></minerva-divider
  ><minerva-divider variant="dotted"></minerva-divider>
</div>

```

## Example: 縦方向

縦の区切り線で Home、Products、About を分けます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/divider/wc/vertical.html

```html
<div style="display: flex; align-items: center">
  <span>Home</span
  ><minerva-divider
    orientation="vertical"
    length="16"
    spacing="12"
  ></minerva-divider
  ><span>Products</span
  ><minerva-divider
    orientation="vertical"
    length="16"
    spacing="12"
  ></minerva-divider
  ><span>About</span>
</div>

```

## Example: テキスト付き

Left、Center、Right の文字揃えを比較します。右揃えの区切り線は破線です。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/divider/wc/with-text.html

```html
<div style="width: 100%">
  <minerva-divider text-align="left">Left</minerva-divider
  ><minerva-divider>Center</minerva-divider
  ><minerva-divider text-align="right" variant="dashed" thickness="3"
    >Right</minerva-divider
  >
</div>

```

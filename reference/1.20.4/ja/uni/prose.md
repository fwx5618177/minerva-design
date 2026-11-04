# Prose 文章スタイル

記事、レンダリング済み Markdown、リッチテキストエディターなどのセマンティックな HTML 向けの、枠なしでテーマに追従するタイポグラフィです。同じルールを Sass mixin として提供しています：@use "minerva-design/prose.scss" as typography; の後、独自のセレクターで @include typography.prose; を使います。

Package: minerva-design@1.20.4

Renderer: uni

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.4",
  "sourceCommit": "5826c364a762ec5a1144b8eea89e5d7510e4099c",
  "sourceDigest": "sha256:38cfefdcb173c9a307526b9364c7a77acc74f713924006e65d94c6f3c5e94c61",
  "referenceSourceDigest": "sha256:8bb3a20ee069c63b8d85e6ccf29336af81fffa488ce873d14ee032291c18009f"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.4/types.json) or getType() from minerva-design/contracts.

## Documentation

## Prose

Support: beta

Typography container and selectable text/native child slots. DOM descendant tag typography does not apply to native rich-text subtrees. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "Prose"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "content",
    "typeText": "string | undefined",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "typeText": "{}"
  }
]
```

## CSS variables

```json
{
  "css:Prose": {
    "kind": "cssVars",
    "source": "react/src/components/Prose",
    "vars": [
      {
        "name": "--prose-font-size",
        "description": "Base font size of the body text"
      },
      {
        "name": "--prose-border-color",
        "description": "Color of the blockquote, table, code block and rule borders"
      },
      {
        "name": "--prose-code-bg",
        "description": "Background color of inline code and table headers"
      },
      {
        "name": "--prose-pre-bg",
        "description": "Background color of code blocks"
      },
      {
        "name": "--prose-radius",
        "description": "Corner radius of code blocks (defaults to --radius-sm)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

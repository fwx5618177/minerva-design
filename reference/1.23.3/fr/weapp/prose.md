# Prose

Typographie sans cadre et adaptée au thème pour du HTML sémantique : articles, Markdown rendu, éditeurs de texte riche. Les mêmes règles sont publiées en mixin Sass : @use "minerva-design/prose.scss" as typography; puis @include typography.prose; sur votre propre sélecteur.

Package: minerva-design@1.23.3

Renderer: weapp

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.3",
  "sourceCommit": "701bc5e143b35324946db80bfe8336f93933f86e",
  "sourceDigest": "sha256:96e12a2f39f4691c9ba257d9f8247a4fd810c72b772e3da161b9f71eb1e5795d",
  "referenceSourceDigest": "sha256:35253c549c1c2f3c71b2980b1a393121d92facacf74d97b2ceeaabceaa79878c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.3/types.json) or getType() from minerva-design/contracts.

## Documentation

## Prose

Support: beta

Typography container and selectable text/native child slots. DOM descendant tag typography does not apply to native rich-text subtrees. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/prose/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "content",
    "typeText": "string",
    "required": false,
    "default": ""
  }
]
```

### slots

```json
[
  {
    "name": "default"
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

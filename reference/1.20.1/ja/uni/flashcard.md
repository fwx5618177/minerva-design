# Flashcard フラッシュカード

問題と解答を裏返して切り替える両面の学習カード。間隔反復の復習に使います。

Package: minerva-design@1.20.1

Renderer: uni

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.1",
  "sourceCommit": "d476a62793c47d802249dc9c5c91638ffe4210db",
  "sourceDigest": "sha256:2862a9e3a864c9423aed5d287db6fac7e8ddf58b9f5d144c61e7ff4a2630890e",
  "referenceSourceDigest": "sha256:172bbd44559732b657f1ae386911a43aedaffcdf4f5ab90b220a3f9b56302a2f"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.1/types.json) or getType() from minerva-design/contracts.

## Documentation

## Flashcard

Support: beta

Two-sided study card: front/back/footer slots with plain-text front/back fallbacks, translated front/back captions and optional hint, controlled/default flipped (v-model:flipped, flippedChange), flipOnClick, disabled, y/x axis, elevated/outline/filled variants, three sizes and minHeight. Both faces share one CSS grid cell (the card fits the taller face); the hidden face is aria-hidden and the back is a polite live region; H5 adds role=button with aria-pressed, Enter/Space and ignores taps on interactive face content. Mini-program hosts flip on tap only (no keyboard) and ignore prefers-reduced-motion; the CSS 3D rotateY/rotateX flip and backface-visibility need the WebView renderer (Skyline does not support CSS grid or 3D transforms). Device rendering is not validated. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "Flashcard"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "front",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "back",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "frontLabel",
    "typeText": "string | null | undefined",
    "required": false
  },
  {
    "name": "backLabel",
    "typeText": "string | null | undefined",
    "required": false
  },
  {
    "name": "hint",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "showHint",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "flipped",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "defaultFlipped",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "flipOnClick",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "disabled",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "axis",
    "typeText": "\"y\" | \"x\" | undefined",
    "required": false
  },
  {
    "name": "variant",
    "typeText": "\"outline\" | \"filled\" | \"elevated\" | undefined",
    "required": false
  },
  {
    "name": "size",
    "typeText": "\"medium\" | \"small\" | \"large\" | undefined",
    "required": false
  },
  {
    "name": "minHeight",
    "typeText": "string | number | undefined",
    "required": false
  },
  {
    "name": "ariaLabel",
    "typeText": "string | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "flippedChange",
    "typeText": "[flipped: boolean]",
    "parameters": [
      {
        "name": "flipped",
        "position": 0,
        "typeText": "boolean",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "update:flipped",
    "typeText": "[flipped: boolean]",
    "parameters": [
      {
        "name": "flipped",
        "position": 0,
        "typeText": "boolean",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

### slots

```json
[
  {
    "name": "front",
    "typeText": "{}"
  },
  {
    "name": "back",
    "typeText": "{}"
  },
  {
    "name": "footer",
    "typeText": "{}"
  }
]
```

### bindings

```json
[
  {
    "prop": "flipped",
    "event": "update:flipped",
    "syntax": "v-model:flipped"
  }
]
```

## CSS variables

```json
{
  "css:Flashcard": {
    "kind": "cssVars",
    "source": "react/src/components/Flashcard",
    "vars": [
      {
        "name": "--flashcard-min-height",
        "description": "Minimum height of the card (defaults to 12rem; the minHeight prop sets it); the card grows to fit the taller face"
      },
      {
        "name": "--flashcard-bg-color",
        "description": "Background color of the faces (defaults to --surface-color, --surface-muted-color with variant=\"filled\")"
      },
      {
        "name": "--flashcard-border-color",
        "description": "Border color of the faces (variant=\"outline\")"
      },
      {
        "name": "--flashcard-radius",
        "description": "Corner radius of the faces (defaults to --radius-lg)"
      },
      {
        "name": "--flashcard-shadow",
        "description": "Shadow of the faces (variant=\"elevated\"; defaults to --shadow-lg)"
      },
      {
        "name": "--flashcard-padding",
        "description": "Padding of the faces (defaults to the size's spacing)"
      },
      {
        "name": "--flashcard-font-size",
        "description": "Font size of the face content (defaults to the size's font size)"
      },
      {
        "name": "--flashcard-label-color",
        "description": "Text color of the face captions"
      },
      {
        "name": "--flashcard-perspective",
        "description": "Perspective of the 3D flip (defaults to 1200px)"
      },
      {
        "name": "--flashcard-duration",
        "description": "Duration of the flip (defaults to 0.5s)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

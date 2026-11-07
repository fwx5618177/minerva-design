# Flashcard フラッシュカード

問題と解答を裏返して切り替える両面の学習カード。間隔反復の復習に使います。

Package: minerva-design@1.22.1

Renderer: weapp

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.1",
  "sourceCommit": "3b95c464583d2e1bcf02999361aa6cf5481d519b",
  "sourceDigest": "sha256:080b482abbb8d2745bf31d68a17d7a1299cbb89f0e3f8c1a4d1d91bdeb04d1be",
  "referenceSourceDigest": "sha256:22ecb97acf4fac039a6d9a7e4a78b6bedc12dbbb8c1a14e3feeef3bcd47a7cef"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.1/types.json) or getType() from minerva-design/contracts.

## Documentation

## Flashcard

Support: beta

Two-sided study card: front/back/footer named slots with plain-text front/back properties, translated front/back captions and optional hint, controlled (flipped, null = uncontrolled) or defaultFlipped state with flippedchange, flipOnClick, disabled, y/x axis, elevated/outline/filled variants, three sizes and minHeight. Both faces share one CSS grid cell (the card fits the taller face); the hidden face is aria-hidden and the back is a polite live region. Tap to flip only: no keyboard toggling and no prefers-reduced-motion crossfade in mini programs. The CSS 3D rotateY/rotateX flip, backface-visibility and the grid stack need the WebView renderer (Skyline does not support CSS grid or 3D transforms). Taps on interactive slotted content also flip the card (no DOM event path). The footer wrapper is always rendered (slot content cannot be detected). Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/flashcard/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "front",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "back",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "frontLabel",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "backLabel",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "hint",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "showHint",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "flipped",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "defaultFlipped",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "flipOnClick",
    "typeText": "boolean",
    "required": false,
    "default": true
  },
  {
    "name": "disabled",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "axis",
    "typeText": "string",
    "required": false,
    "default": "y"
  },
  {
    "name": "variant",
    "typeText": "string",
    "required": false,
    "default": "elevated"
  },
  {
    "name": "size",
    "typeText": "string",
    "required": false,
    "default": "medium"
  },
  {
    "name": "minHeight",
    "typeText": "unknown",
    "required": false,
    "default": "12rem"
  },
  {
    "name": "ariaLabel",
    "typeText": "string",
    "required": false,
    "default": ""
  }
]
```

### events

```json
[
  {
    "name": "flippedchange",
    "typeText": "{ flipped: boolean }",
    "description": "Requested face (true: the back); a controlled owner must publish the accepted flipped prop."
  }
]
```

### slots

```json
[
  {
    "name": "front"
  },
  {
    "name": "back"
  },
  {
    "name": "footer"
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

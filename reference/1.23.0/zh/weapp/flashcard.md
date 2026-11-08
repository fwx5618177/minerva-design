# Flashcard 抽认卡

在问题与答案之间翻转的双面学习卡片，适用于间隔重复复习。

Package: minerva-design@1.23.0

Renderer: weapp

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "413e3d54e2177f8469c443a6547c4472e608839c",
  "sourceDigest": "sha256:8c8e874e213d698b4d05cabed92eed392c90c5b0fa91c66def67eab19184e86c",
  "referenceSourceDigest": "sha256:e694adbf6015cdc21809df819193e0a84c030845fb2910749dbd1c4c15ccca99"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

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

# Flashcard フラッシュカード

問題と解答を裏返して切り替える両面の学習カード。間隔反復の復習に使います。

Package: minerva-design@1.19.3

Renderer: taro

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "19932861fda2d088219d708a8ca132bea760a32b",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:936b6b17ca037f9538a8c5d8447637951e27e8db3596add5e078bc5a51ef03ae"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

## Flashcard

Support: beta

Two-sided study card: front/back/footer nodes, translated front/back captions and optional hint, controlled/uncontrolled flipped with onFlippedChange, flipOnClick, disabled, y/x axis, elevated/outline/filled variants, three sizes and minHeight. Both faces share one CSS grid cell (the card fits the taller face); the hidden face is aria-hidden and the back is a polite live region. Native touch/view semantics differ from browser DOM semantics. Native devices do not expose document focus, inert, browser portals or File input APIs; H5 capabilities are specified separately. Device-runtime validation is still required. Mini-program hosts flip on tap only (no keyboard) and ignore prefers-reduced-motion; the CSS 3D rotateY/rotateX flip and backface-visibility need the WebView renderer (Skyline does not support CSS grid or 3D transforms). On H5 the card is a toggle button with Enter/Space and taps on interactive face content do not flip it. Component tests, H5 tests in happy-dom and the official Taro WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/taro",
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
    "source": "packages/taro/src/flashcard.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:a991edaa7809b6d75ba2",
    "required": false,
    "description": "Content of the front face (the prompt)"
  },
  {
    "name": "back",
    "source": "packages/taro/src/flashcard.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:a991edaa7809b6d75ba2",
    "required": false,
    "description": "Content of the back face (the answer)"
  },
  {
    "name": "footer",
    "source": "packages/taro/src/flashcard.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:a991edaa7809b6d75ba2",
    "required": false,
    "description": "Content below the card, not flipped (e.g. rating buttons)"
  },
  {
    "name": "frontLabel",
    "source": "packages/taro/src/flashcard.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:a991edaa7809b6d75ba2",
    "required": false,
    "description": "Caption of the front face (default \"Question\", translated; \"\" / null hides it)"
  },
  {
    "name": "backLabel",
    "source": "packages/taro/src/flashcard.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:a991edaa7809b6d75ba2",
    "required": false,
    "description": "Caption of the back face (default \"Answer\", translated; \"\" / null hides it)"
  },
  {
    "name": "hint",
    "source": "packages/taro/src/flashcard.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:a991edaa7809b6d75ba2",
    "required": false,
    "description": "Hint on the front face (default translated \"Click or press Space to flip\")"
  },
  {
    "name": "showHint",
    "source": "packages/taro/src/flashcard.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Shows the hint on the front face (default false)"
  },
  {
    "name": "flipped",
    "source": "packages/taro/src/flashcard.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Whether the back is shown (controlled)"
  },
  {
    "name": "defaultFlipped",
    "source": "packages/taro/src/flashcard.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Whether the back is initially shown (uncontrolled, default false)"
  },
  {
    "name": "flipOnClick",
    "source": "packages/taro/src/flashcard.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Tapping the card flips it (default true)"
  },
  {
    "name": "disabled",
    "source": "packages/taro/src/flashcard.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Blocks flipping and dims the card (default false)"
  },
  {
    "name": "axis",
    "source": "packages/taro/src/flashcard.tsx",
    "kind": "enum",
    "values": [
      "x",
      "y"
    ],
    "typeText": "\"y\" | \"x\" | undefined",
    "typeRef": "type:460923cb047fb535df1e",
    "required": false,
    "description": "Rotation axis (default \"y\")"
  },
  {
    "name": "variant",
    "source": "packages/taro/src/flashcard.tsx",
    "kind": "enum",
    "values": [
      "elevated",
      "filled",
      "outline"
    ],
    "typeText": "\"outline\" | \"elevated\" | \"filled\" | undefined",
    "typeRef": "type:ef01eba2c845a3183ce7",
    "required": false,
    "description": "Surface style (default \"elevated\")"
  },
  {
    "name": "size",
    "source": "packages/taro/src/flashcard.tsx",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "small"
    ],
    "typeText": "\"small\" | \"medium\" | \"large\" | undefined",
    "typeRef": "type:8d5b6882dc615b54818b",
    "required": false,
    "description": "Padding and typography scale (default \"medium\")"
  },
  {
    "name": "minHeight",
    "source": "packages/taro/src/flashcard.tsx",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "required": false,
    "description": "Minimum height (a number is in px, default \"12rem\"); the card grows to fit the taller face"
  },
  {
    "name": "id",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-label",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-labelledby",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-describedby",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "onFlippedChange",
    "source": "packages/taro/src/flashcard.tsx",
    "kind": "function",
    "typeText": "((flipped: boolean) => void) | undefined",
    "typeRef": "type:5a46411b731e1d03e391",
    "parameters": [
      {
        "name": "flipped",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "boolean",
        "typeRef": "type:7087acd01ef7dd9f1d5c"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called with the next flipped state"
  }
]
```

### bindings

```json
[
  {
    "prop": "flipped",
    "event": "onFlippedChange",
    "syntax": "flipped={flipped} onFlippedChange={handler}"
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

# Flashcard フラッシュカード

問題と解答を裏返して切り替える両面の学習カード。間隔反復の復習に使います。

Package: minerva-design@1.23.1

Renderer: native

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "6ccf4f2c7a65dd5b27e517c9a50ea4867f8e7980",
  "sourceDigest": "sha256:2005faebbf738765fe81a5c952fa47a51311aa5d05e3220f71c542b8b1fe369b",
  "referenceSourceDigest": "sha256:3616b5d4e7cf7e0eb1fbe04c879d1630cc3dfd5c28f16762b8ad6f3f3525ef82"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

## Documentation

## Flashcard

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
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
    "source": "packages/native/src/components/Flashcard/Flashcard.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Content of the front face (the prompt)"
  },
  {
    "name": "back",
    "source": "packages/native/src/components/Flashcard/Flashcard.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Content of the back face (the answer)"
  },
  {
    "name": "footer",
    "source": "packages/native/src/components/Flashcard/Flashcard.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Content below the card, not flipped (e.g. rating buttons)"
  },
  {
    "name": "frontLabel",
    "source": "packages/native/src/components/Flashcard/Flashcard.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Small caption of the front face; `null`, `false` or `\"\"` hides it"
  },
  {
    "name": "backLabel",
    "source": "packages/native/src/components/Flashcard/Flashcard.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Small caption of the back face; `null`, `false` or `\"\"` hides it"
  },
  {
    "name": "hint",
    "source": "packages/native/src/components/Flashcard/Flashcard.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Hint on the front face (shown with showHint while the card flips on press)"
  },
  {
    "name": "showHint",
    "source": "packages/native/src/components/Flashcard/Flashcard.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows the hint on the front face"
  },
  {
    "name": "flipped",
    "source": "packages/native/src/components/Flashcard/Flashcard.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Whether the back is shown (controlled; pair with onFlippedChange)"
  },
  {
    "name": "defaultFlipped",
    "source": "packages/native/src/components/Flashcard/Flashcard.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Whether the back is initially shown (uncontrolled)"
  },
  {
    "name": "flipOnClick",
    "source": "packages/native/src/components/Flashcard/Flashcard.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Pressing the card flips it. When false the card is not a button and only `flipped` flips it."
  },
  {
    "name": "disabled",
    "source": "packages/native/src/components/Flashcard/Flashcard.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Blocks flipping and dims the card"
  },
  {
    "name": "axis",
    "source": "packages/native/src/components/Flashcard/Flashcard.tsx",
    "kind": "enum",
    "values": [
      "x",
      "y"
    ],
    "typeText": "FlashcardAxis | undefined",
    "typeRef": "type:c542c7031138ffed2013",
    "default": "y",
    "required": false,
    "description": "Rotation axis: \"y\" flips horizontally, \"x\" vertically"
  },
  {
    "name": "variant",
    "source": "packages/native/src/components/Flashcard/Flashcard.tsx",
    "kind": "enum",
    "values": [
      "elevated",
      "filled",
      "outline"
    ],
    "typeText": "FlashcardVariant | undefined",
    "typeRef": "type:e2988f5a10b092415682",
    "default": "elevated",
    "required": false,
    "description": "Surface style"
  },
  {
    "name": "size",
    "source": "packages/native/src/components/Flashcard/Flashcard.tsx",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "small"
    ],
    "typeText": "FlashcardSize | undefined",
    "typeRef": "type:69ddf6c5343508a57b1a",
    "default": "medium",
    "required": false,
    "description": "Padding and typography scale"
  },
  {
    "name": "minHeight",
    "source": "packages/native/src/components/Flashcard/Flashcard.tsx",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "default": 192,
    "required": false,
    "description": "Minimum height of the card in dp (or a \"px\" / \"rem\" string, 1rem = 16); the card grows to fit the taller face"
  }
]
```

### events

```json
[
  {
    "name": "onFlippedChange",
    "source": "packages/native/src/components/Flashcard/Flashcard.tsx",
    "kind": "function",
    "typeText": "((flipped: boolean) => void) | undefined",
    "typeRef": "type:6f3a25656598c5373da5",
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

## API

```json
{
  "native:FlashcardProps": {
    "source": "native/src/components/Flashcard/Flashcard.tsx",
    "kind": "interface",
    "extends": [
      "Omit<ViewProps, \"style\" | \"children\">"
    ],
    "props": [
      {
        "name": "front",
        "type": "ReactNode",
        "required": false,
        "description": "Content of the front face (the prompt)"
      },
      {
        "name": "back",
        "type": "ReactNode",
        "required": false,
        "description": "Content of the back face (the answer)"
      },
      {
        "name": "footer",
        "type": "ReactNode",
        "required": false,
        "description": "Content below the card, not flipped (e.g. rating buttons)"
      },
      {
        "name": "frontLabel",
        "type": "ReactNode",
        "required": false,
        "default": "the \"flashcard.frontLabel\" message (\"Question\")",
        "description": "Small caption of the front face; `null`, `false` or `\"\"` hides it"
      },
      {
        "name": "backLabel",
        "type": "ReactNode",
        "required": false,
        "default": "the \"flashcard.backLabel\" message (\"Answer\")",
        "description": "Small caption of the back face; `null`, `false` or `\"\"` hides it"
      },
      {
        "name": "hint",
        "type": "ReactNode",
        "required": false,
        "default": "the \"flashcard.hint\" message",
        "description": "Hint on the front face (shown with showHint while the card flips on press)"
      },
      {
        "name": "showHint",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Shows the hint on the front face"
      },
      {
        "name": "flipped",
        "type": "boolean",
        "required": false,
        "description": "Whether the back is shown (controlled; pair with onFlippedChange)"
      },
      {
        "name": "defaultFlipped",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Whether the back is initially shown (uncontrolled)"
      },
      {
        "name": "onFlippedChange",
        "type": "(flipped: boolean) => void",
        "required": false,
        "description": "Called with the next flipped state"
      },
      {
        "name": "flipOnClick",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Pressing the card flips it. When false the card is not a button and only `flipped` flips it."
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Blocks flipping and dims the card"
      },
      {
        "name": "axis",
        "type": "FlashcardAxis",
        "required": false,
        "default": "\"y\"",
        "description": "Rotation axis: \"y\" flips horizontally, \"x\" vertically"
      },
      {
        "name": "variant",
        "type": "FlashcardVariant",
        "required": false,
        "default": "\"elevated\"",
        "description": "Surface style"
      },
      {
        "name": "size",
        "type": "FlashcardSize",
        "required": false,
        "default": "\"medium\"",
        "description": "Padding and typography scale"
      },
      {
        "name": "minHeight",
        "type": "number | string",
        "required": false,
        "default": "192",
        "description": "Minimum height of the card in dp (or a \"px\" / \"rem\" string, 1rem = 16); the card grows to fit the taller face"
      },
      {
        "name": "style",
        "type": "StyleProp<ViewStyle>",
        "required": false,
        "description": "Style of the outer view (card and footer)"
      }
    ]
  }
}
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

## Example: 基本的な使い方

カードをクリックするか、カード上で Enter / Space を押すと 3D 回転で裏返ります。カードはトグルボタン（aria-pressed）で、隠れている面は inert、裏面は polite のライブリージョンなので、表示された解答が読み上げられます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/flashcard/native/basic.tsx

```tsx
import { useState } from "react";
import { Text, View } from "react-native";
import { Button, Flashcard } from "minerva-design/native";

const deck = [
  { front: "ephemeral", back: "Lasting for a very short time" },
  { front: "ubiquitous", back: "Present, appearing or found everywhere" },
  { front: "laconic", back: "Using very few words" },
];

export default function Basic() {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const card = deck[index]!;
  const next = () => {
    setFlipped(false);
    setIndex((i) => (i + 1) % deck.length);
  };
  return (
    <View style={{ gap: 12 }}>
      <Flashcard
        front={card.front}
        back={card.back}
        backLabel="Definition"
        flipped={flipped}
        onFlippedChange={setFlipped}
        minHeight={160}
        footer={
          flipped ? (
            <>
              <Button size="small" variant="outline" onPress={next}>
                Again
              </Button>
              <Button size="small" onPress={next}>
                Good
              </Button>
            </>
          ) : null
        }
      />
      <Text>
        Card {index + 1} / {deck.length} · tap to flip
      </Text>
    </View>
  );
}

```

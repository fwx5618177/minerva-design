# Flashcard 抽认卡

在问题与答案之间翻转的双面学习卡片，适用于间隔重复复习。

Package: minerva-design@1.23.2

Renderer: react

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.2",
  "sourceCommit": "c6618fd81b2d3c2a9016cfe13a1d15983d533ff7",
  "sourceDigest": "sha256:1ce1c857f10d367f112c6e77d88ae3878570c428c4d39ed7a400c8c99645e9f6",
  "referenceSourceDigest": "sha256:8f6e89c1e214fedc2e52de014615037c54204a8ec5c0dbb40c58dc530906571e"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.2/types.json) or getType() from minerva-design/contracts.

## Documentation

## Flashcard

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
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
    "source": "packages/react/src/components/Flashcard/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Content of the front face (the prompt)"
  },
  {
    "name": "back",
    "source": "packages/react/src/components/Flashcard/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Content of the back face (the answer)"
  },
  {
    "name": "footer",
    "source": "packages/react/src/components/Flashcard/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Content below the card, not flipped (e.g. rating buttons)"
  },
  {
    "name": "frontLabel",
    "source": "packages/react/src/components/Flashcard/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Small caption of the front face; `null`, `false` or `\"\"` hides it"
  },
  {
    "name": "backLabel",
    "source": "packages/react/src/components/Flashcard/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Small caption of the back face; `null`, `false` or `\"\"` hides it"
  },
  {
    "name": "hint",
    "source": "packages/react/src/components/Flashcard/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Hint on the front face (shown with showHint while the card flips on click)"
  },
  {
    "name": "showHint",
    "source": "packages/react/src/components/Flashcard/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows the hint on the front face"
  },
  {
    "name": "flipped",
    "source": "packages/react/src/components/Flashcard/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Whether the back is shown (controlled; pair with onFlippedChange)"
  },
  {
    "name": "defaultFlipped",
    "source": "packages/react/src/components/Flashcard/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Whether the back is initially shown (uncontrolled)"
  },
  {
    "name": "flipOnClick",
    "source": "packages/react/src/components/Flashcard/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Clicking the card (or Enter / Space on it) flips it. When false the card is not a button and only `flipped` flips it."
  },
  {
    "name": "disabled",
    "source": "packages/react/src/components/Flashcard/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Blocks flipping and dims the card"
  },
  {
    "name": "axis",
    "source": "packages/react/src/components/Flashcard/types.ts",
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
    "source": "packages/react/src/components/Flashcard/types.ts",
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
    "source": "packages/react/src/components/Flashcard/types.ts",
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
    "source": "packages/react/src/components/Flashcard/types.ts",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "default": "12rem",
    "required": false,
    "description": "Minimum height of the card (a number is in px); the card grows to fit the taller face"
  },
  {
    "name": "aria-label",
    "source": "packages/react/src/components/Flashcard/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label of the card"
  }
]
```

### events

```json
[
  {
    "name": "onFlippedChange",
    "source": "packages/react/src/components/Flashcard/types.ts",
    "kind": "function",
    "typeText": "((flipped: boolean) => void) | undefined",
    "typeRef": "type:16413388c9b412893619",
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
  "FlashcardProps": {
    "source": "react/src/components/Flashcard/types.ts",
    "description": "Props of the Flashcard component: a two-sided study card that flips between a front (the prompt) and a back (the answer), e.g. for spaced repetition review",
    "kind": "interface",
    "extends": [],
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
        "default": "\"Question\" (translated)",
        "description": "Small caption of the front face; `null`, `false` or `\"\"` hides it"
      },
      {
        "name": "backLabel",
        "type": "ReactNode",
        "required": false,
        "default": "\"Answer\" (translated)",
        "description": "Small caption of the back face; `null`, `false` or `\"\"` hides it"
      },
      {
        "name": "hint",
        "type": "ReactNode",
        "required": false,
        "default": "\"Click or press Space to flip\" (translated)",
        "description": "Hint on the front face (shown with showHint while the card flips on click)"
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
        "description": "Clicking the card (or Enter / Space on it) flips it. When false the card is not a button and only `flipped` flips it."
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
        "default": "\"12rem\"",
        "description": "Minimum height of the card (a number is in px); the card grows to fit the taller face"
      },
      {
        "name": "aria-label",
        "type": "string",
        "required": false,
        "default": "\"Flashcard, showing <face label>\" (translated)",
        "description": "Accessible label of the card"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional class name"
      },
      {
        "name": "ref",
        "type": "Ref<HTMLDivElement>",
        "required": false,
        "description": "Ref to the root <div>"
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

## Example: 翻转轴、变体与尺寸

axis="x" 纵向翻转；variant 与 Card 一致（elevated、outline、filled），size 调整内边距与字号。两面位于同一网格单元，卡片高度取较高的一面。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/flashcard/demos/axis-variants.tsx

```tsx
import { Flashcard } from "minerva-design";

export default function AxisVariantsDemo() {
  return (
    <div
      style={{
        display: "grid",
        gap: 16,
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
      }}
    >
      <Flashcard
        variant="elevated"
        front="elevated · axis y"
        back="Flips horizontally"
        minHeight={140}
      />
      <Flashcard
        variant="outline"
        axis="x"
        front="outline · axis x"
        back="Flips vertically"
        minHeight={140}
      />
      <Flashcard
        variant="filled"
        size="small"
        front="filled · small"
        back="Less padding, smaller type"
        minHeight={140}
      />
      <Flashcard
        size="large"
        front="large"
        back={
          <>
            The card grows to fit the taller face: this answer is much longer
            than the question, and the card height follows it on both sides.
          </>
        }
        minHeight={140}
      />
    </div>
  );
}

```

## Example: 基础用法

点击卡片，或在卡片上按 Enter / 空格键，即以 3D 旋转翻面。卡片是切换按钮（aria-pressed）；隐藏的一面为 inert，背面是 polite 实时区域，翻开的答案会被读出。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/flashcard/demos/basic.tsx

```tsx
import { Flashcard } from "minerva-design";

export default function BasicDemo() {
  return (
    <div style={{ maxWidth: 420 }}>
      <Flashcard
        front="What is the capital of Australia?"
        back="Canberra"
        showHint
      />
    </div>
  );
}

```

## Example: 受控复习与评分按钮

flipped / onFlippedChange 控制当前面；footer 在卡片下方放置评分按钮（不随卡片翻转）。frontLabel / backLabel 替换默认的“问题” / “答案”标注。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/flashcard/demos/controlled.tsx

```tsx
import { useState } from "react";
import { Button, Flashcard } from "minerva-design";

const deck = [
  { front: "ephemeral", back: "Lasting for a very short time" },
  { front: "ubiquitous", back: "Present, appearing or found everywhere" },
  { front: "laconic", back: "Using very few words" },
];
const ratings = ["Again", "Hard", "Good", "Easy"] as const;

export default function ControlledDemo() {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [log, setLog] = useState<string[]>([]);
  const card = deck[index];

  const rate = (rating: (typeof ratings)[number]) => {
    setLog((prev) => [...prev, `${card.front}: ${rating}`].slice(-3));
    setFlipped(false);
    setIndex((i) => (i + 1) % deck.length);
  };

  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 420 }}>
      <Flashcard
        front={<strong style={{ fontSize: "1.5rem" }}>{card.front}</strong>}
        back={card.back}
        frontLabel={`Card ${index + 1} / ${deck.length}`}
        backLabel="Definition"
        flipped={flipped}
        onFlippedChange={setFlipped}
        footer={
          flipped ? (
            ratings.map((rating) => (
              <Button
                key={rating}
                size="small"
                variant={rating === "Good" ? "solid" : "outline"}
                onClick={() => rate(rating)}
              >
                {rating}
              </Button>
            ))
          ) : (
            <Button size="small" onClick={() => setFlipped(true)}>
              Show answer
            </Button>
          )
        }
      />
      <output style={{ fontSize: 13 }}>
        {log.length ? log.join(" · ") : "Flip the card, then rate it."}
      </output>
    </div>
  );
}

```

## Example: 禁用与程序化翻转

disabled 阻止翻转并使卡片变淡；flipOnClick={false} 时卡片不是按钮，只能通过 flipped 翻面。在 prefers-reduced-motion 下两面以淡入淡出切换，不做旋转。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/flashcard/demos/reduced-disabled.tsx

```tsx
import { useState } from "react";
import { Button, Flashcard } from "minerva-design";

export default function ReducedDisabledDemo() {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      style={{
        display: "grid",
        gap: 16,
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
      }}
    >
      <Flashcard
        front="Disabled"
        back="Never shown by a click"
        disabled
        minHeight={140}
      />
      <Flashcard
        front="flipOnClick={false}"
        back="Flipped by the button below"
        flipOnClick={false}
        flipped={flipped}
        frontLabel={null}
        backLabel={null}
        minHeight={140}
        footer={
          <Button size="small" onClick={() => setFlipped((f) => !f)}>
            {flipped ? "Hide answer" : "Reveal answer"}
          </Button>
        }
      />
    </div>
  );
}

```

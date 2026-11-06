# Flashcard 抽认卡

在问题与答案之间翻转的双面学习卡片，适用于间隔重复复习。

Package: minerva-design@1.21.1

Renderer: wc

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.1",
  "sourceCommit": "8b898b8bac966669d23d1fba972e2a3289cdb5b5",
  "sourceDigest": "sha256:a33fb5e0b8f01ae452ce95d2b723ab0cd9905636d574c72fd12c1459f4c09d3a",
  "referenceSourceDigest": "sha256:8ed3473bb098d663e523782b06fce57a42cde419daa8bbcc5c6b1f0e37e3e50e"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.1/types.json) or getType() from minerva-design/contracts.

## Documentation

## Flashcard

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/flashcard",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "front",
    "typeText": "string | undefined",
    "attribute": "front",
    "required": false
  },
  {
    "name": "back",
    "typeText": "string | undefined",
    "attribute": "back",
    "required": false
  },
  {
    "name": "frontLabel",
    "typeText": "string | undefined",
    "attribute": "front-label",
    "required": false
  },
  {
    "name": "backLabel",
    "typeText": "string | undefined",
    "attribute": "back-label",
    "required": false
  },
  {
    "name": "hint",
    "typeText": "string | undefined",
    "attribute": "hint",
    "required": false
  },
  {
    "name": "showHint",
    "typeText": "boolean",
    "attribute": "show-hint",
    "required": false
  },
  {
    "name": "flipped",
    "typeText": "boolean",
    "attribute": "flipped",
    "required": false
  },
  {
    "name": "flipOnClick",
    "typeText": "boolean",
    "attribute": "flip-on-click",
    "required": false
  },
  {
    "name": "disabled",
    "typeText": "boolean",
    "attribute": "disabled",
    "required": false
  },
  {
    "name": "axis",
    "typeText": "\"y\" | \"x\"",
    "attribute": "axis",
    "required": false
  },
  {
    "name": "variant",
    "typeText": "\"elevated\" | \"outline\" | \"filled\"",
    "attribute": "variant",
    "required": false
  },
  {
    "name": "size",
    "typeText": "\"small\" | \"medium\" | \"large\"",
    "attribute": "size",
    "required": false
  },
  {
    "name": "minHeight",
    "typeText": "string | number",
    "attribute": "min-height",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "minerva-flipped-change",
    "typeText": "CustomEvent<{ flipped: boolean; }>",
    "detailType": {
      "typeText": "{ flipped: boolean; }",
      "typeRef": "type:e112fa77e528b1d05b82"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": true,
    "description": "The user flipped the card (`detail: { flipped }`); cancelable"
  }
]
```

### slots

```json
[
  {
    "name": "front",
    "description": "Content of the front face (the prompt; falls back to the `front` attribute)"
  },
  {
    "name": "back",
    "description": "Content of the back face (the answer; falls back to the `back` attribute)"
  },
  {
    "name": "footer",
    "description": "Content below the card, not flipped (e.g. rating buttons)"
  }
]
```

## API

```json
{
  "wc:minerva-flashcard": {
    "kind": "element",
    "source": "web-components/src/components/flashcard/flashcard.ts",
    "className": "MinervaFlashcard",
    "summary": "A two-sided study card that flips between a prompt and an answer.",
    "description": "A two-sided study card (`<Flashcard>` of React) that flips between a front (the prompt) and a back (the answer) with a 3D rotation (a crossfade under `prefers-reduced-motion`). Both faces share one grid cell, so the card is as tall as the taller face. The card is a toggle button (`aria-pressed` while the back shows): click, Enter or Space flips it, except clicks on interactive slotted content. The hidden face is `inert`; the back is a polite live region, so the revealed answer is announced. The `footer` slot (e.g. rating buttons) sits below the card and does not flip. User flips update `flipped` and fire the cancelable `minerva-flipped-change` (`preventDefault()` keeps the current face).",
    "properties": [
      {
        "name": "front",
        "attribute": "front",
        "type": "string | undefined",
        "description": "Text of the front face (the prompt); the `front` slot wins"
      },
      {
        "name": "back",
        "attribute": "back",
        "type": "string | undefined",
        "description": "Text of the back face (the answer); the `back` slot wins"
      },
      {
        "name": "frontLabel",
        "attribute": "front-label",
        "type": "string | undefined",
        "description": "Caption of the front face (default: localized \"Question\"; \"\" hides it)"
      },
      {
        "name": "backLabel",
        "attribute": "back-label",
        "type": "string | undefined",
        "description": "Caption of the back face (default: localized \"Answer\"; \"\" hides it)"
      },
      {
        "name": "hint",
        "attribute": "hint",
        "type": "string | undefined",
        "description": "Hint on the front face (default: localized \"Click or press Space to flip\")"
      },
      {
        "name": "showHint",
        "attribute": "show-hint",
        "type": "boolean",
        "default": "false",
        "description": "Shows the hint on the front face (while the card flips on click)"
      },
      {
        "name": "flipped",
        "attribute": "flipped",
        "type": "boolean",
        "default": "false",
        "description": "Whether the back is shown"
      },
      {
        "name": "flipOnClick",
        "attribute": "flip-on-click",
        "type": "boolean",
        "default": "true",
        "description": "Clicking the card (or Enter / Space on it) flips it; when false only `flipped` flips it"
      },
      {
        "name": "disabled",
        "attribute": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Blocks flipping and dims the card"
      },
      {
        "name": "axis",
        "attribute": "axis",
        "type": "\"y\" | \"x\"",
        "default": "\"y\"",
        "description": "Rotation axis: \"y\" flips horizontally, \"x\" vertically"
      },
      {
        "name": "variant",
        "attribute": "variant",
        "type": "\"elevated\" | \"outline\" | \"filled\"",
        "default": "\"elevated\"",
        "description": "Surface style"
      },
      {
        "name": "size",
        "attribute": "size",
        "type": "\"small\" | \"medium\" | \"large\"",
        "default": "\"medium\"",
        "description": "Padding and typography scale"
      },
      {
        "name": "minHeight",
        "attribute": "min-height",
        "type": "string | number",
        "default": "\"12rem\"",
        "description": "Minimum height of the card (CSS length; a number is in px); the card grows to fit the taller face"
      }
    ],
    "methods": [
      {
        "name": "focus",
        "signature": "(options?: FocusOptions) => void"
      },
      {
        "name": "toggle",
        "signature": "() => void",
        "description": "Flips the card (as a user flip: fires `minerva-flipped-change`)"
      }
    ],
    "events": [
      {
        "name": "minerva-flipped-change",
        "description": "The user flipped the card (`detail: { flipped }`); cancelable"
      }
    ],
    "slots": [
      {
        "name": "front",
        "description": "Content of the front face (the prompt; falls back to the `front` attribute)"
      },
      {
        "name": "back",
        "description": "Content of the back face (the answer; falls back to the `back` attribute)"
      },
      {
        "name": "footer",
        "description": "Content below the card, not flipped (e.g. rating buttons)"
      }
    ],
    "parts": [
      {
        "name": "root",
        "description": "The outermost element (card and footer)"
      },
      {
        "name": "card",
        "description": "The flipping card (`role=button` while flip-on-click); holds both faces"
      },
      {
        "name": "front",
        "description": "The front face (the prompt)"
      },
      {
        "name": "back",
        "description": "The back face (the answer)"
      },
      {
        "name": "label",
        "description": "The small caption of a face"
      },
      {
        "name": "hint",
        "description": "The flip hint on the front face (with `show-hint`)"
      },
      {
        "name": "footer",
        "description": "The footer below the card (not flipped)"
      }
    ],
    "cssProperties": [
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

axis="x" 纵向翻转；variant（elevated、outline、filled）和 size 也是自定义状态（:state(variant-outline)、:state(size-small)……）。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/flashcard/wc/axis-variants.html

```html
<div
  style="
    display: grid;
    gap: 16px;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  "
>
  <minerva-flashcard
    variant="elevated"
    front="elevated · axis y"
    back="Flips horizontally"
    min-height="140"
  ></minerva-flashcard>
  <minerva-flashcard
    variant="outline"
    axis="x"
    front="outline · axis x"
    back="Flips vertically"
    min-height="140"
  ></minerva-flashcard>
  <minerva-flashcard
    variant="filled"
    size="small"
    front="filled · small"
    back="Less padding, smaller type"
    min-height="140"
  ></minerva-flashcard>
  <minerva-flashcard
    size="large"
    front="large"
    back="The card grows to fit the taller face: this answer is much longer than the question, and the card height follows it on both sides."
    min-height="140"
  ></minerva-flashcard>
</div>

```

## Example: 基础用法

front / back 是纯文本属性（front / back 插槽可放富内容）。点击卡片或在其上按 Enter / 空格键翻面；flipped 属性反映当前面。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/flashcard/wc/basic.html

```html
<div style="max-width: 420px">
  <minerva-flashcard
    front="What is the capital of Australia?"
    back="Canberra"
    show-hint
  ></minerva-flashcard>
</div>

```

## Example: 复习与评分按钮

minerva-flipped-change 报告用户翻面（可取消：preventDefault() 保持当前面）；footer 插槽放置评分按钮，按钮设置 flipped 属性。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/flashcard/wc/controlled.html

```html
<div style="display: grid; gap: 12px; max-width: 420px">
  <minerva-flashcard id="card" back-label="Definition">
    <strong slot="front" id="front" style="font-size: 1.5rem"></strong>
    <span slot="back" id="back"></span>
    <div slot="footer" id="footer"></div>
  </minerva-flashcard>
  <output id="log" style="font-size: 13px">Flip the card, then rate it.</output>
</div>

```

### apps/docs/src/docs/pages/flashcard/wc/controlled.ts

```tsx
// flipped is a reflected boolean attribute; minerva-flipped-change reports
// user flips (cancelable). The footer slot holds the rating buttons.
const deck = [
  { front: "ephemeral", back: "Lasting for a very short time" },
  { front: "ubiquitous", back: "Present, appearing or found everywhere" },
  { front: "laconic", back: "Using very few words" },
];
const ratings = ["Again", "Hard", "Good", "Easy"];

type Flashcard = HTMLElement & { flipped: boolean; frontLabel?: string };

export function setup(root: HTMLElement) {
  const card = root.querySelector<Flashcard>("#card")!;
  const front = root.querySelector<HTMLElement>("#front")!;
  const back = root.querySelector<HTMLElement>("#back")!;
  const footer = root.querySelector<HTMLElement>("#footer")!;
  const log = root.querySelector<HTMLOutputElement>("#log")!;
  const history: string[] = [];
  let index = 0;

  const button = (label: string, solid: boolean, onClick: () => void) => {
    const el = document.createElement("minerva-button");
    el.setAttribute("size", "small");
    el.setAttribute("variant", solid ? "solid" : "outline");
    el.textContent = label;
    el.addEventListener("click", onClick);
    return el;
  };
  const render = () => {
    const item = deck[index]!;
    card.frontLabel = `Card ${index + 1} / ${deck.length}`;
    front.textContent = item.front;
    back.textContent = item.back;
    footer.replaceChildren(
      ...(card.flipped
        ? ratings.map((rating) =>
            button(rating, rating === "Good", () => {
              history.push(`${item.front}: ${rating}`);
              log.value = history.slice(-3).join(" · ");
              card.flipped = false;
              index = (index + 1) % deck.length;
              render();
            }),
          )
        : [
            button("Show answer", true, () => {
              card.flipped = true;
              render();
            }),
          ]),
    );
  };
  const onFlip = () => queueMicrotask(render);
  card.addEventListener("minerva-flipped-change", onFlip);
  render();
  return () => card.removeEventListener("minerva-flipped-change", onFlip);
}

```

## Example: 禁用与程序化翻转

disabled 阻止翻转；flip-on-click="false" 时只能通过 flipped 属性翻面。在 prefers-reduced-motion 下两面以淡入淡出切换。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/flashcard/wc/reduced-disabled.html

```html
<div
  style="
    display: grid;
    gap: 16px;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  "
>
  <minerva-flashcard
    front="Disabled"
    back="Never shown by a click"
    disabled
    min-height="140"
  ></minerva-flashcard>
  <minerva-flashcard
    id="manual"
    front='flip-on-click="false"'
    back="Flipped by the button below"
    flip-on-click="false"
    front-label=""
    back-label=""
    min-height="140"
  >
    <minerva-button slot="footer" size="small" id="toggle"
      >Reveal answer</minerva-button
    >
  </minerva-flashcard>
</div>

```

### apps/docs/src/docs/pages/flashcard/wc/reduced-disabled.ts

```tsx
// With flip-on-click="false" the card is not a button: only the flipped
// property (or attribute) turns it. Under prefers-reduced-motion every card
// crossfades instead of rotating.
export function setup(root: HTMLElement) {
  const card = root.querySelector<HTMLElement & { flipped: boolean }>(
    "#manual",
  )!;
  const toggle = root.querySelector<HTMLElement>("#toggle")!;
  const onClick = () => {
    card.flipped = !card.flipped;
    toggle.textContent = card.flipped ? "Hide answer" : "Reveal answer";
  };
  toggle.addEventListener("click", onClick);
  return () => toggle.removeEventListener("click", onClick);
}

```

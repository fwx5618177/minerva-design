# Flashcard 抽认卡

在问题与答案之间翻转的双面学习卡片，适用于间隔重复复习。

Package: minerva-design@1.22.2

Renderer: angular

Locale: zh

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

## Flashcard

Support: beta

Native Angular: MnFlashcard. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnFlashcard"
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
    "required": false,
    "source": "packages/angular/src/components/data/flashcard.ts"
  },
  {
    "name": "back",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/data/flashcard.ts"
  },
  {
    "name": "frontLabel",
    "typeText": "string | null | undefined",
    "required": false,
    "source": "packages/angular/src/components/data/flashcard.ts"
  },
  {
    "name": "backLabel",
    "typeText": "string | null | undefined",
    "required": false,
    "source": "packages/angular/src/components/data/flashcard.ts"
  },
  {
    "name": "hint",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/data/flashcard.ts"
  },
  {
    "name": "showHint",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/data/flashcard.ts"
  },
  {
    "name": "flipped",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/data/flashcard.ts"
  },
  {
    "name": "flipOnClick",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/data/flashcard.ts"
  },
  {
    "name": "disabled",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/data/flashcard.ts"
  },
  {
    "name": "axis",
    "typeText": "FlashcardAxis",
    "required": false,
    "source": "packages/angular/src/components/data/flashcard.ts"
  },
  {
    "name": "variant",
    "typeText": "FlashcardVariant",
    "required": false,
    "source": "packages/angular/src/components/data/flashcard.ts"
  },
  {
    "name": "size",
    "typeText": "FlashcardSize",
    "required": false,
    "source": "packages/angular/src/components/data/flashcard.ts"
  },
  {
    "name": "minHeight",
    "typeText": "string | number",
    "required": false,
    "source": "packages/angular/src/components/data/flashcard.ts"
  },
  {
    "name": "aria-label",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/data/flashcard.ts"
  }
]
```

### events

```json
[
  {
    "name": "flippedChange",
    "typeText": "boolean",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "[mnFront]"
  },
  {
    "name": "[mnBack]"
  },
  {
    "name": "[mnFooter]"
  }
]
```

### bindings

```json
[
  {
    "prop": "flipped",
    "event": "flippedChange",
    "syntax": "[(flipped)]"
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

## Example: Flip a study card

Click the card or press Enter / Space on it to flip it; the hidden face is inert and the back is announced politely.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnFlashcard } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnFlashcard],
  template: `
<div style="max-width:420px"><mn-flashcard front="What is the capital of Australia?" back="Canberra" showHint/></div>
  `,
})
export class Example {

}

```

## Example: Review with rating buttons

[(flipped)] holds the face; project the faces with [mnFront] / [mnBack] and the rating buttons with [mnFooter] (below the card, not flipped).

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnFlashcard, MnButton } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnFlashcard, MnButton],
  template: `
<div style="display:grid;gap:12px;max-width:420px"><mn-flashcard [(flipped)]="flipped" backLabel="Definition" [frontLabel]="'Card ' + (index + 1) + ' / ' + deck.length"><strong mnFront style="font-size:1.5rem">{{deck[index]?.front}}</strong><span mnBack>{{deck[index]?.back}}</span><div mnFooter style="display:flex;gap:8px">@if (flipped) { @for (rating of ratings; track rating) {<button mnButton size="small" [variant]="rating === 'Good' ? 'solid' : 'outline'" (click)="last = deck[index]?.front + ': ' + rating; flipped = false; index = (index + 1) % deck.length">{{rating}}</button>} } @else {<button mnButton size="small" (click)="flipped = true">Show answer</button>}</div></mn-flashcard><output>{{last || 'Flip the card, then rate it.'}}</output></div>
  `,
})
export class Example {
  flipped = false;
  index = 0;
  last = "";
  ratings = ["Again", "Hard", "Good", "Easy"];
  deck = [
  {
    "front": "ephemeral",
    "back": "Lasting for a very short time"
  },
  {
    "front": "ubiquitous",
    "back": "Present, appearing or found everywhere"
  },
  {
    "front": "laconic",
    "back": "Using very few words"
  }
];
}

```

## Example: Axis, variants and disabled

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnFlashcard } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnFlashcard],
  template: `
<div style="display:grid;gap:16px;grid-template-columns:repeat(auto-fill,minmax(200px,1fr))"><mn-flashcard variant="outline" axis="x" front="outline · axis x" back="Flips vertically" [minHeight]="140"/><mn-flashcard variant="filled" size="small" front="filled · small" back="Less padding" [minHeight]="140"/><mn-flashcard disabled front="Disabled" back="Never shown" [minHeight]="140"/></div>
  `,
})
export class Example {

}

```

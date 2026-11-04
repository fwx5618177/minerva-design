# AnswerSheet

Un navigateur de questions pour les entraînements et les examens : des pastilles numérotées groupées par section, indiquant si chaque question est sans réponse, répondue, correcte, incorrecte ou passée, avec un marqueur de relecture et la question courante mise en évidence.

Package: minerva-design@1.20.2

Renderer: angular

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.2",
  "sourceCommit": "8d5d0df3644b1fa1c267b3dd6809b0e7eb1ce75b",
  "sourceDigest": "sha256:2862a9e3a864c9423aed5d287db6fac7e8ddf58b9f5d144c61e7ff4a2630890e",
  "referenceSourceDigest": "sha256:b329acf9d5eb6cf4b4b42169ce925c67b033f581b616664bf07fc6d664de45f0"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.2/types.json) or getType() from minerva-design/contracts.

## Documentation

## AnswerSheet

Support: beta

Native Angular: MnAnswerSheet. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnAnswerSheet"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "items",
    "typeText": "readonly AnswerSheetItem[]",
    "required": false,
    "source": "packages/angular/src/components/data/answer-sheet.ts"
  },
  {
    "name": "groups",
    "typeText": "readonly AnswerSheetGroup[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/data/answer-sheet.ts"
  },
  {
    "name": "value",
    "typeText": "string | null",
    "required": false,
    "source": "packages/angular/src/components/data/answer-sheet.ts"
  },
  {
    "name": "size",
    "typeText": "AnswerSheetSize",
    "required": false,
    "source": "packages/angular/src/components/data/answer-sheet.ts"
  },
  {
    "name": "layout",
    "typeText": "AnswerSheetLayout",
    "required": false,
    "source": "packages/angular/src/components/data/answer-sheet.ts"
  },
  {
    "name": "columns",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/data/answer-sheet.ts"
  },
  {
    "name": "showLegend",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/data/answer-sheet.ts"
  },
  {
    "name": "showSummary",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/data/answer-sheet.ts"
  },
  {
    "name": "getItemLabel",
    "typeText": "((item: AnswerSheetItem, index: number) => string) | undefined",
    "required": false,
    "source": "packages/angular/src/components/data/answer-sheet.ts"
  },
  {
    "name": "disabled",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/data/answer-sheet.ts"
  },
  {
    "name": "aria-label",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/data/answer-sheet.ts"
  }
]
```

### events

```json
[
  {
    "name": "valueChange",
    "typeText": "string | null",
    "required": false
  }
]
```

### bindings

```json
[
  {
    "prop": "value",
    "event": "valueChange",
    "syntax": "[(value)]"
  }
]
```

## CSS variables

```json
{
  "css:AnswerSheet": {
    "kind": "cssVars",
    "source": "react/src/components/AnswerSheet",
    "vars": [
      {
        "name": "--answer-sheet-gap",
        "description": "Space between the pills (defaults to --space-2; --space-1-5 with size=\"small\")"
      },
      {
        "name": "--answer-sheet-item-size",
        "description": "Minimum width and height of a pill (defaults to 2rem; 1.75rem with size=\"small\")"
      },
      {
        "name": "--answer-sheet-radius",
        "description": "Corner radius of the pills (defaults to --radius-md)"
      },
      {
        "name": "--answer-sheet-item-background",
        "description": "Background of an unanswered pill"
      },
      {
        "name": "--answer-sheet-answered-background",
        "description": "Background of an answered pill (defaults to --primary-color-subtle)"
      },
      {
        "name": "--answer-sheet-answered-color",
        "description": "Text color of an answered pill"
      },
      {
        "name": "--answer-sheet-correct-background",
        "description": "Background of a correct pill (defaults to --success-color-subtle)"
      },
      {
        "name": "--answer-sheet-correct-color",
        "description": "Text color of a correct pill"
      },
      {
        "name": "--answer-sheet-wrong-background",
        "description": "Background of a wrong pill (defaults to --danger-color-subtle)"
      },
      {
        "name": "--answer-sheet-wrong-color",
        "description": "Text color of a wrong pill"
      },
      {
        "name": "--answer-sheet-current-background",
        "description": "Background of the current pill (defaults to --primary-color)"
      },
      {
        "name": "--answer-sheet-current-color",
        "description": "Text color of the current pill"
      },
      {
        "name": "--answer-sheet-flag-color",
        "description": "Color of the flag dot (defaults to --warning-color)"
      },
      {
        "name": "--answer-sheet-title-color",
        "description": "Text color of the group titles and the summary"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Jump between questions

[(value)] holds the key of the current question (aria-current=step). One tab stop: arrows and Home / End move the focus, Enter / Space select.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnAnswerSheet } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnAnswerSheet],
  template: `
<mn-answer-sheet [items]="items" [(value)]="value"/><output>Current question: {{value}}</output>
  `,
})
export class Example {
  value: string | null = "q6";
  items: import('minerva-design/angular').AnswerSheetItem[] = [
  {
    "key": "q1",
    "status": "answered"
  },
  {
    "key": "q2",
    "status": "answered"
  },
  {
    "key": "q3",
    "status": "answered"
  },
  {
    "key": "q4",
    "status": "answered"
  },
  {
    "key": "q5",
    "status": "answered"
  },
  {
    "key": "q6",
    "status": "unanswered"
  },
  {
    "key": "q7",
    "status": "unanswered"
  },
  {
    "key": "q8",
    "status": "unanswered"
  },
  {
    "key": "q9",
    "status": "unanswered"
  },
  {
    "key": "q10",
    "status": "unanswered"
  },
  {
    "key": "q11",
    "status": "unanswered"
  },
  {
    "key": "q12",
    "status": "unanswered"
  }
];
}

```

## Example: Sections, statuses and legend

groups titles the sections; showSummary counts the answered questions and showLegend explains the statuses present.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnAnswerSheet } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnAnswerSheet],
  template: `
<mn-answer-sheet [items]="items" [groups]="groups" [(value)]="value" showSummary showLegend aria-label="Review questions"/>
  `,
})
export class Example {
  value: string | null = "s3";
  groups: import('minerva-design/angular').AnswerSheetGroup[] = [
  {
    "key": "single",
    "title": "Single choice"
  },
  {
    "key": "short",
    "title": "Short answer"
  }
];
  items: import('minerva-design/angular').AnswerSheetItem[] = [
  {
    "key": "s1",
    "group": "single",
    "status": "correct"
  },
  {
    "key": "s2",
    "group": "single",
    "status": "correct"
  },
  {
    "key": "s3",
    "group": "single",
    "status": "wrong",
    "flagged": true
  },
  {
    "key": "s4",
    "group": "single",
    "status": "skipped"
  },
  {
    "key": "a1",
    "group": "short",
    "status": "answered"
  },
  {
    "key": "a2",
    "group": "short"
  },
  {
    "key": "a3",
    "group": "short",
    "disabled": true
  }
];
}

```

## Example: Scroll layout, sizes and columns

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnAnswerSheet } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnAnswerSheet],
  template: `
<mn-answer-sheet [items]="items" layout="scroll" size="small" aria-label="Scrolling sheet"/><mn-answer-sheet [items]="items" columns="5" aria-label="Five columns"/><mn-answer-sheet [items]="items" disabled aria-label="Disabled sheet"/>
  `,
})
export class Example {
  items: import('minerva-design/angular').AnswerSheetItem[] = [
  {
    "key": "q1",
    "status": "answered"
  },
  {
    "key": "q2",
    "status": "answered"
  },
  {
    "key": "q3",
    "status": "answered"
  },
  {
    "key": "q4",
    "status": "answered"
  },
  {
    "key": "q5",
    "status": "unanswered"
  },
  {
    "key": "q6",
    "status": "unanswered"
  },
  {
    "key": "q7",
    "status": "unanswered"
  },
  {
    "key": "q8",
    "status": "unanswered"
  },
  {
    "key": "q9",
    "status": "unanswered"
  },
  {
    "key": "q10",
    "status": "unanswered"
  }
];
}

```

# AnswerSheet

Un navigateur de questions pour les entraînements et les examens : des pastilles numérotées groupées par section, indiquant si chaque question est sans réponse, répondue, correcte, incorrecte ou passée, avec un marqueur de relecture et la question courante mise en évidence.

Package: minerva-design@1.20.4

Renderer: wc

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.4",
  "sourceCommit": "c389776dc1aa3bf80277d9c47f2c62d8f235e947",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:96f9f31e7015b805e8eece3c05731306a461013443150c08b7b7a91a3bfc1bb6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.4/types.json) or getType() from minerva-design/contracts.

## Documentation

## AnswerSheet

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/answer-sheet",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "value",
    "typeText": "string | undefined",
    "attribute": "value",
    "required": false
  },
  {
    "name": "size",
    "typeText": "\"small\" | \"medium\"",
    "attribute": "size",
    "required": false
  },
  {
    "name": "layout",
    "typeText": "\"wrap\" | \"scroll\"",
    "attribute": "layout",
    "required": false
  },
  {
    "name": "columns",
    "typeText": "number | undefined",
    "attribute": "columns",
    "required": false
  },
  {
    "name": "showLegend",
    "typeText": "boolean",
    "attribute": "show-legend",
    "required": false
  },
  {
    "name": "showSummary",
    "typeText": "boolean",
    "attribute": "show-summary",
    "required": false
  },
  {
    "name": "disabled",
    "typeText": "boolean",
    "attribute": "disabled",
    "required": false
  },
  {
    "name": "items",
    "typeText": "readonly AnswerSheetItem[]",
    "required": false
  },
  {
    "name": "groups",
    "typeText": "readonly AnswerSheetGroup[] | undefined",
    "required": false
  },
  {
    "name": "getItemLabel",
    "typeText": "(item: AnswerSheetItem, index: number) => string | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "minerva-change",
    "typeText": "CustomEvent<{ value: string; }>",
    "detailType": {
      "typeText": "{ value: string; }",
      "typeRef": "type:8400984b99ae8c111f2c"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": false,
    "description": "The user selected a question (`detail: { value }`, its key)"
  }
]
```

## API

```json
{
  "wc:minerva-answer-sheet": {
    "kind": "element",
    "source": "web-components/src/components/answer-sheet/answer-sheet.ts",
    "className": "MinervaAnswerSheet",
    "summary": "A question navigator: numbered pills with statuses, grouped by section.",
    "description": "A grid of numbered pills to jump between the questions of a practice or exam session (`<AnswerSheet>` of React): a `nav` landmark of buttons, grouped by section (`groups`), each with a status (unanswered, answered, correct, wrong, skipped) and an optional flag. The current question carries `aria-current=\"step\"`. Keyboard: one tab stop (roving `tabindex`); ArrowLeft / ArrowRight move in order (RTL swaps them), ArrowUp / ArrowDown by a row, Home / End to the ends, Enter / Space select. Selecting a question updates `value` and fires `minerva-change`.",
    "properties": [
      {
        "name": "value",
        "attribute": "value",
        "type": "string | undefined",
        "description": "Key of the current question"
      },
      {
        "name": "size",
        "attribute": "size",
        "type": "\"small\" | \"medium\"",
        "default": "\"medium\"",
        "description": "Pill density"
      },
      {
        "name": "layout",
        "attribute": "layout",
        "type": "\"wrap\" | \"scroll\"",
        "default": "\"wrap\"",
        "description": "\"wrap\" wraps the pills on several rows; \"scroll\" keeps a single horizontally scrolling row"
      },
      {
        "name": "columns",
        "attribute": "columns",
        "type": "number | undefined",
        "description": "Fixed number of columns (ArrowUp / ArrowDown move by a row); ignored with layout=\"scroll\""
      },
      {
        "name": "showLegend",
        "attribute": "show-legend",
        "type": "boolean",
        "default": "false",
        "description": "Shows a legend of the statuses present (and of the flag)"
      },
      {
        "name": "showSummary",
        "attribute": "show-summary",
        "type": "boolean",
        "default": "false",
        "description": "Shows the number of answered questions (\"12 / 20 answered\")"
      },
      {
        "name": "disabled",
        "attribute": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disables the whole sheet"
      },
      {
        "name": "items",
        "type": "readonly AnswerSheetItem[]",
        "default": "[]",
        "description": "The questions, in order"
      },
      {
        "name": "groups",
        "type": "readonly AnswerSheetGroup[] | undefined",
        "description": "Titled sections, in display order (items render under the group whose key matches `item.group`)"
      },
      {
        "name": "getItemLabel",
        "type": "(item: AnswerSheetItem, index: number) => string | undefined",
        "description": "Accessible name of a pill, from the item and its display index (default: \"Question <n>, <status>\", localized)"
      }
    ],
    "methods": [
      {
        "name": "focus",
        "signature": "(options?: FocusOptions) => void"
      }
    ],
    "events": [
      {
        "name": "minerva-change",
        "description": "The user selected a question (`detail: { value }`, its key)"
      }
    ],
    "slots": [],
    "parts": [
      {
        "name": "root",
        "description": "The outermost element (a `nav` landmark)"
      },
      {
        "name": "total",
        "description": "The \"12 / 20 answered\" summary (with `show-summary`)"
      },
      {
        "name": "group",
        "description": "A section of questions (`role=group` when titled)"
      },
      {
        "name": "group-label",
        "description": "The title of a section"
      },
      {
        "name": "grid",
        "description": "The element holding the pills of a section"
      },
      {
        "name": "item",
        "description": "A question pill (a button)"
      },
      {
        "name": "item--current",
        "description": "Item state of `item`: the current question"
      },
      {
        "name": "item--disabled",
        "description": "Item state of `item`: disabled"
      },
      {
        "name": "item--flagged",
        "description": "Item state of `item`: flagged"
      },
      {
        "name": "item--status-unanswered",
        "description": "Item state of `item`: status unanswered"
      },
      {
        "name": "item--status-answered",
        "description": "Item state of `item`: status answered"
      },
      {
        "name": "item--status-correct",
        "description": "Item state of `item`: status correct"
      },
      {
        "name": "item--status-wrong",
        "description": "Item state of `item`: status wrong"
      },
      {
        "name": "item--status-skipped",
        "description": "Item state of `item`: status skipped"
      },
      {
        "name": "indicator",
        "description": "The flag dot of a flagged question"
      },
      {
        "name": "legend",
        "description": "The legend of the statuses (with `show-legend`)"
      },
      {
        "name": "legend-item",
        "description": "An entry of the legend"
      }
    ],
    "cssProperties": [
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

## Example: Utilisation de base

items est une propriété ; value (la clé de la question courante) est un attribut et minerva-change signale la clé sélectionnée. Un seul arrêt de tabulation : les flèches et Début / Fin déplacent le focus, Entrée / Espace sélectionnent.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/answer-sheet/wc/basic.html

```html
<div style="display: grid; gap: 12px; max-width: 420px">
  <minerva-answer-sheet id="sheet" value="q6"></minerva-answer-sheet>
  <output id="current">Current question: 6</output>
</div>

```

### apps/docs/src/docs/pages/answer-sheet/wc/basic.ts

```tsx
// items is a property (an array of { key, status?, label?, flagged?,
// disabled?, group? }); value is the key of the current question and
// minerva-change reports the selected one. One tab stop: the arrow keys and
// Home / End move the focus, Enter / Space select.
type AnswerSheetElement = HTMLElement & {
  items: { key: string; status?: string }[];
};

export function setup(root: HTMLElement) {
  const sheet = root.querySelector<AnswerSheetElement>("#sheet")!;
  const output = root.querySelector<HTMLOutputElement>("#current")!;
  sheet.items = Array.from({ length: 12 }, (_, i) => ({
    key: `q${i + 1}`,
    status: i < 5 ? "answered" : "unanswered",
  }));
  const onChange = (e: Event) => {
    const { value } = (e as CustomEvent<{ value: string }>).detail;
    output.value = `Current question: ${value.slice(1)}`;
  };
  sheet.addEventListener("minerva-change", onChange);
  return () => sheet.removeEventListener("minerva-change", onChange);
}

```

## Example: Sections, statuts et légende

La propriété groups donne un titre aux sections ; show-summary et show-legend ajoutent le compte des réponses et une légende des statuts présents. Les pastilles exposent ::part(item item--status-wrong), item--flagged, item--current ...

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/answer-sheet/wc/groups.html

```html
<div style="display: grid; gap: 12px; max-width: 420px">
  <minerva-answer-sheet
    id="sheet"
    value="s3"
    show-summary
    show-legend
    aria-label="Review questions"
  ></minerva-answer-sheet>
  <output id="current">Reviewing: s3</output>
</div>

```

### apps/docs/src/docs/pages/answer-sheet/wc/groups.ts

```tsx
// groups (a property) titles the sections: items render under the group
// whose key matches item.group. show-summary and show-legend add the
// "answered" count and a legend of the statuses present.
type AnswerSheetElement = HTMLElement & {
  items: Record<string, unknown>[];
  groups: { key: string; title: string }[];
};

export function setup(root: HTMLElement) {
  const sheet = root.querySelector<AnswerSheetElement>("#sheet")!;
  const output = root.querySelector<HTMLOutputElement>("#current")!;
  sheet.groups = [
    { key: "single", title: "Single choice" },
    { key: "multiple", title: "Multiple choice" },
    { key: "short", title: "Short answer" },
  ];
  sheet.items = [
    { key: "s1", group: "single", status: "correct" },
    { key: "s2", group: "single", status: "correct" },
    { key: "s3", group: "single", status: "wrong", flagged: true },
    { key: "s4", group: "single", status: "correct" },
    { key: "s5", group: "single", status: "skipped" },
    { key: "s6", group: "single", status: "correct" },
    { key: "m1", group: "multiple", status: "wrong" },
    { key: "m2", group: "multiple", status: "correct" },
    { key: "m3", group: "multiple", status: "answered", flagged: true },
    { key: "a1", group: "short", status: "answered" },
    { key: "a2", group: "short" },
    { key: "a3", group: "short", disabled: true },
  ];
  const onChange = (e: Event) => {
    const { value } = (e as CustomEvent<{ value: string }>).detail;
    output.value = `Reviewing: ${value}`;
  };
  sheet.addEventListener("minerva-change", onChange);
  return () => sheet.removeEventListener("minerva-change", onChange);
}

```

## Example: Rangée défilante

layout="scroll" garde une seule rangée défilant horizontalement (aussi l'état personnalisé :state(layout-scroll)).

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/answer-sheet/wc/scroll.html

```html
<div style="display: grid; gap: 12px; width: 100%; max-width: 360px">
  <minerva-answer-sheet
    id="sheet"
    value="q16"
    layout="scroll"
    size="small"
  ></minerva-answer-sheet>
  <output id="current">Current question: 16</output>
</div>

```

### apps/docs/src/docs/pages/answer-sheet/wc/scroll.ts

```tsx
// layout="scroll" keeps a single horizontally scrolling row (also the
// :state(layout-scroll) custom state).
type AnswerSheetElement = HTMLElement & { items: Record<string, unknown>[] };

export function setup(root: HTMLElement) {
  const sheet = root.querySelector<AnswerSheetElement>("#sheet")!;
  const output = root.querySelector<HTMLOutputElement>("#current")!;
  sheet.items = Array.from({ length: 40 }, (_, i) => ({
    key: `q${i + 1}`,
    status: i < 14 ? "answered" : i === 14 ? "skipped" : "unanswered",
    flagged: i === 8,
  }));
  const onChange = (e: Event) => {
    const { value } = (e as CustomEvent<{ value: string }>).detail;
    output.value = `Current question: ${value.slice(1)}`;
  };
  sheet.addEventListener("minerva-change", onChange);
  return () => sheet.removeEventListener("minerva-change", onChange);
}

```

## Example: Tailles, colonnes et désactivation

size="small", une grille fixe avec columns="5" (Haut / Bas changent de rangée) et une feuille désactivée.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/answer-sheet/wc/sizes.html

```html
<div style="display: grid; gap: 24px; max-width: 420px">
  <minerva-answer-sheet
    size="small"
    value="q5"
    aria-label="Small sheet"
  ></minerva-answer-sheet>
  <minerva-answer-sheet
    columns="5"
    value="q5"
    aria-label="Five columns"
  ></minerva-answer-sheet>
  <minerva-answer-sheet
    disabled
    aria-label="Disabled sheet"
  ></minerva-answer-sheet>
</div>

```

### apps/docs/src/docs/pages/answer-sheet/wc/sizes.ts

```tsx
// size="small" uses smaller pills; columns="5" lays them out in a fixed
// grid (ArrowUp / ArrowDown move by a row); disabled blocks selection.
type AnswerSheetElement = HTMLElement & { items: Record<string, unknown>[] };

export function setup(root: HTMLElement) {
  const items = Array.from({ length: 10 }, (_, i) => ({
    key: `q${i + 1}`,
    status: i < 4 ? "answered" : "unanswered",
  }));
  for (const sheet of root.querySelectorAll<AnswerSheetElement>(
    "minerva-answer-sheet",
  )) {
    sheet.items = items;
  }
}

```

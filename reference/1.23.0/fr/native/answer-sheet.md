# AnswerSheet

Un navigateur de questions pour les entraînements et les examens : des pastilles numérotées groupées par section, indiquant si chaque question est sans réponse, répondue, correcte, incorrecte ou passée, avec un marqueur de relecture et la question courante mise en évidence.

Package: minerva-design@1.23.0

Renderer: native

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "19d3efc34af8ba4e23df0f24d9fbb0a587e1b452",
  "sourceDigest": "sha256:2005faebbf738765fe81a5c952fa47a51311aa5d05e3220f71c542b8b1fe369b",
  "referenceSourceDigest": "sha256:ec29900df0d5b5c8d741436acb4a250ec29e5f40ce1f4110def33ac2d66baaa5"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

## Documentation

## AnswerSheet

Support: beta

Pressable pills in wrapping rows (layout=scroll: a horizontal ScrollView that centres the current pill with scrollTo after layout); no arrow-key roving focus on native

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "AnswerSheet"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "items",
    "source": "packages/native/src/components/AnswerSheet/AnswerSheet.tsx",
    "kind": "array",
    "typeText": "readonly AnswerSheetItem[]",
    "typeRef": "type:70ea9cf673375eea179f",
    "required": true,
    "description": "The questions, in order"
  },
  {
    "name": "groups",
    "source": "packages/native/src/components/AnswerSheet/AnswerSheet.tsx",
    "kind": "array",
    "typeText": "readonly AnswerSheetGroup[] | undefined",
    "typeRef": "type:3a7615c74d545eeaf31d",
    "required": false,
    "description": "Titled sections, in display order (items render under the group whose key matches `item.group`)"
  },
  {
    "name": "value",
    "source": "packages/native/src/components/AnswerSheet/AnswerSheet.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Key of the current question (controlled; pair with onChange)"
  },
  {
    "name": "defaultValue",
    "source": "packages/native/src/components/AnswerSheet/AnswerSheet.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Key of the initially current question (uncontrolled)"
  },
  {
    "name": "size",
    "source": "packages/native/src/components/AnswerSheet/AnswerSheet.tsx",
    "kind": "enum",
    "values": [
      "medium",
      "small"
    ],
    "typeText": "AnswerSheetSize | undefined",
    "typeRef": "type:345531373672f1843ddb",
    "default": "medium",
    "required": false,
    "description": "Density of the pills"
  },
  {
    "name": "layout",
    "source": "packages/native/src/components/AnswerSheet/AnswerSheet.tsx",
    "kind": "enum",
    "values": [
      "scroll",
      "wrap"
    ],
    "typeText": "AnswerSheetLayout | undefined",
    "typeRef": "type:26401bff64a3d0ea3cb6",
    "default": "wrap",
    "required": false,
    "description": "\"wrap\" wraps the pills on several rows; \"scroll\" keeps a single horizontally scrolling row"
  },
  {
    "name": "columns",
    "source": "packages/native/src/components/AnswerSheet/AnswerSheet.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Fixed number of columns (equal-width pills); ignored with layout=\"scroll\""
  },
  {
    "name": "showLegend",
    "source": "packages/native/src/components/AnswerSheet/AnswerSheet.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows a legend of the statuses present (and of the flag)"
  },
  {
    "name": "showSummary",
    "source": "packages/native/src/components/AnswerSheet/AnswerSheet.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows the number of answered questions (\"12 / 20 answered\")"
  },
  {
    "name": "getItemLabel",
    "source": "packages/native/src/components/AnswerSheet/AnswerSheet.tsx",
    "kind": "function",
    "typeText": "((item: AnswerSheetItem, index: number) => string) | undefined",
    "typeRef": "type:2f9a43f9177bcb209fd1",
    "parameters": [
      {
        "name": "item",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "AnswerSheetItem",
        "typeRef": "type:b92414970fdc9bd1cca3"
      },
      {
        "name": "index",
        "position": 1,
        "required": true,
        "rest": false,
        "typeText": "number",
        "typeRef": "type:7d1137535c313783dadd"
      }
    ],
    "returnType": {
      "typeText": "string",
      "typeRef": "type:e15e314d298fc0d116fc"
    },
    "required": false,
    "description": "Accessible name of a pill; receives the item and its display index"
  },
  {
    "name": "disabled",
    "source": "packages/native/src/components/AnswerSheet/AnswerSheet.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Disables the whole sheet"
  }
]
```

### events

```json
[
  {
    "name": "onChange",
    "source": "packages/native/src/components/AnswerSheet/AnswerSheet.tsx",
    "kind": "function",
    "typeText": "((key: string) => void) | undefined",
    "typeRef": "type:b97bf086cfd499544787",
    "parameters": [
      {
        "name": "key",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "string",
        "typeRef": "type:e15e314d298fc0d116fc"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called with the key of the selected question"
  }
]
```

### bindings

```json
[
  {
    "prop": "value",
    "event": "onChange",
    "syntax": "value={value} onChange={handler}"
  }
]
```

## API

```json
{
  "native:AnswerSheetProps": {
    "source": "native/src/components/AnswerSheet/AnswerSheet.tsx",
    "kind": "interface",
    "extends": [
      "Omit<ViewProps, \"style\" | \"children\">"
    ],
    "props": [
      {
        "name": "items",
        "type": "readonly AnswerSheetItem[]",
        "required": true,
        "description": "The questions, in order"
      },
      {
        "name": "groups",
        "type": "readonly AnswerSheetGroup[]",
        "required": false,
        "description": "Titled sections, in display order (items render under the group whose key matches `item.group`)"
      },
      {
        "name": "value",
        "type": "string",
        "required": false,
        "description": "Key of the current question (controlled; pair with onChange)"
      },
      {
        "name": "defaultValue",
        "type": "string",
        "required": false,
        "description": "Key of the initially current question (uncontrolled)"
      },
      {
        "name": "onChange",
        "type": "(key: string) => void",
        "required": false,
        "description": "Called with the key of the selected question"
      },
      {
        "name": "size",
        "type": "AnswerSheetSize",
        "required": false,
        "default": "\"medium\"",
        "description": "Density of the pills"
      },
      {
        "name": "layout",
        "type": "AnswerSheetLayout",
        "required": false,
        "default": "\"wrap\"",
        "description": "\"wrap\" wraps the pills on several rows; \"scroll\" keeps a single horizontally scrolling row"
      },
      {
        "name": "columns",
        "type": "number",
        "required": false,
        "description": "Fixed number of columns (equal-width pills); ignored with layout=\"scroll\""
      },
      {
        "name": "showLegend",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Shows a legend of the statuses present (and of the flag)"
      },
      {
        "name": "showSummary",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Shows the number of answered questions (\"12 / 20 answered\")"
      },
      {
        "name": "getItemLabel",
        "type": "(item: AnswerSheetItem, index: number) => string",
        "required": false,
        "default": "\"Question <n>, <status>\" (translated)",
        "description": "Accessible name of a pill; receives the item and its display index"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables the whole sheet"
      },
      {
        "name": "style",
        "type": "StyleProp<ViewStyle>",
        "required": false,
        "description": "Style of the sheet"
      }
    ]
  },
  "native:AnswerSheetItem": {
    "source": "native/src/components/AnswerSheet/AnswerSheet.tsx",
    "description": "A question of an AnswerSheet",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "key",
        "type": "string",
        "required": true,
        "description": "Unique key of the question (the value of the sheet)"
      },
      {
        "name": "label",
        "type": "string",
        "required": false,
        "description": "Visible label; defaults to its number across all the groups"
      },
      {
        "name": "status",
        "type": "AnswerSheetStatus",
        "required": false,
        "default": "\"unanswered\"",
        "description": "Status of the question"
      },
      {
        "name": "flagged",
        "type": "boolean",
        "required": false,
        "description": "Flags the question for review (a warning dot in a corner)"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "description": "The question can't be selected"
      },
      {
        "name": "group",
        "type": "string",
        "required": false,
        "description": "Key of its group; items without a known group render first, untitled"
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

Une question courante contrôlée (value / onChange). La feuille est un repère nav de boutons ; la pastille courante porte aria-current="step". Un seul arrêt de tabulation : les flèches et Début / Fin déplacent le focus, Entrée / Espace sélectionnent.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/answer-sheet/native/basic.tsx

```tsx
import { useState } from "react";
import { Text, View } from "react-native";
import { AnswerSheet, type AnswerSheetItem } from "minerva-design/native";

const groups = [
  { key: "single", title: "Single choice" },
  { key: "short", title: "Short answer" },
];
const items: AnswerSheetItem[] = [
  { key: "s1", group: "single", status: "correct" },
  { key: "s2", group: "single", status: "wrong", flagged: true },
  { key: "s3", group: "single", status: "correct" },
  { key: "s4", group: "single", status: "skipped" },
  { key: "s5", group: "single", status: "answered" },
  { key: "a1", group: "short", status: "answered" },
  { key: "a2", group: "short" },
  { key: "a3", group: "short" },
];

export default function Basic() {
  const [value, setValue] = useState("s2");
  return (
    <View style={{ gap: 12 }}>
      <AnswerSheet
        items={items}
        groups={groups}
        value={value}
        onChange={setValue}
        showSummary
        showLegend
      />
      <Text>Current: {value}</Text>
    </View>
  );
}

```

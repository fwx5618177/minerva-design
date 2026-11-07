# AnswerSheet 答题卡

练习与考试场景中的题号导航：按题型分组的编号胶囊，标示每题未作答、已作答、正确、错误或已跳过，支持标记待复查，并高亮当前题目。

Package: minerva-design@1.22.1

Renderer: taro

Locale: zh

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

## AnswerSheet

Support: beta

Numbered question pills grouped by section with unanswered/answered/correct/wrong/skipped statuses, flag dot, controlled/uncontrolled current question (aria-current=step), wrap/scroll layouts, fixed columns, translated item labels, summary and legend, and two sizes. Native touch/view semantics differ from browser DOM semantics. Native devices do not expose document focus, inert, browser portals or File input APIs; H5 capabilities are specified separately. Device-runtime validation is still required. H5 supports arrow keys and Home/End across the pills (disabled pills are skipped; no row-wise ArrowUp/ArrowDown); native hosts use tap selection. layout=scroll centres the current pill through the ScrollView scrollLeft, measured with createSelectorQuery after each change. Component tests, H5 tests in happy-dom and the official Taro WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/taro",
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
    "source": "packages/taro/src/answer-sheet.tsx",
    "kind": "array",
    "typeText": "readonly AnswerSheetItem[]",
    "typeRef": "type:26922a03a3dd16257527",
    "required": true,
    "description": "The questions, in order"
  },
  {
    "name": "groups",
    "source": "packages/taro/src/answer-sheet.tsx",
    "kind": "array",
    "typeText": "readonly AnswerSheetGroup[] | undefined",
    "typeRef": "type:f6f69fb0a466cd4be84f",
    "required": false,
    "description": "Titled sections, in display order"
  },
  {
    "name": "value",
    "source": "packages/taro/src/answer-sheet.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Key of the current question (controlled)"
  },
  {
    "name": "defaultValue",
    "source": "packages/taro/src/answer-sheet.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Key of the initially current question (uncontrolled)"
  },
  {
    "name": "size",
    "source": "packages/taro/src/answer-sheet.tsx",
    "kind": "enum",
    "values": [
      "medium",
      "small"
    ],
    "typeText": "\"small\" | \"medium\" | undefined",
    "typeRef": "type:f41fddf6eaf0d34924a7",
    "required": false,
    "description": "Density of the pills (default \"medium\")"
  },
  {
    "name": "layout",
    "source": "packages/taro/src/answer-sheet.tsx",
    "kind": "enum",
    "values": [
      "scroll",
      "wrap"
    ],
    "typeText": "\"wrap\" | \"scroll\" | undefined",
    "typeRef": "type:e66fb75bd2f403db2676",
    "required": false,
    "description": "\"wrap\" (default) or \"scroll\" (a single horizontally scrolling row)"
  },
  {
    "name": "columns",
    "source": "packages/taro/src/answer-sheet.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Fixed number of columns; ignored with layout=\"scroll\""
  },
  {
    "name": "showLegend",
    "source": "packages/taro/src/answer-sheet.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Shows a legend of the statuses present (default false)"
  },
  {
    "name": "showSummary",
    "source": "packages/taro/src/answer-sheet.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Shows \"12 / 20 answered\" (default false)"
  },
  {
    "name": "getItemLabel",
    "source": "packages/taro/src/answer-sheet.tsx",
    "kind": "function",
    "typeText": "((item: AnswerSheetItem, index: number) => string) | undefined",
    "typeRef": "type:e09811cc588182ac8a7a",
    "parameters": [
      {
        "name": "item",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "AnswerSheetItem",
        "typeRef": "type:418cbe01dd0352efbe98"
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
    "description": "Accessible name of a pill (default \"Question <n>, <status>\", translated)"
  },
  {
    "name": "disabled",
    "source": "packages/taro/src/answer-sheet.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Disables the whole sheet (default false)"
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
    "name": "onChange",
    "source": "packages/taro/src/answer-sheet.tsx",
    "kind": "function",
    "typeText": "((key: string) => void) | undefined",
    "typeRef": "type:e73cbd717caeac4f0b16",
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

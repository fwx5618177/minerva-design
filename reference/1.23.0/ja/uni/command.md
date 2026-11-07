# Command コマンドパレット

モーダル内の検索可能なコマンドパレットです。入力するとタイトル、説明、グループ、キーワードで絞り込み、矢印キーで移動し、Enter またはクリックで選択します。任意のグローバルショートカットで開けます。

Package: minerva-design@1.23.0

Renderer: uni

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "9a519eee781183dcbac39a62a86bec9e0bd877a9",
  "sourceDigest": "sha256:0d31b0bc3c28394756a1142132ddf7b2beac9f7ce2f5b2253e04712431d7c736",
  "referenceSourceDigest": "sha256:0a033a9f6bc21722c87a78202ae3fce0d891270ea8a01d043a5a748c0439d696"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

## Documentation

## CommandDialog

Support: beta

Controlled/default open, normalized/custom filtering, disabled exclusion, grouping and result caps, original-item selection, keyboard navigation and platform shortcut normalization, query reset and opener focus return. Global browser keyboard shortcuts use document listeners; native hardware callers can use exposed handleShortcut. Native hosts do not expose DOM inert/focus-trap semantics. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "CommandDialog"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "open",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "defaultOpen",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "items",
    "typeText": "CommandItem[] | undefined",
    "required": false
  },
  {
    "name": "title",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "description",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "placeholder",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "emptyText",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "shortcutLabel",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "shortcut",
    "typeText": "string | string[] | undefined",
    "required": false
  },
  {
    "name": "maxResults",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "filter",
    "typeText": "((items: CommandItem[], query: string) => CommandItem[]) | undefined",
    "required": false
  },
  {
    "name": "resultsLabel",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "enterLabel",
    "typeText": "string | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "select",
    "typeText": "[item: CommandItem]",
    "parameters": [
      {
        "name": "item",
        "position": 0,
        "typeText": "CommandItem",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "openChange",
    "typeText": "[open: boolean]",
    "parameters": [
      {
        "name": "open",
        "position": 0,
        "typeText": "boolean",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "update:open",
    "typeText": "[open: boolean]",
    "parameters": [
      {
        "name": "open",
        "position": 0,
        "typeText": "boolean",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

### slots

```json
[
  {
    "name": "title",
    "typeText": "{}"
  },
  {
    "name": "shortcut",
    "typeText": "{}"
  },
  {
    "name": "description",
    "typeText": "{}"
  },
  {
    "name": "enter",
    "typeText": "{}"
  },
  {
    "name": "item",
    "typeText": "{ item: CommandItem; active: boolean; }"
  },
  {
    "name": "empty",
    "typeText": "{}"
  }
]
```

### bindings

```json
[
  {
    "prop": "open",
    "event": "update:open",
    "syntax": "v-model:open"
  }
]
```

## CSS variables

```json
{
  "css:Command": {
    "kind": "cssVars",
    "source": "react/src/components/Command",
    "vars": [
      {
        "name": "--command-search-height",
        "description": "Minimum height of the search field (defaults to --control-height-md)"
      },
      {
        "name": "--command-results-max-height",
        "description": "Maximum height of the scrolling result list"
      },
      {
        "name": "--command-item-min-height",
        "description": "Minimum height of a result row"
      },
      {
        "name": "--command-item-padding-y",
        "description": "Vertical padding of a result row (follows the density's row padding)"
      },
      {
        "name": "--command-item-padding-x",
        "description": "Horizontal padding of a result row (follows the density's row padding)"
      },
      {
        "name": "--command-item-active-background",
        "description": "Background of the hovered / active row (defaults to a 10% primary tint)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

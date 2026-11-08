# Select セレクト

完全なキーボード操作・グループ・フォーム連携に対応した単一選択ドロップダウン。

Package: minerva-design@1.23.2

Renderer: uni

Locale: ja

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

### 動作とアクセシビリティ

トリガーは combobox ロールを持つボタンです（aria-haspopup="listbox"）。クリック、Enter、Space、↓ / ↑、Home、End でリストを開き、選択中の候補（なければ最初の有効な候補）にフォーカスします。矢印キーは端で折り返さず、無効な候補を飛ばします。Home / End と Page Up / Page Down でジャンプできます。Enter または Space で選択して閉じ、フォーカスはトリガーに戻ります。Escape は選択せずに閉じ、Tab は閉じて次のフィールドへ進みます。

閉じたトリガー上で文字を入力すると、ネイティブの select と同様に選択が直接変わります。開いているときはハイライトが移動します。内容がプレーンテキストでない候補には textValue を指定してください。

リストはトリガーの下に配置され、幅はトリガー以上です。下に十分な余白がないときは上に反転し、候補がビューポートに収まらないときはスクロールします。ライブラリの他のオーバーレイと同じ popper 配置で、タッチ端末や小さな画面でも予測しやすく、トリガーを隠しません。選択中の候補をトリガーに重ねて揃える配置（"item-aligned"）は macOS 特有の慣習のため、意図的に採用していません。

非表示のネイティブ select が name・required・disabled を持ちます。値は FormData に含まれ、required はネイティブの制約検証に参加し、フォームのリセットで defaultValue に戻ります。値が undefined または空文字列のときはプレースホルダーを表示します。

リストは最も近い ConfigProvider のテーマコンテナへポータルされます。Modal や Drawer の中では、Escape はリストだけを閉じます。

## Select

Support: beta

Controlled/uncontrolled single choice, registered item metadata/search, keyboard selection, field size/invalid/required/id/name/ARIA and styles on actual combobox trigger, measured collision-aware popup and focus restoration, listbox/option semantics and hidden native input value. Browser hidden select validation/reset is not replicated by the native hidden input. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "Select"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "value",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "modelValue",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "defaultValue",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "options",
    "typeText": "MiniSelectOption[] | undefined",
    "required": false
  },
  {
    "name": "disabled",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "readOnly",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "placeholder",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "searchable",
    "typeText": "boolean | undefined",
    "required": false
  },
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
    "name": "size",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "invalid",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "name",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "required",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "id",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "ariaLabel",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "ariaLabelledby",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "ariaDescribedby",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "contentClassName",
    "typeText": "string | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "change",
    "typeText": "any[]"
  },
  {
    "name": "update:modelValue",
    "typeText": "any[]"
  },
  {
    "name": "openChange",
    "typeText": "any[]"
  },
  {
    "name": "update:open",
    "typeText": "any[]"
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "typeText": "{}"
  }
]
```

### bindings

```json
[
  {
    "prop": "modelValue",
    "event": "update:modelValue",
    "syntax": "v-model"
  },
  {
    "prop": "open",
    "event": "update:open",
    "syntax": "v-model:open"
  }
]
```

## SelectGroup

Support: beta

Native Select semantic section with dedicated class, props and slots. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "SelectGroup"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "label",
    "typeText": "string | undefined",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "typeText": "{}"
  }
]
```

## SelectItem

Support: beta

Registers value/label/disabled option in Select context, supports native tap and H5 keyboard selection. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "SelectItem"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "value",
    "typeText": "string",
    "required": true
  },
  {
    "name": "disabled",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "textValue",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "label",
    "typeText": "string | undefined",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "typeText": "{}"
  }
]
```

## SelectLabel

Support: beta

Native Select semantic section with dedicated class, props and slots. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "SelectLabel"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "label",
    "typeText": "string | undefined",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "typeText": "{}"
  }
]
```

## SelectSeparator

Support: beta

Native Select semantic section with dedicated class, props and slots. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "SelectSeparator"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "label",
    "typeText": "string | undefined",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "typeText": "{}"
  }
]
```

## CSS variables

```json
{
  "css:Select": {
    "kind": "cssVars",
    "source": "react/src/components/Select",
    "vars": [
      {
        "name": "--select-height",
        "description": "Height of the trigger (every size; defaults to the density's control height of the size)"
      },
      {
        "name": "--select-padding-x",
        "description": "Horizontal padding of the trigger (every size)"
      },
      {
        "name": "--select-radius",
        "description": "Corner radius of the trigger and of the listbox (defaults to --radius-lg)"
      },
      {
        "name": "--select-font-size",
        "description": "Font size of the trigger (every size)"
      },
      {
        "name": "--select-border-color",
        "description": "Border color of the trigger at rest"
      },
      {
        "name": "--select-dropdown-max-height",
        "description": "Maximum height of the listbox before it scrolls"
      },
      {
        "name": "--select-option-padding-y",
        "description": "Vertical padding of an option (follows the density's row padding)"
      },
      {
        "name": "--select-option-padding-x",
        "description": "Horizontal padding of an option and of a group label (follows the density's row padding)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

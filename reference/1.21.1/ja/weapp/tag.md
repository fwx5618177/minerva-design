# Tag タグ

コンテンツのマーキングや分類に使う小さなラベル。閉じたりクリックしたりできます。

Package: minerva-design@1.21.1

Renderer: weapp

Locale: ja

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

### アクセシビリティ

clickable を指定するとタグに role="button" と tabIndex=0 が付き、Enter または Space でマウスクリックと同様に onClick が呼ばれます。操作や切り替えに使い、ページ遷移にはリンクを使ってください。

閉じるボタンはネイティブの  で、独立したタブ位置を持ちます。アクセシブルな名前は既定で「Close」です。どのタグを削除するか分かるよう closeLabel（例：「Remove React」）を設定してください。

無効なクリック可能タグは role="button" と aria-disabled="true" を保持し、Tab ではスキップされます。選択状態が重要な場合は、色だけでなくテキストや aria 属性でも伝えてください。

## Tag

Support: beta

All semantic colors, sizes, variants and shapes; icon/avatar/close slots; pressed/elevation; click/close loading and disabled guards. Native tap replaces browser focus/hover ripple. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/tag/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "closable",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "disabled",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "variant",
    "typeText": "string",
    "required": false,
    "default": "subtle"
  },
  {
    "name": "status",
    "typeText": "string",
    "required": false,
    "default": "info"
  },
  {
    "name": "label",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "color",
    "typeText": "string",
    "required": false,
    "default": "neutral"
  },
  {
    "name": "size",
    "typeText": "string",
    "required": false,
    "default": "medium"
  },
  {
    "name": "shape",
    "typeText": "string",
    "required": false,
    "default": "rounded"
  },
  {
    "name": "clickable",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "pressed",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "icon",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "avatar",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "loading",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "elevation",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "closeIcon",
    "typeText": "string",
    "required": false,
    "default": "×"
  },
  {
    "name": "closeLabel",
    "typeText": "string",
    "required": false,
    "default": "Remove"
  }
]
```

### events

```json
[
  {
    "name": "close"
  },
  {
    "name": "click"
  }
]
```

### slots

```json
[
  {
    "name": "avatar"
  },
  {
    "name": "icon"
  },
  {
    "name": "default"
  },
  {
    "name": "close"
  }
]
```

## CSS variables

```json
{
  "css:Tag": {
    "kind": "cssVars",
    "source": "react/src/components/Tag",
    "vars": [
      {
        "name": "--tag-height",
        "description": "Minimum height (every size; default: the content height)"
      },
      {
        "name": "--tag-padding-x",
        "description": "Horizontal padding (every size)"
      },
      {
        "name": "--tag-font-size",
        "description": "Font size (every size)"
      },
      {
        "name": "--tag-radius",
        "description": "Corner radius of the rounded shape (defaults to --radius-sm)"
      },
      {
        "name": "--tag-gap",
        "description": "Space between the icon, the label and the close button"
      },
      {
        "name": "--tag-ring-color",
        "description": "Color of the hairline ring of the tinted (default) variant (defaults to the text color at 16%)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

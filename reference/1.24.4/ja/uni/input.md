# Input 入力

サイズ・バリアント・前後の装飾・クリアボタン・文字数カウント・パスワード表示切り替えを備えた一行テキスト入力。ラベル・ヘルプテキスト・エラーメッセージが必要なら FormField で囲みます。

Package: minerva-design@1.24.4

Renderer: uni

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.24.4",
  "sourceCommit": "580bc03aa319a78f6f653ee0f9610fe236a93d38",
  "sourceDigest": "sha256:b9a39dcfe8b09a5d0967efee074963c408a37abb72fbe1d4c7a1eda21075df1d",
  "referenceSourceDigest": "sha256:25c00e4ed9c1ea1a2744aa521b6deba862ac402384cb19f4e7d069b72a5172c6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.24.4/types.json) or getType() from minerva-design/contracts.

## Documentation

ユーザー名

パスワード

フォームを試す

デモ専用です。認証情報の送信やアカウントへのログインは行いません。

フォーム送信を停止しました。認証情報は送信されず、ログインも行われていません。

## Input

Support: beta

Controlled/uncontrolled text input; native password visibility; clear action; character count; prefix/suffix slots; validation styling; field inheritance in uni. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "Input"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "modelValue",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "value",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "defaultValue",
    "typeText": "string | undefined",
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
    "name": "invalid",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "required",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "placeholder",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "name",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "id",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "role",
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
    "name": "ariaControls",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "ariaExpanded",
    "typeText": "boolean | \"true\" | \"false\" | undefined",
    "required": false
  },
  {
    "name": "ariaActivedescendant",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "ariaAutocomplete",
    "typeText": "\"none\" | \"inline\" | \"list\" | \"both\" | undefined",
    "required": false
  },
  {
    "name": "type",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "password",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "maxlength",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "maxLength",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "variant",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "size",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "clearable",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "showCharCount",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "clearLabel",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "prefix",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "suffix",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "showPasswordLabel",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "hidePasswordLabel",
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
    "typeText": "[value: string]",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "typeText": "string",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "update:modelValue",
    "typeText": "[value: string]",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "typeText": "string",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "confirm",
    "typeText": "[value: string]",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "typeText": "string",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "clear",
    "typeText": "[]",
    "parameters": []
  },
  {
    "name": "focus",
    "typeText": "[event: unknown]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "unknown",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "blur",
    "typeText": "[event: unknown]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "unknown",
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
    "name": "prefix",
    "typeText": "{}"
  },
  {
    "name": "suffix",
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
  }
]
```

## CSS variables

```json
{
  "css:Input": {
    "kind": "cssVars",
    "source": "react/src/components/Input",
    "vars": [
      {
        "name": "--input-height",
        "description": "Minimum height of the field (every size; defaults to the density's control height of the size)"
      },
      {
        "name": "--input-padding-x",
        "description": "Horizontal padding of the text (every size)"
      },
      {
        "name": "--input-radius",
        "description": "Corner radius (defaults to --radius-lg)"
      },
      {
        "name": "--input-font-size",
        "description": "Font size (every size)"
      },
      {
        "name": "--input-background",
        "description": "Background color of the outline variant"
      },
      {
        "name": "--input-autofill-background",
        "description": "Opaque autofill tint for editable inputs; defaults to a primary tint over the theme surface"
      },
      {
        "name": "--input-border-color",
        "description": "Border color at rest"
      },
      {
        "name": "--input-focus-color",
        "description": "Border color while hovered / focused (focus: then --minerva-focus-border-color)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

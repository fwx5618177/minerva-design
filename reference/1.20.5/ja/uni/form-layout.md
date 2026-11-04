# FormLayout フォームレイアウト

フィールドをレスポンシブグリッドに配置するネイティブ form。送信・リセット・検証はネイティブの挙動のままです。

Package: minerva-design@1.20.5

Renderer: uni

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.5",
  "sourceCommit": "fe15b45f84b480cdd9cfec147df037927ba34a6b",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:49d7ff5e7a649e86d07ff0f6e5da47ae57bc234041d4b820a629aeca119fd0cb"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.5/types.json) or getType() from minerva-design/contracts.

## Documentation

## FormLayout

Support: beta

Native form submit/reset detail and all ResponsiveGrid responsive column/gap props. Native form serialization/event detail replaces browser FormData and HTMLFormElement refs. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
  "exports": [
    "FormLayout"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "columns",
    "typeText": "number | { base?: number | undefined; sm?: number | undefined; md?: number | undefined; lg?: number | undefined; } | undefined",
    "required": false
  },
  {
    "name": "gap",
    "typeText": "string | number | undefined",
    "required": false
  },
  {
    "name": "rowGap",
    "typeText": "string | number | undefined",
    "required": false
  },
  {
    "name": "columnGap",
    "typeText": "string | number | undefined",
    "required": false
  },
  {
    "name": "reportSubmit",
    "typeText": "boolean | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "submit",
    "typeText": "[detail: unknown]",
    "parameters": [
      {
        "name": "detail",
        "position": 0,
        "typeText": "unknown",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "reset",
    "typeText": "[]",
    "parameters": []
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
  "css:FormLayout": {
    "kind": "cssVars",
    "source": "react/src/components/FormLayout",
    "vars": [
      {
        "name": "--form-layout-max-width",
        "description": "Maximum width of the form (none by default)"
      },
      {
        "name": "--form-layout-margin-inline",
        "description": "Inline margin of the form (set auto with a max width to center it)"
      },
      {
        "name": "--form-layout-padding",
        "description": "Inner padding of the form"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

# FormLayout

A native form whose fields are laid out on a responsive grid; submit, reset and validation keep their native behaviour.

Package: minerva-design@1.24.0

Renderer: uni

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.24.0",
  "sourceCommit": "db705542be0061d51c135e72566fe0abba4dd3d4",
  "sourceDigest": "sha256:ddf24b058620a47363c171d7a5d941ded5095e4c61225ecdcd3c9a4f29932128",
  "referenceSourceDigest": "sha256:868994bef86fb46d4fdff6c4dc3922a69254cd143c59b0400b1091300bf56a2b"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.24.0/types.json) or getType() from minerva-design/contracts.

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

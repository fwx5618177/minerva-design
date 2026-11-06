# Cascader

Selects a value from a hierarchy of options, one level at a time (e.g. country / region / city).

Package: minerva-design@1.22.0

Renderer: weapp

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.0",
  "sourceCommit": "e2a31507ecfcdb5ffcd33b05b47404c7625bb883",
  "sourceDigest": "sha256:a33fb5e0b8f01ae452ce95d2b723ab0cd9905636d574c72fd12c1459f4c09d3a",
  "referenceSourceDigest": "sha256:2459da5f08881aec3d2ac2d940ce35e7a61d0e0e679c0c167d8b5fdf8330a456"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.0/types.json) or getType() from minerva-design/contracts.

## Documentation

### Keyboard and accessibility

Enter, Space or Arrow Down on the input opens the panel and moves focus into it; focusing the input alone does not open it.

Arrow Up / Arrow Down, Home and End move within a column.

Arrow Right or Enter expands the next column (also after lazy loading) and Enter selects a leaf; Arrow Left goes back to the previous column.

Escape closes the panel and returns focus to the input; Tab closes it.

The input has the combobox role. Its default placeholder and the "Clear selection" button label follow the React library's locale.

## Cascader

Support: beta

Controlled/default nested paths, separate browsing, configure({filter,optionRender,loadData}), lazy-load coalescing/loading/errors/retry, maxLevel, disabled branches, search and clear. Function callbacks use the native instance configure() API. optionRender returns native text; ReactNode renderers and pointer-hover expansion have no native equivalent. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/cascader/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "disabled",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "readOnly",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "options",
    "typeText": "array",
    "required": false
  },
  {
    "name": "maxLevel",
    "typeText": "number",
    "required": false,
    "default": 6
  },
  {
    "name": "value",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "defaultValue",
    "typeText": "array",
    "required": false
  },
  {
    "name": "changeOnSelect",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "showSearch",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "allowClear",
    "typeText": "boolean",
    "required": false,
    "default": true
  },
  {
    "name": "required",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "invalid",
    "typeText": "unknown",
    "required": false,
    "default": null
  }
]
```

### events

```json
[
  {
    "name": "change",
    "typeText": "{ value: unknown }",
    "description": "Requested next value; a controlled owner must publish the accepted prop."
  },
  {
    "name": "openchange",
    "typeText": "{ open: boolean }",
    "description": "Requested visible state; controlled owners may reject it."
  },
  {
    "name": "load",
    "typeText": "{ selectedOptions: unknown[] }",
    "description": "Lazy branch expansion requested."
  },
  {
    "name": "loaderror",
    "typeText": "{ message: string; selectedOptions: unknown[] }",
    "description": "Lazy load failed; the branch can be retried."
  }
]
```

## CSS variables

```json
{
  "css:Cascader": {
    "kind": "cssVars",
    "source": "react/src/components/Cascader",
    "vars": [
      {
        "name": "--cascader-height",
        "description": "Minimum height of the field (defaults to the density's small control height)"
      },
      {
        "name": "--cascader-radius",
        "description": "Corner radius of the field, the dropdown and the options (defaults to --radius-sm)"
      },
      {
        "name": "--cascader-font-size",
        "description": "Font size of the field and of the options"
      },
      {
        "name": "--cascader-border-color",
        "description": "Border color of the field at rest"
      },
      {
        "name": "--cascader-column-min-width",
        "description": "Minimum width of a column of options"
      },
      {
        "name": "--cascader-dropdown-max-height",
        "description": "Maximum height of the columns before they scroll"
      },
      {
        "name": "--cascader-option-padding-y",
        "description": "Vertical padding of an option (follows the density's row padding)"
      },
      {
        "name": "--cascader-option-padding-x",
        "description": "Horizontal padding of an option (follows the density's row padding)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

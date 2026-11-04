# PageTabs ページタブ

開いているアプリのページを並べたバー（ルートナビゲーションであり ARIA の tablist ではありません）。ルート、クローズ、未保存の変更のガードはアプリ側が担います。項目はフラットな角丸の面で、長いタイトルは省略されツールチップで全文が表示されます。現在のページは常に表示範囲内に保たれ、リストがはみ出すとスクロールボタンが現れます。

Package: minerva-design@1.20.3

Renderer: weapp

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.3",
  "sourceCommit": "af37b20099ab0383ddc1d9484d3d7847a8310d40",
  "sourceDigest": "sha256:38cfefdcb173c9a307526b9364c7a77acc74f713924006e65d94c6f3c5e94c61",
  "referenceSourceDigest": "sha256:1d36ef2823b3b425f00cf746f922b005435d17c9e4f13b0b40f620b32191d7a8"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.3/types.json) or getType() from minerva-design/contracts.

## Documentation

## PageTab

Support: n/a

Native composition uses PageTabs items[].value/label/disabled/icon/closable/action/actionDisabled and select/close events. Native serialized data replaces authored React compound children. Use PageTabs props/slots for the native equivalent.

## PageTabs

Support: beta

Selected native page items, select/change and independent action events, disabled labels/actionDisabled, icons, measured overflow controls, active scroll-into-view and global actions slot. Native scroll-view replaces DOM scrolling and hover tooltips; serializable item content replaces ReactNode children. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/page-tabs/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "disabled",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "readOnly",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "items",
    "typeText": "array",
    "required": false
  },
  {
    "name": "value",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "activeValue",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "ariaLabel",
    "typeText": "string",
    "required": false,
    "default": "Open pages"
  },
  {
    "name": "scrollLeftLabel",
    "typeText": "string",
    "required": false,
    "default": "Scroll pages left"
  },
  {
    "name": "scrollRightLabel",
    "typeText": "string",
    "required": false,
    "default": "Scroll pages right"
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
    "name": "select",
    "typeText": "{ value: string }",
    "description": "Page label activation."
  },
  {
    "name": "close",
    "typeText": "{ value: string }",
    "description": "Separate action activation; item.disabled disables the label, item.actionDisabled disables the action."
  }
]
```

### slots

```json
[
  {
    "name": "actions"
  },
  {
    "name": "default"
  }
]
```

## CSS variables

```json
{
  "css:PageTabs": {
    "kind": "cssVars",
    "source": "react/src/components/PageTabs",
    "vars": [
      {
        "name": "--page-tabs-height",
        "description": "Height of the tab bar"
      },
      {
        "name": "--page-tabs-background",
        "description": "Background of the tab bar"
      },
      {
        "name": "--page-tabs-gap",
        "description": "Space between the tabs"
      },
      {
        "name": "--page-tabs-item-height",
        "description": "Height of a tab"
      },
      {
        "name": "--page-tabs-item-min-width",
        "description": "Minimum width of a tab"
      },
      {
        "name": "--page-tabs-item-max-width",
        "description": "Maximum width of a tab (the label truncates)"
      },
      {
        "name": "--page-tabs-item-radius",
        "description": "Corner radius of a tab (defaults to --radius-lg)"
      },
      {
        "name": "--page-tabs-selected-background",
        "description": "Background of the active tab"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

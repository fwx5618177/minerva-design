# Menu メニュー

ボタン（Menu）または右クリック（ContextMenu）で開くアクションメニュー：アイコン、ショートカット、区切り線、グループ、チェックボックス項目、ラジオグループ、サブメニュー、タイプアヘッド、完全なキーボード操作（Enter、Space、ArrowDown で最初の項目、ArrowUp で最後の項目にフォーカスして開く。矢印キーは循環し無効な項目をスキップ、Home / End、Tab で閉じる、Escape でトリガーにフォーカスを戻す）に対応します。リストから値を選ぶには Select を使います。

Package: minerva-design@1.20.5

Renderer: taro

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

## ContextMenu

Support: beta

Action/checkbox/radio/group/submenu entries, controlled open, size, measured side/alignment with viewport collision handling, disabled or cancelled triggers and close-on-select; context long press. Recursive submenus use separately measured fixed panels, directional arrows, RTL side preference, collision flipping and measurement cleanup. Native touch/view semantics differ from browser DOM semantics. Native devices do not expose document focus, inert, browser portals or File input APIs; H5 capabilities are specified separately. Device-runtime validation is still required. H5 supports menu loops, typeahead, submenu arrows and document-wide nonmodal outside dismissal. Native context-menu opening uses long press and explicit dir; browser pointer coordinates and global document listeners do not apply on devices. Component tests, H5 tests in happy-dom and the official Taro WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/taro",
  "exports": [
    "ContextMenu"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "items",
    "source": "packages/taro/src/overlays.tsx",
    "kind": "array",
    "typeText": "MenuEntry[]",
    "typeRef": "type:29924efb2bf4bd085765",
    "required": true
  },
  {
    "name": "closeOnSelect",
    "source": "packages/taro/src/overlays.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "disabled",
    "source": "packages/taro/src/overlays.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "size",
    "source": "packages/taro/src/overlays.tsx",
    "kind": "enum",
    "values": [
      "medium",
      "small"
    ],
    "typeText": "\"small\" | \"medium\" | undefined",
    "typeRef": "type:f41fddf6eaf0d34924a7",
    "required": false
  },
  {
    "name": "align",
    "source": "packages/taro/src/overlays.tsx",
    "kind": "enum",
    "values": [
      "center",
      "end",
      "start"
    ],
    "typeText": "\"start\" | \"end\" | \"center\" | undefined",
    "typeRef": "type:fb08bb4db6e84190119b",
    "required": false
  },
  {
    "name": "side",
    "source": "packages/taro/src/overlays.tsx",
    "kind": "enum",
    "values": [
      "bottom",
      "left",
      "right",
      "top"
    ],
    "typeText": "NativeFloatingSide | undefined",
    "typeRef": "type:b9893b47fee55d137690",
    "required": false
  },
  {
    "name": "modal",
    "source": "packages/taro/src/overlays.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "dir",
    "source": "packages/taro/src/overlays.tsx",
    "kind": "enum",
    "values": [
      "ltr",
      "rtl"
    ],
    "typeText": "\"ltr\" | \"rtl\" | undefined",
    "typeRef": "type:4911c4ab558e2c50216a",
    "required": false
  },
  {
    "name": "open",
    "source": "packages/taro/src/overlays.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "defaultOpen",
    "source": "packages/taro/src/overlays.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
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
    "name": "onSelect",
    "source": "packages/taro/src/overlays.tsx",
    "kind": "function",
    "typeText": "((item: MenuAction) => void) | undefined",
    "typeRef": "type:f79c3000ae629136f899",
    "parameters": [
      {
        "name": "item",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "MenuAction",
        "typeRef": "type:4992310b09e16e155f01"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false
  },
  {
    "name": "onOpenChange",
    "source": "packages/taro/src/overlays.tsx",
    "kind": "function",
    "typeText": "((open: boolean) => void) | undefined",
    "typeRef": "type:804ddd37e56a55e58c37",
    "parameters": [
      {
        "name": "open",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "boolean",
        "typeRef": "type:7087acd01ef7dd9f1d5c"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "children"
  }
]
```

### bindings

```json
[
  {
    "prop": "open",
    "event": "onOpenChange",
    "syntax": "open={open} onOpenChange={handler}"
  }
]
```

## Menu

Support: beta

Action/checkbox/radio/group/submenu entries, controlled open, size, measured side/alignment with viewport collision handling, disabled or cancelled triggers and close-on-select; context long press. Recursive submenus use separately measured fixed panels, directional arrows, RTL side preference, collision flipping and measurement cleanup. Native touch/view semantics differ from browser DOM semantics. Native devices do not expose document focus, inert, browser portals or File input APIs; H5 capabilities are specified separately. Device-runtime validation is still required. H5 supports menu loops, typeahead, submenu arrows and document-wide nonmodal outside dismissal. Native context-menu opening uses long press and explicit dir; browser pointer coordinates and global document listeners do not apply on devices. Component tests, H5 tests in happy-dom and the official Taro WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/taro",
  "exports": [
    "Menu"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "items",
    "source": "packages/taro/src/overlays.tsx",
    "kind": "array",
    "typeText": "MenuEntry[]",
    "typeRef": "type:29924efb2bf4bd085765",
    "required": true
  },
  {
    "name": "closeOnSelect",
    "source": "packages/taro/src/overlays.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "disabled",
    "source": "packages/taro/src/overlays.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "size",
    "source": "packages/taro/src/overlays.tsx",
    "kind": "enum",
    "values": [
      "medium",
      "small"
    ],
    "typeText": "\"small\" | \"medium\" | undefined",
    "typeRef": "type:f41fddf6eaf0d34924a7",
    "required": false
  },
  {
    "name": "align",
    "source": "packages/taro/src/overlays.tsx",
    "kind": "enum",
    "values": [
      "center",
      "end",
      "start"
    ],
    "typeText": "\"start\" | \"end\" | \"center\" | undefined",
    "typeRef": "type:fb08bb4db6e84190119b",
    "required": false
  },
  {
    "name": "side",
    "source": "packages/taro/src/overlays.tsx",
    "kind": "enum",
    "values": [
      "bottom",
      "left",
      "right",
      "top"
    ],
    "typeText": "NativeFloatingSide | undefined",
    "typeRef": "type:b9893b47fee55d137690",
    "required": false
  },
  {
    "name": "modal",
    "source": "packages/taro/src/overlays.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "dir",
    "source": "packages/taro/src/overlays.tsx",
    "kind": "enum",
    "values": [
      "ltr",
      "rtl"
    ],
    "typeText": "\"ltr\" | \"rtl\" | undefined",
    "typeRef": "type:4911c4ab558e2c50216a",
    "required": false
  },
  {
    "name": "open",
    "source": "packages/taro/src/overlays.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "defaultOpen",
    "source": "packages/taro/src/overlays.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
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
    "name": "onSelect",
    "source": "packages/taro/src/overlays.tsx",
    "kind": "function",
    "typeText": "((item: MenuAction) => void) | undefined",
    "typeRef": "type:f79c3000ae629136f899",
    "parameters": [
      {
        "name": "item",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "MenuAction",
        "typeRef": "type:4992310b09e16e155f01"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false
  },
  {
    "name": "onOpenChange",
    "source": "packages/taro/src/overlays.tsx",
    "kind": "function",
    "typeText": "((open: boolean) => void) | undefined",
    "typeRef": "type:804ddd37e56a55e58c37",
    "parameters": [
      {
        "name": "open",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "boolean",
        "typeRef": "type:7087acd01ef7dd9f1d5c"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "children"
  }
]
```

### bindings

```json
[
  {
    "prop": "open",
    "event": "onOpenChange",
    "syntax": "open={open} onOpenChange={handler}"
  }
]
```

## MenuCheckboxItem

Support: beta

Action/checkbox/radio/group/submenu entries, controlled open, size, measured side/alignment with viewport collision handling, disabled or cancelled triggers and close-on-select; context long press. Recursive submenus use separately measured fixed panels, directional arrows, RTL side preference, collision flipping and measurement cleanup. Native touch/view semantics differ from browser DOM semantics. Native devices do not expose document focus, inert, browser portals or File input APIs; H5 capabilities are specified separately. Device-runtime validation is still required. H5 supports menu loops, typeahead, submenu arrows and document-wide nonmodal outside dismissal. Native context-menu opening uses long press and explicit dir; browser pointer coordinates and global document listeners do not apply on devices. Component tests, H5 tests in happy-dom and the official Taro WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/taro",
  "exports": [
    "MenuCheckboxItem"
  ],
  "kind": "named"
}
```

### props

```json
[
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
  },
  {
    "name": "checked",
    "source": "packages/taro/src/overlays.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "defaultChecked",
    "source": "packages/taro/src/overlays.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "disabled",
    "source": "packages/taro/src/overlays.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "closeOnSelect",
    "source": "packages/taro/src/overlays.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "value",
    "source": "packages/taro/src/overlays.tsx",
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
    "name": "onCheckedChange",
    "source": "packages/taro/src/overlays.tsx",
    "kind": "function",
    "typeText": "((value: boolean) => void) | undefined",
    "typeRef": "type:5ec69ec5a968b9128e61",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "boolean",
        "typeRef": "type:7087acd01ef7dd9f1d5c"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "children"
  }
]
```

### bindings

```json
[
  {
    "prop": "checked",
    "event": "onCheckedChange",
    "syntax": "checked={checked} onCheckedChange={handler}"
  }
]
```

## MenuGroup

Support: beta

Action/checkbox/radio/group/submenu entries, controlled open, size, measured side/alignment with viewport collision handling, disabled or cancelled triggers and close-on-select; context long press. Recursive submenus use separately measured fixed panels, directional arrows, RTL side preference, collision flipping and measurement cleanup. Native touch/view semantics differ from browser DOM semantics. Native devices do not expose document focus, inert, browser portals or File input APIs; H5 capabilities are specified separately. Device-runtime validation is still required. H5 supports menu loops, typeahead, submenu arrows and document-wide nonmodal outside dismissal. Native context-menu opening uses long press and explicit dir; browser pointer coordinates and global document listeners do not apply on devices. Component tests, H5 tests in happy-dom and the official Taro WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/taro",
  "exports": [
    "MenuGroup"
  ],
  "kind": "named"
}
```

### props

```json
[
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
  },
  {
    "name": "label",
    "source": "packages/taro/src/overlays.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:a991edaa7809b6d75ba2",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "children"
  }
]
```

## MenuItem

Support: beta

Action/checkbox/radio/group/submenu entries, controlled open, size, measured side/alignment with viewport collision handling, disabled or cancelled triggers and close-on-select; context long press. Recursive submenus use separately measured fixed panels, directional arrows, RTL side preference, collision flipping and measurement cleanup. Native touch/view semantics differ from browser DOM semantics. Native devices do not expose document focus, inert, browser portals or File input APIs; H5 capabilities are specified separately. Device-runtime validation is still required. H5 supports menu loops, typeahead, submenu arrows and document-wide nonmodal outside dismissal. Native context-menu opening uses long press and explicit dir; browser pointer coordinates and global document listeners do not apply on devices. Component tests, H5 tests in happy-dom and the official Taro WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/taro",
  "exports": [
    "MenuItem"
  ],
  "kind": "named"
}
```

### props

```json
[
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
  },
  {
    "name": "disabled",
    "source": "packages/taro/src/overlays.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "keepOpen",
    "source": "packages/taro/src/overlays.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "value",
    "source": "packages/taro/src/overlays.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "shortcut",
    "source": "packages/taro/src/overlays.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-haspopup",
    "source": "packages/taro/src/overlays.tsx",
    "kind": "enum",
    "values": [
      "menu"
    ],
    "typeText": "\"menu\" | undefined",
    "typeRef": "type:5e6c352a4df2e86eb302",
    "required": false
  },
  {
    "name": "aria-expanded",
    "source": "packages/taro/src/overlays.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "aria-controls",
    "source": "packages/taro/src/overlays.tsx",
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
    "name": "onSelect",
    "source": "packages/taro/src/overlays.tsx",
    "kind": "function",
    "typeText": "((value?: string | undefined) => void) | undefined",
    "typeRef": "type:4492ad1013d74b31aefc",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "required": false,
        "rest": false,
        "typeText": "string | undefined",
        "typeRef": "type:c59382f9551703242861"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "children"
  }
]
```

## MenuLabel

Support: beta

Action/checkbox/radio/group/submenu entries, controlled open, size, measured side/alignment with viewport collision handling, disabled or cancelled triggers and close-on-select; context long press. Recursive submenus use separately measured fixed panels, directional arrows, RTL side preference, collision flipping and measurement cleanup. Native touch/view semantics differ from browser DOM semantics. Native devices do not expose document focus, inert, browser portals or File input APIs; H5 capabilities are specified separately. Device-runtime validation is still required. H5 supports menu loops, typeahead, submenu arrows and document-wide nonmodal outside dismissal. Native context-menu opening uses long press and explicit dir; browser pointer coordinates and global document listeners do not apply on devices. Component tests, H5 tests in happy-dom and the official Taro WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/taro",
  "exports": [
    "MenuLabel"
  ],
  "kind": "named"
}
```

### props

```json
[
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

### slots

```json
[
  {
    "name": "children"
  }
]
```

## MenuRadioItem

Support: beta

Action/checkbox/radio/group/submenu entries, controlled open, size, measured side/alignment with viewport collision handling, disabled or cancelled triggers and close-on-select; context long press. Recursive submenus use separately measured fixed panels, directional arrows, RTL side preference, collision flipping and measurement cleanup. Native touch/view semantics differ from browser DOM semantics. Native devices do not expose document focus, inert, browser portals or File input APIs; H5 capabilities are specified separately. Device-runtime validation is still required. H5 supports menu loops, typeahead, submenu arrows and document-wide nonmodal outside dismissal. Native context-menu opening uses long press and explicit dir; browser pointer coordinates and global document listeners do not apply on devices. Component tests, H5 tests in happy-dom and the official Taro WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/taro",
  "exports": [
    "MenuRadioItem"
  ],
  "kind": "named"
}
```

### props

```json
[
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
  },
  {
    "name": "checked",
    "source": "packages/taro/src/overlays.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "disabled",
    "source": "packages/taro/src/overlays.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "value",
    "source": "packages/taro/src/overlays.tsx",
    "kind": "string",
    "typeText": "string",
    "typeRef": "type:e15e314d298fc0d116fc",
    "required": true
  }
]
```

### events

```json
[
  {
    "name": "onSelect",
    "source": "packages/taro/src/overlays.tsx",
    "kind": "function",
    "typeText": "((value: string) => void) | undefined",
    "typeRef": "type:83c5e5ffcbcb8738b5c3",
    "parameters": [
      {
        "name": "value",
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
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "children"
  }
]
```

## MenuSeparator

Support: beta

Action/checkbox/radio/group/submenu entries, controlled open, size, measured side/alignment with viewport collision handling, disabled or cancelled triggers and close-on-select; context long press. Recursive submenus use separately measured fixed panels, directional arrows, RTL side preference, collision flipping and measurement cleanup. Native touch/view semantics differ from browser DOM semantics. Native devices do not expose document focus, inert, browser portals or File input APIs; H5 capabilities are specified separately. Device-runtime validation is still required. H5 supports menu loops, typeahead, submenu arrows and document-wide nonmodal outside dismissal. Native context-menu opening uses long press and explicit dir; browser pointer coordinates and global document listeners do not apply on devices. Component tests, H5 tests in happy-dom and the official Taro WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/taro",
  "exports": [
    "MenuSeparator"
  ],
  "kind": "named"
}
```

### props

```json
[
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

### slots

```json
[
  {
    "name": "children"
  }
]
```

## CSS variables

```json
{
  "css:Menu": {
    "kind": "cssVars",
    "source": "react/src/components/Menu",
    "vars": [
      {
        "name": "--menu-min-width",
        "description": "Minimum width of the menu panel"
      },
      {
        "name": "--menu-max-width",
        "description": "Maximum width of the menu panel"
      },
      {
        "name": "--menu-max-height",
        "description": "Maximum height of the menu panel (scrolls beyond)"
      },
      {
        "name": "--menu-padding",
        "description": "Inner padding of the menu panel"
      },
      {
        "name": "--menu-radius",
        "description": "Corner radius of the menu panel (defaults to --radius-lg)"
      },
      {
        "name": "--menu-shadow",
        "description": "Shadow of the menu panel (defaults to --shadow-md)"
      },
      {
        "name": "--menu-item-height",
        "description": "Minimum height of an item (every size; defaults to the density's control height)"
      },
      {
        "name": "--menu-z-index",
        "description": "Stacking order of the menu panel (defaults to --z-popover)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

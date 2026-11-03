# Tag 标签

用于标记和分类内容的小标签，可关闭或可点击。

Package: minerva-design@1.19.3

Renderer: taro

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "1b65455cccbdd71bb609d7d859b1ef90f9e604c6",
  "sourceDigest": "sha256:a8b34eea01e9133306bb1fde48e7966deaaaa35d87c2dfd2e181d891c65e01c1",
  "referenceSourceDigest": "sha256:d3ed05a4228bc39ff766871c13b5ba292792f934f6ebc3d0d29af28589be129c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

### 无障碍

设置 clickable 后，标签具有 role="button" 和 tabIndex=0，Enter 或空格键会像鼠标点击一样触发 onClick。请用于操作或切换，而非页面跳转（跳转请使用链接）。

关闭按钮是原生 ，可单独聚焦。其无障碍名称默认为“Close”，请设置 closeLabel（如“Remove React”），让读屏用户知道移除的是哪个标签。

禁用的可点击标签保留 role="button" 并带有 aria-disabled="true"，Tab 键会跳过它。若选中状态很重要，请同时通过文字或 aria 属性表达，而不要只依赖颜色。

## Tag

Support: beta

Semantic roles/colors/variants/sizes, title/actions/custom icons, alert collapse/close/animations/banner/rounding/elevation and guarded tag actions/loading/shape/elevation and native measured touch-origin ripples. Native touch/view semantics differ from browser DOM semantics. Native devices do not expose document focus, inert, browser portals or File input APIs; H5 capabilities are specified separately. Device-runtime validation is still required. Tag ripple coordinates use native touch/tap data and measured bounds, falling back to center for keyboard activation or hosts without coordinates. DOM focus-return behavior is not reproduced. Component tests, H5 tests in happy-dom and the official Taro WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/taro",
  "exports": [
    "Tag"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "color",
    "source": "packages/taro/src/display.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "variant",
    "source": "packages/taro/src/display.tsx",
    "kind": "enum",
    "values": [
      "outline",
      "soft",
      "solid",
      "subtle"
    ],
    "typeText": "\"solid\" | \"outline\" | \"subtle\" | \"soft\" | undefined",
    "typeRef": "type:3ba043d969fe8a297d5d",
    "required": false
  },
  {
    "name": "size",
    "source": "packages/taro/src/display.tsx",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "small"
    ],
    "typeText": "\"small\" | \"medium\" | \"large\" | undefined",
    "typeRef": "type:8d5b6882dc615b54818b",
    "required": false
  },
  {
    "name": "shape",
    "source": "packages/taro/src/display.tsx",
    "kind": "enum",
    "values": [
      "circle",
      "rounded",
      "square"
    ],
    "typeText": "\"square\" | \"rounded\" | \"circle\" | undefined",
    "typeRef": "type:bc311df462bffff00236",
    "required": false
  },
  {
    "name": "closable",
    "source": "packages/taro/src/display.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "closeLabel",
    "source": "packages/taro/src/display.tsx",
    "kind": "union",
    "typeText": "string | ((label: string) => string) | undefined",
    "typeRef": "type:00d7ba7ef2048742b2b0",
    "parameters": [
      {
        "name": "label",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "string",
        "typeRef": "type:e15e314d298fc0d116fc"
      }
    ],
    "returnType": {
      "typeText": "string",
      "typeRef": "type:e15e314d298fc0d116fc"
    },
    "required": false
  },
  {
    "name": "closeIcon",
    "source": "packages/taro/src/display.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:a991edaa7809b6d75ba2",
    "required": false
  },
  {
    "name": "clickable",
    "source": "packages/taro/src/display.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "pressed",
    "source": "packages/taro/src/display.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "disabled",
    "source": "packages/taro/src/display.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "icon",
    "source": "packages/taro/src/display.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:a991edaa7809b6d75ba2",
    "required": false
  },
  {
    "name": "avatar",
    "source": "packages/taro/src/display.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:a991edaa7809b6d75ba2",
    "required": false
  },
  {
    "name": "loading",
    "source": "packages/taro/src/display.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "elevation",
    "source": "packages/taro/src/display.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "ripple",
    "source": "packages/taro/src/display.tsx",
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
    "name": "onClose",
    "source": "packages/taro/src/display.tsx",
    "kind": "function",
    "typeText": "((event: ITouchEvent) => void) | undefined",
    "typeRef": "type:f7b40babd9b6eccb005d",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ITouchEvent",
        "typeRef": "type:7276d9ff893f9fea3df5"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false
  },
  {
    "name": "onClick",
    "source": "packages/taro/src/display.tsx",
    "kind": "function",
    "typeText": "((event: ITouchEvent) => void) | undefined",
    "typeRef": "type:f7b40babd9b6eccb005d",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ITouchEvent",
        "typeRef": "type:7276d9ff893f9fea3df5"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false
  },
  {
    "name": "onPressedChange",
    "source": "packages/taro/src/display.tsx",
    "kind": "function",
    "typeText": "((pressed: boolean) => void) | undefined",
    "typeRef": "type:41adf7d71d70b15a6506",
    "parameters": [
      {
        "name": "pressed",
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
    "prop": "pressed",
    "event": "onPressedChange",
    "syntax": "pressed={pressed} onPressedChange={handler}"
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

# Menu 菜单

从按钮（Menu）或右键（ContextMenu）打开的操作菜单：支持图标、快捷键、分隔线、分组、复选项、单选组、子菜单、输入查找和完整的键盘操作（Enter、Space 或 ArrowDown 打开并聚焦第一项，ArrowUp 聚焦最后一项；方向键循环并跳过禁用项，Home / End，Tab 关闭菜单，Escape 将焦点还给触发器）。如需从列表中选择值，请使用 Select。

Package: minerva-design@1.22.2

Renderer: angular

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.2",
  "sourceCommit": "b19e53ff0733e666aa205d6fd5bebb89b1eef18d",
  "sourceDigest": "sha256:080b482abbb8d2745bf31d68a17d7a1299cbb89f0e3f8c1a4d1d91bdeb04d1be",
  "referenceSourceDigest": "sha256:2a0069aef643875e6528da29db3ea67e23924d3d3dcad8f2f45e0400ede619c0"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.2/types.json) or getType() from minerva-design/contracts.

## Documentation

## ContextMenu

Support: beta

Native Angular: MnContextMenu. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnContextMenu"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "items",
    "typeText": "readonly MenuItem[]",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "size",
    "typeText": "\"small\" | \"medium\"",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "expanded",
    "typeText": "readonly string[]",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "radioValues",
    "typeText": "Readonly<Record<string, string>>",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "open",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "disabled",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "forceMount",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "placement",
    "typeText": "Placement",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "label",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  }
]
```

### events

```json
[
  {
    "name": "selected",
    "typeText": "MenuItem",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "MenuItem",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "checkedChange",
    "typeText": "{ id: string; checked: boolean; }",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "{ id: string; checked: boolean; }",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "expandedChange",
    "typeText": "readonly string[]",
    "required": false
  },
  {
    "name": "radioValuesChange",
    "typeText": "Readonly<Record<string, string>>",
    "required": false
  },
  {
    "name": "radioChange",
    "typeText": "{ group: string; value: string; }",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "{ group: string; value: string; }",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "openChange",
    "typeText": "boolean",
    "required": false
  }
]
```

### bindings

```json
[
  {
    "prop": "expanded",
    "event": "expandedChange",
    "syntax": "[(expanded)]"
  },
  {
    "prop": "radioValues",
    "event": "radioValuesChange",
    "syntax": "[(radioValues)]"
  },
  {
    "prop": "open",
    "event": "openChange",
    "syntax": "[(open)]"
  }
]
```

## Menu

Support: beta

Native Angular: MnMenu. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnMenu"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "items",
    "typeText": "readonly MenuItem[]",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "size",
    "typeText": "\"small\" | \"medium\"",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "expanded",
    "typeText": "readonly string[]",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "radioValues",
    "typeText": "Readonly<Record<string, string>>",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "open",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "disabled",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "forceMount",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "placement",
    "typeText": "Placement",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "label",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  }
]
```

### events

```json
[
  {
    "name": "selected",
    "typeText": "MenuItem",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "MenuItem",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "checkedChange",
    "typeText": "{ id: string; checked: boolean; }",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "{ id: string; checked: boolean; }",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "expandedChange",
    "typeText": "readonly string[]",
    "required": false
  },
  {
    "name": "radioValuesChange",
    "typeText": "Readonly<Record<string, string>>",
    "required": false
  },
  {
    "name": "radioChange",
    "typeText": "{ group: string; value: string; }",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "{ group: string; value: string; }",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "openChange",
    "typeText": "boolean",
    "required": false
  }
]
```

### bindings

```json
[
  {
    "prop": "expanded",
    "event": "expandedChange",
    "syntax": "[(expanded)]"
  },
  {
    "prop": "radioValues",
    "event": "radioValuesChange",
    "syntax": "[(radioValues)]"
  },
  {
    "prop": "open",
    "event": "openChange",
    "syntax": "[(open)]"
  }
]
```

## MenuCheckboxItem

Support: n/a

Native Angular: MnMenu.items entries with checked render menuitemcheckbox; checkedChange emits { id, checked } for the controlled owner.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnMenu"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "items",
    "typeText": "readonly MenuItem[]",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "size",
    "typeText": "\"small\" | \"medium\"",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "expanded",
    "typeText": "readonly string[]",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "radioValues",
    "typeText": "Readonly<Record<string, string>>",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "open",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "disabled",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "forceMount",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "placement",
    "typeText": "Placement",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "label",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  }
]
```

### events

```json
[
  {
    "name": "selected",
    "typeText": "MenuItem",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "MenuItem",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "checkedChange",
    "typeText": "{ id: string; checked: boolean; }",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "{ id: string; checked: boolean; }",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "expandedChange",
    "typeText": "readonly string[]",
    "required": false
  },
  {
    "name": "radioValuesChange",
    "typeText": "Readonly<Record<string, string>>",
    "required": false
  },
  {
    "name": "radioChange",
    "typeText": "{ group: string; value: string; }",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "{ group: string; value: string; }",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "openChange",
    "typeText": "boolean",
    "required": false
  }
]
```

### bindings

```json
[
  {
    "prop": "expanded",
    "event": "expandedChange",
    "syntax": "[(expanded)]"
  },
  {
    "prop": "radioValues",
    "event": "radioValuesChange",
    "syntax": "[(radioValues)]"
  },
  {
    "prop": "open",
    "event": "openChange",
    "syntax": "[(open)]"
  }
]
```

## MenuGroup

Support: n/a

Native Angular: MnMenu.items entries with type: "group", label and children render named role=group containers and supply the default group id for radio choices.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnMenu"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "items",
    "typeText": "readonly MenuItem[]",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "size",
    "typeText": "\"small\" | \"medium\"",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "expanded",
    "typeText": "readonly string[]",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "radioValues",
    "typeText": "Readonly<Record<string, string>>",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "open",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "disabled",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "forceMount",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "placement",
    "typeText": "Placement",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "label",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  }
]
```

### events

```json
[
  {
    "name": "selected",
    "typeText": "MenuItem",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "MenuItem",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "checkedChange",
    "typeText": "{ id: string; checked: boolean; }",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "{ id: string; checked: boolean; }",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "expandedChange",
    "typeText": "readonly string[]",
    "required": false
  },
  {
    "name": "radioValuesChange",
    "typeText": "Readonly<Record<string, string>>",
    "required": false
  },
  {
    "name": "radioChange",
    "typeText": "{ group: string; value: string; }",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "{ group: string; value: string; }",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "openChange",
    "typeText": "boolean",
    "required": false
  }
]
```

### bindings

```json
[
  {
    "prop": "expanded",
    "event": "expandedChange",
    "syntax": "[(expanded)]"
  },
  {
    "prop": "radioValues",
    "event": "radioValuesChange",
    "syntax": "[(radioValues)]"
  },
  {
    "prop": "open",
    "event": "openChange",
    "syntax": "[(open)]"
  }
]
```

## MenuItem

Support: n/a

Native Angular: MnMenu.items entries { id, label, disabled, icon, shortcut, children } render native menuitem buttons; selected emits actions and expanded controls nested choices.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnMenu"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "items",
    "typeText": "readonly MenuItem[]",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "size",
    "typeText": "\"small\" | \"medium\"",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "expanded",
    "typeText": "readonly string[]",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "radioValues",
    "typeText": "Readonly<Record<string, string>>",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "open",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "disabled",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "forceMount",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "placement",
    "typeText": "Placement",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "label",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  }
]
```

### events

```json
[
  {
    "name": "selected",
    "typeText": "MenuItem",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "MenuItem",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "checkedChange",
    "typeText": "{ id: string; checked: boolean; }",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "{ id: string; checked: boolean; }",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "expandedChange",
    "typeText": "readonly string[]",
    "required": false
  },
  {
    "name": "radioValuesChange",
    "typeText": "Readonly<Record<string, string>>",
    "required": false
  },
  {
    "name": "radioChange",
    "typeText": "{ group: string; value: string; }",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "{ group: string; value: string; }",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "openChange",
    "typeText": "boolean",
    "required": false
  }
]
```

### bindings

```json
[
  {
    "prop": "expanded",
    "event": "expandedChange",
    "syntax": "[(expanded)]"
  },
  {
    "prop": "radioValues",
    "event": "radioValuesChange",
    "syntax": "[(radioValues)]"
  },
  {
    "prop": "open",
    "event": "openChange",
    "syntax": "[(open)]"
  }
]
```

## MenuLabel

Support: n/a

Native Angular: MnMenu.items entries with type: "label" render noninteractive headings.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnMenu"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "items",
    "typeText": "readonly MenuItem[]",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "size",
    "typeText": "\"small\" | \"medium\"",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "expanded",
    "typeText": "readonly string[]",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "radioValues",
    "typeText": "Readonly<Record<string, string>>",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "open",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "disabled",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "forceMount",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "placement",
    "typeText": "Placement",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "label",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  }
]
```

### events

```json
[
  {
    "name": "selected",
    "typeText": "MenuItem",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "MenuItem",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "checkedChange",
    "typeText": "{ id: string; checked: boolean; }",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "{ id: string; checked: boolean; }",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "expandedChange",
    "typeText": "readonly string[]",
    "required": false
  },
  {
    "name": "radioValuesChange",
    "typeText": "Readonly<Record<string, string>>",
    "required": false
  },
  {
    "name": "radioChange",
    "typeText": "{ group: string; value: string; }",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "{ group: string; value: string; }",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "openChange",
    "typeText": "boolean",
    "required": false
  }
]
```

### bindings

```json
[
  {
    "prop": "expanded",
    "event": "expandedChange",
    "syntax": "[(expanded)]"
  },
  {
    "prop": "radioValues",
    "event": "radioValuesChange",
    "syntax": "[(radioValues)]"
  },
  {
    "prop": "open",
    "event": "openChange",
    "syntax": "[(open)]"
  }
]
```

## MenuRadioItem

Support: n/a

Native Angular: MnMenu.items entries with type: "radio", value and optional group render menuitemradio; radioValues controls one value per group and radioChange emits { group, value }.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnMenu"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "items",
    "typeText": "readonly MenuItem[]",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "size",
    "typeText": "\"small\" | \"medium\"",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "expanded",
    "typeText": "readonly string[]",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "radioValues",
    "typeText": "Readonly<Record<string, string>>",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "open",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "disabled",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "forceMount",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "placement",
    "typeText": "Placement",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "label",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  }
]
```

### events

```json
[
  {
    "name": "selected",
    "typeText": "MenuItem",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "MenuItem",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "checkedChange",
    "typeText": "{ id: string; checked: boolean; }",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "{ id: string; checked: boolean; }",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "expandedChange",
    "typeText": "readonly string[]",
    "required": false
  },
  {
    "name": "radioValuesChange",
    "typeText": "Readonly<Record<string, string>>",
    "required": false
  },
  {
    "name": "radioChange",
    "typeText": "{ group: string; value: string; }",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "{ group: string; value: string; }",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "openChange",
    "typeText": "boolean",
    "required": false
  }
]
```

### bindings

```json
[
  {
    "prop": "expanded",
    "event": "expandedChange",
    "syntax": "[(expanded)]"
  },
  {
    "prop": "radioValues",
    "event": "radioValuesChange",
    "syntax": "[(radioValues)]"
  },
  {
    "prop": "open",
    "event": "openChange",
    "syntax": "[(open)]"
  }
]
```

## MenuSeparator

Support: n/a

Native Angular: MnMenu.items entries with type: "separator" render role=separator elements.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnMenu"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "items",
    "typeText": "readonly MenuItem[]",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "size",
    "typeText": "\"small\" | \"medium\"",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "expanded",
    "typeText": "readonly string[]",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "radioValues",
    "typeText": "Readonly<Record<string, string>>",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "open",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "disabled",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "forceMount",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "placement",
    "typeText": "Placement",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  },
  {
    "name": "label",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts"
  }
]
```

### events

```json
[
  {
    "name": "selected",
    "typeText": "MenuItem",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "MenuItem",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "checkedChange",
    "typeText": "{ id: string; checked: boolean; }",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "{ id: string; checked: boolean; }",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "expandedChange",
    "typeText": "readonly string[]",
    "required": false
  },
  {
    "name": "radioValuesChange",
    "typeText": "Readonly<Record<string, string>>",
    "required": false
  },
  {
    "name": "radioChange",
    "typeText": "{ group: string; value: string; }",
    "required": false,
    "source": "packages/angular/src/components/overlays/index.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "{ group: string; value: string; }",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "openChange",
    "typeText": "boolean",
    "required": false
  }
]
```

### bindings

```json
[
  {
    "prop": "expanded",
    "event": "expandedChange",
    "syntax": "[(expanded)]"
  },
  {
    "prop": "radioValues",
    "event": "radioValuesChange",
    "syntax": "[(radioValues)]"
  },
  {
    "prop": "open",
    "event": "openChange",
    "syntax": "[(open)]"
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

## Example: Named groups and radio choices

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnMenu } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnMenu],
  template: `
<mn-menu label="Display density" [items]="items" [(radioValues)]="values"/><output>Density: {{values['density']}}</output>
  `,
})
export class Example {
  values = {
  "density": "comfortable"
};
  items: import('minerva-design/angular').MenuItem[] = [
  {
    "id": "density",
    "type": "group",
    "label": "Density",
    "children": [
      {
        "id": "comfortable",
        "type": "radio",
        "label": "Comfortable"
      },
      {
        "id": "compact",
        "type": "radio",
        "label": "Compact"
      },
      {
        "id": "unavailable",
        "type": "radio",
        "label": "Unavailable",
        "disabled": true
      }
    ]
  }
];
}

```

## Example: Actions and selection

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnMenu } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnMenu],
  template: `
<mn-menu label="Project actions" [items]="items" (selected)="result=$event.label ?? ''"/><output>{{result}}</output>
  `,
})
export class Example {
  result = "";
  items: import('minerva-design/angular').MenuItem[] = [
  {
    "id": "edit",
    "label": "Edit",
    "icon": "✎",
    "shortcut": "⌘E"
  },
  {
    "id": "duplicate",
    "label": "Duplicate"
  },
  {
    "id": "sep",
    "type": "separator"
  },
  {
    "id": "delete",
    "label": "Delete",
    "disabled": true
  }
];
}

```

## Example: Context menu and checked items

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnContextMenu } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnContextMenu],
  template: `
<mn-context-menu label="Right-click here" [items]="items" (checkedChange)="items=$event.id==='show'?[{id:'show',label:'Show hidden files',checked:$event.checked},items[1]!]:[items[0]!,{id:'sort',label:'Sort by name',checked:$event.checked}]" (selected)="result=$event.label ?? ''"/><output>{{result}} · Hidden: {{items[0]!.checked}} · Sorted: {{items[1]!.checked}}</output>
  `,
})
export class Example {
  result = "";
  items: import('minerva-design/angular').MenuItem[] = [
  {
    "id": "show",
    "label": "Show hidden files",
    "checked": true
  },
  {
    "id": "sort",
    "label": "Sort by name",
    "checked": false
  }
];
}

```

## Example: Nested actions and expanded state

children defines nested choices. expanded is a controlled list of open item IDs, and selected reports the leaf action; disabled choices stay unavailable to pointer and keyboard activation.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnMenu, MnButton } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnMenu, MnButton],
  template: `
<mn-menu label="File actions" [items]="items" [(expanded)]="expanded" (selected)="result=$event.label ?? ''"/><output>{{result || 'Choose a nested action'}} · Expanded: {{expanded.join(', ') || 'none'}}</output><button mnButton variant="ghost" (click)="expanded=[];result=''">Reset menu</button>
  `,
})
export class Example {
  expanded: string[] = [];
  result = "";
  items: import('minerva-design/angular').MenuItem[] = [
  {
    "id": "export",
    "label": "Export",
    "children": [
      {
        "id": "csv",
        "label": "CSV"
      },
      {
        "id": "json",
        "label": "JSON"
      }
    ]
  },
  {
    "id": "restricted",
    "label": "Restricted",
    "disabled": true
  }
];
}

```

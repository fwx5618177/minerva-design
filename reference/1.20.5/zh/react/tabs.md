# Tabs 标签页

将内容分为一次显示一个的面板。无障碍标签页，支持方向键导航、line / enclosed / soft / pills 变体、语义色与垂直方向。

Package: minerva-design@1.20.5

Renderer: react

Locale: zh

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

## Tab

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "Tab"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "value",
    "source": "packages/react/src/components/Tabs/types.ts",
    "kind": "string",
    "typeText": "string",
    "typeRef": "type:e15e314d298fc0d116fc",
    "required": true,
    "description": "Value identifying the tab and its panel (must not contain whitespace)"
  },
  {
    "name": "disabled",
    "source": "packages/react/src/components/Tabs/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Disables the tab (skipped by arrow keys)"
  },
  {
    "name": "color",
    "source": "packages/react/src/components/Tabs/types.ts",
    "kind": "enum",
    "values": [
      "danger",
      "info",
      "neutral",
      "primary",
      "success",
      "warning"
    ],
    "typeText": "ColorScheme | undefined",
    "typeRef": "type:67f905b25ade366da2d8",
    "required": false,
    "description": "Overrides the group color; an explicitly colored tab keeps a tinted background while inactive"
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

## TabList

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "TabList"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "loop",
    "source": "packages/react/src/components/Tabs/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Moves focus from the last tab to the first (and back) with the arrow keys"
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

## TabPanel

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "TabPanel"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "value",
    "source": "packages/react/src/components/Tabs/types.ts",
    "kind": "string",
    "typeText": "string",
    "typeRef": "type:e15e314d298fc0d116fc",
    "required": true,
    "description": "Value of the tab this panel belongs to"
  },
  {
    "name": "forceMount",
    "source": "packages/react/src/components/Tabs/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Keeps the panel mounted (hidden) while its tab is not selected"
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

## Tabs

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "Tabs"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "value",
    "source": "packages/react/src/components/Tabs/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Value of the selected tab (controlled; pair with onChange)"
  },
  {
    "name": "defaultValue",
    "source": "packages/react/src/components/Tabs/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Value of the initially selected tab (uncontrolled)"
  },
  {
    "name": "orientation",
    "source": "packages/react/src/components/Tabs/types.ts",
    "kind": "enum",
    "values": [
      "horizontal",
      "vertical"
    ],
    "typeText": "TabsOrientation | undefined",
    "typeRef": "type:bc68c474309a2b31af1b",
    "default": "horizontal",
    "required": false,
    "description": "Layout and arrow-key direction"
  },
  {
    "name": "activationMode",
    "source": "packages/react/src/components/Tabs/types.ts",
    "kind": "enum",
    "values": [
      "automatic",
      "manual"
    ],
    "typeText": "\"manual\" | \"automatic\" | undefined",
    "typeRef": "type:4d31f17be083237d6f28",
    "default": "automatic",
    "required": false,
    "description": "`automatic` selects a tab when it receives focus; `manual` only on Enter / Space / click, so the parent can confirm before switching"
  },
  {
    "name": "dir",
    "source": "packages/react/src/components/Tabs/types.ts",
    "kind": "enum",
    "values": [
      "ltr",
      "rtl"
    ],
    "typeText": "\"ltr\" | \"rtl\" | undefined",
    "typeRef": "type:4911c4ab558e2c50216a",
    "required": false,
    "description": "Reading direction (affects arrow keys)"
  },
  {
    "name": "variant",
    "source": "packages/react/src/components/Tabs/types.ts",
    "kind": "enum",
    "values": [
      "enclosed",
      "line",
      "pills",
      "soft"
    ],
    "typeText": "TabsVariant | undefined",
    "typeRef": "type:7a9b9d9d419b761fafaf",
    "default": "line",
    "required": false,
    "description": "Visual style"
  },
  {
    "name": "color",
    "source": "packages/react/src/components/Tabs/types.ts",
    "kind": "enum",
    "values": [
      "danger",
      "info",
      "neutral",
      "primary",
      "success",
      "warning"
    ],
    "typeText": "ColorScheme | undefined",
    "typeRef": "type:67f905b25ade366da2d8",
    "default": "primary",
    "required": false,
    "description": "Color of the selection"
  }
]
```

### events

```json
[
  {
    "name": "onChange",
    "source": "packages/react/src/components/Tabs/types.ts",
    "kind": "function",
    "typeText": "((value: string) => void) | undefined",
    "typeRef": "type:3030f2f76a0f9946e48e",
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
    "required": false,
    "description": "Called with the value of the newly selected tab"
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
    "prop": "value",
    "event": "onChange",
    "syntax": "value={value} onChange={handler}"
  }
]
```

## API

```json
{
  "TabsProps": {
    "source": "react/src/components/Tabs/types.ts",
    "description": "Props of `Tabs`, the root of a tabs group",
    "kind": "interface",
    "extends": [
      "Omit<HTMLAttributes<HTMLDivElement>, \"onChange\" | \"defaultValue\" | \"dir\" | \"color\">"
    ],
    "props": [
      {
        "name": "value",
        "type": "string",
        "required": false,
        "description": "Value of the selected tab (controlled; pair with onChange)"
      },
      {
        "name": "defaultValue",
        "type": "string",
        "required": false,
        "description": "Value of the initially selected tab (uncontrolled)"
      },
      {
        "name": "onChange",
        "type": "(value: string) => void",
        "required": false,
        "description": "Called with the value of the newly selected tab"
      },
      {
        "name": "orientation",
        "type": "TabsOrientation",
        "required": false,
        "default": "\"horizontal\"",
        "description": "Layout and arrow-key direction"
      },
      {
        "name": "activationMode",
        "type": "\"automatic\" | \"manual\"",
        "required": false,
        "default": "\"automatic\"",
        "description": "`automatic` selects a tab when it receives focus; `manual` only on Enter / Space / click, so the parent can confirm before switching"
      },
      {
        "name": "dir",
        "type": "\"ltr\" | \"rtl\"",
        "required": false,
        "description": "Reading direction (affects arrow keys)"
      },
      {
        "name": "variant",
        "type": "TabsVariant",
        "required": false,
        "default": "\"line\"",
        "description": "Visual style"
      },
      {
        "name": "color",
        "type": "ColorScheme",
        "required": false,
        "default": "\"primary\"",
        "description": "Color of the selection"
      },
      {
        "name": "children",
        "type": "ReactNode",
        "required": false,
        "description": "`TabList` and `TabPanel` elements"
      },
      {
        "name": "ref",
        "type": "Ref<HTMLDivElement>",
        "required": false,
        "description": "Ref to the root `<div>` element"
      }
    ]
  },
  "TabListProps": {
    "source": "react/src/components/Tabs/types.ts",
    "description": "Props of `TabList`, the `role=\"tablist\"` container of the tabs",
    "kind": "interface",
    "extends": [
      "HTMLAttributes<HTMLDivElement>"
    ],
    "props": [
      {
        "name": "loop",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Moves focus from the last tab to the first (and back) with the arrow keys"
      },
      {
        "name": "ref",
        "type": "Ref<HTMLDivElement>",
        "required": false,
        "description": "Ref to the tab list `<div>` element"
      }
    ]
  },
  "TabProps": {
    "source": "react/src/components/Tabs/types.ts",
    "description": "Props of `Tab`, a `role=\"tab\"` button",
    "kind": "interface",
    "extends": [
      "Omit<ButtonHTMLAttributes<HTMLButtonElement>, \"value\" | \"color\">"
    ],
    "props": [
      {
        "name": "value",
        "type": "string",
        "required": true,
        "description": "Value identifying the tab and its panel (must not contain whitespace)"
      },
      {
        "name": "children",
        "type": "ReactNode",
        "required": true,
        "description": "Tab content"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables the tab (skipped by arrow keys)"
      },
      {
        "name": "color",
        "type": "ColorScheme",
        "required": false,
        "description": "Overrides the group color; an explicitly colored tab keeps a tinted background while inactive"
      },
      {
        "name": "ref",
        "type": "Ref<HTMLButtonElement>",
        "required": false,
        "description": "Ref to the `<button>` element"
      }
    ]
  },
  "TabPanelProps": {
    "source": "react/src/components/Tabs/types.ts",
    "description": "Props of `TabPanel`, the `role=\"tabpanel\"` content of a tab",
    "kind": "interface",
    "extends": [
      "HTMLAttributes<HTMLDivElement>"
    ],
    "props": [
      {
        "name": "value",
        "type": "string",
        "required": true,
        "description": "Value of the tab this panel belongs to"
      },
      {
        "name": "forceMount",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Keeps the panel mounted (hidden) while its tab is not selected"
      },
      {
        "name": "ref",
        "type": "Ref<HTMLDivElement>",
        "required": false,
        "description": "Ref to the panel `<div>` element"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:Tabs": {
    "kind": "cssVars",
    "source": "react/src/components/Tabs",
    "vars": [
      {
        "name": "--tabs-gap",
        "description": "Space between the tabs of the list"
      },
      {
        "name": "--tabs-font-size",
        "description": "Font size of the tabs"
      },
      {
        "name": "--tabs-trigger-padding-x",
        "description": "Horizontal padding of a tab (every variant)"
      },
      {
        "name": "--tabs-trigger-padding-y",
        "description": "Vertical padding of a tab (every variant)"
      },
      {
        "name": "--tabs-trigger-min-height",
        "description": "Minimum height of a tab (pills default to the density's control height minus 4px)"
      },
      {
        "name": "--tabs-radius",
        "description": "Corner radius of enclosed / soft / pill tabs (defaults to --radius-md)"
      },
      {
        "name": "--tabs-indicator-width",
        "description": "Thickness of the line indicator"
      },
      {
        "name": "--tabs-panel-padding",
        "description": "Padding of the panel"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 基础用法

初始显示 Overview；Reviews 展示评论，Similar books 保持禁用。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/tabs/demos/basic.tsx

```tsx
import { Tab, TabList, TabPanel, Tabs } from "minerva-design";

export default function BasicDemo() {
  return (
    <Tabs defaultValue="overview">
      <TabList aria-label="Book sections">
        <Tab value="overview">Overview</Tab>
        <Tab value="reviews">Reviews</Tab>
        <Tab value="similar" disabled>
          Similar books
        </Tab>
      </TabList>
      <TabPanel value="overview">
        A desert planet, a noble family and a precious spice.
      </TabPanel>
      <TabPanel value="reviews">“A masterpiece of world building.”</TabPanel>
      <TabPanel value="similar">Coming soon.</TabPanel>
    </Tabs>
  );
}

```

## Example: 颜色与手动激活

color 设置整组颜色；Tab 的 color 使该标签在未选中时也保持着色。activationMode="manual" 时聚焦不会选中，父组件可在 onChange 中确认切换。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/tabs/demos/colors.tsx

```tsx
import { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "minerva-design";

export default function ColorsDemo() {
  const [language, setLanguage] = useState("en");
  return (
    <Tabs
      variant="pills"
      color="primary"
      value={language}
      onChange={setLanguage}
      activationMode="manual"
    >
      <TabList aria-label="Languages">
        <Tab value="en">English</Tab>
        <Tab value="ja" color="success">
          Japanese
        </Tab>
        <Tab value="fr" color="warning">
          French
        </Tab>
        <Tab value="de" color="danger">
          German
        </Tab>
      </TabList>
      <TabPanel value={language}>
        Editing the “{language}” translation.
      </TabPanel>
    </Tabs>
  );
}

```

## Example: 变体

同一组 Hot、New、Completed 标签展示 line、enclosed、soft、pills 四种外观，均默认选中 Hot。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/tabs/demos/variants.tsx

```tsx
import { Tab, TabList, Tabs, type TabsVariant } from "minerva-design";

const variants: TabsVariant[] = ["line", "enclosed", "soft", "pills"];

export default function VariantsDemo() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      {variants.map((variant) => (
        <Tabs key={variant} variant={variant} defaultValue="hot">
          <TabList aria-label={`${variant} tabs`}>
            <Tab value="hot">Hot</Tab>
            <Tab value="new">New</Tab>
            <Tab value="completed">Completed</Tab>
          </TabList>
        </Tabs>
      ))}
    </div>
  );
}

```

## Example: 垂直方向

orientation="vertical" 纵向排列标签，使用上下方向键切换。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/tabs/demos/vertical.tsx

```tsx
import { Tab, TabList, TabPanel, Tabs } from "minerva-design";

export default function VerticalDemo() {
  return (
    <Tabs defaultValue="profile" orientation="vertical">
      <TabList aria-label="Settings">
        <Tab value="profile">Profile</Tab>
        <Tab value="notifications">Notifications</Tab>
        <Tab value="security">Security</Tab>
      </TabList>
      <TabPanel value="profile" style={{ paddingInline: 16 }}>
        Your name, avatar and bio.
      </TabPanel>
      <TabPanel value="notifications" style={{ paddingInline: 16 }}>
        Email and push notifications.
      </TabPanel>
      <TabPanel value="security" style={{ paddingInline: 16 }}>
        Password and two-factor authentication.
      </TabPanel>
    </Tabs>
  );
}

```

# Alert 警告提示

在页面中展示重要信息，例如系统通知或操作结果。

Package: minerva-design@1.22.2

Renderer: react

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.2",
  "sourceCommit": "93eaa8e002773e63a78341d4424f9e832b7305a9",
  "sourceDigest": "sha256:62e49d8be55ca2bb85e8afd17b7862d068358e8ea94178c66288911996ed036e",
  "referenceSourceDigest": "sha256:10025b0c7fa1af3c2b0e9de9a1b6d51e6e81c9a41c96e7fcba66a58604dda51c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.2/types.json) or getType() from minerva-design/contracts.

## Documentation

## Alert

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "Alert"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "title",
    "source": "packages/react/src/components/Alert/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Alert title"
  },
  {
    "name": "color",
    "source": "packages/react/src/components/Alert/types.ts",
    "kind": "enum",
    "values": [
      "danger",
      "info",
      "success",
      "warning"
    ],
    "typeText": "\"success\" | \"warning\" | \"danger\" | \"info\" | undefined",
    "typeRef": "type:7e38efb605091c7a09ec",
    "default": "info",
    "required": false,
    "description": "Semantic (status) color, which also sets the default icon and the role"
  },
  {
    "name": "variant",
    "source": "packages/react/src/components/Alert/types.ts",
    "kind": "enum",
    "values": [
      "outline",
      "solid",
      "subtle"
    ],
    "typeText": "\"solid\" | \"subtle\" | \"outline\" | undefined",
    "typeRef": "type:2399c7b51bc7a672b1d1",
    "default": "subtle",
    "required": false,
    "description": "Visual style: `subtle` (tinted background), `outline` (transparent background with a colored border) or `solid` (filled with the color)"
  },
  {
    "name": "size",
    "source": "packages/react/src/components/Alert/types.ts",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "small"
    ],
    "typeText": "AlertSize | undefined",
    "typeRef": "type:aa54de962734661a5ebf",
    "default": "medium",
    "required": false,
    "description": "Alert size"
  },
  {
    "name": "showIcon",
    "source": "packages/react/src/components/Alert/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Shows the status icon of the color"
  },
  {
    "name": "icon",
    "source": "packages/react/src/components/Alert/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Custom icon, replacing the status icon"
  },
  {
    "name": "closable",
    "source": "packages/react/src/components/Alert/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows a close button"
  },
  {
    "name": "closeIcon",
    "source": "packages/react/src/components/Alert/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Custom close icon"
  },
  {
    "name": "animation",
    "source": "packages/react/src/components/Alert/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Plays an entrance animation"
  },
  {
    "name": "animationName",
    "source": "packages/react/src/components/Alert/types.ts",
    "kind": "enum",
    "values": [
      "bounce",
      "fadeIn",
      "slideIn",
      "zoom"
    ],
    "typeText": "\"fadeIn\" | \"slideIn\" | \"bounce\" | \"zoom\" | undefined",
    "typeRef": "type:fedd029da81b0ceac991",
    "default": "slideIn",
    "required": false,
    "description": "Entrance animation name"
  },
  {
    "name": "action",
    "source": "packages/react/src/components/Alert/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Action area rendered on the right, e.g. buttons"
  },
  {
    "name": "banner",
    "source": "packages/react/src/components/Alert/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Banner mode, suited to page-level notices at the top of a page"
  },
  {
    "name": "elevation",
    "source": "packages/react/src/components/Alert/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Adds a drop shadow"
  },
  {
    "name": "rounded",
    "source": "packages/react/src/components/Alert/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Rounds the corners"
  },
  {
    "name": "borderRadius",
    "source": "packages/react/src/components/Alert/types.ts",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "required": false,
    "description": "Custom corner radius"
  },
  {
    "name": "collapsible",
    "source": "packages/react/src/components/Alert/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Lets the content be expanded and collapsed (requires a title)"
  },
  {
    "name": "expanded",
    "source": "packages/react/src/components/Alert/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Whether the content is expanded (controlled); use together with onExpand"
  },
  {
    "name": "defaultExpanded",
    "source": "packages/react/src/components/Alert/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Whether the content is initially expanded (uncontrolled)"
  },
  {
    "name": "closeLabel",
    "source": "packages/react/src/components/Alert/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label of the close button"
  },
  {
    "name": "expandLabel",
    "source": "packages/react/src/components/Alert/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label of the toggle while the content is collapsed"
  },
  {
    "name": "collapseLabel",
    "source": "packages/react/src/components/Alert/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label of the toggle while the content is expanded"
  },
  {
    "name": "iconLabel",
    "source": "packages/react/src/components/Alert/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label of the status icon"
  },
  {
    "name": "returnFocus",
    "source": "packages/react/src/components/Alert/types.ts",
    "kind": "union",
    "typeText": "FocusTarget | undefined",
    "typeRef": "type:ba777fc4f10d54579bf0",
    "parameters": [],
    "returnType": {
      "typeText": "HTMLElement | null | undefined",
      "typeRef": "type:34a4a66f327d7b469151"
    },
    "required": false,
    "description": "Element receiving focus after the alert is closed with its close button: an element, a ref or a getter. Without it focus moves to the next focusable element after the alert (else the previous one, else its container), never to <body>"
  },
  {
    "name": "role",
    "source": "packages/react/src/components/Alert/types.ts",
    "kind": "union",
    "typeText": "AriaRole | undefined",
    "typeRef": "type:40806c1dba45f4ea6730",
    "required": false,
    "description": "ARIA role of the alert. Danger and warning interrupt (\"alert\"), info and success are polite (\"status\")"
  }
]
```

### events

```json
[
  {
    "name": "onClose",
    "source": "packages/react/src/components/Alert/types.ts",
    "kind": "function",
    "typeText": "((e: MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined",
    "typeRef": "type:bda007bd2327da91fef1",
    "parameters": [
      {
        "name": "e",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "MouseEvent<HTMLButtonElement, MouseEvent>",
        "typeRef": "type:fecbcb60a5c2a879de00"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the close button is clicked"
  },
  {
    "name": "onExpand",
    "source": "packages/react/src/components/Alert/types.ts",
    "kind": "function",
    "typeText": "((expanded: boolean) => void) | undefined",
    "typeRef": "type:d54a1a80f61361f9b34a",
    "parameters": [
      {
        "name": "expanded",
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
    "required": false,
    "description": "Called with the new state when the content is expanded or collapsed"
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

## API

```json
{
  "AlertProps": {
    "source": "react/src/components/Alert/types.ts",
    "kind": "interface",
    "extends": [
      "Omit<HTMLAttributes<HTMLDivElement>, \"title\" | \"children\" | \"color\">"
    ],
    "props": [
      {
        "name": "title",
        "type": "React.ReactNode",
        "required": false,
        "description": "Alert title"
      },
      {
        "name": "children",
        "type": "React.ReactNode",
        "required": false,
        "description": "Alert content"
      },
      {
        "name": "color",
        "type": "Extract<ColorScheme, \"info\" | \"success\" | \"warning\" | \"danger\">",
        "required": false,
        "default": "\"info\"",
        "description": "Semantic (status) color, which also sets the default icon and the role"
      },
      {
        "name": "variant",
        "type": "\"subtle\" | \"outline\" | \"solid\"",
        "required": false,
        "default": "\"subtle\"",
        "description": "Visual style: `subtle` (tinted background), `outline` (transparent background with a colored border) or `solid` (filled with the color)"
      },
      {
        "name": "size",
        "type": "AlertSize",
        "required": false,
        "default": "\"medium\"",
        "description": "Alert size"
      },
      {
        "name": "showIcon",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Shows the status icon of the color"
      },
      {
        "name": "icon",
        "type": "React.ReactNode",
        "required": false,
        "description": "Custom icon, replacing the status icon"
      },
      {
        "name": "closable",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Shows a close button"
      },
      {
        "name": "closeIcon",
        "type": "React.ReactNode",
        "required": false,
        "description": "Custom close icon"
      },
      {
        "name": "onClose",
        "type": "(e: React.MouseEvent<HTMLButtonElement>) => void",
        "required": false,
        "description": "Called when the close button is clicked"
      },
      {
        "name": "animation",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Plays an entrance animation"
      },
      {
        "name": "animationName",
        "type": "\"slideIn\" | \"fadeIn\" | \"bounce\" | \"zoom\"",
        "required": false,
        "default": "\"slideIn\"",
        "description": "Entrance animation name"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional class name"
      },
      {
        "name": "style",
        "type": "React.CSSProperties",
        "required": false,
        "description": "Inline styles"
      },
      {
        "name": "action",
        "type": "React.ReactNode",
        "required": false,
        "description": "Action area rendered on the right, e.g. buttons"
      },
      {
        "name": "banner",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Banner mode, suited to page-level notices at the top of a page"
      },
      {
        "name": "elevation",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Adds a drop shadow"
      },
      {
        "name": "rounded",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Rounds the corners"
      },
      {
        "name": "borderRadius",
        "type": "number | string",
        "required": false,
        "description": "Custom corner radius"
      },
      {
        "name": "collapsible",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Lets the content be expanded and collapsed (requires a title)"
      },
      {
        "name": "expanded",
        "type": "boolean",
        "required": false,
        "description": "Whether the content is expanded (controlled); use together with onExpand"
      },
      {
        "name": "defaultExpanded",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Whether the content is initially expanded (uncontrolled)"
      },
      {
        "name": "onExpand",
        "type": "(expanded: boolean) => void",
        "required": false,
        "description": "Called with the new state when the content is expanded or collapsed"
      },
      {
        "name": "closeLabel",
        "type": "string",
        "required": false,
        "default": "\"Close\" (localized)",
        "description": "Accessible label of the close button"
      },
      {
        "name": "expandLabel",
        "type": "string",
        "required": false,
        "default": "\"Expand\" (localized)",
        "description": "Accessible label of the toggle while the content is collapsed"
      },
      {
        "name": "collapseLabel",
        "type": "string",
        "required": false,
        "default": "\"Collapse\" (localized)",
        "description": "Accessible label of the toggle while the content is expanded"
      },
      {
        "name": "iconLabel",
        "type": "string",
        "required": false,
        "default": "\"{color} icon\", e.g. \"info icon\" (localized)",
        "description": "Accessible label of the status icon"
      },
      {
        "name": "returnFocus",
        "type": "FocusTarget",
        "required": false,
        "description": "Element receiving focus after the alert is closed with its close button: an element, a ref or a getter. Without it focus moves to the next focusable element after the alert (else the previous one, else its container), never to <body>"
      },
      {
        "name": "role",
        "type": "React.AriaRole",
        "required": false,
        "default": "\"alert\" for danger / warning, \"status\" otherwise",
        "description": "ARIA role of the alert. Danger and warning interrupt (\"alert\"), info and success are polite (\"status\")"
      },
      {
        "name": "ref",
        "type": "Ref<HTMLDivElement>",
        "required": false,
        "description": "Ref to the root <div> element"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:Alert": {
    "kind": "cssVars",
    "source": "react/src/components/Alert",
    "vars": [
      {
        "name": "--alert-padding",
        "description": "Padding (every size; defaults to the padding of the size)"
      },
      {
        "name": "--alert-radius",
        "description": "Corner radius (defaults to --radius-sm, --radius-lg when rounded)"
      },
      {
        "name": "--alert-font-size",
        "description": "Font size (every size)"
      },
      {
        "name": "--alert-icon-size",
        "description": "Size of the status icon (every size)"
      },
      {
        "name": "--alert-gap",
        "description": "Space between the icon, the content and the actions"
      },
      {
        "name": "--alert-shadow",
        "description": "Shadow of the elevated alert (defaults to --shadow-sm)"
      },
      {
        "name": "--alert-margin-bottom",
        "description": "Space below the alert"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 动画

选择入场动画或将其关闭。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/alert/demos/animations.tsx

```tsx
import { useState } from "react";
import { Alert, Button } from "minerva-design";

const names = ["slideIn", "fadeIn", "bounce", "zoom"] as const;

export default function AnimationsDemo() {
  const [key, setKey] = useState(0);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Button
        size="small"
        color="neutral"
        variant="outline"
        onClick={() => setKey((k) => k + 1)}
      >
        Replay
      </Button>
      <div key={key} style={{ display: "grid", gap: 12, width: "100%" }}>
        {names.map((name) => (
          <Alert key={name} animationName={name}>
            animationName=&quot;{name}&quot;
          </Alert>
        ))}
        <Alert animation={false}>animation=&#123;false&#125;</Alert>
      </div>
    </div>
  );
}

```

## Example: 外观

自定义图标、阴影、outline 与 solid 变体以及圆角等选项。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-icons

Documentation context imports: none

### apps/docs/src/docs/pages/alert/demos/appearance.tsx

```tsx
import { Alert } from "minerva-design";
import { FiGift } from "react-icons/fi";

export default function AppearanceDemo() {
  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Alert color="success" icon={<FiGift />} elevation>
        Custom icon with an elevated shadow.
      </Alert>
      <Alert color="info" variant="outline" rounded={false}>
        Outline variant with square corners.
      </Alert>
      <Alert color="info" variant="solid" borderRadius={16}>
        Solid variant with a 16px radius.
      </Alert>
    </div>
  );
}

```

## Example: 横幅

适用于页面顶部通知的横幅模式。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/alert/demos/banner.tsx

```tsx
import { Alert } from "minerva-design";

export default function BannerDemo() {
  return (
    <Alert color="warning" banner closable>
      You are viewing a read-only copy of this document.
    </Alert>
  );
}

```

## Example: 可关闭

closable 添加关闭按钮；closeIcon 替换其图标，关闭时调用 onClose。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-icons

Documentation context imports: none

### apps/docs/src/docs/pages/alert/demos/closable.tsx

```tsx
import { useState } from "react";
import { Alert, Button } from "minerva-design";
import { IoCloseCircleOutline } from "react-icons/io5";

export default function ClosableDemo() {
  const [key, setKey] = useState(0);
  const [closed, setClosed] = useState(0);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div key={key} style={{ display: "grid", gap: 12, width: "100%" }}>
        <Alert color="info" closable onClose={() => setClosed((n) => n + 1)}>
          Close me with the button on the right.
        </Alert>
        <Alert
          color="warning"
          closable
          closeIcon={<IoCloseCircleOutline />}
          onClose={() => setClosed((n) => n + 1)}
        >
          This alert uses a custom close icon.
        </Alert>
      </div>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <Button
          size="small"
          color="neutral"
          variant="outline"
          onClick={() => setKey((k) => k + 1)}
        >
          Reset
        </Button>
        <span>Closed: {closed}</span>
      </div>
    </div>
  );
}

```

## Example: 可折叠

在有标题时，collapsible 允许用户展开和收起内容。可以用 expanded + onExpand 受控，也可以只用 defaultExpanded 设置初始状态。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/alert/demos/collapsible.tsx

```tsx
import { useState } from "react";
import { Alert } from "minerva-design";

export default function CollapsibleDemo() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Alert
        color="info"
        title={`Release notes (${expanded ? "expanded" : "collapsed"})`}
        collapsible
        expanded={expanded}
        onExpand={setExpanded}
      >
        Added dark mode, improved keyboard navigation and fixed several layout
        issues on small screens.
      </Alert>
      <Alert color="success" title="Uncontrolled" collapsible>
        defaultExpanded (true by default) sets the initial state; the alert then
        manages it on its own.
      </Alert>
    </div>
  );
}

```

## Example: 颜色

color 设置状态：info（默认）、success、warning 和 danger，同时决定图标与 role。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/alert/demos/colors.tsx

```tsx
import { Alert } from "minerva-design";

export default function ColorsDemo() {
  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Alert color="info">A new version is available.</Alert>
      <Alert color="success">Your changes have been saved.</Alert>
      <Alert color="warning">Your trial ends in 3 days.</Alert>
      <Alert color="danger">The payment could not be processed.</Alert>
    </div>
  );
}

```

## Example: 关闭后的焦点

通过关闭按钮关闭警告提示后，焦点不会落到页面上：它会移到警告之后的下一个可聚焦元素（没有则移到前一个，再没有则移到其容器），或移到 returnFocus 指定的元素（元素、ref 或函数）。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/alert/demos/return-focus.tsx

```tsx
import { useRef, useState } from "react";
import { Alert, Button } from "minerva-design";

export default function ReturnFocusDemo() {
  const [key, setKey] = useState(0);
  const resetRef = useRef<HTMLButtonElement>(null);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div key={key} style={{ display: "grid", gap: 12, width: "100%" }}>
        <Alert color="info" closable>
          Closing this alert moves focus to the next focusable element.
        </Alert>
        <Alert color="success" closable returnFocus={resetRef}>
          Closing this alert moves focus to the Reset button (returnFocus).
        </Alert>
      </div>
      <div style={{ display: "flex", gap: 12 }}>
        <Button size="small" variant="outline" color="neutral">
          Next focusable
        </Button>
        <Button
          ref={resetRef}
          size="small"
          variant="outline"
          color="neutral"
          onClick={() => setKey((k) => k + 1)}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}

```

## Example: 尺寸

小、中（默认）、大三种尺寸。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/alert/demos/sizes.tsx

```tsx
import { Alert } from "minerva-design";

export default function SizesDemo() {
  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Alert size="small">Small alert</Alert>
      <Alert size="medium">Medium alert</Alert>
      <Alert size="large">Large alert</Alert>
    </div>
  );
}

```

## Example: 变体

variant 设置视觉样式：subtle（默认，浅色背景）、outline（彩色边框）或 solid（以颜色填充）。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/alert/demos/variants.tsx

```tsx
import { Alert } from "minerva-design";

export default function VariantsDemo() {
  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Alert color="warning" variant="subtle">
        Subtle (default): tinted background.
      </Alert>
      <Alert color="warning" variant="outline">
        Outline: transparent background with a colored border.
      </Alert>
      <Alert color="warning" variant="solid">
        Solid: filled with the color.
      </Alert>
    </div>
  );
}

```

## Example: 带操作

通过 action 在右侧渲染按钮或链接。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/alert/demos/with-action.tsx

```tsx
import { Alert, Button } from "minerva-design";

export default function WithActionDemo() {
  return (
    <Alert
      color="danger"
      title="Sync failed"
      action={
        <Button size="small" color="danger">
          Retry
        </Button>
      }
    >
      We could not reach the server. Check your connection and try again.
    </Alert>
  );
}

```

## Example: 带标题

在内容上方添加标题。showIcon={false} 可隐藏图标。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/alert/demos/with-title.tsx

```tsx
import { Alert } from "minerva-design";

export default function WithTitleDemo() {
  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Alert color="success" title="Deployment complete">
        Version 2.4.0 is now live in production.
      </Alert>
      <Alert color="info" title="Scheduled maintenance" showIcon={false}>
        The service will be unavailable on Sunday from 02:00 to 04:00 UTC.
      </Alert>
    </div>
  );
}

```

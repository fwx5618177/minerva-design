# Alert アラート

システム通知や操作結果など、重要なメッセージをページ内に表示します。

Package: minerva-design@1.20.5

Renderer: native

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.5",
  "sourceCommit": "fe15b45f84b480cdd9cfec147df037927ba34a6b",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:0dc58bd28a1a59067b94630bd49c5b94d839bdc57ee30a0eaa7de1d0a9681cfb"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.5/types.json) or getType() from minerva-design/contracts.

## Documentation

## Alert

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
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
    "source": "packages/native/src/components/Alert/Alert.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Alert title"
  },
  {
    "name": "color",
    "source": "packages/native/src/components/Alert/Alert.tsx",
    "kind": "enum",
    "values": [
      "danger",
      "info",
      "success",
      "warning"
    ],
    "typeText": "AlertColor | undefined",
    "typeRef": "type:3c33aca85f8e2fdc7e4e",
    "default": "info",
    "required": false,
    "description": "Semantic (status) color, which also sets the default icon and the role"
  },
  {
    "name": "variant",
    "source": "packages/native/src/components/Alert/Alert.tsx",
    "kind": "enum",
    "values": [
      "outline",
      "solid",
      "subtle"
    ],
    "typeText": "AlertVariant | undefined",
    "typeRef": "type:914f8d89f552bcd0ed5b",
    "default": "subtle",
    "required": false,
    "description": "Visual style: `subtle` (tinted background), `outline` (colored border) or `solid` (filled)"
  },
  {
    "name": "size",
    "source": "packages/native/src/components/Alert/Alert.tsx",
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
    "description": "Alert size (padding and text sizes)"
  },
  {
    "name": "showIcon",
    "source": "packages/native/src/components/Alert/Alert.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Shows the status icon of the color"
  },
  {
    "name": "icon",
    "source": "packages/native/src/components/Alert/Alert.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Custom icon, replacing the status icon"
  },
  {
    "name": "iconLabel",
    "source": "packages/native/src/components/Alert/Alert.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label of the status icon"
  },
  {
    "name": "closable",
    "source": "packages/native/src/components/Alert/Alert.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows a close button; pressing it hides the alert and calls `onClose`"
  },
  {
    "name": "closeIcon",
    "source": "packages/native/src/components/Alert/Alert.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Custom close icon"
  },
  {
    "name": "closeLabel",
    "source": "packages/native/src/components/Alert/Alert.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label of the close button"
  },
  {
    "name": "action",
    "source": "packages/native/src/components/Alert/Alert.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Action area rendered on the right, e.g. buttons"
  },
  {
    "name": "banner",
    "source": "packages/native/src/components/Alert/Alert.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Banner mode for page-level notices: full width, square corners, no side borders"
  },
  {
    "name": "elevation",
    "source": "packages/native/src/components/Alert/Alert.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Adds a drop shadow"
  },
  {
    "name": "rounded",
    "source": "packages/native/src/components/Alert/Alert.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Rounds the corners"
  },
  {
    "name": "borderRadius",
    "source": "packages/native/src/components/Alert/Alert.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Custom corner radius"
  },
  {
    "name": "animation",
    "source": "packages/native/src/components/Alert/Alert.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Plays an entrance animation (fade + slide; none under reduced motion)"
  },
  {
    "name": "collapsible",
    "source": "packages/native/src/components/Alert/Alert.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Lets the description be expanded and collapsed (requires a title)"
  },
  {
    "name": "expanded",
    "source": "packages/native/src/components/Alert/Alert.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Whether the description is expanded (controlled; pair with `onExpand`)"
  },
  {
    "name": "defaultExpanded",
    "source": "packages/native/src/components/Alert/Alert.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Whether the description is initially expanded (uncontrolled)"
  },
  {
    "name": "expandLabel",
    "source": "packages/native/src/components/Alert/Alert.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label of the toggle while collapsed"
  },
  {
    "name": "collapseLabel",
    "source": "packages/native/src/components/Alert/Alert.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label of the toggle while expanded"
  },
  {
    "name": "role",
    "source": "packages/native/src/components/Alert/Alert.tsx",
    "kind": "enum",
    "values": [
      "alert",
      "status"
    ],
    "typeText": "\"alert\" | \"status\" | undefined",
    "typeRef": "type:dc784dc1d31507abf08f",
    "required": false,
    "description": "Role of the alert: danger and warning interrupt (\"alert\", assertive live region), info and success are polite (\"status\")"
  }
]
```

### events

```json
[
  {
    "name": "onClose",
    "source": "packages/native/src/components/Alert/Alert.tsx",
    "kind": "function",
    "typeText": "((event: GestureResponderEvent) => void) | undefined",
    "typeRef": "type:94093aa6cac3220ab87b",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "GestureResponderEvent",
        "typeRef": "type:2a25eb9466bc75075bdf"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the close button is pressed"
  },
  {
    "name": "onExpand",
    "source": "packages/native/src/components/Alert/Alert.tsx",
    "kind": "function",
    "typeText": "((expanded: boolean) => void) | undefined",
    "typeRef": "type:f04ed2f90390dcf10786",
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
    "description": "Called with the requested expanded state"
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
  "native:AlertProps": {
    "source": "native/src/components/Alert/Alert.tsx",
    "kind": "interface",
    "extends": [
      "Omit<ViewProps, \"style\" | \"children\">"
    ],
    "props": [
      {
        "name": "title",
        "type": "ReactNode",
        "required": false,
        "description": "Alert title"
      },
      {
        "name": "children",
        "type": "ReactNode",
        "required": false,
        "description": "Description (body) of the alert"
      },
      {
        "name": "color",
        "type": "AlertColor",
        "required": false,
        "default": "\"info\"",
        "description": "Semantic (status) color, which also sets the default icon and the role"
      },
      {
        "name": "variant",
        "type": "AlertVariant",
        "required": false,
        "default": "\"subtle\"",
        "description": "Visual style: `subtle` (tinted background), `outline` (colored border) or `solid` (filled)"
      },
      {
        "name": "size",
        "type": "AlertSize",
        "required": false,
        "default": "\"medium\"",
        "description": "Alert size (padding and text sizes)"
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
        "type": "ReactNode",
        "required": false,
        "description": "Custom icon, replacing the status icon"
      },
      {
        "name": "iconLabel",
        "type": "string",
        "required": false,
        "default": "the \"alert.icon.<color>\" message",
        "description": "Accessible label of the status icon"
      },
      {
        "name": "closable",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Shows a close button; pressing it hides the alert and calls `onClose`"
      },
      {
        "name": "closeIcon",
        "type": "ReactNode",
        "required": false,
        "description": "Custom close icon"
      },
      {
        "name": "onClose",
        "type": "(event: GestureResponderEvent) => void",
        "required": false,
        "description": "Called when the close button is pressed"
      },
      {
        "name": "closeLabel",
        "type": "string",
        "required": false,
        "default": "the \"alert.close\" message",
        "description": "Accessible label of the close button"
      },
      {
        "name": "action",
        "type": "ReactNode",
        "required": false,
        "description": "Action area rendered on the right, e.g. buttons"
      },
      {
        "name": "banner",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Banner mode for page-level notices: full width, square corners, no side borders"
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
        "type": "number",
        "required": false,
        "description": "Custom corner radius"
      },
      {
        "name": "animation",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Plays an entrance animation (fade + slide; none under reduced motion)"
      },
      {
        "name": "collapsible",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Lets the description be expanded and collapsed (requires a title)"
      },
      {
        "name": "expanded",
        "type": "boolean",
        "required": false,
        "description": "Whether the description is expanded (controlled; pair with `onExpand`)"
      },
      {
        "name": "defaultExpanded",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Whether the description is initially expanded (uncontrolled)"
      },
      {
        "name": "onExpand",
        "type": "(expanded: boolean) => void",
        "required": false,
        "description": "Called with the requested expanded state"
      },
      {
        "name": "expandLabel",
        "type": "string",
        "required": false,
        "default": "the \"alert.expand\" message",
        "description": "Accessible label of the toggle while collapsed"
      },
      {
        "name": "collapseLabel",
        "type": "string",
        "required": false,
        "default": "the \"alert.collapse\" message",
        "description": "Accessible label of the toggle while expanded"
      },
      {
        "name": "role",
        "type": "\"alert\" | \"status\"",
        "required": false,
        "default": "\"alert\" for danger / warning, else \"status\"",
        "description": "Role of the alert: danger and warning interrupt (\"alert\", assertive live region), info and success are polite (\"status\")"
      },
      {
        "name": "style",
        "type": "StyleProp<ViewStyle>",
        "required": false,
        "description": "Style of the root view"
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

## Example: basic

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/alert/native/basic.tsx

```tsx
import { Alert } from "minerva-design/native";
export default function Basic() {
  return (
    <Alert title="Changes saved" color="success">
      Your preferences were updated.
    </Alert>
  );
}

```

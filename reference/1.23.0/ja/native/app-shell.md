# AppShell アプリシェル

アプリの外枠：折りたたみ・フローティング可能なサイドバー、固定ヘッダー、単一の main ランドマーク。768px 以下ではナビゲーションがドロワーに移動します。

Package: minerva-design@1.23.0

Renderer: native

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "9a519eee781183dcbac39a62a86bec9e0bd877a9",
  "sourceDigest": "sha256:0d31b0bc3c28394756a1142132ddf7b2beac9f7ce2f5b2253e04712431d7c736",
  "referenceSourceDigest": "sha256:0a033a9f6bc21722c87a78202ae3fce0d891270ea8a01d043a5a748c0439d696"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

## Documentation

## AppShell

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "AppShell"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "brand",
    "source": "packages/native/src/components/AppShell/index.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": true
  },
  {
    "name": "brandIcon",
    "source": "packages/native/src/components/AppShell/index.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false
  },
  {
    "name": "navigation",
    "source": "packages/native/src/components/AppShell/index.tsx",
    "kind": "node",
    "typeText": "(state: AppShellNavigationState) => ReactNode",
    "typeRef": "type:9945f7755948ece392e6",
    "parameters": [
      {
        "name": "state",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "AppShellNavigationState",
        "typeRef": "type:0b58d61e3be70bcb26bb"
      }
    ],
    "returnType": {
      "typeText": "ReactNode",
      "typeRef": "type:d947e2db6b7ed3e4c192"
    },
    "required": true
  },
  {
    "name": "navigationLabel",
    "source": "packages/native/src/components/AppShell/index.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "navigationKey",
    "source": "packages/native/src/components/AppShell/index.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "headerActions",
    "source": "packages/native/src/components/AppShell/index.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false
  },
  {
    "name": "pageNavigation",
    "source": "packages/native/src/components/AppShell/index.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false
  },
  {
    "name": "sidebarMode",
    "source": "packages/native/src/components/AppShell/index.tsx",
    "kind": "enum",
    "values": [
      "compact",
      "expanded"
    ],
    "typeText": "AppShellSidebarMode | undefined",
    "typeRef": "type:4190207adc1b43abc991",
    "required": false
  },
  {
    "name": "defaultSidebarMode",
    "source": "packages/native/src/components/AppShell/index.tsx",
    "kind": "enum",
    "values": [
      "compact",
      "expanded"
    ],
    "typeText": "AppShellSidebarMode | undefined",
    "typeRef": "type:4190207adc1b43abc991",
    "default": "expanded",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "onSidebarModeChange",
    "source": "packages/native/src/components/AppShell/index.tsx",
    "kind": "function",
    "typeText": "((mode: AppShellSidebarMode) => void) | undefined",
    "typeRef": "type:95a01d673b8a9cb968a3",
    "parameters": [
      {
        "name": "mode",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "AppShellSidebarMode",
        "typeRef": "type:af43ee884d90441ed7ea"
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
    "prop": "sidebarMode",
    "event": "onSidebarModeChange",
    "syntax": "sidebarMode={sidebarMode} onSidebarModeChange={handler}"
  }
]
```

## API

```json
{
  "native:AppShellProps": {
    "source": "native/src/components/AppShell/index.tsx",
    "kind": "interface",
    "extends": [
      "ViewProps"
    ],
    "props": [
      {
        "name": "brand",
        "type": "ReactNode",
        "required": true
      },
      {
        "name": "brandIcon",
        "type": "ReactNode",
        "required": false
      },
      {
        "name": "navigation",
        "type": "(state: AppShellNavigationState) => ReactNode",
        "required": true
      },
      {
        "name": "navigationLabel",
        "type": "string",
        "required": false
      },
      {
        "name": "navigationKey",
        "type": "string",
        "required": false
      },
      {
        "name": "headerActions",
        "type": "ReactNode",
        "required": false
      },
      {
        "name": "pageNavigation",
        "type": "ReactNode",
        "required": false
      },
      {
        "name": "sidebarMode",
        "type": "AppShellSidebarMode",
        "required": false
      },
      {
        "name": "defaultSidebarMode",
        "type": "AppShellSidebarMode",
        "required": false,
        "default": "\"expanded\""
      },
      {
        "name": "onSidebarModeChange",
        "type": "(mode: AppShellSidebarMode) => void",
        "required": false
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:AppShell": {
    "kind": "cssVars",
    "source": "react/src/components/AppShell",
    "vars": [
      {
        "name": "--app-shell-sidebar-width",
        "description": "Width of the expanded sidebar"
      },
      {
        "name": "--app-shell-rail-width",
        "description": "Width of the compact / floating rail"
      },
      {
        "name": "--app-shell-header-height",
        "description": "Minimum height of the header and the sidebar brand row"
      },
      {
        "name": "--app-shell-background",
        "description": "Background of the page area"
      },
      {
        "name": "--app-shell-sidebar-background",
        "description": "Background of the sidebar and the mobile navigation drawer"
      },
      {
        "name": "--app-shell-header-background",
        "description": "Background of the sticky header"
      },
      {
        "name": "--app-shell-drawer-width",
        "description": "Width of the mobile navigation drawer"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 基本的な使い方

navigation は collapsed / isMobile / closeNavigation / expandNavigation を受け取る描画関数です。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/app-shell/native/basic.tsx

```tsx
import { useState } from "react";
import { Text, View } from "react-native";
import { AppShell, Button } from "minerva-design/native";
export default function Basic() {
  const [route, setRoute] = useState("Overview");
  return (
    <View style={{ height: 400 }}>
      <AppShell
        brand="Minerva"
        navigationKey={route}
        navigation={({ closeNavigation }) => (
          <View>
            <Button
              onPress={() => {
                setRoute("Overview");
                closeNavigation();
              }}
            >
              Overview
            </Button>
            <Button
              onPress={() => {
                setRoute("Settings");
                closeNavigation();
              }}
            >
              Settings
            </Button>
          </View>
        )}
      >
        <Text>{route}</Text>
      </AppShell>
    </View>
  );
}

```

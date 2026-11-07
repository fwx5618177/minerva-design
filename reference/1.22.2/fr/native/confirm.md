# Confirm

Demande à l'utilisateur de confirmer une action : un remplaçant thématisé de window.confirm. Utilisez le ConfirmDialog déclaratif ou attendez confirm() depuis n'importe où ; avec un ConfirmProvider la boîte s'affiche dans l'arbre de l'application, sans lui un hôte autonome est monté à la demande, et côté serveur confirm() renvoie false.

Package: minerva-design@1.22.2

Renderer: native

Locale: fr

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

### Lequel choisir : useConfirm() ou confirm()

Dans un composant, appelez useConfirm() : ses boîtes de dialogue suivent la portée du ConfigProvider le plus proche. Sous un provider imbriqué, la modale est rendue dans son conteneur de portail, avec son thème, sa palette et ses tokens, et les libellés par défaut des boutons utilisent sa langue. Un ConfirmProvider les affiche toujours s’il y en a un.

Hors de React (bus d’événements, clients d’API, gardes de routeur et autres modules non composants), importez directement confirm() : aucun hook n’y est disponible, et ses boîtes utilisent le thème et la langue racines.

```tsx
// Inside a component: follows the nearest ConfigProvider scope
function DeleteButton() {
  const confirm = useConfirm();
  return (
    <Button onClick={async () => (await confirm({ title: "Delete?" })) && remove()}>
      Delete
    </Button>
  );
}

// Outside React (API client, event bus, router guard...): root scope
import { confirm } from "minerva-design";
router.beforeLeave(() => confirm({ title: "Discard changes?" }));
```

## ConfirmDialog

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "ConfirmDialog"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "open",
    "source": "packages/native/src/components/Confirm/index.tsx",
    "kind": "boolean",
    "typeText": "boolean",
    "typeRef": "type:7087acd01ef7dd9f1d5c",
    "required": true
  },
  {
    "name": "title",
    "source": "packages/native/src/components/Confirm/index.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": true
  },
  {
    "name": "description",
    "source": "packages/native/src/components/Confirm/index.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false
  },
  {
    "name": "confirmLabel",
    "source": "packages/native/src/components/Confirm/index.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false
  },
  {
    "name": "cancelLabel",
    "source": "packages/native/src/components/Confirm/index.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false
  },
  {
    "name": "closeLabel",
    "source": "packages/native/src/components/Confirm/index.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "color",
    "source": "packages/native/src/components/Confirm/index.tsx",
    "kind": "enum",
    "values": [
      "danger",
      "primary",
      "warning"
    ],
    "typeText": "\"primary\" | \"warning\" | \"danger\" | undefined",
    "typeRef": "type:ea01c2fe738cc1655d61",
    "default": "primary",
    "required": false
  },
  {
    "name": "loading",
    "source": "packages/native/src/components/Confirm/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false
  },
  {
    "name": "confirmDisabled",
    "source": "packages/native/src/components/Confirm/index.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "onOpenChange",
    "source": "packages/native/src/components/Confirm/index.tsx",
    "kind": "function",
    "typeText": "(open: boolean) => void",
    "typeRef": "type:6c80eab391c83c832390",
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
    "required": true
  },
  {
    "name": "onConfirm",
    "source": "packages/native/src/components/Confirm/index.tsx",
    "kind": "function",
    "typeText": "() => void | Promise<void>",
    "typeRef": "type:7dc66a73e047680501c2",
    "parameters": [],
    "returnType": {
      "typeText": "void | Promise<void>",
      "typeRef": "type:3c4871f2062b3b734ba0"
    },
    "required": true
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

## ConfirmProvider

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "ConfirmProvider"
  ],
  "kind": "named"
}
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
  "native:ConfirmDialogProps": {
    "source": "native/src/components/Confirm/index.tsx",
    "kind": "interface",
    "extends": [
      "ConfirmOptions"
    ],
    "props": [
      {
        "name": "open",
        "type": "boolean",
        "required": true
      },
      {
        "name": "onOpenChange",
        "type": "(open: boolean) => void",
        "required": true
      },
      {
        "name": "onConfirm",
        "type": "() => void | Promise<void>",
        "required": true
      }
    ]
  },
  "native:ConfirmProviderProps": {
    "source": "native/src/components/Confirm/index.tsx",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "children",
        "type": "ReactNode",
        "required": false
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: basic

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/confirm/native/basic.tsx

```tsx
import { useState } from "react";
import { Text, View } from "react-native";
import { ConfirmProvider, useConfirm, Button } from "minerva-design/native";
export default function Basic() {
  return (
    <ConfirmProvider>
      <ConfirmExample />
    </ConfirmProvider>
  );
}
function ConfirmExample() {
  const confirm = useConfirm();
  const [result, setResult] = useState("");
  return (
    <View>
      <Button
        onPress={async () =>
          setResult(
            (await confirm({
              title: "Archive record?",
              description: "You can restore it later.",
            }))
              ? "Archived"
              : "Cancelled",
          )
        }
      >
        Archive
      </Button>
      <Text>{result}</Text>
    </View>
  );
}

```

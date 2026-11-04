# Confirm

Demande à l'utilisateur de confirmer une action : un remplaçant thématisé de window.confirm. Utilisez le ConfirmDialog déclaratif ou attendez confirm() depuis n'importe où ; avec un ConfirmProvider la boîte s'affiche dans l'arbre de l'application, sans lui un hôte autonome est monté à la demande, et côté serveur confirm() renvoie false.

Package: minerva-design@1.20.5

Renderer: taro

Locale: fr

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

Declarative confirmation, semantic button colors and ReactNode labels, guarded loading/disabled submit, cancellation and scoped Promise confirmation. Native touch/view semantics differ from browser DOM semantics. Native devices do not expose document focus, inert, browser portals or File input APIs; H5 capabilities are specified separately. Device-runtime validation is still required. Global confirm() uses the native host modal and requires string title/description/button labels; standalone calls use default-theme colors and host modal sizing. Use ConfirmProvider for composed content, theme/locale inheritance and custom layout. Component tests, H5 tests in happy-dom and the official Taro WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/taro",
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
    "name": "confirmLabel",
    "source": "packages/taro/src/overlays.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:a991edaa7809b6d75ba2",
    "required": false
  },
  {
    "name": "cancelLabel",
    "source": "packages/taro/src/overlays.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:a991edaa7809b6d75ba2",
    "required": false
  },
  {
    "name": "loading",
    "source": "packages/taro/src/overlays.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "confirmDisabled",
    "source": "packages/taro/src/overlays.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "color",
    "source": "packages/taro/src/overlays.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "size",
    "source": "packages/taro/src/overlays.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "role",
    "source": "packages/taro/src/overlays.tsx",
    "kind": "enum",
    "values": [
      "alertdialog",
      "dialog"
    ],
    "typeText": "\"dialog\" | \"alertdialog\" | undefined",
    "typeRef": "type:2cc2e24324879bcc4737",
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
    "name": "trigger",
    "source": "packages/taro/src/overlays.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:a991edaa7809b6d75ba2",
    "required": false
  },
  {
    "name": "title",
    "source": "packages/taro/src/overlays.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:a991edaa7809b6d75ba2",
    "required": false
  },
  {
    "name": "hiddenDescription",
    "source": "packages/taro/src/overlays.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "forceMount",
    "source": "packages/taro/src/overlays.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "hideCloseButton",
    "source": "packages/taro/src/overlays.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "closeLabel",
    "source": "packages/taro/src/overlays.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "description",
    "source": "packages/taro/src/overlays.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:a991edaa7809b6d75ba2",
    "required": false
  },
  {
    "name": "overlayClassName",
    "source": "packages/taro/src/overlays.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
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
    "typeText": "\"top\" | \"bottom\" | \"left\" | \"right\" | undefined",
    "typeRef": "type:6d53de26e109ca539540",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "onConfirm",
    "source": "packages/taro/src/overlays.tsx",
    "kind": "function",
    "typeText": "(() => void) | undefined",
    "typeRef": "type:d5d035f78a3d09d64b66",
    "parameters": [],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false
  },
  {
    "name": "onCancel",
    "source": "packages/taro/src/overlays.tsx",
    "kind": "function",
    "typeText": "(() => void) | undefined",
    "typeRef": "type:62e953ff3b8679678d1e",
    "parameters": [],
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
  },
  {
    "name": "onPointerDownOutside",
    "source": "packages/taro/src/overlays.tsx",
    "kind": "function",
    "typeText": "((event: NativeOutsideEvent) => void) | undefined",
    "typeRef": "type:ecda376097c0e609cf41",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "NativeOutsideEvent",
        "typeRef": "type:8c1960b9229e669f840b"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false
  },
  {
    "name": "onInteractOutside",
    "source": "packages/taro/src/overlays.tsx",
    "kind": "function",
    "typeText": "((event: NativeOutsideEvent) => void) | undefined",
    "typeRef": "type:93e1e815666976fb4a85",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "NativeOutsideEvent",
        "typeRef": "type:8c1960b9229e669f840b"
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

## ConfirmProvider

Support: beta

Declarative confirmation, semantic button colors and ReactNode labels, guarded loading/disabled submit, cancellation and scoped Promise confirmation. Native touch/view semantics differ from browser DOM semantics. Native devices do not expose document focus, inert, browser portals or File input APIs; H5 capabilities are specified separately. Device-runtime validation is still required. Global confirm() uses the native host modal and requires string title/description/button labels; standalone calls use default-theme colors and host modal sizing. Use ConfirmProvider for composed content, theme/locale inheritance and custom layout. Component tests, H5 tests in happy-dom and the official Taro WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/taro",
  "exports": [
    "ConfirmProvider"
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

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

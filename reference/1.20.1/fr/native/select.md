# Select

Liste déroulante à choix unique, entièrement utilisable au clavier, avec groupes et intégration aux formulaires.

Package: minerva-design@1.20.1

Renderer: native

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.1",
  "sourceCommit": "d476a62793c47d802249dc9c5c91638ffe4210db",
  "sourceDigest": "sha256:2862a9e3a864c9423aed5d287db6fac7e8ddf58b9f5d144c61e7ff4a2630890e",
  "referenceSourceDigest": "sha256:172bbd44559732b657f1ae386911a43aedaffcdf4f5ab90b220a3f9b56302a2f"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.1/types.json) or getType() from minerva-design/contracts.

## Documentation

### Comportement et accessibilité

Le déclencheur est un bouton de rôle combobox (aria-haspopup="listbox"). Un clic, Entrée, Espace, Flèche bas / Flèche haut, Début ou Fin ouvrent la liste et placent le focus sur l'option sélectionnée (ou la première option active). Les flèches se déplacent sans boucler et ignorent les options désactivées ; Début / Fin et Page précédente / Page suivante sautent plus loin. Entrée ou Espace sélectionne, ferme et rend le focus au déclencheur ; Échap ferme sans sélectionner ; Tab ferme et passe au champ suivant.

Taper des lettres sur le déclencheur fermé change directement la sélection, comme un select natif ; liste ouverte, cela déplace la mise en surbrillance. Utilisez textValue pour les options dont le contenu n'est pas du texte brut.

La liste est ancrée sous le déclencheur, au moins aussi large que lui, passe au-dessus quand la place manque et défile quand ses options ne tiennent pas dans la fenêtre. C'est le même positionnement « popper » que tous les autres calques de la bibliothèque : prévisible sur écran tactile et sur petit écran, il laisse le déclencheur visible. Superposer la liste au déclencheur en alignant l'option sélectionnée (« item-aligned ») est un idiome macOS, volontairement écarté.

Un select natif masqué porte name, required et disabled : la valeur figure dans FormData, required participe à la validation native, et la réinitialisation du formulaire restaure defaultValue. Le placeholder s'affiche tant que la valeur est undefined ou une chaîne vide.

La liste est rendue (portail) dans le conteneur de thème du ConfigProvider le plus proche. Dans une Modal ou un Drawer, Échap ne ferme que la liste.

## Select

Support: beta

Options open in a bottom sheet (single or multiple)

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "Select"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "multiple",
    "source": "packages/native/src/components/Select/Select.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Several values (checkboxes and a confirm button)"
  },
  {
    "name": "value",
    "source": "packages/native/src/components/Select/Select.tsx",
    "kind": "union",
    "typeText": "string | string[] | undefined",
    "typeRef": "type:cdf445ffccc04acaf8cd",
    "required": false,
    "description": "Selected value (controlled; pair with `onChange`) Selected values (controlled; pair with `onChange`)"
  },
  {
    "name": "defaultValue",
    "source": "packages/native/src/components/Select/Select.tsx",
    "kind": "union",
    "typeText": "string | string[] | undefined",
    "typeRef": "type:cdf445ffccc04acaf8cd",
    "required": false,
    "description": "Initially selected value (uncontrolled) Initially selected values (uncontrolled)"
  },
  {
    "name": "readOnly",
    "source": "packages/native/src/components/Select/Select.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "options",
    "source": "packages/native/src/components/Select/Select.tsx",
    "kind": "array",
    "typeText": "SelectOption[] | undefined",
    "typeRef": "type:e271e6e04b0fbf392840",
    "required": false,
    "description": "The options"
  },
  {
    "name": "open",
    "source": "packages/native/src/components/Select/Select.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Controlled open state of the options sheet"
  },
  {
    "name": "defaultOpen",
    "source": "packages/native/src/components/Select/Select.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Initial open state while uncontrolled"
  },
  {
    "name": "placeholder",
    "source": "packages/native/src/components/Select/Select.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Text shown in the trigger while nothing is selected"
  },
  {
    "name": "size",
    "source": "packages/native/src/components/Select/Select.tsx",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "small"
    ],
    "typeText": "NativeSize | undefined",
    "typeRef": "type:3e1597e03bb6f7f3269e",
    "default": "medium",
    "required": false,
    "description": "Size of the trigger"
  },
  {
    "name": "invalid",
    "source": "packages/native/src/components/Select/Select.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows the error state"
  },
  {
    "name": "disabled",
    "source": "packages/native/src/components/Select/Select.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Disables the select"
  },
  {
    "name": "label",
    "source": "packages/native/src/components/Select/Select.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Visible label above the trigger; also its accessible name and the sheet title"
  },
  {
    "name": "title",
    "source": "packages/native/src/components/Select/Select.tsx",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Title of the options sheet"
  },
  {
    "name": "searchable",
    "source": "packages/native/src/components/Select/Select.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows a search field filtering the options by label"
  },
  {
    "name": "accessibilityLabel",
    "source": "packages/native/src/components/Select/Select.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible name of the trigger when there is no `label`"
  },
  {
    "name": "testID",
    "source": "packages/native/src/components/Select/Select.tsx",
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
    "name": "onChange",
    "source": "packages/native/src/components/Select/Select.tsx",
    "kind": "function",
    "typeText": "((value: string) => void) | ((value: string[]) => void) | undefined",
    "typeRef": "type:68aa65800c73636ebe44",
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
    "description": "Called with the picked value (the sheet then closes) Called with the confirmed values"
  },
  {
    "name": "onOpenChange",
    "source": "packages/native/src/components/Select/Select.tsx",
    "kind": "function",
    "typeText": "((open: boolean, reason?: OverlayCloseReason | undefined) => void) | undefined",
    "typeRef": "type:4865fc0abe338cf883c6",
    "parameters": [
      {
        "name": "open",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "boolean",
        "typeRef": "type:7087acd01ef7dd9f1d5c"
      },
      {
        "name": "reason",
        "position": 1,
        "required": false,
        "rest": false,
        "typeText": "OverlayCloseReason | undefined",
        "typeRef": "type:dee0306bddc4ca67a449"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called with the requested open state (and, when closing, the reason: \"action\" after a pick, \"confirm\", \"cancel\", \"mask\", \"back\")"
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
  },
  {
    "prop": "open",
    "event": "onOpenChange",
    "syntax": "open={open} onOpenChange={handler}"
  }
]
```

## SelectGroup

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "SelectGroup"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "label",
    "source": "packages/native/src/components/Select/SelectParts.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "disabled",
    "source": "packages/native/src/components/Select/SelectParts.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
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

## SelectItem

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "SelectItem"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "value",
    "source": "packages/native/src/components/Select/SelectParts.tsx",
    "kind": "string",
    "typeText": "string",
    "typeRef": "type:e15e314d298fc0d116fc",
    "required": true
  },
  {
    "name": "disabled",
    "source": "packages/native/src/components/Select/SelectParts.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false
  },
  {
    "name": "textValue",
    "source": "packages/native/src/components/Select/SelectParts.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "description",
    "source": "packages/native/src/components/Select/SelectParts.tsx",
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

## SelectLabel

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "SelectLabel"
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

## SelectSeparator

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "SelectSeparator"
  ],
  "kind": "named"
}
```

## API

```json
{
  "native:SelectSingleProps": {
    "source": "native/src/components/Select/Select.tsx",
    "kind": "interface",
    "extends": [
      "SelectBaseProps"
    ],
    "props": [
      {
        "name": "multiple",
        "type": "false",
        "required": false,
        "default": "false",
        "description": "Several values (checkboxes and a confirm button)"
      },
      {
        "name": "value",
        "type": "string",
        "required": false,
        "description": "Selected value (controlled; pair with `onChange`)"
      },
      {
        "name": "defaultValue",
        "type": "string",
        "required": false,
        "description": "Initially selected value (uncontrolled)"
      },
      {
        "name": "onChange",
        "type": "(value: string) => void",
        "required": false,
        "description": "Called with the picked value (the sheet then closes)"
      }
    ]
  },
  "native:SelectMultipleProps": {
    "source": "native/src/components/Select/Select.tsx",
    "kind": "interface",
    "extends": [
      "SelectBaseProps"
    ],
    "props": [
      {
        "name": "multiple",
        "type": "true",
        "required": true,
        "default": "false",
        "description": "Several values (checkboxes and a confirm button)"
      },
      {
        "name": "value",
        "type": "string[]",
        "required": false,
        "description": "Selected values (controlled; pair with `onChange`)"
      },
      {
        "name": "defaultValue",
        "type": "string[]",
        "required": false,
        "description": "Initially selected values (uncontrolled)"
      },
      {
        "name": "onChange",
        "type": "(value: string[]) => void",
        "required": false,
        "description": "Called with the confirmed values"
      }
    ]
  },
  "native:SelectOption": {
    "source": "native/src/components/Select/Select.tsx",
    "description": "An option of the list",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "group",
        "type": "string",
        "required": false
      },
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Visible text (also the accessible name of the row)"
      },
      {
        "name": "value",
        "type": "string",
        "required": true,
        "description": "Value reported by `onChange`"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "description": "Disables the row"
      },
      {
        "name": "description",
        "type": "string",
        "required": false,
        "description": "Secondary text under the label"
      }
    ]
  },
  "native:SelectProps": {
    "source": "native/src/components/Select/Select.tsx",
    "kind": "alias",
    "type": "SelectSingleProps | SelectMultipleProps"
  },
  "native:SelectItemProps": {
    "source": "native/src/components/Select/SelectParts.tsx",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "value",
        "type": "string",
        "required": true
      },
      {
        "name": "children",
        "type": "ReactNode",
        "required": true
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false"
      },
      {
        "name": "textValue",
        "type": "string",
        "required": false
      },
      {
        "name": "description",
        "type": "string",
        "required": false
      }
    ]
  },
  "native:SelectGroupProps": {
    "source": "native/src/components/Select/SelectParts.tsx",
    "kind": "interface",
    "extends": [
      "ViewProps"
    ],
    "props": [
      {
        "name": "label",
        "type": "string",
        "required": false
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:Select": {
    "kind": "cssVars",
    "source": "react/src/components/Select",
    "vars": [
      {
        "name": "--select-height",
        "description": "Height of the trigger (every size; defaults to the density's control height of the size)"
      },
      {
        "name": "--select-padding-x",
        "description": "Horizontal padding of the trigger (every size)"
      },
      {
        "name": "--select-radius",
        "description": "Corner radius of the trigger and of the listbox (defaults to --radius-lg)"
      },
      {
        "name": "--select-font-size",
        "description": "Font size of the trigger (every size)"
      },
      {
        "name": "--select-border-color",
        "description": "Border color of the trigger at rest"
      },
      {
        "name": "--select-dropdown-max-height",
        "description": "Maximum height of the listbox before it scrolls"
      },
      {
        "name": "--select-option-padding-y",
        "description": "Vertical padding of an option (follows the density's row padding)"
      },
      {
        "name": "--select-option-padding-x",
        "description": "Horizontal padding of an option and of a group label (follows the density's row padding)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Utilisation de base

English est sélectionné au départ. Chinese ou French met à jour la valeur contrôlée.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/select/native/basic.tsx

```tsx
import { useState } from "react";
import { Select } from "minerva-design/native";
export default function Basic() {
  const [language, setLanguage] = useState("en");
  return (
    <Select
      accessibilityLabel="Language"
      value={language}
      onChange={setLanguage}
      options={[
        { value: "en", label: "English" },
        { value: "zh", label: "Chinese" },
        { value: "fr", label: "French" },
      ]}
    />
  );
}

```

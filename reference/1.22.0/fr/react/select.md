# Select

Liste déroulante à choix unique, entièrement utilisable au clavier, avec groupes et intégration aux formulaires.

Package: minerva-design@1.22.0

Renderer: react

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.0",
  "sourceCommit": "330c90a7382a7141543dcdad732a4da31d58a37e",
  "sourceDigest": "sha256:cbdfa6292d29dec33adda7a3e9cf0e027da50858956b8d08e3f7f3ed59c8d78a",
  "referenceSourceDigest": "sha256:e3be8c06635194769da4944bbccaf8bcffec3fe4bddbd369b74caf5e4553345b"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.0/types.json) or getType() from minerva-design/contracts.

## Documentation

### Comportement et accessibilité

Le déclencheur est un bouton de rôle combobox (aria-haspopup="listbox"). Un clic, Entrée, Espace, Flèche bas / Flèche haut, Début ou Fin ouvrent la liste et placent le focus sur l'option sélectionnée (ou la première option active). Les flèches se déplacent sans boucler et ignorent les options désactivées ; Début / Fin et Page précédente / Page suivante sautent plus loin. Entrée ou Espace sélectionne, ferme et rend le focus au déclencheur ; Échap ferme sans sélectionner ; Tab ferme et passe au champ suivant.

Taper des lettres sur le déclencheur fermé change directement la sélection, comme un select natif ; liste ouverte, cela déplace la mise en surbrillance. Utilisez textValue pour les options dont le contenu n'est pas du texte brut.

La liste est ancrée sous le déclencheur, au moins aussi large que lui, passe au-dessus quand la place manque et défile quand ses options ne tiennent pas dans la fenêtre. C'est le même positionnement « popper » que tous les autres calques de la bibliothèque : prévisible sur écran tactile et sur petit écran, il laisse le déclencheur visible. Superposer la liste au déclencheur en alignant l'option sélectionnée (« item-aligned ») est un idiome macOS, volontairement écarté.

Un select natif masqué porte name, required et disabled : la valeur figure dans FormData, required participe à la validation native, et la réinitialisation du formulaire restaure defaultValue. Le placeholder s'affiche tant que la valeur est undefined ou une chaîne vide.

La liste est rendue (portail) dans le conteneur de thème du ConfigProvider le plus proche. Dans une Modal ou un Drawer, Échap ne ferme que la liste.

## Select

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
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
    "name": "value",
    "source": "packages/react/src/components/Select/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Selected value (controlled; pair with onChange)"
  },
  {
    "name": "defaultValue",
    "source": "packages/react/src/components/Select/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Initially selected value (uncontrolled)"
  },
  {
    "name": "open",
    "source": "packages/react/src/components/Select/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Whether the popup is open (controlled; pair with onOpenChange)"
  },
  {
    "name": "defaultOpen",
    "source": "packages/react/src/components/Select/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Whether the popup is initially open (uncontrolled)"
  },
  {
    "name": "placeholder",
    "source": "packages/react/src/components/Select/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Text shown in the trigger while nothing is selected"
  },
  {
    "name": "size",
    "source": "packages/react/src/components/Select/types.ts",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "small"
    ],
    "typeText": "SelectSize | undefined",
    "typeRef": "type:c866404a77e3de6bf902",
    "default": "medium",
    "required": false,
    "description": "Size of the trigger"
  },
  {
    "name": "invalid",
    "source": "packages/react/src/components/Select/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows the error state (also set by an invalid enclosing FormControl)"
  },
  {
    "name": "disabled",
    "source": "packages/react/src/components/Select/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Disables the select. Inherited from an enclosing FormControl when not set; an explicit `false` overrides the FormControl"
  },
  {
    "name": "required",
    "source": "packages/react/src/components/Select/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Marks the select as required (inherited from an enclosing FormControl)"
  },
  {
    "name": "name",
    "source": "packages/react/src/components/Select/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Name of the hidden native select, used in forms"
  },
  {
    "name": "id",
    "source": "packages/react/src/components/Select/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "id of the trigger (defaults to the enclosing FormControl's id)"
  },
  {
    "name": "aria-label",
    "source": "packages/react/src/components/Select/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label of the trigger, required when there is no visible label"
  },
  {
    "name": "aria-labelledby",
    "source": "packages/react/src/components/Select/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "id(s) of the element(s) labelling the trigger (also names the listbox)"
  },
  {
    "name": "aria-describedby",
    "source": "packages/react/src/components/Select/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Extra ids of elements describing the trigger (aria-describedby)"
  },
  {
    "name": "contentClassName",
    "source": "packages/react/src/components/Select/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Additional class name of the popup"
  }
]
```

### events

```json
[
  {
    "name": "onChange",
    "source": "packages/react/src/components/Select/types.ts",
    "kind": "function",
    "typeText": "((value: string) => void) | undefined",
    "typeRef": "type:4012ac2d38c9fd9f0713",
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
    "description": "Called with the value of the newly selected item"
  },
  {
    "name": "onOpenChange",
    "source": "packages/react/src/components/Select/types.ts",
    "kind": "function",
    "typeText": "((open: boolean) => void) | undefined",
    "typeRef": "type:721f5831e84a52ad8ecc",
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
    "required": false,
    "description": "Called when the popup opens or closes"
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

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "SelectGroup"
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

## SelectItem

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
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
    "source": "packages/react/src/components/Select/types.ts",
    "kind": "string",
    "typeText": "string",
    "typeRef": "type:e15e314d298fc0d116fc",
    "required": true,
    "description": "Value of the option (must not be an empty string)"
  },
  {
    "name": "disabled",
    "source": "packages/react/src/components/Select/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Prevents selecting the option"
  },
  {
    "name": "textValue",
    "source": "packages/react/src/components/Select/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Text used for typeahead when the content is not plain text"
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

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
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

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "SelectSeparator"
  ],
  "kind": "named"
}
```

## API

```json
{
  "SelectProps": {
    "source": "react/src/components/Select/types.ts",
    "description": "Props of the Select component (a single-choice dropdown: select-only combobox trigger + listbox popup anchored below it, with full keyboard support and a hidden native select for forms). `id`, `className`, `style`, `aria-*` and `data-*` attributes go to the trigger <button>.",
    "kind": "interface",
    "extends": [
      "DataAttributes"
    ],
    "props": [
      {
        "name": "value",
        "type": "string",
        "required": false,
        "description": "Selected value (controlled; pair with onChange)"
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
        "description": "Called with the value of the newly selected item"
      },
      {
        "name": "open",
        "type": "boolean",
        "required": false,
        "description": "Whether the popup is open (controlled; pair with onOpenChange)"
      },
      {
        "name": "defaultOpen",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Whether the popup is initially open (uncontrolled)"
      },
      {
        "name": "onOpenChange",
        "type": "(open: boolean) => void",
        "required": false,
        "description": "Called when the popup opens or closes"
      },
      {
        "name": "placeholder",
        "type": "React.ReactNode",
        "required": false,
        "description": "Text shown in the trigger while nothing is selected"
      },
      {
        "name": "size",
        "type": "SelectSize",
        "required": false,
        "default": "\"medium\"",
        "description": "Size of the trigger"
      },
      {
        "name": "invalid",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Shows the error state (also set by an invalid enclosing FormControl)"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables the select. Inherited from an enclosing FormControl when not set; an explicit `false` overrides the FormControl"
      },
      {
        "name": "required",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Marks the select as required (inherited from an enclosing FormControl)"
      },
      {
        "name": "name",
        "type": "string",
        "required": false,
        "description": "Name of the hidden native select, used in forms"
      },
      {
        "name": "id",
        "type": "string",
        "required": false,
        "description": "id of the trigger (defaults to the enclosing FormControl's id)"
      },
      {
        "name": "aria-label",
        "type": "string",
        "required": false,
        "description": "Accessible label of the trigger, required when there is no visible label"
      },
      {
        "name": "aria-labelledby",
        "type": "string",
        "required": false,
        "description": "id(s) of the element(s) labelling the trigger (also names the listbox)"
      },
      {
        "name": "aria-describedby",
        "type": "string",
        "required": false,
        "description": "Extra ids of elements describing the trigger (aria-describedby)"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional class name of the trigger"
      },
      {
        "name": "style",
        "type": "CSSProperties",
        "required": false,
        "description": "Inline styles of the trigger"
      },
      {
        "name": "contentClassName",
        "type": "string",
        "required": false,
        "description": "Additional class name of the popup"
      },
      {
        "name": "children",
        "type": "React.ReactNode",
        "required": true,
        "description": "SelectItem / SelectGroup / SelectLabel / SelectSeparator elements"
      },
      {
        "name": "ref",
        "type": "Ref<HTMLButtonElement>",
        "required": false,
        "description": "Ref to the trigger <button>"
      }
    ]
  },
  "SelectItemProps": {
    "source": "react/src/components/Select/types.ts",
    "description": "Props of an option of a Select",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "value",
        "type": "string",
        "required": true,
        "description": "Value of the option (must not be an empty string)"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Prevents selecting the option"
      },
      {
        "name": "textValue",
        "type": "string",
        "required": false,
        "description": "Text used for typeahead when the content is not plain text"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional class name"
      },
      {
        "name": "children",
        "type": "React.ReactNode",
        "required": true,
        "description": "Content of the option"
      },
      {
        "name": "ref",
        "type": "Ref<HTMLDivElement>",
        "required": false,
        "description": "Ref to the option element"
      }
    ]
  },
  "SelectGroupProps": {
    "source": "react/src/components/Select/types.ts",
    "description": "Props of a group of Select options",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional class name"
      },
      {
        "name": "children",
        "type": "React.ReactNode",
        "required": false,
        "description": "SelectLabel and SelectItem elements"
      },
      {
        "name": "ref",
        "type": "Ref<HTMLDivElement>",
        "required": false,
        "description": "Ref to the group element"
      }
    ]
  },
  "SelectLabelProps": {
    "source": "react/src/components/Select/types.ts",
    "description": "Props of the label of a SelectGroup",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional class name"
      },
      {
        "name": "children",
        "type": "React.ReactNode",
        "required": false,
        "description": "Label content"
      },
      {
        "name": "ref",
        "type": "Ref<HTMLDivElement>",
        "required": false,
        "description": "Ref to the label element"
      }
    ]
  },
  "SelectSeparatorProps": {
    "source": "react/src/components/Select/types.ts",
    "description": "Props of a separator between Select options",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional class name"
      },
      {
        "name": "ref",
        "type": "Ref<HTMLDivElement>",
        "required": false,
        "description": "Ref to the separator element"
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

### apps/docs/src/docs/pages/select/demos/basic.tsx

```tsx
import { useState } from "react";
import { Select, SelectItem } from "minerva-design";

export default function BasicDemo() {
  const [language, setLanguage] = useState("en");

  return (
    <div style={{ width: 240 }}>
      <Select aria-label="Language" value={language} onChange={setLanguage}>
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="zh">Chinese</SelectItem>
        <SelectItem value="fr">French</SelectItem>
      </Select>
    </div>
  );
}

```

## Example: Groupes

SelectGroup, SelectLabel et SelectSeparator organisent les options ; les options désactivées ne sont pas sélectionnables.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/select/demos/groups.tsx

```tsx
import {
  Select,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
} from "minerva-design";

export default function GroupsDemo() {
  return (
    <div style={{ width: 240 }}>
      <Select aria-label="Fruit" placeholder="Pick a fruit">
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Out of season</SelectLabel>
          <SelectItem value="cherry" disabled>
            Cherry
          </SelectItem>
        </SelectGroup>
      </Select>
    </div>
  );
}

```

## Example: Tailles, états et FormControl

Trois tailles, états invalide et désactivé ; dans un FormControl le déclencheur reçoit libellé, description et état requis.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/select/demos/sizes-and-states.tsx

```tsx
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Select,
  SelectItem,
} from "minerva-design";

const items = (
  <>
    <SelectItem value="a">Option A</SelectItem>
    <SelectItem value="b">Option B</SelectItem>
  </>
);

export default function SizesAndStatesDemo() {
  return (
    <div style={{ display: "grid", gap: 12, width: 260 }}>
      <Select aria-label="Small" size="small" placeholder="Small">
        {items}
      </Select>
      <Select aria-label="Large" size="large" placeholder="Large">
        {items}
      </Select>
      <Select aria-label="Invalid" invalid placeholder="Invalid">
        {items}
      </Select>
      <Select aria-label="Disabled" disabled placeholder="Disabled">
        {items}
      </Select>
      <FormControl required>
        <FormLabel>Genre</FormLabel>
        <Select placeholder="Pick a genre" name="genre">
          {items}
        </Select>
        <FormHelperText>Shown on the book page</FormHelperText>
      </FormControl>
    </div>
  );
}

```

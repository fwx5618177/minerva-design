# Select

Liste déroulante à choix unique, entièrement utilisable au clavier, avec groupes et intégration aux formulaires.

Package: minerva-design@1.21.0

Renderer: angular

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.0",
  "sourceCommit": "3e3fd42fed9bd7320e0095e9008ad52d1dd44024",
  "sourceDigest": "sha256:ce2a20ef1952cc69de92d0733342905020d5135facebdf802e90ddda090ce31c",
  "referenceSourceDigest": "sha256:bdc377ab7ed5f94120cdda24084c48e40370128fac18b85708e5f8b5fbaf5e95"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.0/types.json) or getType() from minerva-design/contracts.

## Documentation

### Comportement et accessibilité

Le déclencheur est un bouton de rôle combobox (aria-haspopup="listbox"). Un clic, Entrée, Espace, Flèche bas / Flèche haut, Début ou Fin ouvrent la liste et placent le focus sur l'option sélectionnée (ou la première option active). Les flèches se déplacent sans boucler et ignorent les options désactivées ; Début / Fin et Page précédente / Page suivante sautent plus loin. Entrée ou Espace sélectionne, ferme et rend le focus au déclencheur ; Échap ferme sans sélectionner ; Tab ferme et passe au champ suivant.

Taper des lettres sur le déclencheur fermé change directement la sélection, comme un select natif ; liste ouverte, cela déplace la mise en surbrillance. Utilisez textValue pour les options dont le contenu n'est pas du texte brut.

La liste est ancrée sous le déclencheur, au moins aussi large que lui, passe au-dessus quand la place manque et défile quand ses options ne tiennent pas dans la fenêtre. C'est le même positionnement « popper » que tous les autres calques de la bibliothèque : prévisible sur écran tactile et sur petit écran, il laisse le déclencheur visible. Superposer la liste au déclencheur en alignant l'option sélectionnée (« item-aligned ») est un idiome macOS, volontairement écarté.

Un select natif masqué porte name, required et disabled : la valeur figure dans FormData, required participe à la validation native, et la réinitialisation du formulaire restaure defaultValue. Le placeholder s'affiche tant que la valeur est undefined ou une chaîne vide.

La liste est rendue (portail) dans le conteneur de thème du ConfigProvider le plus proche. Dans une Modal ou un Drawer, Échap ne ferme que la liste.

## Select

Support: beta

Native Angular: MnSelect. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnSelect"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "value",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/select/select.ts"
  },
  {
    "name": "defaultValue",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/select/select.ts"
  },
  {
    "name": "open",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/select/select.ts"
  },
  {
    "name": "defaultOpen",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/select/select.ts"
  },
  {
    "name": "placeholder",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/select/select.ts"
  },
  {
    "name": "size",
    "typeText": "SelectSize",
    "required": false,
    "source": "packages/angular/src/components/select/select.ts"
  },
  {
    "name": "invalid",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/select/select.ts"
  },
  {
    "name": "disabled",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/select/select.ts"
  },
  {
    "name": "required",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/select/select.ts"
  },
  {
    "name": "name",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/select/select.ts"
  },
  {
    "name": "id",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/select/select.ts"
  },
  {
    "name": "aria-label",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/select/select.ts"
  },
  {
    "name": "aria-labelledby",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/select/select.ts"
  },
  {
    "name": "aria-describedby",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/select/select.ts"
  },
  {
    "name": "className",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/select/select.ts"
  },
  {
    "name": "contentClassName",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/select/select.ts"
  }
]
```

### events

```json
[
  {
    "name": "valueChange",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "openChange",
    "typeText": "boolean | undefined",
    "required": false
  }
]
```

### slots

```json
[
  {
    "name": "default"
  }
]
```

### bindings

```json
[
  {
    "prop": "value",
    "event": "valueChange",
    "syntax": "[(value)]"
  },
  {
    "prop": "open",
    "event": "openChange",
    "syntax": "[(open)]"
  }
]
```

## SelectGroup

Support: beta

Native Angular: MnSelectGroup. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnSelectGroup"
  ],
  "kind": "named"
}
```

### slots

```json
[
  {
    "name": "default"
  }
]
```

## SelectItem

Support: beta

Native Angular: MnSelectItem. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnSelectItem"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "value",
    "typeText": "string",
    "required": true,
    "source": "packages/angular/src/components/select/select-item.ts"
  },
  {
    "name": "disabled",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/select/select-item.ts"
  },
  {
    "name": "textValue",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/select/select-item.ts"
  }
]
```

### slots

```json
[
  {
    "name": "default"
  }
]
```

## SelectLabel

Support: beta

Native Angular: MnSelectLabel. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnSelectLabel"
  ],
  "kind": "named"
}
```

### slots

```json
[
  {
    "name": "default"
  }
]
```

## SelectSeparator

Support: beta

Native Angular: MnSelectSeparator. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnSelectSeparator"
  ],
  "kind": "named"
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

## Example: Choose a role

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnSelect, MnSelectItem } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnSelect, MnSelectItem],
  template: `
<mn-select aria-label="Role" [(value)]="value"><mn-select-item value="designer">Designer</mn-select-item><mn-select-item value="engineer">Engineer</mn-select-item><mn-select-item value="admin" disabled>Administrator</mn-select-item></mn-select><output>Role: {{value}}</output>
  `,
})
export class Example {
  value = "designer";
}

```

## Example: Grouped options

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnSelect, MnSelectItem, MnSelectGroup, MnSelectLabel, MnSelectSeparator } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnSelect, MnSelectItem, MnSelectGroup, MnSelectLabel, MnSelectSeparator],
  template: `
<mn-select aria-label="Location"><mn-select-group><mn-select-label>Europe</mn-select-label><mn-select-item value="london">London</mn-select-item><mn-select-item value="paris">Paris</mn-select-item></mn-select-group><mn-select-separator/><mn-select-item value="tokyo">Tokyo</mn-select-item></mn-select>
  `,
})
export class Example {

}

```

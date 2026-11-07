# Cascader

Sélectionne une valeur dans une hiérarchie d'options, niveau par niveau (ex. pays / région / ville).

Package: minerva-design@1.22.1

Renderer: wc

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.1",
  "sourceCommit": "a07dc9a260690841cc0eea98acdc24ac32032a2c",
  "sourceDigest": "sha256:cbdfa6292d29dec33adda7a3e9cf0e027da50858956b8d08e3f7f3ed59c8d78a",
  "referenceSourceDigest": "sha256:6d534260f2c14247d5360acc167a35134052fa342938ee2bdd089ae303d95f7c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.1/types.json) or getType() from minerva-design/contracts.

## Documentation

### Clavier et accessibilité

Entrée, Espace ou Flèche bas sur le champ ouvre le panneau et y déplace le focus ; donner simplement le focus au champ ne l'ouvre pas.

Flèche haut / Flèche bas, Début et Fin se déplacent dans une colonne.

Flèche droite ou Entrée déplie la colonne suivante (aussi après un chargement différé) et Entrée sélectionne une feuille ; Flèche gauche revient à la colonne précédente.

Échap ferme le panneau et rend le focus au champ ; Tab le ferme aussi.

Le champ a le rôle combobox. Son texte indicatif par défaut et le libellé du bouton "Clear selection" (effacer la sélection) suivent la langue de la bibliothèque React.

## Cascader

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/cascader",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "defaultValue",
    "typeText": "CascaderValue",
    "attribute": "value",
    "required": false
  },
  {
    "name": "open",
    "typeText": "boolean",
    "attribute": "open",
    "required": false
  },
  {
    "name": "label",
    "typeText": "string",
    "attribute": "label",
    "required": false
  },
  {
    "name": "placeholder",
    "typeText": "string | undefined",
    "attribute": "placeholder",
    "required": false
  },
  {
    "name": "invalid",
    "typeText": "boolean",
    "attribute": "invalid",
    "required": false
  },
  {
    "name": "readOnly",
    "typeText": "boolean",
    "attribute": "readonly",
    "required": false
  },
  {
    "name": "hideClearButton",
    "typeText": "boolean",
    "attribute": "hide-clear-button",
    "required": false
  },
  {
    "name": "expandTrigger",
    "typeText": "\"click\" | \"hover\"",
    "attribute": "expand-trigger",
    "required": false
  },
  {
    "name": "showSearch",
    "typeText": "boolean",
    "attribute": "show-search",
    "required": false
  },
  {
    "name": "maxLevel",
    "typeText": "number",
    "attribute": "max-level",
    "required": false
  },
  {
    "name": "width",
    "typeText": "string | number | undefined",
    "attribute": "width",
    "required": false
  },
  {
    "name": "name",
    "typeText": "string",
    "attribute": "name",
    "required": false
  },
  {
    "name": "disabled",
    "typeText": "boolean",
    "attribute": "disabled",
    "required": false
  },
  {
    "name": "required",
    "typeText": "boolean",
    "attribute": "required",
    "required": false
  },
  {
    "name": "options",
    "typeText": "CascaderOption[]",
    "required": false
  },
  {
    "name": "value",
    "typeText": "CascaderValue",
    "required": false
  },
  {
    "name": "displayRender",
    "typeText": "(labels: string[], selectedOptions: CascaderOption[]) => string | undefined",
    "required": false
  },
  {
    "name": "filter",
    "typeText": "(inputValue: string, path: CascaderOption[]) => boolean | undefined",
    "required": false
  },
  {
    "name": "loadData",
    "typeText": "(selectedOptions: CascaderOption[]) => void | undefined",
    "required": false
  },
  {
    "name": "optionRender",
    "typeText": "(option: CascaderOption, level: number) => CascaderRenderResult | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "change",
    "typeText": "Event",
    "description": "Same as `minerva-change`, without detail"
  },
  {
    "name": "minerva-change",
    "typeText": "CustomEvent<{ value: (string | number)[]; selectedOptions: CascaderOption[]; }>",
    "detailType": {
      "typeText": "{ value: (string | number)[]; selectedOptions: CascaderOption[]; }",
      "typeRef": "type:971a2571e2ee2e3be0af"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": false,
    "description": "A path was selected or the value was cleared (`detail: { value, selectedOptions }`)"
  },
  {
    "name": "minerva-clear",
    "typeText": "CustomEvent<undefined>",
    "bubbles": true,
    "composed": true,
    "cancelable": false,
    "description": "The clear button emptied the value"
  },
  {
    "name": "minerva-input",
    "typeText": "CustomEvent<{ value: string; }>",
    "detailType": {
      "typeText": "{ value: string; }",
      "typeRef": "type:8d70cfaa332f8e8d6cd6"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": false,
    "description": "The search text changed (`show-search`; `detail: { value }`)"
  },
  {
    "name": "minerva-open-change",
    "typeText": "CustomEvent<{ open: boolean; }>",
    "detailType": {
      "typeText": "{ open: boolean; }",
      "typeRef": "type:c4f279a618b9dd2f9650"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": true,
    "description": "The user asked to open / close the panel (`detail: { open }`); cancelable: `preventDefault()` keeps the current state"
  }
]
```

## API

```json
{
  "wc:minerva-cascader": {
    "kind": "element",
    "source": "web-components/src/components/cascader/cascader.ts",
    "className": "MinervaCascader",
    "summary": "Hierarchical picker with one column per level, search and lazy loading.",
    "description": "Cascader (`<Cascader>` of React): pick a value from a tree of options, one column per level. Supports search (`show-search`), lazy loading (`loadData`), hover expansion and full keyboard navigation (Enter / Space / ArrowDown open from the field and focus the panel; arrows, Home / End move within a column, ArrowRight / Enter expand, ArrowLeft goes back, Escape closes and returns focus to the field). The option tree is the `options` property. `value` is the selected path (array of values, one per level); the `value` attribute is the default path (JSON array or comma-separated), restored by `form.reset()`. Form-associated: like the React library's inner `<input name>`, the form value is the displayed text (labels joined with \" / \", or `displayRender`); `required` makes an empty selection invalid; `<fieldset disabled>` and `form.reset()` are supported. The panel is shown in the top layer (Popover API) but stays in the element's shadow root, so it inherits the theme of its scope.",
    "properties": [
      {
        "name": "defaultValue",
        "attribute": "value",
        "type": "CascaderValue",
        "default": "[]",
        "description": "Initially selected path, restored by `form.reset()` (the `value` attribute: JSON array or comma-separated values)"
      },
      {
        "name": "open",
        "attribute": "open",
        "type": "boolean",
        "default": "false",
        "description": "Whether the panel is open"
      },
      {
        "name": "label",
        "attribute": "label",
        "type": "string",
        "default": "\"\"",
        "description": "Label of the field (accessible name fallback; names the columns)"
      },
      {
        "name": "placeholder",
        "attribute": "placeholder",
        "type": "string | undefined",
        "description": "Placeholder (default: localized \"Please select\")"
      },
      {
        "name": "invalid",
        "attribute": "invalid",
        "type": "boolean",
        "default": "false",
        "description": "Error state; sets aria-invalid"
      },
      {
        "name": "readOnly",
        "attribute": "readonly",
        "type": "boolean",
        "default": "false",
        "description": "Shows the value without allowing changes (the panel does not open)"
      },
      {
        "name": "hideClearButton",
        "attribute": "hide-clear-button",
        "type": "boolean",
        "default": "false",
        "description": "Hides the clear button (React `allowClear={false}`)"
      },
      {
        "name": "expandTrigger",
        "attribute": "expand-trigger",
        "type": "\"click\" | \"hover\"",
        "default": "\"click\"",
        "description": "How sub-menus are expanded"
      },
      {
        "name": "showSearch",
        "attribute": "show-search",
        "type": "boolean",
        "default": "false",
        "description": "Allows typing to search all paths"
      },
      {
        "name": "maxLevel",
        "attribute": "max-level",
        "type": "number",
        "default": "6",
        "description": "Maximum number of levels shown"
      },
      {
        "name": "width",
        "attribute": "width",
        "type": "string | number | undefined",
        "default": "240",
        "description": "Width of the component (number = px), like the React Cascader"
      },
      {
        "name": "name",
        "attribute": "name",
        "type": "string",
        "default": "\"\"",
        "description": "Name submitted with the form data"
      },
      {
        "name": "disabled",
        "attribute": "disabled",
        "type": "boolean",
        "default": "false",
        "description": "Disables the control (not focusable, not submitted, not validated)"
      },
      {
        "name": "required",
        "attribute": "required",
        "type": "boolean",
        "default": "false",
        "description": "The control must have a value for the form to be submitted"
      },
      {
        "name": "options",
        "type": "CascaderOption[]",
        "default": "[]",
        "description": "Option tree (property only)"
      },
      {
        "name": "value",
        "type": "CascaderValue",
        "default": "[]",
        "description": "Selected path of values, one per level (property; the `value` attribute sets `defaultValue`)"
      },
      {
        "name": "displayRender",
        "type": "(labels: string[], selectedOptions: CascaderOption[]) => string | undefined",
        "description": "Formats the text of the field; by default labels are joined with \" / \""
      },
      {
        "name": "filter",
        "type": "(inputValue: string, path: CascaderOption[]) => boolean | undefined",
        "description": "Custom search predicate; by default paths whose labels contain the text match"
      },
      {
        "name": "loadData",
        "type": "(selectedOptions: CascaderOption[]) => void | undefined",
        "description": "Loads children lazily: activating an option without children that is not `isLeaf` expands it and calls `loadData(path)` instead of selecting it. Add the children to `options` yourself (set `loading` meanwhile)"
      },
      {
        "name": "optionRender",
        "type": "(option: CascaderOption, level: number) => CascaderRenderResult | undefined",
        "description": "Custom option content"
      },
      {
        "name": "selectedOptions",
        "type": "CascaderOption[]",
        "readonly": true,
        "description": "Options of the selected path (one per level)"
      },
      {
        "name": "isDisabled",
        "type": "boolean",
        "readonly": true,
        "description": "Whether the control is disabled (itself or by a disabled fieldset)."
      },
      {
        "name": "form",
        "type": "HTMLFormElement | null",
        "readonly": true,
        "description": "The form owning the element"
      },
      {
        "name": "labels",
        "type": "NodeList | null",
        "readonly": true,
        "description": "`<label>` elements associated with the element"
      },
      {
        "name": "validity",
        "type": "ValidityState | undefined",
        "readonly": true,
        "description": "Validity state (same as `<input>.validity`)"
      },
      {
        "name": "validationMessage",
        "type": "string",
        "readonly": true,
        "description": "Message describing the current validation error (empty when valid)"
      },
      {
        "name": "willValidate",
        "type": "boolean",
        "readonly": true,
        "description": "Whether the element is a candidate for constraint validation"
      }
    ],
    "methods": [
      {
        "name": "focus",
        "signature": "(options?: FocusOptions) => void"
      },
      {
        "name": "blur",
        "signature": "() => void"
      },
      {
        "name": "show",
        "signature": "() => void",
        "description": "Opens the panel"
      },
      {
        "name": "hide",
        "signature": "() => void",
        "description": "Closes the panel"
      },
      {
        "name": "checkValidity",
        "signature": "() => boolean",
        "description": "Checks validity; fires `invalid` when invalid."
      },
      {
        "name": "reportValidity",
        "signature": "() => boolean",
        "description": "Checks validity and shows the browser's validation message."
      },
      {
        "name": "setCustomValidity",
        "signature": "(message: string) => void",
        "description": "Sets (or clears, with `\"\"`) a custom validation error."
      },
      {
        "name": "formResetCallback",
        "signature": "() => void"
      },
      {
        "name": "formDisabledCallback",
        "signature": "(disabled: boolean) => void"
      },
      {
        "name": "formStateRestoreCallback",
        "signature": "(state: string | File | FormData | null) => void"
      }
    ],
    "events": [
      {
        "name": "change",
        "description": "Same as `minerva-change`, without detail"
      },
      {
        "name": "minerva-change",
        "description": "A path was selected or the value was cleared (`detail: { value, selectedOptions }`)"
      },
      {
        "name": "minerva-clear",
        "description": "The clear button emptied the value"
      },
      {
        "name": "minerva-input",
        "description": "The search text changed (`show-search`; `detail: { value }`)"
      },
      {
        "name": "minerva-open-change",
        "description": "The user asked to open / close the panel (`detail: { open }`); cancelable: `preventDefault()` keeps the current state"
      }
    ],
    "slots": [],
    "parts": [
      {
        "name": "root",
        "description": "The root wrapper (anchor of the dropdown)"
      },
      {
        "name": "control",
        "description": "The field box (input, clear button, chevron)"
      },
      {
        "name": "input",
        "description": "The native `<input role=combobox>`"
      },
      {
        "name": "clear-button",
        "description": "The clear button (while there is a value)"
      },
      {
        "name": "icon",
        "description": "The chevron"
      },
      {
        "name": "content",
        "description": "The positioned dropdown"
      },
      {
        "name": "column",
        "description": "A column of options (`role=listbox`)"
      },
      {
        "name": "item",
        "description": "An option (column option or search result)"
      },
      {
        "name": "item--selected",
        "description": "Item state of `item`: selected"
      },
      {
        "name": "item--expanded",
        "description": "Item state of `item`: expanded"
      },
      {
        "name": "item--disabled",
        "description": "Item state of `item`: disabled"
      },
      {
        "name": "item--loading",
        "description": "Item state of `item`: loading"
      }
    ],
    "cssProperties": [
      {
        "name": "--cascader-height",
        "description": "Minimum height of the field (defaults to the density's small control height)"
      },
      {
        "name": "--cascader-radius",
        "description": "Corner radius of the field, the dropdown and the options (defaults to --radius-sm)"
      },
      {
        "name": "--cascader-font-size",
        "description": "Font size of the field and of the options"
      },
      {
        "name": "--cascader-border-color",
        "description": "Border color of the field at rest"
      },
      {
        "name": "--cascader-column-min-width",
        "description": "Minimum width of a column of options"
      },
      {
        "name": "--cascader-dropdown-max-height",
        "description": "Maximum height of the columns before they scroll"
      },
      {
        "name": "--cascader-option-padding-y",
        "description": "Vertical padding of an option (follows the density's row padding)"
      },
      {
        "name": "--cascader-option-padding-x",
        "description": "Horizontal padding of an option (follows the density's row padding)"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:Cascader": {
    "kind": "cssVars",
    "source": "react/src/components/Cascader",
    "vars": [
      {
        "name": "--cascader-height",
        "description": "Minimum height of the field (defaults to the density's small control height)"
      },
      {
        "name": "--cascader-radius",
        "description": "Corner radius of the field, the dropdown and the options (defaults to --radius-sm)"
      },
      {
        "name": "--cascader-font-size",
        "description": "Font size of the field and of the options"
      },
      {
        "name": "--cascader-border-color",
        "description": "Border color of the field at rest"
      },
      {
        "name": "--cascader-column-min-width",
        "description": "Minimum width of a column of options"
      },
      {
        "name": "--cascader-dropdown-max-height",
        "description": "Maximum height of the columns before they scroll"
      },
      {
        "name": "--cascader-option-padding-y",
        "description": "Vertical padding of an option (follows the density's row padding)"
      },
      {
        "name": "--cascader-option-padding-x",
        "description": "Horizontal padding of an option (follows the density's row padding)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Utilisation de base

L'arbre d'options est la propriété options ; l'attribut value définit le chemin par défaut (séparé par des virgules ou tableau JSON). minerva-change indique le chemin sélectionné.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/cascader/wc/basic.html

```html
<div style="display: grid; gap: 8px">
  <minerva-cascader
    id="region"
    label="Region"
    placeholder="Select a city"
    value="zhejiang,hangzhou,xihu"
  ></minerva-cascader>
  <output id="result"></output>
</div>

```

### apps/docs/src/docs/pages/cascader/wc/basic.ts

```tsx
// `options` is a JS property; `minerva-change` reports the selected path.
type Option = { value: string; label: string; children?: Option[] };
type Cascader = HTMLElement & { options: Option[] };

export function setup(root: HTMLElement) {
  const cascader = root.querySelector<Cascader>("#region")!;
  const result = root.querySelector<HTMLOutputElement>("#result")!;
  cascader.options = [
    {
      value: "zhejiang",
      label: "Zhejiang",
      children: [
        {
          value: "hangzhou",
          label: "Hangzhou",
          children: [
            { value: "xihu", label: "West Lake" },
            { value: "binjiang", label: "Binjiang" },
          ],
        },
        { value: "ningbo", label: "Ningbo" },
      ],
    },
    {
      value: "jiangsu",
      label: "Jiangsu",
      children: [
        {
          value: "nanjing",
          label: "Nanjing",
          children: [{ value: "zhonghuamen", label: "Zhonghuamen" }],
        },
        { value: "suzhou", label: "Suzhou" },
      ],
    },
  ];
  const onChange = (event: Event) => {
    const { value } = (event as CustomEvent<{ value: string[] }>).detail;
    result.value = value.length ? `Path: ${value.join(" > ")}` : "Cleared";
  };
  cascader.addEventListener("minerva-change", onChange);
  return () => cascader.removeEventListener("minerva-change", onChange);
}

```

## Example: Dans un formulaire

L'élément est associé aux formulaires : il soumet le texte affiché sous name, required empêche une sélection vide et form.reset() rétablit l'attribut value.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/cascader/wc/form.html

```html
<form id="shipping" style="display: grid; gap: 8px; justify-items: start">
  <label for="destination">Destination</label>
  <minerva-cascader
    id="destination"
    name="destination"
    value='["fr","paris"]'
    required
  ></minerva-cascader>
  <div style="display: flex; gap: 8px">
    <minerva-button type="submit">Submit</minerva-button>
    <minerva-button type="reset" variant="ghost" color="neutral"
      >Reset</minerva-button
    >
  </div>
  <output id="result"></output>
</form>

```

### apps/docs/src/docs/pages/cascader/wc/form.ts

```tsx
// The submitted value is the displayed text; `required` blocks submission
// while empty and form.reset() restores the `value` attribute.
type Option = { value: string; label: string; children?: Option[] };
type Cascader = HTMLElement & { options: Option[] };

export function setup(root: HTMLElement) {
  const form = root.querySelector<HTMLFormElement>("#shipping")!;
  const result = root.querySelector<HTMLOutputElement>("#result")!;
  root.querySelector<Cascader>("#destination")!.options = [
    {
      value: "fr",
      label: "France",
      children: [
        { value: "paris", label: "Paris" },
        { value: "lyon", label: "Lyon" },
      ],
    },
    {
      value: "jp",
      label: "Japan",
      children: [
        { value: "tokyo", label: "Tokyo" },
        { value: "osaka", label: "Osaka" },
      ],
    },
  ];
  const onSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    result.value = `destination = ${new FormData(form).get("destination")}`;
  };
  const onReset = () => (result.value = "");
  form.addEventListener("submit", onSubmit);
  form.addEventListener("reset", onReset);
  return () => {
    form.removeEventListener("submit", onSubmit);
    form.removeEventListener("reset", onReset);
  };
}

```

## Example: Chargement différé

Avec loadData, activer une option sans enfants la déplie et charge ses enfants : définissez loading, ajoutez children puis réaffectez options.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/cascader/wc/lazy.html

```html
<minerva-cascader id="lazy" label="Location"></minerva-cascader>

```

### apps/docs/src/docs/pages/cascader/wc/lazy.ts

```tsx
// loadData is called when an option without children (and not isLeaf) is
// activated: set `loading`, add the children, then reassign `options`.
type Option = {
  value: string;
  label: string;
  isLeaf?: boolean;
  loading?: boolean;
  children?: Option[];
};
type Cascader = HTMLElement & {
  options: Option[];
  loadData?: (selectedOptions: Option[]) => void;
};

export function setup(root: HTMLElement) {
  const cascader = root.querySelector<Cascader>("#lazy")!;
  const timers: number[] = [];
  cascader.options = [
    { value: "europe", label: "Europe" },
    { value: "asia", label: "Asia" },
  ];
  cascader.loadData = (selectedOptions) => {
    const target = selectedOptions[selectedOptions.length - 1];
    target.loading = true;
    cascader.options = [...cascader.options];
    timers.push(
      window.setTimeout(() => {
        target.loading = false;
        const last = selectedOptions.length >= 2;
        target.children = [1, 2, 3].map((n) => ({
          value: `${target.value}-${n}`,
          label: `${target.label} ${n}`,
          isLeaf: last,
        }));
        cascader.options = [...cascader.options];
      }, 800),
    );
  };
  return () => timers.forEach((id) => clearTimeout(id));
}

```

## Example: Recherche, survol et affichage

show-search filtre tous les chemins pendant la saisie, expand-trigger="hover" ouvre les sous-menus au survol et displayRender formate le champ (ici seulement le dernier libellé). Les options désactivées ne peuvent pas être choisies.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/cascader/wc/search-hover.html

```html
<div style="display: flex; flex-wrap: wrap; gap: 12px">
  <minerva-cascader
    id="search"
    label="Category"
    placeholder="Type to search"
    show-search
  ></minerva-cascader>
  <minerva-cascader
    id="hover"
    label="Category"
    expand-trigger="hover"
    width="200"
  ></minerva-cascader>
  <minerva-cascader
    id="formatted"
    label="Category"
    value="electronics,phones"
    hide-clear-button
  ></minerva-cascader>
</div>

```

### apps/docs/src/docs/pages/cascader/wc/search-hover.ts

```tsx
// show-search filters every path, expand-trigger="hover" opens sub-menus on
// hover, displayRender formats the text of the field. Disabled options
// cannot be picked.
type Option = {
  value: string;
  label: string;
  disabled?: boolean;
  children?: Option[];
};
type Cascader = HTMLElement & {
  options: Option[];
  displayRender?: (labels: string[]) => string;
};

const options: Option[] = [
  {
    value: "electronics",
    label: "Electronics",
    children: [
      { value: "phones", label: "Phones" },
      { value: "laptops", label: "Laptops" },
      { value: "cameras", label: "Cameras", disabled: true },
    ],
  },
  {
    value: "home",
    label: "Home",
    children: [
      { value: "kitchen", label: "Kitchen" },
      { value: "garden", label: "Garden" },
    ],
  },
];

export function setup(root: HTMLElement) {
  root.querySelectorAll<Cascader>("minerva-cascader").forEach((cascader) => {
    cascader.options = options;
  });
  const formatted = root.querySelector<Cascader>("#formatted")!;
  formatted.displayRender = (labels) => labels[labels.length - 1] ?? "";
}

```

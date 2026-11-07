# Command

Une palette de commandes avec recherche dans une modale. Tapez pour filtrer par titre, description, groupe et mots-clés, déplacez-vous avec les flèches, choisissez avec Entrée ou un clic. Un raccourci global optionnel l'ouvre.

Package: minerva-design@1.22.3

Renderer: wc

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.3",
  "sourceCommit": "05d8029dbc66b57df26a3da7707f0fa0e4a02bde",
  "sourceDigest": "sha256:0d31b0bc3c28394756a1142132ddf7b2beac9f7ce2f5b2253e04712431d7c736",
  "referenceSourceDigest": "sha256:98c68657ee3e6708d0ba87e44b497d1aba974e208ad5676dbbb9902bc229d648"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.3/types.json) or getType() from minerva-design/contracts.

## Documentation

## CommandDialog

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/command-dialog",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "open",
    "typeText": "boolean",
    "attribute": "open",
    "required": false
  },
  {
    "name": "label",
    "typeText": "string | undefined",
    "attribute": "label",
    "required": false
  },
  {
    "name": "description",
    "typeText": "string | undefined",
    "attribute": "description",
    "required": false
  },
  {
    "name": "placeholder",
    "typeText": "string | undefined",
    "attribute": "placeholder",
    "required": false
  },
  {
    "name": "emptyText",
    "typeText": "string | undefined",
    "attribute": "empty-text",
    "required": false
  },
  {
    "name": "shortcutLabel",
    "typeText": "string | undefined",
    "attribute": "shortcut-label",
    "required": false
  },
  {
    "name": "shortcut",
    "typeText": "string | string[] | undefined",
    "attribute": "shortcut",
    "required": false
  },
  {
    "name": "maxResults",
    "typeText": "number",
    "attribute": "max-results",
    "required": false
  },
  {
    "name": "resultsLabel",
    "typeText": "string | undefined",
    "attribute": "results-label",
    "required": false
  },
  {
    "name": "enterLabel",
    "typeText": "string | undefined",
    "attribute": "enter-label",
    "required": false
  },
  {
    "name": "items",
    "typeText": "CommandItem[]",
    "required": false
  },
  {
    "name": "filter",
    "typeText": "(items: CommandItem[], query: string) => CommandItem[] | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "minerva-select",
    "typeText": "CustomEvent<{ value: string; item: CommandItem; }>",
    "detailType": {
      "typeText": "{ value: string; item: CommandItem; }",
      "typeRef": "type:430ccbfc9823c27ef889"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": false,
    "description": "A command was chosen (`detail: { value, item }`, `value` = the item's `id`); the palette then closes"
  },
  {
    "name": "minerva-open-change",
    "typeText": "CustomEvent<{ open: boolean; reason: CommandOpenChangeReason; }>",
    "detailType": {
      "typeText": "{ open: boolean; reason: CommandOpenChangeReason; }",
      "typeRef": "type:01f45bb1bf66a5faece8"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": true,
    "description": "The user asked to open (shortcut) / close (`detail: { open, reason }`); cancelable: `preventDefault()` keeps the current state"
  },
  {
    "name": "minerva-after-open",
    "typeText": "CustomEvent<undefined>",
    "bubbles": true,
    "composed": true,
    "cancelable": false,
    "description": "The palette is open and focus moved to the search input"
  },
  {
    "name": "minerva-after-close",
    "typeText": "CustomEvent<undefined>",
    "bubbles": true,
    "composed": true,
    "cancelable": false,
    "description": "The palette finished closing (after its exit animation)"
  }
]
```

## API

```json
{
  "wc:minerva-command-dialog": {
    "kind": "element",
    "source": "web-components/src/components/command/command.ts",
    "className": "MinervaCommandDialog",
    "summary": "Searchable command palette in a modal, with a global shortcut.",
    "description": "Command palette (`<CommandDialog>` of React): a searchable list of commands in a modal dialog. Type to filter (title, description, group and keywords), move with ArrowUp / ArrowDown (Home / End while the query is empty) over the results (combobox + listbox with `aria-activedescendant`), choose with Enter or a click; Escape (topmost layer only) or an overlay click closes it. Focus moves to the search input, is trapped, and returns to the opener on close. An optional global `shortcut` (e.g. \"mod+k\") opens it.",
    "properties": [
      {
        "name": "open",
        "attribute": "open",
        "type": "boolean",
        "default": "false",
        "description": "Whether the palette is open"
      },
      {
        "name": "label",
        "attribute": "label",
        "type": "string | undefined",
        "description": "Title of the dialog (default: localized \"Command palette\")"
      },
      {
        "name": "description",
        "attribute": "description",
        "type": "string | undefined",
        "description": "Description of the palette (default: a localized hint)"
      },
      {
        "name": "placeholder",
        "attribute": "placeholder",
        "type": "string | undefined",
        "description": "Placeholder (and accessible name) of the search input (default: a localized hint)"
      },
      {
        "name": "emptyText",
        "attribute": "empty-text",
        "type": "string | undefined",
        "description": "Text shown when nothing matches (default: localized \"No matching results\")"
      },
      {
        "name": "shortcutLabel",
        "attribute": "shortcut-label",
        "type": "string | undefined",
        "description": "Shortcut hint rendered as `<kbd>` next to the title, e.g. \"⌘K\""
      },
      {
        "name": "shortcut",
        "attribute": "shortcut",
        "type": "string | string[] | undefined",
        "description": "Global keyboard shortcut(s) that open the palette, e.g. \"mod+k\" (Cmd+K on macOS, Ctrl+K elsewhere). Modifiers: mod, ctrl, meta/cmd, shift, alt/option. The attribute takes a comma-separated list (\"mod+k, /\")."
      },
      {
        "name": "maxResults",
        "attribute": "max-results",
        "type": "number",
        "default": "12",
        "description": "Maximum number of results shown"
      },
      {
        "name": "resultsLabel",
        "attribute": "results-label",
        "type": "string | undefined",
        "description": "Accessible label of the results list (default: localized \"Command results\")"
      },
      {
        "name": "enterLabel",
        "attribute": "enter-label",
        "type": "string | undefined",
        "description": "Key hint at the end of the search input (default: localized \"Enter\")"
      },
      {
        "name": "items",
        "type": "CommandItem[]",
        "default": "[]",
        "description": "Commands to search (disabled items are never shown)"
      },
      {
        "name": "filter",
        "type": "(items: CommandItem[], query: string) => CommandItem[] | undefined",
        "description": "Custom search, e.g. to rank results by match quality. Receives the enabled items and the trimmed query (never empty) and returns the matching items in display order (then capped at `maxResults`). By default, items whose group, title, description or keywords contain the query (case-insensitive) are kept in `items` order."
      }
    ],
    "methods": [
      {
        "name": "show",
        "signature": "() => void",
        "description": "Opens the palette"
      },
      {
        "name": "hide",
        "signature": "() => void",
        "description": "Closes the palette"
      }
    ],
    "events": [
      {
        "name": "minerva-select",
        "description": "A command was chosen (`detail: { value, item }`, `value` = the item's `id`); the palette then closes"
      },
      {
        "name": "minerva-open-change",
        "description": "The user asked to open (shortcut) / close (`detail: { open, reason }`); cancelable: `preventDefault()` keeps the current state"
      },
      {
        "name": "minerva-after-open",
        "description": "The palette is open and focus moved to the search input"
      },
      {
        "name": "minerva-after-close",
        "description": "The palette finished closing (after its exit animation)"
      }
    ],
    "slots": [],
    "parts": [
      {
        "name": "overlay",
        "description": "The backdrop"
      },
      {
        "name": "content",
        "description": "The dialog panel (`role=\"dialog\"`)"
      },
      {
        "name": "header",
        "description": "The title row (accessible name of the dialog)"
      },
      {
        "name": "description",
        "description": "The description below the title"
      },
      {
        "name": "search",
        "description": "The search field (icon, input and Enter hint)"
      },
      {
        "name": "input",
        "description": "The search input (`role=\"combobox\"`)"
      },
      {
        "name": "list",
        "description": "The results list (`role=\"listbox\"`)"
      },
      {
        "name": "item",
        "description": "A result (`role=\"option\"`)"
      },
      {
        "name": "item--highlighted",
        "description": "Item state of `item`: highlighted"
      },
      {
        "name": "empty",
        "description": "The text shown when no command matches"
      }
    ],
    "cssProperties": [
      {
        "name": "--modal-width",
        "description": "Width of the panel (every size; defaults to the width of the size, capped by the viewport)"
      },
      {
        "name": "--modal-max-height",
        "description": "Maximum height of the panel (the body scrolls beyond)"
      },
      {
        "name": "--modal-padding",
        "description": "Horizontal padding of the header, description, body and footer"
      },
      {
        "name": "--modal-radius",
        "description": "Corner radius of the panel (defaults to --radius-xl)"
      },
      {
        "name": "--modal-shadow",
        "description": "Shadow of the panel (defaults to --shadow-xl)"
      },
      {
        "name": "--modal-background",
        "description": "Background of the panel"
      },
      {
        "name": "--modal-z-index",
        "description": "Stacking order of the panel (defaults to --z-modal)"
      },
      {
        "name": "--command-search-height",
        "description": "Minimum height of the search field (defaults to --control-height-md)"
      },
      {
        "name": "--command-results-max-height",
        "description": "Maximum height of the scrolling result list"
      },
      {
        "name": "--command-item-min-height",
        "description": "Minimum height of a result row"
      },
      {
        "name": "--command-item-padding-y",
        "description": "Vertical padding of a result row (follows the density's row padding)"
      },
      {
        "name": "--command-item-padding-x",
        "description": "Horizontal padding of a result row (follows the density's row padding)"
      },
      {
        "name": "--command-item-active-background",
        "description": "Background of the hovered / active row (defaults to a 10% primary tint)"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:Command": {
    "kind": "cssVars",
    "source": "react/src/components/Command",
    "vars": [
      {
        "name": "--command-search-height",
        "description": "Minimum height of the search field (defaults to --control-height-md)"
      },
      {
        "name": "--command-results-max-height",
        "description": "Maximum height of the scrolling result list"
      },
      {
        "name": "--command-item-min-height",
        "description": "Minimum height of a result row"
      },
      {
        "name": "--command-item-padding-y",
        "description": "Vertical padding of a result row (follows the density's row padding)"
      },
      {
        "name": "--command-item-padding-x",
        "description": "Horizontal padding of a result row (follows the density's row padding)"
      },
      {
        "name": "--command-item-active-background",
        "description": "Background of the hovered / active row (defaults to a 10% primary tint)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Utilisation de base

items est une propriété JS (id, title, description, group, keywords, disabled). Tapez pour filtrer, déplacez-vous avec les flèches, choisissez avec Entrée ou un clic ; minerva-select donne l'id choisi.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/command/wc/basic.html

```html
<minerva-button id="open-palette" variant="outline"
  >Search commands…</minerva-button
>
<minerva-command-dialog
  id="palette"
  placeholder="Type a command or search…"
  empty-text="No matching command"
></minerva-command-dialog>
<p id="palette-result" style="margin: 8px 0 0"></p>

```

### apps/docs/src/docs/pages/command/wc/basic.ts

```tsx
// `items` is a JS property (CommandItem[]); minerva-select gives the id.
type CommandItem = {
  id: string;
  title: string;
  description?: string;
  group?: string;
  keywords?: string;
  disabled?: boolean;
};
type CommandDialog = HTMLElement & { items: CommandItem[]; show(): void };
type Select = CustomEvent<{ value: string; item: CommandItem }>;

export function setup(root: HTMLElement) {
  const button = root.querySelector<HTMLElement>("#open-palette")!;
  const palette = root.querySelector<CommandDialog>("#palette")!;
  const result = root.querySelector<HTMLElement>("#palette-result")!;
  palette.items = [
    { id: "new-file", title: "New file", group: "File", keywords: "create" },
    { id: "open-recent", title: "Open recent", group: "File" },
    {
      id: "theme",
      title: "Toggle theme",
      description: "Switch between light and dark",
      group: "View",
      keywords: "dark light",
    },
    { id: "zoom", title: "Reset zoom", group: "View" },
    { id: "invite", title: "Invite member", group: "Team" },
    { id: "billing", title: "Billing", group: "Team", disabled: true },
  ];
  const onOpen = () => palette.show();
  const onSelect = (event: Event) => {
    const { value, item } = (event as Select).detail;
    result.textContent = `Ran "${item.title}" (${value})`;
  };
  button.addEventListener("click", onOpen);
  palette.addEventListener("minerva-select", onSelect);
  return () => {
    button.removeEventListener("click", onOpen);
    palette.removeEventListener("minerva-select", onSelect);
  };
}

```

## Example: Résultats classés

filter remplace la recherche par sous-chaîne par défaut : elle reçoit les éléments actifs et la requête sans espaces superflus, et renvoie les résultats dans l'ordre d'affichage. Ici, les titres qui commencent par la requête passent en premier.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/command/wc/custom-filter.html

```html
<minerva-button id="open-ranked" variant="outline"
  >Search “invoice”…</minerva-button
>
<minerva-command-dialog id="ranked"></minerva-command-dialog>
<p id="ranked-result" style="margin: 8px 0 0"></p>

```

### apps/docs/src/docs/pages/command/wc/custom-filter.ts

```tsx
// `filter` (JS property) receives the enabled items and the trimmed query and
// returns the results in display order: here, ranked by match quality.
type CommandItem = {
  id: string;
  title: string;
  description?: string;
  group?: string;
  keywords?: string;
};
type CommandDialog = HTMLElement & {
  items: CommandItem[];
  filter: (items: CommandItem[], query: string) => CommandItem[];
  show(): void;
};
type Select = CustomEvent<{ value: string; item: CommandItem }>;

const rank = (item: CommandItem, query: string) => {
  const title = item.title.toLowerCase();
  if (title.startsWith(query)) return 0;
  if (title.split(" ").some((word) => word.startsWith(query))) return 1;
  return 2;
};

export function setup(root: HTMLElement) {
  const button = root.querySelector<HTMLElement>("#open-ranked")!;
  const palette = root.querySelector<CommandDialog>("#ranked")!;
  const result = root.querySelector<HTMLElement>("#ranked-result")!;
  palette.items = [
    { id: "billing", title: "Billing history", keywords: "invoice" },
    { id: "invoices", title: "Invoices", group: "Billing" },
    { id: "new-invoice", title: "New invoice", keywords: "create" },
    { id: "tax", title: "Tax settings", description: "Invoice numbering" },
  ];
  palette.filter = (items, raw) => {
    const query = raw.toLowerCase();
    return items
      .filter((item) =>
        [item.title, item.description, item.group, item.keywords]
          .join(" ")
          .toLowerCase()
          .includes(query),
      )
      .sort((a, b) => rank(a, query) - rank(b, query));
  };
  const onOpen = () => palette.show();
  const onSelect = (event: Event) => {
    result.textContent = `Ran "${(event as Select).detail.item.title}"`;
  };
  button.addEventListener("click", onOpen);
  palette.addEventListener("minerva-select", onSelect);
  return () => {
    button.removeEventListener("click", onOpen);
    palette.removeEventListener("minerva-select", onSelect);
  };
}

```

## Example: Raccourci global

shortcut accepte une liste séparée par des virgules ("mod+k, /" ; mod vaut Ctrl, ou ⌘ sur macOS) et ouvre la palette depuis n'importe où, sauf pendant la saisie dans un champ. max-results limite la liste.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/command/wc/shortcut.html

```html
<p style="margin: 0">
  Press <kbd>Ctrl</kbd> + <kbd>K</kbd> (<kbd>⌘</kbd> + <kbd>K</kbd> on macOS) or
  <kbd>/</kbd> anywhere on the page.
</p>
<minerva-command-dialog
  id="go-to"
  shortcut="mod+k, /"
  label="Go to page"
  description="Jump to any page of the documentation."
  max-results="5"
></minerva-command-dialog>
<p id="go-to-result" style="margin: 8px 0 0"></p>

```

### apps/docs/src/docs/pages/command/wc/shortcut.ts

```tsx
// `shortcut` registers global keys ("mod" = Ctrl, or ⌘ on macOS) while the
// element is connected; max-results caps the visible results.
type CommandItem = { id: string; title: string; group?: string };
type CommandDialog = HTMLElement & { items: CommandItem[] };
type Select = CustomEvent<{ value: string; item: CommandItem }>;
type OpenChange = CustomEvent<{ open: boolean; reason: string }>;

const pages = ["Button", "Modal", "Drawer", "Menu", "Popover", "Toast"];

export function setup(root: HTMLElement) {
  const palette = root.querySelector<CommandDialog>("#go-to")!;
  const result = root.querySelector<HTMLElement>("#go-to-result")!;
  palette.items = [
    ...pages.map((title) => ({
      id: title.toLowerCase(),
      title,
      group: "Components",
    })),
    { id: "install", title: "Installation", group: "Guides" },
    { id: "theming", title: "Theming", group: "Guides" },
  ];
  const onChange = (event: Event) => {
    const { open, reason } = (event as OpenChange).detail;
    if (open) result.textContent = `Opened by ${reason}`;
  };
  const onSelect = (event: Event) =>
    (result.textContent = `Go to ${(event as Select).detail.item.title}`);
  palette.addEventListener("minerva-open-change", onChange);
  palette.addEventListener("minerva-select", onSelect);
  return () => {
    palette.removeEventListener("minerva-open-change", onChange);
    palette.removeEventListener("minerva-select", onSelect);
  };
}

```

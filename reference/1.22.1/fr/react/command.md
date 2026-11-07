# Command

Une palette de commandes avec recherche dans une modale. Tapez pour filtrer par titre, description, groupe et mots-clés, déplacez-vous avec les flèches, choisissez avec Entrée ou un clic. Un raccourci global optionnel l'ouvre.

Package: minerva-design@1.22.1

Renderer: react

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.1",
  "sourceCommit": "3b95c464583d2e1bcf02999361aa6cf5481d519b",
  "sourceDigest": "sha256:080b482abbb8d2745bf31d68a17d7a1299cbb89f0e3f8c1a4d1d91bdeb04d1be",
  "referenceSourceDigest": "sha256:22ecb97acf4fac039a6d9a7e4a78b6bedc12dbbb8c1a14e3feeef3bcd47a7cef"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.1/types.json) or getType() from minerva-design/contracts.

## Documentation

## CommandDialog

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "CommandDialog"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "open",
    "source": "packages/react/src/components/Command/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Controlled open state; leave `undefined` for uncontrolled."
  },
  {
    "name": "defaultOpen",
    "source": "packages/react/src/components/Command/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Initial open state while uncontrolled"
  },
  {
    "name": "items",
    "source": "packages/react/src/components/Command/types.ts",
    "kind": "array",
    "typeText": "CommandItem[]",
    "typeRef": "type:5e8f80324382283a6925",
    "required": true,
    "description": "Commands to search. Disabled items are never shown."
  },
  {
    "name": "title",
    "source": "packages/react/src/components/Command/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Title of the dialog; defaults to the localized \"Command palette\"."
  },
  {
    "name": "description",
    "source": "packages/react/src/components/Command/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Accessible description of the palette; defaults to a localized hint."
  },
  {
    "name": "placeholder",
    "source": "packages/react/src/components/Command/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Placeholder of the search input; defaults to a localized hint."
  },
  {
    "name": "emptyText",
    "source": "packages/react/src/components/Command/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Shown when nothing matches; defaults to the localized \"No matching results\"."
  },
  {
    "name": "shortcutLabel",
    "source": "packages/react/src/components/Command/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Shortcut hint rendered as `<kbd>` next to the title, e.g. \"⌘K\"."
  },
  {
    "name": "shortcut",
    "source": "packages/react/src/components/Command/types.ts",
    "kind": "union",
    "typeText": "string | string[] | undefined",
    "typeRef": "type:cdf445ffccc04acaf8cd",
    "required": false,
    "description": "Global keyboard shortcut(s) that open the palette, e.g. \"mod+k\" (Cmd+K on macOS, Ctrl+K elsewhere). Modifiers: mod, ctrl, meta/cmd, shift, alt/option."
  },
  {
    "name": "maxResults",
    "source": "packages/react/src/components/Command/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 12,
    "required": false,
    "description": "Maximum number of results shown"
  },
  {
    "name": "filter",
    "source": "packages/react/src/components/Command/types.ts",
    "kind": "function",
    "typeText": "((items: CommandItem[], query: string) => CommandItem[]) | undefined",
    "typeRef": "type:1100a4f8c74c7a7e97ff",
    "parameters": [
      {
        "name": "items",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "CommandItem[]",
        "typeRef": "type:5e8f80324382283a6925"
      },
      {
        "name": "query",
        "position": 1,
        "required": true,
        "rest": false,
        "typeText": "string",
        "typeRef": "type:e15e314d298fc0d116fc"
      }
    ],
    "returnType": {
      "typeText": "CommandItem[]",
      "typeRef": "type:5e8f80324382283a6925"
    },
    "required": false,
    "description": "Custom search, e.g. to rank results by match quality. Receives the enabled items and the trimmed query (never empty) and returns the matching items in display order (then capped at `maxResults`). By default, items whose group, title, description or keywords contain the query (case-insensitive) are kept in `items` order."
  },
  {
    "name": "resultsLabel",
    "source": "packages/react/src/components/Command/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label of the results list; defaults to the localized \"Command results\"."
  },
  {
    "name": "enterLabel",
    "source": "packages/react/src/components/Command/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Key hint shown at the end of the search input; defaults to the localized \"Enter\"."
  }
]
```

### events

```json
[
  {
    "name": "onOpenChange",
    "source": "packages/react/src/components/Command/types.ts",
    "kind": "function",
    "typeText": "((open: boolean) => void) | undefined",
    "typeRef": "type:b5d253184b7a0727bcf2",
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
    "description": "Called with the requested open state (shortcut, selection, Escape, overlay click)."
  },
  {
    "name": "onSelect",
    "source": "packages/react/src/components/Command/types.ts",
    "kind": "function",
    "typeText": "(item: CommandItem) => void",
    "typeRef": "type:8ecb7c37142ffccb690d",
    "parameters": [
      {
        "name": "item",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "CommandItem",
        "typeRef": "type:971471cfd46a8de3190d"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": true,
    "description": "Called with the chosen item (click or Enter); the dialog then closes."
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

## API

```json
{
  "CommandDialogProps": {
    "source": "react/src/components/Command/types.ts",
    "description": "Props of `CommandDialog`.",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "open",
        "type": "boolean",
        "required": false,
        "description": "Controlled open state; leave `undefined` for uncontrolled."
      },
      {
        "name": "defaultOpen",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Initial open state while uncontrolled"
      },
      {
        "name": "onOpenChange",
        "type": "(open: boolean) => void",
        "required": false,
        "description": "Called with the requested open state (shortcut, selection, Escape, overlay click)."
      },
      {
        "name": "items",
        "type": "CommandItem[]",
        "required": true,
        "description": "Commands to search. Disabled items are never shown."
      },
      {
        "name": "onSelect",
        "type": "(item: CommandItem) => void",
        "required": true,
        "description": "Called with the chosen item (click or Enter); the dialog then closes."
      },
      {
        "name": "title",
        "type": "ReactNode",
        "required": false,
        "description": "Title of the dialog; defaults to the localized \"Command palette\"."
      },
      {
        "name": "description",
        "type": "ReactNode",
        "required": false,
        "description": "Accessible description of the palette; defaults to a localized hint."
      },
      {
        "name": "placeholder",
        "type": "string",
        "required": false,
        "description": "Placeholder of the search input; defaults to a localized hint."
      },
      {
        "name": "emptyText",
        "type": "ReactNode",
        "required": false,
        "description": "Shown when nothing matches; defaults to the localized \"No matching results\"."
      },
      {
        "name": "shortcutLabel",
        "type": "ReactNode",
        "required": false,
        "description": "Shortcut hint rendered as `<kbd>` next to the title, e.g. \"⌘K\"."
      },
      {
        "name": "shortcut",
        "type": "string | string[]",
        "required": false,
        "description": "Global keyboard shortcut(s) that open the palette, e.g. \"mod+k\" (Cmd+K on macOS, Ctrl+K elsewhere). Modifiers: mod, ctrl, meta/cmd, shift, alt/option."
      },
      {
        "name": "maxResults",
        "type": "number",
        "required": false,
        "default": "12",
        "description": "Maximum number of results shown"
      },
      {
        "name": "filter",
        "type": "(items: CommandItem[], query: string) => CommandItem[]",
        "required": false,
        "description": "Custom search, e.g. to rank results by match quality. Receives the enabled items and the trimmed query (never empty) and returns the matching items in display order (then capped at `maxResults`). By default, items whose group, title, description or keywords contain the query (case-insensitive) are kept in `items` order."
      },
      {
        "name": "resultsLabel",
        "type": "string",
        "required": false,
        "description": "Accessible label of the results list; defaults to the localized \"Command results\"."
      },
      {
        "name": "enterLabel",
        "type": "ReactNode",
        "required": false,
        "description": "Key hint shown at the end of the search input; defaults to the localized \"Enter\"."
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional class name of the dialog panel."
      }
    ]
  },
  "CommandItem": {
    "source": "react/src/components/Command/types.ts",
    "description": "One entry of the command palette.",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "id",
        "type": "string",
        "required": true,
        "description": "Unique id, passed back through `onSelect`."
      },
      {
        "name": "title",
        "type": "string",
        "required": true,
        "description": "Main label."
      },
      {
        "name": "description",
        "type": "string",
        "required": false,
        "description": "Secondary line below the title."
      },
      {
        "name": "group",
        "type": "string",
        "required": false,
        "description": "Group name, shown as a badge and matched by the search."
      },
      {
        "name": "keywords",
        "type": "string",
        "required": false,
        "description": "Extra search terms (not displayed)."
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Hides the item from the results"
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

Palette contrôlée ; onSelect reçoit l'élément choisi puis la palette se ferme.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/command/demos/basic.tsx

```tsx
import { useState } from "react";
import { Button, CommandDialog, type CommandItem } from "minerva-design";

const ITEMS: CommandItem[] = [
  { id: "books", title: "Books", description: "/books", group: "Content" },
  {
    id: "reviews",
    title: "Reviews",
    description: "/reviews",
    group: "Content",
  },
  { id: "users", title: "Users", description: "/users", group: "Admin" },
  {
    id: "seo",
    title: "SEO settings",
    description: "/seo",
    keywords: "sitemap meta",
  },
];

export default function BasicDemo() {
  const [open, setOpen] = useState(false);
  const [last, setLast] = useState("—");
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Button onClick={() => setOpen(true)}>Search…</Button>
      <span>Selected: {last}</span>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        items={ITEMS}
        onSelect={(item) => setLast(item.title)}
      />
    </div>
  );
}

```

## Example: Résultats classés

filter remplace la recherche par sous-chaîne par défaut : elle reçoit les éléments actifs et la requête sans espaces superflus, et renvoie les résultats dans l'ordre d'affichage. Ici, les titres qui commencent par la requête passent en premier.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/command/demos/custom-filter.tsx

```tsx
import { useState } from "react";
import { Button, CommandDialog, type CommandItem } from "minerva-design";

const ITEMS: CommandItem[] = [
  { id: "billing", title: "Billing history", keywords: "invoice" },
  { id: "invoices", title: "Invoices", group: "Billing" },
  { id: "new-invoice", title: "New invoice", keywords: "create" },
  { id: "tax", title: "Tax settings", description: "Invoice numbering" },
];

// Rank: title starts with the query > a title word does > anywhere else
const rank = (item: CommandItem, query: string) => {
  const title = item.title.toLowerCase();
  if (title.startsWith(query)) return 0;
  if (title.split(" ").some((word) => word.startsWith(query))) return 1;
  return 2;
};

const filter = (items: CommandItem[], raw: string) => {
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

export default function CustomFilterDemo() {
  const [open, setOpen] = useState(false);
  const [last, setLast] = useState("—");
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <Button onClick={() => setOpen(true)}>Search “invoice”…</Button>
      <span>Selected: {last}</span>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        items={ITEMS}
        filter={filter}
        onSelect={(item) => setLast(item.title)}
      />
    </div>
  );
}

```

## Example: Raccourci global

shortcut="mod+k" ouvre la palette avec Cmd+K sur macOS et Ctrl+K ailleurs ; shortcutLabel affiche l'indication.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/command/demos/shortcut.tsx

```tsx
import { useState } from "react";
import { CommandDialog, type CommandItem } from "minerva-design";

const ITEMS: CommandItem[] = [
  { id: "new", title: "New document" },
  { id: "open", title: "Open recent", description: "Last 10 documents" },
  { id: "theme", title: "Toggle theme", keywords: "dark light" },
];

export default function ShortcutDemo() {
  const [last, setLast] = useState<string | null>(null);
  return (
    <>
      <p>
        Press <kbd>Ctrl</kbd> / <kbd>⌘</kbd> + <kbd>K</kbd> to open the palette.
      </p>
      <CommandDialog
        items={ITEMS}
        shortcut="mod+k"
        shortcutLabel="⌘K"
        title="Quick actions"
        onSelect={(item) => setLast(item.title)}
      />
      <p aria-live="polite">
        {last ? `Selected: ${last}` : "Nothing selected yet"}
      </p>
    </>
  );
}

```

## Example: Recherche du site

Button et CommandDialog composent la recherche : filtrage, groupes, résultats vides, sélection au clavier et retour du focus. Cet exemple utilise Ctrl+Maj+K ; le site utilise Cmd/Ctrl+K. Reliez onSelect à votre routeur.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-icons

Documentation context imports: none

### apps/docs/src/docs/pages/command/demos/site-search.tsx

```tsx
import { useState } from "react";
import { Button, CommandDialog, Stack, type CommandItem } from "minerva-design";
import { LuSearch } from "react-icons/lu";

const pages: CommandItem[] = [
  {
    id: "button",
    title: "Button",
    description: "Actions, loading and variants",
    group: "Components",
    keywords: "click action submit",
  },
  {
    id: "input",
    title: "Input",
    description: "Text fields and validation",
    group: "Components",
    keywords: "form text search",
  },
  {
    id: "installation",
    title: "Installation",
    description: "Install and configure Minerva",
    group: "Getting started",
    keywords: "npm pnpm css",
  },
];

export default function SiteSearchDemo() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("No page selected");
  return (
    <Stack gap={3} style={{ width: "100%", maxWidth: 420 }}>
      <Button
        color="neutral"
        variant="outline"
        startIcon={<LuSearch />}
        endIcon={<kbd>Ctrl ⇧ K</kbd>}
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        style={{ justifyContent: "space-between" }}
      >
        Search documentation
      </Button>
      <output aria-live="polite">{selected}</output>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Search documentation"
        description="Search titles, descriptions or keywords. Use the arrow keys and Enter to choose a page."
        placeholder="Search components or guides…"
        emptyText="No matching page. Try another keyword."
        items={pages}
        maxResults={8}
        shortcut="ctrl+shift+k"
        shortcutLabel="Ctrl ⇧ K"
        onSelect={(item) => setSelected(`Selected: ${item.title}`)}
      />
    </Stack>
  );
}

```

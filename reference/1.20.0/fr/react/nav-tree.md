# NavTree

Navigation latérale avec sections, branches dépliables, élément actif et mode compact à icônes. Les flèches déplacent le focus et ouvrent ou ferment les branches.

Package: minerva-design@1.20.0

Renderer: react

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.0",
  "sourceCommit": "09013eec9b429ff5907c596bcb5edf1281361bc0",
  "sourceDigest": "sha256:c9ed2b706b61413d29e506a3f04f3d35c044a4b57ec0e284935054f9e1898c7e",
  "referenceSourceDigest": "sha256:b368e6fa7c621870e513621690cab70035abb6a658e8344f3df3b0cb0be55a18"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.0/types.json) or getType() from minerva-design/contracts.

## Documentation

## NavTree

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "NavTree"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "sections",
    "source": "packages/react/src/components/NavTree/types.ts",
    "kind": "array",
    "typeText": "NavTreeSection[]",
    "typeRef": "type:a019625ccf9e285dcdd4",
    "required": true,
    "description": "Sections of items"
  },
  {
    "name": "activeId",
    "source": "packages/react/src/components/NavTree/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Id of the active (current page) item; its ancestors expand"
  },
  {
    "name": "collapsed",
    "source": "packages/react/src/components/NavTree/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Compact mode: icons only (titles, labels, trailing content and children are hidden)"
  },
  {
    "name": "wrapLabels",
    "source": "packages/react/src/components/NavTree/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Wraps long labels and descriptions instead of truncating them"
  },
  {
    "name": "defaultExpandedIds",
    "source": "packages/react/src/components/NavTree/types.ts",
    "kind": "array",
    "typeText": "string[] | undefined",
    "typeRef": "type:2f7bd52d63b79232027d",
    "required": false,
    "description": "Initially expanded branch ids (uncontrolled)"
  },
  {
    "name": "expandedIds",
    "source": "packages/react/src/components/NavTree/types.ts",
    "kind": "array",
    "typeText": "string[] | undefined",
    "typeRef": "type:2f7bd52d63b79232027d",
    "required": false,
    "description": "Expanded branch ids (controlled; pair with onExpandedChange)"
  },
  {
    "name": "renderLink",
    "source": "packages/react/src/components/NavTree/types.ts",
    "kind": "node",
    "typeText": "((item: NavTreeItem, content: ReactNode, state: NavTreeItemState) => ReactNode) | undefined",
    "typeRef": "type:f9df3e5a65bcceaf97f2",
    "parameters": [
      {
        "name": "item",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "NavTreeItem",
        "typeRef": "type:e0a51856731d063c2c10"
      },
      {
        "name": "content",
        "position": 1,
        "required": true,
        "rest": false,
        "typeText": "ReactNode",
        "typeRef": "type:d947e2db6b7ed3e4c192"
      },
      {
        "name": "state",
        "position": 2,
        "required": true,
        "rest": false,
        "typeText": "NavTreeItemState",
        "typeRef": "type:d474e785dbae84a05b11"
      }
    ],
    "returnType": {
      "typeText": "ReactNode",
      "typeRef": "type:d947e2db6b7ed3e4c192"
    },
    "required": false,
    "description": "Custom rendering of leaf links (e.g. a router `<Link>`). Render `content` inside and put `state.className` on the link"
  },
  {
    "name": "aria-label",
    "source": "packages/react/src/components/NavTree/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible name of the `<nav>` landmark"
  },
  {
    "name": "aria-labelledby",
    "source": "packages/react/src/components/NavTree/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "id(s) of the element(s) naming the `<nav>` landmark (replaces the default label)"
  },
  {
    "name": "id",
    "source": "packages/react/src/components/NavTree/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "id of the `<nav>` element"
  }
]
```

### events

```json
[
  {
    "name": "onExpandedChange",
    "source": "packages/react/src/components/NavTree/types.ts",
    "kind": "function",
    "typeText": "((expandedIds: string[]) => void) | undefined",
    "typeRef": "type:c1b5ab30727b40470966",
    "parameters": [
      {
        "name": "expandedIds",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "string[]",
        "typeRef": "type:19a96e1d6cef0c4dc643"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called with the expanded branch ids when a branch is toggled"
  },
  {
    "name": "onItemSelect",
    "source": "packages/react/src/components/NavTree/types.ts",
    "kind": "function",
    "typeText": "((item: NavTreeItem) => void) | undefined",
    "typeRef": "type:37468b3d5bb97e8eee44",
    "parameters": [
      {
        "name": "item",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "NavTreeItem",
        "typeRef": "type:e0a51856731d063c2c10"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when a leaf link or a branch is activated"
  }
]
```

## API

```json
{
  "NavTreeProps": {
    "source": "react/src/components/NavTree/types.ts",
    "description": "Props of `NavTree`, a sidebar navigation tree. `className`, `style`, `id`, `aria-*` and `data-*` attributes go to the `<nav>` element",
    "kind": "interface",
    "extends": [
      "DataAttributes"
    ],
    "props": [
      {
        "name": "sections",
        "type": "NavTreeSection[]",
        "required": true,
        "description": "Sections of items"
      },
      {
        "name": "activeId",
        "type": "string",
        "required": false,
        "description": "Id of the active (current page) item; its ancestors expand"
      },
      {
        "name": "collapsed",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Compact mode: icons only (titles, labels, trailing content and children are hidden)"
      },
      {
        "name": "wrapLabels",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Wraps long labels and descriptions instead of truncating them"
      },
      {
        "name": "defaultExpandedIds",
        "type": "string[]",
        "required": false,
        "description": "Initially expanded branch ids (uncontrolled)"
      },
      {
        "name": "expandedIds",
        "type": "string[]",
        "required": false,
        "description": "Expanded branch ids (controlled; pair with onExpandedChange)"
      },
      {
        "name": "onExpandedChange",
        "type": "(expandedIds: string[]) => void",
        "required": false,
        "description": "Called with the expanded branch ids when a branch is toggled"
      },
      {
        "name": "onItemSelect",
        "type": "(item: NavTreeItem) => void",
        "required": false,
        "description": "Called when a leaf link or a branch is activated"
      },
      {
        "name": "renderLink",
        "type": "(item: NavTreeItem, content: ReactNode, state: NavTreeItemState) => ReactNode",
        "required": false,
        "description": "Custom rendering of leaf links (e.g. a router `<Link>`). Render `content` inside and put `state.className` on the link"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional class name"
      },
      {
        "name": "style",
        "type": "CSSProperties",
        "required": false,
        "description": "Inline styles"
      },
      {
        "name": "aria-label",
        "type": "string",
        "required": false,
        "default": "\"Navigation\" (localized)",
        "description": "Accessible name of the `<nav>` landmark"
      },
      {
        "name": "aria-labelledby",
        "type": "string",
        "required": false,
        "description": "id(s) of the element(s) naming the `<nav>` landmark (replaces the default label)"
      },
      {
        "name": "id",
        "type": "string",
        "required": false,
        "description": "id of the `<nav>` element"
      },
      {
        "name": "ref",
        "type": "Ref<HTMLElement>",
        "required": false,
        "description": "Ref to the `<nav>` element"
      }
    ]
  },
  "NavTreeSection": {
    "source": "react/src/components/NavTree/types.ts",
    "description": "A titled group of NavTree items",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "id",
        "type": "string",
        "required": true,
        "description": "Unique id of the section"
      },
      {
        "name": "title",
        "type": "string",
        "required": false,
        "description": "Optional section heading"
      },
      {
        "name": "items",
        "type": "NavTreeItem[]",
        "required": true,
        "description": "Items of the section"
      }
    ]
  },
  "NavTreeItem": {
    "source": "react/src/components/NavTree/types.ts",
    "description": "An entry of a NavTree: a link, or a branch when it has children",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "id",
        "type": "string",
        "required": true,
        "description": "Unique id (matched against `activeId` / expanded ids)"
      },
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Visible label"
      },
      {
        "name": "description",
        "type": "string",
        "required": false,
        "description": "Secondary line under the label (hidden for nested items)"
      },
      {
        "name": "href",
        "type": "string",
        "required": false,
        "description": "Link target of a leaf item"
      },
      {
        "name": "icon",
        "type": "ReactNode",
        "required": false,
        "description": "Leading icon"
      },
      {
        "name": "endContent",
        "type": "ReactNode",
        "required": false,
        "description": "Trailing content, e.g. a badge or a count"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Disables the item"
      },
      {
        "name": "children",
        "type": "NavTreeItem[]",
        "required": false,
        "description": "Child items; the item becomes an expandable branch"
      }
    ]
  },
  "NavTreeItemState": {
    "source": "react/src/components/NavTree/types.ts",
    "description": "State of an item, passed to `renderLink`",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "active",
        "type": "boolean",
        "required": true,
        "description": "The item is the active one (`activeId`)"
      },
      {
        "name": "ancestorActive",
        "type": "boolean",
        "required": true,
        "description": "A descendant of the item is active"
      },
      {
        "name": "expanded",
        "type": "boolean",
        "required": true,
        "description": "The branch is expanded"
      },
      {
        "name": "depth",
        "type": "number",
        "required": true,
        "description": "Nesting depth (0 for top-level items)"
      },
      {
        "name": "collapsed",
        "type": "boolean",
        "required": true,
        "description": "The tree is in compact (icon-only) mode"
      },
      {
        "name": "hasChildren",
        "type": "boolean",
        "required": true,
        "description": "The item has children"
      },
      {
        "name": "disabled",
        "type": "boolean",
        "required": true,
        "description": "The item is disabled"
      },
      {
        "name": "className",
        "type": "string",
        "required": true,
        "description": "Class names to put on the rendered link (styles + stable hooks)"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:NavTree": {
    "kind": "cssVars",
    "source": "react/src/components/NavTree",
    "vars": [
      {
        "name": "--nav-tree-gap",
        "description": "Space between the sections"
      },
      {
        "name": "--nav-tree-item-height",
        "description": "Minimum height of a top-level row (defaults to the density's control height)"
      },
      {
        "name": "--nav-tree-item-padding-x",
        "description": "Horizontal padding of a row (follows the density's row padding)"
      },
      {
        "name": "--nav-tree-item-radius",
        "description": "Corner radius of a row (defaults to --radius-md)"
      },
      {
        "name": "--nav-tree-indent",
        "description": "Indentation of nested rows"
      },
      {
        "name": "--nav-tree-active-background",
        "description": "Background of the active row"
      },
      {
        "name": "--nav-tree-active-color",
        "description": "Accent color of the active row's icon"
      },
      {
        "name": "--nav-tree-hover-background",
        "description": "Background of a hovered row (defaults to --hover-color)"
      },
      {
        "name": "--nav-tree-guide-color",
        "description": "Color of the indent guide of an expanded branch (defaults to --border-color)"
      },
      {
        "name": "--nav-tree-guide-active-color",
        "description": "Color of the indent guide of the branch holding the active row"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Utilisation de base

Les branches contenant l'élément actif s'ouvrent automatiquement ; une fermeture manuelle est mémorisée. Les éléments acceptent icône, description et contenu de fin.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-icons

Documentation context imports: none

### apps/docs/src/docs/pages/nav-tree/demos/basic.tsx

```tsx
import { useState } from "react";
import { NavTree, type NavTreeSection } from "minerva-design";
import { LuChartBar, LuHouse, LuSettings, LuUsers } from "react-icons/lu";

const sections: NavTreeSection[] = [
  {
    id: "main",
    items: [
      { id: "home", label: "Home", href: "#home", icon: <LuHouse /> },
      {
        id: "analytics",
        label: "Analytics",
        description: "Traffic and conversions",
        icon: <LuChartBar />,
        children: [
          { id: "traffic", label: "Traffic", href: "#traffic" },
          { id: "funnels", label: "Funnels", href: "#funnels" },
        ],
      },
    ],
  },
  {
    id: "admin",
    title: "Administration",
    items: [
      {
        id: "users",
        label: "Users",
        href: "#users",
        icon: <LuUsers />,
        endContent: <small>12</small>,
      },
      {
        id: "settings",
        label: "Settings",
        href: "#settings",
        icon: <LuSettings />,
        disabled: true,
      },
    ],
  },
];

export default function BasicDemo() {
  const [active, setActive] = useState("traffic");
  return (
    <div style={{ maxWidth: 260 }}>
      <NavTree
        aria-label="Main navigation"
        sections={sections}
        activeId={active}
        onItemSelect={(item) => {
          if (!item.children) setActive(item.id);
        }}
      />
    </div>
  );
}

```

## Example: Mode compact et retour à la ligne

collapsed n'affiche que les icônes ; wrapLabels renvoie les libellés longs à la ligne au lieu de les tronquer.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-icons

Documentation context imports: none

### apps/docs/src/docs/pages/nav-tree/demos/collapsed.tsx

```tsx
import { useState } from "react";
import { Button, NavTree, type NavTreeSection } from "minerva-design";
import { LuFileText, LuHouse, LuInbox } from "react-icons/lu";

const sections: NavTreeSection[] = [
  {
    id: "main",
    items: [
      { id: "home", label: "Home", href: "#home", icon: <LuHouse /> },
      { id: "inbox", label: "Inbox", href: "#inbox", icon: <LuInbox /> },
      {
        id: "docs",
        label: "Documents with a rather long name",
        description: "Shared with the whole team",
        href: "#docs",
        icon: <LuFileText />,
      },
    ],
  },
];

export default function CollapsedDemo() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div style={{ display: "grid", gap: 12, justifyItems: "start" }}>
      <Button
        color="neutral"
        variant="outline"
        size="small"
        onClick={() => setCollapsed((c) => !c)}
      >
        {collapsed ? "Expand sidebar" : "Collapse sidebar"}
      </Button>
      <div style={{ width: collapsed ? 56 : 220 }}>
        <NavTree
          sections={sections}
          activeId="inbox"
          collapsed={collapsed}
          wrapLabels
        />
      </div>
    </div>
  );
}

```

## Example: Liens de routeur

renderLink rend les feuilles avec le lien de votre routeur ; conservez state.className. Les branches dépliées peuvent être contrôlées.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/nav-tree/demos/custom-link.tsx

```tsx
import { useState } from "react";
import { NavTree, type NavTreeSection } from "minerva-design";

const sections: NavTreeSection[] = [
  {
    id: "docs",
    title: "Guides",
    items: [
      { id: "intro", label: "Introduction", href: "/intro" },
      {
        id: "advanced",
        label: "Advanced",
        children: [
          { id: "ssr", label: "Server rendering", href: "/ssr" },
          { id: "theming", label: "Theming", href: "/theming" },
        ],
      },
    ],
  },
];

export default function CustomLinkDemo() {
  const [path, setPath] = useState("/ssr");
  const [expanded, setExpanded] = useState<string[]>(["advanced"]);
  return (
    <div style={{ maxWidth: 260 }}>
      <NavTree
        sections={sections}
        activeId={
          sections[0].items
            .flatMap((i) => [i, ...(i.children ?? [])])
            .find((i) => i.href === path)?.id
        }
        expandedIds={expanded}
        onExpandedChange={setExpanded}
        // Render your router's link component; keep state.className on it.
        renderLink={(item, content, state) => (
          <a
            key={item.id}
            href={`#${item.href}`}
            className={state.className}
            aria-current={state.active ? "page" : undefined}
            onClick={(event) => {
              event.preventDefault();
              setPath(item.href ?? "/");
            }}
          >
            {content}
          </a>
        )}
      />
    </div>
  );
}

```

# AppShell

Cadre d'application : barre latérale repliable ou flottante, en-tête collant et un unique repère main ; la navigation passe dans un tiroir à 768px et moins.

Package: minerva-design@1.19.3

Renderer: wc

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "1b65455cccbdd71bb609d7d859b1ef90f9e604c6",
  "sourceDigest": "sha256:a8b34eea01e9133306bb1fde48e7966deaaaa35d87c2dfd2e181d891c65e01c1",
  "referenceSourceDigest": "sha256:d3ed05a4228bc39ff766871c13b5ba292792f934f6ebc3d0d29af28589be129c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

## AppShell

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/app-shell",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "brand",
    "typeText": "string",
    "attribute": "brand",
    "required": false
  },
  {
    "name": "sidebarMode",
    "typeText": "\"expanded\" | \"compact\" | \"floating\"",
    "attribute": "sidebar-mode",
    "required": false
  },
  {
    "name": "navigationLabel",
    "typeText": "string | undefined",
    "attribute": "navigation-label",
    "required": false
  },
  {
    "name": "navigationKey",
    "typeText": "string | undefined",
    "attribute": "navigation-key",
    "required": false
  },
  {
    "name": "skipLink",
    "typeText": "string | undefined",
    "attribute": "skip-link",
    "required": false
  },
  {
    "name": "noSkipLink",
    "typeText": "boolean",
    "attribute": "no-skip-link",
    "required": false
  },
  {
    "name": "expandLabel",
    "typeText": "string | undefined",
    "attribute": "expand-label",
    "required": false
  },
  {
    "name": "collapseLabel",
    "typeText": "string | undefined",
    "attribute": "collapse-label",
    "required": false
  },
  {
    "name": "enableFloatingLabel",
    "typeText": "string | undefined",
    "attribute": "enable-floating-label",
    "required": false
  },
  {
    "name": "disableFloatingLabel",
    "typeText": "string | undefined",
    "attribute": "disable-floating-label",
    "required": false
  },
  {
    "name": "openNavigationLabel",
    "typeText": "string | undefined",
    "attribute": "open-navigation-label",
    "required": false
  },
  {
    "name": "closeNavigationLabel",
    "typeText": "string | undefined",
    "attribute": "close-navigation-label",
    "required": false
  },
  {
    "name": "collapsed",
    "typeText": "boolean",
    "attribute": "collapsed",
    "required": false
  },
  {
    "name": "mobile",
    "typeText": "boolean",
    "attribute": "mobile",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "minerva-sidebar-mode-change",
    "typeText": "CustomEvent<{ mode: AppShellSidebarMode; }>",
    "detailType": {
      "typeText": "{ mode: AppShellSidebarMode; }",
      "typeRef": "type:4d82a8bd57f9b19f2320"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": true,
    "description": "The user changed the sidebar mode (`detail: { mode }`); cancelable: `preventDefault()` keeps the current mode"
  },
  {
    "name": "minerva-open-change",
    "typeText": "CustomEvent<{ open: boolean; }>",
    "detailType": {
      "typeText": "{ open: boolean; }",
      "typeRef": "type:c13c3c46c902140ad14d"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": true,
    "description": "The mobile drawer opened / closed (`detail: { open }`); cancelable when the user asked for it"
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "description": "Page content, inside the `main` landmark"
  },
  {
    "name": "navigation",
    "description": "Navigation (sidebar on desktop, drawer on mobile)"
  },
  {
    "name": "brand",
    "description": "Brand (alternative to the `brand` attribute)"
  },
  {
    "name": "brand-icon",
    "description": "Decorative brand icon, still visible in the compact rail"
  },
  {
    "name": "header-actions",
    "description": "Content of the header bar (account menu, search...)"
  },
  {
    "name": "page-navigation",
    "description": "Rendered between the header and `main` (e.g. page tabs)"
  }
]
```

## API

```json
{
  "wc:minerva-app-shell": {
    "kind": "element",
    "source": "web-components/src/components/app-shell/app-shell.ts",
    "className": "MinervaAppShell",
    "summary": "Application layout with collapsible sidebar, header and mobile drawer.",
    "description": "Application chrome (`<AppShell>` of React): a desktop sidebar (expanded, compact rail or floating rail), a sticky header and a single `main` landmark. At 768px and below the navigation moves into a modal drawer opened from the header (focus trapped, Escape / overlay click close it, focus returns to the header button). A \"Skip to content\" link (first focusable element, visible on focus) moves focus to `main`. Differences from React: `navigation` is the `navigation` slot instead of a render function. The slot is rendered in exactly one place (the sidebar on desktop, the open drawer on mobile); the state the render function received is exposed as the `collapsed` / `mobile` attributes (style the navigation with `minerva-app-shell[collapsed] ...`) and the `closeNavigation()` / `expandNavigation()` methods. Control names are overridden with the `*-label` attributes.",
    "properties": [
      {
        "name": "brand",
        "attribute": "brand",
        "type": "string",
        "default": "\"\"",
        "description": "Brand text shown at the top of the sidebar (or use the `brand` slot)"
      },
      {
        "name": "sidebarMode",
        "attribute": "sidebar-mode",
        "type": "\"expanded\" | \"compact\" | \"floating\"",
        "default": "\"expanded\"",
        "description": "Sidebar mode"
      },
      {
        "name": "navigationLabel",
        "attribute": "navigation-label",
        "type": "string | undefined",
        "description": "Accessible name of the sidebar landmark and title of the mobile drawer (default: localized \"Navigation\")"
      },
      {
        "name": "navigationKey",
        "attribute": "navigation-key",
        "type": "string | undefined",
        "description": "Change it when a route commits to dismiss the mobile navigation"
      },
      {
        "name": "skipLink",
        "attribute": "skip-link",
        "type": "string | undefined",
        "description": "Text of the \"Skip to content\" link (default: localized)"
      },
      {
        "name": "noSkipLink",
        "attribute": "no-skip-link",
        "type": "boolean",
        "default": "false",
        "description": "Removes the skip link"
      },
      {
        "name": "expandLabel",
        "attribute": "expand-label",
        "type": "string | undefined",
        "description": "Name of the toggle that expands the sidebar"
      },
      {
        "name": "collapseLabel",
        "attribute": "collapse-label",
        "type": "string | undefined",
        "description": "Name of the toggle that collapses the sidebar"
      },
      {
        "name": "enableFloatingLabel",
        "attribute": "enable-floating-label",
        "type": "string | undefined",
        "description": "Name of the pin toggle when floating mode is off"
      },
      {
        "name": "disableFloatingLabel",
        "attribute": "disable-floating-label",
        "type": "string | undefined",
        "description": "Name of the pin toggle when floating mode is on"
      },
      {
        "name": "openNavigationLabel",
        "attribute": "open-navigation-label",
        "type": "string | undefined",
        "description": "Name of the header button that opens the mobile navigation"
      },
      {
        "name": "closeNavigationLabel",
        "attribute": "close-navigation-label",
        "type": "string | undefined",
        "description": "Name of the close button of the mobile navigation"
      },
      {
        "name": "collapsed",
        "attribute": "collapsed",
        "type": "boolean",
        "default": "false",
        "description": "Read-only: the desktop sidebar currently shows the compact rail"
      },
      {
        "name": "mobile",
        "attribute": "mobile",
        "type": "boolean",
        "default": "false",
        "description": "Read-only: the mobile layout is active (viewport <= 768px)"
      }
    ],
    "methods": [
      {
        "name": "openNavigation",
        "signature": "() => void",
        "description": "Opens the mobile navigation drawer (mobile layout only)"
      },
      {
        "name": "closeNavigation",
        "signature": "() => void",
        "description": "Closes the mobile navigation drawer (call it when an item is selected)"
      },
      {
        "name": "expandNavigation",
        "signature": "() => void",
        "description": "Switches the sidebar to `expanded` (e.g. when a compact group is opened)"
      },
      {
        "name": "focusMain",
        "signature": "() => void",
        "description": "Moves focus to the `main` landmark"
      }
    ],
    "events": [
      {
        "name": "minerva-sidebar-mode-change",
        "description": "The user changed the sidebar mode (`detail: { mode }`); cancelable: `preventDefault()` keeps the current mode"
      },
      {
        "name": "minerva-open-change",
        "description": "The mobile drawer opened / closed (`detail: { open }`); cancelable when the user asked for it"
      }
    ],
    "slots": [
      {
        "name": "",
        "description": "Page content, inside the `main` landmark"
      },
      {
        "name": "navigation",
        "description": "Navigation (sidebar on desktop, drawer on mobile)"
      },
      {
        "name": "brand",
        "description": "Brand (alternative to the `brand` attribute)"
      },
      {
        "name": "brand-icon",
        "description": "Decorative brand icon, still visible in the compact rail"
      },
      {
        "name": "header-actions",
        "description": "Content of the header bar (account menu, search...)"
      },
      {
        "name": "page-navigation",
        "description": "Rendered between the header and `main` (e.g. page tabs)"
      }
    ],
    "parts": [
      {
        "name": "root",
        "description": "The shell (`state`: whether the mobile navigation drawer is open)"
      },
      {
        "name": "skip-link",
        "description": "The skip to content link"
      },
      {
        "name": "sidebar",
        "description": "The desktop sidebar (<aside>)"
      },
      {
        "name": "header",
        "description": "The header bar"
      },
      {
        "name": "main",
        "description": "The <main> landmark"
      },
      {
        "name": "overlay",
        "description": "The backdrop of the mobile drawer"
      },
      {
        "name": "content",
        "description": "The mobile navigation drawer (role=dialog)"
      },
      {
        "name": "close-button",
        "description": "The close button of the mobile drawer"
      }
    ],
    "cssProperties": [
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
      },
      {
        "name": "--icon-button-color",
        "description": "Icon color"
      },
      {
        "name": "--icon-button-hover-bg",
        "description": "Background on hover"
      },
      {
        "name": "--icon-button-pressed-color",
        "description": "Icon color of a pressed toggle"
      },
      {
        "name": "--icon-button-pressed-bg",
        "description": "Background of a pressed toggle"
      },
      {
        "name": "--icon-button-size",
        "description": "Width and height of the button (every size; defaults follow the density's control heights)"
      },
      {
        "name": "--icon-button-icon-size",
        "description": "Font size of the icon (every size)"
      },
      {
        "name": "--icon-button-radius",
        "description": "Corner radius of the square shape (defaults to --radius-lg)"
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

## Example: Utilisation de base

Une barre latérale avec la marque et le slot navigation, un en-tête fixe (slot header-actions) et le repère main pour le slot par défaut. À 768px et moins, la navigation passe dans un tiroir modal ouvert depuis l'en-tête.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/app-shell/wc/basic.html

```html
<!-- The transform contains the fixed sidebar inside this preview frame. -->
<div style="height: 360px; overflow: auto; transform: translateZ(0)">
  <minerva-app-shell
    brand="Publishing Admin"
    navigation-label="Workspace navigation"
  >
    <span slot="brand-icon" aria-hidden="true">◇</span>
    <minerva-nav-tree
      slot="navigation"
      active-id="dashboard"
      aria-label="Workspace"
    ></minerva-nav-tree>
    <minerva-badge slot="header-actions" color="neutral" variant="subtle"
      >Workspace</minerva-badge
    >
    <minerva-page>
      <minerva-page-header
        heading="Dashboard"
        description="Select a section from the sidebar. Collapse it to keep more room for your content."
      ></minerva-page-header>
    </minerva-page>
  </minerva-app-shell>
</div>

```

### apps/docs/src/docs/pages/app-shell/wc/basic.ts

```tsx
type Item = { id: string; label: string; icon: string };
type NavTree = HTMLElement & {
  sections: { id: string; items: Item[] }[];
  activeId: string;
  collapsed: boolean;
};

export function setup(root: HTMLElement) {
  const shell = root.querySelector<HTMLElement & { closeNavigation(): void }>(
    "minerva-app-shell",
  )!;
  const nav = root.querySelector<NavTree>("minerva-nav-tree")!;
  const heading = root.querySelector("minerva-page-header")!;
  nav.sections = [
    {
      id: "workspace",
      items: [
        { id: "dashboard", label: "Dashboard", icon: "▦" },
        { id: "books", label: "Books", icon: "▤" },
        { id: "reviews", label: "Reviews", icon: "◇" },
        { id: "settings", label: "Settings", icon: "⚙" },
      ],
    },
  ];
  const sync = () => {
    nav.collapsed = shell.hasAttribute("collapsed");
  };
  const observer = new MutationObserver(sync);
  observer.observe(shell, { attributes: true, attributeFilter: ["collapsed"] });
  sync();
  const onSelect = (event: Event) => {
    const { value, item } = (
      event as CustomEvent<{ value: string; item: Item }>
    ).detail;
    event.preventDefault();
    nav.activeId = value;
    heading.setAttribute("heading", item.label);
    shell.closeNavigation();
  };
  nav.addEventListener("minerva-select", onSelect);
  return () => {
    observer.disconnect();
    nav.removeEventListener("minerva-select", onSelect);
  };
}

```

## Example: Événements, méthodes et libellés

minerva-sidebar-mode-change et minerva-open-change sont annulables (verrouillez le mode pour le voir). expandNavigation() et focusMain() pilotent le shell ; les attributs *-label et skip-link renomment les contrôles.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/app-shell/wc/controlled.html

```html
<div
  style="
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
    margin-bottom: 12px;
  "
>
  <minerva-checkbox id="lock" label="Lock sidebar mode"></minerva-checkbox>
  <minerva-button id="expand" size="small" variant="outline" color="neutral"
    >expandNavigation()</minerva-button
  >
  <minerva-button id="focus-main" size="small" variant="outline" color="neutral"
    >focusMain()</minerva-button
  >
  <output id="log" aria-live="polite"></output>
</div>
<div style="height: 360px; overflow: auto; transform: translateZ(0)">
  <minerva-app-shell
    id="shell"
    brand="Minerva"
    skip-link="Jump to the page"
    collapse-label="Shrink the sidebar"
    expand-label="Grow the sidebar"
    enable-floating-label="Float the rail"
    disable-floating-label="Stop floating"
    open-navigation-label="Show menu"
    close-navigation-label="Hide menu"
  >
    <minerva-nav-tree
      slot="navigation"
      active-id="inbox"
      aria-label="Workspace"
    ></minerva-nav-tree>
    <minerva-page>
      <minerva-page-header
        heading="Inbox"
        description="Sidebar changes are reported above."
      ></minerva-page-header>
    </minerva-page>
  </minerva-app-shell>
</div>

```

### apps/docs/src/docs/pages/app-shell/wc/controlled.ts

```tsx
// minerva-sidebar-mode-change / minerva-open-change are cancelable: calling
// preventDefault() keeps the current state. Methods drive the shell directly.
type Shell = HTMLElement & {
  sidebarMode: string;
  expandNavigation(): void;
  focusMain(): void;
  closeNavigation(): void;
};

export function setup(root: HTMLElement) {
  const shell = root.querySelector<Shell>("#shell")!;
  const lock = root.querySelector<HTMLElement & { checked: boolean }>("#lock")!;
  const log = root.querySelector<HTMLOutputElement>("#log")!;
  const onMode = (event: Event) => {
    const { mode } = (event as CustomEvent<{ mode: string }>).detail;
    if (lock.checked) {
      event.preventDefault();
      log.value = `Blocked switch to "${mode}"`;
    } else {
      log.value = `Sidebar mode: ${mode}`;
    }
  };
  const onOpen = (event: Event) => {
    const { open } = (event as CustomEvent<{ open: boolean }>).detail;
    log.value = `Drawer ${open ? "opened" : "closed"}`;
  };
  const nav = root.querySelector<
    HTMLElement & { sections: unknown[]; activeId: string; collapsed: boolean }
  >("minerva-nav-tree")!;
  nav.sections = [
    {
      id: "workspace",
      items: [
        { id: "inbox", label: "Inbox", icon: "✉" },
        { id: "archive", label: "Archive", icon: "▤" },
      ],
    },
  ];
  const sync = () => {
    nav.collapsed = shell.hasAttribute("collapsed");
  };
  const observer = new MutationObserver(sync);
  observer.observe(shell, { attributes: true, attributeFilter: ["collapsed"] });
  sync();
  const onNavigate = (event: Event) => {
    const { value, item } = (
      event as CustomEvent<{ value: string; item: { label: string } }>
    ).detail;
    event.preventDefault();
    nav.activeId = value;
    root
      .querySelector("minerva-page-header")!
      .setAttribute("heading", item.label);
    shell.closeNavigation();
  };
  const onClick = (event: Event) => {
    const id = (event.target as Element).closest("minerva-button")?.id;
    if (id === "expand") shell.expandNavigation();
    if (id === "focus-main") shell.focusMain();
  };
  shell.addEventListener("minerva-sidebar-mode-change", onMode);
  shell.addEventListener("minerva-open-change", onOpen);
  nav.addEventListener("minerva-select", onNavigate);
  root.addEventListener("click", onClick);
  return () => {
    shell.removeEventListener("minerva-sidebar-mode-change", onMode);
    shell.removeEventListener("minerva-open-change", onOpen);
    observer.disconnect();
    nav.removeEventListener("minerva-select", onNavigate);
    root.removeEventListener("click", onClick);
  };
}

```

## Example: Modes de la barre latérale et slots

sidebar-mode="compact" démarre avec le rail d'icônes ; les boutons de la barre latérale le déplient ou l'épinglent en rail flottant. L'attribut collapsed sert à styliser la navigation (libellés masqués ici) ; brand-icon reste visible dans le rail et page-navigation se place entre l'en-tête et main.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/app-shell/wc/sidebar-modes.html

```html
<!-- The transform contains the fixed sidebar inside this preview frame. -->
<div style="height: 360px; overflow: auto; transform: translateZ(0)">
  <minerva-app-shell
    brand="Publishing Admin"
    sidebar-mode="compact"
    navigation-label="Workspace navigation"
  >
    <span slot="brand-icon" aria-hidden="true">◇</span>
    <minerva-nav-tree
      slot="navigation"
      active-id="dashboard"
      aria-label="Workspace"
    ></minerva-nav-tree>
    <minerva-badge slot="header-actions" color="neutral" variant="subtle"
      >Workspace</minerva-badge
    >
    <minerva-page>
      <minerva-page-header
        heading="Dashboard"
        description="Use the sidebar controls to expand the rail or switch to floating mode."
      ></minerva-page-header>
    </minerva-page>
  </minerva-app-shell>
</div>

```

### apps/docs/src/docs/pages/app-shell/wc/sidebar-modes.ts

```tsx
type Item = { id: string; label: string; icon: string };
type NavTree = HTMLElement & {
  sections: { id: string; items: Item[] }[];
  activeId: string;
  collapsed: boolean;
};

export function setup(root: HTMLElement) {
  const shell = root.querySelector<HTMLElement & { closeNavigation(): void }>(
    "minerva-app-shell",
  )!;
  const nav = root.querySelector<NavTree>("minerva-nav-tree")!;
  const heading = root.querySelector("minerva-page-header")!;
  nav.sections = [
    {
      id: "workspace",
      items: [
        { id: "dashboard", label: "Dashboard", icon: "▦" },
        { id: "books", label: "Books", icon: "▤" },
        { id: "reviews", label: "Reviews", icon: "◇" },
        { id: "settings", label: "Settings", icon: "⚙" },
      ],
    },
  ];
  const sync = () => {
    nav.collapsed = shell.hasAttribute("collapsed");
  };
  const observer = new MutationObserver(sync);
  observer.observe(shell, { attributes: true, attributeFilter: ["collapsed"] });
  sync();
  const onSelect = (event: Event) => {
    const { value, item } = (
      event as CustomEvent<{ value: string; item: Item }>
    ).detail;
    event.preventDefault();
    nav.activeId = value;
    heading.setAttribute("heading", item.label);
    shell.closeNavigation();
  };
  nav.addEventListener("minerva-select", onSelect);
  return () => {
    observer.disconnect();
    nav.removeEventListener("minerva-select", onSelect);
  };
}

```

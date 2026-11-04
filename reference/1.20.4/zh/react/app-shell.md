# AppShell 应用外壳

应用外壳：可折叠或浮动的侧边栏、吸顶头部和唯一的 main 地标；768px 及以下时导航移入抽屉。

Package: minerva-design@1.20.4

Renderer: react

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.4",
  "sourceCommit": "5826c364a762ec5a1144b8eea89e5d7510e4099c",
  "sourceDigest": "sha256:38cfefdcb173c9a307526b9364c7a77acc74f713924006e65d94c6f3c5e94c61",
  "referenceSourceDigest": "sha256:8bb3a20ee069c63b8d85e6ccf29336af81fffa488ce873d14ee032291c18009f"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.4/types.json) or getType() from minerva-design/contracts.

## Documentation

## AppShell

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "AppShell"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "brand",
    "source": "packages/react/src/components/AppShell/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": true,
    "description": "Brand shown at the top of the sidebar (not a page heading)"
  },
  {
    "name": "brandIcon",
    "source": "packages/react/src/components/AppShell/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Decorative brand icon, still visible in the compact rail"
  },
  {
    "name": "navigation",
    "source": "packages/react/src/components/AppShell/types.ts",
    "kind": "node",
    "typeText": "(state: AppShellNavigationState) => ReactNode",
    "typeRef": "type:c6bad9f93bd94890f50e",
    "parameters": [
      {
        "name": "state",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "AppShellNavigationState",
        "typeRef": "type:0585c9445191e9f6a026"
      }
    ],
    "returnType": {
      "typeText": "ReactNode",
      "typeRef": "type:d947e2db6b7ed3e4c192"
    },
    "required": true,
    "description": "Renders the navigation; called with the current state. The navigation is rendered in exactly one place: the sidebar on desktop, the drawer on mobile."
  },
  {
    "name": "navigationLabel",
    "source": "packages/react/src/components/AppShell/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible name of the sidebar landmark and title of the mobile drawer"
  },
  {
    "name": "navigationKey",
    "source": "packages/react/src/components/AppShell/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Change it when a route commits to dismiss the mobile navigation"
  },
  {
    "name": "headerActions",
    "source": "packages/react/src/components/AppShell/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Content of the top header bar (account menu, search...), outside `main`"
  },
  {
    "name": "pageNavigation",
    "source": "packages/react/src/components/AppShell/types.ts",
    "kind": "node",
    "typeText": "ReactNode",
    "typeRef": "type:d947e2db6b7ed3e4c192",
    "required": false,
    "description": "Rendered between the header and `main` (e.g. open-page tabs)"
  },
  {
    "name": "sidebarMode",
    "source": "packages/react/src/components/AppShell/types.ts",
    "kind": "enum",
    "values": [
      "compact",
      "expanded",
      "floating"
    ],
    "typeText": "AppShellSidebarMode | undefined",
    "typeRef": "type:6c09c179e4a2b0b5cca5",
    "required": false,
    "description": "Sidebar mode (controlled)"
  },
  {
    "name": "defaultSidebarMode",
    "source": "packages/react/src/components/AppShell/types.ts",
    "kind": "enum",
    "values": [
      "compact",
      "expanded",
      "floating"
    ],
    "typeText": "AppShellSidebarMode | undefined",
    "typeRef": "type:6c09c179e4a2b0b5cca5",
    "default": "expanded",
    "required": false,
    "description": "Initial sidebar mode (uncontrolled)"
  },
  {
    "name": "labels",
    "source": "packages/react/src/components/AppShell/types.ts",
    "kind": "object",
    "typeText": "Partial<AppShellLabels> | undefined",
    "typeRef": "type:7122f4298a6a6ea1ef63",
    "required": false,
    "description": "Overrides of the control names (localized defaults)"
  },
  {
    "name": "skipLink",
    "source": "packages/react/src/components/AppShell/types.ts",
    "kind": "union",
    "typeText": "string | boolean | undefined",
    "typeRef": "type:8ae4e7bfd003833fb985",
    "default": true,
    "required": false,
    "description": "\"Skip to content\" link rendered as the first focusable element (visually hidden until focused); it moves focus to `main`. A string replaces its text, `false` removes it"
  }
]
```

### events

```json
[
  {
    "name": "onSidebarModeChange",
    "source": "packages/react/src/components/AppShell/types.ts",
    "kind": "function",
    "typeText": "((mode: AppShellSidebarMode) => void) | undefined",
    "typeRef": "type:c139a1aee55d570ddeda",
    "parameters": [
      {
        "name": "mode",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "AppShellSidebarMode",
        "typeRef": "type:a752ae4f32d5acf325b2"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called with the next mode when the user changes it"
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
    "prop": "sidebarMode",
    "event": "onSidebarModeChange",
    "syntax": "sidebarMode={sidebarMode} onSidebarModeChange={handler}"
  }
]
```

## API

```json
{
  "AppShellProps": {
    "source": "react/src/components/AppShell/types.ts",
    "kind": "interface",
    "extends": [
      "Omit<HTMLAttributes<HTMLDivElement>, \"children\">"
    ],
    "props": [
      {
        "name": "ref",
        "type": "Ref<HTMLDivElement>",
        "required": false,
        "description": "Ref to the root div"
      },
      {
        "name": "brand",
        "type": "ReactNode",
        "required": true,
        "description": "Brand shown at the top of the sidebar (not a page heading)"
      },
      {
        "name": "brandIcon",
        "type": "ReactNode",
        "required": false,
        "description": "Decorative brand icon, still visible in the compact rail"
      },
      {
        "name": "navigation",
        "type": "(state: AppShellNavigationState) => ReactNode",
        "required": true,
        "description": "Renders the navigation; called with the current state. The navigation is rendered in exactly one place: the sidebar on desktop, the drawer on mobile."
      },
      {
        "name": "navigationLabel",
        "type": "string",
        "required": false,
        "default": "\"Navigation\" (localized)",
        "description": "Accessible name of the sidebar landmark and title of the mobile drawer"
      },
      {
        "name": "navigationKey",
        "type": "string",
        "required": false,
        "description": "Change it when a route commits to dismiss the mobile navigation"
      },
      {
        "name": "headerActions",
        "type": "ReactNode",
        "required": false,
        "description": "Content of the top header bar (account menu, search...), outside `main`"
      },
      {
        "name": "pageNavigation",
        "type": "ReactNode",
        "required": false,
        "description": "Rendered between the header and `main` (e.g. open-page tabs)"
      },
      {
        "name": "children",
        "type": "ReactNode",
        "required": false,
        "description": "Page content, rendered inside the single `main` landmark"
      },
      {
        "name": "sidebarMode",
        "type": "AppShellSidebarMode",
        "required": false,
        "description": "Sidebar mode (controlled)"
      },
      {
        "name": "defaultSidebarMode",
        "type": "AppShellSidebarMode",
        "required": false,
        "default": "\"expanded\"",
        "description": "Initial sidebar mode (uncontrolled)"
      },
      {
        "name": "onSidebarModeChange",
        "type": "(mode: AppShellSidebarMode) => void",
        "required": false,
        "description": "Called with the next mode when the user changes it"
      },
      {
        "name": "labels",
        "type": "Partial<AppShellLabels>",
        "required": false,
        "description": "Overrides of the control names (localized defaults)"
      },
      {
        "name": "skipLink",
        "type": "boolean | string",
        "required": false,
        "default": "true",
        "description": "\"Skip to content\" link rendered as the first focusable element (visually hidden until focused); it moves focus to `main`. A string replaces its text, `false` removes it"
      }
    ]
  },
  "AppShellNavigationState": {
    "source": "react/src/components/AppShell/types.ts",
    "description": "State passed to the `navigation` render function",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "collapsed",
        "type": "boolean",
        "required": true,
        "description": "The desktop sidebar currently shows the compact rail"
      },
      {
        "name": "isMobile",
        "type": "boolean",
        "required": true,
        "description": "Navigation is rendered inside the mobile drawer (viewport <= 768px)"
      },
      {
        "name": "closeNavigation",
        "type": "() => void",
        "required": true,
        "description": "Closes the mobile navigation drawer (call it when an item is selected)"
      },
      {
        "name": "expandNavigation",
        "type": "() => void",
        "required": true,
        "description": "Switches the sidebar to `expanded` (e.g. when a compact group is opened)"
      }
    ]
  },
  "AppShellLabels": {
    "source": "react/src/components/AppShell/types.ts",
    "description": "Accessible names of the AppShell controls",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "expand",
        "type": "string",
        "required": true,
        "description": "Name of the toggle that expands the sidebar"
      },
      {
        "name": "collapse",
        "type": "string",
        "required": true,
        "description": "Name of the toggle that collapses the sidebar"
      },
      {
        "name": "enableFloating",
        "type": "string",
        "required": true,
        "description": "Name of the pin toggle when floating mode is off"
      },
      {
        "name": "disableFloating",
        "type": "string",
        "required": true,
        "description": "Name of the pin toggle when floating mode is on"
      },
      {
        "name": "openNavigation",
        "type": "string",
        "required": true,
        "description": "Name of the header button that opens the mobile navigation"
      },
      {
        "name": "closeNavigation",
        "type": "string",
        "required": true,
        "description": "Name of the close button of the mobile navigation"
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

## Example: 基础用法

navigation 是一个渲染函数，接收 collapsed / isMobile / closeNavigation / expandNavigation。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-icons

Documentation context imports: none

### apps/docs/src/docs/pages/app-shell/demos/basic.tsx

```tsx
import { useState } from "react";
import { AppShell, Badge, NavTree, Page, PageHeader } from "minerva-design";
import {
  LuBookOpen,
  LuLayoutDashboard,
  LuMessageSquare,
  LuSettings,
} from "react-icons/lu";

const items = [
  { id: "dashboard", label: "Dashboard", icon: <LuLayoutDashboard /> },
  { id: "books", label: "Books", icon: <LuBookOpen /> },
  { id: "reviews", label: "Reviews", icon: <LuMessageSquare /> },
  { id: "settings", label: "Settings", icon: <LuSettings /> },
];

export default function BasicDemo() {
  const [active, setActive] = useState("dashboard");
  return (
    // The transform makes the fixed sidebar relative to this preview frame.
    <div
      style={{
        height: 360,
        overflow: "auto",
        transform: "translateZ(0)",
        width: "100%",
      }}
    >
      <AppShell
        brand="Publishing Admin"
        brandIcon={<LuLayoutDashboard />}
        navigationLabel="Workspace navigation"
        style={{ minHeight: "100%" }}
        headerActions={
          <Badge color="neutral" variant="subtle">
            Workspace
          </Badge>
        }
        navigation={({ collapsed, closeNavigation }) => (
          <NavTree
            sections={[{ id: "workspace", items }]}
            activeId={active}
            collapsed={collapsed}
            onItemSelect={(item) => {
              setActive(item.id);
              closeNavigation();
            }}
          />
        )}
      >
        <Page>
          <PageHeader
            title={items.find((item) => item.id === active)?.label}
            description="Select a section from the sidebar. Collapse it to keep more room for your content."
          />
        </Page>
      </AppShell>
    </div>
  );
}

```

## Example: 受控侧边栏模式

sidebarMode / onSidebarModeChange 控制 expanded、compact 与 floating 模式；floating 在悬停或键盘聚焦时展开。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-icons

Documentation context imports: none

### apps/docs/src/docs/pages/app-shell/demos/controlled.tsx

```tsx
import { useState } from "react";
import {
  AppShell,
  NavTree,
  Page,
  PageHeader,
  Radio,
  RadioGroup,
  type AppShellSidebarMode,
} from "minerva-design";
import { LuLayoutDashboard, LuSettings } from "react-icons/lu";

const items = [
  { id: "overview", label: "Overview", icon: <LuLayoutDashboard /> },
  { id: "settings", label: "Settings", icon: <LuSettings /> },
];

export default function ControlledDemo() {
  const [mode, setMode] = useState<AppShellSidebarMode>("floating");
  const [active, setActive] = useState("overview");
  return (
    <div
      style={{
        height: 360,
        overflow: "auto",
        transform: "translateZ(0)",
        width: "100%",
      }}
    >
      <AppShell
        brand="Workspace"
        brandIcon={<LuLayoutDashboard />}
        sidebarMode={mode}
        onSidebarModeChange={setMode}
        style={{ minHeight: "100%" }}
        navigation={({ collapsed, closeNavigation }) => (
          <NavTree
            sections={[{ id: "workspace", items }]}
            activeId={active}
            collapsed={collapsed}
            onItemSelect={(item) => {
              setActive(item.id);
              closeNavigation();
            }}
          />
        )}
      >
        <Page>
          <PageHeader
            title={items.find((item) => item.id === active)?.label}
            description="Control the sidebar from the header or the options below."
          />
          <RadioGroup
            label="Sidebar mode"
            value={mode}
            onChange={(value) => {
              if (
                value === "floating" ||
                value === "compact" ||
                value === "expanded"
              )
                setMode(value);
            }}
          >
            <Radio value="floating">Floating</Radio>
            <Radio value="compact">Compact</Radio>
            <Radio value="expanded">Expanded</Radio>
          </RadioGroup>
        </Page>
      </AppShell>
    </div>
  );
}

```

## Example: 跳转链接

“跳到主要内容”链接是第一个可聚焦元素：通过键盘聚焦前隐藏，激活后将焦点移到 main。skipLink 可传入自定义文本，或传入 false 移除。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-icons

Documentation context imports: none

### apps/docs/src/docs/pages/app-shell/demos/skip-link.tsx

```tsx
import { useState } from "react";
import {
  AppShell,
  Button,
  Badge,
  NavTree,
  Page,
  PageHeader,
} from "minerva-design";
import { LuLayoutDashboard } from "react-icons/lu";

const items = ["Dashboard", "Books", "Reviews", "Settings"].map((label) => ({
  id: label.toLowerCase(),
  label,
  icon: <LuLayoutDashboard />,
}));

export default function SkipLinkDemo() {
  const [active, setActive] = useState("books");
  const [count, setCount] = useState(0);
  return (
    // The transform makes the fixed sidebar relative to this preview frame.
    <div
      style={{
        height: 320,
        overflow: "auto",
        transform: "translateZ(0)",
        width: "100%",
      }}
    >
      <AppShell
        brand="Publishing Admin"
        brandIcon={<LuLayoutDashboard />}
        skipLink="Skip to the book list"
        style={{ minHeight: "100%" }}
        headerActions={
          <Badge color="neutral" variant="subtle">
            Workspace
          </Badge>
        }
        navigation={({ collapsed, closeNavigation }) => (
          <NavTree
            sections={[{ id: "workspace", items }]}
            collapsed={collapsed}
            activeId={active}
            onItemSelect={(item) => {
              setActive(item.id);
              closeNavigation();
            }}
          />
        )}
      >
        <Page>
          <PageHeader
            title={items.find((item) => item.id === active)?.label}
            description="Focus the frame and press Tab: the skip link appears first"
          />
          <Button size="small" onClick={() => setCount(count + 1)}>
            First action of the content
          </Button>
          <output aria-live="polite">Activated {count} times</output>
        </Page>
      </AppShell>
    </div>
  );
}

```

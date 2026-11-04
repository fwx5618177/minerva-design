# ConfigProvider

Provides the theme and the language of the React library to your application, and exposes them through useConfig().

Package: minerva-design@1.20.6

Renderer: vue

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.6",
  "sourceCommit": "63ce45656d8f3d1bfbee71026e84674640ae9abf",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:fa9a782f68a5d5b512762e2152b2ad065da3de6937bac96eef63709ddba3b95b"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.6/types.json) or getType() from minerva-design/contracts.

## Documentation

### Usage

Render one ConfigProvider at the root of your application. It applies the theme as CSS variables on , sets the language of the React library's built-in texts, and provides both to useConfig().

Both props are reactive: store them in state to let users switch theme or language at runtime.

Only the outermost ConfigProvider touches global state: it writes data-theme, data-palette and the theme variables on , persists the cookies and sets the React library's global language. A nested provider never does; it scopes its own settings to its subtree (see Nesting providers).

### Palette, persistence and callbacks

palette adds a color palette ("editorial", "tech", "graphite" or "cool") on top of the light, dark or system theme. persist saves theme and palette changes in the theme and palette cookies and restores them after hydration. onThemeChange and onPaletteChange are called after setTheme and setPalette change the value.

useConfig() also returns mode, resolvedMode and palette, and the setTheme and setPalette setters, so any component can switch the theme without lifting state. Server rendering, cookies and the no-flash init script are covered in

### Brand color

primaryColor sets your brand color without overriding --primary-color by hand: pass a CSS color ("#4f46e5", rgb(), a named color) for both modes, or a { light, dark } pair. It keeps the explicit theme: theme stays "light", "dark" or "system", so data-theme, useConfig().mode and ThemeToggle keep working.

Derived tokens: every token derived from primary-color (hover, active, subtle, border, text, focus ring, selected color and, unless the palette has its own, the accent tokens) is recomputed from the brand color with the default theme's formulas. A single color gets a dark-mode value mixed toward white in OKLab until it reaches a 4.5:1 contrast on dark surfaces (#4f46e5 becomes #7b85f2); colors that already pass are kept.

Precedence: primaryColor wins over the primary color of the palette and of the theme; the palette keeps its other tokens. An invalid color is ignored, with a warning in development.

Nesting: nested providers inherit the brand color, and a nested primaryColor applies to its subtree only (including its overlays); null restores the theme's own primary color.

Server rendering: the root provider renders the light and dark brand values in a  keyed on data-theme, so the server markup has the brand color before hydration (no flash with the theme init script). React Native (MinervaProvider), Taro, uni-app and WeChat mini program providers (ConfigProvider / ThemeProvider), Vue (ConfigProvider / ThemeProvider), Angular (, provideMinerva({ primaryColor })) and  accept the same value, with the same semantics.

### ConfigContext

useConfig() throws when there is no ConfigProvider above it, which catches setup mistakes early. Read ConfigContext directly when the provider is optional: it returns undefined instead of throwing.

### Nesting providers

A ConfigProvider inside another one is a nested provider. Use it to give one region of the page, a preview or a demo another theme, palette or language without affecting the rest of the page.

Inheritance: it inherits theme, palette and locale from the closest provider above it. Only the props you set are overridden, and useConfig() below it returns the merged values. Inherited settings keep following the parent when it changes.

Scoped theme: a theme or palette override applies to its subtree only. The provider renders a wrapper element with display: contents (so the layout does not change) that carries data-theme, data-palette and the theme variables. Without a theme or palette override, no wrapper is rendered.

Scoped language: a locale override only changes the built-in texts of its subtree. A provider that only sets locale never touches the theme.

Overlays: content rendered in a portal from a scoped subtree (Modal, Drawer, Popover, Select, Menu, Tooltip, Toast…) goes into a container on  that carries the same scope, so overlays get the scoped theme too. Imperative APIs rendered outside the React tree, such as a standalone confirm(), use the root theme.

Global state: a nested provider never writes to , never reads or writes the cookies (persist is ignored) and never changes the React library's global language. Unmounting it leaves the page exactly as the root provider set it, and unmounting the root provider restores what it changed. setTheme and setPalette of a nested provider change its own override, or the parent's value for a setting it does not override.

```tsx
import { ConfigProvider } from "minerva-design";
import "minerva-design/style.css";

export default function Root() {
  return (
    <ConfigProvider theme="auto" locale={{ language: "en" }}>
      <App />
    </ConfigProvider>
  );
}
```

```tsx
import { useState } from "react";
import { Button, ConfigProvider, type Theme } from "minerva-design";

export default function Root() {
  const [theme, setTheme] = useState<Theme>("light");
  return (
    <ConfigProvider theme={theme}>
      <Button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Toggle theme
      </Button>
    </ConfigProvider>
  );
}
```

```tsx
import { Button, ConfigProvider, useConfig } from "minerva-design";

export default function Root() {
  return (
    // "system" is an alias of "auto". palette applies with light / dark / system.
    <ConfigProvider
      theme="system"
      palette="editorial"
      persist // restore / save the "theme" and "palette" cookies
      onThemeChange={(theme) => analytics.track("theme", theme)}
      onPaletteChange={(palette) => analytics.track("palette", palette)}
    >
      <App />
    </ConfigProvider>
  );
}

function Settings() {
  const { mode, resolvedMode, palette, setTheme, setPalette } = useConfig();
  // mode: "light" | "dark" | "system"; resolvedMode: "light" | "dark"
  return (
    <>
      <Button onClick={() => setTheme(resolvedMode === "dark" ? "light" : "dark")}>
        {mode}
      </Button>
      <Button onClick={() => setPalette(palette === "tech" ? null : "tech")}>
        {palette ?? "default"}
      </Button>
    </>
  );
}
```

```tsx
import { ConfigProvider, ThemeToggle } from "minerva-design";

// Indigo brand: no --primary-color overrides, no !important.
// theme stays "light" | "dark" | "system", so data-theme and ThemeToggle work.
export default function Root() {
  return (
    <ConfigProvider theme="system" persist primaryColor="#4f46e5">
      {/* dark mode derives #7b85f2 from #4f46e5 */}
      <ThemeToggle />
      <App />
    </ConfigProvider>
  );
}

// Or pick both values:
<ConfigProvider theme="light" primaryColor={{ light: "#4f46e5", dark: "#818cf8" }} />

// The palette keeps its surfaces and text colors, primaryColor wins:
<ConfigProvider palette="tech" primaryColor="#4f46e5" />
```

```tsx
import { ConfigProvider } from "minerva-design";

export default function Root() {
  return (
    // root provider: owns <html>, the cookies and the React library's global language
    <ConfigProvider theme="system" palette="editorial" persist>
      <App />

      {/* inherits theme + palette, only this subtree is in Japanese */}
      <ConfigProvider locale={{ language: "ja" }}>
        <Sidebar />
      </ConfigProvider>

      {/* dark + inherited palette for this card and its overlays only */}
      <ConfigProvider theme="dark">
        <PreviewCard />
      </ConfigProvider>
    </ConfigProvider>
  );
}
```

```tsx
import { useContext } from "react";
import { ConfigContext } from "minerva-design";

// Unlike useConfig(), reading the context directly does not throw outside a
// provider: it returns undefined, which is handy for optional integrations.
function useOptionalConfig() {
  return useContext(ConfigContext);
}
```

## ConfigProvider

Support: stable

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "ConfigProvider"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "theme",
    "type": "ConfigProviderTheme",
    "required": false,
    "description": "Theme of the subtree (`v-model:theme`). Root default: `\"auto\"`",
    "typeText": "ConfigProviderTheme"
  },
  {
    "name": "palette",
    "type": "\"editorial\" | \"tech\" | \"graphite\" | \"cool\" | null",
    "required": false,
    "description": "Color palette (light / dark / system themes only); `null` for none",
    "typeText": "\"editorial\" | \"tech\" | \"graphite\" | \"cool\" | null"
  },
  {
    "name": "primaryColor",
    "type": "PrimaryColor | null",
    "required": false,
    "description": "Brand color: a CSS color for both modes (the dark-mode value is\nderived for contrast on dark surfaces) or a `{ light, dark }` pair.\nRecomputes every token derived from `primary-color` and wins over the\npalette's primary color; the theme mode stays explicit. Unset: the\nparent provider's; `null`: the theme's own. Invalid colors are ignored\nwith a development warning.",
    "typeText": "PrimaryColor | null"
  },
  {
    "name": "persist",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Root only: persist theme and palette in cookies.",
    "typeText": "boolean"
  },
  {
    "name": "locale",
    "type": "Locale",
    "required": false,
    "description": "Language of the built-in texts",
    "typeText": "Locale"
  },
  {
    "name": "preset",
    "type": "\"compact\" | \"editorial\" | \"minerva\" | \"touch\"",
    "required": false,
    "description": "Design preset (brings its palette unless `palette` is set)",
    "typeText": "\"compact\" | \"editorial\" | \"minerva\" | \"touch\""
  },
  {
    "name": "density",
    "type": "\"compact\" | \"standard\" | \"comfortable\"",
    "required": false,
    "typeText": "\"compact\" | \"standard\" | \"comfortable\""
  },
  {
    "name": "radius",
    "type": "\"medium\" | \"small\" | \"large\" | \"none\"",
    "required": false,
    "typeText": "\"medium\" | \"small\" | \"large\" | \"none\""
  },
  {
    "name": "shadow",
    "type": "\"subtle\" | \"none\" | \"standard\"",
    "required": false,
    "typeText": "\"subtle\" | \"none\" | \"standard\""
  },
  {
    "name": "fontScale",
    "type": "\"small\" | \"large\" | \"standard\"",
    "required": false,
    "typeText": "\"small\" | \"large\" | \"standard\""
  }
]
```

### events

```json
[
  {
    "name": "update:theme",
    "type": "[theme: ConfigProviderTheme]",
    "typeText": "[theme: ConfigProviderTheme]",
    "parameters": [
      {
        "name": "theme",
        "position": 0,
        "typeText": "ConfigProviderTheme",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "update:palette",
    "type": "[palette: \"editorial\" | \"tech\" | \"graphite\" | \"cool\" | null]",
    "typeText": "[palette: \"editorial\" | \"tech\" | \"graphite\" | \"cool\" | null]",
    "parameters": [
      {
        "name": "palette",
        "position": 0,
        "typeText": "\"editorial\" | \"tech\" | \"graphite\" | \"cool\" | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "themeChange",
    "type": "[theme: ConfigProviderTheme]",
    "typeText": "[theme: ConfigProviderTheme]",
    "parameters": [
      {
        "name": "theme",
        "position": 0,
        "typeText": "ConfigProviderTheme",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "paletteChange",
    "type": "[palette: \"editorial\" | \"tech\" | \"graphite\" | \"cool\" | null]",
    "typeText": "[palette: \"editorial\" | \"tech\" | \"graphite\" | \"cool\" | null]",
    "parameters": [
      {
        "name": "palette",
        "position": 0,
        "typeText": "\"editorial\" | \"tech\" | \"graphite\" | \"cool\" | null",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "type": "any",
    "typeText": "any"
  }
]
```

### bindings

```json
[
  {
    "prop": "theme",
    "event": "update:theme",
    "syntax": "v-model:theme"
  },
  {
    "prop": "palette",
    "event": "update:palette",
    "syntax": "v-model:palette"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: basic

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/config-provider/vue/basic.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import {
  ConfigProvider,
  Button,
  ThemeToggle,
  HStack,
} from "minerva-design/vue";
import type { ConfigProviderTheme } from "minerva-design/vue";
const theme = ref<ConfigProviderTheme>("light");
</script>
<template>
  <ConfigProvider v-model:theme="theme"
    ><HStack :gap="3"
      ><Button>Scoped action</Button><ThemeToggle /><output
        >Theme: {{ theme }}</output
      ></HStack
    ></ConfigProvider
  >
</template>

```

## Example: brand-color

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/config-provider/vue/brand-color.vue

```vue
<script setup lang="ts">
import {
  ConfigProvider,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  HStack,
  ResponsiveGrid,
} from "minerva-design/vue";

const scopes = [
  { title: 'primaryColor="#4f46e5"', primaryColor: "#4f46e5" },
  {
    title: "Indigo + dark (#7b85f2)",
    primaryColor: "#4f46e5",
    theme: "dark" as const,
  },
  {
    title: "{ light, dark } pair",
    primaryColor: { light: "#4f46e5", dark: "#a5b4fc" },
  },
  {
    title: 'Teal over palette="editorial"',
    primaryColor: "#0d9488",
    palette: "editorial" as const,
  },
];
</script>
<template>
  <ResponsiveGrid :columns="{ base: 1, sm: 2 }" :gap="3">
    <ConfigProvider
      v-for="scope in scopes"
      :key="scope.title"
      :primary-color="scope.primaryColor"
      :theme="scope.theme"
      :palette="scope.palette"
      ><Card variant="outline" padding="medium"
        ><CardHeader
          ><CardTitle>{{ scope.title }}</CardTitle></CardHeader
        ><CardContent
          ><HStack :gap="2"
            ><Button>Primary</Button
            ><Button variant="outline">Outline</Button></HStack
          ></CardContent
        ></Card
      ></ConfigProvider
    >
  </ResponsiveGrid>
</template>

```

## Example: locale

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/config-provider/vue/locale.vue

```vue
<script setup lang="ts">
import { ConfigProvider, Pagination, VStack } from "minerva-design/vue";
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><ConfigProvider :locale="{ language: 'en' }"
      ><Pagination :total="100" /></ConfigProvider
    ><ConfigProvider :locale="{ language: 'zh' }"
      ><Pagination :total="100" /></ConfigProvider
  ></VStack>
</template>

```

## Example: nested

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/config-provider/vue/nested.vue

```vue
<script setup lang="ts">
import { ConfigProvider, Button, Box, VStack } from "minerva-design/vue";
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><ConfigProvider theme="light"
      ><Box :p="4" bg="surface"
        ><Button>Light scope</Button
        ><ConfigProvider theme="dark"
          ><Box :p="4" :mt="3" bg="surface"
            ><Button>Nested dark scope</Button></Box
          ></ConfigProvider
        ></Box
      ></ConfigProvider
    ></VStack
  >
</template>

```

## Example: palette-design

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/config-provider/vue/palette-design.vue

```vue
<script setup lang="ts">
import {
  ConfigProvider,
  Button,
  Input,
  VStack,
  PaletteToggle,
} from "minerva-design/vue";
</script>
<template>
  <ConfigProvider palette="tech" density="compact" radius="small"
    ><VStack :gap="3"
      ><PaletteToggle /><Input
        aria-label="Compact input"
        placeholder="Compact input"
      /><Button>Configured appearance</Button></VStack
    ></ConfigProvider
  >
</template>

```

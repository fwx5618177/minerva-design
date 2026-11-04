# ConfigProvider

Fournit le thème et la langue de la bibliothèque React à votre application, et les expose via useConfig().

Package: minerva-design@1.20.4

Renderer: vue

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.4",
  "sourceCommit": "c389776dc1aa3bf80277d9c47f2c62d8f235e947",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:96f9f31e7015b805e8eece3c05731306a461013443150c08b7b7a91a3bfc1bb6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.4/types.json) or getType() from minerva-design/contracts.

## Documentation

### Utilisation

Affichez un seul ConfigProvider à la racine de votre application. Il applique le thème sous forme de variables CSS sur , définit la langue des textes intégrés de la bibliothèque React et fournit les deux à useConfig().

Les deux props sont réactives : stockez-les dans un état pour permettre de changer de thème ou de langue à l'exécution.

Seul le ConfigProvider le plus externe modifie l'état global : il écrit data-theme, data-palette et les variables du thème sur , enregistre les cookies et définit la langue globale de la bibliothèque React. Un provider imbriqué ne le fait jamais ; il applique ses propres réglages à son sous-arbre uniquement (voir Providers imbriqués).

### Palette, persistance et callbacks

palette ajoute une palette de couleurs ("editorial", "tech", "graphite" ou "cool") au thème light, dark ou system. persist enregistre les changements de thème et de palette dans les cookies theme et palette et les restaure après l'hydratation. onThemeChange et onPaletteChange sont appelés après que setTheme et setPalette ont changé la valeur.

useConfig() renvoie aussi mode, resolvedMode et palette, ainsi que les setters setTheme et setPalette : n'importe quel composant peut changer le thème sans remonter l'état. Le rendu serveur, les cookies et le script d'initialisation anti-flash sont décrits dans

### Couleur de marque

primaryColor définit votre couleur de marque sans surcharger --primary-color à la main : passez une couleur CSS ("#4f46e5", rgb(), une couleur nommée) pour les deux modes, ou une paire { light, dark }. Le thème reste explicite : theme vaut toujours "light", "dark" ou "system", donc data-theme, useConfig().mode et ThemeToggle continuent de fonctionner.

Tokens dérivés : chaque token dérivé de primary-color (hover, active, subtle, border, text, anneau de focus, couleur de sélection et, sauf si la palette a la sienne, les tokens d'accent) est recalculé à partir de la couleur de marque avec les formules du thème par défaut. Une couleur seule reçoit une valeur de mode sombre mélangée vers le blanc en OKLab jusqu'à atteindre un contraste de 4.5:1 sur les surfaces sombres (#4f46e5 devient #7b85f2) ; les couleurs déjà conformes sont conservées.

Priorité : primaryColor l'emporte sur la couleur primaire de la palette et du thème ; la palette garde ses autres tokens. Une couleur invalide est ignorée, avec un avertissement en développement.

Imbrication : les providers imbriqués héritent de la couleur de marque, et un primaryColor imbriqué ne s'applique qu'à son sous-arbre (overlays compris) ; null rétablit la couleur primaire du thème.

Rendu serveur : le provider racine rend les valeurs claire et sombre de la marque dans une  indexée sur data-theme, donc le balisage serveur a la couleur de marque avant l'hydratation (pas de flash avec le script d'initialisation du thème). React Native (MinervaProvider), les providers Taro, uni-app et mini-programme WeChat (ConfigProvider / ThemeProvider), Vue (ConfigProvider / ThemeProvider), Angular (, provideMinerva({ primaryColor })) et  acceptent la même valeur, avec la même sémantique.

### ConfigContext

useConfig() lève une erreur s'il n'y a pas de ConfigProvider au-dessus, ce qui révèle tôt les erreurs de configuration. Lisez ConfigContext directement lorsque le provider est facultatif : il renvoie undefined au lieu de lever une erreur.

### Providers imbriqués

Un ConfigProvider placé dans un autre est un provider imbriqué. Utilisez-le pour donner à une zone de la page, un aperçu ou une démo un autre thème, une autre palette ou une autre langue sans affecter le reste de la page.

Héritage : il hérite du thème, de la palette et de la locale du provider le plus proche au-dessus de lui. Seules les props que vous définissez sont remplacées, et useConfig() en dessous renvoie les valeurs fusionnées. Les réglages hérités suivent le parent lorsqu'il change.

Thème local : un thème ou une palette redéfini ne s'applique qu'à son sous-arbre. Le provider rend un élément conteneur en display: contents (la mise en page ne change pas) qui porte data-theme, data-palette et les variables du thème. Sans thème ni palette redéfini, aucun conteneur n'est rendu.

Langue locale : une locale redéfinie ne change que les textes intégrés de son sous-arbre. Un provider qui ne définit que la locale ne touche jamais au thème.

Surcouches : le contenu rendu dans un portail depuis un sous-arbre local (Modal, Drawer, Popover, Select, Menu, Tooltip, Toast…) est placé dans un conteneur sur  qui porte la même portée, si bien que les surcouches reçoivent aussi le thème local. Les API impératives rendues hors de l'arbre React, comme un confirm() autonome, utilisent le thème racine.

État global : un provider imbriqué n'écrit jamais sur , ne lit ni n'écrit les cookies (persist est ignoré) et ne change jamais la langue globale de la bibliothèque React. Le démonter laisse la page exactement telle que le provider racine l'a définie, et démonter le provider racine rétablit ce qu'il avait modifié. setTheme et setPalette d'un provider imbriqué changent sa propre valeur redéfinie, ou la valeur du parent pour un réglage qu'il ne redéfinit pas.

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

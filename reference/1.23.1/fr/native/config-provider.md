# ConfigProvider

Fournit le thème et la langue de la bibliothèque React à votre application, et les expose via useConfig().

Package: minerva-design@1.23.1

Renderer: native

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "88873864837dbcb61b99fdcbc6ca81fca447df74",
  "sourceDigest": "sha256:1ce1c857f10d367f112c6e77d88ae3878570c428c4d39ed7a400c8c99645e9f6",
  "referenceSourceDigest": "sha256:d9f3f7ce5f1caadfe236e584eab7825ceb958644c20320519e6bf9a2d1daf523"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

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

Support: beta

MinervaProvider (alias ConfigProvider): theme light / dark / system via useColorScheme, palette, design preset (touch by default), locale, safe-area insets

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "MinervaProvider"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "theme",
    "source": "packages/native/src/theme/types.ts",
    "kind": "enum",
    "values": [
      "dark",
      "light",
      "system"
    ],
    "typeText": "ThemeMode | undefined",
    "typeRef": "type:293f77323be9bd072cec",
    "default": "system",
    "required": false,
    "description": "Color mode: \"light\", \"dark\", or \"system\" (follows the OS appearance through `useColorScheme`). Same values as the web `ConfigProvider` modes. Uncontrolled after the first render: change it with `setThemeMode` (`useTheme()`) or by passing a new value."
  },
  {
    "name": "palette",
    "source": "packages/native/src/theme/types.ts",
    "kind": "enum",
    "values": [
      "cool",
      "editorial",
      "graphite",
      "tech"
    ],
    "typeText": "\"editorial\" | \"tech\" | \"graphite\" | \"cool\" | null | undefined",
    "typeRef": "type:b7f5e4f1c686e6b76ccf",
    "required": false,
    "description": "Built-in palette (\"editorial\", \"tech\", \"graphite\", \"cool\"); `null` keeps Minerva's default look"
  },
  {
    "name": "primaryColor",
    "source": "packages/native/src/theme/types.ts",
    "kind": "union",
    "typeText": "PrimaryColor | null | undefined",
    "typeRef": "type:f612ad4ccbeed997ce22",
    "required": false,
    "description": "Brand color: a CSS color (`\"#4f46e5\"`, `rgb()`...) for both modes, or a `{ light, dark }` pair. A single color gets a lighter dark-mode value with enough contrast on dark surfaces (`derivePrimaryDark`). Every token derived from `primary-color` (hover, active, subtle, border, text, focus ring, selection...) is recomputed from it. Wins over the palette's primary color; `overrides` still win over it. Unset: the parent provider's; `null`: the theme / palette's own. Invalid colors are ignored (with a development warning)."
  },
  {
    "name": "preset",
    "source": "packages/native/src/theme/types.ts",
    "kind": "enum",
    "values": [
      "compact",
      "editorial",
      "minerva",
      "touch"
    ],
    "typeText": "\"editorial\" | \"minerva\" | \"compact\" | \"touch\" | undefined",
    "typeRef": "type:1c1ec4963e4ae7a8649f",
    "default": "touch",
    "required": false,
    "description": "Design preset: \"minerva\" (default look), \"editorial\", \"compact\" or \"touch\" (consumer mobile apps: comfortable density, 44pt touch targets, large radius)"
  },
  {
    "name": "density",
    "source": "packages/native/src/theme/types.ts",
    "kind": "enum",
    "values": [
      "comfortable",
      "compact",
      "standard"
    ],
    "typeText": "\"compact\" | \"standard\" | \"comfortable\" | undefined",
    "typeRef": "type:5ea3bae44292e2cd25dd",
    "required": false,
    "description": "Spacing density of controls and rows"
  },
  {
    "name": "radius",
    "source": "packages/native/src/theme/types.ts",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "none",
      "small"
    ],
    "typeText": "\"none\" | \"small\" | \"medium\" | \"large\" | undefined",
    "typeRef": "type:1158e24eb483a4cd6fbe",
    "required": false,
    "description": "Corner radius scale"
  },
  {
    "name": "shadow",
    "source": "packages/native/src/theme/types.ts",
    "kind": "enum",
    "values": [
      "none",
      "standard",
      "subtle"
    ],
    "typeText": "\"standard\" | \"none\" | \"subtle\" | undefined",
    "typeRef": "type:47bcd12f79e654091e49",
    "required": false,
    "description": "Elevation shadow scale"
  },
  {
    "name": "fontScale",
    "source": "packages/native/src/theme/types.ts",
    "kind": "enum",
    "values": [
      "large",
      "small",
      "standard"
    ],
    "typeText": "\"standard\" | \"small\" | \"large\" | undefined",
    "typeRef": "type:86445c94907554063d7f",
    "required": false,
    "description": "Type scale"
  },
  {
    "name": "overrides",
    "source": "packages/native/src/theme/types.ts",
    "kind": "union",
    "typeText": "Readonly<Record<string, TokenValue | undefined>> | Partial<ComponentTheme> | undefined",
    "typeRef": "type:f989e4e5899a9ce2f235",
    "required": false,
    "description": "Token overrides (names without `--`, e.g. `{ \"primary-color\": \"#e11d48\" }`), applied over the mode / palette / design; may reference other tokens (`var(--x)`) and use `color-mix()`"
  },
  {
    "name": "locale",
    "source": "packages/native/src/theme/types.ts",
    "kind": "object",
    "typeText": "NativeLocale | undefined",
    "typeRef": "type:149d41d21bc4ddc91623",
    "required": false,
    "description": "Language and extra messages of the built-in texts"
  },
  {
    "name": "insets",
    "source": "packages/native/src/theme/types.ts",
    "kind": "object",
    "typeText": "Partial<EdgeInsets> | undefined",
    "typeRef": "type:d4cbbc6e4d016c5d57de",
    "required": false,
    "description": "Safe-area insets used by toasts, popups, action sheets and the nav / tab bars. Pass `useSafeAreaInsets()` of `react-native-safe-area-context`"
  },
  {
    "name": "fonts",
    "source": "packages/native/src/theme/types.ts",
    "kind": "object",
    "typeText": "NativeFonts | undefined",
    "typeRef": "type:4f09c00c9a5dff981939",
    "required": false,
    "description": "Font families loaded by the app"
  },
  {
    "name": "reducedMotion",
    "source": "packages/native/src/theme/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Instant transitions. Follows the OS \"Reduce motion\" setting when unset"
  }
]
```

### events

```json
[
  {
    "name": "onThemeChange",
    "source": "packages/native/src/theme/types.ts",
    "kind": "function",
    "typeText": "((theme: ThemeMode) => void) | undefined",
    "typeRef": "type:86dba1b7bbdbcf24a818",
    "parameters": [
      {
        "name": "theme",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ThemeMode",
        "typeRef": "type:49e6b37018cf95b597ae"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the color mode changes (`setThemeMode`, ThemeToggle)"
  },
  {
    "name": "onPaletteChange",
    "source": "packages/native/src/theme/types.ts",
    "kind": "function",
    "typeText": "((palette: \"editorial\" | \"tech\" | \"graphite\" | \"cool\" | null) => void) | undefined",
    "typeRef": "type:11af47bab4686310385a",
    "parameters": [
      {
        "name": "palette",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "\"editorial\" | \"tech\" | \"graphite\" | \"cool\" | null",
        "typeRef": "type:918077d2a22b5f20e063"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the palette changes (`setPalette`)"
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
    "prop": "theme",
    "event": "onThemeChange",
    "syntax": "theme={theme} onThemeChange={handler}"
  },
  {
    "prop": "palette",
    "event": "onPaletteChange",
    "syntax": "palette={palette} onPaletteChange={handler}"
  }
]
```

## API

```json
{
  "native:MinervaProviderProps": {
    "source": "native/src/theme/types.ts",
    "description": "Props of `MinervaProvider` (alias `ConfigProvider`)",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "theme",
        "type": "ThemeMode",
        "required": false,
        "default": "\"system\"",
        "description": "Color mode: \"light\", \"dark\", or \"system\" (follows the OS appearance through `useColorScheme`). Same values as the web `ConfigProvider` modes. Uncontrolled after the first render: change it with `setThemeMode` (`useTheme()`) or by passing a new value."
      },
      {
        "name": "palette",
        "type": "Palette | null",
        "required": false,
        "default": "the preset's palette (`null` for \"minerva\" / \"touch\")",
        "description": "Built-in palette (\"editorial\", \"tech\", \"graphite\", \"cool\"); `null` keeps Minerva's default look"
      },
      {
        "name": "primaryColor",
        "type": "PrimaryColor | null",
        "required": false,
        "default": "undefined",
        "description": "Brand color: a CSS color (`\"#4f46e5\"`, `rgb()`...) for both modes, or a `{ light, dark }` pair. A single color gets a lighter dark-mode value with enough contrast on dark surfaces (`derivePrimaryDark`). Every token derived from `primary-color` (hover, active, subtle, border, text, focus ring, selection...) is recomputed from it. Wins over the palette's primary color; `overrides` still win over it. Unset: the parent provider's; `null`: the theme / palette's own. Invalid colors are ignored (with a development warning)."
      },
      {
        "name": "preset",
        "type": "DesignPreset",
        "required": false,
        "default": "\"touch\"",
        "description": "Design preset: \"minerva\" (default look), \"editorial\", \"compact\" or \"touch\" (consumer mobile apps: comfortable density, 44pt touch targets, large radius)"
      },
      {
        "name": "density",
        "type": "Density",
        "required": false,
        "default": "the preset's",
        "description": "Spacing density of controls and rows"
      },
      {
        "name": "radius",
        "type": "RadiusScale",
        "required": false,
        "default": "the preset's",
        "description": "Corner radius scale"
      },
      {
        "name": "shadow",
        "type": "ShadowScale",
        "required": false,
        "default": "the preset's",
        "description": "Elevation shadow scale"
      },
      {
        "name": "fontScale",
        "type": "FontScale",
        "required": false,
        "default": "the preset's",
        "description": "Type scale"
      },
      {
        "name": "overrides",
        "type": "Readonly<Record<string, TokenValue | undefined>> | Partial<ComponentTheme>",
        "required": false,
        "description": "Token overrides (names without `--`, e.g. `{ \"primary-color\": \"#e11d48\" }`), applied over the mode / palette / design; may reference other tokens (`var(--x)`) and use `color-mix()`"
      },
      {
        "name": "locale",
        "type": "NativeLocale",
        "required": false,
        "default": "{ language: \"en\" }",
        "description": "Language and extra messages of the built-in texts"
      },
      {
        "name": "insets",
        "type": "Partial<EdgeInsets>",
        "required": false,
        "default": "{ top: StatusBar height on Android, else 0, right: 0, bottom: 0, left: 0 }",
        "description": "Safe-area insets used by toasts, popups, action sheets and the nav / tab bars. Pass `useSafeAreaInsets()` of `react-native-safe-area-context`"
      },
      {
        "name": "fonts",
        "type": "NativeFonts",
        "required": false,
        "default": "the platform fonts",
        "description": "Font families loaded by the app"
      },
      {
        "name": "reducedMotion",
        "type": "boolean",
        "required": false,
        "default": "the OS setting",
        "description": "Instant transitions. Follows the OS \"Reduce motion\" setting when unset"
      },
      {
        "name": "onThemeChange",
        "type": "(theme: ThemeMode) => void",
        "required": false,
        "description": "Called when the color mode changes (`setThemeMode`, ThemeToggle)"
      },
      {
        "name": "onPaletteChange",
        "type": "(palette: Palette | null) => void",
        "required": false,
        "description": "Called when the palette changes (`setPalette`)"
      },
      {
        "name": "children",
        "type": "ReactNode",
        "required": false,
        "description": "Application content"
      }
    ]
  },
  "native:MinervaTheme": {
    "source": "native/src/theme/types.ts",
    "description": "Value of `useTheme()`",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "tokens",
        "type": "ResolvedTokens",
        "required": true,
        "description": "Every design token as a concrete value (`resolveTokens` output)"
      },
      {
        "name": "colors",
        "type": "ResolvedTokens[\"colors\"]",
        "required": true,
        "description": "Shortcut for `tokens.colors`"
      },
      {
        "name": "themeMode",
        "type": "ThemeMode",
        "required": true,
        "description": "Mode chosen (\"system\" follows the OS)"
      },
      {
        "name": "mode",
        "type": "ResolvedThemeMode",
        "required": true,
        "description": "Mode applied"
      },
      {
        "name": "palette",
        "type": "Palette | null",
        "required": true,
        "description": "Active palette (`null`: default look)"
      },
      {
        "name": "design",
        "type": "ResolvedDesign",
        "required": true,
        "description": "Applied design axes and their preset"
      },
      {
        "name": "reducedMotion",
        "type": "boolean",
        "required": true,
        "description": "Instant transitions"
      },
      {
        "name": "fonts",
        "type": "NativeFonts",
        "required": true,
        "description": "Font families of the app"
      },
      {
        "name": "setThemeMode",
        "type": "(mode: ThemeMode) => void",
        "required": true,
        "description": "Changes the color mode"
      },
      {
        "name": "setPalette",
        "type": "(palette: Palette | null) => void",
        "required": true,
        "description": "Changes the palette"
      },
      {
        "name": "setPreset",
        "type": "(preset: DesignPreset) => void",
        "required": true,
        "description": "Changes the design preset (resets the axes to the preset's)"
      }
    ]
  },
  "native:MinervaI18n": {
    "source": "native/src/theme/types.ts",
    "description": "Value of `useI18n()`",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "t",
        "type": "TranslateFunction",
        "required": true,
        "description": "Translates a message key (`modal.close`, `pagination.next`...)"
      },
      {
        "name": "language",
        "type": "SupportedLanguage",
        "required": true
      }
    ]
  },
  "native:NativeLocale": {
    "source": "native/src/theme/types.ts",
    "description": "Locale settings of the built-in texts",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "language",
        "type": "SupportedLanguage",
        "required": false,
        "default": "\"en\"",
        "description": "Language of the built-in texts (close / cancel labels, pagination, validation messages...)"
      },
      {
        "name": "messages",
        "type": "Messages",
        "required": false,
        "description": "Extra / overriding messages, merged over the built-in ones"
      }
    ]
  },
  "native:NativeFonts": {
    "source": "native/src/theme/types.ts",
    "description": "Font families loaded by the app (e.g. with `expo-font`)",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "sans",
        "type": "string",
        "required": false,
        "default": "the platform font",
        "description": "Body text (`fontFamily` of every text)"
      },
      {
        "name": "mono",
        "type": "string",
        "required": false,
        "default": "the platform monospace font",
        "description": "Code and tabular numbers"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: switching

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/config-provider/native/switching.tsx

```tsx
import { useState } from "react";
import { Text, View } from "react-native";
import { Button, MinervaProvider, useTheme } from "minerva-design/native";

const THEMES = ["light", "dark"] as const;
const PALETTES = [null, "tech", "editorial", "cool"] as const;

function Content() {
  const { colors, mode, palette } = useTheme();
  return (
    <View
      style={{
        gap: 8,
        padding: 16,
        borderRadius: 16,
        backgroundColor: colors["background-color"],
      }}
    >
      <Text style={{ color: colors["text-color"], fontSize: 17 }}>
        Weekend in Lisbon
      </Text>
      <Text style={{ color: colors["text-secondary-color"] }}>
        2 nights · {mode} mode · palette {palette ?? "default"}
      </Text>
      <Button fullWidth>Reserve from $240</Button>
    </View>
  );
}

export default function Switching() {
  const [theme, setTheme] = useState<(typeof THEMES)[number]>("light");
  const [palette, setPalette] = useState<(typeof PALETTES)[number]>(null);
  return (
    <View style={{ gap: 12 }}>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
        {THEMES.map((value) => (
          <Button
            key={value}
            size="small"
            variant={theme === value ? "solid" : "outline"}
            onPress={() => setTheme(value)}
          >
            {value}
          </Button>
        ))}
        {PALETTES.map((value) => (
          <Button
            key={value ?? "default"}
            size="small"
            color="neutral"
            variant={palette === value ? "solid" : "outline"}
            onPress={() => setPalette(value)}
          >
            {value ?? "default"}
          </Button>
        ))}
      </View>
      <MinervaProvider theme={theme} palette={palette}>
        <Content />
      </MinervaProvider>
    </View>
  );
}

```

## Example: use-theme

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/config-provider/native/use-theme.tsx

```tsx
import { Text, View } from "react-native";
import { useTheme, useTokens } from "minerva-design/native";

const STATS = [
  { label: "Orders", value: "12", color: "primary-color" },
  { label: "Coupons", value: "3", color: "success-color" },
  { label: "Unpaid", value: "1", color: "danger-color" },
];

export default function UseTheme() {
  const { colors, mode } = useTheme();
  const { space, radius, fontSize, shadows } = useTokens();
  return (
    <View
      style={{
        gap: space["3"],
        padding: space["4"],
        borderRadius: radius.xl,
        borderWidth: 1,
        borderColor: colors["border-color"],
        backgroundColor: colors["surface-color"],
        shadowColor: shadows.md?.color,
        shadowOpacity: 0.12,
        shadowRadius: 8,
      }}
    >
      <Text style={{ color: colors["text-color"], fontSize: fontSize.lg }}>
        My account
      </Text>
      <View style={{ flexDirection: "row", gap: space["2"] }}>
        {STATS.map((stat) => (
          <View
            key={stat.label}
            style={{
              flex: 1,
              alignItems: "center",
              paddingVertical: space["3"],
              borderRadius: radius.md,
              backgroundColor: colors["surface-muted-color"],
            }}
          >
            <Text style={{ color: colors[stat.color], fontSize: fontSize.xl }}>
              {stat.value}
            </Text>
            <Text style={{ color: colors["text-muted-color"] }}>
              {stat.label}
            </Text>
          </View>
        ))}
      </View>
      <Text
        style={{ color: colors["text-secondary-color"], fontSize: fontSize.sm }}
      >
        {mode} mode · radius.xl {radius.xl}px · space 4 = {space["4"]}px
      </Text>
    </View>
  );
}

```

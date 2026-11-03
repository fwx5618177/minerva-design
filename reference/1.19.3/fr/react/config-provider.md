# ConfigProvider

Fournit le thème et la langue de la bibliothèque React à votre application, et les expose via useConfig().

Package: minerva-design@1.19.3

Renderer: react

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "19932861fda2d088219d708a8ca132bea760a32b",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:936b6b17ca037f9538a8c5d8447637951e27e8db3596add5e078bc5a51ef03ae"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

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
  "specifier": "minerva-design",
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
    "source": "packages/react/src/contexts/types.ts",
    "kind": "union",
    "typeText": "ConfigProviderThemeProps | undefined",
    "typeRef": "type:7e53e5511cbf3537893a",
    "required": false,
    "description": "Theme to apply: \"auto\" (follows `prefers-color-scheme`), a built-in theme name, a theme object, or a `{ light, dark }` pair. The root provider applies it to `<html>`; a nested provider inherits its parent's theme unless set, and applies an override to its own subtree only."
  },
  {
    "name": "palette",
    "source": "packages/react/src/contexts/types.ts",
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
    "description": "Palette applied with the light / dark / system themes (\"editorial\", \"tech\", \"graphite\", \"cool\"); `null` keeps Minerva's default look. The root provider sets `data-palette` on `<html>`; a nested provider inherits its parent's palette unless set, and scopes an override to its subtree. Palette tokens come from `style.css`."
  },
  {
    "name": "primaryColor",
    "source": "packages/react/src/contexts/types.ts",
    "kind": "union",
    "typeText": "PrimaryColor | null | undefined",
    "typeRef": "type:f612ad4ccbeed997ce22",
    "required": false,
    "description": "Brand color: sets `--primary-color` and recomputes every token derived from it (hover, active, subtle, border and text roles, selected, focus ring, and the accent when the palette has no accent of its own) with the default theme's formulas, without changing the light / dark mode. A single color applies to light mode and gets a dark-mode value lightened for contrast on dark surfaces (WCAG 4.5:1); pass `{ light, dark }` to choose both. Wins over the primary color of the theme and of the palette. Accepts hex, `rgb()` / `rgba()` and the basic named colors; an invalid value is ignored (development warning). A nested provider inherits its parent's brand color unless set (`null` restores the theme's own), and scopes an override to its subtree."
  },
  {
    "name": "persist",
    "source": "packages/react/src/contexts/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Persist theme and palette changes in the `theme` / `palette` cookies and restore them after hydration (pair with `THEME_INIT_SCRIPT` for SSR). Root provider only: ignored by nested providers."
  },
  {
    "name": "locale",
    "source": "packages/react/src/contexts/types.ts",
    "kind": "object",
    "typeText": "Locale | undefined",
    "typeRef": "type:faa2d1cac8abe6cb7ce4",
    "required": false,
    "description": "Language of the React library's built-in texts. The root provider sets it globally; a nested provider inherits its parent's language unless set, and applies an override to its subtree only."
  },
  {
    "name": "preset",
    "source": "packages/react/src/contexts/types.ts",
    "kind": "enum",
    "values": [
      "compact",
      "editorial",
      "minerva",
      "touch"
    ],
    "typeText": "\"editorial\" | \"compact\" | \"minerva\" | \"touch\" | undefined",
    "typeRef": "type:57c71898ce4900e4be17",
    "required": false,
    "description": "Design preset: a named combination of the design axes below and a default palette. \"minerva\" (default look), \"editorial\" (restrained, reading-oriented: editorial palette, comfortable density, small radius, subtle shadows, large type), \"compact\" (dense, data-heavy screens) or \"touch\" (consumer mobile apps: comfortable density, 44px touch targets, large radius). Explicit axes and `palette` win over the preset. A nested provider inherits its parent's design unless set; a nested preset resets every axis it does not set."
  },
  {
    "name": "density",
    "source": "packages/react/src/contexts/types.ts",
    "kind": "enum",
    "values": [
      "comfortable",
      "compact",
      "standard"
    ],
    "typeText": "\"compact\" | \"comfortable\" | \"standard\" | undefined",
    "typeRef": "type:6c4c4181cf4b702c1892",
    "required": false,
    "description": "Spacing density of controls (heights, paddings) and rows (menus, lists, tables): `data-density`"
  },
  {
    "name": "radius",
    "source": "packages/react/src/contexts/types.ts",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "none",
      "small"
    ],
    "typeText": "\"small\" | \"medium\" | \"large\" | \"none\" | undefined",
    "typeRef": "type:81d0cef3201cfa049ee4",
    "required": false,
    "description": "Corner radius scale (`--radius-sm` ... `--radius-2xl`): `data-radius`"
  },
  {
    "name": "shadow",
    "source": "packages/react/src/contexts/types.ts",
    "kind": "enum",
    "values": [
      "none",
      "standard",
      "subtle"
    ],
    "typeText": "\"subtle\" | \"none\" | \"standard\" | undefined",
    "typeRef": "type:24a43819632837de5021",
    "required": false,
    "description": "Elevation shadows (`--shadow-sm` ... `--shadow-xl`): `data-shadow`. \"standard\" keeps the theme / palette shadows"
  },
  {
    "name": "fontScale",
    "source": "packages/react/src/contexts/types.ts",
    "kind": "enum",
    "values": [
      "large",
      "small",
      "standard"
    ],
    "typeText": "\"small\" | \"large\" | \"standard\" | undefined",
    "typeRef": "type:4fdefa306ab8f9ff4574",
    "required": false,
    "description": "Type scale (`--font-size-*`, line heights): `data-font-scale`. \"large\" is reading-oriented"
  }
]
```

### events

```json
[
  {
    "name": "onThemeChange",
    "source": "packages/react/src/contexts/types.ts",
    "kind": "function",
    "typeText": "((theme: ConfigProviderThemeProps) => void) | undefined",
    "typeRef": "type:2f3ee82ad197e9845fea",
    "parameters": [
      {
        "name": "theme",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ConfigProviderThemeProps",
        "typeRef": "type:73ae73d9b67b72d0bab6"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called after `setTheme` changes the theme"
  },
  {
    "name": "onPaletteChange",
    "source": "packages/react/src/contexts/types.ts",
    "kind": "function",
    "typeText": "((palette: \"editorial\" | \"tech\" | \"graphite\" | \"cool\" | null) => void) | undefined",
    "typeRef": "type:413c6a7bb82a25e28be4",
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
    "description": "Called after `setPalette` changes the palette"
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
  "ConfigContextProviderProps": {
    "source": "react/src/contexts/types.ts",
    "description": "Props of `ConfigProvider`",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "theme",
        "type": "ConfigProviderThemeProps",
        "required": false,
        "default": "\"auto\" (nested: the parent's theme)",
        "description": "Theme to apply: \"auto\" (follows `prefers-color-scheme`), a built-in theme name, a theme object, or a `{ light, dark }` pair. The root provider applies it to `<html>`; a nested provider inherits its parent's theme unless set, and applies an override to its own subtree only."
      },
      {
        "name": "palette",
        "type": "Palette | null",
        "required": false,
        "default": "null (nested: the parent's palette)",
        "description": "Palette applied with the light / dark / system themes (\"editorial\", \"tech\", \"graphite\", \"cool\"); `null` keeps Minerva's default look. The root provider sets `data-palette` on `<html>`; a nested provider inherits its parent's palette unless set, and scopes an override to its subtree. Palette tokens come from `style.css`."
      },
      {
        "name": "primaryColor",
        "type": "PrimaryColor | null",
        "required": false,
        "default": "null (nested: the parent's brand color)",
        "description": "Brand color: sets `--primary-color` and recomputes every token derived from it (hover, active, subtle, border and text roles, selected, focus ring, and the accent when the palette has no accent of its own) with the default theme's formulas, without changing the light / dark mode. A single color applies to light mode and gets a dark-mode value lightened for contrast on dark surfaces (WCAG 4.5:1); pass `{ light, dark }` to choose both. Wins over the primary color of the theme and of the palette. Accepts hex, `rgb()` / `rgba()` and the basic named colors; an invalid value is ignored (development warning). A nested provider inherits its parent's brand color unless set (`null` restores the theme's own), and scopes an override to its subtree."
      },
      {
        "name": "persist",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Persist theme and palette changes in the `theme` / `palette` cookies and restore them after hydration (pair with `THEME_INIT_SCRIPT` for SSR). Root provider only: ignored by nested providers."
      },
      {
        "name": "onThemeChange",
        "type": "(theme: ConfigProviderThemeProps) => void",
        "required": false,
        "description": "Called after `setTheme` changes the theme"
      },
      {
        "name": "onPaletteChange",
        "type": "(palette: Palette | null) => void",
        "required": false,
        "description": "Called after `setPalette` changes the palette"
      },
      {
        "name": "locale",
        "type": "Locale",
        "required": false,
        "default": "{ language: \"en\" } (nested: the parent's locale)",
        "description": "Language of the React library's built-in texts. The root provider sets it globally; a nested provider inherits its parent's language unless set, and applies an override to its subtree only."
      },
      {
        "name": "preset",
        "type": "DesignPreset",
        "required": false,
        "default": "\"minerva\" (nested: the parent's design)",
        "description": "Design preset: a named combination of the design axes below and a default palette. \"minerva\" (default look), \"editorial\" (restrained, reading-oriented: editorial palette, comfortable density, small radius, subtle shadows, large type), \"compact\" (dense, data-heavy screens) or \"touch\" (consumer mobile apps: comfortable density, 44px touch targets, large radius). Explicit axes and `palette` win over the preset. A nested provider inherits its parent's design unless set; a nested preset resets every axis it does not set."
      },
      {
        "name": "density",
        "type": "Density",
        "required": false,
        "default": "\"standard\" (or the preset's)",
        "description": "Spacing density of controls (heights, paddings) and rows (menus, lists, tables): `data-density`"
      },
      {
        "name": "radius",
        "type": "RadiusScale",
        "required": false,
        "default": "\"medium\" (or the preset's)",
        "description": "Corner radius scale (`--radius-sm` ... `--radius-2xl`): `data-radius`"
      },
      {
        "name": "shadow",
        "type": "ShadowScale",
        "required": false,
        "default": "\"standard\" (or the preset's)",
        "description": "Elevation shadows (`--shadow-sm` ... `--shadow-xl`): `data-shadow`. \"standard\" keeps the theme / palette shadows"
      },
      {
        "name": "fontScale",
        "type": "FontScale",
        "required": false,
        "default": "\"standard\" (or the preset's)",
        "description": "Type scale (`--font-size-*`, line heights): `data-font-scale`. \"large\" is reading-oriented"
      },
      {
        "name": "children",
        "type": "ReactNode",
        "required": true,
        "description": "Application content"
      }
    ]
  },
  "ConfigContextProps": {
    "source": "react/src/contexts/types.ts",
    "description": "Value of `ConfigContext`, returned by `useConfig()`",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "theme",
        "type": "ConfigProviderThemeProps",
        "required": false,
        "description": "Theme as configured (may be \"auto\" or a light/dark pair)"
      },
      {
        "name": "resolvedTheme",
        "type": "ThemeName | ComponentTheme",
        "required": false,
        "description": "Theme that is currently applied after resolving \"auto\" / light-dark pairs"
      },
      {
        "name": "locale",
        "type": "Locale",
        "required": false,
        "description": "Current locale of the React library's built-in texts"
      },
      {
        "name": "mode",
        "type": "ThemeMode",
        "required": false,
        "description": "Color mode of the theme: \"light\" / \"dark\" for those themes, \"system\" for \"auto\" / \"system\" / `{ light, dark }` pairs, `undefined` for other themes"
      },
      {
        "name": "resolvedMode",
        "type": "ResolvedThemeMode",
        "required": false,
        "description": "Applied color mode (`data-theme` on `<html>`, or on the scope element of a nested provider), when it can be determined"
      },
      {
        "name": "palette",
        "type": "Palette | null",
        "required": false,
        "description": "Active palette (`data-palette` on `<html>`, or on the scope element of a nested provider), `null` for Minerva's default look"
      },
      {
        "name": "primaryColor",
        "type": "PrimaryColorPair | null",
        "required": false,
        "description": "Brand color in effect (normalized light / dark pair, see `ConfigProvider`'s `primaryColor`), `null` when the theme / palette primary color applies"
      },
      {
        "name": "design",
        "type": "ResolvedDesign",
        "required": false,
        "description": "Applied design axes (`data-density` / `data-radius` / `data-shadow` / `data-font-scale`) and the preset they come from"
      },
      {
        "name": "setTheme",
        "type": "(theme: ConfigProviderThemeProps) => void",
        "required": false,
        "description": "Change the theme (persisted to the `theme` cookie when `persist` is on)"
      },
      {
        "name": "setPalette",
        "type": "(palette: Palette | null) => void",
        "required": false,
        "description": "Change the palette (persisted to the `palette` cookie when `persist` is on)"
      }
    ]
  },
  "Locale": {
    "source": "react/src/contexts/types.ts",
    "description": "Locale settings of the React library's built-in texts",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "language",
        "type": "SupportedLanguage",
        "required": false,
        "default": "\"en\"",
        "description": "Language of the React library's built-in texts"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Couleur de marque

Des ConfigProvider imbriqués avec primaryColor dans le mode actuel du site : l'indigo en couleur seule (valeur sombre dérivée), en paire { light, dark }, et un bleu-vert. Changez le thème du site pour comparer les valeurs sombres dérivées.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/config-provider/demos/brand-color.tsx

```tsx
import { Button, ConfigProvider, Switch, useConfig } from "minerva-design";

// A brand color without overriding --primary-color by hand: each card is a
// nested <ConfigProvider primaryColor> in the site's current light / dark mode.
// A single color gets a lighter dark-mode value (contrast on dark surfaces);
// a { light, dark } pair sets both. Hover, active, subtle, border, text and
// focus ring colors are all derived from it.
const brands = [
  { label: 'primaryColor="#4f46e5"', primaryColor: "#4f46e5" },
  {
    label: 'primaryColor={{ light: "#4f46e5", dark: "#818cf8" }}',
    primaryColor: { light: "#4f46e5", dark: "#818cf8" },
  },
  { label: 'primaryColor="#0d9488"', primaryColor: "#0d9488" },
];

function Swatch() {
  const { resolvedMode = "light", primaryColor } = useConfig();
  return (
    <code style={{ color: "var(--text-muted-color)", fontSize: 12 }}>
      {resolvedMode}: {primaryColor?.[resolvedMode]}
    </code>
  );
}

export default function BrandColorDemo() {
  const { resolvedMode = "light" } = useConfig();

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: 12,
      }}
    >
      {brands.map(({ label, primaryColor }) => (
        <ConfigProvider
          key={label}
          theme={resolvedMode}
          primaryColor={primaryColor}
        >
          <div
            style={{
              display: "grid",
              gap: 10,
              padding: 14,
              borderRadius: 10,
              border: "1px solid var(--border-color)",
              background: "var(--background-color)",
              color: "var(--text-color)",
              fontFamily: "var(--font-family-sans)",
            }}
          >
            <code style={{ fontSize: 12, overflowWrap: "anywhere" }}>
              {label}
            </code>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              <Button size="small" color="primary">
                Primary
              </Button>
              <Button size="small" color="primary" variant="outline">
                Outline
              </Button>
              <Switch defaultChecked aria-label="Brand switch" />
            </div>
            <Swatch />
          </div>
        </ConfigProvider>
      ))}
    </div>
  );
}

```

## Example: Thème personnalisé

Un thème personnalisé construit à partir de themes.light et passé à un ConfigProvider imbriqué : seul ce conteneur change de thème, y compris le menu du Select rendu dans un portail.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/config-provider/demos/custom-theme.tsx

```tsx
import {
  Button,
  ConfigProvider,
  HStack,
  Select,
  SelectItem,
  Switch,
  themes,
  type ComponentTheme,
  VStack,
} from "minerva-design";

// A custom theme: start from a built-in one and override tokens.
const sepia: ComponentTheme = {
  ...themes.light,
  "primary-color": "#9a3412",
  "primary-color-hover": "#7c2d12",
  "primary-color-active": "#6c2710",
  "background-color": "#fbf5e9",
  "foreground-color": "#3b2f2a",
  "border-color": "#e0d2b8",
  "text-gray": "#6b5b4e",
  "focus-ring-color": "rgba(154, 52, 18, 0.45)",
};

// A nested ConfigProvider applies its theme to its own subtree only (the
// site's root provider keeps <html>). Portalled content opened from inside,
// like the Select menu below, gets the same theme.
export default function CustomThemeDemo() {
  return (
    <ConfigProvider theme={sepia}>
      <div
        style={{
          padding: 16,
          borderRadius: 8,
          border: "1px solid var(--border-color)",
          background: "var(--surface-color)",
          color: "var(--text-color)",
        }}
      >
        <VStack gap={4} align="start">
          <strong>Sepia theme</strong>
          <span>Only this container uses the custom theme.</span>
          <HStack gap={4} wrap>
            <Button color="primary">Primary</Button>
            <Button color="primary" disabled>
              Disabled
            </Button>
            <Switch label="Reading mode" defaultChecked />
            <Select aria-label="Paper" defaultValue="cream">
              <SelectItem value="cream">Cream</SelectItem>
              <SelectItem value="ivory">Ivory</SelectItem>
              <SelectItem value="kraft">Kraft</SelectItem>
            </Select>
          </HStack>
        </VStack>
      </div>
    </ConfigProvider>
  );
}

```

## Example: Langue

Un ConfigProvider imbriqué qui ne définit que la locale (en, zh, ja ou fr) : les textes intégrés de son sous-arbre changent, tandis que le thème et la palette sont hérités du site et que <html> reste intact.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/config-provider/demos/locale.tsx

```tsx
import { useState } from "react";
import {
  Button,
  ConfigProvider,
  Pagination,
  Tag,
  useConfig,
  useI18n,
  type SupportedLanguage,
} from "minerva-design";

// a key from the React library's built-in translations
const AVATAR_KEY = "avatar.default";
const LANGUAGES: SupportedLanguage[] = ["en", "zh", "ja", "fr"];

function Preview() {
  const { locale, palette } = useConfig();
  const { t } = useI18n();
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 8,
        }}
      >
        locale: <Tag color="primary">{locale?.language}</Tag> {AVATAR_KEY}:{" "}
        <Tag color="info">{t(AVATAR_KEY)}</Tag> palette:{" "}
        <Tag color="success">{palette ?? "default"}</Tag>
      </div>
      <Pagination total={50} defaultCurrent={2} showTotal />
    </div>
  );
}

export default function LocaleDemo() {
  const [language, setLanguage] = useState<SupportedLanguage>("en");

  // A nested provider that only sets `locale`: theme and palette are
  // inherited from the site's provider, <html> is left alone, and the
  // language only applies to this subtree.
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div
        role="group"
        aria-label="Language"
        style={{ display: "flex", gap: 8 }}
      >
        {LANGUAGES.map((lng) => (
          <Button
            key={lng}
            size="small"
            color={lng === language ? "primary" : "neutral"}
            variant={lng === language ? "solid" : "outline"}
            aria-pressed={lng === language}
            onClick={() => setLanguage(lng)}
          >
            {lng}
          </Button>
        ))}
      </div>
      <ConfigProvider locale={{ language }}>
        <Preview />
      </ConfigProvider>
    </div>
  );
}

```

## Example: Palettes

Chaque carte est un ConfigProvider imbriqué avec sa propre palette, dans le mode actuel du site. Le provider racine du site conserve data-palette sur <html>.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/config-provider/demos/palette.tsx

```tsx
import { Button, ConfigProvider, Tag, useConfig } from "minerva-design";
import { PALETTES } from "minerva-design/theme-utils";

// The site's root provider sets data-palette on <html>. Each card below is a
// nested <ConfigProvider palette={name}>: the palette (in the site's current
// light / dark mode) only applies inside the card.
export default function PaletteDemo() {
  const { resolvedMode = "light", palette } = useConfig();

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
        gap: 12,
      }}
    >
      {PALETTES.map((name) => (
        <ConfigProvider key={name} theme={resolvedMode} palette={name}>
          <div
            style={{
              display: "grid",
              gap: 10,
              padding: 14,
              borderRadius: 10,
              border: "1px solid var(--border-color)",
              background: "var(--background-color)",
              color: "var(--text-color)",
              fontFamily: "var(--font-family-sans)",
            }}
          >
            <strong>
              palette=&quot;{name}&quot;{" "}
              {palette === name && <Tag color="success">active</Tag>}
            </strong>
            <Button size="small" color="primary">
              Primary
            </Button>
            <span style={{ color: "var(--text-muted-color)", fontSize: 13 }}>
              data-theme=&quot;{resolvedMode}&quot;
            </span>
          </div>
        </ConfigProvider>
      ))}
    </div>
  );
}

```

## Example: Lire la configuration

useConfig() renvoie le thème configuré, le thème résolu, la palette et la locale du provider le plus proche. Changez le thème, la palette ou la langue du site dans l'en-tête pour voir les valeurs se mettre à jour.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/config-provider/demos/use-config.tsx

```tsx
import { Tag, useConfig } from "minerva-design";

// useConfig() reads the nearest ConfigProvider. This site wraps every page in
// one, so the values below change when you pick another theme, palette or
// language in the header.
export default function UseConfigDemo() {
  const { theme, resolvedTheme, palette, locale } = useConfig();

  const describe = (value: unknown) =>
    typeof value === "string" ? value : "custom theme object";

  return (
    <dl
      style={{
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        gap: "8px 16px",
        margin: 0,
      }}
    >
      <dt>theme</dt>
      <dd style={{ margin: 0 }}>
        <Tag color="primary">{describe(theme)}</Tag>
      </dd>
      <dt>resolvedTheme</dt>
      <dd style={{ margin: 0 }}>
        <Tag color="info">{describe(resolvedTheme)}</Tag>
      </dd>
      <dt>palette</dt>
      <dd style={{ margin: 0 }}>
        <Tag color="warning">{palette ?? "null"}</Tag>
      </dd>
      <dt>locale.language</dt>
      <dd style={{ margin: 0 }}>
        <Tag color="success">{locale?.language ?? "en"}</Tag>
      </dd>
    </dl>
  );
}

```

# ConfigProvider

Fournit le thème et la langue de la bibliothèque React à votre application, et les expose via useConfig().

Package: minerva-design@1.19.3

Renderer: taro

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "19932861fda2d088219d708a8ca132bea760a32b",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:ed8b6b1bf30e9055934099f84afd6b8369eee155b0404de5e8db004c3d91bce6"
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

Support: beta

Native theme token classes plus resolved custom objects/light-dark pairs/github-dark, system subscription, theme/palette storage, nested inheritance, design axes and localized toggles/actions from shared dictionaries. Native touch/view semantics differ from browser DOM semantics. Native devices do not expose document focus, inert, browser portals or File input APIs; H5 capabilities are specified separately. Device-runtime validation is still required. Browser cookies/SSR bootstrap use native storage instead. Provider-scoped dictionaries cover controls/editors, calendar/weekdays, command defaults, page-tab actions, display actions and application navigation; global native confirm outside a provider requires explicit localized labels. Component tests, H5 tests in happy-dom and the official Taro WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/taro",
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
    "source": "packages/taro/src/theme.tsx",
    "kind": "union",
    "typeText": "ConfigProviderTheme | undefined",
    "typeRef": "type:b2d56bdaa4bed3c93033",
    "required": false
  },
  {
    "name": "palette",
    "source": "packages/taro/src/theme.tsx",
    "kind": "enum",
    "values": [
      "cool",
      "editorial",
      "graphite",
      "tech"
    ],
    "typeText": "\"editorial\" | \"tech\" | \"graphite\" | \"cool\" | null | undefined",
    "typeRef": "type:b7f5e4f1c686e6b76ccf",
    "required": false
  },
  {
    "name": "primaryColor",
    "source": "packages/taro/src/theme.tsx",
    "kind": "union",
    "typeText": "PrimaryColor | null | undefined",
    "typeRef": "type:f612ad4ccbeed997ce22",
    "required": false,
    "description": "Brand color: a CSS color for both modes (the dark-mode value is derived for contrast on dark surfaces) or a `{ light, dark }` pair. Recomputes every token derived from `primary-color` and wins over the palette / custom theme's primary color. Unset: the parent provider's; `null`: the theme's own. Invalid colors are ignored with a development warning."
  },
  {
    "name": "locale",
    "source": "packages/taro/src/theme.tsx",
    "kind": "union",
    "typeText": "string | Locale | undefined",
    "typeRef": "type:4bea4c2c61106ce459b7",
    "required": false
  },
  {
    "name": "design",
    "source": "packages/taro/src/theme.tsx",
    "kind": "object",
    "typeText": "DesignOptions | undefined",
    "typeRef": "type:0d1f6356a5ba2ecc4c1b",
    "required": false
  },
  {
    "name": "persist",
    "source": "packages/taro/src/theme.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "id",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-label",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-labelledby",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-describedby",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "preset",
    "source": "packages/core/src/theme/design.ts",
    "kind": "enum",
    "values": [
      "compact",
      "editorial",
      "minerva",
      "touch"
    ],
    "typeText": "\"compact\" | \"editorial\" | \"minerva\" | \"touch\" | undefined",
    "typeRef": "type:e89cc37da1adddd41a88",
    "default": "minerva",
    "required": false,
    "description": "Named combination of the axes below and a default palette: \"minerva\" (default look), \"editorial\" (restrained, reading-oriented), \"compact\" (dense, data-heavy screens) or \"touch\" (consumer mobile apps: comfortable density with 44px touch targets, large radius)"
  },
  {
    "name": "density",
    "source": "packages/core/src/theme/design.ts",
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
    "source": "packages/core/src/theme/design.ts",
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
    "description": "Corner radius scale"
  },
  {
    "name": "shadow",
    "source": "packages/core/src/theme/design.ts",
    "kind": "enum",
    "values": [
      "none",
      "standard",
      "subtle"
    ],
    "typeText": "\"none\" | \"subtle\" | \"standard\" | undefined",
    "typeRef": "type:dfccc67a99cc75bd5e58",
    "required": false,
    "description": "Elevation shadow scale"
  },
  {
    "name": "fontScale",
    "source": "packages/core/src/theme/design.ts",
    "kind": "enum",
    "values": [
      "large",
      "small",
      "standard"
    ],
    "typeText": "\"small\" | \"large\" | \"standard\" | undefined",
    "typeRef": "type:4fdefa306ab8f9ff4574",
    "required": false,
    "description": "Type scale"
  }
]
```

### events

```json
[
  {
    "name": "onThemeChange",
    "source": "packages/taro/src/theme.tsx",
    "kind": "function",
    "typeText": "((theme: ThemeMode) => void) | undefined",
    "typeRef": "type:c6375db4d574c80ea3ef",
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
    "required": false
  },
  {
    "name": "onPaletteChange",
    "source": "packages/taro/src/theme.tsx",
    "kind": "function",
    "typeText": "((palette: \"editorial\" | \"tech\" | \"graphite\" | \"cool\" | null) => void) | undefined",
    "typeRef": "type:1dd3725f028e7f81bd97",
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
    "required": false
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

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

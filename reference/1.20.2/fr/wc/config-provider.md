# ConfigProvider

Fournit le thème et la langue de la bibliothèque React à votre application, et les expose via useConfig().

Package: minerva-design@1.20.2

Renderer: wc

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.2",
  "sourceCommit": "ae023a943266e631be23485d1daf0a21591499a1",
  "sourceDigest": "sha256:c9540edc3908d226375a01cf5e6bfe8ca6a4e20440f736c0dd9b40ae9ff2e645",
  "referenceSourceDigest": "sha256:7bf77141c64cfa04bf3140efe18348e2eef528dbd35f817eea65bdca81f687b1"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.2/types.json) or getType() from minerva-design/contracts.

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
  "specifier": "minerva-design/web-components/config",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "theme",
    "typeText": "\"light\" | \"dark\" | \"system\" | \"github-dark\" | undefined",
    "attribute": "theme",
    "required": false
  },
  {
    "name": "palette",
    "typeText": "Palette | undefined",
    "attribute": "palette",
    "required": false
  },
  {
    "name": "design",
    "typeText": "DesignPreset | undefined",
    "attribute": "design",
    "required": false
  },
  {
    "name": "density",
    "typeText": "Density | undefined",
    "attribute": "density",
    "required": false
  },
  {
    "name": "radius",
    "typeText": "RadiusScale | undefined",
    "attribute": "radius",
    "required": false
  },
  {
    "name": "shadow",
    "typeText": "ShadowScale | undefined",
    "attribute": "shadow",
    "required": false
  },
  {
    "name": "fontScale",
    "typeText": "FontScale | undefined",
    "attribute": "font-scale",
    "required": false
  },
  {
    "name": "primaryColor",
    "typeText": "PrimaryColor | undefined",
    "attribute": "primary-color",
    "required": false
  },
  {
    "name": "locale",
    "typeText": "SupportedLanguage | undefined",
    "attribute": "locale",
    "required": false
  },
  {
    "name": "root",
    "typeText": "boolean",
    "attribute": "root",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "minerva-theme-change",
    "typeText": "CustomEvent<{ mode: \"light\" | \"dark\"; }>",
    "detailType": {
      "typeText": "{ mode: \"light\" | \"dark\"; }",
      "typeRef": "type:9bfa840eb7f37b20f5e9"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": false,
    "description": "The resolved light / dark mode changed (`detail: { mode }`), e.g. the system preference with `theme=\"system\"`"
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "description": "Scoped content"
  }
]
```

## API

```json
{
  "wc:minerva-config": {
    "kind": "element",
    "source": "web-components/src/components/config/config.ts",
    "className": "MinervaConfig",
    "summary": "Theme / palette / design / locale scope (ConfigProvider for Web Components).",
    "description": "Theme, palette, design and language scope for the Minerva elements inside it (and any other content): the Web Component counterpart of the React library's `ConfigProvider`. It renders as `display: contents` and writes the same attributes as a nested `ConfigProvider` (`data-theme`, `data-palette`, `data-density` / `data-radius` / `data-shadow` / `data-font-scale`, `data-minerva-theme-scope`, `lang`), so the design tokens of `minerva-design/tokens.css` (also published as `minerva-design/tokens.css`) resolve for its subtree. Scopes nest: the closest one wins. Overlays opened inside stay in the scope (they use the top layer without being moved). With `root`, the attributes go on `<html>` instead (whole page). Without `<minerva-config>`, the same attributes set on any ancestor (e.g. `<html data-theme=\"dark\" lang=\"fr\">`) work too.",
    "properties": [
      {
        "name": "theme",
        "attribute": "theme",
        "type": "\"light\" | \"dark\" | \"system\" | \"github-dark\" | undefined",
        "description": "Light, dark, follow the system, or the github-dark theme"
      },
      {
        "name": "palette",
        "attribute": "palette",
        "type": "Palette | undefined",
        "description": "Color palette (light and dark variants)"
      },
      {
        "name": "design",
        "attribute": "design",
        "type": "DesignPreset | undefined",
        "description": "Design preset (its palette applies unless `palette` is set)"
      },
      {
        "name": "density",
        "attribute": "density",
        "type": "Density | undefined",
        "description": "Spacing density (overrides the preset)"
      },
      {
        "name": "radius",
        "attribute": "radius",
        "type": "RadiusScale | undefined",
        "description": "Corner radius scale (overrides the preset)"
      },
      {
        "name": "shadow",
        "attribute": "shadow",
        "type": "ShadowScale | undefined",
        "description": "Elevation shadow scale (overrides the preset)"
      },
      {
        "name": "fontScale",
        "attribute": "font-scale",
        "type": "FontScale | undefined",
        "description": "Type scale (overrides the preset)"
      },
      {
        "name": "primaryColor",
        "attribute": "primary-color",
        "type": "PrimaryColor | undefined",
        "description": "Brand color: a CSS color (`primary-color=\"#4f46e5\"`) whose dark-mode value is derived for contrast on dark surfaces, or (as a property) a `{ light, dark }` pair. Recomputes every token derived from `primary-color` and wins over the palette's. The value of the applied mode is written inline: without `theme`, the mode of the closest ancestor with `data-theme` when applied (light when the element scopes a palette, design or scale, whose tokens render light). A brand color alone does not scope the subtree."
      },
      {
        "name": "locale",
        "attribute": "locale",
        "type": "SupportedLanguage | undefined",
        "description": "Language of the built-in texts of the elements inside"
      },
      {
        "name": "root",
        "attribute": "root",
        "type": "boolean",
        "default": "false",
        "description": "Apply to the whole document (`<html>`) instead of this subtree"
      },
      {
        "name": "resolvedMode",
        "type": "\"light\" | \"dark\" | null",
        "readonly": true,
        "description": "Light / dark mode currently applied (`null` when no theme is set)."
      }
    ],
    "methods": [],
    "events": [
      {
        "name": "minerva-theme-change",
        "description": "The resolved light / dark mode changed (`detail: { mode }`), e.g. the system preference with `theme=\"system\"`"
      }
    ],
    "slots": [
      {
        "name": "",
        "description": "Scoped content"
      }
    ],
    "parts": [],
    "cssProperties": []
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Utilisation de base

<minerva-config> s'affiche en display: contents et délimite le thème de tout son contenu : ici une portée claire et une portée sombre côte à côte.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/config-provider/wc/basic.html

```html
<div
  style="
    display: grid;
    gap: 12px;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  "
>
  <minerva-config theme="light">
    <minerva-card variant="outline" padding="medium">
      <minerva-card-header>
        <minerva-card-title>Light scope</minerva-card-title>
      </minerva-card-header>
      <minerva-card-content>
        <minerva-button>Primary</minerva-button>
      </minerva-card-content>
    </minerva-card>
  </minerva-config>
  <minerva-config theme="dark">
    <minerva-card variant="outline" padding="medium">
      <minerva-card-header>
        <minerva-card-title>Dark scope</minerva-card-title>
      </minerva-card-header>
      <minerva-card-content>
        <minerva-button>Primary</minerva-button>
      </minerva-card-content>
    </minerva-card>
  </minerva-config>
</div>

```

## Example: Couleur de marque

Portées avec primary-color : indigo en une seule couleur (valeur sombre #7b85f2 dérivée), indigo dans une portée sombre, et sarcelle qui l’emporte sur le primaire de la palette editorial.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/config-provider/wc/brand-color.html

```html
<div
  style="
    display: grid;
    gap: 12px;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  "
>
  <minerva-config primary-color="#4f46e5">
    <minerva-card variant="outline" padding="medium">
      <minerva-card-header>
        <minerva-card-title>primary-color="#4f46e5"</minerva-card-title>
      </minerva-card-header>
      <minerva-card-content>
        <minerva-button>Primary</minerva-button>
        <minerva-button variant="outline">Outline</minerva-button>
      </minerva-card-content>
    </minerva-card>
  </minerva-config>
  <minerva-config primary-color="#4f46e5" theme="dark">
    <minerva-card variant="outline" padding="medium">
      <minerva-card-header>
        <minerva-card-title>Indigo + dark (#7b85f2)</minerva-card-title>
      </minerva-card-header>
      <minerva-card-content>
        <minerva-button>Primary</minerva-button>
        <minerva-button variant="outline">Outline</minerva-button>
      </minerva-card-content>
    </minerva-card>
  </minerva-config>
  <minerva-config primary-color="#0d9488" palette="editorial">
    <minerva-card variant="outline" padding="medium">
      <minerva-card-header>
        <minerva-card-title>Teal over palette="editorial"</minerva-card-title>
      </minerva-card-header>
      <minerva-card-content>
        <minerva-button>Primary</minerva-button>
        <minerva-button variant="outline">Outline</minerva-button>
      </minerva-card-content>
    </minerva-card>
  </minerva-config>
</div>

```

## Example: Langue

locale définit la langue des textes intégrés des éléments contenus (total de la pagination, état vide). Changez-la pour les voir se mettre à jour en direct.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/config-provider/wc/locale.html

```html
<label style="display: inline-flex; gap: 8px; align-items: center">
  Locale
  <select id="locale">
    <option value="en">English</option>
    <option value="fr">Français</option>
    <option value="zh">中文</option>
    <option value="ja">日本語</option>
  </select>
</label>
<minerva-config id="scope" locale="en">
  <div style="display: grid; gap: 12px; margin-top: 12px">
    <minerva-pagination total="120" show-total></minerva-pagination>
    <minerva-empty></minerva-empty>
  </div>
</minerva-config>

```

### apps/docs/src/docs/pages/config-provider/wc/locale.ts

```tsx
// Built-in texts follow the `locale` of the closest <minerva-config>
// (or the closest `lang` attribute) and update live when it changes.
export function setup(root: HTMLElement) {
  const select = root.querySelector<HTMLSelectElement>("#locale")!;
  const scope = root.querySelector<HTMLElement & { locale: string }>("#scope")!;
  const onChange = () => (scope.locale = select.value);
  select.addEventListener("change", onChange);
  return () => select.removeEventListener("change", onChange);
}

```

## Example: Portées imbriquées et événements de thème

Les portées s'imbriquent et la plus proche l'emporte : la portée interne reste claire tandis que l'externe suit les boutons. minerva-theme-change signale le mode résolu, y compris avec theme="system".

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/config-provider/wc/nested.html

```html
<div style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center">
  <minerva-button
    id="outer-light"
    size="small"
    variant="outline"
    color="neutral"
    >Outer: light</minerva-button
  >
  <minerva-button id="outer-dark" size="small" variant="outline" color="neutral"
    >Outer: dark</minerva-button
  >
  <minerva-button
    id="outer-system"
    size="small"
    variant="outline"
    color="neutral"
    >Outer: system</minerva-button
  >
  <output id="mode" aria-live="polite"></output>
</div>
<minerva-config id="outer" theme="dark">
  <minerva-card variant="outline" padding="medium" style="margin-top: 12px">
    <minerva-card-header>
      <minerva-card-title>Outer scope</minerva-card-title>
      <minerva-card-description
        >Follows the buttons above.</minerva-card-description
      >
    </minerva-card-header>
    <minerva-card-content>
      <minerva-config theme="light" palette="cool">
        <minerva-card variant="elevated" padding="small">
          <minerva-card-content>
            Nested scope: always light with the cool palette (the closest scope
            wins).
            <minerva-button size="small" style="margin-top: 8px"
              >Nested button</minerva-button
            >
          </minerva-card-content>
        </minerva-card>
      </minerva-config>
    </minerva-card-content>
  </minerva-card>
</minerva-config>

```

### apps/docs/src/docs/pages/config-provider/wc/nested.ts

```tsx
// minerva-theme-change reports the resolved mode of a scope, including the
// system preference when theme="system".
type Config = HTMLElement & {
  theme: string;
  resolvedMode: "light" | "dark" | null;
};

export function setup(root: HTMLElement) {
  const outer = root.querySelector<Config>("#outer")!;
  const mode = root.querySelector<HTMLOutputElement>("#mode")!;
  const show = () => (mode.value = `Resolved mode: ${outer.resolvedMode}`);
  const onClick = (event: Event) => {
    const id = (event.target as Element).closest("minerva-button")?.id;
    if (id?.startsWith("outer-")) outer.theme = id.slice("outer-".length);
  };
  root.addEventListener("click", onClick);
  outer.addEventListener("minerva-theme-change", show);
  const frame = requestAnimationFrame(show);
  return () => {
    cancelAnimationFrame(frame);
    root.removeEventListener("click", onClick);
    outer.removeEventListener("minerva-theme-change", show);
  };
}

```

## Example: Palette et design

palette, design (préréglage) et les surcharges density / radius / shadow / font-scale ne s'appliquent qu'au sous-arbre.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/config-provider/wc/palette-design.html

```html
<div
  style="
    display: grid;
    gap: 12px;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  "
>
  <minerva-config palette="editorial">
    <minerva-card variant="outline" padding="medium">
      <minerva-card-header>
        <minerva-card-title>palette="editorial"</minerva-card-title>
      </minerva-card-header>
      <minerva-card-content>
        <minerva-button>Primary</minerva-button>
        <minerva-button variant="outline">Outline</minerva-button>
      </minerva-card-content>
    </minerva-card>
  </minerva-config>
  <minerva-config palette="tech" theme="dark">
    <minerva-card variant="outline" padding="medium">
      <minerva-card-header>
        <minerva-card-title>palette="tech" + dark</minerva-card-title>
      </minerva-card-header>
      <minerva-card-content>
        <minerva-button>Primary</minerva-button>
        <minerva-button variant="outline">Outline</minerva-button>
      </minerva-card-content>
    </minerva-card>
  </minerva-config>
  <minerva-config design="compact" radius="none">
    <minerva-card variant="outline" padding="medium">
      <minerva-card-header>
        <minerva-card-title>design="compact" radius="none"</minerva-card-title>
      </minerva-card-header>
      <minerva-card-content>
        <minerva-button>Primary</minerva-button>
        <minerva-button variant="outline">Outline</minerva-button>
      </minerva-card-content>
    </minerva-card>
  </minerva-config>
  <minerva-config density="comfortable" radius="large" font-scale="large">
    <minerva-card variant="outline" padding="medium">
      <minerva-card-header>
        <minerva-card-title>Comfortable, large</minerva-card-title>
      </minerva-card-header>
      <minerva-card-content>
        <minerva-button>Primary</minerva-button>
        <minerva-button variant="outline">Outline</minerva-button>
      </minerva-card-content>
    </minerva-card>
  </minerva-config>
</div>

```

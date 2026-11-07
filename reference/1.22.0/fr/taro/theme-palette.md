# Thème et palette

Deux axes indépendants, un mode clair / sombre / système et une palette de couleurs, avec persistance par cookie et rendu serveur sans flash.

Package: minerva-design@1.22.0

Renderer: taro

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.0",
  "sourceCommit": "330c90a7382a7141543dcdad732a4da31d58a37e",
  "sourceDigest": "sha256:cbdfa6292d29dec33adda7a3e9cf0e027da50858956b8d08e3f7f3ed59c8d78a",
  "referenceSourceDigest": "sha256:e3be8c06635194769da4944bbccaf8bcffec3fe4bddbd369b74caf5e4553345b"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.0/types.json) or getType() from minerva-design/contracts.

## Documentation

### Deux axes : mode et palette

Le mode choisit entre clair et sombre. La palette définit l'apparence : couleurs, surfaces, ombres et polices. Chaque palette fonctionne avec chaque mode, si bien que quatre palettes donnent huit thèmes complets, en plus de l'apparence par défaut de Minerva lorsqu'aucune palette n'est définie.

Valeur

Mode : toujours clair ou toujours sombre.

Mode : suit prefers-color-scheme et se met à jour en direct quand le réglage du système change. ConfigProvider accepte aussi "auto", un alias conservé pour la compatibilité.

Palette : fonds papier chaleureux, primaire bleu encre et accent rouille, pour les pages riches en contenu.

Palette : surfaces neutres et nettes avec un primaire bleu vif, pour les tableaux de bord et les outils de développement.

Palette : gris monochromes avec un accent discret, pour les interfaces professionnelles et denses.

Palette : surfaces gris-bleu froides avec un primaire bleu sarcelle, calme et aérée.

Aucune palette : l'apparence par défaut de Minerva (les thèmes clair et sombre intégrés, écrits en variables inline).

### ThemeProvider et useTheme

ThemeProvider est le moyen le plus court d'obtenir les deux axes : il rend un ConfigProvider avec le mode et la palette donnés, enregistre les changements dans des cookies et expose le tout via useTheme(). ThemeToggle et PaletteToggle sont des sélecteurs prêts à l'emploi reliés au provider le plus proche.

ThemeProvider est un préréglage de ConfigProvider : les deux partagent une seule source de vérité. Utilisez directement ConfigProvider si vous avez aussi besoin de thèmes intégrés comme github-dark, d'objets de thème personnalisés ou d'une prop theme contrôlée :

useTheme() renvoie le mode choisi, le mode appliqué, la palette et leurs setters. Il fonctionne sous ThemeProvider comme sous ConfigProvider, et lève une erreur en dehors des deux.

### Comment le thème est appliqué

Le provider écrit toujours le mode résolu dans data-theme et color-scheme sur . Avec une palette et un thème light, dark ou system, il définit aussi data-palette : les tokens viennent alors des blocs de palette inclus dans style.css et les variables de thème inline sont supprimées. Sans palette, ou avec github-dark ou un objet de thème personnalisé, les tokens du thème sont écrits en variables CSS inline sur , comme auparavant.

Quand plusieurs sources définissent le même token, la plus spécifique l'emporte :

Les variables CSS inline sur  (objets de thème personnalisés, github-dark ou absence de palette) l'emportent sur tout ce qui est déclaré dans une feuille de style.

Les blocs de palette ([data-palette][data-theme]) l'emportent sur les valeurs par défaut déclarées sur :root.

Les valeurs par défaut de :root dans style.css, y compris les tokens dérivés avec color-mix(), s'appliquent quand rien d'autre ne correspond.

La prop palette est ignorée pour github-dark et les objets de thème personnalisés : ces thèmes apportent leurs propres tokens.

Seul le provider le plus externe écrit sur  et dans les cookies. Un ThemeProvider ou ConfigProvider imbriqué hérite du mode et de la palette de son parent, et limite ses propres defaultTheme / defaultPalette (ou theme / palette) à son sous-arbre et aux surcouches ouvertes depuis celui-ci, sans toucher à  (voir Palettes locales ci-dessous).

### Persistance par cookie

ThemeProvider (et ConfigProvider avec persist) enregistre le choix dans deux cookies : theme ("light", "dark" ou "system") et palette (un nom de palette ; supprimé pour l'apparence par défaut). Ils durent un an, utilisent path=/ et SameSite=Lax et sont lisibles côté serveur, ce qui rend possible un SSR sans flash. Après l'hydratation, le provider restaure une fois les valeurs des cookies. Passez disableStorage à ThemeProvider (ou laissez persist désactivé) pour garder le choix en mémoire seulement. Les mêmes utilitaires sont disponibles pour votre propre code serveur :

### Rendu serveur sans flash

Le serveur ne connaît pas le schéma de couleurs du système du visiteur, et React n'applique le thème qu'après l'hydratation. Deux éléments comblent cet écart : lire les cookies côté serveur et les passer comme valeurs par défaut au provider, et insérer THEME_INIT_SCRIPT en ligne dans . Ce petit script bloquant lit les cookies (avec prefers-color-scheme en repli) et définit data-theme, data-palette et color-scheme avant le premier affichage : la page n'affiche jamais le mauvais thème, même un instant.

Next.js App Router

Toute autre configuration SSR

Le script d'initialisation modifie les attributs de  avant l'hydratation de React : le balisage serveur et le DOM diffèrent donc volontairement. Ajoutez suppressHydrationWarning à  et à l'élément  ; cela ne masque que les avertissements d'attributs de cet élément, pas ceux de ses enfants. Importez tout ce qui sert côté serveur depuis minerva-design/theme-utils : ce point d'entrée n'a pas de bannière "use client" et peut être appelé dans un Server Component.

### createThemeInitScript

THEME_INIT_SCRIPT correspond à createThemeInitScript() avec les options par défaut. Générez le vôtre quand les valeurs par défaut doivent changer :

Option

Défaut

Mode utilisé quand le cookie theme est absent ou invalide. "system" se résout en clair ou sombre selon prefers-color-scheme.

Palette utilisée quand le cookie palette est absent ou invalide et que  n'a pas encore de data-palette valide. null laisse data-palette non défini (apparence par défaut de Minerva).

Ordre de résolution du script : le cookie theme, sinon defaultTheme. Le cookie palette, sinon un data-palette valide déjà rendu sur , sinon defaultPalette. Gardez le script inline (ni async ni defer) et avant la feuille de style pour qu'il s'exécute avant le premier affichage.

### Utilitaires compatibles serveur

Tous proviennent de minerva-design/theme-utils, un petit point d'entrée sans React et sans "use client". Ils s'utilisent sans risque dans les Server Components, les middlewares et les fonctions edge.

Export

Script d'initialisation par défaut, sous forme de chaîne : mode du cookie (sinon système), palette du cookie (sinon le data-palette déjà présent sur , sinon aucune). À insérer en ligne dans .

Génère un script d'initialisation avec d'autres valeurs par défaut (voir les options ci-dessus).

Analyse les deux cookies d'un en-tête Cookie et renvoie { theme, palette }, avec des valeurs par défaut facultatives pour les valeurs manquantes.

Valide la valeur brute du cookie theme ; une valeur invalide ou absente renvoie la valeur de repli ("system").

Valide la valeur brute du cookie palette ; une valeur invalide ou absente renvoie la valeur de repli (null).

Lit et décode (URI) un cookie depuis un en-tête Cookie ou document.cookie ; undefined s'il est absent.

Renvoie une chaîne au format Set-Cookie (path=/, un an, SameSite=Lax) pour une valeur de thème ou de palette.

Gardes de type pour les valeurs ThemeMode et Palette.

Les noms des palettes intégrées, dans l'ordre : editorial, tech, graphite, cool.

Noms des cookies ("theme", "palette") et leur durée de vie en secondes (un an).

### Palettes locales

Les blocs de palette de style.css sont des sélecteurs d'attributs : ils correspondent à n'importe quel élément, pas seulement à . Le moyen le plus simple de rendre un sous-arbre avec une autre palette ou un autre mode est un provider imbriqué :  ou  l'applique à ses enfants et à leurs surcouches. Sans provider, placez vous-même data-palette et data-theme sur un conteneur : définissez les deux attributs et donnez un fond au conteneur, car les tokens changent mais rien ne les peint tant qu'aucun élément ne les utilise.

### Nouveaux tokens

Les palettes ont introduit quelques tokens de couleur sémantiques et un ensemble de tokens d'échelle. Chaque token a une valeur par défaut dans style.css : ils fonctionnent avec ou sans palette, et avec les thèmes personnalisés.

Tokens de couleur sémantiques

Variable

Fond très doux pour les barres latérales, les en-têtes de tableau et les blocs de code.

Fond de l'application derrière les surfaces, comme le canevas d'un app shell. Vaut par défaut la surface douce.

Fond des contrôles de formulaire comme les champs et les listes. Vaut par défaut la surface douce.

Fond des lignes et éléments survolés. Vaut par défaut la surface atténuée.

Fond des lignes, éléments et onglets sélectionnés : une teinte légère de la couleur primaire.

Texte peu accentué pour les légendes et textes d'aide, entre le texte secondaire et le texte désactivé.

Accent secondaire pour les appels à l'action, les notes et les mises en avant. Vaut par défaut la couleur primaire ; les palettes définissent la leur.

accent est aussi un rôle de couleur complet, comme primary ou success : --accent-color-hover, -active, -subtle, -border et -text sont dérivés automatiquement.

Tokens d'échelle

Les tokens d'échelle ne changent pas avec le mode (les palettes ne peuvent remplacer que les polices). Les composants les utilisent via des variables CSS, et les props numériques gap ou padding se résolvent en var(--space-).

Groupe

Variables

Espacements

Une échelle en rem basée sur 4px. Les pas fractionnaires utilisent un tiret : --space-0-5 vaut 0.125rem.

Rayons

Rayons supplémentaires à côté de --radius-sm, -md et -lg, qui restent des tokens de thème.

Tailles de police

De 0.75rem (xs) à 3.75rem (6xl) ; md (0.875rem) est la taille du texte des composants.

Graisses et interlignages

Graisses de 400 à 700 et trois hauteurs de ligne.

Familles de polices

Polices du texte, des titres et à chasse fixe. Les palettes les remplacent.

Superposition

Niveaux de z-index utilisés par les menus déroulants, les éléments collants, les voiles, les modales, les popovers et les toasts.

Animations

Durées de transition et courbes d'accélération.

Rythme et élévation

Espacements verticaux fluides entre sections et blocs, et alias d'élévation des tokens d'ombre.

Focus

Épaisseur et décalage de l'anneau de focus.

```tsx
import { ThemeProvider, ThemeToggle, PaletteToggle } from "minerva-design";
import "minerva-design/style.css";

export default function Root() {
  return (
    // mode: "light" | "dark" | "system" (default)
    // palette: "editorial" | "tech" | "graphite" | "cool" | null (default look)
    <ThemeProvider defaultTheme="system" defaultPalette="editorial">
      <header>
        <ThemeToggle />
        <PaletteToggle showDefault />
      </header>
      <App />
    </ThemeProvider>
  );
}
```

```tsx
import { ConfigProvider, ToastProvider, toast } from "minerva-design";

// The same thing with ConfigProvider (ThemeProvider is a preset over it):
// "system" is an alias of "auto"; persist turns on the cookies.
<ConfigProvider
  theme="system"
  palette="editorial"
  persist
  onThemeChange={(theme) => toast.info(`Theme: ${theme}`)}
  onPaletteChange={(palette) => toast.info(`Palette: ${palette}`)}
>
  <ToastProvider>
    <App />
  </ToastProvider>
</ConfigProvider>;
```

```tsx
import { Button, useTheme } from "minerva-design";

function Settings() {
  const { theme, resolvedTheme, palette, setTheme, setPalette } = useTheme();
  return (
    <>
      <p>{theme} → {resolvedTheme} · {palette ?? "default"}</p>
      <Button onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>
        Toggle mode
      </Button>
      <Button onClick={() => setPalette("tech")}>Tech palette</Button>
    </>
  );
}
```

```html
<!-- palette + light / dark / system: tokens come from style.css -->
<html data-theme="dark" data-palette="tech" style="color-scheme: dark">

<!-- no palette, or github-dark / a custom theme object: inline variables -->
<html data-theme="light" style="color-scheme: light; --primary-color: #2563eb; ...">
```

```tsx
import {
  THEME_COOKIE_NAME,     // "theme"   -> "light" | "dark" | "system"
  PALETTE_COOKIE_NAME,   // "palette" -> "editorial" | "tech" | "graphite" | "cool"
  readCookieValue,
  parseThemeCookie,
  parsePaletteCookie,
  serializeThemeCookie,
} from "minerva-design/theme-utils";

// Read on the server (or from document.cookie)
const theme = parseThemeCookie(readCookieValue(cookieHeader, THEME_COOKIE_NAME));
const palette = parsePaletteCookie(readCookieValue(cookieHeader, PALETTE_COOKIE_NAME));

// Write from a route handler / server action (path=/, one year, SameSite=Lax)
response.headers.append("Set-Cookie", serializeThemeCookie(THEME_COOKIE_NAME, "dark"));
```

```tsx
// app/layout.tsx: a Server Component (no "use client")
import { headers } from "next/headers";
import { ThemeProvider } from "minerva-design";
import {
  THEME_INIT_SCRIPT,
  parseThemeCookies,
} from "minerva-design/theme-utils";
import "minerva-design/style.css";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { theme, palette } = parseThemeCookies((await headers()).get("cookie"), {
    palette: "editorial",
  });

  return (
    // the init script changes <html> attributes before React hydrates
    <html
      lang="en"
      suppressHydrationWarning
      data-theme={theme === "system" ? undefined : theme}
      data-palette={palette ?? undefined}
    >
      <head>
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
        />
      </head>
      <body>
        <ThemeProvider defaultTheme={theme} defaultPalette={palette}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

```tsx
// server.tsx: any SSR setup (Express, Hono, a Vite SSR server...)
import { renderToString } from "react-dom/server";
import { ThemeProvider } from "minerva-design";
import { THEME_INIT_SCRIPT, parseThemeCookies } from "minerva-design/theme-utils";

app.get("*", (req, res) => {
  const { theme, palette } = parseThemeCookies(req.headers.cookie);
  const body = renderToString(
    <ThemeProvider defaultTheme={theme} defaultPalette={palette}>
      <App url={req.url} />
    </ThemeProvider>,
  );
  res.send(`<!doctype html>
<html${palette ? ` data-palette="${palette}"` : ""}>
  <head>
    <script>${THEME_INIT_SCRIPT}</script>
    <link rel="stylesheet" href="/assets/style.css" />
  </head>
  <body><div id="root">${body}</div></body>
</html>`);
});
```

```tsx
import { createThemeInitScript } from "minerva-design/theme-utils";

// Dark by default, "graphite" when the visitor has no palette cookie yet
export const themeInitScript = createThemeInitScript({
  defaultTheme: "dark",
  defaultPalette: "graphite",
});
```

```tsx
// A nested provider scopes a palette / mode to its subtree (and to the
// overlays opened from it). <html> and the cookies are left to the root one.
<ThemeProvider defaultTheme="dark" defaultPalette="tech">
  <Button color="primary">Always tech / dark</Button>
</ThemeProvider>

// Without a provider: palette token blocks match any element, not only
// <html>. Set both attributes and give the wrapper a background.
<div data-palette="tech" data-theme="dark" style={{ background: "var(--background-color)" }}>
  <Button color="primary">Always tech / dark</Button>
</div>
```

## PaletteToggle

Support: beta

Native theme token classes plus resolved custom objects/light-dark pairs/github-dark, system subscription, theme/palette storage, nested inheritance, design axes and localized toggles/actions from shared dictionaries. Native touch/view semantics differ from browser DOM semantics. Native devices do not expose document focus, inert, browser portals or File input APIs; H5 capabilities are specified separately. Device-runtime validation is still required. Browser cookies/SSR bootstrap use native storage instead. Provider-scoped dictionaries cover controls/editors, calendar/weekdays, command defaults, page-tab actions, display actions and application navigation; global native confirm outside a provider requires explicit localized labels. Component tests, H5 tests in happy-dom and the official Taro WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/taro",
  "exports": [
    "PaletteToggle"
  ],
  "kind": "named"
}
```

### props

```json
[
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
    "name": "palettes",
    "source": "packages/taro/src/theme.tsx",
    "kind": "array",
    "typeText": "(\"editorial\" | \"tech\" | \"graphite\" | \"cool\")[] | undefined",
    "typeRef": "type:0a61f358e05925bc041d",
    "required": false
  },
  {
    "name": "showDefault",
    "source": "packages/taro/src/theme.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "labels",
    "source": "packages/taro/src/theme.tsx",
    "kind": "object",
    "typeText": "Partial<Record<\"editorial\" | \"tech\" | \"graphite\" | \"cool\" | \"default\", string>> | undefined",
    "typeRef": "type:e96fd6dcc52894ed19b8",
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

## PresetToggle

Support: beta

Native theme token classes plus resolved custom objects/light-dark pairs/github-dark, system subscription, theme/palette storage, nested inheritance, design axes and localized toggles/actions from shared dictionaries. Native touch/view semantics differ from browser DOM semantics. Native devices do not expose document focus, inert, browser portals or File input APIs; H5 capabilities are specified separately. Device-runtime validation is still required. Browser cookies/SSR bootstrap use native storage instead. Provider-scoped dictionaries cover controls/editors, calendar/weekdays, command defaults, page-tab actions, display actions and application navigation; global native confirm outside a provider requires explicit localized labels. Component tests, H5 tests in happy-dom and the official Taro WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/taro",
  "exports": [
    "PresetToggle"
  ],
  "kind": "named"
}
```

### props

```json
[
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
    "name": "presets",
    "source": "packages/taro/src/theme.tsx",
    "kind": "array",
    "typeText": "(\"compact\" | \"editorial\" | \"minerva\" | \"touch\" | undefined)[] | undefined",
    "typeRef": "type:8b2d710817117962537e",
    "required": false
  },
  {
    "name": "disabled",
    "source": "packages/taro/src/theme.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "size",
    "source": "packages/taro/src/theme.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
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

## ThemeProvider

Support: beta

Native theme token classes plus resolved custom objects/light-dark pairs/github-dark, system subscription, theme/palette storage, nested inheritance, design axes and localized toggles/actions from shared dictionaries. Native touch/view semantics differ from browser DOM semantics. Native devices do not expose document focus, inert, browser portals or File input APIs; H5 capabilities are specified separately. Device-runtime validation is still required. Browser cookies/SSR bootstrap use native storage instead. Provider-scoped dictionaries cover controls/editors, calendar/weekdays, command defaults, page-tab actions, display actions and application navigation; global native confirm outside a provider requires explicit localized labels. Component tests, H5 tests in happy-dom and the official Taro WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/taro",
  "exports": [
    "ThemeProvider"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "defaultTheme",
    "source": "packages/taro/src/theme.tsx",
    "kind": "enum",
    "values": [
      "dark",
      "light",
      "system"
    ],
    "typeText": "ThemeMode | undefined",
    "typeRef": "type:293f77323be9bd072cec",
    "required": false
  },
  {
    "name": "defaultPalette",
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
    "description": "Brand color (see `ConfigProvider` `primaryColor`)"
  },
  {
    "name": "disableStorage",
    "source": "packages/taro/src/theme.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
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
    "typeRef": "type:64684f0f101063bc67bf",
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
    "typeRef": "type:7f05f5b9f2f8076ab5b3",
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

## ThemeToggle

Support: beta

Native theme token classes plus resolved custom objects/light-dark pairs/github-dark, system subscription, theme/palette storage, nested inheritance, design axes and localized toggles/actions from shared dictionaries. Native touch/view semantics differ from browser DOM semantics. Native devices do not expose document focus, inert, browser portals or File input APIs; H5 capabilities are specified separately. Device-runtime validation is still required. Browser cookies/SSR bootstrap use native storage instead. Provider-scoped dictionaries cover controls/editors, calendar/weekdays, command defaults, page-tab actions, display actions and application navigation; global native confirm outside a provider requires explicit localized labels. Component tests, H5 tests in happy-dom and the official Taro WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/taro",
  "exports": [
    "ThemeToggle"
  ],
  "kind": "named"
}
```

### props

```json
[
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
    "name": "showSystem",
    "source": "packages/taro/src/theme.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false
  },
  {
    "name": "labels",
    "source": "packages/taro/src/theme.tsx",
    "kind": "object",
    "typeText": "Partial<Record<ThemeMode, string>> | undefined",
    "typeRef": "type:e54adf9eea9935a3df48",
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

## CSS variables

```json
{
  "css:ThemeToggle": {
    "kind": "cssVars",
    "source": "react/src/components/ThemeToggle",
    "vars": [
      {
        "name": "--theme-toggle-gap",
        "description": "Space between the options"
      },
      {
        "name": "--theme-toggle-padding",
        "description": "Inner padding of the group"
      },
      {
        "name": "--theme-toggle-radius",
        "description": "Corner radius of the group (defaults to --radius-lg; options use --radius-md)"
      },
      {
        "name": "--theme-toggle-background",
        "description": "Background of the group"
      },
      {
        "name": "--theme-toggle-item-height",
        "description": "Minimum height of an option (follows the density's control height)"
      },
      {
        "name": "--theme-toggle-item-min-width",
        "description": "Minimum width of an option"
      },
      {
        "name": "--theme-toggle-active-background",
        "description": "Background of the selected option"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

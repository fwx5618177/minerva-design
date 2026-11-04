# Server Components

Utiliser Minerva avec les React Server Components : quels points d'entrée sont des frontières client, ce qui peut s'exécuter côté serveur et où importer le CSS.

Package: minerva-design@1.20.6

Renderer: weapp

Locale: fr

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

### Points d'entrée et bannière "use client"

minerva-design est publié en plusieurs points d'entrée. Ceux qui contiennent des composants commencent par la directive "use client" ; le point d'entrée des utilitaires de thème ne l'a pas et peut donc s'exécuter dans des Server Components.

Point d'entrée

"use client"

Oui

Non

Tous les composants, providers, hooks et utilitaires.

L'éditeur de code basé sur Monaco (dépendances pairs facultatives : @monaco-editor/react et monaco-editor).

Graphiques GPU (WebGPU, WebGL2, WebGL, Canvas2D) : Chart, LineChart, BarChart, TradingChart, Scatter3DChart et plus de 40 autres composants.

Le moteur de graphiques sans framework : createChart et formatCompact. Son import est sûr côté serveur ; les graphiques sont créés dans le navigateur.

Le jeu d’icônes : Icon, IconCanvas, DynamicIcon, createIcon et un composant par icône (SearchIcon…). Les icônes SVG sont rendues côté serveur à l’intérieur des composants client.

Le jeu d’icônes sans framework : données des icônes, toSvg, drawIcon et canvas d’icônes GPU. Son import est sûr côté serveur (toSvg y fonctionne) ; les canvas sont créés dans le navigateur.

Utilitaires de thème compatibles serveur : THEME_INIT_SCRIPT, lecture et sérialisation des cookies, noms des palettes.

Utilitaires compatibles serveur : cn, themes, light, dark, githubDark, palettes, resolveTheme, generateCSSVariables, applyThemeStyles, getSystemTheme, isBilingualTheme, matchesShortcut, normalizeShortcuts, computeFixedColumnLayout.

### Pourquoi certains points d'entrée sont des frontières client

Chaque composant Minerva utilise de l'état, des effets, un contexte ou des portails : il doit donc s'exécuter dans le navigateur. Comme le point d'entrée principal est marqué "use client", un Server Component qui l'importe ne reçoit pas le code des composants mais des références client, des espaces réservés que le bundler résout vers le bundle client. Les composants sont malgré tout rendus en HTML sur le serveur pendant le SSR, puis hydratés dans le navigateur.

Une référence client n'est pas une fonction appelable côté serveur. Ce n'est pas un problème pour les composants, qui sont seulement rendus, mais cela signifie que les fonctions ordinaires d'un point d'entrée client ne peuvent pas s'exécuter dans un Server Component. Les fonctions utiles côté serveur, comme la lecture du cookie de thème ou la génération du script d'initialisation, se trouvent donc dans un point d'entrée séparé, sans bannière : minerva-design/theme-utils.

### Rendre des composants depuis un Server Component

Importez les composants de minerva-design directement dans un Server Component, un layout ou une page : aucun wrapper n'est nécessaire, car le point d'entrée est déjà une frontière client.

Les props transmises d'un Server Component à un composant client doivent être sérialisables : chaînes, nombres, booléens, objets simples, tableaux et JSX. Les fonctions ne le sont pas : les gestionnaires d'événements comme onClick, les render props et les callbacks nécessitent un petit composant client à vous :

### Appeler des fonctions côté serveur

Appelez librement les utilitaires de minerva-design/theme-utils et de minerva-design/utils côté serveur : dans les layouts, les route handlers, les middlewares ou les fonctions edge. N'appelez pas les fonctions du point d'entrée principal dans un Server Component (toast.success, Confirm, les hooks...) et n'y lisez pas ses données (themes, palettes...) : ce ne sont que des références client. Importez plutôt les fonctions et données simples depuis minerva-design/utils.

Les API impératives sont aussi sûres pendant le SSR des composants client : sans document elles ne font rien, et les dialogues basés sur une promesse comme Confirm se résolvent à false côté serveur. Déclenchez-les depuis des gestionnaires d'événements ou des effets, qui ne s'exécutent que dans le navigateur.

### Content Security Policy

Une Content-Security-Policy stricte (sans 'unsafe-inline') bloque le script d'initialisation du thème en ligne. Ajoutez le nonce de la requête à l'élément , ou autorisez le script par son empreinte : THEME_INIT_SCRIPT_HASH est la source 'sha256-…' de THEME_INIT_SCRIPT, et cspHash() la calcule pour un script créé avec createThemeInitScript().

### Où importer le CSS

Importez minerva-design/style.css une seule fois. Avec le Next.js App Router, le CSS global se place dans le layout racine, qui est un Server Component et peut importer du CSS. Dans les autres configurations, importez-le dans le fichier d'entrée client. prose.scss est un fichier facultatif, chargé de la même façon depuis votre propre Sass.

### Étapes suivantes

Rendu serveur sans flash de thème : THEME_INIT_SCRIPT et cookies de thème.

Paquets, dépendances pairs et feuilles de style.

```tsx
// dist/index.js and dist/monaco.js start with
"use client";

// dist/theme-utils.js and dist/utils-entry.js do not: they hold plain
// functions and data, safe to run on the server
```

```tsx
// app/page.tsx: a Server Component (no "use client")
import { Card, Tag } from "minerva-design";
import { SaveButton } from "./save-button";

export default async function Page() {
  const posts = await getPosts(); // server-only data access

  return posts.map((post) => (
    // serializable props only: strings, numbers, booleans, JSX children...
    <Card key={post.id} padding="medium">
      <Tag color="info">{post.category}</Tag>
      <h2>{post.title}</h2>
      <SaveButton id={post.id} />
    </Card>
  ));
}
```

```tsx
// app/save-button.tsx
"use client";

import { Button, toast } from "minerva-design";

// Event handlers and imperative APIs live in a client component
export function SaveButton({ id }: { id: string }) {
  return (
    <Button
      color="primary"
      onClick={async () => {
        await fetch(`/api/save/${id}`, { method: "POST" });
        toast.success("Saved"); // shown by the ToastProvider in your layout
      }}
    >
      Save
    </Button>
  );
}
```

```tsx
// app/layout.tsx: a Server Component
import { cookies } from "next/headers";
import {
  THEME_COOKIE_NAME,
  THEME_INIT_SCRIPT,
  parseThemeCookie,
} from "minerva-design/theme-utils"; // server-safe: runs here
import { ThemeProvider } from "minerva-design"; // rendered, not called

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const theme = parseThemeCookie((await cookies()).get(THEME_COOKIE_NAME)?.value);
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script suppressHydrationWarning dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>
        <ThemeProvider defaultTheme={theme}>{children}</ThemeProvider>
      </body>
    </html>
  );
}

// Plain functions and data (cn, themes, palettes, resolveTheme...):
// import them from the server-safe utils entry, not from the main entry
import { cn, themes } from "minerva-design/utils";

// Not on the server: main-entry functions are client references there
// import { toast } from "minerva-design";
// toast.success("Hi"); // call it from a client component instead
```

```tsx
// Strict CSP, option 1: a per-request nonce on the inline script
<script
  nonce={nonce}
  suppressHydrationWarning
  dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
/>
// Content-Security-Policy: script-src 'self' 'nonce-<nonce>'

// Option 2: allow the script by its hash (static HTML, CDN caching)
import {
  THEME_INIT_SCRIPT_HASH,
  createThemeInitScript,
  cspHash,
} from "minerva-design/theme-utils";

const csp = `script-src 'self' ${THEME_INIT_SCRIPT_HASH}`;
// a customised script has its own hash:
const script = createThemeInitScript({ defaultTheme: "dark" });
const customCsp = `script-src 'self' ${cspHash(script)}`;
```

```tsx
// Next.js App Router: import global CSS once, in the root layout
// app/layout.tsx
import "minerva-design/style.css";

// Vite / other setups: import it in the client entry file (main.tsx)
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

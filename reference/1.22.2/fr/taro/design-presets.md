# Préréglages de design

Changez l'apparence de toute une application, ou d'une partie, avec quelques props : un préréglage (minerva, editorial, compact, touch) ou les axes de design individuels densité, rayon, ombre et échelle typographique. Compatible SSR et portées imbriquées.

Package: minerva-design@1.22.2

Renderer: taro

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.2",
  "sourceCommit": "93eaa8e002773e63a78341d4424f9e832b7305a9",
  "sourceDigest": "sha256:62e49d8be55ca2bb85e8afd17b7862d068358e8ea94178c66288911996ed036e",
  "referenceSourceDigest": "sha256:10025b0c7fa1af3c2b0e9de9a1b6d51e6e81c9a41c96e7fcba66a58604dda51c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.2/types.json) or getType() from minerva-design/contracts.

## Documentation

### Axes de design

Attribut

Les axes de design sont indépendants du mode de couleur (theme) et de la palette. Chacun sélectionne un bloc de jetons de design via un attribut data ; les composants lisent ces jetons (hauteurs de contrôle, marges, rayons, ombres, tailles de police), donc toute la bibliothèque suit. Un préréglage est une combinaison nommée des quatre axes et d'une palette par défaut ; les axes et la palette explicites l'emportent sur le préréglage.

minerva : l'apparence par défaut de Minerva. editorial : sobre et orientée lecture (palette editorial, densité confortable, petit rayon, ombres discrètes, grands caractères). compact : écrans denses, riches en données (densité compacte, petit rayon, petits caractères). touch : applications mobiles grand public (densité confortable avec des cibles tactiles d'au moins 44px, grand rayon).

Hauteurs et marges horizontales des contrôles (--control-height-*, --control-padding-x-*) et marges des lignes comme les éléments de menu, les options et les cellules de tableau (--row-padding-y / --row-padding-x), ainsi que la taille minimale des cibles tactiles (--touch-target-min : 24px en compact, 32px en standard, 44px en confortable).

Échelle des rayons : --radius-sm, --radius-md, --radius-lg, --radius-xl et --radius-2xl.

Ombres d'élévation --shadow-sm à --shadow-xl. standard conserve les ombres du thème ou de la palette.

Échelle typographique : --font-size-* et les hauteurs de ligne de base / aérée. large est pensé pour la lecture.

### Toute l'application

Définissez les props sur le ConfigProvider racine : il écrit les axes non standard comme attributs data sur  (et la palette du préréglage comme data-palette), puis restaure  au démontage. useConfig().design renvoie les axes résolus.

### Rendu serveur

Le provider racine applique les attributs après l'hydratation. Pour un premier rendu avec la bonne apparence, écrivez-les dans le HTML serveur avec designAttributes() de l'entrée sans danger côté serveur minerva-design/theme-utils, et/ou passez le même design à createThemeInitScript({ design }), qui utilise aussi la palette du préréglage comme palette par défaut.

### Portées imbriquées

Un ConfigProvider imbriqué hérite du design de son parent et n'applique ses surcharges qu'à son sous-arbre : un conteneur display: contents et le conteneur de portail de la portée portent tous les attributs de design, donc les modales, popovers et toasts rendus depuis ce sous-arbre ont la même apparence. Un préréglage imbriqué réinitialise chaque axe qu'il ne définit pas.

### Utiliser les jetons dans votre CSS

Les axes ne changent que des jetons de design : vos propres styles peuvent utiliser les mêmes variables et rester cohérents avec les composants. Les ajustements par composant passent par les variables CSS de chaque composant (voir la section « Variables CSS » de chaque page de composant).

```tsx
import { ConfigProvider } from "minerva-design";
import "minerva-design/style.css";

export default function App() {
  // The whole app gets the editorial look: editorial palette, comfortable
  // density, small radius, subtle shadows and a reading-oriented type scale.
  return (
    <ConfigProvider preset="editorial" density="standard">
      {/* your app */}
    </ConfigProvider>
  );
}
```

```tsx
// app/layout.tsx (React Server Component, e.g. Next.js App Router)
import {
  createThemeInitScript,
  designAttributes,
} from "minerva-design/theme-utils";
import { Providers } from "./providers"; // "use client": <ConfigProvider preset="editorial">

const design = { preset: "editorial" } as const;
const themeScript = createThemeInitScript({ design });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // data-density / data-radius / data-shadow / data-font-scale in the HTML:
    // the first paint already has the right look
    <html lang="en" suppressHydrationWarning {...designAttributes(design)}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

```tsx
<ConfigProvider preset="compact">
  {/* dense admin screens */}
  <ConfigProvider preset="editorial">
    {/* an article preview: editorial look, portals (Modal, Popover...) included */}
  </ConfigProvider>
  <ConfigProvider radius="none">
    {/* inherits compact, only the radius changes */}
  </ConfigProvider>
</ConfigProvider>
```

```css
/* The axes only set design tokens, so your own CSS can use them too */
.panel {
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  padding: var(--row-padding-y) var(--row-padding-x);
  font-size: var(--font-size-md);
}

/* ...or react to the active design */
[data-density="compact"] .panel {
  gap: var(--space-1);
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

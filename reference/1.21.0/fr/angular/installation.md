# Installation

Ajoutez Minerva à un projet React, chargez la feuille de style et, si besoin, enregistrez les Web Components.

Package: minerva-design@1.21.0

Renderer: angular

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.0",
  "sourceCommit": "3e3fd42fed9bd7320e0095e9008ad52d1dd44024",
  "sourceDigest": "sha256:ce2a20ef1952cc69de92d0733342905020d5135facebdf802e90ddda090ce31c",
  "referenceSourceDigest": "sha256:bdc377ab7ed5f94120cdda24084c48e40370128fac18b85708e5f8b5fbaf5e95"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.0/types.json) or getType() from minerva-design/contracts.

## Documentation

### Prérequis

React et React DOM 19 pour les composants React (dépendances pair facultatives de minerva-design : les Web Components n'ont pas besoin de React). React 18 n'est pas pris en charge : les composants utilisent des API de React 19 comme ref en prop ordinaire, et sont testés avec StrictMode et le rendu serveur de React DOM 19.

Un bundler qui gère les modules ES et les imports CSS, comme Vite, webpack, Rspack ou Next.js. Une version CommonJS est également fournie.

Un navigateur moderne à jour : les jetons de thème reposent sur les propriétés personnalisées CSS et color-mix().

### Installer les composants React

Installez minerva-design avec votre gestionnaire de paquets : un seul paquet pour les composants React, les Web Components et les jetons de design. Ajoutez react et react-dom si votre projet ne les a pas encore.

react et react-dom sont des dépendances pair facultatives (^19), afin que votre application conserve une seule copie de React. Les seules dépendances d'exécution sont @floating-ui/dom (positionnement), DOMPurify (HtmlPreview), jsonc-parser (JsonField) et Lit (utilisé uniquement par les points d'entrée Web Components ; les applications React ne l'embarquent jamais) : aucune bibliothèque d'icônes, de noms de classes ou d'i18n n'est installée. Les icônes sont des SVG en ligne.

### Importer la feuille de style globale une seule fois

Les styles de tous les composants et les jetons du thème par défaut sont regroupés dans une feuille de style globale, minerva-design/style.css. Importez-la une seule fois, dans le point d'entrée de l'application, avant votre propre CSS. Les fichiers de composants n'importent ensuite que des composants, jamais de CSS.

Sans minerva-design/style.css, les composants s'affichent sans style. Importez-la une seule fois, dans le point d'entrée : la réimporter depuis des fichiers de composants est sans danger mais inutile.

#### React avec Vite : src/main.tsx

Vite regroupe le CSS importé depuis JavaScript : en développement, le serveur injecte la feuille de style, et vite build la produit sous forme d'un unique fichier .css haché, lié depuis index.html. Aucun plugin ni configuration supplémentaire n'est nécessaire.

#### Next.js (App Router) : app/layout.tsx

Le layout racine est un Server Component et peut importer du CSS global ; toutes les routes reçoivent alors les styles.

#### Web Components : src/main.ts

Les éléments personnalisés portent leurs propres styles dans leur shadow root ; tokens.css fournit les jetons de design partagés. Importez les deux une seule fois, dans le point d'entrée de votre application Vue, Angular, Svelte, Solid ou HTML. Si la même page utilise aussi les composants React, style.css contient déjà les jetons.

#### Dans les fichiers de composants

Les pages des composants ne montrent que l'import du composant. Elles supposent toutes la feuille de style globale importée ci-dessus :

Optionnel : feuilles de style par composant

Vous n'utilisez que quelques composants ? Importez une fois les jetons de design puis la feuille de style de chaque composant utilisé, au lieu de style.css. Chaque fichier contient les styles du composant et des composants qu'il affiche (par exemple confirm.css inclut les styles de Button et Modal) ; le nom de fichier est le dossier du composant en kebab-case (tag-input.css, time-picker.css...). Le JavaScript est aussi tree-shaké par composant : chaque module est publié séparément et le paquet est sans effet de bord hormis son CSS.

Un fichier Sass facultatif est publié à côté : minerva-design/prose.scss contient des mixins pour la typographie de texte long, à charger avec @use depuis votre propre Sass.

### Points d'entrée et dépendances pairs facultatifs

L'éditeur de code basé sur Monaco est publié dans un point d'entrée séparé, minerva-design/monaco, afin que le point d'entrée principal n'embarque jamais Monaco. Ses dépendances pairs @monaco-editor/react et monaco-editor sont facultatives : installez-les seulement si vous importez ce point d'entrée.

Vous utilisez Next.js ou un autre framework à React Server Components ? Consultez Server Components pour savoir quels points d'entrée sont des frontières client.

### Votre premier composant

Enveloppez l'application dans ConfigProvider et utilisez les composants :

ConfigProvider n'est pas obligatoire pour afficher les composants, mais il applique le thème (qui suit par défaut le schéma de couleurs du système), définit la langue des textes intégrés de la bibliothèque React et rend useConfig() disponible. Utilisez un seul provider à la racine de l'application.

### Web Components (facultatif)

Le même paquet fournit l'ensemble des composants sous forme d'éléments personnalisés indépendants du framework (Lit) via minerva-design/web-components, avec le même design, les mêmes tokens et le même comportement clavier, pour du HTML simple, Vue, Angular, Svelte ou toute autre pile. Ces points d'entrée sont ESM uniquement et ne nécessitent pas React ; installer minerva-design suffit :

Importez le paquet une fois pour enregistrer tous les éléments, ou importez une entrée par élément pour n'embarquer que ceux que vous utilisez. Chargez aussi les design tokens une fois :

Sans étape de build, chargez les tokens et le bundle de modules autonome (tous les éléments, Lit et le cœur de Minerva) depuis un CDN :

Chaque élément est typé dans HTMLElementTagNameMap. Pour les templates de framework, référencez une fois les typages générés pour React 19, Vue (Volar), Svelte ou Solid :

Web Components : prise en main, événements, typages et guides par framework

### TypeScript

minerva-design embarque ses propres déclarations de types ; aucun paquet @types n'est nécessaire. Les types de props (ButtonProps, TagProps, ...) et de thème (Theme, ComponentTheme, ThemeName, ...) sont exportés depuis la racine du paquet :

### Étapes suivantes

Les principes de conception et les conventions communes à tous les composants.

Thèmes intégrés, jetons de design et thèmes personnalisés.

Commencez par la première page de composant et ses exemples interactifs.

### Migrer une application existante

Changer le nom du paquet ne suffit pas à migrer l’ancienne API. Vérifiez les exports et propriétés : size="small|medium|large", color à la place de colorScheme, loading à la place de isLoading et startIcon à la place de leftIcon. Alert utilise color ; toast.error et certains anciens composants nécessitent un remplacement. Migrez écran par écran et vérifiez les types et les interactions.

```tsx
// src/main.tsx — the only place that imports Minerva's CSS
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "minerva-design/style.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

```tsx
// app/layout.tsx — global CSS belongs in the root layout
import type { ReactNode } from "react";
import "minerva-design/style.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

```ts
// src/main.ts — register the elements and load the design tokens, once
import "minerva-design/web-components";
import "minerva-design/tokens.css";
```

```tsx
// any component file: import the component only, no CSS
import { Tag } from "minerva-design";
```

```tsx
// src/main.tsx — optional, instead of "minerva-design/style.css":
import "minerva-design/styles/tokens.css"; // design tokens, once
import "minerva-design/styles/button.css";
import "minerva-design/styles/input.css";
import "minerva-design/styles/modal.css";
```

```scss
// optional, in your own .scss: long-form typography mixins
@use "minerva-design/prose.scss" as prose;
```

```bash
pnpm add @monaco-editor/react monaco-editor
```

```tsx
import { MonacoCodeEditor } from "minerva-design/monaco";
```

```tsx
import { createRoot } from "react-dom/client";
import { Button, ConfigProvider, ToastProvider, toast } from "minerva-design";
import "minerva-design/style.css";

function App() {
  return (
    // theme: "auto" (default) | "light" | "dark" | "github-dark" | custom
    <ConfigProvider theme="auto" locale={{ language: "en" }}>
      {/* renders toast() calls inside the theme scope */}
      <ToastProvider>
        <Button color="primary" onClick={() => toast.success("Hello!")}>
          Say hello
        </Button>
      </ToastProvider>
    </ConfigProvider>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
```

```bash
# the same package: the Web Components need no React
pnpm add minerva-design
```

```ts
// every element at once...
import "minerva-design/web-components";
// ...or only the elements you use (each entry registers one element and its parts)
import "minerva-design/web-components/select";

// design tokens, once (already included in minerva-design/style.css)
import "minerva-design/tokens.css";
```

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/minerva-design@1.21.0/dist/core/tokens.css" />
<script type="module" src="https://cdn.jsdelivr.net/npm/minerva-design@1.21.0/dist/web-components/cdn/minerva.js"></script>
```

```ts
// React 19 JSX (global.d.ts)
/// <reference types="minerva-design/web-components/react" />
// Svelte: ".../svelte", Solid: ".../solid"
// Vue (Volar): add "minerva-design/web-components/vue" to compilerOptions.types
```

```tsx
import { themes } from "minerva-design";
import type { ButtonProps, ComponentTheme } from "minerva-design";

// every component exports its props type
const saveButton: Partial<ButtonProps> = { color: "success", size: "large" };

// themes are typed too: missing or misspelled tokens are compile errors
const brand: ComponentTheme = { ...themes.light, "primary-color": "#7c3aed" };
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

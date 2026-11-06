# Thèmes

Thèmes clair et sombre intégrés, jetons de design sous forme de variables CSS, et création de votre propre thème.

Package: minerva-design@1.21.1

Renderer: native

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.1",
  "sourceCommit": "8b898b8bac966669d23d1fba972e2a3289cdb5b5",
  "sourceDigest": "sha256:a33fb5e0b8f01ae452ce95d2b723ab0cd9905636d574c72fd12c1459f4c09d3a",
  "referenceSourceDigest": "sha256:8ed3473bb098d663e523782b06fce57a42cde419daa8bbcc5c6b1f0e37e3e50e"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.1/types.json) or getType() from minerva-design/contracts.

## Documentation

### Thèmes intégrés

La bibliothèque React fournit trois thèmes : light, dark et github-dark. Choisissez-en un avec la prop theme de ConfigProvider, ou gardez la valeur par défaut "auto", qui suit le schéma de couleurs du système d'exploitation et se met à jour en direct lorsqu'il change.

### Essayez

Ce sélecteur pilote le thème de tout le site de documentation. Les composants ci-dessous, comme chaque page, se mettent à jour instantanément car ils ne lisent que des variables CSS.

Thème appliqué :

Les composants changent de thème sans nouveau rendu : seules les variables CSS de  changent.

### Valeurs de thème acceptées

La prop theme de ConfigProvider (ainsi que useAutoTheme / applyThemeStyles) accepte :

Valeur

Par défaut. Utilise light ou dark selon prefers-color-scheme et suit ses changements.

Le thème clair intégré.

Le thème sombre intégré.

Un thème sombre basé sur la palette sombre de GitHub.

Un objet de thème complet (tous les jetons de base, plus des jetons sémantiques et de composant facultatifs). Généralement créé en étendant un thème intégré.

Deux objets de thème ; celui qui correspond au schéma de couleurs du système est appliqué, avec bascule automatique.

### Fonctionnement

Un thème est une table plate associant des noms de jetons à des valeurs CSS. ConfigProvider écrit chaque entrée comme propriété personnalisée CSS nommée -- dans le style en ligne de l'élément  :

Les styles des composants ne font que référencer ces variables (par exemple background: var(--primary-color)) : changer de thème ne provoque donc jamais de nouveau rendu React. La feuille de style déclare aussi chaque jeton sur :root, si bien que les composants ont les valeurs du thème clair même avant (ou sans) ConfigProvider.

### Thèmes personnalisés

Créez un thème en étendant un thème intégré et en redéfinissant les jetons voulus, puis passez-le à ConfigProvider. Passez une paire { light, dark } pour continuer à suivre le schéma de couleurs du système. Les jetons sémantiques (survol, fond teinté, anneau de focus...) sont dérivés des jetons de base : redéfinir primary-color suffit généralement.

### Props color et variant

Chaque composant choisit sa couleur sémantique avec la même prop color, typée par le type partagé ColorScheme : primary, neutral, success, warning, danger ou info (certains composants n'en acceptent qu'un sous-ensemble documenté). C'est toujours un rôle du thème, jamais une couleur CSS brute : pour recolorer un composant, modifiez les jetons du thème ou ses propriétés CSS personnalisées.

variant ne choisit que le style visuel, avec le même sens partout : solid (rempli avec la couleur, texte inversé), subtle (fond teinté), outline (fond transparent, bordure et texte colorés) et ghost (transparent, sans bordure). Les composants ajoutent leurs propres styles si besoin (Tabs line / enclosed, Input filled ...).

### Redéfinir les jetons en CSS

Vous pouvez aussi définir des jetons depuis une feuille de style classique. Tenez compte de l'endroit où chaque valeur est définie :

ConfigProvider écrit le thème actif en style en ligne sur , prioritaire sur les règles :root d'une feuille de style. Les jetons définis par le thème nécessitent !important pour être redéfinis globalement ; les jetons de composant (btn-*, card-*, avatar-*) ne sont pas définis par les thèmes intégrés et peuvent être déclarés normalement.

### Référence des jetons

Chaque jeton est disponible via var(--). Les pastilles affichent la valeur du thème actuel.

Variable CSS

Jetons de base

Obligatoires dans chaque objet de thème (ThemeProps).

Jetons sémantiques

Facultatifs (SemanticThemeProps). Leurs valeurs par défaut sont dérivées des jetons de base avec color-mix() ; les thèmes sombres intégrés en définissent certains explicitement.

Jetons de rôle

Chaque couleur de rôle reçoit des jetons dérivés hover, active, subtle (fond teinté), border et text, par exemple --primary-color-hover ou --danger-color-subtle.

Rôle

Jetons de composant

Redéfinitions facultatives par composant (ComponentThemeProps). Sans valeur, les composants se rabattent sur les jetons sémantiques.

```tsx
import { ConfigProvider } from "minerva-design";
import "minerva-design/style.css";

export default function App() {
  // "auto" (default) follows the operating system's color scheme
  return <ConfigProvider theme="github-dark">{/* your app */}</ConfigProvider>;
}
```

```html
<!-- what ConfigProvider writes on the document root -->
<html style="--primary-color: #58a6ff; --background-color: #0d1117; ...">
```

```tsx
import { ConfigProvider, themes, type ComponentTheme } from "minerva-design";

// Start from a built-in theme and override the tokens you need.
// Derived tokens (hover, subtle, focus ring...) follow automatically.
const brandLight: ComponentTheme = {
  ...themes.light,
  "primary-color": "#7c3aed",
  "link-color": "#6d28d9",
};

const brandDark: ComponentTheme = {
  ...themes.dark,
  "primary-color": "#a78bfa",
  "focus-ring-color": "rgba(167, 139, 250, 0.55)",
};

export default function App() {
  return (
    // a single object: always this theme
    // <ConfigProvider theme={brandLight}>
    // a { light, dark } pair: follows the system color scheme
    <ConfigProvider theme={{ light: brandLight, dark: brandDark }}>
      {/* your app */}
    </ConfigProvider>
  );
}
```

```tsx
import { Button, Badge, Alert, Tooltip, toast } from "minerva-design";
import type { ColorScheme } from "minerva-design";
// "primary" | "neutral" | "success" | "warning" | "danger" | "info"

<Button color="danger" variant="outline">Delete</Button>
<Badge color="success" variant="subtle" content="Live" />
<Alert color="warning" variant="solid" title="Quota almost reached" />
<Tooltip color="info" content="Synced"><Button>Status</Button></Tooltip>
toast.success("Saved"); // toast({ color: "success", title: "Saved" })
```

```scss
/* Component-level tokens are not set by the built-in themes,
   so a plain stylesheet can define them */
:root {
  --card-bg-color: #fdf6e3;
  --btn-bg-color-hover: #1e40af;
}

/* Theme tokens are written as inline styles on <html> by ConfigProvider,
   which beat :root rules: use !important to force a value globally... */
:root {
  --radius-md: 10px !important;
}

/* ...or override them for one part of the page */
.checkout {
  --primary-color: #16a34a;
  /* derived tokens are computed on :root: redeclare the ones you need */
  --primary-color-hover: color-mix(in srgb, var(--primary-color) 85%, var(--foreground-color));
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

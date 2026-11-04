# Utilitaires de thème

Fonctions et objets de thème pour résoudre, appliquer et inspecter des thèmes en dehors de ConfigProvider.

Package: minerva-design@1.20.3

Renderer: vue

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.3",
  "sourceCommit": "af37b20099ab0383ddc1d9484d3d7847a8310d40",
  "sourceDigest": "sha256:38cfefdcb173c9a307526b9364c7a77acc74f713924006e65d94c6f3c5e94c61",
  "referenceSourceDigest": "sha256:1d36ef2823b3b425f00cf746f922b005435d17c9e4f13b0b40f620b32191d7a8"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.3/types.json) or getType() from minerva-design/contracts.

## Documentation

### Référence

ConfigProvider et useAutoTheme reposent sur ces utilitaires. Utilisez-les pour appliquer un thème sans React, thémer un seul élément ou lire la valeur des jetons.

Nom

Signature

Résout un thème et l'écrit sous forme de variables CSS sur  (global). Les variables du thème précédent que le nouveau ne définit pas sont supprimées.

Écrit chaque jeton d'un objet de thème en -- sur la déclaration de style donnée (par ex. element.style) et supprime les anciennes. Permet de thémer un seul élément.

Transforme toute valeur de thème acceptée en objet de thème : "auto" et les paires { light, dark } utilisent systemTheme, les noms sont cherchés dans themes, les objets sont renvoyés tels quels. Lève une erreur pour un nom inconnu. Sans effet de bord.

Renvoie le schéma de couleurs du système d'après prefers-color-scheme ; "light" si matchMedia n'est pas disponible (SSR, tests).

Garde de type : true pour les paires { light, dark } d'objets de thème.

Les thèmes intégrés, indexés par les noms acceptés par la prop theme.

Les objets de thème intégrés, aussi exportés individuellement ; étendez-les pour créer des thèmes personnalisés.

Appliquer un thème globalement

applyThemeStyles est la fonction appelée par ConfigProvider. Utilisez-la dans du code sans React, ou pour appliquer le thème avant le premier rendu et éviter un flash des couleurs par défaut.

Thémer un seul élément

generateCSSVariables accepte n'importe quelle CSSStyleDeclaration : les jetons peuvent donc être limités à un élément, dont les descendants en héritent.

Résoudre des thèmes

resolveTheme, isBilingualTheme et getSystemTheme n'ont pas d'effet de bord ; utilisez-les pour calculer des valeurs de jetons, par exemple pour styler un canvas ou un graphique.

```tsx
import { applyThemeStyles, themes } from "minerva-design";

// Without React (or before the first render): write a theme on <html>
applyThemeStyles("dark");
applyThemeStyles({ ...themes.light, "primary-color": "#7c3aed" });

// "auto" and { light, dark } pairs need the scheme to resolve against
// (defaults to the current prefers-color-scheme)
applyThemeStyles("auto", "dark");
```

```tsx
import { generateCSSVariables, resolveTheme } from "minerva-design";

// Theme a single element (e.g. an embedded widget) instead of the page
const widget = document.querySelector<HTMLElement>("#widget")!;
generateCSSVariables(widget.style, resolveTheme("github-dark"));
```

```tsx
import {
  getSystemTheme,
  isBilingualTheme,
  resolveTheme,
  themes,
} from "minerva-design";

getSystemTheme(); // "light" | "dark" ("light" during SSR)

const pair = { light: themes.light, dark: themes.dark };
isBilingualTheme(pair); // true
isBilingualTheme("dark"); // false

resolveTheme("auto", "dark") === themes.dark; // true
resolveTheme("github-dark")["background-color"]; // "#0d1117"
resolveTheme(pair, "light") === themes.light; // true
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

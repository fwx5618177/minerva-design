# Styles et personnalisation

Restylez n'importe quel composant Minerva depuis votre propre CSS : design tokens et variables CSS, hooks publics data-minerva / data-part / états, ::part() et :state() pour les web components, et la couche de cascade minerva.

Package: minerva-design@1.24.3

Renderer: native

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.24.3",
  "sourceCommit": "bbcef3f0abff568d08e734ec3e117c8cd10b017e",
  "sourceDigest": "sha256:94a5fd0119213e1760835190bfd5a8871f02c56d20091b654fc378ab0e0e6331",
  "referenceSourceDigest": "sha256:aa4b50ed4e7a53906ab6f39a3da2bbb4024583714e780e0cf99a262437a2babd"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.24.3/types.json) or getType() from minerva-design/contracts.

## Documentation

### Trois niveaux publics

Minerva propose trois façons stables de personnaliser un composant, de la plus légère à la plus précise. Elles font partie de l'API publique : elles continuent de fonctionner d'une version mineure à l'autre, contrairement aux noms de classes internes et à la structure du DOM.

Design tokens et variables CSS des composants : couleurs, rayons, espacements, hauteurs des contrôles... sur :root, une portée de thème ou n'importe quel élément.

Hooks de style : data-minerva (composant), data-part (partie) et attributs d'état (data-state, data-disabled, data-size...) en React ; la balise, ::part() et :state() pour les web components. Les mêmes noms dans les deux bibliothèques.

La couche de cascade minerva : chaque feuille de style de la bibliothèque est livrée dans @layer minerva, donc votre CSS hors couche l'emporte sans !important.

### Variables CSS

Commencez par les variables : elles suivent le thème et gardent cohérents les états du composant (survol, focus, désactivé). Chaque page de composant liste ses variables ---* ; les tokens sont décrits dans Thèmes. Les variables se combinent avec les hooks ci-dessous : définissez une variable pour une variante, une taille ou un état au lieu de réécrire les déclarations.

### Hooks de style (React)

Chaque composant React rend data-minerva="" et data-part="" sur les éléments stylables, et son état sous forme d'attributs d'un vocabulaire commun. La racine d'un composant est data-part="root" ; les parties des overlays rendus dans un portail (popups, dialogues, toasts) portent aussi data-minerva, elles sont donc ciblées où qu'elles soient rendues. Les valeurs sont rendues côté serveur exactement comme côté client (pas d'écart d'hydratation).

Motif recommandé : le sélecteur composé [data-minerva="x"][data-part="y"] (spécificité 0,2,0), plus les attributs d'état. Il ne dépend ni de l'imbrication (un Button dans une Modal est son propre composant) ni des portails. Évitez les chaînes de descendants sur des classes internes : elles sont privées et changent d'une version à l'autre. Pour limiter une règle, préfixez-la par une classe de votre conteneur, ou passez une className au composant (elle est posée sur la racine ou sur la partie documentée par la prop).

### Vocabulaire des états

Tous les composants utilisent les mêmes noms d'états. En React, ce sont des attributs data-* sur la racine (et sur les parties qui les portent, comme le contenu flottant) ; pour les web components, ce sont des états personnalisés de l'élément hôte.

Les parties suivent elles aussi un vocabulaire commun : root, label, description, icon, start-icon, end-icon, spinner, trigger, content, overlay, header, body, footer, title, close-button, list, item, item-indicator, group, separator, input, control, thumb, track, indicator... La section « Hooks de style » de chaque page de composant liste ses parties, sélecteurs et états pour React et pour les web components.

### Styler les éléments et leurs états

Les éléments répétés d'un composant (éléments de menu, options, onglets, lignes et en-têtes triés d'un tableau, pages, étapes, éléments d'arborescence, jours du calendrier, toasts, fichiers, étoiles...) ont leurs propres états publics : highlighted, selected, disabled, checked, current, expanded, sort, status... Ils utilisent le même vocabulaire que les états des composants et reflètent l'état ARIA de l'élément (aria-selected, aria-checked, aria-current, aria-expanded, aria-sort).

React : l'état est un attribut de l'élément lui-même, à côté de data-minerva et data-part : [data-minerva="menu"][data-part="item"][data-highlighted].

Web components, éléments rendus dans la shadow root : chaque état d'élément est un nom de partie supplémentaire -- (états à valeur : ---) à côté du nom de la partie. Combinez-les dans ::part(), qui cible les éléments portant tous les noms listés : minerva-menu::part(item item--highlighted), minerva-data-table::part(header-cell header-cell--sort-ascending). La convention suit Shoelace / Web Awesome (item--selected) et ne dépend pas de la prise en charge de :state().

Web components, éléments qui sont des custom elements à part entière (, , , ...) : leurs états sont des états personnalisés de l'élément, comme pour tout composant : minerva-option:state(selected)::part(root). Les attributs que vous posez vous-même sur ces éléments ([closable], [disabled]) sont aussi des sélecteurs stables.

Les hooks d'éléments suivent l'interaction : les flèches déplacent [data-highlighted] / item--highlighted d'un élément à l'autre, trier une colonne change data-sort, fermer un toast pose data-state="closed" pendant son animation de sortie. Les noms de partie et les états personnalisés n'ajoutent aucun attribut à l'hôte : le balisage rendu côté serveur s'hydrate sans écart.

Les exemples ci-dessous restylent un élément de menu mis en évidence, l'option sélectionnée d'un select, la page courante, un en-tête de tableau trié et les toasts de succès, en React et avec les web components.

### Couches de cascade : @layer minerva

minerva-design/tokens.css, minerva-design/style.css, styles/*.css et minerva-design/tokens.css sont enveloppés dans @layer minerva. Le CSS hors couche l'emporte sur toutes les couches, quels que soient sa spécificité et son ordre : vos règles remplacent celles de la bibliothèque sans !important. Si votre application utilise des couches, déclarez leur ordre une fois, avant toute feuille de style.

Conséquence : les resets globaux hors couche (button { background: none }, normalize.css...) l'emportent désormais aussi sur les styles de Minerva. Importez-les dans une couche placée avant minerva (layer(reset)), comme ci-dessus.

### Règles visuelles : bordures et focus

Pas de bordure d'un seul côté : Minerva ne marque jamais un état par une bande sur un bord (pas de barre d'accent à gauche d'un élément en surbrillance, pas de bordure soulignant l'onglet sélectionné, pas de bande sur une alerte ou une citation, pas d'ombre inset d'un seul côté). Les indicateurs sont des formes complètes : un fond, un anneau complet, une pastille arrondie ou un point. Les séparateurs entre lignes et sections sont des formes de séparation (une ligne de 1px dessinée par un pseudo-élément ou un élément séparateur), jamais un border-bottom de la ligne. Suivez la même règle dans vos surcharges ; les lignes de grille des tableaux et l'élément Divider lui-même sont les seules exceptions documentées.

Le focus au pointeur modifie la bordure sans halo extérieur épais. Tab, les touches de navigation et les raccourcis de commande affichent un seul anneau de 2px. Ce traitement est partagé par les champs et leurs compositions dans React, Vue, Angular et Web Components. Il utilise --primary-color-text, ou --danger-color-text en cas d’erreur. Les variables --minerva-focus-* restent disponibles ; une largeur explicite conserve aussi l’anneau lors du focus au pointeur.

Le contraste élevé de Windows utilise un contour Highlight sur le cadre extérieur. Les champs natifs internes ne dessinent pas un second indicateur. Conservez ce repli et placez vos styles de réinitialisation dans une couche antérieure.

Les composants gèrent automatiquement la modalité d’entrée. Pour vos contrôles DOM, acquireFocusModality(document), depuis minerva-design/core, renvoie une fonction de nettoyage. Les utilisateurs d’un document partagent les mêmes écouteurs ; le dernier nettoyage restaure le style privé précédent. Appelez cette fonction après le montage dans le navigateur, avec ownerDocument, puis libérez-la à la destruction. Les variables de focus publiques restent prioritaires.

### Politique de stabilité

La surface des hooks est lisible par machine : minerva-design/styling-hooks exporte le manifeste (composant → parties → états, avec leurs valeurs) dont la documentation est générée. Des tests de contrat rendent chaque composant React et chaque élément personnalisé dans leurs états, et échouent si un hook documenté manque ou si une partie non documentée apparaît ; un fichier de verrouillage (styling-hooks.lock.json) fait échouer le build à toute modification de la surface tant qu'il n'est pas mis à jour volontairement.

Version mineure : ajout d'un composant, d'une partie, d'un état (de composant ou d'élément) ou d'une valeur d'état.

Version majeure : suppression ou renommage de l'un d'eux, ou déplacement d'un état vers une autre partie.

Non couverts : les noms de classes, la structure DOM des éléments sans hook et les surcharges internes en !important.

### Étapes suivantes

Thèmes, palettes et design tokens.

Tokens, thèmes et langues pour les web components.

Nom du projet

Minerva Studio

Date de publication

Adresse e-mail

Saisissez une adresse e-mail complète.

Espace en lecture seule

Notes de publication

Décrivez cette publication…

Actions rapides

Planifier la publication

Effacer la date

```css
/* 1. Design tokens: the whole app (or a theme scope) */
:root {
  --primary-color: #7c3aed;
  --radius-md: 10px;
}

/* 2. Component variables (listed on each component page)... */
.toolbar {
  --button-height: 32px;
}

/* 3. ...combined with hooks: variables for one variant / state */
[data-minerva="button"][data-variant="ghost"] {
  --button-radius: 999px;
}
minerva-button:state(variant-ghost) {
  --button-radius: 999px; /* variables inherit into the shadow root */
}
```

```css
/* component root */
[data-minerva="tabs"] { }
/* a part (also matches portalled parts: popups, dialogs) */
[data-minerva="select"][data-part="content"] { }
/* a part in a state */
[data-minerva="modal"][data-part="content"][data-state="open"] { }
/* a part of a component in a state (state on the root) */
[data-minerva="button"][data-loading] [data-part="spinner"] { }
```

```css
/* component: the tag */
minerva-tabs { }
/* a part: ::part() */
minerva-select::part(content) { }
/* states are custom states of the host: :state() */
minerva-modal:state(open)::part(content) { }
minerva-button:state(loading)::part(spinner) { }
minerva-button:state(size-small):state(variant-ghost) { }
```

```css
/* React: item states are attributes of the item element itself */
[data-minerva="menu"][data-part="item"][data-highlighted] { }
[data-minerva="menu"][data-part="item"][data-state="checked"] { }
[data-minerva="option"][data-selected] { }
[data-minerva="pagination"][data-part="item"][data-current] { }
[data-minerva="data-table"][data-part="header-cell"][data-sort="ascending"] { }
[data-minerva="toast-region"][data-part="toast"][data-color="success"] { }
/* the trigger of a menu (a native element child) while the menu is open */
[data-minerva="menu"][data-part="trigger"][data-state="open"] { }

/* Web components, items in the shadow root: <part>--<state> part names */
minerva-menu::part(item item--highlighted) { }
minerva-menu::part(item item--checked) { }
minerva-select::part(item item--selected) { }
minerva-pagination::part(item item--current) { }
minerva-data-table::part(header-cell header-cell--sort-ascending) { }
minerva-toast-region::part(toast toast--color-success) { }
minerva-upload::part(item item--status-error) { }

/* Web components, items that are elements of their own: :state() */
minerva-option:state(selected)::part(root) { }
minerva-tab:state(active)::part(root) { }
minerva-page-tab:state(current) { }
/* your slotted trigger, from the states of its host */
minerva-menu:state(open) > [slot="trigger"] { }
```

```css
/* The library ships inside @layer minerva: unlayered rules win,
   whatever their specificity or order */
.my-button {
  border-radius: 0; /* beats the library, no !important */
}

/* Layered app? Declare the order once, before any stylesheet */
@layer reset, minerva, app;

/* Tailwind CSS v4 */
@layer theme, base, minerva, components, utilities;

/* Unlayered resets now beat the library too: layer them */
@import url("modern-normalize.css") layer(reset);
```

```css
/* Default: pointer focus changes the border; keyboard navigation adds
   one 2px ring. The frame owns the indicator, including composed controls. */
.search-field {
  --input-focus-color: var(--success-color);
  --minerva-focus-ring-color: var(--success-color-text);
}

/* Optional explicit override: keeps a ring even for pointer focus.
   Prefer the automatic default for ordinary forms. */
.high-visibility {
  --minerva-focus-ring-width: 3px;
  --minerva-focus-border-color: var(--primary-color-text);
}

/* Keep the system-colored outline fallback in Windows High Contrast.
   Do not globally suppress :focus or add a second outline to inner inputs. */
```

```ts
import { acquireFocusModality } from "minerva-design/core";

// Custom DOM controls: acquire after mounting and release on teardown.
// Framework components already manage this lifecycle automatically.
export function mountCustomControl(element: HTMLElement) {
  const release = acquireFocusModality(element.ownerDocument);
  return () => release();
}
```

```ts
import { stylingHooks, wcSelector } from "minerva-design/styling-hooks";

stylingHooks.modal.parts; // overlay, content, header, description, body, footer, close-button
stylingHooks.modal.states; // { state: ["open", "closed"], size: [...] }
wcSelector("modal", "content", { state: "open" });
// "minerva-modal:state(open)::part(content)"
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

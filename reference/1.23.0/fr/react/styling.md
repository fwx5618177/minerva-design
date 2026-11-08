# Styles et personnalisation

Restylez n'importe quel composant Minerva depuis votre propre CSS : design tokens et variables CSS, hooks publics data-minerva / data-part / états, ::part() et :state() pour les web components, et la couche de cascade minerva.

Package: minerva-design@1.23.0

Renderer: react

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "19d3efc34af8ba4e23df0f24d9fbb0a587e1b452",
  "sourceDigest": "sha256:2005faebbf738765fe81a5c952fa47a51311aa5d05e3220f71c542b8b1fe369b",
  "referenceSourceDigest": "sha256:ec29900df0d5b5c8d741436acb4a250ec29e5f40ce1f4110def33ac2d66baaa5"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

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

Le focus des contrôles de saisie (Input, Textarea, déclencheur de Select, NumberInput, TagInput, AutoComplete, TimePicker, Cascader, JsonField, KeyValueEditor, recherche de Command, champs de Pagination) remplace le contour natif du navigateur : la bordure prend la couleur de focus et un anneau en box-shadow entoure le contrôle. Les champs de texte l'affichent à chaque focus, souris comprise (:focus / :focus-within) ; les déclencheurs qui sont des boutons utilisent :focus-visible. La couleur de l'anneau vient du --focus-ring-color du thème, réglé par palette en clair et en sombre. Personnalisez-le avec les variables ci-dessous, sur :root, une portée de thème ou un seul contrôle.

Couleurs forcées (contraste élevé de Windows) : les box-shadows n'y sont pas peintes, donc chaque règle de focus définit aussi outline: 2px solid transparent. Le système transforme ce contour en une couleur système visible : le focus ne disparaît jamais. Conservez-le si vous redessinez l'anneau.

### Politique de stabilité

La surface des hooks est lisible par machine : minerva-design/styling-hooks exporte le manifeste (composant → parties → états, avec leurs valeurs) dont la documentation est générée. Des tests de contrat rendent chaque composant React et chaque élément personnalisé dans leurs états, et échouent si un hook documenté manque ou si une partie non documentée apparaît ; un fichier de verrouillage (styling-hooks.lock.json) fait échouer le build à toute modification de la surface tant qu'il n'est pas mis à jour volontairement.

Version mineure : ajout d'un composant, d'une partie, d'un état (de composant ou d'élément) ou d'une valeur d'état.

Version majeure : suppression ou renommage de l'un d'eux, ou déplacement d'un état vers une autre partie.

Non couverts : les noms de classes, la structure DOM des éléments sans hook et les surcharges internes en !important.

### Étapes suivantes

Thèmes, palettes et design tokens.

Tokens, thèmes et langues pour les web components.

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
/* The focus ring of every text-like control. Unset by default: the
   ring falls back to the theme's --focus-ring-color (per palette, light
   and dark), a 3px width and --primary-color for the border */
:root {
  --minerva-focus-ring-width: 4px;
  --minerva-focus-border-color: var(--primary-color-text);
}

/* One control: component variables still win for the border */
.search-field {
  --input-focus-color: var(--success-color);
  --minerva-focus-ring-color: color-mix(in srgb, var(--success-color) 45%, transparent);
}

/* Restyling the ring yourself? Keep the transparent outline:
   forced colors (High Contrast) paint it, box-shadows are dropped */
[data-minerva="input"][data-part="root"]:focus-within {
  box-shadow: 0 0 0 2px var(--primary-color);
  outline: 2px solid transparent;
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

## Example: Élément de menu mis en évidence

Ouvrez un menu et déplacez-vous avec les flèches : l'élément mis en évidence reçoit un fond teinté et une barre, les éléments cochés sont en gras, les désactivés barrés. Les panneaux React sont ciblés via la className du menu ; le web component utilise ::part(item item--highlighted).

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/styling/demos/items-menu.tsx

```tsx
import { Button, HStack, Menu } from "minerva-design";
import "minerva-design/web-components";

const css = `
/* the highlighted item follows the keyboard (arrows) and the pointer
   (React: the panel is portalled, scope it with its className) */
.accent-menu [data-minerva="menu"][data-part="item"][data-highlighted],
minerva-menu.accent-menu::part(item item--highlighted) {
  background: color-mix(in srgb, var(--primary-color) 18%, transparent);
  color: var(--primary-color);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--primary-color) 40%, transparent);
}
/* checked checkbox / radio items, disabled items */
.accent-menu [data-minerva="menu"][data-part="item"][data-state="checked"],
minerva-menu.accent-menu::part(item item--checked) {
  font-weight: 600;
}
.accent-menu [data-minerva="menu"][data-part="item"][data-disabled],
minerva-menu.accent-menu::part(item item--disabled) {
  text-decoration: line-through;
}
`;

export default function ItemsMenu() {
  return (
    <HStack gap={16} wrap className="accent-menu-demo">
      <style>{css}</style>
      <Menu
        className="accent-menu"
        items={[
          { key: "edit", label: "Edit", shortcut: "⌘E" },
          { key: "copy", label: "Duplicate", shortcut: "⌘D" },
          {
            type: "checkbox",
            key: "pin",
            label: "Pinned",
            defaultChecked: true,
          },
          { key: "delete", label: "Delete", disabled: true },
        ]}
      >
        <Button color="neutral" variant="outline">
          React menu
        </Button>
      </Menu>
      <minerva-menu class="accent-menu">
        <minerva-button slot="trigger" color="neutral" variant="outline">
          Web Component menu
        </minerva-button>
        <minerva-menu-item value="edit" shortcut="⌘E">
          Edit
        </minerva-menu-item>
        <minerva-menu-item value="copy" shortcut="⌘D">
          Duplicate
        </minerva-menu-item>
        <minerva-menu-checkbox-item value="pin" checked>
          Pinned
        </minerva-menu-checkbox-item>
        <minerva-menu-item value="delete" disabled>
          Delete
        </minerva-menu-item>
      </minerva-menu>
    </HStack>
  );
}

```

## Example: Page courante

Des boutons de page ronds, la page courante cerclée ([data-current] / item--current) et les boutons précédent / suivant désactivés estompés.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/styling/demos/items-pagination.tsx

```tsx
import { Pagination, VStack } from "minerva-design";
import "minerva-design/web-components";

const css = `
.ring-pages [data-minerva="pagination"][data-part="item"],
.ring-pages minerva-pagination::part(item) {
  border-radius: 999px;
}
/* the current page: aria-current="page" mirrored as a public hook */
.ring-pages [data-minerva="pagination"][data-part="item"][data-current],
.ring-pages minerva-pagination::part(item item--current) {
  background: transparent;
  color: var(--primary-color);
  box-shadow: inset 0 0 0 2px var(--primary-color);
  font-weight: 700;
}
.ring-pages [data-minerva="pagination"][data-part="item"][data-disabled],
.ring-pages minerva-pagination::part(item item--disabled) {
  opacity: 0.3;
}
`;

export default function ItemsPagination() {
  return (
    <VStack className="ring-pages" gap={16}>
      <style>{css}</style>
      <Pagination defaultCurrent={1} total={50} aria-label="React pages" />
      <minerva-pagination
        current={1}
        total={50}
        aria-label="Web Component pages"
      />
    </VStack>
  );
}

```

## Example: Option sélectionnée d'un select

L'option sélectionnée est remplie, celle mise en évidence entourée. Les options React sont des SelectItem (data-minerva="option") ; le web component rendu depuis la propriété options expose ::part(item item--selected), et les enfants <minerva-option> leur propre :state(selected).

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/styling/demos/items-select.tsx

```tsx
import { HStack, Select, SelectItem } from "minerva-design";
import "minerva-design/web-components";

const options = [
  { value: "en", label: "English" },
  { value: "zh", label: "Chinese" },
  { value: "fr", label: "French" },
  { value: "ja", label: "Japanese", disabled: true },
];

const css = `
/* React options are SelectItem components: data-minerva="option" */
.bold-options [data-minerva="option"][data-selected],
minerva-select.bold-options::part(item item--selected),
minerva-option.bold-option:state(selected)::part(root) {
  background: var(--primary-color);
  color: #fff;
  font-weight: 600;
}
.bold-options [data-minerva="option"][data-highlighted]:not([data-selected]),
minerva-select.bold-options::part(item item--highlighted),
minerva-option.bold-option:state(highlighted)::part(root) {
  outline: 2px dashed var(--primary-color);
  outline-offset: -2px;
}
`;

export default function ItemsSelect() {
  return (
    <HStack gap={16} wrap>
      <style>{css}</style>
      <div style={{ width: 200 }}>
        <Select
          aria-label="Language (React)"
          defaultValue="zh"
          contentClassName="bold-options"
        >
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div style={{ width: 200 }}>
        {/* options property: items rendered in the shadow root (::part) */}
        <minerva-select
          class="bold-options"
          aria-label="Language (options property)"
          value="zh"
          options={options}
        />
      </div>
      <div style={{ width: 200 }}>
        {/* <minerva-option> children: elements of their own (:state) */}
        <minerva-select aria-label="Language (minerva-option)" value="zh">
          {options.map((option) => (
            <minerva-option
              key={option.value}
              class="bold-option"
              value={option.value}
              disabled={option.disabled || undefined}
            >
              {option.label}
            </minerva-option>
          ))}
        </minerva-select>
      </div>
    </HStack>
  );
}

```

## Example: En-tête de tableau trié

Cliquez sur un en-tête pour trier : l'en-tête de la colonne triée est souligné (data-sort / header-cell--sort-<sens>), les en-têtes triables non triés sont atténués, les lignes sélectionnées teintées.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/styling/demos/items-table.tsx

```tsx
import { Table, VStack, type TableColumn } from "minerva-design";
import "minerva-design/web-components";

interface Service {
  id: number;
  name: string;
  latency: number;
}

const services: Service[] = [
  { id: 1, name: "auth-api", latency: 42 },
  { id: 2, name: "billing", latency: 118 },
  { id: 3, name: "search", latency: 73 },
];

const columns: TableColumn<Service>[] = [
  { key: "name", header: "Service", sortable: true },
  {
    key: "latency",
    header: "Latency",
    align: "right",
    sortable: (a, b) => a.latency - b.latency,
  },
];

const css = `
/* sorted column header: data-sort / header-cell--sort-<direction> */
.sorted-headers [data-minerva="data-table"][data-part="header-cell"][data-sort="ascending"],
.sorted-headers [data-minerva="data-table"][data-part="header-cell"][data-sort="descending"],
.sorted-headers minerva-data-table::part(header-cell header-cell--sort-ascending),
.sorted-headers minerva-data-table::part(header-cell header-cell--sort-descending) {
  color: var(--primary-color);
  box-shadow: inset 0 -3px 0 var(--primary-color);
}
.sorted-headers [data-minerva="data-table"][data-part="header-cell"][data-sort="none"],
.sorted-headers minerva-data-table::part(header-cell header-cell--sort-none) {
  color: var(--text-secondary-color);
}
/* selected rows */
.sorted-headers [data-minerva="data-table"][data-part="row"][data-selected] [data-part="cell"],
.sorted-headers minerva-data-table::part(row row--selected) {
  background: color-mix(in srgb, var(--primary-color) 12%, transparent);
}
`;

export default function ItemsTable() {
  return (
    <VStack className="sorted-headers" gap={24}>
      <style>{css}</style>
      <Table
        aria-label="Services (React)"
        columns={columns}
        data={services}
        rowKey={(row) => row.id}
        defaultSortState={{ key: "latency", order: "ascend" }}
        rowSelection={{ defaultSelectedRowKeys: [2] }}
      />
      <minerva-data-table
        aria-label="Services (Web Component)"
        row-key="id"
        columns={columns}
        rows={services}
        sortState={{ key: "latency", order: "ascend" }}
        selectable
        selectedRowKeys={[2]}
      />
    </VStack>
  );
}

```

## Example: Toasts de succès

Les toasts de succès reçoivent un contour et un fond verts, et les toasts qui partent s'estompent pendant data-state="closed" / toast--closed. Les toasts React sont rendus dans un portail : le sélecteur composé les cible quand même.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/styling/demos/items-toast.tsx

```tsx
import { useRef } from "react";
import { Button, HStack, ToastProvider, toast } from "minerva-design";
import "minerva-design/web-components";

type Region = HTMLElement & {
  toast: { success: (title: string) => void; info: (title: string) => void };
};

const css = `
/* React toasts are portalled to the toast region: the compound selector
   matches them wherever they render */
[data-minerva="toast-region"][data-part="toast"][data-color="success"],
minerva-toast-region.success-toasts::part(toast toast--color-success) {
  /* a full outline, not a one-sided stripe */
  border-color: var(--success-color);
  box-shadow: inset 0 0 0 1px var(--success-color);
  background: var(--success-color-subtle);
}
/* leaving toast (data-state="closed" during its exit animation) */
[data-minerva="toast-region"][data-part="toast"][data-state="closed"],
minerva-toast-region.success-toasts::part(toast toast--closed) {
  opacity: 0.4;
}
`;

export default function ItemsToast() {
  const region = useRef<Region>(null);
  return (
    <HStack gap={8} wrap>
      <style>{css}</style>
      {/* mount one ToastProvider near the root of an app */}
      <ToastProvider position="bottom-right" />
      <Button color="success" onClick={() => toast.success("Saved (React)")}>
        React success toast
      </Button>
      <Button
        color="success"
        variant="outline"
        onClick={() => region.current?.toast.success("Saved (Web Component)")}
      >
        Web Component success toast
      </Button>
      <minerva-toast-region
        ref={region}
        class="success-toasts"
        position="bottom-left"
      />
    </HStack>
  );
}

```

## Example: Restyler Button

Des boutons en pilule grâce aux variables --button-*, une variante outline plus épaisse, des libellés en majuscules et un indicateur coloré pendant le chargement : React (hooks data-*) sur la première ligne, <minerva-button> (::part() / :state()) sur la seconde.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/styling/demos/restyle-button.tsx

```tsx
import { Button, HStack, VStack } from "minerva-design";
import "minerva-design/web-components";

// Plain, unlayered CSS: it wins over the library (inside @layer minerva)
// without !important. Variables and hooks combine.
const css = `
.pill-buttons [data-minerva="button"][data-part="root"],
.pill-buttons minerva-button {
  --button-radius: 999px;
  --button-padding-x: 20px;
}
.pill-buttons [data-minerva="button"][data-part="root"][data-variant="outline"] {
  border-width: 2px;
}
.pill-buttons minerva-button:state(variant-outline)::part(root) {
  border-width: 2px;
}
.pill-buttons [data-minerva="button"][data-part="label"],
.pill-buttons minerva-button::part(label) {
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.pill-buttons [data-minerva="button"][data-loading] [data-part="spinner"],
.pill-buttons minerva-button:state(loading)::part(spinner) {
  color: var(--warning-color);
}
`;

export default function RestyleButton() {
  return (
    <VStack className="pill-buttons" gap={12}>
      <style>{css}</style>
      <HStack gap={8} wrap>
        <Button>React</Button>
        <Button variant="outline">Outline</Button>
        <Button loading variant="ghost">
          Saving
        </Button>
      </HStack>
      <HStack gap={8} wrap>
        <minerva-button>Web Component</minerva-button>
        <minerva-button variant="outline">Outline</minerva-button>
        <minerva-button loading variant="ghost">
          Saving
        </minerva-button>
      </HStack>
    </VStack>
  );
}

```

## Example: Restyler Modal

Un overlay flouté, un panneau bordé et un titre coloré pendant l'ouverture. Le panneau React est rendu dans <body> par un portail ; le sélecteur composé [data-minerva][data-part] le cible quand même.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/styling/demos/restyle-modal.tsx

```tsx
import {
  Button,
  HStack,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalRoot,
  ModalTrigger,
} from "minerva-design";
import "minerva-design/web-components";

// The React content is portalled to <body>: the compound selector
// [data-minerva][data-part] matches it wherever it renders (a class on the
// trigger's container would not).
const css = `
[data-minerva="modal"][data-part="overlay"].glass-overlay,
minerva-modal.glass::part(overlay) {
  backdrop-filter: blur(6px);
}
[data-minerva="modal"][data-part="content"].glass-content,
minerva-modal.glass::part(content) {
  border: 1px solid var(--primary-color);
  box-shadow: 0 24px 48px color-mix(in srgb, var(--primary-color) 25%, transparent);
}
[data-minerva="modal"][data-part="content"][data-state="open"].glass-content [data-part="header"],
minerva-modal.glass:state(open)::part(header) {
  color: var(--primary-color);
}
`;

export default function RestyleModal() {
  return (
    <HStack gap={8} wrap>
      <style>{css}</style>
      <ModalRoot>
        <ModalTrigger asChild>
          <Button variant="outline">React modal</Button>
        </ModalTrigger>
        <ModalContent
          className="glass-content"
          overlayClassName="glass-overlay"
        >
          <ModalHeader>Restyled with hooks</ModalHeader>
          <ModalBody>
            The overlay, panel and title are styled from the page.
          </ModalBody>
        </ModalContent>
      </ModalRoot>
      <minerva-modal class="glass" label="Restyled with hooks">
        <minerva-button slot="trigger" variant="outline">
          Web Component modal
        </minerva-button>
        The overlay, panel and title are styled from the page.
      </minerva-modal>
    </HStack>
  );
}

```

## Example: Restyler Table

Des cellules d'en-tête en majuscules et la ligne survolée mise en évidence grâce aux parties du tableau de données, plus des lignes zébrées en React (::part() n'accepte que les pseudo-classes d'interaction comme :hover, pas :nth-child).

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/styling/demos/restyle-table.tsx

```tsx
import { Table, VStack, type TableColumn } from "minerva-design";
import "minerva-design/web-components";

interface Book {
  id: number;
  title: string;
  author: string;
  score: number;
}

const books: Book[] = [
  { id: 1, title: "Dune", author: "Frank Herbert", score: 9.1 },
  { id: 2, title: "Solaris", author: "Stanisław Lem", score: 8.7 },
  { id: 3, title: "Hyperion", author: "Dan Simmons", score: 8.9 },
];

const columns: TableColumn<Book>[] = [
  { key: "title", header: "Title" },
  { key: "author", header: "Author" },
  { key: "score", header: "Score", align: "right" },
];

const css = `
.ledger [data-minerva="data-table"][data-part="header-cell"],
.ledger minerva-data-table::part(header-cell) {
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-size: 12px;
  color: var(--primary-color);
}
/* ::part() only takes user-action pseudo-classes (:hover, :focus-visible...):
   keep structural ones (:nth-child) in a React-only rule */
.ledger [data-minerva="data-table"][data-part="row"]:nth-child(even) [data-part="cell"] {
  background: color-mix(in srgb, var(--primary-color) 6%, transparent);
}
.ledger [data-minerva="data-table"][data-part="row"]:hover [data-part="cell"],
.ledger minerva-data-table::part(row):hover {
  background: color-mix(in srgb, var(--primary-color) 14%, transparent);
}
`;

export default function RestyleTable() {
  return (
    <VStack className="ledger" gap={24}>
      <style>{css}</style>
      <Table
        aria-label="Books (React)"
        columns={columns}
        data={books}
        rowKey={(book) => book.id}
      />
      <minerva-data-table
        aria-label="Books (Web Component)"
        row-key="id"
        columns={columns}
        rows={books}
      />
    </VStack>
  );
}

```

## Example: Restyler Tabs

Des onglets en pastilles arrondies, l'onglet actif teinté et entièrement entouré, l'onglet désactivé atténué, grâce aux hooks d'état de l'onglet.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/styling/demos/restyle-tabs.tsx

```tsx
import { Tab, TabList, TabPanel, Tabs, VStack } from "minerva-design";
import "minerva-design/web-components";

const css = `
/* Library rule: no one-sided borders. The active tab is a full shape (a
   tinted pill with a full ring), not an underline. */
.pill-tabs [data-minerva="tabs"][data-part="list"],
.pill-tabs minerva-tabs::part(list) {
  gap: 4px;
}
.pill-tabs [data-minerva="tab"][data-part="root"],
.pill-tabs minerva-tab::part(root) {
  border-radius: 999px;
  font-weight: 500;
}
.pill-tabs [data-minerva="tab"][data-state="active"],
.pill-tabs minerva-tab:state(active)::part(root) {
  color: var(--primary-color-text);
  background: var(--primary-color-subtle);
  box-shadow: inset 0 0 0 1px var(--primary-color);
}
.pill-tabs [data-minerva="tab"][data-disabled],
.pill-tabs minerva-tab:state(disabled)::part(root) {
  opacity: 0.4;
}
`;

export default function RestyleTabs() {
  return (
    <VStack className="pill-tabs" gap={24}>
      <style>{css}</style>
      <Tabs defaultValue="overview" variant="soft">
        <TabList aria-label="React tabs">
          <Tab value="overview">Overview</Tab>
          <Tab value="activity">Activity</Tab>
          <Tab value="archive" disabled>
            Archive
          </Tab>
        </TabList>
        <TabPanel value="overview">React: data-* hooks</TabPanel>
        <TabPanel value="activity">Activity</TabPanel>
        <TabPanel value="archive">Archive</TabPanel>
      </Tabs>
      <minerva-tabs value="overview" variant="soft" label="Web Component tabs">
        <minerva-tab value="overview">Overview</minerva-tab>
        <minerva-tab value="activity">Activity</minerva-tab>
        <minerva-tab value="archive" disabled>
          Archive
        </minerva-tab>
        <minerva-tab-panel value="overview">
          Web Components: ::part() and :state()
        </minerva-tab-panel>
        <minerva-tab-panel value="activity">Activity</minerva-tab-panel>
        <minerva-tab-panel value="archive">Archive</minerva-tab-panel>
      </minerva-tabs>
    </VStack>
  );
}

```

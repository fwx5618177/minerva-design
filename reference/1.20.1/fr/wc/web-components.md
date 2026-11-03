# Web Components

L'ensemble des composants Minerva sous forme d'éléments personnalisés standard, pour du HTML simple, Vue, Angular, Svelte, Solid, React ou tout autre framework.

Package: minerva-design@1.20.1

Renderer: wc

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.1",
  "sourceCommit": "3a9f5cdaae706f14fe6d8c65c5481eba719a66c4",
  "sourceDigest": "sha256:c9ed2b706b61413d29e506a3f04f3d35c044a4b57ec0e284935054f9e1898c7e",
  "referenceSourceDigest": "sha256:6c9ecba0079f25e53cd971e51f2be8604fc3d941c0ed1cfeec03c4a91913ad73"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.1/types.json) or getType() from minerva-design/contracts.

## Documentation

### De quoi s'agit-il

minerva-design/web-components implémente chaque composant Minerva sous forme d'élément personnalisé standard (, , ...), construit avec Lit. Une fois enregistrés, les éléments se comportent comme des balises HTML natives : ils fonctionnent dans une page statique, dans un template rendu côté serveur et dans tout framework qui produit du HTML.

Ce ne sont pas des enveloppes autour des composants React : ils rendent la même structure DOM et compilent les mêmes feuilles de style dans leur shadow root ; ils ont donc exactement le même aspect, lisent les mêmes design tokens et exposent les mêmes variables CSS ---*. Le comportement du clavier et du focus (zones de focus, pile de couches refermables, focus itinérant, recherche par saisie, positionnement) provient des mêmes primitives de minerva-design/core, avec les mêmes rôles et états ARIA.

L'API reprend le vocabulaire de React : color, variant, size, disabled, open, value... deviennent des attributs et des propriétés, les props ReactNode deviennent des slots, les callbacks deviennent des événements minerva-*, et les contrôles de formulaire participent aux  natifs.

### Installation

Le paquet est ESM uniquement et n'a aucune dépendance pair : Lit, minerva-design/core (avec Floating UI), DOMPurify et jsonc-parser sont des dépendances ordinaires. React n'est pas nécessaire.

### Charger les éléments

Avec un bundler, importez le paquet une fois (par exemple dans votre fichier d'entrée) pour enregistrer tous les éléments :

Ou importez une entrée par élément pour des bundles plus légers. Chaque entrée enregistre son élément, ses sous-éléments et les éléments Minerva qu'il affiche, et rien d'autre ; les modules sont par ailleurs sans effet de bord, si bien que les éléments inutilisés ne sont jamais embarqués. Importer un élément deux fois (ou l'entrée globale ensuite) est sans danger.

Sans aucune étape de build, chargez le bundle autonome depuis un CDN avec un script de type module. Il contient tous les éléments, Lit et minerva-design/core, minifiés :

En production, fixez une version dans les URL du CDN. Le bundle est aussi publié sous l'export ./cdn (minerva-design/web-components/cdn) si vous souhaitez l'héberger vous-même.

### Design tokens

Les éléments se stylent eux-mêmes (leur CSS vit dans leur shadow root), mais lisent les design tokens (--primary-color, --radius-md, --space-2, ...) depuis la page. Chargez minerva-design/tokens.css une fois, via une balise link de feuille de style ou un import CSS. C'est le même fichier que minerva-design/tokens.css : si la page charge déjà minerva-design/style.css (React et Web Components côte à côte), les tokens sont déjà présents. Consultez Thèmes pour les thèmes, les palettes et les variables par composant.

### Attributs et propriétés

Chaque option est une propriété (en camelCase, n'importe quelle valeur JavaScript) et, lorsqu'il s'agit d'une chaîne, d'un nombre ou d'un booléen, également un attribut (en kebab-case : full-width, close-label, activation-mode). Les attributs booléens sont actifs dès qu'ils sont présents ; les options dont la valeur par défaut en React est true sont inversées (hide-close-button, no-loop). Les attributs d'état (open, disabled, variant, size, color, checked...) sont reflétés, afin que le CSS puisse les cibler. Les tableaux, objets et fonctions (options, items, columns, callbacks de rendu) sont uniquement des propriétés.

Les contrôles de formulaire suivent les champs natifs : l'attribut value (ou checked) est la valeur initiale, restaurée par form.reset(), tandis que la propriété value / checked est la valeur courante. Définissez la propriété pour la modifier depuis un script.

### Événements

Les éléments signalent les actions de l'utilisateur avec des CustomEvent nommés minerva-. Ils remontent (bubbles) et sont composés (ils traversent les shadow roots), et transportent le nouvel état dans event.detail :

minerva-change : un changement de valeur validé ({ value }, ou { checked, value } pour les cases à cocher et les interrupteurs).

minerva-input : la valeur change pendant que l'utilisateur tape ({ value }).

minerva-open-change : l'utilisateur a demandé à ouvrir ou fermer une fenêtre contextuelle ({ open, ... }). Il est annulable : preventDefault() conserve l'état actuel, l'équivalent d'une prop open contrôlée en React. Les changements de sélection des onglets sont aussi annulables.

Les événements plus spécifiques suivent le même schéma : minerva-select, minerva-close, minerva-clear, minerva-page-change, minerva-sort-change, minerva-selection-change, minerva-after-open, minerva-after-close... Chaque page de composant liste les événements de ses éléments.

Les événements natifs gardent leur sens lorsqu'un élément reproduit un contrôle natif : click, focus, blur, input et change (redéclenchés sur l'hôte).

Définir une propriété depuis un script ne déclenche jamais d'événement : un événement signifie toujours que l'utilisateur a fait quelque chose, de sorte que synchroniser un état vers un élément ne peut pas créer de boucle.

### Slots et parts

Le contenu riche se place dans des slots : le slot par défaut pour le contenu principal, et des slots nommés (slot="footer", "prefix", "start", "icon"...) là où le composant React prend un ReactNode. Les éléments exposent leurs parties internes clés sous forme de parts CSS (root, label, content, item, input...), que vous pouvez styler depuis la page avec ::part() sans dépendre de leurs noms de classes internes. Les slots et les parts sont listés sur chaque page de composant.

### TypeScript et prise en charge par l'éditeur

Chaque classe d'élément s'ajoute à HTMLElementTagNameMap : document.querySelector et createElement renvoient donc le bon type. Les classes et leurs unions de littéraux de chaîne sont exportées par le paquet.

Les typages pour les templates de framework sont générés à partir du Custom Elements Manifest (custom-elements.json, également publié) : les attributs, propriétés et événements sont vérifiés dans les templates React, Vue, Svelte et Solid. Référencez une fois le fichier correspondant à votre framework :

```tsx
Pour les fichiers HTML simples, indiquez à VS Code les données HTML personnalisées fournies pour obtenir la complétion des balises et des attributs, avec leur documentation :
```

### Utilisation depuis React 19

React 19 prend en charge nativement les éléments personnalisés : les props qui existent sur l'élément sont définies comme propriétés (les booléens, tableaux et objets fonctionnent donc tels quels) et les props nommées on + le nom de l'événement s'abonnent aux événements personnalisés, par ex. onminerva-change. onClick et les autres événements standard fonctionnent comme avec les éléments natifs.

Dans une application React, les composants React de minerva-design sont généralement plus adaptés. Les éléments personnalisés sont utiles lorsque les mêmes widgets sont partagés avec du code non React (micro-frontends, contenu de CMS, templates serveur).

### Rendu côté serveur

Les modules peuvent être importés dans Node (Next.js, Nuxt, SvelteKit, Angular SSR, Astro...) : rien ne touche au DOM au moment de l'import, et defineElement() est idempotent et ne fait rien lorsque l'environnement n'a pas de registre customElements. Les éléments ne sont pas pré-rendus (pas de shadow DOM déclaratif) : le serveur envoie les balises avec leurs attributs et leur contenu light DOM, et le navigateur les met à niveau dès que les définitions sont chargées.

Le balisage rendu côté serveur s'hydrate sans incohérence, même quand les définitions sont enregistrées avant hydrateRoot() : les éléments composites (onglets et panneaux, boutons radio, options) diffèrent les attributs d'hôte qu'ils écrivent eux-mêmes (tabindex itinérant, ids générés, aria-controls / aria-labelledby, slot, hidden, data-state) jusqu'après la prochaine image d'animation et période d'inactivité. Les éléments créés par script les écrivent immédiatement.

Masquez les éléments non définis avec :not(:defined) pour éviter un flash de contenu non stylé.

### Avertissements de développement

Les combinaisons d'attributs invalides et les erreurs courantes (une valeur qui ne correspond à aucune option, min supérieur à max, un bouton composé uniquement d'une icône sans aria-label, le paquet chargé deux fois...) sont signalées avec console.error (le canal des avertissements des composants React, comme les avertissements de props de React), une fois par message, au même format que la bibliothèque React : "[minerva] : message". Les vérifications sont protégées par process.env.NODE_ENV !== "production", que les bundlers remplacent : les builds de production les suppriment. Sans bundler (le build CDN, ou un module chargé là où process n'existe pas), les avertissements sont désactivés.

### Créer vos propres éléments

Les briques des éléments Minerva sont exportées : vos propres éléments personnalisés peuvent ainsi partager leurs conventions, leur portée de thème et leur comportement d'accessibilité :

defineElement(Class) : enregistre un élément et ses dépendances statiques ; idempotent, avertit en développement lorsqu'une autre classe possède déjà la balise, sans effet en l'absence de customElements.

emit(target, name, detail, { cancelable }) : déclenche un CustomEvent minerva-* qui remonte et est composé, et renvoie false lorsqu'un écouteur a appelé preventDefault().

MinervaElement : la classe de base LitElement (static tagName, static dependencies, this.emit()).

hostStyles : règles :host partagées (box-sizing, l'attribut hidden, un utilitaire .visually-hidden).

FormAssociatedElement : classe de base des contrôles de formulaire reposant sur ElementInternals (name, disabled, required, validité, validité personnalisée, réinitialisation, fieldset et restauration de l'état).

LocaleController : les textes intégrés via le traducteur de core (this.locale.t("modal.close")), en suivant lang et .

resolveLanguage(element) : la langue prise en charge dans la portée d'un élément.

AriaController : transmet aria-label / aria-labelledby / aria-describedby et  de l'hôte vers un contrôle interne (les id ne peuvent pas traverser les shadow roots).

HasSlotController : indique si un slot nommé a du contenu, pour supprimer les conteneurs vides.

Des contrôleurs Lit au-dessus des primitives de core : FloatingLayerController (fenêtre contextuelle ancrée : position, couche refermable, zone de focus facultative), AnchoredPositionController, DismissableLayerController, FocusScopeController, ModalController (blocage du défilement et masquage du reste de la page), RovingFocusController et TypeaheadController.

popoverResetStyles : réinitialise les styles du navigateur d'un panneau popover="manual" rendu dans la top layer.

### Une page, tous les frameworks

Chaque page de composant a un sélecteur de framework (React, Vue, Angular, Svelte, Solid, HTML) dont le choix est conservé sur tout le site et dans le lien ?framework=. Les exemples Vue, Angular, Svelte, Solid et HTML exécutent les vrais custom elements ; leur source est générée au build à partir de la démo Web Component de la page (HTML + son script setup) par un transformateur déterministe, si bien que chaque framework montre toujours le même exemple, testé :

root.querySelector("#id") → une référence d'élément : ref() en Vue, #ref + @ViewChild en Angular, bind:this en Svelte, ref={el} en Solid.

el.addEventListener("minerva-change", handler) → un écouteur de template : @minerva-change, (minerva-change), onminerva-change, on:minerva-change ; le removeEventListener correspondant disparaît, le framework s'en charge.

el.items = [...] dans setup → une liaison de propriété : :items.prop, [items], items={…}, prop:items={…}.

Un élément seulement écrit via textContent (ou la value d'un ) → un état réactif rendu dans le template (ref, champ, $state, signal).

Les autres déclarations deviennent l'état et les fonctions du composant, les autres instructions s'exécutent au montage (onMounted, ngAfterViewInit, onMount) et le reste du nettoyage au démontage. Le HTML simple garde le script tel quel, avec document à la place de la racine de la démo.

Le code que les règles ne savent pas exprimer garde la fonction setup d'origine, appelée au montage avec une référence de conteneur : l'exemple généré reste correct.

### Guides

```ts
// main.ts: every element (Vite, webpack, Rspack, esbuild...)
import "minerva-design/web-components";
import "minerva-design/tokens.css";
```

```ts
// only what you use: each entry registers one element (and its parts,
// e.g. <minerva-option> with <minerva-select>) plus the Minerva elements it renders
import "minerva-design/web-components/button";
import "minerva-design/web-components/select";
import "minerva-design/web-components/modal";
```

```html
<!-- no build step: a self-contained ES module (Lit and minerva-design/core included) -->
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/minerva-design@0/dist/core/tokens.css"
/>
<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/minerva-design@0/dist/web-components/cdn/minerva.js"
></script>
<!-- unpkg works too: https://unpkg.com/minerva-design@0/dist/web-components/cdn/minerva.js -->
```

```html
<!-- attributes: strings, kebab-case; booleans are on when present -->
<minerva-input name="email" type="email" placeholder="you@example.com" clearable required></minerva-input>
<minerva-button color="danger" variant="outline" full-width>Delete</minerva-button>

<script type="module">
  const input = document.querySelector("minerva-input");
  input.value = "ada@example.com"; // properties: camelCase, any type
  input.disabled = true;

  // data (arrays, objects, functions) is set as a property only
  document.querySelector("minerva-select").options = [
    { value: "free", label: "Free" },
    { value: "pro", label: "Pro" },
  ];
</script>
```

```ts
const select = document.querySelector("minerva-select");
const output = document.querySelector("#plan-output");

// committed value change: bubbles and crosses shadow roots (composed)
select.addEventListener("minerva-change", (event) => {
  output.textContent = `Plan: ${event.detail.value}`;
});

// "controlled" pattern: open-change events are cancelable
const modal = document.querySelector("minerva-modal");
modal.addEventListener("minerva-open-change", (event) => {
  if (!event.detail.open && hasUnsavedChanges()) {
    event.preventDefault(); // the modal stays open
  }
});
```

```html
<minerva-modal label="Delete project?">
  <p>This cannot be undone.</p>
  <div slot="footer">
    <minerva-button variant="ghost">Cancel</minerva-button>
    <minerva-button color="danger">Delete</minerva-button>
  </div>
</minerva-modal>

<style>
  /* style the parts an element exposes (::part) in its states (:state) */
  minerva-modal:state(open)::part(content) {
    border-radius: 24px;
  }
  minerva-input::part(input) {
    font-variant-numeric: tabular-nums;
  }
</style>
```

```ts
// every element is in HTMLElementTagNameMap: querySelector is typed
const select = document.querySelector("minerva-select"); // MinervaSelect | null
const output = document.querySelector("output"); // HTMLOutputElement | null
select?.addEventListener("minerva-change", () => {
  if (output) output.value = select.value; // string
});

// element classes and their string-literal unions are exported
import type { MinervaButton, ButtonVariant } from "minerva-design/web-components";
```

```ts
// React 19 (global.d.ts)
/// <reference types="minerva-design/web-components/react" />

// Svelte 5 (src/app.d.ts)
/// <reference types="minerva-design/web-components/svelte" />

// Solid (global.d.ts)
/// <reference types="minerva-design/web-components/solid" />

// Vue / Volar (tsconfig.json)
{ "compilerOptions": { "types": ["minerva-design/web-components/vue"] } }
```

```json
// .vscode/settings.json: completion and hover docs in .html files
{
  "html.customData": [
    "./node_modules/minerva-design/dist/web-components/html-custom-data.json"
  ]
}
```

```tsx
// global.d.ts
/// <reference types="minerva-design/web-components/react" />

// Settings.tsx
import { useState } from "react";
import "minerva-design/web-components/switch";

export function Settings() {
  const [on, setOn] = useState(false);
  return (
    <minerva-switch
      label="Email notifications"
      checked={on} // a property: React 19 passes it as is
      onminerva-change={(e: CustomEvent<{ checked: boolean }>) =>
        setOn(e.detail.checked)
      }
    />
  );
}
```

```ts
// Safe on the server: nothing touches the DOM when the module loads, and
// defineElement() skips registration when there is no customElements registry.
import "minerva-design/web-components";

// The markup is sent as is and upgraded in the browser:
// :where(minerva-select, minerva-tabs):not(:defined) { visibility: hidden; }
```

```ts
// Logged in development only, once per message:
// [minerva] <minerva-tabs>: value "billing" does not match any <minerva-tab>.

// Vite, webpack, Rollup (+ replace) and esbuild (define) replace
// process.env.NODE_ENV: production bundles drop the checks and messages.
// The CDN bundle is built for production: no warnings.
```

```ts
import { html, css } from "lit";
import {
  MinervaElement,
  RovingFocusController,
  defineElement,
  hostStyles,
} from "minerva-design/web-components";

/** A toolbar: one Tab stop, arrow keys / Home / End move between buttons. */
export class AppToolbar extends MinervaElement {
  static override tagName = "app-toolbar";
  static override styles = [
    hostStyles,
    css`
      :host {
        display: flex;
        gap: var(--space-2, 8px);
      }
    `,
  ];

  // core's createRovingFocus, attached / destroyed with the element
  private readonly roving = new RovingFocusController(this, () => ({
    getItems: () => [...this.querySelectorAll<HTMLElement>("minerva-button")],
    orientation: "horizontal",
  }));

  override connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "toolbar");
  }

  protected override firstUpdated() {
    this.roving.attach(this);
  }

  protected override render() {
    return html`<slot @slotchange=${() => this.roving.refresh()}></slot>`;
  }
}

defineElement(AppToolbar); // idempotent, no-op without customElements
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

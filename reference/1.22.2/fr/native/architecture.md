# Architecture

React, Vue, Angular, Web Components, React Native, Taro, WeChat natif et uni-app partagent un cœur indépendant de la plateforme ; les moteurs Web ajoutent les primitives DOM.

Package: minerva-design@1.22.2

Renderer: native

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.2",
  "sourceCommit": "b19e53ff0733e666aa205d6fd5bebb89b1eef18d",
  "sourceDigest": "sha256:080b482abbb8d2745bf31d68a17d7a1299cbb89f0e3f8c1a4d1d91bdeb04d1be",
  "referenceSourceDigest": "sha256:2a0069aef643875e6528da29db3ea67e23924d3d3dcad8f2f45e0400ede619c0"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.2/types.json) or getType() from minerva-design/contracts.

## Documentation

### Paquets

Minerva est un monorepo pnpm qui publie un seul paquet, minerva-design, avec une entrée par moteur de rendu. Le comportement (machines à états headless), les contrats de composants, les jetons de design, les données de thème et les traductions sont écrits une seule fois dans le cœur ; les moteurs de rendu se chargent uniquement du rendu.

Paquet

L’API web du cœur : tout le cœur indépendant de la plateforme (dist/core) plus les primitives de la couche DOM (dist/dom) : portées de focus, pile de couches refermables, verrouillage du défilement, masquage du reste de la page, focus itinérant, positionnement, hôtes de portail, cookies de thème et script d’initialisation sans flash. Même API qu’avant la séparation.

La bibliothèque de composants React 19. Les composants utilisent de fins hooks au-dessus des primitives du cœur (src/internal), si bien que toutes les surcouches partagent une seule implémentation. Elle réexporte les utilitaires et types de thème de son API publique et intègre les jetons du cœur dans style.css.

Des éléments personnalisés Lit qui implémentent l'ensemble des composants, avec ou sans framework. Leur comportement vient des mêmes primitives du cœur via des contrôleurs Lit, et ils compilent les feuilles de style de la bibliothèque React dans leur shadow root : les deux bibliothèques ont le même rendu et le même comportement.

Deux couches internes l’implémentent, construites à partir de paquets privés du workspace. Les moteurs natifs (React Native, mini-programmes) n’utilisent que la première : aucun code DOM ne les atteint.

Couches internes

TypeScript indépendant de la plateforme, sans accès au DOM (garanti par des règles de lint et un test dans un environnement Node sans Intl.PluralRules) : machines à états headless, contrats de composants, jetons de design (source TypeScript, tokens.css / tokens.mini.css générés, resolveTokens pour des valeurs concrètes), types de thème, palettes et préréglages de design, messages i18n et traducteur, calculs de navigation au clavier et de recherche par saisie, identifiants, état contrôlable, validation et assainissement des URL.

La partie DOM des moteurs web : portée de focus, couches refermables, verrouillage du défilement, masquage du reste de la page, liaison DOM du focus itinérant, positionnement avec @floating-ui/dom, hôtes de portail, zone de tolérance du pointeur, presence (animations de sortie), sens de lecture et utilitaires DOM / cookies du thème.

### Plateformes

Chaque moteur possède son entrée minerva-design. Le Web utilise les primitives DOM, React Native des styles natifs résolus, et les mini-programmes des jetons CSS limités par classe. Les statuts proviennent de la matrice des composants.

Plateforme

Entrée

Moteur de rendu

Couches partagées

Statut

Stable

Prévu

Prise en charge composant par composant : voir Plateformes prises en charge.

React (web)

Composants React 19 pour le DOM, prêts pour le SSR / les RSC

Web Components

Éléments personnalisés Lit, avec ou sans framework

Vue 3

Composants monofichiers natifs (en attendant : les Web Components)

Angular

Composants autonomes natifs avec signals (en attendant : les Web Components)

React Native + Expo

Composants React Native, jetons résolus par resolveTokens

Taro

Composants en syntaxe React pour les mini-programmes et H5, tokens.mini.css

Mini-programme WeChat

Composants personnalisés natifs (WXML / WXSS), tokens.mini.css

uni-app

Composants Vue 3 avec les composants intégrés d’uni-app, tokens.mini.css

Beta

### Couche headless partagée

Les contrats, jetons et états partagés réduisent les écarts ; chaque moteur gère son rendu et son intégration à l’hôte.

Machines à états (core/machines) : des stores { getState, send, subscribe } indépendants de tout framework pour l’ouverture / fermeture et presence, la file des toasts, la sélection, les onglets, les colonnes de sélecteur, les champs et leur validation, la pagination, la notation, le champ numérique à pas et les interrupteurs. Les toasts, onglets, la pagination et la notation React et Web Components les utilisent déjà.

Contrats de composants (core/contracts) : métadonnées d’exécution par composant (props avec valeurs d’énumération et valeurs par défaut, événements, slots, cibles, statut de prise en charge par plateforme), vérifiées par rapport aux types React et à custom-elements.json.

Jetons de design : des données TypeScript génèrent tokens.css (identique octet pour octet à l’ancienne sortie Sass), un tokens.mini.css à base de classes pour les mini-programmes (découpé par palette) et resolveTokens() avec un color-mix sRGB conforme au CSS.

Les tests de contrats, tests unitaires des moteurs et tests navigateur vérifient les API documentées. Consultez Plateformes pour les limites des validations SDK, simulateur et appareil.

### Primitives DOM

Les primitives DOM (dist/dom) sont de petites fonctions qui agissent sur des éléments du DOM et renvoient une fonction de nettoyage ou un contrôleur. Elles gèrent l’imbrication : une pile décide quelle surcouche réagit en premier. Leurs parties indépendantes de la plateforme (navigation au clavier, recherche par saisie, état contrôlable) se trouvent dans le cœur (dist/core).

createFocusScope : focus à l’ouverture, piégeage de Tab en boucle, focus rendu à l’élément d’origine à la fermeture ; une portée imbriquée met la portée parente en pause.

createDismissableLayer : Échap, un appui du pointeur à l’extérieur ou un focus à l’extérieur ne ferment que la couche du dessus ; un clic dans une couche enfant (sous-menu, Select dans une Modal) ne ferme jamais ses parents.

lockScroll : verrouillage du défilement de la page avec compteur de références, qui compense la largeur de la barre de défilement.

hideOthers : masque tout sauf la fenêtre modale aux technologies d’assistance (aria-hidden ou inert), avec une restauration correcte quand les modales s’imbriquent.

getNextIndex et createTypeahead (cœur) avec createRovingFocus (DOM) : touches fléchées, Début / Fin, bouclage, orientation, écriture de droite à gauche et recherche par saisie pour les menus, listes et onglets.

computeAnchoredPosition / autoPosition : placement ancré avec décalage, retournement, glissement, taille et flèche, maintenu pendant le défilement et le redimensionnement.

createPointerGrace : le triangle de sécurité qui garde un sous-menu ouvert pendant que le pointeur se dirige vers lui.

getPortalContainer / createPortalHost : où les surcouches sont rendues ; les ConfigProvider imbriqués créent un hôte de portail par portée de thème.

createId et createControllableState : identifiants uniques et état contrôlé / non contrôlé sans framework.

Utilitaires de thème : lecture des cookies, script d’initialisation sans flash, palettes et jetons de design.

### Une seule implémentation pour toutes les surcouches

Modal, Drawer, la navigation mobile d’AppShell, Popover, Tooltip, Menu, ContextMenu, Select, AutoComplete, Cascader et TimePicker s’enregistrent tous dans la même pile de couches et utilisent la même gestion du focus et le même positionnement. Échap ferme toujours d’abord la surcouche la plus interne, et le focus revient d’où il venait.

Tous sont rendus dans le conteneur de portail de la portée de thème la plus proche : un ConfigProvider imbriqué avec son propre thème l’applique aussi à ses fenêtres surgissantes.

### Dépendances

Floating UI (@floating-ui/dom) est la seule dépendance d’interaction tierce, utilisée uniquement dans le module de positionnement de la couche DOM (dist/dom). Il n’y a ni Radix UI ni autre bibliothèque headless : Slot / asChild, Tabs, les boîtes de dialogue, les menus et la liste déroulante sont développés dans ce dépôt et testés avec Vitest, happy-dom, Testing Library et user-event.

### Implémentation et validation

Tous les moteurs listés contiennent des implémentations. Beta indique leur maturité actuelle, sans certifier les appareils physiques ni la production. La matrice précise le statut de chaque composant.

Cœur partagé et couche DOM : états, contrats, jetons, traductions et infrastructure de test implémentés.

Vue 3 et Angular : moteurs natifs et exemples exécutables implémentés.

React Native et Expo : composants natifs et contrôles sur simulateur disponibles ; validation sur appareil physique et paquet Release autonome encore ouverte.

Taro, WeChat natif et uni-app : implémentations, compilation officielle ciblant WeChat et contrôles navigateur/simulateur documentés disponibles.

Préréglages tactiles et extensions mobiles : utilisez les API de chaque plateforme en respectant les limites documentées de l’hôte et de la validation.

### Étapes suivantes

Installer les paquets et importer la feuille de style.

Utiliser les éléments personnalisés en HTML simple, Vue, Angular ou Svelte.

### Métadonnées des composants pour les outils

Le point d’entrée contracts en lecture seule décrit les imports, propriétés, événements, slots et liaisons par moteur de rendu. Consultez les types référencés à la demande. Il ne dépend ni de React ni du DOM.

```tsx
import { contractsMetadata, getRendererContract, getType } from "minerva-design/contracts";

const input = getRendererContract("Input", "vue");
console.log(input?.import, input?.bindings);
const value = input?.props?.find(prop => prop.name === "modelValue");
const type = value?.typeRef ? getType(value.typeRef) : undefined;
console.log(contractsMetadata.packageVersion, type);
```

schemaVersion identifie le format et packageVersion la version du paquet. sourceCommit est la base de génération ; sourceDigest identifie le contenu exact. L’index texte fournit aussi Markdown / JSON statiques et des exemples complets.

```text
core (dist/core)   platform-neutral TypeScript (no DOM): React Native, mini-programs, Node
  ├─ headless state machines (machines/): disclosure, toast queue, tabs, selection, field...
  ├─ component contracts (contracts/): props, events, slots, platform support
  ├─ tokens: TypeScript source → tokens.css, tokens.mini.css, resolveTokens()
  └─ theme data, design presets, i18n messages + translator, pure helpers
        ▲
        │                             web only
        │   dom (dist/dom)   focus scope, layers, scroll lock, roving focus,
        │        ▲         positioning (@floating-ui/dom), portal, theme DOM helpers
        │        │
 ┌──────┴────────┴──────────────┬─────────────────────────┬──────────────────────┐
 minerva-design         minerva-design/web-components   minerva-design/vue · /angular
 React 19 (DOM)         Lit custom elements             (native renderers)
        │
 minerva-design/native · /taro · /uni · miniprogram → dist/weapp   (native host renderers)

minerva-design/core = core + dom (the web API)
```

```ts
import { createDismissableLayer, createFocusScope, lockScroll } from "minerva-design/core";

// A framework-free modal: trap focus, dismiss on Escape / outside click,
// lock page scroll. Every React overlay is built from the same pieces.
const scope = createFocusScope(dialog, { trapped: true, loop: true });
const layer = createDismissableLayer(dialog, { onDismiss: close });
const unlock = lockScroll();
scope.activate();

function close() {
  layer.destroy();
  scope.deactivate(); // restores focus to the opener
  unlock();
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

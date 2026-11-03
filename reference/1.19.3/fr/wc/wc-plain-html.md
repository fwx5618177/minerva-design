# HTML simple

Une page complète sans étape de build : le bundle CDN, les design tokens, <minerva-config>, un formulaire validé et des écouteurs d'événements. Des import maps pour les modules par élément.

Package: minerva-design@1.19.3

Renderer: wc

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "19932861fda2d088219d708a8ca132bea760a32b",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:c2b9c6e66069aa1acd454efc20d52cde92c1a1c820c1b3ab5302d01929cb4c39"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

### Une page complète

Deux balises dans le  suffisent : la feuille de style des design tokens et le bundle de modules autonome (tous les éléments, Lit et minerva-design/core). Copiez ce fichier et ouvrez-le dans un navigateur :

tokens.css définit les design tokens (couleurs, espacements, rayons, polices) que les éléments et votre propre CSS peuvent utiliser avec var().

 avec root applique le thème (ici, celui du système d'exploitation), la palette et la langue des textes intégrés à tout le document.

Les contrôles sont associés aux formulaires : name, required, les attributs value / checked, , les boutons type="submit" et type="reset", FormData et la validation du navigateur fonctionnent comme avec les champs natifs. L'événement submit n'est déclenché qu'une fois tous les contrôles valides.

Les événements minerva-* remontent : un seul écouteur sur le formulaire (ou sur document) reçoit donc les changements de tous les contrôles ; event.target est l'élément et event.detail contient la nouvelle valeur.

Définir une propriété depuis un script (modal.open = true) ne déclenche jamais d'événement ; le bouton de fermeture et la touche Échap ferment la modale et déclenchent minerva-open-change.

### Modules par élément avec une import map

Le bundle CDN contient tous les éléments. Pour ne télécharger que les éléments utilisés par une page, chargez plutôt les modules par élément du paquet (dist/elements/.js). Ce sont les fichiers qu'utilisent les bundlers, avec des imports nus de leurs dépendances, qu'une import map résout dans le navigateur :

Les modules importent lit (y compris lit/decorators.js et lit/directives/*, d'où le préfixe "lit/"), minerva-design/core (qui dépend lui-même de @floating-ui/dom) et, pour l'aperçu HTML et le champ JSON uniquement, dompurify et jsonc-parser. esm.sh résout pour vous les dépendances de ces paquets ; si vous hébergez les fichiers vous-même, mappez aussi @floating-ui/dom, @floating-ui/core et @floating-ui/utils.

En production, utilisez des versions exactes et assurez-vous que chaque module charge la même copie de lit et de minerva-design/core : mélanger le bundle CDN et les modules par élément sur une même page télécharge deux fois le code partagé, et chaque balise conserve la première définition qui l'a enregistrée.

### Étapes suivantes

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

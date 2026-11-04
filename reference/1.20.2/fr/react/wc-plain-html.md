# HTML simple

Une page complète sans étape de build : le bundle CDN, les design tokens, <minerva-config>, un formulaire validé et des écouteurs d'événements. Des import maps pour les modules par élément.

Package: minerva-design@1.20.2

Renderer: react

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.2",
  "sourceCommit": "8d5d0df3644b1fa1c267b3dd6809b0e7eb1ce75b",
  "sourceDigest": "sha256:2862a9e3a864c9423aed5d287db6fac7e8ddf58b9f5d144c61e7ff4a2630890e",
  "referenceSourceDigest": "sha256:b329acf9d5eb6cf4b4b42169ce925c67b033f581b616664bf07fc6d664de45f0"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.2/types.json) or getType() from minerva-design/contracts.

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

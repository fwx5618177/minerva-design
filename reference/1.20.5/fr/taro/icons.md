# Icônes

Le jeu d’icônes de Minerva : des icônes originales dessinées pour la bibliothèque sur une grille 24×24, rendues en SVG inline par défaut et aussi dessinées sur des canvas Canvas2D, WebGL, WebGL2 ou WebGPU.

Package: minerva-design@1.20.5

Renderer: taro

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.5",
  "sourceCommit": "fe15b45f84b480cdd9cfec147df037927ba34a6b",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:0dc58bd28a1a59067b94630bd49c5b94d839bdc57ee30a0eaa7de1d0a9681cfb"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.5/types.json) or getType() from minerva-design/contracts.

## Documentation

### Vue d’ensemble

minerva-design/icons fournit {{count}} icônes réparties en {{categories}} catégories, sans jeu d’icônes tiers : chaque icône est une donnée de tracé SVG propre à la bibliothèque, la même pour tous les rendus et tous les frameworks.

Un seul langage visuel : une grille 24×24 avec environ 2px de marge, des traits de 2px aux extrémités et jointures arrondies, sans remplissage, pour que les icônes s’accordent au texte et s’adaptent de 12 à 96 pixels. Certaines icônes ont une couleur par trait (colors) ; les autres suivent la propriété color.

SVG par défaut : net à toutes les tailles, rendu côté serveur, coloré par la couleur du texte (currentColor), masqué aux technologies d’assistance sauf s’il reçoit un title.

La même géométrie sur le GPU : Icon dessine sur un canvas avec renderer="auto", "webgpu", "webgl2", "webgl" ou "canvas2d", et IconCanvas dessine des milliers d’icônes en quelques dessins instanciés, avec la chaîne de repli des graphiques WebGPU -> WebGL2 -> WebGL -> Canvas2D.

Ne payez que ce que vous utilisez : chaque icône a sa propre constante (searchIcon) et son propre composant (SearchIcon), et les rendus canvas ne se chargent qu’avec la première icône canvas.

Un cœur sans framework : minerva-design/icons/core contient les données des icônes, les chaînes SVG, le dessin Canvas2D et les canvas GPU pour n’importe quel framework ; les composants React reposent dessus.

Voir Icon pour le composant, IconCanvas pour les lots GPU et Cœur des icônes pour l’API sans framework.

Rechercher des icônes

Rechercher par nom ou par tag…

Catégorie

Toutes les catégories

Taille

Épaisseur du trait

Rendu

SVG

Canvas

Copier {{code}}

{{code}} copié

Impossible de copier {{code}} : le presse-papiers est indisponible

Type

Tous les types

Monochromes

Multicolores

Couleur

Couleur du texte

Primaire

Succès

Avertissement

Danger

{{n}} icônes

Aucune icône ne correspond à « {{query}} »

Flèches

Actions

Interface

Médias

Fichiers

Communication

Données et graphiques

Finance

État

Appareils

Météo

Nature

Alimentation

Personnes

Lieux

Formes

Texte

Éducation

Santé

Achats

Musique

Outils

Sports

```tsx
import { SearchIcon, SettingsIcon } from "minerva-design/icons";

<SearchIcon />                                  // 24px, currentColor, 2px stroke
<SettingsIcon size={16} title="Settings" />     // labelled: role="img"
<SearchIcon renderer="webgl2" />               // drawn by the GPU on a canvas
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

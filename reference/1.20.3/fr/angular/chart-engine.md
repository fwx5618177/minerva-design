# Moteur de graphiques

Le moteur sans framework derrière les graphiques React : createChart monte un graphique dans n’importe quel élément, createCanvasChart dessine sur n’importe quel canvas 2D (mini-programmes, OffscreenCanvas) et createChartController calcule la scène pour les hôtes sans canvas. createShapeChart et createCanvasShapeChart font de même pour les graphiques en secteurs, anneau, radar, jauge, entonnoir, treemap, rayons de soleil, Sankey, accords, barres radiales, à puces et le calendrier thermique. Les autres familles ont leur propre moteur : createTradingChart, createDepthChart / createOrderBook / createOrderBookHeatmap / createTimeAndSales, createChart3D et createGraphChart ; setDefaultChartRenderer() définit le moteur de rendu de tous les graphiques GPU.

Package: minerva-design@1.20.3

Renderer: angular

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.3",
  "sourceCommit": "ea7fb3e1f55d184b7d737316e9ae829f4f7ff223",
  "sourceDigest": "sha256:c9540edc3908d226375a01cf5e6bfe8ca6a4e20440f736c0dd9b40ae9ff2e645",
  "referenceSourceDigest": "sha256:4cf6057856184f16240d0d22153ec370842fc7a2dfaaa66364e189fed89e6ca3"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.3/types.json) or getType() from minerva-design/contracts.

## Documentation

#### Quel point d’entrée choisir ?

Les trois points d’entrée partagent les mêmes options, la mise en page, la détection des points et les gestes ; ils diffèrent par ce qu’ils demandent à l’hôte :

createChart(container, options) : les pages web. Il monte le graphique dans un élément du DOM, dessine les données avec WebGPU, puis WebGL2, puis WebGL, puis Canvas2D, affiche une infobulle et une légende DOM accessibles, lit le thème dans les variables CSS et gère lui-même la molette, le pointeur et le clavier.

createCanvasChart({ canvas, width, height, pixelRatio, options, theme }) : n’importe quel canvas 2D, sans aucun DOM (canvas type="2d" de WeChat / Taro / uni-app, OffscreenCanvas, simple ). Tout est dessiné sur le canvas, infobulle et légende comprises ; l’hôte transmet ses événements tactiles ou de pointeur et fournit le thème sous forme de valeurs. Les graphiques des mini-programmes reposent dessus.

createChartController({ options, measureText }) : aucun canvas. Il calcule la scène (mise en page, graduations, légende, infobulle, mise en évidence) et gère les gestes ; scenePrimitives(scene) convertit les données en une liste bornée de formes en pixels pour les hôtes qui dessinent avec des vues ou du SVG. Les graphiques React Native reposent dessus.

#### Utilitaires de quadrants

quadrantChartOptions(config) construit les options moteur d’un QuadrantChart pour n’importe quel point d’entrée ; quadrantOf(config, x, y) renvoie le quadrant d’une position de données tel qu’affiché à l’écran (reverseX compris) et quadrantCenter(config, corner) le centre d’un quadrant, p. ex. pour placer un point ajouté ou déposé. quadrantGroups(config) liste les points et indices de chaque quadrant, quadrantCountText(showCounts, points, locale) formate le nombre de points d’un quadrant et quadrantLabels(locale) renvoie les textes intégrés de la couche de points accessible. createQuadrantPointLayer(host, options) monte cette couche (une liste de boutons de points par quadrant, flèches pour passer d’un point à l’autre, Maj + flèches pour déplacer le point ciblé vers le quadrant voisin, une région live qui annonce le déplacement) dans n’importe quel rendu DOM ; createQuadrantPointCard(host, options) monte la carte de point des matrices dans n’importe quel rendu DOM (une carte en verre pour le point survolé, ciblé ou déplacé, ou le point sélectionné sur les tableaux : son point, son nom, son quadrant et les actions de l’hôte) et withQuadrantCard(options) désactive l’infobulle, la pastille de libellé et l’étiquette de glissement du moteur à côté ; QUADRANT_CARD_LINGER_MS est la durée pendant laquelle la carte reste après que le pointeur a quitté son point ; quadrantKeyTarget(event, corner) renvoie le quadrant atteint par Maj + une flèche et quadrantAccessibleGroups(config, locale) les noms, libellés et actions de déplacement des points pour les hôtes sans DOM. Les tableaux de tâches (le QuadrantTaskBoard de chaque moteur de rendu) partagent eux aussi leur logique : QUADRANT_CORNERS liste les quatre coins, quadrantTaskLabels(locale, overrides) renvoie les textes traduits des boutons et des panneaux, newQuadrantTaskDraft / editQuadrantTaskDraft remplissent le panneau d’ajout / de modification, canSaveQuadrantTask et applyQuadrantTaskDraft la vérifient et l’appliquent, moveQuadrantTask et removeQuadrantTask renvoient la nouvelle liste de points, selectionAfterRemove la sélection après une suppression, quadrantTaskDeleteText le texte de la confirmation de suppression, QUADRANT_TASK_ICONS les tracés des icônes d’ajout, de modification et de suppression, placeQuadrantTaskPanel(anchor, panel, board) la place du panneau d’ajout / de modification / de suppression à côté de son ancre (dessous, au-dessus faute de place, dans les limites du tableau) quadrantTaskColor(quadrants, corner) la couleur d’un quadrant et quadrantTaskIconUri(kind, color) l’une de ces icônes en URI data SVG base64 pour les hôtes qui la dessinent dans une image (mini-programmes).

Téléchargements

Téléchargements par version

non pris en charge

{{release}} : {{downloads}} téléchargements

Cliquez sur une barre

Moteur de rendu : {{renderer}}

Visites

Inscriptions (×10)

Visites et inscriptions par mois

Cliquez sur un point

Recherche

Accès direct

Réseaux sociaux

E-mail

Sites référents

Visites

Inscriptions

Essais

Clients

Visites par source

visites

Entonnoir de conversion

Secteurs

Anneau

Entonnoir

{{name}} : {{value}} ({{share}})

Cliquez sur une part ou une étape

Processeur

Secondes

Utilisation du processeur en direct

Reprendre

Pause

En pause · {{points}} points reçus

En direct · {{points}} points reçus

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

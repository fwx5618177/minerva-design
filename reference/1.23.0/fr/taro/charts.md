# Graphiques

Des graphiques accélérés par le GPU (WebGPU, WebGL2 ou WebGL, avec Canvas2D en repli) qui restent à 60 fps avec des millions de points : tendances, comparaisons, statistiques, parts d’un tout, hiérarchies et flux, réseaux, dépendances et arbres, finance et trading, et 3D. Chart combine des séries en lignes, aires, barres, points, chandeliers et cartes de chaleur ; les autres composants sont des préréglages pour un type de graphique. Commencez par les galeries ci-dessous : une miniature interactive de chaque type de graphique, avec un lien vers sa page.

Package: minerva-design@1.23.0

Renderer: taro

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

#### Comment le rendu fonctionne

La couche de données est dessinée avec WebGPU, puis WebGL2, WebGL et Canvas2D en repli (renderer="auto") ; l’élément racine reçoit data-renderer une fois prêt. Un graphique empile quatre couches :

Fond Canvas2D : grille, axes et zones d’annotation

Couche de données GPU : lignes, aires, barres et points

Surcouche Canvas2D : libellés des graduations et des points, surbrillance

DOM : infobulle et légende (texte sélectionnable et accessible)

#### Grands volumes

Passez les grandes séries en colonnes de tableaux typés ({ x: Float64Array, y: Float64Array }) : aucun objet n’est créé par point. Quand x est trié, la détection du survol est une recherche dichotomique et seule la plage visible est dessinée : une ligne ou un nuage d’un million de points reste à 60 fps en WebGPU, WebGL2 et WebGL.

#### Interaction et clavier

Ctrl / ⌘ + molette ou un pincement sur le trackpad zoome (la molette seule fait défiler la page), le glisser déplace la vue zoomée et le double-clic la réinitialise.

Donnez le focus au graphique : ← / → déplacent le point en surbrillance (annoncé aux lecteurs d’écran), + / - zooment, 0 réinitialise et Esc efface.

#### Thème et moteur

Les couleurs viennent des variables CSS de Minerva : --chart-series-1..8 si elles sont définies, sinon les couleurs du thème (--primary-color, --success-color...). Les changements de thème sont pris en compte automatiquement.

minerva-design/charts/core est le même moteur sans React : createChart(container, options) fonctionne avec n’importe quel framework.

#### Familles de graphiques

Chaque type de graphique est présenté ci-dessous en miniature interactive, en six galeries ; chaque légende renvoie à la page du graphique :

2D de base : courbes, aires, aires de plage, barres, barres horizontales, graphiques combinés / à double axe, nuages de points, bulles et sparklines.

Statistiques, indicateurs et planification : histogramme, boîte à moustaches, cascade, carte de chaleur, calendrier thermique, jauge, graphique à puces, barres radiales et diagramme de Gantt.

Parts d’un tout, hiérarchies et flux : secteurs et anneau, radar, entonnoir, matrice à quadrants, treemap, rayons de soleil et Sankey.

Graphes et hiérarchies : graphes de relations (dispositions par forces, circulaire et en arcs, dessinés par le GPU jusqu’à des dizaines de milliers de nœuds), graphes de dépendances (DAG en couches avec le chemin critique), arbres (arbres ordonnés et radiaux, cartes mentales, organigrammes) et diagrammes d’accords.

Finance et trading : chandeliers, le graphique de trading (profil de volume, outils de dessin, relecture des barres, graphiques synchronisés et saisie d’ordres) avec 21 indicateurs techniques intégrés (MA / EMA / WMA, Bollinger, VWAP, volume, MACD, RSI, KDJ, ATR, SAR parabolique, Ichimoku, SuperTrend, Keltner, Donchian, OBV, CCI, RSI stochastique, DMI, Williams %R, MFI), le graphique de profondeur, le carnet d’ordres, sa carte de chaleur et le ruban des transactions.

3D : nuages de points et lignes 3D (y compris des nuages lumineux en mélange additif), surfaces 3D et barres 3D.

Les miniatures ne sont montées que lorsqu’elles approchent de la zone visible (IntersectionObserver) : la page reste rapide et ne garde jamais plus de contextes GPU que le navigateur n’en autorise. Les widgets du carnet d’ordres diffusent un marché simulé et se mettent en pause hors de l’écran.

Les graphiques GPU choisissent leur moteur de rendu en quatre niveaux, WebGPU → WebGL2 → WebGL → Canvas2D : ils s’affichent dans tous les navigateurs et survivent à la perte du GPU. setDefaultChartRenderer() change d’un coup le moteur par défaut de tous les graphiques : le sélecteur de rendu épinglé sur les pages de graphiques de cette documentation l’utilise. Voir les pages moteur de graphiques et performances.

Chiffre d'affaires

Objectif

Chiffre d'affaires mensuel face à l'objectif

Latence p95

Plage normale

Déploiement

SLO {{value}}

Minutes

Latence p95 avec le SLO et la plage normale

{{month}} : {{value}} ({{series}})

Touchez une barre ou la ligne

Marche aléatoire

Moteur de rendu

Marche aléatoire de 50 000 points

Demandé : {{requested}} · dessiné avec : {{active}}

Visites

Inscriptions

Web

Commandes

T{{n}}

Équipe {{name}}

Gratuit

Pro

Équipe

Rapidité

Qualité

Coût

Support

Échelle

Fournisseur {{name}}

Visite

Inscription

Activation

Paiement

Produit

Design

Ingénierie

Mise sur le marché

Ventes

Marketing

Version

Feuille de route

E-mails

Rangement

Planifier

Faire d'abord

Abandonner

Déléguer

##### Graphique linéaire

Tendances

Visites et inscriptions par mois

##### Graphique en aires

Lissé, empilé

Utilisateurs par plateforme, empilés

##### Graphique à barres

Libellés de valeur, couleur par barre

Commandes par trimestre

##### Nuage de points

Corrélations, groupes

Deux groupes de mesures

##### Graphique en chandeliers

Ouverture, plus haut, plus bas, clôture

Cours quotidiens

##### Carte de chaleur

Des valeurs sur une grille

Charge par jour et par heure

##### Sparkline

Tendances de la taille d'un mot

##### Graphique circulaire

Parts

Parts des navigateurs

##### Graphique en anneau

Parts avec un total

Utilisateurs par offre

##### Graphique radar

Profils sur plusieurs axes

Comparaison de fournisseurs

##### Jauge

Une valeur face à un objectif

##### Entonnoir

Étapes et conversion

Entonnoir d'inscription

##### Treemap

Parts d'un tout hiérarchique

Budget par service

##### Matrice à quadrants

Matrice de priorités

Tâches selon l'urgence et l'importance

##### Aire de plage

Bandes min–max, prévisions

Températures minimales et maximales moyennes par mois

##### Diagramme en barres horizontales

Classements, libellés longs

Part des développeurs utilisant chaque langage

##### Graphique combiné

Barres et courbe sur deux axes

Chiffre d’affaires et croissance par trimestre

##### Graphique à bulles

Une troisième valeur en taille

Campagnes par coût, inscriptions et portée

##### Histogramme

Distributions

Distribution des temps de réponse

##### Boîte à moustaches

Quartiles et valeurs aberrantes

Temps de réponse par service

##### Graphique en cascade

Contributions à un total

Passage du revenu récurrent annuel

##### Calendrier thermique

Activité quotidienne

Commits par jour

##### Graphique à puces

Indicateurs face aux objectifs

Indicateurs du trimestre face à leurs objectifs

##### Barres radiales

Anneaux de progression

Avancement des objectifs du trimestre

##### Diagramme de Gantt

Planning et avancement

Plan de livraison

##### Diagramme en rayons de soleil

Hiérarchies imbriquées

Effectifs par département et équipe

##### Diagramme de Sankey

Flux entre étapes

Visites de chaque source jusqu’aux inscriptions

##### Graphique de trading

Bougies, profil de volume, zoom

Cours horaire BTC/USDT avec une moyenne mobile, le volume et un profil de volume

##### Indicateurs techniques

21 indicateurs

Cours journalier BTC/USDT avec SuperTrend et le MACD

##### Graphique de profondeur

Offres et demandes cumulées

Profondeur de marché en direct

##### Carnet d'ordres

Échelle de prix en direct

Carnet d’ordres en direct

##### Carte de chaleur du carnet

Liquidité dans le temps

Carte de chaleur de la liquidité des 30 dernières secondes

##### Ruban des transactions

Flux des transactions

Dernières transactions

##### Nuage de points 3D

Groupes en trois dimensions

Trois groupes de points en 3D

##### Courbe 3D

Trajectoires

Trajectoire en spirale en 3D

##### Surface 3D

z = f(x, y), reliefs

Surface en ondulations

##### Histogramme 3D

Valeurs sur une grille de catégories

Ventes par région et trimestre

##### Graphe de relations

Appels entre services

Réseau de microservices et des appels entre eux

##### Diagramme en arcs

Sujets cités ensemble

Sujets de support reliés selon leur fréquence dans un même ticket

##### Graphe de dépendances

Pipeline et chemin critique

Étapes d’un pipeline de données et leurs dépendances, avec le chemin critique

##### Organigramme

Liens hiérarchiques

Organigramme du PDG jusqu’aux équipes

##### Carte mentale

Idées autour d’un thème

Carte mentale d’un voyage d’été

##### Diagramme d’accords

Flux entre groupes

Clients passant d’une offre à l’autre en un trimestre

##### Points 3D lumineux

Halo additif

Galaxie spirale d’étoiles lumineuses

Charge

Chiffre d'affaires

Tendance du chiffre d'affaires

Erreurs

Tendance des erreurs

Utilisateurs

Score de disponibilité

Urgence

Importance

Nouveaux visiteurs

Visiteurs récurrents

Mobile

Ordinateur

Tablette

Pages vues

Visiteurs

Commandes

Taux de conversion

{{metric}}, 30 derniers jours

Nouveaux visiteurs et visiteurs récurrents par jour, empilés

Visiteurs par appareil

Pages les plus vues

E-mail

Chat

Téléphone

Réseaux sociaux

Communauté

Palette

Thème

Adaptée aux daltoniens

Bleus

Tons chauds

Demandes de support par trimestre et par canal

Part des demandes de support par canal

Température

Développeurs

Croissance

Portée

Passerelle

Recherche

Paiement

Images

Année dernière

Nouveaux clients

Expansion

Attrition

Prix

Cette année

Chiffre d’affaires (k$)

Marge (%)

Satisfaction

Chiffre d’affaires

Utilisateurs actifs

Rétention

Recherche

Conception

Développement

Tests

Faible

Moyen

Bon

Max

Q3

Médiane

Q1

Min

Valeurs aberrantes

Requêtes

Temps de réponse

Montant

Aujourd’hui

Tâches

Avancement

Ingénierie

Plateforme

Web

Mobile

Ventes

EMEA

Amériques

Opérations

Support

Finance

Recherche

Réseaux sociaux

E-mail

Site web

Inscrits

Partis

{{value}} personnes

Cours

Ouverture

Plus haut

Plus bas

Clôture

Groupe {{name}}

Trajectoire

Ondulations

Ventes

Nord

Sud

Est

Ouest

{{value}} clients

Noyau

Bras

Passerelle API

App web

Auth

Utilisateurs

Commandes

Paiements

Recherche

Stock

Base de données

Cache

File

Entrée

Services

Données

Connexion

Facturation

Export

Mobile

Vitesse

Alertes

Extraction

Nettoyage

Enrichissement

Jointure

Entraînement

Rapport

Publication

PDG

DT

DAF

DG délégué

Plateforme

Produit

Finance

Ventes

Support

Voyage d'été

Transport

Hébergement

Repas

Activités

Train

Location

Hôtel

Camping

Marché

Restaurants

Musée

Randonnée

Plage

Gratuit

Starter

Pro

Entreprise

## Chart

Support: beta

Cartesian charts drawn on a Canvas 2D node by the DOM-free engine (minerva-design/charts presets): the web component props mapped to the same engine options, tap / scrub tooltip, legend toggles, pinch zoom, pan and double-tap reset, H5 mouse hover; ref exposes resetZoom/getView/setView/getInstance/resize. No WebGPU / WebGL renderer (one Canvas 2D path), no keyboard navigation and no React tooltip content: tooltip.render may only return text. QuadrantChart accessible points: a visually hidden list of the points (role / aria-role, aria-label with name, quadrant and values; a tap is onPointClick) with 'Move to …' buttons calling onPointDrop with the center of the neighbouring quadrant. Mini-program views take no keyboard focus, so there is no focus ring nor Shift + arrow moves, and no live region: the move is announced (role=status) on H5 only. Component tests, H5 tests in happy-dom and the official Taro WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/taro",
  "exports": [
    "Chart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "series",
    "source": "packages/taro/src/charts.tsx",
    "kind": "array",
    "typeText": "readonly ChartSeries[]",
    "typeRef": "type:deda0bcb88251b63a5de",
    "required": true,
    "description": "Data series; each sets its own `type`"
  },
  {
    "name": "yAxis2",
    "source": "packages/taro/src/charts.tsx",
    "kind": "object",
    "typeText": "ChartAxisOptions | undefined",
    "typeRef": "type:6eb50d4f419370a826a4",
    "required": false,
    "description": "Right value axis of the series with `yAxis: \"right\"` (dual axis charts)"
  },
  {
    "name": "stackMode",
    "source": "packages/taro/src/charts.tsx",
    "kind": "enum",
    "values": [
      "normal",
      "percent"
    ],
    "typeText": "\"normal\" | \"percent\" | undefined",
    "typeRef": "type:2d2343824f816d71127f",
    "default": "normal",
    "required": false,
    "description": "`percent` scales every stack to 100% at each x"
  },
  {
    "name": "orientation",
    "source": "packages/taro/src/charts.tsx",
    "kind": "enum",
    "values": [
      "horizontal",
      "vertical"
    ],
    "typeText": "ChartOrientation | undefined",
    "typeRef": "type:872af3679a2d7fcf3d26",
    "default": "vertical",
    "required": false,
    "description": "`horizontal` puts the x axis (categories) down the left side"
  },
  {
    "name": "height",
    "source": "packages/taro/src/charts.tsx",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "default": 320,
    "required": false,
    "description": "Height of the chart (the legend included); numbers are pixels"
  },
  {
    "name": "width",
    "source": "packages/taro/src/charts.tsx",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "default": "100%",
    "required": false,
    "description": "Width of the chart; numbers are pixels"
  },
  {
    "name": "xAxis",
    "source": "packages/taro/src/charts.tsx",
    "kind": "object",
    "typeText": "ChartAxisOptions | undefined",
    "typeRef": "type:6eb50d4f419370a826a4",
    "required": false,
    "description": "X axis"
  },
  {
    "name": "yAxis",
    "source": "packages/taro/src/charts.tsx",
    "kind": "object",
    "typeText": "ChartAxisOptions | undefined",
    "typeRef": "type:6eb50d4f419370a826a4",
    "required": false,
    "description": "Y axis"
  },
  {
    "name": "legend",
    "source": "packages/taro/src/charts.tsx",
    "kind": "union",
    "typeText": "boolean | ChartLegendOptions | undefined",
    "typeRef": "type:860fa553ee4deaac43f8",
    "required": false,
    "description": "Legend; shown by default when several series have a name (tap toggles a series)"
  },
  {
    "name": "tooltip",
    "source": "packages/taro/src/charts.tsx",
    "kind": "union",
    "typeText": "boolean | ChartTooltipOptions | undefined",
    "typeRef": "type:c08795b3492e4547d570",
    "required": false,
    "description": "Tooltip; `false` disables it"
  },
  {
    "name": "crosshair",
    "source": "packages/taro/src/charts.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Vertical guide line following the finger"
  },
  {
    "name": "annotations",
    "source": "packages/taro/src/charts.tsx",
    "kind": "array",
    "typeText": "readonly ChartAnnotation[] | undefined",
    "typeRef": "type:f440eb8a958892b1b0c2",
    "required": false,
    "description": "Background areas and reference lines"
  },
  {
    "name": "interaction",
    "source": "packages/taro/src/charts.tsx",
    "kind": "union",
    "typeText": "boolean | ChartInteractionOptions | undefined",
    "typeRef": "type:f4b160d7dd18649fd178",
    "default": true,
    "required": false,
    "description": "Pinch zoom, pan (drag when zoomed) and double-tap reset; `false` makes the chart static"
  },
  {
    "name": "padding",
    "source": "packages/taro/src/charts.tsx",
    "kind": "object",
    "typeText": "ChartPadding | undefined",
    "typeRef": "type:7c2c76b2d4d6c9fbf43a",
    "required": false,
    "description": "Space around the plot area, in pixels"
  },
  {
    "name": "palette",
    "source": "packages/taro/src/charts.tsx",
    "kind": "array",
    "typeText": "readonly string[] | undefined",
    "typeRef": "type:88dcb55e82bb1c501478",
    "required": false,
    "description": "Series colors (defaults to the `--chart-series-1..8` tokens, then the theme colors)"
  },
  {
    "name": "ariaLabel",
    "source": "packages/taro/src/charts.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible name of the chart"
  },
  {
    "name": "locale",
    "source": "packages/taro/src/charts.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Locale of the texts and numbers the chart writes (tooltip rows, compact units `k` / `万`, separators, month and weekday names of time axes). Mini-programs have no `<html lang>`: pass the app language"
  },
  {
    "name": "labels",
    "source": "packages/taro/src/charts.tsx",
    "kind": "object",
    "typeText": "Partial<ChartLabels> | undefined",
    "typeRef": "type:14c31fd72a2c2ac7a7fd",
    "required": false,
    "description": "Overrides of the built-in texts of the `locale`"
  },
  {
    "name": "disableScroll",
    "source": "packages/taro/src/charts.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Keeps the page from scrolling while a finger moves on the chart (needed to pan a zoomed chart or drag points)"
  },
  {
    "name": "id",
    "source": "packages/taro/src/charts.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Id of the `<Canvas>` (generated by default)"
  }
]
```

### events

```json
[
  {
    "name": "onHover",
    "source": "packages/taro/src/charts.tsx",
    "kind": "function",
    "typeText": "((event: ChartHoverEvent | null) => void) | undefined",
    "typeRef": "type:980cbee566a575ab834d",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ChartHoverEvent | null",
        "typeRef": "type:92ec77c4587c7e27430b"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the touched (or hovered) points change"
  },
  {
    "name": "onPointClick",
    "source": "packages/taro/src/charts.tsx",
    "kind": "function",
    "typeText": "((event: ChartHoverEvent) => void) | undefined",
    "typeRef": "type:054b6d565969c517cbb1",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ChartHoverEvent",
        "typeRef": "type:9ad3ae3816f8ca4e3894"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when a point (or bar) is tapped"
  },
  {
    "name": "onPlotClick",
    "source": "packages/taro/src/charts.tsx",
    "kind": "function",
    "typeText": "((event: ChartPlotClickEvent) => void) | undefined",
    "typeRef": "type:02c2f014ba9839a6e936",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ChartPlotClickEvent",
        "typeRef": "type:db60e2cf00fabb558740"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the plot area is tapped where there is no point"
  },
  {
    "name": "onZoom",
    "source": "packages/taro/src/charts.tsx",
    "kind": "function",
    "typeText": "((view: ChartView) => void) | undefined",
    "typeRef": "type:6871f590139907a5872c",
    "parameters": [
      {
        "name": "view",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ChartView",
        "typeRef": "type:f1de933b453f8db86ff3"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the user zooms or pans"
  }
]
```

## ShapeChart

Support: beta

Shape charts drawn on a Canvas 2D node by the DOM-free shape engine: legend toggles (controlled hidden), tap to highlight with the canvas tooltip, entry / update animations, sunburst drill-down with onDrill, and a generic ShapeChart taking any shape type's options. No keyboard navigation and no React tooltip content: tooltip.render may only return text. Component tests, H5 tests in happy-dom and the official Taro WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/taro",
  "exports": [
    "ShapeChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "options",
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "union",
    "typeText": "ShapeChartOptions",
    "typeRef": "type:54137e999ba8be2bca01",
    "required": true,
    "description": "Options of the chart, by `type` (every shape type of the engine)"
  },
  {
    "name": "height",
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "required": false,
    "description": "Height of the chart (the legend included); numbers are pixels"
  },
  {
    "name": "width",
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "default": "100%",
    "required": false,
    "description": "Width of the chart; numbers are pixels"
  },
  {
    "name": "disableScroll",
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Keeps the page from scrolling while a finger moves on the chart"
  },
  {
    "name": "id",
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Id of the `<Canvas>` (generated by default)"
  }
]
```

### events

```json
[
  {
    "name": "onDrill",
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "function",
    "typeText": "((event: ShapeDrillEvent) => void) | undefined",
    "typeRef": "type:db725d51ab265e055e94",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ShapeDrillEvent",
        "typeRef": "type:2f6344534a4b788a1925"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when a sunburst drills into a parent or back up"
  },
  {
    "name": "onHover",
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "function",
    "typeText": "((event: ShapeHoverEvent | null) => void) | undefined",
    "typeRef": "type:348e97229a786720de93",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ShapeHoverEvent | null",
        "typeRef": "type:5ce60fcc1021d329ffba"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the highlighted mark changes (tap, or the mouse on H5)"
  },
  {
    "name": "onClick",
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "function",
    "typeText": "((event: ShapeHoverEvent) => void) | undefined",
    "typeRef": "type:2f0a619712ca66b7ac75",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ShapeHoverEvent",
        "typeRef": "type:019a32700cb7aa817346"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when a mark is tapped"
  },
  {
    "name": "onToggle",
    "source": "packages/taro/src/shape-charts.tsx",
    "kind": "function",
    "typeText": "((event: ShapeToggleEvent) => void) | undefined",
    "typeRef": "type:5e77e83d29468fb39c06",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ShapeToggleEvent",
        "typeRef": "type:4b4244045a32e66c0a25"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when a legend item is tapped (or the instance's `toggle()` is called), with the toggled index and every hidden index after the toggle"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

# Graphiques

Des graphiques accélérés par le GPU (WebGPU, WebGL2 ou WebGL, avec Canvas2D en repli) qui restent à 60 fps avec des millions de points : tendances, comparaisons, statistiques, parts d’un tout, hiérarchies et flux, réseaux, dépendances et arbres, finance et trading, et 3D. Chart combine des séries en lignes, aires, barres, points, chandeliers et cartes de chaleur ; les autres composants sont des préréglages pour un type de graphique. Commencez par les galeries ci-dessous : une miniature interactive de chaque type de graphique, avec un lien vers sa page.

Package: minerva-design@1.23.0

Renderer: weapp

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "413e3d54e2177f8469c443a6547c4472e608839c",
  "sourceDigest": "sha256:8c8e874e213d698b4d05cabed92eed392c90c5b0fa91c66def67eab19184e86c",
  "referenceSourceDigest": "sha256:e694adbf6015cdc21809df819193e0a84c030845fb2910749dbd1c4c15ccca99"
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

Mixed line/area/bar/scatter series on a <canvas type="2d"> (DOM-free canvas engine): axes, legend with tap-to-toggle, tooltip, crosshair, annotations, tap/scrub hover, pan when zoomed, pinch zoom, double-tap reset, point dragging, Minerva theme/palette/design tokens from the nearest provider. Properties are serialized by setData: data must be JSON (timestamps instead of Date, no typed arrays) and large data sets cost a copy per update. Function options (axis format, tooltip text) use configure(); tooltips are canvas text, not ReactNode content. No renderer choice, wheel or keyboard navigation. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/chart/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "width",
    "typeText": "unknown",
    "required": false,
    "default": "100%"
  },
  {
    "name": "height",
    "typeText": "unknown",
    "required": false,
    "default": 320
  },
  {
    "name": "legend",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "tooltip",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "crosshair",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "annotations",
    "typeText": "array",
    "required": false
  },
  {
    "name": "interaction",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "padding",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "palette",
    "typeText": "array",
    "required": false
  },
  {
    "name": "ariaLabel",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "locale",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "labels",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "disableScroll",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "series",
    "typeText": "array",
    "required": false
  },
  {
    "name": "xAxis",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "yAxis",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "yAxis2",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "stackMode",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "orientation",
    "typeText": "string",
    "required": false,
    "default": ""
  }
]
```

### events

```json
[
  {
    "name": "hover",
    "typeText": "{ items: NativeChartHoverItem[]; x: number | null; xLabel: string }",
    "description": "Highlighted points after a tap or a finger scrub; items is empty when cleared."
  },
  {
    "name": "pointclick",
    "typeText": "{ items: NativeChartHoverItem[]; x: number; xLabel: string }",
    "description": "A point or bar was tapped."
  },
  {
    "name": "plotclick",
    "typeText": "{ x: number; y: number }",
    "description": "The plot area was tapped where there is no point (data coordinates)."
  },
  {
    "name": "zoom",
    "typeText": "{ x: [number, number]; y: [number, number] }",
    "description": "Visible range after a pinch, a pan or a double-tap reset."
  },
  {
    "name": "layout",
    "typeText": "{ x: number; y: number; width: number; height: number }",
    "description": "The plot area moved or was resized (px of the chart)."
  },
  {
    "name": "pointdrag",
    "typeText": "{ item: NativeChartHoverItem; x: number; y: number }",
    "description": "A scatter point is dragged (interaction.dragPoints); the data is not changed."
  },
  {
    "name": "pointdrop",
    "typeText": "{ item: NativeChartHoverItem; x: number; y: number }",
    "description": "A dragged scatter point was released; update the series to move it."
  }
]
```

## ShapeChart

Support: beta

Any shape type of the engine (pie, radar, gauge, funnel, treemap and the newer types) from a serializable options property. Same as PieChart; function options go through configure(). Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/shape-chart/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "width",
    "typeText": "unknown",
    "required": false,
    "default": "100%"
  },
  {
    "name": "height",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "disableScroll",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "options",
    "typeText": "unknown",
    "required": false,
    "default": null
  }
]
```

### events

```json
[
  {
    "name": "hover",
    "typeText": "NativeShapeHoverEvent",
    "description": "Highlighted mark after a tap (index -1 when cleared)."
  },
  {
    "name": "click",
    "typeText": "NativeShapeHoverEvent",
    "description": "A mark was tapped."
  },
  {
    "name": "toggle",
    "typeText": "{ index: number; hidden: boolean; hiddenIndexes: number[] }",
    "description": "A legend item was tapped (or toggle() called); controlled charts must publish hiddenIndexes through hidden."
  },
  {
    "name": "drill",
    "typeText": "{ path: string[] }",
    "description": "Sunburst: a parent or the center was tapped (or drill() called); controlled charts must publish path through drillPath."
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

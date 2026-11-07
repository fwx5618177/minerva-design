# Graphiques

Des graphiques accélérés par le GPU (WebGPU, WebGL2 ou WebGL, avec Canvas2D en repli) qui restent à 60 fps avec des millions de points : tendances, comparaisons, statistiques, parts d’un tout, hiérarchies et flux, réseaux, dépendances et arbres, finance et trading, et 3D. Chart combine des séries en lignes, aires, barres, points, chandeliers et cartes de chaleur ; les autres composants sont des préréglages pour un type de graphique. Commencez par les galeries ci-dessous : une miniature interactive de chaque type de graphique, avec un lien vers sa page.

Package: minerva-design@1.22.1

Renderer: uni

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.1",
  "sourceCommit": "3b95c464583d2e1bcf02999361aa6cf5481d519b",
  "sourceDigest": "sha256:080b482abbb8d2745bf31d68a17d7a1299cbb89f0e3f8c1a4d1d91bdeb04d1be",
  "referenceSourceDigest": "sha256:22ecb97acf4fac039a6d9a7e4a78b6bedc12dbbb8c1a14e3feeef3bcd47a7cef"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.1/types.json) or getType() from minerva-design/contracts.

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

Cartesian chart drawn on a `<canvas type="2d">` by the DOM-free engine: the web component props mapped to the same presets and engine options, tap / scrub tooltip, legend toggles, pinch zoom, pan and double-tap reset; hover/pointClick/plotClick/zoom events and a template ref handle (resetZoom/getView/setView/getInstance/resize). No WebGPU / WebGL renderer and no keyboard navigation; tooltip.render may only return text. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
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
    "name": "width",
    "typeText": "string | number | undefined",
    "required": false
  },
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "required": false
  },
  {
    "name": "tooltip",
    "typeText": "boolean | ChartTooltipOptions | undefined",
    "required": false
  },
  {
    "name": "legend",
    "typeText": "boolean | ChartLegendOptions | undefined",
    "required": false
  },
  {
    "name": "crosshair",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "interaction",
    "typeText": "boolean | ChartInteractionOptions | undefined",
    "required": false
  },
  {
    "name": "disableScroll",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "labels",
    "typeText": "Partial<ChartLabels> | undefined",
    "required": false
  },
  {
    "name": "ariaLabel",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "padding",
    "typeText": "ChartPadding | undefined",
    "required": false
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "annotations",
    "typeText": "readonly ChartAnnotation[] | undefined",
    "required": false
  },
  {
    "name": "palette",
    "typeText": "readonly string[] | undefined",
    "required": false
  },
  {
    "name": "series",
    "typeText": "readonly ChartSeries[]",
    "required": true
  },
  {
    "name": "xAxis",
    "typeText": "ChartAxisOptions | undefined",
    "required": false
  },
  {
    "name": "yAxis",
    "typeText": "ChartAxisOptions | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "zoom",
    "typeText": "[view: ChartView]",
    "parameters": [
      {
        "name": "view",
        "position": 0,
        "typeText": "ChartView",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "hover",
    "typeText": "[event: ChartHoverEvent | null]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ChartHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "pointClick",
    "typeText": "[event: ChartHoverEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ChartHoverEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "plotClick",
    "typeText": "[event: ChartPlotClickEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ChartPlotClickEvent",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## ShapeChart

Support: beta

Shape chart drawn on a `<canvas type="2d">` by the DOM-free shape engine: legend toggles (controlled hidden), tap to highlight with the canvas tooltip, animations, hover/click/toggle events and the sunburst drill event; ShapeChart takes the options of any shape type. No keyboard navigation; tooltip.render may only return text. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
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
    "name": "width",
    "typeText": "string | number | undefined",
    "required": false
  },
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "required": false
  },
  {
    "name": "disableScroll",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "options",
    "typeText": "ShapeChartOptions",
    "required": true
  }
]
```

### events

```json
[
  {
    "name": "click",
    "typeText": "[event: ShapeHoverEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ShapeHoverEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "hover",
    "typeText": "[event: ShapeHoverEvent | null]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ShapeHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "toggle",
    "typeText": "[event: ShapeToggleEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ShapeToggleEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "drill",
    "typeText": "[event: ShapeDrillEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "ShapeDrillEvent",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

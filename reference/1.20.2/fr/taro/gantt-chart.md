# Diagramme de Gantt

Des tâches en barres sur un axe du temps, avec leur avancement, leurs groupes, les jalons et une ligne du jour ; zoom et déplacement le long du temps.

Package: minerva-design@1.20.2

Renderer: taro

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.2",
  "sourceCommit": "ae023a943266e631be23485d1daf0a21591499a1",
  "sourceDigest": "sha256:c9540edc3908d226375a01cf5e6bfe8ca6a4e20440f736c0dd9b40ae9ff2e645",
  "referenceSourceDigest": "sha256:7bf77141c64cfa04bf3140efe18348e2eef528dbd35f817eea65bdca81f687b1"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.2/types.json) or getType() from minerva-design/contracts.

## Documentation

Recherche utilisateur

Entretiens avec les parties prenantes

Lancement

Maquettes fonctionnelles

Design graphique

Design system

Front-end

Back-end et CMS

Migration des contenus

Recette et accessibilité

Mise en ligne

Découverte

Conception

Réalisation

Mise en ligne

Aujourd'hui

Avancement

Jalons

Plan de la refonte du site

Refonte mobile

Synchronisation hors ligne

Widgets d'écran d'accueil

Recherche v2

Hébergement multirégion

API publique

Nouvel accueil

Programme de parrainage

Page de tarifs

Mobile

Plateforme

Croissance

Feuille de route produit de l'année par équipe

Page de connexion

Réinitialisation du mot de passe

API de profil

Envoi d'avatar

Modèles d'e-mails

Notifications

Tests de bout en bout

Ana

Ben

Chen

Dara

{{task}} ({{owner}}) : {{start}} – {{end}}, {{progress}} % fait

Cliquez sur une tâche

Tâches du sprint par développeur

Spécifications

Développement

Traduction

Bêta publique

Lancement

Chinois (zh-CN)

Français (fr-FR)

Plan de sortie, {{locale}}

Lancement du projet

Spécifications produit

API de synchronisation

Écrans de l’app

Intégration

Revue de sécurité

Fiche store

Bêta-test

Publication

Produit

Back-end

Mobile

Flèches de dépendance

Plan de sortie de l’app mobile avec les dépendances entre les tâches

Débroussaillage

Terrassement des fondations

Cages d’armature

Semelles

Remblai

Dallage

Charpente métallique, niveau 1

Plancher collaborant

Charpente métallique, niveau 2

Réception des fondations

Réception de la charpente

Équipe terrassement

Équipe charpente

Équipe béton

Contrôleur

Fondations

Structure

Réceptions

Planning de chantier par équipe avec les dépendances entre les tâches

Équipe Atlas

Équipe Borealis

Équipe Comet

Refonte du paiement

Relances de paiement

Portefeuille numérique

Filtres de recherche

Refonte de l'indexation

Recommandations

Observabilité

Notifications push

Fonctionnalités

Facilitateurs

Itération {{n}}

Itération IP

Démo système {{n}}

Démos système

Événements du train

Incrément de programme du train de livraison par équipe

Signer le bail

Aménagement

Pose des rayonnages

Mise en place du WMS

Recrutement

Formation

Marche à blanc

Mise en service

Critique

Avec marge

Mettre en évidence le chemin critique

Mise en service dans {{days}} ; chemin critique : {{path}}. Cliquez sur une tâche pour voir sa marge.

{{task}} peut glisser de {{slack}} sans retarder la mise en service

{{task}} est critique : tout retard décale la mise en service

Plan d'ouverture d'un entrepôt avec son chemin critique

Ana

Ben

Chen

Dara

Eli

Apollo

Borealis

Cassini

Congés

Projet

Tous les projets

{{person}} : {{share}} de charge sur les {{weeks}} semaines

{{person}} est en surcharge : {{share}} sur les {{weeks}} semaines

Survolez une ligne pour voir la charge de la personne

Plan de charge de l'équipe par personne et par projet

Récupération du code

Compilation

Tests unitaires

Lint

Tests d'intégration

Déploiement en préproduction

Tests de fumée

Déploiement canari

Mise en production

Construction

Tests

Livraison

Maintenant

En cours : {{stages}} · {{elapsed}} écoulées

Pipeline terminé en {{elapsed}}

Relancer

Pause

Reprendre

Étapes d'une exécution du pipeline de déploiement, mises à jour en direct

Contrat et formalités

Commander l'ordinateur

Créer les comptes

Réunion d'accueil

Séminaire d'intégration

Déjeuner avec le parrain

```tsx
Visite du code
```

Premier ticket

Formation conformité

Premier projet

Premier jour

Point à 30 jours

Bilan à 60 jours

RH

Informatique

Manager

Parrain

Responsable : {{owner}}

Terminé

En cours

À venir

Points d'étape

Plan d'intégration d'un nouvel arrivant par responsable

Haute

Moyenne

Basse

Travail

Études

Perso

Point d’équipe

Travail de fond

Examen blanc

E-mails

Revue de code

Fiches

Déjeuner

Sport

Lecture

Maintenant

Planning du jour par priorité

## GanttChart

Support: beta

Cartesian charts drawn on a Canvas 2D node by the DOM-free engine (minerva-design/charts presets): the web component props mapped to the same engine options, tap / scrub tooltip, legend toggles, pinch zoom, pan and double-tap reset, H5 mouse hover; ref exposes resetZoom/getView/setView/getInstance/resize. No WebGPU / WebGL renderer (one Canvas 2D path), no keyboard navigation and no React tooltip content: tooltip.render may only return text. QuadrantChart accessible points: a visually hidden list of the points (role / aria-role, aria-label with name, quadrant and values; a tap is onPointClick) with 'Move to …' buttons calling onPointDrop with the center of the neighbouring quadrant. Mini-program views take no keyboard focus, so there is no focus ring nor Shift + arrow moves, and no live region: the move is announced (role=status) on H5 only. Component tests, H5 tests in happy-dom and the official Taro WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/taro",
  "exports": [
    "GanttChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "tasks",
    "source": "packages/taro/src/charts.tsx",
    "kind": "array",
    "typeText": "readonly GanttTask[]",
    "typeRef": "type:791e8e1c53f83b4ec740",
    "required": true,
    "description": "Tasks and milestones, from top to bottom"
  },
  {
    "name": "today",
    "source": "packages/taro/src/charts.tsx",
    "kind": "union",
    "typeText": "number | boolean | Date | undefined",
    "typeRef": "type:dbbc7339a861a5b4f401",
    "default": false,
    "required": false,
    "description": "Draws a line at this date (`true`: now)"
  },
  {
    "name": "todayLabel",
    "source": "packages/taro/src/charts.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Label of the today line"
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
    "name": "id",
    "source": "packages/taro/src/charts.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Id of the `<Canvas>` (generated by default)"
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
  }
]
```

### events

```json
[
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

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

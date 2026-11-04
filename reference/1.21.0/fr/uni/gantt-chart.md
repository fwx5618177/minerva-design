# Diagramme de Gantt

Des tâches en barres sur un axe du temps, avec leur avancement, leurs groupes, les jalons et une ligne du jour ; zoom et déplacement le long du temps.

Package: minerva-design@1.21.0

Renderer: uni

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.0",
  "sourceCommit": "cf7fb249651cd06c89d0951ac2c3a3aa74dc835a",
  "sourceDigest": "sha256:e0f51a94cc5272baf2775327d83ba025ee09228cfc17f4d529188b1653c78892",
  "referenceSourceDigest": "sha256:563c9bec5d90807342a94c02317519b3da937907129bda2d25ea49762fa828fd"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.0/types.json) or getType() from minerva-design/contracts.

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

Cartesian chart drawn on a `<canvas type="2d">` by the DOM-free engine: the web component props mapped to the same presets and engine options, tap / scrub tooltip, legend toggles, pinch zoom, pan and double-tap reset; hover/pointClick/plotClick/zoom events and a template ref handle (resetZoom/getView/setView/getInstance/resize). No WebGPU / WebGL renderer and no keyboard navigation; tooltip.render may only return text. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
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
    "name": "today",
    "typeText": "number | boolean | Date | undefined",
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
    "name": "dependencyArrows",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "barLabels",
    "typeText": "boolean | \"auto\" | \"inside\" | undefined",
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
    "name": "todayLabel",
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
    "name": "xAxis",
    "typeText": "ChartAxisOptions | undefined",
    "required": false
  },
  {
    "name": "yAxis",
    "typeText": "ChartAxisOptions | undefined",
    "required": false
  },
  {
    "name": "tasks",
    "typeText": "readonly GanttTask[]",
    "required": true
  },
  {
    "name": "colors",
    "typeText": "readonly string[] | undefined",
    "required": false
  },
  {
    "name": "taskName",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "progressName",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "milestoneName",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "formatProgress",
    "typeText": "((share: number) => string) | undefined",
    "required": false
  },
  {
    "name": "dependenciesName",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "dependencyColor",
    "typeText": "string | undefined",
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

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

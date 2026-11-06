# Diagramme de Gantt

Des tâches en barres sur un axe du temps, avec leur avancement, leurs groupes, les jalons et une ligne du jour ; zoom et déplacement le long du temps.

Package: minerva-design@1.21.1

Renderer: native

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.1",
  "sourceCommit": "8b898b8bac966669d23d1fba972e2a3289cdb5b5",
  "sourceDigest": "sha256:a33fb5e0b8f01ae452ce95d2b723ab0cd9905636d574c72fd12c1459f4c09d3a",
  "referenceSourceDigest": "sha256:8ed3473bb098d663e523782b06fce57a42cde419daa8bbcc5c6b1f0e37e3e50e"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.1/types.json) or getType() from minerva-design/contracts.

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

Chart component of minerva-design/native: the canvas chart engine drawn with views (touch scrub, pinch zoom, legend toggles).

### Import

```json
{
  "specifier": "minerva-design/native",
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
    "source": "packages/native/src/components/Charts/types.ts",
    "kind": "array",
    "typeText": "readonly GanttTask[]",
    "typeRef": "type:791e8e1c53f83b4ec740",
    "required": true,
    "description": "Tasks and milestones, from top to bottom"
  },
  {
    "name": "today",
    "source": "packages/native/src/components/Charts/types.ts",
    "kind": "union",
    "typeText": "number | boolean | Date | undefined",
    "typeRef": "type:dbbc7339a861a5b4f401",
    "default": false,
    "required": false,
    "description": "Draws a line at this date (`true`: now)"
  },
  {
    "name": "todayLabel",
    "source": "packages/native/src/components/Charts/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Label of the today line"
  },
  {
    "name": "testID",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Test identifier of the root view"
  },
  {
    "name": "tooltip",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "union",
    "typeText": "boolean | ChartTooltipOptions | undefined",
    "typeRef": "type:c08795b3492e4547d570",
    "required": false,
    "description": "Tooltip shown on tap / while scrubbing; `false` disables it"
  },
  {
    "name": "labels",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "object",
    "typeText": "Partial<ChartLabels> | undefined",
    "typeRef": "type:14c31fd72a2c2ac7a7fd",
    "required": false,
    "description": "Overrides of the built-in texts of the `locale`"
  },
  {
    "name": "height",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "union",
    "typeText": "DimensionValue | undefined",
    "typeRef": "type:cd08f9fa3f57e56425b7",
    "default": 320,
    "required": false,
    "description": "Height of the chart (the legend included)"
  },
  {
    "name": "width",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "union",
    "typeText": "DimensionValue | undefined",
    "typeRef": "type:cd08f9fa3f57e56425b7",
    "default": "100%",
    "required": false,
    "description": "Width of the chart"
  },
  {
    "name": "xAxis",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "object",
    "typeText": "ChartAxisOptions | undefined",
    "typeRef": "type:6eb50d4f419370a826a4",
    "required": false,
    "description": "X axis"
  },
  {
    "name": "yAxis",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "object",
    "typeText": "ChartAxisOptions | undefined",
    "typeRef": "type:6eb50d4f419370a826a4",
    "required": false,
    "description": "Y axis"
  },
  {
    "name": "legend",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "union",
    "typeText": "boolean | ChartLegendOptions | undefined",
    "typeRef": "type:860fa553ee4deaac43f8",
    "required": false,
    "description": "Legend; shown by default when several series have a name (tap toggles a series)"
  },
  {
    "name": "annotations",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "array",
    "typeText": "readonly ChartAnnotation[] | undefined",
    "typeRef": "type:f440eb8a958892b1b0c2",
    "required": false,
    "description": "Background areas, reference lines and texts"
  },
  {
    "name": "interaction",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "union",
    "typeText": "boolean | ChartInteractionOptions | undefined",
    "typeRef": "type:f4b160d7dd18649fd178",
    "default": true,
    "required": false,
    "description": "Pinch to zoom, drag to pan when zoomed, double tap to reset; `false` makes the chart static"
  },
  {
    "name": "padding",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "object",
    "typeText": "ChartPadding | undefined",
    "typeRef": "type:7c2c76b2d4d6c9fbf43a",
    "required": false,
    "description": "Space around the plot area, in pixels"
  },
  {
    "name": "palette",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "array",
    "typeText": "readonly string[] | undefined",
    "typeRef": "type:88dcb55e82bb1c501478",
    "required": false,
    "description": "Series colors (defaults to the `chart-series-1..8` tokens, then the theme colors)"
  },
  {
    "name": "ariaLabel",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible name of the chart"
  },
  {
    "name": "locale",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Locale of the texts and numbers the chart writes (tooltip rows, compact units `k` / `万`, separators, month and weekday names of time axes)"
  },
  {
    "name": "renderTooltip",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "node",
    "typeText": "((event: ChartHoverEvent) => ReactNode) | undefined",
    "typeRef": "type:66d650d38e6b7d308d32",
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
      "typeText": "ReactNode",
      "typeRef": "type:d947e2db6b7ed3e4c192"
    },
    "required": false,
    "description": "React content of the tooltip (replaces the default content)"
  }
]
```

### events

```json
[
  {
    "name": "onHover",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "function",
    "typeText": "((event: ChartHoverEvent | null) => void) | undefined",
    "typeRef": "type:170f27b8f07028fffd08",
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
    "description": "Called when the highlighted points change"
  },
  {
    "name": "onPointClick",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "function",
    "typeText": "((event: ChartHoverEvent) => void) | undefined",
    "typeRef": "type:d586363317763d2fd3f3",
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
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "function",
    "typeText": "((event: ChartPlotClickEvent) => void) | undefined",
    "typeRef": "type:3ab7d8ab926fce010082",
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
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "function",
    "typeText": "((view: ChartView) => void) | undefined",
    "typeRef": "type:e6c98e88ed542ed60f34",
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

## API

```json
{
  "native:GanttChartProps": {
    "source": "native/src/components/Charts/types.ts",
    "description": "Props of GanttChart",
    "kind": "interface",
    "extends": [
      "Omit<ChartCommonProps, \"crosshair\">",
      "GanttOptions"
    ],
    "props": [
      {
        "name": "tasks",
        "type": "readonly GanttTask[]",
        "required": true,
        "description": "Tasks and milestones, from top to bottom"
      },
      {
        "name": "today",
        "type": "boolean | number | Date",
        "required": false,
        "default": "false",
        "description": "Draws a line at this date (`true`: now)"
      },
      {
        "name": "todayLabel",
        "type": "string",
        "required": false,
        "description": "Label of the today line"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: basic

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/gantt-chart/native/basic.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { GanttChart, type GanttTask } from "minerva-design/native";

const day = (month: number, date: number) => new Date(2026, month - 1, date);

// Relaunch of a website: tasks by phase with their progress, and the launch
const plan = [
  ["research", "discovery", day(3, 2), day(3, 13), 1],
  ["wireframes", "design", day(3, 23), day(4, 7), 1],
  ["visualDesign", "design", day(4, 1), day(4, 24), 0.7],
  ["frontend", "build", day(4, 20), day(5, 29), 0.2],
  ["qa", "launch", day(5, 25), day(6, 12), 0],
] as const;

export default function Basic() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.gantt-chart.data",
  });
  const tasks = useMemo(
    (): GanttTask[] => [
      ...plan.map(([key, phase, start, end, progress]) => ({
        name: t(`tasks.${key}`),
        group: t(`phases.${phase}`),
        start,
        end,
        progress,
      })),
      { name: t("tasks.launch"), start: day(6, 15), milestone: true },
    ],
    [t],
  );
  return (
    <GanttChart
      height={300}
      locale={i18n.language}
      tasks={tasks}
      progressName={t("progress")}
      milestoneName={t("milestones")}
      legend={{ position: "bottom" }}
      ariaLabel={t("projectAria")}
    />
  );
}

```

## Example: Couloirs : un planning de la journée

Un planning d’une journée en couloirs de priorité : les tâches de même row partagent un couloir, le domaine s’aligne sur les heures pleines (08:00–22:00) avec des graduations heure:minute, les groupes colorent les tâches par type et today trace l’heure actuelle. Comme plusieurs tâches partagent chaque couloir, barLabels ("auto" par défaut) écrit leur nom dans les barres, coupé par des points de suspension et dans une couleur contrastant avec la barre. Les tâches sans progress sont pleines ; la revue de code en cours montre sa partie restante en translucide.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/gantt-chart/native/daily.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { GanttChart, type GanttTask } from "minerva-design/native";

const at = (hours: number, minutes = 0) =>
  new Date(2026, 10, 2, hours, minutes);

// A one-day schedule in priority lanes: several tasks per row (their names
// inside the bars), hour ticks and the current time
const plan = [
  ["standup", "high", "work", at(9), at(9, 30)],
  ["deepWork", "high", "work", at(10), at(12)],
  ["exam", "high", "study", at(16), at(17, 30)],
  ["email", "medium", "work", at(8), at(8, 45)],
  ["review", "medium", "work", at(13, 30), at(15)],
  ["flashcards", "medium", "study", at(20), at(21)],
  ["lunch", "low", "life", at(12), at(13)],
  ["gym", "low", "life", at(18), at(19, 30)],
  ["reading", "low", "study", at(21, 15), at(22)],
] as const;
const progress: Partial<Record<(typeof plan)[number][0], number>> = {
  review: 0.6,
};

export default function Daily() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.gantt-chart.data",
  });
  const tasks = useMemo(
    (): GanttTask[] =>
      plan.map(([key, lane, group, start, end]) => ({
        id: key,
        name: t(`daily.tasks.${key}`),
        row: t(`daily.lanes.${lane}`),
        group: t(`daily.groups.${group}`),
        start,
        end,
        progress: progress[key],
      })),
    [t],
  );
  return (
    <GanttChart
      height={260}
      locale={i18n.language}
      tasks={tasks}
      barLabels="auto"
      today={at(14, 30)}
      todayLabel={t("daily.now")}
      legend={{ position: "bottom" }}
      ariaLabel={t("daily.aria")}
    />
  );
}

```

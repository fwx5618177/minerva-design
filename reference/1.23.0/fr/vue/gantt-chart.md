# Diagramme de Gantt

Des tâches en barres sur un axe du temps, avec leur avancement, leurs groupes, les jalons et une ligne du jour ; zoom et déplacement le long du temps.

Package: minerva-design@1.23.0

Renderer: vue

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "9a519eee781183dcbac39a62a86bec9e0bd877a9",
  "sourceDigest": "sha256:0d31b0bc3c28394756a1142132ddf7b2beac9f7ce2f5b2253e04712431d7c736",
  "referenceSourceDigest": "sha256:0a033a9f6bc21722c87a78202ae3fce0d891270ea8a01d043a5a748c0439d696"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

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

### Import

```json
{
  "specifier": "minerva-design/vue",
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
    "name": "deep",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Also follows in-place mutations of nested data (`series[0].data.push()`);\nby default the chart updates when a prop is replaced (cheaper on large data)",
    "typeText": "boolean"
  },
  {
    "name": "legend",
    "type": "boolean | ChartLegendOptions",
    "required": false,
    "description": "Legend; shown by default when several series have a name",
    "typeText": "boolean | ChartLegendOptions"
  },
  {
    "name": "tooltip",
    "type": "boolean | ChartTooltipOptions",
    "required": false,
    "description": "Tooltip; `false` disables it",
    "typeText": "boolean | ChartTooltipOptions"
  },
  {
    "name": "crosshair",
    "type": "boolean",
    "required": false,
    "description": "Vertical guide line following the pointer",
    "typeText": "boolean"
  },
  {
    "name": "interaction",
    "type": "boolean | ChartInteractionOptions",
    "required": false,
    "description": "Zoom (Ctrl / ⌘ + wheel, pinch), pan (drag), double-click reset and keyboard navigation; `false` makes the chart static (default `true`)",
    "typeText": "boolean | ChartInteractionOptions"
  },
  {
    "name": "dependencyArrows",
    "type": "boolean",
    "required": false,
    "description": "Draws the `dependencies` of the tasks as elbow arrows from the end of every predecessor to the start of the task (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "barLabels",
    "type": "boolean | \"auto\" | \"inside\"",
    "required": false,
    "description": "Writes the task names inside the bars: `\"auto\"` when several tasks\nshare a row (default), `true` / `\"inside\"` always, `false` never",
    "typeText": "boolean | \"auto\" | \"inside\""
  },
  {
    "name": "today",
    "type": "number | boolean | Date",
    "default": "false",
    "required": false,
    "description": "Draws a line at this date (`true`: now)",
    "typeText": "number | boolean | Date"
  },
  {
    "name": "labels",
    "type": "Partial<ChartLabels>",
    "required": false,
    "description": "Overrides of the built-in texts of the `locale`",
    "typeText": "Partial<ChartLabels>"
  },
  {
    "name": "renderer",
    "type": "ChartRendererPreference",
    "required": false,
    "description": "Backend of the data layer: `auto` tries WebGPU, then WebGL2, then WebGL, then Canvas2D (default `auto`)",
    "typeText": "ChartRendererPreference"
  },
  {
    "name": "width",
    "type": "string | number",
    "required": false,
    "description": "Width of the chart; numbers are pixels (default `100%`)",
    "typeText": "string | number"
  },
  {
    "name": "height",
    "type": "string | number",
    "required": false,
    "description": "Height of the chart (the legend included); numbers are pixels, strings any CSS length",
    "typeText": "string | number"
  },
  {
    "name": "xAxis",
    "type": "ChartAxisOptions",
    "required": false,
    "description": "X axis",
    "typeText": "ChartAxisOptions"
  },
  {
    "name": "yAxis",
    "type": "ChartAxisOptions",
    "required": false,
    "description": "Y axis",
    "typeText": "ChartAxisOptions"
  },
  {
    "name": "annotations",
    "type": "readonly ChartAnnotation[]",
    "required": false,
    "description": "Background areas and reference lines",
    "typeText": "readonly ChartAnnotation[]"
  },
  {
    "name": "padding",
    "type": "ChartPadding",
    "required": false,
    "description": "Space around the plot area, in pixels",
    "typeText": "ChartPadding"
  },
  {
    "name": "palette",
    "type": "readonly string[]",
    "required": false,
    "description": "Series colors (defaults to the `--chart-series-1..8` CSS variables, then the theme colors)",
    "typeText": "readonly string[]"
  },
  {
    "name": "ariaLabel",
    "type": "string",
    "required": false,
    "description": "Accessible name of the chart",
    "typeText": "string"
  },
  {
    "name": "locale",
    "type": "string",
    "required": false,
    "description": "BCP 47 locale of the texts and numbers the engine writes (tooltip, axes, accessible names); the page language by default",
    "typeText": "string"
  },
  {
    "name": "colors",
    "type": "readonly string[]",
    "required": false,
    "description": "Colors of the groups in order of appearance (any CSS colors); the chart palette by default",
    "typeText": "readonly string[]"
  },
  {
    "name": "taskName",
    "type": "string",
    "required": false,
    "description": "Name of the tasks without a group (default \"Tasks\")",
    "typeText": "string"
  },
  {
    "name": "progressName",
    "type": "string",
    "required": false,
    "description": "Name of the progress bars (legend, tooltip; default \"Progress\")",
    "typeText": "string"
  },
  {
    "name": "milestoneName",
    "type": "string",
    "required": false,
    "description": "Name of the milestones (legend, tooltip; default \"Milestones\")",
    "typeText": "string"
  },
  {
    "name": "dependenciesName",
    "type": "string",
    "required": false,
    "description": "Name of the dependencies row of the tooltip (default \"Depends on\", in the `locale`)",
    "typeText": "string"
  },
  {
    "name": "dependencyColor",
    "type": "string",
    "required": false,
    "description": "Color of the dependency arrows (any CSS color); the secondary text color by default",
    "typeText": "string"
  },
  {
    "name": "todayLabel",
    "type": "string",
    "required": false,
    "description": "Label of the today line",
    "typeText": "string"
  },
  {
    "name": "tasks",
    "type": "readonly GanttTask[]",
    "required": true,
    "description": "Tasks and milestones, from top to bottom",
    "typeText": "readonly GanttTask[]"
  },
  {
    "name": "formatProgress",
    "type": "((share: number) => string)",
    "required": false,
    "description": "Formats the progress shares (tooltip; default \"60%\")",
    "typeText": "((share: number) => string)"
  }
]
```

### events

```json
[
  {
    "name": "zoom",
    "type": "[view: ChartView]",
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
    "type": "[event: ChartHoverEvent | null]",
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
    "name": "plotClick",
    "type": "[event: ChartPlotClickEvent]",
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
  },
  {
    "name": "pointClick",
    "type": "[event: ChartHoverEvent]",
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
    "name": "rendererChange",
    "type": "[renderer: ChartRendererKind]",
    "typeText": "[renderer: ChartRendererKind]",
    "parameters": [
      {
        "name": "renderer",
        "position": 0,
        "typeText": "ChartRendererKind",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: daily

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/gantt-chart/vue/daily.vue

```vue
<script setup lang="ts">
// A one-day schedule in priority lanes: several tasks share each row
// (`row`, their names written inside the bars by `bar-labels` "auto"), the
// time axis shows hours and minutes for an intra-day range and `today`
// marks the current time. Tasks without a `progress` are drawn solid; the
// code review in progress shows what is left.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { GanttChart } from "minerva-design/vue/charts";

const TEXT = {
  en: {
    lanes: ["High", "Medium", "Low"],
    groups: { work: "Work", study: "Study", life: "Life" },
    tasks: [
      "Standup",
      "Deep work",
      "Mock exam",
      "Email",
      "Code review",
      "Flashcards",
      "Lunch",
      "Gym",
      "Reading",
    ],
    now: "Now",
  },
  zh: {
    lanes: ["高", "中", "低"],
    groups: { work: "工作", study: "学习", life: "生活" },
    tasks: [
      "站会",
      "专注工作",
      "模拟考试",
      "邮件",
      "代码评审",
      "背单词",
      "午饭",
      "健身",
      "阅读",
    ],
    now: "现在",
  },
  ja: {
    lanes: ["高", "中", "低"],
    groups: { work: "仕事", study: "学習", life: "生活" },
    tasks: [
      "朝会",
      "集中作業",
      "模擬試験",
      "メール",
      "コードレビュー",
      "単語カード",
      "昼食",
      "ジム",
      "読書",
    ],
    now: "現在",
  },
  fr: {
    lanes: ["Haute", "Moyenne", "Basse"],
    groups: { work: "Travail", study: "Études", life: "Perso" },
    tasks: [
      "Point d’équipe",
      "Travail de fond",
      "Examen blanc",
      "E-mails",
      "Revue de code",
      "Fiches",
      "Déjeuner",
      "Sport",
      "Lecture",
    ],
    now: "Maintenant",
  },
};

const at = (hours: number, minutes = 0) =>
  new Date(2026, 10, 2, hours, minutes).getTime();

// lane (0 high, 1 medium, 2 low), group, start, end
const PLAN = [
  [0, "work", at(9), at(9, 30)],
  [0, "work", at(10), at(12)],
  [0, "study", at(16), at(17, 30)],
  [1, "work", at(8), at(8, 45)],
  [1, "work", at(13, 30), at(15)],
  [1, "study", at(20), at(21)],
  [2, "life", at(12), at(13)],
  [2, "life", at(18), at(19, 30)],
  [2, "study", at(21, 15), at(22)],
] as const;
/** Index of the task in progress (the code review) */
const IN_PROGRESS = 4;

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const tasks = computed(() =>
  PLAN.map(([lane, group, start, end], i) => ({
    id: `task-${i}`,
    name: text.value.tasks[i],
    row: text.value.lanes[lane],
    group: text.value.groups[group],
    start,
    end,
    ...(i === IN_PROGRESS ? { progress: 0.6 } : {}),
  })),
);
const now = at(14, 30);
</script>

<template>
  <GanttChart
    :tasks="tasks"
    bar-labels="auto"
    :today="now"
    :today-label="text.now"
    :height="260"
  />
</template>

```

## Example: project

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/gantt-chart/vue/project.vue

```vue
<script setup lang="ts">
// Tasks grouped by phase (one color and legend entry each), their progress
// drawn over the bars and a milestone as a dot; zoom and pan along the time.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { GanttChart } from "minerva-design/vue/charts";

const TEXT = {
  en: {
    phases: ["Design", "Build", "Launch"],
    tasks: [
      "Research",
      "Wireframes",
      "Visual design",
      "Frontend",
      "Backend",
      "Testing",
      "Release",
    ],
    progress: "Progress",
    milestones: "Milestones",
  },
  zh: {
    phases: ["设计", "开发", "发布"],
    tasks: ["用户调研", "线框图", "视觉设计", "前端", "后端", "测试", "上线"],
    progress: "进度",
    milestones: "里程碑",
  },
  ja: {
    phases: ["設計", "開発", "リリース"],
    tasks: [
      "リサーチ",
      "ワイヤーフレーム",
      "ビジュアルデザイン",
      "フロントエンド",
      "バックエンド",
      "テスト",
      "公開",
    ],
    progress: "進捗",
    milestones: "マイルストーン",
  },
  fr: {
    phases: ["Conception", "Développement", "Lancement"],
    tasks: [
      "Recherche",
      "Maquettes",
      "Design visuel",
      "Front-end",
      "Back-end",
      "Tests",
      "Mise en ligne",
    ],
    progress: "Avancement",
    milestones: "Jalons",
  },
};

const DAY = 86_400_000;
const START = Date.UTC(2026, 2, 2);
// phase, first day, duration (days), share done
const PLAN = [
  [0, 0, 6, 1],
  [0, 4, 6, 1],
  [0, 8, 8, 0.7],
  [1, 12, 14, 0.4],
  [1, 12, 16, 0.3],
  [2, 26, 6, 0],
];

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const tasks = computed(() => [
  ...PLAN.map(([phase, day, days, progress], i) => ({
    name: text.value.tasks[i],
    group: text.value.phases[phase],
    start: START + day * DAY,
    end: START + (day + days) * DAY,
    progress,
  })),
  { name: text.value.tasks[6], start: START + 33 * DAY, milestone: true },
]);
</script>

<template>
  <GanttChart
    :tasks="tasks"
    :progress-name="text.progress"
    :milestone-name="text.milestones"
    :height="320"
  />
</template>

```

## Example: sprint

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/gantt-chart/vue/sprint.vue

```vue
<script setup lang="ts">
// A two-week sprint: tasks without a group share one color; `today` draws
// a dashed line with its label (`today-label`).
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { GanttChart } from "minerva-design/vue/charts";

const TEXT = {
  en: {
    tasks: [
      "Login page",
      "Password reset",
      "Email templates",
      "Audit log",
      "Release notes",
    ],
    today: "Today",
  },
  zh: {
    tasks: ["登录页", "重置密码", "邮件模板", "审计日志", "发布说明"],
    today: "今天",
  },
  ja: {
    tasks: [
      "ログイン画面",
      "パスワード再設定",
      "メールテンプレート",
      "監査ログ",
      "リリースノート",
    ],
    today: "今日",
  },
  fr: {
    tasks: [
      "Page de connexion",
      "Mot de passe oublié",
      "Modèles d’e-mail",
      "Journal d’audit",
      "Notes de version",
    ],
    today: "Aujourd’hui",
  },
};

const DAY = 86_400_000;
const START = Date.UTC(2026, 9, 19);
// first day, duration (days), share done
const PLAN = [
  [0, 3, 1],
  [1, 4, 0.8],
  [3, 5, 0.5],
  [5, 4, 0.1],
  [8, 2, 0],
];

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const tasks = computed(() =>
  PLAN.map(([day, days, progress], i) => ({
    name: text.value.tasks[i],
    start: START + day * DAY,
    end: START + (day + days) * DAY,
    progress,
  })),
);
</script>

<template>
  <GanttChart
    :tasks="tasks"
    :today="START + 6.5 * DAY"
    :today-label="text.today"
    :height="260"
  />
</template>

```

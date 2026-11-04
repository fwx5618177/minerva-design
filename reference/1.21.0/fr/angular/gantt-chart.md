# Diagramme de Gantt

Des tâches en barres sur un axe du temps, avec leur avancement, leurs groupes, les jalons et une ligne du jour ; zoom et déplacement le long du temps.

Package: minerva-design@1.21.0

Renderer: angular

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

Native Angular: MnGanttChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnGanttChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "tasks",
    "typeText": "readonly GanttTask[]",
    "required": true,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "colors",
    "typeText": "readonly string[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "taskName",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "progressName",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "milestoneName",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "formatProgress",
    "typeText": "((share: number) => string) | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "dependenciesName",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "dependencyArrows",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "dependencyColor",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "barLabels",
    "typeText": "boolean | \"auto\" | \"inside\"",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "today",
    "typeText": "number | boolean | Date",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  },
  {
    "name": "todayLabel",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian-extended.ts"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Plan de projet

Chaque groupe a sa couleur et son entrée de légende, l'avancement est une barre pleine sur la tâche, les jalons sont des points et today trace une ligne à une date. Survolez une tâche : son infobulle ne montre qu’elle, avec son groupe, ses dates, sa durée, son avancement et ses dépendances. Les dépendances sont dessinées en flèches.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnGanttChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnGanttChart],
  template: `
@let t = labels[language()];
<mn-gantt-chart
  [tasks]="[
    { name: t.tasks[0], group: t.phases[0], start: start, end: start + 6 * day, progress: 1 },
    { name: t.tasks[1], group: t.phases[0], start: start + 4 * day, end: start + 10 * day, progress: 1 },
    { name: t.tasks[2], group: t.phases[0], start: start + 8 * day, end: start + 16 * day, progress: 0.7 },
    { name: t.tasks[3], group: t.phases[1], start: start + 12 * day, end: start + 26 * day, progress: 0.4 },
    { name: t.tasks[4], group: t.phases[1], start: start + 12 * day, end: start + 28 * day, progress: 0.3 },
    { name: t.tasks[5], group: t.phases[2], start: start + 26 * day, end: start + 32 * day, progress: 0 },
    { name: t.tasks[6], start: start + 33 * day, milestone: true }
  ]"
  [progressName]="t.progress"
  [milestoneName]="t.milestones"
  [height]="320"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  day = 86400000;
  start = 1772409600000;
  labels = {
  "en": {
    "phases": ["Design", "Build", "Launch"],
    "tasks": ["Research", "Wireframes", "Visual design", "Frontend", "Backend", "Testing", "Release"],
    "progress": "Progress",
    "milestones": "Milestones"
  },
  "zh": {
    "phases": ["设计", "开发", "发布"],
    "tasks": ["用户调研", "线框图", "视觉设计", "前端", "后端", "测试", "上线"],
    "progress": "进度",
    "milestones": "里程碑"
  },
  "ja": {
    "phases": ["設計", "開発", "リリース"],
    "tasks": ["リサーチ", "ワイヤーフレーム", "ビジュアルデザイン", "フロントエンド", "バックエンド", "テスト", "公開"],
    "progress": "進捗",
    "milestones": "マイルストーン"
  },
  "fr": {
    "phases": ["Conception", "Développement", "Lancement"],
    "tasks": ["Recherche", "Maquettes", "Design visuel", "Front-end", "Back-end", "Tests", "Mise en ligne"],
    "progress": "Avancement",
    "milestones": "Jalons"
  }
};
}

```

## Example: Sprint

Des tâches à l'heure près, une couleur par développeur ; onPointClick reçoit la ligne cliquée pour en afficher le détail.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnGanttChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnGanttChart],
  template: `
@let t = labels[language()];
<mn-gantt-chart
  [tasks]="[
    { name: t.tasks[0], start: start, end: start + 3 * day, progress: 1 },
    { name: t.tasks[1], start: start + day, end: start + 5 * day, progress: 0.8 },
    { name: t.tasks[2], start: start + 3 * day, end: start + 8 * day, progress: 0.5 },
    { name: t.tasks[3], start: start + 5 * day, end: start + 9 * day, progress: 0.1 },
    { name: t.tasks[4], start: start + 8 * day, end: start + 10 * day, progress: 0 }
  ]"
  [today]="start + 6.5 * day"
  [todayLabel]="t.today"
  [height]="260"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  day = 86400000;
  start = 1792368000000;
  labels = {
  "en": {
    "tasks": ["Login page", "Password reset", "Email templates", "Audit log", "Release notes"],
    "today": "Today"
  },
  "zh": {
    "tasks": ["登录页", "重置密码", "邮件模板", "审计日志", "发布说明"],
    "today": "今天"
  },
  "ja": {
    "tasks": ["ログイン画面", "パスワード再設定", "メールテンプレート", "監査ログ", "リリースノート"],
    "today": "今日"
  },
  "fr": {
    "tasks": ["Page de connexion", "Mot de passe oublié", "Modèles d’e-mail", "Journal d’audit", "Notes de version"],
    "today": "Aujourd’hui"
  }
};
}

```

## Example: Couloirs : un planning de la journée

Un planning d’une journée en couloirs de priorité : les tâches de même row partagent un couloir, le domaine s’aligne sur les heures pleines (08:00–22:00) avec des graduations heure:minute, les groupes colorent les tâches par type et today trace l’heure actuelle. Comme plusieurs tâches partagent chaque couloir, barLabels ("auto" par défaut) écrit leur nom dans les barres, coupé par des points de suspension et dans une couleur contrastant avec la barre. Les tâches sans progress sont pleines ; la revue de code en cours montre sa partie restante en translucide.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnGanttChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnGanttChart],
  template: `
@let t = labels[language()];
<mn-gantt-chart
  [tasks]="[
    { id: 'a', name: t.tasks[0], row: t.lanes[0], group: t.groups[0], start: day + 9 * hour, end: day + 9.5 * hour },
    { id: 'b', name: t.tasks[1], row: t.lanes[0], group: t.groups[0], start: day + 10 * hour, end: day + 12 * hour },
    { id: 'c', name: t.tasks[2], row: t.lanes[0], group: t.groups[1], start: day + 16 * hour, end: day + 17.5 * hour },
    { id: 'd', name: t.tasks[3], row: t.lanes[1], group: t.groups[0], start: day + 8 * hour, end: day + 8.75 * hour },
    { id: 'e', name: t.tasks[4], row: t.lanes[1], group: t.groups[0], start: day + 13.5 * hour, end: day + 15 * hour, progress: 0.6 },
    { id: 'f', name: t.tasks[5], row: t.lanes[1], group: t.groups[1], start: day + 20 * hour, end: day + 21 * hour },
    { id: 'g', name: t.tasks[6], row: t.lanes[2], group: t.groups[2], start: day + 12 * hour, end: day + 13 * hour },
    { id: 'h', name: t.tasks[7], row: t.lanes[2], group: t.groups[2], start: day + 18 * hour, end: day + 19.5 * hour },
    { id: 'i', name: t.tasks[8], row: t.lanes[2], group: t.groups[1], start: day + 21.25 * hour, end: day + 22 * hour }
  ]"
  [today]="day + 14.5 * hour"
  [todayLabel]="t.now"
  [height]="260"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  hour = 3600000;
  day = new Date(2026, 10, 2).getTime();
  labels = {
  "en": {
    "lanes": ["High", "Medium", "Low"],
    "groups": ["Work", "Study", "Life"],
    "tasks": ["Standup", "Deep work", "Mock exam", "Email", "Code review", "Flashcards", "Lunch", "Gym", "Reading"],
    "now": "Now"
  },
  "zh": {
    "lanes": ["高", "中", "低"],
    "groups": ["工作", "学习", "生活"],
    "tasks": ["站会", "专注工作", "模拟考试", "邮件", "代码评审", "背单词", "午饭", "健身", "阅读"],
    "now": "现在"
  },
  "ja": {
    "lanes": ["高", "中", "低"],
    "groups": ["仕事", "学習", "生活"],
    "tasks": ["朝会", "集中作業", "模擬試験", "メール", "コードレビュー", "単語カード", "昼食", "ジム", "読書"],
    "now": "現在"
  },
  "fr": {
    "lanes": ["Haute", "Moyenne", "Basse"],
    "groups": ["Travail", "Études", "Perso"],
    "tasks": ["Point d’équipe", "Travail de fond", "Examen blanc", "E-mails", "Revue de code", "Fiches", "Déjeuner", "Sport", "Lecture"],
    "now": "Maintenant"
  }
};
}

```

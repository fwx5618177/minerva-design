# Gantt chart

Tasks as bars on a time axis with their progress, groups, milestones and a today line; zooms and pans along the time.

Package: minerva-design@1.20.3

Renderer: angular

Locale: en

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

User research

Stakeholder interviews

Kick-off

Wireframes

Visual design

Design system

Front end

Back end and CMS

Content migration

QA and accessibility

Launch

Discovery

Design

Build

Launch

Today

Progress

Milestones

Plan of the website relaunch

Mobile redesign

Offline sync

Home screen widgets

Search v2

Multi-region hosting

Public API

New onboarding

Referral program

Pricing page

Mobile

Platform

Growth

Product roadmap of the year by team

Login page

Password reset

Profile API

Avatar upload

Email templates

Notifications

End-to-end tests

Ana

Ben

Chen

Dara

{{task}} ({{owner}}): {{start}} – {{end}}, {{progress}}% done

Click a task

Tasks of the sprint by developer

Specifications

Development

Translation

Public beta

Launch

Chinese (zh-CN)

French (fr-FR)

Release plan, {{locale}}

Kick-off

Product spec

Sync API

App screens

Integration

Security review

Store listing

Beta testing

Store release

Product

Backend

Mobile

Dependency arrows

Release plan of the mobile app with the dependencies between tasks

Site clearing

Foundation dig

Rebar cages

Footings

Backfill

Ground slab

Steel frame, level 1

Floor deck

Steel frame, level 2

Footing inspection

Frame inspection

Excavation crew

Steel crew

Concrete crew

Inspector

Groundwork

Structure

Inspections

Construction schedule by crew with the dependencies between tasks

Team Atlas

Team Borealis

Team Comet

Checkout redesign

Payment retries

Digital wallet

Search filters

Indexing upgrade

Recommendations

Observability

Push notifications

Features

Enablers

Iteration {{n}}

IP iteration

System demo {{n}}

System demos

Train events

Program increment of the release train by team

Sign the lease

Fit-out works

Install racking

Set up the WMS

Hire the staff

Train the staff

Test run

Go-live

Critical

With slack

Highlight the critical path

Go-live after {{days}}; critical path: {{path}}. Click a task for its slack.

{{task}} can slip by {{slack}} without delaying the go-live

{{task}} is critical: any delay moves the go-live

Warehouse opening plan with its critical path

Ana

Ben

Chen

Dara

Eli

Apollo

Borealis

Cassini

Vacation

Project

All projects

{{person}}: {{share}} booked over the {{weeks}} weeks

{{person}} is overbooked: {{share}} over the {{weeks}} weeks

Hover a row to see the load of that person

Resource plan of the team by person and project

Checkout

Build

Unit tests

Lint

Integration tests

Deploy to staging

Smoke tests

Canary release

Production rollout

Build

Test

Release

Now

Running: {{stages}} · {{elapsed}} elapsed

Pipeline finished in {{elapsed}}

Run again

Pause

Resume

Stages of a deployment pipeline run, updated live

Contract and paperwork

Order the laptop

Create the accounts

Welcome meeting

Orientation

Lunch with the buddy

```tsx
Codebase tour
```

First ticket

Compliance training

First project

First day

30-day check-in

60-day review

HR

IT

Manager

Buddy

Owner: {{owner}}

Done

In progress

Upcoming

Check-ins

Onboarding plan of a new hire by owner

High

Medium

Low

Work

Study

Life

Standup

Deep work

Mock exam

Email

Code review

Flashcards

Lunch

Gym

Reading

Now

Today's schedule by priority

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

## Example: Project plan

Each group gets a color and a legend entry, progress is drawn as a solid bar over the task, milestones are dots and today draws a line at a date. Hover a task: its tooltip shows only that task, with its group, dates, duration, progress and dependencies. Dependencies are drawn as arrows.

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

Tasks with hours, one color per developer; onPointClick receives the clicked row to show its details.

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

## Example: Swimlanes: a daily schedule

A one-day schedule in priority lanes: tasks with the same row share a lane, the domain snaps to whole hours (08:00–22:00) with hour:minute ticks, groups color the tasks by kind and today draws the current time. As several tasks share each lane, barLabels ("auto" by default) writes their names inside the bars, cut with an ellipsis and in a color contrasting with the bar. Tasks without a progress are drawn solid; the code review in progress shows its remaining part translucent.

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

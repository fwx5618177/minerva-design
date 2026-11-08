# ガントチャート

時間軸上にタスクを棒で表し、進捗、グループ、マイルストーン、今日の線を表示。時間方向に拡大・移動できます。

Package: minerva-design@1.23.1

Renderer: wc

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "88873864837dbcb61b99fdcbc6ca81fca447df74",
  "sourceDigest": "sha256:1ce1c857f10d367f112c6e77d88ae3878570c428c4d39ed7a400c8c99645e9f6",
  "referenceSourceDigest": "sha256:d9f3f7ce5f1caadfe236e584eab7825ceb958644c20320519e6bf9a2d1daf523"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

## Documentation

ユーザー調査

関係者インタビュー

キックオフ

ワイヤーフレーム

ビジュアルデザイン

デザインシステム

フロントエンド

バックエンドと CMS

コンテンツ移行

QA とアクセシビリティ

公開

調査

設計

開発

公開

今日

進捗

マイルストーン

Web サイトリニューアルの計画

モバイル刷新

オフライン同期

ホーム画面ウィジェット

検索 v2

マルチリージョン

公開 API

新オンボーディング

紹介プログラム

料金ページ

モバイル

プラットフォーム

グロース

チームごとの年間プロダクトロードマップ

ログイン画面

パスワード再設定

プロフィール API

アバターのアップロード

メールテンプレート

通知

E2E テスト

アナ

ベン

チェン

ダラ

{{task}}（{{owner}}）：{{start}} – {{end}}、{{progress}}% 完了

タスクをクリックしてください

開発者ごとのスプリントのタスク

仕様策定

開発

翻訳

公開ベータ

リリース

中国語（zh-CN）

フランス語（fr-FR）

リリース計画、{{locale}}

キックオフ

製品仕様

同期 API

アプリ画面

結合

セキュリティレビュー

ストア掲載素材

ベータテスト

ストア公開

プロダクト

バックエンド

モバイル

依存関係の矢印

モバイルアプリのリリース計画とタスク間の依存関係

整地

根切り

鉄筋ケージ加工

基礎打設

埋め戻し

土間スラブ

1 階鉄骨建方

デッキプレート

2 階鉄骨建方

配筋検査

躯体検査

土工班

鉄骨班

コンクリート班

検査員

基礎工事

躯体工事

検査

班ごとの施工工程とタスク間の依存関係

Atlas チーム

Borealis チーム

Comet チーム

決済画面の刷新

決済リトライ

デジタルウォレット

検索フィルター

インデックス刷新

レコメンド

オブザーバビリティ

プッシュ通知

機能

イネーブラー

イテレーション {{n}}

IP イテレーション

システムデモ {{n}}

システムデモ

トレインイベント

チーム別のリリーストレインのプログラムインクリメント

賃貸契約

内装工事

ラック設置

WMS 構築

スタッフ採用

スタッフ研修

試運転

稼働開始

クリティカル

余裕あり

クリティカルパスを強調

{{days}}後に稼働開始。クリティカルパス：{{path}}。タスクをクリックすると余裕日数を表示します。

{{task}}は稼働開始を遅らせずに{{slack}}遅れても大丈夫です

{{task}}はクリティカル：遅れると稼働開始も遅れます

クリティカルパス付きの倉庫開設計画

Ana

Ben

Chen

Dara

Eli

Apollo

Borealis

Cassini

休暇

プロジェクト

すべてのプロジェクト

{{person}}：{{weeks}} 週間で {{share}} 割り当て済み

{{person}}は割り当て超過：{{weeks}} 週間で {{share}}

行にホバーするとその人の負荷を表示します

担当者とプロジェクト別のチームのリソース計画

チェックアウト

ビルド

単体テスト

Lint

結合テスト

ステージングへデプロイ

スモークテスト

カナリアリリース

本番ロールアウト

ビルド

テスト

リリース

現在

実行中：{{stages}} · 経過 {{elapsed}}

パイプラインは {{elapsed}} で完了しました

再実行

一時停止

再開

デプロイパイプライン実行の各ステージ（ライブ更新）

契約と書類

ノート PC の手配

アカウント作成

歓迎ミーティング

オリエンテーション

バディとランチ

```tsx
コードベース紹介
```

最初のチケット

コンプライアンス研修

最初のプロジェクト

初日

30 日面談

60 日レビュー

人事

IT

マネージャー

バディ

担当：{{owner}}

完了

進行中

予定

面談

担当者別の新入社員オンボーディング計画

高

中

低

仕事

学習

生活

朝会

集中作業

模擬試験

メール

コードレビュー

単語カード

昼食

ジム

読書

現在

優先度別の今日の予定

## GanttChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/gantt-chart",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "taskName",
    "typeText": "string | undefined",
    "attribute": "task-name",
    "required": false
  },
  {
    "name": "progressName",
    "typeText": "string | undefined",
    "attribute": "progress-name",
    "required": false
  },
  {
    "name": "milestoneName",
    "typeText": "string | undefined",
    "attribute": "milestone-name",
    "required": false
  },
  {
    "name": "dependenciesName",
    "typeText": "string | undefined",
    "attribute": "dependencies-name",
    "required": false
  },
  {
    "name": "hideDependencyArrows",
    "typeText": "boolean",
    "attribute": "hide-dependency-arrows",
    "required": false
  },
  {
    "name": "dependencyColor",
    "typeText": "string | undefined",
    "attribute": "dependency-color",
    "required": false
  },
  {
    "name": "barLabels",
    "typeText": "boolean | \"inside\" | \"auto\"",
    "attribute": "bar-labels",
    "required": false
  },
  {
    "name": "todayLabel",
    "typeText": "string | undefined",
    "attribute": "today-label",
    "required": false
  },
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "attribute": "height",
    "required": false
  },
  {
    "name": "tasks",
    "typeText": "readonly GanttTask[] | undefined",
    "required": false
  },
  {
    "name": "colors",
    "typeText": "readonly string[] | undefined",
    "required": false
  },
  {
    "name": "formatProgress",
    "typeText": "(share: number) => string | undefined",
    "required": false
  },
  {
    "name": "today",
    "typeText": "boolean | number | Date",
    "required": false
  },
  {
    "name": "options",
    "typeText": "ChartBaseOptions | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "minerva-hover",
    "typeText": "CustomEvent",
    "description": "The hovered (or keyboard-focused) points changed; detail: { x, xLabel, items }, `null` when nothing is hovered"
  },
  {
    "name": "minerva-point-click",
    "typeText": "CustomEvent",
    "description": "A point or a bar was clicked; detail: { x, xLabel, items }"
  },
  {
    "name": "minerva-plot-click",
    "typeText": "CustomEvent",
    "description": "The plot area was clicked where there is no point; detail: { x, y }"
  },
  {
    "name": "minerva-zoom",
    "typeText": "CustomEvent",
    "description": "The user zoomed or panned; detail: { x, y } (the visible ranges)"
  },
  {
    "name": "minerva-renderer-change",
    "typeText": "CustomEvent",
    "description": "The backend is ready (or fell back after a GPU loss); detail: { renderer }"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: スイムレーン：1 日の予定

優先度別のレーンに複数のタスク（row）とバー内のタスク名（bar-labels）、1 日の範囲では時:分の目盛り、today で現在時刻を示します。progress のないタスクは塗りつぶしです。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/gantt-chart/wc/daily.html

```html
<minerva-gantt-chart
  id="daily"
  height="260"
  bar-labels="auto"
></minerva-gantt-chart>

```

### apps/docs/src/docs/pages/gantt-chart/wc/daily.ts

```tsx
// A one-day schedule in priority lanes: several tasks share each row
// (`row`, their names written inside the bars by `bar-labels="auto"`), the
// time axis shows hours and minutes for an intra-day range and `today`
// marks the current time. Tasks without a `progress` are drawn solid; the
// code review in progress shows what is left.
import type { MinervaGanttChart } from "minerva-design/web-components/chart";

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

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaGanttChart>("#daily")!;
  chart.tasks = PLAN.map(([lane, group, start, end], i) => ({
    id: `task-${i}`,
    name: text.tasks[i],
    row: text.lanes[lane],
    group: text.groups[group],
    start,
    end,
    ...(i === IN_PROGRESS ? { progress: 0.6 } : {}),
  }));
  chart.today = at(14, 30);
  chart.todayLabel = text.now;
}

```

## Example: フェーズ別のプロジェクト計画

タスクをフェーズでグループ化（色分け）し、進捗と公開のマイルストーンを表示します。時間軸でズームできます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/gantt-chart/wc/project.html

```html
<minerva-gantt-chart id="project" height="320"></minerva-gantt-chart>

```

### apps/docs/src/docs/pages/gantt-chart/wc/project.ts

```tsx
// Tasks grouped by phase (one color and legend entry each), their progress
// drawn over the bars and a milestone as a dot; zoom and pan along the time.
import type { MinervaGanttChart } from "minerva-design/web-components/chart";

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

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaGanttChart>("#project")!;
  chart.tasks = [
    ...PLAN.map(([phase, day, days, progress], i) => ({
      name: text.tasks[i],
      group: text.phases[phase],
      start: START + day * DAY,
      end: START + (day + days) * DAY,
      progress,
    })),
    { name: text.tasks[6], start: START + 33 * DAY, milestone: true },
  ];
  chart.progressName = text.progress;
  chart.milestoneName = text.milestones;
}

```

## Example: 今日の線付きスプリント

2 週間のスプリント。グループのないタスクは同じ色で、破線が今日を示します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/gantt-chart/wc/sprint.html

```html
<minerva-gantt-chart id="sprint" height="260"></minerva-gantt-chart>

```

### apps/docs/src/docs/pages/gantt-chart/wc/sprint.ts

```tsx
// A two-week sprint: tasks without a group share one color; `today` draws
// a dashed line with its label (`today-label`).
import type { MinervaGanttChart } from "minerva-design/web-components/chart";

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

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaGanttChart>("#sprint")!;
  chart.tasks = PLAN.map(([day, days, progress], i) => ({
    name: text.tasks[i],
    start: START + day * DAY,
    end: START + (day + days) * DAY,
    progress,
  }));
  chart.today = START + 6.5 * DAY;
  chart.todayLabel = text.today;
}

```

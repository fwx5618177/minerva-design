# ガントチャート

時間軸上にタスクを棒で表し、進捗、グループ、マイルストーン、今日の線を表示。時間方向に拡大・移動できます。

Package: minerva-design@1.21.0

Renderer: angular

Locale: ja

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

## Example: プロジェクト計画

グループごとに色と凡例項目が付き、進捗はタスクに重ねた塗りの棒、マイルストーンは点で表示されます。today で日付に線を引きます。タスクにホバーすると、そのタスクだけのツールチップにグループ、日付、期間、進捗、先行タスクが表示されます。依存関係は矢印で描かれます。

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

## Example: スプリント

時間単位のタスクを開発者ごとの色で。onPointClick でクリックした行を受け取り、詳細を表示します。

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

## Example: スイムレーン：1 日の予定

優先度別のレーンに並べた 1 日の予定：row が同じタスクは 1 つのレーンを共有し、範囲は正時（08:00–22:00）にそろえて時:分の目盛りを表示します。group で種類ごとに色分けし、today で現在時刻を示します。各レーンに複数のタスクがあるため、barLabels（既定は "auto"）がタスク名をバーの中に書きます。長い名前は省略記号で切り、文字色はバーとのコントラストで選びます。progress のないタスクは塗りつぶしで描き、進行中のコードレビューは残りの部分を半透明で示します。

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

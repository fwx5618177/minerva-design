# ガントチャート

時間軸上にタスクを棒で表し、進捗、グループ、マイルストーン、今日の線を表示。時間方向に拡大・移動できます。

Package: minerva-design@1.23.1

Renderer: weapp

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "6ccf4f2c7a65dd5b27e517c9a50ea4867f8e7980",
  "sourceDigest": "sha256:2005faebbf738765fe81a5c952fa47a51311aa5d05e3220f71c542b8b1fe369b",
  "referenceSourceDigest": "sha256:3616b5d4e7cf7e0eb1fbe04c879d1630cc3dfd5c28f16762b8ad6f3f3525ef82"
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

Support: beta

Tasks / milestones on a time axis (timestamps), groups and progress, `today` line (true or a timestamp), zoom along the time; formatProgress() through configure(). Same as Chart. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/gantt-chart/index",
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
    "name": "tasks",
    "typeText": "array",
    "required": false
  },
  {
    "name": "colors",
    "typeText": "array",
    "required": false
  },
  {
    "name": "taskName",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "progressName",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "milestoneName",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "dependenciesName",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "dependencyArrows",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "dependencyColor",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "barLabels",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "today",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "todayLabel",
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

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

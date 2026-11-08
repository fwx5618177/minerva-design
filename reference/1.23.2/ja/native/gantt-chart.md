# ガントチャート

時間軸上にタスクを棒で表し、進捗、グループ、マイルストーン、今日の線を表示。時間方向に拡大・移動できます。

Package: minerva-design@1.23.2

Renderer: native

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.2",
  "sourceCommit": "c6618fd81b2d3c2a9016cfe13a1d15983d533ff7",
  "sourceDigest": "sha256:1ce1c857f10d367f112c6e77d88ae3878570c428c4d39ed7a400c8c99645e9f6",
  "referenceSourceDigest": "sha256:8f6e89c1e214fedc2e52de014615037c54204a8ec5c0dbb40c58dc530906571e"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.2/types.json) or getType() from minerva-design/contracts.

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

## Example: スイムレーン：1 日の予定

優先度別のレーンに並べた 1 日の予定：row が同じタスクは 1 つのレーンを共有し、範囲は正時（08:00–22:00）にそろえて時:分の目盛りを表示します。group で種類ごとに色分けし、today で現在時刻を示します。各レーンに複数のタスクがあるため、barLabels（既定は "auto"）がタスク名をバーの中に書きます。長い名前は省略記号で切り、文字色はバーとのコントラストで選びます。progress のないタスクは塗りつぶしで描き、進行中のコードレビューは残りの部分を半透明で示します。

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

# ブレットグラフ

コンパクトな KPI バー（Stephen Few）：各行は実績をバーで示し、背後に定性的な範囲（悪いほど濃いグレー）、目標をマーカーで示します。行ごとに独自の目盛りを持ちます。行ごとに単位が異なってもよいため、ダッシュボードで多くの KPI を小さなスペースに収められます。行にホバーするか矢印キーで、値・目標・範囲を確認できます。

Package: minerva-design@1.23.0

Renderer: wc

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "413e3d54e2177f8469c443a6547c4472e608839c",
  "sourceDigest": "sha256:8c8e874e213d698b4d05cabed92eed392c90c5b0fa91c66def67eab19184e86c",
  "referenceSourceDigest": "sha256:e694adbf6015cdc21809df819193e0a84c030845fb2910749dbd1c4c15ccca99"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

## Documentation

売上

千米ドル

利益率

売上に対する %

平均注文額

米ドル

新規顧客

人数

満足度

5 点満点

悪い

普通

良い

違反

要注意

正常

今四半期累計の営業 KPI と目標の比較

決済

検索

モバイル

プラットフォーム

グロース

データ

各チームが達成したストーリーポイントとコミットの比較

可用性

リクエストの %

Apdex

スコア（0–1）

スループット

リクエスト / 秒

エラーバジェット

残り %

今月の API のサービスレベル目標

訪問者

千人

登録

アカウント数

アクティベーション

登録に対する %

MRR

千米ドル

月

選択した月のグロース KPI と目標の比較

契約後 30 日以内にオンボーディングを完了した法人顧客の割合

新規アカウントの %

1 営業時間以内に初回回答した優先サポートチケットの割合

チケットの %

顧客に影響する障害を起こさなかった本番デプロイの割合

デプロイの %

年間サブスクリプション契約の売上維持率（拡張・解約を含む）

比率

長い名前の運用 KPI と目標の比較

マーケティング

エンジニアリング

営業

人事

総務・施設

出張

年間予算：{{budget}}

余裕あり

ぎりぎり

計画超過

{{over}} 部門が計画より速く支出しています。行をクリックすると差額を表示します。

{{department}}は計画超過：第 3 四半期末で {{variance}}、年間予算の {{share}} を使用、残り {{left}}。

{{department}}は計画内：第 3 四半期末で {{variance}}、年間予算の {{share}} を使用、残り {{left}}。

第 3 四半期末の部門別支出とその時点の計画予算

吸気温度

湿度

消費電力

ファン回転数

°C

相対湿度 %

ラックあたり kW

最大回転数の %

正常

警告

危険

ライブ読み取り

サーバールームのセンサー値と設定値・しきい値

要確認：{{sensors}}

すべてのセンサーが範囲内です。

週間走行距離

ロング走

獲得標高

練習回数

睡眠

計画：{{plan}}

計画未満

計画どおり

計画以上

ランナー

アマラ

ルーカス

メイ

{{value}}（計画 {{plan}}、{{share}}）

{{runner}} の週間トレーニングと計画

{{runner}} は週間目標 {{metrics}} 項目中 {{met}} 項目を達成しました。

エンジニアリング

営業

サポート

マーケティング

プロダクト

財務

今年の計画 {{plan}} 人

遅れ

追い上げ中

順調

並び順

計画順

遅れの大きい順

進みの大きい順

チーム別の採用数と年間人員計画

表示中の {{teams}} チームで計画 {{planned}} 人中 {{hired}} 人を採用（{{share}}）。

表示中のチームはありません。

## BulletChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/bullet-chart",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "orientation",
    "typeText": "\"horizontal\" | \"vertical\"",
    "attribute": "orientation",
    "required": false
  },
  {
    "name": "targetColor",
    "typeText": "string | undefined",
    "attribute": "target-color",
    "required": false
  },
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "attribute": "height",
    "required": false
  },
  {
    "name": "data",
    "typeText": "readonly BulletDatum[] | undefined",
    "required": false
  },
  {
    "name": "ranges",
    "typeText": "readonly number[] | undefined",
    "required": false
  },
  {
    "name": "rangeLabels",
    "typeText": "readonly string[] | undefined",
    "required": false
  },
  {
    "name": "options",
    "typeText": "Partial<Omit<BulletChartOptions, \"type\">> | undefined",
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
    "description": "The hovered (or keyboard-focused) mark changed; detail: { index, name, value, share }, `null` when nothing is hovered"
  },
  {
    "name": "minerva-click",
    "typeText": "CustomEvent",
    "description": "A mark was clicked, tapped or activated with Enter; detail: { index, name, value, share }"
  },
  {
    "name": "minerva-toggle",
    "typeText": "CustomEvent",
    "description": "A legend item was clicked (or `toggle()` called); detail: { index, hidden, hiddenIndexes }"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 目標に対する KPI

KPI ごとに 1 行で、値・目標マーカー・定性的な範囲（名前はツールチップ）を表示します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/bullet-chart/wc/kpis.html

```html
<minerva-bullet-chart id="kpis"></minerva-bullet-chart>

```

### apps/docs/src/docs/pages/bullet-chart/wc/kpis.ts

```tsx
// One row per KPI: the bar is the value, the marker the target, the gray
// bands qualitative ranges (named by `rangeLabels` in the tooltip).
import type { MinervaBulletChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    kpis: ["Revenue (k€)", "Profit (%)", "Orders", "Satisfaction"],
    ranges: ["Poor", "Fair", "Good"],
  },
  zh: {
    kpis: ["营收（千欧元）", "利润率（%）", "订单数", "满意度"],
    ranges: ["差", "一般", "良好"],
  },
  ja: {
    kpis: ["売上（千ユーロ）", "利益率（%）", "注文数", "満足度"],
    ranges: ["不良", "普通", "良好"],
  },
  fr: {
    kpis: ["Chiffre d’affaires (k€)", "Marge (%)", "Commandes", "Satisfaction"],
    ranges: ["Faible", "Correct", "Bon"],
  },
};

// value, target, upper bounds of the ranges
const KPIS = [
  [270, 250, [150, 225, 300]],
  [22.5, 26, [20, 25, 30]],
  [1650, 2100, [1000, 2000, 2500]],
  [4.4, 4.5, [3.5, 4.25, 5]],
] as const;

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaBulletChart>("#kpis")!;
  chart.data = KPIS.map(([value, target, ranges], i) => ({
    name: text.kpis[i],
    value,
    target,
    ranges,
  }));
  chart.rangeLabels = text.ranges;
}

```

## Example: 縦向きの列

四半期の売上を同じ範囲を共有する列で表示し、目標は危険色で示します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/bullet-chart/wc/vertical.html

```html
<minerva-bullet-chart
  id="quarters"
  orientation="vertical"
  target-color="var(--danger-color, #dc2626)"
></minerva-bullet-chart>

```

### apps/docs/src/docs/pages/bullet-chart/wc/vertical.ts

```tsx
// `orientation="vertical"`: columns sharing the ranges of the element
// (`ranges`), the targets in the danger color.
import type { MinervaBulletChart } from "minerva-design/web-components/chart";

const QUARTERS = {
  en: ["Q1", "Q2", "Q3", "Q4"],
  zh: ["第一季度", "第二季度", "第三季度", "第四季度"],
  ja: ["第 1 四半期", "第 2 四半期", "第 3 四半期", "第 4 四半期"],
  fr: ["T1", "T2", "T3", "T4"],
};

const SALES = [82, 95, 71, 104];
const TARGETS = [90, 90, 100, 100];

export function setup(root: HTMLElement) {
  const quarters =
    QUARTERS[document.documentElement.lang as keyof typeof QUARTERS] ??
    QUARTERS.en;
  const chart = root.querySelector<MinervaBulletChart>("#quarters")!;
  chart.data = quarters.map((name, i) => ({
    name,
    value: SALES[i],
    target: TARGETS[i],
  }));
  chart.ranges = [60, 90, 120];
}

```

# スパークライン

軸も凡例もない、文字ほどの大きさの小さなチャート。KPI カードや表のセル、リストの中で数値の横に推移の形を示します。ホバーすると値を読み取れます。

Package: minerva-design@1.19.3

Renderer: wc

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "1b65455cccbdd71bb609d7d859b1ef90f9e604c6",
  "sourceDigest": "sha256:a8b34eea01e9133306bb1fde48e7966deaaaa35d87c2dfd2e181d891c65e01c1",
  "referenceSourceDigest": "sha256:d3ed05a4228bc39ff766871c13b5ba292792f934f6ebc3d0d29af28589be129c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

注文

週ごとの注文、{{variant}}

売上

アクティブユーザー

登録数

p95 レイテンシ

{{metric}}（過去 30 日）

サービス

API ゲートウェイ

認証

検索

決済

通知

リクエスト / 分

p95 レイテンシ（30 日）

{{service}}の過去 30 日の p95 レイテンシ

本日

変化

サービスのレイテンシ

銘柄

アクメ・コーポレーション

ノヴァ・バイオテック

オービット・エアロスペース

カイト・ロボティクス

ルーマ・エナジー

{{symbol}} の本日の株価

株価

ウォッチリスト

過去 14 日間の訪問数：

訪問数

過去 14 日間の訪問数

7 日目のデプロイ後にエラーが急増し、その後元に戻りました：

エラー

過去 14 日間の日別エラー数

この 2 週間の午後の気温：

気温

過去 14 日間の午後の気温

CPU

{{server}} の CPU 使用率

アラート

正常

デイリーアクティブユーザー

最新: {{date}}

{{date}} · 9 月 1 日から {{change}}

9 月 1 日から 10 月 31 日までのデイリーアクティブユーザー

{{value}} 歩

目標の {{value}}

{{days}} 日中 {{reached}} 日で目標の {{goal}} 歩を達成

歩数

4 週間の 1 日あたりの歩数と 1 日の目標

レイキャビク

モントリオール

東京

カイロ

シンガポール

シドニー

最高 {{max}}（{{maxMonth}}）· 最低 {{min}}（{{minMonth}}）

{{city}} の月ごとの平均最高気温

期間

7 日

30 日

90 日

後半と前半の比較

前の期間との比較

直近 {{period}} の 1 日あたりの売上

## Sparkline

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/sparkline",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "attribute": "height",
    "required": false
  },
  {
    "name": "type",
    "typeText": "\"line\" | \"area\" | \"bar\"",
    "attribute": "type",
    "required": false
  },
  {
    "name": "color",
    "typeText": "string | undefined",
    "attribute": "color",
    "required": false
  },
  {
    "name": "curve",
    "typeText": "\"linear\" | \"smooth\" | \"step\"",
    "attribute": "curve",
    "required": false
  },
  {
    "name": "reference",
    "typeText": "number | undefined",
    "attribute": "reference",
    "required": false
  },
  {
    "name": "valueName",
    "typeText": "string | undefined",
    "attribute": "value-name",
    "required": false
  },
  {
    "name": "data",
    "typeText": "ChartSeries[\"data\"] | undefined",
    "required": false
  },
  {
    "name": "format",
    "typeText": "(value: number) => string | undefined",
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

## Example: KPI カード

主要な数値の下に置く小さなトレンド。折れ線・面・棒で描画します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/sparkline/wc/kpi.html

```html
<div
  style="
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 12px;
  "
>
  <div style="display: grid; gap: 4px">
    <span id="orders-label"></span>
    <strong>1,284</strong>
    <minerva-sparkline id="orders"></minerva-sparkline>
  </div>
  <div style="display: grid; gap: 4px">
    <span id="revenue-label"></span>
    <strong>€48.2k</strong>
    <minerva-sparkline id="revenue" type="area"></minerva-sparkline>
  </div>
  <div style="display: grid; gap: 4px">
    <span id="signups-label"></span>
    <strong>312</strong>
    <minerva-sparkline id="signups" type="bar"></minerva-sparkline>
  </div>
</div>

```

### apps/docs/src/docs/pages/sparkline/wc/kpi.ts

```tsx
// Word-sized trends (48px high by default) drawn as a line, an area or bars.
import type { MinervaSparkline } from "minerva-design/web-components/chart";

const TEXT = {
  en: { orders: "Orders", revenue: "Revenue", signups: "Sign-ups" },
  zh: { orders: "订单", revenue: "收入", signups: "注册" },
  ja: { orders: "注文", revenue: "売上", signups: "登録" },
  fr: {
    orders: "Commandes",
    revenue: "Chiffre d'affaires",
    signups: "Inscriptions",
  },
};

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const ordersLabel = root.querySelector<HTMLElement>("#orders-label")!;
  const revenueLabel = root.querySelector<HTMLElement>("#revenue-label")!;
  const signupsLabel = root.querySelector<HTMLElement>("#signups-label")!;
  const orders = root.querySelector<MinervaSparkline>("#orders")!;
  const revenue = root.querySelector<MinervaSparkline>("#revenue")!;
  const signups = root.querySelector<MinervaSparkline>("#signups")!;
  ordersLabel.textContent = text.orders;
  revenueLabel.textContent = text.revenue;
  signupsLabel.textContent = text.signups;
  orders.data = [32, 41, 38, 52, 49, 61, 58, 70, 66, 74];
  orders.valueName = text.orders;
  revenue.data = [3.1, 3.4, 3.2, 3.9, 4.4, 4.1, 4.6, 4.8, 4.5, 4.9];
  revenue.valueName = text.revenue;
  signups.data = [12, 18, 9, 22, 30, 25, 19, 28, 33, 31];
  signups.valueName = text.signups;
}

```

## Example: 目標線とホバー

reference で破線の目標線を描きます。ホバーするとポインター位置の値を表示します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/sparkline/wc/reference.html

```html
<div style="display: grid; gap: 8px">
  <minerva-sparkline
    id="latency"
    reference="200"
    height="64"
  ></minerva-sparkline>
  <output id="value" aria-live="polite"></output>
</div>

```

### apps/docs/src/docs/pages/sparkline/wc/reference.ts

```tsx
// `reference` draws a dashed target line; minerva-hover reports the value
// under the pointer (null when it leaves).
import type {
  ChartHoverEvent,
  MinervaSparkline,
} from "minerva-design/web-components/chart";

const TEXT = {
  en: {
    latency: "p95 latency",
    target: "target 200 ms",
    hint: "Hover the line",
  },
  zh: {
    latency: "p95 延迟",
    target: "目标 200 毫秒",
    hint: "将指针悬停在折线上",
  },
  ja: {
    latency: "p95 レイテンシ",
    target: "目標 200 ms",
    hint: "線にカーソルを合わせます",
  },
  fr: {
    latency: "Latence p95",
    target: "objectif 200 ms",
    hint: "Survolez la courbe",
  },
};

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const latency = root.querySelector<MinervaSparkline>("#latency")!;
  const value = root.querySelector<HTMLOutputElement>("#value")!;
  latency.data = [182, 175, 190, 214, 230, 205, 188, 176, 169, 181, 196, 172];
  latency.valueName = text.latency;
  latency.format = (ms) => `${ms} ms`;
  value.textContent = text.hint;
  const onHover = (event: Event) => {
    const hover = (event as CustomEvent<ChartHoverEvent | null>).detail;
    const y = hover?.items[0]?.y;
    value.textContent =
      y === undefined ? text.hint : `${text.latency}: ${y} ms (${text.target})`;
  };
  latency.addEventListener("minerva-hover", onHover);
  return () => latency.removeEventListener("minerva-hover", onHover);
}

```

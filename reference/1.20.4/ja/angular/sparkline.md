# スパークライン

軸も凡例もない、文字ほどの大きさの小さなチャート。KPI カードや表のセル、リストの中で数値の横に推移の形を示します。ホバーすると値を読み取れます。

Package: minerva-design@1.20.4

Renderer: angular

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.4",
  "sourceCommit": "5826c364a762ec5a1144b8eea89e5d7510e4099c",
  "sourceDigest": "sha256:38cfefdcb173c9a307526b9364c7a77acc74f713924006e65d94c6f3c5e94c61",
  "referenceSourceDigest": "sha256:8bb3a20ee069c63b8d85e6ccf29336af81fffa488ce873d14ee032291c18009f"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.4/types.json) or getType() from minerva-design/contracts.

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

Support: beta

Native Angular: MnSparkline. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnSparkline"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "data",
    "typeText": "ChartSeriesData",
    "required": true,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "type",
    "typeText": "\"bar\" | \"line\" | \"area\"",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "color",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "curve",
    "typeText": "ChartCurve | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "name",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "reference",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "format",
    "typeText": "((value: number) => string) | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "renderer",
    "typeText": "ChartRendererPreference | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "legend",
    "typeText": "boolean | ChartLegendOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "tooltip",
    "typeText": "boolean | ChartTooltipOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "crosshair",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "annotations",
    "typeText": "readonly ChartAnnotation[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "interaction",
    "typeText": "boolean | ChartInteractionOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "padding",
    "typeText": "ChartPadding | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "palette",
    "typeText": "readonly string[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "ariaLabel",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  }
]
```

### events

```json
[
  {
    "name": "hover",
    "typeText": "ChartHoverEvent | null",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ChartHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "zoom",
    "typeText": "ChartView",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ChartView",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "rendererChange",
    "typeText": "ChartRendererKind",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts",
    "parameters": [
      {
        "name": "$event",
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

## Example: KPI cards

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnSparkline, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnSparkline],
  template: `
@let t = labels[language()];
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px">
  <div style="display: grid; gap: 4px">
    <span>{{ t.orders }}</span><strong>1,284</strong>
    <mn-sparkline [data]="orders" [name]="t.orders" />
  </div>
  <div style="display: grid; gap: 4px">
    <span>{{ t.revenue }}</span><strong>€48.2k</strong>
    <mn-sparkline type="area" [data]="revenue" [name]="t.revenue" />
  </div>
  <div style="display: grid; gap: 4px">
    <span>{{ t.signups }}</span><strong>312</strong>
    <mn-sparkline type="bar" [data]="signups" [name]="t.signups" />
  </div>
</div>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  orders = [32, 41, 38, 52, 49, 61, 58, 70, 66, 74];
  revenue = [3.1, 3.4, 3.2, 3.9, 4.4, 4.1, 4.6, 4.8, 4.5, 4.9];
  signups = [12, 18, 9, 22, 30, 25, 19, 28, 33, 31];
  labels = {
  "en": {
    "orders": "Orders",
    "revenue": "Revenue",
    "signups": "Sign-ups"
  },
  "zh": {
    "orders": "订单",
    "revenue": "收入",
    "signups": "注册"
  },
  "ja": {
    "orders": "注文",
    "revenue": "売上",
    "signups": "登録"
  },
  "fr": {
    "orders": "Commandes",
    "revenue": "Chiffre d'affaires",
    "signups": "Inscriptions"
  }
};
}

```

## Example: Target line and hover

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnSparkline, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnSparkline],
  template: `
@let t = labels[language()];
<mn-sparkline
  [data]="latency"
  [reference]="200"
  [name]="t.latency"
  [height]="64"
  (hover)="hovered = $event?.items?.[0]?.y ?? null"
/>
<output aria-live="polite">{{
  hovered === null ? t.hint : t.latency + ': ' + hovered + ' ms (' + t.target + ')'
}}</output>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  hovered: number | null = null;
  latency = [182, 175, 190, 214, 230, 205, 188, 176, 169, 181, 196, 172];
  labels = {
  "en": {
    "latency": "p95 latency",
    "target": "target 200 ms",
    "hint": "Hover the line"
  },
  "zh": {
    "latency": "p95 延迟",
    "target": "目标 200 毫秒",
    "hint": "将指针悬停在折线上"
  },
  "ja": {
    "latency": "p95 レイテンシ",
    "target": "目標 200 ms",
    "hint": "線にカーソルを合わせます"
  },
  "fr": {
    "latency": "Latence p95",
    "target": "objectif 200 ms",
    "hint": "Survolez la courbe"
  }
};
}

```

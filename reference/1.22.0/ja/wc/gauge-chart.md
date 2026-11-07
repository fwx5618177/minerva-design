# ゲージ

1 つの値を範囲とともに円弧上に表示し、色付きのしきい値も設定できます：KPI、使用率、スコアなど。value を変えると、円弧（と針）が現在の位置からアニメーションします。

Package: minerva-design@1.22.0

Renderer: wc

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.0",
  "sourceCommit": "330c90a7382a7141543dcdad732a4da31d58a37e",
  "sourceDigest": "sha256:cbdfa6292d29dec33adda7a3e9cf0e027da50858956b8d08e3f7f3ed59c8d78a",
  "referenceSourceDigest": "sha256:e3be8c06635194769da4944bbccaf8bcffec3fe4bddbd369b74caf5e4553345b"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.0/types.json) or getType() from minerva-design/contracts.

## Documentation

CPU

メモリ

ディスク

{{metric}}の使用率

ネットプロモータースコア

リクエスト / 秒

ライブ更新される毎秒リクエスト数

更新を一時停止

更新を再開

速度

スピードメーター：{{speed}}

ブレーキ

アクセル

ストレージ

API 呼び出し

シート

ビルド時間

{{used}} / {{limit}}

{{quota}}：クォータの {{share}} を使用

30 日間の可用性

目標：{{value}}

目標に対する 30 日間の可用性

残りのエラーバジェット

許容 {{budget}} のうち停止 {{used}}

今月の残りのエラーバジェット

温度の単位

°C

°F

目標

室温：{{value}}

サーモスタットの目標温度

目標温度を下げる

目標温度を上げる

{{target}} まで暖房中（室温：{{room}}）

{{target}} まで冷房中（室温：{{room}}）

{{target}} を維持（室温：{{room}}）

申請者

クレジットスコア

低い

やや低い

良好

とても良好

非常に優秀

範囲の {{share}} の位置

{{name}} のクレジットスコア

{{name}}：{{score}}。{{advice}}

ほとんどの金融機関で審査に通りません。

承認の可能性はありますが、金利は高めです。

ほとんどのローンを標準金利で利用できます。

平均より有利な金利を利用できます。

最も有利な金利を利用できます。

充電済み

航続距離：{{range}}

車のバッテリー残量

接続中

リセット

満充電

未接続

急速充電中

80 % 以上は低速充電中

80 % まであと{{minutes}}

{{value}} rpm

{{value}} MW

ダークパネル

ローター回転数

出力

ナセル温度

風力タービンの{{reading}}：{{value}}

## GaugeChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/gauge-chart",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "value",
    "typeText": "number",
    "attribute": "value",
    "required": false
  },
  {
    "name": "min",
    "typeText": "number",
    "attribute": "min",
    "required": false
  },
  {
    "name": "max",
    "typeText": "number",
    "attribute": "max",
    "required": false
  },
  {
    "name": "label",
    "typeText": "string | undefined",
    "attribute": "label",
    "required": false
  },
  {
    "name": "needle",
    "typeText": "boolean",
    "attribute": "needle",
    "required": false
  },
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "attribute": "height",
    "required": false
  },
  {
    "name": "bands",
    "typeText": "readonly GaugeBand[] | undefined",
    "required": false
  },
  {
    "name": "options",
    "typeText": "Partial<Omit<GaugeChartOptions, \"type\">> | undefined",
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

## Example: 色付きの範囲

3 つの範囲でトラックを区切ります。値の弧は終点の範囲の色になります。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/gauge-chart/wc/bands.html

```html
<minerva-gauge-chart id="cpu" value="72"></minerva-gauge-chart>

```

### apps/docs/src/docs/pages/gauge-chart/wc/bands.ts

```tsx
// Colored bands split the track; the value arc takes the color of its band.
import type { MinervaGaugeChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: "CPU load",
  zh: "CPU 负载",
  ja: "CPU 負荷",
  fr: "Charge CPU",
};

export function setup(root: HTMLElement) {
  const gauge = root.querySelector<MinervaGaugeChart>("#cpu")!;
  gauge.label =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  gauge.bands = [
    { to: 60, color: "var(--success-color, #16a34a)" },
    { to: 85, color: "var(--warning-color, #f59e0b)" },
    { to: 100, color: "var(--danger-color, #dc2626)" },
  ];
  gauge.options = { format: (value) => `${value}%` };
}

```

## Example: 針とカスタムスケール

0〜200 のスケールに針を表示し、掃引角を広く、弧を細くします。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/gauge-chart/wc/needle.html

```html
<minerva-gauge-chart
  id="speed"
  value="128"
  max="200"
  needle
  height="260"
></minerva-gauge-chart>

```

### apps/docs/src/docs/pages/gauge-chart/wc/needle.ts

```tsx
// `needle` adds a pointer to the arc; `min` / `max` set the scale and the
// options a wider sweep and thinner arc.
import type { MinervaGaugeChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: "Speed (km/h)",
  zh: "速度（公里/小时）",
  ja: "速度（km/h）",
  fr: "Vitesse (km/h)",
};

export function setup(root: HTMLElement) {
  const gauge = root.querySelector<MinervaGaugeChart>("#speed")!;
  gauge.label =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  gauge.options = { sweep: 270, thickness: 0.1 };
}

```

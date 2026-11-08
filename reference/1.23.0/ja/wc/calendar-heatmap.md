# カレンダーヒートマップ

日ごとの値をカレンダー上に表示します。コントリビューショングラフのように、コミット、学習の継続、運動、注文などに使えます。各日はレベルで色分けされたセルで、月名・曜日名、ツールチップの日付、週の始まりはロケールに従います。凡例でレベルの表示を切り替えられ、矢印キーで日単位・週単位に移動でき、ツールチップに日付が表示されます。

Package: minerva-design@1.23.0

Renderer: wc

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "19d3efc34af8ba4e23df0f24d9fbb0a587e1b452",
  "sourceDigest": "sha256:2005faebbf738765fe81a5c952fa47a51311aa5d05e3220f71c542b8b1fe369b",
  "referenceSourceDigest": "sha256:ec29900df0d5b5c8d741436acb4a250ec29e5f40ce1f4110def33ac2d66baaa5"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

## Documentation

過去 1 年間のコミット数：{{total}}

過去 1 年間の日ごとのコミット数

{{date}}：{{value}} コミット

日をクリック（またはチャートにフォーカスし、矢印キーで移動して Enter）すると選択できます

{{value}} 分

現在の連続記録：{{current}} 日 · 最長記録：{{longest}} 日

2026 年の日ごとの語学学習時間（分）

{{date}}：{{value}} 学習

{{date}}：学習なし

日をクリックすると学習時間を表示します

{{value}} km

2024〜2026 年の日ごとのランニング距離

{{year}} 年：{{value}}

週の始まり

ロケールに従う

2026 年の日ごとのオンライン注文数（月別）

ロケール

2026 年上半期の日ごとのデプロイ回数

{{value}} kWh

使用量の多い日のみ

すべて表示

2025 年の毎日の電力使用量

{{days}} 日を表示、合計 {{value}}（年間の {{share}}）

記録なし

目標 {{goal}} に対して {{value}}

1 晩平均 {{average}} · {{nights}} 晩中 {{reached}} 晩で目標 {{goal}} を達成

2026 年 5 月から 10 月までの毎晩の睡眠時間

年

{{year}} 年: 障害 {{total}} 件、障害のない日 {{quiet}} 日

{{value}} 件の障害

{{year}} 年の 1 日あたりの本番障害

{{date}}: 障害 {{value}} 件

{{date}}: 障害なし

{{date}}: これから

日にホバーすると障害件数を表示します

運動 {{done}} 回（日数の {{share}}）· 現在の連続記録: {{streak}} 日

リセット

実施

未実施

2026 年 8 月から 10 月までの毎日の運動記録

{{date}} を実施済みにしました

{{date}} を未実施にしました

日をクリック（またはその日で Enter キー）して運動を記録・取り消しします

## CalendarHeatmap

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/calendar-heatmap",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "layout",
    "typeText": "\"weeks\" | \"months\"",
    "attribute": "layout",
    "required": false
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "attribute": "locale",
    "required": false
  },
  {
    "name": "color",
    "typeText": "string | undefined",
    "attribute": "color",
    "required": false
  },
  {
    "name": "levels",
    "typeText": "number",
    "attribute": "levels",
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
    "typeText": "readonly CalendarDatum[] | undefined",
    "required": false
  },
  {
    "name": "range",
    "typeText": "number | readonly [CalendarDate, CalendarDate] | undefined",
    "required": false
  },
  {
    "name": "options",
    "typeText": "Partial<Omit<CalendarHeatmapOptions, \"type\">> | undefined",
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

## Example: 1 年間のコントリビューション

2025 年の日ごとの値。月や曜日の名前はページの言語の locale に従います。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/calendar-heatmap/wc/contributions.html

```html
<minerva-calendar-heatmap id="contributions"></minerva-calendar-heatmap>

```

### apps/docs/src/docs/pages/calendar-heatmap/wc/contributions.ts

```tsx
// A year of daily values, contributions-style: the month and weekday names
// and the first day of the week follow `locale` (the page language here).
import type { MinervaCalendarHeatmap } from "minerva-design/web-components/chart";

const TEXT = {
  en: { locale: "en-US", unit: "contributions" },
  zh: { locale: "zh-CN", unit: "次贡献" },
  ja: { locale: "ja-JP", unit: "件のコントリビューション" },
  fr: { locale: "fr-FR", unit: "contributions" },
};

// one value per day of 2025: busier on weekdays, deterministic
const fraction = (value: number) => value - Math.floor(value);
const DAYS = Array.from({ length: 365 }, (_, i) => ({
  date: Date.UTC(2025, 0, 1 + i),
  value: Math.floor(
    fraction(Math.sin(i * 12.9898) * 43758.5453) * (i % 7 < 5 ? 9 : 3),
  ),
}));

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaCalendarHeatmap>("#contributions")!;
  chart.data = DAYS;
  chart.range = 2025;
  chart.locale = text.locale;
  chart.options = { format: (value) => `${value} ${text.unit}` };
}

```

## Example: 月ごとのカレンダー

月ごとの小さなカレンダーに、しきい値を指定した 5 段階の色で表示します（1 日の歩数）。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/calendar-heatmap/wc/months.html

```html
<minerva-calendar-heatmap
  id="steps"
  layout="months"
  levels="5"
  height="420"
></minerva-calendar-heatmap>

```

### apps/docs/src/docs/pages/calendar-heatmap/wc/months.ts

```tsx
// `layout="months"`: a small calendar per month; `levels` sets the number
// of color steps above the empty days, `thresholds` their bounds.
import type { MinervaCalendarHeatmap } from "minerva-design/web-components/chart";

const TEXT = {
  en: { locale: "en-US" },
  zh: { locale: "zh-CN" },
  ja: { locale: "ja-JP" },
  fr: { locale: "fr-FR" },
};

// steps walked every day of the first half of 2026, deterministic
const fraction = (value: number) => value - Math.floor(value);
const STEPS = Array.from({ length: 181 }, (_, i) => ({
  date: Date.UTC(2026, 0, 1 + i),
  value: Math.round(3000 + fraction(Math.sin(i * 78.233) * 43758.5453) * 9000),
}));

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaCalendarHeatmap>("#steps")!;
  chart.data = STEPS;
  chart.range = ["2026-01-01", "2026-06-30"];
  chart.locale = text.locale;
  chart.options = {
    thresholds: [4000, 6000, 8000, 10000],
    color: "var(--success-color, #16a34a)",
  };
}

```

# カレンダーヒートマップ

日ごとの値をカレンダー上に表示します。コントリビューショングラフのように、コミット、学習の継続、運動、注文などに使えます。各日はレベルで色分けされたセルで、月名・曜日名、ツールチップの日付、週の始まりはロケールに従います。凡例でレベルの表示を切り替えられ、矢印キーで日単位・週単位に移動でき、ツールチップに日付が表示されます。

Package: minerva-design@1.23.1

Renderer: angular

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

Support: beta

Native Angular: MnCalendarHeatmap. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnCalendarHeatmap"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "data",
    "typeText": "readonly CalendarDatum[]",
    "required": true,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "range",
    "typeText": "number | readonly [CalendarDate, CalendarDate] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "layout",
    "typeText": "\"weeks\" | \"months\" | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "weekStart",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "color",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "colors",
    "typeText": "readonly string[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "levels",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  },
  {
    "name": "thresholds",
    "typeText": "readonly number[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/shape-extended.ts"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 1 年間のコントリビューション

range を指定しないと、データの最終日までの 53 週を表示します。color で最上位レベルの色を設定します（下位レベルはライト・ダークどちらのテーマでも薄くなります）。onClick はクリックした日を返し、name に書式化された日付、date に YYYY-MM-DD 形式の日付が入ります。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnCalendarHeatmap, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnCalendarHeatmap],
  template: `
@let t = labels[language()];
<mn-calendar-heatmap [data]="days" [range]="2025" [locale]="t.locale" />
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  days = Array.from({ length: 365 }, (_, i) => ({ date: Date.UTC(2025, 0, 1 + i), value: Math.floor((Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1) * (i % 7 < 5 ? 9 : 3)) }));
  labels = {
  "en": {
    "locale": "en-US",
    "unit": "contributions"
  },
  "zh": {
    "locale": "zh-CN",
    "unit": "次贡献"
  },
  "ja": {
    "locale": "ja-JP",
    "unit": "件のコントリビューション"
  },
  "fr": {
    "locale": "fr-FR",
    "unit": "contributions"
  }
};
}

```

## Example: 月ごとのカレンダー

layout="months" で月ごとに小さなカレンダーを描き、セルが最も大きくなるグリッドに並べます。weekStart はロケールによる週の始まりを上書きします。注文のない日（毎週月曜は定休日）は空のままです。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnCalendarHeatmap, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnCalendarHeatmap],
  template: `
@let t = labels[language()];
<mn-calendar-heatmap
  [data]="steps"
  [range]="['2026-01-01', '2026-06-30']"
  layout="months"
  [levels]="5"
  [thresholds]="[4000, 6000, 8000, 10000]"
  color="var(--success-color, #16a34a)"
  [locale]="t.locale"
  [height]="420"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  steps = Array.from({ length: 181 }, (_, i) => ({ date: Date.UTC(2026, 0, 1 + i), value: Math.round(3000 + (Math.abs(Math.sin(i * 78.233) * 43758.5453) % 1) * 9000) }));
  labels = {
  "en": {
    "locale": "en-US"
  },
  "zh": {
    "locale": "zh-CN"
  },
  "ja": {
    "locale": "ja-JP"
  },
  "fr": {
    "locale": "fr-FR"
  }
};
}

```

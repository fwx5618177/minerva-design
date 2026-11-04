# カレンダーヒートマップ

日ごとの値をカレンダー上に表示します。コントリビューショングラフのように、コミット、学習の継続、運動、注文などに使えます。各日はレベルで色分けされたセルで、月名・曜日名、ツールチップの日付、週の始まりはロケールに従います。凡例でレベルの表示を切り替えられ、矢印キーで日単位・週単位に移動でき、ツールチップに日付が表示されます。

Package: minerva-design@1.20.5

Renderer: native

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.5",
  "sourceCommit": "fe15b45f84b480cdd9cfec147df037927ba34a6b",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:0dc58bd28a1a59067b94630bd49c5b94d839bdc57ee30a0eaa7de1d0a9681cfb"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.5/types.json) or getType() from minerva-design/contracts.

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

Chart component of minerva-design/native: the canvas chart engine drawn with views (touch scrub, pinch zoom, legend toggles).

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "CalendarHeatmap"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "data",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "array",
    "typeText": "readonly CalendarDatum[]",
    "typeRef": "type:5f1af2a4d17fe1cfc728",
    "required": true,
    "description": "Daily values (several entries of the same day add up)"
  },
  {
    "name": "range",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "union",
    "typeText": "number | readonly [CalendarDate, CalendarDate] | undefined",
    "typeRef": "type:4b12d2b81062a2b776c5",
    "required": false,
    "description": "Days shown: a year (`2026`) or an inclusive `[start, end]` range"
  },
  {
    "name": "layout",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "enum",
    "values": [
      "months",
      "weeks"
    ],
    "typeText": "\"weeks\" | \"months\" | undefined",
    "typeRef": "type:b873a466717fc9913cac",
    "default": "weeks",
    "required": false,
    "description": "`weeks`: a column per week and a row per weekday (one strip per year when the range spans several years); `months`: a small calendar per month"
  },
  {
    "name": "weekStart",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "First day of the week, 0 = Sunday … 6 = Saturday"
  },
  {
    "name": "locale",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "BCP 47 locale of the month and weekday names, of the tooltip dates and of the default `weekStart`"
  },
  {
    "name": "color",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Color of the highest level (lower levels are lighter)"
  },
  {
    "name": "colors",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "array",
    "typeText": "readonly string[] | undefined",
    "typeRef": "type:88dcb55e82bb1c501478",
    "required": false,
    "description": "Colors of the levels, lowest first (replaces `color` and sets the number of levels)"
  },
  {
    "name": "levels",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 4,
    "required": false,
    "description": "Number of color levels above the empty days"
  },
  {
    "name": "thresholds",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "array",
    "typeText": "readonly number[] | undefined",
    "typeRef": "type:9b11f9b3b1a7e709603e",
    "required": false,
    "description": "Upper bounds of the levels but the last, ascending (`[2, 5, 10]`: 1-2, 3-5, 6-10, more); an even split of the largest value by default"
  },
  {
    "name": "gap",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 3,
    "required": false,
    "description": "Gap between the cells, in pixels"
  },
  {
    "name": "radius",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 2,
    "required": false,
    "description": "Corner radius of the cells, in pixels"
  },
  {
    "name": "maxCellSize",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Largest cell size, in pixels (cells shrink to fit the width)"
  },
  {
    "name": "monthLabels",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Month names (and years) around the cells"
  },
  {
    "name": "weekdayLabels",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Weekday names beside (weeks) or above (months) the cells"
  },
  {
    "name": "palette",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "array",
    "typeText": "readonly string[] | undefined",
    "typeRef": "type:88dcb55e82bb1c501478",
    "required": false,
    "description": "Colors of the marks without `color` (defaults to the `chart-series-1..8` tokens, then the theme colors)"
  },
  {
    "name": "legend",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "union",
    "typeText": "boolean | ShapeLegendOptions | undefined",
    "typeRef": "type:b3cd5c49d86fb91effb3",
    "required": false,
    "description": "Legend; tapping an item hides / shows its slice, stage, series, node, bar, row or level"
  },
  {
    "name": "tooltip",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "union",
    "typeText": "boolean | ShapeTooltipOptions | undefined",
    "typeRef": "type:9441d8fe0edba7239796",
    "default": true,
    "required": false,
    "description": "Tooltip shown while a mark is pressed; `false` disables it"
  },
  {
    "name": "format",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "function",
    "typeText": "((value: number) => string) | undefined",
    "typeRef": "type:541b024ed1104992e34e",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "number",
        "typeRef": "type:7d1137535c313783dadd"
      }
    ],
    "returnType": {
      "typeText": "string",
      "typeRef": "type:e15e314d298fc0d116fc"
    },
    "required": false,
    "description": "Formats the values of the labels and the tooltip"
  },
  {
    "name": "percentFormat",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "function",
    "typeText": "((share: number) => string) | undefined",
    "typeRef": "type:d92c3cd66b7afc0213bc",
    "parameters": [
      {
        "name": "share",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "number",
        "typeRef": "type:7d1137535c313783dadd"
      }
    ],
    "returnType": {
      "typeText": "string",
      "typeRef": "type:e15e314d298fc0d116fc"
    },
    "required": false,
    "description": "Formats the shares (labels, conversion rates, tooltip); `share` is 0-1"
  },
  {
    "name": "hidden",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "array",
    "typeText": "readonly number[] | undefined",
    "typeRef": "type:9b11f9b3b1a7e709603e",
    "required": false,
    "description": "Hidden slices / stages / radar series / top-level treemap or sunburst nodes / sankey nodes / radial bars / bullet rows / calendar levels, by index. Makes the visibility controlled: legend taps then only call `onToggle`, whose `hiddenIndexes` should be stored and passed back."
  },
  {
    "name": "animation",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Entry and update animations (skipped when the theme reduces motion)"
  },
  {
    "name": "padding",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "object",
    "typeText": "ChartPadding | undefined",
    "typeRef": "type:7c2c76b2d4d6c9fbf43a",
    "required": false,
    "description": "Space around the drawing, in pixels"
  },
  {
    "name": "ariaLabel",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible name of the chart"
  },
  {
    "name": "texts",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "object",
    "typeText": "Partial<ShapeChartLabels> | undefined",
    "typeRef": "type:2ef787a978af6750b6c8",
    "required": false,
    "description": "Replaces built-in texts of the `locale`"
  },
  {
    "name": "height",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "union",
    "typeText": "DimensionValue | undefined",
    "typeRef": "type:cd08f9fa3f57e56425b7",
    "required": false,
    "description": "Height of the chart (the legend included)"
  },
  {
    "name": "width",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "union",
    "typeText": "DimensionValue | undefined",
    "typeRef": "type:cd08f9fa3f57e56425b7",
    "default": "100%",
    "required": false,
    "description": "Width of the chart"
  },
  {
    "name": "renderTooltip",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "node",
    "typeText": "((event: ShapeHoverEvent) => ReactNode) | undefined",
    "typeRef": "type:9333c89b3161f5ff3652",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ShapeHoverEvent",
        "typeRef": "type:019a32700cb7aa817346"
      }
    ],
    "returnType": {
      "typeText": "ReactNode",
      "typeRef": "type:d947e2db6b7ed3e4c192"
    },
    "required": false,
    "description": "React content of the tooltip (replaces the default content)"
  },
  {
    "name": "testID",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Test identifier of the root view"
  }
]
```

### events

```json
[
  {
    "name": "onHover",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "function",
    "typeText": "((event: ShapeHoverEvent | null) => void) | undefined",
    "typeRef": "type:fa632874a08b24956e5f",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ShapeHoverEvent | null",
        "typeRef": "type:5ce60fcc1021d329ffba"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the highlighted mark changes (press and drag over the chart)"
  },
  {
    "name": "onClick",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "function",
    "typeText": "((event: ShapeHoverEvent) => void) | undefined",
    "typeRef": "type:8504b594a968c22eaac5",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ShapeHoverEvent",
        "typeRef": "type:019a32700cb7aa817346"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when a mark is tapped"
  },
  {
    "name": "onToggle",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "function",
    "typeText": "((event: ShapeToggleEvent) => void) | undefined",
    "typeRef": "type:d096120cd0ab66afae24",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ShapeToggleEvent",
        "typeRef": "type:4b4244045a32e66c0a25"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when a legend item is tapped (or the instance's `toggle()` is called), with the toggled index and every hidden index after the toggle"
  }
]
```

## API

```json
{
  "native:CalendarHeatmapProps": {
    "source": "native/src/components/ShapeChart/types.ts",
    "description": "Props of CalendarHeatmap",
    "kind": "interface",
    "extends": [
      "ShapeChartCommonProps"
    ],
    "props": [
      {
        "name": "data",
        "type": "readonly CalendarDatum[]",
        "required": true,
        "description": "Daily values (several entries of the same day add up)"
      },
      {
        "name": "range",
        "type": "number | readonly [CalendarDate, CalendarDate]",
        "required": false,
        "default": "the 53 weeks ending on the last day of the data",
        "description": "Days shown: a year (`2026`) or an inclusive `[start, end]` range"
      },
      {
        "name": "layout",
        "type": "\"weeks\" | \"months\"",
        "required": false,
        "default": "\"weeks\"",
        "description": "`weeks`: a column per week and a row per weekday (one strip per year when the range spans several years); `months`: a small calendar per month"
      },
      {
        "name": "weekStart",
        "type": "number",
        "required": false,
        "default": "from `locale`",
        "description": "First day of the week, 0 = Sunday … 6 = Saturday"
      },
      {
        "name": "locale",
        "type": "string",
        "required": false,
        "default": "the runtime's default locale",
        "description": "BCP 47 locale of the month and weekday names, of the tooltip dates and of the default `weekStart`"
      },
      {
        "name": "color",
        "type": "string",
        "required": false,
        "default": "the first palette color",
        "description": "Color of the highest level (lower levels are lighter)"
      },
      {
        "name": "colors",
        "type": "readonly string[]",
        "required": false,
        "description": "Colors of the levels, lowest first (replaces `color` and sets the number of levels)"
      },
      {
        "name": "levels",
        "type": "number",
        "required": false,
        "default": "4",
        "description": "Number of color levels above the empty days"
      },
      {
        "name": "thresholds",
        "type": "readonly number[]",
        "required": false,
        "description": "Upper bounds of the levels but the last, ascending (`[2, 5, 10]`: 1-2, 3-5, 6-10, more); an even split of the largest value by default"
      },
      {
        "name": "gap",
        "type": "number",
        "required": false,
        "default": "3",
        "description": "Gap between the cells, in pixels"
      },
      {
        "name": "radius",
        "type": "number",
        "required": false,
        "default": "2",
        "description": "Corner radius of the cells, in pixels"
      },
      {
        "name": "maxCellSize",
        "type": "number",
        "required": false,
        "default": "16 (weeks), 28 (months)",
        "description": "Largest cell size, in pixels (cells shrink to fit the width)"
      },
      {
        "name": "monthLabels",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Month names (and years) around the cells"
      },
      {
        "name": "weekdayLabels",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Weekday names beside (weeks) or above (months) the cells"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: basic

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/calendar-heatmap/native/basic.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import {
  CalendarHeatmap,
  useTheme,
  type CalendarDatum,
  type ShapeHoverEvent,
} from "minerva-design/native";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const DAY = 24 * 60 * 60 * 1000;
const iso = (time: number) => new Date(time).toISOString().slice(0, 10);

// A developer's commits over the last four months (a phone fits ~17 weeks):
// busy weekdays, quiet weekends and a release crunch every few weeks
const END = Date.UTC(2026, 9, 24);
const START = END - 118 * DAY;
const random = mulberry32(7);
const COMMITS: CalendarDatum[] = [];
for (let time = START; time <= END; time += DAY) {
  const weekday = new Date(time).getUTCDay();
  const weekend = weekday === 0 || weekday === 6;
  const crunch = ((time - START) / DAY) % 40 < 5;
  if (random() < (weekend ? 0.2 : 0.82))
    COMMITS.push({
      date: iso(time),
      value: Math.max(
        1,
        Math.round(random() * (weekend ? 4 : 9) * (crunch ? 2.2 : 1)),
      ),
    });
}
const RANGE = [iso(START), iso(END)] as const;

export default function Basic() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.calendar-heatmap",
  });
  const { colors } = useTheme();
  const [selected, setSelected] = useState<ShapeHoverEvent | null>(null);
  const total = useMemo(() => COMMITS.reduce((sum, d) => sum + d.value, 0), []);
  return (
    <View style={{ width: "100%", gap: 8 }}>
      <Text style={{ color: colors["text-color"] }}>
        {t("native.data.total", { total })}
      </Text>
      <CalendarHeatmap
        data={COMMITS}
        range={RANGE}
        locale={i18n.language}
        color="#2da44e"
        onClick={setSelected}
        ariaLabel={t("data.commitsAria")}
      />
      <Text role="status" style={{ color: colors["text-secondary-color"] }}>
        {selected
          ? t("data.commitsDay", {
              date: selected.name,
              value: selected.value,
            })
          : t("native.data.tapDay")}
      </Text>
    </View>
  );
}

```

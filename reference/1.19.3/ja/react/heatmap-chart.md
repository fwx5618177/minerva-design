# ヒートマップ

値に応じて色分けしたセルのグリッド。両軸ともカテゴリまたは数値を使えます。曜日×時間帯のアクティビティ、相関行列、指標の分布マップなどに。セルにホバーするとセルが浮き上がり、行と列が強調され、カラー凡例に値が示されます。

Package: minerva-design@1.19.3

Renderer: react

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

セッション

曜日と時間帯別のセッション数

偏差

1995〜2024 年の月別気温偏差

信号強度

200 × 100 m のフロアの Wi-Fi 信号強度

{{cells}} セル · {{renderer}} で描画 · Ctrl / ⌘ + ホイールでズーム、ドラッグでパン、ダブルクリックでリセット

コントリビューション

1 年間の日別コントリビューション数

過去 1 年間で {{total}} 件のコントリビューション

セッション

ページビュー

登録数

売上

解約

サポートチケット

相関係数

6 つの製品指標の相関行列

{{n}} か月目

継続率

月別登録コホートの継続率

デスクトップ

モバイル

タブレット

自然検索

有料検索

ソーシャル

メール

参照元サイト

直接

{{source}} × {{device}}: {{sessions}} セッションから {{orders}} 件の注文、{{rate}}:

平均 {{value}} を上回る

平均 {{value}} を下回る

セルをクリックすると、セッション数と注文数を表示します。

コンバージョン率

流入元とデバイス別のコンバージョン率

ラック {{n}}

センサー {{n}}

一時停止

再開

最高温: {{rack}} の {{sensor}}、{{value}} · {{limit}} 超えのセンサー {{alarms}} 個

吸気温度

10 台のサーバーラックのセンサーのライブ吸気温度

猫

犬

鳥

乗用車

トラック

実際: {{actual}}、予測: {{predicted}}

{{value}} 枚（クラスの {{share}}）

再現率: {{value}}

適合率: {{value}}

誤分類

正解率: テスト画像 {{images}} 枚中 {{value}}

クラス内の割合

予測クラス

実際のクラス

5 クラスの画像分類器の混同行列

北部

南部

東部

西部

中部

第 {{n}} 四半期

指標

売上

2025 年比の成長率

粗利益率

{{region}}・{{quarter}}

最高: {{best}}（{{bestValue}}）· 最低: {{worst}}（{{worstValue}}）

地域と四半期別の 2026 年の販売指標

## HeatmapChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/charts",
  "exports": [
    "HeatmapChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "tooltip",
    "source": "packages/charts/src/react/types.ts",
    "kind": "union",
    "typeText": "boolean | ChartTooltipOptions | undefined",
    "typeRef": "type:c08795b3492e4547d570",
    "required": false,
    "description": "Tooltip; `false` disables it"
  },
  {
    "name": "legend",
    "source": "packages/charts/src/react/types.ts",
    "kind": "union",
    "typeText": "boolean | ChartLegendOptions | undefined",
    "typeRef": "type:860fa553ee4deaac43f8",
    "required": false,
    "description": "Legend; shown by default when several series have a name"
  },
  {
    "name": "height",
    "source": "packages/charts/src/react/types.ts",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "default": 320,
    "required": false,
    "description": "Height of the chart (the legend included); numbers are pixels"
  },
  {
    "name": "width",
    "source": "packages/charts/src/react/types.ts",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "default": "100%",
    "required": false,
    "description": "Width of the chart; numbers are pixels"
  },
  {
    "name": "labels",
    "source": "packages/charts/src/react/types.ts",
    "kind": "object",
    "typeText": "Partial<ChartLabels> | undefined",
    "typeRef": "type:14c31fd72a2c2ac7a7fd",
    "required": false,
    "description": "Overrides of the built-in texts of the `locale`"
  },
  {
    "name": "renderTooltip",
    "source": "packages/charts/src/react/types.ts",
    "kind": "node",
    "typeText": "((event: ChartHoverEvent) => ReactNode) | undefined",
    "typeRef": "type:018692c396245c230316",
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
  },
  {
    "name": "xAxis",
    "source": "packages/charts/src/react/types.ts",
    "kind": "object",
    "typeText": "ChartAxisOptions | undefined",
    "typeRef": "type:6eb50d4f419370a826a4",
    "required": false,
    "description": "X axis"
  },
  {
    "name": "yAxis",
    "source": "packages/charts/src/react/types.ts",
    "kind": "object",
    "typeText": "ChartAxisOptions | undefined",
    "typeRef": "type:6eb50d4f419370a826a4",
    "required": false,
    "description": "Y axis"
  },
  {
    "name": "renderer",
    "source": "packages/charts/src/react/types.ts",
    "kind": "enum",
    "values": [
      "auto",
      "canvas2d",
      "webgl",
      "webgl2",
      "webgpu"
    ],
    "typeText": "ChartRendererPreference | undefined",
    "typeRef": "type:dc7d7e6f384ddec86e04",
    "default": "auto",
    "required": false,
    "description": "Backend of the data layer: `auto` tries WebGPU, then WebGL2, then WebGL, then Canvas2D"
  },
  {
    "name": "annotations",
    "source": "packages/charts/src/react/types.ts",
    "kind": "array",
    "typeText": "readonly ChartAnnotation[] | undefined",
    "typeRef": "type:84228cb24d45ac3a017b",
    "required": false,
    "description": "Background areas and reference lines"
  },
  {
    "name": "interaction",
    "source": "packages/charts/src/react/types.ts",
    "kind": "union",
    "typeText": "boolean | ChartInteractionOptions | undefined",
    "typeRef": "type:f4b160d7dd18649fd178",
    "default": true,
    "required": false,
    "description": "Zoom (Ctrl / ⌘ + wheel, pinch), pan (drag), double-click reset and keyboard navigation; `false` makes the chart static"
  },
  {
    "name": "padding",
    "source": "packages/charts/src/react/types.ts",
    "kind": "object",
    "typeText": "ChartPadding | undefined",
    "typeRef": "type:7c2c76b2d4d6c9fbf43a",
    "required": false,
    "description": "Space around the plot area, in pixels"
  },
  {
    "name": "palette",
    "source": "packages/charts/src/react/types.ts",
    "kind": "array",
    "typeText": "readonly string[] | undefined",
    "typeRef": "type:3c1d4f0e2c96bafd8005",
    "required": false,
    "description": "Series colors (defaults to the `--chart-series-1..8` CSS variables, then the theme colors)"
  },
  {
    "name": "ariaLabel",
    "source": "packages/charts/src/react/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible name of the chart"
  },
  {
    "name": "locale",
    "source": "packages/charts/src/react/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Locale of the texts and numbers the chart writes (tooltip rows, compact units `k` / `万`, separators, month and weekday names of time axes)"
  },
  {
    "name": "data",
    "source": "packages/charts/src/engine/presets.ts",
    "kind": "array",
    "typeText": "readonly HeatmapCell[]",
    "typeRef": "type:ae743949cf28ce85f5d2",
    "required": true,
    "description": "Cells"
  },
  {
    "name": "xCategories",
    "source": "packages/charts/src/engine/presets.ts",
    "kind": "array",
    "typeText": "readonly string[] | undefined",
    "typeRef": "type:3c1d4f0e2c96bafd8005",
    "required": false,
    "description": "Column names in order (collected from the data when omitted)"
  },
  {
    "name": "yCategories",
    "source": "packages/charts/src/engine/presets.ts",
    "kind": "array",
    "typeText": "readonly string[] | undefined",
    "typeRef": "type:3c1d4f0e2c96bafd8005",
    "required": false,
    "description": "Row names from bottom to top (collected from the data when omitted)"
  },
  {
    "name": "colorScale",
    "source": "packages/charts/src/engine/presets.ts",
    "kind": "union",
    "typeText": "readonly string[] | ChartColorScheme | undefined",
    "typeRef": "type:6cbf256a2b998a454db1",
    "default": "sequential",
    "required": false,
    "description": "Colors from the lowest to the highest value (interpolated in OKLab), or a built-in theme-aware ramp of the first palette color"
  },
  {
    "name": "valueRange",
    "source": "packages/charts/src/engine/presets.ts",
    "kind": "array",
    "typeText": "readonly [number, number] | undefined",
    "typeRef": "type:77aa7481bdbc4eb34fae",
    "required": false,
    "description": "Values at the ends of the color scale; the data range by default"
  },
  {
    "name": "colorMidpoint",
    "source": "packages/charts/src/engine/presets.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Value at the middle of the color scale (diverging data)"
  },
  {
    "name": "name",
    "source": "packages/charts/src/engine/presets.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Name of the value in the tooltip"
  },
  {
    "name": "radius",
    "source": "packages/charts/src/engine/presets.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Corner radius of the cells, in pixels"
  },
  {
    "name": "format",
    "source": "packages/charts/src/engine/presets.ts",
    "kind": "function",
    "typeText": "((value: number) => string) | undefined",
    "typeRef": "type:7ffadb149c54b261e07b",
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
    "description": "Formats the values in the tooltip"
  }
]
```

### events

```json
[
  {
    "name": "onPointClick",
    "source": "packages/charts/src/react/types.ts",
    "kind": "function",
    "typeText": "((event: ChartHoverEvent) => void) | undefined",
    "typeRef": "type:677083ee0328d7ee4253",
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
    "description": "Called when a point (or bar) is clicked"
  },
  {
    "name": "onPlotClick",
    "source": "packages/charts/src/react/types.ts",
    "kind": "function",
    "typeText": "((event: ChartPlotClickEvent) => void) | undefined",
    "typeRef": "type:0256cf20d9a3f1b1c88a",
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
    "description": "Called when the plot area is clicked where there is no point"
  },
  {
    "name": "onHover",
    "source": "packages/charts/src/react/types.ts",
    "kind": "function",
    "typeText": "((event: ChartHoverEvent | null) => void) | undefined",
    "typeRef": "type:7f639ac6d9481ff0bde9",
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
    "description": "Called when the hovered (or keyboard-focused) points change"
  },
  {
    "name": "onZoom",
    "source": "packages/charts/src/react/types.ts",
    "kind": "function",
    "typeText": "((view: ChartView) => void) | undefined",
    "typeRef": "type:ee073556f18eb3ee4cae",
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
  },
  {
    "name": "onRendererChange",
    "source": "packages/charts/src/react/types.ts",
    "kind": "function",
    "typeText": "((renderer: ChartRendererKind) => void) | undefined",
    "typeRef": "type:167734f7bd5dd7f686a6",
    "parameters": [
      {
        "name": "renderer",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ChartRendererKind",
        "typeRef": "type:3439f360c8a2b0649d25"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called with the backend once it is ready (and when it falls back after a GPU loss)"
  }
]
```

### bindings

```json
[
  {
    "prop": "renderer",
    "event": "onRendererChange",
    "syntax": "renderer={renderer} onRendererChange={handler}"
  }
]
```

## API

```json
{
  "HeatmapChartProps": {
    "source": "charts/src/react/types.ts",
    "description": "Props of HeatmapChart",
    "kind": "interface",
    "extends": [
      "Omit<ChartCommonProps, \"crosshair\">",
      "HeatmapConfig"
    ],
    "props": []
  },
  "HeatmapConfig": {
    "source": "charts/src/engine/presets.ts",
    "description": "Settings of a heatmap (the props of HeatmapChart)",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "data",
        "type": "readonly HeatmapCell[]",
        "required": true,
        "description": "Cells"
      },
      {
        "name": "xCategories",
        "type": "readonly string[]",
        "required": false,
        "description": "Column names in order (collected from the data when omitted)"
      },
      {
        "name": "yCategories",
        "type": "readonly string[]",
        "required": false,
        "description": "Row names from bottom to top (collected from the data when omitted)"
      },
      {
        "name": "colorScale",
        "type": "readonly string[] | ChartColorScheme",
        "required": false,
        "default": "\"sequential\"",
        "description": "Colors from the lowest to the highest value (interpolated in OKLab), or a built-in theme-aware ramp of the first palette color"
      },
      {
        "name": "valueRange",
        "type": "readonly [number, number]",
        "required": false,
        "description": "Values at the ends of the color scale; the data range by default"
      },
      {
        "name": "colorMidpoint",
        "type": "number",
        "required": false,
        "default": "0 for `diverging` ramps spanning it, else the middle of the range",
        "description": "Value at the middle of the color scale (diverging data)"
      },
      {
        "name": "name",
        "type": "string",
        "required": false,
        "description": "Name of the value in the tooltip"
      },
      {
        "name": "radius",
        "type": "number",
        "required": false,
        "description": "Corner radius of the cells, in pixels"
      },
      {
        "name": "format",
        "type": "(value: number) => string",
        "required": false,
        "description": "Formats the values in the tooltip"
      }
    ]
  },
  "HeatmapCell": {
    "source": "charts/src/engine/presets.ts",
    "description": "A cell of a HeatmapChart",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "x",
        "type": "string | number",
        "required": true,
        "description": "Column: a category name (or a number on a numeric axis)"
      },
      {
        "name": "y",
        "type": "string | number",
        "required": true,
        "description": "Row: a category name (or a number on a numeric axis)"
      },
      {
        "name": "value",
        "type": "number | null",
        "required": true,
        "description": "Value mapped to the color scale; `null` leaves the cell empty"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: コントリビューションカレンダー

GitHub のプロフィールのように 1 年間の日別コントリビューションを表示します。週を数値の列、曜日を行にし、x の書式で週番号を月に変え、palette={["var(--success-color)"]} でライトとダークの両テーマで見やすい緑のスケールにします。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/heatmap-chart/demos/activity.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { HeatmapChart, type HeatmapCell } from "minerva-design/charts";

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
const WEEKS = 52;
// first Monday of the year shown
const START = Date.UTC(2025, 10, 3);

// Contributions per day: weekdays busier, a quiet holiday period, a few streaks
const random = mulberry32(52);
const contributions: { week: number; day: number; count: number }[] = [];
for (let week = 0; week < WEEKS; week++) {
  const holiday = week >= 7 && week <= 8;
  const streak = week % 13 > 8;
  for (let day = 0; day < 7; day++) {
    const weekend = day >= 5;
    const busy =
      (weekend ? 0.15 : 0.7) * (holiday ? 0.1 : 1) * (streak ? 1.8 : 1);
    const count = random() < busy ? Math.round(random() * 12 * busy) : 0;
    contributions.push({ week, day, count });
  }
}

/** Short weekday names in the reader's language, Monday first */
const weekdays = (locale: string) => {
  const format = new Intl.DateTimeFormat(locale, { weekday: "short" });
  return Array.from({ length: 7 }, (_, i) =>
    format.format(new Date(2026, 0, 5 + i)),
  );
};

export default function ActivityDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.heatmap-chart.data",
  });
  const locale = i18n.language;
  const days = useMemo(() => weekdays(locale), [locale]);

  // columns are weeks (numbers), rows are weekdays (categories)
  const data = useMemo(
    (): HeatmapCell[] =>
      contributions.map(({ week, day, count }) => ({
        x: week,
        y: days[day],
        value: count,
      })),
    [days],
  );
  // the x ticks show the month of the week
  const month = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        month: "short",
        year: "2-digit",
        timeZone: "UTC",
      }),
    [locale],
  );
  const total = contributions.reduce((sum, { count }) => sum + count, 0);

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <HeatmapChart
        data={data}
        yCategories={[...days].reverse()}
        // a ramp of the success color, readable in light and dark themes
        palette={["var(--success-color)"]}
        valueRange={[0, 12]}
        name={t("contributions")}
        xAxis={{
          format: (week) => month.format(START + Math.round(week) * 7 * DAY),
          tickCount: 12,
        }}
        radius={2}
        height={200}
        ariaLabel={t("activityAria")}
      />
      <p>
        {t("activityTotal", {
          total: new Intl.NumberFormat(locale).format(total),
        })}
      </p>
    </div>
  );
}

```

## Example: 週間アクティビティ

カテゴリ軸上の 7 × 24 セル。既定のカラースケールは知覚的に均一（OKLab）でテーマに追従します。ライトモードでは白に近い色から濃いプライマリ色へ、ダークモードでは背景に近い色から明るい色へ変化し、カラー凡例が範囲を示します。yCategories は行を下から上の順に並べるため、曜日を逆順にしています。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/heatmap-chart/demos/basic.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { HeatmapChart, type HeatmapCell } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Short weekday names in the reader's language, Monday first */
const weekdays = (locale: string) => {
  const format = new Intl.DateTimeFormat(locale, { weekday: "short" });
  // 5 January 2026 is a Monday
  return Array.from({ length: 7 }, (_, i) =>
    format.format(new Date(2026, 0, 5 + i)),
  );
};

/** Hours of the day: "9 AM", "9時", "09 h"... */
const hoursOfDay = (locale: string) => {
  const format = new Intl.DateTimeFormat(locale, { hour: "numeric" });
  return Array.from({ length: 24 }, (_, h) =>
    format.format(new Date(2026, 0, 5, h)),
  );
};

const bump = (hour: number, center: number, width: number) =>
  Math.exp(-((hour - center) ** 2) / (2 * width ** 2));

export default function BasicDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.heatmap-chart.data",
  });
  const locale = i18n.language;
  const days = useMemo(() => weekdays(locale), [locale]);
  const hours = useMemo(() => hoursOfDay(locale), [locale]);

  const data = useMemo((): HeatmapCell[] => {
    const random = mulberry32(24);
    return days.flatMap((day, d) => {
      const weekend = d >= 5;
      return hours.map((hour, h) => {
        // office hours with a lunch dip on weekdays, late mornings at weekends
        const activity = weekend
          ? 0.55 * bump(h, 13, 4) + 0.3 * bump(h, 21, 2)
          : bump(h, 10.5, 1.8) +
            0.9 * bump(h, 15, 2) -
            0.25 * bump(h, 12.5, 0.8) +
            0.35 * bump(h, 21, 1.5);
        const value = Math.max(0, activity) * 1200 + 40 + random() * 90;
        return { x: hour, y: day, value: Math.round(value) };
      });
    });
  }, [days, hours]);
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);

  return (
    <HeatmapChart
      data={data}
      xCategories={hours}
      // rows go from bottom to top: reverse them to read Monday first
      yCategories={[...days].reverse()}
      name={t("sessions")}
      format={(value) => number.format(value)}
      height={280}
      ariaLabel={t("sessionsAria")}
    />
  );
}

```

## Example: 発散型カラースケール

colorScale には最小値から最大値までの色を並べます。CSS 変数も使えるので、中央の色をテーマに合わせられます。対称な valueRange により 0 がスケールの中央に保たれます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/heatmap-chart/demos/color-scale.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { HeatmapChart, type HeatmapCell } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Short month names in the reader's language */
const monthNames = (locale: string) => {
  const format = new Intl.DateTimeFormat(locale, { month: "short" });
  return Array.from({ length: 12 }, (_, m) =>
    format.format(new Date(2026, m, 1)),
  );
};
const years = Array.from({ length: 30 }, (_, i) => String(1995 + i));
// warm years of strong El Niño events
const elNino: Record<string, number> = {
  "1998": 0.5,
  "2016": 0.45,
  "2024": 0.4,
};

// Blue below the reference period, the page background at 0, red above
const diverging = [
  "#2166ac",
  "#67a9cf",
  "var(--background-color)",
  "#ef8a62",
  "#b2182b",
];

export default function ColorScaleDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.heatmap-chart.data",
  });
  const locale = i18n.language;
  const months = useMemo(() => monthNames(locale), [locale]);

  const data = useMemo((): HeatmapCell[] => {
    const random = mulberry32(1995);
    return years.flatMap((year, i) =>
      months.map((month) => {
        const trend = -0.75 + i * 0.07;
        const noise = (random() + random() - 1) * 0.7;
        const value = trend + noise + (elNino[year] ?? 0);
        return { x: year, y: month, value: Math.round(value * 100) / 100 };
      }),
    );
  }, [months]);
  // "+0.42 °C", "+0,42 °C"...
  const celsius = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "unit",
        unit: "celsius",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        signDisplay: "exceptZero",
      }),
    [locale],
  );

  return (
    <HeatmapChart
      data={data}
      xCategories={years}
      yCategories={[...months].reverse()}
      colorScale={diverging}
      // symmetric range: 0 stays in the middle of the scale
      valueRange={[-2, 2]}
      name={t("anomaly")}
      format={(value) => celsius.format(value)}
      radius={1}
      height={340}
      ariaLabel={t("anomalyAria")}
    />
  );
}

```

## Example: 混同行列

画像分類器の予測を、各セルが実際のクラスに占める割合で色分けします。renderTooltip は item.index からホバー中のセルを見つけて件数を表示し、対角線上では再現率と適合率も表示します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/heatmap-chart/demos/confusion-matrix.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  HeatmapChart,
  type ChartHoverEvent,
  type HeatmapCell,
} from "minerva-design/charts";

// Test set of an image classifier: rows are the actual classes, columns
// the predicted ones (cats and dogs, cars and trucks get confused)
const classes = ["cat", "dog", "bird", "car", "truck"];
const matrix = [
  [412, 61, 18, 2, 1],
  [48, 431, 9, 4, 3],
  [22, 14, 455, 6, 2],
  [1, 2, 3, 447, 52],
  [2, 1, 1, 71, 418],
];
const actualTotals = matrix.map((row) => row.reduce((a, b) => a + b, 0));
const predictedTotals = classes.map((_, j) =>
  matrix.reduce((sum, row) => sum + (row[j] ?? 0), 0),
);
const total = actualTotals.reduce((a, b) => a + b, 0);
const correct = matrix.reduce((sum, row, i) => sum + (row[i] ?? 0), 0);
// the cells in the order of `data`: row by row
const cells = matrix.flatMap((row, i) =>
  row.map((n, j) => ({ actual: i, predicted: j, n })),
);

export default function ConfusionMatrixDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.heatmap-chart.data",
  });
  const locale = i18n.language;

  const names = useMemo(() => classes.map((key) => t(`classes.${key}`)), [t]);
  // share of the actual class in each cell: rows add up to 100 %
  const data = useMemo(
    (): HeatmapCell[] =>
      cells.map(({ actual, predicted, n }) => ({
        x: names[predicted] ?? "",
        y: names[actual] ?? "",
        value: n / (actualTotals[actual] ?? 1),
      })),
    [names],
  );
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
    [locale],
  );
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);

  const tooltip = (event: ChartHoverEvent) => {
    const item = event.items[0];
    const cell = item ? cells[item.index] : undefined;
    if (!cell) return null;
    const { actual, predicted, n } = cell;
    const hit = actual === predicted;
    return (
      <div style={{ display: "grid", gap: 2 }}>
        <strong>
          {t("actualPredicted", {
            actual: names[actual],
            predicted: names[predicted],
          })}
        </strong>
        <span>
          {t("imagesShare", {
            value: number.format(n),
            share: percent.format(n / (actualTotals[actual] ?? 1)),
          })}
        </span>
        {hit ? (
          <>
            <span style={{ color: "var(--success-color)" }}>
              {t("recall", {
                value: percent.format(n / (actualTotals[actual] ?? 1)),
              })}
            </span>
            <span style={{ color: "var(--success-color)" }}>
              {t("precision", {
                value: percent.format(n / (predictedTotals[predicted] ?? 1)),
              })}
            </span>
          </>
        ) : (
          <span style={{ color: "var(--danger-color)" }}>
            {t("misclassified")}
          </span>
        )}
      </div>
    );
  };

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {t("accuracy", {
          value: percent.format(correct / total),
          images: number.format(total),
        })}
      </output>
      <HeatmapChart
        data={data}
        xCategories={names}
        // first class at the top, like a table
        yCategories={[...names].reverse()}
        valueRange={[0, 1]}
        name={t("shareOfClass")}
        format={(value) => percent.format(value)}
        xAxis={{ title: t("predicted") }}
        yAxis={{ title: t("actual") }}
        renderTooltip={tooltip}
        height={360}
        ariaLabel={t("confusionAria")}
      />
    </div>
  );
}

```

## Example: セルをクリック

流入元とデバイス別のコンバージョン率です。onPointClick はクリックしたセルの data 内のインデックス item.index を渡すので、そこからセッション数と注文数を引いて表示します。onPlotClick で選択を解除します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/heatmap-chart/demos/conversion.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  HeatmapChart,
  type ChartHoverEvent,
  type HeatmapCell,
} from "minerva-design/charts";

const sources = ["organic", "paid", "social", "email", "referral", "direct"];
const devices = ["desktop", "mobile", "tablet"];
// sessions and orders of last month, per source (rows) and device (columns)
const sessions = [
  [42_000, 61_000, 6_100],
  [18_500, 33_000, 2_400],
  [7_200, 39_000, 1_900],
  [9_800, 12_400, 1_300],
  [5_600, 4_100, 700],
  [21_000, 15_500, 2_800],
];
const orders = [
  [1_390, 1_160, 150],
  [520, 560, 41],
  [101, 470, 21],
  [560, 430, 52],
  [230, 92, 19],
  [880, 420, 84],
];
const cells = sources.flatMap((source, s) =>
  devices.map((device, d) => ({
    source,
    device,
    sessions: sessions[s]?.[d] ?? 0,
    orders: orders[s]?.[d] ?? 0,
  })),
);
const average =
  orders.flat().reduce((a, b) => a + b, 0) /
  sessions.flat().reduce((a, b) => a + b, 0);

export default function ConversionDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.heatmap-chart.data",
  });
  const locale = i18n.language;
  const [selected, setSelected] = useState<number | null>(null);

  const data = useMemo(
    (): HeatmapCell[] =>
      cells.map((cell) => ({
        x: t(`devices.${cell.device}`),
        y: t(`sources.${cell.source}`),
        value: cell.orders / cell.sessions,
      })),
    [t],
  );
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }),
    [locale],
  );
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);

  // item.index is the index of the cell in `data` (and in `cells`)
  const click = (event: ChartHoverEvent) => {
    const item = event.items[0];
    if (item) setSelected(item.index);
  };
  const cell = selected === null ? undefined : cells[selected];
  const rate = cell ? cell.orders / cell.sessions : 0;

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {cell ? (
          <>
            {t("cellStatus", {
              source: t(`sources.${cell.source}`),
              device: t(`devices.${cell.device}`),
              orders: number.format(cell.orders),
              sessions: number.format(cell.sessions),
              rate: percent.format(rate),
            })}{" "}
            <strong
              style={{
                color:
                  rate >= average
                    ? "var(--success-color)"
                    : "var(--danger-color)",
              }}
            >
              {rate >= average
                ? t("aboveAverage", { value: percent.format(average) })
                : t("belowAverage", { value: percent.format(average) })}
            </strong>
          </>
        ) : (
          t("clickCell")
        )}
      </output>
      <HeatmapChart
        data={data}
        xCategories={devices.map((key) => t(`devices.${key}`))}
        // first source at the top
        yCategories={[...sources].reverse().map((key) => t(`sources.${key}`))}
        name={t("conversionRate")}
        format={(value) => percent.format(value)}
        radius={4}
        onPointClick={click}
        onPlotClick={() => setSelected(null)}
        height={340}
        ariaLabel={t("conversionAria")}
      />
    </div>
  );
}

```

## Example: 相関行列

colorScale="diverging" で製品指標どうしの相関係数を表示します。colorMidpoint（0）より下は危険色、上はプライマリ色、中央はテーマに合わせた中間色です。両方の軸に同じ翻訳済みの名前を使います。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/heatmap-chart/demos/correlation.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { HeatmapChart, type HeatmapCell } from "minerva-design/charts";

// Correlation between product metrics (symmetric, 1 on the diagonal)
const metrics = [
  "sessions",
  "pageViews",
  "signups",
  "revenue",
  "churn",
  "tickets",
];
const matrix = [
  [1, 0.92, 0.71, 0.64, -0.18, 0.35],
  [0.92, 1, 0.66, 0.58, -0.12, 0.31],
  [0.71, 0.66, 1, 0.83, -0.41, 0.22],
  [0.64, 0.58, 0.83, 1, -0.57, 0.08],
  [-0.18, -0.12, -0.41, -0.57, 1, 0.46],
  [0.35, 0.31, 0.22, 0.08, 0.46, 1],
];

export default function CorrelationDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.heatmap-chart.data",
  });
  const locale = i18n.language;

  const names = useMemo(() => metrics.map((key) => t(`metrics.${key}`)), [t]);
  const data = useMemo(
    (): HeatmapCell[] =>
      matrix.flatMap((row, i) =>
        row.map((value, j) => ({ x: names[j], y: names[i], value })),
      ),
    [names],
  );
  const coefficient = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        signDisplay: "exceptZero",
      }),
    [locale],
  );

  return (
    <HeatmapChart
      data={data}
      xCategories={names}
      // first metric at the top, like a table
      yCategories={[...names].reverse()}
      // built-in theme-aware ramp: danger color below 0, primary above
      colorScale="diverging"
      colorMidpoint={0}
      valueRange={[-1, 1]}
      name={t("correlation")}
      format={(value) => coefficient.format(value)}
      height={360}
      ariaLabel={t("correlationAria")}
    />
  );
}

```

## Example: 2 万セル

両軸が数値の 200 × 100 グリッド。interaction={{ zoom: "xy" }} でズームを有効にします（ヒートマップでは既定で無効）。Ctrl / ⌘ + ホイールでズーム、ドラッグでパン、ダブルクリックでリセット。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/heatmap-chart/demos/large-grid.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  HeatmapChart,
  type ChartRendererKind,
  type HeatmapCell,
} from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const WIDTH = 200;
const DEPTH = 100;
const ACCESS_POINTS = [
  { x: 30, y: 70 },
  { x: 105, y: 25 },
  { x: 170, y: 65 },
];
// interior walls (x positions) that weaken the signal crossing them
const WALLS = [70, 140];

const plasma = ["#0d0887", "#7e03a8", "#cc4778", "#f89540", "#f0f921"];

export default function LargeGridDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.heatmap-chart.data",
  });
  const locale = i18n.language;
  const [renderer, setRenderer] = useState<ChartRendererKind | null>(null);

  // Wi-Fi signal strength on a 200 × 100 m floor, one cell per square meter
  const data = useMemo((): HeatmapCell[] => {
    const random = mulberry32(200);
    const cells: HeatmapCell[] = [];
    for (let y = 0; y < DEPTH; y++) {
      for (let x = 0; x < WIDTH; x++) {
        let best = -100;
        for (const ap of ACCESS_POINTS) {
          const distance = Math.hypot(x - ap.x, y - ap.y) + 1;
          const walls = WALLS.filter((wall) => x < wall !== ap.x < wall).length;
          best = Math.max(best, -32 - 22 * Math.log10(distance) - 7 * walls);
        }
        cells.push({ x, y, value: best + (random() - 0.5) * 2 });
      }
    }
    return cells;
  }, []);
  const meters = useMemo(
    () => new Intl.NumberFormat(locale, { style: "unit", unit: "meter" }),
    [locale],
  );
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <HeatmapChart
        data={data}
        colorScale={plasma}
        valueRange={[-90, -30]}
        name={t("signal")}
        format={(value) => `${number.format(Math.round(value))} dBm`}
        radius={0}
        xAxis={{ format: (value) => meters.format(value) }}
        yAxis={{ format: (value) => meters.format(value) }}
        interaction={{ zoom: "xy" }}
        onRendererChange={setRenderer}
        height={340}
        ariaLabel={t("wifiAria")}
      />
      <p role="status">
        {t("largeStatus", {
          cells: number.format(WIDTH * DEPTH),
          renderer: renderer ?? "…",
        })}
      </p>
    </div>
  );
}

```

## Example: ライブのセンサーグリッド

サーバー通路のセンサーの吸気温度を、一時停止とアンマウント時に解除する setInterval で更新します。valueRange を固定して、どの更新でも同じ温度が同じ色になるようにし、colorScale はテーマの色で低温から高温へ変化します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/heatmap-chart/demos/rack-temperatures.tsx

```tsx
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
import { HeatmapChart, type HeatmapCell } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const RACKS = 10;
const UNITS = 8; // sensors per rack, bottom to top
const LIMIT = 32; // °C, the inlet temperature alarm

/**
 * Inlet temperatures of the sensors at refresh `tick`, rack by rack: warmer
 * at the top of the racks, with a cooling unit failing now and then.
 * Derived from the tick alone, so the readings are deterministic.
 */
const readingsAt = (tick: number) => {
  const random = mulberry32(tick * 7919 + 3);
  // the failing cooling unit drifts along the aisle
  const failing = Math.floor(tick / 12) % RACKS;
  const heat = Math.max(0, Math.sin((tick % 12) / 3.8)) * 12;
  const values: number[] = [];
  for (let r = 0; r < RACKS; r++) {
    for (let u = 0; u < UNITS; u++) {
      const distance = Math.abs(r - failing);
      const hot = distance < 2 ? heat * (1 - distance * 0.5) : 0;
      values.push(20 + u * 0.9 + hot * (0.5 + u / UNITS) + random() * 1.5);
    }
  }
  return values;
};

export default function RackTemperaturesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.heatmap-chart.data",
  });
  const locale = i18n.language;
  const [tick, setTick] = useState(0);
  const [running, setRunning] = useState(true);

  // the sensors are polled every 1.5 s
  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => setTick((value) => value + 1), 1500);
    return () => clearInterval(timer);
  }, [running]);

  const racks = useMemo(
    () => Array.from({ length: RACKS }, (_, r) => t("rackN", { n: r + 1 })),
    [t],
  );
  const units = useMemo(
    () => Array.from({ length: UNITS }, (_, u) => t("sensorN", { n: u + 1 })),
    [t],
  );
  const readings = useMemo(() => readingsAt(tick), [tick]);
  const data = useMemo(
    (): HeatmapCell[] =>
      readings.map((value, i) => ({
        x: racks[Math.floor(i / UNITS)] ?? "",
        y: units[i % UNITS] ?? "",
        value,
      })),
    [readings, racks, units],
  );
  const celsius = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "celsius",
      maximumFractionDigits: 1,
    });
    return (value: number) => format.format(value);
  }, [locale]);

  const hottest = readings.reduce(
    (best, value, i) => (value > (readings[best] ?? -Infinity) ? i : best),
    0,
  );
  const alarms = readings.filter((value) => value > LIMIT).length;

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 12,
        }}
      >
        <Button
          size="small"
          variant="outline"
          onClick={() => setRunning((value) => !value)}
        >
          {running ? t("pause") : t("resume")}
        </Button>
        <output
          aria-live="polite"
          style={{
            color: alarms
              ? "var(--danger-color)"
              : "var(--text-secondary-color)",
          }}
        >
          {t("rackStatus", {
            rack: racks[Math.floor(hottest / UNITS)],
            sensor: units[hottest % UNITS],
            value: celsius(readings[hottest] ?? 0),
            alarms: new Intl.NumberFormat(locale).format(alarms),
            limit: celsius(LIMIT),
          })}
        </output>
      </div>
      <HeatmapChart
        data={data}
        xCategories={racks}
        yCategories={units}
        // a fixed range: the same color means the same temperature at every refresh
        valueRange={[18, 40]}
        colorScale={[
          "var(--primary-color)",
          "var(--success-color)",
          "var(--warning-color)",
          "var(--danger-color)",
        ]}
        name={t("inletTemperature")}
        format={celsius}
        radius={2}
        height={340}
        ariaLabel={t("racksAria")}
      />
    </div>
  );
}

```

## Example: コホート継続率

月ごとの登録コホートが N か月後も利用している割合。null 値で未来のセルを空けると、おなじみの三角形になります。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/heatmap-chart/demos/retention.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { HeatmapChart, type HeatmapCell } from "minerva-design/charts";

const COHORTS = 9;
const PERIODS = 9;

// Share of each monthly signup cohort still active N months later; the
// newest cohorts have fewer months (null leaves the cell empty)
const retention = (cohort: number, month: number) => {
  if (month === 0) return 1;
  if (cohort + month >= COHORTS) return null;
  // onboarding improvements: later cohorts keep more users
  const floor = 0.18 + cohort * 0.015;
  return floor + (1 - floor) * Math.exp(-month / 1.6) * 0.62;
};

export default function RetentionDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.heatmap-chart.data",
  });
  const locale = i18n.language;

  const { cohorts, periods, data } = useMemo(() => {
    const date = new Intl.DateTimeFormat(locale, {
      month: "short",
      year: "numeric",
    });
    const cohorts = Array.from({ length: COHORTS }, (_, c) =>
      date.format(new Date(2026, c, 1)),
    );
    const periods = Array.from({ length: PERIODS }, (_, m) =>
      t("monthN", { n: m }),
    );
    const data: HeatmapCell[] = cohorts.flatMap((cohort, c) =>
      periods.map((period, m) => ({
        x: period,
        y: cohort,
        value: retention(c, m),
      })),
    );
    return { cohorts, periods, data };
  }, [t, locale]);
  const percent = useMemo(
    () => new Intl.NumberFormat(locale, { style: "percent" }),
    [locale],
  );

  return (
    <HeatmapChart
      data={data}
      xCategories={periods}
      // oldest cohort at the top
      yCategories={[...cohorts].reverse()}
      // the default ramp: a tint of the surface to a deep (light theme) or
      // bright (dark theme) primary color
      valueRange={[0, 1]}
      name={t("retained")}
      format={(value) => percent.format(value)}
      height={340}
      ariaLabel={t("retentionAria")}
    />
  );
}

```

## Example: 指標の切り替え

地域と四半期別の売上、成長率、利益率です。指標ごとに colorScale（順序、0 を中心とする発散、独自のリスト）、valueRange、format を持ち、RadioGroup で切り替えます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/heatmap-chart/demos/sales-regions.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { HeatmapChart, type HeatmapCell } from "minerva-design/charts";

const regions = ["north", "south", "east", "west", "central"];
const quarters = [1, 2, 3, 4];
// revenue (M€) of 2025 and 2026 and gross margin (%) of 2026, per region
// (rows) and quarter (columns)
const revenue2025 = [
  [4.1, 4.4, 4.0, 5.2],
  [3.2, 3.6, 3.9, 4.4],
  [5.6, 5.1, 4.8, 6.0],
  [2.4, 2.6, 2.9, 3.3],
  [6.8, 7.0, 6.6, 7.9],
];
const revenue2026 = [
  [4.5, 4.9, 4.6, 5.9],
  [3.0, 3.3, 3.5, 4.0],
  [6.4, 6.0, 5.9, 7.3],
  [3.1, 3.5, 3.9, 4.6],
  [6.7, 6.8, 6.3, 7.4],
];
const margin2026 = [
  [31, 33, 30, 35],
  [24, 26, 27, 29],
  [38, 36, 35, 40],
  [19, 22, 25, 27],
  [34, 33, 31, 36],
];

type Metric = "revenue" | "growth" | "margin";

export default function SalesRegionsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.heatmap-chart.data",
  });
  const locale = i18n.language;
  const [metric, setMetric] = useState<Metric>("revenue");

  // each metric brings its own values, color scale and format
  const settings = useMemo(() => {
    const euros = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "EUR",
      notation: "compact",
      maximumFractionDigits: 1,
    });
    const signed = new Intl.NumberFormat(locale, {
      style: "percent",
      maximumFractionDigits: 1,
      signDisplay: "exceptZero",
    });
    const percent = new Intl.NumberFormat(locale, { style: "percent" });
    const value = (r: number, q: number) => {
      const before = revenue2025[r]?.[q] ?? 0;
      const now = revenue2026[r]?.[q] ?? 0;
      if (metric === "growth") return now / before - 1;
      if (metric === "margin") return (margin2026[r]?.[q] ?? 0) / 100;
      return now;
    };
    const values = regions.flatMap((_, r) =>
      quarters.map((_, q) => value(r, q)),
    );
    if (metric === "growth") {
      // diverging around zero: red for a decline, primary for growth
      return {
        values,
        colorScale: "diverging" as const,
        valueRange: [-0.3, 0.3] as const,
        format: (v: number) => signed.format(v),
      };
    }
    if (metric === "margin") {
      return {
        values,
        colorScale: [
          "var(--danger-color)",
          "var(--warning-color)",
          "var(--success-color)",
        ],
        valueRange: [0.15, 0.4] as const,
        format: (v: number) => percent.format(v),
      };
    }
    return {
      values,
      colorScale: "sequential" as const,
      valueRange: undefined,
      format: (v: number) => euros.format(v * 1e6),
    };
  }, [metric, locale]);

  const regionNames = useMemo(
    () => regions.map((key) => t(`regions.${key}`)),
    [t],
  );
  const quarterNames = useMemo(
    () => quarters.map((n) => t("quarterN", { n })),
    [t],
  );
  const data = useMemo(
    (): HeatmapCell[] =>
      regions.flatMap((_, r) =>
        quarters.map((_, q) => ({
          x: quarterNames[q] ?? "",
          y: regionNames[r] ?? "",
          value: settings.values[r * quarters.length + q] ?? null,
        })),
      ),
    [settings, regionNames, quarterNames],
  );
  const best = settings.values.indexOf(Math.max(...settings.values));
  const worst = settings.values.indexOf(Math.min(...settings.values));
  const cellName = (i: number) =>
    t("regionQuarter", {
      region: regionNames[Math.floor(i / quarters.length)],
      quarter: quarterNames[i % quarters.length],
    });

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <RadioGroup
        aria-label={t("metric")}
        direction="horizontal"
        value={metric}
        onChange={(value) => setMetric(value as Metric)}
      >
        <Radio value="revenue" label={t("salesMetrics.revenue")} />
        <Radio value="growth" label={t("salesMetrics.growth")} />
        <Radio value="margin" label={t("salesMetrics.margin")} />
      </RadioGroup>
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {t("bestWorst", {
          best: cellName(best),
          bestValue: settings.format(settings.values[best] ?? 0),
          worst: cellName(worst),
          worstValue: settings.format(settings.values[worst] ?? 0),
        })}
      </output>
      <HeatmapChart
        data={data}
        xCategories={quarterNames}
        yCategories={[...regionNames].reverse()}
        colorScale={settings.colorScale}
        valueRange={settings.valueRange}
        name={t(`salesMetrics.${metric}`)}
        format={settings.format}
        radius={4}
        height={320}
        ariaLabel={t("salesAria")}
      />
    </div>
  );
}

```

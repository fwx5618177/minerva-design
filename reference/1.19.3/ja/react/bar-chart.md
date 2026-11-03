# 棒グラフ

横に並べるか積み上げた棒グラフ。折れ線を重ねることもできます。

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

第{{n}}四半期

完了したチケット

四半期ごとに完了したサポートチケット

注文

7 日平均

日

日別の注文数と 7 日平均

2025 年と 2026 年の四半期売上

推奨者

中立者

批判者

北米

ヨーロッパ

アジア太平洋

中南米

中東

地域別の推奨者・中立者・批判者の割合

Web

モバイルアプリ

パートナー

チャネル別の月間注文数（積み上げ）

販売数

四半期ごとの販売数

{{quarter}}：{{units}} 個

棒をタップしてください

積み上げ

グループ化

チャネル別・月別の注文数

ロンドン

東京

パリ

ロンドン、東京、パリの月平均降水量

純損益

月別の純損益。利益はゼロの上、損失は下

販売数

国別のオンライン販売数（多い順）

新規顧客

第{{n}}週

週間目標

週ごとの新規顧客数と週間目標の比較

{{total}} 週中 {{reached}} 週で目標を達成（{{rate}}）。

売上

{{month}}：{{value}}

四半期に戻る

四半期をクリックすると月別に表示します。

{{quarter}}：合計 {{value}}。月をクリックすると売上を表示します。

2026 年の四半期別売上。四半期をクリックすると月別に表示します

2026 年 {{quarter}} の月別売上

エンジニアリング

プロダクト

デザイン

営業

マーケティング

サポート

前年

今年

増減

前年と比較

部門別の採用数（今年と前年）

成功

ロールバック

変更凍結

8 週間の日別本番デプロイ数（成功とロールバック）

稼働日あたり {{perDay}} 回のデプロイ、変更失敗率 {{failure}}。

オフピーク

通常

ピーク

充電

日平均

充電時間

{{energy}} kWh・{{duration}}

{{start}}〜{{end}} に充電すると {{cost}}。{{plugIn}} の接続直後に充電するより {{saving}} 安くなります。

MWh あたりの価格

明日の各時間の前日市場電力価格。電気自動車の充電に最も安い時間帯を強調表示

## BarChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/charts",
  "exports": [
    "BarChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "series",
    "source": "packages/charts/src/react/types.ts",
    "kind": "array",
    "typeText": "readonly ChartSeries[]",
    "typeRef": "type:aa590f3d555ecd884b77",
    "required": true,
    "description": "Series drawn as bars unless they set a `type` (e.g. a `line` overlay)"
  },
  {
    "name": "stacked",
    "source": "packages/charts/src/react/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Stacks the bars of every series (otherwise they are grouped side by side)"
  },
  {
    "name": "percent",
    "source": "packages/charts/src/react/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Scales the stacks to 100% (implies `stacked`)"
  },
  {
    "name": "labels",
    "source": "packages/charts/src/react/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Writes the value above every bar"
  },
  {
    "name": "orientation",
    "source": "packages/charts/src/react/types.ts",
    "kind": "enum",
    "values": [
      "horizontal",
      "vertical"
    ],
    "typeText": "ChartOrientation | undefined",
    "typeRef": "type:872af3679a2d7fcf3d26",
    "default": "vertical",
    "required": false,
    "description": "`horizontal` draws the bars from the left, the categories down the left side"
  },
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
    "name": "crosshair",
    "source": "packages/charts/src/react/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Vertical guide line following the pointer"
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
  "BarChartProps": {
    "source": "charts/src/react/types.ts",
    "description": "Props of BarChart (`labels` writes the values: override the tooltip texts with `tooltip.labels`)",
    "kind": "interface",
    "extends": [
      "Omit<ChartCommonProps, \"labels\">"
    ],
    "props": [
      {
        "name": "series",
        "type": "readonly ChartSeries[]",
        "required": true,
        "description": "Series drawn as bars unless they set a `type` (e.g. a `line` overlay)"
      },
      {
        "name": "stacked",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Stacks the bars of every series (otherwise they are grouped side by side)"
      },
      {
        "name": "percent",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Scales the stacks to 100% (implies `stacked`)"
      },
      {
        "name": "labels",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Writes the value above every bar"
      },
      {
        "name": "orientation",
        "type": "ChartOrientation",
        "required": false,
        "default": "\"vertical\"",
        "description": "`horizontal` draws the bars from the left, the categories down the left side"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 基本

[category, value] タプルの 1 系列。y 軸には常に 0 が含まれます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/bar-chart/demos/basic.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BarChart, type ChartSeries } from "minerva-design/charts";

const closed = [320, 410, 385, 470];

export default function BasicDemo() {
  const { t } = useTranslation("common", { keyPrefix: "docs.bar-chart.data" });

  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("ticketsClosed"),
        // "Q1", "第1季度", "T1"...
        data: closed.map(
          (value, i) => [t("quarter", { n: i + 1 }), value] as const,
        ),
      },
    ],
    [t],
  );

  return <BarChart series={series} height={280} ariaLabel={t("ticketsAria")} />;
}

```

## Example: 棒と折れ線

type: "line" の系列は棒の上に描画されます。ここでは 7 日間の平均です。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/bar-chart/demos/combo.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BarChart, type ChartSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const random = mulberry32(5);
const orders = Array.from({ length: 30 }, (_, day) =>
  Math.round(60 + day * 1.5 + random() * 40),
);
// trailing 7-day average of the bars
const average = orders.map((_, day) => {
  const week = orders.slice(Math.max(0, day - 6), day + 1);
  return Math.round(week.reduce((sum, v) => sum + v, 0) / week.length);
});

export default function ComboDemo() {
  const { t } = useTranslation("common", { keyPrefix: "docs.bar-chart.data" });

  const series = useMemo(
    (): ChartSeries[] => [
      { name: t("orders"), data: orders },
      { name: t("average7"), type: "line", data: average, lineWidth: 3 },
    ],
    [t],
  );

  return (
    <BarChart
      series={series}
      xAxis={{ title: t("day") }}
      height={300}
      ariaLabel={t("ordersAria")}
    />
  );
}

```

## Example: デプロイの推移

時間軸上の積み上げ棒で、日ごとの成功したデプロイとロールバックされたデプロイを数えます。rect 注釈で週末と変更凍結期間を塗り分け、サマリーにデプロイ頻度と変更失敗率を示します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/bar-chart/demos/deployments.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  BarChart,
  type ChartAnnotation,
  type ChartSeries,
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

const DAY = 24 * 60 * 60 * 1000;
// a Monday, local midnight: the time axis places its ticks in local time
const START = new Date(2026, 8, 7).getTime();
const DAYS = 56;
const FREEZE = [38, 43] as const; // a change freeze before a big launch

// Production deployments per day, and the ones that were rolled back
const random = mulberry32(42);
const days = Array.from({ length: DAYS }, (_, i) => {
  const time = START + i * DAY;
  const weekend = [0, 6].includes(new Date(time).getDay());
  const frozen = i >= FREEZE[0] && i <= FREEZE[1];
  const total =
    weekend || frozen
      ? random() < 0.15
        ? 1
        : 0
      : Math.round(4 + random() * 6 + i / 14);
  const failed = total > 0 && random() < 0.35 ? (random() < 0.8 ? 1 : 2) : 0;
  return { time, weekend, ok: total - Math.min(failed, total), failed };
});
const workingDays = days.filter((d) => !d.weekend).length;
const deployed = days.reduce((sum, d) => sum + d.ok + d.failed, 0);
const rolledBack = days.reduce((sum, d) => sum + d.failed, 0);

export default function DeploymentsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bar-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("deploysOk"),
        color: "var(--success-color)",
        data: days.map((d) => [d.time, d.ok] as const),
      },
      {
        name: t("deploysFailed"),
        color: "var(--danger-color)",
        data: days.map((d) => [d.time, d.failed] as const),
      },
    ],
    [t],
  );
  // every weekend, from Saturday to Monday (bars are centered on midnight)
  const annotations = useMemo((): ChartAnnotation[] => {
    const weekends: ChartAnnotation[] = days
      .filter((d) => new Date(d.time).getDay() === 6)
      .map((d) => ({
        type: "rect",
        x0: d.time - DAY / 2,
        x1: d.time + (3 * DAY) / 2,
        color: "var(--text-secondary-color)",
        opacity: 0.07,
      }));
    return [
      ...weekends,
      {
        type: "rect",
        x0: START + FREEZE[0] * DAY - DAY / 2,
        x1: START + FREEZE[1] * DAY + DAY / 2,
        color: "var(--warning-color)",
        opacity: 0.14,
        label: t("changeFreeze"),
        labelPosition: "top-right",
      },
    ];
  }, [t]);
  const formats = useMemo(
    () => ({
      decimal: new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }),
      percent: new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 1,
      }),

      tick: new Intl.DateTimeFormat(locale, { month: "short", day: "numeric" }),
    }),
    [locale],
  );

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <BarChart
        series={series}
        stacked
        annotations={annotations}
        xAxis={{ type: "time", format: (x) => formats.tick.format(x) }}
        tooltip={{ mode: "axis" }}
        height={300}
        ariaLabel={t("deploysAria")}
      />
      <p style={{ margin: 0 }}>
        {t("deploysSummary", {
          perDay: formats.decimal.format(deployed / workingDays),
          failure: formats.percent.format(rolledBack / deployed),
        })}
      </p>
    </div>
  );
}

```

## Example: ドリルダウン

四半期をクリックすると onPointClick で系列がその 3 か月分に切り替わり、Button で四半期表示に戻ります。月をクリックするとその売上が aria-live の出力に表示されます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/bar-chart/demos/drilldown.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
import {
  BarChart,
  type ChartHoverEvent,
  type ChartSeries,
} from "minerva-design/charts";

// Monthly revenue of 2026 in thousands of dollars, January to December
const monthly = [412, 389, 455, 470, 498, 463, 441, 429, 517, 552, 648, 731];
const quarterTotal = (q: number) =>
  monthly.slice(q * 3, q * 3 + 3).reduce((sum, value) => sum + value, 0);

export default function DrilldownDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bar-chart.data",
  });
  const locale = i18n.language;
  // `null`: the four quarters; a number: the months of that quarter
  const [quarter, setQuarter] = useState<number | null>(null);
  const [picked, setPicked] = useState<string | null>(null);

  const usd = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    });
    return (value: number) => format.format(value * 1000);
  }, [locale]);
  const series = useMemo((): ChartSeries[] => {
    if (quarter === null) {
      return [
        {
          name: t("revenue"),
          data: [0, 1, 2, 3].map(
            (q) => [t("quarter", { n: q + 1 }), quarterTotal(q)] as const,
          ),
        },
      ];
    }
    const month = new Intl.DateTimeFormat(locale, { month: "long" });
    return [
      {
        name: t("revenue"),
        color: "var(--chart-series-2, #10b981)",
        data: [0, 1, 2].map((m) => {
          const index = quarter * 3 + m;
          return [
            month.format(new Date(2026, index, 1)),
            monthly[index] ?? 0,
          ] as const;
        }),
      },
    ];
  }, [t, locale, quarter]);

  const onPointClick = (event: ChartHoverEvent) => {
    const item = event.items[0];
    if (!item) return;
    if (quarter === null) {
      setQuarter(item.index);
      setPicked(null);
    } else {
      setPicked(t("pickedMonth", { month: event.xLabel, value: usd(item.y) }));
    }
  };
  const back = () => {
    setQuarter(null);
    setPicked(null);
  };

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 12,
          minHeight: 32,
        }}
      >
        {quarter !== null && (
          <Button size="small" variant="outline" onClick={back}>
            {t("backToQuarters")}
          </Button>
        )}
        <output aria-live="polite">
          {quarter === null
            ? t("drillHint")
            : (picked ??
              t("quarterDetail", {
                quarter: t("quarter", { n: quarter + 1 }),
                value: usd(quarterTotal(quarter)),
              }))}
        </output>
      </div>
      <BarChart
        series={series}
        labels
        onPointClick={onPointClick}
        tooltip={{ mode: "item" }}
        yAxis={{ format: usd }}
        legend={false}
        height={300}
        ariaLabel={
          quarter === null
            ? t("quartersAria")
            : t("monthsAria", { quarter: t("quarter", { n: quarter + 1 }) })
        }
      />
    </div>
  );
}

```

## Example: 最も安い充電時間帯

明日の時間ごとの電力価格を 3 つの積み上げ系列に分け、各棒が価格帯の色になるようにしています。rect 注釈は Select で選んだ充電時間に対して最も安い連続時間帯を示し、出力欄では帰宅直後に充電した場合との費用を比較します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/bar-chart/demos/ev-charging.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Select, SelectItem } from "minerva-design";
import {
  BarChart,
  type ChartAnnotation,
  type ChartSeries,
} from "minerva-design/charts";

// Day-ahead electricity price per hour of tomorrow, in euros per MWh: low at
// night, a morning and an evening peak, and a dip at noon when solar floods in
const prices = Array.from({ length: 24 }, (_, hour) => {
  const morning = 38 * Math.exp(-((hour - 8) ** 2) / 4);
  const evening = 62 * Math.exp(-((hour - 19) ** 2) / 5);
  const solar = -46 * Math.exp(-((hour - 13) ** 2) / 6);
  return (
    Math.round((72 + morning + evening + solar + 6 * Math.sin(hour)) * 10) / 10
  );
});
const sorted = [...prices].sort((a, b) => a - b);
const CHEAP = sorted[5] ?? 0; // the 6 cheapest hours
const PEAK = sorted[18] ?? 0; // the 6 most expensive hours
const AVERAGE = prices.reduce((sum, p) => sum + p, 0) / prices.length;
const POWER = 11; // kW, a home wallbox
const PLUG_IN = 18; // the car is plugged in when coming home

const windowCost = (start: number, hours: number) =>
  prices
    .slice(start, start + hours)
    .reduce((sum, price) => sum + (price / 1000) * POWER, 0);

export default function EvChargingDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bar-chart.data",
  });
  const locale = i18n.language;
  const [hours, setHours] = useState(3);

  // the cheapest run of `hours` consecutive hours
  const best = useMemo(() => {
    let start = 0;
    for (let s = 1; s + hours <= prices.length; s++) {
      if (windowCost(s, hours) < windowCost(start, hours)) start = s;
    }
    return start;
  }, [hours]);

  const formats = useMemo(() => {
    const hour = new Intl.DateTimeFormat(locale, {
      hour: "2-digit",
      minute: "2-digit",
    });
    return {
      hour: (h: number) => hour.format(new Date(2026, 10, 1, h)),
      price: new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "EUR",
        maximumFractionDigits: 0,
      }),
      cost: new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "EUR",
      }),
    };
  }, [locale]);

  // one series per price tier, stacked so that each hour shows a single bar
  const series = useMemo((): ChartSeries[] => {
    const tiers = [
      {
        name: t("offPeak"),
        color: "var(--success-color)",
        test: (p: number) => p <= CHEAP,
      },
      {
        name: t("standard"),
        color: "var(--primary-color)",
        test: (p: number) => p > CHEAP && p < PEAK,
      },
      {
        name: t("peak"),
        color: "var(--danger-color)",
        test: (p: number) => p >= PEAK,
      },
    ];
    return tiers.map((tier) => ({
      name: tier.name,
      color: tier.color,
      data: prices.map(
        (price, h) => [formats.hour(h), tier.test(price) ? price : 0] as const,
      ),
    }));
  }, [t, formats]);
  const annotations = useMemo(
    (): ChartAnnotation[] => [
      {
        type: "rect",
        // category axes place the bars at their index
        x0: best - 0.5,
        x1: best + hours - 0.5,
        color: "var(--success-color)",
        opacity: 0.12,
        label: t("chargeHere"),
        labelPosition: "top-left",
      },
      {
        type: "line",
        axis: "y",
        value: AVERAGE,
        dash: [4, 4],
        color: "var(--text-secondary-color)",
        label: t("dailyAverage"),
      },
    ],
    [t, best, hours],
  );

  const cost = windowCost(best, hours);
  const onArrival = windowCost(PLUG_IN, hours);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 12,
        }}
      >
        <Select
          size="small"
          style={{ width: 200 }}
          aria-label={t("chargingTime")}
          value={String(hours)}
          onChange={(value) => setHours(Number(value))}
        >
          {[2, 3, 4, 5].map((h) => (
            <SelectItem key={h} value={String(h)}>
              {t("chargeFor", {
                energy: new Intl.NumberFormat(locale).format(h * POWER),
                duration: new Intl.NumberFormat(locale, {
                  style: "unit",
                  unit: "hour",
                  unitDisplay: "long",
                }).format(h),
              })}
            </SelectItem>
          ))}
        </Select>
        <output aria-live="polite">
          {t("chargeAdvice", {
            start: formats.hour(best),
            end: formats.hour((best + hours) % 24),
            cost: formats.cost.format(cost),
            saving: formats.cost.format(onArrival - cost),
            plugIn: formats.hour(PLUG_IN),
          })}
        </output>
      </div>
      <BarChart
        series={series}
        stacked
        annotations={annotations}
        tooltip={{ mode: "item" }}
        yAxis={{
          title: t("pricePerMwh"),
          format: (y) => formats.price.format(y),
        }}
        height={300}
        ariaLabel={t("pricesAria")}
      />
    </div>
  );
}

```

## Example: グループ化

stacked を付けない複数の系列は、各カテゴリで横に並びます。ここでは 3 都市の月間降水量で、単位は Intl.NumberFormat が表記します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/bar-chart/demos/grouped.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BarChart, type ChartSeries } from "minerva-design/charts";

// Average monthly rainfall (mm), January to December
const rainfall = {
  london: [55, 41, 41, 44, 49, 45, 45, 50, 49, 69, 59, 55],
  tokyo: [52, 56, 118, 125, 138, 168, 154, 168, 210, 198, 93, 51],
  paris: [51, 41, 48, 52, 63, 50, 63, 53, 48, 61, 51, 58],
};

/** Short month names in the reader's language */
const monthNames = (locale: string) => {
  const format = new Intl.DateTimeFormat(locale, { month: "short" });
  return Array.from({ length: 12 }, (_, m) =>
    format.format(new Date(2026, m, 1)),
  );
};

export default function GroupedDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bar-chart.data",
  });
  const locale = i18n.language;

  // several series without `stacked`: the bars of each month sit side by side
  const series = useMemo((): ChartSeries[] => {
    const months = monthNames(locale);
    return (Object.keys(rainfall) as (keyof typeof rainfall)[]).map((key) => ({
      name: t(`cities.${key}`),
      data: months.map((month, i) => [month, rainfall[key][i]] as const),
    }));
  }, [t, locale]);
  const millimeters = useMemo(
    () => new Intl.NumberFormat(locale, { style: "unit", unit: "millimeter" }),
    [locale],
  );

  return (
    <BarChart
      series={series}
      yAxis={{ format: (value) => millimeters.format(value) }}
      height={300}
      ariaLabel={t("rainfallAria")}
    />
  );
}

```

## Example: 値ラベル

labels は各棒の上に y 軸の format で値を表示し、最も高い棒の上にその余白を確保します。棒が少なく、正確な値が重要なときに向いています。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/bar-chart/demos/labels.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BarChart, type ChartSeries } from "minerva-design/charts";

// Revenue in thousands of dollars, Q1 to Q4
const revenue = {
  "2025": [312, 348, 365, 421],
  "2026": [356, 402, 431, 488],
};

export default function LabelsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bar-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo(
    (): ChartSeries[] =>
      Object.entries(revenue).map(([year, values]) => ({
        name: year,
        data: values.map(
          (value, i) => [t("quarter", { n: i + 1 }), value] as const,
        ),
      })),
    [t],
  );
  // "$356K", "35.6万 US$", "356 k $US"...
  const usd = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
    });
    return (value: number) => format.format(value * 1000);
  }, [locale]);

  return (
    <BarChart
      series={series}
      labels
      // the labels use the y axis format
      yAxis={{ format: usd }}
      height={300}
      ariaLabel={t("revenueAria")}
    />
  );
}

```

## Example: 100% 積み上げ

percent は各積み上げを 100% に揃え、規模の異なるグループの内訳を比較します。ツールチップには回答数とその比率が表示されます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/bar-chart/demos/percent.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BarChart, type ChartSeries } from "minerva-design/charts";

const regions = [
  "northAmerica",
  "europe",
  "asiaPacific",
  "latinAmerica",
  "middleEast",
];

// Survey answers (respondents) grouped as Net Promoter Score categories
const answers = [
  {
    key: "promoters",
    color: "var(--success-color)",
    values: [612, 540, 702, 288, 164],
  },
  {
    key: "passives",
    color: "var(--warning-color)",
    values: [254, 310, 268, 131, 92],
  },
  {
    key: "detractors",
    color: "var(--danger-color)",
    values: [134, 196, 118, 97, 61],
  },
];

export default function PercentDemo() {
  const { t } = useTranslation("common", { keyPrefix: "docs.bar-chart.data" });

  const series = useMemo(
    (): ChartSeries[] =>
      answers.map(({ key, color, values }) => ({
        name: t(`nps.${key}`),
        color,
        data: regions.map(
          (region, i) => [t(`regions.${region}`), values[i]] as const,
        ),
      })),
    [t],
  );

  return (
    <BarChart series={series} percent height={300} ariaLabel={t("npsAria")} />
  );
}

```

## Example: 前年との比較

Switch で前年系列の hidden を切り替え、色を変えずに比較の表示・非表示を行います。renderTooltip は両年の値と変化率を一覧表示します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/bar-chart/demos/period-compare.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import {
  BarChart,
  type ChartHoverEvent,
  type ChartSeries,
} from "minerva-design/charts";

// Hires per department, last year and this year
const hires = {
  engineering: [64, 81],
  product: [12, 15],
  design: [9, 7],
  sales: [38, 52],
  marketing: [17, 13],
  support: [26, 31],
} as const;
type Department = keyof typeof hires;
const keys = Object.keys(hires) as Department[];

export default function PeriodCompareDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bar-chart.data",
  });
  const locale = i18n.language;
  const [compare, setCompare] = useState(true);

  const series = useMemo((): ChartSeries[] => {
    const names = keys.map((key) => t(`hiringDepartments.${key}`));
    return [
      {
        id: "previous",
        name: t("previousYear"),
        color: "var(--border-strong-color)",
        // hidden series keep their place in the legend and come back as is
        hidden: !compare,
        data: keys.map((key, i) => [names[i] ?? key, hires[key][0]] as const),
      },
      {
        id: "current",
        name: t("currentYear"),
        color: "var(--primary-color)",
        data: keys.map((key, i) => [names[i] ?? key, hires[key][1]] as const),
      },
    ];
  }, [t, compare]);
  const formats = useMemo(
    () => ({
      number: new Intl.NumberFormat(locale),
      change: new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 0,
        signDisplay: "exceptZero",
      }),
    }),
    [locale],
  );

  // both years of the hovered department and the change between them
  const renderTooltip = (event: ChartHoverEvent) => {
    const department = keys[event.items[0]?.index ?? -1];
    if (!department) return null;
    const [previous, current] = hires[department];
    const change = current / previous - 1;
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "2px 16px",
        }}
      >
        <strong style={{ gridColumn: "1 / -1" }}>{event.xLabel}</strong>
        <span>{t("currentYear")}</span>
        <strong style={{ textAlign: "end" }}>
          {formats.number.format(current)}
        </strong>
        <span>{t("previousYear")}</span>
        <span style={{ textAlign: "end" }}>
          {formats.number.format(previous)}
        </span>
        <span>{t("change")}</span>
        <span
          style={{
            textAlign: "end",
            color: change >= 0 ? "var(--success-color)" : "var(--danger-color)",
          }}
        >
          {formats.change.format(change)}
        </span>
      </div>
    );
  };

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Switch
        checked={compare}
        onChange={setCompare}
        label={t("compareLastYear")}
      />
      <BarChart
        series={series}
        renderTooltip={renderTooltip}
        yAxis={{ format: (y) => formats.number.format(y) }}
        height={300}
        ariaLabel={t("hiresAria")}
      />
    </div>
  );
}

```

## Example: 損益

負の値はゼロから下に伸びます。各データ点が自分の色を持ち、利益は緑、損失は赤で、y の書式が符号を表示します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/bar-chart/demos/profit-loss.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BarChart, type ChartSeries } from "minerva-design/charts";

// Net result per month (thousand EUR): losses are negative
const results = [-42, -18, 12, 35, 28, -9, 41, 66, 58, 73, 49, 92];

/** Short month names in the reader's language */
const monthNames = (locale: string) => {
  const format = new Intl.DateTimeFormat(locale, { month: "short" });
  return Array.from({ length: 12 }, (_, m) =>
    format.format(new Date(2026, m, 1)),
  );
};

export default function ProfitLossDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bar-chart.data",
  });
  const locale = i18n.language;

  // one color per bar: green above zero, red below
  const series = useMemo((): ChartSeries[] => {
    const months = monthNames(locale);
    return [
      {
        name: t("netResult"),
        data: results.map((y, i) => ({
          x: months[i],
          y,
          color: y >= 0 ? "var(--success-color)" : "var(--danger-color)",
        })),
      },
    ];
  }, [t, locale]);
  // "+€92K", "-42 k€"...: the sign is part of the information
  const euros = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "EUR",
      notation: "compact",
      signDisplay: "exceptZero",
    });
    return (value: number) => format.format(value * 1000);
  }, [locale]);

  return (
    <BarChart
      series={series}
      yAxis={{ format: euros }}
      annotations={[{ type: "line", axis: "y", value: 0 }]}
      legend={false}
      height={300}
      ariaLabel={t("profitAria")}
    />
  );
}

```

## Example: ランキング

データを渡す前に並べ替えるとランキングになります。Intl.DisplayNames が読者の言語で国名を返し、showLabels が値を表示します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/bar-chart/demos/ranking.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BarChart, type ChartSeries } from "minerva-design/charts";

// Online sales by country (thousand units), in no particular order
const salesByCountry: [string, number][] = [
  ["FR", 182],
  ["US", 541],
  ["JP", 326],
  ["DE", 248],
  ["BR", 97],
  ["CN", 463],
  ["GB", 205],
  ["IN", 151],
  ["CA", 118],
  ["KR", 134],
];

export default function RankingDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bar-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo((): ChartSeries[] => {
    // country names in the reader's language: "Japan", "日本", "Japon"...
    const countries = new Intl.DisplayNames([locale], { type: "region" });
    const ranked = [...salesByCountry].sort((a, b) => b[1] - a[1]);
    return [
      {
        name: t("unitsSold"),
        showLabels: true,
        data: ranked.map(
          ([code, value]) => [countries.of(code) ?? code, value] as const,
        ),
      },
    ];
  }, [t, locale]);
  const thousands = useMemo(() => {
    const format = new Intl.NumberFormat(locale, { notation: "compact" });
    return (value: number) => format.format(value * 1000);
  }, [locale]);

  return (
    <BarChart
      series={series}
      yAxis={{ format: thousands }}
      height={320}
      ariaLabel={t("rankingAria")}
    />
  );
}

```

## Example: 積み上げ

stacked で系列を積み重ねます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/bar-chart/demos/stacked.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BarChart, type ChartSeries } from "minerva-design/charts";

// Orders per month (January to June) by channel
const byChannel = {
  web: [120, 135, 150, 148, 170, 190],
  mobile: [80, 95, 110, 125, 140, 160],
  partners: [30, 28, 35, 42, 40, 51],
};

/** Short month names in the reader's language */
const monthNames = (locale: string, count: number) => {
  const format = new Intl.DateTimeFormat(locale, { month: "short" });
  return Array.from({ length: count }, (_, m) =>
    format.format(new Date(2026, m, 1)),
  );
};

export default function StackedDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bar-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo((): ChartSeries[] => {
    const months = monthNames(locale, 6);
    return (Object.keys(byChannel) as (keyof typeof byChannel)[]).map(
      (key) => ({
        name: t(`channels.${key}`),
        data: months.map((month, i) => [month, byChannel[key][i]] as const),
      }),
    );
  }, [t, locale]);

  return (
    <BarChart
      series={series}
      stacked
      height={300}
      ariaLabel={t("channelsAria")}
    />
  );
}

```

## Example: 目標との比較

破線が週間目標を示し、目標に達した棒はデータ点の色で強調されます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/bar-chart/demos/target.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BarChart, type ChartSeries } from "minerva-design/charts";

const TARGET = 120; // new customers per week
const signups = [96, 104, 131, 118, 142, 125, 109, 137, 151, 128, 146, 163];

export default function TargetDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bar-chart.data",
  });
  const locale = i18n.language;

  // bars that reach the target are highlighted
  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("newCustomers"),
        data: signups.map((y, i) => ({
          x: t("week", { n: i + 1 }),
          y,
          color:
            y >= TARGET ? "var(--primary-color)" : "var(--border-strong-color)",
        })),
      },
    ],
    [t],
  );
  const reached = signups.filter((value) => value >= TARGET).length;
  const percent = new Intl.NumberFormat(locale, { style: "percent" });

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <BarChart
        series={series}
        annotations={[
          {
            type: "line",
            axis: "y",
            value: TARGET,
            color: "var(--warning-color)",
            dash: [6, 4],
            width: 2,
            label: t("weeklyTarget"),
          },
        ]}
        legend={false}
        height={300}
        ariaLabel={t("targetAria")}
      />
      <p>
        {t("targetSummary", {
          reached,
          total: signups.length,
          rate: percent.format(reached / signups.length),
        })}
      </p>
    </div>
  );
}

```

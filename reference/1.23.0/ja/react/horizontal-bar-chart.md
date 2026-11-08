# 横棒グラフ

カテゴリを左側に並べ、左から伸びる横棒：ランキング、長い名前、発散型アンケート、進捗に最適です。

Package: minerva-design@1.23.0

Renderer: react

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

開発者

各プログラミング言語を使う開発者の割合

ここでのキャリアパスが見える

仕事量は適切だ

必要なツールがそろっている

上司が支えてくれる

給与は公正だ

強く反対

反対

賛成

強く賛成

従業員アンケートの回答（左が反対、右が賛成）

完了

レビュー中

未着手

プラットフォーム

決済

モバイル

グロース

デザイン

各チームのマイルストーン課題の状態

票数

すべてのページとメールでダークモード

モバイル端末でのオフラインモード

グラフ付きレポートの PDF 出力

SAML と OIDC によるシングルサインオン

カレンダーの双方向同期

複数レコードの一括編集

すべてのオブジェクトにカスタム項目

要望の多い機能の票数

予算

実績

開発

マーケティング

営業

サポート

経理

部門ごとの予算と実績

増減

北米

ヨーロッパ

アジア太平洋

中南米

中東

アフリカ

地域ごとの月間アクティブユーザーの増減

ユーザー

メッセージ

写真

マップ

ミュージック

メモ

アプリごとの月間アクティブユーザー

{{app}}：{{users}} 百万ユーザー

棒をタップしてください

売上

販売数

ワイヤレスヘッドホン

スマートウォッチ

Bluetooth スピーカー

メカニカルキーボード

急速充電器

HD ウェブカメラ

ワイヤレスマウス

タブレット

USB-C ケーブル

ノートパソコンスタンド

ランキング基準

表示件数

上位 {{n}} 件

すべての商品

先月の売れ筋商品（多い順）

この {{n}} 商品で全体の {{share}} を占めます。

{{value}} GW

太陽光発電容量

再生

一時停止

もう一度再生

最初に戻る

{{year}} 年末時点で太陽光発電の設備容量が多い国

給与レンジ

ジュニア

ミドル

シニア

スタッフ

プリンシパル

ディレクター

オファー

最低額

中央値

最高額

オファー / 中央値

オファー −{{step}}

オファー +{{step}}

{{offer}} のオファーは {{levels}} のレンジに収まります。

{{offer}} のオファーはどのレンジにも収まりません。

各職位の年間給与レンジ。オファー額を縦線で表示

残りエラーバジェット

リリース凍結

過去 30 日間の各サービスの残りエラーバジェット（悪い順）

SLO {{slo}}、実測の可用性 {{availability}}

許容される {{allowed}} のうち、残りのダウンタイムは {{minutes}} です。

バジェットを {{minutes}} 超過しています。

サービスをクリックするとバジェットを表示します。

## HorizontalBarChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/charts",
  "exports": [
    "HorizontalBarChart"
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
    "typeRef": "type:deda0bcb88251b63a5de",
    "required": true,
    "description": "Series drawn as bars from the left unless they set a `type`; the x values (categories) run from top to bottom"
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
    "typeRef": "type:f440eb8a958892b1b0c2",
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
    "typeRef": "type:88dcb55e82bb1c501478",
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
    "name": "stacked",
    "source": "packages/charts/src/react/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Stacks the bars of every series (otherwise they are grouped side by side)"
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
  "HorizontalBarChartProps": {
    "source": "charts/src/react/types.ts",
    "description": "Props of HorizontalBarChart",
    "kind": "interface",
    "extends": [
      "Omit<BarChartProps, \"orientation\">"
    ],
    "props": [
      {
        "name": "series",
        "type": "readonly ChartSeries[]",
        "required": true,
        "description": "Series drawn as bars from the left unless they set a `type`; the x values (categories) run from top to bottom"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: ランキング

カテゴリはデータ順に上から下へ並ぶため、並べ替えたリストがそのままランキングになります。labels で各棒の先端に値を表示します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/horizontal-bar-chart/demos/basic.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { HorizontalBarChart, type ChartSeries } from "minerva-design/charts";

// Share of developers using each language (%), survey of 2026
const languages: [string, number][] = [
  ["JavaScript", 62.3],
  ["Python", 51.0],
  ["TypeScript", 43.4],
  ["Java", 30.3],
  ["C#", 27.1],
  ["Go", 17.7],
  ["Rust", 15.2],
  ["Kotlin", 10.1],
  ["Swift", 8.4],
  ["Ruby", 5.9],
];

export default function BasicDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.horizontal-bar-chart.data",
  });
  const locale = i18n.language;
  // ranked from the top: the first category is drawn at the top
  const series = useMemo(
    (): ChartSeries[] => [{ name: t("developers"), data: languages }],
    [t],
  );
  const percent = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "percent",
      maximumFractionDigits: 1,
    });
    return (value: number) => format.format(value / 100);
  }, [locale]);

  return (
    <HorizontalBarChart
      series={series}
      labels
      yAxis={{ format: percent }}
      height={340}
      ariaLabel={t("languagesAria")}
    />
  );
}

```

## Example: 発散型アンケート

負の値はゼロの左側へ伸びます。積み上げたリッカート尺度で「反対」を左、「賛成」を右に置き、軸の書式で両側を正の割合として表示します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/horizontal-bar-chart/demos/diverging.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { HorizontalBarChart, type ChartSeries } from "minerva-design/charts";

// Answers to an employee survey (% of respondents); disagreement is drawn
// to the left of zero, agreement to the right
const statements = ["career", "workload", "tools", "manager", "pay"] as const;
const answers: Record<
  (typeof statements)[number],
  [number, number, number, number]
> = {
  // strongly disagree, disagree, agree, strongly agree
  career: [12, 24, 41, 15],
  workload: [18, 30, 36, 9],
  tools: [5, 14, 49, 27],
  manager: [4, 9, 44, 39],
  pay: [21, 33, 31, 8],
};

export default function DivergingDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.horizontal-bar-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo((): ChartSeries[] => {
    const rows = statements.map((s) => t(`statements.${s}`));
    const scale = [
      { key: "stronglyDisagree", sign: -1, index: 0, color: "#dc2626" },
      { key: "disagree", sign: -1, index: 1, color: "#f87171" },
      { key: "agree", sign: 1, index: 2, color: "#34d399" },
      { key: "stronglyAgree", sign: 1, index: 3, color: "#059669" },
    ] as const;
    // the inner answers first, so that they touch zero
    return [scale[1], scale[0], scale[2], scale[3]].map((level) => ({
      name: t(`likert.${level.key}`),
      color: level.color,
      data: statements.map(
        (s, i) => [rows[i] ?? s, level.sign * answers[s][level.index]] as const,
      ),
    }));
  }, [t]);
  const percent = useMemo(() => {
    const format = new Intl.NumberFormat(locale, { style: "percent" });
    // both sides are positive shares
    return (value: number) => format.format(Math.abs(value) / 100);
  }, [locale]);

  return (
    <HorizontalBarChart
      series={series}
      stacked
      yAxis={{ format: percent }}
      annotations={[{ type: "line", axis: "y", value: 0, dash: [] }]}
      legend={{ position: "bottom" }}
      height={320}
      ariaLabel={t("surveyAria")}
    />
  );
}

```

## Example: エラーバジェット

各サービスの残りエラーバジェットを悪い順に並べ、しきい値で色分けします。超過したバジェットはゼロより左に伸びます。onPointClick で SLO、実測の可用性、残りのダウンタイム分数を出力欄に表示し、onPlotClick で消去します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/horizontal-bar-chart/demos/error-budget.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  HorizontalBarChart,
  type ChartAnnotation,
  type ChartHoverEvent,
  type ChartSeries,
} from "minerva-design/charts";

// Availability target (SLO) and measured availability of each service over
// the last 30 days; service names are identifiers and stay untranslated
const services = [
  { name: "checkout-api", slo: 0.999, availability: 0.99962 },
  { name: "auth", slo: 0.9995, availability: 0.99971 },
  { name: "search", slo: 0.995, availability: 0.99712 },
  { name: "payments", slo: 0.9999, availability: 0.99984 },
  { name: "notifications", slo: 0.99, availability: 0.99581 },
  { name: "inventory", slo: 0.999, availability: 0.99915 },
  { name: "recommendations", slo: 0.99, availability: 0.98874 },
  { name: "media-cdn", slo: 0.9995, availability: 0.99988 },
] as const;
const WINDOW_MINUTES = 30 * 24 * 60;
const FREEZE = 20; // below this share of budget left, releases are frozen

// share of the allowed downtime that is still left (negative: overspent)
const budgetLeft = (s: (typeof services)[number]) =>
  (1 - (1 - s.availability) / (1 - s.slo)) * 100;
const rows = services
  .map((service) => ({ ...service, left: budgetLeft(service) }))
  .sort((a, b) => a.left - b.left);

export default function ErrorBudgetDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.horizontal-bar-chart.data",
  });
  const locale = i18n.language;
  const [selected, setSelected] = useState<number | null>(null);

  const formats = useMemo(
    () => ({
      percent: (value: number) =>
        new Intl.NumberFormat(locale, {
          style: "percent",
          maximumFractionDigits: 0,
        }).format(value / 100),
      precise: new Intl.NumberFormat(locale, {
        style: "percent",
        minimumFractionDigits: 2,
        maximumFractionDigits: 3,
      }),
      minutes: new Intl.NumberFormat(locale, {
        style: "unit",
        unit: "minute",
        unitDisplay: "long",
        maximumFractionDigits: 0,
      }),
    }),
    [locale],
  );

  // worst first; the color follows the remaining budget
  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("budgetLeft"),
        data: rows.map((row) => ({
          x: row.name,
          y: row.left,
          color:
            row.left < 0
              ? "var(--danger-color)"
              : row.left < FREEZE
                ? "var(--warning-color)"
                : "var(--success-color)",
        })),
      },
    ],
    [t],
  );
  const annotations = useMemo(
    (): ChartAnnotation[] => [
      {
        type: "line",
        axis: "y",
        value: FREEZE,
        dash: [4, 4],
        color: "var(--warning-color)",
        label: t("releaseFreeze"),
      },
    ],
    [t],
  );

  const onPointClick = (event: ChartHoverEvent) => {
    const index = event.items[0]?.index;
    if (index !== undefined) setSelected(index);
  };

  const row = selected === null ? undefined : rows[selected];
  const allowed = row ? (1 - row.slo) * WINDOW_MINUTES : 0;
  const used = row ? (1 - row.availability) * WINDOW_MINUTES : 0;

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <HorizontalBarChart
        series={series}
        labels
        legend={false}
        annotations={annotations}
        onPointClick={onPointClick}
        onPlotClick={() => setSelected(null)}
        yAxis={{ format: formats.percent }}
        height={320}
        ariaLabel={t("budgetAriaSlo")}
      />
      <output aria-live="polite" style={{ minHeight: "3em" }}>
        {row ? (
          <>
            <strong>{row.name}</strong>
            {" · "}
            {t("budgetDetails", {
              slo: formats.precise.format(row.slo),
              availability: formats.precise.format(row.availability),
            })}
            <br />
            <span
              style={{
                color:
                  allowed - used < 0
                    ? "var(--danger-color)"
                    : "var(--text-secondary-color)",
              }}
            >
              {allowed - used < 0
                ? t("budgetOverspent", {
                    minutes: formats.minutes.format(used - allowed),
                  })
                : t("budgetMinutesLeft", {
                    minutes: formats.minutes.format(allowed - used),
                    allowed: formats.minutes.format(allowed),
                  })}
            </span>
          </>
        ) : (
          <span style={{ color: "var(--text-secondary-color)" }}>
            {t("clickService")}
          </span>
        )}
      </output>
    </div>
  );
}

```

## Example: グループ化

複数の系列が各行に並びます。ここでは部門ごとの予算と実績です。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/horizontal-bar-chart/demos/grouped.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { HorizontalBarChart, type ChartSeries } from "minerva-design/charts";

// Yearly budget and actual spend per department (k€)
const departments = {
  engineering: [1450, 1520],
  marketing: [620, 540],
  sales: [880, 910],
  support: [310, 295],
  finance: [240, 228],
};

export default function GroupedDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.horizontal-bar-chart.data",
  });
  const locale = i18n.language;

  const series = useMemo((): ChartSeries[] => {
    const keys = Object.keys(departments) as (keyof typeof departments)[];
    return (["budget", "actual"] as const).map((name, k) => ({
      name: t(name),
      data: keys.map(
        (d) => [t(`departments.${d}`), departments[d][k] ?? 0] as const,
      ),
    }));
  }, [t]);
  const euros = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "EUR",
      notation: "compact",
    });
    return (value: number) => format.format(value * 1000);
  }, [locale]);

  return (
    <HorizontalBarChart
      series={series}
      yAxis={{ format: euros }}
      height={340}
      ariaLabel={t("budgetAria")}
    />
  );
}

```

## Example: 長いラベル

長いカテゴリ名も左側で読みやすいまま：ラベルを回転させず、軸が最も長い名前の幅を確保します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/horizontal-bar-chart/demos/long-labels.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { HorizontalBarChart, type ChartSeries } from "minerva-design/charts";

// Votes of the most requested features of a public roadmap
const requests = [
  ["darkMode", 1842],
  ["offlineMode", 1310],
  ["exportPdf", 1104],
  ["sso", 960],
  ["calendarSync", 712],
  ["bulkEdit", 655],
  ["customFields", 489],
] as const;

export default function LongLabelsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.horizontal-bar-chart.data",
  });
  const locale = i18n.language;
  // long names read naturally on the left, without rotated labels
  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("votes"),
        color: "var(--chart-series-5, #0ea5e9)",
        data: requests.map(
          ([key, votes]) => [t(`features.${key}`), votes] as const,
        ),
      },
    ],
    [t],
  );
  const integer = useMemo(() => new Intl.NumberFormat(locale), [locale]);

  return (
    <HorizontalBarChart
      series={series}
      labels
      yAxis={{ format: (value) => integer.format(value), title: t("votes") }}
      height={300}
      ariaLabel={t("featuresAria")}
    />
  );
}

```

## Example: 正と負

各データが自身の色を指定します。負の棒のラベルは左側に書かれます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/horizontal-bar-chart/demos/negative.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { HorizontalBarChart, type ChartSeries } from "minerva-design/charts";

// Change of the monthly active users per region since last quarter (%)
const changes = [
  ["northAmerica", 6.4],
  ["europe", 3.1],
  ["asiaPacific", 11.8],
  ["latinAmerica", -2.7],
  ["middleEast", -5.2],
  ["africa", 8.9],
] as const;

export default function NegativeDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.horizontal-bar-chart.data",
  });
  const locale = i18n.language;
  const percent = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "percent",
      maximumFractionDigits: 1,
      signDisplay: "exceptZero",
    });
    return (value: number) => format.format(value / 100);
  }, [locale]);

  // negative values grow to the left of zero; each bar sets its color
  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("growth"),
        format: percent,
        data: changes.map(([region, value]) => ({
          x: t(`regions.${region}`),
          y: value,
          color:
            value >= 0
              ? "var(--success-color, #16a34a)"
              : "var(--danger-color, #dc2626)",
        })),
      },
    ],
    [t, percent],
  );

  return (
    <HorizontalBarChart
      series={series}
      labels
      yAxis={{ format: percent }}
      height={300}
      ariaLabel={t("growthAria")}
    />
  );
}

```

## Example: 積み上げ進捗

percent で各行を 100% に揃えます。チームごとの課題の状態を示し、ツールチップには件数が残ります。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/horizontal-bar-chart/demos/progress.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { HorizontalBarChart, type ChartSeries } from "minerva-design/charts";

// Issues of the current milestone per team: done, in review, to do
const teams = {
  platform: [42, 6, 12],
  payments: [18, 9, 21],
  mobile: [30, 4, 4],
  growth: [11, 7, 26],
  design: [24, 2, 3],
};

export default function ProgressDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.horizontal-bar-chart.data",
  });

  const series = useMemo((): ChartSeries[] => {
    const keys = Object.keys(teams) as (keyof typeof teams)[];
    const status = [
      { key: "done", color: "var(--success-color, #16a34a)" },
      { key: "review", color: "var(--warning-color, #f59e0b)" },
      { key: "todo", color: "var(--border-color, #cbd5e1)" },
    ] as const;
    return status.map((s, k) => ({
      name: t(`status.${s.key}`),
      color: s.color,
      data: keys.map(
        (team) => [t(`teams.${team}`), teams[team][k] ?? 0] as const,
      ),
    }));
  }, [t]);

  // percent: every team fills the width; the tooltip keeps the counts
  return (
    <HorizontalBarChart
      series={series}
      percent
      height={280}
      ariaLabel={t("progressAria")}
    />
  );
}

```

## Example: バーチャートレース

setInterval（一時停止時とアンマウント時にクリア）で年末ごとの太陽光発電の設備容量を補間し、ステップごとに行を並べ替えます。各国は移動しても datum の色を保ち、国名は Intl.DisplayNames で表示します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/horizontal-bar-chart/demos/race.tsx

```tsx
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Tag } from "minerva-design";
import { HorizontalBarChart, type ChartSeries } from "minerva-design/charts";

// Cumulative installed solar capacity at the end of each year, in GW
// (rounded figures, 2015 to 2024)
const FIRST_YEAR = 2015;
const capacity: Record<string, number[]> = {
  CN: [43, 77, 130, 175, 205, 253, 307, 393, 609, 887],
  US: [26, 41, 51, 62, 75, 95, 123, 142, 175, 225],
  JP: [34, 42, 49, 56, 63, 71, 74, 79, 87, 92],
  DE: [39, 41, 42, 45, 49, 54, 59, 67, 82, 99],
  IN: [5, 10, 18, 27, 35, 39, 49, 63, 73, 98],
  IT: [19, 19, 20, 20, 21, 22, 23, 25, 30, 37],
  AU: [6, 7, 7, 11, 16, 20, 25, 29, 33, 37],
  ES: [5, 5, 5, 5, 9, 13, 17, 24, 31, 38],
  BR: [0, 0, 1, 2, 5, 8, 13, 24, 37, 52],
  FR: [7, 7, 8, 9, 9, 11, 13, 16, 19, 24],
  NL: [2, 2, 3, 5, 7, 11, 15, 19, 23, 27],
  KR: [4, 5, 6, 8, 11, 15, 18, 21, 24, 27],
};
const countries = Object.keys(capacity);
// one stable color per country: the 8 palette colors, then 4 more
const COLORS = [
  "var(--chart-series-1, #4f46e5)",
  "var(--chart-series-2, #10b981)",
  "var(--chart-series-3, #f59e0b)",
  "var(--chart-series-4, #ef4444)",
  "var(--chart-series-5, #0ea5e9)",
  "var(--chart-series-6, #8b5cf6)",
  "var(--chart-series-7, #14b8a6)",
  "var(--chart-series-8, #f97316)",
  "#ec4899",
  "#84cc16",
  "#64748b",
  "#a16207",
];
const YEARS = 10;
const STEPS_PER_YEAR = 10;
const LAST_FRAME = (YEARS - 1) * STEPS_PER_YEAR;
const SHOWN = 8;

// capacity of a country between two year ends, linearly interpolated
const valueAt = (country: string, frame: number) => {
  const values = capacity[country] ?? [];
  const year = Math.floor(frame / STEPS_PER_YEAR);
  const t = (frame % STEPS_PER_YEAR) / STEPS_PER_YEAR;
  const from = values[year] ?? 0;
  const to = values[Math.min(year + 1, YEARS - 1)] ?? from;
  return from + (to - from) * t;
};

export default function RaceDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.horizontal-bar-chart.data",
  });
  const locale = i18n.language;
  const [frame, setFrame] = useState(0);
  const [playing, setPlaying] = useState(false);

  const finished = frame >= LAST_FRAME;
  const running = playing && !finished;

  // one step every 120 ms; the interval stops at the last year and on unmount
  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      setFrame((current) => Math.min(current + 1, LAST_FRAME));
    }, 120);
    return () => window.clearInterval(id);
  }, [running]);

  const names = useMemo(
    () => new Intl.DisplayNames(locale, { type: "region" }),
    [locale],
  );
  const gw = useMemo(() => {
    const format = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 });
    return (value: number) => t("gigawatts", { value: format.format(value) });
  }, [locale, t]);

  // re-sorted every frame; each country keeps its palette color
  const series = useMemo((): ChartSeries[] => {
    const rows = countries
      .map((code, i) => ({ code, i, value: valueAt(code, frame) }))
      .sort((a, b) => b.value - a.value)
      .slice(0, SHOWN);
    return [
      {
        name: t("solarCapacity"),
        data: rows.map((row) => ({
          x: names.of(row.code) ?? row.code,
          y: row.value,
          color: COLORS[row.i % COLORS.length],
        })),
      },
    ];
  }, [t, names, frame]);

  const year = FIRST_YEAR + Math.floor(frame / STEPS_PER_YEAR);
  const play = () => {
    if (finished) setFrame(0);
    setPlaying(true);
  };

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 8,
        }}
      >
        {running ? (
          <Button
            size="small"
            variant="outline"
            onClick={() => setPlaying(false)}
          >
            {t("pause")}
          </Button>
        ) : (
          <Button size="small" onClick={play}>
            {finished ? t("replay") : t("play")}
          </Button>
        )}
        <Button
          size="small"
          variant="outline"
          disabled={frame === 0}
          onClick={() => {
            setPlaying(false);
            setFrame(0);
          }}
        >
          {t("restart")}
        </Button>
        <output aria-live="off" style={{ marginInlineStart: "auto" }}>
          <Tag size="large">
            {new Intl.NumberFormat(locale, { useGrouping: false }).format(year)}
          </Tag>
        </output>
      </div>
      <HorizontalBarChart
        series={series}
        labels
        legend={false}
        yAxis={{ format: gw }}
        height={320}
        ariaLabel={t("raceAria", {
          year: new Intl.NumberFormat(locale, { useGrouping: false }).format(
            year,
          ),
        })}
      />
    </div>
  );
}

```

## Example: 給与レンジ

フローティングバーは y0 から y まで伸び、各職位の給与レンジを表します。y 方向の線注釈はボタンで設定したオファー額に追従し、それを含むレンジは緑色になります。renderTooltip には最低額・中央値・最高額とコンパレシオを表示します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/horizontal-bar-chart/demos/salary-bands.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
import {
  HorizontalBarChart,
  type ChartAnnotation,
  type ChartHoverEvent,
  type ChartSeries,
} from "minerva-design/charts";

// Yearly base salary band of each job level, in dollars
const bands = [
  { key: "junior", min: 70000, max: 95000 },
  { key: "intermediate", min: 88000, max: 120000 },
  { key: "senior", min: 115000, max: 155000 },
  { key: "staff", min: 145000, max: 190000 },
  { key: "principal", min: 175000, max: 230000 },
  { key: "director", min: 190000, max: 260000 },
] as const;
const STEP = 5000;
const LOWEST = 60000;
const HIGHEST = 270000;

export default function SalaryBandsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.horizontal-bar-chart.data",
  });
  const locale = i18n.language;
  const [offer, setOffer] = useState(150000);

  const formats = useMemo(
    () => ({
      usd: new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }),
      compact: new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "USD",
        notation: "compact",
      }),
      percent: new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 0,
      }),
      list: new Intl.ListFormat(locale, { type: "conjunction" }),
    }),
    [locale],
  );

  const fits = useMemo(
    () => bands.filter((band) => offer >= band.min && offer <= band.max),
    [offer],
  );
  // floating bars: y0 is the bottom of the band and y its top; the bands the
  // offer falls into are highlighted through their datum color
  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: t("salaryBand"),
        data: bands.map((band) => ({
          x: t(`levels.${band.key}`),
          y0: band.min,
          y: band.max,
          color: fits.includes(band)
            ? "var(--success-color)"
            : "var(--border-strong-color)",
        })),
      },
    ],
    [t, fits],
  );
  const annotations = useMemo(
    (): ChartAnnotation[] => [
      {
        type: "line",
        axis: "y",
        value: offer,
        width: 2,
        color: "var(--primary-color)",
        label: t("offer"),
      },
    ],
    [t, offer],
  );

  const renderTooltip = (event: ChartHoverEvent) => {
    const band = bands[event.items[0]?.index ?? -1];
    if (!band) return null;
    const mid = (band.min + band.max) / 2;
    const rows = [
      [t("bandMin"), band.min],
      [t("bandMid"), mid],
      [t("bandMax"), band.max],
    ] as const;
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: "2px 16px",
        }}
      >
        <strong style={{ gridColumn: "1 / -1" }}>{event.xLabel}</strong>
        {rows.map(([label, value]) => (
          <span key={label} style={{ display: "contents" }}>
            <span>{label}</span>
            <span style={{ textAlign: "end" }}>
              {formats.usd.format(value)}
            </span>
          </span>
        ))}
        <span>{t("compaRatio")}</span>
        <strong style={{ textAlign: "end" }}>
          {formats.percent.format(offer / mid)}
        </strong>
      </div>
    );
  };

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 8,
        }}
      >
        <Button
          size="small"
          variant="outline"
          disabled={offer <= LOWEST}
          onClick={() => setOffer((value) => value - STEP)}
        >
          {t("offerDown", { step: formats.compact.format(STEP) })}
        </Button>
        <Button
          size="small"
          variant="outline"
          disabled={offer >= HIGHEST}
          onClick={() => setOffer((value) => value + STEP)}
        >
          {t("offerUp", { step: formats.compact.format(STEP) })}
        </Button>
        <output aria-live="polite">
          {fits.length > 0
            ? t("offerFits", {
                offer: formats.usd.format(offer),
                levels: formats.list.format(
                  fits.map((band) => t(`levels.${band.key}`)),
                ),
              })
            : t("offerOutside", { offer: formats.usd.format(offer) })}
        </output>
      </div>
      <HorizontalBarChart
        series={series}
        annotations={annotations}
        renderTooltip={renderTooltip}
        legend={false}
        yAxis={{
          zero: false,
          min: 50000,
          max: 280000,
          format: (y) => formats.compact.format(y),
        }}
        height={300}
        ariaLabel={t("salaryAria")}
      />
    </div>
  );
}

```

## Example: 上位 N 件

RadioGroup で指標を、Select で表示する行数を選びます。データはチャートに渡す前に並べ替えて切り詰め、高さは行数に合わせて変わります。出力欄には上位の行が全体に占める割合を表示します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/horizontal-bar-chart/demos/top-n.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup, Select, SelectItem } from "minerva-design";
import { HorizontalBarChart, type ChartSeries } from "minerva-design/charts";

type Metric = "revenue" | "units";

// Sales of the online shop last month: revenue in dollars and units sold
const products = {
  headphones: { revenue: 184200, units: 921 },
  smartwatch: { revenue: 162800, units: 592 },
  speaker: { revenue: 95400, units: 1060 },
  keyboard: { revenue: 71300, units: 713 },
  charger: { revenue: 48900, units: 1956 },
  webcam: { revenue: 45200, units: 502 },
  mouse: { revenue: 39800, units: 995 },
  tablet: { revenue: 138500, units: 277 },
  cable: { revenue: 21600, units: 2160 },
  stand: { revenue: 33700, units: 674 },
} as const;
type Product = keyof typeof products;
const keys = Object.keys(products) as Product[];

export default function TopNDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.horizontal-bar-chart.data",
  });
  const locale = i18n.language;
  const [metric, setMetric] = useState<Metric>("revenue");
  const [limit, setLimit] = useState("5");

  const format = useMemo(() => {
    const usd = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    });
    const number = new Intl.NumberFormat(locale);
    return (value: number) =>
      metric === "revenue" ? usd.format(value) : number.format(value);
  }, [locale, metric]);

  // sorted from the highest value, then cut: the first row is drawn at the top
  const ranked = useMemo(
    () =>
      [...keys]
        .sort((a, b) => products[b][metric] - products[a][metric])
        .slice(0, Number(limit)),
    [metric, limit],
  );
  const series = useMemo(
    (): ChartSeries[] => [
      {
        name: metric === "revenue" ? t("revenue") : t("unitsSold"),
        color:
          metric === "revenue"
            ? "var(--chart-series-1, #4f46e5)"
            : "var(--chart-series-3, #f59e0b)",
        data: ranked.map(
          (key) => [t(`products.${key}`), products[key][metric]] as const,
        ),
      },
    ],
    [t, metric, ranked],
  );
  const share =
    ranked.reduce((sum, key) => sum + products[key][metric], 0) /
    keys.reduce((sum, key) => sum + products[key][metric], 0);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 16,
        }}
      >
        <RadioGroup
          aria-label={t("rankBy")}
          direction="horizontal"
          value={metric}
          onChange={(value) => setMetric(value as Metric)}
        >
          <Radio value="revenue">{t("revenue")}</Radio>
          <Radio value="units">{t("unitsSold")}</Radio>
        </RadioGroup>
        <Select
          size="small"
          style={{ width: 140 }}
          aria-label={t("show")}
          value={limit}
          onChange={setLimit}
        >
          <SelectItem value="3">{t("topN", { n: 3 })}</SelectItem>
          <SelectItem value="5">{t("topN", { n: 5 })}</SelectItem>
          <SelectItem value={String(keys.length)}>
            {t("allProducts")}
          </SelectItem>
        </Select>
      </div>
      <HorizontalBarChart
        series={series}
        labels
        legend={false}
        yAxis={{ format }}
        height={Math.max(160, 48 + ranked.length * 30)}
        ariaLabel={t("topProductsAria")}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {t("topShare", {
          n: ranked.length,
          share: new Intl.NumberFormat(locale, {
            style: "percent",
            maximumFractionDigits: 0,
          }).format(share),
        })}
      </output>
    </div>
  );
}

```

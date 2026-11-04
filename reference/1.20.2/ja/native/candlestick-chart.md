# ローソク足チャート

期間ごとの始値・高値・安値・終値を表すローソク足チャート。株式や暗号資産など、あらゆる OHLC データに使えます。陽線と陰線は別々の色で描かれ、移動平均などの折れ線系列を重ねられます。長い履歴でも GPU によりズームやパンがなめらかです。

Package: minerva-design@1.20.2

Renderer: native

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.2",
  "sourceCommit": "8d5d0df3644b1fa1c267b3dd6809b0e7eb1ce75b",
  "sourceDigest": "sha256:2862a9e3a864c9423aed5d287db6fac7e8ddf58b9f5d144c61e7ff4a2630890e",
  "referenceSourceDigest": "sha256:b329acf9d5eb6cf4b4b42169ce925c67b033f581b616664bf07fc6d664de45f0"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.2/types.json) or getType() from minerva-design/contracts.

## Documentation

始値

高値

安値

終値

騰落率

ローソク足の色

上昇は緑、下落は赤

上昇は赤、下落は緑

ACME の 60 営業日の日足

MA{{days}}

NOVA の 120 営業日の日足と 5 日・20 日移動平均

50,000 本の 1 分足

{{candles}} 本 · {{renderer}} で描画 · Ctrl / ⌘ + ホイールでズーム、ドラッグでパン、ダブルクリックでリセット

出来高

ORBT の 90 営業日の日足

ORBT の日次出来高

VWAP

業績見通しの下方修正

ORBT の 1 セッションの 5 分足と VWAP

日足のバーチャート

日足のローソク足

日足の中抜きローソク足

バーチャート

ローソク足

中抜きローソク足

始値と終値を横線で

始値から終値までの実体

終値が高いと中抜き

ETH/USDT

8 本の指数移動平均付き ETH/USDT 4 時間足チャート

出来高の表示

専用ペイン

価格の下に重ねる

BTC/USDT

ローソク足の色の出来高付き BTC/USDT 1 時間足チャート

CATL 300750

陽線が赤の CATL 日足チャート

決

配

分

予↓

決算

配当

株式分割

業績予想の下方修正

ORBT

決算・配当・株式分割付きの ORBT 日足チャート

一時停止

再開

リアルタイム：毎秒 10 件の約定

一時停止中

ADA/USDT

5 秒

リアルタイムで更新される ADA/USDT 5 秒足

ナスダック 100

ダークテーマのナスダック 100 30 分足（中抜きローソク足）

パターン

すべて

十字線

カラカサ

流れ星

包み足

十

カ

流

包↑

包↓

十字線

カラカサ

流れ星

陽の包み足

陰の包み足

始値と終値がほぼ同じ、迷い

下落後の長い下ヒゲ、買いが入った

上昇後の長い上ヒゲ、売りが入った

陽線の実体が前の陰線を包む

陰線の実体が前の陽線を包む

{{name}}：{{value}}

{{date}} の{{name}}：{{meaning}}。

マークの付いた足にカーソルを合わせるとパターン名を表示します。

ローソク足パターンを示した ORBT の日足チャート

BTC/USD

AAPL

EUR/USD

金 (XAU/USD)

48 時間

30 日

{{name}} のローソク足、期間の騰落率 {{change}}

R1

P

S1

EUR/USD

日次ピボットを示した EUR/USD の1時間足

{{time}} · 値幅 {{range}} pips · 実体 {{body}} pips · 変化 {{change}} pips · カーソルは現在値から {{distance}} pips

金曜日のピボット：P {{pivot}}、R1 {{r1}}、S1 {{s1}}。足にカーソルを合わせると pips で測ります。

## CandlestickChart

Support: beta

Chart component of minerva-design/native: the canvas chart engine drawn with views (touch scrub, pinch zoom, legend toggles).

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "CandlestickChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "series",
    "source": "packages/native/src/components/Charts/types.ts",
    "kind": "array",
    "typeText": "readonly ChartSeries[]",
    "typeRef": "type:deda0bcb88251b63a5de",
    "required": true,
    "description": "Series drawn as candles unless they set a `type` (e.g. a moving average `line`); data points carry `open`, `high`, `low` and `y` (the close)"
  },
  {
    "name": "height",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "union",
    "typeText": "DimensionValue | undefined",
    "typeRef": "type:cd08f9fa3f57e56425b7",
    "default": 320,
    "required": false,
    "description": "Height of the chart (the legend included)"
  },
  {
    "name": "width",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "union",
    "typeText": "DimensionValue | undefined",
    "typeRef": "type:cd08f9fa3f57e56425b7",
    "default": "100%",
    "required": false,
    "description": "Width of the chart"
  },
  {
    "name": "xAxis",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "object",
    "typeText": "ChartAxisOptions | undefined",
    "typeRef": "type:6eb50d4f419370a826a4",
    "required": false,
    "description": "X axis"
  },
  {
    "name": "yAxis",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "object",
    "typeText": "ChartAxisOptions | undefined",
    "typeRef": "type:6eb50d4f419370a826a4",
    "required": false,
    "description": "Y axis"
  },
  {
    "name": "legend",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "union",
    "typeText": "boolean | ChartLegendOptions | undefined",
    "typeRef": "type:860fa553ee4deaac43f8",
    "required": false,
    "description": "Legend; shown by default when several series have a name (tap toggles a series)"
  },
  {
    "name": "tooltip",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "union",
    "typeText": "boolean | ChartTooltipOptions | undefined",
    "typeRef": "type:c08795b3492e4547d570",
    "required": false,
    "description": "Tooltip shown on tap / while scrubbing; `false` disables it"
  },
  {
    "name": "crosshair",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Vertical guide line following the finger"
  },
  {
    "name": "annotations",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "array",
    "typeText": "readonly ChartAnnotation[] | undefined",
    "typeRef": "type:f440eb8a958892b1b0c2",
    "required": false,
    "description": "Background areas, reference lines and texts"
  },
  {
    "name": "interaction",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "union",
    "typeText": "boolean | ChartInteractionOptions | undefined",
    "typeRef": "type:f4b160d7dd18649fd178",
    "default": true,
    "required": false,
    "description": "Pinch to zoom, drag to pan when zoomed, double tap to reset; `false` makes the chart static"
  },
  {
    "name": "padding",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "object",
    "typeText": "ChartPadding | undefined",
    "typeRef": "type:7c2c76b2d4d6c9fbf43a",
    "required": false,
    "description": "Space around the plot area, in pixels"
  },
  {
    "name": "palette",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "array",
    "typeText": "readonly string[] | undefined",
    "typeRef": "type:88dcb55e82bb1c501478",
    "required": false,
    "description": "Series colors (defaults to the `chart-series-1..8` tokens, then the theme colors)"
  },
  {
    "name": "ariaLabel",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible name of the chart"
  },
  {
    "name": "locale",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Locale of the texts and numbers the chart writes (tooltip rows, compact units `k` / `万`, separators, month and weekday names of time axes)"
  },
  {
    "name": "labels",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "object",
    "typeText": "Partial<ChartLabels> | undefined",
    "typeRef": "type:14c31fd72a2c2ac7a7fd",
    "required": false,
    "description": "Overrides of the built-in texts of the `locale`"
  },
  {
    "name": "renderTooltip",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "node",
    "typeText": "((event: ChartHoverEvent) => ReactNode) | undefined",
    "typeRef": "type:66d650d38e6b7d308d32",
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
    "name": "testID",
    "source": "packages/native/src/components/Chart/types.ts",
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
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "function",
    "typeText": "((event: ChartHoverEvent | null) => void) | undefined",
    "typeRef": "type:170f27b8f07028fffd08",
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
    "description": "Called when the highlighted points change"
  },
  {
    "name": "onPointClick",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "function",
    "typeText": "((event: ChartHoverEvent) => void) | undefined",
    "typeRef": "type:d586363317763d2fd3f3",
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
    "description": "Called when a point (or bar) is tapped"
  },
  {
    "name": "onPlotClick",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "function",
    "typeText": "((event: ChartPlotClickEvent) => void) | undefined",
    "typeRef": "type:3ab7d8ab926fce010082",
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
    "description": "Called when the plot area is tapped where there is no point"
  },
  {
    "name": "onZoom",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "function",
    "typeText": "((view: ChartView) => void) | undefined",
    "typeRef": "type:e6c98e88ed542ed60f34",
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
  }
]
```

## API

```json
{
  "native:CandlestickChartProps": {
    "source": "native/src/components/Charts/types.ts",
    "description": "Props of CandlestickChart",
    "kind": "interface",
    "extends": [
      "ChartCommonProps"
    ],
    "props": [
      {
        "name": "series",
        "type": "readonly ChartSeries[]",
        "required": true,
        "description": "Series drawn as candles unless they set a `type` (e.g. a moving average `line`); data points carry `open`, `high`, `low` and `y` (the close)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: 基本

データ点は open、high、low、y（終値）を持ちます。上昇したローソク足は緑、下落は赤です。逆の慣習の市場では upColor / downColor で入れ替えます。renderTooltip が Intl.NumberFormat で四本値を読者の言語で表記します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/candlestick-chart/native/basic.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import {
  CandlestickChart,
  useTheme,
  type ChartHoverEvent,
  type ChartPointDatum,
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

// 40 trading days of ACME (weekends skipped)
function dailyCandles(date: Intl.DateTimeFormat) {
  const random = mulberry32(42);
  const candles: ChartPointDatum[] = [];
  let close = 182;
  for (let time = Date.UTC(2026, 2, 2); candles.length < 40; time += DAY) {
    if (new Date(time).getUTCDay() % 6 === 0) continue;
    const open = close * (1 + (random() - 0.5) * 0.012);
    close = open * (1 + (random() + random() - 1) * 0.035 + 0.001);
    const high = Math.max(open, close) * (1 + random() * 0.012);
    const low = Math.min(open, close) * (1 - random() * 0.012);
    candles.push({ x: date.format(time), open, high, low, y: close });
  }
  return candles;
}

export default function Basic() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.candlestick-chart",
  });
  const { colors } = useTheme();
  const locale = i18n.language;
  const [candle, setCandle] = useState<ChartHoverEvent | null>(null);
  const usd = useMemo(
    () => new Intl.NumberFormat(locale, { style: "currency", currency: "USD" }),
    [locale],
  );
  const candles = useMemo(
    () =>
      dailyCandles(
        new Intl.DateTimeFormat(locale, {
          month: "short",
          day: "numeric",
          timeZone: "UTC",
        }),
      ),
    [locale],
  );
  const item = candle?.items[0];
  return (
    <View style={{ width: "100%", gap: 8 }}>
      <CandlestickChart
        series={[{ name: "ACME", data: candles }]}
        locale={locale}
        yAxis={{ format: (value) => usd.format(value) }}
        height={280}
        onHover={setCandle}
        ariaLabel={t("data.acmeAria")}
      />
      <Text role="status" style={{ color: colors["text-secondary-color"] }}>
        {item && item.open !== undefined
          ? [
              candle?.xLabel,
              `${t("data.open")} ${usd.format(item.open)}`,
              `${t("data.close")} ${usd.format(item.y)}`,
            ].join(" · ")
          : t("native.data.scrub")}
      </Text>
    </View>
  );
}

```

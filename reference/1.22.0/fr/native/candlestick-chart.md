# Graphique en chandeliers

Cours d’ouverture, plus haut, plus bas et clôture par période, pour des actions, des cryptomonnaies ou toute donnée OHLC. Les bougies haussières et baissières ont chacune leur couleur, des séries de lignes peuvent s’y ajouter (moyennes mobiles) et les longs historiques restent fluides à zoomer et à faire défiler grâce au GPU.

Package: minerva-design@1.22.0

Renderer: native

Locale: fr

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

Ouverture

Plus haut

Plus bas

Clôture

Variation

Couleurs des bougies

Vert en hausse, rouge en baisse

Rouge en hausse, vert en baisse

Cours quotidiens d'ACME sur 60 séances

MM {{days}}

Cours quotidiens de NOVA sur 120 séances avec les moyennes mobiles à 5 et 20 jours

50 000 bougies d'une minute

{{candles}} bougies · dessinées avec {{renderer}} · Ctrl / ⌘ + molette pour zoomer, glisser pour se déplacer, double-clic pour réinitialiser

Volume

Cours quotidiens d'ORBT sur 90 séances

Volume quotidien échangé d'ORBT

VWAP

Prévisions abaissées

Bougies de 5 minutes d'ORBT sur une séance avec le VWAP

Barres OHLC journalières

Chandeliers journaliers

Chandeliers creux journaliers

Barres OHLC

Chandeliers

Chandeliers creux

traits pour l'ouverture et la clôture

corps plein de l'ouverture à la clôture

corps vide quand la clôture est plus haute

ETH/USDT

Graphique 4 heures d'ETH/USDT avec huit moyennes exponentielles

Volume

Panneau dédié

Sous les prix

BTC/USDT

Graphique horaire de BTC/USDT avec le volume coloré selon les bougies

CATL 300750

Graphique journalier de CATL, bougies haussières en rouge

R

D

Div

P↓

Résultats

Dividende

Division d'actions

Prévisions abaissées

ORBT

Graphique journalier d'ORBT avec résultats, dividendes et division d'actions

Pause

Reprendre

En direct : dix transactions par seconde

En pause

ADA/USDT

5 s

Bougies de cinq secondes d'ADA/USDT mises à jour en direct

NASDAQ 100

Chandeliers creux 30 minutes du NASDAQ 100 sur un thème nuit

Figure

Toutes

Doji

Marteau

Étoile filante

Avalement

D

M

EF

A↑

A↓

Doji

Marteau

Étoile filante

Avalement haussier

Avalement baissier

ouverture et clôture presque égales, indécision

longue mèche basse après une baisse, les acheteurs arrivent

longue mèche haute après une hausse, les vendeurs arrivent

un corps haussier recouvre le corps baissier précédent

un corps baissier recouvre le corps haussier précédent

{{name}} : {{value}}

{{name}} le {{date}} : {{meaning}}.

Survolez une bougie marquée pour nommer sa figure.

Graphique journalier ORBT avec les figures en chandeliers

BTC/USD

AAPL

EUR/USD

Or (XAU/USD)

48 heures

30 jours

Bougies {{name}}, {{change}} sur la période

R1

P

S1

EUR/USD

Bougies horaires EUR/USD avec les points pivots journaliers

{{time}} · amplitude {{range}} pips · corps {{body}} pips · variation {{change}} pips · réticule à {{distance}} pips du dernier cours

Pivots de vendredi : P {{pivot}}, R1 {{r1}}, S1 {{s1}}. Survolez une bougie pour la mesurer en pips.

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

## Example: Base

Les points portent open, high, low et y (la clôture). Les bougies sont vertes quand elles clôturent en hausse et rouges en baisse ; upColor / downColor les inversent pour les marchés qui suivent la convention opposée. renderTooltip écrit les valeurs OHLC avec Intl.NumberFormat dans la langue du lecteur.

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

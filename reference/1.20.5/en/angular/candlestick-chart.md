# Candlestick chart

Open, high, low and close prices per period, for stocks, crypto or any OHLC data. Rising and falling candles get their own colors, line series can be added (moving averages) and long histories stay smooth to zoom and pan on the GPU.

Package: minerva-design@1.20.5

Renderer: angular

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.5",
  "sourceCommit": "fe15b45f84b480cdd9cfec147df037927ba34a6b",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:49d7ff5e7a649e86d07ff0f6e5da47ae57bc234041d4b820a629aeca119fd0cb"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.5/types.json) or getType() from minerva-design/contracts.

## Documentation

Open

High

Low

Close

Change

Candle colors

Green up, red down

Red up, green down

ACME daily prices over 60 trading days

MA {{days}}

NOVA daily prices over 120 trading days with 5 and 20 day moving averages

50,000 one-minute candles

{{candles}} candles · drawn with {{renderer}} · Ctrl / ⌘ + wheel to zoom, drag to pan, double-click to reset

Volume

ORBT daily prices over 90 trading days

ORBT daily traded volume

VWAP

Guidance cut

ORBT 5-minute candles over one session with the VWAP

Daily OHLC bars

Daily candles

Daily hollow candles

OHLC bars

Candles

Hollow candles

ticks for the open and the close

filled body from open to close

empty body when the close is higher

ETH/USDT

ETH/USDT four-hour chart with eight exponential averages

Volume

Own pane

Under the price

BTC/USDT

BTC/USDT hourly chart with volume colored by candle

CATL 300750

CATL daily chart, rising candles in red

E

D

S

G↓

Earnings

Dividend

Stock split

Guidance cut

ORBT

ORBT daily chart with earnings, dividends and a split

Pause

Resume

Live: ten trades a second

Paused

ADA/USDT

5s

ADA/USDT five-second candles updated live

NASDAQ 100

NASDAQ 100 30-minute hollow candles on a night theme

Pattern

All

Doji

Hammer

Shooting star

Engulfing

D

H

SS

E↑

E↓

Doji

Hammer

Shooting star

Bullish engulfing

Bearish engulfing

open and close almost equal, indecision

long lower shadow after a decline, buyers stepping in

long upper shadow after a rise, sellers stepping in

a rising body covers the previous falling one

a falling body covers the previous rising one

{{name}}: {{value}}

{{name}} on {{date}}: {{meaning}}.

Hover a marked candle to name its pattern.

ORBT daily chart with candlestick patterns marked

BTC/USD

AAPL

EUR/USD

Gold (XAU/USD)

48 hours

30 days

{{name}} candles, {{change}} over the period

R1

P

S1

EUR/USD

EUR/USD hourly candles with daily pivot levels

{{time}} · range {{range}} pips · body {{body}} pips · change {{change}} pips · crosshair {{distance}} pips from the last price

Pivots for Friday: P {{pivot}}, R1 {{r1}}, S1 {{s1}}. Hover a candle to measure it in pips.

## CandlestickChart

Support: beta

Native Angular: MnCandlestickChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnCandlestickChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "series",
    "typeText": "readonly ChartSeries[]",
    "required": true,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "xAxis",
    "typeText": "ChartAxisOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "yAxis",
    "typeText": "ChartAxisOptions | undefined",
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
    "name": "pointClick",
    "typeText": "ChartHoverEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ChartHoverEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "plotClick",
    "typeText": "ChartPlotClickEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ChartPlotClickEvent",
        "required": true,
        "rest": false
      }
    ]
  },
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

## Example: Daily candles

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnCandlestickChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnCandlestickChart],
  template: `
@let t = labels[language()];
<mn-candlestick-chart
  [series]="[{ name: t.price, data: candles }]"
  [xAxis]="{ title: t.day }"
  [yAxis]="{ zero: false }"
  [height]="300"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  candles = [
  {
    "x": 1,
    "open": 100,
    "y": 100,
    "high": 101.5,
    "low": 98.5
  },
  {
    "x": 2,
    "open": 101.98,
    "y": 105.76,
    "high": 107.26,
    "low": 100.48
  },
  {
    "x": 3,
    "open": 103.84,
    "y": 101.39,
    "high": 105.34,
    "low": 99.89
  },
  {
    "x": 4,
    "open": 105.45,
    "y": 103.25,
    "high": 106.95,
    "low": 101.75
  },
  {
    "x": 5,
    "open": 106.73,
    "y": 110.6,
    "high": 112.1,
    "low": 105.23
  },
  {
    "x": 6,
    "open": 107.59,
    "y": 107.29,
    "high": 109.09,
    "low": 105.79
  },
  {
    "x": 7,
    "open": 107.98,
    "y": 104.3,
    "high": 109.48,
    "low": 102.8
  },
  {
    "x": 8,
    "open": 107.87,
    "y": 110.55,
    "high": 112.05,
    "low": 106.37
  },
  {
    "x": 9,
    "open": 107.27,
    "y": 109.22,
    "high": 110.72,
    "low": 105.77
  },
  {
    "x": 10,
    "open": 106.22,
    "y": 102.29,
    "high": 107.72,
    "low": 100.79
  },
  {
    "x": 11,
    "open": 104.79,
    "y": 105.39,
    "high": 106.89,
    "low": 103.29
  },
  {
    "x": 12,
    "open": 103.05,
    "y": 106.6,
    "high": 108.1,
    "low": 101.55
  },
  {
    "x": 13,
    "open": 101.13,
    "y": 98.23,
    "high": 102.63,
    "low": 96.73
  },
  {
    "x": 14,
    "open": 99.13,
    "y": 97.46,
    "high": 100.63,
    "low": 95.96
  },
  {
    "x": 15,
    "open": 97.19,
    "y": 101.17,
    "high": 102.67,
    "low": 95.69
  },
  {
    "x": 16,
    "open": 95.43,
    "y": 94.53,
    "high": 96.93,
    "low": 93.03
  },
  {
    "x": 17,
    "open": 93.95,
    "y": 90.55,
    "high": 95.45,
    "low": 89.05
  },
  {
    "x": 18,
    "open": 92.84,
    "y": 95.93,
    "high": 97.43,
    "low": 91.34
  },
  {
    "x": 19,
    "open": 92.18,
    "y": 93.58,
    "high": 95.08,
    "low": 90.68
  },
  {
    "x": 20,
    "open": 92.01,
    "y": 88.01,
    "high": 93.51,
    "low": 86.51
  },
  {
    "x": 21,
    "open": 92.33,
    "y": 93.51,
    "high": 95.01,
    "low": 90.83
  },
  {
    "x": 22,
    "open": 93.13,
    "y": 96.36,
    "high": 97.86,
    "low": 91.63
  },
  {
    "x": 23,
    "open": 94.36,
    "y": 91.08,
    "high": 95.86,
    "low": 89.58
  },
  {
    "x": 24,
    "open": 95.93,
    "y": 94.82,
    "high": 97.43,
    "low": 93.32
  }
];
  labels = {
  "en": {
    "price": "Price",
    "day": "Day"
  },
  "zh": {
    "price": "价格",
    "day": "天"
  },
  "ja": {
    "price": "価格",
    "day": "日"
  },
  "fr": {
    "price": "Cours",
    "day": "Jour"
  }
};
}

```

## Example: Moving averages

Series with type: "line" are drawn over the candles, here 5 and 20-day moving averages that start with null values. Hover a day to read its OHLC values, its change and both averages.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnCandlestickChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnCandlestickChart],
  template: `
@let t = labels[language()];
<mn-candlestick-chart
  [series]="[
    { name: t.price, data: candles },
    { name: t.average, type: 'line', curve: 'smooth', data: average }
  ]"
  [yAxis]="{ zero: false }"
  [height]="300"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  candles = [
  {
    "x": 1,
    "open": 80,
    "y": 80,
    "high": 81.5,
    "low": 78.5
  },
  {
    "x": 2,
    "open": 82.78,
    "y": 86.56,
    "high": 88.06,
    "low": 81.28
  },
  {
    "x": 3,
    "open": 85.44,
    "y": 82.99,
    "high": 86.94,
    "low": 81.49
  },
  {
    "x": 4,
    "open": 87.85,
    "y": 85.65,
    "high": 89.35,
    "low": 84.15
  },
  {
    "x": 5,
    "open": 89.93,
    "y": 93.8,
    "high": 95.3,
    "low": 88.43
  },
  {
    "x": 6,
    "open": 91.59,
    "y": 91.29,
    "high": 93.09,
    "low": 89.79
  },
  {
    "x": 7,
    "open": 92.78,
    "y": 89.1,
    "high": 94.28,
    "low": 87.6
  },
  {
    "x": 8,
    "open": 93.47,
    "y": 96.15,
    "high": 97.65,
    "low": 91.97
  },
  {
    "x": 9,
    "open": 93.67,
    "y": 95.62,
    "high": 97.12,
    "low": 92.17
  },
  {
    "x": 10,
    "open": 93.42,
    "y": 89.49,
    "high": 94.92,
    "low": 87.99
  },
  {
    "x": 11,
    "open": 92.79,
    "y": 93.39,
    "high": 94.89,
    "low": 91.29
  },
  {
    "x": 12,
    "open": 91.85,
    "y": 95.4,
    "high": 96.9,
    "low": 90.35
  },
  {
    "x": 13,
    "open": 90.73,
    "y": 87.83,
    "high": 92.23,
    "low": 86.33
  },
  {
    "x": 14,
    "open": 89.53,
    "y": 87.86,
    "high": 91.03,
    "low": 86.36
  },
  {
    "x": 15,
    "open": 88.39,
    "y": 92.37,
    "high": 93.87,
    "low": 86.89
  },
  {
    "x": 16,
    "open": 87.43,
    "y": 86.53,
    "high": 88.93,
    "low": 85.03
  },
  {
    "x": 17,
    "open": 86.75,
    "y": 83.35,
    "high": 88.25,
    "low": 81.85
  },
  {
    "x": 18,
    "open": 86.44,
    "y": 89.53,
    "high": 91.03,
    "low": 84.94
  },
  {
    "x": 19,
    "open": 86.58,
    "y": 87.98,
    "high": 89.48,
    "low": 85.08
  },
  {
    "x": 20,
    "open": 87.21,
    "y": 83.21,
    "high": 88.71,
    "low": 81.71
  },
  {
    "x": 21,
    "open": 88.33,
    "y": 89.51,
    "high": 91.01,
    "low": 86.83
  },
  {
    "x": 22,
    "open": 89.93,
    "y": 93.16,
    "high": 94.66,
    "low": 88.43
  },
  {
    "x": 23,
    "open": 91.96,
    "y": 88.68,
    "high": 93.46,
    "low": 87.18
  },
  {
    "x": 24,
    "open": 94.33,
    "y": 93.22,
    "high": 95.83,
    "low": 91.72
  }
];
  average = [
  {
    "x": 1,
    "y": 80
  },
  {
    "x": 2,
    "y": 83.28
  },
  {
    "x": 3,
    "y": 83.18
  },
  {
    "x": 4,
    "y": 83.8
  },
  {
    "x": 5,
    "y": 85.8
  },
  {
    "x": 6,
    "y": 88.06
  },
  {
    "x": 7,
    "y": 88.57
  },
  {
    "x": 8,
    "y": 91.2
  },
  {
    "x": 9,
    "y": 93.19
  },
  {
    "x": 10,
    "y": 92.33
  },
  {
    "x": 11,
    "y": 92.75
  },
  {
    "x": 12,
    "y": 94.01
  },
  {
    "x": 13,
    "y": 92.35
  },
  {
    "x": 14,
    "y": 90.79
  },
  {
    "x": 15,
    "y": 91.37
  },
  {
    "x": 16,
    "y": 90
  },
  {
    "x": 17,
    "y": 87.59
  },
  {
    "x": 18,
    "y": 87.93
  },
  {
    "x": 19,
    "y": 87.95
  },
  {
    "x": 20,
    "y": 86.12
  },
  {
    "x": 21,
    "y": 86.72
  },
  {
    "x": 22,
    "y": 88.68
  },
  {
    "x": 23,
    "y": 88.51
  },
  {
    "x": 24,
    "y": 89.56
  }
];
  labels = {
  "en": {
    "price": "Price",
    "average": "5-day average"
  },
  "zh": {
    "price": "价格",
    "average": "5 日均线"
  },
  "ja": {
    "price": "価格",
    "average": "5日移動平均"
  },
  "fr": {
    "price": "Cours",
    "average": "Moyenne 5 jours"
  }
};
}

```

# Indicateurs techniques

Moyennes mobiles, bandes de Bollinger, VWAP, MACD, RSI, KDJ, ATR et Heikin-Ashi : déclarés en une ligne sur un TradingChart, ou calculés par des fonctions pures sur des tableaux simples et des colonnes Float64Array.

Package: minerva-design@1.23.0

Renderer: angular

Locale: fr

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

#### Indicateurs déclaratifs

L'option indicators liste les indicateurs dans l'ordre : moyennes mobiles, canaux de Bollinger, Keltner et Donchian, VWAP, SAR parabolique, Ichimoku et SuperTrend se tracent sur le cours ; volume (sauf overlay), MACD, RSI, KDJ, ATR, OBV, CCI, RSI stochastique, DMI, Williams %R et MFI ont chacun un panneau en dessous. Chaque légende donne les valeurs au réticule, et un clic sur le nom d'un indicateur le masque.

Un indicateur est identifié par son type et ses paramètres ("ma:7", "macd:12:26:9") sauf s'il fixe un id : indicatorToggle et setIndicatorVisible l'utilisent. Modifier la liste conserve les valeurs calculées des indicateurs inchangés.

#### Fonctions pures

Les mêmes calculs sont exportés par minerva-design/charts/core : ils prennent des tableaux simples ou typés et renvoient des colonnes Float64Array, NaN tant que la fenêtre n'est pas pleine. Utilisez-les pour des signaux, des filtres, des back-tests ou un serveur, avec exactement les valeurs que dessine le graphique.

#### Conventions

MA est la moyenne simple, WMA donne le plus de poids à la bougie la plus récente, EMA utilise 2 / (période + 1) et part de la moyenne simple de la première fenêtre, comme TradingView.

RSI et ATR utilisent le lissage de Wilder (1 / période) ; les bandes de Bollinger utilisent l'écart type de la population.

KDJ démarre K et D à 50 et les lisse sur 3 bougies par défaut ; J = 3K − 2D peut sortir de l'intervalle 0-100.

Le VWAP repart chaque jour (ou semaine, mois, jamais) dans le fuseau de timeZone ou utcOffset.

À chaque mise à jour, le graphique ne recalcule que les valeurs de la dernière bougie : un flux coûte autant avec cent bougies qu'avec un million.

En vue large, les indicateurs restent calculés sur chaque barre et sont tracés avec la valeur la plus basse et la plus haute de chaque colonne de pixels : les pics restent visibles sur un million de barres.

Ichimoku trace les nuages displacement − 1 barres en avant (dans l'espace après la dernière barre) et la ligne retardée autant de barres en arrière ; la fonction pure ichimoku les renvoie sans décalage.

Période

{{period}} bougies

MSFT

Graphique quotidien avec moyennes mobiles simple, exponentielle et pondérée

Largeur des bandes

{{value}} σ

ETH/USDT

Graphique horaire avec les bandes de Bollinger

NVDA

Graphique en cinq minutes sur cinq séances avec le VWAP et le volume

BTC/USDT

Graphique quotidien avec le panneau MACD

Surachat / survente

70 / 30

80 / 20

SOL/USDT

Graphique en quatre heures avec un RSI 14 et un RSI 6

CATL 300750

Graphique quotidien avec le panneau KDJ

Stop achat · 2 ATR

Stop vente · 2 ATR

XAU/USD

Graphique horaire de l'or avec l'ATR et des stops de volatilité

Style du graphique

Heikin-Ashi

Chandeliers

ADA/USDT

Graphique en quatre heures en bougies Heikin-Ashi

Tendance haussière depuis {{count}} bougie

Tendance haussière depuis {{count}} bougies

Tendance baissière depuis {{count}} bougie

Tendance baissière depuis {{count}} bougies

Achat

Vente

Graphique horaire avec les signaux de croisement d'EMA et le RSI

{{trades}} transactions clôturées · {{wins}} gagnantes · {{result}} au total

XOM

Graphique quotidien dessiné avec createTradingChart

Pas encore assez de bougies pour la moyenne sur 50 jours

La clôture est {{value}} au-dessus de sa moyenne sur 50 jours

La clôture est {{value}} en dessous de sa moyenne sur 50 jours

Nuage

Nikkei 225

Graphique journalier du Nikkei 225 avec le nuage Ichimoku

Distance de la bande

{{value}} ATR

SAR parabolique

Graphique 4 heures de SOL/USDT avec le SuperTrend et ses retournements

Canal

Keltner

Donchian

Bollinger

EUR/USD

Graphique horaire d'EUR/USD avec un canal de prix

Oscillateurs

RSI stochastique

CCI

Williams %R

MFI

Graphique 4 heures de BTC/USDT avec des panneaux d'oscillateurs

ADX {{adx}} : tendance forte, {{direction}}

ADX {{adx}} : pas de tendance forte, {{direction}} pour l'instant

haussière (+DI au-dessus de −DI)

baissière (−DI au-dessus de +DI)

Graphique journalier de MSFT avec le panneau DMI

AAPL

Graphique journalier d'AAPL avec le volume et l'OBV

Retournements : {{count}}

Divergences

Toutes

Haussières

Baissières

Graphique SOL/USDT en 4 heures avec les divergences du RSI tracées

{{bullish}} divergences haussières et {{bearish}} baissières.

Dernière : {{kind}}, {{date}}.

EMA {{period}} · {{frame}}

Graphique horaire ETH/USDT avec l'EMA 20 des barres horaires, de 4 heures et journalières

{{time}} · clôture {{close}}

{{frame}} : au-dessus de {{value}}

{{frame}} : en dessous de {{value}}

{{frame}} : pas assez de barres

Toutes les unités à la hausse

Toutes les unités à la baisse

Les unités divergent

Filtre d'indicateurs

Valeur

Clôture

1 jour

RSI 14

Hist. MACD

ATR %

vs MM 50

Signal

Surachat

Survente

Tendance haussière

Tendance baissière

Neutre

{{name}} : {{signal}}, à {{distance}} de sa moyenne sur 50 jours.

Graphique journalier {{name}} avec la moyenne sur 50 jours, le RSI et le MACD

```tsx
<TradingChart
  bars={bars}
  indicators={[
    { type: "ma", period: 7 },          // over the price
    { type: "boll", period: 20, multiplier: 2 },
    { type: "volume", maPeriod: 20 },   // panes below, in this order
    { type: "macd", fast: 12, slow: 26, signal: 9 },
    { type: "rsi", period: 14, overbought: 70, oversold: 30 },
  ]}
/>
```

```tsx
import { ema, macd, rsi, resampleBars } from "minerva-design/charts/core";

const close = bars.map((bar) => bar.close);  // or a Float64Array column
const fast = ema(close, 9);                   // Float64Array, NaN while warming up
const { histogram } = macd(close, 12, 26, 9);
const hourly = resampleBars(minuteBars, "1H");
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Bandes de Bollinger

Une moyenne sur 20 bougies, des bandes à un nombre d'écarts types et un remplissage léger entre elles ; les bandes s'élargissent quand la volatilité monte.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnRangeAreaChart, injectMinerva } from 'minerva-design/angular';
import { bollinger, ema } from 'minerva-design/charts/core';

@Component({
  selector: 'app-example',
  imports: [MnRangeAreaChart],
  template: `
@let t = labels[language()];
<mn-range-area-chart
  [series]="[
    { name: t.band, opacity: 0.18, data: indicators.band },
    { name: t.close, type: 'line', data: indicators.close },
    { name: t.middle, type: 'line', lineWidth: 1, data: indicators.middle },
    { name: t.slow, type: 'line', lineWidth: 1, data: indicators.slow }
  ]"
  curve="linear"
  [xAxis]="{ type: 'time' }"
  crosshair
  [height]="320"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  indicators = (() => {
  const fraction = (value: number) => value - Math.floor(value);
  const round = (value: number) => Math.round(value * 100) / 100;
  let price = 100;
  const TIMES: number[] = [];
  const CLOSES = Array.from({ length: 200 }, (_, i) => {
    TIMES.push(Date.UTC(2025, 2, 3) + i * 86_400_000);
    price = round(price * (1 + (fraction(Math.sin(i * 12.9898) * 43758.5453) - 0.48) / 25));
    return price;
  });
  const bands = bollinger(CLOSES, 20, 2);
  const slow = ema(CLOSES, 50);
  const points = (values: ArrayLike<number>) =>
    TIMES.map((x, i) => ({ x, y: Number.isNaN(values[i]) ? null : round(values[i]) }));
  return {
    band: TIMES.map((x, i) =>
      Number.isNaN(bands.upper[i])
        ? { x, y: null }
        : { x, y0: round(bands.lower[i]), y: round(bands.upper[i]) },
    ),
    close: points(CLOSES),
    middle: points(bands.middle),
    slow: points(slow),
  };
})();
  labels = {
  "en": {
    "close": "Close",
    "band": "Bollinger (20, 2)",
    "middle": "SMA 20",
    "slow": "EMA 50"
  },
  "zh": {
    "close": "收盘价",
    "band": "布林带 (20, 2)",
    "middle": "SMA 20",
    "slow": "EMA 50"
  },
  "ja": {
    "close": "終値",
    "band": "ボリンジャーバンド (20, 2)",
    "middle": "SMA 20",
    "slow": "EMA 50"
  },
  "fr": {
    "close": "Clôture",
    "band": "Bollinger (20, 2)",
    "middle": "MMS 20",
    "slow": "MME 50"
  }
};
}

```

## Example: Indicator panes

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnTradingChart, injectMinerva } from 'minerva-design/angular';
import { macd } from 'minerva-design/charts/core';

@Component({
  selector: 'app-example',
  imports: [MnTradingChart],
  template: `
@let t = labels[language()];
<mn-trading-chart
  [bars]="bars"
  symbol="ACME"
  [indicators]="[
    { type: 'boll', period: 20, multiplier: 2 },
    { type: 'macd' },
    { type: 'rsi', period: 14 }
  ]"
  [height]="440"
/>
<output aria-live="polite">{{ t.macd }}: {{ last.macd }} / {{ last.signal }}</output>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  bars = (() => {
          const fraction = (value: number) => value - Math.floor(value);
          const round = (value: number) => Math.round(value * 100) / 100;
          let close = 100;
          return Array.from({ length: 240 }, (_, i) => {
            const open = close;
            close = round(open * (1 + (fraction(Math.sin(i * 12.9898) * 43758.5453) - 0.48) / 25));
            const spread = (open * fraction(Math.sin(i * 78.233) * 43758.5453)) / 60;
            return {
              time: Date.UTC(2025, 2, 3) + i * 86_400_000,
              open,
              high: round(Math.max(open, close) + spread),
              low: round(Math.min(open, close) - spread),
              close,
              volume: Math.round(1000 + fraction(Math.sin(i * 3.7) * 9999) * 4000),
            };
          });
        })();
  last = (() => {
  const result = macd(this.bars.map((bar) => bar.close));
  const end = this.bars.length - 1;
  return {
    macd: result.macd[end].toFixed(2),
    signal: result.signal[end].toFixed(2),
  };
})();
  labels = {
  "en": {
    "macd": "MACD (12, 26, 9)"
  },
  "zh": {
    "macd": "MACD 指标 (12, 26, 9)"
  },
  "ja": {
    "macd": "MACD (12, 26, 9)"
  },
  "fr": {
    "macd": "MACD (12, 26, 9)"
  }
};
}

```

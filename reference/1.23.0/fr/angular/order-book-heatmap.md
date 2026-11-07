# Carte de chaleur du carnet

Carte de chaleur de liquidité à la Bookmap : quantité au repos par temps et prix dessinée par le GPU, lignes du meilleur achat et de la meilleure vente, transactions en bulles proportionnelles au volume, profil du carnet actuel, zoom, déplacement et lecture au réticule. Les flux ajoutent une colonne par intervalle dans une fenêtre glissante.

Package: minerva-design@1.23.0

Renderer: angular

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "9a519eee781183dcbac39a62a86bec9e0bd877a9",
  "sourceDigest": "sha256:0d31b0bc3c28394756a1142132ddf7b2beac9f7ce2f5b2253e04712431d7c736",
  "referenceSourceDigest": "sha256:0a033a9f6bc21722c87a78202ae3fce0d891270ea8a01d043a5a748c0439d696"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

## Documentation

### Comment la lire

La heatmap est un enregistrement du carnet d'ordres : chaque colonne est un instantané du carnet à un moment, de gauche à droite, le présent au bord droit.

L'axe horizontal est le temps (le plus récent à droite), l'axe vertical le prix. Survolez un point : le réticule lit la quantité en attente à ce prix et à cet instant.

La couleur d'une cellule est la quantité en attente à ce prix à cet instant : sombre signifie presque rien, plus clair (bleu → cyan → jaune → blanc) signifie davantage. La légende en haut à gauche donne la plage de quantités et l'unité des couleurs.

Les lignes horizontales claires sont de gros ordres qui restent dans le carnet (murs). Là où une ligne s'arrête, l'ordre a été retiré ou exécuté : si la ligne de prix atteint la fin du mur, il a été exécuté.

Les lignes rouge et verte qui suivent le prix sont la meilleure offre et la meilleure demande, l'écart entre elles est le spread. Sur l'axe des prix, les étiquettes pleines rouge et verte sont la meilleure offre et la meilleure demande actuelles, l'étiquette au contour est la dernière transaction.

Les points sont les transactions : vert pour les achats agressifs (qui prennent les offres), rouge pour les ventes agressives (qui frappent les demandes), leur aire croît avec le volume de la colonne, les grosses bulles sont donc de grosses transactions. colorConvention="red-up" inverse les deux couleurs.

Les barres à droite sont le carnet actuel : les offres en rouge au-dessus, les demandes en vert au-dessous, plus la barre est longue plus la quantité est grande ; l'échelle en dessous est la quantité.

#### Ce qu'il faut repérer

Support et résistance : le prix touche plusieurs fois une ligne claire et repart, le gros ordre l'absorbe.

Ordres retirés (spoofing) : une ligne claire disparaît quand le prix approche sans aucune bulle de transaction, l'ordre a été annulé, pas exécuté.

Balayages : une rafale de grosses bulles traverse plusieurs prix, la ligne de prix saute et la liquidité sur son passage s'assombrit.

Liquidité faible : une grande zone sombre près du prix signifie peu d'ordres en attente, le prix peut la traverser rapidement.

Bougies : fournissez de vraies données OHLC sur les mêmes axes de temps en millisecondes et de prix. Les périodes absentes restent vides ; aucun cours exécuté n’est inventé à partir du carnet. La ligne du dernier prix utilise la dernière transaction fournie ou une clôture de bougie plus récente.

Navigation historique : zoom et déplacement arrêtent le suivi. Sélectionnez une plage conservée dans le navigateur ; réinitialiser revient au marché courant. getView / setView et viewChange partagent le même modèle de vue.

Filtre d’intensité : intensityRange sélectionne un intervalle 0–1 après la correspondance des couleurs. Les quantités brutes, les valeurs des infobulles et l’échelle automatique restent identiques.

Sens des données

Ce composant affiche la liquidité en attente et les bougies exécutées fournies. Les exemples utilisent un moteur de simulation reproductible. Une carte de liquidations exige des données de liquidation distinctes ; la taille des ordres ne constitue pas une taille liquidée.

Carte de liquidité BTC/USDT

Moteur : {{value}}

WebGPU

WebGL 2

WebGL

Canvas 2D

Suit le marché

Vue libre (zoomée ou déplacée)

Suivre le marché

Échelle de couleurs

Logarithmique

Racine carrée

Linéaire

Contraste

×{{value}}

Convention de couleurs

Rouge hausse, vert baisse

Vert hausse, rouge baisse

Colonne survolée : {{buys}} BTC achetés, {{sells}} BTC vendus

Survolez une colonne pour lire son volume échangé.

Hauteur de ligne

Étendue de prix

{{value}} USDT

Auto

Ajuster au carnet

{{time}} · {{price}} · {{size}} BTC {{side}} · {{buys}} BTC achetés, {{sells}} BTC vendus

{{low}} – {{high}}

côté achat

côté vente

dans l'écart

Survolez une cellule pour l'inspecter.

Fenêtre de temps

Flux en direct

Effacer l'historique

En pause à {{time}}.

Reprise à {{time}}.

Historique effacé à {{time}}.

{{window}} affichées sur {{history}} conservées.

BTC/USDT

Dernier {{value}}

Écart {{value}}

{{value}} transactions sur le ruban

Carnet d'ordres BTC/USDT

Transactions BTC/USDT

Perpétuel BTC-USD

1 contrat = {{value}} BTC

Financement {{rate}}

Financement {{rate}} à {{time}}, dans {{countdown}}

contrats

En carnet

Achats preneurs

Ventes preneuses

Carte de chaleur de liquidité du perpétuel BTC-USD

{{price}} : {{contracts}} contrats en carnet (≈ {{notional}})

Survolez la carte pour lire les contrats en carnet et leur valeur.

MARCHÉ SIMULÉ

Bougies d’exécution

Chaque bougie de 2 secondes agrège les exécutions du moteur de simulation déterministe. Les périodes sans exécution restent vides ; les ordres au repos ne créent pas de bougies.

Plage d’intensité visible

Filtre l’intensité normalisée des couleurs de la liquidité au repos. Seule la visibilité change, pas les quantités ni le volume exécuté.

Historique des exécutions conservé

Déplacez les poignées pour consulter l’historique conservé. Suivre le marché rétablit la dernière heure et le centrage automatique du prix.

TERMINAL DE LIQUIDITÉ

Dernière exécution

Profondeur acheteuse

Profondeur vendeuse

Déséquilibre du carnet

Plus grand mur acheteur

Plus grand mur vendeur

Palette

Océan

Braise

Réinitialiser la vue

CARNET ACTUEL

Simulation déterministe, sans flux de bourse externe. Les six indicateurs, les bougies et le carnet partagent le même moteur. Les indicateurs sont actualisés chaque seconde, indépendamment du flux du carnet.

Liquidité simulée avec bougies d’exécution

Liquidité simulée avec filtre d’intensité

Historique navigable de liquidité simulée

Terminal de liquidité BTC USDT simulé

Carnet BTC USDT simulé actuel

## OrderBookHeatmap

Support: beta

Native Angular: MnOrderBookHeatmap. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnOrderBookHeatmap"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "bars",
    "typeText": "TradingBarsInput | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/trading.ts"
  },
  {
    "name": "trades",
    "typeText": "readonly MarketTrade[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/trading.ts"
  },
  {
    "name": "book",
    "typeText": "OrderBookSnapshot | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/trading.ts"
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/trading.ts"
  },
  {
    "name": "options",
    "typeText": "O | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/trading.ts"
  }
]
```

### events

```json
[
  {
    "name": "hover",
    "typeText": "OrderBookHeatmapHoverEvent | null",
    "required": false,
    "source": "packages/angular/src/components/charts/trading.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "OrderBookHeatmapHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "rendererChange",
    "typeText": "ChartRendererKind",
    "required": false,
    "source": "packages/angular/src/components/charts/trading.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ChartRendererKind",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "followChange",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/charts/trading.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "boolean",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "viewChange",
    "typeText": "OrderBookHeatmapViewData",
    "required": false,
    "source": "packages/angular/src/components/charts/trading.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "OrderBookHeatmapViewData",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Bougies et navigation historique

Les exécutions forment des bougies OHLC sur la liquidité au repos. Sélectionnez l’historique conservé, puis reprenez le suivi du marché.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component, viewChild, effect, untracked } from '@angular/core';
import { MnOrderBookHeatmap, MnButton, MnSlider, injectMinerva } from 'minerva-design/angular';
import { MarketTrade, OrderBookSnapshot, TradingBar } from 'minerva-design/charts/core';

@Component({
  selector: 'app-example',
  imports: [MnOrderBookHeatmap, MnButton, MnSlider],
  template: `
@let t = labels[language()];
<div style="display:grid;gap:12px;width:100%">
<p>{{t.source}}</p>
<div style="display:flex;gap:8px;flex-wrap:wrap">
<button mnButton size="small" variant="outline" (click)="show(10)">{{t.latest}}</button>
<button mnButton size="small" variant="outline" (click)="show(30)">{{t.full}}</button>
<button mnButton size="small" (click)="heatmap.resetView()">{{t.follow}}</button>
</div>
<mn-slider [attr.aria-label]="t.minimum" [value]="minimum" (valueChange)="filter($event)" [min]="0" [max]="90" [step]="5" showValue style="max-width:320px"/>
<mn-order-book-heatmap #heatmap [height]="400" [options]="{ interval:250, window:30000, history:60000, maxBars:30, maxColumns:240, intensityRange:[minimum / 100, 1] }" (viewChange)="viewState = $event"/>
<output aria-live="polite">{{viewState?.view?.follow ? t.following : t.manual}} · {{t.minimum}} {{minimum}}% · {{viewState ? ((viewState.view.time[1] - viewState.view.time[0]) / 1000).toFixed(0) : 30}} {{t.visible}}</output>
</div>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  minimum = 0;
  labels = {
  "en": {
    "source": "Simulated resting book · 30 supplied OHLC candles aggregated from simulated executions.",
    "latest": "Latest 10s",
    "full": "Full 30s",
    "follow": "Follow market",
    "following": "Following market",
    "manual": "Manual view",
    "minimum": "Minimum liquidity intensity (%)",
    "visible": "s visible"
  },
  "zh": {
    "source": "模拟挂单簿 · 显式传入 30 根由模拟成交聚合的 OHLC K 线。",
    "latest": "最近 10 秒",
    "full": "完整 30 秒",
    "follow": "跟随行情",
    "following": "正在跟随行情",
    "manual": "手动视图",
    "minimum": "最低流动性强度（%）",
    "visible": "秒可见"
  },
  "ja": {
    "source": "模擬指値注文板 · 模擬約定から集計した OHLC ローソク足 30 本を明示的に入力。",
    "latest": "直近 10 秒",
    "full": "全 30 秒",
    "follow": "相場に追従",
    "following": "相場に追従中",
    "manual": "手動表示",
    "minimum": "流動性強度の下限（%）",
    "visible": "秒を表示"
  },
  "fr": {
    "source": "Carnet d’ordres simulé · 30 bougies OHLC fournies, agrégées à partir d’exécutions simulées.",
    "latest": "10 dernières s",
    "full": "30 s complètes",
    "follow": "Suivre le marché",
    "following": "Suivi du marché",
    "manual": "Vue manuelle",
    "minimum": "Intensité minimale de liquidité (%)",
    "visible": "s visibles"
  }
};
  viewState = null as import("minerva-design/charts/core").OrderBookHeatmapViewData | null;
  filter = (value: number | [number, number]) => { this.minimum = typeof value === 'number' ? value : value[0]; };
  chart = viewChild<import('minerva-design/angular').MnOrderBookHeatmap>('heatmap');
  history = (() => {
  const end = Math.floor(Date.now() / 1000) * 1000;
  const start = end - 30_000;
  const trades: MarketTrade[] = [];
  const books: OrderBookSnapshot[] = [];
  const bars: TradingBar[] = [];
  const round = (value: number) => Math.round(value * 100) / 100;
  for (let i = 0; i < 120; i += 1) {
    const time = start + i * 250;
    const price = round(100 + Math.sin(i / 11) * 0.7 + Math.sin(i * 1.7) * 0.12);
    const size = 1 + (i * 7 % 9);
    trades.push({ time, price, size, side: i % 3 ? "buy" : "sell" });
    const side = (sign: number) => Array.from({ length: 36 }, (_, level) =>
      [round(price + sign * (level + 1) * 0.05), 2 + ((level * 13 + i * 7) % 19) + (level % 11 === 0 ? 65 : 0)] as [number, number]);
    books.push({ time, bids: side(-1), asks: side(1) });
    const bucket = Math.floor(i / 4);
    if (i % 4 === 0) bars.push({ time: start + bucket * 1000, open: price, high: price, low: price, close: price, volume: size });
    else {
      const bar = bars[bucket];
      bar.high = Math.max(bar.high, price); bar.low = Math.min(bar.low, price);
      bar.close = price; bar.volume = (bar.volume ?? 0) + size;
    }
  }
  return { start, end, trades, books, bars };
})();
  show = (seconds: number) => this.chart()?.setView({ time: [this.history.end - seconds * 1000, this.history.end], price: [98, 102] });
  initialize = effect(() => {
  const heatmap = this.chart();
  if (!heatmap?.instance()) return;
  // instance is a public readiness signal; the engine is created after render.
  untracked(() => {
    for (const book of this.history.books) heatmap.setBook(book);
    heatmap.addTrades(this.history.trades);
    heatmap.setBars(this.history.bars);
    this.show(30);
  });
});
}

```

## Example: Live liquidity heatmap

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { MnOrderBookHeatmap } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnOrderBookHeatmap],
  template: `
<mn-order-book-heatmap [book]="feed().book" [trades]="feed().trades" />
  `,
})
export class Example {
  feed = (() => {
  const fraction = (value: number) => value - Math.floor(value);
  const round = (value: number) => Math.round(value * 100) / 100;
  // a side of the book around a moving mid price, generated deterministically
  const side = (mid: number, sign: number, seed: number) => ({
    price: Array.from({ length: 60 }, (_, i) => round(mid + sign * 0.05 * (i + 1))),
    size: Array.from({ length: 60 }, (_, i) =>
      Math.round(2 + fraction(Math.sin((i + seed) * 12.9898) * 43758.5453) * 18 + (i % 13 === 12 ? 80 : 0)),
    ),
  });
  // the book and a trade at a tick (a new tick every 200 ms)
  const snapshot = (tick: number) => {
    const mid = round(100 + Math.sin(tick / 40) * 0.6);
    return {
      book: { bids: side(mid, -1, tick % 7), asks: side(mid, 1, (tick + 3) % 7), time: Date.now() },
      trade: {
        time: Date.now(),
        price: mid,
        size: Math.round(1 + fraction(Math.sin(tick * 9.1) * 43758.5453) * 12),
        side: tick % 3 ? ("buy" as const) : ("sell" as const),
      },
    };
  };
  const first = snapshot(0);
  const feed = signal({ book: first.book, trades: [first.trade] });
  let tick = 0;
  const timer = setInterval(() => {
    tick += 1;
    const { book, trade } = snapshot(tick);
    feed.update(({ trades }) => ({ book, trades: [...trades, trade] }));
  }, 200);
  inject(DestroyRef).onDestroy(() => clearInterval(timer));
  return feed;
})();
}

```

## Example: Rouge à la hausse

colorConvention="red-up" : bulles d'achat et ligne du meilleur achat en rouge, ventes et ligne de la meilleure vente en vert.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { MnOrderBookHeatmap } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnOrderBookHeatmap],
  template: `
<mn-order-book-heatmap [book]="feed().book" [trades]="feed().trades" [options]="{ colorConvention: 'red-up', colorScale: 'sqrt', profile: false }" />
  `,
})
export class Example {
  feed = (() => {
  const fraction = (value: number) => value - Math.floor(value);
  const round = (value: number) => Math.round(value * 100) / 100;
  // a side of the book around a moving mid price, generated deterministically
  const side = (mid: number, sign: number, seed: number) => ({
    price: Array.from({ length: 60 }, (_, i) => round(mid + sign * 0.05 * (i + 1))),
    size: Array.from({ length: 60 }, (_, i) =>
      Math.round(2 + fraction(Math.sin((i + seed) * 12.9898) * 43758.5453) * 18 + (i % 13 === 12 ? 80 : 0)),
    ),
  });
  // the book and a trade at a tick (a new tick every 200 ms)
  const snapshot = (tick: number) => {
    const mid = round(100 + Math.sin(tick / 40) * 0.6);
    return {
      book: { bids: side(mid, -1, tick % 7), asks: side(mid, 1, (tick + 3) % 7), time: Date.now() },
      trade: {
        time: Date.now(),
        price: mid,
        size: Math.round(1 + fraction(Math.sin(tick * 9.1) * 43758.5453) * 12),
        side: tick % 3 ? ("buy" as const) : ("sell" as const),
      },
    };
  };
  const first = snapshot(0);
  const feed = signal({ book: first.book, trades: [first.trade] });
  let tick = 0;
  const timer = setInterval(() => {
    tick += 1;
    const { book, trade } = snapshot(tick);
    feed.update(({ trades }) => ({ book, trades: [...trades, trade] }));
  }, 200);
  inject(DestroyRef).onDestroy(() => clearInterval(timer));
  return feed;
})();
}

```

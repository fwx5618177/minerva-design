# Carte de chaleur du carnet

Carte de chaleur de liquidité à la Bookmap : quantité au repos par temps et prix dessinée par le GPU, lignes du meilleur achat et de la meilleure vente, transactions en bulles proportionnelles au volume, profil du carnet actuel, zoom, déplacement et lecture au réticule. Les flux ajoutent une colonne par intervalle dans une fenêtre glissante.

Package: minerva-design@1.20.5

Renderer: angular

Locale: fr

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
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

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

# Graphique de profondeur

Profondeur cumulée d'un carnet d'ordres : aires en escalier des achats et ventes autour du prix médian, lecture au survol symétrique (quantité, coût, prix moyen), zoom autour du médian et transitions fluides à des centaines de deltas par seconde.

Package: minerva-design@1.22.0

Renderer: angular

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

Profondeur du carnet BTC/USDT

Flux en direct

Plage visible

Ajustée

±{{value}}

Cumul

Quantité (BTC)

Montant (USDT)

Courbe

Escalier

Linéaire

Ctrl/⌘ + molette ou pincement pour zoomer autour du médian, double clic pour réinitialiser.

Zoom : {{value}}

Mon achat

Ma vente

Liquidation

Convention de couleurs

Rouge hausse, vert baisse

Vert hausse, rouge baisse

Acheter {{amount}} BTC ({{total}}) balaie les ventes jusqu'à {{price}}, {{slippage}} au-dessus du médian : prix moyen {{average}}.

Vendre {{amount}} BTC ({{total}}) balaie les achats jusqu'à {{price}}, {{slippage}} sous le médian : prix moyen {{average}}.

Survolez les courbes pour chiffrer un ordre au marché.

Sens

Achat au marché

Vente au marché

Taille de l'ordre

{{value}} BTC

Prix moyen

Dernier prix

{{size}} BTC s'exécutent sur {{levels}} niveaux : moyenne {{average}}, dernier prix {{worst}}, {{cost}} au total, {{slippage}} pb du mid.

Seulement {{filled}} BTC sur {{size}} reposent de ce côté : l'ordre viderait les {{levels}} niveaux, jusqu'à {{worst}}.

Bande mesurée

À {{band}} : {{bids}} BTC à l'achat, {{asks}} BTC à la vente, déséquilibre {{imbalance}} · spread {{spread}} ({{spreadBp}} pb)

En attente de la première mesure…

Cumuler les dollars (prix × titres)

Montant (USD)

Titres

Profondeur du carnet de l'action ACME

Consolidé

Plateforme {{name}}

Plateforme

Meilleur bid

Meilleur ask

BTC à ±0,1 %

{{value}} ({{share}})

Profondeur BTC/USDT, {{name}}

Meilleurs prix et liquidité par plateforme

## DepthChart

Support: beta

Native Angular: MnDepthChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnDepthChart"
  ],
  "kind": "named"
}
```

### props

```json
[
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
    "typeText": "DepthChartHoverEvent | null",
    "required": false,
    "source": "packages/angular/src/components/charts/trading.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "DepthChartHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "depthClick",
    "typeText": "DepthChartHoverEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/trading.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "DepthChartHoverEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "rangeChange",
    "typeText": "number",
    "required": false,
    "source": "packages/angular/src/components/charts/trading.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "number",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Cumulative depth

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnDepthChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnDepthChart],
  template: `
@let t = labels[language()];
<mn-depth-chart [book]="book" (hover)="hovered = $event ? t.price + ' ' + $event.price + ' · ' + t.total + ' ' + $event.amount : ''" />
<output aria-live="polite">{{ hovered || t.hint }}</output>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  hovered = "";
  book = (() => {
  const fraction = (value: number) => value - Math.floor(value);
  const round = (value: number) => Math.round(value * 100) / 100;
  // a side of a book around 100, generated deterministically: columns of
  // prices and sizes, a large order every 9 levels
  const side = (sign: number, seed: number) => ({
    price: Array.from({ length: 40 }, (_, i) => round(100 + sign * 0.05 * (i + 1))),
    size: Array.from({ length: 40 }, (_, i) =>
      Math.round(2 + fraction(Math.sin((i + seed) * 12.9898) * 43758.5453) * 18 + (i % 9 === 8 ? 60 : 0)),
    ),
  });
  return { bids: side(-1, 1), asks: side(1, 2) };
})();
  labels = {
  "en": {
    "price": "Price",
    "total": "Total",
    "hint": "Hover the curves"
  },
  "zh": {
    "price": "价格",
    "total": "累计",
    "hint": "将指针悬停在曲线上"
  },
  "ja": {
    "price": "価格",
    "total": "累計",
    "hint": "曲線にカーソルを合わせます"
  },
  "fr": {
    "price": "Prix",
    "total": "Cumul",
    "hint": "Survolez les courbes"
  }
};
}

```

## Example: Flux en direct

Une centaine de deltas par seconde d'un moteur d'appariement simulé passent par la poignée ref (applyDeltas : prix → quantité, 0 supprime le niveau). React ne refait pas de rendu : le graphique les regroupe en une image et adoucit courbes et échelle ; il ne dessine plus hors de l'écran.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { MnDepthChart } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnDepthChart],
  template: `
<mn-depth-chart [book]="book()" [options]="{ range: 0.012 }" [height]="280" />
  `,
})
export class Example {
  book = (() => {
  const fraction = (value: number) => value - Math.floor(value);
  const round = (value: number) => Math.round(value * 100) / 100;
  // a side of a book around 100, generated deterministically: columns of
  // prices and sizes, a large order every 9 levels
  const side = (sign: number, seed: number) => ({
    price: Array.from({ length: 40 }, (_, i) => round(100 + sign * 0.05 * (i + 1))),
    size: Array.from({ length: 40 }, (_, i) =>
      Math.round(2 + fraction(Math.sin((i + seed) * 12.9898) * 43758.5453) * 18 + (i % 9 === 8 ? 60 : 0)),
    ),
  });
  const book = signal({ bids: side(-1, 3), asks: side(1, 4) });
  let tick = 0;
  const timer = setInterval(() => {
    tick += 1;
    book.set({ bids: side(-1, 3 + tick), asks: side(1, 4 + tick) });
  }, 1000);
  inject(DestroyRef).onDestroy(() => clearInterval(timer));
  return book;
})();
}

```

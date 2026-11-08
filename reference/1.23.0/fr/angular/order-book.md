# Carnet d'ordres

Une échelle de prix dessinée sur canvas : ventes au-dessus de la ligne d'écart, achats en dessous, avec barres de profondeur, regroupement des prix, clignotement des niveaux modifiés, mise en avant des gros ordres et résumé cumulé au survol. Des centaines de mises à jour par seconde ne coûtent qu'un dessin par image.

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

Carnet d'ordres BTC/USDT

### Carnet d'ordres

BTC/USDT

Prix (USDT)

Quantité (BTC)

Cumul (BTC)

Fréquence

{{value}} / s

{{updates}} messages/s · {{levels}} niveaux modifiés/s

Pas de prix

Barres de profondeur

Cumulées

Par niveau

Seuil des gros ordres

≥ {{value}} BTC

Achat {{price}} : {{size}} BTC, {{sum}} BTC cumulés jusqu'ici

Vente {{price}} : {{size}} BTC, {{sum}} BTC cumulés jusqu'ici

Cliquez sur un niveau pour choisir son prix.

Côtés

Les deux

Achats

Ventes

Convention de couleurs

Rouge hausse, vert baisse

Vert hausse, rouge baisse

{{value}} depuis l'ouverture

Prix limite : {{price}}

Limite

Profondeur

Profondeur BTC/USDT

Transactions

Transactions BTC/USDT

Marché

Crypto · BTC/USDT

Prix (USDT)

Taille (BTC)

Total (BTC)

Carnet d'ordres BTC/USDT

Action · AAPL

Prix (USD)

Actions

Total

Carnet d'ordres AAPL

Change · EUR/USD

Cours

Taille (EUR)

Total (EUR)

Carnet d'ordres EUR/USD

Contrats à terme · ES

Prix (pts)

Contrats

Total

Carnet d'ordres du contrat E-mini S&P 500

{{value}} pips

{{value}} ¢

{{value}} ticks

{{value}} USDT

Pas de cotation {{tick}} · écart {{spread}} · mis en évidence dès {{large}}

Murs

Nouveau

Retiré

Exécuté

Murs ≥ {{size}} BTC : {{resting}} en carnet, {{filled}} exécutés, {{pulled}} retirés ({{ratio}} retirés)

Recherche de murs dans le carnet…

Mur acheteur {{price}} : {{size}} BTC

Mur vendeur {{price}} : {{size}} BTC

après {{value}}

Ordre à cours limité

Sens

Acheter

Vendre

Prix limite (USDT)

Quantité (BTC)

Saisissez un prix et une quantité, ou cliquez sur un niveau.

{{filled}} BTC exécutés aussitôt, prix moyen {{average}}.

{{filled}} BTC exécutés aussitôt (prix moyen {{average}}), {{rest}} BTC en attente à {{price}}.

En attente à {{price}} derrière {{ahead}} BTC.

{{side}}

Ordre placé : {{side}} {{size}} BTC à {{price}}.

Ordre à {{price}} annulé.

{{side}} {{size}} @ {{price}}

Aucun ordre ouvert.

Annuler l'ordre

## OrderBook

Support: beta

Native Angular: MnOrderBook. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnOrderBook"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "lastPrice",
    "typeText": "number | null | undefined",
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
    "typeText": "OrderBookLevelEvent | null",
    "required": false,
    "source": "packages/angular/src/components/charts/trading.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "OrderBookLevelEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "levelClick",
    "typeText": "OrderBookLevelEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/trading.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "OrderBookLevelEvent",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Order book ladder

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnOrderBook, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnOrderBook],
  template: `
@let t = labels[language()];
<mn-order-book
  [book]="book"
  [lastPrice]="100.02"
  [options]="{ largeOrderThreshold: 50 }"
  [height]="380"
  (levelClick)="clicked = t.price + ' ' + $event.price + ' · ' + t.size + ' ' + $event.size"
/>
<output aria-live="polite">{{ clicked || t.hint }}</output>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  clicked = "";
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
    "size": "Size",
    "hint": "Click a row"
  },
  "zh": {
    "price": "价格",
    "size": "数量",
    "hint": "点击一行"
  },
  "ja": {
    "price": "価格",
    "size": "数量",
    "hint": "行をクリックします"
  },
  "fr": {
    "price": "Prix",
    "size": "Quantité",
    "hint": "Cliquez sur une ligne"
  }
};
}

```

## Example: Flux haute fréquence

Un moteur d'appariement simulé envoie de 10 à 200 messages par seconde par la poignée ref : applyDeltas pour le carnet, setLastPrice pour les transactions. Les niveaux modifiés clignotent (couleur du côté s'ils augmentent, gris s'ils baissent) ; chaque message ne coûte que quelques écritures de tableau, l'échelle se dessine une fois par image et s'arrête hors écran.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { MnOrderBook } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnOrderBook],
  template: `
<mn-order-book
  [book]="feed().book"
  [lastPrice]="feed().last"
  [options]="{ grouping: 0.1 }"
  [height]="380"
/>
  `,
})
export class Example {
  feed = (() => {
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
  const feed = signal({ book: { bids: side(-1, 3), asks: side(1, 4) }, last: 100 });
  let tick = 0;
  const timer = setInterval(() => {
    tick += 1;
    feed.set({
      book: { bids: side(-1, 3 + tick), asks: side(1, 4 + tick) },
      last: round(100 + Math.sin(tick / 5) / 20),
    });
  }, 1000);
  inject(DestroyRef).onDestroy(() => clearInterval(timer));
  return feed;
})();
}

```

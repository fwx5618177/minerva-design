# Graphique de trading

Le graphique d'un terminal de trading professionnel : chandeliers sur un axe du temps sans trous, panneaux d'indicateurs, outils de dessin, lignes d'ordres et flux en temps réel, dessinés par le GPU et fluides avec un million de bougies.

Package: minerva-design@1.19.3

Renderer: angular

Locale: fr

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

#### Présentation

TradingChart reçoit des bougies OHLCV (des objets, ou des colonnes de tableaux typés pour les très longs historiques) et les dessine avec les moteurs GPU du moteur de graphiques ; axes, étiquettes, dessins et réticule sont tracés sur une couche Canvas2D.

L'axe du temps est un index de bougies : week-ends, nuits et jours fériés ne laissent aucun trou, et les étiquettes suivent l'unité de temps (nouveaux jours et mois en gras).

Moyennes mobiles, canaux de Bollinger, Keltner et Donchian, VWAP, SAR parabolique, Ichimoku et SuperTrend se superposent au cours ; volume, MACD, RSI, KDJ, ATR, OBV, CCI, RSI stochastique, DMI, Williams %R et MFI ont chacun leur panneau, tous avec le même zoom et le même réticule. Faites glisser un séparateur pour redimensionner un panneau.

Ligne du dernier cours avec le compte à rebours de la clôture, plus haut / plus bas visibles, marqueurs d'achat / vente, profil de volume de la plage visible (point de contrôle et zone de valeur), et lignes d'ordre, de position, d'objectif, de stop et d'alerte que l'on peut déplacer, annuler ou créer depuis l'axe des prix.

Lignes de tendance, demi-droites, flèches, lignes horizontales et verticales, canaux parallèles, fourchettes d'Andrews, rectangles, retracements de Fibonacci, notes de texte, outils de position acheteuse / vendeuse et outil de mesure, sur le panneau des prix ou sur un panneau d'indicateur. Une barre d'outils flottante change le style du dessin sélectionné ; Ctrl / ⌘ + Z annule. Les dessins sont des données simples, enregistrées et restaurées avec drawings et onDrawingsChange.

#### Temps réel

Appelez update(bar) sur la ref à chaque transaction : une bougie à l'heure de la dernière la remplace, une plus récente s'ajoute. Tant que la dernière bougie est visible, le graphique la suit ; si le lecteur remonte l'historique, la vue reste en place et un bouton ramène à la dernière bougie.

Une mise à jour ne recalcule les indicateurs que pour la dernière bougie, n'envoie au GPU que cette bougie et dessine à la prochaine image : cinquante mises à jour par seconde ne coûtent presque rien. En vue large, les bougies sont agrégées par colonne de pixels : un million de bougies se dessinent aussi vite que mille.

#### Commandes

Molette pour zoomer sous le pointeur (Maj ou balayage horizontal pour défiler), glisser pour se déplacer avec inertie.

Faites glisser l'axe des prix pour zoomer verticalement et l'axe du temps pour changer la largeur des bougies ; double-cliquez sur un axe pour le réinitialiser.

Une fois le graphique sélectionné : les flèches déplacent le réticule barre par barre (Maj : dix barres) et annoncent les prix, + / − zooment, Début / Fin vont à la première / dernière barre, Suppr efface le dessin sélectionné, Ctrl / ⌘ + Z annule et Ctrl / ⌘ + Maj + Z rétablit une modification des dessins, Échap annule.

Avec orderEntry : B / S arment un ordre d’achat / de vente au prix du réticule (ou au dernier prix), ↑ / ↓ le déplacent d’un pas (Maj : dix), Entrée le place et Échap l’abandonne. Le type suit le prix : un achat sous le dernier prix ou une vente au-dessus est un ordre limite, un achat au-dessus ou une vente en dessous un ordre stop ; Alt+B / Alt+S basculent entre limite et stop. O / Maj + O sélectionnent tour à tour les lignes déplaçables ou annulables pour les déplacer de la même façon ; Suppr annule l’ordre sélectionné. Chaque étape, type compris, est lue à voix haute et émet les mêmes événements que le pointeur (orderCreate avec son orderType, orderMove, orderCancel).

Sur écran tactile : glisser pour se déplacer, pincer pour zoomer.

#### Langues

Les textes écrits par le graphique (noms OHLC, titres des lignes d'ordre et d'alerte, compte à rebours, outil de mesure, noms accessibles) existent en anglais, chinois, japonais et français et suivent la langue de la page (), y compris quand elle change. Les volumes utilisent les unités de la langue (k, M, Md en français). Choisissez une autre langue avec locale et remplacez n'importe quel texte avec labels.

Par défaut, les couleurs ne suivent pas la langue : une page en chinois peut très bien afficher des actions américaines. Définissez colorConvention="redUp" pour les marchés où la hausse est en rouge, ou colorConvention="auto" pour la déduire de la locale : rouge en hausse pour la Chine continentale, Taïwan, le Japon et la Corée (zh-CN, zh-TW, ja-JP, ko-KR, ou zh / ja / ko sans région), vert ailleurs (Hong Kong compris).

#### Méthode de travail

Grilles de graphiques : syncCharts partage l'heure du réticule et la plage de temps visible entre les graphiques, même d'unités de temps différentes.

Relecture des barres : startReplay masque les barres après un point, puis replayStep et replayPlay les ramènent une à une, à la vitesse choisie, avec les indicateurs recalculés comme en direct.

Fuseaux horaires et séances : timeZone règle l'horloge de l'axe du temps, des séparateurs de séance et des périodes du VWAP (heure d'été comprise).

Images et plein écran : toDataURL et toBlob composent toutes les couches (barres, axes, dessins et légendes) en une image ; requestFullscreen affiche le graphique en plein écran.

Réglages du graphique

BTC/USDT

Style du graphique

1 min

5 min

15 min

1 h

4 h

1 J

1 S

Chandeliers

Chandeliers creux

Heikin-Ashi

Barres

Ligne

Aire

Ligne de base

MA

BOLL

VOL

MACD

RSI

KDJ

Ichimoku

SuperTrend

Profil de volume

Auto

%

Log

Graphique de trading BTC/USDT avec les panneaux volume, MACD et RSI

ETH/USDT

SOL/USDT

AAPL

EUR/USD

Contrat à terme NQ

Kweichow Moutai 600519

BTCUSDT perpétuel

Pause

Reprendre

En pause : le graphique garde la dernière bougie jusqu'à la reprise du flux.

{{rate}} mises à jour / s · dernier {{price}}

Graphique ETH/USDT en bougies d'une minute mis à jour en temps réel

{{trades}} transactions

Chaque transaction SOL/USDT en temps réel

Bougies quotidiennes d'AAPL

Outils de dessin

Curseur

Ligne de tendance

Demi-droite

Droite prolongée

Ligne horizontale

Ligne verticale

Rectangle

Retracement de Fibonacci

Mesure

Flèche

Canal parallèle

Fourchette d'Andrews

Note de texte

Position acheteuse

Position vendeuse

Rester en mode dessin

Inclure les tracés dans l'échelle

Tout effacer

Dessins : {{count}}

Graphique ETH/USDT en quatre heures avec des dessins

Achat

TP

SL

Achat limite

Vente limite

Alerte

Achat stop

Vente stop

A {{quantity}}

V {{quantity}}

Graphique horaire BTC/USDT avec une position, des ordres et des transactions

Position et ordres

{{name}} déplacé de {{from}} à {{to}}

Faites glisser une ligne pointillée du graphique pour déplacer l'ordre.

Échelle des prix

Pourcentage

Logarithmique

Linéaire

BTC, ETH et SOL sur un an, comparés en pourcentage

Graphique horaire EUR/USD qui charge les bougies plus anciennes à la demande

Chargement des bougies plus anciennes…

{{loaded}} bougies chargées sur {{total}} : faites défiler vers la gauche pour la suite

Tout afficher

Dernière

{{bars}} bougies · dessinées avec {{renderer}}

Un million de bougies d'une minute du contrat NQ

Graphique quotidien de Kweichow Moutai, hausses en rouge

Variation 24 h

Plus haut 24 h

Plus bas 24 h

Volume 24 h

Graphique BTCUSDT perpétuel en 15 minutes dans un terminal sombre

Annuler

Rétablir

Télécharger l'image

Plein écran

Capture

Capture du graphique journalier de NVDA

Composée par toDataURL : barres, axes, légendes et filigrane dans un seul PNG.

Graphique journalier de NVDA avec ses moyennes à 50 et 200 jours

NVDA

Profil de volume

Lignes

Côté

À droite

À gauche

Point de contrôle {{poc}} · zone de valeur {{low}} – {{high}} (70 % du volume)

Graphique 15 minutes de BTC/USDT avec le profil de volume des barres visibles

Synchroniser le réticule

Synchroniser la plage de temps

Graphique {{symbol}} {{timeframe}}

Commandes de relecture

Lancer la relecture

Nouveau départ

Lecture

Barre suivante

Vitesse

Quitter

Lancez la relecture, puis cliquez une barre pour y revenir.

Cliquez une barre : les suivantes sont masquées.

Barre {{index}} sur {{total}}

Graphique horaire d'ETH/USDT pour la relecture des barres

Achat limite placé à {{price}}

Vente limite placée à {{price}}

Ordre déplacé de {{from}} à {{to}}

Ordre à {{price}} annulé

Graphique 5 minutes du perpétuel BTCUSDT avec saisie d'ordres

Survolez le graphique et cliquez sur le + à droite pour placer un ordre limite (Alt pour un stop), ou focalisez le graphique et appuyez sur B / S ; faites glisser une ligne pour la déplacer, × l’annule.

Fuseau horaire

New York

Londres

Shanghai

Tokyo

UTC

Séparateurs de séance

Graphique 5 minutes d'AAPL sur dix séances avec le VWAP

Canal haussier : attendre un retour

Ordres ouverts

{{count}} lignes

{{count}} barres / s

Convention de couleurs

Hausse en rouge

Selon la langue

Hausse en vert

#### Clavier

B S

Préparer un achat / une vente

↑ ↓

Ajuster le prix (Maj : ×10)

Entrée

Placer ou déplacer l'ordre

Échap

Abandonner

O

Sélectionner l'ordre suivant

Suppr

Annuler l'ordre sélectionné

Alt+B Alt+S

Basculer entre limite et stop

Achat stop placé à {{price}}

Vente stop placée à {{price}}

Cliquez sur le graphique pour ajouter une alerte ; faites-la glisser pour la déplacer, × la supprime.

▲ Alerte

▼ Alerte

🔔

{{value}} alertes au plus : supprimez-en une d'abord.

Alerte posée à {{price}}.

Alerte déplacée à {{price}}.

Alerte à {{price}} supprimée.

{{active}} alertes actives, {{fired}} déclenchées.

{{time}} : le prix est monté à {{price}}.

{{time}} : le prix est descendu à {{price}}.

Graphique AAPL en une minute avec des alertes de prix

ES (E-mini S&P 500)

#{{id}}

×

Sens

Achat

Vente

Entrée

Sortie

Points

Résultat

{{price}} · {{time}}

Afficher

Afficher la transaction {{id}} sur le graphique

Résultat net

Taux de réussite

{{rate}} ({{wins}} sur {{total}})

Facteur de profit

Gain moyen

Perte moyenne

Graphique E-mini S&P 500 en 15 minutes avec les transactions du journal

Transactions clôturées

Choisissez une transaction dans le tableau pour l'afficher sur le graphique.

Transaction {{id}} : {{side}} {{contracts}} contrats, {{pnl}}.

{{value}} sur 24 h

O {{value}}

H {{value}}

B {{value}}

C {{value}}

Vol {{value}}

Unité de temps

Graphique SOL/USDT au format téléphone

## TradingChart

Support: beta

Native Angular: MnTradingChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnTradingChart"
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
    "name": "symbol",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/trading.ts"
  },
  {
    "name": "timeframe",
    "typeText": "TradingTimeframe | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/trading.ts"
  },
  {
    "name": "chartStyle",
    "typeText": "TradingChartStyle | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/trading.ts"
  },
  {
    "name": "indicators",
    "typeText": "readonly TradingIndicator[] | undefined",
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
    "typeText": "Partial<TradingChartOptions> | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/trading.ts"
  }
]
```

### events

```json
[
  {
    "name": "crosshairMove",
    "typeText": "TradingCrosshairEvent | null",
    "required": false,
    "source": "packages/angular/src/components/charts/trading.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "TradingCrosshairEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "paneClick",
    "typeText": "TradingClickEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/trading.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "TradingClickEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "visibleRangeChange",
    "typeText": "TradingVisibleRange",
    "required": false,
    "source": "packages/angular/src/components/charts/trading.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "TradingVisibleRange",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "orderMove",
    "typeText": "TradingOrderMoveEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/trading.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "TradingOrderMoveEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "orderCreate",
    "typeText": "TradingOrderCreateEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/trading.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "TradingOrderCreateEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "orderCancel",
    "typeText": "TradingOrderCancelEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/trading.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "TradingOrderCancelEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "drawingsChange",
    "typeText": "readonly TradingDrawing[]",
    "required": false,
    "source": "packages/angular/src/components/charts/trading.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "readonly TradingDrawing[]",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "drawingSelect",
    "typeText": "string | null",
    "required": false,
    "source": "packages/angular/src/components/charts/trading.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "string | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "drawingToolChange",
    "typeText": "TradingDrawingTool",
    "required": false,
    "source": "packages/angular/src/components/charts/trading.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "TradingDrawingTool",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "undoChange",
    "typeText": "TradingUndoState",
    "required": false,
    "source": "packages/angular/src/components/charts/trading.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "TradingUndoState",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "replayChange",
    "typeText": "TradingReplayState",
    "required": false,
    "source": "packages/angular/src/components/charts/trading.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "TradingReplayState",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "fullscreenChange",
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
    "name": "indicatorToggle",
    "typeText": "TradingIndicatorToggleEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/trading.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "TradingIndicatorToggleEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "historyRequest",
    "typeText": "TradingHistoryRequestEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/trading.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "TradingHistoryRequestEvent",
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
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Candles, moving averages and panes

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnTradingChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnTradingChart],
  template: `
@let t = labels[language()];
<mn-trading-chart
  [bars]="bars"
  symbol="ACME"
  timeframe="1D"
  [indicators]="[
    { type: 'ma', period: 20 },
    { type: 'ma', period: 50 },
    { type: 'volume' },
    { type: 'rsi', period: 14 }
  ]"
  [options]="{ watermark: t.watermark }"
/>
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
  labels = {
  "en": {
    "watermark": "ACME · 1D"
  },
  "zh": {
    "watermark": "ACME · 日线"
  },
  "ja": {
    "watermark": "ACME · 日足"
  },
  "fr": {
    "watermark": "ACME · 1 J"
  }
};
}

```

## Example: Flux en direct

Un WebSocket simulé envoie cinquante transactions par seconde ; chacune appelle update() sur la ref avec la bougie d'une minute en cours. Seule la dernière bougie est recalculée et envoyée au GPU. L'étiquette du dernier prix décompte jusqu'à la clôture ; remontez l'historique et le graphique reste en place jusqu'au clic sur la flèche.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { MnTradingChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnTradingChart],
  template: `
@let t = labels[language()];
<mn-trading-chart
  [bars]="bars()"
  symbol="ACME"
  timeframe="1m"
  [indicators]="[{ type: 'ema', period: 9 }, { type: 'volume' }]"
  [options]="{ countdown: true, watermark: t.watermark }"
  [height]="400"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  bars = (() => {
  const fraction = (value: number) => value - Math.floor(value);
  const round = (value: number) => Math.round(value * 100) / 100;
  let close = 100;
  const BARS = Array.from({ length: 120 }, (_, i) => {
    const open = close;
    close = round(open + (fraction(Math.sin(i * 12.9898) * 43758.5453) - 0.5) / 2);
    return {
      time: Date.UTC(2026, 9, 30, 9) + i * 60_000,
      open,
      high: round(Math.max(open, close) + 0.1),
      low: round(Math.min(open, close) - 0.1),
      close,
      volume: Math.round(200 + fraction(Math.sin(i * 3.7) * 9999) * 600),
    };
  });
  const bars = signal(BARS);
  let tick = 0;
  const timer = setInterval(() => {
    tick += 1;
    bars.update((list) => {
      const last = list[list.length - 1];
      const close = round(last.close + (fraction(Math.sin(tick * 7.13) * 43758.5453) - 0.5) / 4);
      return tick % 10 === 0
        ? [...list, { time: last.time + 60_000, open: last.close, high: Math.max(last.close, close), low: Math.min(last.close, close), close, volume: 40 }]
        : [...list.slice(0, -1), { ...last, high: Math.max(last.high, close), low: Math.min(last.low, close), close, volume: last.volume + 25 }];
    });
  }, 500);
  inject(DestroyRef).onDestroy(() => clearInterval(timer));
  return bars;
})();
  labels = {
  "en": {
    "watermark": "ACME · 1m · live"
  },
  "zh": {
    "watermark": "ACME · 1 分钟 · 实时"
  },
  "ja": {
    "watermark": "ACME · 1 分足 · ライブ"
  },
  "fr": {
    "watermark": "ACME · 1 min · direct"
  }
};
}

```

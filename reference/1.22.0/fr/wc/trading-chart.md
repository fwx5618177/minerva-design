# Graphique de trading

Le graphique d'un terminal de trading professionnel : chandeliers sur un axe du temps sans trous, panneaux d'indicateurs, outils de dessin, lignes d'ordres et flux en temps réel, dessinés par le GPU et fluides avec un million de bougies.

Package: minerva-design@1.22.0

Renderer: wc

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.0",
  "sourceCommit": "e2a31507ecfcdb5ffcd33b05b47404c7625bb883",
  "sourceDigest": "sha256:a33fb5e0b8f01ae452ce95d2b723ab0cd9905636d574c72fd12c1459f4c09d3a",
  "referenceSourceDigest": "sha256:2459da5f08881aec3d2ac2d940ce35e7a61d0e0e679c0c167d8b5fdf8330a456"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.0/types.json) or getType() from minerva-design/contracts.

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

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/trading-chart",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "attribute": "height",
    "required": false
  },
  {
    "name": "symbol",
    "typeText": "string | undefined",
    "attribute": "symbol",
    "required": false
  },
  {
    "name": "timeframe",
    "typeText": "TradingTimeframe | undefined",
    "attribute": "timeframe",
    "required": false
  },
  {
    "name": "chartStyle",
    "typeText": "TradingChartStyle",
    "attribute": "chart-style",
    "required": false
  },
  {
    "name": "bars",
    "typeText": "TradingBarsInput | undefined",
    "required": false
  },
  {
    "name": "indicators",
    "typeText": "readonly TradingIndicator[] | undefined",
    "required": false
  },
  {
    "name": "options",
    "typeText": "Partial<TradingChartOptions> | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "minerva-crosshair-move",
    "typeText": "CustomEvent",
    "description": "The crosshair moved; detail: { time, index, bar, price, pane, x, y }, `null` when it left the chart"
  },
  {
    "name": "minerva-click",
    "typeText": "CustomEvent",
    "description": "A pane was clicked; detail: { time, index, price, pane }"
  },
  {
    "name": "minerva-visible-range-change",
    "typeText": "CustomEvent",
    "description": "The visible bars changed; detail: { from, to, fromTime, toTime }"
  },
  {
    "name": "minerva-order-move",
    "typeText": "CustomEvent",
    "description": "A draggable price line was dropped; detail: { id, price, previousPrice, line }"
  },
  {
    "name": "minerva-order-create",
    "typeText": "CustomEvent",
    "description": "The \"+\" order entry button was clicked (option `orderEntry`); detail: { price, side }"
  },
  {
    "name": "minerva-order-cancel",
    "typeText": "CustomEvent",
    "description": "The close button of a `cancellable` price line was clicked; detail: { id, line }"
  },
  {
    "name": "minerva-drawings-change",
    "typeText": "CustomEvent",
    "description": "The user added, moved or deleted drawings; detail: { drawings }"
  },
  {
    "name": "minerva-drawing-select",
    "typeText": "CustomEvent",
    "description": "The selected drawing changed; detail: { id }"
  },
  {
    "name": "minerva-drawing-tool-change",
    "typeText": "CustomEvent",
    "description": "The drawing tool changed (back to `cursor` after a drawing); detail: { tool }"
  },
  {
    "name": "minerva-undo-change",
    "typeText": "CustomEvent",
    "description": "Undo / redo of the drawings became possible or impossible; detail: { canUndo, canRedo }"
  },
  {
    "name": "minerva-replay-change",
    "typeText": "CustomEvent",
    "description": "The bar replay started, stepped, played, paused or stopped; detail: { active, picking, playing, speed, index, total, time }"
  },
  {
    "name": "minerva-fullscreen-change",
    "typeText": "CustomEvent",
    "description": "The chart entered or left full screen; detail: { fullscreen }"
  },
  {
    "name": "minerva-indicator-toggle",
    "typeText": "CustomEvent",
    "description": "An indicator was shown or hidden from its legend; detail: { id, visible }"
  },
  {
    "name": "minerva-history-request",
    "typeText": "CustomEvent",
    "description": "The oldest bar came into view (load older bars with `prependBars`); detail: { firstTime, count }"
  },
  {
    "name": "minerva-renderer-change",
    "typeText": "CustomEvent",
    "description": "The backend is ready (or fell back after a GPU loss); detail: { renderer }"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Bougies, moyennes mobiles et panneaux

Bougies quotidiennes, deux moyennes mobiles, panneaux de volume et de RSI ; textes et dates dans la langue de la page.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/trading-chart/wc/candles.html

```html
<minerva-trading-chart
  id="candles"
  symbol="ACME"
  timeframe="1D"
></minerva-trading-chart>

```

### apps/docs/src/docs/pages/trading-chart/wc/candles.ts

```tsx
// <minerva-trading-chart>: candles on a gap-free time axis with moving
// averages over the price, volume and RSI panes below; the texts, numbers
// and dates follow the page language.
import type { MinervaTradingChart } from "minerva-design/web-components/trading-chart";

const TEXT = {
  en: { watermark: "ACME · 1D" },
  zh: { watermark: "ACME · 日线" },
  ja: { watermark: "ACME · 日足" },
  fr: { watermark: "ACME · 1 J" },
};

// 240 daily bars: a random walk, generated deterministically
const fraction = (value: number) => value - Math.floor(value);
const round = (value: number) => Math.round(value * 100) / 100;
let close = 100;
const BARS = Array.from({ length: 240 }, (_, i) => {
  const open = close;
  close = round(
    open * (1 + (fraction(Math.sin(i * 12.9898) * 43758.5453) - 0.48) / 25),
  );
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

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaTradingChart>("#candles")!;
  chart.bars = BARS;
  chart.indicators = [
    { type: "ma", period: 20 },
    { type: "ma", period: 50 },
    { type: "volume" },
    { type: "rsi", period: 14 },
  ];
  chart.options = { watermark: text.watermark };
}

```

## Example: Flux en temps réel

Un tick toutes les 500 ms met à jour la dernière barre, un sur dix en ouvre une nouvelle, sans repasser les données.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/trading-chart/wc/streaming.html

```html
<minerva-trading-chart
  id="live"
  symbol="ACME"
  timeframe="1m"
  height="400"
></minerva-trading-chart>

```

### apps/docs/src/docs/pages/trading-chart/wc/streaming.ts

```tsx
// Real-time streaming: `updateBar(bar)` replaces the last bar (same time)
// or appends one (a later time) on every tick, without passing the whole
// data set again; the countdown shows when the current bar closes.
import type {
  MinervaTradingChart,
  TradingBar,
} from "minerva-design/web-components/trading-chart";

const TEXT = {
  en: { watermark: "ACME · 1m · live" },
  zh: { watermark: "ACME · 1 分钟 · 实时" },
  ja: { watermark: "ACME · 1 分足 · ライブ" },
  fr: { watermark: "ACME · 1 min · direct" },
};

// 120 one-minute bars, generated deterministically
const fraction = (value: number) => value - Math.floor(value);
const round = (value: number) => Math.round(value * 100) / 100;
let close = 100;
const BARS = Array.from({ length: 120 }, (_, i) => {
  const open = close;
  close = round(
    open + (fraction(Math.sin(i * 12.9898) * 43758.5453) - 0.5) / 2,
  );
  return {
    time: Date.UTC(2026, 9, 30, 9) + i * 60_000,
    open,
    high: round(Math.max(open, close) + 0.1),
    low: round(Math.min(open, close) - 0.1),
    close,
    volume: Math.round(200 + fraction(Math.sin(i * 3.7) * 9999) * 600),
  };
});

// the next state of the last bar: a tick moves its close, every 10th
// tick opens a new bar (a later time is appended by `update`)
const nextBar = (last: TradingBar, tick: number): TradingBar => {
  const close = round(
    last.close + (fraction(Math.sin(tick * 7.13) * 43758.5453) - 0.5) / 4,
  );
  return tick % 10 === 0
    ? {
        time: last.time + 60_000,
        open: last.close,
        high: Math.max(last.close, close),
        low: Math.min(last.close, close),
        close,
        volume: 40,
      }
    : {
        ...last,
        high: Math.max(last.high, close),
        low: Math.min(last.low, close),
        close,
        volume: (last.volume ?? 0) + 25,
      };
};

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaTradingChart>("#live")!;
  chart.bars = BARS;
  chart.indicators = [{ type: "ema", period: 9 }, { type: "volume" }];
  chart.options = { countdown: true, watermark: text.watermark };
  let last: TradingBar = BARS[BARS.length - 1];
  let tick = 0;
  let timer = 0;
  timer = window.setInterval(() => {
    tick += 1;
    last = nextBar(last, tick);
    chart.updateBar(last);
  }, 500);
  return () => window.clearInterval(timer);
}

```

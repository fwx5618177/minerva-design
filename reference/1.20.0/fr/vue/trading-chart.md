# Graphique de trading

Le graphique d'un terminal de trading professionnel : chandeliers sur un axe du temps sans trous, panneaux d'indicateurs, outils de dessin, lignes d'ordres et flux en temps réel, dessinés par le GPU et fluides avec un million de bougies.

Package: minerva-design@1.20.0

Renderer: vue

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.0",
  "sourceCommit": "09013eec9b429ff5907c596bcb5edf1281361bc0",
  "sourceDigest": "sha256:c9ed2b706b61413d29e506a3f04f3d35c044a4b57ec0e284935054f9e1898c7e",
  "referenceSourceDigest": "sha256:b368e6fa7c621870e513621690cab70035abb6a658e8344f3df3b0cb0be55a18"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.0/types.json) or getType() from minerva-design/contracts.

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

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "TradingChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "deep",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Also follows in-place mutations of nested data (`series[0].data.push()`);\nby default the chart updates when a prop is replaced (cheaper on large data)",
    "typeText": "boolean"
  },
  {
    "name": "legend",
    "type": "boolean",
    "required": false,
    "description": "Legends with the values at the crosshair and the indicator toggles (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "grid",
    "type": "boolean",
    "required": false,
    "description": "Grid lines (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "sessionBreaks",
    "type": "boolean",
    "required": false,
    "description": "Dashed vertical lines where a day starts (intraday bars; default `false`)",
    "typeText": "boolean"
  },
  {
    "name": "lastPriceLine",
    "type": "boolean",
    "required": false,
    "description": "Line and axis label at the last price (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "countdown",
    "type": "boolean",
    "required": false,
    "description": "Time left until the current bar closes, under the last price label (default `false`)",
    "typeText": "boolean"
  },
  {
    "name": "highLowMarkers",
    "type": "boolean",
    "required": false,
    "description": "Marks the highest and lowest prices of the visible bars (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "orderEntry",
    "type": "boolean",
    "required": false,
    "description": "A \"+\" button at the crosshair price reporting a limit order (`orderCreate`); with the chart focused, `B` / `S` arm a keyboard order (arrows move it, Enter confirms, Escape cancels; default `false`)",
    "typeText": "boolean"
  },
  {
    "name": "volumeProfile",
    "type": "boolean | TradingVolumeProfileOptions",
    "required": false,
    "description": "Volume by price of the visible bars, with its point of control and value area (`true` for the defaults; default `false`)",
    "typeText": "boolean | TradingVolumeProfileOptions"
  },
  {
    "name": "keepDrawingMode",
    "type": "boolean",
    "required": false,
    "description": "Keeps the drawing tool after a drawing is made (default `false`)",
    "typeText": "boolean"
  },
  {
    "name": "drawingToolbar",
    "type": "boolean",
    "required": false,
    "description": "Floating toolbar over the selected drawing: color, width, style, fill, lock, delete (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "autoscaleIncludesDrawings",
    "type": "boolean",
    "required": false,
    "description": "The automatic price scale also fits the visible drawings of each pane (default `false`)",
    "typeText": "boolean"
  },
  {
    "name": "kineticScroll",
    "type": "boolean",
    "required": false,
    "description": "Keeps panning after a quick drag (default `true`)",
    "typeText": "boolean"
  },
  {
    "name": "symbol",
    "type": "string",
    "required": false,
    "description": "Name shown in the legend and the accessible label (`\"BTC/USDT\"`)",
    "typeText": "string"
  },
  {
    "name": "labels",
    "type": "Partial<TradingChartLabels>",
    "required": false,
    "description": "Overrides of the built-in texts of the `locale`",
    "typeText": "Partial<TradingChartLabels>"
  },
  {
    "name": "renderer",
    "type": "ChartRendererPreference",
    "required": false,
    "description": "Backend of the bars and lines: WebGPU, then WebGL2, WebGL, Canvas2D (default `auto`)",
    "typeText": "ChartRendererPreference"
  },
  {
    "name": "width",
    "type": "string | number",
    "required": false,
    "description": "Width of the chart; numbers are pixels (default `100%`)",
    "typeText": "string | number"
  },
  {
    "name": "height",
    "type": "string | number",
    "required": false,
    "description": "Height of the chart (the legend included); numbers are pixels, strings any CSS length",
    "typeText": "string | number"
  },
  {
    "name": "crosshair",
    "type": "TradingCrosshairMode",
    "required": false,
    "description": "Crosshair behaviour (default `magnet`)",
    "typeText": "TradingCrosshairMode"
  },
  {
    "name": "ariaLabel",
    "type": "string",
    "required": false,
    "description": "Accessible label; built from the symbol by default",
    "typeText": "string"
  },
  {
    "name": "locale",
    "type": "string",
    "required": false,
    "description": "Locale of the texts, numbers and dates (`\"zh-CN\"`); the page language by default",
    "typeText": "string"
  },
  {
    "name": "bars",
    "type": "TradingBarsInput",
    "required": false,
    "description": "Bars, oldest first; replaced when a new array / object is passed (stream with the handle's `update`)",
    "typeText": "TradingBarsInput"
  },
  {
    "name": "priceLines",
    "type": "readonly TradingPriceLine[]",
    "required": false,
    "description": "Order, position, take profit / stop loss and alert lines",
    "typeText": "readonly TradingPriceLine[]"
  },
  {
    "name": "upColor",
    "type": "string",
    "required": false,
    "description": "Color of rising bars (any CSS color, `var(--x)` included)",
    "typeText": "string"
  },
  {
    "name": "downColor",
    "type": "string",
    "required": false,
    "description": "Color of falling bars",
    "typeText": "string"
  },
  {
    "name": "colorConvention",
    "type": "TradingColorConvention",
    "required": false,
    "description": "Colors of rising / falling bars: `redUp` swaps the defaults, `auto` follows the market convention of the `locale` (red up for CN, TW, JP, KR; default `greenUp`)",
    "typeText": "TradingColorConvention"
  },
  {
    "name": "formatPrice",
    "type": "((price: number) => string)",
    "required": false,
    "description": "Formats the prices (axis, legend, labels); overrides `precision`",
    "typeText": "((price: number) => string)"
  },
  {
    "name": "precision",
    "type": "number",
    "required": false,
    "description": "Decimals of the prices; detected from the data by default",
    "typeText": "number"
  },
  {
    "name": "timeZone",
    "type": "string",
    "required": false,
    "description": "Time zone of the time axis, the session breaks and the VWAP periods (IANA name such as `\"America/New_York\"`, or `\"UTC\"`); local time by default",
    "typeText": "string"
  },
  {
    "name": "indicators",
    "type": "readonly TradingIndicator[]",
    "required": false,
    "description": "Indicators, over the price or in panes below it, in this order",
    "typeText": "readonly TradingIndicator[]"
  },
  {
    "name": "timeframe",
    "type": "TradingTimeframe",
    "required": false,
    "description": "Duration of a bar; inferred from the bar times by default",
    "typeText": "TradingTimeframe"
  },
  {
    "name": "chartStyle",
    "type": "TradingChartStyle",
    "required": false,
    "description": "How the bars are drawn (default `candles`)",
    "typeText": "TradingChartStyle"
  },
  {
    "name": "scaleMode",
    "type": "TradingScaleMode",
    "required": false,
    "description": "Price scale of the price pane (default `linear`)",
    "typeText": "TradingScaleMode"
  },
  {
    "name": "utcOffset",
    "type": "number",
    "required": false,
    "description": "Offset of the displayed times from UTC, in minutes (`480` for UTC+8); overrides `timeZone`",
    "typeText": "number"
  },
  {
    "name": "markers",
    "type": "readonly TradingMarker[]",
    "required": false,
    "description": "Buy / sell markers",
    "typeText": "readonly TradingMarker[]"
  },
  {
    "name": "compare",
    "type": "readonly TradingCompareSeries[]",
    "required": false,
    "description": "Comparison series (best read with `scaleMode: \"percent\"`)",
    "typeText": "readonly TradingCompareSeries[]"
  },
  {
    "name": "drawings",
    "type": "readonly TradingDrawing[]",
    "required": false,
    "description": "Drawings; replaced when a new array is passed (see the `drawingsChange` event)",
    "typeText": "readonly TradingDrawing[]"
  },
  {
    "name": "drawingMode",
    "type": "TradingDrawingTool",
    "required": false,
    "description": "Active drawing tool (default `cursor`)",
    "typeText": "TradingDrawingTool"
  },
  {
    "name": "baselinePrice",
    "type": "number",
    "required": false,
    "description": "Price of the `baseline` style; the close of the first visible bar by default",
    "typeText": "number"
  },
  {
    "name": "rightOffset",
    "type": "number",
    "required": false,
    "description": "Empty space after the last bar, in bars (default 8)",
    "typeText": "number"
  },
  {
    "name": "barSpacing",
    "type": "number",
    "required": false,
    "description": "Initial width of a bar, in pixels (default 8)",
    "typeText": "number"
  },
  {
    "name": "wheel",
    "type": "\"zoom\" | \"none\" | \"modifier\"",
    "required": false,
    "description": "Mouse wheel: `zoom`, `modifier` (zoom with Ctrl / ⌘ only) or `none` (default `zoom`)",
    "typeText": "\"zoom\" | \"none\" | \"modifier\""
  },
  {
    "name": "watermark",
    "type": "string",
    "required": false,
    "description": "Large faint text behind the bars (`\"BTCUSDT · 1H\"`)",
    "typeText": "string"
  }
]
```

### events

```json
[
  {
    "name": "click",
    "type": "[event: TradingClickEvent]",
    "typeText": "[event: TradingClickEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "TradingClickEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "rendererChange",
    "type": "[renderer: ChartRendererKind]",
    "typeText": "[renderer: ChartRendererKind]",
    "parameters": [
      {
        "name": "renderer",
        "position": 0,
        "typeText": "ChartRendererKind",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "crosshairMove",
    "type": "[event: TradingCrosshairEvent | null]",
    "typeText": "[event: TradingCrosshairEvent | null]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "TradingCrosshairEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "visibleRangeChange",
    "type": "[range: TradingVisibleRange]",
    "typeText": "[range: TradingVisibleRange]",
    "parameters": [
      {
        "name": "range",
        "position": 0,
        "typeText": "TradingVisibleRange",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "orderMove",
    "type": "[event: TradingOrderMoveEvent]",
    "typeText": "[event: TradingOrderMoveEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "TradingOrderMoveEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "orderCreate",
    "type": "[event: TradingOrderCreateEvent]",
    "typeText": "[event: TradingOrderCreateEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "TradingOrderCreateEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "orderCancel",
    "type": "[event: TradingOrderCancelEvent]",
    "typeText": "[event: TradingOrderCancelEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "TradingOrderCancelEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "drawingsChange",
    "type": "[drawings: readonly TradingDrawing[]]",
    "typeText": "[drawings: readonly TradingDrawing[]]",
    "parameters": [
      {
        "name": "drawings",
        "position": 0,
        "typeText": "readonly TradingDrawing[]",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "drawingSelect",
    "type": "[id: string | null]",
    "typeText": "[id: string | null]",
    "parameters": [
      {
        "name": "id",
        "position": 0,
        "typeText": "string | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "drawingToolChange",
    "type": "[tool: TradingDrawingTool]",
    "typeText": "[tool: TradingDrawingTool]",
    "parameters": [
      {
        "name": "tool",
        "position": 0,
        "typeText": "TradingDrawingTool",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "undoChange",
    "type": "[state: TradingUndoState]",
    "typeText": "[state: TradingUndoState]",
    "parameters": [
      {
        "name": "state",
        "position": 0,
        "typeText": "TradingUndoState",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "replayChange",
    "type": "[state: TradingReplayState]",
    "typeText": "[state: TradingReplayState]",
    "parameters": [
      {
        "name": "state",
        "position": 0,
        "typeText": "TradingReplayState",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "fullscreenChange",
    "type": "[fullscreen: boolean]",
    "typeText": "[fullscreen: boolean]",
    "parameters": [
      {
        "name": "fullscreen",
        "position": 0,
        "typeText": "boolean",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "indicatorToggle",
    "type": "[event: TradingIndicatorToggleEvent]",
    "typeText": "[event: TradingIndicatorToggleEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "TradingIndicatorToggleEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "historyRequest",
    "type": "[event: TradingHistoryRequestEvent]",
    "typeText": "[event: TradingHistoryRequestEvent]",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "typeText": "TradingHistoryRequestEvent",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: candles

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/trading-chart/vue/candles.vue

```vue
<script setup lang="ts">
// <TradingChart>: candles on a gap-free time axis with moving averages over
// the price, volume and RSI panes below; the texts, numbers and dates
// follow the page language.
import { computed } from "vue";
import { useI18n } from "minerva-design/vue";
import { TradingChart } from "minerva-design/vue/charts";

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

const indicators = [
  { type: "ma", period: 20 },
  { type: "ma", period: 50 },
  { type: "volume" },
  { type: "rsi", period: 14 },
] as const;

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
</script>

<template>
  <TradingChart
    :bars="BARS"
    symbol="ACME"
    timeframe="1D"
    :indicators="indicators"
    :watermark="text.watermark"
  />
</template>

```

## Example: streaming

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/trading-chart/vue/streaming.vue

```vue
<script setup lang="ts">
// Real-time streaming: the handle's `update(bar)` replaces the last bar
// (same time) or appends one (a later time) on every tick, without passing
// the whole data set again; the countdown shows when the bar closes.
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useI18n } from "minerva-design/vue";
import {
  TradingChart,
  type TradingBar,
  type TradingChartHandle,
} from "minerva-design/vue/charts";

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

const { language } = useI18n();
const text = computed(() => TEXT[language.value] ?? TEXT.en);
const chart = ref<TradingChartHandle>();
let last: TradingBar = BARS[BARS.length - 1];
let tick = 0;
let timer = 0;
onMounted(() => {
  timer = window.setInterval(() => {
    tick += 1;
    last = nextBar(last, tick);
    chart.value?.update(last);
  }, 500);
});
onBeforeUnmount(() => window.clearInterval(timer));
</script>

<template>
  <TradingChart
    ref="chart"
    :bars="BARS"
    symbol="ACME"
    timeframe="1m"
    :indicators="[{ type: 'ema', period: 9 }, { type: 'volume' }]"
    countdown
    :watermark="text.watermark"
    :height="400"
  />
</template>

```

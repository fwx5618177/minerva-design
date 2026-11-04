# Graphique linéaire

Lignes ou aires remplies sur des nombres, des dates ou des catégories. Gère des millions de points sur le GPU.

Package: minerva-design@1.20.6

Renderer: native

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.6",
  "sourceCommit": "99b9ad1465abc6ea97d2a8c008f3026645edb983",
  "sourceDigest": "sha256:e0f51a94cc5272baf2775327d83ba025ee09228cfc17f4d529188b1653c78892",
  "referenceSourceDigest": "sha256:d66e13eea732bfeb1a6aaa7461bf92ea0d54944072977e762c106b87e877d062"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.6/types.json) or getType() from minerva-design/contracts.

## Documentation

Cette semaine

Semaine dernière

Visiteurs par jour, cette semaine et la semaine dernière

Stockage utilisé

Jour

Stockage utilisé sur 60 jours

Lisbonne

Oslo

Courbe

Linéaire

Lissée

En escalier

Températures mensuelles moyennes à Lisbonne et à Oslo

Calcul

Stockage

Réseau

Bases de données

Mode d'empilement

Empilé

Dépenses cloud mensuelles par service, empilées

Pages vues

Sessions

Pages vues et sessions quotidiennes, premier semestre 2026

Capteur

Un million de relevés de capteur

{{points}} points · dessinés avec {{renderer}} · Ctrl / ⌘ + molette pour zoomer, glisser pour se déplacer, double-clic pour réinitialiser

Visiteurs

Lancement du produit

Panne

Visiteurs quotidiens sur 90 jours avec un lancement de produit et une panne

Intérieur

Extérieur

Températures horaires intérieures et extérieures avec des relevés manquants

Les capteurs ont été hors ligne quelques heures : la ligne s'interrompt au lieu de deviner.

Médiane

95e centile

Critique

Objectif {{value}}

Latence de l'API sur six heures, médiane et 95e centile

Clôture

Période

1 M

3 M

6 M

1 A

Tout

Cours de clôture quotidien sur deux ans

Pas

Pas par jour

{{day}} : {{steps}} pas

Touchez ou parcourez la ligne

Processeur

Mémoire

{{hour}} h

Utilisation du processeur et de la mémoire au cours de la journée

Pincez pour zoomer, touchez deux fois pour réinitialiser ; touchez la légende pour masquer une série.

Température du congélateur

Alarme au-dessus de {{value}}

Pause

Reprendre

Alarme : porte ouverte ?

Normal

Dernière mesure {{value}} à {{time}}

Au-dessus du seuil sur la dernière minute : {{readings}}

Température du congélateur sur la dernière minute, mise à jour chaque seconde

Souche sauvage

Mutant

Avec antibiotique

Phase exponentielle

Échelle logarithmique

Temps depuis l'inoculation

UFC / mL

Courbes de croissance de trois cultures bactériennes sur 24 heures

Les segments droits indiquent un taux de croissance constant : la souche sauvage double environ toutes les {{minutes}}.

Sur une échelle linéaire, les petites cultures paraissent plates : revenez à l'échelle logarithmique pour les comparer.

Valeur du portefeuille

Cliquez sur un point pour commencer une mesure, puis sur un second.

Depuis le {{date}} ({{value}}) : cliquez sur un second point.

{{from}} → {{to}} : {{change}} ({{percent}}) en {{days}}

Effacer

Valeur quotidienne d'un portefeuille en 2026 ; cliquez sur deux points pour mesurer la variation

Actions

Obligations

Or

Immobilier

Base 100

Performance de quatre classes d'actifs en base 100, de 2021 à 2026

{{value}} µg/m³

Delhi

Pékin

Paris

Mexico

Tokyo

São Paulo

Moyenne journalière des particules fines (PM2,5) en novembre ; la ligne en pointillés est le seuil de l'OMS, {{value}}.

{{days}}/{{total}} jours au-dessus

PM2,5 quotidiennes à {{city}} sur 30 jours

## LineChart

Support: beta

Chart component of minerva-design/native: the canvas chart engine drawn with views (touch scrub, pinch zoom, legend toggles).

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "LineChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "series",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "array",
    "typeText": "readonly ChartSeries[]",
    "typeRef": "type:deda0bcb88251b63a5de",
    "required": true,
    "description": "Series drawn as lines (or areas with `area`) unless they set a `type`"
  },
  {
    "name": "area",
    "source": "packages/native/src/components/Chart/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Fills the area under the lines"
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
  "native:LineChartProps": {
    "source": "native/src/components/Chart/types.ts",
    "description": "Props of LineChart",
    "kind": "interface",
    "extends": [
      "ChartCommonProps"
    ],
    "props": [
      {
        "name": "series",
        "type": "readonly ChartSeries[]",
        "required": true,
        "description": "Series drawn as lines (or areas with `area`) unless they set a `type`"
      },
      {
        "name": "area",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Fills the area under the lines"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Aire

area remplit l’espace sous les lignes ; l’opacité de la série règle le remplissage.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-i18next, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/line-chart/native/area.tsx

```tsx
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import { LineChart, useTheme } from "minerva-design/native";

const hours = Array.from({ length: 24 }, (_, i) => i);
const wave = (phase: number, base: number) =>
  hours.map(
    (hour) =>
      [
        hour,
        Math.round(base + 20 * Math.sin((hour + phase) / 3.5) + hour),
      ] as const,
  );

export default function Area() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.line-chart.data",
  });
  const { colors } = useTheme();
  const percent = new Intl.NumberFormat(i18n.language, { style: "percent" });
  return (
    <View style={{ width: "100%", gap: 8 }}>
      <LineChart
        area
        height={220}
        crosshair
        ariaLabel={t("usageAria")}
        xAxis={{ format: (hour) => t("hour", { hour }) }}
        yAxis={{ format: (value) => percent.format(value / 100) }}
        series={[
          { name: t("cpu"), data: wave(0, 35) },
          { name: t("memory"), data: wave(4, 25) },
        ]}
      />
      <Text style={{ color: colors["text-secondary-color"] }}>
        {t("pinchHint")}
      </Text>
    </View>
  );
}

```

## Example: Base

Deux séries sur un axe de catégories ; l’infobulle montre toutes les séries au x survolé.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/line-chart/native/basic.tsx

```tsx
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import { LineChart, useTheme } from "minerva-design/native";

const steps = [6200, 8400, 7100, 9800, 10400, 12800, 5600];

/** Short weekday names in the reader's language, Monday first */
const weekdays = (locale: string) => {
  const format = new Intl.DateTimeFormat(locale, { weekday: "short" });
  // 5 January 2026 is a Monday
  return Array.from({ length: 7 }, (_, i) =>
    format.format(new Date(2026, 0, 5 + i)),
  );
};

export default function Basic() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.line-chart.data",
  });
  const { colors } = useTheme();
  const [status, setStatus] = useState<string | null>(null);
  const days = weekdays(i18n.language);
  const number = new Intl.NumberFormat(i18n.language);
  const compact = new Intl.NumberFormat(i18n.language, { notation: "compact" });
  return (
    <View style={{ width: "100%", gap: 8 }}>
      <LineChart
        height={220}
        ariaLabel={t("stepsAria")}
        yAxis={{ format: (value) => compact.format(value) }}
        series={[
          {
            name: t("steps"),
            data: days.map((day, i) => [day, steps[i]] as const),
          },
        ]}
        onHover={(event) => {
          const item = event?.items[0];
          if (event && item)
            setStatus(
              t("stepsStatus", {
                day: event.xLabel,
                steps: number.format(item.y),
              }),
            );
        }}
      />
      <Text role="status" style={{ color: colors["text-secondary-color"] }}>
        {status ?? t("scrubHint")}
      </Text>
    </View>
  );
}

```

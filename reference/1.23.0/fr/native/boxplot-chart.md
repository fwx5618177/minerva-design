# Boîte à moustaches

Médianes, quartiles, moustaches et valeurs extrêmes pour comparer des distributions, à partir d'échantillons bruts ou de statistiques calculées. Les valeurs extrêmes sont des anneaux de la couleur de la série : survolez-en une pour lire sa valeur et son groupe.

Package: minerva-design@1.23.0

Renderer: native

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "413e3d54e2177f8469c443a6547c4472e608839c",
  "sourceDigest": "sha256:8c8e874e213d698b4d05cabed92eed392c90c5b0fa91c66def67eab19184e86c",
  "referenceSourceDigest": "sha256:e694adbf6015cdc21809df819193e0a84c030845fb2910749dbd1c4c15ccca99"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

## Documentation

Passerelle

Authentification

Recherche

Paiement

Recommandations

Images

Temps de réponse

Max

Q3

Médiane

Q1

Min

Valeurs extrêmes

Distribution du temps de réponse de chaque service

Salaire annuel

Développeur junior

Développeur

Développeur senior

Responsable technique

Responsable d'équipe

Distribution des salaires par poste

En semaine

Le week-end

Paris

Lyon

Marseille

Lille

Délai de livraison (heures)

Délais de livraison par ville en semaine et le week-end

Maximale du jour

Moyenne

Distribution des températures maximales quotidiennes par mois

Lint

Tests unitaires

Intégration

Bout en bout

Publication

Portée des moustaches

1,5 × EIQ

3 × EIQ

Min – max

Forme des valeurs aberrantes

Creuses

Pleines

{{value}} exécutions dessinées comme valeurs aberrantes

Durée du build

Distribution des durées de build de chaque pipeline CI

Cliquez sur une boîte ou une valeur aberrante.

{{day}} : un patient a attendu {{value}}.

{{day}} : attente médiane {{median}}, la moitié des patients a attendu entre {{q1}} et {{q3}}, {{outliers}} valeurs aberrantes.

Attente

Objectif de quatre heures

Distribution de l'attente aux urgences par jour de la semaine

Feuilles de style

Scripts

Polices

Images

Vidéos

Échelle logarithmique

{{value}} fichiers dépassent le budget de {{budget}}.

Taille du fichier

Budget

Distribution des tailles de fichiers d'un site web par type

Est des États-Unis

Ouest des États-Unis

Europe de l'Ouest

Asie-Pacifique Sud

Est de l'Amérique du Sud

Pause

Reprendre

SLA menacé : {{regions}}

Toutes les régions respectent le SLA

Latence

SLA

Distribution en direct de la latence des requêtes dans chaque région

## BoxPlotChart

Support: beta

Chart component of minerva-design/native: the canvas chart engine drawn with views (touch scrub, pinch zoom, legend toggles).

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "BoxPlotChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "series",
    "source": "packages/native/src/components/Charts/types.ts",
    "kind": "array",
    "typeText": "readonly ChartSeries[] | undefined",
    "typeRef": "type:f8b682a7983af505585d",
    "required": false,
    "description": "Series of box plots: data points with `low`, `q1`, `y` (the median), `q3`, `high` and `outliers` (see `boxplotData` / `boxplotStats`)"
  },
  {
    "name": "groups",
    "source": "packages/native/src/components/Charts/types.ts",
    "kind": "array",
    "typeText": "readonly BoxplotGroup[] | undefined",
    "typeRef": "type:8c03c4dd37e605ff7493",
    "required": false,
    "description": "Raw samples, one box each (an alternative to `series`)"
  },
  {
    "name": "name",
    "source": "packages/native/src/components/Charts/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "default": "Values",
    "required": false,
    "description": "Name of the series built from `groups`"
  },
  {
    "name": "orientation",
    "source": "packages/native/src/components/Charts/types.ts",
    "kind": "enum",
    "values": [
      "horizontal",
      "vertical"
    ],
    "typeText": "ChartOrientation | undefined",
    "typeRef": "type:872af3679a2d7fcf3d26",
    "default": "vertical",
    "required": false,
    "description": "`horizontal` lays the boxes out in rows"
  },
  {
    "name": "outlierShape",
    "source": "packages/native/src/components/Charts/types.ts",
    "kind": "enum",
    "values": [
      "filled",
      "hollow"
    ],
    "typeText": "\"filled\" | \"hollow\" | undefined",
    "typeRef": "type:de3eb4c626f217cc19bd",
    "default": "hollow",
    "required": false,
    "description": "Outliers drawn as rings of the series color or as filled dots (series may set their own `outlierShape`)"
  },
  {
    "name": "outlierSize",
    "source": "packages/native/src/components/Charts/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 7,
    "required": false,
    "description": "Diameter of the outliers in pixels"
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
  "native:BoxPlotChartProps": {
    "source": "native/src/components/Charts/types.ts",
    "description": "Props of BoxPlotChart",
    "kind": "interface",
    "extends": [
      "ChartCommonProps",
      "BoxplotStatsOptions"
    ],
    "props": [
      {
        "name": "series",
        "type": "readonly ChartSeries[]",
        "required": false,
        "description": "Series of box plots: data points with `low`, `q1`, `y` (the median), `q3`, `high` and `outliers` (see `boxplotData` / `boxplotStats`)"
      },
      {
        "name": "groups",
        "type": "readonly BoxplotGroup[]",
        "required": false,
        "description": "Raw samples, one box each (an alternative to `series`)"
      },
      {
        "name": "name",
        "type": "string",
        "required": false,
        "default": "\"Values\"",
        "description": "Name of the series built from `groups`"
      },
      {
        "name": "orientation",
        "type": "ChartOrientation",
        "required": false,
        "default": "\"vertical\"",
        "description": "`horizontal` lays the boxes out in rows"
      },
      {
        "name": "outlierShape",
        "type": "\"hollow\" | \"filled\"",
        "required": false,
        "default": "\"hollow\"",
        "description": "Outliers drawn as rings of the series color or as filled dots (series may set their own `outlierShape`)"
      },
      {
        "name": "outlierSize",
        "type": "number",
        "required": false,
        "default": "7",
        "description": "Diameter of the outliers in pixels"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: basic

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/boxplot-chart/native/basic.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BoxPlotChart } from "minerva-design/native";

// 500 response times (ms) of each service, log-normally distributed
const services = [
  ["gateway", 18, 0.35],
  ["auth", 32, 0.3],
  ["search", 95, 0.45],
  ["checkout", 140, 0.38],
] as const;
const samples = services.map(([, median, spread], s) => {
  let seed = 100 + s;
  const random = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  return Float64Array.from({ length: 500 }, () => {
    const z =
      Math.sqrt(-2 * Math.log(random())) * Math.cos(2 * Math.PI * random());
    return median * Math.exp(spread * z);
  });
});

export default function Basic() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.boxplot-chart.data",
  });
  // the tooltip rows (max, Q3, median...) come in the locale's language
  const groups = useMemo(
    () =>
      services.map(([key], i) => ({
        x: t(`services.${key}`),
        values: samples[i] ?? [],
      })),
    [t],
  );
  return (
    <BoxPlotChart
      height={280}
      locale={i18n.language}
      groups={groups}
      name={t("responseTime")}
      ariaLabel={t("servicesAria")}
    />
  );
}

```

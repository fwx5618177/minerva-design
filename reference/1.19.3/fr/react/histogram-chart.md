# Histogramme

La distribution d'échantillons bruts en classes de même largeur, de quelques centaines de valeurs à des millions.

Package: minerva-design@1.19.3

Renderer: react

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "19932861fda2d088219d708a8ca132bea760a32b",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:ed8b6b1bf30e9055934099f84afd6b8369eee155b0404de5e8db004c3d91bce6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

Requêtes

Distribution d'un million de latences avec p50, p95 et p99

Règle de classes

Auto

Sturges

10 classes

40 classes

Étudiants

Note

Distribution des notes de l'examen

Clients

Âge

Distribution des âges des clients

Contrôle

Nouvel accueil

Durée de session (minutes)

Durées de session des deux groupes d'un test A/B

Ajustement normal

LSI

LSS

Nominal

Outil réglé

Moyenne {{mean}}, σ {{sd}}, Cpk {{cpk}}, {{ppm}} ppm hors tolérance :

capable

non capable

Pièces

Diamètre

Distribution des diamètres d'arbres avec les limites de spécification et une courbe normale ajustée

Livraison gratuite

Médiane {{value}}

p99 {{value}}

{{share}} des commandes atteignent le seuil de livraison gratuite de {{threshold}}.

Commandes

Montant de la commande (échelle log)

Distribution des montants de commande sur une échelle logarithmique

Pause

Reprendre

Réinitialiser

{{share}} des appels décrochés en {{target}} ou moins, p90 {{p90}} :

objectif atteint

objectif manqué

Appels

Temps d'attente

Objectif

p90

Distribution en direct des temps d'attente des 600 derniers appels au support

{{share}} des employés

{{value}} employés ({{share}})

Cliquez pour la part cumulée

Cliquez sur une barre pour voir la part des employés dont le trajet est plus court.

{{share}} des employés ({{employees}}) font un trajet de {{limit}} ou moins.

Employés

Trajet aller

Distribution des temps de trajet des employés

## HistogramChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/charts",
  "exports": [
    "HistogramChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "values",
    "source": "packages/charts/src/react/types.ts",
    "kind": "object",
    "typeText": "ArrayLike<number>",
    "typeRef": "type:44dd641637ae8002a767",
    "required": true,
    "description": "Raw samples (typed arrays are counted without copies)"
  },
  {
    "name": "name",
    "source": "packages/charts/src/react/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "default": "Count",
    "required": false,
    "description": "Name of the counts (legend, tooltip)"
  },
  {
    "name": "color",
    "source": "packages/charts/src/react/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Bar color (any CSS color)"
  },
  {
    "name": "formatBin",
    "source": "packages/charts/src/react/types.ts",
    "kind": "function",
    "typeText": "((value: number) => string) | undefined",
    "typeRef": "type:a250f1c2766673f041b3",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "number",
        "typeRef": "type:7d1137535c313783dadd"
      }
    ],
    "returnType": {
      "typeText": "string",
      "typeRef": "type:e15e314d298fc0d116fc"
    },
    "required": false,
    "description": "Formats the edges of the bins in the tooltip"
  },
  {
    "name": "series",
    "source": "packages/charts/src/react/types.ts",
    "kind": "array",
    "typeText": "readonly ChartSeries[] | undefined",
    "typeRef": "type:f8b682a7983af505585d",
    "required": false,
    "description": "More series drawn over the bins (e.g. a density `line`)"
  },
  {
    "name": "height",
    "source": "packages/charts/src/react/types.ts",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "default": 320,
    "required": false,
    "description": "Height of the chart (the legend included); numbers are pixels"
  },
  {
    "name": "width",
    "source": "packages/charts/src/react/types.ts",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "default": "100%",
    "required": false,
    "description": "Width of the chart; numbers are pixels"
  },
  {
    "name": "xAxis",
    "source": "packages/charts/src/react/types.ts",
    "kind": "object",
    "typeText": "ChartAxisOptions | undefined",
    "typeRef": "type:6eb50d4f419370a826a4",
    "required": false,
    "description": "X axis"
  },
  {
    "name": "yAxis",
    "source": "packages/charts/src/react/types.ts",
    "kind": "object",
    "typeText": "ChartAxisOptions | undefined",
    "typeRef": "type:6eb50d4f419370a826a4",
    "required": false,
    "description": "Y axis"
  },
  {
    "name": "renderer",
    "source": "packages/charts/src/react/types.ts",
    "kind": "enum",
    "values": [
      "auto",
      "canvas2d",
      "webgl",
      "webgl2",
      "webgpu"
    ],
    "typeText": "ChartRendererPreference | undefined",
    "typeRef": "type:dc7d7e6f384ddec86e04",
    "default": "auto",
    "required": false,
    "description": "Backend of the data layer: `auto` tries WebGPU, then WebGL2, then WebGL, then Canvas2D"
  },
  {
    "name": "legend",
    "source": "packages/charts/src/react/types.ts",
    "kind": "union",
    "typeText": "boolean | ChartLegendOptions | undefined",
    "typeRef": "type:860fa553ee4deaac43f8",
    "required": false,
    "description": "Legend; shown by default when several series have a name"
  },
  {
    "name": "tooltip",
    "source": "packages/charts/src/react/types.ts",
    "kind": "union",
    "typeText": "boolean | ChartTooltipOptions | undefined",
    "typeRef": "type:c08795b3492e4547d570",
    "required": false,
    "description": "Tooltip; `false` disables it"
  },
  {
    "name": "crosshair",
    "source": "packages/charts/src/react/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Vertical guide line following the pointer"
  },
  {
    "name": "annotations",
    "source": "packages/charts/src/react/types.ts",
    "kind": "array",
    "typeText": "readonly ChartAnnotation[] | undefined",
    "typeRef": "type:f440eb8a958892b1b0c2",
    "required": false,
    "description": "Background areas and reference lines"
  },
  {
    "name": "interaction",
    "source": "packages/charts/src/react/types.ts",
    "kind": "union",
    "typeText": "boolean | ChartInteractionOptions | undefined",
    "typeRef": "type:f4b160d7dd18649fd178",
    "default": true,
    "required": false,
    "description": "Zoom (Ctrl / ⌘ + wheel, pinch), pan (drag), double-click reset and keyboard navigation; `false` makes the chart static"
  },
  {
    "name": "padding",
    "source": "packages/charts/src/react/types.ts",
    "kind": "object",
    "typeText": "ChartPadding | undefined",
    "typeRef": "type:7c2c76b2d4d6c9fbf43a",
    "required": false,
    "description": "Space around the plot area, in pixels"
  },
  {
    "name": "palette",
    "source": "packages/charts/src/react/types.ts",
    "kind": "array",
    "typeText": "readonly string[] | undefined",
    "typeRef": "type:88dcb55e82bb1c501478",
    "required": false,
    "description": "Series colors (defaults to the `--chart-series-1..8` CSS variables, then the theme colors)"
  },
  {
    "name": "ariaLabel",
    "source": "packages/charts/src/react/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible name of the chart"
  },
  {
    "name": "locale",
    "source": "packages/charts/src/react/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Locale of the texts and numbers the chart writes (tooltip rows, compact units `k` / `万`, separators, month and weekday names of time axes)"
  },
  {
    "name": "labels",
    "source": "packages/charts/src/react/types.ts",
    "kind": "object",
    "typeText": "Partial<ChartLabels> | undefined",
    "typeRef": "type:14c31fd72a2c2ac7a7fd",
    "required": false,
    "description": "Overrides of the built-in texts of the `locale`"
  },
  {
    "name": "renderTooltip",
    "source": "packages/charts/src/react/types.ts",
    "kind": "node",
    "typeText": "((event: ChartHoverEvent) => ReactNode) | undefined",
    "typeRef": "type:018692c396245c230316",
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
    "name": "bins",
    "source": "packages/charts/src/engine/presets.ts",
    "kind": "union",
    "typeText": "HistogramBinning | undefined",
    "typeRef": "type:c3353302bf69b5c93114",
    "default": "auto",
    "required": false,
    "description": "Number of bins, or the rule choosing it: `sturges` (log2 n + 1, for small normal-ish samples), `freedman-diaconis` (bin width from the interquartile range, robust to outliers); `auto` uses Freedman-Diaconis and Sturges when the spread is zero"
  },
  {
    "name": "domain",
    "source": "packages/charts/src/engine/presets.ts",
    "kind": "array",
    "typeText": "readonly [number, number] | undefined",
    "typeRef": "type:993918f52c7908c02d32",
    "required": false,
    "description": "Range covered by the bins (values outside are not counted); the data range by default"
  },
  {
    "name": "nice",
    "source": "packages/charts/src/engine/presets.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Rounds the bin width to 1, 2 or 5 × 10^k and aligns the edges on it"
  }
]
```

### events

```json
[
  {
    "name": "onHover",
    "source": "packages/charts/src/react/types.ts",
    "kind": "function",
    "typeText": "((event: ChartHoverEvent | null) => void) | undefined",
    "typeRef": "type:7f639ac6d9481ff0bde9",
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
    "description": "Called when the hovered (or keyboard-focused) points change"
  },
  {
    "name": "onPointClick",
    "source": "packages/charts/src/react/types.ts",
    "kind": "function",
    "typeText": "((event: ChartHoverEvent) => void) | undefined",
    "typeRef": "type:677083ee0328d7ee4253",
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
    "description": "Called when a point (or bar) is clicked"
  },
  {
    "name": "onPlotClick",
    "source": "packages/charts/src/react/types.ts",
    "kind": "function",
    "typeText": "((event: ChartPlotClickEvent) => void) | undefined",
    "typeRef": "type:0256cf20d9a3f1b1c88a",
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
    "description": "Called when the plot area is clicked where there is no point"
  },
  {
    "name": "onZoom",
    "source": "packages/charts/src/react/types.ts",
    "kind": "function",
    "typeText": "((view: ChartView) => void) | undefined",
    "typeRef": "type:ee073556f18eb3ee4cae",
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
  },
  {
    "name": "onRendererChange",
    "source": "packages/charts/src/react/types.ts",
    "kind": "function",
    "typeText": "((renderer: ChartRendererKind) => void) | undefined",
    "typeRef": "type:167734f7bd5dd7f686a6",
    "parameters": [
      {
        "name": "renderer",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ChartRendererKind",
        "typeRef": "type:3439f360c8a2b0649d25"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called with the backend once it is ready (and when it falls back after a GPU loss)"
  }
]
```

### bindings

```json
[
  {
    "prop": "renderer",
    "event": "onRendererChange",
    "syntax": "renderer={renderer} onRendererChange={handler}"
  }
]
```

## API

```json
{
  "HistogramChartProps": {
    "source": "charts/src/react/types.ts",
    "description": "Props of HistogramChart",
    "kind": "interface",
    "extends": [
      "ChartCommonProps",
      "BinOptions"
    ],
    "props": [
      {
        "name": "values",
        "type": "ArrayLike<number>",
        "required": true,
        "description": "Raw samples (typed arrays are counted without copies)"
      },
      {
        "name": "name",
        "type": "string",
        "required": false,
        "default": "\"Count\"",
        "description": "Name of the counts (legend, tooltip)"
      },
      {
        "name": "color",
        "type": "string",
        "required": false,
        "description": "Bar color (any CSS color)"
      },
      {
        "name": "formatBin",
        "type": "(value: number) => string",
        "required": false,
        "description": "Formats the edges of the bins in the tooltip"
      },
      {
        "name": "series",
        "type": "readonly ChartSeries[]",
        "required": false,
        "description": "More series drawn over the bins (e.g. a density `line`)"
      }
    ]
  },
  "BinOptions": {
    "source": "charts/src/engine/presets.ts",
    "description": "Options of `binValues`",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "bins",
        "type": "HistogramBinning",
        "required": false,
        "default": "\"auto\"",
        "description": "Number of bins, or the rule choosing it: `sturges` (log2 n + 1, for small normal-ish samples), `freedman-diaconis` (bin width from the interquartile range, robust to outliers); `auto` uses Freedman-Diaconis and Sturges when the spread is zero"
      },
      {
        "name": "domain",
        "type": "readonly [number, number]",
        "required": false,
        "description": "Range covered by the bins (values outside are not counted); the data range by default"
      },
      {
        "name": "nice",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Rounds the bin width to 1, 2 or 5 × 10^k and aligns the edges on it"
      }
    ]
  },
  "HistogramBins": {
    "source": "charts/src/engine/presets.ts",
    "description": "Bins of a histogram",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "edges",
        "type": "number[]",
        "required": true,
        "description": "Edges of the bins: one more than the bins"
      },
      {
        "name": "counts",
        "type": "number[]",
        "required": true,
        "description": "Number of values in every bin"
      },
      {
        "name": "width",
        "type": "number",
        "required": true,
        "description": "Width of a bin"
      },
      {
        "name": "total",
        "type": "number",
        "required": true,
        "description": "Number of values counted (finite, inside the domain)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Classes fixes

Un domaine et un nombre donnent des classes rondes, une par tranche de 5 ans ici ; formatBin écrit les bornes dans l'infobulle, les tableaux typés sont classés sans copie.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/histogram-chart/demos/ages.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { HistogramChart } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Ages of 20,000 customers, in an Int32Array (any array of numbers works)
const ages = (() => {
  const random = mulberry32(21);
  const out = new Int32Array(20_000);
  for (let i = 0; i < out.length; i++) {
    const r = random();
    out[i] = Math.round(
      r < 0.6 ? 22 + random() * 18 + random() * 6 : 35 + random() * 40,
    );
  }
  return out;
})();

export default function AgesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.histogram-chart.data",
  });
  const locale = i18n.language;
  const years = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "year",
      unitDisplay: "long",
    });
    return (value: number) => format.format(value);
  }, [locale]);

  // a fixed domain and 14 bins: one bin per 5 years from 15 to 85
  return (
    <HistogramChart
      values={ages}
      domain={[15, 85]}
      bins={14}
      name={t("customers")}
      color="var(--chart-series-2, #10b981)"
      formatBin={years}
      xAxis={{ title: t("age") }}
      height={280}
      ariaLabel={t("agesAria")}
    />
  );
}

```

## Example: Règles de classes

bins prend un nombre ou une règle : auto (Freedman-Diaconis, robuste aux valeurs extrêmes), sturges (log2 n + 1) ou un nombre fixe ; les deux groupes de niveaux apparaissent avec assez de classes.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/histogram-chart/demos/binning.tsx

```tsx
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { HistogramChart, type HistogramBinning } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Scores of 600 students in an exam out of 100: two groups of levels
const scores = (() => {
  const random = mulberry32(5);
  return Array.from({ length: 600 }, (_, i) => {
    const z =
      Math.sqrt(-2 * Math.log(random() || 1e-12)) *
      Math.cos(2 * Math.PI * random());
    const mean = i % 3 === 0 ? 48 : 71;
    return Math.max(0, Math.min(100, mean + z * 9));
  });
})();

const rules: Record<string, HistogramBinning> = {
  auto: "auto",
  sturges: "sturges",
  ten: 10,
  forty: 40,
};

export default function BinningDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.histogram-chart.data",
  });
  const [rule, setRule] = useState("auto");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
        width: "100%",
      }}
    >
      <RadioGroup
        aria-label={t("binning")}
        direction="horizontal"
        value={rule}
        onChange={(value) => setRule(String(value))}
      >
        <Radio value="auto" label={t("rules.auto")} />
        <Radio value="sturges" label={t("rules.sturges")} />
        <Radio value="ten" label={t("rules.ten")} />
        <Radio value="forty" label={t("rules.forty")} />
      </RadioGroup>
      <HistogramChart
        values={scores}
        bins={rules[rule]}
        domain={[0, 100]}
        name={t("students")}
        color="var(--chart-series-6, #8b5cf6)"
        xAxis={{ title: t("score") }}
        height={280}
        ariaLabel={t("scoresAria")}
      />
    </div>
  );
}

```

## Example: Part cumulée au clic

onPointClick donne l'index de la classe cliquée ; binValues, appelé avec les mêmes options, renvoie ses bornes et ses effectifs pour calculer la part des employés en dessous. renderTooltip affiche l'effectif et la part de chaque classe, et onPlotClick efface la sélection.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/histogram-chart/demos/commute.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  HistogramChart,
  binValues,
  type ChartAnnotation,
  type ChartHoverEvent,
} from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const DOMAIN = [0, 90] as const;
const BINS = 18;

// One-way commute (minutes) of 1,200 employees: walkers and cyclists around
// a quarter of an hour, train commuters around 45 minutes
const commutes = (() => {
  const random = mulberry32(2026);
  return Float64Array.from({ length: 1200 }, () => {
    const z =
      Math.sqrt(-2 * Math.log(random() || 1e-12)) *
      Math.cos(2 * Math.PI * random());
    const value = random() < 0.45 ? 16 + 6 * z : 46 + 12 * z;
    return Math.min(89.9, Math.max(2, value));
  });
})();

// the same options as the chart: the same bins, with their edges
const bins = binValues(commutes, { domain: DOMAIN, bins: BINS });
// share of the employees at or below the upper edge of every bin
const cumulative = bins.counts.map(
  (_, k) => bins.counts.slice(0, k + 1).reduce((a, b) => a + b, 0) / bins.total,
);

export default function CommuteDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.histogram-chart.data",
  });
  const locale = i18n.language;
  const [selected, setSelected] = useState<number | null>(null);

  const minutes = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "minute",
      unitDisplay: "short",
    });
    return (value: number) => format.format(value);
  }, [locale]);
  const percent = useMemo(
    () => new Intl.NumberFormat(locale, { style: "percent" }),
    [locale],
  );
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);

  const annotations = useMemo((): ChartAnnotation[] => {
    if (selected === null) return [];
    const edge = bins.edges[selected + 1] ?? 0;
    return [
      {
        type: "rect",
        x1: edge,
        color: "var(--primary-color)",
        opacity: 0.1,
        label: t("withinShare", {
          share: percent.format(cumulative[selected] ?? 0),
        }),
      },
      { type: "line", axis: "x", value: edge, color: "var(--primary-color)" },
    ];
  }, [selected, percent, t]);

  const tooltip = (event: ChartHoverEvent) => {
    const item = event.items.find((i) => i.seriesIndex === 0);
    if (!item) return null;
    return (
      <div style={{ display: "grid", gap: 2 }}>
        <strong>{item.label}</strong>
        <span>
          {t("employeesInBin", {
            value: number.format(item.y),
            share: percent.format(item.y / bins.total),
          })}
        </span>
        <span style={{ color: "var(--text-secondary-color)" }}>
          {t("clickForCumulative")}
        </span>
      </div>
    );
  };

  const edge = selected === null ? 0 : (bins.edges[selected + 1] ?? 0);
  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {selected === null
          ? t("clickBin")
          : t("cumulativeStatus", {
              share: percent.format(cumulative[selected] ?? 0),
              employees: number.format(
                Math.round((cumulative[selected] ?? 0) * bins.total),
              ),
              limit: minutes(edge),
            })}
      </output>
      <HistogramChart
        values={commutes}
        domain={DOMAIN}
        bins={BINS}
        name={t("employees")}
        formatBin={minutes}
        xAxis={{ title: t("commute"), format: minutes }}
        annotations={annotations}
        renderTooltip={tooltip}
        // the index of a bar is the index of its bin
        onPointClick={(event) => {
          const item = event.items.find((i) => i.seriesIndex === 0);
          if (item) setSelected(item.index);
        }}
        onPlotClick={() => setSelected(null)}
        height={320}
        ariaLabel={t("commuteAria")}
      />
    </div>
  );
}

```

## Example: Comparer deux échantillons

histogramSeries construit les barres d'un échantillon : avec le même domaine et le même nombre, deux échantillons partagent leurs classes et se placent côte à côte dans un Chart.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/histogram-chart/demos/comparison.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Chart,
  histogramSeries,
  type ChartSeries,
} from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Session duration (minutes) of an A/B test: the new onboarding keeps the
// users a little longer
const sample = (seed: number, scale: number) => {
  const random = mulberry32(seed);
  return Float64Array.from(
    { length: 8000 },
    () => -Math.log(1 - random()) * scale,
  );
};
const control = sample(1, 6);
const variant = sample(2, 7.4);

export default function ComparisonDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.histogram-chart.data",
  });

  // the same domain and bin count: both samples get the same bins, and the
  // bars of each bin sit side by side
  const series = useMemo((): ChartSeries[] => {
    const options = { domain: [0, 30] as const, bins: 15 };
    return [
      {
        ...histogramSeries(control, { ...options, name: t("control") }),
        id: "a",
      },
      {
        ...histogramSeries(variant, { ...options, name: t("variant") }),
        id: "b",
        color: "var(--chart-series-3, #f59e0b)",
      },
    ];
  }, [t]);

  return (
    <Chart
      series={series}
      xAxis={{ title: t("minutes") }}
      height={300}
      ariaLabel={t("abAria")}
    />
  );
}

```

## Example: Distribution des latences

Un million de latences classées en quelques millisecondes ; quantiles donne les p50, p95 et p99 exacts, dessinés en lignes de référence x.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/histogram-chart/demos/latency.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  HistogramChart,
  quantiles,
  type ChartAnnotation,
} from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// One million request latencies (ms): log-normal, with a slow tail
const latencies = (() => {
  const random = mulberry32(11);
  const values = new Float64Array(1_000_000);
  for (let i = 0; i < values.length; i++) {
    // Box-Muller
    const z =
      Math.sqrt(-2 * Math.log(random() || 1e-12)) *
      Math.cos(2 * Math.PI * random());
    values[i] =
      Math.exp(4.1 + 0.42 * z) + (random() < 0.02 ? 250 * random() : 0);
  }
  return values;
})();

export default function LatencyDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.histogram-chart.data",
  });
  const locale = i18n.language;
  const ms = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "millisecond",
      maximumFractionDigits: 0,
    });
    return (value: number) => format.format(value);
  }, [locale]);

  // exact percentiles: one sort of the million values
  const marks = useMemo(() => quantiles(latencies, [0.5, 0.95, 0.99]), []);
  const annotations = useMemo(
    (): ChartAnnotation[] =>
      (["p50", "p95", "p99"] as const).map((name, i) => ({
        type: "line",
        axis: "x",
        value: marks[i] ?? 0,
        color:
          i === 0
            ? "var(--success-color, #16a34a)"
            : i === 1
              ? "var(--warning-color, #f59e0b)"
              : "var(--danger-color, #dc2626)",
        label: `${name} ${ms(marks[i] ?? 0)}`,
      })),
    [marks, ms],
  );

  return (
    <HistogramChart
      values={latencies}
      domain={[0, 400]}
      bins={80}
      name={t("requests")}
      formatBin={ms}
      xAxis={{ format: ms }}
      annotations={annotations}
      height={320}
      ariaLabel={t("latencyAria")}
    />
  );
}

```

## Example: Fenêtre glissante en direct

Les temps d'attente des 600 derniers appels au support, mis à jour deux fois par seconde par un setInterval arrêté à la pause et au démontage. Un domain, un nombre de classes et une plage yAxis fixes gardent les axes immobiles pendant que la distribution évolue, et le relevé suit le niveau de service.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/histogram-chart/demos/live-samples.tsx

```tsx
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
import { HistogramChart, quantiles } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const WINDOW = 600; // calls kept in the histogram
const PER_TICK = 12; // calls answered every tick
const TARGET = 5; // minutes, the service level target

/**
 * Wait (minutes) of the call number `n` of a support line: exponential, its
 * mean rising and falling with the waves of callers. Derived from `n` alone,
 * so the stream is deterministic.
 */
const waitOf = (n: number) => {
  const random = mulberry32(n * 7919 + 1);
  const mean = 3.5 + 1.5 * Math.sin(n / 400);
  return -mean * Math.log(1 - random());
};

export default function LiveSamplesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.histogram-chart.data",
  });
  const locale = i18n.language;
  const [tick, setTick] = useState(0);
  const [running, setRunning] = useState(true);

  // 12 new calls every 500 ms, the oldest ones leave the window
  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => setTick((value) => value + 1), 500);
    return () => clearInterval(timer);
  }, [running]);

  // the last WINDOW calls
  const waits = useMemo(() => {
    const last = WINDOW + tick * PER_TICK;
    const values = new Float64Array(WINDOW);
    for (let i = 0; i < WINDOW; i++) values[i] = waitOf(last - WINDOW + i);
    return values;
  }, [tick]);
  const [p90 = 0] = useMemo(() => quantiles(waits, [0.9]), [waits]);
  const withinTarget =
    waits.reduce((n, value) => n + (value <= TARGET ? 1 : 0), 0) / WINDOW;

  const minutes = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "minute",
      unitDisplay: "short",
      maximumFractionDigits: 1,
    });
    return (value: number) => format.format(value);
  }, [locale]);
  const percent = useMemo(
    () => new Intl.NumberFormat(locale, { style: "percent" }),
    [locale],
  );
  const met = withinTarget >= 0.8;

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 8,
        }}
      >
        <Button
          size="small"
          variant="outline"
          onClick={() => setRunning((value) => !value)}
        >
          {running ? t("pause") : t("resume")}
        </Button>
        <Button size="small" variant="ghost" onClick={() => setTick(0)}>
          {t("reset")}
        </Button>
        <output
          aria-live="polite"
          style={{ color: "var(--text-secondary-color)" }}
        >
          {t("serviceLevel", {
            share: percent.format(withinTarget),
            target: minutes(TARGET),
            p90: minutes(p90),
          })}{" "}
          <strong
            style={{
              color: met ? "var(--success-color)" : "var(--danger-color)",
            }}
          >
            {met ? t("targetMet") : t("targetMissed")}
          </strong>
        </output>
      </div>
      <HistogramChart
        values={waits}
        // fixed bins and y range: the bars move, the axes stay still
        domain={[0, 20]}
        bins={40}
        nice={false}
        name={t("calls")}
        formatBin={minutes}
        xAxis={{ title: t("waitTime"), format: minutes }}
        yAxis={{ min: 0, max: 160 }}
        annotations={[
          {
            type: "line",
            axis: "x",
            value: TARGET,
            color: "var(--danger-color)",
            dash: [4, 4],
            label: t("target"),
          },
          {
            type: "line",
            axis: "x",
            value: p90,
            color: "var(--warning-color)",
            label: t("p90"),
          },
        ]}
        height={300}
        ariaLabel={t("callsAria")}
      />
    </div>
  );
}

```

## Example: Montants de commande en échelle log

Des montants sur trois ordres de grandeur sont regroupés selon leur logarithme, chaque classe couvre donc le même rapport ; formatBin et xAxis.format reconvertissent les bornes en dollars. Des annotations marquent la médiane, le p99 et les commandes qui ont droit à la livraison gratuite.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/histogram-chart/demos/order-values.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  HistogramChart,
  quantiles,
  type ChartAnnotation,
} from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const FREE_SHIPPING = 50; // $

// 40,000 orders of an online shop ($): most baskets are small, a few
// business orders reach thousands of dollars
const orders = (() => {
  const random = mulberry32(7);
  const values = new Float64Array(40_000);
  for (let i = 0; i < values.length; i++) {
    const z =
      Math.sqrt(-2 * Math.log(random() || 1e-12)) *
      Math.cos(2 * Math.PI * random());
    const business = random() < 0.04;
    values[i] = business ? Math.exp(6.2 + 0.7 * z) : Math.exp(3.6 + 0.65 * z);
  }
  return values;
})();
// binned on log10($): every bin is the same ratio wide (×1.26)
const logOrders = orders.map(Math.log10);

export default function OrderValuesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.histogram-chart.data",
  });
  const locale = i18n.language;

  // the bins and the axis are in log10($): format them back to dollars
  const usd = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      maximumSignificantDigits: 2,
    });
    return (log: number) => format.format(10 ** log);
  }, [locale]);
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
    [locale],
  );

  const [median, p99] = useMemo(() => quantiles(orders, [0.5, 0.99]), []);
  const eligible = useMemo(
    () =>
      orders.filter((value) => value >= FREE_SHIPPING).length / orders.length,
    [],
  );
  const annotations = useMemo(
    (): ChartAnnotation[] => [
      {
        type: "rect",
        x0: Math.log10(FREE_SHIPPING),
        color: "var(--success-color)",
        opacity: 0.08,
        label: t("freeShipping"),
        labelPosition: "top-right",
      },
      {
        type: "line",
        axis: "x",
        value: Math.log10(median ?? 1),
        dash: [4, 4],
        label: t("medianOrder", { value: usd(Math.log10(median ?? 1)) }),
      },
      {
        type: "line",
        axis: "x",
        value: Math.log10(p99 ?? 1),
        dash: [4, 4],
        color: "var(--warning-color)",
        label: t("p99Order", { value: usd(Math.log10(p99 ?? 1)) }),
      },
    ],
    [t, usd, median, p99],
  );

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {t("eligibleShare", {
          share: percent.format(eligible),
          threshold: usd(Math.log10(FREE_SHIPPING)),
        })}
      </output>
      <HistogramChart
        values={logOrders}
        domain={[0.5, 4]}
        bins={35}
        nice={false}
        name={t("orders")}
        formatBin={usd}
        xAxis={{ title: t("orderValue"), format: usd, tickCount: 8 }}
        annotations={annotations}
        height={320}
        ariaLabel={t("ordersAria")}
      />
    </div>
  );
}

```

## Example: Capabilité du procédé

Les diamètres de pièces usinées face à leur tolérance : des annotations rect et line marquent les limites de spécification et la prop series trace la courbe normale ajustée par-dessus les classes. Le relevé calcule le Cpk, et l'interrupteur montre le procédé une fois l'outil réglé.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/histogram-chart/demos/quality-control.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import {
  HistogramChart,
  type ChartAnnotation,
  type ChartSeries,
} from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Specification of a machined shaft: 25 mm ± 0.05 mm
const NOMINAL = 25;
const LSL = 24.95;
const USL = 25.05;
const DOMAIN = [24.94, 25.06] as const;
const BINS = 48;
const WIDTH = (DOMAIN[1] - DOMAIN[0]) / BINS;

/** 5,000 measured diameters, around `mean` */
const measure = (mean: number, sd: number) => {
  const random = mulberry32(42);
  const values = new Float64Array(5000);
  for (let i = 0; i < values.length; i++) {
    // Box-Muller
    const z =
      Math.sqrt(-2 * Math.log(random() || 1e-12)) *
      Math.cos(2 * Math.PI * random());
    values[i] = mean + sd * z;
  }
  return values;
};
// the worn tool cuts a little wide; after the adjustment the process is centered
const drifted = measure(25.021, 0.0125);
const centered = measure(25.001, 0.0115);

const statsOf = (values: Float64Array) => {
  let sum = 0;
  let out = 0;
  for (const v of values) {
    sum += v;
    if (v < LSL || v > USL) out++;
  }
  const mean = sum / values.length;
  let squares = 0;
  for (const v of values) squares += (v - mean) ** 2;
  const sd = Math.sqrt(squares / (values.length - 1));
  const cpk = Math.min(USL - mean, mean - LSL) / (3 * sd);
  return { mean, sd, cpk, ppm: (out / values.length) * 1e6 };
};

export default function QualityControlDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.histogram-chart.data",
  });
  const locale = i18n.language;
  const [adjusted, setAdjusted] = useState(false);
  const values = adjusted ? centered : drifted;
  const stats = useMemo(() => statsOf(values), [values]);

  const mm = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "millimeter",
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    });
    return (value: number) => format.format(value);
  }, [locale]);
  const decimal = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    [locale],
  );
  const integer = useMemo(
    () => new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }),
    [locale],
  );

  // the fitted normal curve, scaled to counts per bin
  const fit = useMemo((): ChartSeries[] => {
    const { mean, sd } = stats;
    const scale = (values.length * WIDTH) / (sd * Math.sqrt(2 * Math.PI));
    const data = Array.from({ length: 121 }, (_, i) => {
      const x = DOMAIN[0] + ((DOMAIN[1] - DOMAIN[0]) * i) / 120;
      return [x, scale * Math.exp(-(((x - mean) / sd) ** 2) / 2)] as const;
    });
    return [
      {
        name: t("normalFit"),
        type: "line",
        curve: "smooth",
        data,
        color: "var(--text-color)",
        tooltip: false,
      },
    ];
  }, [stats, values, t]);

  const annotations = useMemo(
    (): ChartAnnotation[] => [
      // out of specification on both sides
      { type: "rect", x1: LSL, color: "var(--danger-color)", opacity: 0.1 },
      { type: "rect", x0: USL, color: "var(--danger-color)", opacity: 0.1 },
      {
        type: "line",
        axis: "x",
        value: LSL,
        color: "var(--danger-color)",
        label: t("lsl"),
      },
      {
        type: "line",
        axis: "x",
        value: USL,
        color: "var(--danger-color)",
        label: t("usl"),
      },
      {
        type: "line",
        axis: "x",
        value: NOMINAL,
        dash: [4, 4],
        label: t("nominal"),
      },
    ],
    [t],
  );
  const capable = stats.cpk >= 1.33;

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <Switch
        checked={adjusted}
        onChange={setAdjusted}
        label={t("adjustTool")}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {t("capability", {
          mean: mm(stats.mean),
          sd: mm(stats.sd),
          cpk: decimal.format(stats.cpk),
          ppm: integer.format(stats.ppm),
        })}{" "}
        <strong
          style={{
            color: capable ? "var(--success-color)" : "var(--danger-color)",
          }}
        >
          {capable ? t("capable") : t("notCapable")}
        </strong>
      </output>
      <HistogramChart
        values={values}
        domain={DOMAIN}
        bins={BINS}
        nice={false}
        name={t("parts")}
        formatBin={mm}
        series={fit}
        xAxis={{ title: t("diameter"), format: mm }}
        annotations={annotations}
        height={320}
        ariaLabel={t("qualityAria")}
      />
    </div>
  );
}

```

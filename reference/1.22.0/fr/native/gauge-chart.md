# Jauge

Une seule valeur sur un arc, par rapport à une plage et à des seuils colorés facultatifs : KPI, taux d’utilisation, scores. Quand value change, l’arc (et l’aiguille) s’animent depuis leur position actuelle.

Package: minerva-design@1.22.0

Renderer: native

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

Processeur

Mémoire

Disque

Utilisation : {{metric}}

Net Promoter Score

Requêtes / s

Requêtes par seconde, mises à jour en direct

Mettre en pause

Reprendre

Vitesse

Compteur de vitesse : {{speed}}

Freiner

Accélérer

Stockage

Appels d'API

Postes

Minutes de build

{{used}} sur {{limit}}

{{quota}} : {{share}} du quota utilisé

Disponibilité, 30 jours

Objectif : {{value}}

Disponibilité sur 30 jours face à l'objectif

Budget d'erreur restant

{{used}} d'indisponibilité sur {{budget}} autorisées

Budget d'erreur restant ce mois-ci

Unité de température

°C

°F

consigne

Pièce : {{value}}

Température de consigne du thermostat

Baisser la consigne

Augmenter la consigne

Chauffe jusqu’à {{target}} (pièce : {{room}})

Refroidit jusqu’à {{target}} (pièce : {{room}})

Maintient {{target}} (pièce : {{room}})

Demandeur

score de crédit

Faible

Passable

Bon

Très bon

Exceptionnel

À {{share}} de l’échelle

Score de crédit de {{name}}

{{name}} : {{score}}. {{advice}}

La plupart des prêteurs refuseront la demande.

Un accord est possible, à un taux plus élevé.

Éligible à la plupart des prêts aux taux standards.

Éligible à des taux meilleurs que la moyenne.

Éligible aux meilleurs taux proposés.

chargée

Autonomie : {{range}}

Charge de la batterie de la voiture

Branchée

Réinitialiser

Charge complète

Débranchée

Charge rapide

Charge lente au-delà de 80 %

80 % dans {{minutes}}

{{value}} tr/min

{{value}} MW

Panneau sombre

Vitesse du rotor

Puissance produite

Température de la nacelle

{{reading}} de l’éolienne : {{value}}

## GaugeChart

Support: beta

Chart component of minerva-design/native: the canvas chart engine drawn with views (touch scrub, pinch zoom, legend toggles).

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "GaugeChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "value",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 0,
    "required": false,
    "description": "Value shown by the arc (clamped to `min` - `max` for the drawing)"
  },
  {
    "name": "min",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 0,
    "required": false,
    "description": "Value at the start of the arc"
  },
  {
    "name": "max",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 100,
    "required": false,
    "description": "Value at the end of the arc"
  },
  {
    "name": "label",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Caption under the value"
  },
  {
    "name": "sweep",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 240,
    "required": false,
    "description": "Total angle of the arc, degrees"
  },
  {
    "name": "thickness",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 0.16,
    "required": false,
    "description": "Thickness of the arc as a fraction of the radius"
  },
  {
    "name": "bands",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "array",
    "typeText": "readonly GaugeBand[] | undefined",
    "typeRef": "type:d2cd036beaf1add471a3",
    "required": false,
    "description": "Colored ranges of the track; the value arc takes the color of its band"
  },
  {
    "name": "color",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Color of the value arc (when there are no bands)"
  },
  {
    "name": "needle",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Draws a needle in addition to the value arc"
  },
  {
    "name": "ticks",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Tick labels at the ends (and at the band bounds)"
  },
  {
    "name": "palette",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "array",
    "typeText": "readonly string[] | undefined",
    "typeRef": "type:88dcb55e82bb1c501478",
    "required": false,
    "description": "Colors of the marks without `color` (defaults to the `chart-series-1..8` tokens, then the theme colors)"
  },
  {
    "name": "legend",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "union",
    "typeText": "boolean | ShapeLegendOptions | undefined",
    "typeRef": "type:b3cd5c49d86fb91effb3",
    "required": false,
    "description": "Legend; tapping an item hides / shows its slice, stage, series, node, bar, row or level"
  },
  {
    "name": "tooltip",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "union",
    "typeText": "boolean | ShapeTooltipOptions | undefined",
    "typeRef": "type:9441d8fe0edba7239796",
    "default": true,
    "required": false,
    "description": "Tooltip shown while a mark is pressed; `false` disables it"
  },
  {
    "name": "format",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "function",
    "typeText": "((value: number) => string) | undefined",
    "typeRef": "type:541b024ed1104992e34e",
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
    "description": "Formats the values of the labels and the tooltip"
  },
  {
    "name": "percentFormat",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "function",
    "typeText": "((share: number) => string) | undefined",
    "typeRef": "type:d92c3cd66b7afc0213bc",
    "parameters": [
      {
        "name": "share",
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
    "description": "Formats the shares (labels, conversion rates, tooltip); `share` is 0-1"
  },
  {
    "name": "hidden",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "array",
    "typeText": "readonly number[] | undefined",
    "typeRef": "type:9b11f9b3b1a7e709603e",
    "required": false,
    "description": "Hidden slices / stages / radar series / top-level treemap or sunburst nodes / sankey nodes / radial bars / bullet rows / calendar levels, by index. Makes the visibility controlled: legend taps then only call `onToggle`, whose `hiddenIndexes` should be stored and passed back."
  },
  {
    "name": "animation",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Entry and update animations (skipped when the theme reduces motion)"
  },
  {
    "name": "padding",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "object",
    "typeText": "ChartPadding | undefined",
    "typeRef": "type:7c2c76b2d4d6c9fbf43a",
    "required": false,
    "description": "Space around the drawing, in pixels"
  },
  {
    "name": "ariaLabel",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible name of the chart"
  },
  {
    "name": "locale",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "BCP 47 locale of the built-in texts (tooltip rows, accessible names, \"No data\") and of the numbers"
  },
  {
    "name": "texts",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "object",
    "typeText": "Partial<ShapeChartLabels> | undefined",
    "typeRef": "type:2ef787a978af6750b6c8",
    "required": false,
    "description": "Replaces built-in texts of the `locale`"
  },
  {
    "name": "height",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "union",
    "typeText": "DimensionValue | undefined",
    "typeRef": "type:cd08f9fa3f57e56425b7",
    "required": false,
    "description": "Height of the chart (the legend included)"
  },
  {
    "name": "width",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "union",
    "typeText": "DimensionValue | undefined",
    "typeRef": "type:cd08f9fa3f57e56425b7",
    "default": "100%",
    "required": false,
    "description": "Width of the chart"
  },
  {
    "name": "renderTooltip",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "node",
    "typeText": "((event: ShapeHoverEvent) => ReactNode) | undefined",
    "typeRef": "type:9333c89b3161f5ff3652",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ShapeHoverEvent",
        "typeRef": "type:019a32700cb7aa817346"
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
    "source": "packages/native/src/components/ShapeChart/types.ts",
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
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "function",
    "typeText": "((event: ShapeHoverEvent | null) => void) | undefined",
    "typeRef": "type:fa632874a08b24956e5f",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ShapeHoverEvent | null",
        "typeRef": "type:5ce60fcc1021d329ffba"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the highlighted mark changes (press and drag over the chart)"
  },
  {
    "name": "onClick",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "function",
    "typeText": "((event: ShapeHoverEvent) => void) | undefined",
    "typeRef": "type:8504b594a968c22eaac5",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ShapeHoverEvent",
        "typeRef": "type:019a32700cb7aa817346"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when a mark is tapped"
  },
  {
    "name": "onToggle",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "function",
    "typeText": "((event: ShapeToggleEvent) => void) | undefined",
    "typeRef": "type:d096120cd0ab66afae24",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ShapeToggleEvent",
        "typeRef": "type:4b4244045a32e66c0a25"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when a legend item is tapped (or the instance's `toggle()` is called), with the toggled index and every hidden index after the toggle"
  }
]
```

## API

```json
{
  "native:GaugeChartProps": {
    "source": "native/src/components/ShapeChart/types.ts",
    "description": "Props of GaugeChart",
    "kind": "interface",
    "extends": [
      "ShapeChartCommonProps"
    ],
    "props": [
      {
        "name": "value",
        "type": "number",
        "required": false,
        "default": "0",
        "description": "Value shown by the arc (clamped to `min` - `max` for the drawing)"
      },
      {
        "name": "min",
        "type": "number",
        "required": false,
        "default": "0",
        "description": "Value at the start of the arc"
      },
      {
        "name": "max",
        "type": "number",
        "required": false,
        "default": "100",
        "description": "Value at the end of the arc"
      },
      {
        "name": "label",
        "type": "string",
        "required": false,
        "description": "Caption under the value"
      },
      {
        "name": "sweep",
        "type": "number",
        "required": false,
        "default": "240",
        "description": "Total angle of the arc, degrees"
      },
      {
        "name": "thickness",
        "type": "number",
        "required": false,
        "default": "0.16",
        "description": "Thickness of the arc as a fraction of the radius"
      },
      {
        "name": "bands",
        "type": "readonly GaugeBand[]",
        "required": false,
        "description": "Colored ranges of the track; the value arc takes the color of its band"
      },
      {
        "name": "color",
        "type": "string",
        "required": false,
        "default": "the first palette color",
        "description": "Color of the value arc (when there are no bands)"
      },
      {
        "name": "needle",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Draws a needle in addition to the value arc"
      },
      {
        "name": "ticks",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Tick labels at the ends (and at the band bounds)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Plages et aiguille

bands colore la piste par plage (rouge, orange, vert) et l’arc de valeur prend la couleur de sa plage ; needle pointe la valeur, min peut être négatif.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/gauge-chart/native/bands.tsx

```tsx
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Button, GaugeChart, type GaugeBand } from "minerva-design/native";

// Net Promoter Score: -100 (everyone detracts) to +100 (everyone promotes)
const bands: GaugeBand[] = [
  { to: 0, color: "var(--danger-color)" },
  { to: 30, color: "var(--warning-color)" },
  { to: 100, color: "var(--success-color)" },
];

const signed = (value: number) => {
  const rounded = Math.round(value);
  return rounded > 0 ? `+${rounded}` : `${rounded}`;
};

export default function Bands() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.gauge-chart.native.data",
  });
  const [score, setScore] = useState(42);
  const change = (step: number) =>
    setScore((value) => Math.max(-100, Math.min(100, value + step)));
  return (
    <View style={{ width: "100%", gap: 12 }}>
      <GaugeChart
        value={score}
        min={-100}
        max={100}
        bands={bands}
        needle
        label={t("nps")}
        format={signed}
        height={240}
        ariaLabel={t("nps")}
      />
      <View style={{ flexDirection: "row", gap: 8, justifyContent: "center" }}>
        <Button variant="outline" onPress={() => change(-20)}>
          {t("lower")}
        </Button>
        <Button variant="outline" onPress={() => change(20)}>
          {t("raise")}
        </Button>
      </View>
    </View>
  );
}

```

## Example: Base

Trois petites jauges, chacune avec sa couleur, son libellé et son format.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/gauge-chart/native/basic.tsx

```tsx
import { useTranslation } from "react-i18next";
import { GaugeChart } from "minerva-design/native";

export default function Basic() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.gauge-chart.native.data",
  });
  const percent = new Intl.NumberFormat(i18n.language, {
    style: "percent",
    maximumFractionDigits: 0,
  });
  return (
    <GaugeChart
      value={72}
      label={t("storage")}
      format={(value) => percent.format(value / 100)}
      height={220}
      ariaLabel={t("storageAria")}
    />
  );
}

```

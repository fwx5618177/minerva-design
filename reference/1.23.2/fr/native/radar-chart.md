# Graphique radar

Compare un ou quelques éléments selon plusieurs indicateurs aux échelles différentes (compétences, tests de produits, profils aromatiques). Survolez un polygone pour le mettre en évidence avec l’indicateur le plus proche ; les flèches passent d’une série ou d’un indicateur à l’autre, Échap efface ; un clic sur la légende masque une série.

Package: minerva-design@1.23.2

Renderer: native

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.2",
  "sourceCommit": "c6618fd81b2d3c2a9016cfe13a1d15983d533ff7",
  "sourceDigest": "sha256:1ce1c857f10d367f112c6e77d88ae3878570c428c4d39ed7a400c8c99645e9f6",
  "referenceSourceDigest": "sha256:8f6e89c1e214fedc2e52de014615037c54204a8ec5c0dbb40c58dc530906571e"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.2/types.json) or getType() from minerva-design/contracts.

## Documentation

Résolution de problèmes

Programmation

Conception de systèmes

Communication

Collaboration

Responsabilité

Candidat

{{value}} / {{max}}

Grille d'entretien d'un candidat

Arôme

Acidité

Douceur

Corps

Amertume

Persistance

Éthiopie Yirgacheffe

Sumatra Mandheling

Profils aromatiques de deux cafés

Performances

Autonomie

Appareil photo

Écran

Rapport qualité-prix

Finition

Notes de test de trois téléphones

Survolez un polygone ou utilisez les flèches pour comparer les téléphones

Vitesse

Tir

Passe

Dribble

Défense

Physique

Attributs de deux footballeurs

Sécurité

Intégrations

Rapports

Mobile

Automatisation

Support

Prix

Notre produit

Principal concurrent

Moyenne du marché

Produits à comparer

Notes des capacités de notre produit, d'un concurrent et du marché

Protéines

Fibres

Sucres

Lipides

Sodium

Calcium

Porridge aux fruits

Œufs sur toast

Yaourt et granola

{{value}} VQ

{{meal}} : {{amount}} ({{share}})

Nutriments de trois petits-déjeuners, en pourcentage de la valeur quotidienne

CPU

Mémoire

E/S disque

Réseau

Latence

Erreurs

Moyenne de la dernière heure

Maintenant

Mises à jour en direct

Alerte : {{metric}} dépasse {{threshold}} de sa capacité.

Métrique la plus chargée : {{metric}}.

Charge actuelle du service comparée à la moyenne de la dernière heure

Communication

Livraison

Expertise

Collaboration

Mentorat

Initiative

Moyenne de l’équipe

Personne

Notes de l’évaluation à 360° de {{name}} comparées à la moyenne de l’équipe

Point fort : {{strength}} ({{strengthGap}} par rapport à l’équipe). À développer : {{growth}} ({{growthGap}}).

Chiffre d’affaires

Affaires gagnées

Taux de réussite

Montant moyen

Appels

NPS

Objectif

Réel

{{kpi}} : {{actual}} pour un objectif de {{target}} ({{attainment}}).

KPI trimestriels d’un commercial comparés à ses objectifs

Cliquez près d’un axe pour lire son KPI.

## RadarChart

Support: beta

Chart component of minerva-design/native: the canvas chart engine drawn with views (touch scrub, pinch zoom, legend toggles).

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "RadarChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "indicators",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "array",
    "typeText": "readonly RadarIndicator[]",
    "typeRef": "type:34b3e299c8b6bc4719af",
    "required": true,
    "description": "Axes of the chart, clockwise from 12 o'clock"
  },
  {
    "name": "series",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "array",
    "typeText": "readonly RadarSeries[]",
    "typeRef": "type:a583c277e67444a20bfd",
    "required": true,
    "description": "Polygons: one value per indicator"
  },
  {
    "name": "shape",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "enum",
    "values": [
      "circle",
      "polygon"
    ],
    "typeText": "\"circle\" | \"polygon\" | undefined",
    "typeRef": "type:527066bd3cb0cb309fbf",
    "default": "polygon",
    "required": false,
    "description": "Grid shape"
  },
  {
    "name": "levels",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 4,
    "required": false,
    "description": "Number of grid rings"
  },
  {
    "name": "dots",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Dots on the vertices"
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
  "native:RadarChartProps": {
    "source": "native/src/components/ShapeChart/types.ts",
    "description": "Props of RadarChart",
    "kind": "interface",
    "extends": [
      "ShapeChartCommonProps"
    ],
    "props": [
      {
        "name": "indicators",
        "type": "readonly RadarIndicator[]",
        "required": true,
        "description": "Axes of the chart, clockwise from 12 o'clock"
      },
      {
        "name": "series",
        "type": "readonly RadarSeries[]",
        "required": true,
        "description": "Polygons: one value per indicator"
      },
      {
        "name": "shape",
        "type": "\"polygon\" | \"circle\"",
        "required": false,
        "default": "\"polygon\"",
        "description": "Grid shape"
      },
      {
        "name": "levels",
        "type": "number",
        "required": false,
        "default": "4",
        "description": "Number of grid rings"
      },
      {
        "name": "dots",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Dots on the vertices"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Base

Une série sur six indicateurs avec max: 10 ; l’infobulle liste toutes les valeurs et met en gras l’indicateur sous le pointeur.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/radar-chart/native/basic.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { RadarChart } from "minerva-design/native";

// Interview scorecard of one candidate, each skill rated out of 10
const skills = [
  "problemSolving",
  "coding",
  "systemDesign",
  "communication",
  "collaboration",
  "ownership",
] as const;
const scores = [8.5, 9, 6.5, 7, 8, 9];

export default function Basic() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.radar-chart.native.data",
  });
  const number = new Intl.NumberFormat(i18n.language);
  const indicators = useMemo(
    () => skills.map((key) => ({ name: t(`skills.${key}`), max: 10 })),
    [t],
  );
  const series = useMemo(() => [{ name: t("candidate"), values: scores }], [t]);
  return (
    <RadarChart
      indicators={indicators}
      series={series}
      height={300}
      format={(value) => t("outOf10", { value: number.format(value) })}
      ariaLabel={t("scorecardAria")}
    />
  );
}

```

## Example: Comparer des produits

Avec trois séries, la légende s’affiche automatiquement ; onHover renvoie la série et l’indicateur le plus proche du pointeur.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/radar-chart/native/compare.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import { RadarChart, useTheme } from "minerva-design/native";

// Two phones rated out of 5 by a review site
const criteria = [
  "battery",
  "camera",
  "display",
  "performance",
  "price",
] as const;
const phones = [
  { name: "Nova X", values: [4.5, 3.5, 4, 3, 4.5] },
  { name: "Pixelon 9", values: [3.5, 5, 4.5, 4.5, 2.5] },
];

export default function Compare() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.radar-chart.native.data",
  });
  const { colors } = useTheme();
  const [hidden, setHidden] = useState<number[]>([]);
  const indicators = useMemo(
    () => criteria.map((key) => ({ name: t(`criteria.${key}`), max: 5 })),
    [t],
  );
  const visible = phones.filter((_, i) => !hidden.includes(i));
  return (
    <View style={{ width: "100%", gap: 8 }}>
      <RadarChart
        indicators={indicators}
        series={phones}
        shape="circle"
        levels={5}
        height={320}
        hidden={hidden}
        onToggle={(event) => setHidden(event.hiddenIndexes)}
        ariaLabel={t("phonesAria")}
      />
      <Text role="status" style={{ color: colors["text-secondary-color"] }}>
        {t("comparing", {
          phones: visible.map((phone) => phone.name).join(" · ") || "—",
        })}
      </Text>
    </View>
  );
}

```

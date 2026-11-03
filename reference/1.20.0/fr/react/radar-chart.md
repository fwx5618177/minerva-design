# Graphique radar

Compare un ou quelques éléments selon plusieurs indicateurs aux échelles différentes (compétences, tests de produits, profils aromatiques). Survolez un polygone pour le mettre en évidence avec l’indicateur le plus proche ; les flèches passent d’une série ou d’un indicateur à l’autre, Échap efface ; un clic sur la légende masque une série.

Package: minerva-design@1.20.0

Renderer: react

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.0",
  "sourceCommit": "e5692a82f25163efee65ef771fb64a94e61cb359",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:07db3eb36ff2e4b5bb88e238b04c82819862c70d739534f627e7b6c73c0c6ef1"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.0/types.json) or getType() from minerva-design/contracts.

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

Support: stable

### Import

```json
{
  "specifier": "minerva-design/charts",
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
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "array",
    "typeText": "readonly RadarIndicator[]",
    "typeRef": "type:34b3e299c8b6bc4719af",
    "required": true,
    "description": "Axes of the chart, clockwise from 12 o'clock"
  },
  {
    "name": "series",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "array",
    "typeText": "readonly RadarSeries[]",
    "typeRef": "type:a583c277e67444a20bfd",
    "required": true,
    "description": "Polygons: one value per indicator"
  },
  {
    "name": "shape",
    "source": "packages/charts/src/react/shapes.tsx",
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
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 4,
    "required": false,
    "description": "Number of grid rings"
  },
  {
    "name": "dots",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Dots on the vertices"
  },
  {
    "name": "height",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "required": false,
    "description": "Height of the chart (the legend included); numbers are pixels"
  },
  {
    "name": "width",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "default": "100%",
    "required": false,
    "description": "Width of the chart; numbers are pixels"
  },
  {
    "name": "renderer",
    "source": "packages/charts/src/react/shapes.tsx",
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
    "required": false,
    "description": "Backend of the shapes: `auto` tries WebGPU, then WebGL2, then WebGL, then Canvas2D, skipping GPUs running in software; text is always drawn with Canvas2D, above the shapes"
  },
  {
    "name": "palette",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "array",
    "typeText": "readonly string[] | undefined",
    "typeRef": "type:88dcb55e82bb1c501478",
    "required": false,
    "description": "Colors of the marks without `color` (defaults to the `--chart-series-1..8` CSS variables, then the theme colors)"
  },
  {
    "name": "legend",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "union",
    "typeText": "boolean | ShapeLegendOptions | undefined",
    "typeRef": "type:b3cd5c49d86fb91effb3",
    "required": false,
    "description": "Legend; clicking an item hides / shows its slice, stage, series, node, bar, row or level"
  },
  {
    "name": "tooltip",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "union",
    "typeText": "boolean | ShapeTooltipOptions | undefined",
    "typeRef": "type:9441d8fe0edba7239796",
    "default": true,
    "required": false,
    "description": "Tooltip; `false` disables it"
  },
  {
    "name": "format",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "function",
    "typeText": "((value: number) => string) | undefined",
    "typeRef": "type:f12d9d0b7c053d4d65a6",
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
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "function",
    "typeText": "((share: number) => string) | undefined",
    "typeRef": "type:5bfc1184b082171dcbfd",
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
    "name": "locale",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "BCP 47 locale of the texts and numbers the chart writes (tooltip rows, accessible names, number and percent formats, calendar dates); built-in texts in English, Chinese, Japanese and French (English otherwise)"
  },
  {
    "name": "texts",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "object",
    "typeText": "Partial<ShapeChartLabels> | undefined",
    "typeRef": "type:2ef787a978af6750b6c8",
    "required": false,
    "description": "Replaces built-in texts of the `locale` (tooltip rows, accessible names, \"No data\")"
  },
  {
    "name": "hidden",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "array",
    "typeText": "readonly number[] | undefined",
    "typeRef": "type:9b11f9b3b1a7e709603e",
    "required": false,
    "description": "Hidden slices / stages / radar series / top-level treemap or sunburst nodes / sankey nodes / radial bars / bullet rows / calendar levels, by index. Makes the visibility controlled: legend clicks then only call `onToggle`, whose `hiddenIndexes` should be stored and passed back. Leave undefined to let the legend hide / show entries by itself."
  },
  {
    "name": "animation",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Entry and update animations (skipped when the user prefers reduced motion)"
  },
  {
    "name": "padding",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "object",
    "typeText": "ChartPadding | undefined",
    "typeRef": "type:7c2c76b2d4d6c9fbf43a",
    "required": false,
    "description": "Space around the drawing, in pixels"
  },
  {
    "name": "ariaLabel",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible name of the chart"
  },
  {
    "name": "renderTooltip",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "node",
    "typeText": "((event: ShapeHoverEvent) => ReactNode) | undefined",
    "typeRef": "type:599537a71f6aca3767b8",
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
  }
]
```

### events

```json
[
  {
    "name": "onToggle",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "function",
    "typeText": "((event: ShapeToggleEvent) => void) | undefined",
    "typeRef": "type:c5e11f23fbce8c1aa9a2",
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
    "description": "Called when a legend item is clicked (or the instance's `toggle()` is called), with the toggled index and every hidden index after the toggle"
  },
  {
    "name": "onHover",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "function",
    "typeText": "((event: ShapeHoverEvent | null) => void) | undefined",
    "typeRef": "type:4d7c0df4667f26938fe6",
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
    "description": "Called when the hovered (or keyboard-focused) mark changes"
  },
  {
    "name": "onClick",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "function",
    "typeText": "((event: ShapeHoverEvent) => void) | undefined",
    "typeRef": "type:e40dbbb538ff7cd7dda5",
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
    "description": "Called when a mark is clicked, tapped or activated with Enter"
  }
]
```

## API

```json
{
  "RadarChartProps": {
    "source": "charts/src/react/shapes.tsx",
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
  },
  "RadarIndicator": {
    "source": "charts/src/engine/shapes/types.ts",
    "description": "An axis of a radar chart",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "name",
        "type": "string",
        "required": true
      },
      {
        "name": "max",
        "type": "number",
        "required": false,
        "description": "Value at the rim; the largest value of the series when omitted"
      },
      {
        "name": "min",
        "type": "number",
        "required": false,
        "default": "0",
        "description": "Value at the center"
      }
    ]
  },
  "RadarSeries": {
    "source": "charts/src/engine/shapes/types.ts",
    "description": "A polygon of a radar chart",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "name",
        "type": "string",
        "required": false
      },
      {
        "name": "values",
        "type": "readonly number[]",
        "required": true,
        "description": "One value per indicator"
      },
      {
        "name": "color",
        "type": "string",
        "required": false
      },
      {
        "name": "opacity",
        "type": "number",
        "required": false,
        "default": "0.18",
        "description": "Fill opacity, 0-1"
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

### apps/docs/src/docs/pages/radar-chart/demos/basic.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  RadarChart,
  type RadarIndicator,
  type RadarSeries,
} from "minerva-design/charts";

// Interview scorecard of one candidate, each skill rated out of 10
const skills = [
  "problemSolving",
  "coding",
  "systemDesign",
  "communication",
  "collaboration",
  "ownership",
];
const scores = [8.5, 9, 6.5, 7, 8, 9];

export default function BasicDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.radar-chart.data",
  });
  const locale = i18n.language;

  const indicators = useMemo(
    (): RadarIndicator[] =>
      skills.map((skill) => ({ name: t(`skills.${skill}`), max: 10 })),
    [t],
  );
  const series = useMemo(
    (): RadarSeries[] => [{ name: t("candidate"), values: scores }],
    [t],
  );
  const decimal = useMemo(() => new Intl.NumberFormat(locale), [locale]);

  return (
    <RadarChart
      indicators={indicators}
      series={series}
      format={(value) => t("outOf", { value: decimal.format(value), max: 10 })}
      height={340}
      ariaLabel={t("scorecardAria")}
    />
  );
}

```

## Example: Capacités d'un produit

Notes d'analystes d'un produit, d'un concurrent et de la moyenne du marché. hidden rend la visibilité contrôlée : les cases à cocher et la légende (onToggle) partagent le même état.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/radar-chart/demos/capabilities.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Checkbox, HStack } from "minerva-design";
import {
  RadarChart,
  type RadarIndicator,
  type RadarSeries,
} from "minerva-design/charts";

// Analyst ratings (1-5) of a product against a competitor and the market
const capabilities = [
  "security",
  "integrations",
  "reporting",
  "mobile",
  "automation",
  "support",
  "pricing",
];
const products = [
  { key: "ours", values: [4.5, 3.8, 4.2, 3.1, 4.6, 4.4, 3.5] },
  { key: "competitor", values: [3.9, 4.7, 3.6, 4.4, 3.2, 3.5, 3.9] },
  { key: "market", values: [3.5, 3.6, 3.4, 3.5, 3.3, 3.6, 3.7] },
];

export default function CapabilitiesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.radar-chart.data",
  });
  // controlled visibility: the checkboxes and the legend share one state
  const [hidden, setHidden] = useState<number[]>([]);

  const indicators = useMemo(
    (): RadarIndicator[] =>
      capabilities.map((key) => ({
        name: t(`capabilities.${key}`),
        min: 0,
        max: 5,
      })),
    [t],
  );
  const series = useMemo(
    (): RadarSeries[] =>
      products.map(({ key, values }) => ({
        name: t(`products.${key}`),
        values,
        opacity: key === "market" ? 0.05 : 0.2,
      })),
    [t],
  );
  const decimal = new Intl.NumberFormat(i18n.language, {
    minimumFractionDigits: 1,
  });
  const toggle = (index: number, visible: boolean) =>
    setHidden((current) =>
      visible ? current.filter((i) => i !== index) : [...current, index],
    );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <HStack gap={16} role="group" aria-label={t("compareWith")}>
        {series.map((item, index) => (
          <Checkbox
            key={item.name}
            label={item.name}
            checked={!hidden.includes(index)}
            onChange={(checked) => toggle(index, checked)}
          />
        ))}
      </HStack>
      <RadarChart
        indicators={indicators}
        series={series}
        hidden={hidden}
        onToggle={(event) => setHidden([...event.hiddenIndexes])}
        format={(value) => decimal.format(value)}
        height={380}
        ariaLabel={t("capabilitiesAria")}
      />
    </div>
  );
}

```

## Example: Grille circulaire

shape="circle" trace des anneaux ronds, levels en fixe le nombre et dots={false} masque les sommets ; opacity renforce les remplissages.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/radar-chart/demos/circle.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  RadarChart,
  type RadarIndicator,
  type RadarSeries,
} from "minerva-design/charts";

// Cupping notes of two coffees, each attribute scored from 0 to 5
const attributes = [
  "aroma",
  "acidity",
  "sweetness",
  "body",
  "bitterness",
  "aftertaste",
];
const coffees = [
  { key: "ethiopia", values: [4.6, 4.4, 3.8, 2.4, 1.6, 3.9] },
  { key: "sumatra", values: [3.6, 1.8, 3.1, 4.7, 3.9, 4.2] },
];

export default function CircleDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.radar-chart.data",
  });
  const locale = i18n.language;

  const indicators = useMemo(
    (): RadarIndicator[] =>
      attributes.map((key) => ({ name: t(`flavor.${key}`), max: 5 })),
    [t],
  );
  const series = useMemo(
    (): RadarSeries[] =>
      coffees.map(({ key, values }) => ({
        name: t(`coffees.${key}`),
        values,
        opacity: 0.25,
      })),
    [t],
  );
  const decimal = useMemo(() => new Intl.NumberFormat(locale), [locale]);

  return (
    <RadarChart
      indicators={indicators}
      series={series}
      shape="circle"
      levels={5}
      dots={false}
      format={(value) => decimal.format(value)}
      height={360}
      ariaLabel={t("coffeeAria")}
    />
  );
}

```

## Example: Comparer des produits

Avec trois séries, la légende s’affiche automatiquement ; onHover renvoie la série et l’indicateur le plus proche du pointeur.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/radar-chart/demos/compare.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  RadarChart,
  type RadarIndicator,
  type RadarSeries,
  type ShapeHoverEvent,
} from "minerva-design/charts";

// Review scores (0-100) of three phones
const criteria = [
  "performance",
  "battery",
  "camera",
  "display",
  "value",
  "build",
];
const series: RadarSeries[] = [
  { name: "Aurora X", values: [92, 68, 88, 90, 55, 86] },
  { name: "Nimbus 5", values: [74, 91, 70, 78, 88, 72] },
  { name: "Vertex Pro", values: [85, 80, 94, 84, 66, 93] },
];

export default function CompareDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.radar-chart.data",
  });
  const [hovered, setHovered] = useState<ShapeHoverEvent | null>(null);

  const indicators = useMemo(
    (): RadarIndicator[] =>
      criteria.map((key) => ({ name: t(`criteria.${key}`), max: 100 })),
    [t],
  );

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <RadarChart
        indicators={indicators}
        series={series}
        onHover={setHovered}
        height={380}
        ariaLabel={t("phonesAria")}
      />
      <p role="status">
        {hovered && hovered.indicator !== undefined
          ? `${hovered.name} · ${indicators[hovered.indicator].name}: ${t(
              "outOf",
              { value: hovered.value, max: 100 },
            )}`
          : t("hoverPolygon")}
      </p>
    </div>
  );
}

```

## Example: Supervision d’un service en direct

La charge actuelle est redessinée chaque seconde (setInterval, arrêté quand l’interrupteur est désactivé ou au démontage) par-dessus la moyenne de la dernière heure, et passe au rouge au-delà du seuil d’alerte. Seuls la métrique la plus chargée et l’état d’alerte sont annoncés, pas chaque rafraîchissement.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/radar-chart/demos/live-monitor.tsx

```tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import {
  RadarChart,
  type RadarIndicator,
  type RadarSeries,
} from "minerva-design/charts";

/** Small seeded random generator: the same "load" on every visit */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Load of a service, in percent of its capacity (latency and errors: of
// their objective); the baseline is the average of the last hour
const METRICS = ["cpu", "memory", "diskIo", "network", "latency", "errors"];
const BASELINE = [46, 58, 32, 41, 38, 22];
const ALERT = 85;

export default function LiveMonitorDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.radar-chart.data",
  });
  const [live, setLive] = useState(true);
  const [current, setCurrent] = useState(BASELINE);
  const random = useRef(mulberry32(11));

  useEffect(() => {
    if (!live) return;
    const timer = window.setInterval(() => {
      // a random walk per metric that drifts back toward its baseline
      const steps = METRICS.map(() => (random.current() - 0.45) * 18);
      setCurrent((values) =>
        values.map((value, i) =>
          Math.min(
            100,
            Math.max(0, value + steps[i] + (BASELINE[i] - value) * 0.15),
          ),
        ),
      );
    }, 1500);
    return () => window.clearInterval(timer);
  }, [live]);

  const indicators = useMemo(
    (): RadarIndicator[] =>
      METRICS.map((key) => ({ name: t(`monitor.metrics.${key}`), max: 100 })),
    [t],
  );
  const series = useMemo(
    (): RadarSeries[] => [
      {
        name: t("monitor.baseline"),
        values: BASELINE,
        color: "var(--text-secondary-color)",
        opacity: 0.04,
      },
      {
        name: t("monitor.now"),
        values: current,
        color:
          Math.max(...current) >= ALERT
            ? "var(--danger-color)"
            : "var(--primary-color)",
        opacity: 0.22,
      },
    ],
    [current, t],
  );
  const format = useMemo(() => {
    const percent = new Intl.NumberFormat(i18n.language, { style: "percent" });
    return (value: number) => percent.format(value / 100);
  }, [i18n.language]);

  const peak = current.indexOf(Math.max(...current));
  const alert = current[peak] >= ALERT;
  // no value in the message: it is announced when the busiest metric or
  // the alert state changes, not on every tick
  const status = alert
    ? t("monitor.alert", {
        metric: indicators[peak].name,
        threshold: format(ALERT),
      })
    : t("monitor.peak", { metric: indicators[peak].name });

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Switch checked={live} onChange={setLive} label={t("monitor.live")} />
      <RadarChart
        indicators={indicators}
        series={series}
        levels={4}
        format={format}
        height={360}
        ariaLabel={t("monitor.aria")}
      />
      <output
        aria-live="polite"
        style={{ color: alert ? "var(--danger-color)" : undefined }}
      >
        {status}
      </output>
    </div>
  );
}

```

## Example: Valeurs nutritionnelles de petits-déjeuners

Trois petits-déjeuners sur une grille circulaire (shape="circle", levels={5}), chaque axe en pourcentage de la valeur quotidienne. renderTooltip utilise l’indicator de l’évènement pour lister la quantité du nutriment survolé dans chaque repas.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/radar-chart/demos/nutrition.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  RadarChart,
  type RadarIndicator,
  type RadarSeries,
  type ShapeHoverEvent,
} from "minerva-design/charts";

// Nutrients of three breakfasts, with the reference daily values: the axes
// show the percent of the daily value, the tooltip the amounts
const NUTRIENTS = [
  { key: "protein", unit: "gram", daily: 50 },
  { key: "fiber", unit: "gram", daily: 28 },
  { key: "sugar", unit: "gram", daily: 50 },
  { key: "fat", unit: "gram", daily: 78 },
  { key: "sodium", unit: "mg", daily: 2300 },
  { key: "calcium", unit: "mg", daily: 1300 },
] as const;
const MEALS = [
  { key: "oatmeal", amounts: [10, 8, 12, 6, 120, 180], color: "#d97706" },
  { key: "eggs", amounts: [19, 3, 2, 15, 520, 110], color: "#2563eb" },
  { key: "yogurt", amounts: [17, 4, 24, 9, 140, 300], color: "#db2777" },
];

export default function NutritionDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.radar-chart.data",
  });
  const locale = i18n.language;

  // every axis from 0 to 50% of the daily value
  const indicators = useMemo(
    (): RadarIndicator[] =>
      NUTRIENTS.map(({ key }) => ({
        name: t(`nutrition.nutrients.${key}`),
        max: 50,
      })),
    [t],
  );
  const series = useMemo(
    (): RadarSeries[] =>
      MEALS.map(({ key, amounts, color }) => ({
        name: t(`nutrition.meals.${key}`),
        values: amounts.map((amount, i) => (amount / NUTRIENTS[i].daily) * 100),
        color,
        opacity: 0.12,
      })),
    [t],
  );
  const formats = useMemo(() => {
    const percent = new Intl.NumberFormat(locale, {
      style: "percent",
      maximumFractionDigits: 0,
    });
    // Intl has no milligram unit: "mg" is the same symbol in every language
    const number = new Intl.NumberFormat(locale);
    const grams = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "gram",
    });
    const amounts = NUTRIENTS.map(({ unit }) =>
      unit === "gram"
        ? (value: number) => grams.format(value)
        : (value: number) => `${number.format(value)} mg`,
    );
    return {
      dailyValue: (value: number) =>
        t("nutrition.dailyValue", { value: percent.format(value / 100) }),
      amount: (nutrient: number, value: number) => amounts[nutrient](value),
    };
  }, [locale, t]);

  // one row per breakfast for the nutrient under the pointer
  const tooltip = (event: ShapeHoverEvent) => {
    const nutrient = event.indicator ?? 0;
    return (
      <div style={{ display: "grid", gap: 2 }}>
        <strong>{indicators[nutrient].name}</strong>
        {MEALS.map((meal, i) => (
          <span
            key={meal.key}
            style={{
              fontWeight: series[i].name === event.name ? 600 : undefined,
            }}
          >
            {t("nutrition.row", {
              meal: series[i].name,
              amount: formats.amount(nutrient, meal.amounts[nutrient]),
              share: formats.dailyValue(series[i].values[nutrient]),
            })}
          </span>
        ))}
      </div>
    );
  };

  return (
    <RadarChart
      indicators={indicators}
      series={series}
      shape="circle"
      levels={5}
      format={formats.dailyValue}
      renderTooltip={tooltip}
      height={380}
      ariaLabel={t("nutrition.aria")}
    />
  );
}

```

## Example: Comparaison de joueurs

Deux footballeurs sur six attributs ; min et max sur les indicateurs resserrent chaque axe sur la plage 30-99 où les notes diffèrent, et chaque série fixe sa couleur.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/radar-chart/demos/players.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  RadarChart,
  type RadarIndicator,
  type RadarSeries,
} from "minerva-design/charts";

// Season ratings (0-99) of two forwards, the way football games show them
const attributes = [
  "pace",
  "shooting",
  "passing",
  "dribbling",
  "defending",
  "physical",
];
const players = [
  { name: "L. Moreau", values: [91, 86, 74, 89, 38, 70], color: "#2563eb" },
  { name: "K. Adeyemi", values: [78, 90, 82, 80, 52, 86], color: "#dc2626" },
];

export default function PlayersDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.radar-chart.data",
  });

  // the same scale on every axis: 30 at the center, 99 at the rim
  const indicators = useMemo(
    (): RadarIndicator[] =>
      attributes.map((key) => ({
        name: t(`football.${key}`),
        min: 30,
        max: 99,
      })),
    [t],
  );
  const series = useMemo(
    (): RadarSeries[] => players.map((player) => ({ ...player, opacity: 0.2 })),
    [],
  );

  return (
    <RadarChart
      indicators={indicators}
      series={series}
      levels={3}
      height={360}
      ariaLabel={t("playersAria")}
    />
  );
}

```

## Example: Évaluation à 360°

Un Select choisit la personne dont les notes sont tracées sur la moyenne de l’équipe ; la garder en deuxième série fait s’animer le polygone sur place. La ligne en dessous nomme son principal point fort et son principal écart par rapport à l’équipe.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/radar-chart/demos/review-360.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Select, SelectItem } from "minerva-design";
import {
  RadarChart,
  type RadarIndicator,
  type RadarSeries,
} from "minerva-design/charts";

// 360° review: average rating (1-5) of each person by their peers, manager
// and reports, against the average of the team
const COMPETENCIES = [
  "communication",
  "delivery",
  "expertise",
  "collaboration",
  "mentoring",
  "initiative",
];
const TEAM = [3.8, 3.9, 3.7, 4.0, 3.4, 3.6];
const PEOPLE: { name: string; ratings: number[] }[] = [
  { name: "Amélie Laurent", ratings: [4.4, 3.7, 4.1, 4.5, 4.2, 3.5] },
  { name: "Marcus Chen", ratings: [3.3, 4.6, 4.7, 3.6, 2.9, 4.1] },
  { name: "Sade Okafor", ratings: [4.1, 4.0, 3.4, 4.3, 3.8, 4.4] },
  { name: "Jonas Romero", ratings: [3.5, 3.2, 4.4, 3.4, 3.1, 3.0] },
];

export default function Review360Demo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.radar-chart.data",
  });
  const locale = i18n.language;
  const [person, setPerson] = useState(0);

  const indicators = useMemo(
    (): RadarIndicator[] =>
      COMPETENCIES.map((key) => ({
        name: t(`review.competencies.${key}`),
        min: 1,
        max: 5,
      })),
    [t],
  );
  // the person always comes second, so their polygon animates in place
  const series = useMemo(
    (): RadarSeries[] => [
      {
        name: t("review.team"),
        values: TEAM,
        color: "var(--text-secondary-color)",
        opacity: 0.06,
      },
      {
        name: PEOPLE[person].name,
        values: PEOPLE[person].ratings,
        color: "var(--primary-color)",
        opacity: 0.25,
      },
    ],
    [person, t],
  );
  const format = useMemo(() => {
    const rating = new Intl.NumberFormat(locale, {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    });
    return (value: number) => rating.format(value);
  }, [locale]);
  const signed = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
    signDisplay: "exceptZero",
  });

  // largest positive and negative gaps to the team average
  const gaps = PEOPLE[person].ratings.map((rating, i) => rating - TEAM[i]);
  const strength = gaps.indexOf(Math.max(...gaps));
  const growth = gaps.indexOf(Math.min(...gaps));

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Select
        size="small"
        style={{ width: 220 }}
        aria-label={t("review.person")}
        value={String(person)}
        onChange={(value) => setPerson(Number(value))}
      >
        {PEOPLE.map((p, i) => (
          <SelectItem key={p.name} value={String(i)}>
            {p.name}
          </SelectItem>
        ))}
      </Select>
      <RadarChart
        indicators={indicators}
        series={series}
        levels={4}
        format={format}
        height={360}
        ariaLabel={t("review.aria", { name: PEOPLE[person].name })}
      />
      <output aria-live="polite">
        {t("review.summary", {
          strength: indicators[strength].name,
          strengthGap: signed.format(gaps[strength]),
          growth: indicators[growth].name,
          growthGap: signed.format(gaps[growth]),
        })}
      </output>
    </div>
  );
}

```

## Example: Objectifs commerciaux aux unités variées

Chaque indicateur a ses propres min et max : chiffre d’affaires, affaires gagnées, taux de réussite et NPS tiennent dans un seul graphique ; l’objectif est un contour non rempli. onClick et renderTooltip lisent l’indicator de l’évènement pour afficher la valeur réelle, l’objectif et l’atteinte d’un KPI.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/radar-chart/demos/sales-targets.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  RadarChart,
  type RadarIndicator,
  type RadarSeries,
  type ShapeHoverEvent,
} from "minerva-design/charts";

type Kind = "currency" | "count" | "percent" | "score";

// Quarterly KPIs of a sales rep: every axis has its own unit and scale
// (min / max); the unfilled outline is the target
const KPIS: {
  key: string;
  kind: Kind;
  actual: number;
  target: number;
  max: number;
}[] = [
  {
    key: "revenue",
    kind: "currency",
    actual: 412_000,
    target: 450_000,
    max: 500_000,
  },
  { key: "deals", kind: "count", actual: 18, target: 20, max: 25 },
  { key: "winRate", kind: "percent", actual: 0.31, target: 0.3, max: 0.4 },
  {
    key: "dealSize",
    kind: "currency",
    actual: 22_900,
    target: 22_500,
    max: 30_000,
  },
  { key: "calls", kind: "count", actual: 240, target: 300, max: 350 },
  { key: "nps", kind: "score", actual: 46, target: 50, max: 70 },
];

export default function SalesTargetsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.radar-chart.data",
  });
  const locale = i18n.language;
  const [selected, setSelected] = useState<ShapeHoverEvent | null>(null);

  const indicators = useMemo(
    (): RadarIndicator[] =>
      KPIS.map(({ key, max }) => ({
        name: t(`sales.kpis.${key}`),
        min: 0,
        max,
      })),
    [t],
  );
  const series = useMemo(
    (): RadarSeries[] => [
      {
        name: t("sales.target"),
        values: KPIS.map((kpi) => kpi.target),
        color: "var(--text-secondary-color)",
        opacity: 0,
      },
      {
        name: t("sales.actual"),
        values: KPIS.map((kpi) => kpi.actual),
        color: "var(--primary-color)",
        opacity: 0.25,
      },
    ],
    [t],
  );
  const formats = useMemo(() => {
    const byKind: Record<Kind, Intl.NumberFormat> = {
      currency: new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "USD",
        notation: "compact",
        maximumFractionDigits: 1,
      }),
      count: new Intl.NumberFormat(locale),
      percent: new Intl.NumberFormat(locale, { style: "percent" }),
      score: new Intl.NumberFormat(locale, { signDisplay: "exceptZero" }),
    };
    return {
      value: (kpi: number, value: number) =>
        byKind[KPIS[kpi].kind].format(value),
      attainment: (share: number) => byKind.percent.format(share),
    };
  }, [locale]);

  const line = (kpi: number) =>
    t("sales.line", {
      kpi: indicators[kpi].name,
      actual: formats.value(kpi, KPIS[kpi].actual),
      target: formats.value(kpi, KPIS[kpi].target),
      attainment: formats.attainment(KPIS[kpi].actual / KPIS[kpi].target),
    });

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <RadarChart
        indicators={indicators}
        series={series}
        renderTooltip={(event) =>
          event.indicator === undefined ? null : (
            <div style={{ display: "grid", gap: 2 }}>
              <strong>{indicators[event.indicator].name}</strong>
              <span>{line(event.indicator)}</span>
            </div>
          )
        }
        onClick={setSelected}
        height={380}
        ariaLabel={t("sales.aria")}
      />
      <p role="status" style={{ margin: 0 }}>
        {selected?.indicator !== undefined
          ? line(selected.indicator)
          : t("sales.hint")}
      </p>
    </div>
  );
}

```

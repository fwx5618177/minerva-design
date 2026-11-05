# Graphique à puces

Des barres d'indicateurs compactes (Stephen Few) : chaque ligne montre une mesure sous forme de barre sur des plages qualitatives (des gris, la plus mauvaise la plus foncée) avec un repère à sa cible, sur sa propre échelle. Les lignes peuvent mélanger les unités, un tableau de bord tient donc beaucoup d'indicateurs dans peu de place. Survolez une ligne ou utilisez les flèches pour lire sa valeur, sa cible et sa plage.

Package: minerva-design@1.21.1

Renderer: react

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.1",
  "sourceCommit": "fce5fba2180337e022f161113a8d4d5b12c50b7e",
  "sourceDigest": "sha256:ce2a20ef1952cc69de92d0733342905020d5135facebdf802e90ddda090ce31c",
  "referenceSourceDigest": "sha256:dd651b3ac3d2ec89388783f5919aefe9a683490b2f63c8d9a9142991a95a6b4c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.1/types.json) or getType() from minerva-design/contracts.

## Documentation

Chiffre d'affaires

milliers de dollars US

Marge

% du chiffre d'affaires

Panier moyen

dollars US

Nouveaux clients

nombre

Satisfaction

sur 5

Mauvais

Moyen

Bon

Non respecté

À risque

Sain

Indicateurs commerciaux du trimestre en cours face à leurs cibles

Paiement

Recherche

Mobile

Plateforme

Croissance

Données

Points livrés par chaque équipe face à son engagement

Disponibilité

% des requêtes

Apdex

score, 0–1

Débit

requêtes / s

Budget d'erreur

% restant

Objectifs de niveau de service de l'API ce mois-ci

Visiteurs

milliers

Inscriptions

comptes

Activation

% des inscriptions

Revenu mensuel récurrent

milliers de dollars US

Mois

Indicateurs de croissance du mois choisi face à leurs cibles

Clients grands comptes intégrés dans les 30 premiers jours suivant la signature

% des nouveaux comptes

Tickets de support prioritaires traités en moins d’une heure ouvrée

% des tickets

Mises en production déployées sans incident visible par les clients

% des déploiements

Rétention nette du chiffre d’affaires des abonnements annuels

ratio

KPI opérationnels aux noms longs comparés à leurs objectifs

Marketing

Ingénierie

Ventes

Ressources humaines

Services généraux

Déplacements

Budget annuel : {{budget}}

Confortable

Tendu

Hors plan

{{over}} services dépensent plus vite que prévu. Cliquez sur une ligne pour voir son écart.

{{department}} dépasse le plan : {{variance}} à la fin du T3, {{share}} du budget annuel consommé, {{left}} restants.

{{department}} respecte le plan : {{variance}} à la fin du T3, {{share}} du budget annuel consommé, {{left}} restants.

Dépenses de chaque service à la fin du T3 comparées au budget prévu à cette date

Température d’entrée

Humidité

Consommation

Vitesse des ventilateurs

°C

% relative

kW par baie

% de la vitesse max.

Normal

Alerte

Critique

Mesures en direct

Mesures des capteurs de la salle serveurs comparées à leurs consignes et seuils

À surveiller : {{sensors}}

Tous les capteurs sont dans leurs limites.

Distance de la semaine

Sortie longue

Dénivelé positif

Séances

Sommeil

plan : {{plan}}

Sous le plan

Dans le plan

Au-dessus du plan

Coureur

Amara

Lucas

Mei

{{value}} pour un plan de {{plan}} ({{share}})

Entraînement hebdomadaire de {{runner}} comparé au plan

{{runner}} a atteint {{met}} objectifs hebdomadaires sur {{metrics}}.

Ingénierie

Ventes

Support

Marketing

Produit

Finance

{{plan}} prévus cette année

En retard

En rattrapage

Dans les temps

Tri

Ordre du plan

Plus en retard d’abord

Plus en avance d’abord

Embauches de chaque équipe comparées au plan d’effectifs annuel

{{hired}} embauches sur {{planned}} prévues ({{share}}) pour les {{teams}} équipes affichées.

Aucune équipe affichée.

## BulletChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/charts",
  "exports": [
    "BulletChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "data",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "array",
    "typeText": "readonly BulletDatum[]",
    "typeRef": "type:fba4278e9d99ae80e03b",
    "required": true,
    "description": "Rows (columns when vertical): name, value, target, ranges and scale"
  },
  {
    "name": "orientation",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "enum",
    "values": [
      "horizontal",
      "vertical"
    ],
    "typeText": "\"horizontal\" | \"vertical\" | undefined",
    "typeRef": "type:4e4ac2a46972f482e8a6",
    "default": "horizontal",
    "required": false,
    "description": "Horizontal rows or vertical columns"
  },
  {
    "name": "ranges",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "array",
    "typeText": "readonly number[] | undefined",
    "typeRef": "type:9b11f9b3b1a7e709603e",
    "required": false,
    "description": "Qualitative ranges of the rows without `ranges`: upper bounds, ascending"
  },
  {
    "name": "rangeLabels",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "array",
    "typeText": "readonly string[] | undefined",
    "typeRef": "type:88dcb55e82bb1c501478",
    "required": false,
    "description": "Names of the qualitative ranges, lowest first (tooltip)"
  },
  {
    "name": "rangeColors",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "array",
    "typeText": "readonly string[] | undefined",
    "typeRef": "type:88dcb55e82bb1c501478",
    "required": false,
    "description": "Colors of the qualitative ranges, lowest first; shades of gray by default"
  },
  {
    "name": "barSize",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 0.4,
    "required": false,
    "description": "Thickness of the value bar as a fraction of the ranges' thickness"
  },
  {
    "name": "targetColor",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Color of the target markers"
  },
  {
    "name": "ticks",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Tick labels of the scales (when there is room)"
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
  "BulletChartProps": {
    "source": "charts/src/react/shapes.tsx",
    "description": "Props of BulletChart",
    "kind": "interface",
    "extends": [
      "ShapeChartCommonProps"
    ],
    "props": [
      {
        "name": "data",
        "type": "readonly BulletDatum[]",
        "required": true,
        "description": "Rows (columns when vertical): name, value, target, ranges and scale"
      },
      {
        "name": "orientation",
        "type": "\"horizontal\" | \"vertical\"",
        "required": false,
        "default": "\"horizontal\"",
        "description": "Horizontal rows or vertical columns"
      },
      {
        "name": "ranges",
        "type": "readonly number[]",
        "required": false,
        "description": "Qualitative ranges of the rows without `ranges`: upper bounds, ascending"
      },
      {
        "name": "rangeLabels",
        "type": "readonly string[]",
        "required": false,
        "description": "Names of the qualitative ranges, lowest first (tooltip)"
      },
      {
        "name": "rangeColors",
        "type": "readonly string[]",
        "required": false,
        "description": "Colors of the qualitative ranges, lowest first; shades of gray by default"
      },
      {
        "name": "barSize",
        "type": "number",
        "required": false,
        "default": "0.4",
        "description": "Thickness of the value bar as a fraction of the ranges' thickness"
      },
      {
        "name": "targetColor",
        "type": "string",
        "required": false,
        "default": "the text color",
        "description": "Color of the target markers"
      },
      {
        "name": "ticks",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Tick labels of the scales (when there is room)"
      }
    ]
  },
  "BulletDatum": {
    "source": "charts/src/engine/shapes/types.ts",
    "description": "A row of a bullet chart",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "name",
        "type": "string",
        "required": true,
        "description": "Name of the measure"
      },
      {
        "name": "subtitle",
        "type": "string",
        "required": false,
        "description": "Small text under the name (unit, period)"
      },
      {
        "name": "value",
        "type": "number",
        "required": true,
        "description": "Current value, drawn as the bar"
      },
      {
        "name": "target",
        "type": "number",
        "required": false,
        "description": "Target, drawn as the marker"
      },
      {
        "name": "ranges",
        "type": "readonly number[]",
        "required": false,
        "description": "Upper bounds of the qualitative ranges, ascending (e.g. poor / fair / good); the chart's `ranges` when omitted"
      },
      {
        "name": "min",
        "type": "number",
        "required": false,
        "default": "0 (or the smallest value when negative)",
        "description": "Start of the scale"
      },
      {
        "name": "max",
        "type": "number",
        "required": false,
        "description": "End of the scale; the largest of the ranges, the value and the target when omitted"
      },
      {
        "name": "color",
        "type": "string",
        "required": false,
        "description": "Color of the bar; the palette when omitted"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Suivi des budgets par service

Chaque ligne compare les dépenses à date au budget prévu à ce stade (target), et des ranges propres à chaque ligne marquent les zones confortable, tendue et hors plan. La barre passe au rouge via color quand un service dépense plus vite que prévu ; onClick affiche son écart sous le graphique.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/bullet-chart/demos/budget-tracker.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { BulletChart, type BulletDatum } from "minerva-design/charts";

// Spending of each department at the end of Q3, against its yearly budget
// (thousands of euros); the marker is the budget expected by now (75 %)
const DEPARTMENTS: [key: string, spent: number, budget: number][] = [
  ["marketing", 1380, 1600],
  ["engineering", 3920, 5400],
  ["sales", 1010, 1500],
  ["people", 560, 680],
  ["facilities", 702, 900],
  ["travel", 205, 320],
];
const ELAPSED = 0.75;

export default function BudgetTrackerDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bullet-chart.data",
  });
  const locale = i18n.language;
  const [selected, setSelected] = useState<number | null>(null);

  const money = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "EUR",
        notation: "compact",
        maximumFractionDigits: 1,
      }),
    [locale],
  );
  const signed = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "EUR",
        notation: "compact",
        maximumFractionDigits: 1,
        signDisplay: "exceptZero",
      }),
    [locale],
  );
  const percent = useMemo(
    () => new Intl.NumberFormat(locale, { style: "percent" }),
    [locale],
  );
  const format = (value: number) => money.format(value * 1000);

  // ranges: comfortable up to 90 % of the plan, then tight, then over plan;
  // departments spending faster than planned get a red bar
  const data = useMemo(
    (): BulletDatum[] =>
      DEPARTMENTS.map(([key, spent, budget]) => {
        const plan = budget * ELAPSED;
        return {
          name: t(`budget.departments.${key}`),
          subtitle: t("budget.yearly", {
            budget: money.format(budget * 1000),
          }),
          value: spent,
          target: plan,
          ranges: [plan * 0.9, plan, plan * 1.25],
          color: spent > plan ? "var(--danger-color)" : "var(--success-color)",
        };
      }),
    [money, t],
  );
  const rangeLabels = useMemo(
    () => [
      t("budget.ranges.comfortable"),
      t("budget.ranges.tight"),
      t("budget.ranges.over"),
    ],
    [t],
  );
  const over = DEPARTMENTS.filter(
    ([, spent, budget]) => spent > budget * ELAPSED,
  ).length;

  const detail = () => {
    if (selected === null) return t("budget.hint", { over });
    const [, spent, budget] = DEPARTMENTS[selected];
    const plan = budget * ELAPSED;
    return t(spent > plan ? "budget.overPlan" : "budget.underPlan", {
      department: data[selected].name,
      variance: signed.format((spent - plan) * 1000),
      share: percent.format(spent / budget),
      left: money.format(Math.max(0, budget - spent) * 1000),
    });
  };

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <BulletChart
        data={data}
        rangeLabels={rangeLabels}
        format={format}
        onClick={(event) => setSelected(event.index)}
        height={360}
        ariaLabel={t("budget.aria")}
      />
      <output aria-live="polite">{detail()}</output>
    </div>
  );
}

```

## Example: Plan de recrutement

Les embauches de chaque équipe comparées au plan d’effectifs annuel, avec un repère là où l’équipe devrait en être. Un Select trie les lignes selon le rythme ; legend avec hidden et onToggle masque des équipes, mémorisées par clé pour rester masquées quand l’ordre change, et le résumé additionne les équipes visibles.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/bullet-chart/demos/hiring-plan.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Select, SelectItem } from "minerva-design";
import { BulletChart, type BulletDatum } from "minerva-design/charts";

type Order = "plan" | "behind" | "ahead";

// Hires made so far this year by each team, against the yearly headcount
// plan; the marker is where the team should be by October (75 %)
const TEAMS: [key: string, hired: number, plan: number][] = [
  ["engineering", 31, 48],
  ["sales", 19, 22],
  ["support", 14, 16],
  ["marketing", 4, 9],
  ["product", 7, 8],
  ["finance", 2, 4],
];
const ON_TRACK = 0.75;
const ORDERS: Order[] = ["plan", "behind", "ahead"];
const pace = ([, hired, plan]: (typeof TEAMS)[number]) =>
  hired / (plan * ON_TRACK);

export default function HiringPlanDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bullet-chart.data",
  });
  const locale = i18n.language;
  const [order, setOrder] = useState<Order>("plan");
  // hidden teams are kept by key: the row indexes change with the order
  const [hiddenKeys, setHiddenKeys] = useState<string[]>([]);

  const rows = useMemo(() => {
    if (order === "plan") return TEAMS;
    const sign = order === "behind" ? 1 : -1;
    return [...TEAMS].sort((a, b) => sign * (pace(a) - pace(b)));
  }, [order]);
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);
  const data = useMemo(
    (): BulletDatum[] =>
      rows.map(([key, hired, plan]) => ({
        name: t(`hiring.teams.${key}`),
        subtitle: t("hiring.planned", { plan: number.format(plan) }),
        value: hired,
        target: plan * ON_TRACK,
        ranges: [plan * 0.5, plan * ON_TRACK, plan],
        max: plan,
      })),
    [number, rows, t],
  );
  const hidden = rows
    .map(([key], index) => (hiddenKeys.includes(key) ? index : -1))
    .filter((index) => index >= 0);
  const rangeLabels = useMemo(
    () => [
      t("hiring.ranges.behind"),
      t("hiring.ranges.catchingUp"),
      t("hiring.ranges.onTrack"),
    ],
    [t],
  );
  const percent = useMemo(
    () => new Intl.NumberFormat(locale, { style: "percent" }),
    [locale],
  );

  const visible = TEAMS.filter(([key]) => !hiddenKeys.includes(key));
  const hired = visible.reduce((sum, [, value]) => sum + value, 0);
  const planned = visible.reduce((sum, [, , value]) => sum + value, 0);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Select
        size="small"
        style={{ width: 220 }}
        aria-label={t("hiring.order")}
        value={order}
        onChange={(value) => setOrder(value as Order)}
      >
        {ORDERS.map((key) => (
          <SelectItem key={key} value={key}>
            {t(`hiring.orders.${key}`)}
          </SelectItem>
        ))}
      </Select>
      <BulletChart
        data={data}
        legend
        hidden={hidden}
        onToggle={(event) =>
          setHiddenKeys(event.hiddenIndexes.map((index) => rows[index][0]))
        }
        rangeLabels={rangeLabels}
        format={(value) => number.format(value)}
        height={380}
        ariaLabel={t("hiring.aria")}
      />
      <output aria-live="polite">
        {visible.length
          ? t("hiring.summary", {
              hired: number.format(hired),
              planned: number.format(planned),
              share: percent.format(hired / planned),
              teams: number.format(visible.length),
            })
          : t("hiring.none")}
      </output>
    </div>
  );
}

```

## Example: Capteurs d’une salle serveurs en direct

Les mesures se rafraîchissent chaque seconde (setInterval, arrêté quand l’interrupteur est désactivé ou au démontage) ; la target est la consigne et les ranges les seuils d’alerte et critique. La color de chaque barre suit son état, et seule la liste des capteurs hors limites est annoncée.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/bullet-chart/demos/live-sensors.tsx

```tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import { BulletChart, type BulletDatum } from "minerva-design/charts";

/** Small seeded random generator: the same readings on every visit */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Sensors of a server room: the setpoint (target), the warning and critical
// thresholds, and how much a reading can move per tick
const SENSORS: {
  key: string;
  setpoint: number;
  warning: number;
  critical: number;
  max: number;
  step: number;
}[] = [
  { key: "inlet", setpoint: 22, warning: 27, critical: 32, max: 40, step: 1.6 },
  {
    key: "humidity",
    setpoint: 45,
    warning: 60,
    critical: 70,
    max: 100,
    step: 4,
  },
  { key: "power", setpoint: 6, warning: 8, critical: 9.5, max: 12, step: 0.7 },
  { key: "fans", setpoint: 50, warning: 80, critical: 95, max: 100, step: 7 },
];
const SEED = 11;
const START = [24.5, 52, 7.1, 62];
const STATUS_COLORS = {
  ok: "var(--success-color)",
  warning: "#f59e0b",
  critical: "var(--danger-color)",
};

type Status = keyof typeof STATUS_COLORS;
const statusOf = (value: number, sensor: (typeof SENSORS)[number]): Status =>
  value >= sensor.critical
    ? "critical"
    : value >= sensor.warning
      ? "warning"
      : "ok";

export default function LiveSensorsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bullet-chart.data",
  });
  const locale = i18n.language;
  const [live, setLive] = useState(true);
  const [readings, setReadings] = useState(START);
  const random = useRef(mulberry32(SEED));

  useEffect(() => {
    if (!live) return;
    const timer = window.setInterval(() => {
      // a random walk with a slight upward drift, pulled back to the setpoint
      const moves = SENSORS.map(
        (sensor) => (random.current() - 0.42) * 2 * sensor.step,
      );
      setReadings((current) =>
        current.map((value, i) => {
          const sensor = SENSORS[i];
          const next = value + moves[i] + (sensor.setpoint - value) * 0.08;
          return Math.min(sensor.max, Math.max(0, next));
        }),
      );
    }, 1000);
    return () => window.clearInterval(timer);
  }, [live]);

  const number = useMemo(
    () => new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }),
    [locale],
  );
  const statuses = readings.map((value, i) => statusOf(value, SENSORS[i]));
  const data = useMemo(
    (): BulletDatum[] =>
      SENSORS.map((sensor, i) => ({
        name: t(`sensors.names.${sensor.key}`),
        subtitle: t(`sensors.units.${sensor.key}`),
        value: readings[i],
        target: sensor.setpoint,
        ranges: [sensor.warning, sensor.critical, sensor.max],
        max: sensor.max,
        color: STATUS_COLORS[statusOf(readings[i], sensor)],
      })),
    [readings, t],
  );
  const rangeLabels = useMemo(
    () => [
      t("sensors.status.ok"),
      t("sensors.status.warning"),
      t("sensors.status.critical"),
    ],
    [t],
  );
  const alerts = SENSORS.filter((_, i) => statuses[i] !== "ok").map((sensor) =>
    t(`sensors.names.${sensor.key}`),
  );
  const list = new Intl.ListFormat(locale, { type: "conjunction" });

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Switch checked={live} onChange={setLive} label={t("sensors.live")} />
      <BulletChart
        data={data}
        rangeLabels={rangeLabels}
        animation={false}
        format={(value) => number.format(value)}
        height={300}
        ariaLabel={t("sensors.aria")}
      />
      {/* only the set of sensors out of range is announced */}
      <output aria-live="polite">
        {alerts.length
          ? t("sensors.alerts", { sensors: list.format(alerts) })
          : t("sensors.allOk")}
      </output>
    </div>
  );
}

```

## Example: Noms longs

La colonne des libellés est mesurée : elle s’élargit jusqu’au nom le plus long, dans la limite de 40 % de la largeur ; les noms plus longs passent sur deux lignes et se terminent par des points de suspension. Survolez une ligne (ou donnez-lui le focus au clavier) pour lire le nom complet dans l’infobulle.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/bullet-chart/demos/long-names.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BulletChart, type BulletDatum } from "minerva-design/charts";

// Operational KPIs with long, descriptive names: the label column grows to
// fit them (up to 40% of the width), then the names wrap to two lines with
// an ellipsis; the tooltip shows the full name
const KPIS: {
  key: string;
  value: number;
  target: number;
  ranges: number[];
}[] = [
  { key: "onboarding", value: 78, target: 85, ranges: [60, 75, 100] },
  { key: "support", value: 87, target: 90, ranges: [70, 85, 100] },
  { key: "deployments", value: 96.4, target: 98, ranges: [90, 95, 100] },
  { key: "renewals", value: 1.18, target: 1.1, ranges: [0.9, 1.05, 1.3] },
];

export default function LongNamesDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.bullet-chart.data",
  });

  const data = useMemo(
    (): BulletDatum[] =>
      KPIS.map(({ key, ...kpi }) => ({
        name: t(`long.${key}`),
        subtitle: t(`long.${key}Unit`),
        ...kpi,
      })),
    [t],
  );
  const rangeLabels = useMemo(
    () => [t("ranges.poor"), t("ranges.fair"), t("ranges.good")],
    [t],
  );

  return (
    <BulletChart
      data={data}
      rangeLabels={rangeLabels}
      ariaLabel={t("longAria")}
    />
  );
}

```

## Example: Mois par mois

Choisir un autre mois anime les barres vers les nouvelles valeurs. Avec legend, cliquer sur un indicateur de la légende masque / affiche sa ligne.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/bullet-chart/demos/monthly.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { BulletChart, type BulletDatum } from "minerva-design/charts";

type Metric = "visitors" | "signups" | "activation" | "mrr";

// Growth KPIs of the first half of 2026 against their monthly targets
const METRICS: Metric[] = ["visitors", "signups", "activation", "mrr"];
const TARGETS: Record<Metric, number> = {
  visitors: 120,
  signups: 4800,
  activation: 45,
  mrr: 210,
};
const RANGES: Record<Metric, number[]> = {
  visitors: [80, 110, 150],
  signups: [3000, 4500, 6000],
  activation: [30, 40, 60],
  mrr: [150, 200, 260],
};
const MONTHS: Record<Metric, number>[] = [
  { visitors: 86, signups: 3100, activation: 34, mrr: 162 },
  { visitors: 94, signups: 3550, activation: 37, mrr: 171 },
  { visitors: 108, signups: 4020, activation: 41, mrr: 184 },
  { visitors: 117, signups: 4410, activation: 43, mrr: 196 },
  { visitors: 129, signups: 4930, activation: 46, mrr: 207 },
  { visitors: 141, signups: 5380, activation: 49, mrr: 223 },
];

export default function MonthlyDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bullet-chart.data",
  });
  const [month, setMonth] = useState(2);
  const locale = i18n.language;

  const monthNames = useMemo(() => {
    const format = new Intl.DateTimeFormat(locale, {
      month: "short",
      timeZone: "UTC",
    });
    return MONTHS.map((_, i) => format.format(Date.UTC(2026, i, 1)));
  }, [locale]);
  const data = useMemo(
    (): BulletDatum[] =>
      METRICS.map((metric) => ({
        name: t(`growth.${metric}`),
        subtitle: t(`growth.${metric}Unit`),
        value: MONTHS[month][metric],
        target: TARGETS[metric],
        ranges: RANGES[metric],
      })),
    [month, t],
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("monthLabel")}
        direction="horizontal"
        value={month}
        onChange={(value) => setMonth(Number(value))}
      >
        {monthNames.map((name, i) => (
          <Radio key={name} value={i} label={name} />
        ))}
      </RadioGroup>
      <BulletChart data={data} legend ariaLabel={t("growthAria")} />
    </div>
  );
}

```

## Example: Tableau de bord commercial

Cinq indicateurs avec leurs unités et leurs échelles. ranges donne les bornes mauvais / moyen / bon de chaque ligne, target le repère, subtitle l'unité ; rangeLabels nomme les plages dans l'infobulle.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/bullet-chart/demos/sales.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BulletChart, type BulletDatum } from "minerva-design/charts";

// Quarter-to-date sales KPIs, each on its own scale: ranges are the
// poor / fair / good bounds, the marker is the quarter's target
const KPIS: {
  key: string;
  value: number;
  target: number;
  ranges: number[];
}[] = [
  { key: "revenue", value: 270, target: 250, ranges: [150, 225, 300] },
  { key: "profit", value: 22.5, target: 26, ranges: [20, 25, 30] },
  { key: "orderSize", value: 320, target: 550, ranges: [350, 500, 600] },
  { key: "customers", value: 1650, target: 2100, ranges: [1400, 2000, 2500] },
  { key: "satisfaction", value: 4.6, target: 4.4, ranges: [3.5, 4.25, 5] },
];

export default function SalesDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.bullet-chart.data",
  });

  const data = useMemo(
    (): BulletDatum[] =>
      KPIS.map(({ key, ...kpi }) => ({
        name: t(`sales.${key}`),
        subtitle: t(`sales.${key}Unit`),
        ...kpi,
      })),
    [t],
  );
  const rangeLabels = useMemo(
    () => [t("ranges.poor"), t("ranges.fair"), t("ranges.good")],
    [t],
  );

  return (
    <BulletChart
      data={data}
      rangeLabels={rangeLabels}
      ariaLabel={t("salesAria")}
    />
  );
}

```

## Example: Plages en feux tricolores

rangeColors remplace les gris par du rouge, de l'orange et du vert translucides, et targetColor colore les repères. min fait commencer l'échelle de disponibilité à 99 % pour que l'écart entre 99,9 % et 99,95 % se voie.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/bullet-chart/demos/traffic-lights.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BulletChart, type BulletDatum } from "minerva-design/charts";

// Service level objectives of an API this month. Availability starts its
// scale at 99% (min) so that the interesting part is visible.
const SLOS: BulletDatum[] = [
  {
    name: "availability",
    value: 99.95,
    target: 99.9,
    ranges: [99.5, 99.9, 100],
    min: 99,
  },
  { name: "apdex", value: 0.91, target: 0.94, ranges: [0.7, 0.85, 1] },
  { name: "throughput", value: 1240, target: 1000, ranges: [800, 1200, 1600] },
  { name: "budget", value: 38, target: 50, ranges: [25, 50, 100] },
];

// red / amber / green, translucent so that they suit both themes
const TRAFFIC_LIGHTS = [
  "rgba(239, 68, 68, 0.3)",
  "rgba(245, 158, 11, 0.3)",
  "rgba(34, 197, 94, 0.3)",
];

const format = (value: number) =>
  value >= 100 ? String(Math.round(value)) : String(+value.toFixed(2));

export default function TrafficLightsDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.bullet-chart.data",
  });

  const data = useMemo(
    (): BulletDatum[] =>
      SLOS.map((slo) => ({
        ...slo,
        name: t(`slo.${slo.name}`),
        subtitle: t(`slo.${slo.name}Unit`),
        color: "var(--text-color)",
      })),
    [t],
  );
  const rangeLabels = useMemo(
    () => [t("ranges.breach"), t("ranges.atRisk"), t("ranges.healthy")],
    [t],
  );

  return (
    <BulletChart
      data={data}
      rangeColors={TRAFFIC_LIGHTS}
      rangeLabels={rangeLabels}
      targetColor="#2563eb"
      barSize={0.3}
      format={format}
      ariaLabel={t("sloAria")}
    />
  );
}

```

## Example: Plan d’entraînement hebdomadaire

Un Select change de coureur et les barres s’animent vers sa semaine. Chaque ligne a l’échelle de son propre plan, donc ticks={false} masque les graduations sans unité ; renderTooltip formate la valeur et le plan avec les unités d’Intl.NumberFormat (km, m, h) et donne la part du plan.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/bullet-chart/demos/training.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Select, SelectItem } from "minerva-design";
import { BulletChart, type BulletDatum } from "minerva-design/charts";

type Runner = "amara" | "lucas" | "mei";
type Metric = "distance" | "longRun" | "elevation" | "sessions" | "sleep";

// Weekly training of three marathon runners against their coach's plan
const METRICS: Metric[] = [
  "distance",
  "longRun",
  "elevation",
  "sessions",
  "sleep",
];
// unit of each metric, formatted with Intl.NumberFormat (null: a plain count)
const UNITS: Record<Metric, string | null> = {
  distance: "kilometer",
  longRun: "kilometer",
  elevation: "meter",
  sessions: null,
  sleep: "hour",
};
const PLANS: Record<Runner, Record<Metric, number>> = {
  amara: { distance: 85, longRun: 30, elevation: 900, sessions: 6, sleep: 56 },
  lucas: { distance: 60, longRun: 24, elevation: 500, sessions: 5, sleep: 52 },
  mei: { distance: 72, longRun: 28, elevation: 1200, sessions: 6, sleep: 56 },
};
const WEEKS: Record<Runner, Record<Metric, number>> = {
  amara: { distance: 88, longRun: 31, elevation: 760, sessions: 6, sleep: 49 },
  lucas: { distance: 47, longRun: 18, elevation: 540, sessions: 4, sleep: 54 },
  mei: { distance: 74, longRun: 26, elevation: 1310, sessions: 5, sleep: 58 },
};
const RUNNERS = Object.keys(PLANS) as Runner[];

export default function TrainingDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bullet-chart.data",
  });
  const locale = i18n.language;
  const [runner, setRunner] = useState<Runner>("amara");

  const formats = useMemo(
    () =>
      Object.fromEntries(
        METRICS.map((metric) => {
          const unit = UNITS[metric];
          return [
            metric,
            new Intl.NumberFormat(
              locale,
              unit ? { style: "unit", unit, unitDisplay: "short" } : {},
            ),
          ];
        }),
      ) as Record<Metric, Intl.NumberFormat>,
    [locale],
  );
  const percent = useMemo(
    () => new Intl.NumberFormat(locale, { style: "percent" }),
    [locale],
  );

  // every row is scaled on its own plan: below 80 %, 80-100 %, above
  const data = useMemo(
    (): BulletDatum[] =>
      METRICS.map((metric) => {
        const plan = PLANS[runner][metric];
        return {
          name: t(`training.metrics.${metric}`),
          subtitle: t("training.plan", {
            plan: formats[metric].format(plan),
          }),
          value: WEEKS[runner][metric],
          target: plan,
          ranges: [plan * 0.8, plan, plan * 1.25],
        };
      }),
    [formats, runner, t],
  );
  const rangeLabels = useMemo(
    () => [
      t("training.ranges.under"),
      t("training.ranges.onPlan"),
      t("training.ranges.above"),
    ],
    [t],
  );
  const met = METRICS.filter(
    (metric) => WEEKS[runner][metric] >= PLANS[runner][metric],
  ).length;

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Select
        size="small"
        style={{ width: 200 }}
        aria-label={t("training.runner")}
        value={runner}
        onChange={(value) => setRunner(value as Runner)}
      >
        {RUNNERS.map((key) => (
          <SelectItem key={key} value={key}>
            {t(`training.runners.${key}`)}
          </SelectItem>
        ))}
      </Select>
      <BulletChart
        data={data}
        rangeLabels={rangeLabels}
        ticks={false}
        renderTooltip={(row) => {
          const metric = METRICS[row.index];
          return (
            <div style={{ display: "grid", gap: 2 }}>
              <strong>{row.name}</strong>
              <span>
                {t("training.tooltip", {
                  value: formats[metric].format(row.value),
                  plan: formats[metric].format(PLANS[runner][metric]),
                  share: percent.format(row.percent),
                })}
              </span>
            </div>
          );
        }}
        height={320}
        ariaLabel={t("training.aria", {
          runner: t(`training.runners.${runner}`),
        })}
      />
      <output aria-live="polite">
        {t("training.summary", {
          runner: t(`training.runners.${runner}`),
          met,
          metrics: METRICS.length,
        })}
      </output>
    </div>
  );
}

```

## Example: Vertical

orientation="vertical" transforme les lignes en colonnes, ici les points livrés par chaque équipe face à son engagement. Les plages sont communes à toutes les colonnes grâce à la prop ranges du graphique ; barSize épaissit les barres.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/bullet-chart/demos/vertical.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { BulletChart, type BulletDatum } from "minerva-design/charts";

// Story points delivered by each team in the last sprint, against its
// commitment; the qualitative ranges are shared by every team
const TEAMS: [key: string, delivered: number, committed: number][] = [
  ["checkout", 42, 40],
  ["search", 31, 38],
  ["mobile", 46, 45],
  ["platform", 24, 30],
  ["growth", 37, 34],
  ["data", 28, 32],
];

export default function VerticalDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.bullet-chart.data",
  });

  const data = useMemo(
    (): BulletDatum[] =>
      TEAMS.map(([key, value, target]) => ({
        name: t(`teams.${key}`),
        value,
        target,
      })),
    [t],
  );
  const rangeLabels = useMemo(
    () => [t("ranges.poor"), t("ranges.fair"), t("ranges.good")],
    [t],
  );

  return (
    <BulletChart
      data={data}
      orientation="vertical"
      ranges={[25, 35, 50]}
      rangeLabels={rangeLabels}
      barSize={0.5}
      height={320}
      ariaLabel={t("teamsAria")}
    />
  );
}

```

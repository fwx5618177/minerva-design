# Treemap

Des rectangles imbriqués dont l’aire est proportionnelle aux valeurs : on voit d’un coup d’œil ce qui prend le plus de place dans une hiérarchie (espace disque, budgets, portefeuilles). Survolez ou utilisez les flèches pour mettre une cellule en évidence ; l’infobulle affiche son chemin.

Package: minerva-design@1.20.1

Renderer: react

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.1",
  "sourceCommit": "3a9f5cdaae706f14fe6d8c65c5481eba719a66c4",
  "sourceDigest": "sha256:c9ed2b706b61413d29e506a3f04f3d35c044a4b57ec0e284935054f9e1898c7e",
  "referenceSourceDigest": "sha256:6c9ecba0079f25e53cd971e51f2be8604fc3d941c0ed1cfeec03c4a91913ad73"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.1/types.json) or getType() from minerva-design/contracts.

## Documentation

Médias

Vidéos

Photos

Musique

Applications

Projets

Système

Bibliothèque

Caches

Journaux

Téléchargements

Programmes d'installation

Archives

Utilisation du disque par dossier

{{path}} : {{size}} ({{share}} du disque)

Cliquez sur une cellule pour voir où elle se trouve

Ingénierie

Ventes

Marketing

Succès client

Opérations

Finance

Ressources humaines

Juridique

Budget annuel par service

Technologie

Finance

Santé

Énergie

Consommation

Capitalisation : {{value}}

Carte du marché boursier par secteur, colorée selon la variation du jour

{{share}} du bundle

Taille du bundle JavaScript par module

Total {{size}} ; dépendances de plus de 100 Ko : {{modules}}.

Électronique

Maison

Mode

Sport

Téléphones

Ordinateurs portables

Audio

Cuisine

Meubles

Décoration

Femme

Homme

Enfant

Plein air

Fitness

Chemin dans le catalogue

Toutes les catégories

Chiffre d’affaires trimestriel par catégorie, sous-catégorie et marque

Chiffre d’affaires {{category}} par sous-catégorie et marque

{{path}} : {{revenue}}, soit {{share}} de la catégorie.

Cliquez sur une catégorie pour l’ouvrir.

Cliquez sur une marque pour lire son chiffre d’affaires.

Calcul

Bases de données

Stockage

Réseau

Observabilité

{{share}} de la facture

Coûts cloud mensuels par service et ressource

Affiché : {{visible}}, soit {{share}} de la facture de {{total}}.

Facture du mois : {{total}}.

Tout afficher

Mises à jour en direct

{{used}} sur {{limit}} ({{share}})

Mémoire utilisée par les pods du cluster, par namespace

Au-delà de {{threshold}} de leur limite mémoire : {{pods}}

Tous les pods sont sous {{threshold}} de leur limite mémoire.

Europe

Amériques

Asie-Pacifique

Mesure

Chiffre d’affaires

Commandes

Marge

{{share}} du total ({{metric}})

Ventes annuelles par région et par pays : {{metric}}

## TreemapChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/charts",
  "exports": [
    "TreemapChart"
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
    "typeText": "readonly TreemapNode[]",
    "typeRef": "type:eddc87b67d233941af29",
    "required": true,
    "description": "Nodes: leaves carry a value, parents sum their children"
  },
  {
    "name": "gap",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 2,
    "required": false,
    "description": "Gap between the cells, in pixels"
  },
  {
    "name": "headers",
    "source": "packages/charts/src/react/shapes.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Draws the names of the parents above their children"
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
  "TreemapChartProps": {
    "source": "charts/src/react/shapes.tsx",
    "description": "Props of TreemapChart",
    "kind": "interface",
    "extends": [
      "ShapeChartCommonProps"
    ],
    "props": [
      {
        "name": "data",
        "type": "readonly TreemapNode[]",
        "required": true,
        "description": "Nodes: leaves carry a value, parents sum their children"
      },
      {
        "name": "gap",
        "type": "number",
        "required": false,
        "default": "2",
        "description": "Gap between the cells, in pixels"
      },
      {
        "name": "headers",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Draws the names of the parents above their children"
      }
    ]
  },
  "TreemapNode": {
    "source": "charts/src/engine/shapes/types.ts",
    "description": "A node of a treemap or a sunburst: leaves carry a value, parents sum their children",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "name",
        "type": "string",
        "required": true,
        "description": "Name shown in the cell / sector, the header and the tooltip"
      },
      {
        "name": "value",
        "type": "number",
        "required": false,
        "description": "Value of a leaf (parents sum their children)"
      },
      {
        "name": "color",
        "type": "string",
        "required": false,
        "description": "Color; top-level nodes take the palette when omitted, children get shades of their parent's"
      },
      {
        "name": "children",
        "type": "readonly TreemapNode[]",
        "required": false,
        "description": "Child nodes"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Imbriqué

Les parents additionnent leurs enfants et affichent leur nom en en-tête ; onClick reçoit le chemin de la racine jusqu’à la feuille cliquée.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/treemap-chart/demos/basic.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  TreemapChart,
  type ShapeHoverEvent,
  type TreemapNode,
} from "minerva-design/charts";

// Disk usage of a laptop, in gigabytes. `key`s are translated, the
// application and project names are kept as they are
type Folder = {
  key?: string;
  name?: string;
  value?: number;
  children?: Folder[];
};
const disk: Folder[] = [
  {
    key: "media",
    children: [
      { key: "videos", value: 31.2 },
      { key: "photos", value: 24.3 },
      { key: "music", value: 6.4 },
    ],
  },
  {
    key: "applications",
    children: [
      { name: "Xcode", value: 12.4 },
      { name: "Docker", value: 9.8 },
      { name: "Figma", value: 1.2 },
      { name: "Chrome", value: 1.1 },
      { name: "Slack", value: 0.6 },
    ],
  },
  {
    key: "projects",
    children: [
      { name: "monorepo", value: 14.2 },
      { name: "design-assets", value: 4.3 },
      { name: "side-project", value: 1.6 },
    ],
  },
  {
    key: "system",
    children: [
      { key: "library", value: 11.8 },
      { key: "caches", value: 7.6 },
      { key: "logs", value: 2.1 },
    ],
  },
  {
    key: "downloads",
    children: [
      { key: "installers", value: 5.3 },
      { key: "archives", value: 3.9 },
    ],
  },
];

export default function BasicDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.treemap-chart.data",
  });
  const locale = i18n.language;
  const [selected, setSelected] = useState<ShapeHoverEvent | null>(null);

  const data = useMemo((): TreemapNode[] => {
    const translate = (folder: Folder): TreemapNode => ({
      name: folder.key ? t(`folders.${folder.key}`) : (folder.name ?? ""),
      value: folder.value,
      children: folder.children?.map(translate),
    });
    return disk.map(translate);
  }, [t]);
  const gigabytes = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "unit",
        unit: "gigabyte",
        maximumFractionDigits: 1,
      }),
    [locale],
  );
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
    [locale],
  );

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <TreemapChart
        data={data}
        format={(value) => gigabytes.format(value)}
        percentFormat={(share) => percent.format(share)}
        renderTooltip={(cell) => (
          <div style={{ display: "grid", gap: 2 }}>
            <strong>{(cell.path ?? [cell.name]).join(" › ")}</strong>
            <span>
              {gigabytes.format(cell.value)} · {percent.format(cell.percent)}
            </span>
          </div>
        )}
        onClick={setSelected}
        height={380}
        ariaLabel={t("diskAria")}
      />
      <p role="status">
        {selected
          ? t("diskSelected", {
              path: (selected.path ?? [selected.name]).join(" › "),
              size: gigabytes.format(selected.value),
              share: percent.format(selected.percent),
            })
          : t("clickCell")}
      </p>
    </div>
  );
}

```

## Example: Taille du bundle

Ce que montre un analyseur de bundle : les modules d'un bundle JavaScript selon leur taille minifiée, sur trois niveaux, et les dépendances les plus lourdes listées sous le graphique.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/treemap-chart/demos/bundle.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { TreemapChart, type TreemapNode } from "minerva-design/charts";

// Minified size (KB) of a web application's JavaScript bundle, by module
const bundle: TreemapNode[] = [
  {
    name: "node_modules",
    children: [
      { name: "react-dom", value: 131 },
      { name: "lodash", value: 72 },
      { name: "moment", value: 67 },
      { name: "moment/locale", value: 160 },
      { name: "chart.js", value: 204 },
      { name: "axios", value: 14 },
      { name: "zod", value: 57 },
      { name: "react", value: 7 },
    ],
  },
  {
    name: "src",
    children: [
      {
        name: "pages",
        children: [
          { name: "dashboard", value: 48 },
          { name: "settings", value: 22 },
          { name: "reports", value: 36 },
        ],
      },
      { name: "components", value: 61 },
      { name: "i18n", value: 28 },
      { name: "utils", value: 9 },
    ],
  },
];

// what a bundle analyzer would point out
const HEAVY = 100; // KB

const total = (node: TreemapNode): number =>
  node.value ?? (node.children ?? []).reduce((sum, c) => sum + total(c), 0);

export default function BundleDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.treemap-chart.data",
  });
  const locale = i18n.language;
  const kilobytes = useMemo(
    () => new Intl.NumberFormat(locale, { style: "unit", unit: "kilobyte" }),
    [locale],
  );
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
    [locale],
  );
  const size = bundle.reduce((sum, node) => sum + total(node), 0);
  const heavy = (bundle[0].children ?? []).filter((m) => total(m) >= HEAVY);

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <TreemapChart
        data={bundle}
        format={(value) => kilobytes.format(value)}
        percentFormat={(share) => percent.format(share)}
        renderTooltip={(cell) => (
          <div style={{ display: "grid", gap: 2 }}>
            <strong>{(cell.path ?? [cell.name]).join("/")}</strong>
            <span>
              {kilobytes.format(cell.value)} ·{" "}
              {t("ofBundle", { share: percent.format(cell.percent) })}
            </span>
          </div>
        )}
        height={360}
        ariaLabel={t("bundleAria")}
      />
      <p>
        {t("bundleSummary", {
          size: kilobytes.format(size),
          modules: heavy.map((m) => m.name).join(", "),
        })}
      </p>
    </div>
  );
}

```

## Example: Coûts cloud filtrés par la légende

legend={{ position: "top" }} liste les services ; hidden et onToggle rendent le filtre contrôlé, si bien qu’un bouton Tout afficher peut le réinitialiser et que le résumé peut additionner les services restants. renderTooltip affiche la part d’une ressource dans toute la facture.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/treemap-chart/demos/cloud-costs.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, HStack } from "minerva-design";
import { TreemapChart, type TreemapNode } from "minerva-design/charts";

// Cloud costs of one month (USD): services, then the resources (named as
// in the console) that make up each bill
const COSTS: [service: string, [string, number][]][] = [
  [
    "compute",
    [
      ["api-prod", 6200],
      ["workers", 3400],
      ["batch-jobs", 1800],
      ["staging", 900],
    ],
  ],
  [
    "databases",
    [
      ["analytics-warehouse", 4600],
      ["orders-db", 3800],
      ["session-cache", 650],
    ],
  ],
  [
    "storage",
    [
      ["media-bucket", 2100],
      ["backups", 1300],
      ["logs-archive", 700],
    ],
  ],
  [
    "network",
    [
      ["egress", 2400],
      ["cdn", 1250],
      ["nat-gateway", 420],
    ],
  ],
  [
    "observability",
    [
      ["logs", 1640],
      ["metrics", 1150],
      ["traces", 820],
    ],
  ],
];
const totals = COSTS.map(([, resources]) =>
  resources.reduce((sum, [, cost]) => sum + cost, 0),
);
const TOTAL = totals.reduce((sum, cost) => sum + cost, 0);

const legend = { position: "top" } as const;

export default function CloudCostsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.treemap-chart.data",
  });
  const locale = i18n.language;
  // controlled: the legend proposes, this state decides
  const [hidden, setHidden] = useState<number[]>([]);

  const data = useMemo(
    (): TreemapNode[] =>
      COSTS.map(([service, resources]) => ({
        name: t(`cloud.services.${service}`),
        children: resources.map(([name, value]) => ({ name, value })),
      })),
    [t],
  );
  const format = useMemo(() => {
    const money = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });
    return (value: number) => money.format(value);
  }, [locale]);
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
    [locale],
  );

  const visible = totals.reduce(
    (sum, cost, i) => (hidden.includes(i) ? sum : sum + cost),
    0,
  );

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <TreemapChart
        data={data}
        legend={legend}
        hidden={hidden}
        onToggle={(event) => setHidden(event.hiddenIndexes)}
        format={format}
        renderTooltip={(cell) => (
          <div style={{ display: "grid", gap: 2 }}>
            <strong>{(cell.path ?? [cell.name]).join(" › ")}</strong>
            <span>{format(cell.value)}</span>
            <span>
              {t("cloud.ofBill", { share: percent.format(cell.value / TOTAL) })}
            </span>
          </div>
        )}
        height={400}
        ariaLabel={t("cloud.aria")}
      />
      <HStack gap={8} wrap align="center">
        <output aria-live="polite">
          {hidden.length
            ? t("cloud.filtered", {
                visible: format(visible),
                share: percent.format(visible / TOTAL),
                total: format(TOTAL),
              })
            : t("cloud.total", { total: format(TOTAL) })}
        </output>
        <Button
          size="small"
          variant="ghost"
          disabled={hidden.length === 0}
          onClick={() => setHidden([])}
        >
          {t("cloud.showAll")}
        </Button>
      </HStack>
    </div>
  );
}

```

## Example: Exploration d’un catalogue

Un clic sur une catégorie (onClick, à partir du premier nom de event.path) remplace les données par ses sous-catégories et ses marques, et le fil d’Ariane revient à la vue d’ensemble. Dans une catégorie, un clic sélectionne une marque ; renderTooltip ajoute la catégorie au début du chemin.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/treemap-chart/demos/drill-down.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, HStack } from "minerva-design";
import {
  TreemapChart,
  type ShapeHoverEvent,
  type TreemapNode,
} from "minerva-design/charts";

// Quarterly revenue of an online store (thousand USD): categories,
// subcategories (translated) and brands (proper nouns)
const STORE: [category: string, [subcategory: string, [string, number][]][]][] =
  [
    [
      "electronics",
      [
        [
          "phones",
          [
            ["Aurora", 420],
            ["Nimbus", 260],
            ["Vertex", 180],
          ],
        ],
        [
          "laptops",
          [
            ["Aurora", 380],
            ["Kite", 240],
          ],
        ],
        [
          "audio",
          [
            ["Echo", 150],
            ["Pulse", 90],
          ],
        ],
      ],
    ],
    [
      "home",
      [
        [
          "kitchen",
          [
            ["Brava", 140],
            ["Cuisio", 95],
          ],
        ],
        [
          "furniture",
          [
            ["Loft", 210],
            ["Nordik", 160],
          ],
        ],
        [
          "decor",
          [
            ["Lumo", 70],
            ["Terra", 45],
          ],
        ],
      ],
    ],
    [
      "fashion",
      [
        [
          "women",
          [
            ["Mira", 230],
            ["Sola", 120],
          ],
        ],
        [
          "men",
          [
            ["Atlas", 150],
            ["Rivet", 80],
          ],
        ],
        ["kids", [["Pip", 75]]],
      ],
    ],
    [
      "sports",
      [
        [
          "outdoor",
          [
            ["Trek", 160],
            ["Summit", 90],
          ],
        ],
        [
          "fitness",
          [
            ["Core", 110],
            ["Stride", 65],
          ],
        ],
      ],
    ],
  ];

export default function DrillDownDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.treemap-chart.data",
  });
  const locale = i18n.language;
  // index of the opened category, null on the overview
  const [category, setCategory] = useState<number | null>(null);
  const [selected, setSelected] = useState<ShapeHoverEvent | null>(null);

  const tree = useMemo(
    (): TreemapNode[] =>
      STORE.map(([key, subcategories]) => ({
        name: t(`store.categories.${key}`),
        children: subcategories.map(([sub, brands]) => ({
          name: t(`store.subcategories.${sub}`),
          children: brands.map(([name, value]) => ({ name, value })),
        })),
      })),
    [t],
  );
  // inside a category, its subcategories become the top level
  const data = category === null ? tree : (tree[category].children ?? []);
  const format = useMemo(() => {
    const money = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    });
    return (value: number) => money.format(value * 1000);
  }, [locale]);
  const percentFormat = useMemo(() => {
    const percent = new Intl.NumberFormat(locale, {
      style: "percent",
      maximumFractionDigits: 1,
    });
    return (share: number) => percent.format(share);
  }, [locale]);

  const open = (index: number | null) => {
    setCategory(index);
    setSelected(null);
  };
  const onClick = (cell: ShapeHoverEvent) => {
    if (category !== null) return setSelected(cell);
    // the first name of the path is the clicked cell's category
    const index = tree.findIndex((node) => node.name === cell.path?.[0]);
    if (index >= 0) open(index);
  };
  const path = (cell: ShapeHoverEvent) =>
    [
      ...(category === null ? [] : [tree[category].name]),
      ...(cell.path ?? [cell.name]),
    ].join(" › ");

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <HStack
        gap={4}
        align="center"
        wrap
        as="nav"
        aria-label={t("store.breadcrumb")}
      >
        <Button
          size="small"
          variant={category === null ? "solid" : "ghost"}
          aria-current={category === null ? "location" : undefined}
          onClick={() => open(null)}
        >
          {t("store.all")}
        </Button>
        {category !== null && (
          <>
            <span aria-hidden>/</span>
            <strong aria-current="location">{tree[category].name}</strong>
          </>
        )}
      </HStack>
      <TreemapChart
        data={data}
        format={format}
        percentFormat={percentFormat}
        renderTooltip={(cell) => (
          <div style={{ display: "grid", gap: 2 }}>
            <strong>{path(cell)}</strong>
            <span>
              {format(cell.value)} · {percentFormat(cell.percent)}
            </span>
          </div>
        )}
        onClick={onClick}
        height={380}
        ariaLabel={
          category === null
            ? t("store.aria")
            : t("store.categoryAria", { category: tree[category].name })
        }
      />
      <p role="status" style={{ margin: 0 }}>
        {selected
          ? t("store.selected", {
              path: path(selected),
              revenue: format(selected.value),
              share: percentFormat(selected.percent),
            })
          : category === null
            ? t("store.hint")
            : t("store.hintBrand")}
      </p>
    </div>
  );
}

```

## Example: À plat

Sans enfants, chaque nœud est une feuille ; gap élargit l’espace entre les cellules.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/treemap-chart/demos/flat.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { TreemapChart, type TreemapNode } from "minerva-design/charts";

// Annual budget by department, in US dollars
const budget = [
  { key: "engineering", value: 4_200_000 },
  { key: "sales", value: 2_800_000 },
  { key: "marketing", value: 1_900_000 },
  { key: "success", value: 1_200_000 },
  { key: "operations", value: 900_000 },
  { key: "finance", value: 600_000 },
  { key: "people", value: 500_000 },
  { key: "legal", value: 300_000 },
];

export default function FlatDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.treemap-chart.data",
  });
  const locale = i18n.language;

  const data = useMemo(
    (): TreemapNode[] =>
      budget.map(({ key, value }) => ({
        name: t(`departments.${key}`),
        value,
      })),
    [t],
  );
  const currency = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "USD",
        notation: "compact",
        maximumFractionDigits: 1,
      }),
    [locale],
  );
  const percent = useMemo(
    () => new Intl.NumberFormat(locale, { style: "percent" }),
    [locale],
  );

  return (
    <TreemapChart
      data={data}
      format={(value) => currency.format(value)}
      percentFormat={(share) => percent.format(share)}
      renderTooltip={(cell) => (
        <div style={{ display: "grid", gap: 2 }}>
          <strong>{cell.name}</strong>
          <span>
            {currency.format(cell.value)} · {percent.format(cell.percent)}
          </span>
        </div>
      )}
      gap={4}
      height={320}
      ariaLabel={t("budgetAria")}
    />
  );
}

```

## Example: Mémoire d’un cluster en direct

La mémoire utilisée par chaque pod est rafraîchie toutes les 2 secondes (setInterval, arrêté quand l’interrupteur est désactivé ou au démontage) et les cases se redimensionnent sur place. Les pods au-delà de 85 % de leur limite passent au rouge via leur color, et seule la liste de ces pods est annoncée.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/treemap-chart/demos/live-cluster.tsx

```tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import { TreemapChart, type TreemapNode } from "minerva-design/charts";

/** Small seeded random generator: the same "cluster" on every visit */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Memory used by the pods of a Kubernetes cluster (MB), by namespace;
// every pod has a memory limit
const PODS: { namespace: string; pod: string; used: number; limit: number }[] =
  [
    { namespace: "checkout", pod: "api-7f9c", used: 820, limit: 1024 },
    { namespace: "checkout", pod: "api-b21d", used: 760, limit: 1024 },
    { namespace: "checkout", pod: "worker-5a0e", used: 410, limit: 512 },
    { namespace: "search", pod: "indexer-0", used: 1650, limit: 2048 },
    { namespace: "search", pod: "query-88c1", used: 540, limit: 1024 },
    { namespace: "search", pod: "query-3e47", used: 500, limit: 1024 },
    { namespace: "data", pod: "postgres-0", used: 2900, limit: 4096 },
    { namespace: "data", pod: "redis-0", used: 610, limit: 1024 },
    { namespace: "monitoring", pod: "prometheus-0", used: 1380, limit: 2048 },
    { namespace: "monitoring", pod: "grafana-6d2f", used: 230, limit: 512 },
  ];
const NAMESPACES = [...new Set(PODS.map((p) => p.namespace))];
const NEAR_LIMIT = 0.85;

export default function LiveClusterDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.treemap-chart.data",
  });
  const locale = i18n.language;
  const [live, setLive] = useState(true);
  const [used, setUsed] = useState(() => PODS.map((p) => p.used));
  const random = useRef(mulberry32(5));

  useEffect(() => {
    if (!live) return;
    const timer = window.setInterval(() => {
      // each pod drifts up or down by up to 8% of its limit
      const steps = PODS.map((p) => (random.current() - 0.48) * p.limit * 0.08);
      setUsed((current) =>
        current.map((value, i) =>
          Math.min(
            PODS[i].limit,
            Math.max(PODS[i].limit * 0.15, value + steps[i]),
          ),
        ),
      );
    }, 2000);
    return () => window.clearInterval(timer);
  }, [live]);

  // pods close to their limit turn red; the others take shades of their
  // namespace color
  const data = useMemo(
    (): TreemapNode[] =>
      NAMESPACES.map((namespace) => ({
        name: namespace,
        children: PODS.flatMap((p, i) =>
          p.namespace === namespace
            ? [
                {
                  name: p.pod,
                  value: used[i],
                  color:
                    used[i] / p.limit >= NEAR_LIMIT
                      ? "var(--danger-color)"
                      : undefined,
                },
              ]
            : [],
        ),
      })),
    [used],
  );
  const format = useMemo(() => {
    const megabytes = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "megabyte",
      maximumFractionDigits: 0,
    });
    return (value: number) => megabytes.format(value);
  }, [locale]);
  const percent = useMemo(
    () => new Intl.NumberFormat(locale, { style: "percent" }),
    [locale],
  );

  const pressured = PODS.filter((p, i) => used[i] / p.limit >= NEAR_LIMIT);

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <Switch checked={live} onChange={setLive} label={t("cluster.live")} />
      <TreemapChart
        data={data}
        gap={2}
        format={format}
        renderTooltip={(cell) => {
          const pod = PODS.findIndex((p) => p.pod === cell.name);
          return (
            <div style={{ display: "grid", gap: 2 }}>
              <strong>{(cell.path ?? [cell.name]).join(" / ")}</strong>
              <span>
                {pod < 0
                  ? format(cell.value)
                  : t("cluster.usage", {
                      used: format(cell.value),
                      limit: format(PODS[pod].limit),
                      share: percent.format(cell.value / PODS[pod].limit),
                    })}
              </span>
            </div>
          );
        }}
        height={360}
        ariaLabel={t("cluster.aria")}
      />
      {/* announced when the list of pods near their limit changes */}
      <output
        aria-live="polite"
        style={{ color: pressured.length ? "var(--danger-color)" : undefined }}
      >
        {pressured.length
          ? t("cluster.nearLimit", {
              pods: pressured.map((p) => p.pod).join(", "),
              threshold: percent.format(NEAR_LIMIT),
            })
          : t("cluster.healthy", { threshold: percent.format(NEAR_LIMIT) })}
      </output>
    </div>
  );
}

```

## Example: Carte du marché boursier

Des actions groupées par secteur, dimensionnées par capitalisation et colorées du rouge au vert selon la variation du jour, comme les cartes de marché des sites financiers ; la variation fait partie du nom de chaque cellule.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/treemap-chart/demos/market-map.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { TreemapChart, type TreemapNode } from "minerva-design/charts";

// Stocks by sector: the area is the market capitalization (billion USD),
// the color the change of the day (%), like the market maps of finance sites
const market: { sector: string; stocks: [string, number, number][] }[] = [
  {
    sector: "technology",
    stocks: [
      ["ACME", 2_950, 1.8],
      ["LUMA", 2_610, -0.6],
      ["QBIT", 1_420, 3.2],
      ["NOVA", 610, -2.4],
      ["CHIP", 380, 0.4],
    ],
  },
  {
    sector: "finance",
    stocks: [
      ["BANK", 540, -0.3],
      ["PAYX", 470, 0.9],
      ["SAFE", 260, -1.1],
    ],
  },
  {
    sector: "health",
    stocks: [
      ["CURE", 720, -1.7],
      ["GENE", 410, 2.6],
      ["MEDI", 300, 0.1],
    ],
  },
  {
    sector: "energy",
    stocks: [
      ["PETR", 450, -3.1],
      ["SOLR", 120, 4.4],
    ],
  },
  {
    sector: "consumer",
    stocks: [
      ["SHOP", 1_850, 0.7],
      ["DRNK", 280, -0.4],
      ["CARS", 690, -2.2],
    ],
  },
];

const RED = [246, 53, 56];
const GREY = [65, 69, 84];
const GREEN = [48, 204, 90];

/** -3% (or less) = red, 0 = grey, +3% (or more) = green */
const changeColor = (change: number) => {
  const amount = Math.min(1, Math.abs(change) / 3);
  const end = change < 0 ? RED : GREEN;
  const rgb = GREY.map((c, i) => Math.round(c + (end[i] - c) * amount));
  return `rgb(${rgb.join(", ")})`;
};

export default function MarketMapDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.treemap-chart.data",
  });
  const locale = i18n.language;
  const change = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
        signDisplay: "exceptZero",
      }),
    [locale],
  );
  const capitalization = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    });
    return (billions: number) => format.format(billions * 1e9);
  }, [locale]);

  // the change is part of the name, so the cells show "ACME +1.8%"
  const data = useMemo(
    (): TreemapNode[] =>
      market.map(({ sector, stocks }) => ({
        name: t(`sectors.${sector}`),
        color: "#262931",
        children: stocks.map(([symbol, cap, pct]) => ({
          name: `${symbol} ${change.format(pct / 100)}`,
          value: cap,
          color: changeColor(pct),
        })),
      })),
    [t, change],
  );

  return (
    <TreemapChart
      data={data}
      gap={1}
      format={capitalization}
      renderTooltip={(cell) => (
        <div style={{ display: "grid", gap: 2 }}>
          <strong>{(cell.path ?? [cell.name]).join(" › ")}</strong>
          <span>{t("marketCap", { value: capitalization(cell.value) })}</span>
        </div>
      )}
      legend={false}
      height={400}
      ariaLabel={t("marketAria")}
    />
  );
}

```

## Example: Changer de mesure

Le même arbre est dimensionné par le chiffre d’affaires, les commandes ou la marge : changer de mesure déplace et redimensionne les cases au lieu de les redessiner, et format suit la mesure. Les noms de pays viennent d’Intl.DisplayNames et renderTooltip liste toutes les mesures d’un pays.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/treemap-chart/demos/metric-switch.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { TreemapChart, type TreemapNode } from "minerva-design/charts";

type Metric = "revenue" | "orders" | "profit";
const METRICS: Metric[] = ["revenue", "orders", "profit"];

// Yearly sales by region and country (ISO code): revenue and profit in
// thousand USD, orders in units. The metrics rank the countries differently
const SALES: [
  region: string,
  [country: string, revenue: number, orders: number, profit: number][],
][] = [
  [
    "europe",
    [
      ["FR", 1840, 21_400, 310],
      ["DE", 2260, 19_800, 420],
      ["GB", 1630, 24_900, 190],
      ["ES", 780, 12_300, 95],
      ["IT", 910, 11_100, 160],
    ],
  ],
  [
    "americas",
    [
      ["US", 4120, 38_600, 690],
      ["CA", 960, 9_800, 170],
      ["BR", 720, 15_200, 60],
      ["MX", 540, 10_400, 70],
    ],
  ],
  [
    "asiaPacific",
    [
      ["JP", 1480, 13_200, 330],
      ["AU", 870, 8_100, 150],
      ["KR", 690, 9_900, 120],
      ["SG", 420, 3_600, 110],
    ],
  ],
];
const COLUMN: Record<Metric, 1 | 2 | 3> = { revenue: 1, orders: 2, profit: 3 };

export default function MetricSwitchDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.treemap-chart.data",
  });
  const locale = i18n.language;
  const [metric, setMetric] = useState<Metric>("revenue");

  // country names in the reader's language; the same tree for every
  // metric, so the cells move and resize instead of being redrawn
  const { data, byName } = useMemo(() => {
    const regions = new Intl.DisplayNames([locale], { type: "region" });
    const byName = new Map<string, [number, number, number]>();
    const data: TreemapNode[] = SALES.map(([region, countries]) => ({
      name: t(`sales.regions.${region}`),
      children: countries.map(([code, ...values]) => {
        const name = regions.of(code) ?? code;
        byName.set(name, values);
        return { name, value: values[COLUMN[metric] - 1] };
      }),
    }));
    return { data, byName };
  }, [locale, metric, t]);
  const formats = useMemo(() => {
    const money = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      notation: "compact",
      maximumFractionDigits: 1,
    });
    const number = new Intl.NumberFormat(locale, {
      notation: "compact",
      maximumFractionDigits: 1,
    });
    return {
      revenue: (value: number) => money.format(value * 1000),
      orders: (value: number) => number.format(value),
      profit: (value: number) => money.format(value * 1000),
    };
  }, [locale]);
  const percent = useMemo(
    () => new Intl.NumberFormat(locale, { style: "percent" }),
    [locale],
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("sales.metric")}
        direction="horizontal"
        value={metric}
        onChange={(value) => setMetric(value as Metric)}
      >
        {METRICS.map((m) => (
          <Radio key={m} value={m} label={t(`sales.metrics.${m}`)} />
        ))}
      </RadioGroup>
      <TreemapChart
        data={data}
        format={formats[metric]}
        renderTooltip={(cell) => {
          const values = byName.get(cell.name);
          return (
            <div style={{ display: "grid", gap: 2 }}>
              <strong>{(cell.path ?? [cell.name]).join(" › ")}</strong>
              {values ? (
                METRICS.map((m, i) => (
                  <span
                    key={m}
                    style={{ fontWeight: m === metric ? 600 : undefined }}
                  >
                    {t(`sales.metrics.${m}`)}: {formats[m](values[i])}
                  </span>
                ))
              ) : (
                <span>{formats[metric](cell.value)}</span>
              )}
              <span>
                {t("sales.shareOf", {
                  share: percent.format(cell.percent),
                  metric: t(`sales.metrics.${metric}`),
                })}
              </span>
            </div>
          );
        }}
        height={380}
        ariaLabel={t("sales.aria", { metric: t(`sales.metrics.${metric}`) })}
      />
    </div>
  );
}

```

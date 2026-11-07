# Treemap

Des rectangles imbriqués dont l’aire est proportionnelle aux valeurs : on voit d’un coup d’œil ce qui prend le plus de place dans une hiérarchie (espace disque, budgets, portefeuilles). Survolez ou utilisez les flèches pour mettre une cellule en évidence ; l’infobulle affiche son chemin.

Package: minerva-design@1.22.2

Renderer: native

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.2",
  "sourceCommit": "b19e53ff0733e666aa205d6fd5bebb89b1eef18d",
  "sourceDigest": "sha256:080b482abbb8d2745bf31d68a17d7a1299cbb89f0e3f8c1a4d1d91bdeb04d1be",
  "referenceSourceDigest": "sha256:2a0069aef643875e6528da29db3ea67e23924d3d3dcad8f2f45e0400ede619c0"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.2/types.json) or getType() from minerva-design/contracts.

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

Support: beta

Chart component of minerva-design/native: the canvas chart engine drawn with views (touch scrub, pinch zoom, legend toggles).

### Import

```json
{
  "specifier": "minerva-design/native",
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
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "array",
    "typeText": "readonly TreemapNode[]",
    "typeRef": "type:eddc87b67d233941af29",
    "required": true,
    "description": "Nodes: leaves carry a value, parents sum their children"
  },
  {
    "name": "gap",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 2,
    "required": false,
    "description": "Gap between the cells, in pixels"
  },
  {
    "name": "headers",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Draws the names of the parents above their children"
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
  "native:TreemapChartProps": {
    "source": "native/src/components/ShapeChart/types.ts",
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
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Imbriqué

Les parents additionnent leurs enfants et affichent leur nom en en-tête ; onClick reçoit le chemin de la racine jusqu’à la feuille cliquée.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/treemap-chart/native/basic.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import {
  TreemapChart,
  useTheme,
  type ShapeHoverEvent,
  type TreemapNode,
} from "minerva-design/native";

// Storage used on a phone, in megabytes
const usage = [
  {
    key: "media",
    children: [
      { key: "photos", value: 38400 },
      { key: "videos", value: 21800 },
      { key: "music", value: 6200 },
    ],
  },
  {
    key: "apps",
    children: [
      { key: "games", value: 14600 },
      { key: "social", value: 7900 },
      { key: "maps", value: 3100 },
    ],
  },
  { key: "system", value: 11800 },
  { key: "messages", value: 4700 },
];

type Usage = { key: string; value?: number; children?: Usage[] };

export default function Basic() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.treemap-chart.native.data",
  });
  const { colors } = useTheme();
  const [selected, setSelected] = useState<ShapeHoverEvent | null>(null);
  const locale = i18n.language;
  const size = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "unit",
        unit: "gigabyte",
        maximumFractionDigits: 1,
      }),
    [locale],
  );
  const data = useMemo((): TreemapNode[] => {
    const node = ({ key, value, children }: Usage): TreemapNode => ({
      name: t(`items.${key}`),
      value,
      children: children?.map(node),
    });
    return usage.map(node);
  }, [t]);
  return (
    <View style={{ width: "100%", gap: 8 }}>
      <TreemapChart
        data={data}
        height={300}
        format={(mb) => size.format(mb / 1024)}
        onClick={setSelected}
        ariaLabel={t("storageAria")}
      />
      <Text role="status" style={{ color: colors["text-secondary-color"] }}>
        {selected
          ? t("selectedItem", {
              path: (selected.path ?? [selected.name]).join(" › "),
              size: size.format(selected.value / 1024),
            })
          : t("tapCell")}
      </Text>
    </View>
  );
}

```

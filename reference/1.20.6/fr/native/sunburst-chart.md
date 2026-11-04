# Diagramme en rayons de soleil

Une hiérarchie dessinée en anneaux concentriques : chaque anneau est un niveau, chaque secteur une part de son parent. Cliquez sur un parent (ou appuyez sur Entrée) pour zoomer, sur le centre (ou Retour arrière) pour remonter ; la transition anime les angles et les anneaux. Survoler un secteur met en avant ses ancêtres et ses descendants, et les étiquettes suivent l'arc ou le rayon, selon la place.

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

Macintosh HD

Applications

Documents

Projets

Archives

PDF

Tableurs

Photos

Développement

Caches de paquets

Simulateurs

Système

Musique

Autres applications

{{value}} Go

Espace disque par dossier, en gigaoctets

Affichage de {{path}}. Cliquez sur le centre pour remonter.

Cliquez sur un dossier pour zoomer dessus.

Ingénierie

Plateforme

Infrastructure

Sécurité

Outils développeurs

Ingénierie produit

Web

Mobile

Paiements

Données

Analyse

Apprentissage automatique

Ventes

EMEA

Amériques

APAC

Succès client

Support

Intégration

Marketing

Marque

Croissance

Contenu

Opérations

Finance

RH

Juridique

Informatique

{{value}} personnes

Effectifs par département, groupe et équipe

Tous les produits

Électronique

Téléphones

Haut de gamme

Milieu de gamme

Accessoires

Ordinateurs portables

Audio

Casques

Enceintes

Maison

Cuisine

Mobilier

Décoration

Mode

Homme

Femme

Enfant

Sport

Plein air

Fitness

Chemin de la catégorie

Chiffre d'affaires trimestriel par catégorie de produits

Asie

Afrique

Europe

Amériques

Océanie

Autres pays

{{value}} M

Mode des étiquettes

Auto

Le long de l'arc

Le long du rayon

Aucune

Population mondiale par continent et par pays, en millions

Éducation

Santé

Transports

Sécurité publique

Environnement

Administration

Écoles

Universités

Bibliothèques

Hôpitaux

Prévention

Transports en commun

Voirie

Pistes cyclables

Police

Pompiers

Parcs

Collecte des déchets

Eau

{{path}} : {{amount}}, soit {{share}} du budget et {{areaShare}} du domaine {{area}}.

{{path}} : {{amount}}, soit {{share}} du budget.

Budget annuel de la ville par domaine et par programme

Budget annuel : {{total}}. Cliquez sur un secteur pour lire sa part.

Chaîne de boulangeries

Cabinet dentaire

École de langues

Interne

Site web

Identité visuelle

Système de réservation

Application mobile

Administration

Formation

Design

Développement

Réunions

Relecture

Support

Apprentissage

Période

Cette semaine

Ce mois-ci

{{hours}} · {{share}} du temps saisi

Heures saisies par client, projet et activité ({{period}})

Facturable : {{billable}} sur {{total}} ({{share}}).

Paiement

Recherche

Comptes

Catalogue

Panier

Règlement

Livraison

Requêtes

Suggestions

Connexion

Profil

Fiches produit

Avis

{{value}} req./min

Requêtes d’API par minute, par service et par endpoint, mises à jour en direct

Pause

Reprendre

Total : {{value}}

Service le plus sollicité : {{service}}

Renouvelables

Nucléaire

Fossiles

Éolien

Solaire

Hydraulique

Biomasse

Gaz naturel

Charbon

Pétrole

{{value}} TWh

Masquer les énergies fossiles

Production annuelle d’électricité par source et par combustible

Renouvelables masquées : {{total}} affichés.

Renouvelables : {{share}} des {{total}} affichés.

## SunburstChart

Support: beta

Chart component of minerva-design/native: the canvas chart engine drawn with views (touch scrub, pinch zoom, legend toggles).

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "SunburstChart"
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
    "name": "innerRadius",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 0.26,
    "required": false,
    "description": "Radius of the center circle as a fraction of the outer radius"
  },
  {
    "name": "levels",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Rings shown at once below the focused node (fewer when they would be thinner than 18 px)"
  },
  {
    "name": "startAngle",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 0,
    "required": false,
    "description": "Angle of the first node, degrees clockwise from 12 o'clock"
  },
  {
    "name": "padAngle",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 1,
    "required": false,
    "description": "Gap between the sectors, in pixels"
  },
  {
    "name": "cornerRadius",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 2,
    "required": false,
    "description": "Corner radius of the sectors, in pixels"
  },
  {
    "name": "labels",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "enum",
    "values": [
      "auto",
      "none",
      "radial",
      "tangential"
    ],
    "typeText": "\"none\" | \"auto\" | \"tangential\" | \"radial\" | undefined",
    "typeRef": "type:450a54e2e59f3bb532d3",
    "default": "auto",
    "required": false,
    "description": "Sector labels: `auto` writes each name along the arc or along the radius, whichever fits best; labels that do not fit are shortened or skipped"
  },
  {
    "name": "drill",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Tapping a parent zooms into it; tapping the center goes back up"
  },
  {
    "name": "drillPath",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "array",
    "typeText": "readonly string[] | undefined",
    "typeRef": "type:88dcb55e82bb1c501478",
    "required": false,
    "description": "Names from the root to the focused node (`[]` = the root). Makes the drill-down controlled: taps then only call `onDrill`, whose `path` should be stored and passed back."
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
    "name": "onDrill",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "function",
    "typeText": "((event: ShapeDrillEvent) => void) | undefined",
    "typeRef": "type:838fdde2997cd21e7cde",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ShapeDrillEvent",
        "typeRef": "type:2f6344534a4b788a1925"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when a parent or the center is tapped (or the instance's `drill()` is called)"
  },
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
  "native:SunburstChartProps": {
    "source": "native/src/components/ShapeChart/types.ts",
    "description": "Props of SunburstChart",
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
        "name": "innerRadius",
        "type": "number",
        "required": false,
        "default": "0.26",
        "description": "Radius of the center circle as a fraction of the outer radius"
      },
      {
        "name": "levels",
        "type": "number",
        "required": false,
        "default": "every level",
        "description": "Rings shown at once below the focused node (fewer when they would be thinner than 18 px)"
      },
      {
        "name": "startAngle",
        "type": "number",
        "required": false,
        "default": "0",
        "description": "Angle of the first node, degrees clockwise from 12 o'clock"
      },
      {
        "name": "padAngle",
        "type": "number",
        "required": false,
        "default": "1",
        "description": "Gap between the sectors, in pixels"
      },
      {
        "name": "cornerRadius",
        "type": "number",
        "required": false,
        "default": "2",
        "description": "Corner radius of the sectors, in pixels"
      },
      {
        "name": "labels",
        "type": "\"auto\" | \"tangential\" | \"radial\" | \"none\"",
        "required": false,
        "default": "\"auto\"",
        "description": "Sector labels: `auto` writes each name along the arc or along the radius, whichever fits best; labels that do not fit are shortened or skipped"
      },
      {
        "name": "drill",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Tapping a parent zooms into it; tapping the center goes back up"
      },
      {
        "name": "drillPath",
        "type": "readonly string[]",
        "required": false,
        "description": "Names from the root to the focused node (`[]` = the root). Makes the drill-down controlled: taps then only call `onDrill`, whose `path` should be stored and passed back."
      },
      {
        "name": "onDrill",
        "type": "(event: ShapeDrillEvent) => void",
        "required": false,
        "description": "Called when a parent or the center is tapped (or the instance's `drill()` is called)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: basic

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/sunburst-chart/native/basic.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import {
  SunburstChart,
  useTheme,
  type TreemapNode,
} from "minerva-design/native";

// Disk usage of a laptop, in GB. App names are proper nouns; the folder
// names come from the translations.
interface Entry {
  name?: string;
  folder?: string;
  size?: number;
  children?: Entry[];
}

const DISK: Entry[] = [
  {
    folder: "applications",
    children: [
      { name: "Xcode", size: 12.4 },
      { name: "Docker", size: 9.8 },
      { name: "Figma", size: 1.2 },
      { folder: "other", size: 5.1 },
    ],
  },
  {
    folder: "photos",
    children: [
      { name: "2024", size: 18.5 },
      { name: "2025", size: 22.1 },
      { name: "2026", size: 9.6 },
    ],
  },
  {
    folder: "developer",
    children: [
      { name: "node_modules", size: 14.2 },
      {
        folder: "caches",
        children: [
          { name: "npm", size: 3.1 },
          { name: "pnpm", size: 6.4 },
        ],
      },
      { folder: "simulators", size: 11.5 },
    ],
  },
  {
    folder: "documents",
    children: [
      { folder: "projects", size: 13 },
      { folder: "pdfs", size: 2.3 },
    ],
  },
  { folder: "system", size: 18 },
  { folder: "music", size: 7.4 },
];

export default function Basic() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sunburst-chart",
  });
  const { colors } = useTheme();
  const [path, setPath] = useState<string[]>([]);
  const number = useMemo(
    () => new Intl.NumberFormat(i18n.language, { maximumFractionDigits: 1 }),
    [i18n.language],
  );
  const data = useMemo((): TreemapNode[] => {
    const node = (entry: Entry): TreemapNode => ({
      name: entry.folder ? t(`data.disk.${entry.folder}`) : (entry.name ?? ""),
      value: entry.size,
      children: entry.children?.map(node),
    });
    return DISK.map(node);
  }, [t]);
  return (
    <View style={{ width: "100%", gap: 8 }}>
      <SunburstChart
        data={data}
        format={(value) => t("data.gb", { value: number.format(value) })}
        legend={false}
        height={320}
        onDrill={(event) => setPath(event.path)}
        ariaLabel={t("data.diskAria")}
      />
      <Text role="status" style={{ color: colors["text-secondary-color"] }}>
        {path.length
          ? t("native.data.path", { path: path.join(" › ") })
          : t("native.data.tapHint")}
      </Text>
    </View>
  );
}

```

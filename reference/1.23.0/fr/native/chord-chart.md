# Diagramme d’accords

Flux entre des groupes disposés en cercle : chaque groupe est un arc dimensionné par ses flux, chaque flux un ruban entre deux arcs. Non orienté, un ruban relie une paire de groupes et sa largeur est la somme des flux dans les deux sens (une matrice symétrique compte chaque relation une seule fois), si bien qu’un groupe qui ne fait que recevoir garde son arc ; orienté, chaque sens a son propre ruban, terminé par une flèche. Survolez un groupe pour mettre ses rubans en avant, un ruban pour lire les deux sens ; la légende masque / affiche les groupes et les flèches du clavier parcourent les groupes puis les rubans.

Package: minerva-design@1.23.0

Renderer: native

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "19d3efc34af8ba4e23df0f24d9fbb0a587e1b452",
  "sourceDigest": "sha256:2005faebbf738765fe81a5c952fa47a51311aa5d05e3220f71c542b8b1fe369b",
  "referenceSourceDigest": "sha256:ec29900df0d5b5c8d741436acb4a250ec29e5f40ce1f4110def33ac2d66baaa5"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

## Documentation

Design

Ingénierie

Produit

Marketing

Messages échangés entre quatre équipes en une semaine

Amérique du Nord

Amérique latine

Europe

Afrique

Asie occidentale

Asie du Sud

Asie de l’Est

Océanie

{{value}} M de personnes

Flux migratoires entre les régions du monde sur cinq ans

app

router

store

ui-kit

api-client

auth

i18n

utils

Imports entre les modules d’une base de code

États-Unis

Chine

Union européenne

Mexique

Canada

Japon

Corée du Sud

Commerce de marchandises entre grandes économies sur un an

Accueil

Recherche

Catégorie

Produit

Panier

Paiement

{{value}} k visites

Survolez une page ou un ruban

{{source}} → {{target}} : {{value}} (dans l’autre sens : {{reverse}})

{{name}} : {{value}} en entrée et en sortie

Navigation entre les pages d’une application de boutique en une journée

États-Unis Est

États-Unis Ouest

Europe centrale

Asie-Pacifique SE

Asie-Pacifique NE

Amérique du Sud

{{value}} Gbit/s

Trafic de réplication entre centres de données

Libellés

Auto

Tangentiels

Radiaux

Aucun

Ordre des groupes

Ordre des données

Du plus grand

Du plus petit

Couleur des rubans

Dégradé

Source

Cible

Neutre

Orienté

Graduations

Autres opérateurs

Année

{{year}}

{{name}} {{value}}

{{name}} a gagné le plus d'abonnés ({{value}} en net). Solde net : {{list}}.

Abonnés changeant d'opérateur mobile en {{year}}

Physique

Chimie

Biologie

Médecine

Informatique

Mathématiques

Économie

Ingénierie

Cliquez sur une faculté pour voir ses collaborations, ou sur un ruban pour voir une paire

{{name}} : {{total}} articles co-écrits, surtout avec {{partners}}

{{name}} ({{value}})

{{a}} et {{b}} : {{value}} articles co-écrits

Effacer

Articles co-écrits par les facultés d'une université sur cinq ans

Café

Lait

Pain

Viennoiseries

Fruits

Céréales

Yaourts

Jus

{{a}} + {{b}}

Achetés ensemble dans {{value}} paniers ({{share}} de tous les paniers)

{{value}} associations avec d'autres catégories

Catégories de produits achetées ensemble dans un même panier sur un mois

Passerelle

Utilisateurs

Commandes

Stocks

Paiements

Notifications

{{value}} appels/s

Total : {{total}}. Le plus chargé : {{from}} → {{to}} ({{value}})

Pause

Reprendre

Appels par seconde entre microservices, en direct

Londres

Paris

Francfort

Istanbul

Dubaï

Singapour

Tokyo

New York

{{value}} M de passagers

Afficher toutes les plateformes

Plateformes de l'Est

Plateformes de l'Ouest

Affichez au moins deux plateformes pour voir les liaisons entre elles

{{shown}} plateformes sur {{total}} affichées : {{routes}} liaisons, {{passengers}} par an

Passagers annuels entre les grandes plateformes aéroportuaires

## ChordChart

Support: beta

Chart component of minerva-design/native: the canvas chart engine drawn with views (touch scrub, pinch zoom, legend toggles).

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "ChordChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "groups",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "array",
    "typeText": "readonly (string | ChordGroup)[] | undefined",
    "typeRef": "type:a2dc79840661498eae07",
    "required": false,
    "description": "Groups (names or `{ name, color }`), in their order around the circle; groups only named by `links` are appended. With `matrix`, unnamed rows are numbered from 1."
  },
  {
    "name": "matrix",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "array",
    "typeText": "readonly (readonly number[])[] | undefined",
    "typeRef": "type:14cda7081cd30af85dad",
    "required": false,
    "description": "Square flow matrix: `matrix[i][j]` flows from group `i` to group `j` (used when `links` is absent)"
  },
  {
    "name": "links",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "array",
    "typeText": "readonly ChordLink[] | undefined",
    "typeRef": "type:2c67592f3a0996019a5b",
    "required": false,
    "description": "Flows as a list (by group name or index); takes precedence over `matrix`"
  },
  {
    "name": "directed",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "`false`: one ribbon per pair of groups, as wide as the flows between them in both directions (a symmetric matrix counts each relation once), arcs sized by the ribbons of the group. `true`: one ribbon per direction (same width at both ends), arcs sized by the outgoing plus the incoming flows; flows from a group to itself are ignored."
  },
  {
    "name": "arrows",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Arrowheads at the target end of the ribbons"
  },
  {
    "name": "padAngle",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 2,
    "required": false,
    "description": "Gap between the groups, in degrees"
  },
  {
    "name": "startAngle",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 0,
    "required": false,
    "description": "Angle of the first group, degrees clockwise from 12 o'clock"
  },
  {
    "name": "sortGroups",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "enum",
    "values": [
      "ascending",
      "descending",
      "none"
    ],
    "typeText": "\"none\" | \"ascending\" | \"descending\" | undefined",
    "typeRef": "type:36d9ac8380d45cabf9fa",
    "required": false,
    "description": "Order of the groups around the circle"
  },
  {
    "name": "sortSubgroups",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "enum",
    "values": [
      "ascending",
      "auto",
      "descending",
      "none"
    ],
    "typeText": "\"none\" | \"auto\" | \"ascending\" | \"descending\" | undefined",
    "typeRef": "type:7ef254cdf5e46456250c",
    "default": "auto",
    "required": false,
    "description": "Order of the ribbon ends along an arc: `auto` minimizes the crossings; otherwise the order of the groups, or by value"
  },
  {
    "name": "ribbonColor",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "enum",
    "values": [
      "gradient",
      "neutral",
      "source",
      "target"
    ],
    "typeText": "\"neutral\" | \"target\" | \"gradient\" | \"source\" | undefined",
    "typeRef": "type:f280eddf1871945519d6",
    "default": "gradient",
    "required": false,
    "description": "Color of the ribbons without `color`: a gradient from the source to the target color, one of the two, or a neutral gray"
  },
  {
    "name": "ribbonOpacity",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 0.65,
    "required": false,
    "description": "Opacity of the ribbons, 0-1 (pressed ribbons are more opaque)"
  },
  {
    "name": "arcWidth",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Thickness of the group arcs, in pixels"
  },
  {
    "name": "ticks",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "union",
    "typeText": "number | boolean | undefined",
    "typeRef": "type:11d9d08024b0b84c460e",
    "required": false,
    "description": "Value ticks outside the arcs (labelled where there is room); a number sets the step between ticks"
  },
  {
    "name": "tickFormat",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "function",
    "typeText": "((value: number) => string) | undefined",
    "typeRef": "type:5153c562db0d2b011c8a",
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
    "description": "Formats the tick labels"
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
    "description": "Group labels along the arc (`tangential`) or the radius (`radial`); `auto` picks tangential when every name fits; colliding labels are shortened or skipped"
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
  "native:ChordChartProps": {
    "source": "native/src/components/ShapeChart/types.ts",
    "description": "Props of ChordChart",
    "kind": "interface",
    "extends": [
      "ShapeChartCommonProps"
    ],
    "props": [
      {
        "name": "groups",
        "type": "readonly (string | ChordGroup)[]",
        "required": false,
        "description": "Groups (names or `{ name, color }`), in their order around the circle; groups only named by `links` are appended. With `matrix`, unnamed rows are numbered from 1."
      },
      {
        "name": "matrix",
        "type": "readonly (readonly number[])[]",
        "required": false,
        "description": "Square flow matrix: `matrix[i][j]` flows from group `i` to group `j` (used when `links` is absent)"
      },
      {
        "name": "links",
        "type": "readonly ChordLink[]",
        "required": false,
        "description": "Flows as a list (by group name or index); takes precedence over `matrix`"
      },
      {
        "name": "directed",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "`false`: one ribbon per pair of groups, as wide as the flows between them in both directions (a symmetric matrix counts each relation once), arcs sized by the ribbons of the group. `true`: one ribbon per direction (same width at both ends), arcs sized by the outgoing plus the incoming flows; flows from a group to itself are ignored."
      },
      {
        "name": "arrows",
        "type": "boolean",
        "required": false,
        "default": "true when `directed`",
        "description": "Arrowheads at the target end of the ribbons"
      },
      {
        "name": "padAngle",
        "type": "number",
        "required": false,
        "default": "2",
        "description": "Gap between the groups, in degrees"
      },
      {
        "name": "startAngle",
        "type": "number",
        "required": false,
        "default": "0",
        "description": "Angle of the first group, degrees clockwise from 12 o'clock"
      },
      {
        "name": "sortGroups",
        "type": "\"none\" | \"ascending\" | \"descending\"",
        "required": false,
        "default": "\"none\" (data order)",
        "description": "Order of the groups around the circle"
      },
      {
        "name": "sortSubgroups",
        "type": "\"auto\" | \"none\" | \"ascending\" | \"descending\"",
        "required": false,
        "default": "\"auto\"",
        "description": "Order of the ribbon ends along an arc: `auto` minimizes the crossings; otherwise the order of the groups, or by value"
      },
      {
        "name": "ribbonColor",
        "type": "\"gradient\" | \"source\" | \"target\" | \"neutral\"",
        "required": false,
        "default": "\"gradient\"",
        "description": "Color of the ribbons without `color`: a gradient from the source to the target color, one of the two, or a neutral gray"
      },
      {
        "name": "ribbonOpacity",
        "type": "number",
        "required": false,
        "default": "0.65",
        "description": "Opacity of the ribbons, 0-1 (pressed ribbons are more opaque)"
      },
      {
        "name": "arcWidth",
        "type": "number",
        "required": false,
        "default": "6% of the radius (8-18 px)",
        "description": "Thickness of the group arcs, in pixels"
      },
      {
        "name": "ticks",
        "type": "boolean | number",
        "required": false,
        "default": "true when the diagram is large enough",
        "description": "Value ticks outside the arcs (labelled where there is room); a number sets the step between ticks"
      },
      {
        "name": "tickFormat",
        "type": "(value: number) => string",
        "required": false,
        "default": "compact numbers of the `locale`",
        "description": "Formats the tick labels"
      },
      {
        "name": "labels",
        "type": "\"auto\" | \"tangential\" | \"radial\" | \"none\"",
        "required": false,
        "default": "\"auto\"",
        "description": "Group labels along the arc (`tangential`) or the radius (`radial`); `auto` picks tangential when every name fits; colliding labels are shortened or skipped"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Exemple simple

Une matrice carrée et le nom de ses lignes : matrix[i][j] va du groupe i au groupe j, ici les messages que les équipes s’envoient en une semaine. Des graduations indiquent les valeurs autour des arcs quand le diagramme est assez grand.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/chord-chart/native/basic.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import {
  ChordChart,
  useTheme,
  type ShapeHoverEvent,
} from "minerva-design/native";

const TEAMS = ["design", "engineering", "product", "marketing"] as const;

// Messages sent in a week: row = sender, column = recipient
const MATRIX = [
  [0, 42, 28, 14],
  [36, 0, 54, 8],
  [30, 48, 0, 22],
  [12, 6, 26, 0],
];

export default function Basic() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.chord-chart",
  });
  const { colors } = useTheme();
  const [selected, setSelected] = useState<ShapeHoverEvent | null>(null);
  const groups = useMemo(
    () => TEAMS.map((team) => t(`data.teams.${team}`)),
    [t],
  );
  return (
    <View style={{ width: "100%", gap: 8 }}>
      <ChordChart
        groups={groups}
        matrix={MATRIX}
        locale={i18n.language}
        legend={false}
        onClick={setSelected}
        height={340}
        ariaLabel={t("data.teamsAria")}
      />
      <Text role="status" style={{ color: colors["text-secondary-color"] }}>
        {selected
          ? selected.source && selected.target
            ? t("native.data.flow", {
                source: selected.source,
                target: selected.target,
                value: selected.value,
                reverse: selected.reverseValue ?? 0,
              })
            : t("native.data.team", {
                name: selected.name,
                value: selected.value,
              })
          : t("native.data.tapHint")}
      </Text>
    </View>
  );
}

```

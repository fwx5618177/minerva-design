# Diagramme de Sankey

Des flux entre étapes : bilans énergétiques, parcours utilisateurs, répartitions budgétaires. Les nœuds sont rangés en colonnes, l'épaisseur d'un lien est proportionnelle à son flux, et l'ordre des nœuds est relaxé pour redresser les flux et limiter les croisements. Survolez un nœud pour mettre en avant tous ses flux, ou un lien pour voir sa part dans sa source ; les flèches du clavier parcourent les nœuds et les liens.

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

Solaire

Éolien

Hydraulique

Nucléaire

Gaz naturel

Charbon

Pétrole

Électricité

Réseaux de chaleur

Carburants

Résidentiel

Industrie

Tertiaire

Transports

Pertes

{{value}} TWh

Bilan énergétique : sources primaires, vecteurs et usages finaux, en térawattheures par an

Annonces

Recherche naturelle

Newsletter

Réseaux sociaux

Accueil

Page tarifs

Blog

Inscription

Départ du site

Essai démarré

Abandon

Offre payante

Essai expiré

Sessions d'une semaine, du canal d'acquisition à l'abonnement

{{source}} → {{target}} : {{value}} sessions ({{share}} % de {{source}})

{{name}} : {{value}} sessions

Cliquez sur une étape ou un chemin (ou donnez le focus au graphique et appuyez sur Entrée) pour le sélectionner

Licences

Abonnements

Services

Subventions

Budget annuel

R&D

Ventes et marketing

Opérations

Administration

Plateforme

Applications mobiles

Recherche en IA

Campagnes

Équipe commerciale

Infrastructure

Support client

Finance et juridique

Bureaux

Budget annuel : sources de revenus, départements et programmes

E-mail

Chat

Téléphone

Chatbot

Niveau 1

Niveau 2

Ingénierie

Résolu

Remboursé

Bug signalé

Tickets de support d'un mois, du canal au résultat

Alignement des nœuds

Justifié

Gauche

Droite

Centré

Couleur des liens

Dégradé

Source

Cible

Neutre

Valeurs dans les étiquettes

Cloud

Licences

Matériel

Services

Chiffre d'affaires

Coût des ventes

Marge brute

R&D

Ventes et marketing

Frais généraux

Résultat d'exploitation

Impôt sur les sociétés

Résultat net

Compte de résultat trimestriel : segments de chiffre d'affaires, coûts et marges

Marge brute {{gross}} · marge d'exploitation {{operating}} · marge nette {{net}}

Brésil

Colombie

Éthiopie

Viêt Nam

Torréfaction de Hambourg

Torréfaction de Rotterdam

Entrepôt Nord

Entrepôt Centre

Entrepôt Sud

Cafés

Supermarchés

Boutique en ligne

{{value}} t

Café expédié en un mois, des pays d'origine aux canaux de vente en passant par les torréfactions et les entrepôts

Cliquez sur un site pour suivre tout ce qui le traverse, ou sur une expédition pour la sélectionner

{{name}} : {{inbound}} reçues de {{from}} sites, {{outbound}} envoyées vers {{to}} sites

{{source}} → {{target}} : {{value}} ({{share}} des envois de {{source}})

Effacer la sélection

Cooptation

Sites d'emploi

Réseaux professionnels

Cabinets

Écoles

Candidatures

Refusés sur CV

Entretien téléphonique

Non retenus après l'appel

Entretiens

Non retenus après les entretiens

Offres

Offre déclinée

Embauchés

Afficher les abandons

Entonnoir de recrutement d'une année, de la source du candidat à l'embauche

{{applied}} candidatures, {{hired}} embauches ({{rate}}). {{interview}} des candidats appelés passent les entretiens et {{accepted}} des offres sont acceptées.

Application web

Application iOS

Application Android

API partenaires

Passerelle API

Authentification

Catalogue

Recherche

Paiement

2xx succès

4xx erreur client

5xx erreur serveur

{{value}} req/s

Total : {{total}}.

Erreurs serveur : {{rate}}

Erreurs serveur : {{rate}}, incident sur le paiement

Pause

Reprendre

Trafic d'API en direct, en requêtes par seconde, des clients vers les services et leurs codes de statut

Bouteilles et barquettes PET

Flacons PEHD

Pots et bouchons PP

Films PEBD

Autres polymères

Emballages mis sur le marché

Collectés pour recyclage

Incinérés

Mis en décharge

Rejetés dans la nature

Recyclés

Refus de tri

Nouveaux emballages

Produits de moindre qualité

{{value}} Mt

{{share}} de « {{source}} »

{{share}} de l'ensemble des emballages

Emballages plastiques d'une année en mégatonnes : polymères, filières de fin de vie et recyclage

## SankeyChart

Support: beta

Chart component of minerva-design/native: the canvas chart engine drawn with views (touch scrub, pinch zoom, legend toggles).

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "SankeyChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "nodes",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "array",
    "typeText": "readonly SankeyNode[] | undefined",
    "typeRef": "type:abbae3a275f8cae80221",
    "required": false,
    "description": "Nodes, in their initial order; nodes only named by a link are appended"
  },
  {
    "name": "links",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "array",
    "typeText": "readonly SankeyLink[]",
    "typeRef": "type:9b7445fd57ca5be620e0",
    "required": true,
    "description": "Flows between the nodes (by name or index); links closing a cycle are ignored"
  },
  {
    "name": "nodeWidth",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 12,
    "required": false,
    "description": "Width of the node bars, in pixels"
  },
  {
    "name": "nodePadding",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 12,
    "required": false,
    "description": "Vertical gap between the nodes of a column, in pixels (reduced when space is short)"
  },
  {
    "name": "align",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "enum",
    "values": [
      "center",
      "justify",
      "left",
      "right"
    ],
    "typeText": "\"right\" | \"left\" | \"center\" | \"justify\" | undefined",
    "typeRef": "type:2d132ecb25497b49ed29",
    "default": "justify",
    "required": false,
    "description": "Column of the nodes without a `column`: `justify` puts the sinks in the last column, `left` / `right` align on the sources / sinks, `center` puts the sources next to their first target"
  },
  {
    "name": "iterations",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 32,
    "required": false,
    "description": "Relaxation passes that straighten the flows and reduce crossings"
  },
  {
    "name": "linkColor",
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
    "description": "Color of the links without `color`: a gradient from the source to the target color, one of the two, or a neutral gray"
  },
  {
    "name": "linkOpacity",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 0.4,
    "required": false,
    "description": "Opacity of the links, 0-1 (pressed flows are more opaque)"
  },
  {
    "name": "labels",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Node labels (name and value); overlapping labels are skipped"
  },
  {
    "name": "labelValues",
    "source": "packages/native/src/components/ShapeChart/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Shows the value after the name in the labels"
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
  "native:SankeyChartProps": {
    "source": "native/src/components/ShapeChart/types.ts",
    "description": "Props of SankeyChart",
    "kind": "interface",
    "extends": [
      "ShapeChartCommonProps"
    ],
    "props": [
      {
        "name": "nodes",
        "type": "readonly SankeyNode[]",
        "required": false,
        "description": "Nodes, in their initial order; nodes only named by a link are appended"
      },
      {
        "name": "links",
        "type": "readonly SankeyLink[]",
        "required": true,
        "description": "Flows between the nodes (by name or index); links closing a cycle are ignored"
      },
      {
        "name": "nodeWidth",
        "type": "number",
        "required": false,
        "default": "12",
        "description": "Width of the node bars, in pixels"
      },
      {
        "name": "nodePadding",
        "type": "number",
        "required": false,
        "default": "12",
        "description": "Vertical gap between the nodes of a column, in pixels (reduced when space is short)"
      },
      {
        "name": "align",
        "type": "\"justify\" | \"left\" | \"right\" | \"center\"",
        "required": false,
        "default": "\"justify\"",
        "description": "Column of the nodes without a `column`: `justify` puts the sinks in the last column, `left` / `right` align on the sources / sinks, `center` puts the sources next to their first target"
      },
      {
        "name": "iterations",
        "type": "number",
        "required": false,
        "default": "32",
        "description": "Relaxation passes that straighten the flows and reduce crossings"
      },
      {
        "name": "linkColor",
        "type": "\"gradient\" | \"source\" | \"target\" | \"neutral\"",
        "required": false,
        "default": "\"gradient\"",
        "description": "Color of the links without `color`: a gradient from the source to the target color, one of the two, or a neutral gray"
      },
      {
        "name": "linkOpacity",
        "type": "number",
        "required": false,
        "default": "0.4",
        "description": "Opacity of the links, 0-1 (pressed flows are more opaque)"
      },
      {
        "name": "labels",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Node labels (name and value); overlapping labels are skipped"
      },
      {
        "name": "labelValues",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Shows the value after the name in the labels"
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

### apps/docs/src/docs/pages/sankey-chart/native/basic.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import {
  SankeyChart,
  useTheme,
  type SankeyLink,
  type ShapeHoverEvent,
} from "minerva-design/native";

// Yearly budget of a software company, in millions of dollars: revenue
// streams, then the departments it is split between
const ALLOCATIONS: [string, string, number][] = [
  ["licenses", "budget", 18.4],
  ["subscriptions", "budget", 42.6],
  ["services", "budget", 9.2],
  ["grants", "budget", 2.8],
  ["budget", "rnd", 29.5],
  ["budget", "sales", 21.3],
  ["budget", "operations", 13.7],
  ["budget", "admin", 8.5],
];

export default function Basic() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sankey-chart",
  });
  const { colors } = useTheme();
  const [selected, setSelected] = useState<ShapeHoverEvent | null>(null);
  const money = useMemo(
    () =>
      new Intl.NumberFormat(i18n.language, {
        style: "currency",
        currency: "USD",
        notation: "compact",
        maximumFractionDigits: 1,
      }),
    [i18n.language],
  );
  const links = useMemo(
    (): SankeyLink[] =>
      ALLOCATIONS.map(([source, target, value]) => ({
        source: t(`data.budget.${source}`),
        target: t(`data.budget.${target}`),
        value: value * 1e6,
      })),
    [t],
  );
  return (
    <View style={{ width: "100%", gap: 8 }}>
      <SankeyChart
        links={links}
        nodeWidth={10}
        labelValues={false}
        format={(value) => money.format(value)}
        onClick={setSelected}
        height={320}
        ariaLabel={t("data.budgetAria")}
      />
      <Text role="status" style={{ color: colors["text-secondary-color"] }}>
        {selected
          ? selected.source && selected.target
            ? `${selected.source} → ${selected.target}: ${money.format(selected.value)}`
            : `${selected.name}: ${money.format(selected.value)}`
          : t("native.data.tapHint")}
      </Text>
    </View>
  );
}

```

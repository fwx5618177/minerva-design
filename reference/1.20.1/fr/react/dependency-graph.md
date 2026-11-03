# Graphe de dépendances

Graphes orientés acycliques dessinés en couches : dépendances de paquets, chaînes de build, lignage de données, plans de tâches. La disposition de Sugiyama casse les cycles, affecte les couches, fait passer les longues arêtes par des nœuds fictifs, réduit les croisements et garde les longues arêtes droites ; les arêtes sont des courbes lisses ou des connecteurs orthogonaux fléchés. Survolez ou sélectionnez un nœud pour mettre en avant tout ce qui est en amont et en aval, et affichez le chemin critique d’un plan.

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

#### Fonctionnement de la disposition

DependencyGraph est un GraphChart avec layout="dag" : boîtes ajustées à leur libellé, flèches sur chaque arête et mise en avant du lignage. La même disposition existe sous forme de fonction pure, dagLayout.

Les cycles sont cassés en inversant les arêtes arrière d’un parcours en profondeur ; les couches viennent du plus long chemin, puis les sources se rapprochent de leurs successeurs et les nœuds équilibrés rejoignent les couches moins remplies.

Les arêtes qui traversent plusieurs couches reçoivent des nœuds fictifs ; des passes barycentre et médiane réordonnent ensuite chaque couche en gardant le meilleur ordre, puis une passe de transposition échange des voisins tant que cela supprime des croisements.

Les positions dans une couche viennent d’une régression isotone pondérée vers les voisins, les longues arêtes ayant un poids élevé pour rester droites. Les sens TB, LR, BT et RL sont pris en charge.

highlight="lineage" (par défaut ici) met en avant tous les ancêtres et descendants des nœuds survolés, actifs ou sélectionnés ; criticalPath met en avant la chaîne de plus grande durée totale (valeur des nœuds).

Applications

Paquets de framework

Bibliothèques

Outillage

dépendance de développement

dépendance circulaire

Dépendances entre les paquets d’un monorepo

Installation

Lint

Vérification des types

Tests unitaires

Analyse de sécurité

Build de l’app

Build de la doc

Tests E2E

Tests visuels

Empaquetage

Déploiement préprod

Déploiement prod

Réussi

En cours

Échoué

En attente

{{status}} · {{minutes}} min

bundle web

déclarations de types

nouvel essai

Mettre en avant le chemin critique

Chaîne CI/CD : jobs, dépendances et statuts

Chemin critique : {{minutes}} min — {{path}}

 → 

Tableau des revenus

Tableau de rétention

Tableau de croissance

Sources brutes

Préparation

Magasins de données

Tableaux de bord

Lignage des données, des tables brutes aux tableaux de bord

{{name}} : {{upstream}} en amont, {{downstream}} en aval

Cliquez sur une table ou un tableau de bord pour mettre en avant son lignage.

Terminée

En cours

En attente

{{percent}} effectué

{{seconds}} s

Workers

{{n}} × worker

Pause

Lancer

Réinitialiser

Tâches de build d'un monorepo, colorées selon leur état pendant l'exécution

Build terminé en {{seconds}} s avec {{workers}} × worker.

{{elapsed}} s sur {{seconds}} s — en cours : {{running}}.

rien

Aucun ordonnancement ne fait mieux que le chemin critique : {{seconds}} s.

Cahier des charges

Recherche utilisateur

Arborescence

Maquettes fil de fer

Design graphique

Rédaction

API et hébergement

Configuration du CMS

Intégration front-end

Saisie des contenus

Recette et correctifs

Audit SEO

Mise en ligne

Cadrage

Conception

Réalisation

Lancement

Planning du lancement d'un site : tâches, dépendances et chemin critique

{{name}} : {{range}}, {{days}} jours ouvrés, peut glisser de {{slack}} jours ouvrés sans retarder le lancement.

{{name}} : {{range}}, {{days}} jours ouvrés, sur le chemin critique — tout retard décale le lancement.

{{days}} jours ouvrés, mise en ligne le {{date}}. Cliquez sur une tâche pour voir ses dates et sa marge.

Réussie

Échouée

Amont en échec

Tâche en échec

Tâches ETL nocturnes, avec la tâche en échec et les tâches qu'elle bloque

{{task}} a échoué et bloque {{blocked}} des {{total}} tâches : {{sinks}} ne seront pas livrés.

{{task}} a échoué, mais aucune autre tâche n'en dépend.

Initiation à la programmation

Mathématiques discrètes

Analyse

Structures de données

Architecture des ordinateurs

Algèbre linéaire

Probabilités

Algorithmique

Systèmes d'exploitation

Bases de données

Réseaux

Apprentissage automatique

Compilation

Systèmes répartis

Sécurité

Apprentissage profond

Projet de fin d'études

Année {{n}}

Direction du flux

De haut en bas

De gauche à droite

De bas en haut

De droite à gauche

Cours d'informatique et leurs prérequis

Prérequis de « {{course}} » ({{total}}) : {{list}}.

« {{course}} » n'a aucun prérequis.

Prix unitaire

Quantité

Remise (%)

Taux de TVA

Sous-total

Remise

Net

TVA

Livraison

Total

Coût unitaire

Saisies

Formules

Cellules d'un bon de commande et cellules référencées par leurs formules

{{cell}} modifié : {{total}} cellules recalculées ({{list}}). Total : {{value}}.

## DependencyGraph

Support: stable

### Import

```json
{
  "specifier": "minerva-design/charts",
  "exports": [
    "DependencyGraph"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "direction",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "enum",
    "values": [
      "BT",
      "LR",
      "RL",
      "TB"
    ],
    "typeText": "GraphDirection | undefined",
    "typeRef": "type:e2282a023de588fdd830",
    "default": "TB",
    "required": false,
    "description": "Flow direction"
  },
  {
    "name": "dag",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "object",
    "typeText": "GraphDagOptions | undefined",
    "typeRef": "type:9812c43f612183b6c13d",
    "required": false,
    "description": "Layer / node spacing, crossing reduction sweeps"
  },
  {
    "name": "criticalPath",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "union",
    "typeText": "boolean | readonly string[] | undefined",
    "typeRef": "type:fa8f02e6494a887e466c",
    "default": false,
    "required": false,
    "description": "Highlights the longest path (node `value` = duration); `true` computes it, a list of ids sets it"
  },
  {
    "name": "nodes",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "array",
    "typeText": "readonly GraphNode[]",
    "typeRef": "type:d043e153cf195b5b2e2b",
    "required": true,
    "description": "The nodes"
  },
  {
    "name": "edges",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "array",
    "typeText": "readonly GraphEdge[]",
    "typeRef": "type:75a5208fa228dd1e0528",
    "required": true,
    "description": "The edges (parent → child in trees, prerequisite → dependent in DAGs)"
  },
  {
    "name": "groups",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "array",
    "typeText": "readonly GraphGroup[] | undefined",
    "typeRef": "type:b8f1cf5e37f0c33f5bad",
    "required": false,
    "description": "Groups: legend order, names and colors"
  },
  {
    "name": "height",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "default": 480,
    "required": false,
    "description": "Height of the chart (the legend included); numbers are pixels"
  },
  {
    "name": "width",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "default": "100%",
    "required": false,
    "description": "Width of the chart; numbers are pixels"
  },
  {
    "name": "nodeShape",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "enum",
    "values": [
      "box",
      "circle"
    ],
    "typeText": "GraphNodeShape | undefined",
    "typeRef": "type:1091b2c2c15e447b147f",
    "required": false,
    "description": "Shape of the nodes without `shape` (boxes for DAGs, org charts and mind maps, circles otherwise)"
  },
  {
    "name": "nodeSize",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "union",
    "typeText": "number | readonly [number, number] | undefined",
    "typeRef": "type:750314f5aee769294737",
    "required": false,
    "description": "Circle diameter in layout units, or `[min, max]` scaled by the node `value`"
  },
  {
    "name": "edgeStyle",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "enum",
    "values": [
      "curve",
      "orthogonal",
      "spline",
      "straight"
    ],
    "typeText": "GraphEdgeStyle | undefined",
    "typeRef": "type:8c4d9692eea81edaa9b2",
    "required": false,
    "description": "Edge shape; depends on the layout when omitted"
  },
  {
    "name": "edgeWidth",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "union",
    "typeText": "number | readonly [number, number] | undefined",
    "typeRef": "type:750314f5aee769294737",
    "required": false,
    "description": "Edge width in CSS pixels, or `[min, max]` scaled by the edge `value`"
  },
  {
    "name": "edgeColor",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "enum",
    "values": [
      "neutral",
      "source",
      "target"
    ],
    "typeText": "\"neutral\" | \"target\" | \"source\" | undefined",
    "typeRef": "type:12fe953650573b302791",
    "default": "neutral",
    "required": false,
    "description": "Edge colors: neutral or tinted with the source / target node"
  },
  {
    "name": "arrows",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Arrowheads on the edges without `directed`"
  },
  {
    "name": "arrowStyle",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "enum",
    "values": [
      "filled",
      "open"
    ],
    "typeText": "\"filled\" | \"open\" | undefined",
    "typeRef": "type:d74ec6d9774e9b198b93",
    "default": "open",
    "required": false,
    "description": "Shape of the arrowheads: `open` (a slim outlined head) or `filled` (a solid head in the edge color, which follows the theme and the highlight)"
  },
  {
    "name": "nodeLabels",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "union",
    "typeText": "boolean | \"auto\" | undefined",
    "typeRef": "type:54793a2f0bb416543bfd",
    "default": "auto",
    "required": false,
    "description": "Node labels; `auto` hides minor and overlapping labels when zoomed out. Text inside boxes keeps a readable minimum size and is shortened with an ellipsis; it is hidden only when the box is too small for any text, or with `false`"
  },
  {
    "name": "edgeLabels",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "union",
    "typeText": "boolean | \"hover\" | \"auto\" | undefined",
    "typeRef": "type:266dfa648b484f073d6f",
    "default": "auto",
    "required": false,
    "description": "Edge labels: always, `auto` (zoomed in or highlighted), only `hover`, or never"
  },
  {
    "name": "highlight",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "enum",
    "values": [
      "lineage",
      "neighbors",
      "none"
    ],
    "typeText": "\"none\" | \"neighbors\" | \"lineage\" | undefined",
    "typeRef": "type:b5de00c7c3625629f010",
    "required": false,
    "description": "What hovering / selecting a node highlights"
  },
  {
    "name": "selected",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "array",
    "typeText": "readonly string[] | undefined",
    "typeRef": "type:88dcb55e82bb1c501478",
    "required": false,
    "description": "Ids of the selected nodes (changing it updates the selection)"
  },
  {
    "name": "animation",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "union",
    "typeText": "number | boolean | undefined",
    "typeRef": "type:11d9d08024b0b84c460e",
    "default": true,
    "required": false,
    "description": "Animates layout and data changes; a number is the duration in ms"
  },
  {
    "name": "fitPadding",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 24,
    "required": false,
    "description": "Padding around the graph when fitting it, in CSS pixels"
  },
  {
    "name": "controls",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Zoom buttons (zoom in, zoom out, fit)"
  },
  {
    "name": "legend",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "union",
    "typeText": "boolean | GraphLegendOptions | undefined",
    "typeRef": "type:a6752c0a6f36341f0589",
    "required": false,
    "description": "Legend of the groups; shown by default with several groups"
  },
  {
    "name": "tooltip",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "union",
    "typeText": "boolean | GraphTooltipOptions | undefined",
    "typeRef": "type:43b64af2877567c9edca",
    "required": false,
    "description": "Tooltip; `false` disables it"
  },
  {
    "name": "interaction",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "union",
    "typeText": "boolean | GraphInteractionOptions | undefined",
    "typeRef": "type:a8c334ec55cb37fe3733",
    "default": true,
    "required": false,
    "description": "Drag pans, Ctrl / ⌘ + wheel and pinch zoom, nodes can be dragged (force, circular), click selects, arrow keys move between nodes; `false` makes the chart static"
  },
  {
    "name": "renderer",
    "source": "packages/charts/src/react/graph.tsx",
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
    "description": "Backend of the nodes and edges: `auto` tries WebGPU, then WebGL2, then WebGL, then Canvas2D, skipping GPUs running in software"
  },
  {
    "name": "palette",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "array",
    "typeText": "readonly string[] | undefined",
    "typeRef": "type:88dcb55e82bb1c501478",
    "required": false,
    "description": "Group colors (defaults to the `--chart-series-1..8` CSS variables, then the theme colors)"
  },
  {
    "name": "ariaLabel",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible name of the chart"
  },
  {
    "name": "locale",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Language of the built-in texts (summary, announcements, tooltip, buttons); built-in texts in English, Chinese, Japanese and French"
  },
  {
    "name": "labels",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "object",
    "typeText": "Partial<GraphChartLabels> | undefined",
    "typeRef": "type:dae2a71254652403a618",
    "required": false,
    "description": "Overrides of the built-in texts of the `locale`"
  }
]
```

### events

```json
[
  {
    "name": "onHover",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "function",
    "typeText": "((event: GraphHoverEvent | null) => void) | undefined",
    "typeRef": "type:ac5e1baf28ad49ba06c3",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "GraphHoverEvent | null",
        "typeRef": "type:888c98d6309fe4d4eaed"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the hovered (or keyboard-focused) node / edge changes"
  },
  {
    "name": "onItemClick",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "function",
    "typeText": "((event: GraphHoverEvent) => void) | undefined",
    "typeRef": "type:51acd588b4a8583a3df7",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "GraphHoverEvent",
        "typeRef": "type:a459780626c7d631683c"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when a node or an edge is clicked (or a node activated with Enter)"
  },
  {
    "name": "onSelectionChange",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "function",
    "typeText": "((ids: string[]) => void) | undefined",
    "typeRef": "type:e21311d79e7bf99e04a2",
    "parameters": [
      {
        "name": "ids",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "string[]",
        "typeRef": "type:19a96e1d6cef0c4dc643"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called with the ids of the selected nodes when the selection changes"
  },
  {
    "name": "onToggle",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "function",
    "typeText": "((event: GraphToggleEvent) => void) | undefined",
    "typeRef": "type:5637f42cbc0ffe182065",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "GraphToggleEvent",
        "typeRef": "type:f64c00a6c651b3baee92"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when a tree node is collapsed or expanded"
  },
  {
    "name": "onGroupToggle",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "function",
    "typeText": "((event: GraphGroupToggleEvent) => void) | undefined",
    "typeRef": "type:19db777e1f40d3438872",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "GraphGroupToggleEvent",
        "typeRef": "type:530e796c884bafc1408c"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the legend shows / hides a group"
  },
  {
    "name": "onLayoutEnd",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "function",
    "typeText": "((event: GraphLayoutEndEvent) => void) | undefined",
    "typeRef": "type:def0e4d2c65fe68907cf",
    "parameters": [
      {
        "name": "event",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "GraphLayoutEndEvent",
        "typeRef": "type:55967c5fef8c1466ed7d"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the layout is done (the force simulation cooled down)"
  },
  {
    "name": "onRendererChange",
    "source": "packages/charts/src/react/graph.tsx",
    "kind": "function",
    "typeText": "((renderer: ChartRendererKind) => void) | undefined",
    "typeRef": "type:5797a13f9f213080fe55",
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
    "description": "Called with the backend once it is ready (and after a fallback)"
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
  "DependencyGraphProps": {
    "source": "charts/src/react/graph.tsx",
    "description": "Props of `DependencyGraph`",
    "kind": "interface",
    "extends": [
      "GraphCommonProps"
    ],
    "props": [
      {
        "name": "direction",
        "type": "GraphDirection",
        "required": false,
        "default": "\"TB\"",
        "description": "Flow direction"
      },
      {
        "name": "dag",
        "type": "GraphDagOptions",
        "required": false,
        "description": "Layer / node spacing, crossing reduction sweeps"
      },
      {
        "name": "criticalPath",
        "type": "boolean | readonly string[]",
        "required": false,
        "default": "false",
        "description": "Highlights the longest path (node `value` = duration); `true` computes it, a list of ids sets it"
      }
    ]
  },
  "GraphDagOptions": {
    "source": "charts/src/engine/graph/types.ts",
    "description": "Settings of the layered (Sugiyama) layout",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "layerGap",
        "type": "number",
        "required": false,
        "default": "56",
        "description": "Space between two layers, in layout units"
      },
      {
        "name": "nodeGap",
        "type": "number",
        "required": false,
        "default": "24",
        "description": "Space between two nodes of a layer, in layout units"
      },
      {
        "name": "sweeps",
        "type": "number",
        "required": false,
        "default": "8",
        "description": "Down / up sweeps of the crossing reduction"
      },
      {
        "name": "criticalPath",
        "type": "boolean | readonly string[]",
        "required": false,
        "default": "false",
        "description": "Highlights the longest path (node `value` = duration, 1 when omitted); `true` computes it, a list of node ids sets it"
      },
      {
        "name": "criticalColor",
        "type": "string",
        "required": false,
        "default": "\"var(--danger-color)\"",
        "description": "Color of the critical path (any CSS color)"
      }
    ]
  },
  "GraphCriticalPath": {
    "source": "charts/src/engine/graph/types.ts",
    "description": "Longest path of a DAG weighted by the node values (durations, 1 when omitted)",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "nodes",
        "type": "string[]",
        "required": true,
        "description": "Node ids from the start to the end of the path"
      },
      {
        "name": "edges",
        "type": "number[]",
        "required": true,
        "description": "Indices of the edges of the path"
      },
      {
        "name": "length",
        "type": "number",
        "required": true,
        "description": "Sum of the node values along the path"
      }
    ]
  },
  "GraphDagLayoutOptions": {
    "source": "charts/src/engine/graph/types.ts",
    "description": "Options of `dagLayout`",
    "kind": "interface",
    "extends": [
      "Omit<GraphDagOptions, \"criticalPath\" | \"criticalColor\">"
    ],
    "props": [
      {
        "name": "direction",
        "type": "GraphDirection",
        "required": false,
        "default": "\"TB\""
      },
      {
        "name": "size",
        "type": "(node: GraphNode, index: number) => readonly [number, number]",
        "required": false,
        "description": "Width and height of each node in layout units; 24 × 24 when omitted"
      }
    ]
  },
  "GraphDagLayoutResult": {
    "source": "charts/src/engine/graph/types.ts",
    "description": "Result of `dagLayout`",
    "kind": "interface",
    "extends": [
      "GraphLayoutResult"
    ],
    "props": [
      {
        "name": "layer",
        "type": "Int32Array",
        "required": true,
        "description": "Layer of each node (0 = first)"
      },
      {
        "name": "order",
        "type": "number[][]",
        "required": true,
        "description": "Node indices of each layer, in drawing order (dummy nodes of long edges are negative: `-1 - dummy`)"
      },
      {
        "name": "routes",
        "type": "number[][]",
        "required": true,
        "description": "Waypoints of each edge, `[x0, y0, x1, y1, …]` from the source to the target boundary (empty for ignored edges)"
      },
      {
        "name": "reversed",
        "type": "number[]",
        "required": true,
        "description": "Edges reversed to break cycles (indices)"
      },
      {
        "name": "crossings",
        "type": "{ initial: number; final: number }",
        "required": true,
        "description": "Edge crossings before / after the crossing reduction"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Ordonnanceur de build

Un lanceur de tâches exécute le build d'un monorepo sur 1, 2 ou 4 workers, en démarrant d'abord la tâche prête dont la chaîne restante est la plus longue. Les groupes colorent les tâches terminées, en cours ou en attente au fil du chronomètre, la valeur du nœud est la durée et criticalPath montre la chaîne qui borne la durée du build quel que soit le nombre de workers.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/dependency-graph/demos/build-scheduler.tsx

```tsx
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, HStack, Radio, RadioGroup } from "minerva-design";
import {
  DependencyGraph,
  type GraphEdge,
  type GraphNode,
} from "minerva-design/charts";

type State = "done" | "running" | "queued";

// monorepo tasks and their duration in seconds
const TASKS: [string, number][] = [
  ["tokens#build", 2],
  ["utils#build", 3],
  ["icons#build", 4],
  ["core#build", 6],
  ["charts#build", 8],
  ["react#build", 5],
  ["vue#build", 5],
  ["core#test", 7],
  ["charts#test", 9],
  ["react#test", 6],
  ["docs#build", 7],
  ["docs#deploy", 2],
];

// prerequisite → dependent
const NEEDS: [string, string][] = [
  ["tokens#build", "core#build"],
  ["utils#build", "core#build"],
  ["utils#build", "charts#build"],
  ["core#build", "charts#build"],
  ["core#build", "react#build"],
  ["core#build", "vue#build"],
  ["icons#build", "react#build"],
  ["icons#build", "vue#build"],
  ["core#build", "core#test"],
  ["charts#build", "charts#test"],
  ["react#build", "react#test"],
  ["charts#build", "docs#build"],
  ["react#build", "docs#build"],
  ["vue#build", "docs#build"],
  ["docs#build", "docs#deploy"],
  ["core#test", "docs#deploy"],
  ["charts#test", "docs#deploy"],
  ["react#test", "docs#deploy"],
];

const DURATION = new Map(TASKS);
const STATES: State[] = ["done", "running", "queued"];
const STATE_COLORS: Record<State, string> = {
  done: "var(--success-color, #16a34a)",
  running: "var(--primary-color, #4f46e5)",
  queued: "var(--text-secondary-color, #9ca3af)",
};

/** Longest remaining chain from each task: the scheduling priority */
const tail = (() => {
  const memo = new Map<string, number>();
  const visit = (id: string): number => {
    if (memo.has(id)) return memo.get(id)!;
    const next = NEEDS.filter(([a]) => a === id).map(([, b]) => visit(b));
    const value = DURATION.get(id)! + Math.max(0, ...next);
    memo.set(id, value);
    return value;
  };
  for (const [id] of TASKS) visit(id);
  return memo;
})();

/** List scheduling on `workers` slots: start time of every task, longest chain first */
const schedule = (workers: number) => {
  const start = new Map<string, number>();
  const finish = new Map<string, number>();
  for (let time = 0; start.size < TASKS.length; time++) {
    const busy = [...start].filter(
      ([id, s]) => s <= time && time < s + DURATION.get(id)!,
    ).length;
    const ready = TASKS.map(([id]) => id)
      .filter(
        (id) =>
          !start.has(id) &&
          NEEDS.every(
            ([a, b]) => b !== id || (finish.has(a) && finish.get(a)! <= time),
          ),
      )
      .sort((a, b) => tail.get(b)! - tail.get(a)!);
    for (const id of ready.slice(0, Math.max(0, workers - busy))) {
      start.set(id, time);
      finish.set(id, time + DURATION.get(id)!);
    }
  }
  return { start, makespan: Math.max(...finish.values()) };
};

export default function BuildSchedulerDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.dependency-graph.data",
  });
  const [workers, setWorkers] = useState(2);
  const [elapsed, setElapsed] = useState(0);
  const [playing, setPlaying] = useState(false);
  const plan = useMemo(() => schedule(workers), [workers]);
  const finished = elapsed >= plan.makespan;

  // one simulated second every 250 ms while playing
  useEffect(() => {
    if (!playing || finished) return;
    const timer = window.setInterval(
      () => setElapsed((value) => value + 1),
      250,
    );
    return () => window.clearInterval(timer);
  }, [playing, finished]);

  const stateOf = (id: string): State => {
    const start = plan.start.get(id)!;
    if (elapsed >= start + DURATION.get(id)!) return "done";
    return elapsed >= start ? "running" : "queued";
  };
  const percent = useMemo(
    () => new Intl.NumberFormat(i18n.language, { style: "percent" }),
    [i18n.language],
  );

  const nodes = TASKS.map(([id, seconds]): GraphNode => {
    const state = stateOf(id);
    const done = (elapsed - plan.start.get(id)!) / seconds;
    return {
      id,
      label: id,
      value: seconds,
      group: state,
      subtitle:
        state === "running"
          ? t("taskProgress", { percent: percent.format(done) })
          : t("taskSeconds", { seconds }),
    };
  });
  const edges = useMemo(
    (): GraphEdge[] => NEEDS.map(([source, target]) => ({ source, target })),
    [],
  );
  const groups = useMemo(
    () =>
      STATES.map((id) => ({
        id,
        name: t(`runStates.${id}`),
        color: STATE_COLORS[id],
      })),
    [t],
  );
  const running = TASKS.filter(([id]) => stateOf(id) === "running").map(
    ([id]) => id,
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <HStack gap={12} wrap align="center">
        <RadioGroup
          aria-label={t("workers")}
          direction="horizontal"
          value={String(workers)}
          onChange={(value) => {
            setWorkers(Number(value));
            setElapsed(0);
          }}
        >
          {[1, 2, 4].map((n) => (
            <Radio key={n} value={String(n)} label={t("workerCount", { n })} />
          ))}
        </RadioGroup>
        <Button
          size="small"
          onClick={() => {
            if (finished) setElapsed(0);
            setPlaying(!playing || finished);
          }}
        >
          {playing && !finished ? t("pause") : t("run")}
        </Button>
        <Button
          size="small"
          variant="outline"
          color="neutral"
          onClick={() => {
            setPlaying(false);
            setElapsed(0);
          }}
        >
          {t("reset")}
        </Button>
      </HStack>
      <DependencyGraph
        nodes={nodes}
        edges={edges}
        groups={groups}
        direction="LR"
        criticalPath
        animation={false}
        height={400}
        ariaLabel={t("schedulerAria")}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {finished
          ? t("schedulerDone", { seconds: plan.makespan, workers })
          : t("schedulerStatus", {
              elapsed,
              seconds: plan.makespan,
              running: running.length
                ? new Intl.ListFormat(i18n.language).format(running)
                : t("idle"),
            })}{" "}
        {t("schedulerBound", { seconds: Math.max(...tail.values()) })}
      </output>
    </div>
  );
}

```

## Example: Prérequis des cours

Un cursus d'informatique groupé par année. Les boutons radio changent la direction entre TB, LR, BT et RL, et les nœuds rejoignent leurs nouvelles couches ; cliquez sur un cours pour lister tous ceux à suivre avant, dans l'ordre du catalogue.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/dependency-graph/demos/course-prerequisites.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import {
  DependencyGraph,
  type GraphEdge,
  type GraphNode,
} from "minerva-design/charts";

type Direction = "TB" | "LR" | "BT" | "RL";

// course, catalogue code, year of the curriculum
const COURSES: [string, string, number][] = [
  ["intro", "CS 101", 1],
  ["discrete", "MA 110", 1],
  ["calculus", "MA 120", 1],
  ["dataStructures", "CS 201", 2],
  ["architecture", "CS 210", 2],
  ["linearAlgebra", "MA 220", 2],
  ["probability", "MA 230", 2],
  ["algorithms", "CS 301", 3],
  ["os", "CS 310", 3],
  ["databases", "CS 320", 3],
  ["networks", "CS 330", 3],
  ["ml", "CS 340", 3],
  ["compilers", "CS 401", 4],
  ["distributed", "CS 410", 4],
  ["security", "CS 420", 4],
  ["deepLearning", "CS 440", 4],
  ["capstone", "CS 490", 4],
];

// prerequisite → course
const PREREQUISITES: [string, string][] = [
  ["intro", "dataStructures"],
  ["discrete", "dataStructures"],
  ["intro", "architecture"],
  ["calculus", "linearAlgebra"],
  ["calculus", "probability"],
  ["dataStructures", "algorithms"],
  ["discrete", "algorithms"],
  ["architecture", "os"],
  ["dataStructures", "os"],
  ["dataStructures", "databases"],
  ["os", "networks"],
  ["algorithms", "ml"],
  ["linearAlgebra", "ml"],
  ["probability", "ml"],
  ["algorithms", "compilers"],
  ["architecture", "compilers"],
  ["os", "distributed"],
  ["networks", "distributed"],
  ["networks", "security"],
  ["os", "security"],
  ["ml", "deepLearning"],
  ["algorithms", "capstone"],
  ["databases", "capstone"],
];

const DIRECTIONS: Direction[] = ["TB", "LR", "BT", "RL"];

/** Every prerequisite of `id`, direct or not, in catalogue (topological) order */
const ancestors = (id: string) => {
  const seen = new Set<string>();
  const queue = [id];
  while (queue.length) {
    const current = queue.shift()!;
    for (const [a, b] of PREREQUISITES) {
      if (b === current && !seen.has(a)) {
        seen.add(a);
        queue.push(a);
      }
    }
  }
  return COURSES.map(([course]) => course).filter((course) => seen.has(course));
};

export default function CoursePrerequisitesDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.dependency-graph.data",
  });
  const [direction, setDirection] = useState<Direction>("TB");
  const [course, setCourse] = useState("ml");

  const nodes = useMemo(
    (): GraphNode[] =>
      COURSES.map(([id, code, year]) => ({
        id,
        label: t(`courses.${id}`),
        subtitle: code,
        group: `year${year}`,
      })),
    [t],
  );
  const edges = useMemo(
    (): GraphEdge[] =>
      PREREQUISITES.map(([source, target]) => ({ source, target })),
    [],
  );
  const groups = useMemo(
    () =>
      [1, 2, 3, 4].map((n) => ({
        id: `year${n}`,
        name: t("yearLabel", { n }),
      })),
    [t],
  );
  const before = ancestors(course);
  const name = (id: string) => t(`courses.${id}`);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("flowDirection")}
        direction="horizontal"
        value={direction}
        onChange={(value) => setDirection(value as Direction)}
      >
        {DIRECTIONS.map((id) => (
          <Radio key={id} value={id} label={t(`directions.${id}`)} />
        ))}
      </RadioGroup>
      <DependencyGraph
        nodes={nodes}
        edges={edges}
        groups={groups}
        direction={direction}
        edgeStyle="spline"
        highlight="lineage"
        selected={[course]}
        interaction={{ select: false }}
        height={direction === "TB" || direction === "BT" ? 460 : 400}
        ariaLabel={t("coursesAria")}
        onItemClick={(event) => {
          if (event.type === "node" && event.id) setCourse(event.id);
        }}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {before.length
          ? t("coursePath", {
              course: name(course),
              total: before.length,
              list: new Intl.ListFormat(i18n.language).format(before.map(name)),
            })
          : t("courseNoPrerequisite", { course: name(course) })}
      </output>
    </div>
  );
}

```

## Example: Impact d'un échec

Un traitement ETL nocturne : choisissez la tâche qui échoue (ou cliquez sur un nœud) et tout ce qui est en aval passe à l'état bloqué, avec des liens entrants en pointillés. highlight="lineage" avec un selected contrôlé montre le périmètre touché, et le résumé liste les livrables qui ne seront pas produits.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/dependency-graph/demos/impact-analysis.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { HStack, Select, SelectItem } from "minerva-design";
import {
  DependencyGraph,
  type GraphEdge,
  type GraphNode,
} from "minerva-design/charts";

type Status = "success" | "failed" | "blocked";

// nightly ETL run: extract → transform → load → publish
const TASKS = [
  "extract_orders",
  "extract_users",
  "extract_clicks",
  "validate_orders",
  "clean_users",
  "sessionize",
  "join_orders_users",
  "daily_revenue",
  "user_features",
  "churn_model",
  "load_warehouse",
  "refresh_dashboard",
  "email_report",
  "export_crm",
];

const UPSTREAM: [string, string][] = [
  ["extract_orders", "validate_orders"],
  ["extract_users", "clean_users"],
  ["extract_clicks", "sessionize"],
  ["validate_orders", "join_orders_users"],
  ["clean_users", "join_orders_users"],
  ["join_orders_users", "daily_revenue"],
  ["join_orders_users", "user_features"],
  ["sessionize", "user_features"],
  ["user_features", "churn_model"],
  ["daily_revenue", "load_warehouse"],
  ["user_features", "load_warehouse"],
  ["load_warehouse", "refresh_dashboard"],
  ["daily_revenue", "email_report"],
  ["churn_model", "export_crm"],
  ["clean_users", "export_crm"],
];

const STATUSES: Status[] = ["success", "failed", "blocked"];
const COLORS: Record<Status, string> = {
  success: "var(--success-color, #16a34a)",
  failed: "var(--danger-color, #dc2626)",
  blocked: "var(--warning-color, #d97706)",
};
const SINKS = TASKS.filter((id) => !UPSTREAM.some(([a]) => a === id));

/** Every task downstream of `id` */
const downstream = (id: string) => {
  const seen = new Set<string>();
  const queue = [id];
  while (queue.length) {
    const current = queue.shift()!;
    for (const [a, b] of UPSTREAM) {
      if (a === current && !seen.has(b)) {
        seen.add(b);
        queue.push(b);
      }
    }
  }
  return seen;
};

export default function ImpactAnalysisDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.dependency-graph.data",
  });
  const [failed, setFailed] = useState("clean_users");
  const blocked = useMemo(() => downstream(failed), [failed]);

  const nodes = useMemo(
    (): GraphNode[] =>
      TASKS.map((id) => {
        const status: Status =
          id === failed ? "failed" : blocked.has(id) ? "blocked" : "success";
        return {
          id,
          label: id,
          group: status,
          subtitle: t(`runStatuses.${status}`),
        };
      }),
    [t, failed, blocked],
  );
  const edges = useMemo(
    (): GraphEdge[] =>
      UPSTREAM.map(([source, target]) => ({
        source,
        target,
        dashed: blocked.has(target),
      })),
    [blocked],
  );
  const groups = useMemo(
    () =>
      STATUSES.map((id) => ({
        id,
        name: t(`runStatuses.${id}`),
        color: COLORS[id],
      })),
    [t],
  );
  const sinks = SINKS.filter((id) => blocked.has(id));
  const list = new Intl.ListFormat(i18n.language);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <HStack gap={8} align="center">
        <span>{t("failingTask")}</span>
        <Select
          aria-label={t("failingTask")}
          size="small"
          value={failed}
          onChange={setFailed}
        >
          {TASKS.map((id) => (
            <SelectItem key={id} value={id}>
              {id}
            </SelectItem>
          ))}
        </Select>
      </HStack>
      <DependencyGraph
        nodes={nodes}
        edges={edges}
        groups={groups}
        direction="LR"
        highlight="lineage"
        selected={[failed]}
        interaction={{ select: false }}
        height={440}
        ariaLabel={t("impactAria")}
        onItemClick={(event) => {
          if (event.type === "node" && event.id) setFailed(event.id);
        }}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {sinks.length
          ? t("impactSummary", {
              task: failed,
              blocked: blocked.size,
              total: TASKS.length,
              sinks: list.format(sinks),
            })
          : t("impactNone", { task: failed })}
      </output>
    </div>
  );
}

```

## Example: Amont et aval

Le lignage des données, des tables brutes aux tableaux de bord. La sélection garde le lignage en avant : cliquez sur un modèle pour voir ce qui l’alimente et ce qu’il alimente, Échap ou un clic sur le fond l’efface.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/dependency-graph/demos/lineage.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  DependencyGraph,
  type GraphEdge,
  type GraphNode,
} from "minerva-design/charts";

type Layer = "source" | "staging" | "mart" | "dashboard";

const TABLES: [string, Layer][] = [
  ["raw.orders", "source"],
  ["raw.payments", "source"],
  ["raw.customers", "source"],
  ["raw.events", "source"],
  ["stg_orders", "staging"],
  ["stg_payments", "staging"],
  ["stg_customers", "staging"],
  ["stg_sessions", "staging"],
  ["fct_orders", "mart"],
  ["dim_customers", "mart"],
  ["fct_revenue", "mart"],
  ["fct_engagement", "mart"],
  ["revenue", "dashboard"],
  ["retention", "dashboard"],
  ["growth", "dashboard"],
];

const FEEDS: [string, string][] = [
  ["raw.orders", "stg_orders"],
  ["raw.payments", "stg_payments"],
  ["raw.customers", "stg_customers"],
  ["raw.events", "stg_sessions"],
  ["stg_orders", "fct_orders"],
  ["stg_payments", "fct_orders"],
  ["stg_customers", "dim_customers"],
  ["stg_orders", "dim_customers"],
  ["fct_orders", "fct_revenue"],
  ["stg_payments", "fct_revenue"],
  ["stg_sessions", "fct_engagement"],
  ["dim_customers", "fct_engagement"],
  ["fct_revenue", "revenue"],
  ["dim_customers", "retention"],
  ["fct_engagement", "retention"],
  ["fct_revenue", "growth"],
  ["fct_engagement", "growth"],
];

const LAYERS: Layer[] = ["source", "staging", "mart", "dashboard"];

/** Nodes reachable from `id` following the edges forward or backward */
const reach = (id: string, forward: boolean): number => {
  const seen = new Set([id]);
  const queue = [id];
  while (queue.length) {
    const current = queue.shift()!;
    for (const [a, b] of FEEDS) {
      const [from, to] = forward ? [a, b] : [b, a];
      if (from === current && !seen.has(to)) {
        seen.add(to);
        queue.push(to);
      }
    }
  }
  return seen.size - 1;
};

export default function LineageDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.dependency-graph.data",
  });
  const [selected, setSelected] = useState<string[]>(["fct_orders"]);
  const nodes = useMemo(
    (): GraphNode[] =>
      TABLES.map(([id, layer]) => ({
        id,
        label: layer === "dashboard" ? t(`dashboards.${id}`) : id,
        group: layer,
      })),
    [t],
  );
  const edges = useMemo(
    (): GraphEdge[] => FEEDS.map(([source, target]) => ({ source, target })),
    [],
  );
  const groups = useMemo(
    () => LAYERS.map((id) => ({ id, name: t(`layers.${id}`) })),
    [t],
  );
  const current = selected[0];
  const label = nodes.find((node) => node.id === current)?.label;

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <DependencyGraph
        nodes={nodes}
        edges={edges}
        groups={groups}
        direction="LR"
        selected={selected}
        highlight="lineage"
        height={420}
        ariaLabel={t("lineageAria")}
        onSelectionChange={setSelected}
      />
      <span role="status" style={{ color: "var(--text-secondary-color)" }}>
        {current
          ? t("lineageSummary", {
              name: label,
              upstream: reach(current, false),
              downstream: reach(current, true),
            })
          : t("lineageHint")}
      </span>
    </div>
  );
}

```

## Example: Dépendances de paquets

Les paquets d’un monorepo, des applications jusqu’aux jetons de design et à l’outillage. Les dépendances de développement sont en pointillés ; survolez un paquet pour voir tout ce dont il dépend et tout ce qui dépend de lui. utils et i18n dépendent l’un de l’autre : une dépendance circulaire, tracée en rouge par deux routes distinctes.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/dependency-graph/demos/packages.tsx

```tsx
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  DependencyGraph,
  type GraphEdge,
  type GraphNode,
} from "minerva-design/charts";

type Kind = "app" | "framework" | "library" | "tooling";

const PACKAGES: [string, Kind, string][] = [
  ["docs", "app", "2.4.0"],
  ["playground", "app", "0.9.1"],
  ["admin-console", "app", "1.6.0"],
  ["react", "framework", "3.2.0"],
  ["vue", "framework", "3.2.0"],
  ["angular", "framework", "3.2.0"],
  ["web-components", "framework", "3.2.0"],
  ["charts", "library", "1.8.0"],
  ["core", "library", "3.2.0"],
  ["i18n", "library", "1.1.0"],
  ["icons", "library", "2.0.3"],
  ["tokens", "library", "1.4.2"],
  ["utils", "library", "1.0.7"],
  ["build-scripts", "tooling", "0.5.0"],
  ["eslint-config", "tooling", "4.1.0"],
  ["tsconfig", "tooling", "1.0.0"],
];

// "a depends on b"; dev dependencies are dashed
const DEPENDS: [string, string, boolean?][] = [
  ["docs", "react"],
  ["docs", "vue"],
  ["docs", "angular"],
  ["docs", "web-components"],
  ["docs", "charts"],
  ["docs", "i18n"],
  ["playground", "react"],
  ["playground", "charts"],
  ["admin-console", "react"],
  ["admin-console", "charts"],
  ["admin-console", "i18n"],
  ["react", "core"],
  ["vue", "core"],
  ["angular", "core"],
  ["web-components", "core"],
  ["react", "icons"],
  ["vue", "icons"],
  ["web-components", "icons"],
  ["charts", "core"],
  ["charts", "utils"],
  ["core", "tokens"],
  ["core", "utils"],
  ["icons", "tokens"],
  ["i18n", "utils"],
  ["core", "build-scripts", true],
  ["charts", "build-scripts", true],
  ["react", "eslint-config", true],
  ["build-scripts", "tsconfig", true],
  ["eslint-config", "tsconfig", true],
];

// a circular dependency (both directions between two packages), drawn in red
const CYCLE: [string, string] = ["utils", "i18n"];

const KINDS: Kind[] = ["app", "framework", "library", "tooling"];

export default function PackagesDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.dependency-graph.data",
  });
  const nodes = useMemo(
    (): GraphNode[] =>
      PACKAGES.map(([id, kind, version]) => ({
        id,
        label: id,
        subtitle: `v${version}`,
        group: kind,
      })),
    [],
  );
  const edges = useMemo(
    (): GraphEdge[] => [
      ...DEPENDS.map(([source, target, dev]) => ({
        source,
        target,
        dashed: !!dev,
        label: dev ? t("devDependency") : undefined,
      })),
      {
        source: CYCLE[0],
        target: CYCLE[1],
        color: "var(--danger-color, #ef4444)",
        label: t("circularDependency"),
      },
    ],
    [t],
  );
  const groups = useMemo(
    () => KINDS.map((id) => ({ id, name: t(`kinds.${id}`) })),
    [t],
  );

  return (
    <DependencyGraph
      nodes={nodes}
      edges={edges}
      groups={groups}
      height={520}
      edgeLabels="hover"
      ariaLabel={t("packagesAria")}
    />
  );
}

```

## Example: Chaîne CI/CD

Une chaîne de build de gauche à droite avec des connecteurs orthogonaux. Les groupes colorent les jobs selon leur statut (la légende peut en masquer), la valeur des nœuds est leur durée, et criticalPath met en avant la plus longue chaîne de jobs, recalculée avec criticalPath() pour le résumé. Deux artefacts vont du build de l’application au job de packaging (les arêtes parallèles ont chacune leur tracé), et les tests visuels en échec se relancent eux-mêmes (une boucle).

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/dependency-graph/demos/pipeline.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import {
  DependencyGraph,
  criticalPath,
  type GraphEdge,
  type GraphNode,
} from "minerva-design/charts";

type Status = "success" | "running" | "failed" | "pending";

// task, status, duration in minutes
const TASKS: [string, Status, number][] = [
  ["install", "success", 3],
  ["lint", "success", 2],
  ["typecheck", "success", 3],
  ["unit", "success", 6],
  ["security", "success", 3],
  ["buildWeb", "success", 5],
  ["buildDocs", "success", 4],
  ["e2e", "running", 9],
  ["visual", "failed", 5],
  ["package", "pending", 2],
  ["staging", "pending", 3],
  ["production", "pending", 4],
];

const NEEDS: [string, string, string?][] = [
  ["install", "lint"],
  ["install", "typecheck"],
  ["install", "unit"],
  ["install", "security"],
  ["typecheck", "buildWeb"],
  ["install", "buildDocs"],
  ["buildWeb", "e2e"],
  ["buildWeb", "visual"],
  ["buildDocs", "visual"],
  ["unit", "package"],
  // two artifacts between the same jobs: parallel routes
  ["buildWeb", "package", "bundle"],
  ["buildWeb", "package", "types"],
  ["lint", "package"],
  ["package", "staging"],
  ["e2e", "staging"],
  ["security", "staging"],
  ["visual", "staging"],
  ["staging", "production"],
  // a failed job retries itself: a self-loop
  ["visual", "visual", "retry"],
];

const STATUS_COLORS: Record<Status, string> = {
  success: "var(--success-color, #16a34a)",
  running: "var(--info-color, #0ea5e9)",
  failed: "var(--danger-color, #ef4444)",
  pending: "var(--text-secondary-color, #9ca3af)",
};

const STATUSES: Status[] = ["success", "running", "failed", "pending"];

export default function PipelineDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.dependency-graph.data",
  });
  const [showCritical, setShowCritical] = useState(true);
  const nodes = useMemo(
    (): GraphNode[] =>
      TASKS.map(([id, status, minutes]) => ({
        id,
        label: t(`tasks.${id}`),
        subtitle: t("taskSubtitle", {
          status: t(`statuses.${status}`),
          minutes,
        }),
        group: status,
        value: minutes,
      })),
    [t],
  );
  const edges = useMemo(
    (): GraphEdge[] =>
      NEEDS.map(([source, target, kind]) => ({
        source,
        target,
        label: kind ? t(`edgeKinds.${kind}`) : undefined,
        dashed: kind === "retry",
      })),
    [t],
  );
  const groups = useMemo(
    () =>
      STATUSES.map((id) => ({
        id,
        name: t(`statuses.${id}`),
        color: STATUS_COLORS[id],
      })),
    [t],
  );
  // the same longest path the chart highlights, for the summary below
  const path = useMemo(() => criticalPath(nodes, edges), [nodes, edges]);
  const separator = t("pathSeparator");

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Switch
        checked={showCritical}
        onChange={setShowCritical}
        label={t("showCritical")}
      />
      <DependencyGraph
        nodes={nodes}
        edges={edges}
        groups={groups}
        direction="LR"
        edgeStyle="orthogonal"
        criticalPath={showCritical}
        arrowStyle="filled"
        edgeLabels="hover"
        dag={{ criticalColor: "var(--primary-color, #4f46e5)", layerGap: 48 }}
        height={420}
        ariaLabel={t("pipelineAria")}
      />
      <span role="status" style={{ color: "var(--text-secondary-color)" }}>
        {t("criticalSummary", {
          minutes: new Intl.NumberFormat(i18n.language).format(path.length),
          path: path.nodes.map((id) => t(`tasks.${id}`)).join(separator),
        })}
      </span>
    </div>
  );
}

```

## Example: Planning de projet

Le lancement d'un site planifié par la méthode du chemin critique : les dates de début au plus tôt et au plus tard donnent la marge de chaque tâche, et la chaîne sans marge est passée à criticalPath sous forme de liste d'ids. Les sous-titres affichent des périodes en jours ouvrés avec Intl.DateTimeFormat.formatRange ; cliquez sur une tâche pour lire ses dates et sa marge.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/dependency-graph/demos/project-plan.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  DependencyGraph,
  type GraphEdge,
  type GraphNode,
} from "minerva-design/charts";

type Phase = "discovery" | "design" | "build" | "launch";

// website launch: task, phase, duration in workdays
const TASKS: [string, Phase, number][] = [
  ["brief", "discovery", 3],
  ["research", "discovery", 5],
  ["sitemap", "discovery", 2],
  ["wireframes", "design", 4],
  ["visualDesign", "design", 7],
  ["copy", "design", 6],
  ["backend", "build", 6],
  ["cms", "build", 5],
  ["frontend", "build", 8],
  ["content", "build", 4],
  ["qa", "launch", 4],
  ["seo", "launch", 2],
  ["golive", "launch", 1],
];

const AFTER: [string, string][] = [
  ["brief", "research"],
  ["brief", "backend"],
  ["research", "sitemap"],
  ["sitemap", "wireframes"],
  ["sitemap", "copy"],
  ["sitemap", "cms"],
  ["backend", "cms"],
  ["wireframes", "visualDesign"],
  ["visualDesign", "frontend"],
  ["copy", "content"],
  ["cms", "content"],
  ["frontend", "qa"],
  ["content", "qa"],
  ["content", "seo"],
  ["qa", "golive"],
  ["seo", "golive"],
];

const PHASES: Phase[] = ["discovery", "design", "build", "launch"];
const KICKOFF = Date.UTC(2026, 2, 2); // Monday 2 March 2026

/** Date of the n-th workday (0-based) after the kickoff, skipping weekends */
const workday = (n: number) => {
  const date = new Date(KICKOFF);
  for (let left = n; left > 0;) {
    date.setUTCDate(date.getUTCDate() + 1);
    const day = date.getUTCDay();
    if (day !== 0 && day !== 6) left--;
  }
  return date;
};

/** Critical path method: earliest / latest start and the slack of every task */
const cpm = () => {
  const duration = new Map(TASKS.map(([id, , days]) => [id, days]));
  const early = new Map<string, number>();
  for (const [id] of TASKS) {
    const preds = AFTER.filter(([, b]) => b === id).map(
      ([a]) => early.get(a)! + duration.get(a)!,
    );
    early.set(id, Math.max(0, ...preds));
  }
  const end = Math.max(...TASKS.map(([id, , d]) => early.get(id)! + d));
  const late = new Map<string, number>();
  for (const [id, , days] of [...TASKS].reverse()) {
    const succs = AFTER.filter(([a]) => a === id).map(([, b]) => late.get(b)!);
    late.set(id, Math.min(end, ...succs) - days);
  }
  const slack = new Map(
    TASKS.map(([id]) => [id, late.get(id)! - early.get(id)!]),
  );
  // walk the zero-slack chain from the first task to the last one
  const chain = [TASKS[0][0]];
  for (;;) {
    const last = chain[chain.length - 1];
    const next = AFTER.find(
      ([a, b]) =>
        a === last &&
        slack.get(b) === 0 &&
        early.get(b) === early.get(a)! + duration.get(a)!,
    );
    if (!next) break;
    chain.push(next[1]);
  }
  return { duration, early, slack, end, chain };
};
const PLAN = cpm();

export default function ProjectPlanDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.dependency-graph.data",
  });
  const [selected, setSelected] = useState<string | null>(null);
  const plan = PLAN;
  const dates = useMemo(
    () =>
      new Intl.DateTimeFormat(i18n.language, {
        month: "short",
        day: "numeric",
        weekday: "short",
        timeZone: "UTC",
      }),
    [i18n.language],
  );
  const rangeOf = (id: string) => {
    const start = plan.early.get(id)!;
    return dates.formatRange(
      workday(start),
      workday(start + plan.duration.get(id)! - 1),
    );
  };

  const nodes = useMemo(
    (): GraphNode[] =>
      TASKS.map(([id, phase, days]) => {
        const start = PLAN.early.get(id)!;
        return {
          id,
          label: t(`planTasks.${id}`),
          group: phase,
          value: days,
          subtitle: dates.formatRange(
            workday(start),
            workday(start + days - 1),
          ),
        };
      }),
    [t, dates],
  );
  const edges = useMemo(
    (): GraphEdge[] => AFTER.map(([source, target]) => ({ source, target })),
    [],
  );
  const groups = useMemo(
    () => PHASES.map((id) => ({ id, name: t(`planPhases.${id}`) })),
    [t],
  );

  const slack = selected ? plan.slack.get(selected)! : 0;

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <DependencyGraph
        nodes={nodes}
        edges={edges}
        groups={groups}
        direction="LR"
        edgeStyle="orthogonal"
        criticalPath={plan.chain}
        highlight="none"
        selected={selected ? [selected] : []}
        interaction={{ select: false }}
        height={420}
        ariaLabel={t("planAria")}
        onItemClick={(event) => {
          if (event.type === "node" && event.id) {
            setSelected(event.id === selected ? null : event.id);
          }
        }}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {selected
          ? t(slack === 0 ? "planCriticalTask" : "planTask", {
              name: t(`planTasks.${selected}`),
              range: rangeOf(selected),
              days: plan.duration.get(selected),
              slack,
            })
          : t("planSummary", {
              days: plan.end,
              date: dates.format(workday(plan.end - 1)),
            })}
      </output>
    </div>
  );
}

```

## Example: Recalcul d'un tableur

Les cellules à formule d'un bon de commande et les cellules qu'elles référencent. Modifiez une saisie et les cellules dépendantes sont recalculées : la cellule modifiée est passée dans selected, si bien que la mise en évidence du lignage montre exactement ce qui a été recalculé, et les sous-titres formatent montants et pourcentages avec Intl.NumberFormat.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/dependency-graph/demos/spreadsheet.tsx

```tsx
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { HStack, Input } from "minerva-design";
import {
  DependencyGraph,
  type GraphEdge,
  type GraphNode,
} from "minerva-design/charts";

type InputCell = "price" | "quantity" | "discountRate";
type Cell =
  | InputCell
  | "taxRate"
  | "subtotal"
  | "discount"
  | "net"
  | "tax"
  | "shipping"
  | "total"
  | "unitCost";
type Kind = "input" | "formula";

// cell, address, kind, display format
const CELLS: [Cell, string, Kind, "currency" | "percent" | "integer"][] = [
  ["price", "B1", "input", "currency"],
  ["quantity", "B2", "input", "integer"],
  ["discountRate", "B3", "input", "percent"],
  ["taxRate", "B4", "input", "percent"],
  ["subtotal", "C1", "formula", "currency"],
  ["discount", "C2", "formula", "currency"],
  ["net", "C3", "formula", "currency"],
  ["tax", "C4", "formula", "currency"],
  ["shipping", "C5", "formula", "currency"],
  ["total", "D1", "formula", "currency"],
  ["unitCost", "D2", "formula", "currency"],
];

// precedent → dependent cell
const REFERENCES: [Cell, Cell][] = [
  ["price", "subtotal"],
  ["quantity", "subtotal"],
  ["subtotal", "discount"],
  ["discountRate", "discount"],
  ["subtotal", "net"],
  ["discount", "net"],
  ["net", "tax"],
  ["taxRate", "tax"],
  ["net", "shipping"],
  ["net", "total"],
  ["tax", "total"],
  ["shipping", "total"],
  ["total", "unitCost"],
  ["quantity", "unitCost"],
];

const KINDS: Kind[] = ["input", "formula"];
const INPUTS: InputCell[] = ["price", "quantity", "discountRate"];

const evaluate = (price: number, quantity: number, discountRate: number) => {
  const taxRate = 0.08;
  const subtotal = price * quantity;
  const discount = subtotal * discountRate;
  const net = subtotal - discount;
  const tax = net * taxRate;
  const shipping = net >= 500 ? 0 : 25;
  const total = net + tax + shipping;
  const unitCost = quantity > 0 ? total / quantity : 0;
  return {
    price,
    quantity,
    discountRate,
    taxRate,
    subtotal,
    discount,
    net,
    tax,
    shipping,
    total,
    unitCost,
  } satisfies Record<Cell, number>;
};

/** Cells that depend on `cell`, directly or not */
const dependents = (cell: Cell) => {
  const seen = new Set<Cell>();
  const queue = [cell];
  while (queue.length) {
    const current = queue.shift()!;
    for (const [a, b] of REFERENCES) {
      if (a === current && !seen.has(b)) {
        seen.add(b);
        queue.push(b);
      }
    }
  }
  return seen;
};

export default function SpreadsheetDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.dependency-graph.data",
  });
  const [inputs, setInputs] = useState<Record<InputCell, string>>({
    price: "42",
    quantity: "12",
    discountRate: "10",
  });
  const [changed, setChanged] = useState<InputCell>("discountRate");
  const values = evaluate(
    Number(inputs.price) || 0,
    Number(inputs.quantity) || 0,
    (Number(inputs.discountRate) || 0) / 100,
  );
  const formats = useMemo(
    () => ({
      currency: new Intl.NumberFormat(i18n.language, {
        style: "currency",
        currency: "USD",
      }),
      percent: new Intl.NumberFormat(i18n.language, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
      integer: new Intl.NumberFormat(i18n.language),
    }),
    [i18n.language],
  );

  const nodes = CELLS.map(([id, address, kind, format]): GraphNode => ({
    id,
    label: `${address} · ${t(`cells.${id}`)}`,
    subtitle: formats[format].format(values[id]),
    group: kind,
  }));
  const edges = useMemo(
    (): GraphEdge[] =>
      REFERENCES.map(([source, target]) => ({ source, target })),
    [],
  );
  const groups = useMemo(
    () => KINDS.map((id) => ({ id, name: t(`cellKinds.${id}`) })),
    [t],
  );
  const recalculated = [...dependents(changed)];

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <HStack gap={12} wrap align="end">
        {INPUTS.map((id) => (
          <label key={id} style={{ display: "grid", gap: 4 }}>
            <span>{t(`cells.${id}`)}</span>
            <Input
              type="number"
              min={0}
              step={id === "price" ? 0.5 : 1}
              value={inputs[id]}
              style={{ width: 120 }}
              onChange={(event) => {
                setInputs({ ...inputs, [id]: event.target.value });
                setChanged(id);
              }}
            />
          </label>
        ))}
      </HStack>
      <DependencyGraph
        nodes={nodes}
        edges={edges}
        groups={groups}
        direction="LR"
        highlight="lineage"
        selected={[changed]}
        interaction={{ select: false }}
        animation={false}
        height={380}
        ariaLabel={t("spreadsheetAria")}
        onItemClick={(event) => {
          if (event.type === "node" && INPUTS.includes(event.id as InputCell)) {
            setChanged(event.id as InputCell);
          }
        }}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {t("recalculated", {
          cell: t(`cells.${changed}`),
          total: recalculated.length,
          list: new Intl.ListFormat(i18n.language).format(
            recalculated.map((id) => t(`cells.${id}`)),
          ),
          value: formats.currency.format(values.total),
        })}
      </output>
    </div>
  );
}

```

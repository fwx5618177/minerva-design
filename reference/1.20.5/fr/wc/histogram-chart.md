# Histogramme

La distribution d'échantillons bruts en classes de même largeur, de quelques centaines de valeurs à des millions.

Package: minerva-design@1.20.5

Renderer: wc

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.5",
  "sourceCommit": "fe15b45f84b480cdd9cfec147df037927ba34a6b",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:0dc58bd28a1a59067b94630bd49c5b94d839bdc57ee30a0eaa7de1d0a9681cfb"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.5/types.json) or getType() from minerva-design/contracts.

## Documentation

Requêtes

Distribution d'un million de latences avec p50, p95 et p99

Règle de classes

Auto

Sturges

10 classes

40 classes

Étudiants

Note

Distribution des notes de l'examen

Clients

Âge

Distribution des âges des clients

Contrôle

Nouvel accueil

Durée de session (minutes)

Durées de session des deux groupes d'un test A/B

Ajustement normal

LSI

LSS

Nominal

Outil réglé

Moyenne {{mean}}, σ {{sd}}, Cpk {{cpk}}, {{ppm}} ppm hors tolérance :

capable

non capable

Pièces

Diamètre

Distribution des diamètres d'arbres avec les limites de spécification et une courbe normale ajustée

Livraison gratuite

Médiane {{value}}

p99 {{value}}

{{share}} des commandes atteignent le seuil de livraison gratuite de {{threshold}}.

Commandes

Montant de la commande (échelle log)

Distribution des montants de commande sur une échelle logarithmique

Pause

Reprendre

Réinitialiser

{{share}} des appels décrochés en {{target}} ou moins, p90 {{p90}} :

objectif atteint

objectif manqué

Appels

Temps d'attente

Objectif

p90

Distribution en direct des temps d'attente des 600 derniers appels au support

{{share}} des employés

{{value}} employés ({{share}})

Cliquez pour la part cumulée

Cliquez sur une barre pour voir la part des employés dont le trajet est plus court.

{{share}} des employés ({{employees}}) font un trajet de {{limit}} ou moins.

Employés

Trajet aller

Distribution des temps de trajet des employés

## HistogramChart

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/histogram-chart",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "bins",
    "typeText": "HistogramBinning",
    "attribute": "bins",
    "required": false
  },
  {
    "name": "valueName",
    "typeText": "string | undefined",
    "attribute": "value-name",
    "required": false
  },
  {
    "name": "color",
    "typeText": "string | undefined",
    "attribute": "color",
    "required": false
  },
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "attribute": "height",
    "required": false
  },
  {
    "name": "values",
    "typeText": "ArrayLike<number> | undefined",
    "required": false
  },
  {
    "name": "domain",
    "typeText": "readonly [number, number] | undefined",
    "required": false
  },
  {
    "name": "nice",
    "typeText": "boolean",
    "required": false
  },
  {
    "name": "formatBin",
    "typeText": "(value: number) => string | undefined",
    "required": false
  },
  {
    "name": "series",
    "typeText": "readonly ChartSeries[] | undefined",
    "required": false
  },
  {
    "name": "options",
    "typeText": "ChartBaseOptions | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "minerva-hover",
    "typeText": "CustomEvent",
    "description": "The hovered (or keyboard-focused) points changed; detail: { x, xLabel, items }, `null` when nothing is hovered"
  },
  {
    "name": "minerva-point-click",
    "typeText": "CustomEvent",
    "description": "A point or a bar was clicked; detail: { x, xLabel, items }"
  },
  {
    "name": "minerva-plot-click",
    "typeText": "CustomEvent",
    "description": "The plot area was clicked where there is no point; detail: { x, y }"
  },
  {
    "name": "minerva-zoom",
    "typeText": "CustomEvent",
    "description": "The user zoomed or panned; detail: { x, y } (the visible ranges)"
  },
  {
    "name": "minerva-renderer-change",
    "typeText": "CustomEvent",
    "description": "The backend is ready (or fell back after a GPU loss); detail: { renderer }"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Règles de regroupement

Les mêmes âges en classes de Sturges, 10 ou 40 classes : les deux groupes de clients apparaissent avec assez de classes.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/histogram-chart/wc/binning.html

```html
<div style="display: grid; gap: 8px">
  <div style="display: flex; gap: 8px; align-items: center">
    <span id="label"></span>
    <button id="sturges" type="button">Sturges</button>
    <button id="ten" type="button">10</button>
    <button id="forty" type="button">40</button>
  </div>
  <minerva-histogram-chart
    id="ages"
    bins="sturges"
    height="280"
  ></minerva-histogram-chart>
</div>

```

### apps/docs/src/docs/pages/histogram-chart/wc/binning.ts

```tsx
// The same samples in fewer or more bins: `bins` takes a count or a rule
// (`sturges`, `freedman-diaconis`, `auto`); two groups appear with enough bins.
import type { MinervaHistogramChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { count: "Count", bins: "Bins:", age: "Age" },
  zh: { count: "人数", bins: "分箱：", age: "年龄" },
  ja: { count: "人数", bins: "ビン：", age: "年齢" },
  fr: { count: "Effectif", bins: "Classes :", age: "Âge" },
};

// ages of 2,000 customers: two groups (students, parents), deterministic
const fraction = (value: number) => value - Math.floor(value);
const AGES = Array.from({ length: 2000 }, (_, i) => {
  const u = fraction(Math.sin(i * 12.9898) * 43758.5453);
  const v = fraction(Math.sin(i * 78.233) * 43758.5453);
  return Math.round((i % 3 ? 42 : 22) + (u + v - 1) * (i % 3 ? 16 : 6));
});

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaHistogramChart>("#ages")!;
  const label = root.querySelector<HTMLSpanElement>("#label")!;
  const sturges = root.querySelector<HTMLButtonElement>("#sturges")!;
  const ten = root.querySelector<HTMLButtonElement>("#ten")!;
  const forty = root.querySelector<HTMLButtonElement>("#forty")!;
  chart.values = AGES;
  chart.valueName = text.count;
  chart.options = { xAxis: { title: text.age } };
  label.textContent = text.bins;
  const useSturges = () => {
    chart.bins = "sturges";
  };
  const useTen = () => {
    chart.bins = 10;
  };
  const useForty = () => {
    chart.bins = 40;
  };
  sturges.addEventListener("click", useSturges);
  ten.addEventListener("click", useTen);
  forty.addEventListener("click", useForty);
  return () => {
    sturges.removeEventListener("click", useSturges);
    ten.removeEventListener("click", useTen);
    forty.removeEventListener("click", useForty);
  };
}

```

## Example: Distribution des temps de réponse

5 000 échantillons bruts regroupés par le graphique (Freedman-Diaconis) : la longue traîne apparaît aussitôt.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/histogram-chart/wc/latency.html

```html
<minerva-histogram-chart id="latency" height="300"></minerva-histogram-chart>

```

### apps/docs/src/docs/pages/histogram-chart/wc/latency.ts

```tsx
// <minerva-histogram-chart> bins raw samples itself (`bins="auto"`:
// Freedman-Diaconis); a long tail of slow requests shows at a glance.
import type { MinervaHistogramChart } from "minerva-design/web-components/chart";

const TEXT = {
  en: { requests: "Requests", ms: "Response time (ms)" },
  zh: { requests: "请求数", ms: "响应时间（毫秒）" },
  ja: { requests: "リクエスト数", ms: "応答時間（ms）" },
  fr: { requests: "Requêtes", ms: "Temps de réponse (ms)" },
};

// 5,000 response times (ms): log-normal around 120 ms, generated
// deterministically (the same picture on every load)
const fraction = (value: number) => value - Math.floor(value);
const LATENCY = Array.from({ length: 5000 }, (_, i) => {
  const u = 1 - fraction(Math.sin(i * 12.9898) * 43758.5453);
  const v = fraction(Math.sin(i * 78.233) * 43758.5453);
  const normal = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  return Math.round(Math.exp(4.8 + 0.35 * normal));
});

export function setup(root: HTMLElement) {
  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const chart = root.querySelector<MinervaHistogramChart>("#latency")!;
  chart.values = LATENCY;
  chart.valueName = text.requests;
  chart.options = { xAxis: { title: text.ms } };
}

```

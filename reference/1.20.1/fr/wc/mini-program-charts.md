# Graphiques pour mini-programmes

Tous les graphiques de minerva-design/charts dessinés par le moteur canvas — Chart, LineChart, AreaChart, BarChart, HorizontalBarChart, ScatterChart, QuadrantChart, CandlestickChart, HeatmapChart, Sparkline, RangeAreaChart, MixedChart, BubbleChart, HistogramChart, BoxPlotChart, WaterfallChart, GanttChart et les graphiques de formes PieChart, DonutChart, RadarChart, GaugeChart, FunnelChart, TreemapChart, SankeyChart, SunburstChart, RadialBarChart, CalendarHeatmap, BulletChart, ChordChart et ShapeChart — pour Taro, uni-app et les mini-programmes WeChat natifs, dessinés sur un canvas type="2d" avec les mêmes options que les graphiques web.

Package: minerva-design@1.20.1

Renderer: wc

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.1",
  "sourceCommit": "d476a62793c47d802249dc9c5c91638ffe4210db",
  "sourceDigest": "sha256:2862a9e3a864c9423aed5d287db6fac7e8ddf58b9f5d144c61e7ff4a2630890e",
  "referenceSourceDigest": "sha256:172bbd44559732b657f1ae386911a43aedaffcdf4f5ab90b220a3f9b56302a2f"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.1/types.json) or getType() from minerva-design/contracts.

## Documentation

### Fonctionnement

Les graphiques pour mini-programmes dessinent tout le graphique (axes, données, légende, infobulle, annotations) sur un seul  avec le moteur de rendu canvas du moteur de graphiques Minerva. Ils acceptent les options et préréglages des graphiques web de minerva-design/charts et fonctionnent sur WeChat, Alipay, ByteDance et les autres mini-programmes ainsi qu’en H5. Seule la partie canvas 2D du moteur est embarquée : aucun code WebGPU ni WebGL.

Ils reposent sur createCanvasChart et createCanvasShapeChart ; utilisez-les directement depuis minerva-design/charts/core pour un autre canvas (voir le moteur de graphiques).

### Taro (React)

Importez les graphiques depuis minerva-design/taro. Les props et callbacks sont ceux des composants web ; le graphique occupe la largeur de son parent (width vaut 100 % par défaut) et height vaut 320 px par défaut.

ref expose resetZoom(), getView(), setView(view), getInstance() (le graphique canvas) et resize(). L’id du canvas est généré ; passez id pour le fixer.

### uni-app (Vue)

Importez les composants monofichiers depuis minerva-design/uni. Les props sont celles du web (en kebab-case dans les templates) ; height accepte toute longueur CSS, rpx compris. Pour mettre à jour un graphique, remplacez series / points (ou le tableau data d’une série) : les tableaux modifiés sur place ne sont pas relus.

Événements : hover, point-click, plot-click et zoom. QuadrantChart émet à la place point-click(point, index), quadrant-click(quadrant, { x, y }) et point-drop(point, index, { x, y, quadrant }) (les points sont déplaçables dès qu’un écouteur point-drop existe), et accepte les slots topLeft / topRight / bottomLeft / bottomRight placés sur les quadrants. Une ref de template expose resetZoom(), getView(), setView(view), getRenderer(), getInstance() et resize().

### Mini-programme WeChat natif

Après npm install et « Construire npm » dans WeChat DevTools, déclarez les composants (chart, line-chart, area-chart, bar-chart… — le nom en kebab-case de chaque graphique, voir Tous les composants de graphiques) dans usingComponents. Les propriétés sont en kebab-case et passent par setData ; les fonctions (formats d’axe, texte de l’infobulle) se passent avec configure() sur l’instance renvoyée par selectComponent.

Événements (event.detail) : chaque graphique émet hover ({ items, x, xLabel }), zoom (plages visibles { x, y }) et layout (rectangle de la zone de tracé en px). Les graphiques à séries émettent aussi pointclick, plotclick ({ x, y }) et pointdrag / pointdrop ({ item, x, y }, avec interaction.dragPoints) ; quadrant-chart émet pointclick ({ point, index }), quadrantclick ({ quadrant, x, y }) et pointdrag / pointdrop ({ point, index, target: { x, y, quadrant } }).

Méthodes d’instance : configure({ xAxis: { format }, yAxis: { format }, renderTooltip }) (quadrant-chart : renderTooltip(point, index)), qui renvoie un texte avec des retours à la ligne \n ou null pour masquer l’infobulle ; resize(), resetZoom(), getView(), setView(view), getPlotRect(), toPixel(x, y) et fromPixel(x, y). Les types sont dans minerva-design/weapp/types (NativeChartInstance, NativeQuadrantChartEvents…).

### Props et événements

Tous les graphiques : height (320 par défaut, les nombres sont en px), width (100 % par défaut), legend, tooltip, crosshair, annotations, interaction, padding, palette, ariaLabel et disableScroll.

Les graphiques à séries (Chart, LineChart, AreaChart, BarChart, HorizontalBarChart, ScatterChart, CandlestickChart, RangeAreaChart, MixedChart, BubbleChart) ajoutent series, xAxis et yAxis, ainsi que les props de leur composant web (area, curve, stacked, percent, labels, yAxis2, stackMode, orientation, minSize / maxSize…). HeatmapChart, Sparkline, HistogramChart, BoxPlotChart, WaterfallChart et GanttChart prennent leurs props de données (data, values, groups, steps, tasks…). Chart accepte des séries de tout type, chandeliers et cartes de chaleur compris.

QuadrantChart accepte les réglages de quadrants : points, xDomain, yDomain, xSplit, ySplit, quadrants, xLabel, yLabel, axisLabels, showTicks, reverseX, showLabels, pointSize, name et draggable.

Les événements reprennent les callbacks web : survol, clic sur un point, clic sur la zone de tracé (appui dans le vide) et zoom ; QuadrantChart signale le clic sur un point (point, index), le clic sur un quadrant (quadrant, { x, y }) et le dépôt d’un point (point, index, { x, y, quadrant }). Le graphique ne déplace jamais les points lui-même : mettez à jour points.

### Langue et paramètres régionaux

Sur le web, les graphiques lisent la langue de la page (). Les mini-programmes n’ont pas de  : sans locale, les textes et les nombres suivent navigator.language quand l’environnement en a un, sinon l’anglais (les builds H5 de Taro et uni-app lisent  comme le web). Passez la langue de l’application avec la prop locale de chaque graphique ; WeChat renvoie des langues comme zh_CN : remplacez le tiret bas par un trait d’union (zh-CN) pour que les nombres et les dates soient aussi formatés.

labels remplace des textes intégrés des graphiques à séries (ChartLabels : lignes ouverture / clôture des chandeliers, lignes des boîtes à moustaches et du Gantt, noms de séries par défaut…) et texts ceux des graphiques de formes (ShapeChartLabels : noData, value, share…). Sur HorizontalBarChart et WaterfallChart, labels reste le booléen qui écrit les valeurs : leurs textes suivent seulement locale.

Sans prop locale, les graphiques utilisent la locale du ConfigProvider le plus proche (config-provider sur WeChat natif) : un seul provider localise tous les graphiques d’une page, et la locale d’un graphique reste prioritaire. Le nom accessible (aria-label) est localisé lui aussi : « Chart: Revenue, Costs » en anglais, « Graphique : Ventes, Coûts » en français, à partir des noms des séries d’un graphique cartésien ; un graphique de formes est nommé d’après son type, p. ex. « Pie chart » / « Graphique circulaire », « Chord diagram » / « Diagramme d’accords » (une jauge : « Jauge : CPU ») ; ariaLabel le remplace.

Modifier locale, labels ou texts redessine le graphique : redéfinissez-les (setData sur WeChat natif) quand l’utilisateur change la langue de l’application.

La langue de l’application : les mini-programmes n’ont pas de 

Les fonctions passent par configure() : les libellés des graduations

Ouverture

Clôture

Aucun flux pour l’instant

Applis

Web

Boutique

### Gestes

Un appui affiche l’infobulle et signale le point, un doigt glissé le long du graphique déplace la mise en évidence, deux doigts zooment par pincement, un doigt fait défiler un graphique zoomé, un double appui réinitialise le zoom et un appui sur une entrée de légende masque sa série. Les points déplaçables d’un quadrant suivent le doigt. En H5 et dans les mini-programmes de bureau, la souris fonctionne aussi.

### Thème

Les couleurs et polices viennent des jetons Minerva du ConfigProvider / ThemeProvider englobant (config-provider / theme-provider sur WeChat) : modes clair et sombre, palettes et thèmes de jetons personnalisés s’appliquent et sont repris quand le provider change ; sans provider, les jetons clairs sont utilisés. Les couleurs des options peuvent être des chaînes var(--token, fallback), et les jetons --chart-series-1..8 définissent la palette des séries.

### Limites

Un  est requis. Pas de choix du moteur de rendu : ni WebGPU ni WebGL2.

Les infobulles et superpositions sont dessinées sur le canvas : render de tooltip / renderTooltip renvoient du texte, pas des composants. renderTooltip et quadrantContent avec du contenu React n’existent que sur le web et en React Native. uni-app place des vues sur les quadrants avec des slots ; sur WeChat, utilisez l’événement layout et toPixel() pour positionner vos propres vues.

Pas de zoom à la molette (sauf Ctrl / ⌘ + molette en H5 uni-app) ni de navigation au clavier.

Définissez disableScroll (disable-scroll sur WeChat) quand la page ne doit pas défiler pendant qu’un doigt fait défiler, pince ou glisse sur le graphique ; il est activé par défaut pour les graphiques à quadrants déplaçables sur Taro et uni-app.

Sur WeChat, les propriétés passent par setData : les données doivent être du JSON (horodatages plutôt que Date sur les axes temporels, pas de tableaux typés) et chaque mise à jour les copie, donc les très gros jeux de données sont plus lents que sur le web.

Sur WeChat, un composant ne peut pas savoir si un gestionnaire pointdrop est lié : définissez draggable explicitement pour activer le glissement.

Un graphique masqué au montage mesure 0 px : appelez resize() une fois qu’il est visible (Taro réessaie pendant environ deux secondes).

Les composants disponibles sur chaque plateforme sont listés dans Plateformes prises en charge ; pour des infobulles React riches sur mobile, utilisez les graphiques React Native.

### Tous les composants de graphiques

Chaque graphique de minerva-design/charts dessiné par le moteur canvas a un composant du même nom sur Taro et uni-app, et un composant en kebab-case sur WeChat natif (AreaChart → area-chart). Leurs props sont traduites par les mêmes presets du moteur que les composants web : un graphique a le même aspect et le même comportement sur le web et dans un mini-programme.

Groupe

Taro et uni-app

WeChat (usingComponents)

À axes

Formes

Absents des mini-programmes

Les props sont celles des composants web : AreaChart prend curve, stacked et percent ; HorizontalBarChart stacked, percent et labels ; HistogramChart values et bins ; BoxPlotChart groups ou series ; WaterfallChart steps ; GanttChart tasks, today et todayLabel ; HeatmapChart data et les catégories ; Sparkline data et type (48 px de haut par défaut).

Déclarez les composants utilisés sous leur nom de dossier. Les dates ne survivent pas à setData : passez des horodatages (tâches de Gantt, axes temporels). Les options fonctions passent par configure() : format (heatmap-chart, sparkline, waterfall-chart), formatBin (histogram-chart), formatProgress (gantt-chart), les formats d'axes et renderTooltip.

SunburstChart zoome sur un parent touché et remonte avec un tap au centre : onDrill sur Taro, l'événement drill sur uni-app et WeChat (bind:drill), drill(path) et getDrillPath() sur l'instance ; définissez drillPath pour contrôler l'exploration.

TradingChart, DepthChart, OrderBook, OrderBookHeatmap, TimeAndSales et les graphiques 3D (Scatter3DChart, Surface3DChart, Bar3DChart, Line3DChart) ont besoin d'un DOM et de WebGPU / WebGL : ils n'ont pas de composant mini-programme. Affichez plutôt le composant web dans une page web-view.

Les options des préréglages des composants web sont transmises : connector de WaterfallChart (true, false ou { color, dash, width }), colorScale ("sequential", "diverging" ou des couleurs) et colorMidpoint de HeatmapChart, dependenciesName, dependencyArrows (flèches coudées depuis chaque prédécesseur, actives par défaut) et dependencyColor de GanttChart (avec les dependencies des tâches), outlierShape et outlierSize de BoxPlotChart.

### Chandeliers, cartes de chaleur, courbes et piles

Les séries sont transmises telles quelles au moteur : les nouveautés des séries fonctionnent donc sur tous les graphiques de mini-programmes — type "candlestick" (points { x, open, high, low, y }, y étant la clôture) et type "heatmap" (cellules { x, y, value }) via Chart, curve: "smooth" ou "step" et stack sur les séries en ligne et en aire, showLabels pour les valeurs des barres, et une couleur par barre.

heatmapChartOptions({ data, xCategories, yCategories }) de minerva-design/charts/core renvoie la série, les axes de catégories et les réglages de légende, d’infobulle et d’interaction d’une carte de chaleur : passez-les à Chart.

Les composants nommés AreaChart, CandlestickChart, HeatmapChart, Sparkline et les autres existent désormais sur tous les mini-programmes (voir Tous les composants de graphiques) ; Chart avec des séries typées reste utile pour mélanger les types. Sur WeChat natif, les séries passent par setData : elles doivent être du JSON simple (pas de fonction format par série : utilisez configure() pour les formats d’axes, les formats de valeurs et l’infobulle).

### Graphiques de formes

PieChart, DonutChart, RadarChart, GaugeChart, FunnelChart, TreemapChart, SankeyChart, SunburstChart, RadialBarChart, CalendarHeatmap et BulletChart prennent les props des graphiques de formes web (data, innerRadius, centerValue, indicators, bands, sort, headers, links, drillPath, range, ranges…, plus palette, legend, tooltip, format, percentFormat, hidden, animation, padding et ariaLabel) et dessinent les libellés, la légende et l'infobulle sur un seul  avec createCanvasShapeChart. ShapeChart prend les options moteur de n'importe quel type de forme (options avec un type) : un type ajouté au moteur ne demande aucun nouveau composant. Un tap met une marque en avant et affiche son infobulle, un tap sur une entrée de légende la masque ; les hauteurs par défaut sont celles des composants web (GaugeChart 240 px, RadialBarChart 300 px, SankeyChart et SunburstChart 360 px, CalendarHeatmap et BulletChart selon les données, les autres 320 px).

Importez-les depuis minerva-design/taro. Les callbacks sont onHover, onClick, onToggle (avec hidden pour une légende contrôlée) et onDrill sur SunburstChart et ShapeChart ; ref expose getInstance() (toggle, getHidden, clearHover, drill, getDrillPath…) et resize(). Les infobulles sont du texte sur le canvas : tooltip.render peut renvoyer une chaîne, il n'y a pas de renderTooltip.

Importez-les depuis minerva-design/uni (ou minerva-design/uni/PieChart.vue…). Les événements sont hover, click, toggle et drill (sunburst) ; height accepte les rpx ; une ref de template expose getInstance() et resize(). Remplacez les tableaux data pour mettre un graphique à jour.

Déclarez pie-chart, donut-chart, radar-chart, gauge-chart, funnel-chart, treemap-chart, sankey-chart, sunburst-chart, radial-bar-chart, calendar-heatmap, bullet-chart ou shape-chart dans usingComponents. Les propriétés sont des valeurs JSON en kebab-case ; format, percentFormat et le texte de l'infobulle (renderTooltip) passent par configure().

Événements (event.detail) : hover (la marque mise en avant : index, name, value, percent, color, path ; index vaut -1 quand elle est effacée), click (une marque touchée), toggle ({ index, hidden, hiddenIndexes }) et drill ({ path }, sunburst). Méthodes : configure(config), resize(), toggle(index), getHidden(), clearHover(), drill(path) et getDrillPath(). Types : NativeShapeChartInstance, NativeShapeChartEvents et les interfaces *ChartProperties de minerva-design/weapp/types.

Le moteur sur votre propre canvas

createCanvasShapeChart (et createCanvasChart) dessinent sur n'importe quel canvas 2D. Dans un projet WeChat natif, faites require("minerva-design/charts/core") après « Build npm » : le dossier mini-programme du paquet contient le moteur sans DOM sous charts/core.js, un module partagé avec les composants de graphiques (aucun poids supplémentaire). Avec Taro et uni-app, importez-le depuis minerva-design/charts/core.

Transmettez les événements tactiles (les touches d'un canvas de mini-programme portent x / y relatifs au canvas ; en H5, soustrayez la position du canvas de clientX / clientY), appelez resize(width, height) quand la taille change et destroy() quand la page se ferme. Le thème est fait de valeurs : passez les variables CSS Minerva utiles dans theme.variables.

ChordChart dessine un diagramme d’accords : des groupes (noms ou { name, color }) répartis sur un cercle et des rubans issus d’une matrice ou d’une liste de liens, orientés avec flèches, triés, colorés selon la source, la cible ou un dégradé, avec des graduations de valeurs — les props du composant web. Sa hauteur par défaut est de 420 px ; sur WeChat natif, passez tickFormat avec configure().

```tsx
import { useState } from "react";
import { Text, View } from "@tarojs/components";
import {
  LineChart,
  QuadrantChart,
  miniTokenClassNames,
  type QuadrantPoint,
} from "minerva-design/taro";
import "minerva-design/tokens.mini.css";
import "minerva-design/taro/style.css";

export default function Dashboard() {
  const [picked, setPicked] = useState("");
  const [tasks, setTasks] = useState<QuadrantPoint[]>([
    { x: 8, y: 9, label: "Release" },
    { x: 3, y: 7, label: "Planning" },
  ]);

  return (
    <View className={miniTokenClassNames()}>
      <LineChart
        height={240}
        series={[{ name: "Sales", data: [12, 18, 9, 24] }]}
        xAxis={{ title: "Month" }}
        tooltip={{ render: (event) => `Sales: ${event.items[0]?.y}` }}
        onPointClick={(event) => setPicked(event.xLabel)}
      />
      <Text>{picked}</Text>
      <QuadrantChart
        points={tasks}
        reverseX
        showTicks={false}
        quadrants={{ topLeft: { label: "Do first" } }}
        axisLabels={{ top: "Important", left: "Urgent" }}
        onQuadrantClick={(quadrant, at) =>
          setTasks((list) => [...list, { ...at, label: "New task" }])
        }
        onPointDrop={(task, index, target) =>
          setTasks((list) =>
            list.map((p, i) => (i === index ? { ...p, x: target.x, y: target.y } : p)),
          )
        }
      />
    </View>
  );
}
```

```html
<script setup lang="ts">
import { ref } from "vue";
import {
  LineChart,
  QuadrantChart,
  miniTokenClassNames,
  type ChartHandle,
  type ChartHoverEvent,
  type QuadrantDropTarget,
  type QuadrantPoint,
} from "minerva-design/uni";
import "minerva-design/tokens.mini.css";
import "minerva-design/uni/style.css";

const series = ref([{ name: "Sales", data: [12, 18, 9, 24] }]);
const tasks = ref<QuadrantPoint[]>([{ x: 8, y: 9, label: "Release" }]);
const picked = ref("");
const chart = ref<ChartHandle>(); // chart.value?.resize(), resetZoom()...

const show = (event: ChartHoverEvent) => (picked.value = event.xLabel);
function move(point: QuadrantPoint, index: number, target: QuadrantDropTarget) {
  // replace the array: arrays mutated in place are not read again
  tasks.value = tasks.value.map((p, i) =>
    i === index ? { ...p, x: target.x, y: target.y } : p,
  );
}
function add() {
  tasks.value = [...tasks.value, { x: 7.5, y: 7.5, label: "New task" }];
}
</script>

<template>
  <view :class="miniTokenClassNames()">
    <LineChart ref="chart" :series="series" height="480rpx" area @point-click="show" />
    <text>{{ picked }}</text>
    <QuadrantChart
      :points="tasks"
      :quadrants="{ topRight: { label: 'Do first' } }"
      :axis-labels="{ top: 'Important' }"
      @point-drop="move"
    >
      <template #topRight>
        <button size="mini" @click="add">+</button>
      </template>
    </QuadrantChart>
  </view>
</template>
```

```json
{
  "usingComponents": {
    "mn-line-chart": "minerva-design/line-chart/index",
    "mn-quadrant-chart": "minerva-design/quadrant-chart/index"
  }
}
```

```html
<mn-line-chart
  id="visits"
  series="{{series}}"
  x-axis="{{xAxis}}"
  area
  height="240"
  bind:pointclick="onPoint"
/>
<mn-quadrant-chart
  points="{{tasks}}"
  quadrants="{{regions}}"
  axis-labels="{{ends}}"
  draggable
  disable-scroll
  bind:pointdrop="onDrop"
  bind:quadrantclick="onQuadrant"
/>
```

```js
Page({
  data: {
    series: [{ name: "Visits", data: [["Mon", 3], ["Tue", 5], ["Wed", 4]] }],
    xAxis: { type: "category" },
    tasks: [{ x: 8, y: 9, label: "Release" }],
    regions: { topRight: { label: "Do first" } },
    ends: { top: "Important" },
  },
  onReady() {
    // functions cannot go through setData: pass them with configure()
    this.selectComponent("#visits").configure({
      yAxis: { format: (value) => `${value}k` },
      renderTooltip: (event) => `${event.xLabel}\n${event.items[0].y}k visits`,
    });
  },
  onPoint(event) {
    wx.showToast({ title: event.detail.xLabel, icon: "none" });
  },
  onDrop(event) {
    const { index, target } = event.detail;
    // the chart does not move points: update them
    this.setData({
      [`tasks[${index}].x`]: target.x,
      [`tasks[${index}].y`]: target.y,
    });
  },
  onQuadrant(event) {
    const { x, y } = event.detail;
    this.setData({ tasks: [...this.data.tasks, { x, y, label: "New task" }] });
  },
});
```

```tsx
import { useState } from "react";
import { Text, View } from "@tarojs/components";
import {
  AreaChart,
  GanttChart,
  Sparkline,
  SunburstChart,
} from "minerva-design/taro";

const day = 86_400_000;
const start = Date.UTC(2026, 2, 2);

export default function Overview() {
  const [path, setPath] = useState<string[]>([]);
  return (
    <View>
      <Sparkline data={[42, 47, 45, 52, 58, 61]} type="area" />
      <AreaChart
        percent
        series={[
          { name: "Web", data: [["Q1", 42], ["Q2", 48], ["Q3", 51]] },
          { name: "App", data: [["Q1", 58], ["Q2", 52], ["Q3", 49]] },
        ]}
      />
      <GanttChart
        today={start + 10 * day}
        tasks={[
          { name: "Design", start, end: start + 12 * day, progress: 1 },
          { name: "Build", start: start + 9 * day, end: start + 30 * day, progress: 0.4 },
          { name: "Launch", start: start + 32 * day, milestone: true },
        ]}
      />
      <SunburstChart
        data={[
          { name: "Photos", children: [{ name: "2025", value: 22 }, { name: "2026", value: 10 }] },
          { name: "Apps", value: 18 },
        ]}
        onDrill={(event) => setPath(event.path)}
      />
      <Text>{path.join(" / ")}</Text>
    </View>
  );
}
```

```html
<script setup lang="ts">
import { ref } from "vue";
import {
  HeatmapChart,
  SankeyChart,
  SunburstChart,
  WaterfallChart,
  type ShapeDrillEvent,
} from "minerva-design/uni";

const cells = ref([
  { x: "Mon", y: "AM", value: 12 },
  { x: "Mon", y: "PM", value: 30 },
  { x: "Tue", y: "AM", value: 18 },
  { x: "Tue", y: "PM", value: 26 },
]);
const steps = ref([
  { label: "Revenue", value: 420 },
  { label: "Costs", value: -260 },
  { label: "Profit", kind: "total" as const },
]);
const links = ref([
  { source: "Ads", target: "Site", value: 60 },
  { source: "Search", target: "Site", value: 40 },
  { source: "Site", target: "Sign-up", value: 30 },
]);
const folders = ref([
  { name: "Photos", children: [{ name: "2025", value: 22 }, { name: "2026", value: 10 }] },
  { name: "Apps", value: 18 },
]);
const path = ref<string[]>([]);
const onDrill = (event: ShapeDrillEvent) => (path.value = event.path);
</script>

<template>
  <HeatmapChart :data="cells" height="400rpx" />
  <WaterfallChart :steps="steps" orientation="horizontal" />
  <SankeyChart :links="links" />
  <SunburstChart :data="folders" @drill="onDrill" />
  <text>{{ path.join(" / ") }}</text>
</template>
```

```json
{
  "usingComponents": {
    "mn-gantt-chart": "minerva-design/gantt-chart/index",
    "mn-sunburst-chart": "minerva-design/sunburst-chart/index",
    "mn-bullet-chart": "minerva-design/bullet-chart/index"
  }
}
```

```html
<mn-gantt-chart id="plan" tasks="{{tasks}}" today="{{today}}" />
<mn-sunburst-chart data="{{folders}}" bind:drill="onDrill" />
<text>{{path}}</text>
<mn-bullet-chart data="{{kpis}}" ranges="{{ranges}}" />
```

```js
const day = 86400000;
const start = Date.UTC(2026, 2, 2);

Page({
  data: {
    // timestamps: Date objects do not survive setData
    tasks: [
      { name: "Design", start, end: start + 12 * day, progress: 1 },
      { name: "Build", start: start + 9 * day, end: start + 30 * day, progress: 0.4 },
    ],
    today: start + 10 * day,
    folders: [
      { name: "Photos", children: [{ name: "2025", value: 22 }, { name: "2026", value: 10 }] },
      { name: "Apps", value: 18 },
    ],
    path: "",
    kpis: [{ name: "Revenue", value: 270, target: 250 }],
    ranges: [150, 225, 300],
  },
  onReady() {
    this.selectComponent("#plan").configure({
      formatProgress: (share) => `${Math.round(share * 100)}%`,
    });
  },
  onDrill(event) {
    this.setData({ path: event.detail.path.join(" / ") });
  },
});
```

```tsx
import { BarChart, Chart, LineChart } from "minerva-design/taro";
import { heatmapChartOptions } from "minerva-design/charts/core";

const prices = [
  {
    name: "ACME",
    type: "candlestick",
    data: [
      { x: 1, open: 102, high: 108, low: 99, y: 106 },
      { x: 2, open: 106, high: 107, low: 97, y: 98 },
      { x: 3, open: 98, high: 104, low: 96, y: 103 },
    ],
  },
] as const;

const load = heatmapChartOptions({
  data: [
    { x: "Mon", y: "AM", value: 12 },
    { x: "Mon", y: "PM", value: 30 },
    { x: "Tue", y: "AM", value: 18 },
    { x: "Tue", y: "PM", value: 26 },
  ],
});

export function Charts() {
  return (
    <>
      <Chart series={prices} height={220} />
      <Chart
        series={load.series}
        xAxis={load.xAxis}
        yAxis={load.yAxis}
        legend={load.legend}
        tooltip={load.tooltip}
        interaction={load.interaction}
        height={200}
      />
      {/* curve and stack are set on each series */}
      <LineChart
        area
        series={[
          { name: "Web", data: [20, 24, 30], curve: "smooth", stack: "users" },
          { name: "App", data: [12, 18, 17], curve: "smooth", stack: "users" },
        ]}
      />
      <BarChart
        series={[
          {
            name: "Orders",
            showLabels: true,
            data: [
              { x: "Q1", y: 128 },
              { x: "Q2", y: 212, color: "#16a34a" },
            ],
          },
        ]}
      />
    </>
  );
}
```

```tsx
import { useState } from "react";
import { Text, View } from "@tarojs/components";
import {
  DonutChart,
  GaugeChart,
  ShapeChart,
  type ShapeHoverEvent,
} from "minerva-design/taro";

const plans = [
  { name: "Free", value: 5400 },
  { name: "Pro", value: 2100 },
  { name: "Team", value: 860 },
];

export default function Plans() {
  const [picked, setPicked] = useState<ShapeHoverEvent | null>(null);
  const [hidden, setHidden] = useState<number[]>([]);
  return (
    <View>
      <DonutChart
        data={plans}
        height={260}
        centerValue="8.4k"
        centerLabel="users"
        percentFormat={(share) => `${Math.round(share * 100)}%`}
        hidden={hidden}
        onToggle={(event) => setHidden(event.hiddenIndexes)}
        onClick={setPicked}
      />
      <Text>{picked ? `${picked.name}: ${picked.value}` : "Tap a plan"}</Text>
      <GaugeChart value={72} label="Storage" height={200} />
      {/* any shape type of the engine, from its options */}
      <ShapeChart
        options={{
          type: "funnel",
          data: [
            { name: "Visit", value: 1200 },
            { name: "Sign up", value: 380 },
            { name: "Paid", value: 95 },
          ],
        }}
      />
    </View>
  );
}
```

```html
<script setup lang="ts">
import { ref } from "vue";
import {
  PieChart,
  RadarChart,
  type ShapeChartHandle,
  type ShapeHoverEvent,
} from "minerva-design/uni";

const sources = ref([
  { name: "Search", value: 48 },
  { name: "Direct", value: 23 },
  { name: "Social", value: 16 },
]);
const picked = ref("");
const radar = ref<ShapeChartHandle>(); // radar.value?.getInstance()?.toggle(0)
const pick = (slice: ShapeHoverEvent) => (picked.value = slice.name);
</script>

<template>
  <PieChart :data="sources" labels="inside" height="520rpx" @click="pick" />
  <text>{{ picked }}</text>
  <RadarChart
    ref="radar"
    :indicators="[{ name: 'Speed' }, { name: 'Power' }, { name: 'Range' }]"
    :series="[{ name: 'Model A', values: [3, 4, 2] }]"
    shape="circle"
  />
</template>
```

```json
{
  "usingComponents": {
    "mn-pie-chart": "minerva-design/pie-chart/index",
    "mn-gauge-chart": "minerva-design/gauge-chart/index",
    "mn-shape-chart": "minerva-design/shape-chart/index"
  }
}
```

```html
<mn-pie-chart
  id="sources"
  data="{{sources}}"
  inner-radius="{{0.6}}"
  center-value="87"
  bind:click="onSlice"
  bind:toggle="onToggle"
/>
<mn-gauge-chart value="{{cpu}}" label="CPU" bands="{{bands}}" needle />
<mn-shape-chart options="{{treemap}}" height="300" />
```

```js
Page({
  data: {
    sources: [
      { name: "Search", value: 48 },
      { name: "Direct", value: 23 },
      { name: "Social", value: 16 },
    ],
    cpu: 64,
    bands: [
      { to: 70, color: "var(--success-color)" },
      { to: 100, color: "var(--danger-color)" },
    ],
    // shape-chart: any shape type, options without functions
    treemap: {
      type: "treemap",
      data: [
        { name: "Photos", value: 38 },
        { name: "Apps", children: [{ name: "Games", value: 14 }, { name: "Maps", value: 3 }] },
      ],
    },
    hiddenCount: 0,
  },
  onReady() {
    // functions cannot go through setData: pass them with configure()
    this.selectComponent("#sources").configure({
      percentFormat: (share) => `${Math.round(share * 100)}%`,
      renderTooltip: (slice) => `${slice.name}\n${slice.value} visits`,
    });
  },
  onSlice(event) {
    wx.showToast({ title: event.detail.name, icon: "none" });
  },
  onToggle(event) {
    this.setData({ hiddenCount: event.detail.hiddenIndexes.length });
  },
});
```

```js
// pages/plans/index.js, with <canvas type="2d" id="plans" bindtouchstart="onTouchStart" ...>
const { createCanvasShapeChart } = require("minerva-design/charts/core");

Page({
  onReady() {
    wx.createSelectorQuery()
      .select("#plans")
      .fields({ node: true, size: true })
      .exec(([res]) => {
        this.chart = createCanvasShapeChart({
          canvas: res.node,
          width: res.width,
          height: res.height,
          pixelRatio: wx.getWindowInfo().pixelRatio,
          options: {
            type: "pie",
            innerRadius: 0.62,
            data: [
              { name: "Free", value: 5400 },
              { name: "Pro", value: 2100 },
            ],
          },
          // plain values of the Minerva CSS variables
          theme: { variables: { "--primary-color": "#4f46e5" } },
        });
        this.chart.on("click", (slice) =>
          wx.showToast({ title: slice.name, icon: "none" }),
        );
      });
  },
  // mini-program canvas touches carry x / y relative to the canvas
  onTouchStart(e) { this.chart?.touchStart(e.changedTouches); },
  onTouchMove(e) { this.chart?.touchMove(e.touches); },
  onTouchEnd(e) { this.chart?.touchEnd(e.changedTouches); },
  onTouchCancel(e) { this.chart?.touchCancel(e.changedTouches); },
  onUnload() { this.chart?.destroy(); },
});
```

```json
{
  "usingComponents": {
    "mn-candlestick-chart": "minerva-design/candlestick-chart/index",
    "mn-chord-chart": "minerva-design/chord-chart/index"
  }
}
```

```html
<mn-candlestick-chart series="{{candles}}" locale="{{locale}}" labels="{{labels}}" />
<mn-chord-chart
  id="flows"
  groups="{{groups}}"
  matrix="{{matrix}}"
  locale="{{locale}}"
  texts="{{texts}}"
/>
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

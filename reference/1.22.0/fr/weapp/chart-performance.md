# Performances des graphiques

Comment le moteur de graphiques reste rapide avec des millions de points, démonstrations en direct à l’appui : choix du moteur de rendu et repli, formats de données, ce qui dépend de la plage visible, décimation, détection des survols, conseils pour React et le streaming, et budgets des mini-programmes et de React Native.

Package: minerva-design@1.22.0

Renderer: weapp

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.0",
  "sourceCommit": "e2a31507ecfcdb5ffcd33b05b47404c7625bb883",
  "sourceDigest": "sha256:a33fb5e0b8f01ae452ce95d2b723ab0cd9905636d574c72fd12c1459f4c09d3a",
  "referenceSourceDigest": "sha256:2459da5f08881aec3d2ac2d940ce35e7a61d0e0e679c0c167d8b5fdf8330a456"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.0/types.json) or getType() from minerva-design/contracts.

## Documentation

### Vue d’ensemble

Le moteur fait le travail coûteux une seule fois par jeu de données, puis chaque étape suivante reste proportionnelle à ce qui est affiché. Les tableaux de données sont normalisés en colonnes Float64Array, transformés en tampons GPU et réutilisés tant que vous passez les mêmes références ; le survol, le zoom et le déplacement ne touchent ensuite que les points visibles ou une transformation. Cette page explique ce qui est rapide, ce qui coûte un parcours complet des données et comment rester sur le chemin rapide.

Les options sont décrites dans Chart (React) et Moteur de graphiques (sans framework). Les quatre moteurs sont comparés côte à côte, avec bancs d'essai en direct et notes, sur Comparatif des moteurs de rendu.

### Moteurs de rendu et repli

Les graphiques cartésiens (courbes, aires, barres, nuages de points, chandeliers, cartes de chaleur, sparklines, quadrants) dessinent leurs données avec le GPU et leurs textes (axes, étiquettes, légende, infobulle) avec le DOM. L’option renderer choisit le backend.

auto (par défaut) essaie WebGPU, puis WebGL2, puis WebGL, puis Canvas2D, et garde le premier qui démarre. La promesse ready est résolue avec le type retenu, également signalé par onRendererChange / l’événement renderer.

WebGL (1) sert de filet de sécurité pour les GPU et pilotes anciens et pour les navigateurs sans WebGL2 : mêmes marques, mêmes couleurs, même anticrénelage, dessinés avec des shaders GLSL ES 1.0 et instanciés grâce à l’extension ANGLE_instanced_arrays (disponible quasiment partout). Sans cette extension, le graphique passe à Canvas2D.

En mode auto, les GPU logiciels sont ignorés car plus lents que Canvas2D : WebGPU refuse les adaptateurs de repli, et WebGL2 et WebGL sont créés avec failIfMajorPerformanceCaveat puis refusés si le nom du moteur trahit un rastériseur logiciel (SwiftShader, llvmpipe, softpipe, Microsoft Basic Render Driver…). Les machines virtuelles et les navigateurs sans interface finissent donc généralement sur Canvas2D.

renderer: "webgpu", "webgl2", "webgl" ou "canvas2d" impose un backend, GPU logiciels compris ; s’il ne peut pas démarrer, le suivant de la chaîne est utilisé. Canvas2D convient aux petits graphiques et aux captures d’écran ; le GPU l’emporte à partir de quelques dizaines de milliers de points.

Quand le GPU est perdu (réinitialisation du pilote, trop de contextes), le graphique se replie sur le backend suivant, se redessine et émet de nouveau l’événement renderer. Les navigateurs limitent le nombre de contextes WebGL actifs (environ 16) : un tableau de bord comptant des dizaines de graphiques GPU doit détruire ceux qui sortent de l’écran ou utiliser Canvas2D pour les petits.

### Un moteur de rendu pour tous les graphiques

setDefaultChartRenderer() fixe le backend de tous les graphiques dont le renderer est absent ou "auto", quel que soit le framework : la valeur par défaut vit sur globalThis, si bien que les composants React, les wrappers Vue et Angular et les Web Components la partagent, même quand une page embarque plusieurs copies du moteur. Les graphiques déjà affichés suivent un changement en direct : ils recréent leur moteur de rendu sur place, en gardant leurs données, leur zoom et leur état. subscribeDefaultChartRenderer() signale les changements, par exemple pour synchroniser un sélecteur.

L’option renderer d’un graphique l’emporte toujours. Un backend forcé par la valeur par défaut compte comme forcé : il peut tourner sur un GPU logiciel et passe au backend suivant s’il ne peut pas démarrer. "auto" rétablit la détection automatique.

La barre de rendu en haut des pages de graphiques de cette documentation fait exactement cela : choisissez-y Canvas2D ou WebGL et tous les graphiques de la page basculent dessus, un badge sous chaque exemple indiquant le backend réellement utilisé. Ici, l’option Auto de chaque démonstration la suit.

### Démonstrations en direct

Les exemples ci-dessous dessinent jusqu’à un million de marques dans votre navigateur. Leurs données sont générées une seule fois, dans des tableaux typés avec un générateur aléatoire à graine, quand l’exemple approche de l’écran, et chaque animation s’arrête tant que son exemple est hors de l’écran. Choisissez un backend pour l’imposer — le graphique indique celui qui a réellement démarré — puis laissez la visite guidée zoomer et dézoomer, ou prenez la main à la souris.

FPS et durée d’image : la fréquence à laquelle la page se redessine pendant que le graphique bouge. Les écrans se rafraîchissent 60 fois par seconde ou plus ; en dessous de 30, le mouvement paraît saccadé.

Fil principal : le temps JavaScript, style, mise en page et peinture de chaque image, appels de dessin du graphique compris (le GPU travaille en parallèle). Plus il est bas, plus il reste de marge pour le reste de la page.

Première image : du moment où les données (ou un nouveau backend) sont confiées au graphique jusqu’à la première image peinte — normalisation des colonnes, construction des tampons GPU et dessin.

Moteur de rendu

Auto

WebGPU

WebGL2

WebGL

Canvas2D

Page ({{backend}})

Visite guidée

Flux

Moteur

FPS

Durée d’image

Fil principal

Première image

Points

Cellules

Chandeliers

Débit

{{value}} ms

{{value}} fps

{{value}}/s

{{value}} dB

Génération de {{value}} points de données…

Démarrage du moteur de rendu…

Auto a choisi {{backend}}, le meilleur backend disponible ici.

Auto a choisi {{backend}} : aucun GPU avec accélération matérielle n’est disponible ici (les GPU logiciels sont ignorés).

Dessiné avec {{backend}}, comme demandé.

{{requested}} ne peut pas démarrer ici : repli sur {{backend}}.

Visite guidée en pause : une image occupe le fil principal {{ms}} avec ce backend. Réactivez-la ou choisissez un autre backend.

Dessiné avec {{backend}}, le moteur de rendu choisi pour la page.

{{requested}}, choisi pour la page, tourne ici sur un GPU logiciel : cet exemple utilise {{backend}} pour que la page reste fluide. Choisissez {{requested}} dans cet exemple pour le forcer.

Ctrl / ⌘ + molette ou pincement pour zoomer, glisser pour se déplacer, double-clic pour réinitialiser. L’axe y suit la plage visible.

Ctrl / ⌘ + molette ou pincement pour zoomer sur les deux axes, glisser pour se déplacer, double-clic pour réinitialiser.

Les échantillons les plus anciens quittent la fenêtre à mesure que les nouveaux arrivent ; survolez pour lire un canal.

Capteur {{index}}

Température (°C)

Quatre capteurs, 1 000 000 de mesures

Groupe {{index}}

Dix groupes, 1 000 000 de points

Indice

Prix

200 000 chandeliers d’une minute

Niveau

Temps (s)

Fréquence (Hz)

Spectrogramme de 1 000 × 1 000 cellules

Canal {{index}}

{{value}} canaux diffusés en temps réel

{{backend}} : le même jeu de données

Jeu de données

Courbe · 1 M de points

Nuage · 1 M de points

Lancer le benchmark

→ {{backend}} (repli)

Mesure…

Temps du fil principal par image (le plus court est le mieux) et fréquence d’images

Mesure de {{backend}}…

Terminé : mêmes données, même parcours de zoom, un backend à la fois.

Lancez le benchmark pour mesurer chaque backend sur cet appareil.

Chaque passage monte un seul graphique avec tous les points pendant 3 s, puis remet son aperçu.

{{requested}} → {{backend}}

Aperçu : {{value}} points dessinés en Canvas2D. Lancez le benchmark pour dessiner le million.

{{backend}} : aperçu du jeu de données

En direct : {{value}} points dessinés avec {{backend}}

GPU logiciel : ignoré (bloquerait la page)

Lancer quand même

Ignoré

Ignorés (GPU logiciel) : {{backends}}.

### Formats de données, du plus rapide au plus lent

Chaque série est normalisée en colonnes une seule fois. Le coût de ce passage dépend du format fourni :

Colonnes de tableaux typés ({ x: Float64Array, y: Float32Array }) : copiées en un seul appel set(), sans conversion point par point. Les colonnes open / high / low / value fournies en Float64Array sont utilisées telles quelles. Idéal au-delà de 100 000 points.

Colonnes de tableaux ordinaires ({ x: number[], y: number[] }) : une seule boucle de copies numériques ; les catégories et les dates sont converties à ce moment.

Couples [x, y] : la lecture d’un petit tableau par point.

Objets { x, y, … } : le format le plus souple (size, color, label, open/high/low, value) et le plus lent, chaque champ étant lu pour chaque point. Convient très bien jusqu’à quelques milliers de points.

Les données normalisées sont mises en cache par id de série (ou index) et par identité du tableau : repasser le même tableau ne coûte rien, mais un tableau modifié sur place n’est pas relu. Donnez un id aux séries dont l’ordre peut changer et triez x par ordre croissant : les données triées activent les recherches dichotomiques décrites ci-dessous.

### Ce qui dépend de la plage visible

Après le premier passage, le travail d’une image dépend de ce qui est visible et non de la taille du jeu de données :

Courbes, aires et barres à x trié : la plage visible est trouvée par recherche dichotomique, seuls ces points sont dessinés et testés au survol. La recherche au survol est en O(log n).

Les séries de points, de chandeliers et de cartes de chaleur sont dessinées entièrement (sur le GPU, en un seul appel de dessin instancié), de même que les courbes non triées.

Canvas2D décime les courbes et les aires au minimum / maximum de chaque colonne de pixels (au plus 4 points par colonne) : un million de points se dessinent en quelques milliers de segments, avec la même silhouette.

Au-delà de 20 000 points, Canvas2D rastérise les nuages de points directement dans un tampon ImageData au lieu de tracer des chemins ; sans canevas de travail (mini-programmes), il dessine un carré par cellule occupée.

La détection du survol des nuages de points utilise un index en grille uniforme (environ quatre points par cellule, construit à la demande et mis en cache par tableau de données) : survoler 100 000 points reste sous la milliseconde.

Le DOM n’est mis à jour qu’en cas de changement : la légende n’est reconstruite que si ses entrées changent, l’infobulle et les marqueurs de survol sont réutilisés tant que le pointeur reste sur les mêmes points, et les couleurs du thème résolues sont mises en cache jusqu’au changement de thème.

### Zoom et déplacement

Avec WebGPU, WebGL2 et WebGL, zoomer et se déplacer ne modifient qu’un uniform de transformation : aucun tampon n’est reconstruit, quel que soit le nombre de points. Les tampons stockent des positions relatives à une origine en float32 ; si vous zoomez de plus de 2000× environ loin de cette origine, le graphique se recentre et reconstruit les tampons une fois pour garder une précision inférieure au pixel.

Avec Canvas2D, chaque image redessine la plage visible, décimée par colonne de pixels : le coût croît avec les points visibles, plafonné par la largeur du tracé pour les courbes et aires triées. Les grands nuages de points y restent en O(n) par image ; préférez un backend GPU ou moins de points pour des nuages interactifs.

### Jusqu’où aller

Mesures de la suite de benchmarks du moteur (Node, machine de type CI ; vos résultats dépendront du matériel) :

Courbe de 1 000 000 de points : construire le modèle et les éléments GPU prend environ 15 ms.

Nuage de 100 000 points : le construire et effectuer 1 000 tests de survol prend environ 13 ms.

setOptions avec des options identiques : environ 0,03 ms, rien n’est reconstruit ; déplacer l’infobulle sur les mêmes points : environ 0,03 ms.

Repères : sur GPU, les courbes et aires de plusieurs millions de points triés (tableaux typés) restent interactives ; limitez les nuages de points à 100 000–500 000 points sur GPU et à 20 000–50 000 sur Canvas2D ; barres et chandeliers restent lisibles jusqu’à quelques milliers de marques visibles, agrégez donc au-delà (chandeliers journaliers, barres mensuelles) ; les cartes de chaleur vont jusqu’à quelques dizaines de milliers de cellules.

### Conseils pour React

Gardez des références de données stables : construisez les séries et leurs données avec useMemo (ou hors du composant), en dépendance des données utilisées. Un nouveau tableau de données est un nouveau jeu de données et coûte un passage complet.

Les props sont comparées superficiellement avant d’appeler setOptions : les options de premier niveau par identité ou sur un niveau, et chaque champ de série par identité. Les objets en ligne comme yAxis={{ min: 0 }} ou series={[{ name, data }]} ne posent pas de problème tant que data est stable : un rendu identique ne coûte alors rien.

Ne recréez pas les tableaux typés à chaque rendu (new Float64Array(…) dans le corps du composant) : allouez-les à l’arrivée des données et conservez-les dans un état ou une ref.

Les graphiques de formes (secteurs, anneau, radar, jauge, entonnoir, treemap) mémorisent aussi leurs options, mais chaque changement est animé : gardez data, padding et palette stables pour ne pas rejouer l’animation.

### Mises à jour en continu

Pour ajouter des points, passez un nouveau tableau (ou de nouveaux tableaux typés) et appelez setOptions : la série modifiée est renormalisée en O(n), les autres sont réutilisées. Gardez une fenêtre glissante (par exemple les 50 000 derniers points) pour borner le coût.

Regroupez les échantillons et mettez à jour au plus une fois par image (requestAnimationFrame) ou par minuterie, plutôt qu’à chaque message. Pour des flux très rapides en tableaux typés, préallouez un tampon plus grand et passez des vues subarray() de la partie remplie : une nouvelle vue est une nouvelle identité, mais la mémoire est réutilisée.

### Graphiques de formes ou graphiques cartésiens

Les graphiques en secteurs, anneau, rose, radar, jauge, entonnoir, treemap, Sankey, rayons de soleil, accords et les autres graphiques de formes utilisent les mêmes backends GPU que les autres graphiques (WebGPU → WebGL2 → WebGL → Canvas2D, choisis par l’option renderer ou setDefaultChartRenderer) : arcs, polygones et rubans sont découpés en triangles et dessinés avec un MSAA 4x, les remplissages non convexes passent par le stencil buffer (règle nonzero), et le texte est dessiné sur un canvas 2D au-dessus des formes. Canvas2D reste le repli quand aucun backend GPU ne démarre, et le seul backend dans les mini-programmes (createCanvasShapeChart).

Choisissez un graphique cartésien (courbe, aire, barres, nuage de points, chandeliers, carte de chaleur) pour beaucoup de points, le zoom et le déplacement, ou des données en direct.

Choisissez un graphique de formes pour des parts d’un tout, des profils, un indicateur unique ou des hiérarchies — de quelques dizaines à quelques centaines de marques. Au-delà, une treemap ou une carte de chaleur de données agrégées se lit mieux que des milliers de secteurs. De nombreux petits graphiques de formes sur une page restent peu coûteux : avec WebGPU ils partagent un seul device ; avec WebGL chacun a son contexte, et au-delà de la limite du navigateur (environ 16) les moins récemment dessinés hors écran sont suspendus, puis restaurés quand ils reviennent à l’écran. renderer="canvas2d" n’utilise aucun contexte GPU.

### Mini-programmes et React Native

Les graphiques pour mini-programmes utilisent createCanvasChart (et createCanvasShapeChart pour les graphiques de formes) sur un canvas type="2d" : toujours Canvas2D, avec des moteurs JavaScript plus lents. La décimation par pixel garde les courbes rapides, mais visez des dizaines de milliers de points plutôt que des millions, évitez de faire passer de gros tableaux par setData (ils sont sérialisés) et limitez les nuages à quelques milliers de points.

Sous React Native, les graphiques sont dessinés uniquement avec des View, le nombre de formes est donc plafonné : environ 1 200 points de courbe au total, 800 points par série de nuage (2 000 au total) et 600 barres par série (1 500 rectangles au total, un chandelier en comptant deux, une cellule de carte de chaleur un), 200 bandes par aire. Au-delà, les points sont fusionnés par cellule et les barres par colonne de pixels : l’image reste juste mais perd des détails, et les données sont toujours traitées en JavaScript ; agrégez d’abord.

Pour votre propre moteur de rendu, createChartController et scenePrimitives offrent les mêmes budgets : scenePrimitives(scene, { maxDots, maxBars, columnWidth, dotCell }) renvoie des formes décimées (par défaut 4000 points et 2000 barres par série, colonnes de 1 px).

### Survol intensif : une mise à jour par image

Envoie 240 mouvements alternés dans une même image via le moteur public. Seule la dernière position est testée et affichée ; appui, glissement et relâchement restent synchrones. Ces compteurs mesurent le navigateur réel et ne garantissent pas un FPS pour toute taille de données.

Exécuter 240 mouvements

Mouvements

Notifications de survol

Rendus de l’infobulle

Envoi et attente d’image (ms)

Dernier point

Mesure du regroupement du survol

```ts
import { createChart } from "minerva-design/charts/core";

// "auto" (default): WebGPU, then WebGL2, then WebGL, then Canvas2D
const chart = createChart(container, { series, renderer: "auto" });
chart.ready.then((kind) => showRenderer(kind)); // "webgpu" | "webgl2" | "webgl" | "canvas2d" | null
// fired again when the GPU is lost and the chart falls back
chart.on("renderer", (kind) => showRenderer(kind));

// force a backend (also accepted on every React chart: renderer="webgl")
createChart(other, { series, renderer: "canvas2d" });
```

```ts
import {
  createChart,
  getDefaultChartRenderer,
  setDefaultChartRenderer,
  subscribeDefaultChartRenderer,
} from "minerva-design/charts/core";

// every chart with renderer unset or "auto" (React, Vue, Angular,
// Web Components) switches to WebGL2, including the charts on screen
setDefaultChartRenderer("webgl2");
getDefaultChartRenderer(); // "webgl2"

// e.g. keep a renderer picker in sync
const unsubscribe = subscribeDefaultChartRenderer((preference) => {
  picker.value = preference;
});

// a chart's own option still wins
createChart(container, { series, renderer: "canvas2d" });

setDefaultChartRenderer("auto"); // back to WebGPU -> WebGL2 -> WebGL -> Canvas2D
```

```ts
const n = 1_000_000;
const x = new Float64Array(n); // timestamps or indexes, sorted
const y = new Float32Array(n);
// ...fill x and y once

// fastest: typed-array columns, copied in one go (no per-point conversion)
const fast = [{ id: "signal", name: "Signal", data: { x, y } }];

// slower: plain arrays in columns, then [x, y] tuples,
// then { x, y } objects (converted point by point)
const slow = [{ name: "Signal", data: points.map((p) => ({ x: p.t, y: p.v })) }];
```

```tsx
import { useMemo } from "react";
import { LineChart } from "minerva-design/charts";

function Telemetry({ samples }: { samples: Samples }) {
  // build the columns once per data set, not on every render
  const series = useMemo(
    () => [{ id: "cpu", name: "CPU", data: { x: samples.time, y: samples.cpu } }],
    [samples],
  );
  // inline props are fine: they are compared shallowly and skip setOptions
  return <LineChart series={series} yAxis={{ min: 0, max: 100 }} height={320} />;
}
```

```ts
let data: [number, number][] = [];
let queued: [number, number][] = [];

socket.onmessage = (event) => {
  queued.push(JSON.parse(event.data));
};

// one update per frame, however many samples arrived
function flush() {
  if (queued.length) {
    // a new array: arrays mutated in place are not read again
    data = [...data, ...queued].slice(-50_000);
    queued = [];
    chart.setOptions({ ...base, series: [{ id: "cpu", name: "CPU", data }] });
  }
  requestAnimationFrame(flush);
}
requestAnimationFrame(flush);
```

```ts
import {
  createChartController,
  scenePrimitives,
} from "minerva-design/charts/core";

const controller = createChartController({
  options,
  measureText: (text, font) => measure(text, font),
  onInvalidate: () => draw(),
});
controller.setSize(360, 240);

function draw() {
  const scene = controller.getScene();
  if (!scene) return;
  // fewer, coarser shapes for a slow host (e.g. one native view per shape)
  const shapes = scenePrimitives(scene, {
    maxDots: 1500, // per series: then merged per cell
    maxBars: 600, // per series: then merged per pixel column
    columnWidth: 3, // lines: at most 4 points per 3 px column
  });
  paint(shapes);
}
```

## CandlestickChart

Support: beta

Chart whose untyped series are OHLC candles (`open`, `high`, `low`, `y`). Same as Chart. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/candlestick-chart/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "width",
    "typeText": "unknown",
    "required": false,
    "default": "100%"
  },
  {
    "name": "height",
    "typeText": "unknown",
    "required": false,
    "default": 320
  },
  {
    "name": "legend",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "tooltip",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "crosshair",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "annotations",
    "typeText": "array",
    "required": false
  },
  {
    "name": "interaction",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "padding",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "palette",
    "typeText": "array",
    "required": false
  },
  {
    "name": "ariaLabel",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "locale",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "labels",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "disableScroll",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "series",
    "typeText": "array",
    "required": false
  },
  {
    "name": "xAxis",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "yAxis",
    "typeText": "unknown",
    "required": false,
    "default": null
  }
]
```

### events

```json
[
  {
    "name": "hover",
    "typeText": "{ items: NativeChartHoverItem[]; x: number | null; xLabel: string }",
    "description": "Highlighted points after a tap or a finger scrub; items is empty when cleared."
  },
  {
    "name": "pointclick",
    "typeText": "{ items: NativeChartHoverItem[]; x: number; xLabel: string }",
    "description": "A point or bar was tapped."
  },
  {
    "name": "plotclick",
    "typeText": "{ x: number; y: number }",
    "description": "The plot area was tapped where there is no point (data coordinates)."
  },
  {
    "name": "zoom",
    "typeText": "{ x: [number, number]; y: [number, number] }",
    "description": "Visible range after a pinch, a pan or a double-tap reset."
  },
  {
    "name": "layout",
    "typeText": "{ x: number; y: number; width: number; height: number }",
    "description": "The plot area moved or was resized (px of the chart)."
  },
  {
    "name": "pointdrag",
    "typeText": "{ item: NativeChartHoverItem; x: number; y: number }",
    "description": "A scatter point is dragged (interaction.dragPoints); the data is not changed."
  },
  {
    "name": "pointdrop",
    "typeText": "{ item: NativeChartHoverItem; x: number; y: number }",
    "description": "A dragged scatter point was released; update the series to move it."
  }
]
```

## Chart

Support: beta

Mixed line/area/bar/scatter series on a <canvas type="2d"> (DOM-free canvas engine): axes, legend with tap-to-toggle, tooltip, crosshair, annotations, tap/scrub hover, pan when zoomed, pinch zoom, double-tap reset, point dragging, Minerva theme/palette/design tokens from the nearest provider. Properties are serialized by setData: data must be JSON (timestamps instead of Date, no typed arrays) and large data sets cost a copy per update. Function options (axis format, tooltip text) use configure(); tooltips are canvas text, not ReactNode content. No renderer choice, wheel or keyboard navigation. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/chart/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "width",
    "typeText": "unknown",
    "required": false,
    "default": "100%"
  },
  {
    "name": "height",
    "typeText": "unknown",
    "required": false,
    "default": 320
  },
  {
    "name": "legend",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "tooltip",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "crosshair",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "annotations",
    "typeText": "array",
    "required": false
  },
  {
    "name": "interaction",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "padding",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "palette",
    "typeText": "array",
    "required": false
  },
  {
    "name": "ariaLabel",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "locale",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "labels",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "disableScroll",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "series",
    "typeText": "array",
    "required": false
  },
  {
    "name": "xAxis",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "yAxis",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "yAxis2",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "stackMode",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "orientation",
    "typeText": "string",
    "required": false,
    "default": ""
  }
]
```

### events

```json
[
  {
    "name": "hover",
    "typeText": "{ items: NativeChartHoverItem[]; x: number | null; xLabel: string }",
    "description": "Highlighted points after a tap or a finger scrub; items is empty when cleared."
  },
  {
    "name": "pointclick",
    "typeText": "{ items: NativeChartHoverItem[]; x: number; xLabel: string }",
    "description": "A point or bar was tapped."
  },
  {
    "name": "plotclick",
    "typeText": "{ x: number; y: number }",
    "description": "The plot area was tapped where there is no point (data coordinates)."
  },
  {
    "name": "zoom",
    "typeText": "{ x: [number, number]; y: [number, number] }",
    "description": "Visible range after a pinch, a pan or a double-tap reset."
  },
  {
    "name": "layout",
    "typeText": "{ x: number; y: number; width: number; height: number }",
    "description": "The plot area moved or was resized (px of the chart)."
  },
  {
    "name": "pointdrag",
    "typeText": "{ item: NativeChartHoverItem; x: number; y: number }",
    "description": "A scatter point is dragged (interaction.dragPoints); the data is not changed."
  },
  {
    "name": "pointdrop",
    "typeText": "{ item: NativeChartHoverItem; x: number; y: number }",
    "description": "A dragged scatter point was released; update the series to move it."
  }
]
```

## LineChart

Support: beta

Chart whose untyped series are lines, or areas with `area`. Same as Chart. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/line-chart/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "width",
    "typeText": "unknown",
    "required": false,
    "default": "100%"
  },
  {
    "name": "height",
    "typeText": "unknown",
    "required": false,
    "default": 320
  },
  {
    "name": "legend",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "tooltip",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "crosshair",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "annotations",
    "typeText": "array",
    "required": false
  },
  {
    "name": "interaction",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "padding",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "palette",
    "typeText": "array",
    "required": false
  },
  {
    "name": "ariaLabel",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "locale",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "labels",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "disableScroll",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "series",
    "typeText": "array",
    "required": false
  },
  {
    "name": "xAxis",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "yAxis",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "area",
    "typeText": "boolean",
    "required": false,
    "default": false
  }
]
```

### events

```json
[
  {
    "name": "hover",
    "typeText": "{ items: NativeChartHoverItem[]; x: number | null; xLabel: string }",
    "description": "Highlighted points after a tap or a finger scrub; items is empty when cleared."
  },
  {
    "name": "pointclick",
    "typeText": "{ items: NativeChartHoverItem[]; x: number; xLabel: string }",
    "description": "A point or bar was tapped."
  },
  {
    "name": "plotclick",
    "typeText": "{ x: number; y: number }",
    "description": "The plot area was tapped where there is no point (data coordinates)."
  },
  {
    "name": "zoom",
    "typeText": "{ x: [number, number]; y: [number, number] }",
    "description": "Visible range after a pinch, a pan or a double-tap reset."
  },
  {
    "name": "layout",
    "typeText": "{ x: number; y: number; width: number; height: number }",
    "description": "The plot area moved or was resized (px of the chart)."
  },
  {
    "name": "pointdrag",
    "typeText": "{ item: NativeChartHoverItem; x: number; y: number }",
    "description": "A scatter point is dragged (interaction.dragPoints); the data is not changed."
  },
  {
    "name": "pointdrop",
    "typeText": "{ item: NativeChartHoverItem; x: number; y: number }",
    "description": "A dragged scatter point was released; update the series to move it."
  }
]
```

## ScatterChart

Support: beta

Chart whose untyped series are dots, zooming on both axes. Same as Chart. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/scatter-chart/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "width",
    "typeText": "unknown",
    "required": false,
    "default": "100%"
  },
  {
    "name": "height",
    "typeText": "unknown",
    "required": false,
    "default": 320
  },
  {
    "name": "legend",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "tooltip",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "crosshair",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "annotations",
    "typeText": "array",
    "required": false
  },
  {
    "name": "interaction",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "padding",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "palette",
    "typeText": "array",
    "required": false
  },
  {
    "name": "ariaLabel",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "locale",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "labels",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "disableScroll",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "series",
    "typeText": "array",
    "required": false
  },
  {
    "name": "xAxis",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "yAxis",
    "typeText": "unknown",
    "required": false,
    "default": null
  }
]
```

### events

```json
[
  {
    "name": "hover",
    "typeText": "{ items: NativeChartHoverItem[]; x: number | null; xLabel: string }",
    "description": "Highlighted points after a tap or a finger scrub; items is empty when cleared."
  },
  {
    "name": "pointclick",
    "typeText": "{ items: NativeChartHoverItem[]; x: number; xLabel: string }",
    "description": "A point or bar was tapped."
  },
  {
    "name": "plotclick",
    "typeText": "{ x: number; y: number }",
    "description": "The plot area was tapped where there is no point (data coordinates)."
  },
  {
    "name": "zoom",
    "typeText": "{ x: [number, number]; y: [number, number] }",
    "description": "Visible range after a pinch, a pan or a double-tap reset."
  },
  {
    "name": "layout",
    "typeText": "{ x: number; y: number; width: number; height: number }",
    "description": "The plot area moved or was resized (px of the chart)."
  },
  {
    "name": "pointdrag",
    "typeText": "{ item: NativeChartHoverItem; x: number; y: number }",
    "description": "A scatter point is dragged (interaction.dragPoints); the data is not changed."
  },
  {
    "name": "pointdrop",
    "typeText": "{ item: NativeChartHoverItem; x: number; y: number }",
    "description": "A dragged scatter point was released; update the series to move it."
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

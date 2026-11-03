# Performances des graphiques

Comment le moteur de graphiques reste rapide avec des millions de points, démonstrations en direct à l’appui : choix du moteur de rendu et repli, formats de données, ce qui dépend de la plage visible, décimation, détection des survols, conseils pour React et le streaming, et budgets des mini-programmes et de React Native.

Package: minerva-design@1.19.3

Renderer: angular

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "19932861fda2d088219d708a8ca132bea760a32b",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:ed8b6b1bf30e9055934099f84afd6b8369eee155b0404de5e8db004c3d91bce6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

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

Native Angular: MnCandlestickChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnCandlestickChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "series",
    "typeText": "readonly ChartSeries[]",
    "required": true,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "xAxis",
    "typeText": "ChartAxisOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "yAxis",
    "typeText": "ChartAxisOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "renderer",
    "typeText": "ChartRendererPreference | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "legend",
    "typeText": "boolean | ChartLegendOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "tooltip",
    "typeText": "boolean | ChartTooltipOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "crosshair",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "annotations",
    "typeText": "readonly ChartAnnotation[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "interaction",
    "typeText": "boolean | ChartInteractionOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "padding",
    "typeText": "ChartPadding | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "palette",
    "typeText": "readonly string[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "ariaLabel",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  }
]
```

### events

```json
[
  {
    "name": "pointClick",
    "typeText": "ChartHoverEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ChartHoverEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "plotClick",
    "typeText": "ChartPlotClickEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ChartPlotClickEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "hover",
    "typeText": "ChartHoverEvent | null",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ChartHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "zoom",
    "typeText": "ChartView",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ChartView",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "rendererChange",
    "typeText": "ChartRendererKind",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ChartRendererKind",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Chart

Support: beta

Native Angular: MnChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "series",
    "typeText": "readonly ChartSeries[]",
    "required": true,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "stackMode",
    "typeText": "\"normal\" | \"percent\" | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "yAxis2",
    "typeText": "ChartAxisOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "orientation",
    "typeText": "ChartOrientation | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "xAxis",
    "typeText": "ChartAxisOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "yAxis",
    "typeText": "ChartAxisOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "renderer",
    "typeText": "ChartRendererPreference | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "legend",
    "typeText": "boolean | ChartLegendOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "tooltip",
    "typeText": "boolean | ChartTooltipOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "crosshair",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "annotations",
    "typeText": "readonly ChartAnnotation[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "interaction",
    "typeText": "boolean | ChartInteractionOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "padding",
    "typeText": "ChartPadding | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "palette",
    "typeText": "readonly string[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "ariaLabel",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  }
]
```

### events

```json
[
  {
    "name": "pointClick",
    "typeText": "ChartHoverEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ChartHoverEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "plotClick",
    "typeText": "ChartPlotClickEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ChartPlotClickEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "hover",
    "typeText": "ChartHoverEvent | null",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ChartHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "zoom",
    "typeText": "ChartView",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ChartView",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "rendererChange",
    "typeText": "ChartRendererKind",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ChartRendererKind",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## LineChart

Support: beta

Native Angular: MnLineChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnLineChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "series",
    "typeText": "readonly ChartSeries[]",
    "required": true,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "area",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "curve",
    "typeText": "ChartCurve | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "stacked",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "percent",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "xAxis",
    "typeText": "ChartAxisOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "yAxis",
    "typeText": "ChartAxisOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "renderer",
    "typeText": "ChartRendererPreference | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "legend",
    "typeText": "boolean | ChartLegendOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "tooltip",
    "typeText": "boolean | ChartTooltipOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "crosshair",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "annotations",
    "typeText": "readonly ChartAnnotation[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "interaction",
    "typeText": "boolean | ChartInteractionOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "padding",
    "typeText": "ChartPadding | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "palette",
    "typeText": "readonly string[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "ariaLabel",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  }
]
```

### events

```json
[
  {
    "name": "pointClick",
    "typeText": "ChartHoverEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ChartHoverEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "plotClick",
    "typeText": "ChartPlotClickEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ChartPlotClickEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "hover",
    "typeText": "ChartHoverEvent | null",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ChartHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "zoom",
    "typeText": "ChartView",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ChartView",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "rendererChange",
    "typeText": "ChartRendererKind",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ChartRendererKind",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## ScatterChart

Support: beta

Native Angular: MnScatterChart. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnScatterChart"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "series",
    "typeText": "readonly ChartSeries[]",
    "required": true,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "xAxis",
    "typeText": "ChartAxisOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "yAxis",
    "typeText": "ChartAxisOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "renderer",
    "typeText": "ChartRendererPreference | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "legend",
    "typeText": "boolean | ChartLegendOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "tooltip",
    "typeText": "boolean | ChartTooltipOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "crosshair",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "annotations",
    "typeText": "readonly ChartAnnotation[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "interaction",
    "typeText": "boolean | ChartInteractionOptions | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "padding",
    "typeText": "ChartPadding | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "palette",
    "typeText": "readonly string[] | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "ariaLabel",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts"
  }
]
```

### events

```json
[
  {
    "name": "pointClick",
    "typeText": "ChartHoverEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ChartHoverEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "plotClick",
    "typeText": "ChartPlotClickEvent",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ChartPlotClickEvent",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "hover",
    "typeText": "ChartHoverEvent | null",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ChartHoverEvent | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "zoom",
    "typeText": "ChartView",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ChartView",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "rendererChange",
    "typeText": "ChartRendererKind",
    "required": false,
    "source": "packages/angular/src/components/charts/cartesian.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "ChartRendererKind",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: A million points

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnLineChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnLineChart],
  template: `
@let t = labels[language()];
<mn-line-chart
  [series]="[{ name: t.signal, data: samples }]"
  [interaction]="{ zoom: 'x' }"
  crosshair
  [height]="320"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  samples = (() => {
  // a million samples as typed-array columns: no objects, no copies
  const COUNT = 1_000_000;
  const y = new Float32Array(COUNT);
  for (let i = 0; i < COUNT; i++) {
    y[i] = 50 + 30 * Math.sin(i / 20_000) + 8 * Math.sin(i / 700) + 3 * Math.sin(i * 1.7);
  }
  const SAMPLES = { y };
  return SAMPLES;
})();
  labels = {
  "en": {
    "signal": "Sensor (1,000,000 samples)"
  },
  "zh": {
    "signal": "传感器（1,000,000 个采样点）"
  },
  "ja": {
    "signal": "センサー（1,000,000 サンプル）"
  },
  "fr": {
    "signal": "Capteur (1 000 000 d’échantillons)"
  }
};
}

```

## Example: Nuage de 1 000 000 de points

Dix groupes de 100 000 points (amas, anneaux, bras de spirale), une couleur chacun. Tous les points sont dessinés à chaque image — un seul appel de dessin instancié par groupe sur le GPU. Survolez un point pour voir l’index spatial à l’œuvre, cliquez sur la légende pour masquer des groupes.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnScatterChart, injectMinerva } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnScatterChart],
  template: `
@let t = labels[language()];
<mn-scatter-chart
  [series]="[{ name: t.points, data: points, pointSize: 2, opacity: 0.4 }]"
  [height]="360"
/>
  `,
})
export class Example {
  readonly language = injectMinerva().language;
  points = (() => {
  // 200,000 points in two typed-array columns, generated deterministically
  const COUNT = 200_000;
  const x = new Float32Array(COUNT);
  const y = new Float32Array(COUNT);
  for (let i = 0; i < COUNT; i++) {
    const angle = (i * 2.399963) % (2 * Math.PI);
    const radius = Math.sqrt(i / COUNT) * 40;
    x[i] = 50 + radius * Math.cos(angle) + 6 * Math.sin(i * 0.37);
    y[i] = 50 + radius * Math.sin(angle) * 0.6 + 6 * Math.cos(i * 0.53);
  }
  const POINTS = { x, y };
  return POINTS;
})();
  labels = {
  "en": {
    "points": "Measurements (200,000 points)"
  },
  "zh": {
    "points": "测量值（200,000 个点）"
  },
  "ja": {
    "points": "測定値（200,000 点）"
  },
  "fr": {
    "points": "Mesures (200 000 points)"
  }
};
}

```

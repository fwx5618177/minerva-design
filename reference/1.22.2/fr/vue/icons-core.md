# Cœur des icônes

minerva-design/icons/core : le jeu d’icônes sans framework. Chaînes SVG, dessin Canvas2D, canvas GPU, icônes personnalisées, rendu global par défaut et chaîne de traitement géométrique derrière les backends GPU.

Package: minerva-design@1.22.2

Renderer: vue

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

### Sans framework

Importer le cœur n’a aucun effet de bord et ne touche à aucune API du navigateur tant que rien n’est dessiné : il fonctionne donc côté serveur, dans les workers, avec tout framework et dans de simples scripts. Les icônes sont des objets simples : { name, paths, category, tags }.

Les composants React, Vue, Angular, Web Components, React Native (minerva-design/native/icons) et Taro (minerva-design/taro/icons) sont de fines couches au-dessus de ce cœur ; toSvg et createIconCanvas conviennent à tout autre framework.

Dessiné avec {{backend}}

Démarrage du rendu…

Icônes suivantes

Trente icônes dessinées par createIconCanvas

Icône

Tolérance

Triangles de l’icône {{name}}

{{triangles}} triangles, {{points}} points de ligne médiane

```ts
// Any framework (or none): the core only needs an element
import { createIconCanvas, searchIcon, toSvg } from "minerva-design/icons/core";

// markup: a string of SVG for templates, innerHTML, server rendering
element.innerHTML = toSvg(searchIcon, { size: 20, title: "Search" });

// many icons on the GPU, following the global default renderer
const canvas = createIconCanvas(container, {
  items: [{ icon: searchIcon, x: 8, y: 8, size: 24 }],
});
canvas.setItems(nextItems); // redrawn on the next animation frame
canvas.destroy(); // releases the GPU context
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

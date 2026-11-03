# Cœur des icônes

minerva-design/icons/core : le jeu d’icônes sans framework. Chaînes SVG, dessin Canvas2D, canvas GPU, icônes personnalisées, rendu global par défaut et chaîne de traitement géométrique derrière les backends GPU.

Package: minerva-design@1.20.1

Renderer: taro

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

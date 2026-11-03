# IconCanvas

De nombreuses icônes sur un seul canvas, dessinées par WebGPU, WebGL2 ou WebGL en quelques dessins instanciés, ou par Canvas2D : images denses, cartes, particules et animations de milliers d’icônes.

Package: minerva-design@1.19.3

Renderer: taro

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "1b65455cccbdd71bb609d7d859b1ef90f9e604c6",
  "sourceDigest": "sha256:a8b34eea01e9133306bb1fde48e7966deaaaa35d87c2dfd2e181d891c65e01c1",
  "referenceSourceDigest": "sha256:d3ed05a4228bc39ff766871c13b5ba292792f934f6ebc3d0d29af28589be129c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

### Comment il dessine

IconCanvas place les icônes par position, taille, rotation, couleur et opacité en pixels CSS, et les dessine toutes sur un seul canvas avec le meilleur backend disponible (WebGPU -> WebGL2 -> WebGL -> Canvas2D).

Géométrie : chaque icône est aplatie à un quart de pixel physique près et son trait converti en triangles (un quadrilatère par segment, des éventails arrondis pour les jointures et les extrémités), une fois par icône, épaisseur de trait et niveau de détail.

Regroupement : tous les maillages résident dans un seul tampon de sommets et chaque icône est une instance (position, taille, rotation, couleur) ; des icônes identiques consécutives forment un seul appel de dessin instancié.

Qualité : le MSAA 4× lisse les bords, et un test de profondeur par icône dessine chaque pixel d’une icône une seule fois, si bien que les icônes translucides se mélangent exactement comme le trait SVG.

Robustesse : auto ignore les GPU logiciels, un contexte GPU perdu redémarre le backend (un backend perdu deux fois est ignoré), et la racine du canvas indique le backend dans data-renderer.

Pour les icônes de l’interface, utilisez Icon : le SVG est plus léger, accessible et rendu côté serveur. Utilisez IconCanvas quand les icônes sont l’image.

Nombre d’icônes

Pause

Lecture

En pause

{{fps}} images par seconde

Dessiné avec {{backend}}

Démarrage du rendu…

{{n}} icônes animées

40 icônes dessinées avec {{backend}}

dessiné par {{backend}}

repli sur {{backend}}

## IconCanvas

Support: n/a

Web icon component (inline SVG or a WebGPU / WebGL / Canvas2D canvas): no native counterpart yet; draw the same icon data of minerva-design/icons/core (iconPathData, toSvg, toSvgDataUri, toSvgBase64DataUri) with the platform's SVG or image support.

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

# IconCanvas

De nombreuses icônes sur un seul canvas, dessinées par WebGPU, WebGL2 ou WebGL en quelques dessins instanciés, ou par Canvas2D : images denses, cartes, particules et animations de milliers d’icônes.

Package: minerva-design@1.24.4

Renderer: uni

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.24.4",
  "sourceCommit": "580bc03aa319a78f6f653ee0f9610fe236a93d38",
  "sourceDigest": "sha256:b9a39dcfe8b09a5d0967efee074963c408a37abb72fbe1d4c7a1eda21075df1d",
  "referenceSourceDigest": "sha256:25c00e4ed9c1ea1a2744aa521b6deba862ac402384cb19f4e7d069b72a5172c6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.24.4/types.json) or getType() from minerva-design/contracts.

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

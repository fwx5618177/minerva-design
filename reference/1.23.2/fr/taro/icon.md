# Icon

Une icône du jeu : SVG inline par défaut, ou un canvas dessiné avec WebGPU, WebGL2, WebGL ou Canvas2D. Composants nommés (SearchIcon…), Icon générique, icônes personnalisées et icônes choisies par nom.

Package: minerva-design@1.23.2

Renderer: taro

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.2",
  "sourceCommit": "c6618fd81b2d3c2a9016cfe13a1d15983d533ff7",
  "sourceDigest": "sha256:1ce1c857f10d367f112c6e77d88ae3878570c428c4d39ed7a400c8c99645e9f6",
  "referenceSourceDigest": "sha256:8f6e89c1e214fedc2e52de014615037c54204a8ec5c0dbb40c58dc530906571e"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.2/types.json) or getType() from minerva-design/contracts.

## Documentation

### SVG ou canvas

Par défaut, une icône est un  inline : il se rend côté serveur, suit la couleur du texte grâce à currentColor et la taille de police avec size="1em", et reste masqué aux technologies d’assistance sauf s’il a un title ou un aria-label.

Avec renderer à "auto", "webgpu", "webgl2", "webgl" ou "canvas2d", la même icône est dessinée sur un canvas. Les navigateurs limitent les contextes WebGL actifs à environ 16 ; les icônes canvas partagent donc un seul backend par page : les icônes modifiées sont regroupées dans un atlas, dessinées en une passe puis copiées dans leurs canvas. "auto" suit la valeur globale par défaut (setDefaultIconRenderer), ici la barre de rendu.

Seul ce que vous importez est embarqué : SearchIcon apporte ses propres données de tracé, les rendus canvas se chargent avec la première icône canvas, et DynamicIcon (noms choisis à l’exécution) est le seul composant qui embarque tout le jeu.

### React Native et mini-programmes

minerva-design/native/icons fournit les mêmes composants pour React Native (Icon, createIcon, DynamicIcon, SearchIcon…), dessinés avec react-native-svg à partir des mêmes tracés sur la grille 24×24. react-native-svg est une dépendance pair optionnelle, requise par cette seule entrée (minerva-design/native ne l’importe jamais) : installez-la avec npx expo install react-native-svg, ou npm install react-native-svg hors d’Expo. Les icônes prennent la couleur de texte du thème sauf si color est fourni, size est en dp, et un title fait de l’icône une image accessible.

minerva-design/taro/icons les fournit pour Taro. Les mini-programmes ne savent pas afficher de SVG inline et l’ de WeChat refuse le SVG encodé en pourcentages : chaque icône est donc une Image dont la source est une URI de données SVG en base64 (toSvgBase64DataUri, sans btoa). Une image n’a pas de currentColor : la couleur est écrite dans le SVG, par défaut la couleur de texte du thème pour le mode clair ou sombre actif, et l’image est régénérée quand la couleur ou le mode change. size est en px, ou toute longueur CSS comme "48rpx".

La tabBar d’un mini-programme n’accepte que des fichiers PNG ou JPG : générez-les au build à partir de toSvg (un fichier par icône, couleur et état) avec le rastériseur SVG de votre choix. Minerva n’en fournit pas.

démarrage…

```tsx
// npx expo install react-native-svg (optional peer dependency of this entry)
import { DynamicIcon, Icon, SearchIcon, searchIcon } from "minerva-design/native/icons";

<SearchIcon />                                          // 24dp, theme text color
<SearchIcon size={20} color="#2563eb" title="Search" /> // accessible image
<Icon icon={searchIcon} strokeWidth={1.5} absoluteStrokeWidth />
<DynamicIcon name={item.icon} />                        // bundles the whole set
```

```tsx
import { Icon, SearchIcon, settingsIcon } from "minerva-design/taro/icons";

<SearchIcon />                                          // 24px base64 SVG image
<SearchIcon size="48rpx" color="#2563eb" title="Search" />
<Icon icon={settingsIcon} strokeWidth={1.5} />          // theme text color, per mode
```

```ts
// build-time Node script: the tabBar only takes PNG / JPG files
import { writeFileSync } from "node:fs";
import { homeIcon, toSvg } from "minerva-design/icons/core";

for (const [state, color] of [["normal", "#6b7280"], ["active", "#2563eb"]]) {
  const svg = toSvg(homeIcon, { size: 81, color });
  // rasterize: the SVG -> PNG converter of your choice
  writeFileSync(`src/assets/tab-home-${state}.png`, await rasterize(svg));
}
```

## Icon

Support: beta

Icon, DynamicIcon, createIcon and the named icons (SearchIcon…) of minerva-design/taro/icons, a separate entry: an Image of a base64 SVG data URI with an explicit color (the theme text color of the active mode by default); no canvas renderer.

### Import

```json
{
  "specifier": "minerva-design/taro/icons",
  "exports": [
    "Icon"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "icon",
    "source": "packages/taro/src/icon/types.ts",
    "kind": "object",
    "typeText": "IconDefinition",
    "typeRef": "type:2663909377d12299fe71",
    "required": true,
    "description": "The icon to draw: a built-in one (e.g. `searchIcon`) or a `defineIcon` result"
  },
  {
    "name": "size",
    "source": "packages/taro/src/icon/types.ts",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "default": 24,
    "required": false,
    "description": "Width and height (a number is in px, a string is any CSS length, e.g. `\"48rpx\"`)"
  },
  {
    "name": "color",
    "source": "packages/taro/src/icon/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Stroke color, written into the SVG (images have no `currentColor`); per-path `colors` of the icon win"
  },
  {
    "name": "strokeWidth",
    "source": "packages/taro/src/icon/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 2,
    "required": false,
    "description": "Stroke width on the 24×24 grid (scales with the size)"
  },
  {
    "name": "absoluteStrokeWidth",
    "source": "packages/taro/src/icon/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Keeps `strokeWidth` in px whatever the (numeric) size"
  },
  {
    "name": "title",
    "source": "packages/taro/src/icon/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible name: the image gets `ariaRole=\"img\"` and this `ariaLabel`; without it the icon is hidden from assistive technologies"
  }
]
```

### slots

```json
[
  {
    "name": "children"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

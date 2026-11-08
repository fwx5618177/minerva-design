# Icon

Une icône du jeu : SVG inline par défaut, ou un canvas dessiné avec WebGPU, WebGL2, WebGL ou Canvas2D. Composants nommés (SearchIcon…), Icon générique, icônes personnalisées et icônes choisies par nom.

Package: minerva-design@1.23.1

Renderer: wc

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "a59b0af81a2f5c6e7f2de29a81878dc4a5af01f1",
  "sourceDigest": "sha256:5b7fa63ef8772ff533e1fc34d0784bfe651eb0b1be71712d0bbef057eec2b4cf",
  "referenceSourceDigest": "sha256:1019806d6e262e50fb4e804e528badf35a408ce0a47ef203c2c5d8930c0fb0f1"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

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

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/icon",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "name",
    "typeText": "string | undefined",
    "attribute": "name",
    "required": false
  },
  {
    "name": "size",
    "typeText": "number",
    "attribute": "size",
    "required": false
  },
  {
    "name": "color",
    "typeText": "string",
    "attribute": "color",
    "required": false
  },
  {
    "name": "strokeWidth",
    "typeText": "number",
    "attribute": "stroke-width",
    "required": false
  },
  {
    "name": "absoluteStrokeWidth",
    "typeText": "boolean",
    "attribute": "absolute-stroke-width",
    "required": false
  },
  {
    "name": "label",
    "typeText": "string | undefined",
    "attribute": "label",
    "required": false
  },
  {
    "name": "renderer",
    "typeText": "\"svg\" | \"auto\" | \"webgpu\" | \"webgl2\" | \"webgl\" | \"canvas2d\"",
    "attribute": "renderer",
    "required": false
  },
  {
    "name": "icon",
    "typeText": "IconDefinition | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "minerva-renderer-change",
    "typeText": "CustomEvent",
    "description": "Canvas mode: the backend drew the icon (or fell back after a GPU loss); detail: { renderer }"
  }
]
```

## API

```json
{
  "wc:minerva-icon": {
    "kind": "element",
    "source": "web-components/src/components/icon/icon.ts",
    "className": "MinervaIcon",
    "summary": "Icon of the Minerva icon set, as inline SVG or on a GPU canvas.",
    "description": "An icon of minerva-design/icons (the `<Icon>` of React): inline SVG by default (crisp at any size, styled by CSS, server-renderable), or a canvas drawn with WebGPU, WebGL2, WebGL or Canvas2D (`renderer`) by a backend shared by every canvas icon of the page. Set a built-in icon by `name` (`search`, `arrow-up`...) or any icon, custom ones made with `defineIcon` included, as the `icon` property. The stroke follows the text color unless `color` is set. Without `label` the icon is decorative (hidden from assistive technologies); with one it is an image with that accessible name. In canvas mode the host gets `data-renderer` with the backend drawing. Published as the optional entry `minerva-design/web-components/icon` (not part of the all-in-one entry nor of `cdn/minerva.js`: it loads the icon set `minerva-design/icons/core`). Without a build step, load the self-contained `dist/web-components/cdn/icon.js` next to `minerva.js`.",
    "properties": [
      {
        "name": "name",
        "attribute": "name",
        "type": "string | undefined",
        "description": "Name of a built-in icon (`search`, `arrow-up`...); the `icon` property wins over it"
      },
      {
        "name": "size",
        "attribute": "size",
        "type": "number",
        "default": "24",
        "description": "Width and height in pixels"
      },
      {
        "name": "color",
        "attribute": "color",
        "type": "string",
        "default": "\"currentColor\"",
        "description": "Stroke color, any CSS color (`currentColor` follows the text color)"
      },
      {
        "name": "strokeWidth",
        "attribute": "stroke-width",
        "type": "number",
        "default": "2",
        "description": "Stroke width on the 24×24 grid (scales with the size unless `absolute-stroke-width`)"
      },
      {
        "name": "absoluteStrokeWidth",
        "attribute": "absolute-stroke-width",
        "type": "boolean",
        "default": "false",
        "description": "Keeps the stroke width in pixels whatever the size"
      },
      {
        "name": "label",
        "attribute": "label",
        "type": "string | undefined",
        "description": "Accessible name: the icon becomes an image (role=img); without it the icon is hidden from assistive technologies"
      },
      {
        "name": "renderer",
        "attribute": "renderer",
        "type": "\"svg\" | \"auto\" | \"webgpu\" | \"webgl2\" | \"webgl\" | \"canvas2d\"",
        "default": "\"svg\"",
        "description": "`svg` (inline SVG), or a canvas drawn with the backend preference (`auto` follows the page default)"
      },
      {
        "name": "icon",
        "type": "IconDefinition | undefined",
        "description": "Icon definition (a built-in icon constant, or a custom icon of `defineIcon`); wins over `name`; property only"
      }
    ],
    "methods": [
      {
        "name": "getRenderer",
        "signature": "() => IconRendererKind | null",
        "description": "Backend drawing the canvas (`webgpu`, `webgl2`, `webgl`, `canvas2d`); `null` in SVG mode or until drawn"
      }
    ],
    "events": [
      {
        "name": "minerva-renderer-change",
        "description": "Canvas mode: the backend drew the icon (or fell back after a GPU loss); detail: { renderer }"
      }
    ],
    "slots": [],
    "parts": [
      {
        "name": "icon",
        "description": "The <svg> (or the <canvas> in canvas mode) drawing the icon"
      }
    ],
    "cssProperties": []
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Utilisation de base

<minerva-icon> dessine une icône intégrée à partir de son nom, au fil du texte ou dans les slots d'autres éléments ; avec un label, elle devient une image pour les technologies d'assistance.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/icon/wc/basic.html

```html
<div style="display: flex; flex-wrap: wrap; align-items: center; gap: 16px">
  <minerva-icon name="home"></minerva-icon>
  <minerva-icon name="search"></minerva-icon>
  <minerva-icon name="settings"></minerva-icon>
  <minerva-button>
    <minerva-icon slot="start" name="download" size="16"></minerva-icon>
    Download
  </minerva-button>
  <minerva-button color="danger" variant="outline">
    <minerva-icon slot="start" name="trash" size="16"></minerva-icon>
    Delete
  </minerva-button>
  <minerva-icon name="bell" size="32" label="Notifications"></minerva-icon>
</div>

```

## Example: Moteurs de rendu

L'attribut renderer dessine l'icône sur un canvas ; chaque icône émet minerva-renderer-change avec le backend qui l'a dessinée, affiché dessous. « auto » suit la barre de rendu ; un backend imposé absent de ce navigateur bascule sur le suivant.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/icon/wc/canvas.html

```html
<div id="renderers" style="display: flex; flex-wrap: wrap; gap: 24px">
  <figure style="display: grid; justify-items: center; gap: 4px; margin: 0">
    <minerva-icon
      name="settings"
      size="40"
      color="var(--primary-color)"
    ></minerva-icon>
    <figcaption><code>svg</code> <small>SVG</small></figcaption>
  </figure>
  <figure style="display: grid; justify-items: center; gap: 4px; margin: 0">
    <minerva-icon
      name="settings"
      size="40"
      color="var(--primary-color)"
      renderer="auto"
    ></minerva-icon>
    <figcaption><code>auto</code> <small>…</small></figcaption>
  </figure>
  <figure style="display: grid; justify-items: center; gap: 4px; margin: 0">
    <minerva-icon
      name="settings"
      size="40"
      color="var(--primary-color)"
      renderer="webgpu"
    ></minerva-icon>
    <figcaption><code>webgpu</code> <small>…</small></figcaption>
  </figure>
  <figure style="display: grid; justify-items: center; gap: 4px; margin: 0">
    <minerva-icon
      name="settings"
      size="40"
      color="var(--primary-color)"
      renderer="webgl2"
    ></minerva-icon>
    <figcaption><code>webgl2</code> <small>…</small></figcaption>
  </figure>
  <figure style="display: grid; justify-items: center; gap: 4px; margin: 0">
    <minerva-icon
      name="settings"
      size="40"
      color="var(--primary-color)"
      renderer="webgl"
    ></minerva-icon>
    <figcaption><code>webgl</code> <small>…</small></figcaption>
  </figure>
  <figure style="display: grid; justify-items: center; gap: 4px; margin: 0">
    <minerva-icon
      name="settings"
      size="40"
      color="var(--primary-color)"
      renderer="canvas2d"
    ></minerva-icon>
    <figcaption><code>canvas2d</code> <small>…</small></figcaption>
  </figure>
</div>

```

### apps/docs/src/docs/pages/icon/wc/canvas.ts

```tsx
// Every canvas icon fires minerva-renderer-change with the backend that drew
// it ("auto" follows setDefaultIconRenderer; a forced backend that cannot
// start here falls back to the next one).
import type { MinervaIcon } from "minerva-design/web-components/icon";

export function setup(root: HTMLElement) {
  const onChange = (event: Event) => {
    const icon = event.target as MinervaIcon;
    const { renderer } = (event as CustomEvent<{ renderer: string }>).detail;
    const caption = icon.closest("figure")?.querySelector("small");
    if (caption) caption.textContent = renderer;
  };
  root.addEventListener("minerva-renderer-change", onChange);
  return () => root.removeEventListener("minerva-renderer-change", onChange);
}

```

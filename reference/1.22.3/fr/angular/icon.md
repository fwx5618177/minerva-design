# Icon

Une icône du jeu : SVG inline par défaut, ou un canvas dessiné avec WebGPU, WebGL2, WebGL ou Canvas2D. Composants nommés (SearchIcon…), Icon générique, icônes personnalisées et icônes choisies par nom.

Package: minerva-design@1.22.3

Renderer: angular

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.3",
  "sourceCommit": "29f678e6c83b155a4b25bb6ba161bd1343a30a05",
  "sourceDigest": "sha256:62e49d8be55ca2bb85e8afd17b7862d068358e8ea94178c66288911996ed036e",
  "referenceSourceDigest": "sha256:0412dc239078e986227cd3204e2571665b3114a1b01c61132429483ed5a82f88"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.3/types.json) or getType() from minerva-design/contracts.

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

Native Angular: MnIcon. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnIcon"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "icon",
    "typeText": "IconDefinition",
    "required": true,
    "source": "packages/angular/src/components/icons/icon.ts"
  },
  {
    "name": "size",
    "typeText": "string | number",
    "required": false,
    "source": "packages/angular/src/components/icons/icon.ts"
  },
  {
    "name": "color",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/icons/icon.ts"
  },
  {
    "name": "strokeWidth",
    "typeText": "number",
    "required": false,
    "source": "packages/angular/src/components/icons/icon.ts"
  },
  {
    "name": "absoluteStrokeWidth",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/icons/icon.ts"
  },
  {
    "name": "title",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/icons/icon.ts"
  },
  {
    "name": "aria-label",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/icons/icon.ts"
  },
  {
    "name": "aria-labelledby",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/icons/icon.ts"
  },
  {
    "name": "renderer",
    "typeText": "IconRenderer",
    "required": false,
    "source": "packages/angular/src/components/icons/icon.ts"
  }
]
```

### events

```json
[
  {
    "name": "rendererChange",
    "typeText": "IconRendererKind",
    "required": false,
    "source": "packages/angular/src/components/icons/icon.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "IconRendererKind",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Named icons in buttons

Pass an icon constant of minerva-design/icons/core: only the icons used are bundled. Icons follow the text color and are hidden from assistive technologies unless they have a title (or aria-label).

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnIcon, MnButton, MnStack } from 'minerva-design/angular';
import { homeIcon, searchIcon, settingsIcon, bellIcon, downloadIcon, trashIcon } from 'minerva-design/icons/core';

@Component({
  selector: 'app-example',
  imports: [MnIcon, MnButton, MnStack],
  template: `
<ng-template #download><mn-icon [icon]="downloadIcon" size="16" /></ng-template>
<ng-template #trash><mn-icon [icon]="trashIcon" size="16" /></ng-template>
<mn-stack direction="row" wrap gap="4" align="center">
  <mn-icon [icon]="homeIcon" />
  <mn-icon [icon]="searchIcon" />
  <mn-icon [icon]="settingsIcon" />
  <button mnButton [startIcon]="download">Download</button>
  <button mnButton color="danger" variant="outline" [startIcon]="trash">Delete</button>
  <mn-icon [icon]="bellIcon" size="32" title="Notifications" />
</mn-stack>
  `,
})
export class Example {
  homeIcon = homeIcon;
  searchIcon = searchIcon;
  settingsIcon = settingsIcon;
  bellIcon = bellIcon;
  downloadIcon = downloadIcon;
  trashIcon = trashIcon;
}

```

## Example: Renderers

renderer draws the icon on a canvas shared by every canvas icon of the page; rendererChange reports the backend that drew it (a forced backend that cannot start falls back to the next one, auto follows setDefaultIconRenderer). The canvas renderers load with the first canvas icon.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnIcon, MnStack } from 'minerva-design/angular';
import { settingsIcon } from 'minerva-design/icons/core';

@Component({
  selector: 'app-example',
  imports: [MnIcon, MnStack],
  template: `
<mn-stack direction="row" wrap gap="5">
  @for (renderer of renderers; track renderer) {
    <mn-stack gap="1" align="center">
      <mn-icon
        [icon]="settingsIcon"
        [size]="40"
        color="var(--primary-color)"
        [renderer]="renderer"
        (rendererChange)="drawn[renderer] = $event"
      />
      <code>{{ renderer }}</code>
      <small>{{ renderer === 'svg' ? 'SVG' : (drawn[renderer] ?? '…') }}</small>
    </mn-stack>
  }
</mn-stack>
  `,
})
export class Example {
  settingsIcon = settingsIcon;
  renderers: import('minerva-design/angular').IconRenderer[] = ["svg", "auto", "webgpu", "webgl2", "webgl", "canvas2d"];
  drawn: Partial<Record<string, string>> = {};
}

```

## Example: Icons by name

MnDynamicIcon resolves a built-in icon by name at runtime and renders nothing for unknown names. It bundles the whole set: prefer MnIcon with an icon constant when the icon is known.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnDynamicIcon, MnStack } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnDynamicIcon, MnStack],
  template: `
<ul mnStack gap="2" style="margin: 0; padding: 0; list-style: none">
  @for (service of services; track service.name) {
    <li style="display: flex; align-items: center; gap: 8px">
      <mn-dynamic-icon [name]="service.icon" [size]="18" />
      <span style="min-width: 80px">{{ service.name }}</span>
      <mn-dynamic-icon
        [name]="service.status"
        [size]="18"
        [color]="service.color"
        [title]="service.status"
      />
    </li>
  }
</ul>
  `,
})
export class Example {
  services = [
  {
    "name": "Storage",
    "icon": "database",
    "status": "check-circle",
    "color": "var(--success-color)"
  },
  {
    "name": "Mail",
    "icon": "mail",
    "status": "alert-triangle",
    "color": "var(--warning-color)"
  },
  {
    "name": "Payments",
    "icon": "credit-card",
    "status": "x-circle",
    "color": "var(--danger-color)"
  }
];
}

```

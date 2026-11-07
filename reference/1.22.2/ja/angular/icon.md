# Icon アイコンコンポーネント

セットのアイコン 1 つ。既定はインライン SVG、または WebGPU、WebGL2、WebGL、Canvas2D で描画するキャンバスです。名前付きコンポーネント（SearchIcon…）、汎用の Icon、カスタムアイコン、名前で選ぶアイコン。

Package: minerva-design@1.22.2

Renderer: angular

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.2",
  "sourceCommit": "93eaa8e002773e63a78341d4424f9e832b7305a9",
  "sourceDigest": "sha256:62e49d8be55ca2bb85e8afd17b7862d068358e8ea94178c66288911996ed036e",
  "referenceSourceDigest": "sha256:10025b0c7fa1af3c2b0e9de9a1b6d51e6e81c9a41c96e7fcba66a58604dda51c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.2/types.json) or getType() from minerva-design/contracts.

## Documentation

### SVG かキャンバスか

既定ではアイコンはインラインの  です。サーバーで描画でき、currentColor でテキストの色に、size="1em" でフォントサイズに追従し、title か aria-label がない限り支援技術からは隠されます。

renderer を "auto"、"webgpu"、"webgl2"、"webgl"、"canvas2d" にすると、同じアイコンがキャンバスに描画されます。ブラウザーは同時に存在できる WebGL コンテキストを約 16 個に制限しているため、キャンバスアイコンはページごとに 1 つのバックエンドを共有します。変化したアイコンをアトラスにまとめ、1 回のパスで描画してから各キャンバスにコピーします。"auto" はグローバルの既定値（setDefaultIconRenderer）に従い、このページではレンダラーバーに従います。

バンドルされるのはインポートしたものだけです。SearchIcon は自身のパスデータだけを含み、キャンバスレンダラーは最初のキャンバスアイコンとともに読み込まれ、DynamicIcon（名前を実行時に選ぶ）だけがセット全体をバンドルします。

### React Native とミニプログラム

minerva-design/native/icons は React Native 向けに同じコンポーネント（Icon、createIcon、DynamicIcon、SearchIcon…）を提供し、同じ 24×24 のパスデータを react-native-svg で描画します。react-native-svg はこのエントリーだけが必要とするオプションの peer 依存関係です（minerva-design/native はインポートしません）。Expo では npx expo install react-native-svg、それ以外では npm install react-native-svg でインストールします。color を指定しない限りテーマのテキスト色で描線し、size の単位は dp、title を指定するとアクセシブルな画像になります。

minerva-design/taro/icons は Taro 向けです。ミニプログラムはインライン SVG を描画できず、WeChat の  はパーセントエンコードされた SVG を受け付けないため、各アイコンは base64 の SVG データ URI を src とする Image です（toSvgBase64DataUri、btoa 不要）。画像には currentColor がないため、色は SVG に直接書き込まれます。既定はアクティブなライト／ダークモードのテーマのテキスト色で、色やモードが変わると画像を再生成します。size の単位は px、または "48rpx" のような任意の CSS 長さです。

ミニプログラムの tabBar は PNG か JPG しか受け付けません。ビルド時に toSvg の出力から、好みの SVG ラスタライザーで生成してください（アイコン、色、状態ごとに 1 ファイル）。Minerva はラスタライザーを同梱していません。

起動中…

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

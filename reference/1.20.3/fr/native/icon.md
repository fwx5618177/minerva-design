# Icon

Une icône du jeu : SVG inline par défaut, ou un canvas dessiné avec WebGPU, WebGL2, WebGL ou Canvas2D. Composants nommés (SearchIcon…), Icon générique, icônes personnalisées et icônes choisies par nom.

Package: minerva-design@1.20.3

Renderer: native

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.3",
  "sourceCommit": "ea7fb3e1f55d184b7d737316e9ae829f4f7ff223",
  "sourceDigest": "sha256:c9540edc3908d226375a01cf5e6bfe8ca6a4e20440f736c0dd9b40ae9ff2e645",
  "referenceSourceDigest": "sha256:4cf6057856184f16240d0d22153ec370842fc7a2dfaaa66364e189fed89e6ca3"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.3/types.json) or getType() from minerva-design/contracts.

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

Icon, DynamicIcon, createIcon and the named icons (SearchIcon…) of minerva-design/native/icons, a separate entry drawn with react-native-svg (optional peer dependency); no canvas renderer.

### Import

```json
{
  "specifier": "minerva-design/native/icons",
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
    "source": "packages/native/src/icon/types.ts",
    "kind": "object",
    "typeText": "IconDefinition",
    "typeRef": "type:2663909377d12299fe71",
    "required": true,
    "description": "The icon to draw: a built-in one (e.g. `searchIcon`) or a `defineIcon` result"
  },
  {
    "name": "size",
    "source": "packages/native/src/icon/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 24,
    "required": false,
    "description": "Width and height in dp"
  },
  {
    "name": "color",
    "source": "packages/native/src/icon/types.ts",
    "kind": "union",
    "typeText": "ColorValue | undefined",
    "typeRef": "type:602aadca1cc5b15e53f9",
    "required": false,
    "description": "Stroke color (any React Native `ColorValue`, e.g. the `color` of a navigation `tabBarIcon`); per-path `colors` of the icon win"
  },
  {
    "name": "strokeWidth",
    "source": "packages/native/src/icon/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 2,
    "required": false,
    "description": "Stroke width on the 24×24 grid (scales with the size)"
  },
  {
    "name": "absoluteStrokeWidth",
    "source": "packages/native/src/icon/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Keeps `strokeWidth` in dp whatever the size"
  },
  {
    "name": "title",
    "source": "packages/native/src/icon/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible name: the icon becomes an `image` with this label; without it (or an `accessibilityLabel`) the icon is hidden from assistive technologies"
  }
]
```

## API

```json
{
  "native:IconProps": {
    "source": "native/src/icon/types.ts",
    "kind": "interface",
    "extends": [
      "Omit<SvgProps, | \"color\" | \"stroke\" | \"strokeWidth\" | \"fill\" | \"width\" | \"height\" | \"viewBox\" | \"title\" | \"children\" | \"name\">"
    ],
    "props": [
      {
        "name": "icon",
        "type": "IconDefinition",
        "required": true,
        "description": "The icon to draw: a built-in one (e.g. `searchIcon`) or a `defineIcon` result"
      },
      {
        "name": "size",
        "type": "number",
        "required": false,
        "default": "24",
        "description": "Width and height in dp"
      },
      {
        "name": "color",
        "type": "ColorValue",
        "required": false,
        "default": "the theme's text color (`text-color` token)",
        "description": "Stroke color (any React Native `ColorValue`, e.g. the `color` of a navigation `tabBarIcon`); per-path `colors` of the icon win"
      },
      {
        "name": "strokeWidth",
        "type": "number",
        "required": false,
        "default": "2",
        "description": "Stroke width on the 24×24 grid (scales with the size)"
      },
      {
        "name": "absoluteStrokeWidth",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Keeps `strokeWidth` in dp whatever the size"
      },
      {
        "name": "title",
        "type": "string",
        "required": false,
        "description": "Accessible name: the icon becomes an `image` with this label; without it (or an `accessibilityLabel`) the icon is hidden from assistive technologies"
      }
    ]
  },
  "native:DynamicIconProps": {
    "source": "native/src/icon/types.ts",
    "kind": "interface",
    "extends": [
      "NamedIconProps"
    ],
    "props": [
      {
        "name": "name",
        "type": "string",
        "required": true,
        "description": "Name of a built-in icon (e.g. `\"arrow-up\"`); unknown names render nothing"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: Utilisation de base

Chaque icône est un composant qui porte son nom ; les icônes s’insèrent dans le texte et dans les boutons.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/icon/native/basic.tsx

```tsx
import { Text, View } from "react-native";
import {
  BellRingIcon,
  CalendarCheckIcon,
  DynamicIcon,
  Icon,
  ListTodoIcon,
  NotebookPenIcon,
  SearchIcon,
  paletteIcon,
} from "minerva-design/native/icons";

const tabs = ["home", "repeat", "notebook-pen", "library", "user-round"];

export default function Basic() {
  return (
    <View style={{ gap: 20 }}>
      {/* 24dp, stroked with the theme's text color */}
      <View style={{ flexDirection: "row", gap: 16 }}>
        <SearchIcon />
        <CalendarCheckIcon />
        <ListTodoIcon />
        <NotebookPenIcon />
        <BellRingIcon />
      </View>
      {/* size, color, stroke width and an accessible name */}
      <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
        <SearchIcon size={16} />
        <SearchIcon size={32} color="#2563eb" title="Search" />
        <Icon icon={paletteIcon} size={40} strokeWidth={1.5} color="#db2777" />
      </View>
      {/* icons chosen by name (bundles the whole set) */}
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        {tabs.map((name, i) => {
          const color = i === 0 ? "#4f46e5" : "#737373";
          return (
            <View key={name} style={{ alignItems: "center", gap: 4 }}>
              <DynamicIcon name={name} size={22} color={color} />
              <Text style={{ fontSize: 11, color }}>{name}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

```

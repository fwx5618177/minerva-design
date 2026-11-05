# ConfigProvider

React 版のテーマと言語をアプリケーションに提供し、useConfig() から参照できるようにします。

Package: minerva-design@1.21.1

Renderer: react

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.1",
  "sourceCommit": "fce5fba2180337e022f161113a8d4d5b12c50b7e",
  "sourceDigest": "sha256:ce2a20ef1952cc69de92d0733342905020d5135facebdf802e90ddda090ce31c",
  "referenceSourceDigest": "sha256:dd651b3ac3d2ec89388783f5919aefe9a683490b2f63c8d9a9142991a95a6b4c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.1/types.json) or getType() from minerva-design/contracts.

## Documentation

### 使い方

アプリケーションのルートに ConfigProvider を 1 つ配置します。テーマを CSS 変数として  に適用し、React 版内蔵テキストの言語を設定し、両方を useConfig() に提供します。

どちらのプロパティもリアクティブです。state に保持すれば、実行時にテーマや言語をユーザーが切り替えられます。

グローバルな状態を変更するのは最も外側の ConfigProvider だけです。 に data-theme、data-palette とテーマ変数を書き込み、Cookie を保存し、React 版のグローバルな言語を設定します。入れ子の Provider はこれらを一切行わず、自身の設定をサブツリーにだけ適用します（「Provider の入れ子」を参照）。

### パレット、永続化、コールバック

palette は light、dark、system テーマの上に配色パレット（"editorial"、"tech"、"graphite"、"cool"）を重ねます。persist はテーマとパレットの変更を theme と palette の Cookie に保存し、ハイドレーション後に復元します。onThemeChange と onPaletteChange は setTheme と setPalette が値を変更した後に呼ばれます。

useConfig() は mode、resolvedMode、palette と、setTheme、setPalette のセッターも返すので、state を持ち上げなくてもどのコンポーネントからでもテーマを切り替えられます。サーバーレンダリング、Cookie、ちらつき防止の初期化スクリプトについては次のページを参照してください：

### ブランドカラー

primaryColor を使うと、--primary-color を手動で上書きせずにブランドカラーを設定できます。両モード共通の CSS カラー（"#4f46e5"、rgb()、色名）か、{ light, dark } のペアを渡します。テーマは明示的なままです。theme は "light"、"dark"、"system" のままなので、data-theme、useConfig().mode、ThemeToggle はそのまま動作します。

派生トークン：primary-color から派生するすべてのトークン（hover、active、subtle、border、text、フォーカスリング、選択色、およびパレットが独自のアクセントを持たない場合の accent トークン）が、デフォルトテーマと同じ式でブランドカラーから再計算されます。単色の場合、ダークモードの値は暗い面で 4.5:1 のコントラストに達するまで OKLab で白に向けて混色されます（#4f46e5 は #7b85f2 になります）。すでに基準を満たす色はそのまま使われます。

優先順位：primaryColor はパレットやテーマのプライマリカラーより優先され、パレットのその他のトークンは維持されます。無効な色は無視され、開発時に警告が出ます。

入れ子：入れ子の Provider はブランドカラーを継承し、入れ子の primaryColor はそのサブツリー（オーバーレイを含む）にだけ適用されます。null でテーマ本来のプライマリカラーに戻ります。

サーバーレンダリング：ルート Provider はライトとダークのブランドカラーを data-theme で切り替える  として出力するため、ハイドレーション前のサーバーマークアップにもブランドカラーが含まれます（テーマ初期化スクリプトと組み合わせればちらつきません）。React Native（MinervaProvider）、Taro・uni-app・WeChat ミニプログラムの Provider（ConfigProvider / ThemeProvider）、Vue（ConfigProvider / ThemeProvider）、Angular（、provideMinerva({ primaryColor })）、 も同じ値を同じ意味で受け付けます。

### ConfigContext

上位に ConfigProvider がない場合、useConfig() は例外を投げるため、設定ミスを早期に発見できます。Provider が任意の場合は ConfigContext を直接読み取ってください。例外ではなく undefined が返ります。

### Provider の入れ子

別の ConfigProvider の内側にある ConfigProvider を入れ子の Provider と呼びます。ページの一部の領域、プレビュー、デモだけに別のテーマ・パレット・言語を適用したいときに使い、ページの他の部分には影響しません。

継承：上にある最も近い Provider から theme、palette、locale を継承します。上書きされるのは指定した props だけで、その下の useConfig() はマージされた値を返します。継承した設定は親の変更に追従します。

スコープ付きテーマ：theme や palette の上書きはサブツリーにだけ適用されます。Provider は display: contents のラッパー要素（レイアウトは変わりません）を描画し、そこに data-theme、data-palette とテーマ変数を設定します。theme も palette も上書きしない場合、ラッパーは描画されません。

スコープ付き言語：locale の上書きはサブツリーの内蔵テキストだけを変更します。locale だけを指定した Provider はテーマに一切触れません。

オーバーレイ：スコープ付きサブツリーからポータルで描画されるコンテンツ（Modal、Drawer、Popover、Select、Menu、Tooltip、Toast など）は、同じスコープを持つ  上のコンテナに描画されるため、オーバーレイにもスコープ付きテーマが適用されます。React ツリーの外で描画される命令的 API（スタンドアロンの confirm() など）はルートのテーマを使います。

グローバルな状態：入れ子の Provider は  への書き込み、Cookie の読み書き（persist は無視されます）、React 版のグローバルな言語の変更を一切行いません。アンマウントしてもページはルート Provider が設定した状態のままで、ルート Provider をアンマウントすると変更した内容が元に戻ります。入れ子の Provider の setTheme と setPalette は自身の上書き値を変更し、上書きしていない設定については親の値を変更します。

```tsx
import { ConfigProvider } from "minerva-design";
import "minerva-design/style.css";

export default function Root() {
  return (
    <ConfigProvider theme="auto" locale={{ language: "en" }}>
      <App />
    </ConfigProvider>
  );
}
```

```tsx
import { useState } from "react";
import { Button, ConfigProvider, type Theme } from "minerva-design";

export default function Root() {
  const [theme, setTheme] = useState<Theme>("light");
  return (
    <ConfigProvider theme={theme}>
      <Button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Toggle theme
      </Button>
    </ConfigProvider>
  );
}
```

```tsx
import { Button, ConfigProvider, useConfig } from "minerva-design";

export default function Root() {
  return (
    // "system" is an alias of "auto". palette applies with light / dark / system.
    <ConfigProvider
      theme="system"
      palette="editorial"
      persist // restore / save the "theme" and "palette" cookies
      onThemeChange={(theme) => analytics.track("theme", theme)}
      onPaletteChange={(palette) => analytics.track("palette", palette)}
    >
      <App />
    </ConfigProvider>
  );
}

function Settings() {
  const { mode, resolvedMode, palette, setTheme, setPalette } = useConfig();
  // mode: "light" | "dark" | "system"; resolvedMode: "light" | "dark"
  return (
    <>
      <Button onClick={() => setTheme(resolvedMode === "dark" ? "light" : "dark")}>
        {mode}
      </Button>
      <Button onClick={() => setPalette(palette === "tech" ? null : "tech")}>
        {palette ?? "default"}
      </Button>
    </>
  );
}
```

```tsx
import { ConfigProvider, ThemeToggle } from "minerva-design";

// Indigo brand: no --primary-color overrides, no !important.
// theme stays "light" | "dark" | "system", so data-theme and ThemeToggle work.
export default function Root() {
  return (
    <ConfigProvider theme="system" persist primaryColor="#4f46e5">
      {/* dark mode derives #7b85f2 from #4f46e5 */}
      <ThemeToggle />
      <App />
    </ConfigProvider>
  );
}

// Or pick both values:
<ConfigProvider theme="light" primaryColor={{ light: "#4f46e5", dark: "#818cf8" }} />

// The palette keeps its surfaces and text colors, primaryColor wins:
<ConfigProvider palette="tech" primaryColor="#4f46e5" />
```

```tsx
import { ConfigProvider } from "minerva-design";

export default function Root() {
  return (
    // root provider: owns <html>, the cookies and the React library's global language
    <ConfigProvider theme="system" palette="editorial" persist>
      <App />

      {/* inherits theme + palette, only this subtree is in Japanese */}
      <ConfigProvider locale={{ language: "ja" }}>
        <Sidebar />
      </ConfigProvider>

      {/* dark + inherited palette for this card and its overlays only */}
      <ConfigProvider theme="dark">
        <PreviewCard />
      </ConfigProvider>
    </ConfigProvider>
  );
}
```

```tsx
import { useContext } from "react";
import { ConfigContext } from "minerva-design";

// Unlike useConfig(), reading the context directly does not throw outside a
// provider: it returns undefined, which is handy for optional integrations.
function useOptionalConfig() {
  return useContext(ConfigContext);
}
```

## ConfigProvider

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "ConfigProvider"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "theme",
    "source": "packages/react/src/contexts/types.ts",
    "kind": "union",
    "typeText": "ConfigProviderThemeProps | undefined",
    "typeRef": "type:7e53e5511cbf3537893a",
    "required": false,
    "description": "Theme to apply: \"auto\" (follows `prefers-color-scheme`), a built-in theme name, a theme object, or a `{ light, dark }` pair. The root provider applies it to `<html>`; a nested provider inherits its parent's theme unless set, and applies an override to its own subtree only."
  },
  {
    "name": "palette",
    "source": "packages/react/src/contexts/types.ts",
    "kind": "enum",
    "values": [
      "cool",
      "editorial",
      "graphite",
      "tech"
    ],
    "typeText": "\"editorial\" | \"tech\" | \"graphite\" | \"cool\" | null | undefined",
    "typeRef": "type:b7f5e4f1c686e6b76ccf",
    "required": false,
    "description": "Palette applied with the light / dark / system themes (\"editorial\", \"tech\", \"graphite\", \"cool\"); `null` keeps Minerva's default look. The root provider sets `data-palette` on `<html>`; a nested provider inherits its parent's palette unless set, and scopes an override to its subtree. Palette tokens come from `style.css`."
  },
  {
    "name": "primaryColor",
    "source": "packages/react/src/contexts/types.ts",
    "kind": "union",
    "typeText": "PrimaryColor | null | undefined",
    "typeRef": "type:f612ad4ccbeed997ce22",
    "required": false,
    "description": "Brand color: sets `--primary-color` and recomputes every token derived from it (hover, active, subtle, border and text roles, selected, focus ring, and the accent when the palette has no accent of its own) with the default theme's formulas, without changing the light / dark mode. A single color applies to light mode and gets a dark-mode value lightened for contrast on dark surfaces (WCAG 4.5:1); pass `{ light, dark }` to choose both. Wins over the primary color of the theme and of the palette. Accepts hex, `rgb()` / `rgba()` and the basic named colors; an invalid value is ignored (development warning). A nested provider inherits its parent's brand color unless set (`null` restores the theme's own), and scopes an override to its subtree."
  },
  {
    "name": "persist",
    "source": "packages/react/src/contexts/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Persist theme and palette changes in the `theme` / `palette` cookies and restore them after hydration (pair with `THEME_INIT_SCRIPT` for SSR). Root provider only: ignored by nested providers."
  },
  {
    "name": "locale",
    "source": "packages/react/src/contexts/types.ts",
    "kind": "object",
    "typeText": "Locale | undefined",
    "typeRef": "type:faa2d1cac8abe6cb7ce4",
    "required": false,
    "description": "Language of the React library's built-in texts. The root provider sets it globally; a nested provider inherits its parent's language unless set, and applies an override to its subtree only."
  },
  {
    "name": "preset",
    "source": "packages/react/src/contexts/types.ts",
    "kind": "enum",
    "values": [
      "compact",
      "editorial",
      "minerva",
      "touch"
    ],
    "typeText": "\"editorial\" | \"compact\" | \"minerva\" | \"touch\" | undefined",
    "typeRef": "type:57c71898ce4900e4be17",
    "required": false,
    "description": "Design preset: a named combination of the design axes below and a default palette. \"minerva\" (default look), \"editorial\" (restrained, reading-oriented: editorial palette, comfortable density, small radius, subtle shadows, large type), \"compact\" (dense, data-heavy screens) or \"touch\" (consumer mobile apps: comfortable density, 44px touch targets, large radius). Explicit axes and `palette` win over the preset. A nested provider inherits its parent's design unless set; a nested preset resets every axis it does not set."
  },
  {
    "name": "density",
    "source": "packages/react/src/contexts/types.ts",
    "kind": "enum",
    "values": [
      "comfortable",
      "compact",
      "standard"
    ],
    "typeText": "\"compact\" | \"comfortable\" | \"standard\" | undefined",
    "typeRef": "type:6c4c4181cf4b702c1892",
    "required": false,
    "description": "Spacing density of controls (heights, paddings) and rows (menus, lists, tables): `data-density`"
  },
  {
    "name": "radius",
    "source": "packages/react/src/contexts/types.ts",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "none",
      "small"
    ],
    "typeText": "\"small\" | \"medium\" | \"large\" | \"none\" | undefined",
    "typeRef": "type:81d0cef3201cfa049ee4",
    "required": false,
    "description": "Corner radius scale (`--radius-sm` ... `--radius-2xl`): `data-radius`"
  },
  {
    "name": "shadow",
    "source": "packages/react/src/contexts/types.ts",
    "kind": "enum",
    "values": [
      "none",
      "standard",
      "subtle"
    ],
    "typeText": "\"subtle\" | \"none\" | \"standard\" | undefined",
    "typeRef": "type:24a43819632837de5021",
    "required": false,
    "description": "Elevation shadows (`--shadow-sm` ... `--shadow-xl`): `data-shadow`. \"standard\" keeps the theme / palette shadows"
  },
  {
    "name": "fontScale",
    "source": "packages/react/src/contexts/types.ts",
    "kind": "enum",
    "values": [
      "large",
      "small",
      "standard"
    ],
    "typeText": "\"small\" | \"large\" | \"standard\" | undefined",
    "typeRef": "type:4fdefa306ab8f9ff4574",
    "required": false,
    "description": "Type scale (`--font-size-*`, line heights): `data-font-scale`. \"large\" is reading-oriented"
  }
]
```

### events

```json
[
  {
    "name": "onThemeChange",
    "source": "packages/react/src/contexts/types.ts",
    "kind": "function",
    "typeText": "((theme: ConfigProviderThemeProps) => void) | undefined",
    "typeRef": "type:2f3ee82ad197e9845fea",
    "parameters": [
      {
        "name": "theme",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ConfigProviderThemeProps",
        "typeRef": "type:73ae73d9b67b72d0bab6"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called after `setTheme` changes the theme"
  },
  {
    "name": "onPaletteChange",
    "source": "packages/react/src/contexts/types.ts",
    "kind": "function",
    "typeText": "((palette: \"editorial\" | \"tech\" | \"graphite\" | \"cool\" | null) => void) | undefined",
    "typeRef": "type:413c6a7bb82a25e28be4",
    "parameters": [
      {
        "name": "palette",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "\"editorial\" | \"tech\" | \"graphite\" | \"cool\" | null",
        "typeRef": "type:918077d2a22b5f20e063"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called after `setPalette` changes the palette"
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

### bindings

```json
[
  {
    "prop": "theme",
    "event": "onThemeChange",
    "syntax": "theme={theme} onThemeChange={handler}"
  },
  {
    "prop": "palette",
    "event": "onPaletteChange",
    "syntax": "palette={palette} onPaletteChange={handler}"
  }
]
```

## API

```json
{
  "ConfigContextProviderProps": {
    "source": "react/src/contexts/types.ts",
    "description": "Props of `ConfigProvider`",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "theme",
        "type": "ConfigProviderThemeProps",
        "required": false,
        "default": "\"auto\" (nested: the parent's theme)",
        "description": "Theme to apply: \"auto\" (follows `prefers-color-scheme`), a built-in theme name, a theme object, or a `{ light, dark }` pair. The root provider applies it to `<html>`; a nested provider inherits its parent's theme unless set, and applies an override to its own subtree only."
      },
      {
        "name": "palette",
        "type": "Palette | null",
        "required": false,
        "default": "null (nested: the parent's palette)",
        "description": "Palette applied with the light / dark / system themes (\"editorial\", \"tech\", \"graphite\", \"cool\"); `null` keeps Minerva's default look. The root provider sets `data-palette` on `<html>`; a nested provider inherits its parent's palette unless set, and scopes an override to its subtree. Palette tokens come from `style.css`."
      },
      {
        "name": "primaryColor",
        "type": "PrimaryColor | null",
        "required": false,
        "default": "null (nested: the parent's brand color)",
        "description": "Brand color: sets `--primary-color` and recomputes every token derived from it (hover, active, subtle, border and text roles, selected, focus ring, and the accent when the palette has no accent of its own) with the default theme's formulas, without changing the light / dark mode. A single color applies to light mode and gets a dark-mode value lightened for contrast on dark surfaces (WCAG 4.5:1); pass `{ light, dark }` to choose both. Wins over the primary color of the theme and of the palette. Accepts hex, `rgb()` / `rgba()` and the basic named colors; an invalid value is ignored (development warning). A nested provider inherits its parent's brand color unless set (`null` restores the theme's own), and scopes an override to its subtree."
      },
      {
        "name": "persist",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Persist theme and palette changes in the `theme` / `palette` cookies and restore them after hydration (pair with `THEME_INIT_SCRIPT` for SSR). Root provider only: ignored by nested providers."
      },
      {
        "name": "onThemeChange",
        "type": "(theme: ConfigProviderThemeProps) => void",
        "required": false,
        "description": "Called after `setTheme` changes the theme"
      },
      {
        "name": "onPaletteChange",
        "type": "(palette: Palette | null) => void",
        "required": false,
        "description": "Called after `setPalette` changes the palette"
      },
      {
        "name": "locale",
        "type": "Locale",
        "required": false,
        "default": "{ language: \"en\" } (nested: the parent's locale)",
        "description": "Language of the React library's built-in texts. The root provider sets it globally; a nested provider inherits its parent's language unless set, and applies an override to its subtree only."
      },
      {
        "name": "preset",
        "type": "DesignPreset",
        "required": false,
        "default": "\"minerva\" (nested: the parent's design)",
        "description": "Design preset: a named combination of the design axes below and a default palette. \"minerva\" (default look), \"editorial\" (restrained, reading-oriented: editorial palette, comfortable density, small radius, subtle shadows, large type), \"compact\" (dense, data-heavy screens) or \"touch\" (consumer mobile apps: comfortable density, 44px touch targets, large radius). Explicit axes and `palette` win over the preset. A nested provider inherits its parent's design unless set; a nested preset resets every axis it does not set."
      },
      {
        "name": "density",
        "type": "Density",
        "required": false,
        "default": "\"standard\" (or the preset's)",
        "description": "Spacing density of controls (heights, paddings) and rows (menus, lists, tables): `data-density`"
      },
      {
        "name": "radius",
        "type": "RadiusScale",
        "required": false,
        "default": "\"medium\" (or the preset's)",
        "description": "Corner radius scale (`--radius-sm` ... `--radius-2xl`): `data-radius`"
      },
      {
        "name": "shadow",
        "type": "ShadowScale",
        "required": false,
        "default": "\"standard\" (or the preset's)",
        "description": "Elevation shadows (`--shadow-sm` ... `--shadow-xl`): `data-shadow`. \"standard\" keeps the theme / palette shadows"
      },
      {
        "name": "fontScale",
        "type": "FontScale",
        "required": false,
        "default": "\"standard\" (or the preset's)",
        "description": "Type scale (`--font-size-*`, line heights): `data-font-scale`. \"large\" is reading-oriented"
      },
      {
        "name": "children",
        "type": "ReactNode",
        "required": true,
        "description": "Application content"
      }
    ]
  },
  "ConfigContextProps": {
    "source": "react/src/contexts/types.ts",
    "description": "Value of `ConfigContext`, returned by `useConfig()`",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "theme",
        "type": "ConfigProviderThemeProps",
        "required": false,
        "description": "Theme as configured (may be \"auto\" or a light/dark pair)"
      },
      {
        "name": "resolvedTheme",
        "type": "ThemeName | ComponentTheme",
        "required": false,
        "description": "Theme that is currently applied after resolving \"auto\" / light-dark pairs"
      },
      {
        "name": "locale",
        "type": "Locale",
        "required": false,
        "description": "Current locale of the React library's built-in texts"
      },
      {
        "name": "mode",
        "type": "ThemeMode",
        "required": false,
        "description": "Color mode of the theme: \"light\" / \"dark\" for those themes, \"system\" for \"auto\" / \"system\" / `{ light, dark }` pairs, `undefined` for other themes"
      },
      {
        "name": "resolvedMode",
        "type": "ResolvedThemeMode",
        "required": false,
        "description": "Applied color mode (`data-theme` on `<html>`, or on the scope element of a nested provider), when it can be determined"
      },
      {
        "name": "palette",
        "type": "Palette | null",
        "required": false,
        "description": "Active palette (`data-palette` on `<html>`, or on the scope element of a nested provider), `null` for Minerva's default look"
      },
      {
        "name": "primaryColor",
        "type": "PrimaryColorPair | null",
        "required": false,
        "description": "Brand color in effect (normalized light / dark pair, see `ConfigProvider`'s `primaryColor`), `null` when the theme / palette primary color applies"
      },
      {
        "name": "design",
        "type": "ResolvedDesign",
        "required": false,
        "description": "Applied design axes (`data-density` / `data-radius` / `data-shadow` / `data-font-scale`) and the preset they come from"
      },
      {
        "name": "setTheme",
        "type": "(theme: ConfigProviderThemeProps) => void",
        "required": false,
        "description": "Change the theme (persisted to the `theme` cookie when `persist` is on)"
      },
      {
        "name": "setPalette",
        "type": "(palette: Palette | null) => void",
        "required": false,
        "description": "Change the palette (persisted to the `palette` cookie when `persist` is on)"
      }
    ]
  },
  "Locale": {
    "source": "react/src/contexts/types.ts",
    "description": "Locale settings of the React library's built-in texts",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "language",
        "type": "SupportedLanguage",
        "required": false,
        "default": "\"en\"",
        "description": "Language of the React library's built-in texts"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: ブランドカラー

サイトの現在のモードで primaryColor を指定した入れ子の ConfigProvider：単色のインディゴ（ダークの値は自動派生）、{ light, dark } ペア、ティール。サイトのテーマを切り替えて派生したダークの値を比べてください。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/config-provider/demos/brand-color.tsx

```tsx
import { Button, ConfigProvider, Switch, useConfig } from "minerva-design";

// A brand color without overriding --primary-color by hand: each card is a
// nested <ConfigProvider primaryColor> in the site's current light / dark mode.
// A single color gets a lighter dark-mode value (contrast on dark surfaces);
// a { light, dark } pair sets both. Hover, active, subtle, border, text and
// focus ring colors are all derived from it.
const brands = [
  { label: 'primaryColor="#4f46e5"', primaryColor: "#4f46e5" },
  {
    label: 'primaryColor={{ light: "#4f46e5", dark: "#818cf8" }}',
    primaryColor: { light: "#4f46e5", dark: "#818cf8" },
  },
  { label: 'primaryColor="#0d9488"', primaryColor: "#0d9488" },
];

function Swatch() {
  const { resolvedMode = "light", primaryColor } = useConfig();
  return (
    <code style={{ color: "var(--text-muted-color)", fontSize: 12 }}>
      {resolvedMode}: {primaryColor?.[resolvedMode]}
    </code>
  );
}

export default function BrandColorDemo() {
  const { resolvedMode = "light" } = useConfig();

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: 12,
      }}
    >
      {brands.map(({ label, primaryColor }) => (
        <ConfigProvider
          key={label}
          theme={resolvedMode}
          primaryColor={primaryColor}
        >
          <div
            style={{
              display: "grid",
              gap: 10,
              padding: 14,
              borderRadius: 10,
              border: "1px solid var(--border-color)",
              background: "var(--background-color)",
              color: "var(--text-color)",
              fontFamily: "var(--font-family-sans)",
            }}
          >
            <code style={{ fontSize: 12, overflowWrap: "anywhere" }}>
              {label}
            </code>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              <Button size="small" color="primary">
                Primary
              </Button>
              <Button size="small" color="primary" variant="outline">
                Outline
              </Button>
              <Switch defaultChecked aria-label="Brand switch" />
            </div>
            <Swatch />
          </div>
        </ConfigProvider>
      ))}
    </div>
  );
}

```

## Example: カスタムテーマ

themes.light をもとにしたカスタムテーマを入れ子の ConfigProvider に渡しています。ポータルで描画される Select のメニューを含め、このコンテナだけにテーマが適用されます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/config-provider/demos/custom-theme.tsx

```tsx
import {
  Button,
  ConfigProvider,
  HStack,
  Select,
  SelectItem,
  Switch,
  themes,
  type ComponentTheme,
  VStack,
} from "minerva-design";

// A custom theme: start from a built-in one and override tokens.
const sepia: ComponentTheme = {
  ...themes.light,
  "primary-color": "#9a3412",
  "primary-color-hover": "#7c2d12",
  "primary-color-active": "#6c2710",
  "background-color": "#fbf5e9",
  "foreground-color": "#3b2f2a",
  "border-color": "#e0d2b8",
  "text-gray": "#6b5b4e",
  "focus-ring-color": "rgba(154, 52, 18, 0.45)",
};

// A nested ConfigProvider applies its theme to its own subtree only (the
// site's root provider keeps <html>). Portalled content opened from inside,
// like the Select menu below, gets the same theme.
export default function CustomThemeDemo() {
  return (
    <ConfigProvider theme={sepia}>
      <div
        style={{
          padding: 16,
          borderRadius: 8,
          border: "1px solid var(--border-color)",
          background: "var(--surface-color)",
          color: "var(--text-color)",
        }}
      >
        <VStack gap={4} align="start">
          <strong>Sepia theme</strong>
          <span>Only this container uses the custom theme.</span>
          <HStack gap={4} wrap>
            <Button color="primary">Primary</Button>
            <Button color="primary" disabled>
              Disabled
            </Button>
            <Switch label="Reading mode" defaultChecked />
            <Select aria-label="Paper" defaultValue="cream">
              <SelectItem value="cream">Cream</SelectItem>
              <SelectItem value="ivory">Ivory</SelectItem>
              <SelectItem value="kraft">Kraft</SelectItem>
            </Select>
          </HStack>
        </VStack>
      </div>
    </ConfigProvider>
  );
}

```

## Example: ロケール

locale（en、zh、ja、fr）だけを指定した入れ子の ConfigProvider です。サブツリーの内蔵テキストは変わりますが、テーマとパレットはサイトから継承され、<html> は変更されません。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/config-provider/demos/locale.tsx

```tsx
import { useState } from "react";
import {
  Button,
  ConfigProvider,
  Pagination,
  Tag,
  useConfig,
  useI18n,
  type SupportedLanguage,
} from "minerva-design";

// a key from the React library's built-in translations
const AVATAR_KEY = "avatar.default";
const LANGUAGES: SupportedLanguage[] = ["en", "zh", "ja", "fr"];

function Preview() {
  const { locale, palette } = useConfig();
  const { t } = useI18n();
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 8,
        }}
      >
        locale: <Tag color="primary">{locale?.language}</Tag> {AVATAR_KEY}:{" "}
        <Tag color="info">{t(AVATAR_KEY)}</Tag> palette:{" "}
        <Tag color="success">{palette ?? "default"}</Tag>
      </div>
      <Pagination total={50} defaultCurrent={2} showTotal />
    </div>
  );
}

export default function LocaleDemo() {
  const [language, setLanguage] = useState<SupportedLanguage>("en");

  // A nested provider that only sets `locale`: theme and palette are
  // inherited from the site's provider, <html> is left alone, and the
  // language only applies to this subtree.
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div
        role="group"
        aria-label="Language"
        style={{ display: "flex", gap: 8 }}
      >
        {LANGUAGES.map((lng) => (
          <Button
            key={lng}
            size="small"
            color={lng === language ? "primary" : "neutral"}
            variant={lng === language ? "solid" : "outline"}
            aria-pressed={lng === language}
            onClick={() => setLanguage(lng)}
          >
            {lng}
          </Button>
        ))}
      </div>
      <ConfigProvider locale={{ language }}>
        <Preview />
      </ConfigProvider>
    </div>
  );
}

```

## Example: パレット

各カードは独自のパレットを持つ入れ子の ConfigProvider で、サイトの現在のモードで表示されます。サイトのルート Provider は <html> の data-palette を保持したままです。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/config-provider/demos/palette.tsx

```tsx
import { Button, ConfigProvider, Tag, useConfig } from "minerva-design";
import { PALETTES } from "minerva-design/theme-utils";

// The site's root provider sets data-palette on <html>. Each card below is a
// nested <ConfigProvider palette={name}>: the palette (in the site's current
// light / dark mode) only applies inside the card.
export default function PaletteDemo() {
  const { resolvedMode = "light", palette } = useConfig();

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
        gap: 12,
      }}
    >
      {PALETTES.map((name) => (
        <ConfigProvider key={name} theme={resolvedMode} palette={name}>
          <div
            style={{
              display: "grid",
              gap: 10,
              padding: 14,
              borderRadius: 10,
              border: "1px solid var(--border-color)",
              background: "var(--background-color)",
              color: "var(--text-color)",
              fontFamily: "var(--font-family-sans)",
            }}
          >
            <strong>
              palette=&quot;{name}&quot;{" "}
              {palette === name && <Tag color="success">active</Tag>}
            </strong>
            <Button size="small" color="primary">
              Primary
            </Button>
            <span style={{ color: "var(--text-muted-color)", fontSize: 13 }}>
              data-theme=&quot;{resolvedMode}&quot;
            </span>
          </div>
        </ConfigProvider>
      ))}
    </div>
  );
}

```

## Example: 設定の読み取り

useConfig() は最も近い Provider のテーマ、解決後のテーマ、パレット、ロケールを返します。ヘッダーでサイトのテーマ、パレット、言語を切り替えると値が更新されます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/config-provider/demos/use-config.tsx

```tsx
import { Tag, useConfig } from "minerva-design";

// useConfig() reads the nearest ConfigProvider. This site wraps every page in
// one, so the values below change when you pick another theme, palette or
// language in the header.
export default function UseConfigDemo() {
  const { theme, resolvedTheme, palette, locale } = useConfig();

  const describe = (value: unknown) =>
    typeof value === "string" ? value : "custom theme object";

  return (
    <dl
      style={{
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        gap: "8px 16px",
        margin: 0,
      }}
    >
      <dt>theme</dt>
      <dd style={{ margin: 0 }}>
        <Tag color="primary">{describe(theme)}</Tag>
      </dd>
      <dt>resolvedTheme</dt>
      <dd style={{ margin: 0 }}>
        <Tag color="info">{describe(resolvedTheme)}</Tag>
      </dd>
      <dt>palette</dt>
      <dd style={{ margin: 0 }}>
        <Tag color="warning">{palette ?? "null"}</Tag>
      </dd>
      <dt>locale.language</dt>
      <dd style={{ margin: 0 }}>
        <Tag color="success">{locale?.language ?? "en"}</Tag>
      </dd>
    </dl>
  );
}

```

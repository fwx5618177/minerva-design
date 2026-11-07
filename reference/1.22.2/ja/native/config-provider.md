# ConfigProvider

React 版のテーマと言語をアプリケーションに提供し、useConfig() から参照できるようにします。

Package: minerva-design@1.22.2

Renderer: native

Locale: ja

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

Support: beta

MinervaProvider (alias ConfigProvider): theme light / dark / system via useColorScheme, palette, design preset (touch by default), locale, safe-area insets

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "MinervaProvider"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "theme",
    "source": "packages/native/src/theme/types.ts",
    "kind": "enum",
    "values": [
      "dark",
      "light",
      "system"
    ],
    "typeText": "ThemeMode | undefined",
    "typeRef": "type:293f77323be9bd072cec",
    "default": "system",
    "required": false,
    "description": "Color mode: \"light\", \"dark\", or \"system\" (follows the OS appearance through `useColorScheme`). Same values as the web `ConfigProvider` modes. Uncontrolled after the first render: change it with `setThemeMode` (`useTheme()`) or by passing a new value."
  },
  {
    "name": "palette",
    "source": "packages/native/src/theme/types.ts",
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
    "description": "Built-in palette (\"editorial\", \"tech\", \"graphite\", \"cool\"); `null` keeps Minerva's default look"
  },
  {
    "name": "primaryColor",
    "source": "packages/native/src/theme/types.ts",
    "kind": "union",
    "typeText": "PrimaryColor | null | undefined",
    "typeRef": "type:f612ad4ccbeed997ce22",
    "required": false,
    "description": "Brand color: a CSS color (`\"#4f46e5\"`, `rgb()`...) for both modes, or a `{ light, dark }` pair. A single color gets a lighter dark-mode value with enough contrast on dark surfaces (`derivePrimaryDark`). Every token derived from `primary-color` (hover, active, subtle, border, text, focus ring, selection...) is recomputed from it. Wins over the palette's primary color; `overrides` still win over it. Unset: the parent provider's; `null`: the theme / palette's own. Invalid colors are ignored (with a development warning)."
  },
  {
    "name": "preset",
    "source": "packages/native/src/theme/types.ts",
    "kind": "enum",
    "values": [
      "compact",
      "editorial",
      "minerva",
      "touch"
    ],
    "typeText": "\"editorial\" | \"minerva\" | \"compact\" | \"touch\" | undefined",
    "typeRef": "type:1c1ec4963e4ae7a8649f",
    "default": "touch",
    "required": false,
    "description": "Design preset: \"minerva\" (default look), \"editorial\", \"compact\" or \"touch\" (consumer mobile apps: comfortable density, 44pt touch targets, large radius)"
  },
  {
    "name": "density",
    "source": "packages/native/src/theme/types.ts",
    "kind": "enum",
    "values": [
      "comfortable",
      "compact",
      "standard"
    ],
    "typeText": "\"compact\" | \"standard\" | \"comfortable\" | undefined",
    "typeRef": "type:5ea3bae44292e2cd25dd",
    "required": false,
    "description": "Spacing density of controls and rows"
  },
  {
    "name": "radius",
    "source": "packages/native/src/theme/types.ts",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "none",
      "small"
    ],
    "typeText": "\"none\" | \"small\" | \"medium\" | \"large\" | undefined",
    "typeRef": "type:1158e24eb483a4cd6fbe",
    "required": false,
    "description": "Corner radius scale"
  },
  {
    "name": "shadow",
    "source": "packages/native/src/theme/types.ts",
    "kind": "enum",
    "values": [
      "none",
      "standard",
      "subtle"
    ],
    "typeText": "\"standard\" | \"none\" | \"subtle\" | undefined",
    "typeRef": "type:47bcd12f79e654091e49",
    "required": false,
    "description": "Elevation shadow scale"
  },
  {
    "name": "fontScale",
    "source": "packages/native/src/theme/types.ts",
    "kind": "enum",
    "values": [
      "large",
      "small",
      "standard"
    ],
    "typeText": "\"standard\" | \"small\" | \"large\" | undefined",
    "typeRef": "type:86445c94907554063d7f",
    "required": false,
    "description": "Type scale"
  },
  {
    "name": "overrides",
    "source": "packages/native/src/theme/types.ts",
    "kind": "union",
    "typeText": "Readonly<Record<string, TokenValue | undefined>> | Partial<ComponentTheme> | undefined",
    "typeRef": "type:f989e4e5899a9ce2f235",
    "required": false,
    "description": "Token overrides (names without `--`, e.g. `{ \"primary-color\": \"#e11d48\" }`), applied over the mode / palette / design; may reference other tokens (`var(--x)`) and use `color-mix()`"
  },
  {
    "name": "locale",
    "source": "packages/native/src/theme/types.ts",
    "kind": "object",
    "typeText": "NativeLocale | undefined",
    "typeRef": "type:149d41d21bc4ddc91623",
    "required": false,
    "description": "Language and extra messages of the built-in texts"
  },
  {
    "name": "insets",
    "source": "packages/native/src/theme/types.ts",
    "kind": "object",
    "typeText": "Partial<EdgeInsets> | undefined",
    "typeRef": "type:d4cbbc6e4d016c5d57de",
    "required": false,
    "description": "Safe-area insets used by toasts, popups, action sheets and the nav / tab bars. Pass `useSafeAreaInsets()` of `react-native-safe-area-context`"
  },
  {
    "name": "fonts",
    "source": "packages/native/src/theme/types.ts",
    "kind": "object",
    "typeText": "NativeFonts | undefined",
    "typeRef": "type:4f09c00c9a5dff981939",
    "required": false,
    "description": "Font families loaded by the app"
  },
  {
    "name": "reducedMotion",
    "source": "packages/native/src/theme/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Instant transitions. Follows the OS \"Reduce motion\" setting when unset"
  }
]
```

### events

```json
[
  {
    "name": "onThemeChange",
    "source": "packages/native/src/theme/types.ts",
    "kind": "function",
    "typeText": "((theme: ThemeMode) => void) | undefined",
    "typeRef": "type:86dba1b7bbdbcf24a818",
    "parameters": [
      {
        "name": "theme",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "ThemeMode",
        "typeRef": "type:49e6b37018cf95b597ae"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the color mode changes (`setThemeMode`, ThemeToggle)"
  },
  {
    "name": "onPaletteChange",
    "source": "packages/native/src/theme/types.ts",
    "kind": "function",
    "typeText": "((palette: \"editorial\" | \"tech\" | \"graphite\" | \"cool\" | null) => void) | undefined",
    "typeRef": "type:11af47bab4686310385a",
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
    "description": "Called when the palette changes (`setPalette`)"
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
  "native:MinervaProviderProps": {
    "source": "native/src/theme/types.ts",
    "description": "Props of `MinervaProvider` (alias `ConfigProvider`)",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "theme",
        "type": "ThemeMode",
        "required": false,
        "default": "\"system\"",
        "description": "Color mode: \"light\", \"dark\", or \"system\" (follows the OS appearance through `useColorScheme`). Same values as the web `ConfigProvider` modes. Uncontrolled after the first render: change it with `setThemeMode` (`useTheme()`) or by passing a new value."
      },
      {
        "name": "palette",
        "type": "Palette | null",
        "required": false,
        "default": "the preset's palette (`null` for \"minerva\" / \"touch\")",
        "description": "Built-in palette (\"editorial\", \"tech\", \"graphite\", \"cool\"); `null` keeps Minerva's default look"
      },
      {
        "name": "primaryColor",
        "type": "PrimaryColor | null",
        "required": false,
        "default": "undefined",
        "description": "Brand color: a CSS color (`\"#4f46e5\"`, `rgb()`...) for both modes, or a `{ light, dark }` pair. A single color gets a lighter dark-mode value with enough contrast on dark surfaces (`derivePrimaryDark`). Every token derived from `primary-color` (hover, active, subtle, border, text, focus ring, selection...) is recomputed from it. Wins over the palette's primary color; `overrides` still win over it. Unset: the parent provider's; `null`: the theme / palette's own. Invalid colors are ignored (with a development warning)."
      },
      {
        "name": "preset",
        "type": "DesignPreset",
        "required": false,
        "default": "\"touch\"",
        "description": "Design preset: \"minerva\" (default look), \"editorial\", \"compact\" or \"touch\" (consumer mobile apps: comfortable density, 44pt touch targets, large radius)"
      },
      {
        "name": "density",
        "type": "Density",
        "required": false,
        "default": "the preset's",
        "description": "Spacing density of controls and rows"
      },
      {
        "name": "radius",
        "type": "RadiusScale",
        "required": false,
        "default": "the preset's",
        "description": "Corner radius scale"
      },
      {
        "name": "shadow",
        "type": "ShadowScale",
        "required": false,
        "default": "the preset's",
        "description": "Elevation shadow scale"
      },
      {
        "name": "fontScale",
        "type": "FontScale",
        "required": false,
        "default": "the preset's",
        "description": "Type scale"
      },
      {
        "name": "overrides",
        "type": "Readonly<Record<string, TokenValue | undefined>> | Partial<ComponentTheme>",
        "required": false,
        "description": "Token overrides (names without `--`, e.g. `{ \"primary-color\": \"#e11d48\" }`), applied over the mode / palette / design; may reference other tokens (`var(--x)`) and use `color-mix()`"
      },
      {
        "name": "locale",
        "type": "NativeLocale",
        "required": false,
        "default": "{ language: \"en\" }",
        "description": "Language and extra messages of the built-in texts"
      },
      {
        "name": "insets",
        "type": "Partial<EdgeInsets>",
        "required": false,
        "default": "{ top: StatusBar height on Android, else 0, right: 0, bottom: 0, left: 0 }",
        "description": "Safe-area insets used by toasts, popups, action sheets and the nav / tab bars. Pass `useSafeAreaInsets()` of `react-native-safe-area-context`"
      },
      {
        "name": "fonts",
        "type": "NativeFonts",
        "required": false,
        "default": "the platform fonts",
        "description": "Font families loaded by the app"
      },
      {
        "name": "reducedMotion",
        "type": "boolean",
        "required": false,
        "default": "the OS setting",
        "description": "Instant transitions. Follows the OS \"Reduce motion\" setting when unset"
      },
      {
        "name": "onThemeChange",
        "type": "(theme: ThemeMode) => void",
        "required": false,
        "description": "Called when the color mode changes (`setThemeMode`, ThemeToggle)"
      },
      {
        "name": "onPaletteChange",
        "type": "(palette: Palette | null) => void",
        "required": false,
        "description": "Called when the palette changes (`setPalette`)"
      },
      {
        "name": "children",
        "type": "ReactNode",
        "required": false,
        "description": "Application content"
      }
    ]
  },
  "native:MinervaTheme": {
    "source": "native/src/theme/types.ts",
    "description": "Value of `useTheme()`",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "tokens",
        "type": "ResolvedTokens",
        "required": true,
        "description": "Every design token as a concrete value (`resolveTokens` output)"
      },
      {
        "name": "colors",
        "type": "ResolvedTokens[\"colors\"]",
        "required": true,
        "description": "Shortcut for `tokens.colors`"
      },
      {
        "name": "themeMode",
        "type": "ThemeMode",
        "required": true,
        "description": "Mode chosen (\"system\" follows the OS)"
      },
      {
        "name": "mode",
        "type": "ResolvedThemeMode",
        "required": true,
        "description": "Mode applied"
      },
      {
        "name": "palette",
        "type": "Palette | null",
        "required": true,
        "description": "Active palette (`null`: default look)"
      },
      {
        "name": "design",
        "type": "ResolvedDesign",
        "required": true,
        "description": "Applied design axes and their preset"
      },
      {
        "name": "reducedMotion",
        "type": "boolean",
        "required": true,
        "description": "Instant transitions"
      },
      {
        "name": "fonts",
        "type": "NativeFonts",
        "required": true,
        "description": "Font families of the app"
      },
      {
        "name": "setThemeMode",
        "type": "(mode: ThemeMode) => void",
        "required": true,
        "description": "Changes the color mode"
      },
      {
        "name": "setPalette",
        "type": "(palette: Palette | null) => void",
        "required": true,
        "description": "Changes the palette"
      },
      {
        "name": "setPreset",
        "type": "(preset: DesignPreset) => void",
        "required": true,
        "description": "Changes the design preset (resets the axes to the preset's)"
      }
    ]
  },
  "native:MinervaI18n": {
    "source": "native/src/theme/types.ts",
    "description": "Value of `useI18n()`",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "t",
        "type": "TranslateFunction",
        "required": true,
        "description": "Translates a message key (`modal.close`, `pagination.next`...)"
      },
      {
        "name": "language",
        "type": "SupportedLanguage",
        "required": true
      }
    ]
  },
  "native:NativeLocale": {
    "source": "native/src/theme/types.ts",
    "description": "Locale settings of the built-in texts",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "language",
        "type": "SupportedLanguage",
        "required": false,
        "default": "\"en\"",
        "description": "Language of the built-in texts (close / cancel labels, pagination, validation messages...)"
      },
      {
        "name": "messages",
        "type": "Messages",
        "required": false,
        "description": "Extra / overriding messages, merged over the built-in ones"
      }
    ]
  },
  "native:NativeFonts": {
    "source": "native/src/theme/types.ts",
    "description": "Font families loaded by the app (e.g. with `expo-font`)",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "sans",
        "type": "string",
        "required": false,
        "default": "the platform font",
        "description": "Body text (`fontFamily` of every text)"
      },
      {
        "name": "mono",
        "type": "string",
        "required": false,
        "default": "the platform monospace font",
        "description": "Code and tabular numbers"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: switching

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/config-provider/native/switching.tsx

```tsx
import { useState } from "react";
import { Text, View } from "react-native";
import { Button, MinervaProvider, useTheme } from "minerva-design/native";

const THEMES = ["light", "dark"] as const;
const PALETTES = [null, "tech", "editorial", "cool"] as const;

function Content() {
  const { colors, mode, palette } = useTheme();
  return (
    <View
      style={{
        gap: 8,
        padding: 16,
        borderRadius: 16,
        backgroundColor: colors["background-color"],
      }}
    >
      <Text style={{ color: colors["text-color"], fontSize: 17 }}>
        Weekend in Lisbon
      </Text>
      <Text style={{ color: colors["text-secondary-color"] }}>
        2 nights · {mode} mode · palette {palette ?? "default"}
      </Text>
      <Button fullWidth>Reserve from $240</Button>
    </View>
  );
}

export default function Switching() {
  const [theme, setTheme] = useState<(typeof THEMES)[number]>("light");
  const [palette, setPalette] = useState<(typeof PALETTES)[number]>(null);
  return (
    <View style={{ gap: 12 }}>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
        {THEMES.map((value) => (
          <Button
            key={value}
            size="small"
            variant={theme === value ? "solid" : "outline"}
            onPress={() => setTheme(value)}
          >
            {value}
          </Button>
        ))}
        {PALETTES.map((value) => (
          <Button
            key={value ?? "default"}
            size="small"
            color="neutral"
            variant={palette === value ? "solid" : "outline"}
            onPress={() => setPalette(value)}
          >
            {value ?? "default"}
          </Button>
        ))}
      </View>
      <MinervaProvider theme={theme} palette={palette}>
        <Content />
      </MinervaProvider>
    </View>
  );
}

```

## Example: use-theme

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/config-provider/native/use-theme.tsx

```tsx
import { Text, View } from "react-native";
import { useTheme, useTokens } from "minerva-design/native";

const STATS = [
  { label: "Orders", value: "12", color: "primary-color" },
  { label: "Coupons", value: "3", color: "success-color" },
  { label: "Unpaid", value: "1", color: "danger-color" },
];

export default function UseTheme() {
  const { colors, mode } = useTheme();
  const { space, radius, fontSize, shadows } = useTokens();
  return (
    <View
      style={{
        gap: space["3"],
        padding: space["4"],
        borderRadius: radius.xl,
        borderWidth: 1,
        borderColor: colors["border-color"],
        backgroundColor: colors["surface-color"],
        shadowColor: shadows.md?.color,
        shadowOpacity: 0.12,
        shadowRadius: 8,
      }}
    >
      <Text style={{ color: colors["text-color"], fontSize: fontSize.lg }}>
        My account
      </Text>
      <View style={{ flexDirection: "row", gap: space["2"] }}>
        {STATS.map((stat) => (
          <View
            key={stat.label}
            style={{
              flex: 1,
              alignItems: "center",
              paddingVertical: space["3"],
              borderRadius: radius.md,
              backgroundColor: colors["surface-muted-color"],
            }}
          >
            <Text style={{ color: colors[stat.color], fontSize: fontSize.xl }}>
              {stat.value}
            </Text>
            <Text style={{ color: colors["text-muted-color"] }}>
              {stat.label}
            </Text>
          </View>
        ))}
      </View>
      <Text
        style={{ color: colors["text-secondary-color"], fontSize: fontSize.sm }}
      >
        {mode} mode · radius.xl {radius.xl}px · space 4 = {space["4"]}px
      </Text>
    </View>
  );
}

```

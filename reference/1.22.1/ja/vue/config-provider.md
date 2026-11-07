# ConfigProvider

React 版のテーマと言語をアプリケーションに提供し、useConfig() から参照できるようにします。

Package: minerva-design@1.22.1

Renderer: vue

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.1",
  "sourceCommit": "3b95c464583d2e1bcf02999361aa6cf5481d519b",
  "sourceDigest": "sha256:080b482abbb8d2745bf31d68a17d7a1299cbb89f0e3f8c1a4d1d91bdeb04d1be",
  "referenceSourceDigest": "sha256:22ecb97acf4fac039a6d9a7e4a78b6bedc12dbbb8c1a14e3feeef3bcd47a7cef"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.1/types.json) or getType() from minerva-design/contracts.

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
  "specifier": "minerva-design/vue",
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
    "type": "ConfigProviderTheme",
    "required": false,
    "description": "Theme of the subtree (`v-model:theme`). Root default: `\"auto\"`",
    "typeText": "ConfigProviderTheme"
  },
  {
    "name": "palette",
    "type": "\"editorial\" | \"tech\" | \"graphite\" | \"cool\" | null",
    "required": false,
    "description": "Color palette (light / dark / system themes only); `null` for none",
    "typeText": "\"editorial\" | \"tech\" | \"graphite\" | \"cool\" | null"
  },
  {
    "name": "primaryColor",
    "type": "PrimaryColor | null",
    "required": false,
    "description": "Brand color: a CSS color for both modes (the dark-mode value is\nderived for contrast on dark surfaces) or a `{ light, dark }` pair.\nRecomputes every token derived from `primary-color` and wins over the\npalette's primary color; the theme mode stays explicit. Unset: the\nparent provider's; `null`: the theme's own. Invalid colors are ignored\nwith a development warning.",
    "typeText": "PrimaryColor | null"
  },
  {
    "name": "persist",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Root only: persist theme and palette in cookies.",
    "typeText": "boolean"
  },
  {
    "name": "locale",
    "type": "Locale",
    "required": false,
    "description": "Language of the built-in texts",
    "typeText": "Locale"
  },
  {
    "name": "preset",
    "type": "\"compact\" | \"editorial\" | \"minerva\" | \"touch\"",
    "required": false,
    "description": "Design preset (brings its palette unless `palette` is set)",
    "typeText": "\"compact\" | \"editorial\" | \"minerva\" | \"touch\""
  },
  {
    "name": "density",
    "type": "\"compact\" | \"standard\" | \"comfortable\"",
    "required": false,
    "typeText": "\"compact\" | \"standard\" | \"comfortable\""
  },
  {
    "name": "radius",
    "type": "\"medium\" | \"small\" | \"large\" | \"none\"",
    "required": false,
    "typeText": "\"medium\" | \"small\" | \"large\" | \"none\""
  },
  {
    "name": "shadow",
    "type": "\"subtle\" | \"none\" | \"standard\"",
    "required": false,
    "typeText": "\"subtle\" | \"none\" | \"standard\""
  },
  {
    "name": "fontScale",
    "type": "\"small\" | \"large\" | \"standard\"",
    "required": false,
    "typeText": "\"small\" | \"large\" | \"standard\""
  }
]
```

### events

```json
[
  {
    "name": "update:theme",
    "type": "[theme: ConfigProviderTheme]",
    "typeText": "[theme: ConfigProviderTheme]",
    "parameters": [
      {
        "name": "theme",
        "position": 0,
        "typeText": "ConfigProviderTheme",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "update:palette",
    "type": "[palette: \"editorial\" | \"tech\" | \"graphite\" | \"cool\" | null]",
    "typeText": "[palette: \"editorial\" | \"tech\" | \"graphite\" | \"cool\" | null]",
    "parameters": [
      {
        "name": "palette",
        "position": 0,
        "typeText": "\"editorial\" | \"tech\" | \"graphite\" | \"cool\" | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "themeChange",
    "type": "[theme: ConfigProviderTheme]",
    "typeText": "[theme: ConfigProviderTheme]",
    "parameters": [
      {
        "name": "theme",
        "position": 0,
        "typeText": "ConfigProviderTheme",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "paletteChange",
    "type": "[palette: \"editorial\" | \"tech\" | \"graphite\" | \"cool\" | null]",
    "typeText": "[palette: \"editorial\" | \"tech\" | \"graphite\" | \"cool\" | null]",
    "parameters": [
      {
        "name": "palette",
        "position": 0,
        "typeText": "\"editorial\" | \"tech\" | \"graphite\" | \"cool\" | null",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "type": "any",
    "typeText": "any"
  }
]
```

### bindings

```json
[
  {
    "prop": "theme",
    "event": "update:theme",
    "syntax": "v-model:theme"
  },
  {
    "prop": "palette",
    "event": "update:palette",
    "syntax": "v-model:palette"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: basic

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/config-provider/vue/basic.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import {
  ConfigProvider,
  Button,
  ThemeToggle,
  HStack,
} from "minerva-design/vue";
import type { ConfigProviderTheme } from "minerva-design/vue";
const theme = ref<ConfigProviderTheme>("light");
</script>
<template>
  <ConfigProvider v-model:theme="theme"
    ><HStack :gap="3"
      ><Button>Scoped action</Button><ThemeToggle /><output
        >Theme: {{ theme }}</output
      ></HStack
    ></ConfigProvider
  >
</template>

```

## Example: brand-color

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/config-provider/vue/brand-color.vue

```vue
<script setup lang="ts">
import {
  ConfigProvider,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  HStack,
  ResponsiveGrid,
} from "minerva-design/vue";

const scopes = [
  { title: 'primaryColor="#4f46e5"', primaryColor: "#4f46e5" },
  {
    title: "Indigo + dark (#7b85f2)",
    primaryColor: "#4f46e5",
    theme: "dark" as const,
  },
  {
    title: "{ light, dark } pair",
    primaryColor: { light: "#4f46e5", dark: "#a5b4fc" },
  },
  {
    title: 'Teal over palette="editorial"',
    primaryColor: "#0d9488",
    palette: "editorial" as const,
  },
];
</script>
<template>
  <ResponsiveGrid :columns="{ base: 1, sm: 2 }" :gap="3">
    <ConfigProvider
      v-for="scope in scopes"
      :key="scope.title"
      :primary-color="scope.primaryColor"
      :theme="scope.theme"
      :palette="scope.palette"
      ><Card variant="outline" padding="medium"
        ><CardHeader
          ><CardTitle>{{ scope.title }}</CardTitle></CardHeader
        ><CardContent
          ><HStack :gap="2"
            ><Button>Primary</Button
            ><Button variant="outline">Outline</Button></HStack
          ></CardContent
        ></Card
      ></ConfigProvider
    >
  </ResponsiveGrid>
</template>

```

## Example: locale

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/config-provider/vue/locale.vue

```vue
<script setup lang="ts">
import { ConfigProvider, Pagination, VStack } from "minerva-design/vue";
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><ConfigProvider :locale="{ language: 'en' }"
      ><Pagination :total="100" /></ConfigProvider
    ><ConfigProvider :locale="{ language: 'zh' }"
      ><Pagination :total="100" /></ConfigProvider
  ></VStack>
</template>

```

## Example: nested

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/config-provider/vue/nested.vue

```vue
<script setup lang="ts">
import { ConfigProvider, Button, Box, VStack } from "minerva-design/vue";
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><ConfigProvider theme="light"
      ><Box :p="4" bg="surface"
        ><Button>Light scope</Button
        ><ConfigProvider theme="dark"
          ><Box :p="4" :mt="3" bg="surface"
            ><Button>Nested dark scope</Button></Box
          ></ConfigProvider
        ></Box
      ></ConfigProvider
    ></VStack
  >
</template>

```

## Example: palette-design

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/config-provider/vue/palette-design.vue

```vue
<script setup lang="ts">
import {
  ConfigProvider,
  Button,
  Input,
  VStack,
  PaletteToggle,
} from "minerva-design/vue";
</script>
<template>
  <ConfigProvider palette="tech" density="compact" radius="small"
    ><VStack :gap="3"
      ><PaletteToggle /><Input
        aria-label="Compact input"
        placeholder="Compact input"
      /><Button>Configured appearance</Button></VStack
    ></ConfigProvider
  >
</template>

```

# ConfigProvider

React 版のテーマと言語をアプリケーションに提供し、useConfig() から参照できるようにします。

Package: minerva-design@1.20.2

Renderer: weapp

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.2",
  "sourceCommit": "8d5d0df3644b1fa1c267b3dd6809b0e7eb1ce75b",
  "sourceDigest": "sha256:2862a9e3a864c9423aed5d287db6fac7e8ddf58b9f5d144c61e7ff4a2630890e",
  "referenceSourceDigest": "sha256:b329acf9d5eb6cf4b4b42169ce925c67b033f581b616664bf07fc6d664de45f0"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.2/types.json) or getType() from minerva-design/contracts.

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

Native ancestor relations inherit mode/theme/palette/design/locale/dir and react to parent updates; explicit null palette clears inheritance. Core translator/custom messages, localized Table/calendar/pagination/time/theme/sidebar texts, subscription/getConfig/translate APIs, system theme and GitHub/custom/bilingual token resolution. Native scoped views replace DOM root attributes. Other component label props can be supplied with provider.translate; their remaining hard-coded convenience defaults are not all localized. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/config-provider/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "mode",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "theme",
    "typeText": "unknown",
    "required": false,
    "default": ""
  },
  {
    "name": "palette",
    "typeText": "unknown",
    "required": false,
    "default": ""
  },
  {
    "name": "design",
    "typeText": "unknown",
    "required": false
  },
  {
    "name": "locale",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "dir",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "defaultTheme",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "defaultPalette",
    "typeText": "unknown",
    "required": false,
    "default": ""
  },
  {
    "name": "disableStorage",
    "typeText": "boolean",
    "required": false,
    "default": true
  },
  {
    "name": "storageKey",
    "typeText": "string",
    "required": false,
    "default": "minerva-theme"
  },
  {
    "name": "primaryColor",
    "typeText": "unknown",
    "required": false,
    "default": ""
  }
]
```

### events

```json
[
  {
    "name": "themechange",
    "typeText": "{ theme: unknown; mode: string; resolvedMode?: string; palette?: string | null }",
    "description": "Theme request or OS theme update."
  },
  {
    "name": "palettechange",
    "typeText": "{ palette: string | null }",
    "description": "Requested palette."
  }
]
```

### slots

```json
[
  {
    "name": "default"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

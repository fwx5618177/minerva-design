# ConfigProvider

React 版のテーマと言語をアプリケーションに提供し、useConfig() から参照できるようにします。

Package: minerva-design@1.19.3

Renderer: uni

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "19932861fda2d088219d708a8ca132bea760a32b",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:ed8b6b1bf30e9055934099f84afd6b8369eee155b0404de5e8db004c3d91bce6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

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

Reactive nested locale/dir, inherited mode/palette/design, shared core catalog across editable/navigation/overlay/display controls, system appearance, isolated CSS tokens. Native view scoping replaces browser root attributes. Consumer slot content remains consumer-localized. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
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
    "name": "mode",
    "typeText": "ThemeMode | undefined",
    "required": false
  },
  {
    "name": "theme",
    "typeText": "NativeTheme | undefined",
    "required": false
  },
  {
    "name": "palette",
    "typeText": "\"editorial\" | \"tech\" | \"graphite\" | \"cool\" | null | undefined",
    "required": false
  },
  {
    "name": "primaryColor",
    "typeText": "PrimaryColor | null | undefined",
    "required": false
  },
  {
    "name": "design",
    "typeText": "DesignOptions | undefined",
    "required": false
  },
  {
    "name": "locale",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "dir",
    "typeText": "\"ltr\" | \"rtl\" | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "themeChange",
    "typeText": "any[]"
  }
]
```

### slots

```json
[
  {
    "name": "default",
    "typeText": "{ mode: \"light\" | \"dark\"; palette: \"editorial\" | \"tech\" | \"graphite\" | \"cool\" | null | undefined; }"
  }
]
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

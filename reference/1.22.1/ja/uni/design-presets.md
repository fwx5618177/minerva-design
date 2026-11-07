# デザインプリセット

いくつかのプロパティだけで、アプリ全体（またはその一部）の見た目を切り替えられます。プリセット（minerva、editorial、compact、touch）か、個別のデザイン軸（密度・角丸・影・文字サイズ）を指定します。SSR とネストしたスコープに対応しています。

Package: minerva-design@1.22.1

Renderer: uni

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

### デザイン軸

属性

デザイン軸はカラーモード（theme）やパレットとは独立しています。各軸は data 属性を通じてデザイントークンのブロックを選択し、コンポーネントはそのトークン（コントロールの高さ、余白、角丸、影、文字サイズ）を参照するため、ライブラリ全体が追従します。プリセットは 4 つの軸と既定のパレットを組み合わせた名前付きの設定で、明示した軸やパレットはプリセットより優先されます。

minerva：Minerva の既定の見た目。editorial：控えめで読みやすさ重視（editorial パレット、ゆったりした密度、小さな角丸、控えめな影、大きめの文字）。compact：情報量の多い画面向け（詰めた密度、小さな角丸、小さめの文字）。touch：一般向けモバイルアプリ（ゆったりした密度と最小 44px のタッチターゲット、大きな角丸）。

コントロールの高さと左右の余白（--control-height-*、--control-padding-x-*）、およびメニュー項目・選択肢・表のセルなど行の余白（--row-padding-y / --row-padding-x）、およびタッチターゲットの最小サイズ（--touch-target-min：compact は 24px、standard は 32px、comfortable は 44px）。

角丸のスケール：--radius-sm、--radius-md、--radius-lg、--radius-xl、--radius-2xl。

エレベーションの影 --shadow-sm から --shadow-xl。standard はテーマまたはパレットの影を維持します。

文字サイズのスケール：--font-size-* と基本／ゆったりした行の高さ。large は読み物向けです。

### アプリ全体

ルートの ConfigProvider にプロパティを設定します。標準以外の軸を data 属性として  に書き込み（プリセットのパレットは data-palette として）、アンマウント時に  を元に戻します。useConfig().design は解決済みの軸を返します。

### サーバーレンダリング

ルート provider はハイドレーション後に属性を適用します。最初の描画から正しい見た目にするには、サーバーセーフなエントリ minerva-design/theme-utils の designAttributes() で属性をサーバー HTML に出力するか、同じデザインを createThemeInitScript({ design }) に渡します（プリセットのパレットも既定のパレットとして使われます）。

### ネストしたスコープ

ネストした ConfigProvider は親のデザインを継承し、上書きをそのサブツリーにだけ適用します。display: contents のラッパーとスコープのポータルコンテナがすべてのデザイン属性を持つため、サブツリーから表示されるモーダル、ポップオーバー、トーストも同じ見た目になります。ネストしたプリセットは、指定していない軸をすべてリセットします。

### 独自の CSS でトークンを使う

デザイン軸はデザイントークンを変えるだけなので、独自のスタイルでも同じ変数を使えばコンポーネントと一貫性を保てます。コンポーネント単位の調整は各コンポーネントの CSS 変数で行えます（各コンポーネントページの「CSS 変数」セクションを参照）。

```tsx
import { ConfigProvider } from "minerva-design";
import "minerva-design/style.css";

export default function App() {
  // The whole app gets the editorial look: editorial palette, comfortable
  // density, small radius, subtle shadows and a reading-oriented type scale.
  return (
    <ConfigProvider preset="editorial" density="standard">
      {/* your app */}
    </ConfigProvider>
  );
}
```

```tsx
// app/layout.tsx (React Server Component, e.g. Next.js App Router)
import {
  createThemeInitScript,
  designAttributes,
} from "minerva-design/theme-utils";
import { Providers } from "./providers"; // "use client": <ConfigProvider preset="editorial">

const design = { preset: "editorial" } as const;
const themeScript = createThemeInitScript({ design });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // data-density / data-radius / data-shadow / data-font-scale in the HTML:
    // the first paint already has the right look
    <html lang="en" suppressHydrationWarning {...designAttributes(design)}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

```tsx
<ConfigProvider preset="compact">
  {/* dense admin screens */}
  <ConfigProvider preset="editorial">
    {/* an article preview: editorial look, portals (Modal, Popover...) included */}
  </ConfigProvider>
  <ConfigProvider radius="none">
    {/* inherits compact, only the radius changes */}
  </ConfigProvider>
</ConfigProvider>
```

```css
/* The axes only set design tokens, so your own CSS can use them too */
.panel {
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  padding: var(--row-padding-y) var(--row-padding-x);
  font-size: var(--font-size-md);
}

/* ...or react to the active design */
[data-density="compact"] .panel {
  gap: var(--space-1);
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

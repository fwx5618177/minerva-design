# テーマユーティリティ

ConfigProvider の外でテーマを解決・適用・確認するための関数とテーマオブジェクト。

Package: minerva-design@1.20.6

Renderer: wc

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.6",
  "sourceCommit": "99b9ad1465abc6ea97d2a8c008f3026645edb983",
  "sourceDigest": "sha256:e0f51a94cc5272baf2775327d83ba025ee09228cfc17f4d529188b1653c78892",
  "referenceSourceDigest": "sha256:d66e13eea732bfeb1a6aaa7461bf92ea0d54944072977e762c106b87e877d062"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.6/types.json) or getType() from minerva-design/contracts.

## Documentation

### リファレンス

ConfigProvider と useAutoTheme はこれらのヘルパーの上に構築されています。React を使わずにテーマを適用したり、1 つの要素だけにテーマを当てたり、トークンの値を読み取ったりするのに使えます。

名前

シグネチャ

テーマを解決し、CSS 変数として  に書き込みます（グローバル）。前のテーマにあって新しいテーマで定義されていない変数は削除されます。

テーマオブジェクトの各トークンを -- として指定のスタイル宣言（例：element.style）に書き込み、古い変数を削除します。1 つの要素にテーマを当てるのに使います。

受け付け可能な任意のテーマ値をテーマオブジェクトに変換します。"auto" と { light, dark } のペアは systemTheme を使い、名前は themes から検索し、オブジェクトはそのまま返します。未知の名前では例外を投げます。副作用なし。

prefers-color-scheme から OS の配色を返します。matchMedia が使えない場合（SSR、テスト）は "light" を返します。

型ガード：テーマオブジェクトの { light, dark } ペアなら true。

theme プロパティで指定できる名前をキーにした内蔵テーマ。

内蔵テーマオブジェクト（個別にもエクスポート）。展開してカスタムテーマを作れます。

テーマをグローバルに適用する

applyThemeStyles は ConfigProvider が呼び出している関数です。React 以外のコードや、初回レンダリング前にテーマを適用して既定色のちらつきを防ぐのに使えます。

1 つの要素にテーマを当てる

generateCSSVariables は任意の CSSStyleDeclaration を受け付けるため、トークンを要素に限定できます。子孫要素はそれを継承します。

テーマを解決する

resolveTheme、isBilingualTheme、getSystemTheme には副作用がありません。canvas やチャートのスタイル付けなど、トークン値の計算に使えます。

```tsx
import { applyThemeStyles, themes } from "minerva-design";

// Without React (or before the first render): write a theme on <html>
applyThemeStyles("dark");
applyThemeStyles({ ...themes.light, "primary-color": "#7c3aed" });

// "auto" and { light, dark } pairs need the scheme to resolve against
// (defaults to the current prefers-color-scheme)
applyThemeStyles("auto", "dark");
```

```tsx
import { generateCSSVariables, resolveTheme } from "minerva-design";

// Theme a single element (e.g. an embedded widget) instead of the page
const widget = document.querySelector<HTMLElement>("#widget")!;
generateCSSVariables(widget.style, resolveTheme("github-dark"));
```

```tsx
import {
  getSystemTheme,
  isBilingualTheme,
  resolveTheme,
  themes,
} from "minerva-design";

getSystemTheme(); // "light" | "dark" ("light" during SSR)

const pair = { light: themes.light, dark: themes.dark };
isBilingualTheme(pair); // true
isBilingualTheme("dark"); // false

resolveTheme("auto", "dark") === themes.dark; // true
resolveTheme("github-dark")["background-color"]; // "#0d1117"
resolveTheme(pair, "light") === themes.light; // true
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

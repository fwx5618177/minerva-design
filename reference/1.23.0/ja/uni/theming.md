# テーマ

内蔵のライト／ダークテーマ、CSS 変数としてのデザイントークン、独自テーマの作り方。

Package: minerva-design@1.23.0

Renderer: uni

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "413e3d54e2177f8469c443a6547c4472e608839c",
  "sourceDigest": "sha256:8c8e874e213d698b4d05cabed92eed392c90c5b0fa91c66def67eab19184e86c",
  "referenceSourceDigest": "sha256:e694adbf6015cdc21809df819193e0a84c030845fb2910749dbd1c4c15ccca99"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

## Documentation

### 内蔵テーマ

React 版には light、dark、github-dark の 3 つのテーマが含まれます。ConfigProvider の theme プロパティで選ぶか、既定の "auto" のままにすると OS の配色設定に追従し、変更時もリアルタイムに更新されます。

### 試してみる

このスイッチャーはドキュメントサイト全体のテーマを切り替えます。下のコンポーネントもすべてのページも CSS 変数を読むだけなので、即座に更新されます。

適用中のテーマ：

コンポーネントは再レンダリングせずにテーマが切り替わります。変わるのは  の CSS 変数だけです。

### 指定できるテーマの値

ConfigProvider の theme プロパティ（および useAutoTheme / applyThemeStyles）は次の値を受け付けます：

値

既定値。prefers-color-scheme に応じて light か dark を使い、変更にも追従します。

内蔵のライトテーマ。

内蔵のダークテーマ。

GitHub のダークパレットをベースにしたダークテーマ。

完全なテーマオブジェクト（すべての基本トークンと、任意のセマンティック／コンポーネントトークン）。通常は内蔵テーマを展開して作ります。

2 つのテーマオブジェクト。システムの配色に合う方が適用され、自動で切り替わります。

### 仕組み

テーマはトークン名から CSS 値へのフラットなマップです。ConfigProvider は各エントリーを -- という名前の CSS カスタムプロパティとして  要素のインラインスタイルに書き込みます：

コンポーネントのスタイルはこれらの変数だけを参照する（例：background: var(--primary-color)）ため、テーマを切り替えても React コンポーネントは再レンダリングされません。スタイルシートは :root にもすべてのトークンを宣言しているので、ConfigProvider の適用前（または未使用時）でもライトテーマの値で表示されます。

### カスタムテーマ

内蔵テーマを展開して必要なトークンを上書きし、ConfigProvider に渡します。{ light, dark } のペアを渡すとシステムの配色への追従を維持できます。ホバー、淡い背景、フォーカスリングなどのセマンティックトークンは基本トークンから派生するため、通常は primary-color の上書きだけで十分です。

### color と variant プロパティ

すべてのコンポーネントは同じ color プロパティでセマンティックカラーを選びます。型は共通の ColorScheme（primary、neutral、success、warning、danger、info）で、一部のコンポーネントはドキュメントに記載されたサブセットのみを受け付けます。値は常にテーマのロールであり、生の CSS カラーではありません。色を変えるにはテーマトークンかコンポーネントの CSS カスタムプロパティを変更してください。

variant は見た目のスタイルだけを選び、どのコンポーネントでも同じ意味を持ちます：solid（色で塗りつぶし、反転テキスト）、subtle（淡い色付き背景）、outline（透明な背景に色付きの枠線とテキスト）、ghost（透明で枠線なし）。必要に応じてコンポーネント固有のスタイルもあります（Tabs の line / enclosed、Input の filled など）。

### CSS でトークンを上書きする

通常のスタイルシートからトークンを設定することもできます。それぞれの値がどこで定義されているかに注意してください：

ConfigProvider は現在のテーマを  のインラインスタイルとして書き込み、これはスタイルシートの :root ルールより優先されます。テーマが設定するトークンをグローバルに上書きするには !important が必要です。コンポーネントトークン（btn-*、card-*、avatar-*）は内蔵テーマでは設定されないため、通常どおり定義できます。

### トークン一覧

すべてのトークンは var(--) で利用できます。スウォッチは現在のテーマの値を表示します。

CSS 変数

基本トークン

すべてのテーマオブジェクトで必須（ThemeProps）。

セマンティックトークン

任意（SemanticThemeProps）。既定値は color-mix() で基本トークンから派生し、内蔵のダークテーマは一部を明示的に設定しています。

ロールトークン

各ロールカラーから hover、active、subtle（色付き背景）、border、text のトークンが派生します（例：--primary-color-hover、--danger-color-subtle）。

ロール

コンポーネントトークン

任意のコンポーネント別上書き（ComponentThemeProps）。未設定の場合、コンポーネントはセマンティックトークンにフォールバックします。

```tsx
import { ConfigProvider } from "minerva-design";
import "minerva-design/style.css";

export default function App() {
  // "auto" (default) follows the operating system's color scheme
  return <ConfigProvider theme="github-dark">{/* your app */}</ConfigProvider>;
}
```

```html
<!-- what ConfigProvider writes on the document root -->
<html style="--primary-color: #58a6ff; --background-color: #0d1117; ...">
```

```tsx
import { ConfigProvider, themes, type ComponentTheme } from "minerva-design";

// Start from a built-in theme and override the tokens you need.
// Derived tokens (hover, subtle, focus ring...) follow automatically.
const brandLight: ComponentTheme = {
  ...themes.light,
  "primary-color": "#7c3aed",
  "link-color": "#6d28d9",
};

const brandDark: ComponentTheme = {
  ...themes.dark,
  "primary-color": "#a78bfa",
  "focus-ring-color": "rgba(167, 139, 250, 0.55)",
};

export default function App() {
  return (
    // a single object: always this theme
    // <ConfigProvider theme={brandLight}>
    // a { light, dark } pair: follows the system color scheme
    <ConfigProvider theme={{ light: brandLight, dark: brandDark }}>
      {/* your app */}
    </ConfigProvider>
  );
}
```

```tsx
import { Button, Badge, Alert, Tooltip, toast } from "minerva-design";
import type { ColorScheme } from "minerva-design";
// "primary" | "neutral" | "success" | "warning" | "danger" | "info"

<Button color="danger" variant="outline">Delete</Button>
<Badge color="success" variant="subtle" content="Live" />
<Alert color="warning" variant="solid" title="Quota almost reached" />
<Tooltip color="info" content="Synced"><Button>Status</Button></Tooltip>
toast.success("Saved"); // toast({ color: "success", title: "Saved" })
```

```scss
/* Component-level tokens are not set by the built-in themes,
   so a plain stylesheet can define them */
:root {
  --card-bg-color: #fdf6e3;
  --btn-bg-color-hover: #1e40af;
}

/* Theme tokens are written as inline styles on <html> by ConfigProvider,
   which beat :root rules: use !important to force a value globally... */
:root {
  --radius-md: 10px !important;
}

/* ...or override them for one part of the page */
.checkout {
  --primary-color: #16a34a;
  /* derived tokens are computed on :root: redeclare the ones you need */
  --primary-color-hover: color-mix(in srgb, var(--primary-color) 85%, var(--foreground-color));
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

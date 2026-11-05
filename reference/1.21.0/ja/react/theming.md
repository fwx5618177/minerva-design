# テーマ

内蔵のライト／ダークテーマ、CSS 変数としてのデザイントークン、独自テーマの作り方。

Package: minerva-design@1.21.0

Renderer: react

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.0",
  "sourceCommit": "3e3fd42fed9bd7320e0095e9008ad52d1dd44024",
  "sourceDigest": "sha256:ce2a20ef1952cc69de92d0733342905020d5135facebdf802e90ddda090ce31c",
  "referenceSourceDigest": "sha256:bdc377ab7ed5f94120cdda24084c48e40370128fac18b85708e5f8b5fbaf5e95"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.0/types.json) or getType() from minerva-design/contracts.

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

## Example: 部分的なテーマ

トークンは普通の CSS 変数です。ラッパー要素で上書きすれば、ページの一部だけテーマを変えられます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/theming/demos/scoped-theme.tsx

```tsx
import type React from "react";
import { useState } from "react";
import { Button, Checkbox, HStack, Switch, Tag, VStack } from "minerva-design";

const BRANDS = {
  violet: "#7c3aed",
  teal: "#0d9488",
  orange: "#c2410c",
};

type Brand = keyof typeof BRANDS;

// Theme tokens are plain CSS custom properties, so they can be overridden
// for a single subtree. Derived tokens (hover, subtle, focus ring...) are
// computed on :root, so redeclare them to make them follow the new value.
const brandStyle = (primary: string) =>
  ({
    "--primary-color": primary,
    "--primary-color-hover":
      "color-mix(in srgb, var(--primary-color) 85%, var(--foreground-color))",
    "--primary-color-active":
      "color-mix(in srgb, var(--primary-color) 72%, var(--foreground-color))",
    "--primary-color-subtle":
      "color-mix(in srgb, var(--primary-color) 12%, var(--surface-color))",
    "--primary-color-text":
      "color-mix(in srgb, var(--primary-color) 80%, var(--foreground-color))",
    "--focus-ring-color":
      "color-mix(in srgb, var(--primary-color) 45%, transparent)",
    padding: 16,
    borderRadius: 8,
    border: "1px dashed var(--border-color)",
  }) as React.CSSProperties;

export default function ScopedThemeDemo() {
  const [brand, setBrand] = useState<Brand>("violet");

  return (
    <VStack gap={4} align="start">
      <div
        role="group"
        aria-label="Brand color"
        style={{ display: "flex", gap: 8 }}
      >
        {(Object.keys(BRANDS) as Brand[]).map((name) => (
          <Button
            key={name}
            size="small"
            color={name === brand ? "primary" : "neutral"}
            variant={name === brand ? "solid" : "outline"}
            aria-pressed={name === brand}
            onClick={() => setBrand(name)}
          >
            {name}
          </Button>
        ))}
      </div>

      <div style={brandStyle(BRANDS[brand])}>
        <HStack gap={4} wrap>
          <Button color="primary">Scoped primary</Button>
          <Switch label="Switch" defaultChecked />
          <Checkbox label="Checkbox" defaultChecked />
          <Tag color="primary">Tag</Tag>
        </HStack>
      </div>
    </VStack>
  );
}

```

# インストール

React プロジェクトに Minerva を追加し、スタイルシートを読み込み、必要に応じて Web Components を登録します。

Package: minerva-design@1.20.6

Renderer: uni

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

### 動作要件

React コンポーネントには React と React DOM 19 が必要です（minerva-design の任意の peer 依存。Web Components に React は不要）。React 18 はサポートしていません。コンポーネントは ref を通常のプロパティとして受け取るなど React 19 の API に依存しており、StrictMode と React DOM 19 のサーバーレンダラーでテストされています。

ES モジュールと CSS のインポートを扱えるバンドラー（Vite、webpack、Rspack、Next.js など）。CommonJS ビルドも同梱しています。

モダンなエバーグリーンブラウザ：テーマトークンは CSS カスタムプロパティと color-mix() を使用します。

### React コンポーネントのインストール

お使いのパッケージマネージャーで minerva-design をインストールします。React コンポーネント、Web Components、デザイントークンが 1 つのパッケージに入っています。react と react-dom が未導入なら一緒に追加してください。

react と react-dom は任意の peer 依存（^19）なので、アプリ内の React は 1 つに保たれます。実行時の依存は @floating-ui/dom（位置決め）、DOMPurify（HtmlPreview）、jsonc-parser（JsonField）、Lit（Web Components のエントリーでのみ使用。React アプリにはバンドルされません）だけで、アイコン・クラス名・i18n のライブラリはインストールされません。アイコンはインライン SVG です。

### グローバルスタイルシートを一度だけ読み込む

すべてのコンポーネントのスタイルとデフォルトのテーマトークンは、1 つのグローバルスタイルシート minerva-design/style.css にまとめられています。アプリのエントリで、独自の CSS より前に一度だけ読み込んでください。以降、コンポーネントのファイルではコンポーネントだけをインポートし、CSS はインポートしません。

minerva-design/style.css がないとコンポーネントはスタイルなしで表示されます。エントリで一度だけ読み込んでください。コンポーネントのファイルから再度読み込んでも問題はありませんが不要です。

#### React + Vite：src/main.tsx

Vite は JavaScript からインポートされた CSS をバンドルします。開発時は開発サーバーがスタイルを注入し、vite build ではハッシュ付きの 1 つの .css ファイルとして出力され index.html から読み込まれます。プラグインや追加の設定は不要です。

#### Next.js（App Router）：app/layout.tsx

ルートレイアウトは Server Component で、グローバル CSS をインポートできます。これですべてのルートにスタイルが適用されます。

#### Web Components：src/main.ts

カスタム要素は shadow root 内に自身のスタイルを持ち、tokens.css が共通のデザイントークンを提供します。Vue、Angular、Svelte、Solid、素の HTML アプリのエントリで、どちらも一度だけ読み込んでください。同じページで React コンポーネントも使う場合、style.css にトークンが含まれています。

#### コンポーネントのファイルでは

コンポーネントのページにはコンポーネントのインポートだけが表示されます。どれも上で読み込んだグローバルスタイルシートを前提としています：

オプション：コンポーネントごとのスタイルシート

一部のコンポーネントしか使わない場合は、style.css の代わりにデザイントークンを一度読み込み、使うコンポーネントごとのスタイルシートを読み込めます。各ファイルにはそのコンポーネントと、内部で描画するコンポーネントのスタイルが含まれます（例：confirm.css には Button と Modal のスタイルも含まれます）。ファイル名はコンポーネントフォルダー名の kebab-case です（tag-input.css、time-picker.css など）。JavaScript もコンポーネント単位で tree-shaking されます。各モジュールは個別に公開され、CSS 以外に副作用はありません。

同じ場所に任意の Sass ファイルが公開されています。minerva-design/prose.scss は長文タイポグラフィ用の mixin を含み、独自の Sass から @use で読み込みます。

### 任意のエントリとピア依存

Monaco ベースのコードエディターは別エントリ minerva-design/monaco として公開されているため、メインエントリが Monaco を読み込むことはありません。ピア依存の @monaco-editor/react と monaco-editor は任意で、そのエントリをインポートする場合にのみインストールしてください。

Next.js などの React Server Components フレームワークを使っていますか？どのエントリがクライアント境界かは Server Components のページを参照してください。

### 最初のコンポーネント

アプリを ConfigProvider で囲み、コンポーネントを使い始めましょう：

ConfigProvider はコンポーネントの描画に必須ではありませんが、テーマの適用（既定ではシステムの配色に追従）、React 版内蔵テキストの言語設定、useConfig() の提供を行います。アプリのルートに 1 つ配置してください。

### Web Components（任意）

同じパッケージの minerva-design/web-components で、全コンポーネントをフレームワーク非依存のカスタム要素（Lit）として提供します。デザイン、トークン、キーボード操作は React 版と同じで、素の HTML、Vue、Angular、Svelte などどんな環境でも使えます。Web Components のエントリーは ESM のみで React は不要です。minerva-design をインストールするだけで使えます：

パッケージを一度インポートするとすべての要素が登録されます。要素ごとのエントリーをインポートすれば、使う要素だけがバンドルされます。デザイントークンも一度だけ読み込みます：

ビルドなしで使う場合は、トークンと自己完結型のモジュールバンドル（全要素、Lit、Minerva のコアを含む）を CDN から読み込みます：

すべての要素は HTMLElementTagNameMap に型付けされています。フレームワークのテンプレートでは、React 19、Vue（Volar）、Svelte、Solid 向けに生成された型定義を一度参照します：

Web Components：はじめに、イベント、型定義、フレームワーク別ガイド

### TypeScript

minerva-design は型定義を同梱しているため、@types パッケージは不要です。Props 型（ButtonProps、TagProps など）とテーマ型（Theme、ComponentTheme、ThemeName など）はパッケージのルートからエクスポートされています：

### 次のステップ

設計原則と、すべてのコンポーネントに共通する規約。

内蔵テーマ、デザイントークン、カスタムテーマ。

最初のコンポーネントページとライブサンプルから始めましょう。

### 既存アプリの移行

パッケージ名の変更だけでは旧 API は移行できません。エクスポートとプロパティを確認してください。size は small / medium / large、colorScheme は color、isLoading は loading、leftIcon は startIcon を使います。Alert は color を使用します。toast.error や旧コンポーネントは置き換えが必要です。画面ごとに移行し、型チェックと操作テストを実行してください。

```tsx
// src/main.tsx — the only place that imports Minerva's CSS
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "minerva-design/style.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

```tsx
// app/layout.tsx — global CSS belongs in the root layout
import type { ReactNode } from "react";
import "minerva-design/style.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

```ts
// src/main.ts — register the elements and load the design tokens, once
import "minerva-design/web-components";
import "minerva-design/tokens.css";
```

```tsx
// any component file: import the component only, no CSS
import { Tag } from "minerva-design";
```

```tsx
// src/main.tsx — optional, instead of "minerva-design/style.css":
import "minerva-design/styles/tokens.css"; // design tokens, once
import "minerva-design/styles/button.css";
import "minerva-design/styles/input.css";
import "minerva-design/styles/modal.css";
```

```scss
// optional, in your own .scss: long-form typography mixins
@use "minerva-design/prose.scss" as prose;
```

```bash
pnpm add @monaco-editor/react monaco-editor
```

```tsx
import { MonacoCodeEditor } from "minerva-design/monaco";
```

```tsx
import { createRoot } from "react-dom/client";
import { Button, ConfigProvider, ToastProvider, toast } from "minerva-design";
import "minerva-design/style.css";

function App() {
  return (
    // theme: "auto" (default) | "light" | "dark" | "github-dark" | custom
    <ConfigProvider theme="auto" locale={{ language: "en" }}>
      {/* renders toast() calls inside the theme scope */}
      <ToastProvider>
        <Button color="primary" onClick={() => toast.success("Hello!")}>
          Say hello
        </Button>
      </ToastProvider>
    </ConfigProvider>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
```

```bash
# the same package: the Web Components need no React
pnpm add minerva-design
```

```ts
// every element at once...
import "minerva-design/web-components";
// ...or only the elements you use (each entry registers one element and its parts)
import "minerva-design/web-components/select";

// design tokens, once (already included in minerva-design/style.css)
import "minerva-design/tokens.css";
```

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/minerva-design@1.20.6/dist/core/tokens.css" />
<script type="module" src="https://cdn.jsdelivr.net/npm/minerva-design@1.20.6/dist/web-components/cdn/minerva.js"></script>
```

```ts
// React 19 JSX (global.d.ts)
/// <reference types="minerva-design/web-components/react" />
// Svelte: ".../svelte", Solid: ".../solid"
// Vue (Volar): add "minerva-design/web-components/vue" to compilerOptions.types
```

```tsx
import { themes } from "minerva-design";
import type { ButtonProps, ComponentTheme } from "minerva-design";

// every component exports its props type
const saveButton: Partial<ButtonProps> = { color: "success", size: "large" };

// themes are typed too: missing or misspelled tokens are compile errors
const brand: ComponentTheme = { ...themes.light, "primary-color": "#7c3aed" };
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

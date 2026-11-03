# Server Components

React Server Components で Minerva を使う：どのエントリがクライアント境界か、サーバーで何を実行できるか、CSS をどこでインポートするか。

Package: minerva-design@1.20.0

Renderer: taro

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.0",
  "sourceCommit": "09013eec9b429ff5907c596bcb5edf1281361bc0",
  "sourceDigest": "sha256:c9ed2b706b61413d29e506a3f04f3d35c044a4b57ec0e284935054f9e1898c7e",
  "referenceSourceDigest": "sha256:b368e6fa7c621870e513621690cab70035abb6a658e8344f3df3b0cb0be55a18"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.0/types.json) or getType() from minerva-design/contracts.

## Documentation

### エントリと "use client" 宣言

minerva-design は複数のエントリとして公開されています。コンポーネントを含むエントリは "use client" ディレクティブで始まりますが、テーマヘルパーのエントリには付いていないため、Server Component 内で実行できます。

エントリ

"use client"

あり

なし

すべてのコンポーネント、プロバイダー、フック、ユーティリティ。

Monaco ベースのコードエディター（任意のピア依存：@monaco-editor/react と monaco-editor）。

GPU チャート（WebGPU、WebGL2、WebGL、Canvas2D）：Chart、LineChart、BarChart、TradingChart、Scatter3DChart など 40 種類以上のチャート。

フレームワーク非依存のチャートエンジン：createChart と formatCompact。サーバーで安全にインポートでき、チャートはブラウザーで作成されます。

アイコンセット：Icon、IconCanvas、DynamicIcon、createIcon と、アイコンごとのコンポーネント（SearchIcon…）。SVG アイコンはクライアントコンポーネント内でサーバーレンダリングされます。

フレームワーク非依存のアイコンセット：アイコンデータ、toSvg、drawIcon、GPU アイコンキャンバス。サーバーで安全にインポートでき（toSvg はサーバーで動作）、キャンバスはブラウザーで作成されます。

サーバーで安全に使えるテーマヘルパー：THEME_INIT_SCRIPT、Cookie の解析とシリアライズ、パレット名。

サーバーで安全に使えるユーティリティ：cn、themes、light、dark、githubDark、palettes、resolveTheme、generateCSSVariables、applyThemeStyles、getSystemTheme、isBilingualTheme、matchesShortcut、normalizeShortcuts、computeFixedColumnLayout。

### 一部のエントリがクライアント境界である理由

Minerva のすべてのコンポーネントは state、エフェクト、コンテキスト、ポータルのいずれかを使うため、ブラウザーで実行する必要があります。メインエントリには "use client" が付いているので、それをインポートした Server Component が受け取るのはコンポーネントのコードではなくクライアント参照、つまりバンドラーがクライアントバンドルに解決するプレースホルダーです。それでも SSR 中にコンポーネントはサーバーで HTML にレンダリングされ、ブラウザーでハイドレートされます。

クライアント参照はサーバー上で呼び出せる関数ではありません。レンダリングするだけのコンポーネントには問題ありませんが、クライアントエントリの通常の関数は Server Component では実行できないということです。そのため、テーマ Cookie の解析や初期化スクリプトの生成など、サーバーで必要な関数は宣言のない別のエントリ minerva-design/theme-utils にあります。

### Server Component からコンポーネントをレンダリングする

Server Component、レイアウト、ページで minerva-design からコンポーネントを直接インポートできます。エントリ自体がクライアント境界なので、ラッパーは不要です。

Server Component からクライアントコンポーネントに渡す props はシリアライズ可能でなければなりません：文字列、数値、真偽値、プレーンオブジェクト、配列、JSX。関数はシリアライズできないので、onClick などのイベントハンドラー、render props、コールバックには独自の小さなクライアントコンポーネントが必要です：

### サーバーで関数を呼び出す

minerva-design/theme-utils と minerva-design/utils のヘルパーは、レイアウト、ルートハンドラー、ミドルウェア、エッジ関数など、サーバー上で自由に呼び出せます。メインエントリの関数（toast.success、Confirm、各フックなど）を Server Component で呼び出したり、そのデータ（themes、palettes など）を読んだりしないでください。そこではクライアント参照にすぎません。通常の関数とデータは minerva-design/utils からインポートしてください。

命令的な API はクライアントコンポーネントの SSR 中でも安全です。document がない場合は何もせず、Confirm のような Promise ベースのダイアログはサーバーでは false に解決されます。ブラウザーでのみ実行されるイベントハンドラーやエフェクトから呼び出してください。

### コンテンツセキュリティポリシー（CSP）

厳格な Content-Security-Policy（'unsafe-inline' なし）はインラインのテーマ初期化スクリプトをブロックします。 要素にリクエストの nonce を付けるか、ハッシュで許可してください。THEME_INIT_SCRIPT_HASH は THEME_INIT_SCRIPT の 'sha256-…' ソースで、cspHash() は createThemeInitScript() で作ったスクリプトのハッシュを計算します。

### CSS をインポートする場所

minerva-design/style.css は一度だけインポートします。Next.js App Router では、グローバル CSS はルートレイアウトに置きます。ルートレイアウトは Server Component で、CSS をインポートできます。その他の構成では、クライアントのエントリファイルでインポートしてください。prose.scss は任意の追加スタイルで、独自の Sass から同じ方法で読み込みます。

### 次のステップ

テーマのちらつきのないサーバーレンダリング：THEME_INIT_SCRIPT とテーマ Cookie。

パッケージ、ピア依存、スタイルシート。

```tsx
// dist/index.js and dist/monaco.js start with
"use client";

// dist/theme-utils.js and dist/utils-entry.js do not: they hold plain
// functions and data, safe to run on the server
```

```tsx
// app/page.tsx: a Server Component (no "use client")
import { Card, Tag } from "minerva-design";
import { SaveButton } from "./save-button";

export default async function Page() {
  const posts = await getPosts(); // server-only data access

  return posts.map((post) => (
    // serializable props only: strings, numbers, booleans, JSX children...
    <Card key={post.id} padding="medium">
      <Tag color="info">{post.category}</Tag>
      <h2>{post.title}</h2>
      <SaveButton id={post.id} />
    </Card>
  ));
}
```

```tsx
// app/save-button.tsx
"use client";

import { Button, toast } from "minerva-design";

// Event handlers and imperative APIs live in a client component
export function SaveButton({ id }: { id: string }) {
  return (
    <Button
      color="primary"
      onClick={async () => {
        await fetch(`/api/save/${id}`, { method: "POST" });
        toast.success("Saved"); // shown by the ToastProvider in your layout
      }}
    >
      Save
    </Button>
  );
}
```

```tsx
// app/layout.tsx: a Server Component
import { cookies } from "next/headers";
import {
  THEME_COOKIE_NAME,
  THEME_INIT_SCRIPT,
  parseThemeCookie,
} from "minerva-design/theme-utils"; // server-safe: runs here
import { ThemeProvider } from "minerva-design"; // rendered, not called

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const theme = parseThemeCookie((await cookies()).get(THEME_COOKIE_NAME)?.value);
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script suppressHydrationWarning dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>
        <ThemeProvider defaultTheme={theme}>{children}</ThemeProvider>
      </body>
    </html>
  );
}

// Plain functions and data (cn, themes, palettes, resolveTheme...):
// import them from the server-safe utils entry, not from the main entry
import { cn, themes } from "minerva-design/utils";

// Not on the server: main-entry functions are client references there
// import { toast } from "minerva-design";
// toast.success("Hi"); // call it from a client component instead
```

```tsx
// Strict CSP, option 1: a per-request nonce on the inline script
<script
  nonce={nonce}
  suppressHydrationWarning
  dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
/>
// Content-Security-Policy: script-src 'self' 'nonce-<nonce>'

// Option 2: allow the script by its hash (static HTML, CDN caching)
import {
  THEME_INIT_SCRIPT_HASH,
  createThemeInitScript,
  cspHash,
} from "minerva-design/theme-utils";

const csp = `script-src 'self' ${THEME_INIT_SCRIPT_HASH}`;
// a customised script has its own hash:
const script = createThemeInitScript({ defaultTheme: "dark" });
const customCsp = `script-src 'self' ${cspHash(script)}`;
```

```tsx
// Next.js App Router: import global CSS once, in the root layout
// app/layout.tsx
import "minerva-design/style.css";

// Vite / other setups: import it in the client entry file (main.tsx)
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

# テーマとパレット

ライト / ダーク / システムのモードと配色パレットという 2 つの独立した軸。Cookie による永続化と、ちらつきのないサーバーレンダリングに対応します。

Package: minerva-design@1.22.0

Renderer: react

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.0",
  "sourceCommit": "330c90a7382a7141543dcdad732a4da31d58a37e",
  "sourceDigest": "sha256:cbdfa6292d29dec33adda7a3e9cf0e027da50858956b8d08e3f7f3ed59c8d78a",
  "referenceSourceDigest": "sha256:e3be8c06635194769da4944bbccaf8bcffec3fe4bddbd369b74caf5e4553345b"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.0/types.json) or getType() from minerva-design/contracts.

## Documentation

### 2 つの軸：モードとパレット

モードはライトかダークかを決め、パレットは見た目（色、サーフェス、影、フォントスタック）を決めます。どのパレットもどのモードと組み合わせられるため、4 つのパレットで 8 つの完全なテーマになります。パレットを指定しない場合は Minerva のデフォルトの外観です。

値

モード：常にライト、または常にダーク。

モード：prefers-color-scheme に従い、OS の設定が変わるとすぐに更新されます。ConfigProvider は互換性のための別名 "auto" も受け付けます。

パレット：温かみのある紙のような背景、インクブルーのプライマリと錆色のアクセント。コンテンツ中心のページ向け。

パレット：すっきりしたニュートラルなサーフェスに鮮やかなブルーのプライマリ。ダッシュボードや開発者ツール向け。

パレット：モノクロのグレーに控えめなアクセント。情報密度の高いプロ向けインターフェース向け。

パレット：寒色系のブルーグレーのサーフェスにティールブルーのプライマリ。落ち着いた軽やかな印象。

パレットなし：Minerva のデフォルトの外観（組み込みのライト / ダークテーマをインライン変数として書き込みます）。

### ThemeProvider と useTheme

ThemeProvider は 2 つの軸を扱う最も簡単な方法です。指定したモードとパレットで ConfigProvider をレンダリングし、変更を Cookie に保存し、useTheme() ですべてを公開します。ThemeToggle と PaletteToggle は最も近いプロバイダーに接続された既製の切り替えコンポーネントです。

ThemeProvider は ConfigProvider のプリセットなので、両者は同じ状態を共有します。github-dark などの組み込みテーマ、カスタムテーマオブジェクト、制御された theme プロパティも必要な場合は ConfigProvider を直接使ってください：

useTheme() は選択されたモード、実際に適用されているモード、パレット、およびそれぞれのセッターを返します。ThemeProvider と ConfigProvider のどちらの配下でも動作し、どちらの外でも例外を投げます。

### テーマの適用方法

プロバイダーは解決済みのモードを常に  の data-theme と color-scheme に書き込みます。パレットがあり、テーマが light、dark、system のいずれかの場合は data-palette も設定し、トークンは style.css に含まれるパレットブロックから供給され、インラインのテーマ変数は削除されます。パレットがない場合、または github-dark やカスタムテーマオブジェクトの場合は、従来どおりテーマのトークンが  にインライン CSS 変数として書き込まれます。

同じトークンを複数のソースが定義している場合、最も詳細度の高いものが優先されます：

 のインライン CSS 変数（カスタムテーマオブジェクト、github-dark、またはパレットなし）は、スタイルシートのあらゆる宣言より優先されます。

パレットブロック（[data-palette][data-theme]）は :root で宣言されたデフォルトより優先されます。

ほかに一致するものがない場合は、color-mix() で派生するトークンを含む style.css の :root のデフォルトが適用されます。

github-dark とカスタムテーマオブジェクトでは palette プロパティは無視されます。これらのテーマは独自のトークンを持っています。

 と Cookie に書き込むのは最も外側の Provider だけです。入れ子の ThemeProvider や ConfigProvider は親のモードとパレットを継承し、自身の defaultTheme / defaultPalette（または theme / palette）をサブツリーとそこから開くオーバーレイにだけ適用し、 には触れません（下の「スコープ付きパレット」を参照）。

### Cookie による永続化

ThemeProvider（および persist を指定した ConfigProvider）は選択内容を 2 つの Cookie に書き込みます。theme（"light"、"dark"、"system"）と palette（パレット名。デフォルトの外観では削除）です。有効期限は 1 年、path=/ と SameSite=Lax を使用し、サーバー側で読み取れるため、ちらつきのない SSR が可能になります。ハイドレーション後、プロバイダーは Cookie の値を一度だけ復元します。メモリ上だけで保持したい場合は ThemeProvider に disableStorage を渡すか、persist を有効にしないでください。同じヘルパーを独自のサーバーコードでも使えます：

### ちらつきのないサーバーレンダリング

サーバーは訪問者のシステムの配色を知ることができず、React はハイドレーション後にしかテーマを適用しません。このギャップは 2 つの手順で埋められます。サーバーで Cookie を読み取りプロバイダーのデフォルト値として渡すこと、そして  に THEME_INIT_SCRIPT をインラインで埋め込むことです。この小さなレンダリングブロックスクリプトは Cookie を読み取り（なければ prefers-color-scheme にフォールバック）、最初の描画の前に data-theme、data-palette、color-scheme を設定するので、誤ったテーマが一瞬表示されることはありません。

Next.js App Router

その他の SSR 構成

初期化スクリプトは React のハイドレーション前に  の属性を変更するため、サーバーのマークアップと DOM は意図的に異なります。 と  要素に suppressHydrationWarning を付けてください。これはその要素自身の属性の警告だけを抑制し、子要素には影響しません。サーバー側で使うものはすべて minerva-design/theme-utils からインポートします。このエントリには "use client" がなく、Server Component から呼び出せます。

### createThemeInitScript

THEME_INIT_SCRIPT はデフォルトのオプションで createThemeInitScript() を呼び出した結果です。デフォルトを変えたい場合は独自に生成します：

オプション

デフォルト

theme Cookie がない、または無効な場合に使うモード。"system" は prefers-color-scheme によってライトまたはダークに解決されます。

palette Cookie がない、または無効で、 に有効な data-palette もまだない場合に使うパレット。null の場合 data-palette は設定されません（Minerva のデフォルトの外観）。

スクリプトの解決順序：theme Cookie、なければ defaultTheme。palette Cookie、なければ  にすでにレンダリングされた有効な data-palette、それもなければ defaultPalette。最初の描画前に実行されるよう、スクリプトはインラインのまま（async や defer を付けず）スタイルシートより前に置いてください。

### サーバーで安全に使えるヘルパー

これらはすべて minerva-design/theme-utils から提供されます。React に依存せず "use client" もない小さなエントリで、Server Component、ミドルウェア、エッジ関数で安全に使えます。

エクスポート

デフォルトの初期化スクリプト（文字列）：モードは Cookie から（なければシステム）、パレットは Cookie から（なければ  の既存の data-palette、それもなければなし）。 にインラインで埋め込みます。

別のデフォルト値で初期化スクリプトを生成します（上のオプションを参照）。

Cookie ヘッダーから両方の Cookie を解析して { theme, palette } を返します。欠けている値のデフォルトを指定できます。

theme Cookie の生の値を検証します。無効または欠落している場合はフォールバック（"system"）を返します。

palette Cookie の生の値を検証します。無効または欠落している場合はフォールバック（null）を返します。

Cookie ヘッダーまたは document.cookie から 1 つの Cookie を読み取り URI デコードします。存在しない場合は undefined。

テーマまたはパレットの値に対する Set-Cookie 形式の文字列（path=/、1 年、SameSite=Lax）を返します。

ThemeMode と Palette の値の型ガード。

組み込みパレット名（順に editorial、tech、graphite、cool）。

Cookie 名（"theme"、"palette"）とその有効期間（秒、1 年）。

### スコープ付きパレット

style.css のパレットブロックは属性セレクターなので、 だけでなく任意の要素にマッチします。サブツリーを別のパレットやモードで描画する最も簡単な方法は入れ子の Provider です。 や  は、子要素とそのオーバーレイにだけ適用されます。Provider を使わない場合は、ラッパー要素に data-palette と data-theme を自分で設定します。両方の属性を設定し、ラッパーに背景を指定してください。トークンは変わっても、要素が使うまでは何も描画されないためです。

### 新しいトークン

パレットの導入にあわせて、いくつかのセマンティックカラートークンとスケールトークンが追加されました。すべてのトークンには style.css にデフォルトがあるため、パレットの有無やカスタムテーマに関係なく機能します。

セマンティックカラートークン

変数

サイドバー、テーブルヘッダー、コードブロック用のごく淡い背景。

アプリシェルのキャンバスなど、サーフェスの背後にあるアプリケーションの背景。デフォルトは淡いサーフェス。

入力やセレクトなどフォームコントロールの背景。デフォルトは淡いサーフェス。

ホバーした行や項目の背景。デフォルトは控えめなサーフェス。

選択された行、項目、タブの背景。プライマリカラーの淡い色合い。

キャプションや補足テキスト用の強調の弱いテキスト。セカンダリと無効テキストの中間。

CTA、評価、ハイライト用のセカンダリアクセント。デフォルトはプライマリカラーで、各パレットは独自の値を設定します。

accent も primary や success と同じ完全なカラーロールです。--accent-color-hover、-active、-subtle、-border、-text は自動的に派生します。

スケールトークン

スケールトークンはモードによって変わりません（パレットが置き換えるのはフォントスタックのみ）。コンポーネントは CSS 変数として使用し、数値の gap や padding プロパティは var(--space-) に解決されます。

グループ

変数

余白

4px を基準にした rem スケール。小数のステップはハイフンで表します：--space-0-5 は 0.125rem。

角丸

--radius-sm、-md、-lg（これらはテーマトークンのまま）に加わる追加の角丸。

フォントサイズ

0.75rem（xs）から 3.75rem（6xl）まで。md（0.875rem）がコンポーネントの本文サイズです。

ウェイトと行の高さ

400 から 700 までのフォントウェイトと 3 段階の行の高さ。

フォントファミリー

本文、見出し、等幅のフォントスタック。パレットによって上書きされます。

重なり順

ドロップダウン、固定要素、オーバーレイ、モーダル、ポップオーバー、トーストが使う z-index のレイヤー。

モーション

トランジションの時間とイージングカーブ。

リズムと高さ

セクションやブロック間の可変の縦方向の余白と、影トークンのエレベーション別名。

フォーカス

フォーカスリングの幅とオフセット。

```tsx
import { ThemeProvider, ThemeToggle, PaletteToggle } from "minerva-design";
import "minerva-design/style.css";

export default function Root() {
  return (
    // mode: "light" | "dark" | "system" (default)
    // palette: "editorial" | "tech" | "graphite" | "cool" | null (default look)
    <ThemeProvider defaultTheme="system" defaultPalette="editorial">
      <header>
        <ThemeToggle />
        <PaletteToggle showDefault />
      </header>
      <App />
    </ThemeProvider>
  );
}
```

```tsx
import { ConfigProvider, ToastProvider, toast } from "minerva-design";

// The same thing with ConfigProvider (ThemeProvider is a preset over it):
// "system" is an alias of "auto"; persist turns on the cookies.
<ConfigProvider
  theme="system"
  palette="editorial"
  persist
  onThemeChange={(theme) => toast.info(`Theme: ${theme}`)}
  onPaletteChange={(palette) => toast.info(`Palette: ${palette}`)}
>
  <ToastProvider>
    <App />
  </ToastProvider>
</ConfigProvider>;
```

```tsx
import { Button, useTheme } from "minerva-design";

function Settings() {
  const { theme, resolvedTheme, palette, setTheme, setPalette } = useTheme();
  return (
    <>
      <p>{theme} → {resolvedTheme} · {palette ?? "default"}</p>
      <Button onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>
        Toggle mode
      </Button>
      <Button onClick={() => setPalette("tech")}>Tech palette</Button>
    </>
  );
}
```

```html
<!-- palette + light / dark / system: tokens come from style.css -->
<html data-theme="dark" data-palette="tech" style="color-scheme: dark">

<!-- no palette, or github-dark / a custom theme object: inline variables -->
<html data-theme="light" style="color-scheme: light; --primary-color: #2563eb; ...">
```

```tsx
import {
  THEME_COOKIE_NAME,     // "theme"   -> "light" | "dark" | "system"
  PALETTE_COOKIE_NAME,   // "palette" -> "editorial" | "tech" | "graphite" | "cool"
  readCookieValue,
  parseThemeCookie,
  parsePaletteCookie,
  serializeThemeCookie,
} from "minerva-design/theme-utils";

// Read on the server (or from document.cookie)
const theme = parseThemeCookie(readCookieValue(cookieHeader, THEME_COOKIE_NAME));
const palette = parsePaletteCookie(readCookieValue(cookieHeader, PALETTE_COOKIE_NAME));

// Write from a route handler / server action (path=/, one year, SameSite=Lax)
response.headers.append("Set-Cookie", serializeThemeCookie(THEME_COOKIE_NAME, "dark"));
```

```tsx
// app/layout.tsx: a Server Component (no "use client")
import { headers } from "next/headers";
import { ThemeProvider } from "minerva-design";
import {
  THEME_INIT_SCRIPT,
  parseThemeCookies,
} from "minerva-design/theme-utils";
import "minerva-design/style.css";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { theme, palette } = parseThemeCookies((await headers()).get("cookie"), {
    palette: "editorial",
  });

  return (
    // the init script changes <html> attributes before React hydrates
    <html
      lang="en"
      suppressHydrationWarning
      data-theme={theme === "system" ? undefined : theme}
      data-palette={palette ?? undefined}
    >
      <head>
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }}
        />
      </head>
      <body>
        <ThemeProvider defaultTheme={theme} defaultPalette={palette}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

```tsx
// server.tsx: any SSR setup (Express, Hono, a Vite SSR server...)
import { renderToString } from "react-dom/server";
import { ThemeProvider } from "minerva-design";
import { THEME_INIT_SCRIPT, parseThemeCookies } from "minerva-design/theme-utils";

app.get("*", (req, res) => {
  const { theme, palette } = parseThemeCookies(req.headers.cookie);
  const body = renderToString(
    <ThemeProvider defaultTheme={theme} defaultPalette={palette}>
      <App url={req.url} />
    </ThemeProvider>,
  );
  res.send(`<!doctype html>
<html${palette ? ` data-palette="${palette}"` : ""}>
  <head>
    <script>${THEME_INIT_SCRIPT}</script>
    <link rel="stylesheet" href="/assets/style.css" />
  </head>
  <body><div id="root">${body}</div></body>
</html>`);
});
```

```tsx
import { createThemeInitScript } from "minerva-design/theme-utils";

// Dark by default, "graphite" when the visitor has no palette cookie yet
export const themeInitScript = createThemeInitScript({
  defaultTheme: "dark",
  defaultPalette: "graphite",
});
```

```tsx
// A nested provider scopes a palette / mode to its subtree (and to the
// overlays opened from it). <html> and the cookies are left to the root one.
<ThemeProvider defaultTheme="dark" defaultPalette="tech">
  <Button color="primary">Always tech / dark</Button>
</ThemeProvider>

// Without a provider: palette token blocks match any element, not only
// <html>. Set both attributes and give the wrapper a background.
<div data-palette="tech" data-theme="dark" style={{ background: "var(--background-color)" }}>
  <Button color="primary">Always tech / dark</Button>
</div>
```

## PaletteToggle

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "PaletteToggle"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "palettes",
    "source": "packages/react/src/components/ThemeToggle/types.ts",
    "kind": "array",
    "typeText": "(\"editorial\" | \"tech\" | \"graphite\" | \"cool\")[] | undefined",
    "typeRef": "type:0a61f358e05925bc041d",
    "required": false,
    "description": "Palettes offered, in order"
  },
  {
    "name": "showDefault",
    "source": "packages/react/src/components/ThemeToggle/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Also offer Minerva's default look (no palette) as the first option"
  },
  {
    "name": "labels",
    "source": "packages/react/src/components/ThemeToggle/types.ts",
    "kind": "object",
    "typeText": "Partial<Record<\"default\" | \"editorial\" | \"tech\" | \"graphite\" | \"cool\", string>> | undefined",
    "typeRef": "type:d45a45bbe86657f1037e",
    "required": false,
    "description": "Override the button labels (`default` labels the no-palette option)"
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

## PresetToggle

Support: n/a

Mobile component of minerva-design/native (React Native); on the web use the responsive web components.

## ThemeProvider

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "ThemeProvider"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "defaultTheme",
    "source": "packages/react/src/contexts/types.ts",
    "kind": "enum",
    "values": [
      "dark",
      "light",
      "system"
    ],
    "typeText": "ThemeMode | undefined",
    "typeRef": "type:293f77323be9bd072cec",
    "required": false,
    "description": "Initial mode. For SSR pass the value parsed from the request cookie so the server markup matches the client."
  },
  {
    "name": "defaultPalette",
    "source": "packages/react/src/contexts/types.ts",
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
    "description": "Initial palette (`null` = Minerva's default look). For SSR pass the parsed `palette` cookie."
  },
  {
    "name": "primaryColor",
    "source": "packages/react/src/contexts/types.ts",
    "kind": "union",
    "typeText": "PrimaryColor | null | undefined",
    "typeRef": "type:f612ad4ccbeed997ce22",
    "required": false,
    "description": "Brand color, as `ConfigProvider`'s `primaryColor` (a color, or `{ light, dark }`); the light / dark mode stays the user's choice"
  },
  {
    "name": "disableStorage",
    "source": "packages/react/src/contexts/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Do not read / write the theme cookies (tests, embedded previews). Nested providers never use the cookies."
  },
  {
    "name": "locale",
    "source": "packages/react/src/contexts/types.ts",
    "kind": "object",
    "typeText": "Locale | undefined",
    "typeRef": "type:faa2d1cac8abe6cb7ce4",
    "required": false,
    "description": "Language of the React library's built-in texts"
  }
]
```

### events

```json
[
  {
    "name": "onThemeChange",
    "source": "packages/react/src/contexts/types.ts",
    "kind": "function",
    "typeText": "((theme: ThemeMode) => void) | undefined",
    "typeRef": "type:500bb726e7e2dabac339",
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
    "description": "Called when the mode changes"
  },
  {
    "name": "onPaletteChange",
    "source": "packages/react/src/contexts/types.ts",
    "kind": "function",
    "typeText": "((palette: \"editorial\" | \"tech\" | \"graphite\" | \"cool\" | null) => void) | undefined",
    "typeRef": "type:16baf768edd6ac7f1adc",
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
    "description": "Called when the palette changes"
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

## ThemeToggle

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
  "exports": [
    "ThemeToggle"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "showSystem",
    "source": "packages/react/src/components/ThemeToggle/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Show the \"system\" (follow the OS) option"
  },
  {
    "name": "labels",
    "source": "packages/react/src/components/ThemeToggle/types.ts",
    "kind": "object",
    "typeText": "Partial<Record<ThemeMode, string>> | undefined",
    "typeRef": "type:e54adf9eea9935a3df48",
    "required": false,
    "description": "Override the button labels (defaults come from the React library's locale)"
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

## API

```json
{
  "ThemeProviderProps": {
    "source": "react/src/contexts/types.ts",
    "description": "Props of `ThemeProvider`",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "defaultTheme",
        "type": "ThemeMode",
        "required": false,
        "default": "\"system\" (nested: the parent's theme)",
        "description": "Initial mode. For SSR pass the value parsed from the request cookie so the server markup matches the client."
      },
      {
        "name": "defaultPalette",
        "type": "Palette | null",
        "required": false,
        "default": "null (nested: the parent's palette)",
        "description": "Initial palette (`null` = Minerva's default look). For SSR pass the parsed `palette` cookie."
      },
      {
        "name": "primaryColor",
        "type": "PrimaryColor | null",
        "required": false,
        "default": "null (nested: the parent's brand color)",
        "description": "Brand color, as `ConfigProvider`'s `primaryColor` (a color, or `{ light, dark }`); the light / dark mode stays the user's choice"
      },
      {
        "name": "disableStorage",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Do not read / write the theme cookies (tests, embedded previews). Nested providers never use the cookies."
      },
      {
        "name": "locale",
        "type": "Locale",
        "required": false,
        "description": "Language of the React library's built-in texts"
      },
      {
        "name": "onThemeChange",
        "type": "(theme: ThemeMode) => void",
        "required": false,
        "description": "Called when the mode changes"
      },
      {
        "name": "onPaletteChange",
        "type": "(palette: Palette | null) => void",
        "required": false,
        "description": "Called when the palette changes"
      },
      {
        "name": "children",
        "type": "ReactNode",
        "required": true,
        "description": "Application content"
      }
    ]
  },
  "ThemeContextValue": {
    "source": "react/src/contexts/types.ts",
    "description": "Value returned by `useTheme()`",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "theme",
        "type": "ThemeMode",
        "required": true,
        "description": "Mode chosen by the user (\"system\" follows the OS)"
      },
      {
        "name": "resolvedTheme",
        "type": "ResolvedThemeMode",
        "required": true,
        "description": "Mode actually applied (\"light\" / \"dark\")"
      },
      {
        "name": "palette",
        "type": "Palette | null",
        "required": true,
        "description": "Active palette, `null` for Minerva's default look"
      },
      {
        "name": "setTheme",
        "type": "(theme: ThemeMode) => void",
        "required": true,
        "description": "Change the mode (writes the `theme` cookie unless storage is disabled)"
      },
      {
        "name": "setPalette",
        "type": "(palette: Palette | null) => void",
        "required": true,
        "description": "Change the palette (writes the `palette` cookie unless storage is disabled)"
      }
    ]
  },
  "ThemeToggleProps": {
    "source": "react/src/components/ThemeToggle/types.ts",
    "kind": "interface",
    "extends": [
      "HTMLAttributes<HTMLDivElement>"
    ],
    "props": [
      {
        "name": "showSystem",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Show the \"system\" (follow the OS) option"
      },
      {
        "name": "labels",
        "type": "Partial<Record<ThemeMode, string>>",
        "required": false,
        "description": "Override the button labels (defaults come from the React library's locale)"
      },
      {
        "name": "ref",
        "type": "Ref<HTMLDivElement>",
        "required": false,
        "description": "Ref to the group element"
      }
    ]
  },
  "PaletteToggleProps": {
    "source": "react/src/components/ThemeToggle/types.ts",
    "kind": "interface",
    "extends": [
      "HTMLAttributes<HTMLDivElement>"
    ],
    "props": [
      {
        "name": "palettes",
        "type": "Palette[]",
        "required": false,
        "default": "[\"editorial\", \"tech\", \"graphite\", \"cool\"]",
        "description": "Palettes offered, in order"
      },
      {
        "name": "showDefault",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Also offer Minerva's default look (no palette) as the first option"
      },
      {
        "name": "labels",
        "type": "Partial<Record<Palette | \"default\", string>>",
        "required": false,
        "description": "Override the button labels (`default` labels the no-palette option)"
      },
      {
        "name": "ref",
        "type": "Ref<HTMLDivElement>",
        "required": false,
        "description": "Ref to the group element"
      }
    ]
  }
}
```

## CSS variables

```json
{
  "css:ThemeToggle": {
    "kind": "cssVars",
    "source": "react/src/components/ThemeToggle",
    "vars": [
      {
        "name": "--theme-toggle-gap",
        "description": "Space between the options"
      },
      {
        "name": "--theme-toggle-padding",
        "description": "Inner padding of the group"
      },
      {
        "name": "--theme-toggle-radius",
        "description": "Corner radius of the group (defaults to --radius-lg; options use --radius-md)"
      },
      {
        "name": "--theme-toggle-background",
        "description": "Background of the group"
      },
      {
        "name": "--theme-toggle-item-height",
        "description": "Minimum height of an option (follows the density's control height)"
      },
      {
        "name": "--theme-toggle-item-min-width",
        "description": "Minimum width of an option"
      },
      {
        "name": "--theme-toggle-active-background",
        "description": "Background of the selected option"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: すべてのパレット

各パレットのライトとダーク。エクスポートされた palettes オブジェクトから描画しています（palettes[name][mode] は完全な ComponentTheme です）。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/theme-palette/demos/palette-swatches.tsx

```tsx
import { palettes } from "minerva-design";
import { PALETTES } from "minerva-design/theme-utils";

const MODES = ["light", "dark"] as const;

// Tokens shown for each palette x mode (values read from `palettes`)
const TOKENS = [
  "primary-color",
  "accent-color",
  "success-color",
  "warning-color",
  "danger-color",
  "info-color",
  "border-color",
] as const;

export default function PaletteSwatchesDemo() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: 12,
      }}
    >
      {PALETTES.flatMap((name) =>
        MODES.map((mode) => {
          const tokens = palettes[name][mode];
          return (
            <figure
              key={`${name}-${mode}`}
              style={{
                margin: 0,
                padding: 14,
                borderRadius: 10,
                border: `1px solid ${tokens["border-color"]}`,
                background: tokens["background-color"],
                color: tokens["text-color"],
                fontFamily: tokens["font-family-sans"],
              }}
            >
              <figcaption
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 10,
                  fontWeight: 600,
                }}
              >
                <span>{name}</span>
                <span style={{ color: tokens["text-muted-color"] }}>
                  {mode}
                </span>
              </figcaption>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {TOKENS.map((token) => (
                  <span
                    key={token}
                    title={`--${token}: ${tokens[token]}`}
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 6,
                      background: tokens[token],
                      border: `1px solid ${tokens["border-strong-color"]}`,
                    }}
                  />
                ))}
              </div>
              <div
                style={{
                  marginTop: 10,
                  padding: "6px 8px",
                  borderRadius: 6,
                  background: tokens["surface-subtle-color"],
                  color: tokens["text-secondary-color"],
                  fontSize: 12,
                }}
              >
                {tokens["primary-color"]} / {tokens["accent-color"]}
              </div>
            </figure>
          );
        }),
      )}
    </div>
  );
}

```

## Example: ThemeToggle と PaletteToggle

入れ子のプレビューは editorial パレットで始まります。テーマやパレットを変更しても周囲のドキュメントには影響しません。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/theme-palette/demos/toggles.tsx

```tsx
import {
  Button,
  HStack,
  PaletteToggle,
  Switch,
  Tag,
  ThemeProvider,
  ThemeToggle,
  useTheme,
} from "minerva-design";

// In an application, one provider at the root is all you need:
//
//   <ThemeProvider defaultPalette="editorial">
//     <ThemeToggle />
//     <PaletteToggle />
//   </ThemeProvider>
//
// Here a nested ThemeProvider is used: it scopes its mode and palette to its
// own subtree (no <html> attributes, no cookies), so the toggles re-theme
// this preview without touching the rest of the docs site.
function Preview() {
  const { resolvedTheme, palette } = useTheme();
  return (
    <div
      style={{
        display: "grid",
        gap: 16,
        padding: 20,
        borderRadius: 12,
        border: "1px solid var(--border-color)",
        background: "var(--background-color)",
        color: "var(--text-color)",
        fontFamily: "var(--font-family-sans)",
      }}
    >
      <HStack gap={4} wrap>
        <ThemeToggle />
        <PaletteToggle />
      </HStack>
      <HStack gap={4} wrap>
        <Button color="primary">Primary</Button>
        <Button color="neutral" variant="outline">
          Secondary
        </Button>
        <Tag color="primary">{palette ?? "default"}</Tag>
        <Tag color="info">{resolvedTheme}</Tag>
        <Switch label="Switch" defaultChecked />
      </HStack>
      <p style={{ margin: 0, color: "var(--text-muted-color)" }}>
        Theme: {resolvedTheme}; palette: {palette ?? "default"}
      </p>
    </div>
  );
}

export default function TogglesDemo() {
  return (
    <ThemeProvider defaultTheme="system" defaultPalette="editorial">
      <Preview />
    </ThemeProvider>
  );
}

```

## Example: テーマの読み取り

このサイトのプロバイダーの useTheme() と useConfig()。ヘッダーでテーマやパレットを変えると値が更新されます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/theme-palette/demos/use-theme.tsx

```tsx
import { Tag, useConfig, useTheme } from "minerva-design";

// useTheme() reads the closest ThemeProvider / ConfigProvider. This site wraps
// every page in one: change the theme or palette in the header and the values
// below follow. (github-dark is not a light / dark / system mode, so useTheme
// falls back to "system" while useConfig().mode is undefined.)
export default function UseThemeDemo() {
  const { theme, resolvedTheme, palette } = useTheme();
  const config = useConfig();

  const rows: [string, string][] = [
    ["useTheme().theme", theme],
    ["useTheme().resolvedTheme", resolvedTheme],
    ["useTheme().palette", palette ?? "null"],
    ["useConfig().mode", config.mode ?? "undefined"],
    ["useConfig().resolvedMode", config.resolvedMode ?? "undefined"],
    ["useConfig().palette", config.palette ?? "null"],
  ];

  return (
    <dl
      style={{
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        gap: "8px 16px",
        margin: 0,
      }}
    >
      {rows.map(([label, value]) => (
        <div key={label} style={{ display: "contents" }}>
          <dt>
            <code>{label}</code>
          </dt>
          <dd style={{ margin: 0 }}>
            <Tag color="primary">{value}</Tag>
          </dd>
        </div>
      ))}
    </dl>
  );
}

```

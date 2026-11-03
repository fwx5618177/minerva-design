# テーマとパレット

ライト / ダーク / システムのモードと配色パレットという 2 つの独立した軸。Cookie による永続化と、ちらつきのないサーバーレンダリングに対応します。

Package: minerva-design@1.20.1

Renderer: native

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.1",
  "sourceCommit": "3a9f5cdaae706f14fe6d8c65c5481eba719a66c4",
  "sourceDigest": "sha256:c9ed2b706b61413d29e506a3f04f3d35c044a4b57ec0e284935054f9e1898c7e",
  "referenceSourceDigest": "sha256:6c9ecba0079f25e53cd971e51f2be8604fc3d941c0ed1cfeec03c4a91913ad73"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.1/types.json) or getType() from minerva-design/contracts.

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

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
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
    "source": "packages/native/src/components/ThemeToggle/ThemeToggle.tsx",
    "kind": "array",
    "typeText": "readonly (\"editorial\" | \"tech\" | \"graphite\" | \"cool\")[] | undefined",
    "typeRef": "type:dc4f14752e48383655c4",
    "required": false,
    "description": "Palettes offered, in order"
  },
  {
    "name": "showDefault",
    "source": "packages/native/src/components/ThemeToggle/ThemeToggle.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Also offer Minerva's default look (no palette) as the first option"
  },
  {
    "name": "labels",
    "source": "packages/native/src/components/ThemeToggle/ThemeToggle.tsx",
    "kind": "object",
    "typeText": "Partial<Record<PaletteToggleValue, string>> | undefined",
    "typeRef": "type:6c6e8e3750d7f1c3960e",
    "required": false,
    "description": "Override the option labels (`default` labels the no-palette option)"
  },
  {
    "name": "size",
    "source": "packages/native/src/components/ThemeToggle/ThemeToggle.tsx",
    "kind": "enum",
    "values": [
      "medium",
      "small"
    ],
    "typeText": "ThemeToggleSize | undefined",
    "typeRef": "type:dfbe2e25c218fbac4bd4",
    "default": "medium",
    "required": false,
    "description": "Control size"
  },
  {
    "name": "disabled",
    "source": "packages/native/src/components/ThemeToggle/ThemeToggle.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Disables the control"
  }
]
```

### events

```json
[
  {
    "name": "onChange",
    "source": "packages/native/src/components/ThemeToggle/ThemeToggle.tsx",
    "kind": "function",
    "typeText": "((value: PaletteToggleValue) => void) | undefined",
    "typeRef": "type:952745af5b23d9eb5fe3",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "PaletteToggleValue",
        "typeRef": "type:441fe733a26b332e271d"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called with the chosen palette (`\"default\"`: no palette)"
  }
]
```

## PresetToggle

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "PresetToggle"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "presets",
    "source": "packages/native/src/components/ThemeToggle/ThemeToggle.tsx",
    "kind": "array",
    "typeText": "readonly (\"editorial\" | \"minerva\" | \"compact\" | \"touch\")[] | undefined",
    "typeRef": "type:04a395374e29e221ee72",
    "required": false,
    "description": "Presets offered, in order"
  },
  {
    "name": "labels",
    "source": "packages/native/src/components/ThemeToggle/ThemeToggle.tsx",
    "kind": "object",
    "typeText": "Partial<Record<\"editorial\" | \"minerva\" | \"compact\" | \"touch\", string>> | undefined",
    "typeRef": "type:7c2b54737942397ebdd4",
    "required": false,
    "description": "Override the option labels"
  },
  {
    "name": "size",
    "source": "packages/native/src/components/ThemeToggle/ThemeToggle.tsx",
    "kind": "enum",
    "values": [
      "medium",
      "small"
    ],
    "typeText": "ThemeToggleSize | undefined",
    "typeRef": "type:dfbe2e25c218fbac4bd4",
    "default": "medium",
    "required": false,
    "description": "Control size"
  },
  {
    "name": "disabled",
    "source": "packages/native/src/components/ThemeToggle/ThemeToggle.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Disables the control"
  }
]
```

### events

```json
[
  {
    "name": "onChange",
    "source": "packages/native/src/components/ThemeToggle/ThemeToggle.tsx",
    "kind": "function",
    "typeText": "((value: \"editorial\" | \"minerva\" | \"compact\" | \"touch\") => void) | undefined",
    "typeRef": "type:cebbc973a2c15539075f",
    "parameters": [
      {
        "name": "value",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "\"editorial\" | \"minerva\" | \"compact\" | \"touch\"",
        "typeRef": "type:3740df1fe5f05eb49097"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called with the chosen preset (after `setPreset`)"
  }
]
```

## ThemeProvider

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
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
    "name": "theme",
    "source": "packages/native/src/theme/types.ts",
    "kind": "enum",
    "values": [
      "dark",
      "light",
      "system"
    ],
    "typeText": "ThemeMode | undefined",
    "typeRef": "type:293f77323be9bd072cec",
    "default": "system",
    "required": false,
    "description": "Color mode: \"light\", \"dark\", or \"system\" (follows the OS appearance through `useColorScheme`). Same values as the web `ConfigProvider` modes. Uncontrolled after the first render: change it with `setThemeMode` (`useTheme()`) or by passing a new value."
  },
  {
    "name": "palette",
    "source": "packages/native/src/theme/types.ts",
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
    "description": "Built-in palette (\"editorial\", \"tech\", \"graphite\", \"cool\"); `null` keeps Minerva's default look"
  },
  {
    "name": "primaryColor",
    "source": "packages/native/src/theme/types.ts",
    "kind": "union",
    "typeText": "PrimaryColor | null | undefined",
    "typeRef": "type:f612ad4ccbeed997ce22",
    "required": false,
    "description": "Brand color: a CSS color (`\"#4f46e5\"`, `rgb()`...) for both modes, or a `{ light, dark }` pair. A single color gets a lighter dark-mode value with enough contrast on dark surfaces (`derivePrimaryDark`). Every token derived from `primary-color` (hover, active, subtle, border, text, focus ring, selection...) is recomputed from it. Wins over the palette's primary color; `overrides` still win over it. Unset: the parent provider's; `null`: the theme / palette's own. Invalid colors are ignored (with a development warning)."
  },
  {
    "name": "preset",
    "source": "packages/native/src/theme/types.ts",
    "kind": "enum",
    "values": [
      "compact",
      "editorial",
      "minerva",
      "touch"
    ],
    "typeText": "\"editorial\" | \"minerva\" | \"compact\" | \"touch\" | undefined",
    "typeRef": "type:1c1ec4963e4ae7a8649f",
    "default": "touch",
    "required": false,
    "description": "Design preset: \"minerva\" (default look), \"editorial\", \"compact\" or \"touch\" (consumer mobile apps: comfortable density, 44pt touch targets, large radius)"
  },
  {
    "name": "density",
    "source": "packages/native/src/theme/types.ts",
    "kind": "enum",
    "values": [
      "comfortable",
      "compact",
      "standard"
    ],
    "typeText": "\"compact\" | \"standard\" | \"comfortable\" | undefined",
    "typeRef": "type:5ea3bae44292e2cd25dd",
    "required": false,
    "description": "Spacing density of controls and rows"
  },
  {
    "name": "radius",
    "source": "packages/native/src/theme/types.ts",
    "kind": "enum",
    "values": [
      "large",
      "medium",
      "none",
      "small"
    ],
    "typeText": "\"none\" | \"small\" | \"medium\" | \"large\" | undefined",
    "typeRef": "type:1158e24eb483a4cd6fbe",
    "required": false,
    "description": "Corner radius scale"
  },
  {
    "name": "shadow",
    "source": "packages/native/src/theme/types.ts",
    "kind": "enum",
    "values": [
      "none",
      "standard",
      "subtle"
    ],
    "typeText": "\"standard\" | \"none\" | \"subtle\" | undefined",
    "typeRef": "type:47bcd12f79e654091e49",
    "required": false,
    "description": "Elevation shadow scale"
  },
  {
    "name": "fontScale",
    "source": "packages/native/src/theme/types.ts",
    "kind": "enum",
    "values": [
      "large",
      "small",
      "standard"
    ],
    "typeText": "\"standard\" | \"small\" | \"large\" | undefined",
    "typeRef": "type:86445c94907554063d7f",
    "required": false,
    "description": "Type scale"
  },
  {
    "name": "overrides",
    "source": "packages/native/src/theme/types.ts",
    "kind": "union",
    "typeText": "Readonly<Record<string, TokenValue | undefined>> | Partial<ComponentTheme> | undefined",
    "typeRef": "type:f989e4e5899a9ce2f235",
    "required": false,
    "description": "Token overrides (names without `--`, e.g. `{ \"primary-color\": \"#e11d48\" }`), applied over the mode / palette / design; may reference other tokens (`var(--x)`) and use `color-mix()`"
  },
  {
    "name": "locale",
    "source": "packages/native/src/theme/types.ts",
    "kind": "object",
    "typeText": "NativeLocale | undefined",
    "typeRef": "type:149d41d21bc4ddc91623",
    "required": false,
    "description": "Language and extra messages of the built-in texts"
  },
  {
    "name": "insets",
    "source": "packages/native/src/theme/types.ts",
    "kind": "object",
    "typeText": "Partial<EdgeInsets> | undefined",
    "typeRef": "type:d4cbbc6e4d016c5d57de",
    "required": false,
    "description": "Safe-area insets used by toasts, popups, action sheets and the nav / tab bars. Pass `useSafeAreaInsets()` of `react-native-safe-area-context`"
  },
  {
    "name": "fonts",
    "source": "packages/native/src/theme/types.ts",
    "kind": "object",
    "typeText": "NativeFonts | undefined",
    "typeRef": "type:4f09c00c9a5dff981939",
    "required": false,
    "description": "Font families loaded by the app"
  },
  {
    "name": "reducedMotion",
    "source": "packages/native/src/theme/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Instant transitions. Follows the OS \"Reduce motion\" setting when unset"
  }
]
```

### events

```json
[
  {
    "name": "onThemeChange",
    "source": "packages/native/src/theme/types.ts",
    "kind": "function",
    "typeText": "((theme: ThemeMode) => void) | undefined",
    "typeRef": "type:86dba1b7bbdbcf24a818",
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
    "description": "Called when the color mode changes (`setThemeMode`, ThemeToggle)"
  },
  {
    "name": "onPaletteChange",
    "source": "packages/native/src/theme/types.ts",
    "kind": "function",
    "typeText": "((palette: \"editorial\" | \"tech\" | \"graphite\" | \"cool\" | null) => void) | undefined",
    "typeRef": "type:11af47bab4686310385a",
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
    "description": "Called when the palette changes (`setPalette`)"
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

### bindings

```json
[
  {
    "prop": "theme",
    "event": "onThemeChange",
    "syntax": "theme={theme} onThemeChange={handler}"
  },
  {
    "prop": "palette",
    "event": "onPaletteChange",
    "syntax": "palette={palette} onPaletteChange={handler}"
  }
]
```

## ThemeToggle

Support: beta

### Import

```json
{
  "specifier": "minerva-design/native",
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
    "source": "packages/native/src/components/ThemeToggle/ThemeToggle.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Show the \"system\" (follow the OS) option"
  },
  {
    "name": "labels",
    "source": "packages/native/src/components/ThemeToggle/ThemeToggle.tsx",
    "kind": "object",
    "typeText": "Partial<Record<ThemeMode, string>> | undefined",
    "typeRef": "type:e54adf9eea9935a3df48",
    "required": false,
    "description": "Override the option labels (defaults are localized)"
  },
  {
    "name": "size",
    "source": "packages/native/src/components/ThemeToggle/ThemeToggle.tsx",
    "kind": "enum",
    "values": [
      "medium",
      "small"
    ],
    "typeText": "ThemeToggleSize | undefined",
    "typeRef": "type:dfbe2e25c218fbac4bd4",
    "default": "medium",
    "required": false,
    "description": "Control size"
  },
  {
    "name": "disabled",
    "source": "packages/native/src/components/ThemeToggle/ThemeToggle.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Disables the control"
  }
]
```

### events

```json
[
  {
    "name": "onChange",
    "source": "packages/native/src/components/ThemeToggle/ThemeToggle.tsx",
    "kind": "function",
    "typeText": "((value: ThemeMode) => void) | undefined",
    "typeRef": "type:8ea4ec56fab9309585ab",
    "parameters": [
      {
        "name": "value",
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
    "description": "Called with the chosen mode (after `setThemeMode`)"
  }
]
```

## API

```json
{
  "native:ThemeToggleProps": {
    "source": "native/src/components/ThemeToggle/ThemeToggle.tsx",
    "kind": "interface",
    "extends": [
      "ToggleBaseProps"
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
        "description": "Override the option labels (defaults are localized)"
      },
      {
        "name": "onChange",
        "type": "(value: ThemeMode) => void",
        "required": false,
        "description": "Called with the chosen mode (after `setThemeMode`)"
      }
    ]
  },
  "native:PaletteToggleProps": {
    "source": "native/src/components/ThemeToggle/ThemeToggle.tsx",
    "kind": "interface",
    "extends": [
      "ToggleBaseProps"
    ],
    "props": [
      {
        "name": "palettes",
        "type": "readonly Palette[]",
        "required": false,
        "default": "every built-in palette",
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
        "type": "Partial<Record<PaletteToggleValue, string>>",
        "required": false,
        "description": "Override the option labels (`default` labels the no-palette option)"
      },
      {
        "name": "onChange",
        "type": "(value: PaletteToggleValue) => void",
        "required": false,
        "description": "Called with the chosen palette (`\"default\"`: no palette)"
      }
    ]
  },
  "native:PresetToggleProps": {
    "source": "native/src/components/ThemeToggle/ThemeToggle.tsx",
    "kind": "interface",
    "extends": [
      "ToggleBaseProps"
    ],
    "props": [
      {
        "name": "presets",
        "type": "readonly DesignPreset[]",
        "required": false,
        "default": "every built-in preset",
        "description": "Presets offered, in order"
      },
      {
        "name": "labels",
        "type": "Partial<Record<DesignPreset, string>>",
        "required": false,
        "description": "Override the option labels"
      },
      {
        "name": "onChange",
        "type": "(value: DesignPreset) => void",
        "required": false,
        "description": "Called with the chosen preset (after `setPreset`)"
      }
    ]
  },
  "native:MinervaProviderProps": {
    "source": "native/src/theme/types.ts",
    "description": "Props of `MinervaProvider` (alias `ConfigProvider`)",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "theme",
        "type": "ThemeMode",
        "required": false,
        "default": "\"system\"",
        "description": "Color mode: \"light\", \"dark\", or \"system\" (follows the OS appearance through `useColorScheme`). Same values as the web `ConfigProvider` modes. Uncontrolled after the first render: change it with `setThemeMode` (`useTheme()`) or by passing a new value."
      },
      {
        "name": "palette",
        "type": "Palette | null",
        "required": false,
        "default": "the preset's palette (`null` for \"minerva\" / \"touch\")",
        "description": "Built-in palette (\"editorial\", \"tech\", \"graphite\", \"cool\"); `null` keeps Minerva's default look"
      },
      {
        "name": "primaryColor",
        "type": "PrimaryColor | null",
        "required": false,
        "default": "undefined",
        "description": "Brand color: a CSS color (`\"#4f46e5\"`, `rgb()`...) for both modes, or a `{ light, dark }` pair. A single color gets a lighter dark-mode value with enough contrast on dark surfaces (`derivePrimaryDark`). Every token derived from `primary-color` (hover, active, subtle, border, text, focus ring, selection...) is recomputed from it. Wins over the palette's primary color; `overrides` still win over it. Unset: the parent provider's; `null`: the theme / palette's own. Invalid colors are ignored (with a development warning)."
      },
      {
        "name": "preset",
        "type": "DesignPreset",
        "required": false,
        "default": "\"touch\"",
        "description": "Design preset: \"minerva\" (default look), \"editorial\", \"compact\" or \"touch\" (consumer mobile apps: comfortable density, 44pt touch targets, large radius)"
      },
      {
        "name": "density",
        "type": "Density",
        "required": false,
        "default": "the preset's",
        "description": "Spacing density of controls and rows"
      },
      {
        "name": "radius",
        "type": "RadiusScale",
        "required": false,
        "default": "the preset's",
        "description": "Corner radius scale"
      },
      {
        "name": "shadow",
        "type": "ShadowScale",
        "required": false,
        "default": "the preset's",
        "description": "Elevation shadow scale"
      },
      {
        "name": "fontScale",
        "type": "FontScale",
        "required": false,
        "default": "the preset's",
        "description": "Type scale"
      },
      {
        "name": "overrides",
        "type": "Readonly<Record<string, TokenValue | undefined>> | Partial<ComponentTheme>",
        "required": false,
        "description": "Token overrides (names without `--`, e.g. `{ \"primary-color\": \"#e11d48\" }`), applied over the mode / palette / design; may reference other tokens (`var(--x)`) and use `color-mix()`"
      },
      {
        "name": "locale",
        "type": "NativeLocale",
        "required": false,
        "default": "{ language: \"en\" }",
        "description": "Language and extra messages of the built-in texts"
      },
      {
        "name": "insets",
        "type": "Partial<EdgeInsets>",
        "required": false,
        "default": "{ top: StatusBar height on Android, else 0, right: 0, bottom: 0, left: 0 }",
        "description": "Safe-area insets used by toasts, popups, action sheets and the nav / tab bars. Pass `useSafeAreaInsets()` of `react-native-safe-area-context`"
      },
      {
        "name": "fonts",
        "type": "NativeFonts",
        "required": false,
        "default": "the platform fonts",
        "description": "Font families loaded by the app"
      },
      {
        "name": "reducedMotion",
        "type": "boolean",
        "required": false,
        "default": "the OS setting",
        "description": "Instant transitions. Follows the OS \"Reduce motion\" setting when unset"
      },
      {
        "name": "onThemeChange",
        "type": "(theme: ThemeMode) => void",
        "required": false,
        "description": "Called when the color mode changes (`setThemeMode`, ThemeToggle)"
      },
      {
        "name": "onPaletteChange",
        "type": "(palette: Palette | null) => void",
        "required": false,
        "description": "Called when the palette changes (`setPalette`)"
      },
      {
        "name": "children",
        "type": "ReactNode",
        "required": false,
        "description": "Application content"
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

## Example: preset

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/theme-palette/native/preset.tsx

```tsx
import { Text, View } from "react-native";
import {
  Button,
  Cell,
  MinervaProvider,
  PresetToggle,
  useTheme,
} from "minerva-design/native";

function Screen() {
  const { colors, design, tokens } = useTheme();
  return (
    <View
      style={{
        gap: 16,
        padding: 16,
        borderRadius: 16,
        backgroundColor: colors["background-color"],
      }}
    >
      <PresetToggle />
      <PresetToggle
        size="small"
        presets={["compact", "touch"]}
        labels={{ compact: "Dense", touch: "Comfortable" }}
      />
      <Cell title="Delivery address" value="Home" />
      <Button fullWidth>Place order</Button>
      <Text style={{ color: colors["text-secondary-color"] }}>
        Preset {design.preset}: density {design.density}, radius {design.radius}
        , controls {tokens.sizes["control-height-md"]}px high
      </Text>
    </View>
  );
}

export default function Preset() {
  return (
    <MinervaProvider preset="touch">
      <Screen />
    </MinervaProvider>
  );
}

```

## Example: ThemeToggle と PaletteToggle

入れ子のプレビューは editorial パレットで始まります。テーマやパレットを変更しても周囲のドキュメントには影響しません。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/theme-palette/native/toggles.tsx

```tsx
import { Text, View } from "react-native";
import {
  Button,
  MinervaProvider,
  PaletteToggle,
  Switch,
  Tag,
  ThemeToggle,
  useTheme,
} from "minerva-design/native";
function Preview() {
  const { colors, mode, palette } = useTheme();
  return (
    <View
      style={{
        gap: 16,
        padding: 20,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors["border-color"],
        backgroundColor: colors["background-color"],
      }}
    >
      <View style={{ flexDirection: "row", gap: 16, flexWrap: "wrap" }}>
        <ThemeToggle />
        <PaletteToggle />
      </View>
      <View
        style={{
          flexDirection: "row",
          gap: 16,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <Button color="primary">Primary</Button>
        <Button color="neutral" variant="outline">
          Secondary
        </Button>
        <Tag color="primary">{palette ?? "default"}</Tag>
        <Tag color="info">{mode}</Tag>
        <Switch label="Switch" defaultChecked />
      </View>
      <Text style={{ color: colors["text-muted-color"] }}>
        Theme: {mode}; palette: {palette ?? "default"}
      </Text>
    </View>
  );
}
export default function Toggles() {
  return (
    <MinervaProvider theme="system" palette="editorial">
      <Preview />
    </MinervaProvider>
  );
}

```

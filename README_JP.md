# Minerva コンポーネントライブラリ

## プラットフォームの実装状況

メインワークスペースには Vue（`minerva-design/vue`）、React Native / Expo（`minerva-design/native`）、Angular の初期実装（`minerva-design/angular`：設定、Button、Switch、Modal とその構成部品）が統合されています。Taro（`minerva-design/taro`）、uni-app（`minerva-design/uni`）、WeChat ネイティブ（`miniprogram: dist/weapp`）では Button・Input・Switch を実装しています。全機能の互換性や npm 公開を意味するものではありません。範囲と検証状況は[対応表](https://fwx5618177.github.io/minerva-design/#/platform-support)をご覧ください。

ルートは非公開の `minerva-design-workspace` で、`packages/minerva-design` が公開用の単一パッケージを組み立てます。`packages/core` はプラットフォーム非依存、`packages/dom` はブラウザー専用です。公開 `/core` は既存の Web API を維持します。隣接する `md-*` は未完了の変更を持つ Git worktree であり、別の公開パッケージではありません。

[コード比較と実装レポート（中国語）](docs/research/2026-10-09-library-comparison.md)。

<div align="center">

[![GitHub stars](https://img.shields.io/github/stars/fwx5618177/minerva-design.svg?style=social&label=Stars)](https://github.com/fwx5618177/minerva-design)
[![GitHub issues](https://img.shields.io/github/issues/fwx5618177/minerva-design.svg)](https://github.com/fwx5618177/minerva-design/issues)
[![GitHub license](https://img.shields.io/github/license/fwx5618177/minerva-design.svg)](https://github.com/fwx5618177/minerva-design/blob/main/LICENSE)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/fwx5618177/minerva-design.svg)](https://github.com/fwx5618177/minerva-design/pulls)
[![GitHub contributors](https://img.shields.io/github/contributors/fwx5618177/minerva-design.svg)](https://github.com/fwx5618177/minerva-design/graphs/contributors)

[English](./README.md) | [简体中文](./README_ZH.md) | [日本語](./README_JP.md)

</div>

Minerva は Web 向けの UI コンポーネントライブラリです。React 19 コンポーネントと、同じコンポーネントのフレームワーク非依存な Web Components を、1 つの npm パッケージ [`minerva-design`](https://www.npmjs.com/package/minerva-design) として公開しています。

## 🌟 デモとドキュメント

ドキュメントとライブデモ：[https://fwx5618177.github.io/minerva-design/](https://fwx5618177.github.io/minerva-design/)

## ✨ 特徴

- **React コンポーネント**：React 19 対応の 100 以上のコンポーネント（`ref` は通常の prop、クライアント用エントリーは `"use client"` 付き）
- **Web Components**：全コンポーネントを標準のカスタム要素（Lit）として提供。素の HTML、Vue、Angular、Svelte、Solid、React で利用でき、見た目・トークン・キーボード操作・ARIA は React 版と同じ。フォーム関連付け対応のフォームコントロール、CDN バンドル、自動生成のフレームワーク向け型定義付き
- **ESM + CommonJS**：React ライブラリは両方のモジュール形式を提供（Web Components は ESM のみ）
- **TypeScript**：型定義を同梱
- **テーマ**：light / dark / system の各モードと `editorial`・`tech`・`graphite`・`cool` の 4 パレット。CSS カスタムプロパティで実現し、cookie での永続化と SSR 向けのちらつき防止スクリプト `THEME_INIT_SCRIPT`（`minerva-design/theme-utils`、サーバー安全）に対応
- **デザインプリセット**：`<ConfigProvider preset="editorial">`（控えめで読みやすさ重視）や `density` / `radius` / `shadow` / `fontScale` の各軸でアプリ全体の見た目を切り替え。SSR 対応（`designAttributes()`、`createThemeInitScript({ design })`）で、ネストした provider でスコープを限定可能
- **カスタマイズ**：各コンポーネントが安定した CSS カスタムプロパティ（`--button-height`、`--modal-width` など）を公開
- **エントリー**：`minerva-design`、`/theme-utils`、`/monaco`、`style.css`（またはコンポーネント単位の `styles/<component>.css` + `styles/tokens.css`）、`prose.scss`。コンポーネント単位で tree-shaking 可能で、アイコン / i18n の実行時依存なし
- **国際化**：英語・中国語・日本語・フランス語のロケールを内蔵
- **ヘッドレスライブラリ不要**：オーバーレイ、メニュー、セレクト、タブ、`asChild` は `minerva-design/core` 上で自前実装。サードパーティのインタラクション依存は Floating UI のみ

## 📦 パッケージ

パッケージは [`minerva-design`](https://www.npmjs.com/package/minerva-design) の 1 つだけで、用途ごとにエントリーがあります：

| エントリー                                                                     | 説明                                                                                                                                                                                                               |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `minerva-design`                                                               | React 19 コンポーネントライブラリ。ESM + CJS、TypeScript 型付き、すべてのクライアントモジュールに `"use client"`。任意の Peer 依存：`react`、`react-dom` `^19.0.0`（React のエントリーでのみ必要）。               |
| `minerva-design/style.css`                                                     | グローバルスタイルシート（デザイントークン + 全コンポーネント）。アプリのエントリーで 1 回読み込みます。コンポーネント単位の `minerva-design/styles/<component>.css` と `minerva-design/tokens.css` もあります。   |
| `minerva-design/utils`、`minerva-design/theme-utils`                           | サーバーで安全に使えるヘルパー（`"use client"` なし、React 非依存）：`cn`、テーマ、テーマ Cookie、`THEME_INIT_SCRIPT`、デザインプリセットなど。React Server Components やサーバー向け。                            |
| `minerva-design/monaco`                                                        | Monaco ベースのコードエディター（任意の Peer 依存 `@monaco-editor/react` と `monaco-editor`）。                                                                                                                    |
| `minerva-design/web-components`                                                | フレームワーク非依存の Web Components（Lit）：すべての Minerva コンポーネントをカスタム要素として提供（`<minerva-button>`、`<minerva-select>`、`<minerva-modal>` など）。ESM のみ。                                |
| `minerva-design/web-components/<element>`、`minerva-design/web-components/cdn` | 要素ごとのエントリー（任意の `code-editor` を含む）と、`<script type="module">` / CDN 向けの自己完結バンドル。                                                                                                     |
| `minerva-design/web-components/{react,vue,svelte,solid}`                       | カスタム要素のフレームワーク向け型定義。`minerva-design/custom-elements.json` と `minerva-design/html-custom-data.json`（VS Code）はツール向けの記述です。                                                         |
| `minerva-design/core`、`minerva-design/styling-hooks`                          | 上級者向け：両ライブラリが共有するフレームワーク非依存のプリミティブ（フォーカススコープ、閉じられるレイヤー、スクロールロック、ロービングフォーカス、位置決め、テーマ、i18n）とスタイリングフックのマニフェスト。 |

リポジトリは pnpm monorepo です：`packages/core`、`packages/react`、`packages/web-components` にソース（非公開の workspace パッケージ）、`packages/minerva-design` はそれらのビルド成果物をまとめた公開パッケージ、`apps/docs` は GitHub Pages にデプロイされるドキュメント/デモサイト（非公開）です。

### アーキテクチャ

```
packages/core                 platform-neutral TypeScript
packages/dom                  browser interaction primitives
  interaction primitives · positioning (@floating-ui/dom) · theme · tokens · i18n
        ▲ React hooks                    ▲ Lit controllers
minerva-design               minerva-design/web-components
```

両ライブラリは同じコア（パッケージ内の `dist/core/`）を読み込みます。React コンポーネントとカスタム要素を併用するアプリでも、コアは 1 回だけ読み込まれます。

`minerva-design` のすべてのオーバーレイ（Modal、Drawer、Popover、Tooltip、Menu、ContextMenu、Select、AutoComplete、Cascader、TimePicker）は同じコアのプリミティブの上に構築されています。レイヤースタックは 1 つ（Escape は最も内側のオーバーレイから閉じる）、フォーカス処理も 1 つ（フォーカスは開いた要素へ戻る）、位置決めエンジンも 1 つです。詳しくはドキュメントサイトの[アーキテクチャ](https://fwx5618177.github.io/minerva-design/#/architecture)ページを参照してください。

### コンポーネント（`minerva-design`）

| カテゴリ       | コンポーネント                                                                                                                                                                                                                                                                                                       |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| テーマ         | `ConfigProvider`、`ThemeProvider` / `useTheme`、`ThemeToggle`、`PaletteToggle`                                                                                                                                                                                                                                       |
| 汎用           | `Button`、`IconButton`                                                                                                                                                                                                                                                                                               |
| レイアウト     | `Box`、`Stack` / `HStack` / `VStack`、`ResponsiveGrid` / `GridItem`、`SplitLayout`、`Page` / `PageHeader` / `PageSection` / `StatCard` / `Toolbar`、`AppShell`、`Card`（サブコンポーネント含む）、`Divider`、`VirtualList`                                                                                           |
| フォーム       | `FormControl` / `FormField` / `FormLabel` / `FormHelperText` / `FormErrorMessage`、`FormLayout`、`Input`、`Textarea`、`NumberInput`、`JsonField`、`KeyValueEditor`、`TagInput`、`AutoComplete`、`Select`、`Cascader`、`Checkbox`、`Radio` / `RadioGroup`、`Switch`、`TimePicker`、`Rating` / `RatingScale`、`Upload` |
| データ表示     | `Avatar` / `AvatarGroup`、`Badge`、`Tag`、`Empty`、`Table` / `DataTable`（サブコンポーネント含む）、`DescriptionList`、`List` / `ListItem`、`TextLink`、`CodeBlock`、`Prose`、`HtmlPreview`、`MonthCalendar`、`Tooltip` / `TooltipProvider`                                                                          |
| フィードバック | `Alert`、`toast` / `ToastProvider`、`ProgressIndicator`、`Skeleton` / `SkeletonText`、`LoadingState`                                                                                                                                                                                                                 |
| オーバーレイ   | `Modal`、`Drawer`、`ConfirmDialog` / `confirm()` / `useConfirm`、`CommandDialog`、`Popover`、`Menu` / `ContextMenu`                                                                                                                                                                                                  |
| ナビゲーション | `Tabs`、`PageTabs`、`NavTree`、`Pagination`、`Steps`                                                                                                                                                                                                                                                                 |
| エディター     | `MonacoCodeEditor`（`minerva-design/monaco`）                                                                                                                                                                                                                                                                        |

コンポーネントのほかに、`minerva-design` は `ConfigProvider`、`useConfig`、フック `useAutoTheme`・`useLocale`・`useI18n`、ユーティリティ `applyThemeStyles`・`generateCSSVariables`、および組み込みテーマ集 `themes`（`light`、`dark`、`github-dark`）をエクスポートしています。

## 🚀 クイックスタート

### インストール

```bash
pnpm add minerva-design
```

または

```bash
npm install minerva-design
```

または

```bash
yarn add minerva-design
```

次に、アプリのエントリー（`src/main.tsx` やルートの `app/layout.tsx` など）でグローバルスタイルシートを 1 回だけ読み込みます：

```ts
import "minerva-design/style.css";
```

React コンポーネントには React 19（`react`・`react-dom` `^19.0.0`）が必要です。React 18 はサポートしていません（`ref` を通常のプロパティとして使うなど React 19 の API を利用）。すべてのクライアントモジュールに `"use client"` ディレクティブが付いているため、React Server Components 対応フレームワーク（Next.js App Router など）からラッパーなしで読み込めます。

### 基本的な使用方法

スタイルシートを一度だけ（例えばエントリファイルで）読み込んでから、コンポーネントを使用します：

```tsx
import { useState } from "react";
import {
  Alert,
  Button,
  ConfigProvider,
  Switch,
  FormField,
  Input,
  ToastProvider,
  VStack,
  toast,
} from "minerva-design";
import "minerva-design/style.css";

export default function App() {
  const [name, setName] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <ConfigProvider>
      <ToastProvider>
        <VStack gap={4} align="start">
          <Alert color="info" title="Welcome" closable>
            Minerva is ready.
          </Alert>
          <FormField label="Username">
            <Input
              name="username"
              placeholder="Enter username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              clearable
            />
          </FormField>
          <Switch
            label="Subscribe"
            checked={subscribed}
            onChange={(checked) => setSubscribed(checked)}
          />
          <Button
            color="primary"
            onClick={() => toast.success(`Hello, ${name}`)}
          >
            Submit
          </Button>
        </VStack>
      </ToastProvider>
    </ConfigProvider>
  );
}
```

### テーマとロケール

`ConfigProvider` は `document.documentElement` に CSS カスタムプロパティ（`--primary-color`、`--background-color`、`--text-gray` など）を設定することでテーマを適用します。

- `theme`：`"auto"`（デフォルト。`prefers-color-scheme` に追従）、`"light"`、`"dark"`、`"github-dark"`、完全なテーマオブジェクト、または `{ light, dark }` のペア
- `locale`：`{ language: "en" | "zh" | "fr" }`（デフォルト `"en"`）

```tsx
import { ConfigProvider, themes, useConfig } from "minerva-design";

const brandTheme = {
  light: { ...themes.light, "primary-color": "#6750a4" },
  dark: { ...themes.dark, "primary-color": "#d0bcff" },
};

function CurrentTheme() {
  const { theme, locale } = useConfig();
  return <pre>{JSON.stringify({ theme, locale })}</pre>;
}

export function Root() {
  return (
    <ConfigProvider theme={brandTheme} locale={{ language: "fr" }}>
      <CurrentTheme />
    </ConfigProvider>
  );
}
```

組み込みテーマをそのまま使う場合は `theme="github-dark"`（または `"light"` / `"dark"`）を指定します。

### テーマ・パレットと SSR

サーバーコンポーネントで `minerva-design/theme-utils` の `parseThemeCookies` を使って cookie を読み、`<head>` に `THEME_INIT_SCRIPT` をインライン化し、`ThemeProvider`（`defaultTheme` / `defaultPalette`）でアプリを包むと、初回表示のちらつきを防げます。詳しくはドキュメントサイトの「テーマとパレット」ページを参照してください。

### Toast API

```tsx
import { Button, toast } from "minerva-design";

// Rendered by the <ToastProvider> mounted near the root of the app
export function SaveButton() {
  const save = () =>
    toast.promise(fetch("/api/save", { method: "POST" }), {
      loading: "Saving...",
      success: "Saved",
      error: "Could not save",
    });

  return <Button onClick={save}>Save</Button>;
}
```

### Web Components

同じコンポーネントを標準のカスタム要素として、どのフレームワークでも（フレームワークなしでも）使えます。同じパッケージから提供され（`pnpm add minerva-design`、React は不要）、shadow root に React コンポーネントと同じ DOM とスタイルを描画し、`minerva-design/core` のプリミティブを再利用するため、見た目も挙動も React コンポーネントと同じです。

```ts
// every element...
import "minerva-design/web-components";
// ...or only the ones you use (one entry per element)
import "minerva-design/web-components/select";

// design tokens, once (already included in minerva-design/style.css)
import "minerva-design/tokens.css";
```

ビルドなしで CDN から読み込むこともできます：

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/minerva-design@0/dist/core/tokens.css"
/>
<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/minerva-design@0/dist/web-components/cdn/minerva.js"
></script>
```

あとはネイティブ要素と同じようにタグを使います。フォームコントロールはフォームに関連付けられ（`name`、`required`、`FormData`、`form.reset()`）、イベントはバブリングして shadow root を越える `minerva-*` の CustomEvent（`minerva-change`、`minerva-open-change` など）です：

```html
<minerva-config theme="system" locale="en">
  <form>
    <label for="plan">Plan</label>
    <minerva-select id="plan" name="plan" value="pro" required>
      <minerva-option value="free">Free</minerva-option>
      <minerva-option value="pro">Pro</minerva-option>
    </minerva-select>
    <minerva-switch name="newsletter" checked>Newsletter</minerva-switch>
    <minerva-button type="submit">Save</minerva-button>
  </form>
</minerva-config>

<script type="module">
  document
    .querySelector("minerva-select")
    .addEventListener("minerva-change", (event) => {
      console.log(event.detail.value);
    });
</script>
```

型定義：すべての要素は `HTMLElementTagNameMap` に登録されています。テンプレートの型チェックには次を参照します：

```ts
/// <reference types="minerva-design/web-components/react" />  // React 19 JSX
/// <reference types="minerva-design/web-components/svelte" /> // Svelte 5
/// <reference types="minerva-design/web-components/solid" />  // Solid
// Vue (Volar): add "minerva-design/web-components/vue" to compilerOptions.types
// VS Code: "html.customData": ["./node_modules/minerva-design/dist/web-components/html-custom-data.json"]
```

素の HTML、Vue、Angular、Svelte、フォーム、テーマのガイド：[Web Components](https://fwx5618177.github.io/minerva-design/#/web-components)。

### スタイルのカスタマイズ

公開され安定した 3 つのレイヤーがあり、軽いものから順に使えます：

1. **デザイントークンとコンポーネントの CSS 変数**（`--primary-color`、`--radius-md`、`--button-radius`、`--input-height`…）：`:root`、テーマスコープ、任意の要素に設定します。
2. **スタイリングフック**：すべての React コンポーネントは、スタイル可能な要素に `data-minerva="<コンポーネント>"` と `data-part="<パーツ>"`、共通語彙の状態属性（`data-state="open|closed|checked|unchecked|indeterminate|active|inactive"`、`data-disabled`、`data-invalid`、`data-readonly`、`data-loading`、`data-size`、`data-variant`、`data-color`、`data-orientation`、`data-side`、`data-align`、`data-placement`…）を出力します。Web Components はタグ名、`::part()`、カスタムステート（`:state()`）で同じ名前を公開します。
3. **カスケードレイヤー**：ライブラリの CSS はすべて `@layer minerva` に入っているため、レイヤー外のアプリ CSS は `!important` なしで上書きできます。

| フック         | React                                        | Web Components                     |
| -------------- | -------------------------------------------- | ---------------------------------- |
| コンポーネント | `[data-minerva="button"]`                    | `minerva-button`                   |
| パーツ         | `[data-minerva="button"][data-part="label"]` | `minerva-button::part(label)`      |
| 状態           | `[data-state="open"]`、`[data-disabled]`     | `:state(open)`、`:state(disabled)` |
| キー付き状態   | `[data-size="small"]`                        | `:state(size-small)`               |
| アイテムの状態 | `[data-part="item"][data-highlighted]`       | `::part(item item--highlighted)`   |

```css
/* React */
[data-minerva="button"][data-part="root"][data-variant="solid"] {
  --button-radius: 999px; /* 変数とフックを組み合わせる */
  letter-spacing: 0.01em;
}
[data-minerva="modal"][data-part="content"][data-state="open"] {
  border: 1px solid var(--border-color);
}

/* Web Components：同じ名前 */
minerva-button:state(variant-solid) {
  --button-radius: 999px;
}
minerva-modal:state(open)::part(content) {
  border: 1px solid var(--border-color);
}

/* レイヤー化したアプリの CSS：minerva をレイヤー順に含める */
@layer reset, minerva, app;
```

繰り返されるアイテム（メニュー項目、オプション、行とソート済みヘッダー、ページ、ステップ、ツリー項目、日付、トースト、ファイル…）は独自の状態（`highlighted`、`selected`、`checked`、`current`、`expanded`、`sort`、`status`…）を持ちます：React ではアイテム要素そのものの属性、シャドウルート内のアイテムはパーツ名と並ぶ `<part>--<state>` パーツ名（Shoelace / Web Awesome の規約）、独立した要素であるアイテムはカスタムステート（`minerva-option:state(selected)`）です。複合セレクター `[data-minerva="x"][data-part="y"]` を推奨します（ポップアップやダイアログなどポータルで描画されるパーツにも一致します）。クラス名とフックのない DOM は内部実装です。各コンポーネントのフックはドキュメントページと `minerva-design/styling-hooks`（機械可読なマニフェスト）に一覧され、`packages/core/styling-hooks.lock.json` で固定されています：フックの追加は minor、削除・改名は major の変更です。ガイド：[スタイルのカスタマイズ](https://fwx5618177.github.io/minerva-design/#/styling)。

## 🌐 ブラウザサポート

エバーグリーンブラウザが対象です。**完全サポート**（以下の機能がすべてネイティブで動作）：**Chrome / Edge 120+、Firefox 125+、Safari 17+**（iOS Safari 17+ を含む）。それより古いエンジン（Chrome / Edge 111、Firefox 113、Safari 16.4 まで）でも次の劣化つきで動作します：

- `color-mix()`（111 / 113 / 16.2）：影とホバー色が平坦になる；コンテナクエリ（105 / 110 / 16）：`ResponsiveGrid`・`SplitLayout`・`KeyValueEditor` は 1 カラムのまま；`:has()`（105 / 121 / 15.4）：`Input`・`Modal` / `Drawer` の余白がわずかに異なる；`:dir()`（120 / 49 / 16.4）：RTL で `Rating` の半星と `Cascader` の矢印が反転しない。
- Web Components：Popover API（114 / 125 / 17）がない場合、オーバーレイは `position: fixed` + `z-index` にフォールバック；`ElementInternals`（77 / 98 / 16.4）がない場合、フォームコントロールは動作するがフォームに参加しない（`element-internals-polyfill` を利用可）；`adoptedStyleSheets` がない場合 Lit は `<style>` にフォールバック；スタイリングフックのカスタムステート `:state()`（125 / 126 / 17.4）は Chromium 90-124 では旧構文 `:--open`、それより古いエンジンではホスト属性（`[open]`、`[disabled]`）を使います。
- カスケードレイヤー `@layer`（99 / 97 / 15.4）：公開されるすべてのスタイルシートは `@layer minerva` に入っています。
- クリップボード（`CodeBlock` のコピー）はセキュアコンテキスト（HTTPS / localhost）が必要で、使えない場合は「コピー失敗」と表示されます。
- SSR には Node `^20.19.0 || >=22.12.0` が必要です。インポート時に `window` / `document` にはアクセスしません。

機能マトリクスの全体は [英語版 README](./README.md#-browser-support) を参照してください。

## 🧑‍💻 開発者向けクイックスタート

必要環境：ローカル開発には Node.js >= 22.12（`.nvmrc` を参照）と pnpm 11 が必要です。パッケージとドキュメントサイトのビルドは Node.js 20.19+ でも動作します（GitHub Pages のデプロイワークフローは Node 20 を使用）。

```bash
git clone https://github.com/fwx5618177/minerva-design.git
cd minerva
pnpm install
pnpm dev
```

### スクリプト

| コマンド                            | 説明                                                                                        |
| ----------------------------------- | ------------------------------------------------------------------------------------------- |
| `pnpm dev`                          | `minerva-design` をビルドしてから、ドキュメント/デモサイトを起動                            |
| `pnpm build`                        | `minerva-design`（core → react → web components）をビルドし、次にドキュメントサイトをビルド |
| `pnpm test`                         | すべてのテストを実行：ユニット（全パッケージ・ドキュメント検査）と e2e ユーザーフロー       |
| `pnpm test:unit` / `pnpm test:e2e`  | ユニットテストのみ / e2e ユーザーフロー（`tests/e2e`）のみを実行                            |
| `pnpm test:dist`                    | ビルドした `minerva-design` とその tarball のテスト（ビルド後に実行）                       |
| `pnpm test:coverage`                | カバレッジ付きで全テストを実行（しきい値あり）                                              |
| `pnpm lint`                         | ESLint（flat config）を実行                                                                 |
| `pnpm typecheck`                    | 全パッケージの型チェック                                                                    |
| `pnpm format` / `pnpm format:check` | Prettier で整形 / 整形チェック                                                              |
| `pnpm clean`                        | ビルド成果物を削除                                                                          |
| `pnpm changeset`                    | 変更内容を記述した changeset を追加                                                         |
| `pnpm version-packages`             | 保留中の changeset を適用：バージョン更新と CHANGELOG 生成                                  |
| `pnpm release`                      | `minerva-design` をビルドして npm に公開                                                    |

### ツール

- ビルド：Vite 8
- テスト：Vitest、Testing Library、happy-dom
- リント・フォーマット：ESLint 10 + typescript-eslint、Prettier
- Git フック：Husky、lint-staged、commitlint（Conventional Commits）
- CI：`.github/workflows/ci.yml` が `main` への push とすべての Pull Request で、Node 22 上で lint、型チェック、整形チェック、カバレッジ付きテスト、ビルド、ビルド成果物のテスト、パッケージチェックを実行
- ドキュメントのデプロイ：`.github/workflows/deploy.yml` が `main` への push ごとに `minerva-design` とドキュメントサイト（`apps/docs`）をビルドし、GitHub Pages に公開

### リリース（npm への手動公開）

バージョンと変更履歴は [Changesets](https://github.com/changesets/changesets) で管理しています。公開は**手動**で、メンテナーのマシンから行います。CI に公開ワークフローはありません（`.github/workflows/ci.yml` は検証のみ、`deploy.yml` はドキュメントサイトのデプロイのみ）。

1. **変更ごとに changeset を書く**（その PR で）：`pnpm changeset` で `minerva-design`（唯一の公開パッケージ。`@minerva/*` の workspace パッケージは非公開で無視されます）の semver の種類を選び、生成された `.changeset/*.md` をコミットします。
2. **バージョン更新**（最新の `main`、作業ツリーがクリーンな状態で）：

   ```bash
   pnpm version-packages   # changeset version：バージョン更新、CHANGELOG.md の書き込み、.changeset/*.md の消費
   pnpm install            # lockfile を更新
   ```

3. **レビュー**してから公開します：`git diff`（バージョン、CHANGELOG の内容）を確認し、Node 22（`.nvmrc`）で CI と同じチェックを実行します：

   ```bash
   pnpm lint && pnpm typecheck && pnpm format:check && pnpm test:coverage
   pnpm build && pnpm test:dist && pnpm check:package
   (cd packages/minerva-design && npm pack --dry-run)   # 公開される内容を確認（何もアップロードされません）
   git commit -am "chore: release" && git push
   ```

4. **npm にログイン**：`minerva-design` の公開権限があり、二要素認証（2FA）を有効にしたアカウントを使います：

   ```bash
   npm login --registry https://registry.npmjs.org/
   npm whoami --registry https://registry.npmjs.org/
   ```

   パッケージの `publishConfig.registry` は `https://registry.npmjs.org/` を指しているため、`~/.npmrc` にミラー（npmmirror など）を設定していても公開には使われません。

5. **公開**：

   ```bash
   pnpm release            # minerva-design をビルドし `changeset publish` を実行
   git push --follow-tags  # changeset publish が作成した minerva-design@<バージョン> タグを push
   ```

   `changeset publish` は npm にまだ存在しないバージョンの場合にだけ `minerva-design` を公開します（非公開パッケージは公開されません）。書き込みに 2FA を有効にしている場合はワンタイムパスワードを求められます（事前に渡す場合：`pnpm release --otp <code>`。引数は `changeset publish` に渡されます）。

公開される内容（`packages/minerva-design/package.json` の `files`。テスト、ソース、ドキュメントサイトは含まれません）：

| フォルダー             | 内容                                                                                                                                                                                  |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dist/react/`          | React のエントリー：モジュールごとの ESM + CJS、`.d.ts` / `.d.cts`、`style.css`、コンポーネント単位の `styles/*.css`、`prose.scss`、`./monaco`・`./theme-utils`・`./utils` エントリー |
| `dist/core/`           | 両ライブラリが共有するフレームワーク非依存のコア（ESM + CJS、`.d.ts` / `.d.cts`、`tokens.css`）                                                                                       |
| `dist/web-components/` | 要素ごとの ESM、`elements/*` エントリー（任意の `code-editor` を含む）、`cdn/minerva.js`、`types/` のフレームワーク型定義、`html-custom-data.json`                                    |
| パッケージのルート     | `custom-elements.json`、`README.md`、`LICENSE`、`CHANGELOG.md`                                                                                                                        |

workspace パッケージ（`@minerva/core`、`@minerva/dom`、`@minerva/react`、`@minerva/web-components`、各プラットフォームのレンダラー `@minerva/{vue,angular,native,taro,weapp,uni}`、`@minerva/docs`）は非公開で、公開されることはありません。

## 🤝 コントリビューション

コントリビューションを歓迎します！詳細は [CONTRIBUTING.md](./CONTRIBUTING.md) をご覧ください。

## 📝 ライセンス

このプロジェクトは MIT ライセンスの下で提供されています - 詳細は [LICENSE](./LICENSE) ファイルをご覧ください。

## 📧 お問い合わせ

ご質問やフィードバックがございましたら、以下の方法でお問い合わせください：

- メール：[fwx5618177@gmail.com](mailto:fwx5618177@gmail.com)
- GitHub Issues：[https://github.com/fwx5618177/minerva-design/issues](https://github.com/fwx5618177/minerva-design/issues)
- GitHub Pull Requests：[https://github.com/fwx5618177/minerva-design/pulls](https://github.com/fwx5618177/minerva-design/pulls)

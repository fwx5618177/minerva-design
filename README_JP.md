# Minerva コンポーネントライブラリ

<div align="center">

[![GitHub stars](https://img.shields.io/github/stars/fwx5618177/minerva.svg?style=social&label=Stars)](https://github.com/fwx5618177/minerva)
[![GitHub issues](https://img.shields.io/github/issues/fwx5618177/minerva.svg)](https://github.com/fwx5618177/minerva/issues)
[![GitHub license](https://img.shields.io/github/license/fwx5618177/minerva.svg)](https://github.com/fwx5618177/minerva/blob/main/LICENSE)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/fwx5618177/minerva.svg)](https://github.com/fwx5618177/minerva/pulls)
[![GitHub contributors](https://img.shields.io/github/contributors/fwx5618177/minerva.svg)](https://github.com/fwx5618177/minerva/graphs/contributors)

[English](./README.md) | [简体中文](./README_ZH.md) | [日本語](./README_JP.md)

</div>

Minerva は Web 向けの UI コンポーネントライブラリです。React コンポーネントライブラリと、フレームワークに依存しない Web Components を、1 つの pnpm monorepo で開発しています。

## 🌟 デモとドキュメント

ドキュメントとライブデモ：[https://fwx5618177.github.io/minerva/](https://fwx5618177.github.io/minerva/)

## ✨ 特徴

- **React コンポーネント**：React 19 対応の 100 以上のコンポーネント（`ref` は通常の prop、クライアント用エントリーは `"use client"` 付き）
- **Web Components**：全コンポーネントを標準のカスタム要素（Lit）として提供。素の HTML、Vue、Angular、Svelte、Solid、React で利用でき、見た目・トークン・キーボード操作・ARIA は React 版と同じ。フォーム関連付け対応のフォームコントロール、CDN バンドル、自動生成のフレームワーク向け型定義付き
- **ESM + CommonJS**：React ライブラリは両方のモジュール形式を提供（Web Components は ESM のみ）
- **TypeScript**：型定義を同梱
- **テーマ**：light / dark / system の各モードと `editorial`・`tech`・`graphite`・`cool` の 4 パレット。CSS カスタムプロパティで実現し、cookie での永続化と SSR 向けのちらつき防止スクリプト `THEME_INIT_SCRIPT`（`@minerva/lib-core/theme-utils`、サーバー安全）に対応
- **デザインプリセット**：`<ConfigProvider preset="editorial">`（控えめで読みやすさ重視）や `density` / `radius` / `shadow` / `fontScale` の各軸でアプリ全体の見た目を切り替え。SSR 対応（`designAttributes()`、`createThemeInitScript({ design })`）で、ネストした provider でスコープを限定可能
- **カスタマイズ**：各コンポーネントが安定した CSS カスタムプロパティ（`--button-height`、`--modal-width` など）を公開
- **エントリー**：`@minerva/lib-core`、`/theme-utils`、`/monaco`、`style.css`（またはコンポーネント単位の `styles/<component>.css` + `styles/tokens.css`）、`prose.scss`。コンポーネント単位で tree-shaking 可能で、アイコン / i18n の実行時依存なし
- **国際化**：英語・中国語・日本語・フランス語のロケールを内蔵
- **ヘッドレスライブラリ不要**：オーバーレイ、メニュー、セレクト、タブ、`asChild` は `@minerva/core` 上で自前実装。サードパーティのインタラクション依存は Floating UI のみ

## 📦 パッケージ

| パッケージ                    | 説明                                                                                                                                                                                                                                                                                |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@minerva/core`               | フレームワーク非依存のインタラクションプリミティブ（フォーカススコープ、閉じられるレイヤー、スクロールロック、ロービングフォーカス、位置決めなど）、テーマユーティリティ、デザイントークン、i18n メッセージ。lib-core と一緒にインストールされます。                                |
| `@minerva/lib-core`           | React 19 コンポーネントライブラリ。ESM + CJS、TypeScript 型付き。Peer 依存：`react`、`react-dom` `^19.0.0`。                                                                                                                                                                        |
| `@minerva/lib-web-components` | フレームワーク非依存の Web Components（Lit）：すべての Minerva コンポーネントをカスタム要素として提供（`<minerva-button>`、`<minerva-select>`、`<minerva-modal>` など）。ESM のみ。要素ごとのエントリー、CDN バンドル、`tokens.css`、React・Vue・Svelte・Solid 向けの型定義を同梱。 |
| `@minerva/sample`（非公開）   | Vite 製のドキュメント/デモサイト。GitHub Pages にデプロイ。                                                                                                                                                                                                                         |

### アーキテクチャ

```
@minerva/core            framework-agnostic TypeScript (DOM only)
  interaction primitives · positioning (@floating-ui/dom) · theme · tokens · i18n
        ▲ React hooks                    ▲ Lit controllers
@minerva/lib-core               @minerva/lib-web-components
```

`@minerva/lib-core` のすべてのオーバーレイ（Modal、Drawer、Popover、Tooltip、Menu、ContextMenu、Select、AutoComplete、Cascader、TimePicker）は同じコアのプリミティブの上に構築されています。レイヤースタックは 1 つ（Escape は最も内側のオーバーレイから閉じる）、フォーカス処理も 1 つ（フォーカスは開いた要素へ戻る）、位置決めエンジンも 1 つです。詳しくはドキュメントサイトの[アーキテクチャ](https://fwx5618177.github.io/minerva/#/architecture)ページを参照してください。

### コンポーネント（`@minerva/lib-core`）

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
| エディター     | `MonacoCodeEditor`（`@minerva/lib-core/monaco`）                                                                                                                                                                                                                                                                     |

コンポーネントのほかに、`@minerva/lib-core` は `ConfigProvider`、`useConfig`、フック `useAutoTheme`・`useLocale`・`useI18n`、ユーティリティ `applyThemeStyles`・`generateCSSVariables`、および組み込みテーマ集 `themes`（`light`、`dark`、`github-dark`）をエクスポートしています。

## 🚀 クイックスタート

### インストール

```bash
pnpm add @minerva/lib-core react react-dom
```

または

```bash
npm install @minerva/lib-core react react-dom
```

または

```bash
yarn add @minerva/lib-core react react-dom
```

React 19（`react`・`react-dom` `^19.0.0`）が必要です。React 18 はサポートしていません（`ref` を通常のプロパティとして使うなど React 19 の API を利用）。すべてのクライアントモジュールに `"use client"` ディレクティブが付いているため、React Server Components 対応フレームワーク（Next.js App Router など）からラッパーなしで読み込めます。

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
} from "@minerva/lib-core";
import "@minerva/lib-core/style.css";

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
import { ConfigProvider, themes, useConfig } from "@minerva/lib-core";

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

サーバーコンポーネントで `@minerva/lib-core/theme-utils` の `parseThemeCookies` を使って cookie を読み、`<head>` に `THEME_INIT_SCRIPT` をインライン化し、`ThemeProvider`（`defaultTheme` / `defaultPalette`）でアプリを包むと、初回表示のちらつきを防げます。詳しくはドキュメントサイトの「テーマとパレット」ページを参照してください。

### Toast API

```tsx
import { Button, toast } from "@minerva/lib-core";

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

同じコンポーネントを標準のカスタム要素として、どのフレームワークでも（フレームワークなしでも）使えます。shadow root に lib-core と同じ DOM とスタイルを描画し、`@minerva/core` のプリミティブを再利用するため、見た目も挙動も React コンポーネントと同じです。

```bash
pnpm add @minerva/lib-web-components
```

```ts
// every element...
import "@minerva/lib-web-components";
// ...or only the ones you use (one entry per element)
import "@minerva/lib-web-components/select";

// design tokens, once (already included in @minerva/lib-core/style.css)
import "@minerva/lib-web-components/tokens.css";
```

ビルドなしで CDN から読み込むこともできます：

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@minerva/lib-web-components@1/dist/tokens.css"
/>
<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/@minerva/lib-web-components@1/dist/cdn/minerva.js"
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
/// <reference types="@minerva/lib-web-components/react" />  // React 19 JSX
/// <reference types="@minerva/lib-web-components/svelte" /> // Svelte 5
/// <reference types="@minerva/lib-web-components/solid" />  // Solid
// Vue (Volar): add "@minerva/lib-web-components/vue" to compilerOptions.types
// VS Code: "html.customData": ["./node_modules/@minerva/lib-web-components/dist/html-custom-data.json"]
```

素の HTML、Vue、Angular、Svelte、フォーム、テーマのガイド：[Web Components](https://fwx5618177.github.io/minerva/#/web-components)。

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

複合セレクター `[data-minerva="x"][data-part="y"]` を推奨します（ポップアップやダイアログなどポータルで描画されるパーツにも一致します）。クラス名とフックのない DOM は内部実装です。各コンポーネントのフックはドキュメントページと `@minerva/core/styling-hooks`（機械可読なマニフェスト）に一覧され、`packages/core/styling-hooks.lock.json` で固定されています：フックの追加は minor、削除・改名は major の変更です。ガイド：[スタイルのカスタマイズ](https://fwx5618177.github.io/minerva/#/styling)。

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
git clone https://github.com/fwx5618177/minerva.git
cd minerva
pnpm install
pnpm dev
```

### スクリプト

| コマンド                            | 説明                                                                                  |
| ----------------------------------- | ------------------------------------------------------------------------------------- |
| `pnpm dev`                          | ライブラリをビルドしてから、ドキュメント/デモサイトを起動                             |
| `pnpm build`                        | 全パッケージを順にビルド：core → lib-core → lib-web-components → sample               |
| `pnpm test`                         | すべてのテストを実行：ユニット（全パッケージ・ドキュメント検査）と e2e ユーザーフロー |
| `pnpm test:unit` / `pnpm test:e2e`  | ユニットテストのみ / e2e ユーザーフロー（`tests/e2e`）のみを実行                      |
| `pnpm test:dist`                    | ビルド成果物のテスト（lib-core と lib-web-components、ビルド後に実行）                |
| `pnpm test:coverage`                | カバレッジ付きで全テストを実行（しきい値あり）                                        |
| `pnpm lint`                         | ESLint（flat config）を実行                                                           |
| `pnpm typecheck`                    | 全パッケージの型チェック                                                              |
| `pnpm format` / `pnpm format:check` | Prettier で整形 / 整形チェック                                                        |
| `pnpm clean`                        | ビルド成果物を削除                                                                    |
| `pnpm changeset`                    | 変更内容を記述した changeset を追加                                                   |
| `pnpm version-packages`             | 保留中の changeset を適用：バージョン更新と CHANGELOG 生成                            |
| `pnpm release`                      | ライブラリをビルドして npm に公開                                                     |

### ツール

- ビルド：Vite 8
- テスト：Vitest、Testing Library、happy-dom
- リント・フォーマット：ESLint 10 + typescript-eslint、Prettier
- Git フック：Husky、lint-staged、commitlint（Conventional Commits）
- CI：`.github/workflows/ci.yml` が `main` への push とすべての Pull Request で、Node 22 上で lint、型チェック、整形チェック、カバレッジ付きテスト、ビルド、ビルド成果物のテスト、パッケージチェックを実行
- ドキュメントのデプロイ：`.github/workflows/deploy.yml` が `main` への push ごとにドキュメントサイトをビルドし GitHub Pages に公開

### リリース（npm への手動公開）

バージョンと変更履歴は [Changesets](https://github.com/changesets/changesets) で管理しています。公開は**手動**で、メンテナーのマシンから行います。CI に公開ワークフローはありません（`.github/workflows/ci.yml` は検証のみ、`deploy.yml` はドキュメントサイトのデプロイのみ）。

1. **変更ごとに changeset を書く**（その PR で）：`pnpm changeset` でパッケージと semver の種類を選び、生成された `.changeset/*.md` をコミットします。
2. **バージョン更新**（最新の `main`、作業ツリーがクリーンな状態で）：

   ```bash
   pnpm version-packages   # changeset version：バージョン更新、CHANGELOG.md の書き込み、.changeset/*.md の消費
   pnpm install            # lockfile を更新（内部依存の範囲が変わることがあります）
   ```

3. **レビュー**してから公開します：`git diff`（バージョン、CHANGELOG の内容、lib-core / lib-web-components の `@minerva/core` の範囲）を確認し、Node 22（`.nvmrc`）で CI と同じチェックを実行します：

   ```bash
   pnpm lint && pnpm typecheck && pnpm format:check && pnpm test:coverage
   pnpm build && pnpm test:dist && pnpm check:package
   pnpm -r publish --dry-run --no-git-checks   # 公開される内容を確認（何もアップロードされません）
   git commit -am "chore: release" && git push
   ```

4. **npm にログイン**：`@minerva` スコープへの公開権限があり、二要素認証（2FA）を有効にしたアカウントを使います：

   ```bash
   npm login --registry https://registry.npmjs.org/
   npm whoami --registry https://registry.npmjs.org/
   ```

   各パッケージの `publishConfig.registry` は `https://registry.npmjs.org/` を指しているため、`~/.npmrc` にミラー（npmmirror など）を設定していても公開には使われません。

5. **公開**：

   ```bash
   pnpm release            # core、lib-core、lib-web-components をビルドし `changeset publish` を実行
   git push --follow-tags  # changeset publish が作成した <パッケージ>@<バージョン> タグを push
   ```

   `changeset publish` は npm にまだ存在しないバージョンのパッケージだけを、依存関係の順（`@minerva/core` → `@minerva/lib-core` と `@minerva/lib-web-components`）で公開し、`workspace:*` を実際のバージョンに置き換えます。書き込みに 2FA を有効にしている場合はワンタイムパスワードを求められます（事前に渡す場合：`pnpm release --otp <code>`。引数は `changeset publish` に渡されます）。

各パッケージが公開する内容（各 `package.json` の `files`。テスト、ソース、ドキュメントサイトは含まれません）：

| パッケージ                    | 内容                                                                                                                                                                                                                        |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@minerva/core`               | `dist/`（ESM + CJS、`.d.ts` / `.d.cts`、`tokens.css`）、`README.md`、`LICENSE`                                                                                                                                              |
| `@minerva/lib-core`           | `dist/`（モジュールごとの ESM + CJS、型、`style.css`、コンポーネントごとの `styles/*.css`、`prose.scss`、`./monaco` と `./theme-utils` エントリ）、`README.md`、`LICENSE`                                                   |
| `@minerva/lib-web-components` | `dist/`（要素ごとの ESM、`elements/*` エントリ（オプションの `code-editor` を含む）、`cdn/minerva.js`、`tokens.css`、`types/` のフレームワーク型、`html-custom-data.json`）、`custom-elements.json`、`README.md`、`LICENSE` |

`@minerva/sample`（ドキュメントサイト）は private で、公開されることはありません。

## 🤝 コントリビューション

コントリビューションを歓迎します！詳細は [CONTRIBUTING.md](./CONTRIBUTING.md) をご覧ください。

## 📝 ライセンス

このプロジェクトは MIT ライセンスの下で提供されています - 詳細は [LICENSE](./LICENSE) ファイルをご覧ください。

## 📧 お問い合わせ

ご質問やフィードバックがございましたら、以下の方法でお問い合わせください：

- メール：[fwx5618177@gmail.com](mailto:fwx5618177@gmail.com)
- GitHub Issues：[https://github.com/fwx5618177/minerva/issues](https://github.com/fwx5618177/minerva/issues)
- GitHub Pull Requests：[https://github.com/fwx5618177/minerva/pulls](https://github.com/fwx5618177/minerva/pulls)

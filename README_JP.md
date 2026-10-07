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

- **React コンポーネント**：React 18 以降に対応した 30 以上のコンポーネント
- **Web Components**：Lit ベースのカスタム要素。任意のフレームワーク、またはフレームワークなしで利用可能
- **ESM + CommonJS**：両方のモジュール形式を提供
- **TypeScript**：型定義を同梱
- **テーマ**：light、dark、`github-dark`、または独自テーマに対応。CSS カスタムプロパティで実現し、デフォルトではシステムのカラースキームに追従
- **国際化**：英語・中国語・フランス語のロケールを内蔵

## 📦 パッケージ

| パッケージ                    | 説明                                                                                                    |
| ----------------------------- | ------------------------------------------------------------------------------------------------------- |
| `@minerva/lib-core`           | React（>= 18）コンポーネントライブラリ。ESM + CJS、TypeScript 型付き。Peer 依存：`react`、`react-dom`。 |
| `@minerva/lib-web-components` | Lit ベースの Web Components。現在は `<minerva-button>` カスタム要素を提供。                             |
| `@minerva/sample`（非公開）   | Vite 製のドキュメント/デモサイト。GitHub Pages にデプロイ。                                             |

### コンポーネント（`@minerva/lib-core`）

| カテゴリ       | コンポーネント                                                                                                                                                                                |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 汎用           | `Button`、`IconButton`、`InteractiveIconButton`、`SearchButton`                                                                                                                               |
| レイアウト     | `Space`、`Divider`                                                                                                                                                                            |
| データ入力     | `TextField`、`AutoComplete`、`Cascader`、`Checkbox`、`Radio`、`RadioGroup`、`Switch`、`TimePicker`                                                                                            |
| データ表示     | `Avatar`、`AvatarGroup`、`Badge`、`Card`（`CardHeader`、`CardTitle`、`CardDescription`、`CardContent`、`CardFooter`）、`Chip`、`Tag`、`Empty`、`StatusIndicator`、`Pagination`、`VirtualList` |
| フィードバック | `Alert`、`message` / `useMessage`、`ProgressIndicator`、`Skeleton`                                                                                                                            |
| オーバーレイ   | `Dropdown`、`Popper`、`Tooltip`                                                                                                                                                               |

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

### 基本的な使用方法

スタイルシートを一度だけ（例えばエントリファイルで）読み込んでから、コンポーネントを使用します：

```tsx
import { useState } from "react";
import {
  Alert,
  Button,
  ConfigProvider,
  Space,
  Switch,
  TextField,
  message,
} from "@minerva/lib-core";
import "@minerva/lib-core/style.css";

export default function App() {
  const [name, setName] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <ConfigProvider>
      <Space direction="vertical" size="medium">
        <Alert variant="info" title="Welcome" closable>
          Minerva is ready.
        </Alert>
        <TextField
          name="username"
          label="Username"
          placeholder="Enter username"
          value={name}
          onChange={setName}
          clearable
        />
        <Switch
          label="Subscribe"
          checked={subscribed}
          onChange={(checked) => setSubscribed(checked)}
        />
        <Button
          variant="primary"
          onClick={() => message.success(`Hello, ${name}`)}
        >
          Submit
        </Button>
      </Space>
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

### Message API

```tsx
import { Button, message, useMessage } from "@minerva/lib-core";

export function SaveButton() {
  const msg = useMessage();

  const save = () => {
    msg
      .loading({ content: "Saving...", duration: 1000 })
      .then(() => message.success("Saved"));
  };

  return <Button onClick={save}>Save</Button>;
}
```

### Web Components

```bash
pnpm add @minerva/lib-web-components
```

カスタム要素を一度だけ登録します：

```ts
import "@minerva/lib-web-components";
```

その後、任意の HTML で使用できます：

```html
<minerva-button variant="primary" size="medium" shape="pill">
  Click me
</minerva-button>
<minerva-button variant="ghost" loading>Loading</minerva-button>
<minerva-button variant="error" disabled aria-label="Delete">
  Delete
</minerva-button>
```

`<minerva-button>` の属性：

| 属性                            | 値                                                                                      |
| ------------------------------- | --------------------------------------------------------------------------------------- |
| `variant`                       | `primary`、`secondary`、`success`、`warning`、`error`、`info`、`ghost`、`retry`、`back` |
| `size`                          | `tiny`、`small`、`medium`、`large`                                                      |
| `shape`                         | `square`、`rounded`、`circle`、`pill`                                                   |
| `loading`、`disabled`、`active` | 真偽値                                                                                  |
| `aria-label`                    | 文字列                                                                                  |

React プロジェクトで JSX の型を利用するには、以下を追加します：

```ts
/// <reference types="@minerva/lib-web-components/react" />
```

## 🧑‍💻 開発者向けクイックスタート

必要環境：ローカル開発には Node.js >= 22.12（`.nvmrc` を参照）と pnpm 11 が必要です。パッケージとドキュメントサイトのビルドは Node.js 20.19+ でも動作します（GitHub Pages のデプロイワークフローは Node 20 を使用）。

```bash
git clone https://github.com/fwx5618177/minerva.git
cd minerva
pnpm install
pnpm dev
```

### スクリプト

| コマンド                            | 説明                                                             |
| ----------------------------------- | ---------------------------------------------------------------- |
| `pnpm dev`                          | ライブラリをビルドしてから、ドキュメント/デモサイトを起動        |
| `pnpm build`                        | 全パッケージを順にビルド：lib-core → lib-web-components → sample |
| `pnpm test`                         | 全パッケージで Vitest を実行                                     |
| `pnpm test:coverage`                | カバレッジ付きでテストを実行                                     |
| `pnpm lint`                         | ESLint（flat config）を実行                                      |
| `pnpm typecheck`                    | 全パッケージの型チェック                                         |
| `pnpm format` / `pnpm format:check` | Prettier で整形 / 整形チェック                                   |
| `pnpm clean`                        | ビルド成果物を削除                                               |
| `pnpm changeset`                    | 変更内容を記述した changeset を追加                              |
| `pnpm version-packages`             | 保留中の changeset を適用：バージョン更新と CHANGELOG 生成       |
| `pnpm release`                      | ライブラリをビルドして npm に公開                                |

### ツール

- ビルド：Vite 8
- テスト：Vitest、Testing Library、happy-dom
- リント・フォーマット：ESLint 10 + typescript-eslint、Prettier
- Git フック：Husky、lint-staged、commitlint（Conventional Commits）
- ドキュメントのデプロイ：`.github/workflows/deploy.yml` が `main` への push ごとにドキュメントサイトをビルドし GitHub Pages に公開

### リリース

バージョンと変更履歴は [Changesets](https://github.com/changesets/changesets) で管理しています。公開はメンテナーがローカルで手動で行います：

```bash
# 1. PR で：変更内容を記述（パッケージと semver の種類を選択）
pnpm changeset

# 2. リリース時、最新の main ブランチで：
pnpm version-packages   # バージョン更新、CHANGELOG.md の更新、.changeset/*.md の消費
pnpm install            # 内部依存のバージョンが変わった場合は lockfile を更新
git commit -am "chore: release" && git push

# 3. 公開（@minerva スコープへの公開権限を持つアカウントで `npm login` が必要）
pnpm release            # lib-core と lib-web-components をビルドし `changeset publish` を実行
git push --follow-tags  # changeset publish が作成したタグを push
```

公開前に `pnpm lint && pnpm typecheck && pnpm test && pnpm build` がすべて成功することを確認してください。

## 🤝 コントリビューション

コントリビューションを歓迎します！詳細は [CONTRIBUTING.md](./CONTRIBUTING.md) をご覧ください。

## 📝 ライセンス

このプロジェクトは MIT ライセンスの下で提供されています - 詳細は [LICENSE](./LICENSE) ファイルをご覧ください。

## 📧 お問い合わせ

ご質問やフィードバックがございましたら、以下の方法でお問い合わせください：

- メール：[fwx5618177@gmail.com](mailto:fwx5618177@gmail.com)
- GitHub Issues：[https://github.com/fwx5618177/minerva/issues](https://github.com/fwx5618177/minerva/issues)
- GitHub Pull Requests：[https://github.com/fwx5618177/minerva/pulls](https://github.com/fwx5618177/minerva/pulls)

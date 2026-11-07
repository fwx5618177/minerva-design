# 概要

Minerva Design は React、Vue、Angular、Web Components、React Native、Taro、WeChat ネイティブ、uni-app のレンダラーで契約とデザイントークンを共有します。

Package: minerva-design@1.22.2

Renderer: uni

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.2",
  "sourceCommit": "93eaa8e002773e63a78341d4424f9e832b7305a9",
  "sourceDigest": "sha256:62e49d8be55ca2bb85e8afd17b7862d068358e8ea94178c66288911996ed036e",
  "referenceSourceDigest": "sha256:10025b0c7fa1af3c2b0e9de9a1b6d51e6e81c9a41c96e7fcba66a58604dda51c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.2/types.json) or getType() from minerva-design/contracts.

## Documentation

### Minerva とは

単一の minerva-design パッケージが各レンダラーのエントリーを提供します。実装済み API とホストごとの対応方法はプラットフォーム対応表を参照してください。

Web とミニプログラムは CSS 変数を使用し、React Native は同じトークンをネイティブスタイル値に解決します。Provider がテーマ、パレット、デザインプリセットを管理します。

### パッケージ

React 19 コンポーネント、ConfigProvider、テーマユーティリティとフック。ESM、CommonJS、TypeScript 宣言を提供し、他のレンダラーは専用エントリーを使用します。

Lit のカスタム要素は文書化されたコンポーネント一覧を提供し、HTML や各フレームワークで使用できます。

### 特長

#### テーマ

light、dark、system モード、組み込みパレットとプリセット、ConfigProvider によるカスタムテーマを提供します。

#### 国際化

React 版は英語・中国語・日本語・フランス語の翻訳と軽量なトランスレーターを内蔵しています。i18n ライブラリに依存せず、アプリ側の i18n の設定とは完全に分離されています。

#### アクセシビリティ

セマンティックな要素、キーボード操作、見やすいフォーカスリング、アイコンのみのコントロール向けの aria-label プロパティ。

#### TypeScript

TypeScript で実装。各コンポーネントは Props 型をエクスポートし、テーマも型付きのトークンマップです。

#### Tree shaking 対応

対象レンダラーのエントリーをインポートします。形式、スタイルシート、任意のホスト依存関係はインストールと対応表を参照してください。

### クイックルック

スタイルシートを一度だけ読み込み、アプリを ConfigProvider で囲んでコンポーネントを使います：

### ドキュメントを見る

各ページにはソースコード付きのライブサンプルと、コンポーネントの型から生成された API 表があります。

```tsx
import { Button, ConfigProvider, HStack, Switch } from "minerva-design";
import "minerva-design/style.css";

export default function App() {
  return (
    <ConfigProvider theme="system">
      <HStack gap={4}>
        <Button color="primary">Save</Button>
        <Switch label="Notifications" defaultChecked />
      </HStack>
    </ConfigProvider>
  );
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

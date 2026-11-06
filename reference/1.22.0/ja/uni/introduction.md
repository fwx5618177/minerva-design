# はじめに

Minerva の考え方、コンポーネントページの読み方、すべてのコンポーネントに共通する規約。

Package: minerva-design@1.22.0

Renderer: uni

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.0",
  "sourceCommit": "e2a31507ecfcdb5ffcd33b05b47404c7625bb883",
  "sourceDigest": "sha256:a33fb5e0b8f01ae452ce95d2b723ab0cd9905636d574c72fd12c1459f4c09d3a",
  "referenceSourceDigest": "sha256:2459da5f08881aec3d2ac2d940ce35e7a61d0e0e679c0c167d8b5fdf8330a456"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.0/types.json) or getType() from minerva-design/contracts.

## Documentation

### 設計原則

#### トークン駆動

色・角丸・影は CSS カスタムプロパティから取得されるため、どのコンポーネントも現在のテーマ（独自テーマを含む）に追従します。

#### 標準でアクセシブル

ネイティブでセマンティックな要素を描画し、キーボード操作に対応し、見やすいフォーカスリングを表示し、表示ラベルがない場合に備えて aria-label を提供します。

#### 予測しやすい API

同じプロパティ名（variant、size、shape、disabled、loading など）はどのコンポーネントでも同じ意味を持ちます。

#### 小さく組み合わせやすい

コンポーネントは 1 つの役割に集中し、className と style を受け付けるため、独自のレイアウトやスタイルと簡単に組み合わせられます。

### コンポーネントページの読み方

各コンポーネントページは同じ構成になっています：

コンポーネントの正確な import 文。グローバルスタイルシートはここでは繰り返しません。アプリのエントリで一度だけ読み込みます（「インストール」を参照）。

各機能を網羅したライブデモ。「コードを表示」で完全なソースを確認できます。各デモは自己完結しており、そのままコピーして使えます。デモは操作の結果を Minerva 自身のコンポーネント（トースト、ダイアログ、インラインの結果表示）でページ上に示し、ブラウザのアラートやコンソールは使いません。

コンポーネントの TypeScript 型から生成された表。各プロパティの型、デフォルト値、説明を記載しています。

### 規約

#### 制御・非制御

フォーム系コンポーネントは自身で状態を管理する（defaultChecked / defaultValue を渡すか何も渡さない）ことも、制御する（checked / value と onChange を一緒に渡す）こともできます。コンポーネントの生存中に 2 つのモードを切り替えないでください。

#### className と style

コンポーネントはルート要素で className（多くの場合 style も）を受け付けます。Button のようにネイティブ要素をラップするコンポーネントは、ネイティブ属性（type、name、data-*、aria-* など）もそのまま渡します。

#### アクセシブルな名前

表示テキストのないコントロール（アイコンボタン、検索ボタン、閉じるアイコンなど）には、aria-label プロパティでアクセシブルな名前を付けてください。操作可能な要素にそのまま渡されます。

### ブラウザサポート

Minerva は現行のエバーグリーンブラウザ（Chrome・Edge 111+、Firefox 113+、Safari 16.2+）を対象としています。テーマは CSS カスタムプロパティと color-mix() に依存しており、Internet Explorer はサポートしません。サーバーサイドレンダリングも可能で、テーマは React のマウント後にクライアントで適用されます。

### コントリビュート

Minerva は MIT ライセンスのオープンソースです。バグ報告、アイデア、プルリクエストを GitHub でお待ちしています：

```tsx
import { useState } from "react";
import { Switch } from "minerva-design";

// Uncontrolled: the component keeps its own state
<Switch label="Wi-Fi" defaultChecked />;

// Controlled: you own the state and update it in onChange
function Controlled() {
  const [on, setOn] = useState(false);
  return <Switch label="Bluetooth" checked={on} onChange={setOn} />;
}
```

```tsx
import { Button, IconButton } from "minerva-design";
import { IoTrashOutline } from "react-icons/io5";

<Button className="my-button" style={{ minWidth: 120 }} type="submit">
  Save
</Button>;

// icon-only controls need an accessible name
<IconButton icon={<IoTrashOutline />} aria-label="Delete item" />;
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

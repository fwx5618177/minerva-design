# スタイルのカスタマイズ

自分の CSS で Minerva のあらゆるコンポーネントのスタイルを変更する方法：デザイントークンと CSS 変数、公開された data-minerva / data-part / 状態フック、Web Components の ::part() と :state()、そして minerva カスケードレイヤー。

Package: minerva-design@1.23.3

Renderer: vue

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.3",
  "sourceCommit": "476a289a1ef792c8950058e6bf15f1fe46ce18b0",
  "sourceDigest": "sha256:b7c3468445a6a9337f252a14f73347509078e26d4ed34efcf08034d5d4d49c91",
  "referenceSourceDigest": "sha256:7eba577017a7e4dd3baaf9e50ce53ce6efacf4bb06dac6c879af80bc45a8bca3"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.3/types.json) or getType() from minerva-design/contracts.

## Documentation

### 公開された 3 つのレイヤー

Minerva にはコンポーネントをカスタマイズする安定した方法が 3 つあり、軽いものから順に使えます。いずれも公開 API で、マイナーリリース間で動作し続けます（内部のクラス名や DOM 構造は対象外です）。

デザイントークンとコンポーネントの CSS 変数：色、角丸、余白、コントロールの高さ…を :root、テーマスコープ、任意の要素に設定します。

スタイリングフック：React では data-minerva（コンポーネント）、data-part（パーツ）、状態属性（data-state、data-disabled、data-size…）。Web Components ではタグ名、::part()、:state()。両方のライブラリで同じ名前です。

minerva カスケードレイヤー：ライブラリのスタイルシートはすべて @layer minerva に入っているため、レイヤー外の CSS は !important なしで優先されます。

### CSS 変数

まずは変数を使いましょう。テーマに追従し、コンポーネント自身の状態（ホバー、フォーカス、無効）との一貫性も保てます。各コンポーネントページに ---* 変数の一覧があり、トークンは「テーマ」で説明しています。変数は下のフックと組み合わせられます：宣言を書き直す代わりに、特定のバリアント・サイズ・状態だけに変数を設定します。

### スタイリングフック（React）

すべての React コンポーネントは、スタイル可能な要素に data-minerva="" と data-part="" を出力し、状態を共通語彙の属性で表します。コンポーネントのルートは data-part="root" です。ポータルで描画されるオーバーレイのパーツ（ポップアップ、ダイアログ、トースト）にも data-minerva が付くので、どこに描画されても一致します。値はサーバーでもクライアントとまったく同じに出力されます（ハイドレーションの不一致はありません）。

推奨パターン：複合セレクター [data-minerva="x"][data-part="y"]（詳細度 0,2,0）に状態属性を加えます。ネスト（Modal 内の Button はそれ自身のコンポーネント）やポータルの影響を受けません。内部クラス名の子孫セレクターは避けてください。内部実装であり、リリース間で変わります。範囲を限定するには自分のコンテナのクラスを前に付けるか、コンポーネントに className を渡します（ルート、またはその prop が説明するパーツに付きます）。

### 状態の語彙

すべてのコンポーネントが同じ状態名を使います。React ではルート（およびフローティングコンテンツなど状態を持つパーツ）の data-* 属性、Web Components ではホスト要素のカスタムステートです。

パーツも共通の語彙に従います：root、label、description、icon、start-icon、end-icon、spinner、trigger、content、overlay、header、body、footer、title、close-button、list、item、item-indicator、group、separator、input、control、thumb、track、indicator… 各コンポーネントページの「スタイリングフック」に、React と Web Components それぞれのパーツ、セレクター、状態が載っています。

### アイテムとその状態のスタイリング

コンポーネント内で繰り返される要素（メニュー項目、オプション、タブ、テーブルの行とソート済みヘッダー、ページ、ステップ、ツリー項目、カレンダーの日付、トースト、ファイル、星…）は独自の公開状態を持ちます：highlighted、selected、disabled、checked、current、expanded、sort、status…。コンポーネントの状態と同じ語彙を使い、アイテムの ARIA 状態（aria-selected、aria-checked、aria-current、aria-expanded、aria-sort）を反映します。

React：状態はアイテム要素そのものの属性で、data-minerva・data-part と並びます：[data-minerva="menu"][data-part="item"][data-highlighted]。

Web Components、シャドウルート内に描画されるアイテム：各アイテム状態はパーツ名と並ぶ追加のパーツ名 --（キー付き状態は ---）です。::part() で組み合わせます。列挙したすべての名前を持つ要素に一致します：minerva-menu::part(item item--highlighted)、minerva-data-table::part(header-cell header-cell--sort-ascending)。この規約は Shoelace / Web Awesome（item--selected）に倣ったもので、:state() のサポートを必要としません。

Web Components、それ自体が独立したカスタム要素であるアイテム（、、、…）：状態はアイテム要素のカスタムステートで、他のコンポーネントと同じです：minerva-option:state(selected)::part(root)。これらの要素に自分で設定した属性（[closable]、[disabled]）も安定したセレクターです。

アイテムのフックは操作に追従します：矢印キーで [data-highlighted] / item--highlighted が項目間を移動し、列をソートすると data-sort が切り替わり、トーストを閉じると退出アニメーション中に data-state="closed" になります。シャドウのパーツ名とカスタムステートはホストに属性を追加しないため、サーバーで描画したマークアップは不一致なくハイドレーションされます。

以下の例では、ハイライトされたメニュー項目、セレクトの選択済みオプション、現在のページ、ソート済みのテーブルヘッダー、成功トーストのスタイルを React と Web Components の両方で変更しています。

### カスケードレイヤー：@layer minerva

minerva-design/tokens.css、minerva-design/style.css、styles/*.css、minerva-design/tokens.css は @layer minerva で囲まれています。レイヤー外の CSS は詳細度や記述順に関係なくすべてのレイヤーに勝つので、!important なしでライブラリを上書きできます。アプリでレイヤーを使う場合は、どのスタイルシートよりも前に一度だけ順序を宣言してください。

注意：レイヤー外のグローバルなリセット（button { background: none }、normalize.css…）も Minerva のスタイルを上書きするようになります。上の例のように minerva より前のレイヤー（layer(reset)）に読み込んでください。

### ビジュアルルール：ボーダーとフォーカス

片側だけのボーダーは使いません：Minerva は一辺のストライプで状態を示しません（ハイライト項目の左アクセントバー、選択タブの下線ボーダー、アラートや引用ブロックのストライプ、片側の inset シャドウはありません）。インジケーターは完全な形状です：背景の塗り、全周のリング、角丸のピル、ドット。行やセクションの区切りは区切り形状（疑似要素または区切り要素が描く 1px の線）で、行の border-bottom ではありません。上書きするときも同じルールに従ってください。テーブルのグリッド線と Divider 要素自体だけが文書化された例外です。

ポインターでフォーカスした場合は枠線だけを変更し、太い外側の輪郭は追加しません。Tab、方向キー、コマンドショートカットでは2pxのキーボードフォーカスリングを1つ表示します。React、Vue、Angular、Web Componentsの入力系コンポーネントと複合フィールドで共通です。通常は --primary-color-text、エラー時は --danger-color-text を使います。--minerva-focus-* による上書きも可能です。幅を明示するとポインターフォーカスでもリングが表示されます。

Windowsのハイコントラストでは外側の枠にHighlightのシステム色を使います。内側の入力要素は輪郭を重ねません。この代替表示を維持し、アプリのリセットは先行するカスケードレイヤーに置いてください。

各フレームワークのコンポーネントは入力方式を自動管理します。独自DOMコントロールでは minerva-design/core の acquireFocusModality(document) を使用できます。戻り値はクリーンアップ関数です。同一ドキュメントでリスナーを共有し、最後の解放時に以前の内部スタイルを復元します。ブラウザーでマウントした後に要素の ownerDocument を渡し、破棄時に解放してください。公開フォーカス変数による設定が優先されます。

### 安定性ポリシー

フックの仕様は機械可読です：minerva-design/styling-hooks がマニフェスト（コンポーネント → パーツ → 状態とその値）をエクスポートし、ドキュメントはそこから生成されます。コントラクトテストはすべての React コンポーネントとカスタム要素をさまざまな状態で描画し、文書化されたフックが欠けている、または文書化されていないパーツが現れると失敗します。ロックファイル（styling-hooks.lock.json）は、意図して更新するまで仕様の変更をすべてビルドエラーにします。

マイナーリリース：コンポーネント、パーツ、状態（コンポーネントまたはアイテムの状態）、状態値の追加。

メジャーリリース：それらの削除・改名、または状態を別のパーツへ移すこと。

対象外：クラス名、フックのない要素の DOM 構造、内部への !important による上書き。

### 次のステップ

テーマ、パレット、デザイントークン。

Web Components のトークン、テーマ、ロケール。

プロジェクト名

Minerva Studio

リリース日

メールアドレス

完全なメールアドレスを入力してください。

読み取り専用ワークスペース

リリースノート

今回のリリースを説明…

クイックアクション

リリースを予約

日付をクリア

```css
/* 1. Design tokens: the whole app (or a theme scope) */
:root {
  --primary-color: #7c3aed;
  --radius-md: 10px;
}

/* 2. Component variables (listed on each component page)... */
.toolbar {
  --button-height: 32px;
}

/* 3. ...combined with hooks: variables for one variant / state */
[data-minerva="button"][data-variant="ghost"] {
  --button-radius: 999px;
}
minerva-button:state(variant-ghost) {
  --button-radius: 999px; /* variables inherit into the shadow root */
}
```

```css
/* component root */
[data-minerva="tabs"] { }
/* a part (also matches portalled parts: popups, dialogs) */
[data-minerva="select"][data-part="content"] { }
/* a part in a state */
[data-minerva="modal"][data-part="content"][data-state="open"] { }
/* a part of a component in a state (state on the root) */
[data-minerva="button"][data-loading] [data-part="spinner"] { }
```

```css
/* component: the tag */
minerva-tabs { }
/* a part: ::part() */
minerva-select::part(content) { }
/* states are custom states of the host: :state() */
minerva-modal:state(open)::part(content) { }
minerva-button:state(loading)::part(spinner) { }
minerva-button:state(size-small):state(variant-ghost) { }
```

```css
/* React: item states are attributes of the item element itself */
[data-minerva="menu"][data-part="item"][data-highlighted] { }
[data-minerva="menu"][data-part="item"][data-state="checked"] { }
[data-minerva="option"][data-selected] { }
[data-minerva="pagination"][data-part="item"][data-current] { }
[data-minerva="data-table"][data-part="header-cell"][data-sort="ascending"] { }
[data-minerva="toast-region"][data-part="toast"][data-color="success"] { }
/* the trigger of a menu (a native element child) while the menu is open */
[data-minerva="menu"][data-part="trigger"][data-state="open"] { }

/* Web components, items in the shadow root: <part>--<state> part names */
minerva-menu::part(item item--highlighted) { }
minerva-menu::part(item item--checked) { }
minerva-select::part(item item--selected) { }
minerva-pagination::part(item item--current) { }
minerva-data-table::part(header-cell header-cell--sort-ascending) { }
minerva-toast-region::part(toast toast--color-success) { }
minerva-upload::part(item item--status-error) { }

/* Web components, items that are elements of their own: :state() */
minerva-option:state(selected)::part(root) { }
minerva-tab:state(active)::part(root) { }
minerva-page-tab:state(current) { }
/* your slotted trigger, from the states of its host */
minerva-menu:state(open) > [slot="trigger"] { }
```

```css
/* The library ships inside @layer minerva: unlayered rules win,
   whatever their specificity or order */
.my-button {
  border-radius: 0; /* beats the library, no !important */
}

/* Layered app? Declare the order once, before any stylesheet */
@layer reset, minerva, app;

/* Tailwind CSS v4 */
@layer theme, base, minerva, components, utilities;

/* Unlayered resets now beat the library too: layer them */
@import url("modern-normalize.css") layer(reset);
```

```css
/* Default: pointer focus changes the border; keyboard navigation adds
   one 2px ring. The frame owns the indicator, including composed controls. */
.search-field {
  --input-focus-color: var(--success-color);
  --minerva-focus-ring-color: var(--success-color-text);
}

/* Optional explicit override: keeps a ring even for pointer focus.
   Prefer the automatic default for ordinary forms. */
.high-visibility {
  --minerva-focus-ring-width: 3px;
  --minerva-focus-border-color: var(--primary-color-text);
}

/* Keep the system-colored outline fallback in Windows High Contrast.
   Do not globally suppress :focus or add a second outline to inner inputs. */
```

```ts
import { acquireFocusModality } from "minerva-design/core";

// Custom DOM controls: acquire after mounting and release on teardown.
// Framework components already manage this lifecycle automatically.
export function mountCustomControl(element: HTMLElement) {
  const release = acquireFocusModality(element.ownerDocument);
  return () => release();
}
```

```ts
import { stylingHooks, wcSelector } from "minerva-design/styling-hooks";

stylingHooks.modal.parts; // overlay, content, header, description, body, footer, close-button
stylingHooks.modal.states; // { state: ["open", "closed"], size: [...] }
wcSelector("modal", "content", { state: "open" });
// "minerva-modal:state(open)::part(content)"
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

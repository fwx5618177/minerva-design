# スタイルのカスタマイズ

自分の CSS で Minerva のあらゆるコンポーネントのスタイルを変更する方法：デザイントークンと CSS 変数、公開された data-minerva / data-part / 状態フック、Web Components の ::part() と :state()、そして minerva カスケードレイヤー。

Package: minerva-design@1.23.0

Renderer: react

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "413e3d54e2177f8469c443a6547c4472e608839c",
  "sourceDigest": "sha256:8c8e874e213d698b4d05cabed92eed392c90c5b0fa91c66def67eab19184e86c",
  "referenceSourceDigest": "sha256:e694adbf6015cdc21809df819193e0a84c030845fb2910749dbd1c4c15ccca99"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

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

テキスト系コントロール（Input、Textarea、Select のトリガー、NumberInput、TagInput、AutoComplete、TimePicker、Cascader、JsonField、KeyValueEditor、Command の検索欄、Pagination の入力欄）のフォーカスは、ブラウザー標準のアウトラインを置き換えます：ボーダーがフォーカス色に変わり、box-shadow のリングがコントロールを囲みます。テキストフィールドはマウスを含むすべてのフォーカスで表示されます（:focus / :focus-within）。ボタンであるトリガーは :focus-visible を使います。リングの色はテーマの --focus-ring-color から取られ、パレットごとにライトとダークで調整されています。:root、テーマのスコープ、または個々のコントロールで下記の変数を設定してカスタマイズできます。

強制カラーモード（Windows ハイコントラスト）：box-shadow は描画されないため、すべてのフォーカスルールは outline: 2px solid transparent も設定します。システムがこのアウトラインを見えるシステムカラーで描くので、フォーカスが消えることはありません。リングを作り直すときも残してください。

### 安定性ポリシー

フックの仕様は機械可読です：minerva-design/styling-hooks がマニフェスト（コンポーネント → パーツ → 状態とその値）をエクスポートし、ドキュメントはそこから生成されます。コントラクトテストはすべての React コンポーネントとカスタム要素をさまざまな状態で描画し、文書化されたフックが欠けている、または文書化されていないパーツが現れると失敗します。ロックファイル（styling-hooks.lock.json）は、意図して更新するまで仕様の変更をすべてビルドエラーにします。

マイナーリリース：コンポーネント、パーツ、状態（コンポーネントまたはアイテムの状態）、状態値の追加。

メジャーリリース：それらの削除・改名、または状態を別のパーツへ移すこと。

対象外：クラス名、フックのない要素の DOM 構造、内部への !important による上書き。

### 次のステップ

テーマ、パレット、デザイントークン。

Web Components のトークン、テーマ、ロケール。

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
/* The focus ring of every text-like control. Unset by default: the
   ring falls back to the theme's --focus-ring-color (per palette, light
   and dark), a 3px width and --primary-color for the border */
:root {
  --minerva-focus-ring-width: 4px;
  --minerva-focus-border-color: var(--primary-color-text);
}

/* One control: component variables still win for the border */
.search-field {
  --input-focus-color: var(--success-color);
  --minerva-focus-ring-color: color-mix(in srgb, var(--success-color) 45%, transparent);
}

/* Restyling the ring yourself? Keep the transparent outline:
   forced colors (High Contrast) paint it, box-shadows are dropped */
[data-minerva="input"][data-part="root"]:focus-within {
  box-shadow: 0 0 0 2px var(--primary-color);
  outline: 2px solid transparent;
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

## Example: ハイライトされたメニュー項目

メニューを開いて矢印キーで移動すると、ハイライトされた項目に色付きの背景とバーが付き、チェック済み項目は太字、無効な項目には取り消し線が付きます。React のパネルはメニューの className でスコープし、Web Component は ::part(item item--highlighted) を使います。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/styling/demos/items-menu.tsx

```tsx
import { Button, HStack, Menu } from "minerva-design";
import "minerva-design/web-components";

const css = `
/* the highlighted item follows the keyboard (arrows) and the pointer
   (React: the panel is portalled, scope it with its className) */
.accent-menu [data-minerva="menu"][data-part="item"][data-highlighted],
minerva-menu.accent-menu::part(item item--highlighted) {
  background: color-mix(in srgb, var(--primary-color) 18%, transparent);
  color: var(--primary-color);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--primary-color) 40%, transparent);
}
/* checked checkbox / radio items, disabled items */
.accent-menu [data-minerva="menu"][data-part="item"][data-state="checked"],
minerva-menu.accent-menu::part(item item--checked) {
  font-weight: 600;
}
.accent-menu [data-minerva="menu"][data-part="item"][data-disabled],
minerva-menu.accent-menu::part(item item--disabled) {
  text-decoration: line-through;
}
`;

export default function ItemsMenu() {
  return (
    <HStack gap={16} wrap className="accent-menu-demo">
      <style>{css}</style>
      <Menu
        className="accent-menu"
        items={[
          { key: "edit", label: "Edit", shortcut: "⌘E" },
          { key: "copy", label: "Duplicate", shortcut: "⌘D" },
          {
            type: "checkbox",
            key: "pin",
            label: "Pinned",
            defaultChecked: true,
          },
          { key: "delete", label: "Delete", disabled: true },
        ]}
      >
        <Button color="neutral" variant="outline">
          React menu
        </Button>
      </Menu>
      <minerva-menu class="accent-menu">
        <minerva-button slot="trigger" color="neutral" variant="outline">
          Web Component menu
        </minerva-button>
        <minerva-menu-item value="edit" shortcut="⌘E">
          Edit
        </minerva-menu-item>
        <minerva-menu-item value="copy" shortcut="⌘D">
          Duplicate
        </minerva-menu-item>
        <minerva-menu-checkbox-item value="pin" checked>
          Pinned
        </minerva-menu-checkbox-item>
        <minerva-menu-item value="delete" disabled>
          Delete
        </minerva-menu-item>
      </minerva-menu>
    </HStack>
  );
}

```

## Example: 現在のページ

丸いページボタンで、現在のページはリング付き（[data-current] / item--current）、無効な前へ / 次へボタンは薄く表示されます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/styling/demos/items-pagination.tsx

```tsx
import { Pagination, VStack } from "minerva-design";
import "minerva-design/web-components";

const css = `
.ring-pages [data-minerva="pagination"][data-part="item"],
.ring-pages minerva-pagination::part(item) {
  border-radius: 999px;
}
/* the current page: aria-current="page" mirrored as a public hook */
.ring-pages [data-minerva="pagination"][data-part="item"][data-current],
.ring-pages minerva-pagination::part(item item--current) {
  background: transparent;
  color: var(--primary-color);
  box-shadow: inset 0 0 0 2px var(--primary-color);
  font-weight: 700;
}
.ring-pages [data-minerva="pagination"][data-part="item"][data-disabled],
.ring-pages minerva-pagination::part(item item--disabled) {
  opacity: 0.3;
}
`;

export default function ItemsPagination() {
  return (
    <VStack className="ring-pages" gap={16}>
      <style>{css}</style>
      <Pagination defaultCurrent={1} total={50} aria-label="React pages" />
      <minerva-pagination
        current={1}
        total={50}
        aria-label="Web Component pages"
      />
    </VStack>
  );
}

```

## Example: セレクトの選択済みオプション

選択済みのオプションは塗りつぶし、ハイライト中のものは破線の枠線。React のオプションは SelectItem コンポーネント（data-minerva="option"）、options プロパティから描画される Web Component は ::part(item item--selected) を公開し、<minerva-option> 子要素は自身の :state(selected) を使います。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/styling/demos/items-select.tsx

```tsx
import { HStack, Select, SelectItem } from "minerva-design";
import "minerva-design/web-components";

const options = [
  { value: "en", label: "English" },
  { value: "zh", label: "Chinese" },
  { value: "fr", label: "French" },
  { value: "ja", label: "Japanese", disabled: true },
];

const css = `
/* React options are SelectItem components: data-minerva="option" */
.bold-options [data-minerva="option"][data-selected],
minerva-select.bold-options::part(item item--selected),
minerva-option.bold-option:state(selected)::part(root) {
  background: var(--primary-color);
  color: #fff;
  font-weight: 600;
}
.bold-options [data-minerva="option"][data-highlighted]:not([data-selected]),
minerva-select.bold-options::part(item item--highlighted),
minerva-option.bold-option:state(highlighted)::part(root) {
  outline: 2px dashed var(--primary-color);
  outline-offset: -2px;
}
`;

export default function ItemsSelect() {
  return (
    <HStack gap={16} wrap>
      <style>{css}</style>
      <div style={{ width: 200 }}>
        <Select
          aria-label="Language (React)"
          defaultValue="zh"
          contentClassName="bold-options"
        >
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div style={{ width: 200 }}>
        {/* options property: items rendered in the shadow root (::part) */}
        <minerva-select
          class="bold-options"
          aria-label="Language (options property)"
          value="zh"
          options={options}
        />
      </div>
      <div style={{ width: 200 }}>
        {/* <minerva-option> children: elements of their own (:state) */}
        <minerva-select aria-label="Language (minerva-option)" value="zh">
          {options.map((option) => (
            <minerva-option
              key={option.value}
              class="bold-option"
              value={option.value}
              disabled={option.disabled || undefined}
            >
              {option.label}
            </minerva-option>
          ))}
        </minerva-select>
      </div>
    </HStack>
  );
}

```

## Example: ソート済みのテーブルヘッダー

ヘッダーをクリックしてソートすると、ソート中の列ヘッダーに下線が付き（data-sort / header-cell--sort-<direction>）、未ソートのソート可能なヘッダーは控えめに、選択した行は色付きになります。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/styling/demos/items-table.tsx

```tsx
import { Table, VStack, type TableColumn } from "minerva-design";
import "minerva-design/web-components";

interface Service {
  id: number;
  name: string;
  latency: number;
}

const services: Service[] = [
  { id: 1, name: "auth-api", latency: 42 },
  { id: 2, name: "billing", latency: 118 },
  { id: 3, name: "search", latency: 73 },
];

const columns: TableColumn<Service>[] = [
  { key: "name", header: "Service", sortable: true },
  {
    key: "latency",
    header: "Latency",
    align: "right",
    sortable: (a, b) => a.latency - b.latency,
  },
];

const css = `
/* sorted column header: data-sort / header-cell--sort-<direction> */
.sorted-headers [data-minerva="data-table"][data-part="header-cell"][data-sort="ascending"],
.sorted-headers [data-minerva="data-table"][data-part="header-cell"][data-sort="descending"],
.sorted-headers minerva-data-table::part(header-cell header-cell--sort-ascending),
.sorted-headers minerva-data-table::part(header-cell header-cell--sort-descending) {
  color: var(--primary-color);
  box-shadow: inset 0 -3px 0 var(--primary-color);
}
.sorted-headers [data-minerva="data-table"][data-part="header-cell"][data-sort="none"],
.sorted-headers minerva-data-table::part(header-cell header-cell--sort-none) {
  color: var(--text-secondary-color);
}
/* selected rows */
.sorted-headers [data-minerva="data-table"][data-part="row"][data-selected] [data-part="cell"],
.sorted-headers minerva-data-table::part(row row--selected) {
  background: color-mix(in srgb, var(--primary-color) 12%, transparent);
}
`;

export default function ItemsTable() {
  return (
    <VStack className="sorted-headers" gap={24}>
      <style>{css}</style>
      <Table
        aria-label="Services (React)"
        columns={columns}
        data={services}
        rowKey={(row) => row.id}
        defaultSortState={{ key: "latency", order: "ascend" }}
        rowSelection={{ defaultSelectedRowKeys: [2] }}
      />
      <minerva-data-table
        aria-label="Services (Web Component)"
        row-key="id"
        columns={columns}
        rows={services}
        sortState={{ key: "latency", order: "ascend" }}
        selectable
        selectedRowKeys={[2]}
      />
    </VStack>
  );
}

```

## Example: 成功トースト

成功トーストには緑の枠線と背景が付き、閉じかけのトーストは data-state="closed" / toast--closed の間薄くなります。React のトーストはポータルで描画されますが、複合セレクターで一致します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/styling/demos/items-toast.tsx

```tsx
import { useRef } from "react";
import { Button, HStack, ToastProvider, toast } from "minerva-design";
import "minerva-design/web-components";

type Region = HTMLElement & {
  toast: { success: (title: string) => void; info: (title: string) => void };
};

const css = `
/* React toasts are portalled to the toast region: the compound selector
   matches them wherever they render */
[data-minerva="toast-region"][data-part="toast"][data-color="success"],
minerva-toast-region.success-toasts::part(toast toast--color-success) {
  /* a full outline, not a one-sided stripe */
  border-color: var(--success-color);
  box-shadow: inset 0 0 0 1px var(--success-color);
  background: var(--success-color-subtle);
}
/* leaving toast (data-state="closed" during its exit animation) */
[data-minerva="toast-region"][data-part="toast"][data-state="closed"],
minerva-toast-region.success-toasts::part(toast toast--closed) {
  opacity: 0.4;
}
`;

export default function ItemsToast() {
  const region = useRef<Region>(null);
  return (
    <HStack gap={8} wrap>
      <style>{css}</style>
      {/* mount one ToastProvider near the root of an app */}
      <ToastProvider position="bottom-right" />
      <Button color="success" onClick={() => toast.success("Saved (React)")}>
        React success toast
      </Button>
      <Button
        color="success"
        variant="outline"
        onClick={() => region.current?.toast.success("Saved (Web Component)")}
      >
        Web Component success toast
      </Button>
      <minerva-toast-region
        ref={region}
        class="success-toasts"
        position="bottom-left"
      />
    </HStack>
  );
}

```

## Example: Button のスタイル変更

--button-* 変数によるピル型ボタン、太い outline バリアント、大文字のラベル、読み込み中に色付きのスピナー：1 行目は React（data-* フック）、2 行目は <minerva-button>（::part() / :state()）。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/styling/demos/restyle-button.tsx

```tsx
import { Button, HStack, VStack } from "minerva-design";
import "minerva-design/web-components";

// Plain, unlayered CSS: it wins over the library (inside @layer minerva)
// without !important. Variables and hooks combine.
const css = `
.pill-buttons [data-minerva="button"][data-part="root"],
.pill-buttons minerva-button {
  --button-radius: 999px;
  --button-padding-x: 20px;
}
.pill-buttons [data-minerva="button"][data-part="root"][data-variant="outline"] {
  border-width: 2px;
}
.pill-buttons minerva-button:state(variant-outline)::part(root) {
  border-width: 2px;
}
.pill-buttons [data-minerva="button"][data-part="label"],
.pill-buttons minerva-button::part(label) {
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.pill-buttons [data-minerva="button"][data-loading] [data-part="spinner"],
.pill-buttons minerva-button:state(loading)::part(spinner) {
  color: var(--warning-color);
}
`;

export default function RestyleButton() {
  return (
    <VStack className="pill-buttons" gap={12}>
      <style>{css}</style>
      <HStack gap={8} wrap>
        <Button>React</Button>
        <Button variant="outline">Outline</Button>
        <Button loading variant="ghost">
          Saving
        </Button>
      </HStack>
      <HStack gap={8} wrap>
        <minerva-button>Web Component</minerva-button>
        <minerva-button variant="outline">Outline</minerva-button>
        <minerva-button loading variant="ghost">
          Saving
        </minerva-button>
      </HStack>
    </VStack>
  );
}

```

## Example: Modal のスタイル変更

ぼかしたオーバーレイ、枠線付きのパネル、開いている間だけ色付きのタイトル。React のパネルは <body> にポータルされますが、複合セレクター [data-minerva][data-part] で一致します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/styling/demos/restyle-modal.tsx

```tsx
import {
  Button,
  HStack,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalRoot,
  ModalTrigger,
} from "minerva-design";
import "minerva-design/web-components";

// The React content is portalled to <body>: the compound selector
// [data-minerva][data-part] matches it wherever it renders (a class on the
// trigger's container would not).
const css = `
[data-minerva="modal"][data-part="overlay"].glass-overlay,
minerva-modal.glass::part(overlay) {
  backdrop-filter: blur(6px);
}
[data-minerva="modal"][data-part="content"].glass-content,
minerva-modal.glass::part(content) {
  border: 1px solid var(--primary-color);
  box-shadow: 0 24px 48px color-mix(in srgb, var(--primary-color) 25%, transparent);
}
[data-minerva="modal"][data-part="content"][data-state="open"].glass-content [data-part="header"],
minerva-modal.glass:state(open)::part(header) {
  color: var(--primary-color);
}
`;

export default function RestyleModal() {
  return (
    <HStack gap={8} wrap>
      <style>{css}</style>
      <ModalRoot>
        <ModalTrigger asChild>
          <Button variant="outline">React modal</Button>
        </ModalTrigger>
        <ModalContent
          className="glass-content"
          overlayClassName="glass-overlay"
        >
          <ModalHeader>Restyled with hooks</ModalHeader>
          <ModalBody>
            The overlay, panel and title are styled from the page.
          </ModalBody>
        </ModalContent>
      </ModalRoot>
      <minerva-modal class="glass" label="Restyled with hooks">
        <minerva-button slot="trigger" variant="outline">
          Web Component modal
        </minerva-button>
        The overlay, panel and title are styled from the page.
      </minerva-modal>
    </HStack>
  );
}

```

## Example: Table のスタイル変更

データテーブルのパーツで大文字のヘッダーセルとホバー行のハイライトを実現し、React では縞模様の行も追加します（::part() は :hover などのユーザー操作の疑似クラスのみ受け付け、:nth-child は使えません）。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/styling/demos/restyle-table.tsx

```tsx
import { Table, VStack, type TableColumn } from "minerva-design";
import "minerva-design/web-components";

interface Book {
  id: number;
  title: string;
  author: string;
  score: number;
}

const books: Book[] = [
  { id: 1, title: "Dune", author: "Frank Herbert", score: 9.1 },
  { id: 2, title: "Solaris", author: "Stanisław Lem", score: 8.7 },
  { id: 3, title: "Hyperion", author: "Dan Simmons", score: 8.9 },
];

const columns: TableColumn<Book>[] = [
  { key: "title", header: "Title" },
  { key: "author", header: "Author" },
  { key: "score", header: "Score", align: "right" },
];

const css = `
.ledger [data-minerva="data-table"][data-part="header-cell"],
.ledger minerva-data-table::part(header-cell) {
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-size: 12px;
  color: var(--primary-color);
}
/* ::part() only takes user-action pseudo-classes (:hover, :focus-visible...):
   keep structural ones (:nth-child) in a React-only rule */
.ledger [data-minerva="data-table"][data-part="row"]:nth-child(even) [data-part="cell"] {
  background: color-mix(in srgb, var(--primary-color) 6%, transparent);
}
.ledger [data-minerva="data-table"][data-part="row"]:hover [data-part="cell"],
.ledger minerva-data-table::part(row):hover {
  background: color-mix(in srgb, var(--primary-color) 14%, transparent);
}
`;

export default function RestyleTable() {
  return (
    <VStack className="ledger" gap={24}>
      <style>{css}</style>
      <Table
        aria-label="Books (React)"
        columns={columns}
        data={books}
        rowKey={(book) => book.id}
      />
      <minerva-data-table
        aria-label="Books (Web Component)"
        row-key="id"
        columns={columns}
        rows={books}
      />
    </VStack>
  );
}

```

## Example: Tabs のスタイル変更

タブの状態フックで、角丸のピル型タブ、色付きで全周に枠線のあるアクティブタブ、控えめな無効タブを実現します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/styling/demos/restyle-tabs.tsx

```tsx
import { Tab, TabList, TabPanel, Tabs, VStack } from "minerva-design";
import "minerva-design/web-components";

const css = `
/* Library rule: no one-sided borders. The active tab is a full shape (a
   tinted pill with a full ring), not an underline. */
.pill-tabs [data-minerva="tabs"][data-part="list"],
.pill-tabs minerva-tabs::part(list) {
  gap: 4px;
}
.pill-tabs [data-minerva="tab"][data-part="root"],
.pill-tabs minerva-tab::part(root) {
  border-radius: 999px;
  font-weight: 500;
}
.pill-tabs [data-minerva="tab"][data-state="active"],
.pill-tabs minerva-tab:state(active)::part(root) {
  color: var(--primary-color-text);
  background: var(--primary-color-subtle);
  box-shadow: inset 0 0 0 1px var(--primary-color);
}
.pill-tabs [data-minerva="tab"][data-disabled],
.pill-tabs minerva-tab:state(disabled)::part(root) {
  opacity: 0.4;
}
`;

export default function RestyleTabs() {
  return (
    <VStack className="pill-tabs" gap={24}>
      <style>{css}</style>
      <Tabs defaultValue="overview" variant="soft">
        <TabList aria-label="React tabs">
          <Tab value="overview">Overview</Tab>
          <Tab value="activity">Activity</Tab>
          <Tab value="archive" disabled>
            Archive
          </Tab>
        </TabList>
        <TabPanel value="overview">React: data-* hooks</TabPanel>
        <TabPanel value="activity">Activity</TabPanel>
        <TabPanel value="archive">Archive</TabPanel>
      </Tabs>
      <minerva-tabs value="overview" variant="soft" label="Web Component tabs">
        <minerva-tab value="overview">Overview</minerva-tab>
        <minerva-tab value="activity">Activity</minerva-tab>
        <minerva-tab value="archive" disabled>
          Archive
        </minerva-tab>
        <minerva-tab-panel value="overview">
          Web Components: ::part() and :state()
        </minerva-tab-panel>
        <minerva-tab-panel value="activity">Activity</minerva-tab-panel>
        <minerva-tab-panel value="archive">Archive</minerva-tab-panel>
      </minerva-tabs>
    </VStack>
  );
}

```

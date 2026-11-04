# Web Components

Minerva のコンポーネント一式を標準のカスタム要素として提供します。素の HTML、Vue、Angular、Svelte、Solid、React など、あらゆるフレームワークで使えます。

Package: minerva-design@1.20.5

Renderer: angular

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.5",
  "sourceCommit": "fe15b45f84b480cdd9cfec147df037927ba34a6b",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:0dc58bd28a1a59067b94630bd49c5b94d839bdc57ee30a0eaa7de1d0a9681cfb"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.5/types.json) or getType() from minerva-design/contracts.

## Documentation

### 概要

minerva-design/web-components は、Minerva のすべてのコンポーネントを Lit で構築した標準のカスタム要素（、、...）として実装しています。一度登録すれば、要素は組み込みの HTML タグと同じように振る舞います。静的なページでも、サーバーレンダリングされたテンプレートでも、HTML を描画するあらゆるフレームワークでも動作します。

これらは React コンポーネントのラッパーではありません。同じ DOM 構造を描画し、同じスタイルシートを shadow root 内にコンパイルするため、見た目は同一で、同じデザイントークンを読み取り、同じ ---* CSS 変数を公開します。キーボードとフォーカスの挙動（フォーカススコープ、閉じられるレイヤーのスタック、ロービングフォーカス、タイプアヘッド、位置計算）は同じ minerva-design/core プリミティブに基づいており、ARIA のロールと状態も同じです。

API は React の用語に従っています。color、variant、size、disabled、open、value... は属性およびプロパティになり、ReactNode のプロパティはスロットに、コールバックは minerva-* イベントになります。フォームコントロールはネイティブの  に参加します。

### インストール

パッケージは ESM のみで、peer 依存はありません。Lit、minerva-design/core（Floating UI を含む）、DOMPurify、jsonc-parser は通常の依存関係です。React は不要です。

### 要素の読み込み

バンドラーを使う場合は、パッケージを一度（たとえばエントリーファイルで）インポートすると、すべての要素が登録されます：

バンドルを小さくしたい場合は、要素ごとのエントリーをインポートします。各エントリーは、その要素とそのパーツ、およびその要素が描画する Minerva 要素だけを登録します。それ以外にモジュールは副作用を持たないため、使われていない要素がバンドルに含まれることはありません。同じ要素を 2 回インポートしても（あとからオールインワンのエントリーをインポートしても）問題ありません。

ビルドステップなしで使う場合は、自己完結型のバンドルを CDN から module スクリプトで読み込みます。すべての要素、Lit、minerva-design/core を含み、minify されています：

本番環境では CDN の URL でバージョンを固定してください。自分でホストしたい場合、このバンドルは ./cdn エクスポート（minerva-design/web-components/cdn）としても公開されています。

### デザイントークン

要素は自身のスタイルを持っています（CSS は shadow root 内にあります）が、デザイントークン（--primary-color、--radius-md、--space-2 など）はページから読み取ります。minerva-design/tokens.css を、スタイルシートの link または CSS のインポートで一度だけ読み込んでください。これは minerva-design/tokens.css と同じファイルです。ページですでに minerva-design/style.css を読み込んでいる場合（React と Web Components を併用する場合）は、トークンはすでに読み込まれています。テーマ、パレット、コンポーネントごとの変数については「テーマ」を参照してください。

### 属性とプロパティ

すべてのオプションはプロパティ（camelCase、任意の JavaScript 値）であり、文字列・数値・真偽値の場合は属性（kebab-case：full-width、close-label、activation-mode）にもなります。ブール属性は指定されていれば有効です。React での既定値が true のオプションは反転した名前になります（hide-close-button、no-loop）。状態を表す属性（open、disabled、variant、size、color、checked...）は反映されるため、CSS で選択できます。配列、オブジェクト、関数（options、items、columns、レンダーコールバック）はプロパティとしてのみ指定できます。

フォームコントロールはネイティブの input に倣います。value（または checked）属性は初期値で form.reset() で復元され、value / checked プロパティは現在の値です。スクリプトから値を変更するにはプロパティを設定します。

### イベント

要素はユーザーの操作を minerva- という名前の CustomEvent で通知します。イベントはバブリングし、composed である（shadow root を越える）ため、新しい状態を event.detail に格納して伝えます：

minerva-change：値の変更が確定しました（{ value }、チェックボックスとスイッチでは { checked, value }）。

minerva-input：ユーザーの入力中に値が変化しています（{ value }）。

minerva-open-change：ユーザーがポップアップの開閉を要求しました（{ open, ... }）。キャンセル可能で、preventDefault() を呼ぶと現在の状態が維持されます。これは React における制御された open プロパティに相当します。タブの選択変更もキャンセル可能です。

より具体的なイベントも同じ命名規則に従います：minerva-select、minerva-close、minerva-clear、minerva-page-change、minerva-sort-change、minerva-selection-change、minerva-after-open、minerva-after-close... 各コンポーネントのページに、その要素のイベントが一覧されています。

要素がネイティブのコントロールに相当する場合、ネイティブイベントは本来の意味を保ちます：click、focus、blur、input、change（ホスト上で再ディスパッチされます）。

スクリプトからプロパティを設定してもイベントは発火しません。イベントは常にユーザーの操作を意味するため、状態を要素に同期してもループすることはありません。

### スロットとパーツ

リッチなコンテンツはスロットに入れます。メインのコンテンツには既定のスロットを、React コンポーネントが ReactNode を受け取る箇所には名前付きスロット（slot="footer"、"prefix"、"start"、"icon"...）を使います。要素は主要な内部構造を CSS パーツ（root、label、content、item、input……）として公開しており、内部のクラス名に依存せずに ::part() でページからスタイルを指定できます。スロットとパーツは各コンポーネントのページに一覧されています。

### TypeScript とエディターのサポート

すべての要素クラスは自身を HTMLElementTagNameMap に追加するため、document.querySelector と createElement は正しい型を返します。クラスとその文字列リテラルのユニオン型はパッケージからエクスポートされています。

フレームワークのテンプレート向けの型定義は Custom Elements Manifest（custom-elements.json。これも公開されています）から生成されており、React、Vue、Svelte、Solid のテンプレートで属性・プロパティ・イベントが型チェックされます。お使いのフレームワークに対応するファイルを一度参照してください：

```tsx
素の HTML ファイルでは、同梱の HTML カスタムデータを VS Code に指定すると、ドキュメント付きでタグと属性の補完が得られます：
```

### React 19 から使う

React 19 はカスタム要素をネイティブにサポートしています。要素に存在するプロパティはプロパティとして設定され（そのため真偽値、配列、オブジェクトはそのまま動作します）、on + イベント名のプロパティ（例：onminerva-change）はカスタムイベントを購読します。onClick などの標準イベントはネイティブ要素と同様に動作します。

React アプリでは通常、minerva-design の React コンポーネントの方が適しています。カスタム要素は、同じウィジェットを React 以外のコード（マイクロフロントエンド、CMS コンテンツ、サーバーテンプレート）と共有する場合に役立ちます。

### サーバーサイドレンダリング

モジュールは Node（Next.js、Nuxt、SvelteKit、Angular SSR、Astro...）でインポートできます。インポート時に DOM には一切触れず、defineElement() は冪等で、customElements レジストリのない環境では何もしません。要素は事前レンダリングされません（宣言的 shadow DOM は使いません）。サーバーは属性と light DOM のコンテンツを持つタグを送信し、定義が読み込まれるとブラウザがそれらをアップグレードします。

サーバーでレンダリングされたマークアップは、hydrateRoot() より前に要素を登録しても不一致なくハイドレーションされます。複合要素の子（タブとパネル、ラジオ、オプション）は、自身が書き込むホスト属性（ロービング tabindex、生成される id、aria-controls / aria-labelledby、slot、hidden、data-state）を次のアニメーションフレームとアイドル期間の後まで遅らせます。スクリプトで作成された要素はすぐに書き込みます。

スタイルが適用されていないコンテンツのちらつきを避けるには、:not(:defined) で未定義の要素を非表示にします。

### 開発時の警告

無効な属性の組み合わせやよくある間違い（どのオプションにも一致しない value、max より大きい min、aria-label のないアイコンのみのボタン、パッケージの二重読み込み...）は、メッセージごとに一度だけ console.error で報告されます（React コンポーネントの警告や React 自身の prop 警告と同じチャネル）。形式は React 版と同じ "[minerva] : message" です。これらのチェックは process.env.NODE_ENV !== "production" で囲まれており、バンドラーがこれを置換するため本番ビルドでは除去されます。バンドラーを使わない場合（CDN ビルドや、process が存在しない環境で読み込まれたモジュール）は警告は無効です。

### 独自の要素を作成する

Minerva 要素の構成部品はエクスポートされているため、独自のカスタム要素でもその規約、テーマスコープ、アクセシビリティの挙動を共有できます：

defineElement(Class)：要素とその静的な依存関係を登録します。冪等で、開発時に別のクラスがすでにタグを所有していると警告し、customElements がない環境では何もしません。

emit(target, name, detail, { cancelable })：バブリングし composed な minerva-* の CustomEvent をディスパッチし、リスナーが preventDefault() を呼んだ場合は false を返します。

MinervaElement：LitElement の基底クラスです（static tagName、static dependencies、this.emit()）。

hostStyles：共通の :host ルールです（box-sizing、hidden 属性、.visually-hidden ヘルパー）。

FormAssociatedElement：ElementInternals に基づくフォームコントロールの基底クラスです（name、disabled、required、validity、カスタムバリデーション、リセット、fieldset、状態の復元）。

LocaleController：コアのトランスレーターを通じて組み込みテキストを提供します（this.locale.t("modal.close")）。lang と  に従います。

resolveLanguage(element)：要素のスコープでサポートされている言語を返します。

AriaController：aria-label / aria-labelledby / aria-describedby と  をホストから内部のコントロールに転送します（id は shadow root を越えられないため）。

HasSlotController：名前付きスロットにコンテンツがあるかを判定し、空のラッパーを省けるようにします。

コアプリミティブを利用した Lit コントローラー：FloatingLayerController（アンカー付きポップアップ：位置計算、閉じられるレイヤー、任意のフォーカススコープ）、AnchoredPositionController、DismissableLayerController、FocusScopeController、ModalController（スクロールロックと他要素の非表示）、RovingFocusController、TypeaheadController。

popoverResetStyles：トップレイヤーに描画される popover="manual" パネルの UA スタイルをリセットします。

### 1 つのページで、すべてのフレームワーク

各コンポーネントページにはフレームワークセレクター（React、Vue、Angular、Svelte、Solid、HTML）があり、選択はサイト全体と ?framework= リンクに保持されます。Vue・Angular・Svelte・Solid・HTML の例は本物のカスタム要素を実行します。そのソースはビルド時に、ページの Web Component デモ（HTML とその setup スクリプト）から決定的なトランスフォーマーで生成されるため、どのフレームワークでも同じテスト済みの例が表示されます：

root.querySelector("#id") → 要素参照：Vue では ref()、Angular では #ref + @ViewChild、Svelte では bind:this、Solid では ref={el}。

el.addEventListener("minerva-change", handler) → テンプレートのリスナー：@minerva-change、(minerva-change)、onminerva-change、on:minerva-change。対応する removeEventListener は削除され、フレームワークが解除します。

setup 内の el.items = [...] → プロパティバインド：:items.prop、[items]、items={…}、prop:items={…}。

textContent（または  の value）だけで書き込まれる要素 → テンプレートに描画されるリアクティブな状態（ref、フィールド、$state、シグナル）。

その他の宣言はコンポーネントの状態と関数になり、その他の文はマウント時（onMounted、ngAfterViewInit、onMount）に、クリーンアップの残りはアンマウント時に実行されます。プレーンな HTML はスクリプトをそのまま使い、デモのルートの代わりに document を使います。

ルールで表現できないコードは元の setup 関数のまま残り、マウント時にコンテナ参照で呼び出されるため、生成された例は常に正しく動作します。

### ガイド

```ts
// main.ts: every element (Vite, webpack, Rspack, esbuild...)
import "minerva-design/web-components";
import "minerva-design/tokens.css";
```

```ts
// only what you use: each entry registers one element (and its parts,
// e.g. <minerva-option> with <minerva-select>) plus the Minerva elements it renders
import "minerva-design/web-components/button";
import "minerva-design/web-components/select";
import "minerva-design/web-components/modal";
```

```html
<!-- no build step: a self-contained ES module (Lit and minerva-design/core included) -->
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/minerva-design@0/dist/core/tokens.css"
/>
<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/minerva-design@0/dist/web-components/cdn/minerva.js"
></script>
<!-- unpkg works too: https://unpkg.com/minerva-design@0/dist/web-components/cdn/minerva.js -->
```

```html
<!-- attributes: strings, kebab-case; booleans are on when present -->
<minerva-input name="email" type="email" placeholder="you@example.com" clearable required></minerva-input>
<minerva-button color="danger" variant="outline" full-width>Delete</minerva-button>

<script type="module">
  const input = document.querySelector("minerva-input");
  input.value = "ada@example.com"; // properties: camelCase, any type
  input.disabled = true;

  // data (arrays, objects, functions) is set as a property only
  document.querySelector("minerva-select").options = [
    { value: "free", label: "Free" },
    { value: "pro", label: "Pro" },
  ];
</script>
```

```ts
const select = document.querySelector("minerva-select");
const output = document.querySelector("#plan-output");

// committed value change: bubbles and crosses shadow roots (composed)
select.addEventListener("minerva-change", (event) => {
  output.textContent = `Plan: ${event.detail.value}`;
});

// "controlled" pattern: open-change events are cancelable
const modal = document.querySelector("minerva-modal");
modal.addEventListener("minerva-open-change", (event) => {
  if (!event.detail.open && hasUnsavedChanges()) {
    event.preventDefault(); // the modal stays open
  }
});
```

```html
<minerva-modal label="Delete project?">
  <p>This cannot be undone.</p>
  <div slot="footer">
    <minerva-button variant="ghost">Cancel</minerva-button>
    <minerva-button color="danger">Delete</minerva-button>
  </div>
</minerva-modal>

<style>
  /* style the parts an element exposes (::part) in its states (:state) */
  minerva-modal:state(open)::part(content) {
    border-radius: 24px;
  }
  minerva-input::part(input) {
    font-variant-numeric: tabular-nums;
  }
</style>
```

```ts
// every element is in HTMLElementTagNameMap: querySelector is typed
const select = document.querySelector("minerva-select"); // MinervaSelect | null
const output = document.querySelector("output"); // HTMLOutputElement | null
select?.addEventListener("minerva-change", () => {
  if (output) output.value = select.value; // string
});

// element classes and their string-literal unions are exported
import type { MinervaButton, ButtonVariant } from "minerva-design/web-components";
```

```ts
// React 19 (global.d.ts)
/// <reference types="minerva-design/web-components/react" />

// Svelte 5 (src/app.d.ts)
/// <reference types="minerva-design/web-components/svelte" />

// Solid (global.d.ts)
/// <reference types="minerva-design/web-components/solid" />

// Vue / Volar (tsconfig.json)
{ "compilerOptions": { "types": ["minerva-design/web-components/vue"] } }
```

```json
// .vscode/settings.json: completion and hover docs in .html files
{
  "html.customData": [
    "./node_modules/minerva-design/dist/web-components/html-custom-data.json"
  ]
}
```

```tsx
// global.d.ts
/// <reference types="minerva-design/web-components/react" />

// Settings.tsx
import { useState } from "react";
import "minerva-design/web-components/switch";

export function Settings() {
  const [on, setOn] = useState(false);
  return (
    <minerva-switch
      label="Email notifications"
      checked={on} // a property: React 19 passes it as is
      onminerva-change={(e: CustomEvent<{ checked: boolean }>) =>
        setOn(e.detail.checked)
      }
    />
  );
}
```

```ts
// Safe on the server: nothing touches the DOM when the module loads, and
// defineElement() skips registration when there is no customElements registry.
import "minerva-design/web-components";

// The markup is sent as is and upgraded in the browser:
// :where(minerva-select, minerva-tabs):not(:defined) { visibility: hidden; }
```

```ts
// Logged in development only, once per message:
// [minerva] <minerva-tabs>: value "billing" does not match any <minerva-tab>.

// Vite, webpack, Rollup (+ replace) and esbuild (define) replace
// process.env.NODE_ENV: production bundles drop the checks and messages.
// The CDN bundle is built for production: no warnings.
```

```ts
import { html, css } from "lit";
import {
  MinervaElement,
  RovingFocusController,
  defineElement,
  hostStyles,
} from "minerva-design/web-components";

/** A toolbar: one Tab stop, arrow keys / Home / End move between buttons. */
export class AppToolbar extends MinervaElement {
  static override tagName = "app-toolbar";
  static override styles = [
    hostStyles,
    css`
      :host {
        display: flex;
        gap: var(--space-2, 8px);
      }
    `,
  ];

  // core's createRovingFocus, attached / destroyed with the element
  private readonly roving = new RovingFocusController(this, () => ({
    getItems: () => [...this.querySelectorAll<HTMLElement>("minerva-button")],
    orientation: "horizontal",
  }));

  override connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "toolbar");
  }

  protected override firstUpdated() {
    this.roving.attach(this);
  }

  protected override render() {
    return html`<slot @slotchange=${() => this.roving.refresh()}></slot>`;
  }
}

defineElement(AppToolbar); // idempotent, no-op without customElements
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

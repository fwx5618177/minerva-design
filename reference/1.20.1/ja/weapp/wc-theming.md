# Web Components のテーマ

<minerva-config> または通常の属性によるデザイントークン、テーマ、パレット、デザインプリセット。ネストしたスコープ、コンポーネントごとの CSS 変数、::part()、ロケール。

Package: minerva-design@1.20.1

Renderer: weapp

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.1",
  "sourceCommit": "d476a62793c47d802249dc9c5c91638ffe4210db",
  "sourceDigest": "sha256:2862a9e3a864c9423aed5d287db6fac7e8ddf58b9f5d144c61e7ff4a2630890e",
  "referenceSourceDigest": "sha256:172bbd44559732b657f1ae386911a43aedaffcdf4f5ab90b220a3f9b56302a2f"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.1/types.json) or getType() from minerva-design/contracts.

## Documentation

### デザイントークン

すべての要素はデザイントークン（色、余白、角丸、影、フォント、コントロールの高さ）を CSS カスタムプロパティとして読み取ります。これらは shadow root 内にも継承されます。tokens.css を一度だけ読み込んでください。このファイルは :root にライトテーマを定義し、下記の属性に応じてトークンを切り替えるルールを含みます。minerva-design/tokens.css と同じファイルで、minerva-design/style.css にも含まれているため、1 つのページ上の React と Web Components は同じテーマを共有します。

### テーマ属性

テーマは tokens.css が読み取る属性で指定します：data-theme（light または dark）、data-palette、data-density、data-radius、data-shadow、data-font-scale。 に指定する場合はスクリプトが一切不要なので、サーバーでの描画も簡単です：

 より下の要素に指定する場合は、属性を持つ要素に data-minerva-theme-scope も追加してください。派生トークン（ホバー、subtle、ボーダーの色調、フォーカスリング...）は基本色が宣言された場所で計算されるため、この属性によってそのスコープで再計算されます。 はこれを自動で行います。

### <minerva-config>

 は ConfigProvider に対応する Web Component です。display: contents として描画され、テーマ属性を自身（コンテンツのスコープ）に、または root を指定した場合は  に書き込みます。スコープはネストでき、最も近いものが優先されます：

属性

値

ライト、ダーク、OS に追従、または github-dark テーマ。未指定の場合は外側のスコープから継承します。

カラーパレット。ライトとダークのバリアントがあります。

デザインプリセット。密度、角丸、影、フォントスケールをまとめて設定します（palette が指定されていなければパレットも設定します）。

余白とコントロールの高さ。プリセットを上書きします。

角丸のスケール。プリセットを上書きします。

エレベーションの影。プリセットを上書きします。

文字サイズのスケール。プリセットを上書きします。

内側の要素の組み込みテキスト（閉じるボタン、空の状態、検証メッセージ...）の言語。

要素のサブツリーではなく、（lang を含むページ全体）にすべてを適用します。

minerva-theme-change は、解決されたライト／ダークモードが変わったときに発火します（theme="system" で OS の設定が切り替わったときも含みます）。resolvedMode は現在のモードを返します：

### ダークモード

theme="system" は prefers-color-scheme に追従し、リアルタイムに更新されます。ユーザーに選ばせるには、独自のコントロールから theme を light、dark、system のいずれかに設定し、選択内容を保存します。 を使わない場合は、 の data-theme="dark" を切り替えると既定のダークテーマに切り替わります。ライトテーマが一瞬表示されるのを避けるには、ページの描画前にサーバーまたはインラインスクリプトで属性を書き込んでください。

### ::part() と :state() による内部のスタイル指定

要素は主要な内部構造を CSS パーツ（root、label、content、overlay、list、item、input、control…）として、状態をカスタムステート（:state(open)、:state(disabled)、:state(size-small)…）として公開しています。名前は React コンポーネントの data-part や data-* フックと同じです。内部のクラス名と違い、これらは公開 API です。各コンポーネントページの「スタイリングフック」に一覧があり、語彙全体は「スタイルのカスタマイズ」を参照してください。

### オーバーレイはスコープ内にとどまる

ポップアップ（セレクトのリストボックス、ポップオーバー、ツールチップ、メニュー）とダイアログは、 の末尾に移動されるのではなく、要素自身の shadow root 内に描画され、Popover API によってトップレイヤーに表示されます。記述した場所の DOM ツリーにとどまるため、トークン、テーマスコープ、ロケール、独自の CSS 変数を継承し、祖先の overflow: hidden や z-index によって切り取られたり覆われたりすることはありません。Popover API に対応していないブラウザでは fixed による配置にフォールバックします。

### 言語

組み込みテキストと検証メッセージは、最も近い  に従い、なければ最も近い lang 属性（shadow root を越えて探索）、それもなければ英語になります。英語、中国語、日本語、フランス語をサポートしており、地域付きのタグは言語に縮約されます（fr-CA はフランス語を使います）。lang や locale を変更すると要素は即座に更新されます。要素が属性から表示するテキスト（ラベル、プレースホルダー、close-label...）の翻訳は利用者側で行ってください。

### 次のステップ

内蔵テーマ、すべてのデザイントークン、独自テーマ。

パレットとデザインプリセットの詳細。

```html
<link rel="stylesheet" href="/node_modules/minerva-design/dist/core/tokens.css" />
<!-- or, with a bundler -->
<script type="module">
  import "minerva-design/tokens.css";
</script>
```

```html
<!-- the attributes work on <html> (whole page) without any script -->
<html lang="fr" data-theme="dark" data-palette="cool" data-density="compact" data-radius="large">
```

```html
<minerva-config theme="system" palette="tech" design="editorial" locale="ja" root>
  <!-- root: the attributes go on <html>, for the whole page -->
</minerva-config>

<!-- nested scopes: the closest one wins -->
<minerva-config theme="light">
  <minerva-button>Light</minerva-button>

  <minerva-config theme="dark" palette="graphite" density="compact">
    <minerva-button>Dark, graphite, compact</minerva-button>
  </minerva-config>
</minerva-config>
```

```ts
const config = document.querySelector("minerva-config");
const status = document.querySelector("#theme-status");
config.addEventListener("minerva-theme-change", (event) => {
  // "light" | "dark", e.g. when the OS switches
  status.textContent = `${event.detail.mode} mode`;
});
config.resolvedMode; // the mode currently applied
```

```css
/* the same --<component>-* variables as the React components,
   on the element, any ancestor or :root */
.toolbar minerva-button {
  --button-radius: 999px;
  --button-padding-x: 20px;
}

minerva-input {
  --input-radius: 6px;
}

/* theme tokens for one area: data-minerva-theme-scope recomputes the
   derived tokens (hover, subtle, focus ring...) from the new base colors */
.brand {
  --primary-color: #7c3aed;
}
```

```html
<section class="brand" data-minerva-theme-scope>
  <minerva-button>Violet</minerva-button>
</section>
```

```css
/* ::part() reaches the parts an element exposes, :state() its states
   (both listed in the "Styling hooks" section of each component page) */
minerva-select::part(content) {
  max-height: 240px;
}

minerva-modal:state(open)::part(overlay) {
  backdrop-filter: blur(4px);
}

minerva-tabs:state(variant-pills)::part(list) {
  gap: var(--space-1);
}

minerva-button:state(loading)::part(label) {
  opacity: 0.6;
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

# アーキテクチャ

React、Vue、Angular、Web Components、React Native、Taro、WeChat ネイティブ、uni-app がプラットフォーム非依存コアを共有し、Web レンダラーは DOM プリミティブも使用します。

Package: minerva-design@1.20.5

Renderer: native

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

### パッケージ

Minerva は 1 つのパッケージ minerva-design を公開する pnpm モノレポで、レンダラーごとにエントリーがあります。振る舞い（ヘッドレスなステートマシン）、コンポーネント契約、デザイントークン、テーマのデータ、翻訳はコアに一度だけ書かれ、各レンダラーは描画だけを担当します。

パッケージ

Web 向けコア API：プラットフォーム非依存のコア層（dist/core）のすべてと、DOM 層（dist/dom）の DOM プリミティブ（フォーカススコープ、閉じられるレイヤーのスタック、スクロールロック、他要素の非表示、ロービングフォーカス、位置決め、ポータルのホスト、テーマの Cookie とちらつき防止の初期化スクリプト）。分割前と同じ API です。

React 19 のコンポーネントライブラリ。コンポーネントはコアのプリミティブを包む薄いフック（src/internal）を使うため、すべてのオーバーレイが同じ実装を共有します。公開 API に含まれるテーマのヘルパーと型を再エクスポートし、コアのトークンを style.css に同梱します。

全コンポーネントを実装した Lit のカスタム要素。どのフレームワークでも、フレームワークなしでも使えます。Lit コントローラーを通して同じコアのプリミティブを使い、React 版のスタイルシートを shadow root にコンパイルしているため、両ライブラリの見た目と挙動は同じです。

これは非公開のワークスペースパッケージからビルドされる 2 つの内部レイヤーで実装されています。ネイティブレンダラー（React Native、ミニプログラム）は 1 つ目だけを使うため、DOM のコードは含まれません。

内部レイヤー

DOM にアクセスしないプラットフォーム非依存の TypeScript（lint ルールと、Intl.PluralRules のない Node 環境で動くテストで保証）：ヘッドレスなステートマシン、コンポーネント契約、デザイントークン（TypeScript のソースから tokens.css / tokens.mini.css を生成し、resolveTokens で具体的な値を返す）、テーマの型、パレットとデザインプリセット、i18n メッセージとトランスレーター、キーボードナビゲーションとタイプアヘッドの計算、ID、制御可能な状態、バリデーション、URL のサニタイズ。

Web レンダラー向けの DOM 部分：フォーカススコープ、閉じられるレイヤー、スクロールロック、他要素の非表示、ロービングフォーカスの DOM バインディング、@floating-ui/dom による位置決め、ポータルのホスト、ポインターの猶予領域、presence（退場アニメーション）、読み方向、テーマの DOM / Cookie ヘルパー。

### プラットフォーム

各レンダラーに minerva-design の専用エントリーがあります。Web は DOM プリミティブ、React Native は解決済みスタイル、ミニプログラムはクラススコープの CSS トークンを使用します。状態はコンポーネント対応表から集計されます。

プラットフォーム

エントリー

レンダラー

共有レイヤー

状態

安定版

計画中

コンポーネントごとの対応状況は「プラットフォーム対応」を参照してください。

React（Web）

React 19 の DOM コンポーネント、SSR / RSC 対応

Web Components

Lit のカスタム要素、どのフレームワークでもフレームワークなしでも

Vue 3

ネイティブの単一ファイルコンポーネント（それまでは Web Components）

Angular

signals を使うネイティブのスタンドアロンコンポーネント（それまでは Web Components）

React Native + Expo

React Native コンポーネント、トークンは resolveTokens で解決

Taro

ミニプログラムと H5 向けの React 構文のコンポーネント、tokens.mini.css

WeChat ミニプログラム

ネイティブのカスタムコンポーネント（WXML / WXSS）、tokens.mini.css

uni-app

uni-app の組み込みコンポーネントを使う Vue 3 コンポーネント、tokens.mini.css

Beta

### 共有のヘッドレスレイヤー

契約、トークン、状態ロジックの共有で差異を減らし、各レンダラーが描画とホスト連携を担当します。

ステートマシン（core/machines）：開閉と presence、トーストのキュー、選択、タブ、ピッカーの列、フィールドとバリデーション、ページネーション、評価、数値ステッパー、トグル類のためのフレームワーク非依存な { getState, send, subscribe } ストア。React と Web Components のトースト、タブ、ページネーション、評価はすでにこれで動いています。

コンポーネント契約（core/contracts）：コンポーネントごとの実行時メタデータ（列挙値とデフォルト値つきのプロパティ、イベント、スロット、トラック、プラットフォームごとの対応状況）。React の型と custom-elements.json に照らして検証されます。

デザイントークン：TypeScript のデータから tokens.css（以前の Sass の出力とバイト単位で同一）、ミニプログラム向けのクラスベースの tokens.mini.css（パレットごとに分割）、CSS と一致する sRGB の color-mix を備えた resolveTokens() を生成します。

共有契約テスト、レンダラー単体テスト、ブラウザーテストで文書化された API を検証します。SDK、シミュレーター、実機の検証範囲は対応表を参照してください。

### DOM プリミティブ

DOM プリミティブ（dist/dom）は DOM 要素を扱う小さな関数で、後片付け用の関数かコントローラーを返します。入れ子にも対応しており、どのオーバーレイが先に反応するかはスタックが決めます。プラットフォームに依存しない部分（キーボードナビゲーション、タイプアヘッド、制御可能な状態）はコア層（dist/core）にあります。

createFocusScope：開いたときのフォーカス、ループする Tab のトラップ、閉じたときに開いた要素へフォーカスを戻す。入れ子のスコープは外側を一時停止します。

createDismissableLayer：Escape、外側でのポインター押下、外側へのフォーカス移動で閉じるのは最前面のレイヤーだけ。子レイヤー（サブメニュー、Modal 内の Select）でのクリックが親を閉じることはありません。

lockScroll：参照カウント付きのページスクロールロック。スクロールバーの幅を補正します。

hideOthers：モーダル以外を支援技術から隠し（aria-hidden または inert）、モーダルが入れ子になっても正しく元に戻します。

getNextIndex と createTypeahead（コア）、createRovingFocus（DOM）：メニュー、リストボックス、タブ向けの矢印キー、Home / End、折り返し、方向、右から左、タイプアヘッド。

computeAnchoredPosition / autoPosition：オフセット、反転、シフト、サイズ、矢印に対応したアンカー配置。スクロールやリサイズの間も位置を保ちます。

createPointerGrace：ポインターがサブメニューへ向かう間それを開いたままにするセーフトライアングル。

getPortalContainer / createPortalHost：オーバーレイの描画先。入れ子の ConfigProvider はテーマのスコープごとにポータルのホストを作ります。

createId と createControllableState：フレームワークなしの一意な ID と、制御 / 非制御の状態。

テーマユーティリティ：Cookie の解析、ちらつき防止の初期化スクリプト、パレット、デザイントークン。

### すべてのオーバーレイに 1 つの実装

Modal、Drawer、AppShell のモバイルナビゲーション、Popover、Tooltip、Menu、ContextMenu、Select、AutoComplete、Cascader、TimePicker はすべて同じレイヤースタックに登録され、同じフォーカス処理と位置決めを使います。Escape は常に最も内側のオーバーレイから閉じ、フォーカスは元の場所へ戻ります。

どれも最も近いテーマスコープのポータルコンテナーに描画されるため、独自のテーマを持つ入れ子の ConfigProvider はそのポップアップにもテーマを適用します。

### 依存関係

Floating UI（@floating-ui/dom）が唯一のサードパーティのインタラクション依存で、DOM 層（dist/dom）の位置決めモジュール内でのみ使われます。Radix UI などのヘッドレスライブラリは使いません。Slot / asChild、Tabs、ダイアログ、メニュー、セレクトはこのリポジトリで開発され、Vitest、happy-dom、Testing Library、user-event でテストされています。

### 実装と検証の進捗

掲載されたレンダラーには実装があります。Beta は成熟度を示し、実機や本番検証の完了を意味しません。コンポーネントごとの状態は対応表を参照してください。

共有コアと DOM 層：状態、契約、トークン、翻訳、テスト基盤を実装済み。

Vue 3 と Angular：ネイティブレンダラーと実行可能な文書サンプルを実装済み。

React Native と Expo：ネイティブコンポーネントとシミュレーター確認を実施済み。実機と独立 Release パッケージの検証は未完了。

Taro、WeChat ネイティブ、uni-app：実装、公式 WeChat ターゲットのコンパイル、記載されたブラウザーとシミュレーター確認を実施済み。

タッチプリセットとモバイル拡張：各プラットフォームの API を使用し、記載されたホスト制約と検証範囲に従ってください。

### 次のステップ

パッケージをインストールしてスタイルシートを読み込みます。

素の HTML、Vue、Angular、Svelte でカスタム要素を使います。

### ツール向けコンポーネントメタデータ

読み取り専用の contracts には各レンダラーの import、props、イベント、スロットとバインディングが含まれます。型ノードは必要な分だけ参照します。React、DOM、ネイティブランタイムに依存しません。

```tsx
import { contractsMetadata, getRendererContract, getType } from "minerva-design/contracts";

const input = getRendererContract("Input", "vue");
console.log(input?.import, input?.bindings);
const value = input?.props?.find(prop => prop.name === "modelValue");
const type = value?.typeRef ? getType(value.typeRef) : undefined;
console.log(contractsMetadata.packageVersion, type);
```

schemaVersion は形式、packageVersion はパッケージ版です。sourceCommit は生成の基準、sourceDigest は実際のソーススナップショットです。テキスト索引から静的 Markdown / JSON と完全な導入例を取得できます。

```text
core (dist/core)   platform-neutral TypeScript (no DOM): React Native, mini-programs, Node
  ├─ headless state machines (machines/): disclosure, toast queue, tabs, selection, field...
  ├─ component contracts (contracts/): props, events, slots, platform support
  ├─ tokens: TypeScript source → tokens.css, tokens.mini.css, resolveTokens()
  └─ theme data, design presets, i18n messages + translator, pure helpers
        ▲
        │                             web only
        │   dom (dist/dom)   focus scope, layers, scroll lock, roving focus,
        │        ▲         positioning (@floating-ui/dom), portal, theme DOM helpers
        │        │
 ┌──────┴────────┴──────────────┬─────────────────────────┬──────────────────────┐
 minerva-design         minerva-design/web-components   minerva-design/vue · /angular
 React 19 (DOM)         Lit custom elements             (native renderers)
        │
 minerva-design/native · /taro · /uni · miniprogram → dist/weapp   (native host renderers)

minerva-design/core = core + dom (the web API)
```

```ts
import { createDismissableLayer, createFocusScope, lockScroll } from "minerva-design/core";

// A framework-free modal: trap focus, dismiss on Escape / outside click,
// lock page scroll. Every React overlay is built from the same pieces.
const scope = createFocusScope(dialog, { trapped: true, loop: true });
const layer = createDismissableLayer(dialog, { onDismiss: close });
const unlock = lockScroll();
scope.activate();

function close() {
  layer.destroy();
  scope.deactivate(); // restores focus to the opener
  unlock();
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

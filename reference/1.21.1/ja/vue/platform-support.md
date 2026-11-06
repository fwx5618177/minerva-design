# プラットフォーム対応

React、Web Components、Vue、Angular、React Native、Taro、WeChat、uni-app のソース実装状況です。npm 公開や API・外観・実機動作の完全な一致を示すものではありません。

Package: minerva-design@1.21.1

Renderer: vue

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.1",
  "sourceCommit": "8b898b8bac966669d23d1fba972e2a3289cdb5b5",
  "sourceDigest": "sha256:a33fb5e0b8f01ae452ce95d2b723ab0cd9905636d574c72fd12c1459f4c09d3a",
  "referenceSourceDigest": "sha256:8ed3473bb098d663e523782b06fce57a42cde419daa8bbcc5c6b1f0e37e3e50e"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.1/types.json) or getType() from minerva-design/contracts.

## Documentation

プラットフォーム

共通契約は props、イベント、スロットを定義し、各レンダラーはプラットフォームの要素で実装します。ソース実装があっても API や操作に未対応の部分があります。検証範囲は表の注記と各 manifest を確認してください。

プラットフォーム

コンポーネント

React

DOM 向けの React 19 コンポーネント（minerva-design）。

Web Components

Web フレームワーク向け Lit カスタム要素です。Vue と Angular は独自のエントリーでネイティブなフレームワークコンポーネントも提供します。

Vue

Vue 3 ネイティブ SFC（minerva-design/vue）。専用デモと API 表を提供します。

Angular

ネイティブ Angular スタンドアロンコンポーネント（minerva-design/angular）。各コンポーネントの実装状況は対応表を参照してください。

React Native

Expo を使用する iOS・Android 向け React Native コンポーネント。Expo Go 57.0.9 と iOS 26.1・Android 16 シミュレーターで入力、表、メニュー、WebView、仮想リストを検証しました。Android のシステムファイル選択とコピー・貼り付けも確認済みです。実機と単独のリリースアプリは未検証です。

Taro

ミニプログラムと H5 向けの Taro コンポーネントです。メインエントリーは公式 Taro 4.3 の WeChat 向けコンパイル fixture を通過しています。H5 のキーボード、フォーカス、アップロード、サンドボックスプレビューは happy-dom のテストで検証しています（実ブラウザーは使いません）。minerva-design/taro/monaco はアプリが Monaco エンジンを渡す任意の H5 エントリーです。ネイティブのミニプログラムホストでは Monaco を実行できません。

WeChat

WeChat ネイティブコンポーネントです。文書化された合成パーツは親のプロパティまたはスロットで表現します。一部の操作を WeChat DevTools シミュレーターで確認しましたが、実機や全 API の検証ではありません。WeChat のネイティブコンポーネントホストでは Monaco を実行できません。

uni-app

ソース SFC を配布し、公式 uni-app 5.31 Vue 3 コンパイラーの WeChat ターゲットでコンパイルを確認しています。fixture は H5 専用 Monaco を除くライブラリの全 SFC を静的登録します。H5 はキーボード、モーダルのフォーカス、portal、ファイル入力、サンドボックスプレビュー、および任意の minerva-design/uni/monaco を提供します。Monaco エンジンはアプリ側で渡します。ネイティブのミニプログラムホストでは実行できません。

安定版

ベータ

予定

対象外

文書化された範囲で実装と自動検証が存在します。npm 公開や完全なクロスプラットフォーム互換を示しません。

実装済みですが、プラットフォーム固有の制限や API・検証の不足があります。表の注記と manifest を確認してください。

ロードマップにあり、まだ利用できません。

設計上このプラットフォームでは独立したコンポーネントではなく、別の方法で提供されます（詳細はバッジにカーソルを合わせてください）。

React ではデータオブジェクトです：親コンポーネントの items / entries プロパティの項目。

React 専用の構成パーツまたはプロバイダーです：カスタム要素は属性または親要素で同じ機能を提供します。

対応表

すべてのコンポーネントとカスタム要素をプラットフォーム別に示します。プロダクトの種類で絞り込めます：業務アプリケーション（toB）またはコンシューマー向けアプリ（toC）。

プロダクトの種類

すべて

toB

toC

表示中のコンポーネント：{{count}}

コンポーネント

種類

コンポーネントコントラクト

この対応表はコンポーネントコントラクトから生成されます。コントラクトは React のプロパティ型と Custom Elements Manifest から抽出したメタデータです（プロパティの種類・列挙値・デフォルト値、イベントとその detail フィールド、スロット、プロダクトの種類、各プラットフォームの対応状況）。プロパティ、属性、イベントが変更されたのに再生成されていない場合や、React とカスタム要素で列挙値やデフォルト値が一致しない場合はテストが失敗します。

共有契約テストとレンダラーの単体・結合テスト（Vitest と happy-dom、実ブラウザーなし）で、文書化された操作、翻訳、トークンを検証します。独立した CI fixture は公式 WeChat ターゲット SDK で Taro メインエントリーと uni-app SFC をコンパイルします。WeChat DevTools 2.01.2510280 / 基礎ライブラリ 3.17.2 のシミュレーターで、ボタンと再試行、無効な選択肢、選択の反映、モーダル表示、局所テーマを記録しました。再検証でネイティブ入力 hello と制御値 HELLO の反映を確認しました。旧システム情報 API とコンポーネント WXSS セレクターの警告は修正され、再コンパイル後に消えました。ゲストアカウントの automator RPC タイムアウトとプラットフォームのセキュリティ情報 API エラーは残っています。実機、他のターゲット、全プラットフォーム API は未検証です。シミュレーターの結果は完全な表示・API 同等性を意味しません。

ネイティブフレームワークとミニプログラムの導入

対象プラットフォームのエントリーを使い、peerDependencies とホストアダプターの要件に従ってください。uni-app はアプリのプラットフォームコンパイラーで処理するソース SFC を配布します。任意の H5 Monaco エントリーは minerva-design/taro/monaco と minerva-design/uni/monaco です。ローカルにインストールした Monaco エンジンと worker 設定をアプリ側で用意します。ネイティブのミニプログラム用エディターではありません。公式 WeChat SDK コンパイル、H5 ブラウザーテスト、記録された DevTools シミュレーター操作は別々に検証しており、実機検証は引き続き必要です。

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

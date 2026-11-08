# Angular

minerva-design/angular のネイティブ standalone コンポーネント、signals、Angular Forms。

Package: minerva-design@1.23.1

Renderer: weapp

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "a59b0af81a2f5c6e7f2de29a81878dc4a5af01f1",
  "sourceDigest": "sha256:5b7fa63ef8772ff533e1fc34d0784bfe651eb0b1be71712d0bbef057eec2b4cf",
  "referenceSourceDigest": "sha256:1019806d6e262e50fb4e804e528badf35a408ce0a47ef203c2c5d8930c0fb0f1"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

## Documentation

ネイティブ Angular パッケージは利用可能です。実装済みコンポーネントと差異は対応表をご覧ください。

プラットフォーム対応

### セットアップ

minerva-design とパッケージ指定の Angular peer バージョンをインストールします。共通 CSS を一度読み込み、provideMinerva でテーマと言語を設定します。

### Signals とインポート

standalone ディレクティブとコンポーネントを直接インポートします。MnButton は button を拡張し、MnInput と MnUpload は型付き value モデルを提供します。CUSTOM_ELEMENTS_SCHEMA は不要です。

### Angular Forms

入力とアップロードは ControlValueAccessor を内蔵しています。ReactiveFormsModule または FormsModule を直接利用でき、独自アクセサは不要です。disabled、touched、値の変更はフォームに同期されます。

Upload はローカルファイルの選択と検証を行います。ネットワーク転送はアプリ側で filesSelected を処理し、UploadItem の状態を更新してください。

コンポーネントページの Angular タブは現在 Web Components 統合を示します。このページの例はソースコードであり、ライブ Angular プレビューではありません。

Angular の Web Components

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

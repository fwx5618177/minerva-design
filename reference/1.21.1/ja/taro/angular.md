# Angular

minerva-design/angular のネイティブ standalone コンポーネント、signals、Angular Forms。

Package: minerva-design@1.21.1

Renderer: taro

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.1",
  "sourceCommit": "fce5fba2180337e022f161113a8d4d5b12c50b7e",
  "sourceDigest": "sha256:ce2a20ef1952cc69de92d0733342905020d5135facebdf802e90ddda090ce31c",
  "referenceSourceDigest": "sha256:dd651b3ac3d2ec89388783f5919aefe9a683490b2f63c8d9a9142991a95a6b4c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.1/types.json) or getType() from minerva-design/contracts.

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

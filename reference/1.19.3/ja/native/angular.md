# Angular

minerva-design/angular のネイティブ standalone コンポーネント、signals、Angular Forms。

Package: minerva-design@1.19.3

Renderer: native

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "1b65455cccbdd71bb609d7d859b1ef90f9e604c6",
  "sourceDigest": "sha256:a8b34eea01e9133306bb1fde48e7966deaaaa35d87c2dfd2e181d891c65e01c1",
  "referenceSourceDigest": "sha256:d3ed05a4228bc39ff766871c13b5ba292792f934f6ebc3d0d29af28589be129c"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

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

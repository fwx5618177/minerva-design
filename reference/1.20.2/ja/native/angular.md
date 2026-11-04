# Angular

minerva-design/angular のネイティブ standalone コンポーネント、signals、Angular Forms。

Package: minerva-design@1.20.2

Renderer: native

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.2",
  "sourceCommit": "8d5d0df3644b1fa1c267b3dd6809b0e7eb1ce75b",
  "sourceDigest": "sha256:2862a9e3a864c9423aed5d287db6fac7e8ddf58b9f5d144c61e7ff4a2630890e",
  "referenceSourceDigest": "sha256:b329acf9d5eb6cf4b4b42169ce925c67b033f581b616664bf07fc6d664de45f0"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.2/types.json) or getType() from minerva-design/contracts.

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

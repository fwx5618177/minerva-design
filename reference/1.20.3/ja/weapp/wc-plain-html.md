# 素の HTML

ビルドステップなしの完全なページ：CDN バンドル、デザイントークン、<minerva-config>、検証付きフォーム、イベントリスナー。要素ごとのモジュール向けのインポートマップも紹介します。

Package: minerva-design@1.20.3

Renderer: weapp

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.3",
  "sourceCommit": "ea7fb3e1f55d184b7d737316e9ae829f4f7ff223",
  "sourceDigest": "sha256:c9540edc3908d226375a01cf5e6bfe8ca6a4e20440f736c0dd9b40ae9ff2e645",
  "referenceSourceDigest": "sha256:4cf6057856184f16240d0d22153ec370842fc7a2dfaaa66364e189fed89e6ca3"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.3/types.json) or getType() from minerva-design/contracts.

## Documentation

### 完全なページ

 内のタグは 2 つで十分です。デザイントークンのスタイルシートと、自己完結型のモジュールバンドル（すべての要素、Lit、minerva-design/core）です。このファイルをコピーしてブラウザで開いてください：

tokens.css はデザイントークン（色、余白、角丸、フォント）を定義し、要素や独自の CSS から var() で利用できます。

root を指定した  は、テーマ（ここでは OS に追従）、パレット、組み込みテキストの言語をドキュメント全体に適用します。

コントロールはフォーム関連付け要素です。name、required、value / checked 属性、、type="submit" と type="reset" のボタン、FormData、ブラウザの検証がネイティブの input と同様に動作します。submit イベントはすべてのコントロールが有効になったときにのみ発火します。

minerva-* イベントはバブリングするため、フォーム（または document）上の 1 つのリスナーですべてのコントロールの変更を受け取れます。event.target は要素で、event.detail に新しい値が入っています。

スクリプトからプロパティを設定しても（modal.open = true）イベントは発火しません。閉じるボタンと Escape キーはモーダルを閉じて minerva-open-change を発火します。

### インポートマップで要素ごとのモジュールを使う

CDN バンドルにはすべての要素が含まれています。ページで使う要素だけをダウンロードするには、代わりにパッケージの要素ごとのモジュール（dist/elements/.js）を読み込みます。これらはバンドラーが使うファイルで、依存関係を bare import で参照しているため、ブラウザではインポートマップで解決します：

モジュールは lit（lit/decorators.js と lit/directives/* を含むため "lit/" プレフィックスが必要です）、minerva-design/core（これ自体は @floating-ui/dom に依存します）、そして HTML プレビューと JSON フィールドに限り dompurify と jsonc-parser をインポートします。esm.sh はこれらのパッケージの依存関係を自動的に解決します。ファイルを自分でホストする場合は、@floating-ui/dom、@floating-ui/core、@floating-ui/utils もマッピングしてください。

本番環境では正確なバージョンを指定し、すべてのモジュールが lit と minerva-design/core の同じコピーを読み込むようにしてください。1 つのページで CDN バンドルと要素ごとのモジュールを混在させると共有コードが 2 回ダウンロードされ、各タグは最初に登録された定義を使い続けます。

### 次のステップ

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

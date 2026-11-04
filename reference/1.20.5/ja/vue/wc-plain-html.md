# 素の HTML

ビルドステップなしの完全なページ：CDN バンドル、デザイントークン、<minerva-config>、検証付きフォーム、イベントリスナー。要素ごとのモジュール向けのインポートマップも紹介します。

Package: minerva-design@1.20.5

Renderer: vue

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.5",
  "sourceCommit": "fe15b45f84b480cdd9cfec147df037927ba34a6b",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:49d7ff5e7a649e86d07ff0f6e5da47ae57bc234041d4b820a629aeca119fd0cb"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.5/types.json) or getType() from minerva-design/contracts.

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

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Minerva without a build step</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/minerva-design@1.20.5/dist/core/tokens.css" />
    <script type="module" src="https://cdn.jsdelivr.net/npm/minerva-design@1.20.5/dist/web-components/cdn/minerva.js"></script>
    <style>
      body {
        margin: 0;
        font-family: var(--font-family-sans);
        background: var(--background-color);
        color: var(--foreground-color);
      }
      form {
        display: grid;
        gap: var(--space-4);
        max-width: 420px;
        margin: var(--space-8) auto;
      }
      /* hide the tags until the bundle has defined them */
      :not(:defined) {
        visibility: hidden;
      }
    </style>
  </head>
  <body>
    <!-- theme, palette and language of everything inside -->
    <minerva-config theme="system" palette="cool" locale="en" root>
      <form id="signup">
        <label for="email">Email</label>
        <minerva-input id="email" name="email" type="email" required clearable></minerva-input>

        <label for="plan">Plan</label>
        <minerva-select id="plan" name="plan" value="pro" required>
          <minerva-option value="free">Free</minerva-option>
          <minerva-option value="pro">Pro</minerva-option>
          <minerva-option value="team">Team</minerva-option>
        </minerva-select>

        <minerva-checkbox name="terms" required>I accept the terms</minerva-checkbox>
        <minerva-switch name="newsletter" checked>Newsletter</minerva-switch>

        <minerva-button type="submit">Create account</minerva-button>
        <minerva-button type="reset" variant="ghost">Reset</minerva-button>
        <output id="last-change" aria-live="polite"></output>
      </form>

      <minerva-modal id="done" label="Welcome!">
        <p id="summary"></p>
        <minerva-button slot="footer" id="close">Close</minerva-button>
      </minerva-modal>
    </minerva-config>

    <script type="module">
      const form = document.querySelector("#signup");
      const modal = document.querySelector("#done");

      // custom events bubble: one listener on the form sees every control
      form.addEventListener("minerva-change", (event) => {
        document.querySelector("#last-change").textContent =
          `${event.target.name} changed`;
      });

      form.addEventListener("submit", (event) => {
        event.preventDefault(); // runs only when every control is valid
        const data = new FormData(form);
        document.querySelector("#summary").textContent =
          `${data.get("email")} — ${data.get("plan")} plan`;
        modal.open = true;
      });

      document.querySelector("#close").addEventListener("click", () => {
        modal.open = false;
      });
    </script>
  </body>
</html>
```

```html
<script type="importmap">
  {
    "imports": {
      "minerva-design/web-components/": "https://cdn.jsdelivr.net/npm/minerva-design@1.20.5/dist/web-components/elements/",
      "lit": "https://esm.sh/lit@3",
      "lit/": "https://esm.sh/lit@3/",
      "@floating-ui/dom": "https://esm.sh/@floating-ui/dom@1",
      "dompurify": "https://esm.sh/dompurify@3",
      "jsonc-parser": "https://esm.sh/jsonc-parser@3"
    }
  }
</script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/minerva-design@1.20.5/dist/core/tokens.css" />

<script type="module">
  // only these elements (and what they render) are downloaded
  import "minerva-design/web-components/button.js";
  import "minerva-design/web-components/input.js";
</script>
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

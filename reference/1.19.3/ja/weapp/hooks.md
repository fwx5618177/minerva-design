# フック

ConfigProvider の内部で使われる低レベルのフック。テーマ、言語、React 版の翻訳を自分で管理できます。

Package: minerva-design@1.19.3

Renderer: weapp

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "19932861fda2d088219d708a8ca132bea760a32b",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:ed8b6b1bf30e9055934099f84afd6b8369eee155b0404de5e8db004c3d91bce6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

### リファレンス

すべてのフックとユーティリティは minerva-design からエクスポートされています。

フック

シグネチャ

現在のテーマを state に保持し、ConfigProvider の外では CSS 変数として  に書き込みます。"auto" や { light, dark } の組では prefers-color-scheme を購読し、アンマウント時に購読を解除します。設定されたテーマ、その setter、現在のシステムのカラースキームを返します。ConfigProvider の内側では state の管理だけを行い、 はルート Provider が管理します。

ロケールを state に保持し、ConfigProvider の外では React 版内蔵テキストの言語（en、zh、ja、fr）を切り替えます。ロケールとその setter を返します。ConfigProvider の内側では state の管理だけを行い、グローバルな言語はルート Provider が管理します。

{ t, language } を返します。t は React 版内蔵の軽量トランスレーター（ネストしたキー、プレースホルダーの補間、count による複数形、defaultValue に対応）で React 版の組み込みテキストを翻訳し、language は t が翻訳する言語です。t は locale を指定した最も近い入れ子の ConfigProvider に従い、それがなければ React 版のグローバルな言語を使います。React 版は i18n ライブラリに依存しないため、アプリケーション自身の i18n の設定には影響しません。

オーバーレイ（Modal、Drawer、Popover など）の開閉状態。制御（isOpen + onChange）と非制御（defaultIsOpen）の両方に対応します。isOpen と、安定した onOpen、onClose、onToggle コールバックを返します。

クラス名を連結し、偽値（false、null、undefined、0、空文字列）をスキップします。条件付きクラスのための、依存関係のない小さな classnames の代替です。

useAutoTheme と useLocale がグローバルな状態（ の CSS 変数、React 版の言語）を変更するのは、上に ConfigProvider がない場合だけです。このサイトはルートに Provider があるため、下のデモではフックの state を入れ子の ConfigProvider に渡し、プレビューにだけ適用しています。

### ConfigProvider なしでフックを使う

useConfig() が不要なら、Provider の代わりに useAutoTheme と useLocale を直接呼び出せます。Provider の内側では state を保持するだけなので、サブツリーに適用するには入れ子の ConfigProvider に渡してください。

```tsx
import { Button, useAutoTheme, useLocale } from "minerva-design";

// This is what ConfigProvider does internally. Use the hooks instead of
// (not inside) a ConfigProvider: both write the same global state.
export function ThemeAndLanguage() {
  const [theme, setTheme] = useAutoTheme("auto");
  const [locale, setLocale] = useLocale({ language: "fr" });

  return (
    <>
      <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        Toggle theme
      </Button>
      <Button onClick={() => setLocale({ language: "en" })}>
        {locale.language}
      </Button>
    </>
  );
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

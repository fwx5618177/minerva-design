# Svelte

Svelte 5 と SvelteKit で Minerva のカスタム要素を使う：プロパティと属性、onminerva-* イベント属性、bind:this、型定義、サーバーサイドレンダリング。

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

### セットアップ

Svelte ではカスタム要素のための設定は不要です。エントリーファイルで（SvelteKit ではルートレイアウトで。後述）要素を登録し、デザイントークンを一度だけ読み込みます：

### プロパティ、イベント、bind:this

マークアップにネイティブ要素と同じようにタグを記述します：

Svelte は、要素にその名前のプロパティ（value、checked、disabled、options...）がある場合は DOM プロパティとして、そうでない場合は属性としてプロパティを設定します。そのため配列、オブジェクト、関数はそのまま要素に渡ります。コンポーネントが描画される前に要素を登録してください。

Svelte 5 のイベント属性は大文字と小文字を区別し、イベント名を記述どおりに使います：onminerva-change、onminerva-input、onminerva-open-change。ハンドラーは CustomEvent を受け取り、新しい状態は event.detail にあります。onclick などのネイティブイベントは通常どおり動作します。

bind:this で要素のインスタンスを取得し、メソッド（show()、hide()、focus()）を呼び出したり、プロパティを読み取ったりできます。型はエクスポートされている要素クラスです。

bind:value と bind:checked はネイティブの input 向けです。上記のように value プロパティを書き込み、イベントから状態を更新してください（キー入力ごとには minerva-input、確定した値には minerva-change）。

### 型定義

パッケージには Custom Elements Manifest から生成された svelte/elements 向けの型定義が同梱されています。すべてのタグの属性・プロパティ・onminerva-* イベントが svelte-check でチェックされ、Svelte 拡張機能で補完されます。一度参照してください：

### SvelteKit とサーバーサイドレンダリング

ページはまずサーバーでレンダリングされます。サーバーで要素をインポートしても安全です（モジュールは読み込み時に DOM に触れません）が、要素はブラウザでのみ動作するため、onMount（サーバーでは実行されません）内か browser フラグの判定の内側で登録してください。サーバーは属性とスロットのコンテンツを持つタグを送信し、インポートが解決されるとブラウザがそれらをアップグレードします。

```ts
// src/main.ts (Svelte + Vite)
import { mount } from "svelte";
import "minerva-design/web-components";
import "minerva-design/tokens.css";
import App from "./App.svelte";

mount(App, { target: document.getElementById("app")! });
```

```html
<script lang="ts">
  import type { MinervaModal } from "minerva-design/web-components";

  let name = $state("Ada");
  let notify = $state(true);
  let modal: MinervaModal | undefined = $state();
  const plans = [
    { value: "free", label: "Free" },
    { value: "pro", label: "Pro" },
  ];
</script>

<!-- props that exist on the element are set as properties -->
<minerva-input
  aria-label="Name"
  value={name}
  onminerva-input={(e: CustomEvent<{ value: string }>) => (name = e.detail.value)}
></minerva-input>

<minerva-select aria-label="Plan" options={plans} value="pro"></minerva-select>

<minerva-switch
  label="Email notifications"
  checked={notify}
  onminerva-change={(e: CustomEvent<{ checked: boolean }>) => (notify = e.detail.checked)}
></minerva-switch>

<minerva-button disabled={!name} onclick={() => modal?.show()}>Preview</minerva-button>

<!-- bind:this gives the element instance: properties and methods -->
<minerva-modal bind:this={modal} label="Preview">
  <p>{name} · {notify ? "emails on" : "emails off"}</p>
</minerva-modal>
```

```ts
// src/app.d.ts (SvelteKit) or src/vite-env.d.ts
/// <reference types="minerva-design/web-components/svelte" />
```

```html
<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import { onMount } from "svelte";
  import "minerva-design/tokens.css";

  let { children } = $props();

  // onMount only runs in the browser
  onMount(async () => {
    await import("minerva-design/web-components");
  });
</script>

{@render children()}
```

```ts
// or anywhere, guarded by $app/environment
import { browser } from "$app/environment";

if (browser) await import("minerva-design/web-components/select");
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

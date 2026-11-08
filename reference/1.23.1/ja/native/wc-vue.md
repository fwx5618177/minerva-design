# Vue（Web Components）

Vue 3 と Nuxt で Minerva のカスタム要素を使う：コンパイラーの設定、プロパティとイベントのバインディング、制御パターン、Volar の型定義。

Package: minerva-design@1.23.1

Renderer: native

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "6ccf4f2c7a65dd5b27e517c9a50ea4867f8e7980",
  "sourceDigest": "sha256:2005faebbf738765fe81a5c952fa47a51311aa5d05e3220f71c542b8b1fe369b",
  "referenceSourceDigest": "sha256:3616b5d4e7cf7e0eb1fbe04c879d1630cc3dfd5c28f16762b8ad6f3f3525ef82"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

## Documentation

### セットアップ

Vue は標準でカスタム要素をサポートしています。テンプレートコンパイラーに minerva-* タグがカスタム要素であることを伝え、Vue コンポーネントとして解決しようとしない（警告も出さない）ようにします：

次に、エントリーファイルで要素を登録し、デザイントークンを一度だけ読み込みます：

### プロパティとイベントのバインディング

ネイティブ要素と同様に、:prop でバインドし、@minerva-* でイベントを受け取ります。v-model のような双方向バインディングは、:value（または :checked）のバインディングと対応するイベントの組み合わせで実現します：

Vue は、要素にその名前のプロパティがある場合はバインドされた値を DOM プロパティとして、そうでない場合は属性として設定します。アプリをマウントする前に要素を登録しておくと、Vue が描画する時点で要素が定義済みとなり、配列、オブジェクト、関数（options、items、レンダーコールバック）がそのまま要素に渡ります。

真偽値は通常の真偽値として渡します（:disabled="busy"）。静的なブール属性は値なしで記述します（clearable、required）。属性として強制するには .attr 修飾子を、プロパティとして強制するには .prop 修飾子を付けます。

イベント名は kebab-case で、そのまま使います：@minerva-change、@minerva-open-change。$event は CustomEvent なので、新しい状態は $event.detail から読み取ります。ネイティブイベント（@click、@focus、@input、@change）も動作します。

v-model はネイティブの input と Vue コンポーネント向けに設計されているため、明示的な組み合わせを使います。テキストフィールドでは :value + @minerva-input（キー入力ごと）または @minerva-change（確定した値）、チェックボックスとスイッチでは :checked + @minerva-change です。

### 制御された開閉状態

要素はユーザーの操作に応じて自身の状態を更新し、その後イベントを発火します。ユーザーが要求した変更を通知するイベント（minerva-open-change、タブの選択）はキャンセル可能です。現在の状態を維持するには preventDefault() を呼び、そうでなければ ref を更新します：

### 型定義（Volar）

パッケージには Custom Elements Manifest から生成された Vue の GlobalComponents 向けの型定義が同梱されています。すべての  タグの属性・プロパティ・イベントが、Vue - Official（Volar）と vue-tsc によってテンプレート内で型チェック・補完されます。tsconfig の types に追加してください：

### Nuxt

nuxt.config でコンパイラーを設定し、クライアント専用のプラグインで要素を登録します。タグは属性付きの通常の HTML としてサーバーレンダリングされ、プラグインの実行後にブラウザでアップグレードされます（サーバーでパッケージをインポートしても安全です。モジュールは読み込み時に DOM に触れません）。

```ts
// vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // <minerva-*> tags are custom elements, not Vue components
          isCustomElement: (tag) => tag.startsWith("minerva-"),
        },
      },
    }),
  ],
});
```

```ts
// main.ts
import { createApp } from "vue";
import "minerva-design/web-components"; // or per element: ".../select", ".../switch"
import "minerva-design/tokens.css";
import App from "./App.vue";

createApp(App).mount("#app");
```

```html
<script setup lang="ts">
import { ref } from "vue";

const name = ref("Ada");
const plan = ref("pro");
const notify = ref(true);
const saving = ref(false);
const plans = [
  { value: "free", label: "Free" },
  { value: "pro", label: "Pro" },
];
</script>

<template>
  <!-- :value is set as a property; the event carries the new value -->
  <minerva-input
    aria-label="Name"
    :value="name"
    @minerva-input="name = $event.detail.value"
  />

  <!-- arrays and objects are properties too -->
  <minerva-select
    aria-label="Plan"
    :options="plans"
    :value="plan"
    @minerva-change="plan = $event.detail.value"
  />

  <minerva-switch
    label="Email notifications"
    :checked="notify"
    @minerva-change="notify = $event.detail.checked"
  />

  <!-- booleans: a plain boolean, set as a property -->
  <minerva-button :loading="saving" :disabled="!name" @click="saving = true">
    Save
  </minerva-button>
</template>
```

```html
<script setup lang="ts">
import { ref } from "vue";

const open = ref(false);
const dirty = ref(true);

// the user asked to close: keep the modal open while there are changes
function onOpenChange(event: CustomEvent<{ open: boolean }>) {
  if (!event.detail.open && dirty.value) event.preventDefault();
  else open.value = event.detail.open;
}
</script>

<template>
  <minerva-modal label="Edit profile" :open="open" @minerva-open-change="onOpenChange">
    ...
  </minerva-modal>
</template>
```

```json
// tsconfig.json (or tsconfig.app.json)
{
  "compilerOptions": {
    "types": ["minerva-design/web-components/vue"]
  }
}
```

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  css: ["minerva-design/tokens.css"],
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.startsWith("minerva-"),
    },
  },
});

// plugins/minerva.client.ts: the .client suffix runs it in the browser only
import "minerva-design/web-components";

export default defineNuxtPlugin(() => {});
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

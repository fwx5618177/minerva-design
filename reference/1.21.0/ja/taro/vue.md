# Vue

minerva-design/vue のネイティブ Vue 3 コンポーネント：インストール、グローバルスタイルシート、コンポーネント単位のインポートまたはプラグイン、v-model と emit、ネストした ConfigProvider スコープによるテーマ、Nuxt / SSR、Volar の型。

Package: minerva-design@1.21.0

Renderer: taro

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.0",
  "sourceCommit": "3e3fd42fed9bd7320e0095e9008ad52d1dd44024",
  "sourceDigest": "sha256:ce2a20ef1952cc69de92d0733342905020d5135facebdf802e90ddda090ce31c",
  "referenceSourceDigest": "sha256:bdc377ab7ed5f94120cdda24084c48e40370128fac18b85708e5f8b5fbaf5e95"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.0/types.json) or getType() from minerva-design/contracts.

## Documentation

### インストール

Vue 3.5 以降と一緒にパッケージをインストールします（vue は任意のピア依存です）。minerva-design/vue は ES モジュールと型宣言を提供し、コンポーネントは React と同じヘッドレスコアの上に作られた Vue 単一ファイルコンポーネントです。

エントリーファイルでグローバルスタイルシートを一度だけインポートします。React と同じファイルです。Vue コンポーネントは同じクラス名とスタイリングフックを出力するため、デザイントークン、テーマ、パレット、CSS 変数がそのまま適用されます。

### コンポーネントの使い方

コンポーネントを名前でインポートします。バンドラーは使用したものだけを残します（すべてのエクスポートは副作用がありません）。

値は v-model（modelValue / update:modelValue）で、非制御の場合は defaultValue / defaultChecked を使います。オーバーレイは v-model:open（defaultOpen）、その他の制御プロパティは v-model:名前（v-model:current、v-model:expanded）です。

イベントは型付きの emit で、名前は React のコールバック名から "on" を除いたものです：onChange → @change、onOpenChange → @open-change。引数も同じです。

リッチなコンテンツはスロット（#trigger、#title、#start-icon など）で渡し、単純なテキストはプロパティ（title、description、label）のままです。

### グローバル登録

名前付きインポートを推奨します。インポートせずにすべてのテンプレートで使いたい場合はプラグインをインストールします。、 などとして登録されます（プレフィックスは変更可能）。

グローバルコンポーネントは minerva-design/vue/global の型定義により Vue - Official（Volar）と vue-tsc で型付けされます：

#### チャート

MinervaVue はチャートを登録しないため、チャートを使わないアプリがチャートエンジンを読み込むことはありません。チャートは minerva-design/vue/charts から名前付きでインポートするか（推奨。minerva-design/vue からも引き続きエクスポートされています）、minerva-design/vue/charts のオプトインの MinervaVueCharts プラグインをインストールしてください。同じ prefix オプションで 、、 などを登録し、型は minerva-design/vue/charts-global が提供します。

##### 1.4 からのアップグレード

1.5 以降、app.use(MinervaVue) は 、 などのチャートコンポーネントを登録しなくなりました。テンプレートでインポートせずに使っている場合は、minerva-design/vue/charts の app.use(MinervaVueCharts) を追加し（プレフィックスを変更している場合は MinervaVue と同じ prefix を指定）、tsconfig.json の types に minerva-design/vue/charts-global を追加してください。名前付きインポートは変わりません。

##### チャートと Vite 開発サーバー

本番ビルドではチャートは tree-shaking されます。チャートをインポートしないアプリには、app.use(MinervaVue) の有無にかかわらずチャートのコードは含まれません。一方、開発時の Vite は minerva-design/vue のすべてのエクスポートを 1 つのファイルに事前バンドルするため、チャートを使っていなくてもチャートのラッパーとチャートエンジン（未圧縮で約 0.7 MB）が含まれます。事前バンドルは node_modules/.vite にキャッシュされるので、コストはページ全体の読み込み時の解析時間だけです。チャートを使うアプリでは minerva-design/vue/charts からインポートし、両方のエントリを optimizeDeps.include に列挙してください。初めてチャートをインポートしたときに依存関係の再最適化とページの再読み込みが起きず、起動時にまとめて事前バンドルされます：

optimizeDeps から minerva-design/charts/core を除外しても効果はありません。Vue コンポーネントはパッケージ内の相対パスでエンジンを参照しているためです。minerva-design/vue を除外しても改善しません。ブラウザがチャートを含む数百のバンドルされていないモジュールを読み込むことになります。

既存の名前付きインポートを壊さないよう、minerva-design/vue は次のメジャーバージョンまでチャートコンポーネントをエクスポートし続けます。2.0 では minerva-design/vue/charts からのみエクスポートされ、開発時の事前バンドルからも外れます。今のうちに minerva-design/vue/charts からインポートしておけば、アップグレード時の変更は不要です。

### テーマと i18n

ConfigProvider はテーマ、パレット、デザイン軸、組み込みテキストの言語を設定します。ルートのプロバイダーは  を管理し、ネストしたプロバイダーは上書きをそのサブツリー（オーバーレイを含む。対応するスコープコンテナにテレポートされます）に限定します。

コンポーザブルは最も近いプロバイダーを読み取ります：

### Nuxt とサーバーレンダリング

コンポーネントは vue/server-renderer でサーバーレンダリングされ、不一致なくハイドレートされます。オーバーレイ（モーダル、ポップオーバー、トースト）はクライアントでマウントされ、id は Vue の useId() から生成され、setup 中に DOM に触れません。Nuxt ではスタイルシートを css に追加し、必要に応じてグローバルコンポーネント用のプラグイン（グローバルなチャートには MinervaVueCharts も）を追加します。

### Vue アイランド

テーマを別のフレームワークが管理するページに Vue アプリをマウントしますか（マイクロフロントエンド、React ページ内の Vue ウィジェット）？マウント前に provideEmbeddedScope を呼び出すと、プロバイダーはネストしたものとして動作し、 を書き換えません。このドキュメントのすべての Vue デモで使用しています。

```bash
pnpm add minerva-design vue
# or: npm install minerva-design vue
```

```ts
// src/main.ts
import { createApp } from "vue";
import "minerva-design/style.css"; // once: the same stylesheet as React
import App from "./App.vue";

createApp(App).mount("#app");
```

```html
<script setup lang="ts">
import { ref } from "vue";
// named imports: only what you use ends up in the bundle
import { Button, Input, Modal, Switch } from "minerva-design/vue";

const name = ref("");
const notify = ref(true);
const open = ref(false);
</script>

<template>
  <Input v-model="name" placeholder="Name" />
  <Switch v-model="notify" label="Email notifications" />
  <Button :disabled="!name" @click="open = true">Save</Button>

  <Modal v-model:open="open" title="Saved" description="Your profile is up to date.">
    <Button @click="open = false">Close</Button>
  </Modal>
</template>
```

```ts
// src/main.ts: register every component globally (<MnButton>, <MnModal>...)
import { createApp } from "vue";
import MinervaVue from "minerva-design/vue";
import "minerva-design/style.css";
import App from "./App.vue";

createApp(App).use(MinervaVue).mount("#app");
// another prefix: app.use(MinervaVue, { prefix: "Ui" }) -> <UiButton>
```

```json
// tsconfig.json: Volar typings of the global <Mn*> components
{
  "compilerOptions": {
    "types": ["minerva-design/vue/global"]
  }
}
```

```ts
// src/main.ts: the global chart components are opt-in (they load the chart engine)
import { createApp } from "vue";
import MinervaVue from "minerva-design/vue";
import { MinervaVueCharts } from "minerva-design/vue/charts";
import "minerva-design/style.css";
import App from "./App.vue";

createApp(App)
  .use(MinervaVue) // <MnButton>, <MnModal>...
  .use(MinervaVueCharts) // <MnLineChart>, <MnPieChart>... (same prefix option)
  .mount("#app");

// tsconfig.json: "types": ["minerva-design/vue/global", "minerva-design/vue/charts-global"]
// without a plugin: import { LineChart } from "minerva-design/vue/charts";
```

```ts
// vite.config.ts: pre-bundle both entries together at startup
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  optimizeDeps: {
    include: ["minerva-design/vue", "minerva-design/vue/charts"],
  },
});

// components: charts from their own entry (the only one from 2.0)
import { Button } from "minerva-design/vue";
import { LineChart, PieChart } from "minerva-design/vue/charts";
```

```html
<script setup lang="ts">
import { ConfigProvider, ThemeToggle, useTheme } from "minerva-design/vue";
</script>

<template>
  <!-- root provider: owns <html> (theme, palette, design) and the language -->
  <ConfigProvider theme="system" palette="ocean" :locale="{ language: 'fr' }" persist>
    <ThemeToggle />
    <RouterView />

    <!-- nested provider: scoped to its subtree (and its overlays) -->
    <ConfigProvider theme="dark" density="compact">
      <AdminPanel />
    </ConfigProvider>
  </ConfigProvider>
</template>
```

```ts
import { useConfirm, useI18n, useTheme, useToast } from "minerva-design/vue";

const theme = useTheme(); // theme.theme, theme.resolvedTheme, theme.setTheme("dark")
const { t } = useI18n(); // t(closeKey) in the provider's language
const toast = useToast(); // toast.success("Saved")
const confirm = useConfirm(); // await confirm({ title: "Delete?" }) -> boolean
```

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  css: ["minerva-design/style.css"],
  build: { transpile: [] }, // nothing to transpile: the package ships ESM
});

// plugins/minerva.ts (optional: global <Mn*> components, SSR-safe)
import MinervaVue from "minerva-design/vue";
import { MinervaVueCharts } from "minerva-design/vue/charts";
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(MinervaVue);
  nuxtApp.vueApp.use(MinervaVueCharts); // only if templates use <Mn*Chart>
});
```

```ts
// a Vue island inside a page whose theme is owned by another framework
import { createApp } from "vue";
import { provideEmbeddedScope } from "minerva-design/vue";

const app = createApp(Island);
provideEmbeddedScope(app, { language: "ja" }); // providers never touch <html>
app.mount("#island");
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

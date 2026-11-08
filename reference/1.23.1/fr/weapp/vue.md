# Vue

Les composants Vue 3 natifs de minerva-design/vue : installation, feuille de style globale, imports par composant ou plugin, v-model et emits, thèmes avec des ConfigProvider imbriqués, Nuxt / SSR et typages Volar.

Package: minerva-design@1.23.1

Renderer: weapp

Locale: fr

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

### Installation

Installez le paquet avec Vue 3.5 ou plus récent (une dépendance pair optionnelle). minerva-design/vue fournit des modules ES et des déclarations de types ; les composants sont des composants monofichiers Vue construits sur le même cœur headless que React.

Importez la feuille de style globale une seule fois, dans votre fichier d'entrée. C'est le même fichier que pour React : les composants Vue rendent les mêmes noms de classes et hooks de style, donc jetons de design, thèmes, palettes et variables CSS s'appliquent tels quels.

### Utiliser les composants

Importez les composants par leur nom ; votre bundler ne garde que ceux que vous utilisez (aucun export n'a d'effet de bord).

Les valeurs passent par v-model (modelValue / update:modelValue), avec defaultValue / defaultChecked en mode non contrôlé ; les surcouches utilisent v-model:open (defaultOpen), les autres props contrôlées v-model:nom (v-model:current, v-model:expanded).

Les événements sont des emits typés, nommés comme les callbacks React sans « on » : onChange → @change, onOpenChange → @open-change, avec les mêmes arguments.

Le contenu riche passe par des slots (#trigger, #title, #start-icon…) ; les textes simples restent des props (title, description, label).

### Enregistrement global

Préférez les imports nommés. Pour utiliser les composants dans tous les templates sans les importer, installez le plugin : il les enregistre comme , … (le préfixe est configurable).

Les composants globaux sont typés pour Vue - Official (Volar) et vue-tsc par les typages minerva-design/vue/global :

#### Graphiques

MinervaVue n'enregistre pas les graphiques : une application sans graphiques ne charge jamais le moteur de graphiques. Importez les graphiques par leur nom depuis minerva-design/vue/charts (recommandé ; minerva-design/vue les exporte encore aussi), ou installez le plugin optionnel MinervaVueCharts de minerva-design/vue/charts : il enregistre , , ... avec la même option prefix, typés par minerva-design/vue/charts-global.

##### Mise à jour depuis la 1.4

Depuis la 1.5, app.use(MinervaVue) n'enregistre plus ,  ni les autres graphiques. Si vos templates les utilisent sans les importer, ajoutez app.use(MinervaVueCharts) depuis minerva-design/vue/charts (avec le même prefix que MinervaVue si vous l'avez changé) et ajoutez minerva-design/vue/charts-global aux types de tsconfig.json. Les imports nommés ne changent pas.

##### Graphiques et serveur de développement Vite

Les builds de production éliminent les graphiques par tree-shaking : une application qui n'importe aucun graphique n'embarque aucun code de graphique, avec ou sans app.use(MinervaVue). En développement, en revanche, Vite pré-bundle tous les exports de minerva-design/vue dans un seul fichier : les composants de graphiques et le moteur (environ 0,7 Mo non minifié) en font partie même si aucun graphique n'est utilisé. Ce pré-bundle est mis en cache dans node_modules/.vite et ne coûte donc que du temps d'analyse lors d'un chargement complet de la page. Si votre application utilise des graphiques, importez-les depuis minerva-design/vue/charts et listez les deux entrées dans optimizeDeps.include, pour que Vite les pré-bundle ensemble au démarrage au lieu de ré-optimiser les dépendances et de recharger la page au premier import d'un graphique :

Exclure minerva-design/charts/core de optimizeDeps n'a aucun effet : les composants Vue atteignent le moteur par un chemin relatif à l'intérieur du paquet. Exclure minerva-design/vue n'aide pas non plus : le navigateur chargerait alors des centaines de modules non bundlés, graphiques compris.

minerva-design/vue continue d'exporter les composants de graphiques jusqu'à la prochaine version majeure, car les retirer casserait les imports nommés existants. En 2.0, ils ne seront exportés que par minerva-design/vue/charts, ce qui les retirera aussi du pré-bundle de développement. Importer les graphiques depuis minerva-design/vue/charts dès aujourd'hui rend cette mise à jour transparente.

### Thèmes et i18n

ConfigProvider définit le thème, la palette, les axes de design et la langue des textes intégrés. Le provider racine gère  ; un provider imbriqué limite ses surcharges à son sous-arbre, surcouches comprises (elles sont téléportées dans un conteneur de portée correspondant).

Les composables lisent le provider le plus proche :

### Nuxt et rendu serveur

Les composants se rendent côté serveur avec vue/server-renderer et s'hydratent sans écart : les surcouches (modales, popovers, toasts) se montent côté client, les id viennent du useId() de Vue et rien ne touche au DOM pendant le setup. Dans Nuxt, ajoutez la feuille de style à css et, si besoin, un plugin pour les composants globaux (et MinervaVueCharts pour les graphiques globaux).

### Îlots Vue

Vous montez une application Vue dans une page dont le thème est géré par un autre framework (micro-frontends, un widget Vue dans une page React) ? Appelez provideEmbeddedScope avant le montage : ses providers se comportent alors comme des providers imbriqués et n'écrivent jamais . Cette documentation l'utilise pour chaque démo Vue.

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

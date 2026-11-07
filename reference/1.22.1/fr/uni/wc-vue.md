# Vue (Web Components)

Les éléments personnalisés Minerva dans Vue 3 et Nuxt : configuration du compilateur, liaison des propriétés et des événements, pattern contrôlé et typages Volar.

Package: minerva-design@1.22.1

Renderer: uni

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.1",
  "sourceCommit": "3b95c464583d2e1bcf02999361aa6cf5481d519b",
  "sourceDigest": "sha256:080b482abbb8d2745bf31d68a17d7a1299cbb89f0e3f8c1a4d1d91bdeb04d1be",
  "referenceSourceDigest": "sha256:22ecb97acf4fac039a6d9a7e4a78b6bedc12dbbb8c1a14e3feeef3bcd47a7cef"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.1/types.json) or getType() from minerva-design/contracts.

## Documentation

### Configuration

Vue prend en charge les éléments personnalisés sans configuration particulière. Indiquez à son compilateur de templates que les balises minerva-* sont des éléments personnalisés, afin qu'il n'essaie pas de les résoudre comme des composants Vue (et n'émette pas d'avertissement à leur sujet) :

Enregistrez ensuite les éléments et chargez les design tokens une fois, dans votre fichier d'entrée :

### Lier propriétés et événements

Liez avec :prop et écoutez avec @minerva-*, comme pour les éléments natifs. Une liaison bidirectionnelle à la v-model se compose d'une liaison :value (ou :checked) et de l'événement correspondant :

Vue définit une valeur liée comme propriété DOM lorsque l'élément possède une propriété de ce nom, et comme attribut sinon. Enregistrez les éléments avant de monter l'application, afin qu'ils soient définis lorsque Vue les rend et que les tableaux, objets et fonctions (options, items, callbacks de rendu) parviennent tels quels à l'élément.

Les booléens sont de simples booléens (:disabled="busy") ; les attributs booléens statiques s'écrivent sans valeur (clearable, required). Ajoutez le modificateur .attr pour forcer un attribut, et .prop pour forcer une propriété.

Les noms d'événements sont en kebab-case et s'utilisent tels quels : @minerva-change, @minerva-open-change. $event est le CustomEvent ; lisez le nouvel état dans $event.detail. Les événements natifs (@click, @focus, @input, @change) fonctionnent aussi.

v-model est conçu pour les champs natifs et les composants Vue : utilisez donc la paire explicite :value + @minerva-input pour les champs texte (à chaque frappe) ou @minerva-change (valeur validée), et :checked + @minerva-change pour les cases à cocher et les interrupteurs.

### État d'ouverture contrôlé

L'élément met à jour son propre état lorsque l'utilisateur agit, puis déclenche l'événement. Les événements qui annoncent un changement demandé par l'utilisateur (minerva-open-change, sélection d'onglet) sont annulables : appelez preventDefault() pour conserver l'état actuel, et mettez à jour votre ref sinon :

### Typages (Volar)

Le paquet fournit des typages pour les GlobalComponents de Vue, générés à partir de son Custom Elements Manifest : les attributs, propriétés et événements de chaque balise  sont vérifiés et complétés dans les templates par Vue - Official (Volar) et vue-tsc. Ajoutez-les aux types de votre tsconfig :

### Nuxt

Configurez le compilateur dans nuxt.config et enregistrez les éléments dans un plugin exécuté uniquement côté client. Les balises sont rendues côté serveur en HTML simple avec leurs attributs, puis mises à niveau dans le navigateur une fois le plugin exécuté (importer le paquet côté serveur est également sans danger : les modules ne touchent pas au DOM lors de leur chargement).

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

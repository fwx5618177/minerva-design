# Svelte

Les éléments personnalisés Minerva dans Svelte 5 et SvelteKit : propriétés et attributs, attributs d'événement onminerva-*, bind:this, typages et rendu côté serveur.

Package: minerva-design@1.21.0

Renderer: native

Locale: fr

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

### Configuration

Svelte ne nécessite aucune configuration pour les éléments personnalisés. Enregistrez les éléments et chargez les design tokens une fois, dans votre fichier d'entrée (ou dans le layout racine avec SvelteKit, voir plus bas) :

### Propriétés, événements et bind:this

Écrivez les balises dans votre markup comme des éléments natifs :

Svelte définit une prop comme propriété DOM lorsque l'élément possède une propriété de ce nom (value, checked, disabled, options...), et comme attribut sinon. Les tableaux, objets et fonctions parviennent donc tels quels à l'élément ; enregistrez les éléments avant le rendu du composant.

Les attributs d'événement de Svelte 5 sont sensibles à la casse et reprennent le nom de l'événement tel quel : onminerva-change, onminerva-input, onminerva-open-change. Le gestionnaire reçoit le CustomEvent, avec le nouvel état dans event.detail. onclick et les autres événements natifs fonctionnent comme d'habitude.

bind:this vous donne l'instance de l'élément, pour appeler ses méthodes (show(), hide(), focus()) ou lire ses propriétés. Son type est la classe d'élément exportée.

bind:value et bind:checked sont destinés aux champs natifs : écrivez la prop value et mettez à jour votre état depuis l'événement, comme ci-dessus (minerva-input à chaque frappe, minerva-change pour une valeur validée).

### Typages

Le paquet fournit des typages pour svelte/elements, générés à partir de son Custom Elements Manifest : les attributs, propriétés et événements onminerva-* de chaque balise sont vérifiés par svelte-check et complétés par l'extension Svelte. Référencez-les une fois :

### SvelteKit et rendu côté serveur

Les pages sont d'abord rendues sur le serveur. Y importer les éléments est sans danger (les modules ne touchent pas au DOM lors de leur chargement), mais ils ne fonctionnent que dans le navigateur : enregistrez-les donc dans onMount (qui ne s'exécute jamais sur le serveur) ou derrière le flag browser. Le serveur envoie les balises avec leurs attributs et leur contenu placé dans les slots ; le navigateur les met à niveau une fois l'import résolu.

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

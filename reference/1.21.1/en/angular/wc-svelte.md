# Svelte

Minerva custom elements in Svelte 5 and SvelteKit: properties and attributes, onminerva-* event attributes, bind:this, typings and server-side rendering.

Package: minerva-design@1.21.1

Renderer: angular

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.1",
  "sourceCommit": "8b898b8bac966669d23d1fba972e2a3289cdb5b5",
  "sourceDigest": "sha256:a33fb5e0b8f01ae452ce95d2b723ab0cd9905636d574c72fd12c1459f4c09d3a",
  "referenceSourceDigest": "sha256:8ed3473bb098d663e523782b06fce57a42cde419daa8bbcc5c6b1f0e37e3e50e"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.1/types.json) or getType() from minerva-design/contracts.

## Documentation

### Setup

Svelte needs no configuration for custom elements. Register the elements and load the design tokens once, in your entry file (or in the root layout with SvelteKit, see below):

### Properties, events and bind:this

Write the tags in your markup like native elements:

Svelte sets a prop as a DOM property when the element has a property with that name (value, checked, disabled, options...), and as an attribute otherwise. Arrays, objects and functions therefore reach the element as they are; register the elements before the component renders.

Svelte 5 event attributes are case-sensitive and take the event name as written: onminerva-change, onminerva-input, onminerva-open-change. The handler receives the CustomEvent, with the new state in event.detail. onclick and other native events work as usual.

bind:this gives you the element instance, to call its methods (show(), hide(), focus()) or read its properties. Its type is the exported element class.

bind:value and bind:checked are meant for native inputs: write the value prop and update your state from the event, as above (minerva-input for each keystroke, minerva-change for a committed value).

### Typings

The package ships typings for svelte/elements, generated from its Custom Elements Manifest: attributes, properties and onminerva-* events of every tag are checked by svelte-check and completed by the Svelte extension. Reference them once:

### SvelteKit and server-side rendering

Pages are rendered on the server first. Importing the elements there is safe (the modules do not touch the DOM when they load), but they only work in the browser, so register them in onMount (which never runs on the server) or behind the browser flag. The server sends the tags with their attributes and slotted content; the browser upgrades them when the import resolves.

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

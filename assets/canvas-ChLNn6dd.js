import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- IconCanvas.vue -->

<script setup lang="ts">
import { ref } from "vue";

// Every canvas icon fires minerva-renderer-change with the backend that drew
// it ("auto" follows setDefaultIconRenderer; a forced backend that cannot
// start here falls back to the next one).

import type { MinervaIcon } from "minerva-design/web-components/icon";

const root = ref<HTMLElement>();

const onChange = (event: Event) => {
  const icon = event.target as MinervaIcon;
  const { renderer } = (event as CustomEvent<{ renderer: string }>).detail;
  const caption = icon.closest("figure")?.querySelector("small");
  if (caption) caption.textContent = renderer;
};
<\/script>

<template>
  <div ref="root" @minerva-renderer-change="onChange">
    <div id="renderers" style="display: flex; flex-wrap: wrap; gap: 24px">
      <figure style="display: grid; justify-items: center; gap: 4px; margin: 0">
        <minerva-icon
          name="settings"
          size="40"
          color="var(--primary-color)"
        ></minerva-icon>
        <figcaption><code>svg</code> <small>SVG</small></figcaption>
      </figure>
      <figure style="display: grid; justify-items: center; gap: 4px; margin: 0">
        <minerva-icon
          name="settings"
          size="40"
          color="var(--primary-color)"
          renderer="auto"
        ></minerva-icon>
        <figcaption><code>auto</code> <small>…</small></figcaption>
      </figure>
      <figure style="display: grid; justify-items: center; gap: 4px; margin: 0">
        <minerva-icon
          name="settings"
          size="40"
          color="var(--primary-color)"
          renderer="webgpu"
        ></minerva-icon>
        <figcaption><code>webgpu</code> <small>…</small></figcaption>
      </figure>
      <figure style="display: grid; justify-items: center; gap: 4px; margin: 0">
        <minerva-icon
          name="settings"
          size="40"
          color="var(--primary-color)"
          renderer="webgl2"
        ></minerva-icon>
        <figcaption><code>webgl2</code> <small>…</small></figcaption>
      </figure>
      <figure style="display: grid; justify-items: center; gap: 4px; margin: 0">
        <minerva-icon
          name="settings"
          size="40"
          color="var(--primary-color)"
          renderer="webgl"
        ></minerva-icon>
        <figcaption><code>webgl</code> <small>…</small></figcaption>
      </figure>
      <figure style="display: grid; justify-items: center; gap: 4px; margin: 0">
        <minerva-icon
          name="settings"
          size="40"
          color="var(--primary-color)"
          renderer="canvas2d"
        ></minerva-icon>
        <figcaption><code>canvas2d</code> <small>…</small></figcaption>
      </figure>
    </div>
  </div>
</template>
`,angular:`// icon-canvas.component.ts

import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  ViewChild,
} from "@angular/core";

// Every canvas icon fires minerva-renderer-change with the backend that drew
// it ("auto" follows setDefaultIconRenderer; a forced backend that cannot
// start here falls back to the next one).
import type { MinervaIcon } from "minerva-design/web-components/icon";

@Component({
  selector: "app-icon-canvas",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <div #root (minerva-renderer-change)="onChange($event)">
      <div id="renderers" style="display: flex; flex-wrap: wrap; gap: 24px">
        <figure
          style="display: grid; justify-items: center; gap: 4px; margin: 0"
        >
          <minerva-icon
            name="settings"
            size="40"
            color="var(--primary-color)"
          ></minerva-icon>
          <figcaption><code>svg</code> <small>SVG</small></figcaption>
        </figure>
        <figure
          style="display: grid; justify-items: center; gap: 4px; margin: 0"
        >
          <minerva-icon
            name="settings"
            size="40"
            color="var(--primary-color)"
            renderer="auto"
          ></minerva-icon>
          <figcaption><code>auto</code> <small>…</small></figcaption>
        </figure>
        <figure
          style="display: grid; justify-items: center; gap: 4px; margin: 0"
        >
          <minerva-icon
            name="settings"
            size="40"
            color="var(--primary-color)"
            renderer="webgpu"
          ></minerva-icon>
          <figcaption><code>webgpu</code> <small>…</small></figcaption>
        </figure>
        <figure
          style="display: grid; justify-items: center; gap: 4px; margin: 0"
        >
          <minerva-icon
            name="settings"
            size="40"
            color="var(--primary-color)"
            renderer="webgl2"
          ></minerva-icon>
          <figcaption><code>webgl2</code> <small>…</small></figcaption>
        </figure>
        <figure
          style="display: grid; justify-items: center; gap: 4px; margin: 0"
        >
          <minerva-icon
            name="settings"
            size="40"
            color="var(--primary-color)"
            renderer="webgl"
          ></minerva-icon>
          <figcaption><code>webgl</code> <small>…</small></figcaption>
        </figure>
        <figure
          style="display: grid; justify-items: center; gap: 4px; margin: 0"
        >
          <minerva-icon
            name="settings"
            size="40"
            color="var(--primary-color)"
            renderer="canvas2d"
          ></minerva-icon>
          <figcaption><code>canvas2d</code> <small>…</small></figcaption>
        </figure>
      </div>
    </div>
  \`,
})
export class IconCanvasComponent {
  @ViewChild("root") root!: ElementRef<HTMLElement>;

  onChange = (event: Event) => {
    const icon = event.target as MinervaIcon;
    const { renderer } = (event as CustomEvent<{ renderer: string }>).detail;
    const caption = icon.closest("figure")?.querySelector("small");
    if (caption) caption.textContent = renderer;
  };
}
`,svelte:`<!-- IconCanvas.svelte -->

<script lang="ts">
  // Every canvas icon fires minerva-renderer-change with the backend that drew
  // it ("auto" follows setDefaultIconRenderer; a forced backend that cannot
  // start here falls back to the next one).

  import type { MinervaIcon } from "minerva-design/web-components/icon";

  let root: HTMLElement;

  const onChange = (event: Event) => {
    const icon = event.target as MinervaIcon;
    const { renderer } = (event as CustomEvent<{ renderer: string }>).detail;
    const caption = icon.closest("figure")?.querySelector("small");
    if (caption) caption.textContent = renderer;
  };
<\/script>

<div
  bind:this={root}
  onminerva-renderer-change={onChange}
>
  <div id="renderers" style="display: flex; flex-wrap: wrap; gap: 24px">
    <figure style="display: grid; justify-items: center; gap: 4px; margin: 0">
      <minerva-icon
        name="settings"
        size="40"
        color="var(--primary-color)"
      ></minerva-icon>
      <figcaption><code>svg</code> <small>SVG</small></figcaption>
    </figure>
    <figure style="display: grid; justify-items: center; gap: 4px; margin: 0">
      <minerva-icon
        name="settings"
        size="40"
        color="var(--primary-color)"
        renderer="auto"
      ></minerva-icon>
      <figcaption><code>auto</code> <small>…</small></figcaption>
    </figure>
    <figure style="display: grid; justify-items: center; gap: 4px; margin: 0">
      <minerva-icon
        name="settings"
        size="40"
        color="var(--primary-color)"
        renderer="webgpu"
      ></minerva-icon>
      <figcaption><code>webgpu</code> <small>…</small></figcaption>
    </figure>
    <figure style="display: grid; justify-items: center; gap: 4px; margin: 0">
      <minerva-icon
        name="settings"
        size="40"
        color="var(--primary-color)"
        renderer="webgl2"
      ></minerva-icon>
      <figcaption><code>webgl2</code> <small>…</small></figcaption>
    </figure>
    <figure style="display: grid; justify-items: center; gap: 4px; margin: 0">
      <minerva-icon
        name="settings"
        size="40"
        color="var(--primary-color)"
        renderer="webgl"
      ></minerva-icon>
      <figcaption><code>webgl</code> <small>…</small></figcaption>
    </figure>
    <figure style="display: grid; justify-items: center; gap: 4px; margin: 0">
      <minerva-icon
        name="settings"
        size="40"
        color="var(--primary-color)"
        renderer="canvas2d"
      ></minerva-icon>
      <figcaption><code>canvas2d</code> <small>…</small></figcaption>
    </figure>
  </div>
</div>
`,solid:`// IconCanvas.tsx

// Every canvas icon fires minerva-renderer-change with the backend that drew
// it ("auto" follows setDefaultIconRenderer; a forced backend that cannot
// start here falls back to the next one).
import type { MinervaIcon } from "minerva-design/web-components/icon";

export default function IconCanvas() {
  let root!: HTMLElement;

  const onChange = (event: Event) => {
    const icon = event.target as MinervaIcon;
    const { renderer } = (event as CustomEvent<{ renderer: string }>).detail;
    const caption = icon.closest("figure")?.querySelector("small");
    if (caption) caption.textContent = renderer;
  };

  return (
    <div ref={root} on:minerva-renderer-change={onChange}>
      <div id="renderers" style="display: flex; flex-wrap: wrap; gap: 24px">
        <figure style="display: grid; justify-items: center; gap: 4px; margin: 0">
          <minerva-icon
            name="settings"
            size="40"
            color="var(--primary-color)"
          ></minerva-icon>
          <figcaption>
            <code>svg</code> <small>SVG</small>
          </figcaption>
        </figure>
        <figure style="display: grid; justify-items: center; gap: 4px; margin: 0">
          <minerva-icon
            name="settings"
            size="40"
            color="var(--primary-color)"
            renderer="auto"
          ></minerva-icon>
          <figcaption>
            <code>auto</code> <small>…</small>
          </figcaption>
        </figure>
        <figure style="display: grid; justify-items: center; gap: 4px; margin: 0">
          <minerva-icon
            name="settings"
            size="40"
            color="var(--primary-color)"
            renderer="webgpu"
          ></minerva-icon>
          <figcaption>
            <code>webgpu</code> <small>…</small>
          </figcaption>
        </figure>
        <figure style="display: grid; justify-items: center; gap: 4px; margin: 0">
          <minerva-icon
            name="settings"
            size="40"
            color="var(--primary-color)"
            renderer="webgl2"
          ></minerva-icon>
          <figcaption>
            <code>webgl2</code> <small>…</small>
          </figcaption>
        </figure>
        <figure style="display: grid; justify-items: center; gap: 4px; margin: 0">
          <minerva-icon
            name="settings"
            size="40"
            color="var(--primary-color)"
            renderer="webgl"
          ></minerva-icon>
          <figcaption>
            <code>webgl</code> <small>…</small>
          </figcaption>
        </figure>
        <figure style="display: grid; justify-items: center; gap: 4px; margin: 0">
          <minerva-icon
            name="settings"
            size="40"
            color="var(--primary-color)"
            renderer="canvas2d"
          ></minerva-icon>
          <figcaption>
            <code>canvas2d</code> <small>…</small>
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
`,html:`<div id="renderers" style="display: flex; flex-wrap: wrap; gap: 24px">
  <figure style="display: grid; justify-items: center; gap: 4px; margin: 0">
    <minerva-icon
      name="settings"
      size="40"
      color="var(--primary-color)"
    ></minerva-icon>
    <figcaption><code>svg</code> <small>SVG</small></figcaption>
  </figure>
  <figure style="display: grid; justify-items: center; gap: 4px; margin: 0">
    <minerva-icon
      name="settings"
      size="40"
      color="var(--primary-color)"
      renderer="auto"
    ></minerva-icon>
    <figcaption><code>auto</code> <small>…</small></figcaption>
  </figure>
  <figure style="display: grid; justify-items: center; gap: 4px; margin: 0">
    <minerva-icon
      name="settings"
      size="40"
      color="var(--primary-color)"
      renderer="webgpu"
    ></minerva-icon>
    <figcaption><code>webgpu</code> <small>…</small></figcaption>
  </figure>
  <figure style="display: grid; justify-items: center; gap: 4px; margin: 0">
    <minerva-icon
      name="settings"
      size="40"
      color="var(--primary-color)"
      renderer="webgl2"
    ></minerva-icon>
    <figcaption><code>webgl2</code> <small>…</small></figcaption>
  </figure>
  <figure style="display: grid; justify-items: center; gap: 4px; margin: 0">
    <minerva-icon
      name="settings"
      size="40"
      color="var(--primary-color)"
      renderer="webgl"
    ></minerva-icon>
    <figcaption><code>webgl</code> <small>…</small></figcaption>
  </figure>
  <figure style="display: grid; justify-items: center; gap: 4px; margin: 0">
    <minerva-icon
      name="settings"
      size="40"
      color="var(--primary-color)"
      renderer="canvas2d"
    ></minerva-icon>
    <figcaption><code>canvas2d</code> <small>…</small></figcaption>
  </figure>
</div>

<script type="module">
  // registers the icon elements (optional entry, loads the icon set)
  import "minerva-design/web-components/icon";

  // Every canvas icon fires minerva-renderer-change with the backend that drew
  // it ("auto" follows setDefaultIconRenderer; a forced backend that cannot
  // start here falls back to the next one).
  const onChange = (event) => {
    const icon = event.target;
    const { renderer } = event.detail;
    const caption = icon.closest("figure")?.querySelector("small");
    if (caption) caption.textContent = renderer;
  };
  document.addEventListener("minerva-renderer-change", onChange);
<\/script>
`}})))()}n();export{t as default};
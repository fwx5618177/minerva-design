import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- IconCanvasBasic.vue -->

<script setup lang="ts">
import { ref } from "vue";

// \`items\` is a JS property (positions in CSS px); one canvas, one GPU draw per
// run of identical icons. The backend follows setDefaultIconRenderer.

import {
  bellIcon,
  homeIcon,
  mailIcon,
  searchIcon,
  settingsIcon,
  userIcon,
} from "minerva-design/icons/core";
import type { MinervaIconCanvas } from "minerva-design/web-components/icon";

const ICONS = [
  homeIcon,
  searchIcon,
  mailIcon,
  bellIcon,
  userIcon,
  settingsIcon,
];

const statusText = ref("…");

const canvasItems = [
  ...ICONS.map((icon, i) => ({ icon, x: 16 + i * 48, y: 16 })),
  ...ICONS.map((icon, i) => ({
    icon,
    x: 16 + i * 48,
    y: 64,
    size: 32,
    color: "var(--primary-color)",
    rotation: i * 15,
  })),
  ...ICONS.map((icon, i) => ({
    icon,
    x: 16 + i * 48,
    y: 112,
    strokeWidth: 1.5,
    opacity: 0.35 + i * 0.13,
  })),
];
const onChange = (event: Event) => {
  const { renderer } = (event as CustomEvent<{ renderer: string }>).detail;
  statusText.value = \`Drawn with \${renderer}\`;
};
<\/script>

<template>
  <div style="display: grid; gap: 8px">
    <minerva-icon-canvas
      id="icons"
      height="160"
      label="Six icons, three ways"
      :items.prop="canvasItems"
      @minerva-renderer-change="onChange"
    ></minerva-icon-canvas>
    <small id="status" role="status">{{ statusText }}</small>
  </div>
</template>
`,angular:`// icon-canvas-basic.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

// \`items\` is a JS property (positions in CSS px); one canvas, one GPU draw per
// run of identical icons. The backend follows setDefaultIconRenderer.
import {
  bellIcon,
  homeIcon,
  mailIcon,
  searchIcon,
  settingsIcon,
  userIcon,
} from "minerva-design/icons/core";
import type { MinervaIconCanvas } from "minerva-design/web-components/icon";

const ICONS = [
  homeIcon,
  searchIcon,
  mailIcon,
  bellIcon,
  userIcon,
  settingsIcon,
];

@Component({
  selector: "app-icon-canvas-basic",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <div style="display: grid; gap: 8px">
      <minerva-icon-canvas
        id="icons"
        height="160"
        label="Six icons, three ways"
        [items]="canvasItems"
        (minerva-renderer-change)="onChange($event)"
      ></minerva-icon-canvas>
      <small id="status" role="status">{{ statusText }}</small>
    </div>
  \`,
})
export class IconCanvasBasicComponent {
  statusText = "…";

  canvasItems = [
    ...ICONS.map((icon, i) => ({ icon, x: 16 + i * 48, y: 16 })),
    ...ICONS.map((icon, i) => ({
      icon,
      x: 16 + i * 48,
      y: 64,
      size: 32,
      color: "var(--primary-color)",
      rotation: i * 15,
    })),
    ...ICONS.map((icon, i) => ({
      icon,
      x: 16 + i * 48,
      y: 112,
      strokeWidth: 1.5,
      opacity: 0.35 + i * 0.13,
    })),
  ];
  onChange = (event: Event) => {
    const { renderer } = (event as CustomEvent<{ renderer: string }>).detail;
    this.statusText = \`Drawn with \${renderer}\`;
  };
}
`,svelte:`<!-- IconCanvasBasic.svelte -->

<script lang="ts">
  // \`items\` is a JS property (positions in CSS px); one canvas, one GPU draw per
  // run of identical icons. The backend follows setDefaultIconRenderer.

  import {
    bellIcon,
    homeIcon,
    mailIcon,
    searchIcon,
    settingsIcon,
    userIcon,
  } from "minerva-design/icons/core";
  import type { MinervaIconCanvas } from "minerva-design/web-components/icon";

  const ICONS = [
    homeIcon,
    searchIcon,
    mailIcon,
    bellIcon,
    userIcon,
    settingsIcon,
  ];

  let statusText = $state("…");

  const canvasItems = [
    ...ICONS.map((icon, i) => ({ icon, x: 16 + i * 48, y: 16 })),
    ...ICONS.map((icon, i) => ({
      icon,
      x: 16 + i * 48,
      y: 64,
      size: 32,
      color: "var(--primary-color)",
      rotation: i * 15,
    })),
    ...ICONS.map((icon, i) => ({
      icon,
      x: 16 + i * 48,
      y: 112,
      strokeWidth: 1.5,
      opacity: 0.35 + i * 0.13,
    })),
  ];
  const onChange = (event: Event) => {
    const { renderer } = (event as CustomEvent<{ renderer: string }>).detail;
    statusText = \`Drawn with \${renderer}\`;
  };
<\/script>

<div style="display: grid; gap: 8px">
  <minerva-icon-canvas
    id="icons"
    height="160"
    label="Six icons, three ways"
    items={canvasItems}
    onminerva-renderer-change={onChange}
  ></minerva-icon-canvas>
  <small id="status" role="status">{statusText}</small>
</div>
`,solid:`// IconCanvasBasic.tsx

import { createSignal } from "solid-js";

// \`items\` is a JS property (positions in CSS px); one canvas, one GPU draw per
// run of identical icons. The backend follows setDefaultIconRenderer.
import {
  bellIcon,
  homeIcon,
  mailIcon,
  searchIcon,
  settingsIcon,
  userIcon,
} from "minerva-design/icons/core";
import type { MinervaIconCanvas } from "minerva-design/web-components/icon";

const ICONS = [
  homeIcon,
  searchIcon,
  mailIcon,
  bellIcon,
  userIcon,
  settingsIcon,
];

export default function IconCanvasBasic() {
  const [statusText, setStatusText] = createSignal("…");

  const canvasItems = [
    ...ICONS.map((icon, i) => ({ icon, x: 16 + i * 48, y: 16 })),
    ...ICONS.map((icon, i) => ({
      icon,
      x: 16 + i * 48,
      y: 64,
      size: 32,
      color: "var(--primary-color)",
      rotation: i * 15,
    })),
    ...ICONS.map((icon, i) => ({
      icon,
      x: 16 + i * 48,
      y: 112,
      strokeWidth: 1.5,
      opacity: 0.35 + i * 0.13,
    })),
  ];
  const onChange = (event: Event) => {
    const { renderer } = (event as CustomEvent<{ renderer: string }>).detail;
    setStatusText(\`Drawn with \${renderer}\`);
  };

  return (
    <div style="display: grid; gap: 8px">
      <minerva-icon-canvas
        id="icons"
        height="160"
        label="Six icons, three ways"
        prop:items={canvasItems}
        on:minerva-renderer-change={onChange}
      ></minerva-icon-canvas>
      <small id="status" role="status">
        {statusText()}
      </small>
    </div>
  );
}
`,html:`<div style="display: grid; gap: 8px">
  <minerva-icon-canvas
    id="icons"
    height="160"
    label="Six icons, three ways"
  ></minerva-icon-canvas>
  <small id="status" role="status">…</small>
</div>

<script type="module">
  // registers the icon elements (optional entry, loads the icon set)
  import "minerva-design/web-components/icon";

  // \`items\` is a JS property (positions in CSS px); one canvas, one GPU draw per
  // run of identical icons. The backend follows setDefaultIconRenderer.
  // \`items\` is a JS property (positions in CSS px); one canvas, one GPU draw per
  // run of identical icons. The backend follows setDefaultIconRenderer.
  import {
    bellIcon,
    homeIcon,
    mailIcon,
    searchIcon,
    settingsIcon,
    userIcon,
  } from "minerva-design/icons/core";

  const ICONS = [
    homeIcon,
    searchIcon,
    mailIcon,
    bellIcon,
    userIcon,
    settingsIcon,
  ];

  const canvas = document.querySelector("#icons");
  const status = document.querySelector("#status");
  canvas.items = [
    ...ICONS.map((icon, i) => ({ icon, x: 16 + i * 48, y: 16 })),
    ...ICONS.map((icon, i) => ({
      icon,
      x: 16 + i * 48,
      y: 64,
      size: 32,
      color: "var(--primary-color)",
      rotation: i * 15,
    })),
    ...ICONS.map((icon, i) => ({
      icon,
      x: 16 + i * 48,
      y: 112,
      strokeWidth: 1.5,
      opacity: 0.35 + i * 0.13,
    })),
  ];
  const onChange = (event) => {
    const { renderer } = event.detail;
    status.textContent = \`Drawn with \${renderer}\`;
  };
  canvas.addEventListener("minerva-renderer-change", onChange);
<\/script>
`}})))()}n();export{t as default};
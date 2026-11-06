import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- OrderBookHeatmapCandlesNavigation.vue -->

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";

import "minerva-design/web-components/button";
import "minerva-design/web-components/slider";
import type { MinervaOrderBookHeatmap } from "minerva-design/web-components/order-book";
import type { OrderBookHeatmapViewData } from "minerva-design/charts/core";
import {
  createFrameworkHistory,
  getFrameworkLabels,
} from "../framework-history";

const heatmap = ref<MinervaOrderBookHeatmap>();
const latest = ref<HTMLElement>();
const full = ref<HTMLElement>();
const follow = ref<HTMLElement>();
const intensity = ref<HTMLElement>();
const outputText = ref("");
const sourceText = ref("");

let current: OrderBookHeatmapViewData | null = null;
let minimum = 0;
const renderLabels = () => {
  // minerva-config writes lang on its scope; the closest ancestor wins.
  const languageScope =
    heatmap.value!.closest("[lang]") || document.documentElement;
  const text = getFrameworkLabels(
    languageScope.getAttribute("lang") || document.documentElement.lang,
  );
  sourceText.value = text.source;
  latest.value!.textContent = text.latest;
  full.value!.textContent = text.full;
  follow.value!.textContent = text.follow;
  intensity.value!.setAttribute("aria-label", text.minimum);
  const view = current?.view;
  const seconds = view ? Math.round((view.time[1] - view.time[0]) / 1000) : 30;
  outputText.value = \`\${view?.follow ? text.following : text.manual} · \${text.minimum} \${minimum}% · \${seconds} \${text.visible}\`;
};
const languageChanges = new MutationObserver(renderLabels);
const history = createFrameworkHistory();
const options = {
  interval: 250,
  window: 30000,
  history: 60000,
  maxBars: 30,
  maxColumns: 240,
};
const heatmapOptions = options;
const show = (seconds: number) =>
  heatmap.value!.setView({
    time: [history.end - seconds * 1000, history.end],
    price: [98, 102],
  });
const listeners: Array<() => void> = [];
const listen = (element: HTMLElement, type: string, handler: EventListener) => {
  element.addEventListener(type, handler);
  listeners.push(() => element.removeEventListener(type, handler));
};
let disposed = false;

onMounted(() => {
  renderLabels();
  languageChanges.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["lang"],
    subtree: true,
  });
  listen(latest.value!, "click", () => show(10));
  listen(full.value!, "click", () => show(30));
  listen(follow.value!, "click", () => heatmap.value!.resetView());
  listen(intensity.value!, "minerva-change", (event) => {
    minimum = (event as CustomEvent<{ value: number }>).detail.value;
    heatmap.value!.options = { ...options, intensityRange: [minimum / 100, 1] };
    renderLabels();
  });
  listen(heatmap.value!, "minerva-view-change", (event) => {
    current = (event as CustomEvent<OrderBookHeatmapViewData>).detail;
    renderLabels();
  });
  // Apply interval/retention before closing historical book columns.
  void heatmap.value!.updateComplete.then(() => {
    if (disposed) return;
    for (const book of history.books) heatmap.value!.setBook(book);
    heatmap.value!.addTrades(history.trades);
    // Property only: object rows and typed columns are never serialized as attributes.
    heatmap.value!.bars = history.bars;
    show(30);
  });
});

onBeforeUnmount(() => {
  disposed = true;
  languageChanges.disconnect();
  listeners.forEach((dispose) => dispose());
});
<\/script>

<template>
  <div style="display: grid; gap: 12px; width: 100%">
    <p id="source">{{ sourceText }}</p>
    <div style="display: flex; gap: 8px; flex-wrap: wrap">
      <minerva-button id="latest" size="small" variant="outline" ref="latest"
        >Latest 10s</minerva-button
      >
      <minerva-button id="full" size="small" variant="outline" ref="full"
        >Full 30s</minerva-button
      >
      <minerva-button id="follow" size="small" ref="follow"></minerva-button>
    </div>
    <minerva-slider
      id="intensity"
      aria-label=""
      min="0"
      max="90"
      step="5"
      value="0"
      show-value
      style="max-width: 320px"
      ref="intensity"
    ></minerva-slider>
    <minerva-order-book-heatmap
      id="heatmap"
      height="400"
      ref="heatmap"
      :options.prop="heatmapOptions"
    ></minerva-order-book-heatmap>
    <output id="view" aria-live="polite">{{ outputText }}</output>
  </div>
</template>
`,angular:`// order-book-heatmap-candles-navigation.component.ts

import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  ViewChild,
  type AfterViewInit,
  type OnDestroy,
} from "@angular/core";

import "minerva-design/web-components/button";
import "minerva-design/web-components/slider";
import type { MinervaOrderBookHeatmap } from "minerva-design/web-components/order-book";
import type { OrderBookHeatmapViewData } from "minerva-design/charts/core";
import {
  createFrameworkHistory,
  getFrameworkLabels,
} from "../framework-history";

@Component({
  selector: "app-order-book-heatmap-candles-navigation",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <div style="display: grid; gap: 12px; width: 100%">
      <p id="source">{{ sourceText }}</p>
      <div style="display: flex; gap: 8px; flex-wrap: wrap">
        <minerva-button id="latest" size="small" variant="outline" #latest
          >Latest 10s</minerva-button
        >
        <minerva-button id="full" size="small" variant="outline" #full
          >Full 30s</minerva-button
        >
        <minerva-button id="follow" size="small" #follow></minerva-button>
      </div>
      <minerva-slider
        id="intensity"
        aria-label=""
        min="0"
        max="90"
        step="5"
        value="0"
        show-value
        style="max-width: 320px"
        #intensity
      ></minerva-slider>
      <minerva-order-book-heatmap
        id="heatmap"
        height="400"
        #heatmap
        [options]="heatmapOptions"
      ></minerva-order-book-heatmap>
      <output id="view" aria-live="polite">{{ outputText }}</output>
    </div>
  \`,
})
export class OrderBookHeatmapCandlesNavigationComponent
  implements AfterViewInit, OnDestroy
{
  @ViewChild("heatmap") heatmap!: ElementRef<MinervaOrderBookHeatmap>;
  @ViewChild("latest") latest!: ElementRef<HTMLElement>;
  @ViewChild("full") full!: ElementRef<HTMLElement>;
  @ViewChild("follow") follow!: ElementRef<HTMLElement>;
  @ViewChild("intensity") intensity!: ElementRef<HTMLElement>;
  outputText = "";
  sourceText = "";

  current: OrderBookHeatmapViewData | null = null;
  minimum = 0;
  renderLabels = () => {
    // minerva-config writes lang on its scope; the closest ancestor wins.
    const languageScope =
      this.heatmap.nativeElement.closest("[lang]") || document.documentElement;
    const text = getFrameworkLabels(
      languageScope.getAttribute("lang") || document.documentElement.lang,
    );
    this.sourceText = text.source;
    this.latest.nativeElement.textContent = text.latest;
    this.full.nativeElement.textContent = text.full;
    this.follow.nativeElement.textContent = text.follow;
    this.intensity.nativeElement.setAttribute("aria-label", text.minimum);
    const view = this.current?.view;
    const seconds = view
      ? Math.round((view.time[1] - view.time[0]) / 1000)
      : 30;
    this.outputText = \`\${view?.follow ? text.following : text.manual} · \${text.minimum} \${this.minimum}% · \${seconds} \${text.visible}\`;
  };
  languageChanges = new MutationObserver(this.renderLabels);
  history = createFrameworkHistory();
  options = {
    interval: 250,
    window: 30000,
    history: 60000,
    maxBars: 30,
    maxColumns: 240,
  };
  heatmapOptions = this.options;
  show = (seconds: number) =>
    this.heatmap.nativeElement.setView({
      time: [this.history.end - seconds * 1000, this.history.end],
      price: [98, 102],
    });
  listeners: Array<() => void> = [];
  listen = (element: HTMLElement, type: string, handler: EventListener) => {
    element.addEventListener(type, handler);
    this.listeners.push(() => element.removeEventListener(type, handler));
  };
  disposed = false;

  ngAfterViewInit(): void {
    this.renderLabels();
    this.languageChanges.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang"],
      subtree: true,
    });
    this.listen(this.latest.nativeElement, "click", () => this.show(10));
    this.listen(this.full.nativeElement, "click", () => this.show(30));
    this.listen(this.follow.nativeElement, "click", () =>
      this.heatmap.nativeElement.resetView(),
    );
    this.listen(this.intensity.nativeElement, "minerva-change", (event) => {
      this.minimum = (event as CustomEvent<{ value: number }>).detail.value;
      this.heatmap.nativeElement.options = {
        ...this.options,
        intensityRange: [this.minimum / 100, 1],
      };
      this.renderLabels();
    });
    this.listen(this.heatmap.nativeElement, "minerva-view-change", (event) => {
      this.current = (event as CustomEvent<OrderBookHeatmapViewData>).detail;
      this.renderLabels();
    });
    // Apply interval/retention before closing historical book columns.
    void this.heatmap.nativeElement.updateComplete.then(() => {
      if (this.disposed) return;
      for (const book of this.history.books)
        this.heatmap.nativeElement.setBook(book);
      this.heatmap.nativeElement.addTrades(this.history.trades);
      // Property only: object rows and typed columns are never serialized as attributes.
      this.heatmap.nativeElement.bars = this.history.bars;
      this.show(30);
    });
  }

  ngOnDestroy(): void {
    this.disposed = true;
    this.languageChanges.disconnect();
    this.listeners.forEach((dispose) => dispose());
  }
}
`,svelte:`<!-- OrderBookHeatmapCandlesNavigation.svelte -->

<script lang="ts">
  import { onMount } from "svelte";

  import "minerva-design/web-components/button";
  import "minerva-design/web-components/slider";
  import type { MinervaOrderBookHeatmap } from "minerva-design/web-components/order-book";
  import type { OrderBookHeatmapViewData } from "minerva-design/charts/core";
  import {
    createFrameworkHistory,
    getFrameworkLabels,
  } from "../framework-history";

  let heatmap: MinervaOrderBookHeatmap;
  let latest: HTMLElement;
  let full: HTMLElement;
  let follow: HTMLElement;
  let intensity: HTMLElement;
  let outputText = $state("");
  let sourceText = $state("");

  let current: OrderBookHeatmapViewData | null = null;
  let minimum = 0;
  const renderLabels = () => {
    // minerva-config writes lang on its scope; the closest ancestor wins.
    const languageScope = heatmap.closest("[lang]") || document.documentElement;
    const text = getFrameworkLabels(
      languageScope.getAttribute("lang") || document.documentElement.lang,
    );
    sourceText = text.source;
    latest.textContent = text.latest;
    full.textContent = text.full;
    follow.textContent = text.follow;
    intensity.setAttribute("aria-label", text.minimum);
    const view = current?.view;
    const seconds = view ? Math.round((view.time[1] - view.time[0]) / 1000) : 30;
    outputText = \`\${view?.follow ? text.following : text.manual} · \${text.minimum} \${minimum}% · \${seconds} \${text.visible}\`;
  };
  const languageChanges = new MutationObserver(renderLabels);
  const history = createFrameworkHistory();
  const options = {
    interval: 250,
    window: 30000,
    history: 60000,
    maxBars: 30,
    maxColumns: 240,
  };
  const heatmapOptions = options;
  const show = (seconds: number) =>
    heatmap.setView({
      time: [history.end - seconds * 1000, history.end],
      price: [98, 102],
    });
  const listeners: Array<() => void> = [];
  const listen = (element: HTMLElement, type: string, handler: EventListener) => {
    element.addEventListener(type, handler);
    listeners.push(() => element.removeEventListener(type, handler));
  };
  let disposed = false;

  onMount(() => {
    renderLabels();
    languageChanges.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang"],
      subtree: true,
    });
    listen(latest, "click", () => show(10));
    listen(full, "click", () => show(30));
    listen(follow, "click", () => heatmap.resetView());
    listen(intensity, "minerva-change", (event) => {
      minimum = (event as CustomEvent<{ value: number }>).detail.value;
      heatmap.options = { ...options, intensityRange: [minimum / 100, 1] };
      renderLabels();
    });
    listen(heatmap, "minerva-view-change", (event) => {
      current = (event as CustomEvent<OrderBookHeatmapViewData>).detail;
      renderLabels();
    });
    // Apply interval/retention before closing historical book columns.
    void heatmap.updateComplete.then(() => {
      if (disposed) return;
      for (const book of history.books) heatmap.setBook(book);
      heatmap.addTrades(history.trades);
      // Property only: object rows and typed columns are never serialized as attributes.
      heatmap.bars = history.bars;
      show(30);
    });
    return () => {
      disposed = true;
      languageChanges.disconnect();
      listeners.forEach((dispose) => dispose());
    };
  });
<\/script>

<div style="display: grid; gap: 12px; width: 100%">
  <p id="source">{sourceText}</p>
  <div style="display: flex; gap: 8px; flex-wrap: wrap">
    <minerva-button
      id="latest"
      size="small"
      variant="outline"
      bind:this={latest}
    >Latest 10s</minerva-button>
    <minerva-button
      id="full"
      size="small"
      variant="outline"
      bind:this={full}
    >Full 30s</minerva-button>
    <minerva-button id="follow" size="small" bind:this={follow}></minerva-button>
  </div>
  <minerva-slider
    id="intensity"
    aria-label=""
    min="0"
    max="90"
    step="5"
    value="0"
    show-value
    style="max-width: 320px"
    bind:this={intensity}
  ></minerva-slider>
  <minerva-order-book-heatmap
    id="heatmap"
    height="400"
    bind:this={heatmap}
    options={heatmapOptions}
  ></minerva-order-book-heatmap>
  <output id="view" aria-live="polite">{outputText}</output>
</div>
`,solid:`// OrderBookHeatmapCandlesNavigation.tsx

import { createSignal, onCleanup, onMount } from "solid-js";

import "minerva-design/web-components/button";
import "minerva-design/web-components/slider";
import type { MinervaOrderBookHeatmap } from "minerva-design/web-components/order-book";
import type { OrderBookHeatmapViewData } from "minerva-design/charts/core";
import {
  createFrameworkHistory,
  getFrameworkLabels,
} from "../framework-history";

export default function OrderBookHeatmapCandlesNavigation() {
  let heatmap!: MinervaOrderBookHeatmap;
  let latest!: HTMLElement;
  let full!: HTMLElement;
  let follow!: HTMLElement;
  let intensity!: HTMLElement;
  const [outputText, setOutputText] = createSignal("");
  const [sourceText, setSourceText] = createSignal("");

  let current: OrderBookHeatmapViewData | null = null;
  let minimum = 0;
  const renderLabels = () => {
    // minerva-config writes lang on its scope; the closest ancestor wins.
    const languageScope = heatmap.closest("[lang]") || document.documentElement;
    const text = getFrameworkLabels(
      languageScope.getAttribute("lang") || document.documentElement.lang,
    );
    setSourceText(text.source);
    latest.textContent = text.latest;
    full.textContent = text.full;
    follow.textContent = text.follow;
    intensity.setAttribute("aria-label", text.minimum);
    const view = current?.view;
    const seconds = view
      ? Math.round((view.time[1] - view.time[0]) / 1000)
      : 30;
    setOutputText(
      \`\${view?.follow ? text.following : text.manual} · \${text.minimum} \${minimum}% · \${seconds} \${text.visible}\`,
    );
  };
  const languageChanges = new MutationObserver(renderLabels);
  const history = createFrameworkHistory();
  const options = {
    interval: 250,
    window: 30000,
    history: 60000,
    maxBars: 30,
    maxColumns: 240,
  };
  const heatmapOptions = options;
  const show = (seconds: number) =>
    heatmap.setView({
      time: [history.end - seconds * 1000, history.end],
      price: [98, 102],
    });
  const listeners: Array<() => void> = [];
  const listen = (
    element: HTMLElement,
    type: string,
    handler: EventListener,
  ) => {
    element.addEventListener(type, handler);
    listeners.push(() => element.removeEventListener(type, handler));
  };
  let disposed = false;

  onMount(() => {
    renderLabels();
    languageChanges.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang"],
      subtree: true,
    });
    listen(latest, "click", () => show(10));
    listen(full, "click", () => show(30));
    listen(follow, "click", () => heatmap.resetView());
    listen(intensity, "minerva-change", (event) => {
      minimum = (event as CustomEvent<{ value: number }>).detail.value;
      heatmap.options = { ...options, intensityRange: [minimum / 100, 1] };
      renderLabels();
    });
    listen(heatmap, "minerva-view-change", (event) => {
      current = (event as CustomEvent<OrderBookHeatmapViewData>).detail;
      renderLabels();
    });
    // Apply interval/retention before closing historical book columns.
    void heatmap.updateComplete.then(() => {
      if (disposed) return;
      for (const book of history.books) heatmap.setBook(book);
      heatmap.addTrades(history.trades);
      // Property only: object rows and typed columns are never serialized as attributes.
      heatmap.bars = history.bars;
      show(30);
    });
  });

  onCleanup(() => {
    disposed = true;
    languageChanges.disconnect();
    listeners.forEach((dispose) => dispose());
  });

  return (
    <div style="display: grid; gap: 12px; width: 100%">
      <p id="source">{sourceText()}</p>
      <div style="display: flex; gap: 8px; flex-wrap: wrap">
        <minerva-button id="latest" size="small" variant="outline" ref={latest}>
          Latest 10s
        </minerva-button>
        <minerva-button id="full" size="small" variant="outline" ref={full}>
          Full 30s
        </minerva-button>
        <minerva-button id="follow" size="small" ref={follow}></minerva-button>
      </div>
      <minerva-slider
        id="intensity"
        aria-label=""
        min="0"
        max="90"
        step="5"
        value="0"
        show-value
        style="max-width: 320px"
        ref={intensity}
      ></minerva-slider>
      <minerva-order-book-heatmap
        id="heatmap"
        height="400"
        ref={heatmap}
        prop:options={heatmapOptions}
      ></minerva-order-book-heatmap>
      <output id="view" aria-live="polite">
        {outputText()}
      </output>
    </div>
  );
}
`,html:`<div style="display: grid; gap: 12px; width: 100%">
  <p id="source"></p>
  <div style="display: flex; gap: 8px; flex-wrap: wrap">
    <minerva-button id="latest" size="small" variant="outline"
      >Latest 10s</minerva-button
    >
    <minerva-button id="full" size="small" variant="outline"
      >Full 30s</minerva-button
    >
    <minerva-button id="follow" size="small"></minerva-button>
  </div>
  <minerva-slider
    id="intensity"
    aria-label=""
    min="0"
    max="90"
    step="5"
    value="0"
    show-value
    style="max-width: 320px"
  ></minerva-slider>
  <minerva-order-book-heatmap
    id="heatmap"
    height="400"
  ></minerva-order-book-heatmap>
  <output id="view" aria-live="polite"></output>
</div>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  // no build step: load cdn/order-book.js + cdn/minerva.js instead (see the setup)
  import "minerva-design/web-components/order-book";
  // registers every <minerva-*> element (or import one entry per element)
  import "minerva-design/web-components";

  import "minerva-design/web-components/button";
  import "minerva-design/web-components/slider";
  import {
    createFrameworkHistory,
    getFrameworkLabels,
  } from "../framework-history";

  const heatmap = document.querySelector("#heatmap");
  const output = document.querySelector("#view");
  const source = document.querySelector("#source");
  const latest = document.querySelector("#latest");
  const full = document.querySelector("#full");
  const follow = document.querySelector("#follow");
  const intensity = document.querySelector("#intensity");
  let current = null;
  let minimum = 0;
  const renderLabels = () => {
    // minerva-config writes lang on its scope; the closest ancestor wins.
    const languageScope = heatmap.closest("[lang]") || document.documentElement;
    const text = getFrameworkLabels(
      languageScope.getAttribute("lang") || document.documentElement.lang,
    );
    source.textContent = text.source;
    latest.textContent = text.latest;
    full.textContent = text.full;
    follow.textContent = text.follow;
    intensity.setAttribute("aria-label", text.minimum);
    const view = current?.view;
    const seconds = view ? Math.round((view.time[1] - view.time[0]) / 1000) : 30;
    output.value = \`\${view?.follow ? text.following : text.manual} · \${text.minimum} \${minimum}% · \${seconds} \${text.visible}\`;
  };
  renderLabels();
  const languageChanges = new MutationObserver(renderLabels);
  languageChanges.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["lang"],
    subtree: true,
  });
  const history = createFrameworkHistory();
  const options = {
    interval: 250,
    window: 30000,
    history: 60000,
    maxBars: 30,
    maxColumns: 240,
  };
  heatmap.options = options;
  const show = (seconds) =>
    heatmap.setView({
      time: [history.end - seconds * 1000, history.end],
      price: [98, 102],
    });
  const listeners = [];
  const listen = (element, type, handler) => {
    element.addEventListener(type, handler);
    listeners.push(() => element.removeEventListener(type, handler));
  };
  listen(latest, "click", () => show(10));
  listen(full, "click", () => show(30));
  listen(follow, "click", () => heatmap.resetView());
  listen(intensity, "minerva-change", (event) => {
    minimum = event.detail.value;
    heatmap.options = { ...options, intensityRange: [minimum / 100, 1] };
    renderLabels();
  });
  listen(heatmap, "minerva-view-change", (event) => {
    current = event.detail;
    renderLabels();
  });
  let disposed = false;
  // Apply interval/retention before closing historical book columns.
  void heatmap.updateComplete.then(() => {
    if (disposed) return;
    for (const book of history.books) heatmap.setBook(book);
    heatmap.addTrades(history.trades);
    // Property only: object rows and typed columns are never serialized as attributes.
    heatmap.bars = history.bars;
    show(30);
  });
<\/script>
`}})))()}n();export{t as default};
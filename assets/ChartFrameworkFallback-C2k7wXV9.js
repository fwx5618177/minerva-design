import{n as e}from"./rolldown-runtime-B0Z9INg1.js";import{i as t,r as n}from"./native-preview-BRFLbKzw.js";import{o as r,t as i}from"./react-vendor-CVmG4vV9.js";import{c as a,s as o}from"./renderer.module-BadIvTUR.js";import{n as s,t as c}from"./useTranslation-eGG0J4pK.js";import{n as l,t as u}from"./CodeBlock-C_riYUGn.js";import{i as d,r as f}from"./DemoBlock-BXdX6oLT.js";function p(e){let t=e.id;return e.category===`charts3d`?`createChart3D`:t===`depth-chart`?`createDepthChart`:t===`order-book`?`createOrderBook`:t===`order-book-heatmap`?`createOrderBookHeatmap`:t===`time-and-sales`?`createTimeAndSales`:t===`trading-chart`||t===`technical-indicators`?`createTradingChart`:/^(pie|donut|radar|gauge|funnel|treemap|sankey|sunburst|radial-bar|bullet)-chart$|^calendar-heatmap$/.test(t)?`createShapeChart`:`createChart`}var m,h,g,_,v;function y(){return(y=e((()=>{t(),a(),c(),r(),l(),d(),m=n(),h=`Parameters<typeof FACTORY>[1]`,g={vue:{language:`html`,code:`<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import { FACTORY } from "minerva-design/charts/core";

const props = defineProps<{ options: ${h} }>();
const container = ref<HTMLDivElement>();
let chart: ReturnType<typeof FACTORY> | undefined;

onMounted(() => {
  chart = FACTORY(container.value!, props.options);
});
watch(
  () => props.options,
  (options) => chart?.setOptions(options),
);
onBeforeUnmount(() => chart?.destroy());
<\/script>

<template>
  <div ref="container" style="width: 100%; height: 320px"></div>
</template>
`},angular:{language:`ts`,code:`import {
  Component,
  DestroyRef,
  ElementRef,
  Injector,
  afterNextRender,
  effect,
  inject,
  input,
  viewChild,
} from "@angular/core";
import { FACTORY } from "minerva-design/charts/core";

@Component({
  selector: "app-chart",
  template: \`<div #host style="width: 100%; height: 320px"></div>\`,
})
export class AppChart {
  readonly options = input.required<${h}>();
  private readonly host = viewChild.required<ElementRef<HTMLElement>>("host");

  constructor() {
    let chart: ReturnType<typeof FACTORY> | undefined;
    const injector = inject(Injector);
    // browser only (SSR-safe): create after the first render
    afterNextRender(() => {
      chart = FACTORY(this.host().nativeElement, this.options());
      effect(() => chart?.setOptions(this.options()), { injector });
    });
    inject(DestroyRef).onDestroy(() => chart?.destroy());
  }
}
`},svelte:{language:`html`,code:`<script lang="ts">
  import { onMount } from "svelte";
  import { FACTORY } from "minerva-design/charts/core";

  let { options }: { options: ${h} } = $props();
  let container: HTMLDivElement;
  let chart: ReturnType<typeof FACTORY> | undefined;

  onMount(() => {
    chart = FACTORY(container, options);
    return () => chart?.destroy();
  });
  $effect(() => chart?.setOptions(options));
<\/script>

<div bind:this={container} style="width: 100%; height: 320px"></div>
`},solid:{language:`tsx`,code:`import { createEffect, onCleanup, onMount } from "solid-js";
import { FACTORY } from "minerva-design/charts/core";

export default function Chart(props: { options: ${h} }) {
  let container!: HTMLDivElement;
  onMount(() => {
    const chart = FACTORY(container, props.options);
    createEffect(() => chart.setOptions(props.options));
    onCleanup(() => chart.destroy());
  });
  return <div ref={container} style={{ width: "100%", height: "320px" }} />;
}
`},html:{language:`html`,code:`<div id="chart" style="width: 100%; height: 320px"></div>

<script type="module">
  import { FACTORY } from "minerva-design/charts/core";

  const options = {
    /* the options of the React examples of this page */
  };
  const chart = FACTORY(document.getElementById("chart"), options);
  // chart.setOptions(next) to update it, chart.destroy() to remove it
<\/script>
`}},_={createChart:{vue:`<Chart> (import { Chart } from "minerva-design/vue")`,angular:`<mn-chart> (MnChart from "minerva-design/angular")`,wc:`<minerva-chart> (import "minerva-design/web-components/chart")`},createShapeChart:{vue:`<ShapeChart> (import { ShapeChart } from "minerva-design/vue")`,angular:`<mn-shape-chart> (MnShapeChart from "minerva-design/angular")`,wc:`<minerva-shape-chart> (import "minerva-design/web-components/chart")`},createTradingChart:{vue:`<TradingChart> (import { TradingChart } from "minerva-design/vue")`,angular:`<mn-trading-chart> (MnTradingChart from "minerva-design/angular")`,wc:`<minerva-trading-chart> (import "minerva-design/web-components/trading-chart")`},createDepthChart:{vue:`<DepthChart> (import { DepthChart } from "minerva-design/vue")`,angular:`<mn-depth-chart> (MnDepthChart from "minerva-design/angular")`,wc:`<minerva-depth-chart> (import "minerva-design/web-components/order-book")`},createOrderBook:{vue:`<OrderBook> (import { OrderBook } from "minerva-design/vue")`,angular:`<mn-order-book> (MnOrderBook from "minerva-design/angular")`,wc:`<minerva-order-book> (import "minerva-design/web-components/order-book")`},createOrderBookHeatmap:{vue:`<OrderBookHeatmap> (import { OrderBookHeatmap } from "minerva-design/vue")`,angular:`<mn-order-book-heatmap> (MnOrderBookHeatmap from "minerva-design/angular")`,wc:`<minerva-order-book-heatmap> (import "minerva-design/web-components/order-book")`},createTimeAndSales:{vue:`<TimeAndSales> (import { TimeAndSales } from "minerva-design/vue")`,angular:`<mn-time-and-sales> (MnTimeAndSales from "minerva-design/angular")`,wc:`<minerva-time-and-sales> (import "minerva-design/web-components/order-book")`},createChart3D:{vue:`<Scatter3DChart>, <Surface3DChart>, <Bar3DChart>, <Line3DChart> (minerva-design/vue)`,angular:`<mn-scatter-3d-chart>, <mn-surface-3d-chart>, <mn-bar-3d-chart>, <mn-line-3d-chart> (minerva-design/angular)`,wc:`<minerva-scatter-3d-chart>, <minerva-surface-3d-chart>, <minerva-bar-3d-chart>, <minerva-line-3d-chart> (import "minerva-design/web-components/chart-3d")`}},v=({meta:e,framework:t})=>{let{t:n}=s(),r=p(e),a=g[t.id]??g.html,c=t.renderer===`vue`?`vue`:t.renderer===`angular`?`angular`:`wc`,l=_[r]?.[c];return(0,m.jsxs)(`section`,{className:f.section,"aria-labelledby":`chart-engine-usage`,"data-testid":`chart-engine-fallback`,children:[(0,m.jsx)(`h2`,{id:`chart-engine-usage`,children:n(`doc.fw.chart.title`)}),(0,m.jsx)(`p`,{className:f.callout,children:(0,m.jsx)(o,{i18nKey:`doc.fw.chart.intro`,values:{framework:t.label,factory:r},components:{engine:(0,m.jsx)(i,{to:`/chart-engine`}),code:(0,m.jsx)(`code`,{})}})}),l&&(0,m.jsx)(`p`,{className:f.prose,children:n(`doc.fw.chart.wrapper`,{wrapper:l})}),(0,m.jsx)(u,{code:a.code.replace(/FACTORY/g,r),language:a.language}),(0,m.jsx)(`p`,{className:f.prose,children:(0,m.jsx)(o,{i18nKey:`doc.fw.chart.more`,components:{engine:(0,m.jsx)(i,{to:`/chart-engine`}),mini:(0,m.jsx)(i,{to:`/mini-program-charts`})}})})]})}})))()}export{y as n,v as t};
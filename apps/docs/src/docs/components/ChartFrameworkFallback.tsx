import React from "react";
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router";
import CodeBlock from "@layout/CodeBlock";
import type { DocPageMeta } from "../registry";
import type { FrameworkDef } from "../frameworks";
import styles from "./docs.module.scss";

/** Engine factory of `minerva-design/charts/core` drawing a chart page */
function chartFactoryOf(meta: DocPageMeta): string {
  const id = meta.id;
  if (meta.category === "charts3d") return "createChart3D";
  if (id === "depth-chart") return "createDepthChart";
  if (id === "order-book") return "createOrderBook";
  if (id === "order-book-heatmap") return "createOrderBookHeatmap";
  if (id === "time-and-sales") return "createTimeAndSales";
  if (id === "trading-chart" || id === "technical-indicators")
    return "createTradingChart";
  if (
    /^(pie|donut|radar|gauge|funnel|treemap|sankey|sunburst|radial-bar|bullet)-chart$|^calendar-heatmap$/.test(
      id,
    )
  )
    return "createShapeChart";
  return "createChart";
}

const OPTIONS = "Parameters<typeof FACTORY>[1]";

/** The engine wrapped in the idiom of each framework (create / update / destroy) */
const SNIPPETS: Record<string, { language: string; code: string }> = {
  vue: {
    language: "html",
    code: `<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import { FACTORY } from "minerva-design/charts/core";

const props = defineProps<{ options: ${OPTIONS} }>();
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
</script>

<template>
  <div ref="container" style="width: 100%; height: 320px"></div>
</template>
`,
  },
  angular: {
    language: "ts",
    code: `import {
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
  readonly options = input.required<${OPTIONS}>();
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
`,
  },
  svelte: {
    language: "html",
    code: `<script lang="ts">
  import { onMount } from "svelte";
  import { FACTORY } from "minerva-design/charts/core";

  let { options }: { options: ${OPTIONS} } = $props();
  let container: HTMLDivElement;
  let chart: ReturnType<typeof FACTORY> | undefined;

  onMount(() => {
    chart = FACTORY(container, options);
    return () => chart?.destroy();
  });
  $effect(() => chart?.setOptions(options));
</script>

<div bind:this={container} style="width: 100%; height: 320px"></div>
`,
  },
  solid: {
    language: "tsx",
    code: `import { createEffect, onCleanup, onMount } from "solid-js";
import { FACTORY } from "minerva-design/charts/core";

export default function Chart(props: { options: ${OPTIONS} }) {
  let container!: HTMLDivElement;
  onMount(() => {
    const chart = FACTORY(container, props.options);
    createEffect(() => chart.setOptions(props.options));
    onCleanup(() => chart.destroy());
  });
  return <div ref={container} style={{ width: "100%", height: "320px" }} />;
}
`,
  },
  html: {
    language: "html",
    code: `<div id="chart" style="width: 100%; height: 320px"></div>

<script type="module">
  import { FACTORY } from "minerva-design/charts/core";

  const options = {
    /* the options of the React examples of this page */
  };
  const chart = FACTORY(document.getElementById("chart"), options);
  // chart.setOptions(next) to update it, chart.destroy() to remove it
</script>
`,
  },
};

/** Generic wrappers of the engines in each framework */
const WRAPPERS: Record<string, Record<string, string>> = {
  createChart: {
    vue: '<Chart> (import { Chart } from "minerva-design/vue")',
    angular: '<mn-chart> (MnChart from "minerva-design/angular")',
    wc: '<minerva-chart> (import "minerva-design/web-components/chart")',
  },
  createShapeChart: {
    vue: '<ShapeChart> (import { ShapeChart } from "minerva-design/vue")',
    angular: '<mn-shape-chart> (MnShapeChart from "minerva-design/angular")',
    wc: '<minerva-shape-chart> (import "minerva-design/web-components/chart")',
  },
  createTradingChart: {
    vue: '<TradingChart> (import { TradingChart } from "minerva-design/vue")',
    angular:
      '<mn-trading-chart> (MnTradingChart from "minerva-design/angular")',
    wc: '<minerva-trading-chart> (import "minerva-design/web-components/trading-chart")',
  },
  createDepthChart: {
    vue: '<DepthChart> (import { DepthChart } from "minerva-design/vue")',
    angular: '<mn-depth-chart> (MnDepthChart from "minerva-design/angular")',
    wc: '<minerva-depth-chart> (import "minerva-design/web-components/order-book")',
  },
  createOrderBook: {
    vue: '<OrderBook> (import { OrderBook } from "minerva-design/vue")',
    angular: '<mn-order-book> (MnOrderBook from "minerva-design/angular")',
    wc: '<minerva-order-book> (import "minerva-design/web-components/order-book")',
  },
  createOrderBookHeatmap: {
    vue: '<OrderBookHeatmap> (import { OrderBookHeatmap } from "minerva-design/vue")',
    angular:
      '<mn-order-book-heatmap> (MnOrderBookHeatmap from "minerva-design/angular")',
    wc: '<minerva-order-book-heatmap> (import "minerva-design/web-components/order-book")',
  },
  createTimeAndSales: {
    vue: '<TimeAndSales> (import { TimeAndSales } from "minerva-design/vue")',
    angular:
      '<mn-time-and-sales> (MnTimeAndSales from "minerva-design/angular")',
    wc: '<minerva-time-and-sales> (import "minerva-design/web-components/order-book")',
  },
  createChart3D: {
    vue: "<Scatter3DChart>, <Surface3DChart>, <Bar3DChart>, <Line3DChart> (minerva-design/vue)",
    angular:
      "<mn-scatter-3d-chart>, <mn-surface-3d-chart>, <mn-bar-3d-chart>, <mn-line-3d-chart> (minerva-design/angular)",
    wc: '<minerva-scatter-3d-chart>, <minerva-surface-3d-chart>, <minerva-bar-3d-chart>, <minerva-line-3d-chart> (import "minerva-design/web-components/chart-3d")',
  },
};

/**
 * The tab of a framework on a chart page without examples for it: every
 * chart runs on the framework-free engine of minerva-design/charts/core,
 * wrapped in a few lines of the framework (create on mount, `setOptions` on
 * change, `destroy` on unmount), or through the generic chart wrappers.
 */
const ChartFrameworkFallback: React.FC<{
  meta: DocPageMeta;
  framework: FrameworkDef;
}> = ({ meta, framework }) => {
  const { t } = useTranslation();
  const factory = chartFactoryOf(meta);
  const snippet = SNIPPETS[framework.id] ?? SNIPPETS.html;
  const kind =
    framework.renderer === "vue"
      ? "vue"
      : framework.renderer === "angular"
        ? "angular"
        : "wc";
  const wrapper = WRAPPERS[factory]?.[kind];
  return (
    <section
      className={styles.section}
      aria-labelledby="chart-engine-usage"
      data-testid="chart-engine-fallback"
    >
      <h2 id="chart-engine-usage">{t("doc.fw.chart.title")}</h2>
      <p className={styles.callout}>
        <Trans
          i18nKey="doc.fw.chart.intro"
          values={{ framework: framework.label, factory }}
          components={{
            engine: <Link to="/chart-engine" />,
            code: <code />,
          }}
        />
      </p>
      {wrapper && (
        <p className={styles.prose}>{t("doc.fw.chart.wrapper", { wrapper })}</p>
      )}
      <CodeBlock
        code={snippet.code.replace(/FACTORY/g, factory)}
        language={snippet.language}
      />
      <p className={styles.prose}>
        <Trans
          i18nKey="doc.fw.chart.more"
          components={{
            engine: <Link to="/chart-engine" />,
            mini: <Link to="/mini-program-charts" />,
          }}
        />
      </p>
    </section>
  );
};

export default ChartFrameworkFallback;

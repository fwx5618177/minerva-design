import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- SparklineKpi.vue -->

<script setup lang="ts">
import { onMounted, ref } from "vue";

// Word-sized trends (48px high by default) drawn as a line, an area or bars.

import type { MinervaSparkline } from "minerva-design/web-components/chart";

const TEXT = {
  en: { orders: "Orders", revenue: "Revenue", signups: "Sign-ups" },
  zh: { orders: "订单", revenue: "收入", signups: "注册" },
  ja: { orders: "注文", revenue: "売上", signups: "登録" },
  fr: {
    orders: "Commandes",
    revenue: "Chiffre d'affaires",
    signups: "Inscriptions",
  },
};

const ordersLabelText = ref("");
const revenueLabelText = ref("");
const signupsLabelText = ref("");

const text =
  TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
const ordersData = [32, 41, 38, 52, 49, 61, 58, 70, 66, 74];
const ordersValueName = text.orders;
const revenueData = [3.1, 3.4, 3.2, 3.9, 4.4, 4.1, 4.6, 4.8, 4.5, 4.9];
const revenueValueName = text.revenue;
const signupsData = [12, 18, 9, 22, 30, 25, 19, 28, 33, 31];
const signupsValueName = text.signups;

onMounted(() => {
  ordersLabelText.value = text.orders;
  revenueLabelText.value = text.revenue;
  signupsLabelText.value = text.signups;
});
<\/script>

<template>
  <div
    style="
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 12px;
    "
  >
    <div style="display: grid; gap: 4px">
      <span id="orders-label">{{ ordersLabelText }}</span>
      <strong>1,284</strong>
      <minerva-sparkline
        id="orders"
        :data.prop="ordersData"
        :valueName.prop="ordersValueName"
      ></minerva-sparkline>
    </div>
    <div style="display: grid; gap: 4px">
      <span id="revenue-label">{{ revenueLabelText }}</span>
      <strong>€48.2k</strong>
      <minerva-sparkline
        id="revenue"
        type="area"
        :data.prop="revenueData"
        :valueName.prop="revenueValueName"
      ></minerva-sparkline>
    </div>
    <div style="display: grid; gap: 4px">
      <span id="signups-label">{{ signupsLabelText }}</span>
      <strong>312</strong>
      <minerva-sparkline
        id="signups"
        type="bar"
        :data.prop="signupsData"
        :valueName.prop="signupsValueName"
      ></minerva-sparkline>
    </div>
  </div>
</template>
`,angular:`// sparkline-kpi.component.ts

import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  type AfterViewInit,
} from "@angular/core";

// Word-sized trends (48px high by default) drawn as a line, an area or bars.
import type { MinervaSparkline } from "minerva-design/web-components/chart";

const TEXT = {
  en: { orders: "Orders", revenue: "Revenue", signups: "Sign-ups" },
  zh: { orders: "订单", revenue: "收入", signups: "注册" },
  ja: { orders: "注文", revenue: "売上", signups: "登録" },
  fr: {
    orders: "Commandes",
    revenue: "Chiffre d'affaires",
    signups: "Inscriptions",
  },
};

@Component({
  selector: "app-sparkline-kpi",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <div
      style="
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 12px;
      "
    >
      <div style="display: grid; gap: 4px">
        <span id="orders-label">{{ ordersLabelText }}</span>
        <strong>1,284</strong>
        <minerva-sparkline
          id="orders"
          [data]="ordersData"
          [valueName]="ordersValueName"
        ></minerva-sparkline>
      </div>
      <div style="display: grid; gap: 4px">
        <span id="revenue-label">{{ revenueLabelText }}</span>
        <strong>€48.2k</strong>
        <minerva-sparkline
          id="revenue"
          type="area"
          [data]="revenueData"
          [valueName]="revenueValueName"
        ></minerva-sparkline>
      </div>
      <div style="display: grid; gap: 4px">
        <span id="signups-label">{{ signupsLabelText }}</span>
        <strong>312</strong>
        <minerva-sparkline
          id="signups"
          type="bar"
          [data]="signupsData"
          [valueName]="signupsValueName"
        ></minerva-sparkline>
      </div>
    </div>
  \`,
})
export class SparklineKpiComponent implements AfterViewInit {
  ordersLabelText = "";
  revenueLabelText = "";
  signupsLabelText = "";

  text = TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  ordersData = [32, 41, 38, 52, 49, 61, 58, 70, 66, 74];
  ordersValueName = this.text.orders;
  revenueData = [3.1, 3.4, 3.2, 3.9, 4.4, 4.1, 4.6, 4.8, 4.5, 4.9];
  revenueValueName = this.text.revenue;
  signupsData = [12, 18, 9, 22, 30, 25, 19, 28, 33, 31];
  signupsValueName = this.text.signups;

  ngAfterViewInit(): void {
    this.ordersLabelText = this.text.orders;
    this.revenueLabelText = this.text.revenue;
    this.signupsLabelText = this.text.signups;
  }
}
`,svelte:`<!-- SparklineKpi.svelte -->

<script lang="ts">
  import { onMount } from "svelte";

  // Word-sized trends (48px high by default) drawn as a line, an area or bars.

  import type { MinervaSparkline } from "minerva-design/web-components/chart";

  const TEXT = {
    en: { orders: "Orders", revenue: "Revenue", signups: "Sign-ups" },
    zh: { orders: "订单", revenue: "收入", signups: "注册" },
    ja: { orders: "注文", revenue: "売上", signups: "登録" },
    fr: {
      orders: "Commandes",
      revenue: "Chiffre d'affaires",
      signups: "Inscriptions",
    },
  };

  let ordersLabelText = $state("");
  let revenueLabelText = $state("");
  let signupsLabelText = $state("");

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const ordersData = [32, 41, 38, 52, 49, 61, 58, 70, 66, 74];
  const ordersValueName = text.orders;
  const revenueData = [3.1, 3.4, 3.2, 3.9, 4.4, 4.1, 4.6, 4.8, 4.5, 4.9];
  const revenueValueName = text.revenue;
  const signupsData = [12, 18, 9, 22, 30, 25, 19, 28, 33, 31];
  const signupsValueName = text.signups;

  onMount(() => {
    ordersLabelText = text.orders;
    revenueLabelText = text.revenue;
    signupsLabelText = text.signups;
  });
<\/script>

<div
  style="
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 12px;
  "
>
  <div style="display: grid; gap: 4px">
    <span id="orders-label">{ordersLabelText}</span>
    <strong>1,284</strong>
    <minerva-sparkline
      id="orders"
      data={ordersData}
      valueName={ordersValueName}
    ></minerva-sparkline>
  </div>
  <div style="display: grid; gap: 4px">
    <span id="revenue-label">{revenueLabelText}</span>
    <strong>€48.2k</strong>
    <minerva-sparkline
      id="revenue"
      type="area"
      data={revenueData}
      valueName={revenueValueName}
    ></minerva-sparkline>
  </div>
  <div style="display: grid; gap: 4px">
    <span id="signups-label">{signupsLabelText}</span>
    <strong>312</strong>
    <minerva-sparkline
      id="signups"
      type="bar"
      data={signupsData}
      valueName={signupsValueName}
    ></minerva-sparkline>
  </div>
</div>
`,solid:`// SparklineKpi.tsx

import { createSignal, onMount } from "solid-js";

// Word-sized trends (48px high by default) drawn as a line, an area or bars.
import type { MinervaSparkline } from "minerva-design/web-components/chart";

const TEXT = {
  en: { orders: "Orders", revenue: "Revenue", signups: "Sign-ups" },
  zh: { orders: "订单", revenue: "收入", signups: "注册" },
  ja: { orders: "注文", revenue: "売上", signups: "登録" },
  fr: {
    orders: "Commandes",
    revenue: "Chiffre d'affaires",
    signups: "Inscriptions",
  },
};

export default function SparklineKpi() {
  const [ordersLabelText, setOrdersLabelText] = createSignal("");
  const [revenueLabelText, setRevenueLabelText] = createSignal("");
  const [signupsLabelText, setSignupsLabelText] = createSignal("");

  const text =
    TEXT[document.documentElement.lang as keyof typeof TEXT] ?? TEXT.en;
  const ordersData = [32, 41, 38, 52, 49, 61, 58, 70, 66, 74];
  const ordersValueName = text.orders;
  const revenueData = [3.1, 3.4, 3.2, 3.9, 4.4, 4.1, 4.6, 4.8, 4.5, 4.9];
  const revenueValueName = text.revenue;
  const signupsData = [12, 18, 9, 22, 30, 25, 19, 28, 33, 31];
  const signupsValueName = text.signups;

  onMount(() => {
    setOrdersLabelText(text.orders);
    setRevenueLabelText(text.revenue);
    setSignupsLabelText(text.signups);
  });

  return (
    <div
      style="
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 12px;
      "
    >
      <div style="display: grid; gap: 4px">
        <span id="orders-label">{ordersLabelText()}</span>
        <strong>1,284</strong>
        <minerva-sparkline
          id="orders"
          prop:data={ordersData}
          prop:valueName={ordersValueName}
        ></minerva-sparkline>
      </div>
      <div style="display: grid; gap: 4px">
        <span id="revenue-label">{revenueLabelText()}</span>
        <strong>€48.2k</strong>
        <minerva-sparkline
          id="revenue"
          type="area"
          prop:data={revenueData}
          prop:valueName={revenueValueName}
        ></minerva-sparkline>
      </div>
      <div style="display: grid; gap: 4px">
        <span id="signups-label">{signupsLabelText()}</span>
        <strong>312</strong>
        <minerva-sparkline
          id="signups"
          type="bar"
          prop:data={signupsData}
          prop:valueName={signupsValueName}
        ></minerva-sparkline>
      </div>
    </div>
  );
}
`,html:`<div
  style="
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 12px;
  "
>
  <div style="display: grid; gap: 4px">
    <span id="orders-label"></span>
    <strong>1,284</strong>
    <minerva-sparkline id="orders"></minerva-sparkline>
  </div>
  <div style="display: grid; gap: 4px">
    <span id="revenue-label"></span>
    <strong>€48.2k</strong>
    <minerva-sparkline id="revenue" type="area"></minerva-sparkline>
  </div>
  <div style="display: grid; gap: 4px">
    <span id="signups-label"></span>
    <strong>312</strong>
    <minerva-sparkline id="signups" type="bar"></minerva-sparkline>
  </div>
</div>

<script type="module">
  // registers the chart elements (optional entries, load the chart engine)
  import "minerva-design/web-components/chart";

  // Word-sized trends (48px high by default) drawn as a line, an area or bars.
  const TEXT = {
    en: { orders: "Orders", revenue: "Revenue", signups: "Sign-ups" },
    zh: { orders: "订单", revenue: "收入", signups: "注册" },
    ja: { orders: "注文", revenue: "売上", signups: "登録" },
    fr: {
      orders: "Commandes",
      revenue: "Chiffre d'affaires",
      signups: "Inscriptions",
    },
  };

  const text = TEXT[document.documentElement.lang] ?? TEXT.en;
  const ordersLabel = document.querySelector("#orders-label");
  const revenueLabel = document.querySelector("#revenue-label");
  const signupsLabel = document.querySelector("#signups-label");
  const orders = document.querySelector("#orders");
  const revenue = document.querySelector("#revenue");
  const signups = document.querySelector("#signups");
  ordersLabel.textContent = text.orders;
  revenueLabel.textContent = text.revenue;
  signupsLabel.textContent = text.signups;
  orders.data = [32, 41, 38, 52, 49, 61, 58, 70, 66, 74];
  orders.valueName = text.orders;
  revenue.data = [3.1, 3.4, 3.2, 3.9, 4.4, 4.1, 4.6, 4.8, 4.5, 4.9];
  revenue.valueName = text.revenue;
  signups.data = [12, 18, 9, 22, 30, 25, 19, 28, 33, 31];
  signups.valueName = text.signups;
<\/script>
`}})))()}n();export{t as default};
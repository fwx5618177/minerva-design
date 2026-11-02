import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`<script setup lang="ts">
import { computed, ref } from "vue";
import { Slider, VStack, type SliderValue } from "minerva-design/vue";
const price = ref<SliderValue>([20, 80]);
const label = computed(() => {
  const [low, high] = price.value as [number, number];
  return \`From $\${low} to $\${high}\`;
});
const money = (v: number) => \`$\${v}\`;
<\/script>
<template>
  <VStack :gap="3" align="stretch" style="width: 100%; max-width: 420px"
    ><Slider
      v-model="price"
      aria-label="Price"
      range
      :step="5"
      :format-value="money"
      tooltip
      name="price"
    /><output>{{ label }}</output></VStack
  >
</template>
`})))()}n();export{t as default};
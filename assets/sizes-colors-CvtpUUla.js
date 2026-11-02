import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`<script setup lang="ts">
import { Slider, VStack } from "minerva-design/vue";
const colors = ["primary", "success", "info", "warning", "danger"] as const;
<\/script>
<template>
  <VStack :gap="4" align="stretch" style="width: 100%; max-width: 420px"
    ><Slider aria-label="Small" size="small" :default-value="30" /><Slider
      aria-label="Medium"
      :default-value="50" /><Slider
      aria-label="Large"
      size="large"
      :default-value="70" /><Slider
      v-for="(color, index) in colors"
      :key="color"
      :aria-label="color"
      :color="color"
      :default-value="20 + index * 15"
  /></VStack>
</template>
`})))()}n();export{t as default};
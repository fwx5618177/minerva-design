import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`<script setup lang="ts">
import { ref } from "vue";
import { Slider, VStack, type SliderValue } from "minerva-design/vue";
const volume = ref<SliderValue>(40);
<\/script>
<template>
  <VStack :gap="3" align="stretch" style="width: 100%; max-width: 420px"
    ><Slider v-model="volume" aria-label="Volume" show-value tooltip /><Slider
      aria-label="Opacity"
      :default-value="0.6"
      :min="0"
      :max="1"
      :step="0.05"
      show-value
  /></VStack>
</template>
`})))()}n();export{t as default};
import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`<script setup lang="ts">
import { Slider, VStack } from "minerva-design/vue";
const levels = [
  { value: 0, label: "Off" },
  { value: 25, label: "Low" },
  { value: 50, label: "Medium" },
  { value: 75, label: "High" },
  { value: 100, label: "Max" },
];
const levelText = (v: number) =>
  levels.find((level) => level.value === v)?.label ?? String(v);
<\/script>
<template>
  <VStack :gap="8" align="stretch" style="width: 100%; max-width: 420px"
    ><Slider
      aria-label="Rating"
      :default-value="6"
      :max="10"
      marks
      show-value /><Slider
      aria-label="Fan speed"
      :default-value="50"
      :step="null"
      :marks="levels"
      :get-aria-value-text="levelText"
  /></VStack>
</template>
`})))()}n();export{t as default};
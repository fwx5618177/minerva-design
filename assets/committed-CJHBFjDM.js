import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`<script setup lang="ts">
import { ref } from "vue";
import { Slider, VStack, type SliderValue } from "minerva-design/vue";
const live = ref<SliderValue>(50);
const saved = ref<SliderValue>(50);
const saves = ref(0);
function save(value: SliderValue) {
  saved.value = value;
  saves.value += 1;
}
<\/script>
<template>
  <VStack :gap="3" align="stretch" style="width: 100%; max-width: 420px"
    ><Slider v-model="live" aria-label="Brightness" @change-end="save" /><output
      >While dragging: {{ live }} · Saved on release: {{ saved }} ({{
        saves
      }}
      saves)</output
    ></VStack
  >
</template>
`})))()}n();export{t as default};
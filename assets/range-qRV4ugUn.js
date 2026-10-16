import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`<script setup lang="ts">
import { ref } from "vue";
import { DatePicker, VStack } from "minerva-design/vue";
const date = ref("2026-10-15");
<\/script>
<template>
  <VStack :gap="3" align="stretch">
    <DatePicker
      v-model="date"
      label="October booking"
      min-date="2026-10-10"
      max-date="2026-10-20"
    />
    <output>{{ date || "Choose a date between October 10 and 20" }}</output>
  </VStack>
</template>
`})))()}n();export{t as default};
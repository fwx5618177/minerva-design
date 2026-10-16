import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`<script setup lang="ts">
import { ref } from "vue";
import { DatePicker, VStack } from "minerva-design/vue";
const date = ref<string | null>(null);
<\/script>
<template>
  <VStack :gap="3" align="stretch">
    <DatePicker v-model="date" label="Meeting date" />
    <output>{{ date || "No date selected" }}</output>
  </VStack>
</template>
`})))()}n();export{t as default};
import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`<script setup lang="ts">
import { ref } from "vue";
import { AnswerSheet, VStack, type AnswerSheetItem } from "minerva-design/vue";
const items: AnswerSheetItem[] = Array.from({ length: 40 }, (_, i) => ({
  key: \`q\${i + 1}\`,
  status: i < 14 ? "answered" : i === 14 ? "skipped" : "unanswered",
  flagged: i === 8,
}));
const value = ref("q16");
<\/script>
<template>
  <VStack :gap="3" align="stretch" style="width: 100%; max-width: 360px"
    ><AnswerSheet
      v-model="value"
      :items="items"
      layout="scroll"
      size="small"
    /><output>Current question: {{ value.slice(1) }}</output></VStack
  >
</template>
`})))()}n();export{t as default};
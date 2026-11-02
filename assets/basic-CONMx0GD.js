import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`<script setup lang="ts">
import { ref } from "vue";
import { AnswerSheet, VStack } from "minerva-design/vue";
const items = Array.from({ length: 12 }, (_, i) => ({
  key: \`q\${i + 1}\`,
  status: i < 5 ? ("answered" as const) : ("unanswered" as const),
}));
const value = ref("q6");
<\/script>
<template>
  <VStack :gap="3" align="stretch" style="max-width: 420px"
    ><AnswerSheet v-model="value" :items="items" /><output
      >Current question: {{ value.slice(1) }}</output
    ></VStack
  >
</template>
`})))()}n();export{t as default};
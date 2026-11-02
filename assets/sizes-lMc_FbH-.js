import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`<script setup lang="ts">
import { AnswerSheet, VStack, type AnswerSheetItem } from "minerva-design/vue";
const items: AnswerSheetItem[] = Array.from({ length: 10 }, (_, i) => ({
  key: \`q\${i + 1}\`,
  status: i < 4 ? "answered" : "unanswered",
}));
<\/script>
<template>
  <VStack :gap="6" align="stretch" style="max-width: 420px"
    ><AnswerSheet
      :items="items"
      size="small"
      default-value="q5"
      aria-label="Small sheet" /><AnswerSheet
      :items="items"
      :columns="5"
      default-value="q5"
      aria-label="Five columns" /><AnswerSheet
      :items="items"
      disabled
      aria-label="Disabled sheet"
  /></VStack>
</template>
`})))()}n();export{t as default};
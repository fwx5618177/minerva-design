import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`<script setup lang="ts">
import { ref } from "vue";
import { Button, Flashcard } from "minerva-design/vue";
const flipped = ref(false);
<\/script>
<template>
  <div
    style="
      display: grid;
      gap: 16px;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    "
  >
    <Flashcard
      front="Disabled"
      back="Never shown by a click"
      disabled
      :min-height="140"
    />
    <Flashcard
      front="flipOnClick = false"
      back="Flipped by the button below"
      :flip-on-click="false"
      :flipped="flipped"
      :front-label="null"
      :back-label="null"
      :min-height="140"
    >
      <template #footer
        ><Button size="small" @click="flipped = !flipped">{{
          flipped ? "Hide answer" : "Reveal answer"
        }}</Button></template
      >
    </Flashcard>
  </div>
</template>
`})))()}n();export{t as default};
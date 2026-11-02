import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`<script setup lang="ts">
import { ref } from "vue";
import { SegmentedControl, VStack } from "minerva-design/vue";
const view = ref("week");
<\/script>
<template>
  <VStack :gap="3" align="start"
    ><SegmentedControl
      v-model="view"
      aria-label="Calendar view"
      :options="[
        { value: 'day', label: 'Day' },
        { value: 'week', label: 'Week' },
        { value: 'month', label: 'Month' },
      ]"
    /><output>Showing the {{ view }} view</output></VStack
  >
</template>
`})))()}n();export{t as default};
import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`<script setup lang="ts">
import { ref } from "vue";
import {
  DatePicker,
  FormControl,
  FormLabel,
  FormHelperText,
} from "minerva-design/vue";
const date = ref<string | null>(null);
<\/script>
<template>
  <FormControl id="vue-date-picker-birthday" required>
    <FormLabel>Birthday</FormLabel>
    <DatePicker v-model="date" />
    <FormHelperText
      >Type YYYY-MM-DD or choose a day from the calendar.</FormHelperText
    >
  </FormControl>
</template>
`})))()}n();export{t as default};
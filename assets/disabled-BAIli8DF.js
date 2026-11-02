import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`<script setup lang="ts">
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Slider,
  VStack,
} from "minerva-design/vue";
<\/script>
<template>
  <VStack :gap="4" align="stretch" style="width: 100%; max-width: 420px"
    ><Slider aria-label="Disabled" :default-value="40" disabled /><Slider
      aria-label="Read only"
      :default-value="60"
      read-only
      show-value
    /><FormControl invalid
      ><FormLabel>Daily goal (minutes)</FormLabel
      ><Slider
        :default-value="5"
        :max="120"
        :step="5"
        show-value
      /><FormHelperText>Pick at least 10 minutes.</FormHelperText></FormControl
    ></VStack
  >
</template>
`})))()}n();export{t as default};
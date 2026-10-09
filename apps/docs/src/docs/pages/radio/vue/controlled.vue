<script setup lang="ts">
import { ref } from "vue";
import { Radio, RadioGroup, VStack } from "minerva-design/vue";
const plan = ref<string | number>("pro");
</script>
<template>
  <VStack align="start" :gap="3"
    ><RadioGroup v-model="plan" name="plan" label="Plan"
      ><Radio value="free" label="Free" /><Radio
        value="pro"
        label="Pro" /><Radio value="team" label="Team"
    /></RadioGroup>
    <p role="status">Selected plan: {{ plan }}</p></VStack
  >
</template>

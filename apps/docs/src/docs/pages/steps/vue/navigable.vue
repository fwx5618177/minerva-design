<script setup lang="ts">
import { ref } from "vue";
import { Steps, VStack } from "minerva-design/vue";
const value = ref("details");
const items = [
  { value: "details", label: "Details" },
  { value: "review", label: "Review" },
  { value: "publish", label: "Publish", disabled: true },
];
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><Steps v-model="value" :items="items" /><output
      >Current step: {{ value }}</output
    ></VStack
  >
</template>

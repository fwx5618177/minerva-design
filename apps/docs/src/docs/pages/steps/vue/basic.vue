<script setup lang="ts">
import { ref } from "vue";
import { Steps } from "minerva-design/vue";
const step = ref("review");
const items = [
  { value: "draft", label: "Draft" },
  { value: "review", label: "Review" },
  { value: "publish", label: "Publish", disabled: true },
];
</script>
<template><Steps v-model="step" :items="items" /></template>

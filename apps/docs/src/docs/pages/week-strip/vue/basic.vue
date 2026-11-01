<script setup lang="ts">
import { ref } from "vue";
import { VStack, WeekStrip } from "minerva-design/vue";
const pad = (n: number) => String(n).padStart(2, "0");
const now = new Date();
const day = ref(
  `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`,
);
</script>
<template>
  <VStack :gap="3" align="stretch" style="max-width: 480px"
    ><WeekStrip v-model="day" aria-label="Study days" /><output
      >Selected: {{ day }}</output
    ></VStack
  >
</template>

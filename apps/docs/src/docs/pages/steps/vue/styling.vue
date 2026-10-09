<script setup lang="ts">
import { Steps } from "minerva-design/vue";
const items = [
  { value: "details", label: "Details" },
  { value: "review", label: "Review" },
  { value: "complete", label: "Complete" },
];
</script>
<template>
  <Steps model-value="review" :items="items" read-only
    ><template #label="{ item, index }"
      ><strong>{{ index + 1 }} · {{ item.label }}</strong></template
    ></Steps
  >
</template>

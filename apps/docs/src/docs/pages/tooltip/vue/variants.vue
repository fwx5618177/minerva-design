<script setup lang="ts">
import { Tooltip, Button } from "minerva-design/vue";
const values = ["solid", "subtle", "glass"] as const;
</script>
<template>
  <div style="display: flex; gap: 12px; flex-wrap: wrap; padding: 24px">
    <Tooltip
      v-for="value in values"
      :key="value"
      :variant="value"
      :content="value"
      arrow
      ><Button variant="outline">{{ value }}</Button></Tooltip
    >
  </div>
</template>

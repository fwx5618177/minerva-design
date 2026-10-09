<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardContent } from "minerva-design/vue";
const variants = ["default", "outline", "elevated", "filled", "ghost"] as const;
</script>
<template>
  <div
    style="
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 16px;
      width: 100%;
    "
  >
    <Card v-for="variant in variants" :key="variant" :variant="variant"
      ><CardHeader
        ><CardTitle>{{ variant }}</CardTitle></CardHeader
      ><CardContent>variant="{{ variant }}"</CardContent></Card
    >
  </div>
</template>

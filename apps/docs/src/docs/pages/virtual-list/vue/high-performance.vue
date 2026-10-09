<script setup lang="ts">
import { VirtualList } from "minerva-design/vue";
const items = Array.from({ length: 100000 }, (_, i) => ({
  id: i,
  title: `Item ${i + 1}`,
  value: (i * 37) % 1000,
}));
</script>
<template>
  <div>
    <p>100,000 records with a small rendered viewport.</p>
    <VirtualList
      :items="items"
      :item-height="36"
      :max-height="300"
      :overscan="10"
      high-performance
      aria-label="High performance records"
      ><template #default="{ item, index }"
        ><div style="display: flex; justify-content: space-between">
          <span>#{{ index + 1 }} {{ item.title }}</span
          ><code>{{ item.value }}</code>
        </div></template
      ></VirtualList
    >
  </div>
</template>

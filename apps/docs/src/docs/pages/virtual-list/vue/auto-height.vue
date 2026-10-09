<script setup lang="ts">
import { VirtualList } from "minerva-design/vue";
const items = Array.from({ length: 1000 }, (_, i) => ({
  id: i,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
}));
</script>
<template>
  <VirtualList
    :items="items"
    :max-height="300"
    :item-padding="12"
    aria-label="Automatically measured users"
    ><template #default="{ item }"
      ><div>
        <strong>{{ item.name }}</strong>
        <div style="font-size: 12px; opacity: 0.7">{{ item.email }}</div>
      </div></template
    ></VirtualList
  >
</template>

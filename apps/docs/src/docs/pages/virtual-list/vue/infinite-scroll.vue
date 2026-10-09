<script setup lang="ts">
import { ref } from "vue";
import { VirtualList, VStack } from "minerva-design/vue";
const items = ref(
  Array.from({ length: 30 }, (_, index) => ({
    id: index + 1,
    label: `Record ${index + 1}`,
  })),
);
const loading = ref(false);
async function load() {
  if (loading.value || items.value.length >= 150) return;
  loading.value = true;
  await new Promise((resolve) => setTimeout(resolve, 500));
  const start = items.value.length;
  items.value.push(
    ...Array.from({ length: 30 }, (_, index) => ({
      id: start + index + 1,
      label: `Record ${start + index + 1}`,
    })),
  );
  loading.value = false;
}
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><VirtualList
      :items="items"
      :item-height="40"
      :max-height="240"
      :loading="loading"
      :on-load-more="load"
      aria-label="Infinite records"
      ><template #default="{ item }">{{ item.label }}</template></VirtualList
    ><output>{{ items.length }} records loaded</output></VStack
  >
</template>

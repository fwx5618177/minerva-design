<script setup lang="ts">
import { ref } from "vue";
import { VirtualList, Button, VStack } from "minerva-design/vue";
const items = Array.from({ length: 1000 }, (_, index) => ({
  id: index + 1,
  label: `Record ${index + 1}`,
}));
const selected = ref("");
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><VirtualList
      :items="items"
      :item-height="48"
      :max-height="240"
      aria-label="Selectable records"
      ><template #default="{ item }"
        ><Button variant="ghost" @click="selected = item.label">{{
          item.label
        }}</Button></template
      ></VirtualList
    ><output>{{ selected || "Select a record" }}</output></VStack
  >
</template>

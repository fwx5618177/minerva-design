<script setup lang="ts">
import { ref } from "vue";
import { KeyValueEditor, VStack } from "minerva-design/vue";
const entries = ref([
  { id: "content", key: "Content-Type", value: "application/json" },
]);
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><KeyValueEditor v-model="entries" /><output
      >{{ entries.length }} entries</output
    ></VStack
  >
</template>

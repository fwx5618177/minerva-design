<script setup lang="ts">
import { ref } from "vue";
import { Alert, VStack } from "minerva-design/vue";
const expanded = ref(true);
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><Alert v-model:expanded="expanded" collapsible title="Release details"
      >New components and accessibility improvements are available.</Alert
    ><output>{{ expanded ? "Expanded" : "Collapsed" }}</output></VStack
  >
</template>

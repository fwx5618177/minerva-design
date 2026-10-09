<script setup lang="ts">
import { SplitLayout, Box } from "minerva-design/vue";
</script>
<template>
  <SplitLayout :aside-width="220"
    ><template #aside><Box :p="4" bg="muted">Sidebar navigation</Box></template
    ><Box :p="4"
      >Main content grows to fill the available space.</Box
    ></SplitLayout
  >
</template>

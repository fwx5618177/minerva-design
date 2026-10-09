<script setup lang="ts">
import { List, ListItem, VStack } from "minerva-design/vue";
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><List density="compact" bordered
      ><ListItem primary="Compact row" /><ListItem
        primary="Another row" /></List
    ><List density="comfortable" bordered
      ><ListItem
        primary="Comfortable row"
        secondary="Additional context" /></List
  ></VStack>
</template>

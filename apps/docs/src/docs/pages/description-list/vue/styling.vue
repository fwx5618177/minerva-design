<script setup lang="ts">
import { DescriptionList, Box } from "minerva-design/vue";
</script>
<template>
  <Box :p="4" rounded="lg" border="1px solid var(--color-border)"
    ><DescriptionList
      :items="[
        { key: 'id', label: 'Project ID', value: 'minerva-001' },
        { key: 'url', label: 'Repository', value: 'github.com/minerva/design' },
      ]"
  /></Box>
</template>

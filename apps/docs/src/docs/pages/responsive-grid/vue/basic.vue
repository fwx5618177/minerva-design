<script setup lang="ts">
import { ResponsiveGrid, Box } from "minerva-design/vue";
</script>
<template>
  <ResponsiveGrid :columns="{ base: 1, sm: 2, lg: 3 }" :gap="3"
    ><Box
      v-for="n in 6"
      :key="n"
      :p="4"
      bg="surface"
      border="1px solid var(--color-border)"
      >Card {{ n }}</Box
    ></ResponsiveGrid
  >
</template>

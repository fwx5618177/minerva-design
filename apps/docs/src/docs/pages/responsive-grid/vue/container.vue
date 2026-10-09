<script setup lang="ts">
import { ResponsiveGrid, Box } from "minerva-design/vue";
</script>
<template>
  <Box max-w="560px" :p="3" border="1px solid var(--color-border)"
    ><ResponsiveGrid :columns="{ base: 1, sm: 2 }" :gap="3"
      ><Box v-for="n in 4" :key="n" :p="4" bg="muted"
        >Responsive {{ n }}</Box
      ></ResponsiveGrid
    ></Box
  >
</template>

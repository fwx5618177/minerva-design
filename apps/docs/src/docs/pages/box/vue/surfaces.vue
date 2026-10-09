<script setup lang="ts">
import { Box, HStack } from "minerva-design/vue";
</script>
<template>
  <HStack :gap="3" wrap
    ><Box :p="4" rounded="lg" box-shadow="sm" bg="surface">Elevated</Box
    ><Box :p="4" rounded="full" border="1px solid var(--color-border)"
      >Outlined</Box
    ></HStack
  >
</template>

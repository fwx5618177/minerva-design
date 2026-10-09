<script setup lang="ts">
import { Box, HStack } from "minerva-design/vue";
</script>
<template>
  <HStack :gap="3" wrap
    ><Box :px="6" :py="3" w="180px" border="1px solid var(--color-border)"
      >Horizontal spacing</Box
    ><Box :p="3" w="120px" h="100px" bg="muted">Fixed dimensions</Box></HStack
  >
</template>

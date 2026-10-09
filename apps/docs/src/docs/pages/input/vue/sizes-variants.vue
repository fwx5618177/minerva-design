<script setup lang="ts">
import { Input, VStack } from "minerva-design/vue";
</script>
<template>
  <VStack :gap="3"
    ><Input aria-label="Small" size="small" placeholder="small" /><Input
      aria-label="Medium"
      placeholder="medium (outline)" /><Input
      aria-label="Large"
      size="large"
      placeholder="large" /><Input
      aria-label="Filled"
      variant="filled"
      placeholder="filled" /><Input
      aria-label="Unstyled"
      variant="unstyled"
      placeholder="unstyled"
  /></VStack>
</template>

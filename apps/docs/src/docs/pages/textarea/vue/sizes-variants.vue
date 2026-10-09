<script setup lang="ts">
import { Textarea, VStack } from "minerva-design/vue";
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><Textarea
      size="small"
      variant="outline"
      aria-label="Small message"
      placeholder="Small outline" /><Textarea
      size="large"
      variant="filled"
      aria-label="Large message"
      placeholder="Large filled" /><Textarea
      variant="unstyled"
      aria-label="Unstyled message"
      placeholder="Unstyled"
  /></VStack>
</template>

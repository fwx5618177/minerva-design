<script setup lang="ts">
import { ProgressIndicator, HStack } from "minerva-design/vue";
</script>
<template>
  <HStack :gap="3" wrap
    ><ProgressIndicator
      size="small"
      color="neutral"
      label="Small" /><ProgressIndicator
      size="medium"
      color="primary"
      label="Medium" /><ProgressIndicator
      size="large"
      color="current"
      label="Large"
  /></HStack>
</template>

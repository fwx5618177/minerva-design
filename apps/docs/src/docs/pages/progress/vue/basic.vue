<script setup lang="ts">
import { ProgressIndicator, HStack } from "minerva-design/vue";
</script>
<template>
  <HStack :gap="3" wrap
    ><ProgressIndicator variant="spinner" label="Loading" /><ProgressIndicator
      variant="bar"
      label="Processing" /><ProgressIndicator variant="wave" label="Working"
  /></HStack>
</template>

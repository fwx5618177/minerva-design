<script setup lang="ts">
import { ProgressIndicator, VStack } from "minerva-design/vue";
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><ProgressIndicator
      variant="bar"
      width="240px"
      label="Uploading files…" /><ProgressIndicator
      variant="bar"
      full
      label="Synchronizing workspace…"
  /></VStack>
</template>

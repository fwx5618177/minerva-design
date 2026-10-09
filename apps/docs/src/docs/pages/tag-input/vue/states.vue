<script setup lang="ts">
import { TagInput, VStack } from "minerva-design/vue";
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><TagInput
      :model-value="['Published']"
      read-only
      aria-label="Read-only tags" /><TagInput
      :model-value="['Locked']"
      disabled
      aria-label="Disabled tags" /><TagInput
      size="small"
      aria-label="Small tags"
      placeholder="Small tags"
  /></VStack>
</template>

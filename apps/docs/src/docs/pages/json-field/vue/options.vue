<script setup lang="ts">
import { JsonField, VStack } from "minerva-design/vue";
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><JsonField
      default-value='{"compact":true}'
      :indent="0"
      format-label="Compact JSON"
      aria-label="Compact JSON" /><JsonField
      default-value='{"readOnly":true}'
      read-only
      hide-toolbar
      aria-label="Read-only JSON"
  /></VStack>
</template>

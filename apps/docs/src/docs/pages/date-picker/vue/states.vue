<script setup lang="ts">
import { DatePicker, VStack } from "minerva-design/vue";
</script>
<template>
  <VStack :gap="3" align="stretch">
    <DatePicker label="Small date" size="small" default-value="2026-10-15" />
    <DatePicker label="Read-only date" default-value="2026-10-15" read-only />
    <DatePicker label="Disabled date" default-value="2026-10-15" disabled />
    <DatePicker
      label="Date without clear button"
      default-value="2026-10-15"
      :clearable="false"
    />
  </VStack>
</template>

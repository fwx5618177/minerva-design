<script setup lang="ts">
import { Checkbox, VStack } from "minerva-design/vue";
</script>
<template>
  <VStack align="start" :gap="3"
    ><Checkbox label="Remember me" /><Checkbox
      label="Checked by default"
      default-checked
  /></VStack>
</template>

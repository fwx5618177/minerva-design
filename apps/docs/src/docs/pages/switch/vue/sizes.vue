<script setup lang="ts">
import { Switch, VStack } from "minerva-design/vue";
</script>
<template>
  <VStack :gap="3"
    ><Switch size="small" label="Small" default-checked /><Switch
      size="medium"
      label="Medium"
      default-checked /><Switch size="large" label="Large" default-checked
  /></VStack>
</template>

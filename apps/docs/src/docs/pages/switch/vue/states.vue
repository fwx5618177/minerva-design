<script setup lang="ts">
import { Switch, VStack } from "minerva-design/vue";
</script>
<template>
  <VStack :gap="3"
    ><Switch label="Loading" loading default-checked /><Switch
      label="Disabled"
      disabled /><Switch label="Disabled (on)" disabled default-checked
  /></VStack>
</template>

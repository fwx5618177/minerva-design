<script setup lang="ts">
import { Checkbox, HStack } from "minerva-design/vue";
</script>
<template>
  <HStack :gap="3" wrap
    ><Checkbox
      label="Small"
      size="small"
      shape="circle"
      default-checked /><Checkbox
      label="Large success"
      size="large"
      color="success"
      default-checked /><Checkbox label="Disabled" disabled /><Checkbox
      label="Invalid"
      error
      helper-text="Required selection"
  /></HStack>
</template>

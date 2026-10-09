<script setup lang="ts">
import { RadioGroup, Radio, VStack } from "minerva-design/vue";
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><RadioGroup
      label="Size and color"
      default-value="large"
      direction="horizontal"
      color="success"
      size="large"
      ><Radio value="large" label="Large" /><Radio
        value="disabled"
        label="Unavailable"
        disabled /></RadioGroup
    ><Radio
      label="Invalid choice"
      error
      error-message="Choose an available option"
  /></VStack>
</template>

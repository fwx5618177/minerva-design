<script setup lang="ts">
import { Switch, HStack } from "minerva-design/vue";
</script>
<template>
  <HStack :gap="3" wrap
    ><Switch
      label="Square"
      shape="square"
      color="success"
      default-checked /><Switch label="Working" loading /><Switch
      label="Disabled"
      disabled /><Switch label="Large" size="large"
  /></HStack>
</template>

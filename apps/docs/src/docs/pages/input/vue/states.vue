<script setup lang="ts">
import { FormField, Input, VStack } from "minerva-design/vue";
</script>
<template>
  <VStack :gap="3"
    ><Input aria-label="Invalid" invalid default-value="Invalid" /><Input
      aria-label="Disabled"
      disabled
      default-value="Disabled" /><Input
      aria-label="Read-only"
      read-only
      default-value="Read-only" /><FormField
      label="Inside a FormField"
      error-message="Inherits the error"
      ><Input /></FormField
  ></VStack>
</template>

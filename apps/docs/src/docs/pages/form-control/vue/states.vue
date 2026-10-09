<script setup lang="ts">
import { FormField, Input, VStack } from "minerva-design/vue";
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><FormField
      label="Invalid email"
      invalid
      error-message="Enter a valid email"
      ><Input default-value="not-an-email" /></FormField
    ><FormField label="Disabled field" disabled
      ><Input default-value="Unavailable" /></FormField
    ><FormField label="Read only" read-only
      ><Input default-value="Account ID: 42" /></FormField
  ></VStack>
</template>

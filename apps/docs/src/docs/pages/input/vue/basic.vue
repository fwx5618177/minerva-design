<script setup lang="ts">
import { ref } from "vue";
import { Input, VStack } from "minerva-design/vue";
const value = ref("");
</script>
<template>
  <VStack :gap="3"
    ><Input aria-label="Name" placeholder="Uncontrolled" /><Input
      aria-label="Controlled"
      placeholder="Controlled"
      v-model="value"
  /></VStack>
</template>

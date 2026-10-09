<script setup lang="ts">
import { Input, VStack } from "minerva-design/vue";
</script>
<template>
  <VStack :gap="3"
    ><Input aria-label="Search" placeholder="Search" clearable /><Input
      aria-label="Short bio"
      default-value="Frontend developer"
      clearable
      show-char-count
      :max-length="40"
  /></VStack>
</template>

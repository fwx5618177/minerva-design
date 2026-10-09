<script setup lang="ts">
import { ref } from "vue";
import { Button, HStack } from "minerva-design/vue";
const count = ref(0);
</script>
<template>
  <HStack :gap="3" wrap>
    <Button @click="count++">Click me</Button>
    <output aria-live="polite">Clicked {{ count }} times</output>
  </HStack>
</template>

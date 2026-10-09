<script setup lang="ts">
import { ref } from "vue";
import { CodeBlock, VStack } from "minerva-design/vue";
const copied = ref(false);
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><CodeBlock
      code="npm install minerva-design"
      copyable
      @copied="copied = true"
    /><output>{{
      copied ? "Copied command" : "Copy the command to your clipboard"
    }}</output></VStack
  >
</template>

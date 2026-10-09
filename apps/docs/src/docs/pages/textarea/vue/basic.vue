<script setup lang="ts">
import { ref } from "vue";
import { Textarea, VStack } from "minerva-design/vue";
const text = ref("");
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><Textarea
      v-model="text"
      aria-label="Message"
      placeholder="Write a message…"
    /><output>{{ text.length }} characters</output></VStack
  >
</template>

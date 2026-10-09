<script setup lang="ts">
import { ref } from "vue";
import { IconButton, HStack } from "minerva-design/vue";
const pinned = ref(false);
</script>
<template>
  <HStack :gap="3" wrap
    ><IconButton label="Saving" loading>✓</IconButton
    ><IconButton label="Unavailable" disabled>×</IconButton
    ><IconButton v-model:pressed="pinned" label="Pin item">★</IconButton
    ><output>{{ pinned ? "Pinned" : "Unpinned" }}</output></HStack
  >
</template>

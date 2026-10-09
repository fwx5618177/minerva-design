<script setup lang="ts">
import { ref } from "vue";
import { TagInput, VStack } from "minerva-design/vue";
const tags = ref(["Vue"]);
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><TagInput
      v-model="tags"
      :options="['Vue', 'Angular', 'React']"
      aria-label="Frameworks"
    /><output>{{ tags.join(", ") }}</output></VStack
  >
</template>

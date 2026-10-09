<script setup lang="ts">
import { ref } from "vue";
import { Rating, VStack } from "minerva-design/vue";
const score = ref(7);
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><Rating v-model="score" show-value aria-label="Your rating" /><output
      >Your score: {{ score }}</output
    ></VStack
  >
</template>

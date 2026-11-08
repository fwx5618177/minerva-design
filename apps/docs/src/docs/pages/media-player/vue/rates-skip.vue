<script setup lang="ts">
import { ref } from "vue";
import { MediaPlayer, VStack } from "minerva-design/vue";
const src = "media-player/sample.mp4";
const rate = ref(1);
</script>
<template>
  <VStack
    :gap="3"
    align="stretch"
    style="width: 100%; min-width: 0; max-width: 560px"
  >
    <MediaPlayer
      :src="src"
      :playback-rates="[1, 1.5, 2]"
      :skip-seconds="3"
      aspect-ratio="4 / 3"
      aria-label="Flower, speed and skip"
      @rate-change="(next) => (rate = next)"
    />
    <output>Speed: {{ rate }}×</output>
  </VStack>
</template>

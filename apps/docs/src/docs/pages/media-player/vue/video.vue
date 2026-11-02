<script setup lang="ts">
import { MediaPlayer } from "minerva-design/vue";
// CC0 sample from MDN's interactive examples
const src =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";
</script>
<template>
  <div style="max-width: 560px">
    <MediaPlayer :src="src" title="Flower" picture-in-picture />
  </div>
</template>

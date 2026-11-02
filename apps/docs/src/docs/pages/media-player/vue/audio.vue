<script setup lang="ts">
import { MediaPlayer } from "minerva-design/vue";
// CC0 sample from MDN's interactive examples
const src =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3";
</script>
<template>
  <div style="max-width: 480px">
    <MediaPlayer :src="src" title="T-Rex roar" :skip-seconds="0" />
  </div>
</template>

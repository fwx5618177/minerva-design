<script setup lang="ts">
import { MediaPlayer } from "minerva-design/vue";
const src = "media-player/sample.m4a";
</script>
<template>
  <div style="width: 100%; min-width: 0; max-width: 480px">
    <MediaPlayer :src="src" title="Audio playback" :skip-seconds="0" />
  </div>
</template>

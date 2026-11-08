<script setup lang="ts">
import { MediaPlayer } from "minerva-design/vue";
const src = "media-player/sample.mp4";
</script>
<template>
  <div style="width: 100%; min-width: 0; max-width: 640px">
    <MediaPlayer
      poster="media-player/poster.jpg"
      :src="src"
      title="Video playback"
      picture-in-picture
    />
  </div>
</template>

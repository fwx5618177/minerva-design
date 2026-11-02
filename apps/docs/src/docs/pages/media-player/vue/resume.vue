<script setup lang="ts">
import { ref } from "vue";
import {
  Button,
  MediaPlayer,
  VStack,
  type MediaPlayerExpose,
} from "minerva-design/vue";
const src =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";
const player = ref<MediaPlayerExpose | null>(null);
// e.g. the position saved by the last session
const saved = ref(2);
const progress = ref("Not started");
function onTime(detail: { currentTime: number; duration: number }) {
  progress.value = `${Math.round((detail.currentTime / detail.duration) * 100)}% watched (${detail.currentTime.toFixed(1)}s)`;
}
function onPause() {
  saved.value = Math.floor(player.value?.element?.currentTime ?? 0);
}
</script>
<template>
  <VStack :gap="3" align="stretch" style="max-width: 560px">
    <MediaPlayer
      ref="player"
      :src="src"
      :start-time="saved"
      @loaded-metadata="
        ({ duration }) =>
          (progress = `Resumed at ${saved}s of ${duration.toFixed(1)}s`)
      "
      @time-update="onTime"
      @pause="onPause"
      @ended="progress = 'Finished'"
    />
    <div style="display: flex; gap: 8px; flex-wrap: wrap">
      <Button size="small" @click="player?.play()">Play</Button>
      <Button size="small" variant="outline" @click="player?.seek(0)"
        >Restart</Button
      >
    </div>
    <output aria-live="polite"
      >{{ progress }} · saved position: {{ saved }}s</output
    >
  </VStack>
</template>

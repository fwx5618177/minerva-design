<script setup lang="ts">
import { ref } from "vue";
import { MediaPlayer, type MediaPlayerTrack } from "minerva-design/vue";

// CC0 sample from MDN's interactive examples
const src =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

// Caption files are usually served next to the video (cross-origin ones need
// cross-origin="anonymous" and CORS headers); data: URLs keep this demo
// self-contained.
const englishVtt = `WEBVTT

00:00.000 --> 00:01.800
A flower bud in the morning light

00:01.800 --> 00:03.600
Its petals slowly <i>unfold</i>

00:03.600 --> 00:06.000
…and the bloom opens to the bees.
`;
const frenchSrt = `1
00:00:00,000 --> 00:00:01,800
Un bouton de fleur dans la lumière du matin

2
00:00:01,800 --> 00:00:03,600
Ses pétales s'ouvrent lentement

3
00:00:03,600 --> 00:00:06,000
…et la fleur s'offre aux abeilles.
`;
const tracks: MediaPlayerTrack[] = [
  {
    src: `data:text/vtt;charset=utf-8,${encodeURIComponent(englishVtt)}`,
    srclang: "en",
    label: "English",
    default: true,
  },
  {
    src: `data:application/x-subrip;charset=utf-8,${encodeURIComponent(frenchSrt)}`,
    srclang: "fr",
    label: "Français",
  },
];
const choice = ref<string | null>(null);
</script>
<template>
  <div style="display: grid; gap: 12px; max-width: 560px">
    <MediaPlayer
      :src="src"
      title="Flower"
      :tracks="tracks"
      @track-change="choice = $event.track?.label ?? 'Off'"
    />
    <output aria-live="polite">
      Captions: {{ choice ?? "default track" }}
    </output>
  </div>
</template>

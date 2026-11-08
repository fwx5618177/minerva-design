import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`<script setup lang="ts">
import { ref } from "vue";
import { MediaPlayer, type MediaPlayerTrack } from "minerva-design/vue";

const src = "media-player/sample.mp4";

// Caption files are usually served next to the video (cross-origin ones need
// cross-origin="anonymous" and CORS headers); data: URLs keep this demo
// self-contained.
const englishVtt = \`WEBVTT

00:00.000 --> 00:01.800
A locally hosted playback sample

00:01.800 --> 00:03.600
Video and audio share the <i>same player</i>

00:03.600 --> 00:06.000
Captions follow the playback position.
\`;
const frenchSrt = \`1
00:00:00,000 --> 00:00:01,800
Un exemple de lecture hébergé localement

2
00:00:01,800 --> 00:00:03,600
La vidéo et l’audio partagent le même lecteur

3
00:00:03,600 --> 00:00:06,000
Les sous-titres suivent la lecture.
\`;
const tracks: MediaPlayerTrack[] = [
  {
    src: \`data:text/vtt;charset=utf-8,\${encodeURIComponent(englishVtt)}\`,
    srclang: "en",
    label: "English",
    default: true,
  },
  {
    src: \`data:application/x-subrip;charset=utf-8,\${encodeURIComponent(frenchSrt)}\`,
    srclang: "fr",
    label: "Français",
  },
];
const choice = ref<string | null>(null);
<\/script>
<template>
  <div
    style="
      display: grid;
      gap: 12px;
      width: 100%;
      min-width: 0;
      max-width: 640px;
    "
  >
    <MediaPlayer
      poster="media-player/poster.jpg"
      :src="src"
      title="Video playback"
      :tracks="tracks"
      @track-change="choice = $event.track?.label ?? 'Off'"
    />
    <output aria-live="polite">
      Captions: {{ choice ?? "default track" }}
    </output>
  </div>
</template>
`})))()}n();export{t as default};
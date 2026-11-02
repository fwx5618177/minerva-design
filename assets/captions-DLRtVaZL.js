import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t={vue:`<!-- MediaPlayerCaptions.vue -->

<script setup lang="ts">
import { ref } from "vue";

// tracks is a property (an array of { src, srclang, label, kind, default });
// <track src srclang label default> children of the element work too.
// minerva-track-change reports the user's choice.

import type {
  MediaPlayerTrack,
  MinervaMediaPlayer,
} from "minerva-design/web-components/media-player";

const ENGLISH_VTT = \`WEBVTT

00:00.000 --> 00:01.800
A flower bud in the morning light

00:01.800 --> 00:03.600
Its petals slowly <i>unfold</i>

00:03.600 --> 00:06.000
…and the bloom opens to the bees.
\`;
const FRENCH_SRT = \`1
00:00:00,000 --> 00:00:01,800
Un bouton de fleur dans la lumière du matin

2
00:00:01,800 --> 00:00:03,600
Ses pétales s'ouvrent lentement

3
00:00:03,600 --> 00:00:06,000
…et la fleur s'offre aux abeilles.
\`;
const tracks: MediaPlayerTrack[] = [
  {
    src: \`data:text/vtt;charset=utf-8,\${encodeURIComponent(ENGLISH_VTT)}\`,
    srclang: "en",
    label: "English",
    default: true,
  },
  {
    src: \`data:application/x-subrip;charset=utf-8,\${encodeURIComponent(FRENCH_SRT)}\`,
    srclang: "fr",
    label: "Français",
  },
];

const outputText = ref("Captions: default track");

const playerTracks = tracks;
const onTrackChange = (e: Event) => {
  const { track } = (
    e as CustomEvent<{ index: number; track: MediaPlayerTrack | null }>
  ).detail;
  outputText.value = \`Captions: \${track?.label ?? "Off"}\`;
};
<\/script>

<template>
  <div style="display: grid; gap: 12px; max-width: 560px">
    <minerva-media-player
      id="player"
      src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
      :tracks.prop="playerTracks"
      @minerva-track-change="onTrackChange"
    >
      <span slot="heading">Flower</span>
    </minerva-media-player>
    <output id="choice" aria-live="polite">{{ outputText }}</output>
  </div>
</template>
`,angular:`// media-player-captions.component.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

// tracks is a property (an array of { src, srclang, label, kind, default });
// <track src srclang label default> children of the element work too.
// minerva-track-change reports the user's choice.
import type {
  MediaPlayerTrack,
  MinervaMediaPlayer,
} from "minerva-design/web-components/media-player";

const ENGLISH_VTT = \`WEBVTT

00:00.000 --> 00:01.800
A flower bud in the morning light

00:01.800 --> 00:03.600
Its petals slowly <i>unfold</i>

00:03.600 --> 00:06.000
…and the bloom opens to the bees.
\`;
const FRENCH_SRT = \`1
00:00:00,000 --> 00:00:01,800
Un bouton de fleur dans la lumière du matin

2
00:00:01,800 --> 00:00:03,600
Ses pétales s'ouvrent lentement

3
00:00:03,600 --> 00:00:06,000
…et la fleur s'offre aux abeilles.
\`;
const tracks: MediaPlayerTrack[] = [
  {
    src: \`data:text/vtt;charset=utf-8,\${encodeURIComponent(ENGLISH_VTT)}\`,
    srclang: "en",
    label: "English",
    default: true,
  },
  {
    src: \`data:application/x-subrip;charset=utf-8,\${encodeURIComponent(FRENCH_SRT)}\`,
    srclang: "fr",
    label: "Français",
  },
];

@Component({
  selector: "app-media-player-captions",
  standalone: true,
  // <minerva-*> are custom elements: bind their properties and events
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: \`
    <div style="display: grid; gap: 12px; max-width: 560px">
      <minerva-media-player
        id="player"
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
        [tracks]="playerTracks"
        (minerva-track-change)="onTrackChange($event)"
      >
        <span slot="heading">Flower</span>
      </minerva-media-player>
      <output id="choice" aria-live="polite">{{ outputText }}</output>
    </div>
  \`,
})
export class MediaPlayerCaptionsComponent {
  outputText = "Captions: default track";

  playerTracks = tracks;
  onTrackChange = (e: Event) => {
    const { track } = (
      e as CustomEvent<{ index: number; track: MediaPlayerTrack | null }>
    ).detail;
    this.outputText = \`Captions: \${track?.label ?? "Off"}\`;
  };
}
`,svelte:`<!-- MediaPlayerCaptions.svelte -->

<script lang="ts">
  // tracks is a property (an array of { src, srclang, label, kind, default });
  // <track src srclang label default> children of the element work too.
  // minerva-track-change reports the user's choice.

  import type {
    MediaPlayerTrack,
    MinervaMediaPlayer,
  } from "minerva-design/web-components/media-player";

  const ENGLISH_VTT = \`WEBVTT

  00:00.000 --> 00:01.800
  A flower bud in the morning light

  00:01.800 --> 00:03.600
  Its petals slowly <i>unfold</i>

  00:03.600 --> 00:06.000
  …and the bloom opens to the bees.
  \`;
  const FRENCH_SRT = \`1
  00:00:00,000 --> 00:00:01,800
  Un bouton de fleur dans la lumière du matin

  2
  00:00:01,800 --> 00:00:03,600
  Ses pétales s'ouvrent lentement

  3
  00:00:03,600 --> 00:00:06,000
  …et la fleur s'offre aux abeilles.
  \`;
  const tracks: MediaPlayerTrack[] = [
    {
      src: \`data:text/vtt;charset=utf-8,\${encodeURIComponent(ENGLISH_VTT)}\`,
      srclang: "en",
      label: "English",
      default: true,
    },
    {
      src: \`data:application/x-subrip;charset=utf-8,\${encodeURIComponent(FRENCH_SRT)}\`,
      srclang: "fr",
      label: "Français",
    },
  ];

  let outputText = $state("Captions: default track");

  const playerTracks = tracks;
  const onTrackChange = (e: Event) => {
    const { track } = (
      e as CustomEvent<{ index: number; track: MediaPlayerTrack | null }>
    ).detail;
    outputText = \`Captions: \${track?.label ?? "Off"}\`;
  };
<\/script>

<div style="display: grid; gap: 12px; max-width: 560px">
  <minerva-media-player
    id="player"
    src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
    tracks={playerTracks}
    onminerva-track-change={onTrackChange}
  >
    <span slot="heading">Flower</span>
  </minerva-media-player>
  <output id="choice" aria-live="polite">{outputText}</output>
</div>
`,solid:`// MediaPlayerCaptions.tsx

import { createSignal } from "solid-js";

// tracks is a property (an array of { src, srclang, label, kind, default });
// <track src srclang label default> children of the element work too.
// minerva-track-change reports the user's choice.
import type {
  MediaPlayerTrack,
  MinervaMediaPlayer,
} from "minerva-design/web-components/media-player";

const ENGLISH_VTT = \`WEBVTT

00:00.000 --> 00:01.800
A flower bud in the morning light

00:01.800 --> 00:03.600
Its petals slowly <i>unfold</i>

00:03.600 --> 00:06.000
…and the bloom opens to the bees.
\`;
const FRENCH_SRT = \`1
00:00:00,000 --> 00:00:01,800
Un bouton de fleur dans la lumière du matin

2
00:00:01,800 --> 00:00:03,600
Ses pétales s'ouvrent lentement

3
00:00:03,600 --> 00:00:06,000
…et la fleur s'offre aux abeilles.
\`;
const tracks: MediaPlayerTrack[] = [
  {
    src: \`data:text/vtt;charset=utf-8,\${encodeURIComponent(ENGLISH_VTT)}\`,
    srclang: "en",
    label: "English",
    default: true,
  },
  {
    src: \`data:application/x-subrip;charset=utf-8,\${encodeURIComponent(FRENCH_SRT)}\`,
    srclang: "fr",
    label: "Français",
  },
];

export default function MediaPlayerCaptions() {
  const [outputText, setOutputText] = createSignal("Captions: default track");

  const playerTracks = tracks;
  const onTrackChange = (e: Event) => {
    const { track } = (
      e as CustomEvent<{ index: number; track: MediaPlayerTrack | null }>
    ).detail;
    setOutputText(\`Captions: \${track?.label ?? "Off"}\`);
  };

  return (
    <div style="display: grid; gap: 12px; max-width: 560px">
      <minerva-media-player
        id="player"
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
        prop:tracks={playerTracks}
        on:minerva-track-change={onTrackChange}
      >
        <span slot="heading">Flower</span>
      </minerva-media-player>
      <output id="choice" aria-live="polite">
        {outputText()}
      </output>
    </div>
  );
}
`,html:`<div style="display: grid; gap: 12px; max-width: 560px">
  <minerva-media-player
    id="player"
    src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
  >
    <span slot="heading">Flower</span>
  </minerva-media-player>
  <output id="choice" aria-live="polite">Captions: default track</output>
</div>

<script type="module">
  // registers every <minerva-*> element (or import one entry per element)
  import "minerva-design/web-components";

  // tracks is a property (an array of { src, srclang, label, kind, default });
  // <track src srclang label default> children of the element work too.
  // minerva-track-change reports the user's choice.
  const ENGLISH_VTT = \`WEBVTT

  00:00.000 --> 00:01.800
  A flower bud in the morning light

  00:01.800 --> 00:03.600
  Its petals slowly <i>unfold</i>

  00:03.600 --> 00:06.000
  …and the bloom opens to the bees.
  \`;
  const FRENCH_SRT = \`1
  00:00:00,000 --> 00:00:01,800
  Un bouton de fleur dans la lumière du matin

  2
  00:00:01,800 --> 00:00:03,600
  Ses pétales s'ouvrent lentement

  3
  00:00:03,600 --> 00:00:06,000
  …et la fleur s'offre aux abeilles.
  \`;
  const tracks = [
    {
      src: \`data:text/vtt;charset=utf-8,\${encodeURIComponent(ENGLISH_VTT)}\`,
      srclang: "en",
      label: "English",
      default: true,
    },
    {
      src: \`data:application/x-subrip;charset=utf-8,\${encodeURIComponent(FRENCH_SRT)}\`,
      srclang: "fr",
      label: "Français",
    },
  ];

  const player = document.querySelector("#player");
  const output = document.querySelector("#choice");
  player.tracks = tracks;
  const onTrackChange = (e) => {
    const { track } = e.detail;
    output.value = \`Captions: \${track?.label ?? "Off"}\`;
  };
  player.addEventListener("minerva-track-change", onTrackChange);
<\/script>
`}})))()}n();export{t as default};
# MediaPlayer

An audio or video player with themed custom controls: play / pause, skip, a seek bar with the buffered range, time, volume, playback speed and fullscreen, operable from the keyboard.

Package: minerva-design@1.20.5

Renderer: vue

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.5",
  "sourceCommit": "fe15b45f84b480cdd9cfec147df037927ba34a6b",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:0dc58bd28a1a59067b94630bd49c5b94d839bdc57ee30a0eaa7de1d0a9681cfb"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.5/types.json) or getType() from minerva-design/contracts.

## Documentation

## MediaControls

Support: n/a

React Native-specific extension, outside the shared web component API; use minerva-design/native for this component.

## MediaPlayer

Support: beta

### Import

```json
{
  "specifier": "minerva-design/vue",
  "exports": [
    "MediaPlayer"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "src",
    "type": "string",
    "required": false,
    "description": "URL of the media",
    "typeText": "string"
  },
  {
    "name": "type",
    "type": "MediaPlayerType",
    "required": false,
    "description": "Kind of media",
    "typeText": "MediaPlayerType"
  },
  {
    "name": "mimeType",
    "type": "string",
    "required": false,
    "description": "MIME type of the media (\"audio/mpeg\", \"video/mp4\"...), used to infer type",
    "typeText": "string"
  },
  {
    "name": "poster",
    "type": "string",
    "required": false,
    "description": "Image shown before a video plays",
    "typeText": "string"
  },
  {
    "name": "title",
    "type": "string",
    "required": false,
    "description": "Title of the media, shown in the audio bar / over the video",
    "typeText": "string"
  },
  {
    "name": "autoPlay",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Starts playing as soon as possible (browsers only allow muted autoplay\nwithout a user gesture)",
    "typeText": "boolean"
  },
  {
    "name": "loop",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Restarts at the end",
    "typeText": "boolean"
  },
  {
    "name": "muted",
    "type": "boolean",
    "required": false,
    "description": "Mutes the media; applied whenever it changes (the mute button still\ntoggles the sound)",
    "typeText": "boolean"
  },
  {
    "name": "defaultMuted",
    "type": "boolean",
    "required": false,
    "description": "Initially muted (uncontrolled)",
    "typeText": "boolean"
  },
  {
    "name": "preload",
    "type": "MediaPlayerPreload",
    "default": "\"metadata\"",
    "required": false,
    "description": "How much of the media the browser loads before playback",
    "typeText": "MediaPlayerPreload"
  },
  {
    "name": "crossOrigin",
    "type": "MediaPlayerCrossOrigin",
    "required": false,
    "description": "CORS mode of the media request (cross-origin caption files need it too,\nplus CORS headers on their server)",
    "typeText": "MediaPlayerCrossOrigin"
  },
  {
    "name": "startTime",
    "type": "number",
    "required": false,
    "description": "Resume position in seconds, applied once when the metadata loads (and\nagain when src changes)",
    "typeText": "number"
  },
  {
    "name": "playbackRates",
    "type": "readonly number[]",
    "default": "DEFAULT_PLAYBACK_RATES",
    "required": false,
    "description": "Speeds the speed button cycles through",
    "typeText": "readonly number[]"
  },
  {
    "name": "skipSeconds",
    "type": "number",
    "default": "DEFAULT_SKIP_SECONDS",
    "required": false,
    "description": "Step of the skip back / forward buttons, in seconds (0 hides them)",
    "typeText": "number"
  },
  {
    "name": "controls",
    "type": "boolean",
    "default": "true",
    "required": false,
    "description": "Shows the custom control bar; false renders the bare media element\n(drive it through the template ref)",
    "typeText": "boolean"
  },
  {
    "name": "height",
    "type": "string | number",
    "required": false,
    "description": "Height of a video player (number: pixels); overrides aspectRatio",
    "typeText": "string | number"
  },
  {
    "name": "aspectRatio",
    "type": "string",
    "default": "\"16 / 9\"",
    "required": false,
    "description": "Aspect ratio of a video player (CSS aspect-ratio)",
    "typeText": "string"
  },
  {
    "name": "pictureInPicture",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Shows a picture-in-picture button (video, where the browser supports it)",
    "typeText": "boolean"
  },
  {
    "name": "tracks",
    "type": "readonly MediaPlayerTrack[]",
    "default": "[]",
    "required": false,
    "description": "Captions / subtitles (WebVTT or SRT files): rendered as <track> children\nand drawn by the player over the video (below the title for audio), with\na captions menu in the control bar. The choice is remembered\n(localStorage); a `default` track shows until the user chooses",
    "typeText": "readonly MediaPlayerTrack[]"
  },
  {
    "name": "aria-label",
    "type": "string",
    "required": false,
    "description": "Accessible label of the player",
    "typeText": "string"
  }
]
```

### events

```json
[
  {
    "name": "error",
    "type": "[error: MediaError | null]",
    "typeText": "[error: MediaError | null]",
    "parameters": [
      {
        "name": "error",
        "position": 0,
        "typeText": "MediaError | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "timeUpdate",
    "type": "[detail: MediaPlayerTimeDetail]",
    "typeText": "[detail: MediaPlayerTimeDetail]",
    "parameters": [
      {
        "name": "detail",
        "position": 0,
        "typeText": "MediaPlayerTimeDetail",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "ended",
    "type": "[]",
    "typeText": "[]",
    "parameters": []
  },
  {
    "name": "play",
    "type": "[]",
    "typeText": "[]",
    "parameters": []
  },
  {
    "name": "pause",
    "type": "[]",
    "typeText": "[]",
    "parameters": []
  },
  {
    "name": "loadedMetadata",
    "type": "[detail: { duration: number; }]",
    "typeText": "[detail: { duration: number; }]",
    "parameters": [
      {
        "name": "detail",
        "position": 0,
        "typeText": "{ duration: number; }",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "rateChange",
    "type": "[rate: number]",
    "typeText": "[rate: number]",
    "parameters": [
      {
        "name": "rate",
        "position": 0,
        "typeText": "number",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "volumeChange",
    "type": "[detail: MediaPlayerVolumeDetail]",
    "typeText": "[detail: MediaPlayerVolumeDetail]",
    "parameters": [
      {
        "name": "detail",
        "position": 0,
        "typeText": "MediaPlayerVolumeDetail",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "trackChange",
    "type": "[detail: MediaPlayerTrackChangeDetail]",
    "typeText": "[detail: MediaPlayerTrackChangeDetail]",
    "parameters": [
      {
        "name": "detail",
        "position": 0,
        "typeText": "MediaPlayerTrackChangeDetail",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

### slots

```json
[
  {
    "name": "title",
    "type": "any",
    "description": "Title of the media (replaces the title prop)",
    "typeText": "any"
  }
]
```

## CSS variables

```json
{
  "css:MediaPlayer": {
    "kind": "cssVars",
    "source": "react/src/components/MediaPlayer",
    "vars": [
      {
        "name": "--media-player-radius",
        "description": "Corner radius of the player (defaults to --radius-lg)"
      },
      {
        "name": "--media-player-accent",
        "description": "Color of the played range and the slider thumbs (defaults to --primary-color)"
      },
      {
        "name": "--media-player-video-background",
        "description": "Letterbox color behind a video (defaults to black)"
      },
      {
        "name": "--media-player-overlay-background",
        "description": "Background of the video control bar (defaults to a gradient to --overlay-color)"
      },
      {
        "name": "--media-player-overlay-color",
        "description": "Text and icon color over a video (defaults to white)"
      },
      {
        "name": "--media-player-bar-background",
        "description": "Background of the audio bar (defaults to --surface-color)"
      },
      {
        "name": "--media-player-bar-color",
        "description": "Text and icon color of the audio bar (defaults to --text-color)"
      },
      {
        "name": "--media-player-button-size",
        "description": "Size of the control buttons (defaults to the density's small control height)"
      },
      {
        "name": "--media-player-track-height",
        "description": "Thickness of the seek and volume tracks (defaults to 4px)"
      },
      {
        "name": "--media-player-captions-background",
        "description": "Background of the caption text (defaults to rgb(0 0 0 / 75%) over a video, none for audio)"
      },
      {
        "name": "--media-player-captions-color",
        "description": "Color of the caption text (defaults to white over a video, the bar color for audio)"
      },
      {
        "name": "--media-player-captions-font-size",
        "description": "Font size of the caption text (defaults to --font-size-lg over a video, --font-size-md for audio)"
      }
    ]
  }
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.

## Example: audio

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/media-player/vue/audio.vue

```vue
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

```

## Example: captions

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/media-player/vue/captions.vue

```vue
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

```

## Example: rates-skip

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/media-player/vue/rates-skip.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { MediaPlayer, VStack } from "minerva-design/vue";
const src =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";
const rate = ref(1);
</script>
<template>
  <VStack :gap="3" align="stretch" style="max-width: 560px">
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

```

## Example: resume

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/media-player/vue/resume.vue

```vue
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

```

## Example: video

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/media-player/vue/video.vue

```vue
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

```

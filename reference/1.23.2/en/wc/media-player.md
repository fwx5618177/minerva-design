# MediaPlayer

A media player with audio/video playback, captions and keyboard controls. The React player package adds HLS/DASH/FLV engines, source quality selection, playlists, A–B repeat, waveforms, screenshots and recording.

Package: minerva-design@1.23.2

Renderer: wc

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.2",
  "sourceCommit": "c6618fd81b2d3c2a9016cfe13a1d15983d533ff7",
  "sourceDigest": "sha256:1ce1c857f10d367f112c6e77d88ae3878570c428c4d39ed7a400c8c99645e9f6",
  "referenceSourceDigest": "sha256:8f6e89c1e214fedc2e52de014615037c54204a8ec5c0dbb40c58dc530906571e"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.2/types.json) or getType() from minerva-design/contracts.

## Documentation

Player package

Use the dedicated entry for the full React player. The original minerva-design MediaPlayer export remains available with its existing props and event payloads; both use the same playback implementation.

Streaming engines are browser adapters: codecs, CORS, autoplay and secure-context capabilities still apply. The advanced demos below are React DOM examples. Other framework and native tabs document their own supported APIs; React Native and mini-programs require their media hosts.

The examples play our Minerva Design film and its soundtrack from local files, with 720p and 360p video renditions. HLS, DASH and FLV use the same film. Screenshot and recording controls appear where supported; recording downloads a file on completion.

Advanced React API

##### Sources and engines

src accepts a URL or PlayerSource with type, mimeType, qualities and defaultQuality. HLS/DASH expose adaptive levels; createHlsEngine/createDashEngine/createFlvEngine and engines let you configure or replace adapters. Stream libraries load only when needed.

##### Playback and audio

playlist holds source/title/poster entries; defaultPlaylistIndex and onPlaylistIndexChange observe the current item. Audio and video share one engine. waveform accepts auto, decorative or peak values; A–B repeat and Media Session are optional.

##### Controls and custom actions

controls can be false for bare media or an object that enables play, progress, volume, quality, speed, captions, skip, abRepeat, playlist, screenshot, record, pip and fullscreen. actions and renderTooltip integrate host actions and tooltips without application dependencies.

##### Events and errors

The advanced entry calls onTimeUpdate(currentTime, duration), onMetadata({ width, height, duration }), onQualityChange(id) and onError(PlayerError). The root minerva-design export retains its object-shaped time callback and native MediaError callback.

##### Imperative handle

The ref exposes play/pause/seek and element/video, plus setPlaybackRate, setQuality, next/previous, setAbRepeat/clearAbRepeat, screenshot, startRecording/stopRecording and toggleFullscreen. play returns its promise so the host can handle browser playback rejection.

##### Appearance and capability boundaries

locale supports en/zh/ja/fr and messages overrides control text; theme selects light/dark. Import the player CSS once. PiP, recording, screenshot, volume and fullscreen depend on the host; cross-origin capture requires suitable CORS headers. DRM licensing is not configured by the built-in adapters. In flex or grid layouts, give the surrounding container a width; maxWidth only limits its size.

Minerva Design · Component showcase

Minerva Design · Film soundtrack

```tsx
import { MediaPlayer as CompatibleMediaPlayer } from "minerva-design";
```

## MediaControls

Support: n/a

Mobile component of minerva-design/native (React Native); on the web use the responsive web components.

## MediaPlayer

Support: stable

### Import

```json
{
  "specifier": "minerva-design/web-components/media-player",
  "exports": [],
  "kind": "side-effect"
}
```

### props

```json
[
  {
    "name": "src",
    "typeText": "string | undefined",
    "attribute": "src",
    "required": false
  },
  {
    "name": "type",
    "typeText": "\"audio\" | \"video\" | undefined",
    "attribute": "type",
    "required": false
  },
  {
    "name": "mimeType",
    "typeText": "string | undefined",
    "attribute": "mime-type",
    "required": false
  },
  {
    "name": "poster",
    "typeText": "string | undefined",
    "attribute": "poster",
    "required": false
  },
  {
    "name": "autoPlay",
    "typeText": "boolean",
    "attribute": "autoplay",
    "required": false
  },
  {
    "name": "loop",
    "typeText": "boolean",
    "attribute": "loop",
    "required": false
  },
  {
    "name": "muted",
    "typeText": "boolean",
    "attribute": "muted",
    "required": false
  },
  {
    "name": "preload",
    "typeText": "\"none\" | \"metadata\" | \"auto\"",
    "attribute": "preload",
    "required": false
  },
  {
    "name": "crossOrigin",
    "typeText": "\"anonymous\" | \"use-credentials\" | undefined",
    "attribute": "crossorigin",
    "required": false
  },
  {
    "name": "startTime",
    "typeText": "number | undefined",
    "attribute": "start-time",
    "required": false
  },
  {
    "name": "skipSeconds",
    "typeText": "number",
    "attribute": "skip-seconds",
    "required": false
  },
  {
    "name": "noControls",
    "typeText": "boolean",
    "attribute": "no-controls",
    "required": false
  },
  {
    "name": "height",
    "typeText": "string | undefined",
    "attribute": "height",
    "required": false
  },
  {
    "name": "aspectRatio",
    "typeText": "string",
    "attribute": "aspect-ratio",
    "required": false
  },
  {
    "name": "pictureInPicture",
    "typeText": "boolean",
    "attribute": "picture-in-picture",
    "required": false
  },
  {
    "name": "playbackRates",
    "typeText": "readonly number[]",
    "required": false
  },
  {
    "name": "tracks",
    "typeText": "readonly MediaPlayerTrack[]",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "minerva-play",
    "typeText": "CustomEvent<undefined>",
    "bubbles": true,
    "composed": true,
    "cancelable": false,
    "description": "Playback started"
  },
  {
    "name": "minerva-pause",
    "typeText": "CustomEvent<undefined>",
    "bubbles": true,
    "composed": true,
    "cancelable": false,
    "description": "Playback paused"
  },
  {
    "name": "minerva-ended",
    "typeText": "CustomEvent<undefined>",
    "bubbles": true,
    "composed": true,
    "cancelable": false,
    "description": "Playback reached the end"
  },
  {
    "name": "minerva-time-update",
    "typeText": "CustomEvent<{ currentTime: number; duration: number; }>",
    "detailType": {
      "typeText": "{ currentTime: number; duration: number; }",
      "typeRef": "type:bc4fee9812e39da4a0e4"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": false,
    "description": "The playhead moved (`detail: { currentTime, duration }`, seconds)"
  },
  {
    "name": "minerva-loaded-metadata",
    "typeText": "CustomEvent<{ duration: number; }>",
    "detailType": {
      "typeText": "{ duration: number; }",
      "typeRef": "type:f41189c70ba6df1af767"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": false,
    "description": "The metadata loaded (`detail: { duration }`)"
  },
  {
    "name": "minerva-error",
    "typeText": "CustomEvent<{ error: MediaError | null; }>",
    "detailType": {
      "typeText": "{ error: MediaError | null; }",
      "typeRef": "type:e4c408fa85ecea6222f0"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": false,
    "description": "The media can't be loaded or played (`detail: { error }`, the `MediaError`)"
  },
  {
    "name": "minerva-rate-change",
    "typeText": "CustomEvent<{ rate: number; }>",
    "detailType": {
      "typeText": "{ rate: number; }",
      "typeRef": "type:d83baf2114a7a053b388"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": false,
    "description": "The playback speed changed (`detail: { rate }`)"
  },
  {
    "name": "minerva-volume-change",
    "typeText": "CustomEvent<{ volume: number; muted: boolean; }>",
    "detailType": {
      "typeText": "{ volume: number; muted: boolean; }",
      "typeRef": "type:219765685fe942082e67"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": false,
    "description": "The volume or the muted state changed (`detail: { volume, muted }`)"
  },
  {
    "name": "minerva-track-change",
    "typeText": "CustomEvent<{ index: number; track: MediaPlayerTrack; }>",
    "detailType": {
      "typeText": "{ index: number; track: MediaPlayerTrack; }",
      "typeRef": "type:1ac7f81b9f620642d47d"
    },
    "bubbles": true,
    "composed": true,
    "cancelable": false,
    "description": "The user chose captions (`detail: { index, track }`; index -1 and track null: Off)"
  }
]
```

### slots

```json
[
  {
    "name": "heading",
    "description": "Title of the media, shown in the audio bar / over the video"
  }
]
```

## API

```json
{
  "wc:minerva-media-player": {
    "kind": "element",
    "source": "web-components/src/components/media-player/media-player.ts",
    "className": "MinervaMediaPlayer",
    "summary": "Audio / video player with themed controls.",
    "description": "An `<audio>` / `<video>` element with themed custom controls (`<MediaPlayer>` of React): play / pause, skip back / forward, a seek bar (`role=slider`, buffered range), the time, mute and volume, the playback speed (cycle button), fullscreen and picture-in-picture (video), and a captions menu when `tracks` are given (cues drawn by the player). Keyboard on the focused player: Space / K play-pause, ← / → seek by 5 s, ↑ / ↓ volume, M mute, F fullscreen, C captions on / off. Captions come from the `tracks` property or, when it is empty, from `<track src srclang label kind default>` children of the element. The media events don't cross the shadow root: they are re-dispatched as `minerva-*` events. `play()`, `pause()`, `seek(seconds)` and `element` drive the media from script.",
    "properties": [
      {
        "name": "src",
        "attribute": "src",
        "type": "string | undefined",
        "description": "URL of the media"
      },
      {
        "name": "type",
        "attribute": "type",
        "type": "\"audio\" | \"video\" | undefined",
        "description": "Kind of media; default: inferred from `mime-type`, else from the file extension of `src`, else \"video\""
      },
      {
        "name": "mimeType",
        "attribute": "mime-type",
        "type": "string | undefined",
        "description": "MIME type of the media (\"audio/mpeg\", \"video/mp4\"...), used to infer `type`"
      },
      {
        "name": "poster",
        "attribute": "poster",
        "type": "string | undefined",
        "description": "Image shown before a video plays"
      },
      {
        "name": "autoPlay",
        "attribute": "autoplay",
        "type": "boolean",
        "default": "false",
        "description": "Starts playing as soon as possible (browsers only allow muted autoplay without a user gesture)"
      },
      {
        "name": "loop",
        "attribute": "loop",
        "type": "boolean",
        "default": "false",
        "description": "Restarts at the end"
      },
      {
        "name": "muted",
        "attribute": "muted",
        "type": "boolean",
        "default": "false",
        "description": "Mutes the media; follows the mute button and the M key"
      },
      {
        "name": "preload",
        "attribute": "preload",
        "type": "\"none\" | \"metadata\" | \"auto\"",
        "default": "\"metadata\"",
        "description": "How much of the media the browser loads before playback"
      },
      {
        "name": "crossOrigin",
        "attribute": "crossorigin",
        "type": "\"anonymous\" | \"use-credentials\" | undefined",
        "description": "CORS mode of the media request (cross-origin caption files need it too, plus CORS headers on their server)"
      },
      {
        "name": "startTime",
        "attribute": "start-time",
        "type": "number | undefined",
        "description": "Resume position in seconds, applied once when the metadata loads (and again when `src` changes)"
      },
      {
        "name": "skipSeconds",
        "attribute": "skip-seconds",
        "type": "number",
        "default": "10",
        "description": "Step of the skip back / forward buttons, in seconds (0 hides them)"
      },
      {
        "name": "noControls",
        "attribute": "no-controls",
        "type": "boolean",
        "default": "false",
        "description": "Hides the custom control bar: renders the bare media element (drive it from script)"
      },
      {
        "name": "height",
        "attribute": "height",
        "type": "string | undefined",
        "description": "Height of a video player (CSS length; a bare number is pixels); overrides `aspect-ratio`"
      },
      {
        "name": "aspectRatio",
        "attribute": "aspect-ratio",
        "type": "string",
        "default": "\"16 / 9\"",
        "description": "Aspect ratio of a video player (CSS aspect-ratio)"
      },
      {
        "name": "pictureInPicture",
        "attribute": "picture-in-picture",
        "type": "boolean",
        "default": "false",
        "description": "Shows a picture-in-picture button (video, where the browser supports it)"
      },
      {
        "name": "playbackRates",
        "type": "readonly number[]",
        "default": "DEFAULT_PLAYBACK_RATES",
        "description": "Speeds the speed button cycles through (default [0.5, 0.75, 1, 1.25, 1.5, 2])"
      },
      {
        "name": "tracks",
        "type": "readonly MediaPlayerTrack[]",
        "default": "[]",
        "description": "Captions / subtitles (WebVTT or SRT files, JS property): drawn by the player over the video (below the title for audio), with a captions menu in the control bar. The choice is remembered (localStorage); a `default` track shows until the user chooses. Empty: the `<track>` children are used"
      },
      {
        "name": "element",
        "type": "HTMLMediaElement | null",
        "readonly": true,
        "description": "The rendered `<audio>` / `<video>` element (null before the first render)"
      }
    ],
    "methods": [
      {
        "name": "play",
        "signature": "() => Promise<void>",
        "description": "Starts playback (autoplay-policy rejections are swallowed: the player stays paused)"
      },
      {
        "name": "pause",
        "signature": "() => void",
        "description": "Pauses playback"
      },
      {
        "name": "seek",
        "signature": "(seconds: number) => void",
        "description": "Moves the playhead to `seconds` (clamped to the duration)"
      }
    ],
    "events": [
      {
        "name": "minerva-play",
        "description": "Playback started"
      },
      {
        "name": "minerva-pause",
        "description": "Playback paused"
      },
      {
        "name": "minerva-ended",
        "description": "Playback reached the end"
      },
      {
        "name": "minerva-time-update",
        "description": "The playhead moved (`detail: { currentTime, duration }`, seconds)"
      },
      {
        "name": "minerva-loaded-metadata",
        "description": "The metadata loaded (`detail: { duration }`)"
      },
      {
        "name": "minerva-error",
        "description": "The media can't be loaded or played (`detail: { error }`, the `MediaError`)"
      },
      {
        "name": "minerva-rate-change",
        "description": "The playback speed changed (`detail: { rate }`)"
      },
      {
        "name": "minerva-volume-change",
        "description": "The volume or the muted state changed (`detail: { volume, muted }`)"
      },
      {
        "name": "minerva-track-change",
        "description": "The user chose captions (`detail: { index, track }`; index -1 and track null: Off)"
      }
    ],
    "slots": [
      {
        "name": "heading",
        "description": "Title of the media, shown in the audio bar / over the video"
      }
    ],
    "parts": [
      {
        "name": "root",
        "description": "The outermost element (the focusable player)"
      },
      {
        "name": "media",
        "description": "The native `<audio>` or `<video>` element"
      },
      {
        "name": "title",
        "description": "The title of the media (audio bar, video overlay)"
      },
      {
        "name": "controls",
        "description": "The control bar"
      },
      {
        "name": "button",
        "description": "A control button (play, skip, mute, speed, captions, fullscreen, picture-in-picture)"
      },
      {
        "name": "seek",
        "description": "The seek bar (`role=slider`) with the buffered range"
      },
      {
        "name": "time",
        "description": "The current time / duration text"
      },
      {
        "name": "volume",
        "description": "The volume bar (`role=slider`)"
      },
      {
        "name": "spinner",
        "description": "The loading indicator (while buffering)"
      },
      {
        "name": "error",
        "description": "The error message (media that can't be played)"
      },
      {
        "name": "captions",
        "description": "The captions overlay showing the active cue (video: over the picture, audio: below the title)"
      },
      {
        "name": "captions-menu",
        "description": "The captions menu (`role=menu`): Off and one item per track"
      }
    ],
    "cssProperties": [
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
        "description": "Background of the video control bar (defaults to a dark scrim that keeps controls legible over bright frames)"
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
        "description": "Background of the video control bar (defaults to a dark scrim that keeps controls legible over bright frames)"
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

## Example: Audio

An .mp3 src (or mime-type="audio/…") renders the audio bar; skip-seconds="0" hides the skip buttons.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/media-player/wc/audio.html

```html
<div style="width: 100%; min-width: 0; max-width: 480px">
  <minerva-media-player src="media-player/sample.m4a" skip-seconds="0">
    <span slot="heading">Audio playback</span>
  </minerva-media-player>
</div>

```

## Example: Captions

tracks is a property (an array of { src, srclang, label, kind, default }); without it, <track src srclang label default> children of the element are used. The player draws the cues and adds a captions menu; minerva-track-change reports the user's choice. Cross-origin files need crossorigin and CORS headers.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/media-player/wc/captions.html

```html
<div
  style="display: grid; gap: 12px; width: 100%; min-width: 0; max-width: 640px"
>
  <minerva-media-player
    poster="media-player/poster.jpg"
    id="player"
    src="media-player/sample.mp4"
  >
    <span slot="heading">Video playback</span>
  </minerva-media-player>
  <output id="choice" aria-live="polite">Captions: default track</output>
</div>

```

### apps/docs/src/docs/pages/media-player/wc/captions.ts

```tsx
// tracks is a property (an array of { src, srclang, label, kind, default });
// <track src srclang label default> children of the element work too.
// minerva-track-change reports the user's choice.
import type {
  MediaPlayerTrack,
  MinervaMediaPlayer,
} from "minerva-design/web-components/media-player";

const ENGLISH_VTT = `WEBVTT

00:00.000 --> 00:01.800
A locally hosted playback sample

00:01.800 --> 00:03.600
Video and audio share the <i>same player</i>

00:03.600 --> 00:06.000
Captions follow the playback position.
`;
const FRENCH_SRT = `1
00:00:00,000 --> 00:00:01,800
Un exemple de lecture hébergé localement

2
00:00:01,800 --> 00:00:03,600
La vidéo et l’audio partagent le même lecteur

3
00:00:03,600 --> 00:00:06,000
Les sous-titres suivent la lecture.
`;
const tracks: MediaPlayerTrack[] = [
  {
    src: `data:text/vtt;charset=utf-8,${encodeURIComponent(ENGLISH_VTT)}`,
    srclang: "en",
    label: "English",
    default: true,
  },
  {
    src: `data:application/x-subrip;charset=utf-8,${encodeURIComponent(FRENCH_SRT)}`,
    srclang: "fr",
    label: "Français",
  },
];

export function setup(root: HTMLElement) {
  const player = root.querySelector<MinervaMediaPlayer>("#player")!;
  const output = root.querySelector<HTMLOutputElement>("#choice")!;
  player.tracks = tracks;
  const onTrackChange = (e: Event) => {
    const { track } = (
      e as CustomEvent<{ index: number; track: MediaPlayerTrack | null }>
    ).detail;
    output.value = `Captions: ${track?.label ?? "Off"}`;
  };
  player.addEventListener("minerva-track-change", onTrackChange);
  return () =>
    player.removeEventListener("minerva-track-change", onTrackChange);
}

```

## Example: Speeds and skip step

playbackRates is a property (an array); minerva-rate-change reports the speed. skip-seconds sets the skip step and aspect-ratio sizes the video.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/media-player/wc/rates-skip.html

```html
<div
  style="display: grid; gap: 12px; width: 100%; min-width: 0; max-width: 640px"
>
  <minerva-media-player
    poster="media-player/poster.jpg"
    id="player"
    src="media-player/sample.mp4"
    skip-seconds="3"
    aspect-ratio="4 / 3"
    aria-label="Flower, speed and skip"
  ></minerva-media-player>
  <output id="rate">Speed: 1×</output>
</div>

```

### apps/docs/src/docs/pages/media-player/wc/rates-skip.ts

```tsx
// playbackRates is a property (an array); minerva-rate-change reports the
// speed picked with the speed button.
import type { MinervaMediaPlayer } from "minerva-design/web-components/media-player";

export function setup(root: HTMLElement) {
  const player = root.querySelector<MinervaMediaPlayer>("#player")!;
  const output = root.querySelector<HTMLOutputElement>("#rate")!;
  player.playbackRates = [1, 1.5, 2];
  const onRate = (e: Event) => {
    const { rate } = (e as CustomEvent<{ rate: number }>).detail;
    output.value = `Speed: ${rate}×`;
  };
  player.addEventListener("minerva-rate-change", onRate);
  return () => player.removeEventListener("minerva-rate-change", onRate);
}

```

## Example: Resume and progress

start-time resumes once the metadata loads. The media events don't cross the shadow root: listen to minerva-loaded-metadata, minerva-time-update, minerva-pause and minerva-ended; play() and seek() drive the player.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/media-player/wc/resume.html

```html
<div
  style="display: grid; gap: 12px; width: 100%; min-width: 0; max-width: 640px"
>
  <minerva-media-player
    poster="media-player/poster.jpg"
    id="player"
    src="media-player/sample.mp4"
    start-time="2"
  ></minerva-media-player>
  <div style="display: flex; gap: 8px; flex-wrap: wrap">
    <minerva-button id="play" size="small">Play</minerva-button>
    <minerva-button id="restart" size="small" variant="outline"
      >Restart</minerva-button
    >
  </div>
  <output id="progress" aria-live="polite">Not started</output>
</div>

```

### apps/docs/src/docs/pages/media-player/wc/resume.ts

```tsx
// start-time resumes once the metadata loads; the media events cross the
// shadow root as minerva-* events; play() / seek() drive the player.
import type { MinervaMediaPlayer } from "minerva-design/web-components/media-player";

export function setup(root: HTMLElement) {
  const player = root.querySelector<MinervaMediaPlayer>("#player")!;
  const output = root.querySelector<HTMLOutputElement>("#progress")!;
  let saved = 2;
  const onMetadata = (e: Event) => {
    const { duration } = (e as CustomEvent<{ duration: number }>).detail;
    output.value = `Resumed at ${saved}s of ${duration.toFixed(1)}s`;
  };
  const onTime = (e: Event) => {
    const { currentTime, duration } = (
      e as CustomEvent<{ currentTime: number; duration: number }>
    ).detail;
    output.value = `${Math.round((currentTime / duration) * 100)}% watched (${currentTime.toFixed(1)}s)`;
  };
  const onPause = () => {
    saved = Math.floor(player.element?.currentTime ?? 0);
    player.startTime = saved;
    output.value = `Paused · saved position: ${saved}s`;
  };
  const onEnded = () => (output.value = "Finished");
  const play = () => void player.play();
  const restart = () => player.seek(0);
  const playButton = root.querySelector("#play")!;
  const restartButton = root.querySelector("#restart")!;
  player.addEventListener("minerva-loaded-metadata", onMetadata);
  player.addEventListener("minerva-time-update", onTime);
  player.addEventListener("minerva-pause", onPause);
  player.addEventListener("minerva-ended", onEnded);
  playButton.addEventListener("click", play);
  restartButton.addEventListener("click", restart);
  return () => {
    player.removeEventListener("minerva-loaded-metadata", onMetadata);
    player.removeEventListener("minerva-time-update", onTime);
    player.removeEventListener("minerva-pause", onPause);
    player.removeEventListener("minerva-ended", onEnded);
    playButton.removeEventListener("click", play);
    restartButton.removeEventListener("click", restart);
  };
}

```

## Example: Video

The heading slot is the title over the video; picture-in-picture adds a button where the browser supports it. Focus the player: Space / K, arrows, M and F.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/media-player/wc/video.html

```html
<div style="width: 100%; min-width: 0; max-width: 640px">
  <minerva-media-player
    poster="media-player/poster.jpg"
    src="media-player/sample.mp4"
    picture-in-picture
  >
    <span slot="heading">Video playback</span>
  </minerva-media-player>
</div>

```

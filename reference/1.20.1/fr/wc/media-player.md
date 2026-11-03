# MediaPlayer

Un lecteur audio ou vidéo aux commandes personnalisées et thématisées : lecture / pause, sauts, barre de progression avec la plage mise en mémoire tampon, durée, volume, vitesse de lecture et plein écran, utilisable au clavier.

Package: minerva-design@1.20.1

Renderer: wc

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.1",
  "sourceCommit": "3a9f5cdaae706f14fe6d8c65c5481eba719a66c4",
  "sourceDigest": "sha256:c9ed2b706b61413d29e506a3f04f3d35c044a4b57ec0e284935054f9e1898c7e",
  "referenceSourceDigest": "sha256:6c9ecba0079f25e53cd971e51f2be8604fc3d941c0ed1cfeec03c4a91913ad73"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.1/types.json) or getType() from minerva-design/contracts.

## Documentation

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

## Example: Audio

Un src en .mp3 (ou mime-type="audio/…") affiche la barre audio ; skip-seconds="0" masque les boutons de saut.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/media-player/wc/audio.html

```html
<div style="max-width: 480px">
  <minerva-media-player
    src="https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3"
    skip-seconds="0"
  >
    <span slot="heading">T-Rex roar</span>
  </minerva-media-player>
</div>

```

## Example: Sous-titres

tracks est une propriété (un tableau de { src, srclang, label, kind, default }) ; sans elle, les enfants <track src srclang label default> de l’élément sont utilisés. Le lecteur dessine les répliques et ajoute un menu de sous-titres ; minerva-track-change signale le choix de l’utilisateur. Les fichiers d’une autre origine demandent crossorigin et des en-têtes CORS.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/media-player/wc/captions.html

```html
<div style="display: grid; gap: 12px; max-width: 560px">
  <minerva-media-player
    id="player"
    src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
  >
    <span slot="heading">Flower</span>
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
A flower bud in the morning light

00:01.800 --> 00:03.600
Its petals slowly <i>unfold</i>

00:03.600 --> 00:06.000
…and the bloom opens to the bees.
`;
const FRENCH_SRT = `1
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

## Example: Vitesses et pas de saut

playbackRates est une propriété (un tableau) ; minerva-rate-change signale la vitesse. skip-seconds fixe le pas de saut et aspect-ratio dimensionne la vidéo.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/media-player/wc/rates-skip.html

```html
<div style="display: grid; gap: 12px; max-width: 560px">
  <minerva-media-player
    id="player"
    src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
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

## Example: Reprise et progression

start-time reprend une fois les métadonnées chargées. Les événements média ne traversent pas la shadow root : écoutez minerva-loaded-metadata, minerva-time-update, minerva-pause et minerva-ended ; play() et seek() pilotent le lecteur.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/media-player/wc/resume.html

```html
<div style="display: grid; gap: 12px; max-width: 560px">
  <minerva-media-player
    id="player"
    src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
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

## Example: Vidéo

Le slot heading est le titre affiché sur la vidéo ; picture-in-picture ajoute un bouton là où le navigateur le permet. Lecteur focalisé : Espace / K, flèches, M et F.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: none

Documentation context imports: none

### apps/docs/src/docs/pages/media-player/wc/video.html

```html
<div style="max-width: 560px">
  <minerva-media-player
    src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
    picture-in-picture
  >
    <span slot="heading">Flower</span>
  </minerva-media-player>
</div>

```

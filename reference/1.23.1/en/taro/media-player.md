# MediaPlayer

A media player with audio/video playback, captions and keyboard controls. The React player package adds HLS/DASH/FLV engines, source quality selection, playlists, A–B repeat, waveforms, screenshots and recording.

Package: minerva-design@1.23.1

Renderer: taro

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "6ccf4f2c7a65dd5b27e517c9a50ea4867f8e7980",
  "sourceDigest": "sha256:2005faebbf738765fe81a5c952fa47a51311aa5d05e3220f71c542b8b1fe369b",
  "referenceSourceDigest": "sha256:3616b5d4e7cf7e0eb1fbe04c879d1630cc3dfd5c28f16762b8ad6f3f3525ef82"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

## Documentation

Player package

Use the dedicated entry for the full React player. The original minerva-design MediaPlayer export remains available with its existing props and event payloads; both use the same playback implementation.

Streaming engines are browser adapters: codecs, CORS, autoplay and secure-context capabilities still apply. The advanced demos below are React DOM examples. Other framework and native tabs document their own supported APIs; React Native and mini-programs require their media hosts.

These examples use short, locally hosted FFmpeg test patterns and a synthetic tone. They work without third-party stream services. Screenshot and recording buttons appear only where supported; recording downloads a file on completion.

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

Synthetic test pattern

440 Hz test tone

```tsx
import { MediaPlayer as CompatibleMediaPlayer } from "minerva-design";
```

## MediaControls

Support: n/a

React Native-specific extension, outside the shared web component API; use minerva-design/native for this component.

## MediaPlayer

Support: beta

Video through the host <video> component (controls off, driven by createVideoContext: play/pause/seek/playbackRate/requestFullScreen) and audio through Taro.createInnerAudioContext, under a themed control bar: play/pause, skip back/forward (skipSeconds), touch seek bar with the buffered range and aria-valuetext, m:ss / h:mm:ss time, mute, audio volume bar, playback-rate cycle button, video fullscreen, loading spinner and translated error state; startTime (video initial-time, audio startTime), autoPlay, loop, muted/defaultMuted, title, poster, height/aspectRatio; onTimeUpdate/onEnded/onPlay/onPause/onLoadedMetadata/onError/onRateChange/onVolumeChange and a ref with play/pause/seek/context. controls={false} shows the host video's own controls. Captions: tracks (WebVTT or SRT, data: URLs inline) fetched with Taro.request, parsed by the shared minerva-design/core parser and drawn as an overlay synchronized with the time updates, a CC button with an Off / per-track choice row, the choice remembered in storage (default track otherwise) and onTrackChange. Native touch/view semantics differ from browser DOM semantics. Native devices do not expose document focus, inert, browser portals or File input APIs; H5 capabilities are specified separately. Device-runtime validation is still required. Beta: needs device validation (WeChat / Alipay / H5 media behavior differs). The host video has no volume API (mute only, no volume bar); no picture-in-picture, no buffered range for audio on hosts that do not report InnerAudioContext.buffered, no keyboard shortcuts; icons are text glyphs (mini programs have no inline SVG). Captions follow the host time updates (about 4 per second), are not shown in the host's native fullscreen, ignore cue positioning / styling, and remote caption files need the app's request domain allowlist. Component tests, H5 tests in happy-dom and the official Taro WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/taro",
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
    "source": "packages/taro/src/media-player.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "URL of the media"
  },
  {
    "name": "type",
    "source": "packages/taro/src/media-player.tsx",
    "kind": "enum",
    "values": [
      "audio",
      "video"
    ],
    "typeText": "MediaPlayerType | undefined",
    "typeRef": "type:f6ba35e7f4fc2138f1bc",
    "required": false,
    "description": "Kind of media (default: inferred from mimeType, else the file extension of src, else \"video\")"
  },
  {
    "name": "mimeType",
    "source": "packages/taro/src/media-player.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "MIME type of the media, used to infer type"
  },
  {
    "name": "poster",
    "source": "packages/taro/src/media-player.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Image shown before a video plays"
  },
  {
    "name": "title",
    "source": "packages/taro/src/media-player.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Title of the media, shown in the audio bar / over the video"
  },
  {
    "name": "autoPlay",
    "source": "packages/taro/src/media-player.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Starts playing as soon as possible (default false)"
  },
  {
    "name": "loop",
    "source": "packages/taro/src/media-player.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Restarts at the end (default false)"
  },
  {
    "name": "muted",
    "source": "packages/taro/src/media-player.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Mutes the media; applied whenever it changes (the mute button still toggles the sound)"
  },
  {
    "name": "defaultMuted",
    "source": "packages/taro/src/media-player.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Initially muted (uncontrolled)"
  },
  {
    "name": "startTime",
    "source": "packages/taro/src/media-player.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Resume position in seconds, applied once (video `initial-time`, audio `startTime`)"
  },
  {
    "name": "playbackRates",
    "source": "packages/taro/src/media-player.tsx",
    "kind": "array",
    "typeText": "readonly number[] | undefined",
    "typeRef": "type:9b11f9b3b1a7e709603e",
    "required": false,
    "description": "Speeds the speed button cycles through (default [0.5, 0.75, 1, 1.25, 1.5, 2])"
  },
  {
    "name": "skipSeconds",
    "source": "packages/taro/src/media-player.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Step of the skip back / forward buttons, in seconds (0 hides them; default 10)"
  },
  {
    "name": "controls",
    "source": "packages/taro/src/media-player.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Shows the custom control bar (default true); false shows the host video's own controls (audio: nothing)"
  },
  {
    "name": "height",
    "source": "packages/taro/src/media-player.tsx",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "required": false,
    "description": "Height of a video player (number: px); overrides aspectRatio"
  },
  {
    "name": "aspectRatio",
    "source": "packages/taro/src/media-player.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Aspect ratio of a video player (CSS aspect-ratio, default \"16 / 9\")"
  },
  {
    "name": "tracks",
    "source": "packages/taro/src/media-player.tsx",
    "kind": "array",
    "typeText": "readonly MediaPlayerTrack[] | undefined",
    "typeRef": "type:12be99ac32eab1da806c",
    "required": false,
    "description": "Captions / subtitles (WebVTT or SRT files): fetched with `Taro.request`, parsed and drawn over the video (below the title for audio) at the playback time, with a captions (CC) choice in the control bar. The choice is remembered (storage); a `default` track shows until the user chooses"
  },
  {
    "name": "id",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-label",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-labelledby",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  },
  {
    "name": "aria-describedby",
    "source": "packages/taro/src/shared.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "onTimeUpdate",
    "source": "packages/taro/src/media-player.tsx",
    "kind": "function",
    "typeText": "((detail: MediaPlayerTimeDetail) => void) | undefined",
    "typeRef": "type:3e8fa99a9e378b6e029c",
    "parameters": [
      {
        "name": "detail",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "MediaPlayerTimeDetail",
        "typeRef": "type:2d3acc148290546d7762"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called while playing with the playhead position and the duration"
  },
  {
    "name": "onEnded",
    "source": "packages/taro/src/media-player.tsx",
    "kind": "function",
    "typeText": "(() => void) | undefined",
    "typeRef": "type:baceb927651011089f71",
    "parameters": [],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when playback reaches the end"
  },
  {
    "name": "onPlay",
    "source": "packages/taro/src/media-player.tsx",
    "kind": "function",
    "typeText": "(() => void) | undefined",
    "typeRef": "type:9074a6f9cd9922c8651b",
    "parameters": [],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when playback starts"
  },
  {
    "name": "onPause",
    "source": "packages/taro/src/media-player.tsx",
    "kind": "function",
    "typeText": "(() => void) | undefined",
    "typeRef": "type:3b0c8d1b1b30d6a8e0f5",
    "parameters": [],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when playback pauses"
  },
  {
    "name": "onLoadedMetadata",
    "source": "packages/taro/src/media-player.tsx",
    "kind": "function",
    "typeText": "((detail: { duration: number; }) => void) | undefined",
    "typeRef": "type:27cee7bcb907abb0a1f9",
    "parameters": [
      {
        "name": "detail",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "{ duration: number; }",
        "typeRef": "type:e164e9f986dee5758795"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called with the duration once it is known"
  },
  {
    "name": "onError",
    "source": "packages/taro/src/media-player.tsx",
    "kind": "function",
    "typeText": "((error: unknown) => void) | undefined",
    "typeRef": "type:7b034d9266449f6e4315",
    "parameters": [
      {
        "name": "error",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "unknown",
        "typeRef": "type:dc96c0cac9f2d6c9a926"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the media can't be loaded or played (the host error detail)"
  },
  {
    "name": "onRateChange",
    "source": "packages/taro/src/media-player.tsx",
    "kind": "function",
    "typeText": "((rate: number) => void) | undefined",
    "typeRef": "type:6e424b1466b0644cbc18",
    "parameters": [
      {
        "name": "rate",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "number",
        "typeRef": "type:7d1137535c313783dadd"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called with the new playback speed"
  },
  {
    "name": "onVolumeChange",
    "source": "packages/taro/src/media-player.tsx",
    "kind": "function",
    "typeText": "((detail: MediaPlayerVolumeDetail) => void) | undefined",
    "typeRef": "type:f13cbe2a3203b3d38335",
    "parameters": [
      {
        "name": "detail",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "MediaPlayerVolumeDetail",
        "typeRef": "type:abc7eb0bbcb9cf36396d"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the volume or the muted state changes"
  },
  {
    "name": "onTrackChange",
    "source": "packages/taro/src/media-player.tsx",
    "kind": "function",
    "typeText": "((detail: MediaPlayerTrackChangeDetail) => void) | undefined",
    "typeRef": "type:36bba0f7a87780c5fe5f",
    "parameters": [
      {
        "name": "detail",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "MediaPlayerTrackChangeDetail",
        "typeRef": "type:98febfdfccfd76f9a200"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the user chooses captions (index -1 and track null: Off)"
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

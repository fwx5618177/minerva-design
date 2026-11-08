# MediaPlayer

A media player with audio/video playback, captions and keyboard controls. The React player package adds HLS/DASH/FLV engines, source quality selection, playlists, A–B repeat, waveforms, screenshots and recording.

Package: minerva-design@1.23.0

Renderer: weapp

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "413e3d54e2177f8469c443a6547c4472e608839c",
  "sourceDigest": "sha256:8c8e874e213d698b4d05cabed92eed392c90c5b0fa91c66def67eab19184e86c",
  "referenceSourceDigest": "sha256:e694adbf6015cdc21809df819193e0a84c030845fb2910749dbd1c4c15ccca99"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

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

locale supports en/zh/ja/fr and messages overrides control text; theme selects light/dark. Import the player CSS once. PiP, recording, screenshot, volume and fullscreen depend on the host; cross-origin capture requires suitable CORS headers. DRM licensing is not configured by the built-in adapters.

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

Video through the host <video> (controls off, driven by wx.createVideoContext: play/pause/seek/playbackRate/requestFullScreen) and audio through wx.createInnerAudioContext, under a themed control bar: play/pause, skip back/forward (skipSeconds), touch seek bar with the buffered range and aria-valuetext, m:ss / h:mm:ss time, mute, audio volume bar, playback-rate cycle button, video fullscreen, loading spinner and translated error state; startTime (video initial-time, audio startTime), autoPlay, loop, muted/defaultMuted, title, poster, height/aspectRatio; timeupdate/ended/play/pause/loadedmetadata/error/ratechange/volumechange events and play()/pause()/seek(seconds) instance methods. controls=false shows the host video's own controls. Captions: tracks (WebVTT or SRT, data: URLs inline) fetched with wx.request, parsed by the shared minerva-design/core parser and drawn as an overlay synchronized with the time updates, a CC button with an Off / per-track choice row, the choice remembered in storage (default track otherwise), a trackchange event and chooseTrack(index). Beta: needs device validation. The host video has no volume API (mute only, no volume bar); no picture-in-picture and no keyboard shortcuts; icons are text glyphs (no inline SVG in WXML). Captions follow the host time updates (about 4 per second), are not shown in the host's native fullscreen, ignore cue positioning / styling, and remote caption files need the app's request domain allowlist. Native component tests and package builds pass. Selected selection, disabled-switch, overlay and theme flows were checked in the WeChat Developer Tools simulator, not on a physical device; controlled input remains unverified and automator page RPC timed out. This is not all-API or device E2E validation.

### Import

```json
{
  "specifier": "minerva-design/dist/weapp/media-player/index",
  "exports": [],
  "kind": "usingComponents"
}
```

### props

```json
[
  {
    "name": "src",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "type",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "mimeType",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "poster",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "title",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "autoPlay",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "loop",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "muted",
    "typeText": "unknown",
    "required": false,
    "default": null
  },
  {
    "name": "defaultMuted",
    "typeText": "boolean",
    "required": false,
    "default": false
  },
  {
    "name": "startTime",
    "typeText": "number",
    "required": false,
    "default": 0
  },
  {
    "name": "playbackRates",
    "typeText": "array",
    "required": false
  },
  {
    "name": "skipSeconds",
    "typeText": "number",
    "required": false,
    "default": 10
  },
  {
    "name": "controls",
    "typeText": "boolean",
    "required": false,
    "default": true
  },
  {
    "name": "height",
    "typeText": "string",
    "required": false,
    "default": ""
  },
  {
    "name": "aspectRatio",
    "typeText": "string",
    "required": false,
    "default": "16 / 9"
  },
  {
    "name": "tracks",
    "typeText": "array",
    "required": false
  },
  {
    "name": "ariaLabel",
    "typeText": "string",
    "required": false,
    "default": ""
  }
]
```

### events

```json
[
  {
    "name": "play",
    "typeText": "{}",
    "description": "Playback started."
  },
  {
    "name": "pause",
    "typeText": "{}",
    "description": "Playback paused."
  },
  {
    "name": "ended",
    "typeText": "{}",
    "description": "Playback reached the end."
  },
  {
    "name": "timeupdate",
    "typeText": "{ currentTime: number; duration: number }",
    "description": "Playhead position and duration, in seconds."
  },
  {
    "name": "loadedmetadata",
    "typeText": "{ duration: number }",
    "description": "The duration is known (once per source)."
  },
  {
    "name": "error",
    "typeText": "{ error: unknown }",
    "description": "The host media failed (host error detail)."
  },
  {
    "name": "ratechange",
    "typeText": "{ rate: number }",
    "description": "The speed button changed the rate."
  },
  {
    "name": "volumechange",
    "typeText": "{ volume: number; muted: boolean }",
    "description": "Mute button or audio volume bar (video volume stays 1)."
  },
  {
    "name": "trackchange",
    "typeText": "{ index: number; track: { src: string; srclang?: string; label: string; kind?: string; default?: boolean } | null }",
    "description": "The user chose captions in the CC row (index -1 and track null: Off)."
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

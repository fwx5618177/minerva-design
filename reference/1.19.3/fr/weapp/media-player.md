# MediaPlayer

Un lecteur audio ou vidéo aux commandes personnalisées et thématisées : lecture / pause, sauts, barre de progression avec la plage mise en mémoire tampon, durée, volume, vitesse de lecture et plein écran, utilisable au clavier.

Package: minerva-design@1.19.3

Renderer: weapp

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "19932861fda2d088219d708a8ca132bea760a32b",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:ed8b6b1bf30e9055934099f84afd6b8369eee155b0404de5e8db004c3d91bce6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

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

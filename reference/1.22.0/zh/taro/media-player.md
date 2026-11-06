# MediaPlayer 媒体播放器

带主题化自定义控件的音频 / 视频播放器：播放 / 暂停、快进快退、显示缓冲范围的进度条、时间、音量、播放速度与全屏，并支持键盘操作。

Package: minerva-design@1.22.0

Renderer: taro

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.0",
  "sourceCommit": "e2a31507ecfcdb5ffcd33b05b47404c7625bb883",
  "sourceDigest": "sha256:a33fb5e0b8f01ae452ce95d2b723ab0cd9905636d574c72fd12c1459f4c09d3a",
  "referenceSourceDigest": "sha256:2459da5f08881aec3d2ac2d940ce35e7a61d0e0e679c0c167d8b5fdf8330a456"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.0/types.json) or getType() from minerva-design/contracts.

## Documentation

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

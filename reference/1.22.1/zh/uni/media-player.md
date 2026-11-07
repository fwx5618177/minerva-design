# MediaPlayer 媒体播放器

带主题化自定义控件的音频 / 视频播放器：播放 / 暂停、快进快退、显示缓冲范围的进度条、时间、音量、播放速度与全屏，并支持键盘操作。

Package: minerva-design@1.22.1

Renderer: uni

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.1",
  "sourceCommit": "3b95c464583d2e1bcf02999361aa6cf5481d519b",
  "sourceDigest": "sha256:080b482abbb8d2745bf31d68a17d7a1299cbb89f0e3f8c1a4d1d91bdeb04d1be",
  "referenceSourceDigest": "sha256:22ecb97acf4fac039a6d9a7e4a78b6bedc12dbbb8c1a14e3feeef3bcd47a7cef"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.1/types.json) or getType() from minerva-design/contracts.

## Documentation

## MediaControls

Support: n/a

React Native-specific extension, outside the shared web component API; use minerva-design/native for this component.

## MediaPlayer

Support: beta

Video through the uni <video> component (controls off, driven by uni.createVideoContext: play/pause/seek/playbackRate/requestFullScreen) and audio through uni.createInnerAudioContext, under a themed control bar: play/pause, skip back/forward (skipSeconds), touch seek bar with the buffered range and aria-valuetext, m:ss / h:mm:ss time, mute, audio volume bar, playback-rate cycle button, video fullscreen, loading spinner and translated error state; startTime (video initial-time, audio startTime), autoPlay, loop, muted/defaultMuted, title, poster, height/aspectRatio; timeUpdate/ended/play/pause/loadedMetadata/error/rateChange/volumeChange events and an exposed play/pause/seek/context. controls=false shows the host video's own controls. Captions: tracks (WebVTT or SRT, data: URLs inline) fetched with uni.request, parsed by the shared minerva-design/core parser and drawn as an overlay synchronized with the time updates, a CC button with an Off / per-track choice row, the choice remembered in storage (default track otherwise) and a trackChange event. Beta: needs device validation (media behavior differs per host). The host video has no volume API (mute only, no volume bar); no picture-in-picture and no keyboard shortcuts; icons are text glyphs (no inline SVG on mini programs). Captions follow the host time updates (about 4 per second), are not shown in the host's native fullscreen, ignore cue positioning / styling, and remote caption files need the app's request domain allowlist. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
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
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "type",
    "typeText": "\"audio\" | \"video\" | undefined",
    "required": false
  },
  {
    "name": "mimeType",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "poster",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "title",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "autoPlay",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "loop",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "muted",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "defaultMuted",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "startTime",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "playbackRates",
    "typeText": "readonly number[] | undefined",
    "required": false
  },
  {
    "name": "skipSeconds",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "controls",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "required": false
  },
  {
    "name": "aspectRatio",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "tracks",
    "typeText": "readonly MediaTrack[] | undefined",
    "required": false
  },
  {
    "name": "ariaLabel",
    "typeText": "string | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "error",
    "typeText": "[error: unknown]",
    "parameters": [
      {
        "name": "error",
        "position": 0,
        "typeText": "unknown",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "ended",
    "typeText": "[]",
    "parameters": []
  },
  {
    "name": "timeUpdate",
    "typeText": "[detail: { currentTime: number; duration: number; }]",
    "parameters": [
      {
        "name": "detail",
        "position": 0,
        "typeText": "{ currentTime: number; duration: number; }",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "play",
    "typeText": "[]",
    "parameters": []
  },
  {
    "name": "pause",
    "typeText": "[]",
    "parameters": []
  },
  {
    "name": "loadedMetadata",
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
    "typeText": "[detail: { volume: number; muted: boolean; }]",
    "parameters": [
      {
        "name": "detail",
        "position": 0,
        "typeText": "{ volume: number; muted: boolean; }",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "trackChange",
    "typeText": "[detail: { index: number; track: MediaTrack | null; }]",
    "parameters": [
      {
        "name": "detail",
        "position": 0,
        "typeText": "{ index: number; track: MediaTrack | null; }",
        "required": true,
        "rest": false
      }
    ]
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

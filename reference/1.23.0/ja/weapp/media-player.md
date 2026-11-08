# MediaPlayer メディアプレーヤー

音声・動画、字幕、キーボード操作に対応するメディアプレーヤー。React 専用エントリでは HLS/DASH/FLV、画質選択、プレイリスト、A–B リピート、波形、スクリーンショット、録画も利用できます。

Package: minerva-design@1.23.0

Renderer: weapp

Locale: ja

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

プレーヤーパッケージ

完全な React プレーヤーは専用エントリから利用します。従来の minerva-design MediaPlayer は既存の props とイベント形式を維持し、同じ再生実装を使用します。

ストリーミングはブラウザーのコーデック、CORS、自動再生、安全なコンテキストの制約を受けます。以下の高度な例は React DOM 向けです。他のフレームワークやネイティブのタブは各 API を参照してください。React Native とミニプログラムは対応するメディアホストが必要です。

例はローカル配信の短い FFmpeg テストパターンと合成音を使用し、外部サービスに依存しません。スクリーンショットと録画は利用可能な環境だけに表示され、録画終了時にファイルをダウンロードします。

高度な React API

##### ソースとエンジン

src は URL または type、mimeType、qualities、defaultQuality を含む PlayerSource を受け取ります。HLS/DASH の自動画質に対応し、createHlsEngine / createDashEngine / createFlvEngine と engines で構成できます。ライブラリは必要時に読み込みます。

##### プレイリストと音声

playlist は src / title / poster を持つ項目です。defaultPlaylistIndex と onPlaylistIndexChange で現在の項目を扱います。waveform は auto、decorative、ピーク配列に対応し、A–B リピートと Media Session も利用できます。

##### コントロールと操作

controls=false は操作部のないメディアを表示します。オブジェクトでは play、progress、volume、quality、speed、captions、skip、abRepeat、playlist、screenshot、record、pip、fullscreen を設定します。actions と renderTooltip でホストに統合できます。

##### イベントとエラー

専用エントリは onTimeUpdate(currentTime, duration)、onMetadata({ width, height, duration })、onQualityChange(id)、onError(PlayerError) を使います。minerva-design のルートは従来のオブジェクト形式の時刻イベントと MediaError を維持します。

##### 命令型ハンドル

ref は play / pause / seek、element / video、setPlaybackRate、setQuality、next / previous、setAbRepeat / clearAbRepeat、screenshot、startRecording / stopRecording、toggleFullscreen を公開します。play の Promise で再生拒否を処理できます。

##### 外観と機能の境界

locale は英中日仏、messages は操作文言、theme はライト / ダークを設定します。CSS は一度読み込みます。PiP、録画、キャプチャー、音量、全画面はホスト次第です。クロスオリジンのキャプチャーには CORS が必要で、DRM ライセンスは設定されません。

合成テストパターン

440 Hz テスト音

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

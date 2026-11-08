# MediaPlayer メディアプレーヤー

音声・動画、字幕、キーボード操作に対応するメディアプレーヤー。React 専用エントリでは HLS/DASH/FLV、画質選択、プレイリスト、A–B リピート、波形、スクリーンショット、録画も利用できます。

Package: minerva-design@1.23.0

Renderer: react

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

Mobile component of minerva-design/native (React Native); on the web use the responsive web components.

## MediaPlayer

Support: stable

### Import

```json
{
  "specifier": "minerva-design",
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
    "source": "packages/react/src/components/MediaPlayer/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "URL of the media"
  },
  {
    "name": "type",
    "source": "packages/react/src/components/MediaPlayer/types.ts",
    "kind": "enum",
    "values": [
      "audio",
      "video"
    ],
    "typeText": "MediaPlayerType | undefined",
    "typeRef": "type:f6ba35e7f4fc2138f1bc",
    "required": false,
    "description": "Kind of media"
  },
  {
    "name": "mimeType",
    "source": "packages/react/src/components/MediaPlayer/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "MIME type of the media (\"audio/mpeg\", \"video/mp4\"...), used to infer type"
  },
  {
    "name": "poster",
    "source": "packages/react/src/components/MediaPlayer/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Image shown before a video plays"
  },
  {
    "name": "title",
    "source": "packages/react/src/components/MediaPlayer/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Title of the media, shown in the audio bar / over the video"
  },
  {
    "name": "autoPlay",
    "source": "packages/react/src/components/MediaPlayer/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Starts playing as soon as possible (browsers only allow muted autoplay without a user gesture)"
  },
  {
    "name": "loop",
    "source": "packages/react/src/components/MediaPlayer/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Restarts at the end"
  },
  {
    "name": "muted",
    "source": "packages/react/src/components/MediaPlayer/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Mutes the media; applied whenever it changes (the mute button still toggles the sound)"
  },
  {
    "name": "defaultMuted",
    "source": "packages/react/src/components/MediaPlayer/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Initially muted (uncontrolled)"
  },
  {
    "name": "preload",
    "source": "packages/react/src/components/MediaPlayer/types.ts",
    "kind": "enum",
    "values": [
      "auto",
      "metadata",
      "none"
    ],
    "typeText": "MediaPlayerPreload | undefined",
    "typeRef": "type:2b3616ced74efefdcf03",
    "default": "metadata",
    "required": false,
    "description": "How much of the media the browser loads before playback"
  },
  {
    "name": "crossOrigin",
    "source": "packages/react/src/components/MediaPlayer/types.ts",
    "kind": "enum",
    "values": [
      "anonymous",
      "use-credentials"
    ],
    "typeText": "MediaPlayerCrossOrigin | undefined",
    "typeRef": "type:89d1344df7bbd16bd518",
    "required": false,
    "description": "CORS mode of the media request (cross-origin caption files need it too, plus CORS headers on their server)"
  },
  {
    "name": "startTime",
    "source": "packages/react/src/components/MediaPlayer/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Resume position in seconds, applied once when the metadata loads (and again when src changes)"
  },
  {
    "name": "playbackRates",
    "source": "packages/react/src/components/MediaPlayer/types.ts",
    "kind": "array",
    "typeText": "readonly number[] | undefined",
    "typeRef": "type:9b11f9b3b1a7e709603e",
    "required": false,
    "description": "Speeds the speed button cycles through"
  },
  {
    "name": "skipSeconds",
    "source": "packages/react/src/components/MediaPlayer/types.ts",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 10,
    "required": false,
    "description": "Step of the skip back / forward buttons, in seconds (0 hides them)"
  },
  {
    "name": "controls",
    "source": "packages/react/src/components/MediaPlayer/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": true,
    "required": false,
    "description": "Shows the custom control bar; false renders the bare media element (drive it through the ref)"
  },
  {
    "name": "height",
    "source": "packages/react/src/components/MediaPlayer/types.ts",
    "kind": "union",
    "typeText": "string | number | undefined",
    "typeRef": "type:cce9a6f3bb64fbe6fa35",
    "required": false,
    "description": "Height of a video player (number: pixels); overrides aspectRatio"
  },
  {
    "name": "aspectRatio",
    "source": "packages/react/src/components/MediaPlayer/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "default": "16 / 9",
    "required": false,
    "description": "Aspect ratio of a video player (CSS aspect-ratio)"
  },
  {
    "name": "pictureInPicture",
    "source": "packages/react/src/components/MediaPlayer/types.ts",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows a picture-in-picture button (video, where the browser supports it)"
  },
  {
    "name": "tracks",
    "source": "packages/react/src/components/MediaPlayer/types.ts",
    "kind": "array",
    "typeText": "readonly MediaPlayerTrack[] | undefined",
    "typeRef": "type:2157952074ff2eef08ea",
    "required": false,
    "description": "Captions / subtitles (WebVTT or SRT files): rendered as <track> children and drawn by the player over the video (below the title for audio), with a captions menu in the control bar. The choice is remembered (localStorage); a `default` track shows until the user chooses"
  },
  {
    "name": "aria-label",
    "source": "packages/react/src/components/MediaPlayer/types.ts",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Accessible label of the player"
  }
]
```

### events

```json
[
  {
    "name": "onTimeUpdate",
    "source": "packages/react/src/components/MediaPlayer/types.ts",
    "kind": "function",
    "typeText": "((detail: MediaPlayerTimeDetail) => void) | undefined",
    "typeRef": "type:72230a168aa8b7c53597",
    "parameters": [
      {
        "name": "detail",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "MediaPlayerTimeDetail",
        "typeRef": "type:3fdbd8b05bedfd1a014c"
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
    "source": "packages/react/src/components/MediaPlayer/types.ts",
    "kind": "function",
    "typeText": "(() => void) | undefined",
    "typeRef": "type:90e999312bfc59e0ecc2",
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
    "source": "packages/react/src/components/MediaPlayer/types.ts",
    "kind": "function",
    "typeText": "(() => void) | undefined",
    "typeRef": "type:1b835030ebbebaeb53a0",
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
    "source": "packages/react/src/components/MediaPlayer/types.ts",
    "kind": "function",
    "typeText": "(() => void) | undefined",
    "typeRef": "type:e96c09abf7a082646368",
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
    "source": "packages/react/src/components/MediaPlayer/types.ts",
    "kind": "function",
    "typeText": "((detail: { duration: number; }) => void) | undefined",
    "typeRef": "type:d85ad4e13418b0b1b55f",
    "parameters": [
      {
        "name": "detail",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "{ duration: number; }",
        "typeRef": "type:8bb42bc2cfee1c0f3e40"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called with the duration once the metadata is loaded"
  },
  {
    "name": "onError",
    "source": "packages/react/src/components/MediaPlayer/types.ts",
    "kind": "function",
    "typeText": "((error: MediaError | null) => void) | undefined",
    "typeRef": "type:a55c16db32ddf6b3f29a",
    "parameters": [
      {
        "name": "error",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "MediaError | null",
        "typeRef": "type:51209ef9d6ffb1f06cd8"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the media can't be loaded or played"
  },
  {
    "name": "onRateChange",
    "source": "packages/react/src/components/MediaPlayer/types.ts",
    "kind": "function",
    "typeText": "((rate: number) => void) | undefined",
    "typeRef": "type:88f616b14eeb7e49eb03",
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
    "source": "packages/react/src/components/MediaPlayer/types.ts",
    "kind": "function",
    "typeText": "((detail: MediaPlayerVolumeDetail) => void) | undefined",
    "typeRef": "type:14a50f8b9e921be1c229",
    "parameters": [
      {
        "name": "detail",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "MediaPlayerVolumeDetail",
        "typeRef": "type:8c1fce71b2fdaf5f301f"
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
    "source": "packages/react/src/components/MediaPlayer/types.ts",
    "kind": "function",
    "typeText": "((detail: MediaPlayerTrackChangeDetail) => void) | undefined",
    "typeRef": "type:a9dc6459a26ca422267d",
    "parameters": [
      {
        "name": "detail",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "MediaPlayerTrackChangeDetail",
        "typeRef": "type:7d549786e160b77a2284"
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

## API

```json
{
  "MediaPlayerProps": {
    "source": "react/src/components/MediaPlayer/types.ts",
    "description": "Props of the MediaPlayer component: an <audio> / <video> element with themed custom controls (play / pause, skip, seek bar with the buffered range, time, volume, playback speed, fullscreen and picture-in-picture)",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "src",
        "type": "string",
        "required": false,
        "description": "URL of the media"
      },
      {
        "name": "type",
        "type": "MediaPlayerType",
        "required": false,
        "default": "inferred from mimeType, else from the file extension of src, else \"video\"",
        "description": "Kind of media"
      },
      {
        "name": "mimeType",
        "type": "string",
        "required": false,
        "description": "MIME type of the media (\"audio/mpeg\", \"video/mp4\"...), used to infer type"
      },
      {
        "name": "poster",
        "type": "string",
        "required": false,
        "description": "Image shown before a video plays"
      },
      {
        "name": "title",
        "type": "string",
        "required": false,
        "description": "Title of the media, shown in the audio bar / over the video"
      },
      {
        "name": "autoPlay",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Starts playing as soon as possible (browsers only allow muted autoplay without a user gesture)"
      },
      {
        "name": "loop",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Restarts at the end"
      },
      {
        "name": "muted",
        "type": "boolean",
        "required": false,
        "description": "Mutes the media; applied whenever it changes (the mute button still toggles the sound)"
      },
      {
        "name": "defaultMuted",
        "type": "boolean",
        "required": false,
        "description": "Initially muted (uncontrolled)"
      },
      {
        "name": "preload",
        "type": "MediaPlayerPreload",
        "required": false,
        "default": "\"metadata\"",
        "description": "How much of the media the browser loads before playback"
      },
      {
        "name": "crossOrigin",
        "type": "MediaPlayerCrossOrigin",
        "required": false,
        "description": "CORS mode of the media request (cross-origin caption files need it too, plus CORS headers on their server)"
      },
      {
        "name": "startTime",
        "type": "number",
        "required": false,
        "description": "Resume position in seconds, applied once when the metadata loads (and again when src changes)"
      },
      {
        "name": "playbackRates",
        "type": "readonly number[]",
        "required": false,
        "default": "[0.5, 0.75, 1, 1.25, 1.5, 2]",
        "description": "Speeds the speed button cycles through"
      },
      {
        "name": "skipSeconds",
        "type": "number",
        "required": false,
        "default": "10",
        "description": "Step of the skip back / forward buttons, in seconds (0 hides them)"
      },
      {
        "name": "controls",
        "type": "boolean",
        "required": false,
        "default": "true",
        "description": "Shows the custom control bar; false renders the bare media element (drive it through the ref)"
      },
      {
        "name": "height",
        "type": "number | string",
        "required": false,
        "description": "Height of a video player (number: pixels); overrides aspectRatio"
      },
      {
        "name": "aspectRatio",
        "type": "string",
        "required": false,
        "default": "\"16 / 9\"",
        "description": "Aspect ratio of a video player (CSS aspect-ratio)"
      },
      {
        "name": "pictureInPicture",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Shows a picture-in-picture button (video, where the browser supports it)"
      },
      {
        "name": "tracks",
        "type": "readonly MediaPlayerTrack[]",
        "required": false,
        "default": "[]",
        "description": "Captions / subtitles (WebVTT or SRT files): rendered as <track> children and drawn by the player over the video (below the title for audio), with a captions menu in the control bar. The choice is remembered (localStorage); a `default` track shows until the user chooses"
      },
      {
        "name": "onTimeUpdate",
        "type": "(detail: MediaPlayerTimeDetail) => void",
        "required": false,
        "description": "Called while playing with the playhead position and the duration"
      },
      {
        "name": "onEnded",
        "type": "() => void",
        "required": false,
        "description": "Called when playback reaches the end"
      },
      {
        "name": "onPlay",
        "type": "() => void",
        "required": false,
        "description": "Called when playback starts"
      },
      {
        "name": "onPause",
        "type": "() => void",
        "required": false,
        "description": "Called when playback pauses"
      },
      {
        "name": "onLoadedMetadata",
        "type": "(detail: { duration: number }) => void",
        "required": false,
        "description": "Called with the duration once the metadata is loaded"
      },
      {
        "name": "onError",
        "type": "(error: MediaError | null) => void",
        "required": false,
        "description": "Called when the media can't be loaded or played"
      },
      {
        "name": "onRateChange",
        "type": "(rate: number) => void",
        "required": false,
        "description": "Called with the new playback speed"
      },
      {
        "name": "onVolumeChange",
        "type": "(detail: MediaPlayerVolumeDetail) => void",
        "required": false,
        "description": "Called when the volume or the muted state changes"
      },
      {
        "name": "onTrackChange",
        "type": "(detail: MediaPlayerTrackChangeDetail) => void",
        "required": false,
        "description": "Called when the user chooses captions (index -1 and track null: Off)"
      },
      {
        "name": "aria-label",
        "type": "string",
        "required": false,
        "default": "title, else \"Media player\" (translated)",
        "description": "Accessible label of the player"
      },
      {
        "name": "className",
        "type": "string",
        "required": false,
        "description": "Additional class name"
      },
      {
        "name": "style",
        "type": "CSSProperties",
        "required": false,
        "description": "Inline styles of the root element"
      },
      {
        "name": "ref",
        "type": "Ref<MediaPlayerHandle>",
        "required": false,
        "description": "Imperative handle: play(), pause(), seek(seconds), element"
      }
    ]
  },
  "MediaPlayerHandle": {
    "source": "react/src/components/MediaPlayer/types.ts",
    "description": "Imperative handle of a MediaPlayer (its `ref`)",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "play",
        "type": "() => Promise<void>",
        "required": true,
        "description": "Starts playback (the promise of `HTMLMediaElement.play()`)"
      },
      {
        "name": "pause",
        "type": "() => void",
        "required": true,
        "description": "Pauses playback"
      },
      {
        "name": "seek",
        "type": "(seconds: number) => void",
        "required": true,
        "description": "Moves the playhead to `seconds` (clamped to the duration)"
      },
      {
        "name": "element",
        "type": "HTMLMediaElement | null",
        "required": true,
        "description": "The rendered <audio> / <video> element (null before mount)"
      }
    ]
  },
  "MediaPlayerTrack": {
    "source": "react/src/components/MediaPlayer/types.ts",
    "description": "A captions / subtitles file of a MediaPlayer",
    "kind": "interface",
    "extends": [],
    "props": [
      {
        "name": "src",
        "type": "string",
        "required": true,
        "description": "URL of the WebVTT (.vtt) or SubRip (.srt) file; data: URLs work"
      },
      {
        "name": "srclang",
        "type": "string",
        "required": false,
        "description": "Language of the track (BCP 47: \"en\", \"fr-CA\")"
      },
      {
        "name": "label",
        "type": "string",
        "required": true,
        "description": "Name shown in the captions menu"
      },
      {
        "name": "kind",
        "type": "\"subtitles\" | \"captions\"",
        "required": false,
        "default": "\"subtitles\"",
        "description": "Kind of text track"
      },
      {
        "name": "default",
        "type": "boolean",
        "required": false,
        "description": "Shown when the user has not chosen captions yet"
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

## Example: 音声波形と A–B リピート

ローカル音声の実際の波形、シーク、速度変更、区間リピート。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/media-player/demos/audio-waveform.tsx

```tsx
import "minerva-design/media-player/style.css";
import { MediaPlayer } from "minerva-design/media-player";
import { useTheme } from "minerva-design";
import { useTranslation } from "react-i18next";
const base = `${import.meta.env.BASE_URL}media-player/`;
export default function Demo() {
  const { t, i18n } = useTranslation();
  const { resolvedTheme } = useTheme();
  return (
    <div style={{ width: "100%", maxWidth: 640 }}>
      <MediaPlayer
        kind="audio"
        src={`${base}sample.m4a`}
        title={t("docs.media-player.data.tone")}
        locale={i18n.language}
        theme={resolvedTheme}
        waveform="auto"
        showLoopToggle
        controls={{ skip: true, abRepeat: true }}
      />
    </div>
  );
}

```

## Example: 音声

MIME または URL から種類を判定します。音声はカバーと波形を表示し、再生コントロールを共有します。skipSeconds={0} はスキップボタンを非表示にします。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/media-player/demos/audio.tsx

```tsx
import { MediaPlayer } from "minerva-design";

// CC0 sample from MDN's interactive examples
const ROAR =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3";

export default function AudioDemo() {
  return (
    <div style={{ maxWidth: 480 }}>
      <MediaPlayer src={ROAR} title="T-Rex roar" skipSeconds={0} />
    </div>
  );
}

```

## Example: 字幕

tracks は WebVTT/SRT（src、srclang、label、kind、default）を受け取ります。字幕は安全なテキストとして動画上または音声の下に表示されます。設定 → 字幕、または C キーで切り替え、言語を記憶し onTrackChange で通知します。クロスオリジンには CORS が必要で、use-credentials は認証情報を送信します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/media-player/demos/captions.tsx

```tsx
import { useState } from "react";
import { MediaPlayer, type MediaPlayerTrack } from "minerva-design";

// CC0 sample from MDN's interactive examples
const FLOWER =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

// Caption files are usually served next to the video (cross-origin ones need
// crossOrigin="anonymous" on the player and CORS headers on their server).
// Inline data: URLs keep this demo self-contained.
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
    kind: "subtitles",
    default: true,
  },
  {
    src: `data:application/x-subrip;charset=utf-8,${encodeURIComponent(FRENCH_SRT)}`,
    srclang: "fr",
    label: "Français",
  },
];

export default function CaptionsDemo() {
  const [choice, setChoice] = useState<string | null>(null);
  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 560 }}>
      <MediaPlayer
        src={FLOWER}
        title="Flower"
        tracks={tracks}
        onTrackChange={({ track }) => setChoice(track?.label ?? "Off")}
      />
      <MediaPlayer
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3"
        title="Audio with the same captions"
        skipSeconds={0}
        tracks={tracks}
      />
      <output aria-live="polite">
        {choice ? `Captions: ${choice}` : "Captions: default track"}
      </output>
    </div>
  );
}

```

## Example: スクリーンショットと録画

内蔵アイコンまたは S / R キーを使います。この例の録画は最大 15 秒です。Canvas キャプチャーと MediaRecorder が必要で、クロスオリジン素材は Canvas からの読み取りを許可する必要があります。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/media-player/demos/capture.tsx

```tsx
import "minerva-design/media-player/style.css";
import { useTranslation } from "react-i18next";
import { useTheme } from "minerva-design";
import { MediaPlayer } from "minerva-design/media-player";

export default function CaptureDemo() {
  const { t, i18n } = useTranslation();
  const { resolvedTheme } = useTheme();
  return (
    <div style={{ maxWidth: 640 }}>
      <MediaPlayer
        src={`${import.meta.env.BASE_URL}media-player/sample.mp4`}
        title={t("docs.media-player.data.pattern")}
        locale={i18n.language}
        theme={resolvedTheme}
        controls={{ screenshot: true, record: true }}
        maxRecordingSeconds={15}
      />
    </div>
  );
}

```

## Example: コンパクトなミュートプレビュー

ミュートで開始するループプレビュー。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/media-player/demos/compact.tsx

```tsx
import "minerva-design/media-player/style.css";
import { MediaPlayer } from "minerva-design/media-player";
import { useTheme } from "minerva-design";
import { useTranslation } from "react-i18next";
const base = `${import.meta.env.BASE_URL}media-player/`;
export default function Demo() {
  const { t, i18n } = useTranslation();
  const { resolvedTheme } = useTheme();
  return (
    <div style={{ width: "100%", maxWidth: 640 }}>
      <MediaPlayer
        src={`${base}sample.mp4`}
        title={t("docs.media-player.demos.compact.title")}
        locale={i18n.language}
        theme={resolvedTheme}
        variant="compact"
        autoPlay
        defaultLoop
        maxWidth={360}
      />
    </div>
  );
}

```

## Example: PC と同じ完全なプレーヤー

PC クライアントと同じ表示です。PC 側ではツールチップと保存のみを適応します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/media-player/demos/desktop.tsx

```tsx
import "minerva-design/media-player/style.css";
import { MediaPlayer } from "minerva-design/media-player";
import { useTheme } from "minerva-design";
import { useTranslation } from "react-i18next";
const base = `${import.meta.env.BASE_URL}media-player/`;
export default function Demo() {
  const { t, i18n } = useTranslation();
  const { resolvedTheme } = useTheme();
  return (
    <div style={{ width: "100%", maxWidth: 640 }}>
      <MediaPlayer
        src={`${base}sample.mp4`}
        title={t("docs.media-player.demos.desktop.title")}
        locale={i18n.language}
        theme={resolvedTheme}
        showTitle
        showLoopToggle
        controls={{
          skip: true,
          abRepeat: true,
          screenshot: true,
          record: true,
        }}
      />
    </div>
  );
}

```

## Example: プレイリストと A–B リピート

動画と音声は同じプレーヤーを共有します。前・次の項目、終了時の自動切り替え、音声波形、A–B 区間リピートを備えます。専用エントリの時刻コールバックは (currentTime, duration) を受け取ります。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/media-player/demos/playlist.tsx

```tsx
import "minerva-design/media-player/style.css";
import { useTranslation } from "react-i18next";
import { useTheme } from "minerva-design";
import { MediaPlayer } from "minerva-design/media-player";

const base = `${import.meta.env.BASE_URL}media-player/`;
export default function PlaylistDemo() {
  const { t, i18n } = useTranslation();
  const { resolvedTheme } = useTheme();
  return (
    <div style={{ maxWidth: 640 }}>
      <MediaPlayer
        title={t("docs.media-player.demos.playlist.title")}
        locale={i18n.language}
        theme={resolvedTheme}
        playlist={[
          {
            src: `${base}sample.mp4`,
            title: t("docs.media-player.data.pattern"),
          },
          { src: `${base}sample.m4a`, title: t("docs.media-player.data.tone") },
        ]}
        controls={{ skip: true, abRepeat: true }}
      />
    </div>
  );
}

```

## Example: 画質選択

設定 → 画質で 144p と 72p を選択します。異なる解像度のファイルを使い、再生位置と再生状態を維持します。HLS/DASH の自動画質にも対応します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/media-player/demos/quality.tsx

```tsx
import "minerva-design/media-player/style.css";
import { useTranslation } from "react-i18next";
import { useTheme } from "minerva-design";
import { MediaPlayer, type PlayerSource } from "minerva-design/media-player";

const base = `${import.meta.env.BASE_URL}media-player/`;
const source: PlayerSource = {
  src: `${base}sample.mp4`,
  type: "mp4",
  defaultQuality: "144p",
  qualities: [
    { id: "144p", label: "144p", height: 144, src: `${base}sample.mp4` },
    { id: "72p", label: "72p", height: 72, src: `${base}sample-small.mp4` },
  ],
};
export default function QualityDemo() {
  const { t, i18n } = useTranslation();
  const { resolvedTheme } = useTheme();
  return (
    <div style={{ maxWidth: 640 }}>
      <MediaPlayer
        src={source}
        title={t("docs.media-player.data.pattern")}
        locale={i18n.language}
        theme={resolvedTheme}
      />
    </div>
  );
}

```

## Example: 再生速度とスキップ幅

playbackRates は設定 → 再生速度を構成し、onRateChange は変更を通知します。skipSeconds はスキップ量、aspectRatio または height は動画サイズを設定します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/media-player/demos/rates-skip.tsx

```tsx
import { useState } from "react";
import { MediaPlayer } from "minerva-design";

const FLOWER =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

export default function RatesSkipDemo() {
  const [rate, setRate] = useState(1);

  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 560 }}>
      <MediaPlayer
        src={FLOWER}
        playbackRates={[1, 1.5, 2]}
        skipSeconds={3}
        aspectRatio="4 / 3"
        onRateChange={setRate}
        aria-label="Flower, speed and skip"
      />
      <output>Speed: {rate}×</output>
    </div>
  );
}

```

## Example: エラーと再生の復旧

存在しないメディアから有効なソースに切り替えます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/media-player/demos/recovery.tsx

```tsx
import "minerva-design/media-player/style.css";
import { MediaPlayer } from "minerva-design/media-player";
import { useTheme } from "minerva-design";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Button } from "minerva-design";
export default function RecoveryDemo() {
  const { t, i18n } = useTranslation();
  const { resolvedTheme } = useTheme();
  const [valid, setValid] = useState(true);
  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 640 }}>
      <Button onClick={() => setValid(!valid)}>
        {t(`docs.media-player.demos.recovery.${valid ? "break" : "restore"}`)}
      </Button>
      <MediaPlayer
        src={`${import.meta.env.BASE_URL}media-player/${valid ? "sample.mp4" : "missing.mp4"}`}
        title={t("docs.media-player.demos.recovery.title")}
        locale={i18n.language}
        theme={resolvedTheme}
      />
    </div>
  );
}

```

## Example: 再開と進捗

startTime はメタデータの読み込み後に一度だけ適用されます（学習者が止めた位置から再開）。onTimeUpdate / onLoadedMetadata / onPause / onEnded で進捗を通知し、ref は play()、pause()、seek(seconds) とメディア要素を公開します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react

Documentation context imports: none

### apps/docs/src/docs/pages/media-player/demos/resume.tsx

```tsx
import { useRef, useState } from "react";
import { Button, MediaPlayer, type MediaPlayerHandle } from "minerva-design";

const FLOWER =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

export default function ResumeDemo() {
  const player = useRef<MediaPlayerHandle>(null);
  // e.g. the position saved by the last session
  const [saved, setSaved] = useState(2);
  const [progress, setProgress] = useState("Not started");

  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 560 }}>
      <MediaPlayer
        ref={player}
        src={FLOWER}
        startTime={saved}
        onLoadedMetadata={({ duration }) =>
          setProgress(`Resumed at ${saved}s of ${duration.toFixed(1)}s`)
        }
        onTimeUpdate={({ currentTime, duration }) =>
          setProgress(
            `${Math.round((currentTime / duration) * 100)}% watched (${currentTime.toFixed(1)}s)`,
          )
        }
        onPause={() =>
          setSaved(Math.floor(player.current?.element?.currentTime ?? 0))
        }
        onEnded={() => setProgress("Finished")}
      />
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <Button size="small" onClick={() => player.current?.play()}>
          Play
        </Button>
        <Button
          size="small"
          variant="outline"
          onClick={() => player.current?.seek(0)}
        >
          Restart
        </Button>
      </div>
      <output aria-live="polite">
        {progress} · saved position: {saved}s
      </output>
    </div>
  );
}

```

## Example: ストリーミングエンジン

ローカルの実際の HLS、DASH、FLV サンプルを切り替えます。選択したアダプターを必要時に読み込み、対応環境ではネイティブ再生や HLS も利用できます。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/media-player/demos/streams.tsx

```tsx
import "minerva-design/media-player/style.css";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, useTheme } from "minerva-design";
import { MediaPlayer } from "minerva-design/media-player";

const base = `${import.meta.env.BASE_URL}media-player/`;
const sources = {
  hls: { src: `${base}hls/index.m3u8`, type: "hls" as const },
  dash: { src: `${base}dash/index.mpd`, type: "dash" as const },
  flv: { src: `${base}sample.flv`, type: "flv" as const },
};

export default function StreamsDemo() {
  const [format, setFormat] = useState<keyof typeof sources>("hls");
  const { i18n } = useTranslation();
  const { resolvedTheme } = useTheme();
  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 640 }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {(Object.keys(sources) as (keyof typeof sources)[]).map((name) => (
          <Button
            key={name}
            size="small"
            variant="outline"
            active={format === name}
            onClick={() => setFormat(name)}
          >
            {name.toUpperCase()}
          </Button>
        ))}
      </div>
      <MediaPlayer
        title={format.toUpperCase()}
        src={sources[format]}
        locale={i18n.language}
        theme={resolvedTheme}
      />
    </div>
  );
}

```

## Example: 動画

<video> に半透明の暗いコントロールバーを重ね、再生中はフェードアウトします（タッチ画面、ホバー時、フォーカス時は表示されたまま）。プレーヤーにフォーカスして：Space / K で再生・一時停止、← / → で 5 秒シーク、↑ / ↓ で音量、M でミュート、F で全画面。pictureInPicture はブラウザが対応していればピクチャーインピクチャーボタンを追加します。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/media-player/demos/video.tsx

```tsx
import { MediaPlayer } from "minerva-design";

// CC0 sample from MDN's interactive examples
const FLOWER =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

export default function VideoDemo() {
  return (
    <div style={{ maxWidth: 560 }}>
      <MediaPlayer src={FLOWER} title="Flower" pictureInPicture />
    </div>
  );
}

```

# MediaPlayer 媒体播放器

支持音频 / 视频、字幕和键盘控制的媒体播放器。React 播放器入口还提供 HLS/DASH/FLV 引擎、清晰度、播放列表、A–B 循环、波形、截图和录制。

Package: minerva-design@1.23.1

Renderer: react

Locale: zh

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

播放器入口

完整 React 播放器通过独立入口使用。原 minerva-design 的 MediaPlayer 导出继续兼容原有属性和事件参数，两者共用同一套播放实现。

流媒体引擎受浏览器编码、CORS、自动播放及安全上下文能力限制。下方高级示例面向 React DOM；其他框架和原生标签页以各自 API 为准，React Native、小程序需要对应的媒体宿主。

示例使用本地托管的短 FFmpeg 测试图案与合成音，不依赖外部流服务。截图、录制按钮按能力显示；录制完成会下载文件。

高级 React API

##### 播放源与引擎

src 可传地址或 PlayerSource，包含 type、mimeType、qualities、defaultQuality。HLS/DASH 可提供自适应档位；createHlsEngine / createDashEngine / createFlvEngine 与 engines 用于配置或替换引擎，流媒体库按需加载。

##### 播放列表与音频

playlist 保存 src / title / poster 等条目；defaultPlaylistIndex 与 onPlaylistIndexChange 管理当前项。音视频共用引擎。waveform 支持 auto、decorative 或峰值数组，另有 A–B 循环与可选 Media Session。

##### 控件与自定义操作

controls=false 显示无控件媒体，或通过对象配置 play、progress、volume、quality、speed、captions、skip、abRepeat、playlist、screenshot、record、pip、fullscreen。actions 和 renderTooltip 可接入宿主操作与提示，不引入业务依赖。

##### 事件与错误

独立入口使用 onTimeUpdate(currentTime, duration)、onMetadata({ width, height, duration })、onQualityChange(id)、onError(PlayerError)。根入口 minerva-design 仍保留对象形式的时间事件和原生 MediaError 回调。

##### 命令式控制

ref 提供 play / pause / seek、element / video，以及 setPlaybackRate、setQuality、next / previous、setAbRepeat / clearAbRepeat、screenshot、startRecording / stopRecording、toggleFullscreen。play 返回 Promise，可由宿主处理浏览器拒绝播放。

##### 外观与能力边界

locale 支持中英日法，messages 覆盖控件文案，theme 选择浅色 / 深色；样式导入一次即可。画中画、录制、截图、音量、全屏取决于宿主能力，跨域捕获需正确的 CORS 头；内置引擎不配置 DRM 许可证。 在 flex 或 grid 布局中，需要为外层容器设置宽度；maxWidth 只限制最大尺寸，不会让容器自动填满可用空间。

合成测试图案

440 Hz 测试音

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

## Example: 音频波形与 A–B 循环

本地音频解码生成真实波形，支持点击跳转、变速及区间循环。

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
    <div style={{ width: "100%", minWidth: 0, maxWidth: 640 }}>
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

## Example: 音频

类型由 MIME 或地址推断；音频显示封面与波形，并复用同一套控制。skipSeconds={0} 隐藏快进快退按钮。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/media-player/demos/audio.tsx

```tsx
import { useTranslation } from "react-i18next";
import { MediaPlayer } from "minerva-design";

const AUDIO_SRC = `${import.meta.env.BASE_URL}media-player/sample.m4a`;

export default function AudioDemo() {
  const { t } = useTranslation();
  return (
    <div style={{ width: "100%", minWidth: 0, maxWidth: 480 }}>
      <MediaPlayer
        src={AUDIO_SRC}
        title={t("docs.media-player.data.tone")}
        skipSeconds={0}
      />
    </div>
  );
}

```

## Example: 字幕

tracks 接收 WebVTT 或 SRT（{ src, srclang, label, kind, default }；此处使用 data: URL）。播放器安全地自绘字幕，视频叠加显示，音频在下方显示。在“设置 → 字幕”选择，或按 C 开关；记住语言选择，onTrackChange 上报变化。跨域文件需返回 CORS 头，use-credentials 会携带凭据。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/media-player/demos/captions.tsx

```tsx
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { MediaPlayer, type MediaPlayerTrack } from "minerva-design";

const VIDEO_SRC = `${import.meta.env.BASE_URL}media-player/sample.mp4`;

// Caption files are usually served next to the video (cross-origin ones need
// crossOrigin="anonymous" on the player and CORS headers on their server).
// Inline data: URLs keep this demo self-contained.
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
  const { t } = useTranslation();
  const [choice, setChoice] = useState<string | null>(null);
  return (
    <div
      style={{
        display: "grid",
        gap: 12,
        width: "100%",
        minWidth: 0,
        maxWidth: 560,
      }}
    >
      <MediaPlayer
        src={VIDEO_SRC}
        title={t("docs.media-player.data.pattern")}
        tracks={tracks}
        onTrackChange={({ track }) => setChoice(track?.label ?? "Off")}
      />
      <MediaPlayer
        src={`${import.meta.env.BASE_URL}media-player/sample.m4a`}
        title={t("docs.media-player.data.tone")}
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

## Example: 截图与录制

使用内置截图、录制图标，或 S / R 快捷键。此处录制最多 15 秒。浏览器需支持 Canvas 捕获 / MediaRecorder；跨域素材需允许 Canvas 读取。

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
    <div style={{ width: "100%", minWidth: 0, maxWidth: 640 }}>
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

## Example: 紧凑静音预览

紧凑预览静音起播并循环；完整控制栏在完整视图中展示。

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
    <div style={{ width: "100%", minWidth: 0, maxWidth: 640 }}>
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

## Example: 桌面完整播放器 · PC 同款

与 PC 客户端使用同一个完整播放器；PC 仅额外适配提示浮层和保存文件。

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
    <div style={{ width: "100%", minWidth: 0, maxWidth: 640 }}>
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

## Example: 播放列表与 A–B 循环

视频与音频共用一个播放器。内置上一首 / 下一首及播完自动切换，音频显示波形；用 A–B 重复播放片段。独立入口的时间回调接收 (currentTime, duration)。

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
    <div style={{ width: "100%", minWidth: 0, maxWidth: 640 }}>
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

## Example: 清晰度切换

在“设置 → 清晰度”选择 144p 或 72p，实际使用两份不同分辨率的素材，并保留播放位置与播放状态。HLS/DASH 还可显示流中的自适应档位。

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
    <div style={{ width: "100%", minWidth: 0, maxWidth: 640 }}>
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

## Example: 播放速度与跳转步长

playbackRates 配置“设置 → 播放速度”，onRateChange 上报变化；skipSeconds 设置跳转步长，aspectRatio 或 height 设置视频尺寸。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/media-player/demos/rates-skip.tsx

```tsx
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { MediaPlayer } from "minerva-design";

const VIDEO_SRC = `${import.meta.env.BASE_URL}media-player/sample.mp4`;

export default function RatesSkipDemo() {
  const { t } = useTranslation();
  const [rate, setRate] = useState(1);

  return (
    <div
      style={{
        display: "grid",
        gap: 12,
        width: "100%",
        minWidth: 0,
        maxWidth: 560,
      }}
    >
      <MediaPlayer
        title={t("docs.media-player.data.pattern")}
        src={VIDEO_SRC}
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

## Example: 加载失败与换源恢复

使用不存在的资源查看错误与重试，再切换到有效资源恢复播放。

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
    <div
      style={{
        display: "grid",
        gap: 12,
        width: "100%",
        minWidth: 0,
        maxWidth: 640,
      }}
    >
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

## Example: 续播与进度

startTime 在元数据加载后应用一次（从学习者上次停止的位置继续）。onTimeUpdate / onLoadedMetadata / onPause / onEnded 上报进度；ref 提供 play()、pause()、seek(seconds) 和媒体元素。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/media-player/demos/resume.tsx

```tsx
import { useTranslation } from "react-i18next";
import { useRef, useState } from "react";
import { Button, MediaPlayer, type MediaPlayerHandle } from "minerva-design";

const VIDEO_SRC = `${import.meta.env.BASE_URL}media-player/sample.mp4`;

export default function ResumeDemo() {
  const { t } = useTranslation();
  const player = useRef<MediaPlayerHandle>(null);
  // e.g. the position saved by the last session
  const [saved, setSaved] = useState(2);
  const [progress, setProgress] = useState("Not started");

  return (
    <div
      style={{
        display: "grid",
        gap: 12,
        width: "100%",
        minWidth: 0,
        maxWidth: 560,
      }}
    >
      <MediaPlayer
        title={t("docs.media-player.data.pattern")}
        ref={player}
        src={VIDEO_SRC}
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

## Example: 流媒体引擎

切换真实的本地 HLS、DASH 和 FLV 样本。选中格式后按需加载对应引擎；浏览器支持时仍可使用原生文件播放与原生 HLS。

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
    <div
      style={{
        display: "grid",
        gap: 12,
        width: "100%",
        minWidth: 0,
        maxWidth: 640,
      }}
    >
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

## Example: 视频

<video> 上叠加深色半透明控制栏，播放时自动淡出（触屏设备、悬停和聚焦时保持可见）。聚焦播放器后：空格 / K 播放暂停，← / → 跳转 5 秒，↑ / ↓ 调节音量，M 静音，F 全屏。pictureInPicture 在浏览器支持时添加画中画按钮。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react-i18next

Documentation context imports: none

### apps/docs/src/docs/pages/media-player/demos/video.tsx

```tsx
import { useTranslation } from "react-i18next";
import { MediaPlayer } from "minerva-design";

const VIDEO_SRC = `${import.meta.env.BASE_URL}media-player/sample.mp4`;

export default function VideoDemo() {
  const { t } = useTranslation();
  return (
    <div style={{ width: "100%", minWidth: 0, maxWidth: 560 }}>
      <MediaPlayer
        src={VIDEO_SRC}
        title={t("docs.media-player.data.pattern")}
        pictureInPicture
      />
    </div>
  );
}

```

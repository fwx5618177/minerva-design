# MediaPlayer 媒体播放器

支持音频 / 视频、字幕和键盘控制的媒体播放器。React 播放器入口还提供 HLS/DASH/FLV 引擎、清晰度、播放列表、A–B 循环、波形、截图和录制。

Package: minerva-design@1.23.0

Renderer: weapp

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.0",
  "sourceCommit": "19d3efc34af8ba4e23df0f24d9fbb0a587e1b452",
  "sourceDigest": "sha256:2005faebbf738765fe81a5c952fa47a51311aa5d05e3220f71c542b8b1fe369b",
  "referenceSourceDigest": "sha256:ec29900df0d5b5c8d741436acb4a250ec29e5f40ce1f4110def33ac2d66baaa5"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.0/types.json) or getType() from minerva-design/contracts.

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

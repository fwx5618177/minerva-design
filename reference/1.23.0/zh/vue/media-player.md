# MediaPlayer 媒体播放器

支持音频 / 视频、字幕和键盘控制的媒体播放器。React 播放器入口还提供 HLS/DASH/FLV 引擎、清晰度、播放列表、A–B 循环、波形、截图和录制。

Package: minerva-design@1.23.0

Renderer: vue

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

### Import

```json
{
  "specifier": "minerva-design/vue",
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
    "type": "string",
    "required": false,
    "description": "URL of the media",
    "typeText": "string"
  },
  {
    "name": "type",
    "type": "MediaPlayerType",
    "required": false,
    "description": "Kind of media",
    "typeText": "MediaPlayerType"
  },
  {
    "name": "mimeType",
    "type": "string",
    "required": false,
    "description": "MIME type of the media (\"audio/mpeg\", \"video/mp4\"...), used to infer type",
    "typeText": "string"
  },
  {
    "name": "poster",
    "type": "string",
    "required": false,
    "description": "Image shown before a video plays",
    "typeText": "string"
  },
  {
    "name": "title",
    "type": "string",
    "required": false,
    "description": "Title of the media, shown in the audio bar / over the video",
    "typeText": "string"
  },
  {
    "name": "autoPlay",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Starts playing as soon as possible (browsers only allow muted autoplay\nwithout a user gesture)",
    "typeText": "boolean"
  },
  {
    "name": "loop",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Restarts at the end",
    "typeText": "boolean"
  },
  {
    "name": "muted",
    "type": "boolean",
    "required": false,
    "description": "Mutes the media; applied whenever it changes (the mute button still\ntoggles the sound)",
    "typeText": "boolean"
  },
  {
    "name": "defaultMuted",
    "type": "boolean",
    "required": false,
    "description": "Initially muted (uncontrolled)",
    "typeText": "boolean"
  },
  {
    "name": "preload",
    "type": "MediaPlayerPreload",
    "default": "\"metadata\"",
    "required": false,
    "description": "How much of the media the browser loads before playback",
    "typeText": "MediaPlayerPreload"
  },
  {
    "name": "crossOrigin",
    "type": "MediaPlayerCrossOrigin",
    "required": false,
    "description": "CORS mode of the media request (cross-origin caption files need it too,\nplus CORS headers on their server)",
    "typeText": "MediaPlayerCrossOrigin"
  },
  {
    "name": "startTime",
    "type": "number",
    "required": false,
    "description": "Resume position in seconds, applied once when the metadata loads (and\nagain when src changes)",
    "typeText": "number"
  },
  {
    "name": "playbackRates",
    "type": "readonly number[]",
    "default": "DEFAULT_PLAYBACK_RATES",
    "required": false,
    "description": "Speeds the speed button cycles through",
    "typeText": "readonly number[]"
  },
  {
    "name": "skipSeconds",
    "type": "number",
    "default": "DEFAULT_SKIP_SECONDS",
    "required": false,
    "description": "Step of the skip back / forward buttons, in seconds (0 hides them)",
    "typeText": "number"
  },
  {
    "name": "controls",
    "type": "boolean",
    "default": "true",
    "required": false,
    "description": "Shows the custom control bar; false renders the bare media element\n(drive it through the template ref)",
    "typeText": "boolean"
  },
  {
    "name": "height",
    "type": "string | number",
    "required": false,
    "description": "Height of a video player (number: pixels); overrides aspectRatio",
    "typeText": "string | number"
  },
  {
    "name": "aspectRatio",
    "type": "string",
    "default": "\"16 / 9\"",
    "required": false,
    "description": "Aspect ratio of a video player (CSS aspect-ratio)",
    "typeText": "string"
  },
  {
    "name": "pictureInPicture",
    "type": "boolean",
    "default": "false",
    "required": false,
    "description": "Shows a picture-in-picture button (video, where the browser supports it)",
    "typeText": "boolean"
  },
  {
    "name": "tracks",
    "type": "readonly MediaPlayerTrack[]",
    "default": "[]",
    "required": false,
    "description": "Captions / subtitles (WebVTT or SRT files): rendered as <track> children\nand drawn by the player over the video (below the title for audio), with\na captions menu in the control bar. The choice is remembered\n(localStorage); a `default` track shows until the user chooses",
    "typeText": "readonly MediaPlayerTrack[]"
  },
  {
    "name": "aria-label",
    "type": "string",
    "required": false,
    "description": "Accessible label of the player",
    "typeText": "string"
  }
]
```

### events

```json
[
  {
    "name": "error",
    "type": "[error: MediaError | null]",
    "typeText": "[error: MediaError | null]",
    "parameters": [
      {
        "name": "error",
        "position": 0,
        "typeText": "MediaError | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "timeUpdate",
    "type": "[detail: MediaPlayerTimeDetail]",
    "typeText": "[detail: MediaPlayerTimeDetail]",
    "parameters": [
      {
        "name": "detail",
        "position": 0,
        "typeText": "MediaPlayerTimeDetail",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "ended",
    "type": "[]",
    "typeText": "[]",
    "parameters": []
  },
  {
    "name": "play",
    "type": "[]",
    "typeText": "[]",
    "parameters": []
  },
  {
    "name": "pause",
    "type": "[]",
    "typeText": "[]",
    "parameters": []
  },
  {
    "name": "loadedMetadata",
    "type": "[detail: { duration: number; }]",
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
    "type": "[rate: number]",
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
    "type": "[detail: MediaPlayerVolumeDetail]",
    "typeText": "[detail: MediaPlayerVolumeDetail]",
    "parameters": [
      {
        "name": "detail",
        "position": 0,
        "typeText": "MediaPlayerVolumeDetail",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "trackChange",
    "type": "[detail: MediaPlayerTrackChangeDetail]",
    "typeText": "[detail: MediaPlayerTrackChangeDetail]",
    "parameters": [
      {
        "name": "detail",
        "position": 0,
        "typeText": "MediaPlayerTrackChangeDetail",
        "required": true,
        "rest": false
      }
    ]
  }
]
```

### slots

```json
[
  {
    "name": "title",
    "type": "any",
    "description": "Title of the media (replaces the title prop)",
    "typeText": "any"
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

## Example: audio

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/media-player/vue/audio.vue

```vue
<script setup lang="ts">
import { MediaPlayer } from "minerva-design/vue";
const src = "media-player/sample.m4a";
</script>
<template>
  <div style="width: 100%; min-width: 0; max-width: 480px">
    <MediaPlayer :src="src" title="Audio playback" :skip-seconds="0" />
  </div>
</template>

```

## Example: captions

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/media-player/vue/captions.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { MediaPlayer, type MediaPlayerTrack } from "minerva-design/vue";

const src = "media-player/sample.mp4";

// Caption files are usually served next to the video (cross-origin ones need
// cross-origin="anonymous" and CORS headers); data: URLs keep this demo
// self-contained.
const englishVtt = `WEBVTT

00:00.000 --> 00:01.800
A locally hosted playback sample

00:01.800 --> 00:03.600
Video and audio share the <i>same player</i>

00:03.600 --> 00:06.000
Captions follow the playback position.
`;
const frenchSrt = `1
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
    src: `data:text/vtt;charset=utf-8,${encodeURIComponent(englishVtt)}`,
    srclang: "en",
    label: "English",
    default: true,
  },
  {
    src: `data:application/x-subrip;charset=utf-8,${encodeURIComponent(frenchSrt)}`,
    srclang: "fr",
    label: "Français",
  },
];
const choice = ref<string | null>(null);
</script>
<template>
  <div
    style="
      display: grid;
      gap: 12px;
      width: 100%;
      min-width: 0;
      max-width: 560px;
    "
  >
    <MediaPlayer
      :src="src"
      title="Video playback"
      :tracks="tracks"
      @track-change="choice = $event.track?.label ?? 'Off'"
    />
    <output aria-live="polite">
      Captions: {{ choice ?? "default track" }}
    </output>
  </div>
</template>

```

## Example: rates-skip

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/media-player/vue/rates-skip.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import { MediaPlayer, VStack } from "minerva-design/vue";
const src = "media-player/sample.mp4";
const rate = ref(1);
</script>
<template>
  <VStack
    :gap="3"
    align="stretch"
    style="width: 100%; min-width: 0; max-width: 560px"
  >
    <MediaPlayer
      :src="src"
      :playback-rates="[1, 1.5, 2]"
      :skip-seconds="3"
      aspect-ratio="4 / 3"
      aria-label="Flower, speed and skip"
      @rate-change="(next) => (rate = next)"
    />
    <output>Speed: {{ rate }}×</output>
  </VStack>
</template>

```

## Example: resume

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, vue

Documentation context imports: none

### apps/docs/src/docs/pages/media-player/vue/resume.vue

```vue
<script setup lang="ts">
import { ref } from "vue";
import {
  Button,
  MediaPlayer,
  VStack,
  type MediaPlayerExpose,
} from "minerva-design/vue";
const src = "media-player/sample.mp4";
const player = ref<MediaPlayerExpose | null>(null);
// e.g. the position saved by the last session
const saved = ref(2);
const progress = ref("Not started");
function onTime(detail: { currentTime: number; duration: number }) {
  progress.value = `${Math.round((detail.currentTime / detail.duration) * 100)}% watched (${detail.currentTime.toFixed(1)}s)`;
}
function onPause() {
  saved.value = Math.floor(player.value?.element?.currentTime ?? 0);
}
</script>
<template>
  <VStack
    :gap="3"
    align="stretch"
    style="width: 100%; min-width: 0; max-width: 560px"
  >
    <MediaPlayer
      ref="player"
      :src="src"
      :start-time="saved"
      @loaded-metadata="
        ({ duration }) =>
          (progress = `Resumed at ${saved}s of ${duration.toFixed(1)}s`)
      "
      @time-update="onTime"
      @pause="onPause"
      @ended="progress = 'Finished'"
    />
    <div style="display: flex; gap: 8px; flex-wrap: wrap">
      <Button size="small" @click="player?.play()">Play</Button>
      <Button size="small" variant="outline" @click="player?.seek(0)"
        >Restart</Button
      >
    </div>
    <output aria-live="polite"
      >{{ progress }} · saved position: {{ saved }}s</output
    >
  </VStack>
</template>

```

## Example: video

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design

Documentation context imports: none

### apps/docs/src/docs/pages/media-player/vue/video.vue

```vue
<script setup lang="ts">
import { MediaPlayer } from "minerva-design/vue";
const src = "media-player/sample.mp4";
</script>
<template>
  <div style="width: 100%; min-width: 0; max-width: 560px">
    <MediaPlayer :src="src" title="Video playback" picture-in-picture />
  </div>
</template>

```

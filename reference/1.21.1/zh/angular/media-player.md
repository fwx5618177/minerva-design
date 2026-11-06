# MediaPlayer 媒体播放器

带主题化自定义控件的音频 / 视频播放器：播放 / 暂停、快进快退、显示缓冲范围的进度条、时间、音量、播放速度与全屏，并支持键盘操作。

Package: minerva-design@1.21.1

Renderer: angular

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.21.1",
  "sourceCommit": "8b898b8bac966669d23d1fba972e2a3289cdb5b5",
  "sourceDigest": "sha256:a33fb5e0b8f01ae452ce95d2b723ab0cd9905636d574c72fd12c1459f4c09d3a",
  "referenceSourceDigest": "sha256:8ed3473bb098d663e523782b06fce57a42cde419daa8bbcc5c6b1f0e37e3e50e"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.21.1/types.json) or getType() from minerva-design/contracts.

## Documentation

## MediaControls

Support: n/a

React Native-specific extension, outside the shared web component API; use minerva-design/native for this component.

## MediaPlayer

Support: beta

Native Angular: MnMediaPlayer. Native standalone component/directive; see platform tests for validated scope.

### Import

```json
{
  "specifier": "minerva-design/angular",
  "exports": [
    "MnMediaPlayer"
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
    "required": false,
    "source": "packages/angular/src/components/data/media-player.ts"
  },
  {
    "name": "type",
    "typeText": "MediaPlayerType | undefined",
    "required": false,
    "source": "packages/angular/src/components/data/media-player.ts"
  },
  {
    "name": "mimeType",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/data/media-player.ts"
  },
  {
    "name": "poster",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/data/media-player.ts"
  },
  {
    "name": "title",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/data/media-player.ts"
  },
  {
    "name": "autoPlay",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/data/media-player.ts"
  },
  {
    "name": "loop",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/data/media-player.ts"
  },
  {
    "name": "muted",
    "typeText": "boolean | undefined",
    "required": false,
    "source": "packages/angular/src/components/data/media-player.ts"
  },
  {
    "name": "defaultMuted",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/data/media-player.ts"
  },
  {
    "name": "preload",
    "typeText": "MediaPlayerPreload",
    "required": false,
    "source": "packages/angular/src/components/data/media-player.ts"
  },
  {
    "name": "crossOrigin",
    "typeText": "MediaPlayerCrossOrigin | undefined",
    "required": false,
    "source": "packages/angular/src/components/data/media-player.ts"
  },
  {
    "name": "startTime",
    "typeText": "number | undefined",
    "required": false,
    "source": "packages/angular/src/components/data/media-player.ts"
  },
  {
    "name": "playbackRates",
    "typeText": "readonly number[]",
    "required": false,
    "source": "packages/angular/src/components/data/media-player.ts"
  },
  {
    "name": "skipSeconds",
    "typeText": "number",
    "required": false,
    "source": "packages/angular/src/components/data/media-player.ts"
  },
  {
    "name": "controls",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/data/media-player.ts"
  },
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "required": false,
    "source": "packages/angular/src/components/data/media-player.ts"
  },
  {
    "name": "aspectRatio",
    "typeText": "string",
    "required": false,
    "source": "packages/angular/src/components/data/media-player.ts"
  },
  {
    "name": "pictureInPicture",
    "typeText": "boolean",
    "required": false,
    "source": "packages/angular/src/components/data/media-player.ts"
  },
  {
    "name": "tracks",
    "typeText": "readonly MediaPlayerTrack[]",
    "required": false,
    "source": "packages/angular/src/components/data/media-player.ts"
  },
  {
    "name": "aria-label",
    "typeText": "string | undefined",
    "required": false,
    "source": "packages/angular/src/components/data/media-player.ts"
  }
]
```

### events

```json
[
  {
    "name": "timeUpdate",
    "typeText": "MediaPlayerTimeDetail",
    "required": false,
    "source": "packages/angular/src/components/data/media-player.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "MediaPlayerTimeDetail",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "ended",
    "typeText": "void",
    "required": false,
    "source": "packages/angular/src/components/data/media-player.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "void",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "played",
    "typeText": "void",
    "required": false,
    "source": "packages/angular/src/components/data/media-player.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "void",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "paused",
    "typeText": "void",
    "required": false,
    "source": "packages/angular/src/components/data/media-player.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "void",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "loadedMetadata",
    "typeText": "{ duration: number; }",
    "required": false,
    "source": "packages/angular/src/components/data/media-player.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "{ duration: number; }",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "mediaError",
    "typeText": "MediaError | null",
    "required": false,
    "source": "packages/angular/src/components/data/media-player.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "MediaError | null",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "rateChange",
    "typeText": "number",
    "required": false,
    "source": "packages/angular/src/components/data/media-player.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "number",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "volumeChange",
    "typeText": "MediaPlayerVolumeDetail",
    "required": false,
    "source": "packages/angular/src/components/data/media-player.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "MediaPlayerVolumeDetail",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "trackChange",
    "typeText": "MediaPlayerTrackChangeDetail",
    "required": false,
    "source": "packages/angular/src/components/data/media-player.ts",
    "parameters": [
      {
        "name": "$event",
        "position": 0,
        "typeText": "MediaPlayerTrackChangeDetail",
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

## Example: 视频

<video> 上叠加深色半透明控制栏，播放时自动淡出（触屏设备、悬停和聚焦时保持可见）。聚焦播放器后：空格 / K 播放暂停，← / → 跳转 5 秒，↑ / ↓ 调节音量，M 静音，F 全屏。pictureInPicture 在浏览器支持时添加画中画按钮。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnMediaPlayer } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnMediaPlayer],
  template: `
<mn-media-player src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" title="Flower" pictureInPicture/>
  `,
})
export class Example {

}

```

## Example: 音频

类型由 mimeType 或文件扩展名推断（否则为视频）；音频渲染为带标题的表面色控制条。skipSeconds={0} 隐藏快进快退按钮。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnMediaPlayer } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnMediaPlayer],
  template: `
<mn-media-player src="https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3" title="T-Rex roar" [skipSeconds]="0"/>
  `,
})
export class Example {

}

```

## Example: Resume and progress

startTime resumes once the metadata loads; (timeUpdate) reports the progress; play(), pause() and seek() are public methods.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnMediaPlayer } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnMediaPlayer],
  template: `
<mn-media-player #player src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" [startTime]="saved" (timeUpdate)="time = $event.currentTime" (paused)="saved = time"/><button type="button" (click)="player.seek(0)">Restart</button><output>{{ time.toFixed(1) }}s · saved {{ saved }}s</output>
  `,
})
export class Example {
  saved = 2;
  time = 0;
}

```

## Example: Speeds and skip step

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnMediaPlayer } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnMediaPlayer],
  template: `
<mn-media-player src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" [playbackRates]="[1, 1.5, 2]" [skipSeconds]="3" aspectRatio="4 / 3" (rateChange)="rate = $event"/><output>Speed: {{ rate }}×</output>
  `,
})
export class Example {
  rate = 1;
}

```

## Example: 字幕

tracks 接收 WebVTT 或 SRT 文件（{ src, srclang, label, kind, default }；此处使用 data: URL）。它们会渲染为 <track> 子元素，但当前字幕由播放器自行绘制（视频上方叠加，音频则显示在标题下方），因此在各浏览器中外观一致。CC 按钮打开菜单（关闭及每条字幕轨道）；聚焦播放器时按 C 可开关字幕。选择会被记住（localStorage），用户选择前显示 default 轨道；onTrackChange 上报选择。跨域字幕文件需要在播放器上设置 crossOrigin="anonymous"（或 "use-credentials"），并在其服务器上返回 CORS 头。

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: @angular/core, minerva-design

Documentation context imports: none

### example.ts

```tsx
import { Component } from '@angular/core';
import { MnMediaPlayer } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnMediaPlayer],
  template: `
<mn-media-player src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" title="Flower" [tracks]="tracks" (trackChange)="choice = $event.track?.label ?? 'Off'"/><output>Captions: {{ choice }}</output>
  `,
})
export class Example {
  choice = "default track";
  tracks = [
  {
    "src": "data:text/vtt,WEBVTT%0A%0A00%3A00.000%20--%3E%2000%3A02.500%0AA%20flower%20bud%20in%20the%20morning%20light%0A%0A00%3A02.500%20--%3E%2000%3A06.000%0AIts%20petals%20slowly%20unfold%0A",
    "srclang": "en",
    "label": "English",
    "default": true
  },
  {
    "src": "data:application/x-subrip,1%0A00%3A00%3A00%2C000%20--%3E%2000%3A00%3A02%2C500%0AUn%20bouton%20de%20fleur%20au%20matin%0A%0A2%0A00%3A00%3A02%2C500%20--%3E%2000%3A00%3A06%2C000%0ASes%20p%C3%A9tales%20s'ouvrent%20lentement%0A",
    "srclang": "fr",
    "label": "Français"
  }
];
}

```

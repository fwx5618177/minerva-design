# MediaPlayer メディアプレーヤー

音声・動画、字幕、キーボード操作に対応するメディアプレーヤー。React 専用エントリでは HLS/DASH/FLV、画質選択、プレイリスト、A–B リピート、波形、スクリーンショット、録画も利用できます。

Package: minerva-design@1.23.1

Renderer: angular

Locale: ja

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "a59b0af81a2f5c6e7f2de29a81878dc4a5af01f1",
  "sourceDigest": "sha256:5b7fa63ef8772ff533e1fc34d0784bfe651eb0b1be71712d0bbef057eec2b4cf",
  "referenceSourceDigest": "sha256:1019806d6e262e50fb4e804e528badf35a408ce0a47ef203c2c5d8930c0fb0f1"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

## Documentation

プレーヤーパッケージ

完全な React プレーヤーは専用エントリから利用します。従来の minerva-design MediaPlayer は既存の props とイベント形式を維持し、同じ再生実装を使用します。

ストリーミングはブラウザーのコーデック、CORS、自動再生、安全なコンテキストの制約を受けます。以下の高度な例は React DOM 向けです。他のフレームワークやネイティブのタブは各 API を参照してください。React Native とミニプログラムは対応するメディアホストが必要です。

例はローカル配信の Minerva Design 紹介映像と音声を使用し、720p と 360p を切り替えられます。HLS、DASH、FLV も同じ映像です。対応環境ではスクリーンショットと録画が表示され、録画終了時にファイルをダウンロードします。

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

locale は英中日仏、messages は操作文言、theme はライト / ダークを設定します。CSS は一度読み込みます。PiP、録画、キャプチャー、音量、全画面はホスト次第です。クロスオリジンのキャプチャーには CORS が必要で、DRM ライセンスは設定されません。 flex や grid の中では外側のコンテナーに幅を指定してください。maxWidth は上限を設定するだけです。

Minerva Design · コンポーネント紹介

Minerva Design · 映像の音声

```tsx
import { MediaPlayer as CompatibleMediaPlayer } from "minerva-design";
```

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
        "description": "Background of the video control bar (defaults to a dark scrim that keeps controls legible over bright frames)"
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

## Example: 動画

<video> に半透明の暗いコントロールバーを重ね、再生中はフェードアウトします（タッチ画面、ホバー時、フォーカス時は表示されたまま）。プレーヤーにフォーカスして：Space / K で再生・一時停止、← / → で 5 秒シーク、↑ / ↓ で音量、M でミュート、F で全画面。pictureInPicture はブラウザが対応していればピクチャーインピクチャーボタンを追加します。 幅が狭い場合は主要操作を1行に保ち、スキップボタンと音量スライダーを省略します。キーボード操作は引き続き利用できます。

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
<div style="width: 100%; min-width: 0; max-width: 640px; display: grid; gap: 12px"><mn-media-player src="media-player/sample.mp4" poster="media-player/poster.jpg" title="Video playback" pictureInPicture/></div>
  `,
})
export class Example {

}

```

## Example: 音声

MIME または URL から種類を判定します。音声はカバーと波形を表示し、再生コントロールを共有します。skipSeconds={0} はスキップボタンを非表示にします。

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
<div style="width: 100%; min-width: 0; max-width: 640px; display: grid; gap: 12px"><mn-media-player src="media-player/sample.m4a" title="Audio playback" [skipSeconds]="0"/></div>
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
import { MnMediaPlayer, MnButton } from 'minerva-design/angular';

@Component({
  selector: 'app-example',
  imports: [MnMediaPlayer, MnButton],
  template: `
<div style="width: 100%; min-width: 0; max-width: 640px; display: grid; gap: 12px"><mn-media-player #player src="media-player/sample.mp4" poster="media-player/poster.jpg" [startTime]="saved" (timeUpdate)="time = $event.currentTime" (paused)="saved = time"/><button mnButton type="button" (click)="player.seek(0)">Restart</button><output>{{ time.toFixed(1) }}s · saved {{ saved }}s</output></div>
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
<div style="width: 100%; min-width: 0; max-width: 640px; display: grid; gap: 12px"><mn-media-player src="media-player/sample.mp4" poster="media-player/poster.jpg" [playbackRates]="[1, 1.5, 2]" [skipSeconds]="3" aspectRatio="4 / 3" (rateChange)="rate = $event"/><output>Speed: {{ rate }}×</output></div>
  `,
})
export class Example {
  rate = 1;
}

```

## Example: 字幕

tracks は WebVTT/SRT（src、srclang、label、kind、default）を受け取ります。字幕は安全なテキストとして動画上または音声の下に表示されます。設定 → 字幕、または C キーで切り替え、言語を記憶し onTrackChange で通知します。クロスオリジンには CORS が必要で、use-credentials は認証情報を送信します。

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
<div style="width: 100%; min-width: 0; max-width: 640px; display: grid; gap: 12px"><mn-media-player src="media-player/sample.mp4" poster="media-player/poster.jpg" title="Video playback" [tracks]="tracks" (trackChange)="choice = $event.track?.label ?? 'Off'"/><output>Captions: {{ choice }}</output></div>
  `,
})
export class Example {
  choice = "default track";
  tracks = [
  {
    "src": "data:text/vtt,WEBVTT%0A%0A00%3A00.000%20--%3E%2000%3A02.500%0AA%20locally%20hosted%20playback%20sample%0A%0A00%3A02.500%20--%3E%2000%3A06.000%0AVideo%20and%20audio%20share%20the%20same%20player%0A",
    "srclang": "en",
    "label": "English",
    "default": true
  },
  {
    "src": "data:application/x-subrip,1%0A00%3A00%3A00%2C000%20--%3E%2000%3A00%3A02%2C500%0AUn%20exemple%20de%20lecture%20local%0A%0A2%0A00%3A00%3A02%2C500%20--%3E%2000%3A00%3A06%2C000%0ALa%20vid%C3%A9o%20et%20l%E2%80%99audio%20partagent%20le%20m%C3%AAme%20lecteur%0A",
    "srclang": "fr",
    "label": "Français"
  }
];
}

```

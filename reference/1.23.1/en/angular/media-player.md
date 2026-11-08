# MediaPlayer

A media player with audio/video playback, captions and keyboard controls. The React player package adds HLS/DASH/FLV engines, source quality selection, playlists, A–B repeat, waveforms, screenshots and recording.

Package: minerva-design@1.23.1

Renderer: angular

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.23.1",
  "sourceCommit": "88873864837dbcb61b99fdcbc6ca81fca447df74",
  "sourceDigest": "sha256:1ce1c857f10d367f112c6e77d88ae3878570c428c4d39ed7a400c8c99645e9f6",
  "referenceSourceDigest": "sha256:d9f3f7ce5f1caadfe236e584eab7825ceb958644c20320519e6bf9a2d1daf523"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.23.1/types.json) or getType() from minerva-design/contracts.

## Documentation

Player package

Use the dedicated entry for the full React player. The original minerva-design MediaPlayer export remains available with its existing props and event payloads; both use the same playback implementation.

Streaming engines are browser adapters: codecs, CORS, autoplay and secure-context capabilities still apply. The advanced demos below are React DOM examples. Other framework and native tabs document their own supported APIs; React Native and mini-programs require their media hosts.

The examples play our Minerva Design film and its soundtrack from local files, with 720p and 360p video renditions. HLS, DASH and FLV use the same film. Screenshot and recording controls appear where supported; recording downloads a file on completion.

Advanced React API

##### Sources and engines

src accepts a URL or PlayerSource with type, mimeType, qualities and defaultQuality. HLS/DASH expose adaptive levels; createHlsEngine/createDashEngine/createFlvEngine and engines let you configure or replace adapters. Stream libraries load only when needed.

##### Playback and audio

playlist holds source/title/poster entries; defaultPlaylistIndex and onPlaylistIndexChange observe the current item. Audio and video share one engine. waveform accepts auto, decorative or peak values; A–B repeat and Media Session are optional.

##### Controls and custom actions

controls can be false for bare media or an object that enables play, progress, volume, quality, speed, captions, skip, abRepeat, playlist, screenshot, record, pip and fullscreen. actions and renderTooltip integrate host actions and tooltips without application dependencies.

##### Events and errors

The advanced entry calls onTimeUpdate(currentTime, duration), onMetadata({ width, height, duration }), onQualityChange(id) and onError(PlayerError). The root minerva-design export retains its object-shaped time callback and native MediaError callback.

##### Imperative handle

The ref exposes play/pause/seek and element/video, plus setPlaybackRate, setQuality, next/previous, setAbRepeat/clearAbRepeat, screenshot, startRecording/stopRecording and toggleFullscreen. play returns its promise so the host can handle browser playback rejection.

##### Appearance and capability boundaries

locale supports en/zh/ja/fr and messages overrides control text; theme selects light/dark. Import the player CSS once. PiP, recording, screenshot, volume and fullscreen depend on the host; cross-origin capture requires suitable CORS headers. DRM licensing is not configured by the built-in adapters. In flex or grid layouts, give the surrounding container a width; maxWidth only limits its size.

Minerva Design · Component showcase

Minerva Design · Film soundtrack

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

## Example: Video

A <video> with a dark translucent control bar that fades out while playing (it stays visible on touch screens, on hover and on focus). Focus the player: Space / K play-pause, ← / → seek by 5 s, ↑ / ↓ volume, M mute, F fullscreen. pictureInPicture adds a button where the browser supports it. Narrow players keep the primary actions on one row; skip buttons and the volume slider yield space while keyboard shortcuts remain available.

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

## Example: Audio

Media type is inferred from MIME type or the URL; audio uses a compact cover/waveform interface with shared playback controls. skipSeconds={0} hides the skip buttons.

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

## Example: Captions

tracks accepts WebVTT or SRT files ({ src, srclang, label, kind, default }; data: URLs here). The player draws safe caption text over video and below audio. Select a track in Settings → Captions, or press C to toggle it. Language choice is remembered; onTrackChange reports selection. Cross-origin files require CORS; use-credentials includes credentials.

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

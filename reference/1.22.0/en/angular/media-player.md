# MediaPlayer

An audio or video player with themed custom controls: play / pause, skip, a seek bar with the buffered range, time, volume, playback speed and fullscreen, operable from the keyboard.

Package: minerva-design@1.22.0

Renderer: angular

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.0",
  "sourceCommit": "330c90a7382a7141543dcdad732a4da31d58a37e",
  "sourceDigest": "sha256:cbdfa6292d29dec33adda7a3e9cf0e027da50858956b8d08e3f7f3ed59c8d78a",
  "referenceSourceDigest": "sha256:e3be8c06635194769da4944bbccaf8bcffec3fe4bddbd369b74caf5e4553345b"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.0/types.json) or getType() from minerva-design/contracts.

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

## Example: Video

A <video> with a dark translucent control bar that fades out while playing (it stays visible on touch screens, on hover and on focus). Focus the player: Space / K play-pause, ← / → seek by 5 s, ↑ / ↓ volume, M mute, F fullscreen. pictureInPicture adds a button where the browser supports it.

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

## Example: Audio

The type is inferred from mimeType or the file extension (video otherwise); audio renders a surface bar with the title. skipSeconds={0} hides the skip buttons.

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

## Example: Captions

tracks takes WebVTT or SRT files ({ src, srclang, label, kind, default }; data: URLs here). They are rendered as <track> children, but the player draws the active cue itself (over the video, below the title for audio) so captions look the same in every browser. The CC button opens a menu (Off and one item per track); C toggles captions on the focused player. The choice is remembered (localStorage) and a default track shows until the user chooses; onTrackChange reports it. Cross-origin caption files need crossOrigin="anonymous" (or "use-credentials") on the player and CORS headers on their server.

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

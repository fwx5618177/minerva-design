# MediaPlayer

Lecteur audio/vidéo avec sous-titres et clavier. L’entrée React dédiée ajoute HLS/DASH/FLV, le choix de qualité, les listes de lecture, la boucle A–B, la forme d’onde, les captures et l’enregistrement.

Package: minerva-design@1.23.1

Renderer: angular

Locale: fr

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

Paquet du lecteur

Utilisez l’entrée dédiée pour le lecteur React complet. MediaPlayer de minerva-design conserve ses propriétés et formats d’événements existants ; les deux utilisent la même implémentation.

Les moteurs dépendent des codecs, de CORS, de la lecture automatique et du contexte sécurisé du navigateur. Les exemples avancés sont pour React DOM. Les autres onglets décrivent leurs propres API ; React Native et les mini-programmes nécessitent leurs hôtes multimédias.

Les exemples utilisent notre film Minerva Design et sa bande-son hébergés localement, en 720p et 360p. HLS, DASH et FLV diffusent le même film. La capture et l’enregistrement apparaissent selon les capacités du navigateur ; le fichier est téléchargé à la fin.

API React avancée

##### Sources et moteurs

src accepte une URL ou PlayerSource avec type, mimeType, qualities et defaultQuality. HLS/DASH exposent les niveaux adaptatifs ; createHlsEngine/createDashEngine/createFlvEngine et engines configurent les adaptateurs, chargés à la demande.

##### Liste de lecture et audio

playlist contient src/title/poster ; defaultPlaylistIndex et onPlaylistIndexChange suivent l’élément courant. waveform accepte auto, decorative ou des valeurs de crête. La boucle A–B et Media Session sont aussi disponibles.

##### Contrôles et actions

controls=false affiche le média seul. Un objet règle play, progress, volume, quality, speed, captions, skip, abRepeat, playlist, screenshot, record, pip et fullscreen. actions et renderTooltip intègrent les actions et infobulles de l’hôte.

##### Événements et erreurs

L’entrée dédiée appelle onTimeUpdate(currentTime, duration), onMetadata({ width, height, duration }), onQualityChange(id) et onError(PlayerError). L’entrée racine minerva-design conserve les événements temporels objet et MediaError.

##### Handle impératif

La ref expose play/pause/seek, element/video, setPlaybackRate, setQuality, next/previous, setAbRepeat/clearAbRepeat, screenshot, startRecording/stopRecording et toggleFullscreen. La promesse de play permet de gérer le refus de lecture.

##### Apparence et capacités

locale prend en charge en/zh/ja/fr, messages remplace les textes et theme choisit clair/sombre. Importez le CSS une fois. PiP, enregistrement, capture, volume et plein écran dépendent de l’hôte ; les captures externes exigent CORS. Les adaptateurs ne configurent pas de licence DRM. Dans une disposition flex ou grid, définissez la largeur du conteneur parent ; maxWidth fixe seulement une limite.

Minerva Design · Présentation des composants

Minerva Design · Bande-son du film

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

## Example: Vidéo

Une <video> avec une barre de commandes sombre et translucide qui s’efface pendant la lecture (elle reste visible sur écran tactile, au survol et au focus). Lecteur focalisé : Espace / K lecture-pause, ← / → saut de 5 s, ↑ / ↓ volume, M muet, F plein écran. pictureInPicture ajoute un bouton là où le navigateur le permet. Dans un lecteur étroit, les actions principales restent sur une ligne ; les boutons de saut et le curseur de volume cèdent la place. Les raccourcis clavier restent disponibles.

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

Le type est déduit du MIME ou de l’URL. L’audio affiche une pochette et une forme d’onde avec les mêmes contrôles. skipSeconds={0} masque les boutons de saut.

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

## Example: Sous-titres

tracks accepte WebVTT/SRT (src, srclang, label, kind, default). Les sous-titres sont du texte sûr sur la vidéo ou sous l’audio. Choisissez Paramètres → Sous-titres ou C ; le choix de langue est mémorisé et onTrackChange le signale. CORS est requis pour les fichiers externes ; use-credentials envoie les identifiants.

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

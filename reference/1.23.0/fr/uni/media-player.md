# MediaPlayer

Lecteur audio/vidéo avec sous-titres et clavier. L’entrée React dédiée ajoute HLS/DASH/FLV, le choix de qualité, les listes de lecture, la boucle A–B, la forme d’onde, les captures et l’enregistrement.

Package: minerva-design@1.23.0

Renderer: uni

Locale: fr

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

Paquet du lecteur

Utilisez l’entrée dédiée pour le lecteur React complet. MediaPlayer de minerva-design conserve ses propriétés et formats d’événements existants ; les deux utilisent la même implémentation.

Les moteurs dépendent des codecs, de CORS, de la lecture automatique et du contexte sécurisé du navigateur. Les exemples avancés sont pour React DOM. Les autres onglets décrivent leurs propres API ; React Native et les mini-programmes nécessitent leurs hôtes multimédias.

Ces exemples utilisent des motifs FFmpeg courts et un son synthétique hébergés localement, sans service externe. Les captures et l’enregistrement apparaissent selon les capacités ; le fichier est téléchargé à la fin.

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

locale prend en charge en/zh/ja/fr, messages remplace les textes et theme choisit clair/sombre. Importez le CSS une fois. PiP, enregistrement, capture, volume et plein écran dépendent de l’hôte ; les captures externes exigent CORS. Les adaptateurs ne configurent pas de licence DRM.

Motif de test synthétique

Son de test à 440 Hz

```tsx
import { MediaPlayer as CompatibleMediaPlayer } from "minerva-design";
```

## MediaControls

Support: n/a

React Native-specific extension, outside the shared web component API; use minerva-design/native for this component.

## MediaPlayer

Support: beta

Video through the uni <video> component (controls off, driven by uni.createVideoContext: play/pause/seek/playbackRate/requestFullScreen) and audio through uni.createInnerAudioContext, under a themed control bar: play/pause, skip back/forward (skipSeconds), touch seek bar with the buffered range and aria-valuetext, m:ss / h:mm:ss time, mute, audio volume bar, playback-rate cycle button, video fullscreen, loading spinner and translated error state; startTime (video initial-time, audio startTime), autoPlay, loop, muted/defaultMuted, title, poster, height/aspectRatio; timeUpdate/ended/play/pause/loadedMetadata/error/rateChange/volumeChange events and an exposed play/pause/seek/context. controls=false shows the host video's own controls. Captions: tracks (WebVTT or SRT, data: URLs inline) fetched with uni.request, parsed by the shared minerva-design/core parser and drawn as an overlay synchronized with the time updates, a CC button with an Off / per-track choice row, the choice remembered in storage (default track otherwise) and a trackChange event. Beta: needs device validation (media behavior differs per host). The host video has no volume API (mute only, no volume bar); no picture-in-picture and no keyboard shortcuts; icons are text glyphs (no inline SVG on mini programs). Captions follow the host time updates (about 4 per second), are not shown in the host's native fullscreen, ignore cue positioning / styling, and remote caption files need the app's request domain allowlist. Component tests, H5 tests in happy-dom and the official uni-app WeChat SDK compilation fixture pass. Physical-device E2E and other native targets are not verified.

### Import

```json
{
  "specifier": "minerva-design/uni",
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
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "type",
    "typeText": "\"audio\" | \"video\" | undefined",
    "required": false
  },
  {
    "name": "mimeType",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "poster",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "title",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "autoPlay",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "loop",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "muted",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "defaultMuted",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "startTime",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "playbackRates",
    "typeText": "readonly number[] | undefined",
    "required": false
  },
  {
    "name": "skipSeconds",
    "typeText": "number | undefined",
    "required": false
  },
  {
    "name": "controls",
    "typeText": "boolean | undefined",
    "required": false
  },
  {
    "name": "height",
    "typeText": "string | number | undefined",
    "required": false
  },
  {
    "name": "aspectRatio",
    "typeText": "string | undefined",
    "required": false
  },
  {
    "name": "tracks",
    "typeText": "readonly MediaTrack[] | undefined",
    "required": false
  },
  {
    "name": "ariaLabel",
    "typeText": "string | undefined",
    "required": false
  }
]
```

### events

```json
[
  {
    "name": "error",
    "typeText": "[error: unknown]",
    "parameters": [
      {
        "name": "error",
        "position": 0,
        "typeText": "unknown",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "ended",
    "typeText": "[]",
    "parameters": []
  },
  {
    "name": "timeUpdate",
    "typeText": "[detail: { currentTime: number; duration: number; }]",
    "parameters": [
      {
        "name": "detail",
        "position": 0,
        "typeText": "{ currentTime: number; duration: number; }",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "play",
    "typeText": "[]",
    "parameters": []
  },
  {
    "name": "pause",
    "typeText": "[]",
    "parameters": []
  },
  {
    "name": "loadedMetadata",
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
    "typeText": "[detail: { volume: number; muted: boolean; }]",
    "parameters": [
      {
        "name": "detail",
        "position": 0,
        "typeText": "{ volume: number; muted: boolean; }",
        "required": true,
        "rest": false
      }
    ]
  },
  {
    "name": "trackChange",
    "typeText": "[detail: { index: number; track: MediaTrack | null; }]",
    "parameters": [
      {
        "name": "detail",
        "position": 0,
        "typeText": "{ index: number; track: MediaTrack | null; }",
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

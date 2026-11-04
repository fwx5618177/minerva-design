# MediaPlayer

Un lecteur audio ou vidéo aux commandes personnalisées et thématisées : lecture / pause, sauts, barre de progression avec la plage mise en mémoire tampon, durée, volume, vitesse de lecture et plein écran, utilisable au clavier.

Package: minerva-design@1.20.5

Renderer: react

Locale: fr

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.5",
  "sourceCommit": "fe15b45f84b480cdd9cfec147df037927ba34a6b",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:49d7ff5e7a649e86d07ff0f6e5da47ae57bc234041d4b820a629aeca119fd0cb"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.5/types.json) or getType() from minerva-design/contracts.

## Documentation

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

## Example: Audio

Le type est déduit de mimeType ou de l’extension du fichier (vidéo sinon) ; l’audio affiche une barre de surface avec le titre. skipSeconds={0} masque les boutons de saut.

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

## Example: Sous-titres

tracks accepte des fichiers WebVTT ou SRT ({ src, srclang, label, kind, default } ; ici des URL data:). Ils sont rendus comme enfants <track>, mais le lecteur dessine lui-même la réplique active (sur la vidéo, sous le titre pour l’audio) : les sous-titres ont le même aspect dans tous les navigateurs. Le bouton CC ouvre un menu (Désactivés et une entrée par piste) ; C les active / désactive sur le lecteur focalisé. Le choix est mémorisé (localStorage) et une piste default s’affiche tant que l’utilisateur n’a pas choisi ; onTrackChange le signale. Les fichiers d’une autre origine demandent crossOrigin="anonymous" (ou "use-credentials") sur le lecteur et des en-têtes CORS sur leur serveur.

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

## Example: Vitesses et pas de saut

playbackRates liste les vitesses parcourues par le bouton de vitesse (onRateChange signale la nouvelle) ; skipSeconds fixe le pas des boutons reculer / avancer ; aspectRatio (ou height) dimensionne une vidéo.

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

## Example: Reprise et progression

startTime est appliqué une fois les métadonnées chargées (reprendre là où l’apprenant s’est arrêté). onTimeUpdate / onLoadedMetadata / onPause / onEnded signalent la progression ; la ref expose play(), pause(), seek(secondes) et l’élément média.

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

## Example: Vidéo

Une <video> avec une barre de commandes sombre et translucide qui s’efface pendant la lecture (elle reste visible sur écran tactile, au survol et au focus). Lecteur focalisé : Espace / K lecture-pause, ← / → saut de 5 s, ↑ / ↓ volume, M muet, F plein écran. pictureInPicture ajoute un bouton là où le navigateur le permet.

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

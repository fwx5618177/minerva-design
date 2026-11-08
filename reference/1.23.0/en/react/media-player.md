# MediaPlayer

A media player with audio/video playback, captions and keyboard controls. The React player package adds HLS/DASH/FLV engines, source quality selection, playlists, A–B repeat, waveforms, screenshots and recording.

Package: minerva-design@1.23.0

Renderer: react

Locale: en

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

Player package

Use the dedicated entry for the full React player. The original minerva-design MediaPlayer export remains available with its existing props and event payloads; both use the same playback implementation.

Streaming engines are browser adapters: codecs, CORS, autoplay and secure-context capabilities still apply. The advanced demos below are React DOM examples. Other framework and native tabs document their own supported APIs; React Native and mini-programs require their media hosts.

These examples use short, locally hosted FFmpeg test patterns and a synthetic tone. They work without third-party stream services. Screenshot and recording buttons appear only where supported; recording downloads a file on completion.

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

locale supports en/zh/ja/fr and messages overrides control text; theme selects light/dark. Import the player CSS once. PiP, recording, screenshot, volume and fullscreen depend on the host; cross-origin capture requires suitable CORS headers. DRM licensing is not configured by the built-in adapters.

Synthetic test pattern

440 Hz test tone

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

## Example: Audio waveform and A–B repeat

Decode the local audio into a real waveform; seek, change speed and repeat a selected interval.

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
    <div style={{ width: "100%", maxWidth: 640 }}>
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

## Example: Audio

Media type is inferred from MIME type or the URL; audio uses a compact cover/waveform interface with shared playback controls. skipSeconds={0} hides the skip buttons.

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

## Example: Captions

tracks accepts WebVTT or SRT files ({ src, srclang, label, kind, default }; data: URLs here). The player draws safe caption text over video and below audio. Select a track in Settings → Captions, or press C to toggle it. Language choice is remembered; onTrackChange reports selection. Cross-origin files require CORS; use-credentials includes credentials.

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

## Example: Screenshot and recording

Use the built-in screenshot and recording icons, or S/R shortcuts. Recording is limited to 15 seconds here. Browsers must support canvas capture/MediaRecorder and cross-origin media must allow canvas access.

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
    <div style={{ maxWidth: 640 }}>
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

## Example: Compact muted preview

A compact looping preview starts muted; the full player remains available in the complete presentation.

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
    <div style={{ width: "100%", maxWidth: 640 }}>
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

## Example: Desktop player · same presentation as the PC client

The PC client uses this full player, adding only its tooltip and save-file adapters.

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
    <div style={{ width: "100%", maxWidth: 640 }}>
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

## Example: Playlist and A–B repeat

The playlist shares one player across video and audio. Previous/next and automatic advance are built in. Audio displays a waveform; use A–B to repeat a passage. The main entry time callback receives (currentTime, duration).

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
    <div style={{ maxWidth: 640 }}>
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

## Example: Quality selection

Choose 144p or 72p in Settings → Quality. These are different video renditions; switching keeps the playback position and playing state. HLS/DASH sources can additionally expose adaptive quality levels.

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
    <div style={{ maxWidth: 640 }}>
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

## Example: Speeds and skip step

playbackRates configures Settings → Playback speed; onRateChange reports changes. skipSeconds sets the skip buttons; aspectRatio or height sizes the video.

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

## Example: Failure and source recovery

Try a missing resource, retry, then switch to the valid source.

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
    <div style={{ display: "grid", gap: 12, maxWidth: 640 }}>
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

## Example: Resume and progress

startTime is applied once when the metadata loads (resume where the learner stopped). onTimeUpdate / onLoadedMetadata / onPause / onEnded report the progress; the ref exposes play(), pause(), seek(seconds) and the media element.

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

## Example: Streaming engines

Switch between real, locally hosted HLS, DASH and FLV samples. The selected adapter loads on demand; progressive files and native HLS remain available where supported.

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
    <div style={{ display: "grid", gap: 12, maxWidth: 640 }}>
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

## Example: Video

A <video> with a dark translucent control bar that fades out while playing (it stays visible on touch screens, on hover and on focus). Focus the player: Space / K play-pause, ← / → seek by 5 s, ↑ / ↓ volume, M mute, F fullscreen. pictureInPicture adds a button where the browser supports it.

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

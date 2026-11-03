# MediaPlayer

An audio or video player with themed custom controls: play / pause, skip, a seek bar with the buffered range, time, volume, playback speed and fullscreen, operable from the keyboard.

Package: minerva-design@1.19.3

Renderer: native

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.19.3",
  "sourceCommit": "19932861fda2d088219d708a8ca132bea760a32b",
  "sourceDigest": "sha256:fb3cb834b0315cadc80051ab82991b2623935288f141da2c666cf641e82850a8",
  "referenceSourceDigest": "sha256:ed8b6b1bf30e9055934099f84afd6b8369eee155b0404de5e8db004c3d91bce6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.19.3/types.json) or getType() from minerva-design/contracts.

## Documentation

## MediaControls

Support: beta

MediaControls: the themed control bar of MediaPlayer driven by props, to wrap expo-video / expo-audio (core React Native has no media element). Captions: tracks (WebVTT / SRT, fetched or data: URLs) parsed by minerva-design/core and the cue at currentTime drawn above the seek bar, CC choice, controlled or uncontrolled trackIndex and onTrackChange (no persisted preference)

### Import

```json
{
  "specifier": "minerva-design/native",
  "exports": [
    "MediaControls"
  ],
  "kind": "named"
}
```

### props

```json
[
  {
    "name": "playing",
    "source": "packages/native/src/components/MediaControls/MediaControls.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Whether the media is playing (drives the play / pause button)"
  },
  {
    "name": "currentTime",
    "source": "packages/native/src/components/MediaControls/MediaControls.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Playhead position, in seconds"
  },
  {
    "name": "duration",
    "source": "packages/native/src/components/MediaControls/MediaControls.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Duration in seconds (0 while unknown: the seek bar is disabled)"
  },
  {
    "name": "buffered",
    "source": "packages/native/src/components/MediaControls/MediaControls.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Buffered position, in seconds (shown on the seek bar)"
  },
  {
    "name": "muted",
    "source": "packages/native/src/components/MediaControls/MediaControls.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Whether the media is muted (shows the mute button when onMutedChange is set)"
  },
  {
    "name": "volume",
    "source": "packages/native/src/components/MediaControls/MediaControls.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Volume 0..1 (shows the volume bar when onVolumeChange is set)"
  },
  {
    "name": "playbackRate",
    "source": "packages/native/src/components/MediaControls/MediaControls.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 1,
    "required": false,
    "description": "Current playback speed (shows the speed button when onRateChange is set)"
  },
  {
    "name": "playbackRates",
    "source": "packages/native/src/components/MediaControls/MediaControls.tsx",
    "kind": "array",
    "typeText": "readonly number[] | undefined",
    "typeRef": "type:9b11f9b3b1a7e709603e",
    "required": false,
    "description": "Speeds the speed button cycles through"
  },
  {
    "name": "skipSeconds",
    "source": "packages/native/src/components/MediaControls/MediaControls.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "default": 10,
    "required": false,
    "description": "Step of the skip back / forward buttons, in seconds (0 hides them)"
  },
  {
    "name": "title",
    "source": "packages/native/src/components/MediaControls/MediaControls.tsx",
    "kind": "string",
    "typeText": "string | undefined",
    "typeRef": "type:c59382f9551703242861",
    "required": false,
    "description": "Title of the media, shown above the controls"
  },
  {
    "name": "loading",
    "source": "packages/native/src/components/MediaControls/MediaControls.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows the loading spinner (buffering)"
  },
  {
    "name": "error",
    "source": "packages/native/src/components/MediaControls/MediaControls.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "default": false,
    "required": false,
    "description": "Shows the translated error message (\"This media can't be played\") and disables the play buttons"
  },
  {
    "name": "fullscreen",
    "source": "packages/native/src/components/MediaControls/MediaControls.tsx",
    "kind": "boolean",
    "typeText": "boolean | undefined",
    "typeRef": "type:c54e4f1388c4caae77ff",
    "required": false,
    "description": "Whether the player is fullscreen (shows the fullscreen button when onFullscreenChange is set)"
  },
  {
    "name": "variant",
    "source": "packages/native/src/components/MediaControls/MediaControls.tsx",
    "kind": "enum",
    "values": [
      "audio",
      "video"
    ],
    "typeText": "MediaControlsVariant | undefined",
    "typeRef": "type:0ad53df71ee55105861d",
    "default": "audio",
    "required": false,
    "description": "Overlay over a video (dark translucent) or audio bar (surface)"
  },
  {
    "name": "tracks",
    "source": "packages/native/src/components/MediaControls/MediaControls.tsx",
    "kind": "array",
    "typeText": "readonly MediaControlsTrack[] | undefined",
    "typeRef": "type:abbb3162a21297b4efbf",
    "required": false,
    "description": "Captions / subtitles (WebVTT or SRT files): fetched, parsed and the cue at `currentTime` drawn above the seek bar, with a captions (CC) choice in the bar"
  },
  {
    "name": "trackIndex",
    "source": "packages/native/src/components/MediaControls/MediaControls.tsx",
    "kind": "number",
    "typeText": "number | undefined",
    "typeRef": "type:8fd4405af6b6a3932806",
    "required": false,
    "description": "Index of the shown track, -1 for Off (controlled); uncontrolled when omitted: starts on the `default` track (else Off)"
  }
]
```

### events

```json
[
  {
    "name": "onPlayPause",
    "source": "packages/native/src/components/MediaControls/MediaControls.tsx",
    "kind": "function",
    "typeText": "(() => void) | undefined",
    "typeRef": "type:71741d7b1cbbe362a73c",
    "parameters": [],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called when the play / pause button is pressed"
  },
  {
    "name": "onSeek",
    "source": "packages/native/src/components/MediaControls/MediaControls.tsx",
    "kind": "function",
    "typeText": "((seconds: number) => void) | undefined",
    "typeRef": "type:9d6d823cdaaf6f99923b",
    "parameters": [
      {
        "name": "seconds",
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
    "description": "Called with the requested playhead position (seek bar, skip buttons, screen reader actions)"
  },
  {
    "name": "onMutedChange",
    "source": "packages/native/src/components/MediaControls/MediaControls.tsx",
    "kind": "function",
    "typeText": "((muted: boolean) => void) | undefined",
    "typeRef": "type:8f6cd99be8f77b09fe81",
    "parameters": [
      {
        "name": "muted",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "boolean",
        "typeRef": "type:7087acd01ef7dd9f1d5c"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called with the requested muted state"
  },
  {
    "name": "onVolumeChange",
    "source": "packages/native/src/components/MediaControls/MediaControls.tsx",
    "kind": "function",
    "typeText": "((volume: number) => void) | undefined",
    "typeRef": "type:cd0ba7776935714521c0",
    "parameters": [
      {
        "name": "volume",
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
    "description": "Called with the requested volume (0..1)"
  },
  {
    "name": "onRateChange",
    "source": "packages/native/src/components/MediaControls/MediaControls.tsx",
    "kind": "function",
    "typeText": "((rate: number) => void) | undefined",
    "typeRef": "type:b8aaf5169a7505edfc3b",
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
    "description": "Called with the next playback speed"
  },
  {
    "name": "onFullscreenChange",
    "source": "packages/native/src/components/MediaControls/MediaControls.tsx",
    "kind": "function",
    "typeText": "((fullscreen: boolean) => void) | undefined",
    "typeRef": "type:1f91c0bb62beaa66932f",
    "parameters": [
      {
        "name": "fullscreen",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "boolean",
        "typeRef": "type:7087acd01ef7dd9f1d5c"
      }
    ],
    "returnType": {
      "typeText": "void",
      "typeRef": "type:7ba5db05423263a0fe9d"
    },
    "required": false,
    "description": "Called with the requested fullscreen state"
  },
  {
    "name": "onTrackChange",
    "source": "packages/native/src/components/MediaControls/MediaControls.tsx",
    "kind": "function",
    "typeText": "((detail: MediaControlsTrackChangeDetail) => void) | undefined",
    "typeRef": "type:e0881e6a594b41e88857",
    "parameters": [
      {
        "name": "detail",
        "position": 0,
        "required": true,
        "rest": false,
        "typeText": "MediaControlsTrackChangeDetail",
        "typeRef": "type:7de96d24f11dd88ceb9f"
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

### bindings

```json
[
  {
    "prop": "muted",
    "event": "onMutedChange",
    "syntax": "muted={muted} onMutedChange={handler}"
  },
  {
    "prop": "volume",
    "event": "onVolumeChange",
    "syntax": "volume={volume} onVolumeChange={handler}"
  },
  {
    "prop": "fullscreen",
    "event": "onFullscreenChange",
    "syntax": "fullscreen={fullscreen} onFullscreenChange={handler}"
  }
]
```

## MediaPlayer

Support: n/a

Core React Native has no media element. minerva-design/native exports MediaControls, the themed control bar driven by props (playing, currentTime, duration, onPlayPause, onSeek...), to wrap the player of expo-video / expo-audio (or react-native-video).

## API

```json
{
  "native:MediaControlsProps": {
    "source": "native/src/components/MediaControls/MediaControls.tsx",
    "kind": "interface",
    "extends": [
      "Omit<ViewProps, \"style\" | \"children\">"
    ],
    "props": [
      {
        "name": "playing",
        "type": "boolean",
        "required": false,
        "description": "Whether the media is playing (drives the play / pause button)"
      },
      {
        "name": "currentTime",
        "type": "number",
        "required": false,
        "description": "Playhead position, in seconds"
      },
      {
        "name": "duration",
        "type": "number",
        "required": false,
        "description": "Duration in seconds (0 while unknown: the seek bar is disabled)"
      },
      {
        "name": "buffered",
        "type": "number",
        "required": false,
        "description": "Buffered position, in seconds (shown on the seek bar)"
      },
      {
        "name": "muted",
        "type": "boolean",
        "required": false,
        "description": "Whether the media is muted (shows the mute button when onMutedChange is set)"
      },
      {
        "name": "volume",
        "type": "number",
        "required": false,
        "description": "Volume 0..1 (shows the volume bar when onVolumeChange is set)"
      },
      {
        "name": "playbackRate",
        "type": "number",
        "required": false,
        "default": "1",
        "description": "Current playback speed (shows the speed button when onRateChange is set)"
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
        "name": "title",
        "type": "string",
        "required": false,
        "description": "Title of the media, shown above the controls"
      },
      {
        "name": "loading",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Shows the loading spinner (buffering)"
      },
      {
        "name": "error",
        "type": "boolean",
        "required": false,
        "default": "false",
        "description": "Shows the translated error message (\"This media can't be played\") and disables the play buttons"
      },
      {
        "name": "fullscreen",
        "type": "boolean",
        "required": false,
        "description": "Whether the player is fullscreen (shows the fullscreen button when onFullscreenChange is set)"
      },
      {
        "name": "variant",
        "type": "MediaControlsVariant",
        "required": false,
        "default": "\"audio\"",
        "description": "Overlay over a video (dark translucent) or audio bar (surface)"
      },
      {
        "name": "onPlayPause",
        "type": "() => void",
        "required": false,
        "description": "Called when the play / pause button is pressed"
      },
      {
        "name": "onSeek",
        "type": "(seconds: number) => void",
        "required": false,
        "description": "Called with the requested playhead position (seek bar, skip buttons, screen reader actions)"
      },
      {
        "name": "onMutedChange",
        "type": "(muted: boolean) => void",
        "required": false,
        "description": "Called with the requested muted state"
      },
      {
        "name": "onVolumeChange",
        "type": "(volume: number) => void",
        "required": false,
        "description": "Called with the requested volume (0..1)"
      },
      {
        "name": "onRateChange",
        "type": "(rate: number) => void",
        "required": false,
        "description": "Called with the next playback speed"
      },
      {
        "name": "onFullscreenChange",
        "type": "(fullscreen: boolean) => void",
        "required": false,
        "description": "Called with the requested fullscreen state"
      },
      {
        "name": "tracks",
        "type": "readonly MediaControlsTrack[]",
        "required": false,
        "default": "[]",
        "description": "Captions / subtitles (WebVTT or SRT files): fetched, parsed and the cue at `currentTime` drawn above the seek bar, with a captions (CC) choice in the bar"
      },
      {
        "name": "trackIndex",
        "type": "number",
        "required": false,
        "description": "Index of the shown track, -1 for Off (controlled); uncontrolled when omitted: starts on the `default` track (else Off)"
      },
      {
        "name": "onTrackChange",
        "type": "(detail: MediaControlsTrackChangeDetail) => void",
        "required": false,
        "description": "Called when the user chooses captions (index -1 and track null: Off)"
      },
      {
        "name": "style",
        "type": "StyleProp<ViewStyle>",
        "required": false,
        "description": "Style of the bar"
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

## Example: basic

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/media-player/native/basic.tsx

```tsx
import { useState } from "react";
import { Text, View } from "react-native";
import { MediaControls } from "minerva-design/native";

// Core React Native has no media element: MediaControls is the control bar,
// driven by props. With expo-audio, wire it to the player:
//   const player = useAudioPlayer(source);
//   const status = useAudioPlayerStatus(player);
//   <MediaControls
//     playing={status.playing}
//     currentTime={status.currentTime}
//     duration={status.duration}
//     onPlayPause={() => (status.playing ? player.pause() : player.play())}
//     onSeek={(seconds) => player.seekTo(seconds)}
//   />
// This preview simulates the player state.
export default function Basic() {
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(42);
  const [muted, setMuted] = useState(false);
  const [rate, setRate] = useState(1);
  return (
    <View style={{ gap: 12 }}>
      <MediaControls
        title="Lecture 3 · Photosynthesis"
        playing={playing}
        currentTime={time}
        duration={754}
        buffered={300}
        muted={muted}
        playbackRate={rate}
        onPlayPause={() => setPlaying(!playing)}
        onSeek={setTime}
        onMutedChange={setMuted}
        onRateChange={setRate}
      />
      <Text>
        {playing ? "Playing" : "Paused"} at {Math.round(time)}s, {rate}×
      </Text>
    </View>
  );
}

```

## Example: Captions

tracks takes WebVTT or SRT files ({ src, srclang, label, kind, default }; data: URLs here). They are rendered as <track> children, but the player draws the active cue itself (over the video, below the title for audio) so captions look the same in every browser. The CC button opens a menu (Off and one item per track); C toggles captions on the focused player. The choice is remembered (localStorage) and a default track shows until the user chooses; onTrackChange reports it. Cross-origin caption files need crossOrigin="anonymous" (or "use-credentials") on the player and CORS headers on their server.

Kind: internal-demo. The files below preserve the documentation example and its local dependencies. Documentation translation/runtime context may still be required; use a standalone recipe for an isolated application.

External dependencies: minerva-design, react, react-native

Documentation context imports: none

### apps/docs/src/docs/pages/media-player/native/captions.tsx

```tsx
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { MediaControls, type MediaControlsTrack } from "minerva-design/native";

// React Native players (expo-video, expo-audio, react-native-video) have no
// text tracks: MediaControls fetches the WebVTT / SRT file, parses it and
// draws the cue at `currentTime`. Wire currentTime to the player status, e.g.
//   const status = useAudioPlayerStatus(player);
//   <MediaControls currentTime={status.currentTime} tracks={tracks} ... />
// This preview simulates a playing clip.
const ENGLISH_VTT = `WEBVTT

00:00.000 --> 00:03.000
Welcome to lecture 3: photosynthesis

00:03.000 --> 00:06.000
Plants turn <b>light</b> into chemical energy
`;
const FRENCH_SRT = `1
00:00:00,000 --> 00:00:03,000
Bienvenue au cours 3 : la photosynthèse

2
00:00:03,000 --> 00:00:06,000
Les plantes transforment la lumière en énergie chimique
`;
const tracks: MediaControlsTrack[] = [
  {
    src: `data:text/vtt;charset=utf-8,${encodeURIComponent(ENGLISH_VTT)}`,
    srclang: "en",
    label: "English",
    default: true,
  },
  {
    src: `data:application/x-subrip;charset=utf-8,${encodeURIComponent(FRENCH_SRT)}`,
    srclang: "fr",
    label: "Français",
  },
];

export default function Captions() {
  const [playing, setPlaying] = useState(true);
  const [time, setTime] = useState(0);
  const [choice, setChoice] = useState("English");
  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(() => setTime((t) => (t + 0.25) % 6), 250);
    return () => clearInterval(timer);
  }, [playing]);
  return (
    <View style={{ gap: 12 }}>
      <MediaControls
        variant="video"
        title="Lecture 3 · Photosynthesis"
        playing={playing}
        currentTime={time}
        duration={6}
        onPlayPause={() => setPlaying(!playing)}
        onSeek={setTime}
        tracks={tracks}
        onTrackChange={({ track }) => setChoice(track?.label ?? "Off")}
      />
      <Text>Captions: {choice}</Text>
    </View>
  );
}

```

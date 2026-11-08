import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`// tracks is a property (an array of { src, srclang, label, kind, default });
// <track src srclang label default> children of the element work too.
// minerva-track-change reports the user's choice.
import type {
  MediaPlayerTrack,
  MinervaMediaPlayer,
} from "minerva-design/web-components/media-player";

const ENGLISH_VTT = \`WEBVTT

00:00.000 --> 00:01.800
A locally hosted playback sample

00:01.800 --> 00:03.600
Video and audio share the <i>same player</i>

00:03.600 --> 00:06.000
Captions follow the playback position.
\`;
const FRENCH_SRT = \`1
00:00:00,000 --> 00:00:01,800
Un exemple de lecture hébergé localement

2
00:00:01,800 --> 00:00:03,600
La vidéo et l’audio partagent le même lecteur

3
00:00:03,600 --> 00:00:06,000
Les sous-titres suivent la lecture.
\`;
const tracks: MediaPlayerTrack[] = [
  {
    src: \`data:text/vtt;charset=utf-8,\${encodeURIComponent(ENGLISH_VTT)}\`,
    srclang: "en",
    label: "English",
    default: true,
  },
  {
    src: \`data:application/x-subrip;charset=utf-8,\${encodeURIComponent(FRENCH_SRT)}\`,
    srclang: "fr",
    label: "Français",
  },
];

export function setup(root: HTMLElement) {
  const player = root.querySelector<MinervaMediaPlayer>("#player")!;
  const output = root.querySelector<HTMLOutputElement>("#choice")!;
  player.tracks = tracks;
  const onTrackChange = (e: Event) => {
    const { track } = (
      e as CustomEvent<{ index: number; track: MediaPlayerTrack | null }>
    ).detail;
    output.value = \`Captions: \${track?.label ?? "Off"}\`;
  };
  player.addEventListener("minerva-track-change", onTrackChange);
  return () =>
    player.removeEventListener("minerva-track-change", onTrackChange);
}
`})))()}n();export{t as default};
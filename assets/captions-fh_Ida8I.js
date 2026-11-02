import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { MediaControls, type MediaControlsTrack } from "minerva-design/native";

// React Native players (expo-video, expo-audio, react-native-video) have no
// text tracks: MediaControls fetches the WebVTT / SRT file, parses it and
// draws the cue at \`currentTime\`. Wire currentTime to the player status, e.g.
//   const status = useAudioPlayerStatus(player);
//   <MediaControls currentTime={status.currentTime} tracks={tracks} ... />
// This preview simulates a playing clip.
const ENGLISH_VTT = \`WEBVTT

00:00.000 --> 00:03.000
Welcome to lecture 3: photosynthesis

00:03.000 --> 00:06.000
Plants turn <b>light</b> into chemical energy
\`;
const FRENCH_SRT = \`1
00:00:00,000 --> 00:00:03,000
Bienvenue au cours 3 : la photosynthèse

2
00:00:03,000 --> 00:00:06,000
Les plantes transforment la lumière en énergie chimique
\`;
const tracks: MediaControlsTrack[] = [
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
`})))()}n();export{t as default};
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

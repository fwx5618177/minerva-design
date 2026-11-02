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

import { useTranslation } from "react-i18next";
import { useState } from "react";
import { MediaPlayer } from "minerva-design";

const VIDEO_SRC = `${import.meta.env.BASE_URL}media-player/sample.mp4`;

export default function RatesSkipDemo() {
  const { t } = useTranslation();
  const [rate, setRate] = useState(1);

  return (
    <div
      style={{
        display: "grid",
        gap: 12,
        width: "100%",
        minWidth: 0,
        maxWidth: 640,
      }}
    >
      <MediaPlayer
        poster={`${import.meta.env.BASE_URL}media-player/poster.jpg`}
        title={t("docs.media-player.data.pattern")}
        src={VIDEO_SRC}
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

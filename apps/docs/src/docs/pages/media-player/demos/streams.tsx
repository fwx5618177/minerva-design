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

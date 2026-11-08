import { useTranslation } from "react-i18next";
import { useState } from "react";
import { MediaPlayer, type MediaPlayerTrack } from "minerva-design";

const VIDEO_SRC = `${import.meta.env.BASE_URL}media-player/sample.mp4`;

// Caption files are usually served next to the video (cross-origin ones need
// crossOrigin="anonymous" on the player and CORS headers on their server).
// Inline data: URLs keep this demo self-contained.
const ENGLISH_VTT = `WEBVTT

00:00.000 --> 00:01.800
A locally hosted playback sample

00:01.800 --> 00:03.600
Video and audio share the <i>same player</i>

00:03.600 --> 00:06.000
Captions follow the playback position.
`;

const FRENCH_SRT = `1
00:00:00,000 --> 00:00:01,800
Un exemple de lecture hébergé localement

2
00:00:01,800 --> 00:00:03,600
La vidéo et l’audio partagent le même lecteur

3
00:00:03,600 --> 00:00:06,000
Les sous-titres suivent la lecture.
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
  const { t } = useTranslation();
  const [choice, setChoice] = useState<string | null>(null);
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
        src={VIDEO_SRC}
        title={t("docs.media-player.data.pattern")}
        tracks={tracks}
        onTrackChange={({ track }) => setChoice(track?.label ?? "Off")}
      />
      <MediaPlayer
        src={`${import.meta.env.BASE_URL}media-player/sample.m4a`}
        title={t("docs.media-player.data.tone")}
        skipSeconds={0}
        tracks={tracks}
      />
      <output aria-live="polite">
        {choice ? `Captions: ${choice}` : "Captions: default track"}
      </output>
    </div>
  );
}

import "minerva-design/media-player/style.css";
import { useTranslation } from "react-i18next";
import { useTheme } from "minerva-design";
import { MediaPlayer, type PlayerSource } from "minerva-design/media-player";

const base = `${import.meta.env.BASE_URL}media-player/`;
const source: PlayerSource = {
  src: `${base}sample.mp4`,
  type: "mp4",
  defaultQuality: "720p",
  qualities: [
    { id: "720p", label: "720p", height: 720, src: `${base}sample.mp4` },
    { id: "360p", label: "360p", height: 360, src: `${base}sample-small.mp4` },
  ],
};
export default function QualityDemo() {
  const { t, i18n } = useTranslation();
  const { resolvedTheme } = useTheme();
  return (
    <div style={{ width: "100%", minWidth: 0, maxWidth: 640 }}>
      <MediaPlayer
        poster={`${import.meta.env.BASE_URL}media-player/poster.jpg`}
        src={source}
        title={t("docs.media-player.data.pattern")}
        locale={i18n.language}
        theme={resolvedTheme}
      />
    </div>
  );
}

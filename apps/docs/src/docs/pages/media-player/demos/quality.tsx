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

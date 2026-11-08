import "minerva-design/media-player/style.css";
import { MediaPlayer } from "minerva-design/media-player";
import { useTheme } from "minerva-design";
import { useTranslation } from "react-i18next";
const base = `${import.meta.env.BASE_URL}media-player/`;
export default function Demo() {
  const { t, i18n } = useTranslation();
  const { resolvedTheme } = useTheme();
  return (
    <div style={{ width: "100%", minWidth: 0, maxWidth: 640 }}>
      <MediaPlayer
        poster={`${import.meta.env.BASE_URL}media-player/poster.jpg`}
        src={`${base}sample.mp4`}
        title={t("docs.media-player.demos.compact.title")}
        locale={i18n.language}
        theme={resolvedTheme}
        variant="compact"
        autoPlay
        defaultLoop
        maxWidth={360}
      />
    </div>
  );
}

import "minerva-design/media-player/style.css";
import { useTranslation } from "react-i18next";
import { useTheme } from "minerva-design";
import { MediaPlayer } from "minerva-design/media-player";

const base = `${import.meta.env.BASE_URL}media-player/`;
export default function PlaylistDemo() {
  const { t, i18n } = useTranslation();
  const { resolvedTheme } = useTheme();
  return (
    <div style={{ maxWidth: 640 }}>
      <MediaPlayer
        title={t("docs.media-player.demos.playlist.title")}
        locale={i18n.language}
        theme={resolvedTheme}
        playlist={[
          {
            src: `${base}sample.mp4`,
            title: t("docs.media-player.data.pattern"),
          },
          { src: `${base}sample.m4a`, title: t("docs.media-player.data.tone") },
        ]}
        controls={{ skip: true, abRepeat: true }}
      />
    </div>
  );
}

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
        src={`${base}sample.mp4`}
        title={t("docs.media-player.demos.desktop.title")}
        locale={i18n.language}
        theme={resolvedTheme}
        showTitle
        showLoopToggle
        controls={{
          skip: true,
          abRepeat: true,
          screenshot: true,
          record: true,
        }}
      />
    </div>
  );
}

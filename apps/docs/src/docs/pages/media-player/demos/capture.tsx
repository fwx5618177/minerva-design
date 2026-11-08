import "minerva-design/media-player/style.css";
import { useTranslation } from "react-i18next";
import { useTheme } from "minerva-design";
import { MediaPlayer } from "minerva-design/media-player";

export default function CaptureDemo() {
  const { t, i18n } = useTranslation();
  const { resolvedTheme } = useTheme();
  return (
    <div style={{ width: "100%", minWidth: 0, maxWidth: 640 }}>
      <MediaPlayer
        src={`${import.meta.env.BASE_URL}media-player/sample.mp4`}
        title={t("docs.media-player.data.pattern")}
        locale={i18n.language}
        theme={resolvedTheme}
        controls={{ screenshot: true, record: true }}
        maxRecordingSeconds={15}
      />
    </div>
  );
}

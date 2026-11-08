import "minerva-design/media-player/style.css";
import { MediaPlayer } from "minerva-design/media-player";
import { useTheme } from "minerva-design";
import { useTranslation } from "react-i18next";
const base = `${import.meta.env.BASE_URL}media-player/`;
export default function Demo() {
  const { t, i18n } = useTranslation();
  const { resolvedTheme } = useTheme();
  return (
    <div style={{ width: "100%", maxWidth: 640 }}>
      <MediaPlayer
        kind="audio"
        src={`${base}sample.m4a`}
        title={t("docs.media-player.data.tone")}
        locale={i18n.language}
        theme={resolvedTheme}
        waveform="auto"
        showLoopToggle
        controls={{ skip: true, abRepeat: true }}
      />
    </div>
  );
}

import { useTranslation } from "react-i18next";
import { MediaPlayer } from "minerva-design";

const AUDIO_SRC = `${import.meta.env.BASE_URL}media-player/sample.m4a`;

export default function AudioDemo() {
  const { t } = useTranslation();
  return (
    <div style={{ width: "100%", minWidth: 0, maxWidth: 480 }}>
      <MediaPlayer
        src={AUDIO_SRC}
        title={t("docs.media-player.data.tone")}
        skipSeconds={0}
      />
    </div>
  );
}

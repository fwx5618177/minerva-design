import { useTranslation } from "react-i18next";
import { MediaPlayer } from "minerva-design";

const VIDEO_SRC = `${import.meta.env.BASE_URL}media-player/sample.mp4`;

export default function VideoDemo() {
  const { t } = useTranslation();
  return (
    <div style={{ width: "100%", minWidth: 0, maxWidth: 640 }}>
      <MediaPlayer
        src={VIDEO_SRC}
        poster={`${import.meta.env.BASE_URL}media-player/poster.jpg`}
        title={t("docs.media-player.data.pattern")}
        pictureInPicture
      />
    </div>
  );
}

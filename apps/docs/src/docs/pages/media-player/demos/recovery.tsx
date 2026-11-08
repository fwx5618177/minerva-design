import "minerva-design/media-player/style.css";
import { MediaPlayer } from "minerva-design/media-player";
import { useTheme } from "minerva-design";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Button } from "minerva-design";
export default function RecoveryDemo() {
  const { t, i18n } = useTranslation();
  const { resolvedTheme } = useTheme();
  const [valid, setValid] = useState(true);
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
      <Button onClick={() => setValid(!valid)}>
        {t(`docs.media-player.demos.recovery.${valid ? "break" : "restore"}`)}
      </Button>
      <MediaPlayer
        poster={`${import.meta.env.BASE_URL}media-player/poster.jpg`}
        src={`${import.meta.env.BASE_URL}media-player/${valid ? "sample.mp4" : "missing.mp4"}`}
        title={t("docs.media-player.demos.recovery.title")}
        locale={i18n.language}
        theme={resolvedTheme}
      />
    </div>
  );
}

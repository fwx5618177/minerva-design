import React from "react";
import { useTranslation } from "react-i18next";
import CodeBlock from "@layout/CodeBlock";
import styles from "@/docs/components/docs.module.scss";
import DocPage from "@/docs/components/DocPage";
import { collectDemos } from "@/docs/demos";

const demos = collectDemos(
  import.meta.glob<React.ComponentType>("./demos/*.tsx", {
    eager: true,
    import: "default",
  }),
  import.meta.glob<string>("./demos/*.tsx", {
    eager: true,
    query: "?raw",
    import: "default",
  }),
);

const MediaPlayerDoc: React.FC = () => {
  const { t } = useTranslation();
  return (
    <DocPage
      id="media-player"
      importCode={
        'import { MediaPlayer } from "minerva-design/media-player";\nimport "minerva-design/media-player/style.css";'
      }
      demos={demos}
      intro={
        <section className={styles.section} aria-labelledby="player-package">
          <h2 id="player-package">
            {t("docs.media-player.advanced.advancedTitle")}
          </h2>
          <p className={styles.prose}>
            {t("docs.media-player.advanced.advancedText")}
          </p>
          <CodeBlock
            language="tsx"
            code={
              'import { MediaPlayer as CompatibleMediaPlayer } from "minerva-design";'
            }
          />
          <h3 id="player-capabilities">
            {t("docs.media-player.advanced.capabilitiesTitle")}
          </h3>
          <dl className={styles.prose}>
            {[
              "sources",
              "playback",
              "controls",
              "events",
              "handle",
              "appearance",
            ].map((key) => (
              <React.Fragment key={key}>
                <dt>
                  <strong>
                    {t(`docs.media-player.advanced.capabilities.${key}.title`)}
                  </strong>
                </dt>
                <dd>
                  {t(`docs.media-player.advanced.capabilities.${key}.text`)}
                </dd>
              </React.Fragment>
            ))}
          </dl>
          <p className={styles.callout}>
            {t("docs.media-player.advanced.boundary")}
          </p>
          <p className={styles.muted}>
            {t("docs.media-player.advanced.assets")}
          </p>
        </section>
      }
    />
  );
};

export default MediaPlayerDoc;

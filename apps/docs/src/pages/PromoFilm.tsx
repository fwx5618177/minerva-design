import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, TextLink } from "minerva-design";
import styles from "./promo-film.module.scss";

type Format = "landscape" | "portrait";

export default function PromoFilm() {
  const { t, i18n } = useTranslation();
  // Choose once on mount; resizing must not interrupt a playing film.
  const [format, setFormat] = useState<Format>(() =>
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 767px)").matches
      ? "portrait"
      : "landscape",
  );
  const language =
    (i18n.resolvedLanguage ?? i18n.language).split("-")[0] === "zh"
      ? "zh"
      : "en";
  const base = `${import.meta.env.BASE_URL}media/promo-v3/Film-${language}-${format}`;

  return (
    <section className={styles.section} aria-labelledby="home-film-title">
      <h2 id="home-film-title">{t("home.film.title")}</h2>
      <p className={styles.description}>{t("home.film.description")}</p>
      <div
        className={styles.formats}
        role="group"
        aria-label={t("home.film.formats")}
      >
        {(["landscape", "portrait"] as const).map((value) => (
          <Button
            key={value}
            variant={format === value ? "solid" : "outline"}
            aria-pressed={format === value}
            onClick={() => setFormat(value)}
          >
            {t(`home.film.${value}`)}
          </Button>
        ))}
      </div>
      <FilmPlayer key={base} base={base} format={format} language={language} />
    </section>
  );
}

function FilmPlayer({
  base,
  format,
  language,
}: {
  base: string;
  format: Format;
  language: "zh" | "en";
}) {
  const { t } = useTranslation();
  const [failed, setFailed] = useState(false);
  return (
    <div className={styles.player} data-format={format}>
      <video
        className={styles.video}
        src={`${base}-1080p.mp4`}
        poster={`${base}-poster.jpg`}
        controls
        playsInline
        preload="none"
        aria-label={`Minerva Design — ${t(`home.film.${format}`)}`}
        onError={() => setFailed(true)}
      >
        <track
          kind="captions"
          src={`${base}.vtt`}
          srcLang={language}
          label={language === "zh" ? "中文" : "English"}
        />
      </video>
      <div className={styles.footer}>
        <span>{t("home.film.audio")}</span>
        <TextLink
          href={`${base}-1080p.mp4`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("home.film.download")}
        </TextLink>
      </div>
      {failed && (
        <p role="alert" className={styles.error}>
          {t("home.film.error")}
        </p>
      )}
    </div>
  );
}

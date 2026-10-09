import { useEffect, useMemo, useRef, useState } from "react";
import { useConfig, LoadingState, Alert, Button } from "minerva-design";
import { useTranslation } from "react-i18next";
import type { ConfigTheme } from "minerva-design/angular";
import type { AngularExample } from "./examples";
import type { AngularIsland, AngularSettings } from "./runtime";
import styles from "../components/docs.module.scss";

export default function AngularDemo({ example }: { example: AngularExample }) {
  const { t } = useTranslation();
  const root = useRef<HTMLDivElement>(null);
  const island = useRef<AngularIsland | null>(null);
  const config = useConfig();
  const latest = useRef(config);
  const settings = useMemo<AngularSettings>(
    () => ({
      theme: (config.theme ?? "system") as ConfigTheme,
      palette: config.palette ?? null,
      language: config.locale?.language === "zh" ? "zh" : "en",
    }),
    [config.theme, config.palette, config.locale?.language],
  );
  const current = useRef(settings);
  useEffect(() => {
    latest.current = config;
    current.current = settings;
  }, [config, settings]);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    let cancelled = false;
    setReady(false);
    setError("");
    void import("./runtime")
      .then((runtime) =>
        runtime.mountAngularExample(element, example, current.current, {
          theme: (value) => latest.current.setTheme?.(value),
          palette: (value) => latest.current.setPalette?.(value),
        }),
      )
      .then((mounted) => {
        if (cancelled) {
          mounted.destroy();
          return;
        }
        island.current = mounted;
        mounted.update(current.current);
        setReady(true);
      })
      .catch((reason) => {
        if (!cancelled)
          setError(reason instanceof Error ? reason.message : String(reason));
      });
    return () => {
      cancelled = true;
      island.current?.destroy();
      island.current = null;
    };
  }, [example, attempt]);
  useEffect(() => {
    island.current?.update(settings);
  }, [settings]);
  return (
    <div
      className={styles.wcDemo}
      data-angular-demo=""
      aria-busy={!ready && !error}
    >
      {!ready && !error && (
        <LoadingState size="small" label={t("doc.loading")} />
      )}
      {error && (
        <Alert color="danger" title={t("doc.previewError")}>
          <p>{error}</p>
          <Button
            type="button"
            onClick={() => setAttempt((value) => value + 1)}
          >
            {t("doc.retry")}
          </Button>
        </Alert>
      )}
      <div ref={root} className={styles.vueMount} />
    </div>
  );
}

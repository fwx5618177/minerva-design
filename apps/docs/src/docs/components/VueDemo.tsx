import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useConfig, type ConfigProviderThemeProps } from "minerva-design";
import type { Palette } from "minerva-design/theme-utils";
import type { Component } from "vue";
import type { VueDemoEntry } from "../vueDemos";
import styles from "./docs.module.scss";

/** The Vue runtime and minerva-design/vue (one lazy chunk, loaded once) */
let runtime: Promise<
  [typeof import("vue"), typeof import("minerva-design/vue")]
> | null = null;
const loadRuntime = () =>
  (runtime ??= Promise.all([import("vue"), import("minerva-design/vue")]));

type IslandState = {
  theme: ConfigProviderThemeProps | undefined;
  palette: Palette | null | undefined;
  language: string;
};

/**
 * A Vue island inside the React docs site: mounts the demo's single-file
 * component in its own Vue app. The app is embedded (`provideEmbeddedScope`:
 * its providers never touch <html>) and wrapped in a Vue `ConfigProvider`
 * that mirrors the site's theme, palette and language — and forwards theme /
 * palette changes made by the demo (ThemeToggle...) back to the site.
 */
const VueDemo: React.FC<{ demo: VueDemoEntry }> = ({ demo }) => {
  const { t } = useTranslation();
  const config = useConfig();
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const stateRef = useRef<IslandState | null>(null);
  const latest = useRef(config);
  const settings: IslandState = {
    theme: config.theme,
    palette: config.palette,
    language: config.locale?.language ?? "en",
  };

  useEffect(() => {
    latest.current = config;
  });

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    let cancelled = false;
    let unmount: (() => void) | undefined;
    void Promise.all([loadRuntime(), demo.load()]).then(
      ([[vue, minerva], component]) => {
        if (cancelled) return;
        const state = vue.reactive({ ...settings }) as IslandState;
        stateRef.current = state;
        const app = vue.createApp({
          name: "MinervaDocsVueIsland",
          render: () =>
            vue.h(
              minerva.ConfigProvider,
              {
                theme: state.theme,
                palette: state.palette,
                locale: { language: state.language as "en" },
                onThemeChange: (theme: ConfigProviderThemeProps) =>
                  latest.current.setTheme?.(theme),
                onPaletteChange: (palette: Palette | null) =>
                  latest.current.setPalette?.(palette),
              },
              () => vue.h(component as Component),
            ),
        });
        minerva.provideEmbeddedScope(app, {
          language: () => state.language as "en",
        });
        app.config.warnHandler = (message) =>
          console.warn(`[Vue demo] ${message}`);
        const mountPoint = document.createElement("div");
        root.appendChild(mountPoint);
        app.mount(mountPoint);
        setReady(true);
        unmount = () => {
          app.unmount();
          mountPoint.remove();
        };
      },
    );
    return () => {
      cancelled = true;
      unmount?.();
      stateRef.current = null;
    };
    // settings are synced by the effect below
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [demo]);

  useEffect(() => {
    const state = stateRef.current;
    if (!state) return;
    state.theme = settings.theme;
    state.palette = settings.palette;
    state.language = settings.language;
  });

  return (
    <div className={styles.wcDemo} data-vue-demo="" aria-busy={!ready}>
      {!ready && <span className={styles.muted}>{t("doc.loading")}</span>}
      <div ref={ref} className={styles.vueMount} />
    </div>
  );
};

export default VueDemo;

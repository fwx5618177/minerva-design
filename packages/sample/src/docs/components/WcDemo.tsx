import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import type { WcDemoEntry } from "../demos";
import styles from "./docs.module.scss";

/** Registers every Minerva custom element once (lazy chunk). */
let loading: Promise<unknown> | null = null;
const loadWebComponents = () =>
  (loading ??= import("@minerva/lib-web-components"));

/**
 * Renders a Web Component demo: its HTML (real custom elements, outside of
 * React's control) and runs its optional setup script.
 */
const WcDemo: React.FC<{ demo: WcDemoEntry }> = ({ demo }) => {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void loadWebComponents().then(() => {
      if (!cancelled) setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const root = ref.current;
    if (!ready || !root) return;
    root.innerHTML = demo.html;
    const cleanup = demo.setup?.(root);
    return () => {
      if (typeof cleanup === "function") cleanup();
      root.innerHTML = "";
    };
  }, [ready, demo]);

  return (
    <div ref={ref} className={styles.wcDemo} aria-busy={!ready}>
      {!ready && <span className={styles.muted}>{t("doc.loading")}</span>}
    </div>
  );
};

export default WcDemo;

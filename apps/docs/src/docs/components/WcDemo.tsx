import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import type { WcDemoEntry } from "../demos";
import { chartEntriesOf, type ChartEntry } from "../frameworks/chartEntries";
import styles from "./docs.module.scss";

/** Registers every Minerva custom element once (lazy chunk). */
let loading: Promise<unknown> | null = null;
const loadWebComponents = () =>
  (loading ??= import("minerva-design/web-components"));

/**
 * Registers the chart elements of an optional entry (each loads its chart
 * engine: cartesian / shape charts, trading, order book, 3D, graphs).
 */
const CHART_LOADERS: Record<ChartEntry, () => Promise<unknown>> = {
  chart: () => import("minerva-design/web-components/chart"),
  "trading-chart": () => import("minerva-design/web-components/trading-chart"),
  "order-book": () => import("minerva-design/web-components/order-book"),
  "chart-3d": () => import("minerva-design/web-components/chart-3d"),
  graph: () => import("minerva-design/web-components/graph"),
  icon: () => import("minerva-design/web-components/icon"),
};
const loadingCharts = new Map<ChartEntry, Promise<unknown>>();
const loadChartElements = (entry: ChartEntry) => {
  if (!loadingCharts.has(entry))
    loadingCharts.set(entry, CHART_LOADERS[entry]());
  return loadingCharts.get(entry)!;
};

/**
 * Renders a Web Component demo: its HTML (real custom elements, outside of
 * React's control) and runs its optional setup script. Chart demos run
 * again when the site language changes (they read
 * `document.documentElement.lang` to localize their data).
 */
const WcDemo: React.FC<{ demo: WcDemoEntry }> = ({ demo }) => {
  const { t, i18n } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const charts = chartEntriesOf(demo.html).join(",");
  // chart demos localize their data: run them again in the new language
  const language = charts ? i18n.language : null;

  useEffect(() => {
    let cancelled = false;
    void Promise.all([
      loadWebComponents(),
      ...(charts ? charts.split(",") : []).map((entry) =>
        loadChartElements(entry as ChartEntry),
      ),
    ]).then(() => {
      if (!cancelled) setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, [charts]);

  useEffect(() => {
    const root = ref.current;
    if (!ready || !root) return;
    root.innerHTML = demo.html;
    const cleanup = demo.setup?.(root);
    return () => {
      if (typeof cleanup === "function") cleanup();
      root.innerHTML = "";
    };
  }, [ready, demo, language]);

  return (
    <div ref={ref} className={styles.wcDemo} aria-busy={!ready}>
      {!ready && <span className={styles.muted}>{t("doc.loading")}</span>}
    </div>
  );
};

export default WcDemo;

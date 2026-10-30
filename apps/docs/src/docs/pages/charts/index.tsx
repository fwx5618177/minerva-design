import React from "react";
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router";
import DocPage from "@/docs/components/DocPage";
import styles from "@/docs/components/docs.module.scss";
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

const ChartsDoc: React.FC = () => {
  const { t } = useTranslation();

  const intro = (
    <>
      <section className={styles.section} aria-labelledby="chart-families">
        <h2 id="chart-families">{t("docs.charts.intro.families.title")}</h2>
        <p className={styles.prose}>{t("docs.charts.intro.families.text")}</p>
        <ul className={styles.prose}>
          <li>
            <Trans
              i18nKey="docs.charts.intro.families.basic"
              components={{
                line: <Link to="/line-chart" />,
                area: <Link to="/area-chart" />,
                rangeArea: <Link to="/range-area-chart" />,
                bar: <Link to="/bar-chart" />,
                horizontalBar: <Link to="/horizontal-bar-chart" />,
                mixed: <Link to="/mixed-chart" />,
                scatter: <Link to="/scatter-chart" />,
                bubble: <Link to="/bubble-chart" />,
                sparkline: <Link to="/sparkline" />,
              }}
            />
          </li>
          <li>
            <Trans
              i18nKey="docs.charts.intro.families.statistics"
              components={{
                histogram: <Link to="/histogram-chart" />,
                boxplot: <Link to="/boxplot-chart" />,
                waterfall: <Link to="/waterfall-chart" />,
                heatmap: <Link to="/heatmap-chart" />,
                calendar: <Link to="/calendar-heatmap" />,
                gauge: <Link to="/gauge-chart" />,
                bullet: <Link to="/bullet-chart" />,
                radialBar: <Link to="/radial-bar-chart" />,
                gantt: <Link to="/gantt-chart" />,
              }}
            />
          </li>
          <li>
            <Trans
              i18nKey="docs.charts.intro.families.relations"
              components={{
                pie: <Link to="/pie-chart" />,
                radar: <Link to="/radar-chart" />,
                funnel: <Link to="/funnel-chart" />,
                quadrant: <Link to="/quadrant-chart" />,
                treemap: <Link to="/treemap-chart" />,
                sunburst: <Link to="/sunburst-chart" />,
                sankey: <Link to="/sankey-chart" />,
              }}
            />
          </li>
          <li>
            <Trans
              i18nKey="docs.charts.intro.families.finance"
              components={{
                candlestick: <Link to="/candlestick-chart" />,
                trading: <Link to="/trading-chart" />,
                indicators: <Link to="/technical-indicators" />,
                depth: <Link to="/depth-chart" />,
                orderBook: <Link to="/order-book" />,
                orderBookHeatmap: <Link to="/order-book-heatmap" />,
                timeSales: <Link to="/time-and-sales" />,
              }}
            />
          </li>
          <li>
            <Trans
              i18nKey="docs.charts.intro.families.threeD"
              components={{
                scatter: <Link to="/scatter-3d-chart" />,
                surface: <Link to="/surface-3d-chart" />,
                bar: <Link to="/bar-3d-chart" />,
              }}
            />
          </li>
        </ul>
        <p className={styles.prose}>{t("docs.charts.intro.families.lazy")}</p>
        <p className={styles.prose}>
          <Trans
            i18nKey="docs.charts.intro.families.fallback"
            components={{
              engine: <Link to="/chart-engine" />,
              performance: <Link to="/chart-performance" />,
            }}
          />
        </p>
      </section>

      <section className={styles.section} aria-labelledby="chart-rendering">
        <h2 id="chart-rendering">{t("docs.charts.intro.rendering.title")}</h2>
        <p className={styles.prose}>{t("docs.charts.intro.rendering.text")}</p>
        <ul className={styles.prose}>
          <li>{t("docs.charts.intro.rendering.background")}</li>
          <li>{t("docs.charts.intro.rendering.data")}</li>
          <li>{t("docs.charts.intro.rendering.labels")}</li>
          <li>{t("docs.charts.intro.rendering.dom")}</li>
        </ul>
      </section>

      <section className={styles.section} aria-labelledby="chart-large-data">
        <h2 id="chart-large-data">{t("docs.charts.intro.largeData.title")}</h2>
        <p className={styles.prose}>{t("docs.charts.intro.largeData.text")}</p>
      </section>

      <section className={styles.section} aria-labelledby="chart-interaction">
        <h2 id="chart-interaction">
          {t("docs.charts.intro.interaction.title")}
        </h2>
        <p className={styles.prose}>
          {t("docs.charts.intro.interaction.pointer")}
        </p>
        <p className={styles.prose}>
          {t("docs.charts.intro.interaction.keyboard")}
        </p>
      </section>

      <section className={styles.section} aria-labelledby="chart-theming">
        <h2 id="chart-theming">{t("docs.charts.intro.theming.title")}</h2>
        <p className={styles.prose}>{t("docs.charts.intro.theming.text")}</p>
        <p className={styles.prose}>{t("docs.charts.intro.theming.core")}</p>
      </section>
    </>
  );

  return <DocPage id="charts" demos={demos} intro={intro} />;
};

export default ChartsDoc;

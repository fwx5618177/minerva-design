import { useTranslation } from "react-i18next";
import type { ChartRendererPreference } from "minerva-design/charts";
import styles from "./showcase.module.scss";

export const RENDERERS: readonly ChartRendererPreference[] = [
  "auto",
  "webgpu",
  "webgl2",
  "webgl",
  "canvas2d",
];

/** Color of a frame rate */
export const fpsClass = (fps: number) =>
  fps >= 50 ? styles.good : fps >= 25 ? styles.fair : styles.poor;

/** Localized numbers, durations and backend names of the showcases */
export const useShowcaseFormat = () => {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.chart-performance.data",
  });
  const number = new Intl.NumberFormat(i18n.language);
  const compact = new Intl.NumberFormat(i18n.language, {
    notation: "compact",
    maximumFractionDigits: 1,
  });
  const decimal = new Intl.NumberFormat(i18n.language, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  return {
    count: (value: number) => number.format(Math.round(value)),
    /** 1M, 240K, 100万… */
    compact: (value: number) => compact.format(value),
    ms: (value: number) =>
      t("ms", {
        value:
          value < 100
            ? decimal.format(value)
            : number.format(Math.round(value)),
      }),
    renderer: (kind: ChartRendererPreference) => t(`renderers.${kind}`),
  };
};

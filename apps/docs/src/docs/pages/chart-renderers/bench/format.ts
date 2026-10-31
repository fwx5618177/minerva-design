import { useTranslation } from "react-i18next";
import type {
  ChartRendererKind,
  ChartRendererPreference,
} from "minerva-design/charts";
import { gradeOf } from "./score";
import styles from "./bench.module.scss";

/** Color class of a score out of 100 */
export const scoreClass = (score: number) =>
  ({
    excellent: styles.excellent,
    good: styles.good,
    fair: styles.fair,
    poor: styles.poor,
  })[gradeOf(score)];

/** Color class of a frame rate */
export const fpsClass = (fps: number) =>
  fps >= 50 ? styles.good : fps >= 25 ? styles.fair : styles.poor;

/** Localized numbers, durations and backend names of the benchmarks */
export const useBenchFormat = () => {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.chart-renderers.data",
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
  const bytes = new Intl.NumberFormat(i18n.language, {
    style: "unit",
    unit: "gigabyte",
    maximumFractionDigits: 1,
  });
  const percent = new Intl.NumberFormat(i18n.language, {
    style: "percent",
    maximumFractionDigits: 0,
  });
  return {
    count: (value: number) => number.format(Math.round(value)),
    compact: (value: number) => compact.format(value),
    decimal: (value: number) => decimal.format(value),
    ms: (value: number) =>
      t("ms", {
        value:
          value < 100
            ? decimal.format(value)
            : number.format(Math.round(value)),
      }),
    fps: (value: number) =>
      t("fps", { value: number.format(Math.round(value)) }),
    gigabytes: (value: number) => bytes.format(value / 1024 ** 3),
    percent: (value: number) => percent.format(value),
    renderer: (kind: ChartRendererPreference | ChartRendererKind) =>
      t(`renderers.${kind}`),
  };
};

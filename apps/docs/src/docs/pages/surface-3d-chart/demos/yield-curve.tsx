import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Surface3DChart, type Surface3DSeries } from "minerva-design/charts";

// maturities of the curve in months, evenly spaced on the x axis
const MATURITIES = [1, 3, 6, 12, 24, 36, 60, 84, 120, 240, 360];
const MONTHS = 24;
const START = Date.UTC(2024, 10, 1); // November 2024

/**
 * Nelson-Siegel yields: the curve starts inverted (short rates above long
 * rates) and normalizes as the central bank cuts its rate month after month
 */
const yieldAt = (month: number, maturity: number) => {
  const progress = month / (MONTHS - 1);
  const level = 4.3 + 0.25 * Math.sin(month / 3.5);
  const slope = 0.9 - 1.9 * progress; // short end minus long end
  const curvature = -0.6 + 0.4 * Math.sin(month / 5);
  const tau = 2.2;
  const years = maturity / 12;
  const f = (1 - Math.exp(-years / tau)) / (years / tau);
  return level + slope * f + curvature * (f - Math.exp(-years / tau));
};

const DATA = (() => {
  const z = new Float32Array(MONTHS * MATURITIES.length);
  for (let r = 0; r < MONTHS; r++) {
    MATURITIES.forEach((maturity, c) => {
      z[r * MATURITIES.length + c] = yieldAt(r, maturity);
    });
  }
  return { rows: MONTHS, cols: MATURITIES.length, z };
})();

const dateOf = (month: number) => {
  const date = new Date(START);
  date.setUTCMonth(date.getUTCMonth() + month);
  return date;
};

export default function YieldCurveDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.surface-3d-chart.data",
  });
  const [hovered, setHovered] = useState<{ row: number; col: number } | null>(
    null,
  );
  const formats = useMemo(
    () => ({
      month: new Intl.DateTimeFormat(i18n.language, {
        month: "short",
        year: "2-digit",
        timeZone: "UTC",
      }),
      longMonth: new Intl.DateTimeFormat(i18n.language, {
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      }),
      percent: new Intl.NumberFormat(i18n.language, {
        style: "percent",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
      months: new Intl.NumberFormat(i18n.language, {
        style: "unit",
        unit: "month",
        unitDisplay: "short",
      }),
      years: new Intl.NumberFormat(i18n.language, {
        style: "unit",
        unit: "year",
        unitDisplay: "short",
      }),
    }),
    [i18n.language],
  );
  const maturity = (index: number) => {
    const months = MATURITIES[Math.round(index)];
    if (months === undefined) return "";
    return months < 12
      ? formats.months.format(months)
      : formats.years.format(months / 12);
  };

  const series = useMemo(
    (): Surface3DSeries[] => [
      {
        name: t("treasuryYield"),
        data: DATA,
        contours: { count: 8, floor: true },
        format: (value) => formats.percent.format(value / 100),
      },
    ],
    [t, formats],
  );

  // spread between the 10-year and the 2-year yields of the hovered month
  const row = hovered?.row ?? MONTHS - 1;
  const spread =
    DATA.z[row * MATURITIES.length + MATURITIES.indexOf(120)]! -
    DATA.z[row * MATURITIES.length + MATURITIES.indexOf(24)]!;

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Surface3DChart
        series={series}
        xAxis={{
          title: t("maturity"),
          format: maturity,
          tickCount: MATURITIES.length,
          nice: false,
        }}
        yAxis={{
          title: t("month"),
          format: (value) => formats.month.format(dateOf(Math.round(value))),
          nice: false,
        }}
        zAxis={{
          title: t("yield"),
          format: (value) => formats.percent.format(value / 100),
        }}
        colorScale="spectral"
        colorBar={false}
        aspect={[1, 1.2, 0.55]}
        camera={{ azimuth: -40, elevation: 28 }}
        height={460}
        ariaLabel={t("yieldAria")}
        onHover={(event) =>
          setHovered(
            event && event.row !== undefined && event.col !== undefined
              ? { row: event.row, col: event.col }
              : null,
          )
        }
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {hovered
          ? t("yieldHover", {
              maturity: maturity(hovered.col),
              date: formats.longMonth.format(dateOf(hovered.row)),
              yield: formats.percent.format(
                DATA.z[hovered.row * MATURITIES.length + hovered.col]! / 100,
              ),
            })
          : t("yieldHint")}{" "}
        {t(spread < 0 ? "spreadInverted" : "spreadNormal", {
          date: formats.longMonth.format(dateOf(row)),
          spread: formats.percent.format(spread / 100),
        })}
      </output>
    </div>
  );
}

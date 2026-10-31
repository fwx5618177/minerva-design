import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Bar3DChart,
  type Bar3DDatum,
  type Bar3DSeries,
} from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Monthly signup cohorts from November 2025 to October 2026 and the share
// of each cohort still active n months later. Recent cohorts have fewer
// months of history (empty cells), and retain better after an onboarding
// redesign in May 2026.
const COHORTS = 12;
const FIRST = Date.UTC(2025, 10, 1);
const REDESIGN = 6;

interface Cell {
  cohort: number;
  month: number;
  retention: number | null;
}

const { CELLS, SIZES } = (() => {
  const random = mulberry32(12);
  const sizes = Array.from({ length: COHORTS }, () =>
    Math.round(900 + random() * 700),
  );
  const cells: Cell[] = [];
  for (let cohort = 0; cohort < COHORTS; cohort++) {
    const floor = cohort >= REDESIGN ? 0.34 : 0.24;
    for (let month = 0; month < COHORTS; month++) {
      const observed = month < COHORTS - cohort;
      const share =
        month === 0
          ? 1
          : floor +
            (1 - floor) * Math.exp(-month / 2.2) +
            (random() - 0.5) * 0.03;
      cells.push({ cohort, month, retention: observed ? share : null });
    }
  }
  return { CELLS: cells, SIZES: sizes };
})();

const cohortDate = (cohort: number) => {
  const date = new Date(FIRST);
  date.setUTCMonth(date.getUTCMonth() + cohort);
  return date;
};

export default function CohortRetentionDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bar-3d-chart.data",
  });
  const [picked, setPicked] = useState<Cell | null>(null);
  const formats = useMemo(
    () => ({
      cohort: new Intl.DateTimeFormat(i18n.language, {
        month: "short",
        year: "2-digit",
        timeZone: "UTC",
      }),
      longCohort: new Intl.DateTimeFormat(i18n.language, {
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      }),
      percent: new Intl.NumberFormat(i18n.language, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
      integer: new Intl.NumberFormat(i18n.language),
    }),
    [i18n.language],
  );

  const series = useMemo((): Bar3DSeries[] => {
    const data: Bar3DDatum[] = CELLS.map((cell) => ({
      x: cell.month,
      y: cell.cohort,
      z: cell.retention === null ? null : cell.retention * 100,
    }));
    return [
      {
        name: t("retention"),
        data,
        colorBy: "z",
        format: (value) => formats.percent.format(value / 100),
      },
    ];
  }, [t, formats]);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Bar3DChart
        series={series}
        xAxis={{
          title: t("monthsSinceSignup"),
          categories: Array.from({ length: COHORTS }, (_, n) =>
            t("monthIndex", { n }),
          ),
        }}
        yAxis={{
          title: t("signupCohort"),
          categories: Array.from({ length: COHORTS }, (_, n) =>
            formats.cohort.format(cohortDate(n)),
          ),
        }}
        zAxis={{
          title: t("retention"),
          min: 0,
          max: 100,
          format: (value) => formats.percent.format(value / 100),
        }}
        colorScale="viridis"
        colorBar={{
          title: t("retention"),
          format: (value) => formats.percent.format(value / 100),
        }}
        barWidth={0.75}
        camera={{ azimuth: 40, elevation: 30 }}
        height={460}
        ariaLabel={t("cohortAria")}
        onPointClick={(event) => setPicked(CELLS[event.index] ?? null)}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {picked && picked.retention !== null
          ? t("cohortReadout", {
              cohort: formats.longCohort.format(cohortDate(picked.cohort)),
              n: picked.month,
              retention: formats.percent.format(picked.retention),
              users: formats.integer.format(
                Math.round(picked.retention * SIZES[picked.cohort]!),
              ),
              total: formats.integer.format(SIZES[picked.cohort]!),
            })
          : t("cohortHint")}
      </output>
    </div>
  );
}

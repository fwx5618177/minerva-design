import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, HStack } from "minerva-design";
import { RadialBarChart, type RadialBarDatum } from "minerva-design/charts";

/** Small seeded random generator: the same upload speeds on every visit */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Files being uploaded, with their size in MB
const FILES: [key: string, size: number][] = [
  ["video", 840],
  ["photos", 420],
  ["slides", 96],
  ["backup", 1200],
];
const SEED = 3;
// at most two files are sent at the same time, in this order
const PARALLEL = 2;
const START = FILES.map(() => 0);

const legend = { toggle: false } as const;

export default function UploadsDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.radial-bar-chart.data",
  });
  const locale = i18n.language;
  const [sent, setSent] = useState(START);
  const random = useRef(mulberry32(SEED));

  const done = sent.filter((value, i) => value >= FILES[i][1]).length;
  const finished = done === FILES.length;

  useEffect(() => {
    if (finished) return;
    const timer = window.setInterval(() => {
      // 20 to 60 MB per tick for each file being sent
      const speeds = FILES.map(() => 20 + random.current() * 40);
      setSent((current) => {
        let slots = PARALLEL;
        return current.map((value, i) => {
          const size = FILES[i][1];
          if (value >= size || slots === 0) return value;
          slots--;
          return Math.min(size, value + speeds[i]);
        });
      });
    }, 400);
    return () => window.clearInterval(timer);
  }, [finished]);

  const data = useMemo(
    (): RadialBarDatum[] =>
      FILES.map(([key, size], i) => ({
        name: t(`uploads.files.${key}`),
        value: sent[i],
        max: size,
      })),
    [sent, t],
  );
  const megabytes = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "unit",
        unit: "megabyte",
        maximumFractionDigits: 0,
      }),
    [locale],
  );
  const percent = useMemo(
    () => new Intl.NumberFormat(locale, { style: "percent" }),
    [locale],
  );
  const number = useMemo(() => new Intl.NumberFormat(locale), [locale]);

  const total = FILES.reduce((sum, [, size]) => sum + size, 0);
  const uploaded = sent.reduce((sum, value) => sum + value, 0);

  const restart = () => {
    random.current = mulberry32(SEED);
    setSent(START);
  };

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadialBarChart
        data={data}
        sweep={360}
        innerRadius={0.42}
        gap={0.2}
        labels={false}
        legend={legend}
        animation={false}
        format={(value) => megabytes.format(value)}
        percentFormat={(share) => percent.format(share)}
        centerValue={percent.format(uploaded / total)}
        centerLabel={t("uploads.uploaded")}
        height={320}
        ariaLabel={t("uploads.aria")}
      />
      <HStack gap={8} wrap align="center">
        <Button size="small" variant="outline" onClick={restart}>
          {t("uploads.restart")}
        </Button>
        {/* announced when a file completes, not on every progress tick */}
        <output aria-live="polite">
          {finished
            ? t("uploads.finished", { size: megabytes.format(total) })
            : t("uploads.progress", {
                done: number.format(done),
                files: number.format(FILES.length),
              })}
        </output>
      </HStack>
    </div>
  );
}

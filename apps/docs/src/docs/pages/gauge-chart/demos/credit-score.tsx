import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { HStack, Select, SelectItem, Tag } from "minerva-design";
import { GaugeChart, type GaugeBand } from "minerva-design/charts";

type Rating = "poor" | "fair" | "good" | "veryGood" | "exceptional";

// Credit scores range from 300 to 850; five rating bands
const MIN = 300;
const MAX = 850;
const RATINGS: {
  key: Rating;
  to: number;
  color: string;
  tag: "danger" | "warning" | "info" | "success" | "primary";
}[] = [
  { key: "poor", to: 580, color: "var(--danger-color)", tag: "danger" },
  { key: "fair", to: 670, color: "var(--warning-color)", tag: "warning" },
  { key: "good", to: 740, color: "#84cc16", tag: "info" },
  { key: "veryGood", to: 800, color: "var(--success-color)", tag: "success" },
  { key: "exceptional", to: MAX, color: "#0d9488", tag: "primary" },
];
const BANDS: GaugeBand[] = RATINGS.map(({ to, color }) => ({ to, color }));
const APPLICANTS: [name: string, score: number][] = [
  ["Nora Lind", 812],
  ["Theo Martin", 724],
  ["Ada Okoye", 651],
  ["Ravi Patel", 548],
];

const ratingOf = (score: number) =>
  RATINGS.find((rating) => score < rating.to) ?? RATINGS[RATINGS.length - 1];

export default function CreditScoreDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.gauge-chart.data",
  });
  const [applicant, setApplicant] = useState(0);
  const format = useMemo(() => {
    const number = new Intl.NumberFormat(i18n.language, { useGrouping: false });
    return (value: number) => number.format(Math.round(value));
  }, [i18n.language]);

  const [name, score] = APPLICANTS[applicant];
  const rating = ratingOf(score);
  // event.percent: position of the score within the 300-850 range
  const percent = new Intl.NumberFormat(i18n.language, { style: "percent" });

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Select
        size="small"
        style={{ width: 200 }}
        aria-label={t("credit.applicant")}
        value={String(applicant)}
        onChange={(value) => setApplicant(Number(value))}
      >
        {APPLICANTS.map(([applicantName], i) => (
          <SelectItem key={applicantName} value={String(i)}>
            {applicantName}
          </SelectItem>
        ))}
      </Select>
      <GaugeChart
        value={score}
        min={MIN}
        max={MAX}
        bands={BANDS}
        needle
        thickness={0.2}
        label={t("credit.score")}
        format={format}
        renderTooltip={(event) => (
          <div style={{ display: "grid", gap: 2 }}>
            <strong>{t(`credit.ratings.${ratingOf(event.value).key}`)}</strong>
            <span>
              {t("credit.position", { share: percent.format(event.percent) })}
            </span>
          </div>
        )}
        height={260}
        ariaLabel={t("credit.aria", { name })}
      />
      <HStack gap={8} align="center" justify="center" wrap>
        <Tag color={rating.tag} variant="subtle">
          {t(`credit.ratings.${rating.key}`)}
        </Tag>
        <output aria-live="polite">
          {t("credit.result", {
            name,
            score: format(score),
            advice: t(`credit.advice.${rating.key}`),
          })}
        </output>
      </HStack>
    </div>
  );
}

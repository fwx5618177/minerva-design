import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Select, SelectItem } from "minerva-design";
import {
  RadarChart,
  type RadarIndicator,
  type RadarSeries,
} from "minerva-design/charts";

// 360° review: average rating (1-5) of each person by their peers, manager
// and reports, against the average of the team
const COMPETENCIES = [
  "communication",
  "delivery",
  "expertise",
  "collaboration",
  "mentoring",
  "initiative",
];
const TEAM = [3.8, 3.9, 3.7, 4.0, 3.4, 3.6];
const PEOPLE: { name: string; ratings: number[] }[] = [
  { name: "Amélie Laurent", ratings: [4.4, 3.7, 4.1, 4.5, 4.2, 3.5] },
  { name: "Marcus Chen", ratings: [3.3, 4.6, 4.7, 3.6, 2.9, 4.1] },
  { name: "Sade Okafor", ratings: [4.1, 4.0, 3.4, 4.3, 3.8, 4.4] },
  { name: "Jonas Romero", ratings: [3.5, 3.2, 4.4, 3.4, 3.1, 3.0] },
];

export default function Review360Demo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.radar-chart.data",
  });
  const locale = i18n.language;
  const [person, setPerson] = useState(0);

  const indicators = useMemo(
    (): RadarIndicator[] =>
      COMPETENCIES.map((key) => ({
        name: t(`review.competencies.${key}`),
        min: 1,
        max: 5,
      })),
    [t],
  );
  // the person always comes second, so their polygon animates in place
  const series = useMemo(
    (): RadarSeries[] => [
      {
        name: t("review.team"),
        values: TEAM,
        color: "var(--text-secondary-color)",
        opacity: 0.06,
      },
      {
        name: PEOPLE[person].name,
        values: PEOPLE[person].ratings,
        color: "var(--primary-color)",
        opacity: 0.25,
      },
    ],
    [person, t],
  );
  const format = useMemo(() => {
    const rating = new Intl.NumberFormat(locale, {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    });
    return (value: number) => rating.format(value);
  }, [locale]);
  const signed = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
    signDisplay: "exceptZero",
  });

  // largest positive and negative gaps to the team average
  const gaps = PEOPLE[person].ratings.map((rating, i) => rating - TEAM[i]);
  const strength = gaps.indexOf(Math.max(...gaps));
  const growth = gaps.indexOf(Math.min(...gaps));

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Select
        size="small"
        style={{ width: 220 }}
        aria-label={t("review.person")}
        value={String(person)}
        onChange={(value) => setPerson(Number(value))}
      >
        {PEOPLE.map((p, i) => (
          <SelectItem key={p.name} value={String(i)}>
            {p.name}
          </SelectItem>
        ))}
      </Select>
      <RadarChart
        indicators={indicators}
        series={series}
        levels={4}
        format={format}
        height={360}
        ariaLabel={t("review.aria", { name: PEOPLE[person].name })}
      />
      <output aria-live="polite">
        {t("review.summary", {
          strength: indicators[strength].name,
          strengthGap: signed.format(gaps[strength]),
          growth: indicators[growth].name,
          growthGap: signed.format(gaps[growth]),
        })}
      </output>
    </div>
  );
}

import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, RadioGroup } from "minerva-design";
import { SunburstChart, type TreemapNode } from "minerva-design/charts";

type Project = [key: string, activities: [string, number][]];
type Client = [key: string, projects: Project[]];

// Hours logged by a freelance studio during one week:
// client › project › activity
const WEEK: Client[] = [
  [
    "bakery",
    [
      [
        "website",
        [
          ["design", 6],
          ["development", 9],
          ["meetings", 2],
        ],
      ],
      [
        "branding",
        [
          ["design", 5],
          ["meetings", 1.5],
        ],
      ],
    ],
  ],
  [
    "clinic",
    [
      [
        "booking",
        [
          ["development", 12],
          ["review", 3],
          ["meetings", 2],
        ],
      ],
    ],
  ],
  [
    "school",
    [
      [
        "app",
        [
          ["design", 3],
          ["development", 8],
          ["review", 2],
        ],
      ],
    ],
  ],
  [
    "internal",
    [
      [
        "admin",
        [
          ["meetings", 3],
          ["support", 2],
        ],
      ],
      ["training", [["learning", 2.5]]],
    ],
  ],
];

// the month is not just 4 weeks: some clients had a busier month than others
const MONTH_FACTORS: Record<string, number> = {
  bakery: 3.6,
  clinic: 4.5,
  school: 4.2,
  internal: 3.8,
};

const PERIODS = ["week", "month"] as const;
type Period = (typeof PERIODS)[number];

/** Rounds to the nearest half hour */
const half = (hours: number) => Math.round(hours * 2) / 2;

export default function TimeTrackingDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sunburst-chart.data",
  });
  const locale = i18n.language;
  const [period, setPeriod] = useState<Period>("week");

  const { data, total, billable } = useMemo(() => {
    const hoursOf = (client: string, hours: number) =>
      period === "week" ? hours : half(hours * MONTH_FACTORS[client]);
    const data: TreemapNode[] = WEEK.map(([client, projects]) => ({
      name: t(`time.clients.${client}`),
      children: projects.map(([project, activities]) => ({
        name: t(`time.projects.${project}`),
        children: activities.map(([activity, hours]) => ({
          name: t(`time.activities.${activity}`),
          value: hoursOf(client, hours),
        })),
      })),
    }));
    const entries = WEEK.flatMap(([client, projects]) =>
      projects.flatMap(([, activities]) =>
        activities.map(
          ([, hours]) => [client, hoursOf(client, hours)] as const,
        ),
      ),
    );
    const sum = (list: (typeof entries)[number][]) =>
      list.reduce((acc, [, hours]) => acc + hours, 0);
    return {
      data,
      total: sum(entries),
      billable: sum(entries.filter(([client]) => client !== "internal")),
    };
  }, [period, t]);

  const hours = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "unit",
        unit: "hour",
        unitDisplay: "short",
        maximumFractionDigits: 1,
      }),
    [locale],
  );
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        style: "percent",
        maximumFractionDigits: 0,
      }),
    [locale],
  );

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <RadioGroup
        aria-label={t("time.period")}
        direction="horizontal"
        value={period}
        onChange={(value) => setPeriod(value as Period)}
      >
        {PERIODS.map((key) => (
          <Radio key={key} value={key} label={t(`time.periods.${key}`)} />
        ))}
      </RadioGroup>
      <SunburstChart
        data={data}
        innerRadius={0.28}
        padAngle={1}
        format={(value) => hours.format(value)}
        renderTooltip={(node) => (
          <div style={{ display: "grid", gap: 2 }}>
            <strong>{(node.path ?? [node.name]).join(" › ")}</strong>
            <span>
              {t("time.tooltip", {
                hours: hours.format(node.value),
                share: percent.format(node.value / total),
              })}
            </span>
          </div>
        )}
        height={400}
        ariaLabel={t("time.aria", { period: t(`time.periods.${period}`) })}
      />
      <output aria-live="polite">
        {t("time.summary", {
          billable: hours.format(billable),
          total: hours.format(total),
          share: percent.format(billable / total),
        })}
      </output>
    </div>
  );
}

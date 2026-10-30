import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { SunburstChart, type TreemapNode } from "minerva-design/charts";

type Unit = [key: string, headcount: number | Unit[]];

// Headcount of a 300-person company: departments, groups and teams
const ORG: Unit[] = [
  [
    "engineering",
    [
      [
        "platform",
        [
          ["infrastructure", 18],
          ["security", 9],
          ["devtools", 11],
        ],
      ],
      [
        "product",
        [
          ["web", 24],
          ["mobile", 16],
          ["payments", 12],
        ],
      ],
      [
        "data",
        [
          ["analytics", 10],
          ["ml", 8],
        ],
      ],
    ],
  ],
  [
    "sales",
    [
      ["emea", 22],
      ["americas", 31],
      ["apac", 14],
    ],
  ],
  [
    "success",
    [
      ["support", 26],
      ["onboarding", 9],
    ],
  ],
  [
    "marketing",
    [
      ["brand", 7],
      ["growth", 12],
      ["content", 6],
    ],
  ],
  [
    "operations",
    [
      ["finance", 8],
      ["people", 7],
      ["legal", 4],
      ["it", 6],
    ],
  ],
];

export default function OrgDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.sunburst-chart.data",
  });

  const data = useMemo(() => {
    const convert = (units: Unit[]): TreemapNode[] =>
      units.map(([key, size]) =>
        typeof size === "number"
          ? { name: t(`org.${key}`), value: size }
          : { name: t(`org.${key}`), children: convert(size) },
      );
    return convert(ORG);
  }, [t]);
  const format = useMemo(() => (value: number) => t("people", { value }), [t]);

  return (
    <SunburstChart
      data={data}
      levels={2}
      labels="radial"
      innerRadius={0.3}
      format={format}
      height={400}
      ariaLabel={t("orgAria")}
    />
  );
}

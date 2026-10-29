import {
  AreaChart,
  formatCompact,
  type ChartSeries,
} from "minerva-design/charts";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// Monthly visits by traffic source
const sources = {
  Organic: [
    42_000, 44_500, 47_800, 46_900, 51_200, 54_000, 52_300, 55_800, 60_100,
    63_400, 66_200, 70_500,
  ],
  Direct: [
    21_000, 21_800, 22_400, 23_900, 24_100, 25_600, 26_000, 25_200, 27_300,
    28_800, 29_500, 31_200,
  ],
  Referral: [
    9_800, 10_400, 12_900, 11_700, 12_300, 14_800, 13_900, 14_200, 15_600,
    17_400, 16_900, 18_300,
  ],
  Social: [
    6_200, 7_900, 7_100, 8_800, 11_400, 10_200, 9_600, 12_700, 13_100, 12_400,
    15_800, 17_900,
  ],
};

const series: ChartSeries[] = Object.entries(sources).map(([name, values]) => ({
  name,
  data: months.map((month, i) => [month, values[i]] as const),
}));

export default function StackedDemo() {
  return (
    <AreaChart
      series={series}
      stacked
      yAxis={{ format: (value) => formatCompact(value) }}
      height={300}
      ariaLabel="Monthly visits by traffic source, stacked"
    />
  );
}

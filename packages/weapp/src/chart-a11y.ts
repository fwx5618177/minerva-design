// Accessible names of the charts, in their locale ("Chart: A, B", "饼图")

import {
  describeChart,
  describeShapeChart as describeShapeType,
  type ChartOptions,
  type ShapeChartOptions,
} from "@minerva/charts/canvas";

/** Language of the page or the system, when the runtime has one (H5) */
export const systemLocale = (): string | undefined => {
  const g = globalThis as {
    document?: { documentElement?: { lang?: string } };
    navigator?: { language?: string };
  };
  return g.document?.documentElement?.lang || g.navigator?.language;
};

/** Names of the entries of a list (strings or `{ name }`), unnamed ones skipped */
const namesOf = (list: readonly unknown[]): { name: string }[] => {
  const out: { name: string }[] = [];
  for (const entry of list) {
    const name =
      typeof entry === "string"
        ? entry
        : (entry as { name?: unknown } | null)?.name;
    if (typeof name === "string" && name) out.push({ name });
  }
  return out;
};

/** Default accessible name of a cartesian chart: its series */
export const describeCartesianChart = (o: ChartOptions): string =>
  o.ariaLabel ??
  describeChart({
    locale: o.locale ?? systemLocale(),
    series: namesOf(o.series),
    labels: o.labels,
  });

/** Default accessible name of a shape chart: its type, in its locale ("Pie chart", "弦图") */
export const describeShapeChart = (o: ShapeChartOptions): string =>
  o.ariaLabel ??
  describeShapeType({ ...o, locale: o.locale ?? systemLocale() });

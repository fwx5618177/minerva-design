import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "minerva-design";
import { Sparkline, type ChartHoverEvent } from "minerva-design/charts";

// Average daily high (°C) of each month, January first
const cities = {
  reykjavik: [3, 3, 4, 6, 10, 12, 14, 14, 11, 7, 4, 3],
  montreal: [-5, -3, 2, 11, 19, 24, 26, 25, 20, 13, 6, -2],
  tokyo: [10, 10, 14, 19, 23, 26, 30, 31, 27, 22, 17, 12],
  cairo: [19, 21, 24, 28, 32, 34, 35, 35, 33, 30, 25, 21],
  singapore: [31, 32, 32, 32, 32, 31, 31, 31, 31, 31, 31, 30],
  sydney: [26, 26, 25, 23, 20, 18, 17, 18, 20, 22, 24, 25],
} as const;
type City = keyof typeof cities;

export default function WeatherDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sparkline.data",
  });
  const locale = i18n.language;

  const celsius = useMemo(() => {
    const format = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "celsius",
      maximumFractionDigits: 0,
    });
    return (value: number) => format.format(value);
  }, [locale]);
  const months = useMemo(() => {
    const short = new Intl.DateTimeFormat(locale, {
      month: "short",
      timeZone: "UTC",
    });
    const long = new Intl.DateTimeFormat(locale, {
      month: "long",
      timeZone: "UTC",
    });
    return Array.from({ length: 12 }, (_, m) => ({
      short: short.format(Date.UTC(2026, m, 1)),
      long: long.format(Date.UTC(2026, m, 1)),
    }));
  }, [locale]);

  // the hovered month by name instead of its index
  const tooltip = (event: ChartHoverEvent) => {
    const item = event.items[0];
    if (!item) return null;
    return (
      <span>
        {months[item.index]?.long}: <strong>{celsius(item.y)}</strong>
      </span>
    );
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
        gap: 12,
        width: "100%",
      }}
    >
      {(Object.keys(cities) as City[]).map((city, i) => {
        const values: readonly number[] = cities[city];
        const max = Math.max(...values);
        const min = Math.min(...values);
        const name = t(`cities.${city}`);
        return (
          <Card key={city} padding="medium">
            <CardHeader>
              <CardTitle>{name}</CardTitle>
              <CardDescription>
                {t("warmestColdest", {
                  max: celsius(max),
                  maxMonth: months[values.indexOf(max)]?.short,
                  min: celsius(min),
                  minMonth: months[values.indexOf(min)]?.short,
                })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* every sparkline is scaled to its own range: compare the
                  shapes, and read the levels in the text above */}
              <Sparkline
                data={values}
                type="area"
                color={`var(--chart-series-${(i % 6) + 1})`}
                // freezing point, when the city goes below it
                reference={min < 0 ? 0 : undefined}
                renderTooltip={tooltip}
                height={48}
                ariaLabel={t("weatherAria", { city: name })}
              />
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

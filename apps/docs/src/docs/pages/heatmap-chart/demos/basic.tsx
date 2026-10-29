import { useMemo } from "react";
import { HeatmapChart, type HeatmapCell } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const hours = Array.from({ length: 24 }, (_, h) => `${h}:00`);

const bump = (hour: number, center: number, width: number) =>
  Math.exp(-((hour - center) ** 2) / (2 * width ** 2));

export default function BasicDemo() {
  const data = useMemo((): HeatmapCell[] => {
    const random = mulberry32(24);
    return days.flatMap((day, d) => {
      const weekend = d >= 5;
      return hours.map((hour, h) => {
        // office hours with a lunch dip on weekdays, late mornings at weekends
        const activity = weekend
          ? 0.55 * bump(h, 13, 4) + 0.3 * bump(h, 21, 2)
          : bump(h, 10.5, 1.8) +
            0.9 * bump(h, 15, 2) -
            0.25 * bump(h, 12.5, 0.8) +
            0.35 * bump(h, 21, 1.5);
        const value = Math.max(0, activity) * 1200 + 40 + random() * 90;
        return { x: hour, y: day, value: Math.round(value) };
      });
    });
  }, []);

  return (
    <HeatmapChart
      data={data}
      xCategories={hours}
      // rows go from bottom to top: reverse them to read Monday first
      yCategories={[...days].reverse()}
      name="Sessions"
      format={(value) => value.toLocaleString("en")}
      height={280}
      ariaLabel="Sessions by weekday and hour of the day"
    />
  );
}

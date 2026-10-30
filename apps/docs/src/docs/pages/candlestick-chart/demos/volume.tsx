import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  BarChart,
  CandlestickChart,
  type ChartHandle,
  type ChartHoverEvent,
  type ChartPointDatum,
  type ChartSeries,
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

const DAY = 24 * 60 * 60 * 1000;

// 90 trading days of prices and volumes (weekends skipped)
const random = mulberry32(19);
const days: {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}[] = [];
let last = 48;
for (let t = Date.UTC(2026, 5, 1); days.length < 90; t += DAY) {
  if (new Date(t).getUTCDay() % 6 === 0) continue;
  const open = last * (1 + (random() - 0.5) * 0.01);
  const move = (random() + random() - 1) * 0.04;
  const close = open * (1 + move);
  const high = Math.max(open, close) * (1 + random() * 0.015);
  const low = Math.min(open, close) * (1 - random() * 0.015);
  // big moves come with big volumes
  const volume = Math.round(2e6 * (0.6 + random() * 0.6 + Math.abs(move) * 25));
  days.push({ time: t, open, high, low, close, volume });
  last = close;
}

export default function VolumeDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.candlestick-chart.data",
  });
  const locale = i18n.language;
  const prices = useRef<ChartHandle>(null);
  const volumes = useRef<ChartHandle>(null);

  const { candles, bars } = useMemo(() => {
    const date = new Intl.DateTimeFormat(locale, {
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    });
    const candles: ChartSeries[] = [
      {
        name: "ORBT",
        data: days.map((day): ChartPointDatum => ({
          x: date.format(day.time),
          open: day.open,
          high: day.high,
          low: day.low,
          y: day.close,
        })),
      },
    ];
    // each volume bar takes the color of its candle
    const bars: ChartSeries[] = [
      {
        name: t("volume"),
        data: days.map((day) => ({
          x: date.format(day.time),
          y: day.volume,
          color:
            day.close >= day.open
              ? "var(--success-color)"
              : "var(--danger-color)",
        })),
      },
    ];
    return { candles, bars };
  }, [t, locale]);
  const usd = useMemo(
    () => new Intl.NumberFormat(locale, { style: "currency", currency: "USD" }),
    [locale],
  );
  const compact = useMemo(
    () => new Intl.NumberFormat(locale, { notation: "compact" }),
    [locale],
  );

  // OHLC tooltip in the reader's language
  const tooltip = (event: ChartHoverEvent) => {
    const rows: [string, string][] = [];
    for (const item of event.items) {
      if (item.open !== undefined) {
        rows.push(
          [t("open"), usd.format(item.open)],
          [t("high"), usd.format(item.high ?? item.y)],
          [t("low"), usd.format(item.low ?? item.y)],
          [t("close"), usd.format(item.y)],
        );
      } else {
        rows.push([item.seriesName, usd.format(item.y)]);
      }
    }
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto",
          gap: "2px 12px",
        }}
      >
        <strong style={{ gridColumn: "1 / -1" }}>{event.xLabel}</strong>
        {rows.map(([label, value]) => (
          <span key={label} style={{ display: "contents" }}>
            <span>{label}</span>
            <span style={{ textAlign: "end" }}>{value}</span>
          </span>
        ))}
      </div>
    );
  };

  // The tick labels of the two y axes have different widths: pad the narrower
  // one so the plot areas (and the candles over their bars) line up
  const [shift, setShift] = useState({ prices: 0, volumes: 0 });
  useEffect(() => {
    const top = prices.current?.getInstance();
    const bottom = volumes.current?.getInstance();
    if (!top || !bottom) return;
    const align = () => {
      const a = top.getPlotRect();
      const b = bottom.getPlotRect();
      if (!a || !b) return;
      setShift((current) => {
        // where each plot would start without the extra padding
        const naturalTop = a.x - current.prices;
        const naturalBottom = b.x - current.volumes;
        const start = Math.max(naturalTop, naturalBottom);
        const next = {
          prices: start - naturalTop,
          volumes: start - naturalBottom,
        };
        return next.prices === current.prices &&
          next.volumes === current.volumes
          ? current
          : next;
      });
    };
    const offs = [top.on("layout", align), bottom.on("layout", align)];
    align();
    return () => offs.forEach((off) => off());
  }, []);

  return (
    <div style={{ display: "grid", gap: 0, width: "100%" }}>
      <CandlestickChart
        ref={prices}
        series={candles}
        yAxis={{ format: (value) => usd.format(value) }}
        xAxis={{ visible: false }}
        renderTooltip={tooltip}
        // both charts share the same categories: zooming one moves the other
        onZoom={(view) => volumes.current?.setView({ x: view.x })}
        legend={false}
        padding={{ left: 4 + shift.prices }}
        height={260}
        ariaLabel={t("pricesAria")}
      />
      <BarChart
        ref={volumes}
        series={bars}
        yAxis={{ format: (value) => compact.format(value), tickCount: 2 }}
        onZoom={(view) => prices.current?.setView({ x: view.x })}
        legend={false}
        padding={{ left: 4 + shift.volumes }}
        height={120}
        ariaLabel={t("volumeAria")}
      />
    </div>
  );
}

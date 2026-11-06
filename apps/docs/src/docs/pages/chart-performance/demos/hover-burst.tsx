import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "minerva-design";
import { createChart, type ChartInstance } from "minerva-design/charts/core";

interface Measurement {
  moves: number;
  hitNotifications: number;
  tooltipRenders: number;
  elapsed: number;
  lastPoint: number | null;
}

export default function HoverBurstDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.chart-performance.hoverBurst",
  });
  const host = useRef<HTMLDivElement>(null);
  const chart = useRef<ChartInstance | null>(null);
  const active = useRef<Measurement | null>(null);
  const frame = useRef(0);
  const [ready, setReady] = useState(false);
  const [result, setResult] = useState<Measurement | null>(null);

  useEffect(() => {
    const instance = createChart(host.current!, {
      renderer: "canvas2d",
      ariaLabel: t("aria"),
      xAxis: { min: 0, max: 10 },
      yAxis: { min: 0, max: 10 },
      series: [
        {
          type: "scatter",
          data: [
            { x: 2, y: 2 },
            { x: 8, y: 8 },
          ],
        },
      ],
      tooltip: {
        render(event) {
          if (active.current) active.current.tooltipRenders++;
          return String((event.items[0]?.index ?? 0) + 1);
        },
      },
    });
    chart.current = instance;
    instance.on("hover", (event) => {
      if (!active.current || !event) return;
      active.current.hitNotifications++;
      active.current.lastPoint = (event.items[0]?.index ?? 0) + 1;
    });
    void instance.ready.then(() => {
      if (chart.current !== instance) return;
      frame.current = requestAnimationFrame(() => {
        if (chart.current === instance) setReady(true);
      });
    });
    return () => {
      cancelAnimationFrame(frame.current);
      active.current = null;
      chart.current = null;
      instance.destroy();
    };
  }, [t]);

  const run = () => {
    const instance = chart.current;
    const stage = host.current?.querySelector<HTMLElement>(
      ".minerva-chart-stage",
    );
    if (!instance || !stage || !ready) return;
    // Clear prior hover so repeated runs measure the same work.
    stage.dispatchEvent(new PointerEvent("pointerleave"));
    const rect = stage.getBoundingClientRect();
    const points = [instance.toPixel(2, 2), instance.toPixel(8, 8)];
    if (points.some((point) => !point)) return;
    const measurement: Measurement = {
      moves: 240,
      hitNotifications: 0,
      tooltipRenders: 0,
      elapsed: 0,
      lastPoint: null,
    };
    active.current = measurement;
    setResult(null);
    setReady(false);
    const start = performance.now();
    for (let i = 0; i < measurement.moves; i++) {
      const point = points[i % 2]!;
      stage.dispatchEvent(
        new PointerEvent("pointermove", {
          bubbles: true,
          pointerId: 1,
          clientX: rect.left + point.x,
          clientY: rect.top + point.y,
        }),
      );
    }
    frame.current = requestAnimationFrame(() => {
      measurement.elapsed = performance.now() - start;
      active.current = null;
      setResult({ ...measurement });
      setReady(true);
    });
  };

  return (
    <div data-testid="chart-hover-burst">
      <p>{t("description")}</p>
      <div ref={host} style={{ width: "100%", height: 280 }} />
      <Button
        data-testid="chart-hover-burst-run"
        disabled={!ready}
        onClick={run}
      >
        {t("run")}
      </Button>
      {result && (
        <output
          data-testid="chart-hover-burst-result"
          data-moves={result.moves}
          data-hit-notifications={result.hitNotifications}
          data-tooltip-renders={result.tooltipRenders}
          data-elapsed={result.elapsed}
          data-last-point={result.lastPoint ?? ""}
          aria-live="polite"
        >
          <dl>
            <dt>{t("moves")}</dt>
            <dd>{result.moves}</dd>
            <dt>{t("hitNotifications")}</dt>
            <dd>{result.hitNotifications}</dd>
            <dt>{t("tooltipRenders")}</dt>
            <dd>{result.tooltipRenders}</dd>
            <dt>{t("elapsed")}</dt>
            <dd>{result.elapsed.toFixed(2)} ms</dd>
            <dt>{t("lastPoint")}</dt>
            <dd>{result.lastPoint}</dd>
          </dl>
        </output>
      )}
    </div>
  );
}

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
import {
  GaugeChart,
  type GaugeBand,
  type ShapeChartHandle,
} from "minerva-design/charts";

// a dark control-room theme, read by the charts from these variables
const DARK = {
  "--background-color": "#0b1020",
  "--surface-color": "#0b1020",
  "--text-color": "#e2e8f0",
  "--text-secondary-color": "#8a94ad",
  "--border-color": "#1f2a44",
  background: "#0b1020",
  color: "#e2e8f0",
} as CSSProperties;
const PANEL: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
  gap: 16,
  padding: 12,
  borderRadius: 12,
  border: "1px solid var(--border-color)",
  width: "100%",
  boxSizing: "border-box",
};

// Live readings of a wind turbine
const GAUGES: {
  key: "rotor" | "power" | "nacelle";
  value: number;
  max: number;
  bands: GaugeBand[];
}[] = [
  {
    key: "rotor",
    value: 14.2,
    max: 20,
    bands: [
      { to: 16, color: "#22d3ee" },
      { to: 20, color: "#f472b6" },
    ],
  },
  {
    key: "power",
    value: 3.1,
    max: 4.2,
    bands: [{ to: 4.2, color: "#34d399" }],
  },
  {
    key: "nacelle",
    value: 58,
    max: 90,
    bands: [
      { to: 60, color: "#34d399" },
      { to: 75, color: "#facc15" },
      { to: 90, color: "#fb7185" },
    ],
  },
];

export default function DarkPanelDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.gauge-chart.data",
  });
  const locale = i18n.language;
  const [dark, setDark] = useState(true);
  const charts = useRef<(ShapeChartHandle | null)[]>([]);

  // the charts watch <html> and <body> only: after restyling their
  // container, ask them to read the CSS variables again
  useEffect(() => {
    charts.current.forEach((chart) => chart?.getInstance()?.refreshTheme());
  }, [dark]);

  const formats = useMemo(() => {
    const decimal = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 });
    const celsius = new Intl.NumberFormat(locale, {
      style: "unit",
      unit: "celsius",
      maximumFractionDigits: 0,
    });
    return {
      rotor: (value: number) =>
        t("turbine.rpm", { value: decimal.format(value) }),
      power: (value: number) =>
        t("turbine.mw", { value: decimal.format(value) }),
      nacelle: (value: number) => celsius.format(value),
    };
  }, [locale, t]);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Switch checked={dark} onChange={setDark} label={t("turbine.dark")} />
      <div style={dark ? { ...PANEL, ...DARK } : PANEL}>
        {GAUGES.map((gauge, i) => (
          <GaugeChart
            key={gauge.key}
            ref={(handle) => {
              charts.current[i] = handle;
            }}
            value={gauge.value}
            max={gauge.max}
            bands={gauge.bands}
            thickness={0.1}
            needle
            label={t(`turbine.${gauge.key}`)}
            format={formats[gauge.key]}
            renderTooltip={(event) => (
              <span>
                {t(`turbine.${gauge.key}`)} · {formats[gauge.key](event.value)}
              </span>
            )}
            height={200}
            ariaLabel={t("turbine.aria", {
              reading: t(`turbine.${gauge.key}`),
              value: formats[gauge.key](gauge.value),
            })}
          />
        ))}
      </div>
    </div>
  );
}

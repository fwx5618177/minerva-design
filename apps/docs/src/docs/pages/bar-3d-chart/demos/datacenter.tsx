import { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, ConfigProvider, HStack, Switch } from "minerva-design";
import {
  Bar3DChart,
  type Bar3DDatum,
  type Bar3DSeries,
  type Chart3DHandle,
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

// A server room of 6 rows × 10 racks: the bar height is the power draw,
// the color the inlet temperature. The cooling units stand at rack 1, so the
// far end of the room runs warmer, worst where dense GPU racks sit.
const ROWS = ["A", "B", "C", "D", "E", "F"];
const RACKS = 10;
const MAX_INLET = 27; // °C, upper end of the recommended inlet range

interface Rack {
  name: string;
  power: number; // kW
  inlet: number; // °C
}

const RACK_LIST: Rack[] = (() => {
  const random = mulberry32(77);
  return ROWS.flatMap((row, r) =>
    Array.from({ length: RACKS }, (_, c) => {
      const gpu = (r === 2 || r === 3) && c >= 6;
      const power = gpu ? 11 + random() * 4 : 3 + random() * 5;
      const inlet =
        18 + c * 0.75 + (power - 3) * 0.35 + (r === 0 ? 1 : 0) + random();
      return {
        name: `${row}${String(c + 1).padStart(2, "0")}`,
        power: Math.round(power * 10) / 10,
        inlet: Math.round(inlet * 10) / 10,
      };
    }),
  );
})();

export default function DatacenterDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.bar-3d-chart.data",
  });
  const ref = useRef<Chart3DHandle>(null);
  const [dark, setDark] = useState(true);
  const [topView, setTopView] = useState(false);
  const [picked, setPicked] = useState<Rack | null>(null);
  const formats = useMemo(() => {
    const decimal = new Intl.NumberFormat(i18n.language, {
      maximumFractionDigits: 1,
    });
    return {
      // kilowatts are not an Intl unit: a translated template
      kw: {
        format: (value: number) => t("kw", { value: decimal.format(value) }),
      },
      celsius: new Intl.NumberFormat(i18n.language, {
        style: "unit",
        unit: "celsius",
        maximumFractionDigits: 1,
      }),
    };
  }, [t, i18n.language]);

  const series = useMemo((): Bar3DSeries[] => {
    const data: Bar3DDatum[] = RACK_LIST.map((rack, i) => ({
      x: i % RACKS,
      y: Math.floor(i / RACKS),
      z: rack.power,
      value: rack.inlet,
      label: rack.name,
    }));
    return [
      {
        name: t("inletTemperature"),
        data,
        colorBy: "value",
        format: (value) => formats.celsius.format(value),
      },
    ];
  }, [t, formats]);
  const hot = RACK_LIST.filter((rack) => rack.inlet > MAX_INLET);

  const switchView = () => {
    if (topView) ref.current?.resetCamera();
    else
      ref.current?.setCamera({
        azimuth: 0,
        elevation: 89,
        zoom: 1,
        pan: [0, 0],
        projection: "orthographic",
      });
    setTopView(!topView);
  };

  return (
    <ConfigProvider theme={dark ? "dark" : "light"}>
      <div
        style={{
          display: "grid",
          gap: 12,
          width: "100%",
          padding: 12,
          borderRadius: 8,
          border: "1px solid var(--border-color)",
          background: "var(--background-color)",
          color: "var(--text-color)",
        }}
      >
        <HStack gap={16} wrap align="center">
          <Switch
            size="small"
            checked={dark}
            label={t("darkTheme")}
            onChange={(value) => {
              setDark(value);
              // the chart is created again with the camera of its props
              setTopView(false);
            }}
          />
          <Button
            size="small"
            variant="outline"
            color="neutral"
            onClick={switchView}
          >
            {topView ? t("perspectiveView") : t("topView")}
          </Button>
        </HStack>
        <Bar3DChart
          // the chart reads the theme of its scope when it is created
          key={dark ? "dark" : "light"}
          ref={ref}
          series={series}
          xAxis={{
            title: t("rackPosition"),
            categories: Array.from({ length: RACKS }, (_, n) => String(n + 1)),
          }}
          yAxis={{
            title: t("rackRow"),
            categories: ROWS.map((id) => t("rowLabel", { id })),
          }}
          zAxis={{
            title: t("powerDraw"),
            format: (value) => formats.kw.format(value),
          }}
          colorScale="inferno"
          valueRange={[18, 32]}
          colorBar={{
            title: t("inletTemperature"),
            format: (value) => formats.celsius.format(value),
          }}
          barWidth={0.8}
          camera={{ azimuth: 30, elevation: 32 }}
          height={440}
          ariaLabel={t("datacenterAria")}
          onPointClick={(event) => setPicked(RACK_LIST[event.index] ?? null)}
          onCameraChange={(camera) =>
            setTopView(
              camera.projection === "orthographic" && camera.elevation > 80,
            )
          }
        />
        <output
          aria-live="polite"
          style={{ color: "var(--text-secondary-color)" }}
        >
          {picked
            ? t(picked.inlet > MAX_INLET ? "rackHot" : "rackOk", {
                rack: picked.name,
                power: formats.kw.format(picked.power),
                inlet: formats.celsius.format(picked.inlet),
                limit: formats.celsius.format(MAX_INLET),
              })
            : t("datacenterSummary", {
                hot: hot.length,
                total: RACK_LIST.length,
                limit: formats.celsius.format(MAX_INLET),
                racks: new Intl.ListFormat(i18n.language).format(
                  hot.map((rack) => rack.name),
                ),
              })}
        </output>
      </div>
    </ConfigProvider>
  );
}

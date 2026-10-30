import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Scatter3DChart, type Scatter3DSeries } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// 300 sensors in a 40 × 24 × 9 m warehouse: warmer under the roof and
// around a heater; the dot size shows the relative humidity
const COUNT = 300;
const random = mulberry32(5);
const x = new Float64Array(COUNT);
const y = new Float64Array(COUNT);
const z = new Float64Array(COUNT);
const temperature = new Float64Array(COUNT);
const size = new Float64Array(COUNT);
const humidity: number[] = [];
for (let i = 0; i < COUNT; i++) {
  x[i] = Math.round(random() * 400) / 10;
  y[i] = Math.round(random() * 240) / 10;
  z[i] = Math.round((0.5 + random() * 8.5) * 10) / 10;
  const heater = Math.hypot(x[i]! - 30, y[i]! - 6, z[i]! - 1.5);
  temperature[i] =
    Math.round(
      (14 + z[i]! * 0.9 + 9 * Math.exp(-(heater * heater) / 60) + random()) *
        10,
    ) / 10;
  const rh = Math.round(70 - temperature[i]! * 1.2 + random() * 8);
  humidity.push(rh);
  size[i] = 4 + (rh - 35) / 4;
}

export default function ColorByValueDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.scatter-3d-chart.data",
  });

  const series = useMemo((): Scatter3DSeries[] => {
    const label = humidity.map((rh, i) =>
      t("sensorLabel", { id: i + 1, humidity: rh }),
    );
    return [
      {
        name: t("sensors"),
        data: { x, y, z, value: temperature, size, label },
        colorBy: "value",
        format: (value) => t("celsius", { value }),
      },
    ];
  }, [t]);

  return (
    <Scatter3DChart
      series={series}
      aspect={[40, 24, 9]}
      xAxis={{ title: t("lengthM") }}
      yAxis={{ title: t("widthM") }}
      zAxis={{ title: t("heightM") }}
      colorScale="coolwarm"
      colorBar={{
        title: t("temperature"),
        format: (value) => t("celsius", { value }),
      }}
      camera={{ azimuth: 25, elevation: 28 }}
      height={420}
      ariaLabel={t("sensorsAria")}
    />
  );
}

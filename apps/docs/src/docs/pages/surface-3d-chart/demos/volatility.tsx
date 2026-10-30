import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Surface3DChart, type Surface3DSeries } from "minerva-design/charts";

// Implied volatility of index options by strike (moneyness, % of spot) and
// time to expiry: a smile that is steepest for short expiries (skew towards
// low strikes) and a term structure rising from 16% to 21%
const STRIKES = Array.from({ length: 33 }, (_, i) => 60 + i * 2.5);
const EXPIRIES = [7, 14, 30, 60, 90, 120, 180, 270, 365, 540, 730];
const vol = new Float32Array(STRIKES.length * EXPIRIES.length);
EXPIRIES.forEach((days, r) => {
  const years = days / 365;
  const atm = 21 - 5 * Math.exp(-years * 1.4);
  const skew = -12 / Math.sqrt(years + 0.25);
  const smile = 25 / Math.sqrt(years + 0.25);
  STRIKES.forEach((strike, c) => {
    const k = Math.log(strike / 100);
    vol[r * STRIKES.length + c] = atm + skew * k + smile * k * k;
  });
});
const surface = {
  rows: EXPIRIES.length,
  cols: STRIKES.length,
  x: STRIKES,
  y: EXPIRIES,
  z: vol,
};

export default function VolatilityDemo() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.surface-3d-chart.data",
  });
  const series = useMemo(
    (): Surface3DSeries[] => [
      {
        name: t("impliedVol"),
        data: surface,
        wireframe: { width: 0.75 },
      },
    ],
    [t],
  );
  const percent = (value: number) => t("percent", { value: value.toFixed(1) });

  return (
    <Surface3DChart
      series={series}
      colorScale="spectral"
      xAxis={{
        title: t("strike"),
        format: (value) => t("percent", { value: Math.round(value) }),
      }}
      yAxis={{
        title: t("expiry"),
        format: (value) => t("days", { value: Math.round(value) }),
      }}
      zAxis={{ title: t("impliedVol"), format: percent }}
      colorBar={{ format: (value) => t("percent", { value }) }}
      camera={{ azimuth: -28, elevation: 24 }}
      height={440}
      ariaLabel={t("volatilityAria")}
    />
  );
}

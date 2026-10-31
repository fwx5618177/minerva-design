import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "minerva-design";
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

type Sector =
  "technology" | "healthcare" | "energy" | "financials" | "consumer";

// fictional tickers, with the typical volatility, beta and return of the sector
const SECTORS: [Sector, string[], number, number, number][] = [
  [
    "technology",
    ["NOVA", "QBIT", "LUMN", "SYNK", "DATA", "CHIP", "CLDX", "ORBI"],
    0.34,
    1.3,
    0.16,
  ],
  [
    "healthcare",
    ["GENE", "MEDX", "CURA", "VITL", "BIOM", "PULS", "THRX", "NEUR"],
    0.26,
    0.8,
    0.09,
  ],
  [
    "energy",
    ["PETR", "SOLR", "WNDY", "GRID", "FUEL", "HYDR", "VOLT", "CRUD"],
    0.31,
    1.0,
    0.07,
  ],
  [
    "financials",
    ["BANK", "LEND", "PAYX", "INSR", "FUND", "COIN", "TRST", "BRKR"],
    0.24,
    1.1,
    0.1,
  ],
  [
    "consumer",
    ["SHOP", "MEAL", "WEAR", "HOME", "PETS", "TOYS", "BREW", "TRVL"],
    0.21,
    0.9,
    0.08,
  ],
];
const RISK_FREE = 0.035;

interface Stock {
  ticker: string;
  sector: Sector;
  volatility: number;
  beta: number;
  ret: number;
  cap: number; // market capitalization, USD
}

const STOCKS: Stock[] = (() => {
  const random = mulberry32(2024);
  return SECTORS.flatMap(([sector, tickers, vol, beta, ret]) =>
    tickers.map((ticker) => {
      const volatility = vol * (0.7 + random() * 0.6);
      return {
        ticker,
        sector,
        volatility,
        beta: Math.round(beta * (0.7 + random() * 0.6) * 100) / 100,
        // riskier names of a sector earn a little more on average
        ret: ret + (volatility - vol) * 0.4 + (random() - 0.5) * 0.08,
        cap: 10 ** (9.5 + random() * 2.7),
      };
    }),
  );
})();

export default function PortfolioRiskDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.scatter-3d-chart.data",
  });
  const [pinned, setPinned] = useState<string | null>("NOVA");
  const [orthographic, setOrthographic] = useState(false);
  const formats = useMemo(
    () => ({
      percent: new Intl.NumberFormat(i18n.language, {
        style: "percent",
        maximumFractionDigits: 1,
      }),
      cap: new Intl.NumberFormat(i18n.language, {
        style: "currency",
        currency: "USD",
        notation: "compact",
        maximumFractionDigits: 1,
      }),
      decimal: new Intl.NumberFormat(i18n.language, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    }),
    [i18n.language],
  );

  const series = useMemo(
    (): Scatter3DSeries[] =>
      SECTORS.map(([sector]) => ({
        id: sector,
        name: t(`sectors.${sector}`),
        data: STOCKS.filter((stock) => stock.sector === sector).map(
          (stock) => ({
            x: stock.volatility,
            y: stock.beta,
            z: stock.ret,
            // dot size follows the market capitalization (log scale)
            size:
              (5 + Math.log10(stock.cap / 1e9) * 5) *
              (stock.ticker === pinned ? 1.6 : 1),
            label: t("stockLabel", {
              ticker: stock.ticker,
              cap: formats.cap.format(stock.cap),
            }),
          }),
        ),
        opacity: 0.85,
      })),
    [t, formats, pinned],
  );

  const stock = STOCKS.find((item) => item.ticker === pinned);
  const percentAxis = (title: string) => ({
    title,
    format: (value: number) => formats.percent.format(value),
  });

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <Switch
        size="small"
        checked={orthographic}
        label={t("orthographicView")}
        onChange={setOrthographic}
      />
      <Scatter3DChart
        series={series}
        xAxis={percentAxis(t("annualVolatility"))}
        yAxis={{ title: t("beta") }}
        zAxis={percentAxis(t("annualReturn"))}
        camera={{
          azimuth: 28,
          elevation: 20,
          projection: orthographic ? "orthographic" : "perspective",
        }}
        height={460}
        ariaLabel={t("portfolioAria")}
        onPointClick={(event) => {
          const sector = SECTORS.findIndex(([id]) => id === event.seriesId);
          const ticker = SECTORS[sector]?.[1][event.index];
          setPinned(ticker === pinned ? null : (ticker ?? null));
        }}
      />
      <output
        aria-live="polite"
        style={{ color: "var(--text-secondary-color)" }}
      >
        {stock
          ? t("stockReadout", {
              ticker: stock.ticker,
              sector: t(`sectors.${stock.sector}`),
              ret: formats.percent.format(stock.ret),
              volatility: formats.percent.format(stock.volatility),
              beta: formats.decimal.format(stock.beta),
              sharpe: formats.decimal.format(
                (stock.ret - RISK_FREE) / stock.volatility,
              ),
              cap: formats.cap.format(stock.cap),
            })
          : t("portfolioHint")}
      </output>
    </div>
  );
}

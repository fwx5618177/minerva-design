import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Card,
  ConfigProvider,
  Select,
  SelectItem,
  Slider,
  Switch,
} from "minerva-design";
import {
  OrderBook,
  OrderBookHeatmap,
  type OrderBookHandle,
  type OrderBookHeatmapHandle,
} from "minerva-design/charts";
import { useTerminalMarket } from "../useTerminalMarket";
import { HistoryNavigator } from "../HistoryNavigator";
import styles from "../market.module.scss";

const PALETTES = {
  ocean: [
    "#080d15",
    "#12355e",
    "#087fa4",
    "#31d7d7",
    "#e9e58a",
    "#ffb35c",
    "#fff4db",
  ],
  ember: [
    "#080d15",
    "#302152",
    "#74336a",
    "#d85b67",
    "#f69d63",
    "#ffe0a0",
    "#fff8db",
  ],
};

export default function TerminalDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.order-book-heatmap.data",
  });
  const host = useRef<HTMLDivElement>(null);
  const heatmap = useRef<OrderBookHeatmapHandle>(null);
  const ladder = useRef<OrderBookHandle>(null);
  const [running, setRunning] = useState(true);
  const summary = useTerminalMarket(host, heatmap, ladder, running);
  const [palette, setPalette] = useState<keyof typeof PALETTES>("ocean");
  const [windowMs, setWindowMs] = useState("60000");
  const [filter, setFilter] = useState(0.15);
  const [candles, setCandles] = useState(true);
  const number = new Intl.NumberFormat(i18n.language, {
    maximumFractionDigits: 2,
  });
  const metrics = [
    ["latest", summary?.latest, "USDT"],
    ["bidDepth", summary?.bidDepth, "BTC"],
    ["askDepth", summary?.askDepth, "BTC"],
    ["imbalance", summary ? summary.imbalance * 100 : undefined, "%"],
    ["bidWall", summary?.bidWall, "BTC"],
    ["askWall", summary?.askWall, "BTC"],
  ] as const;
  return (
    <ConfigProvider theme="dark">
      <div
        ref={host}
        className={styles.terminal}
        data-theme="dark"
        data-testid="heatmap-terminal"
      >
        <header className={styles.heading}>
          <h3>
            BTC / USDT{" "}
            <span style={{ color: "#99aac0", fontSize: 12 }}>
              {t("liquidityTerminal")}
            </span>
          </h3>
          <span className={styles.badge}>{t("simulated")}</span>
        </header>
        <div className={styles.metrics} data-testid="heatmap-terminal-metrics">
          {metrics.map(([key, value, unit]) => (
            <Card key={key} className={styles.metric}>
              <span>{t(key)}</span>
              <strong data-metric={key}>
                {value === undefined ? "—" : number.format(value)}{" "}
                <small style={{ fontSize: 10, color: "#99aac0" }}>{unit}</small>
              </strong>
            </Card>
          ))}
        </div>
        <div className={styles.controls}>
          <Switch
            checked={running}
            onChange={setRunning}
            label={t("liveFeed")}
            data-testid="heatmap-live"
          />
          <div className={styles.control}>
            <span>{t("palette")}</span>
            <Select
              aria-label={t("palette")}
              value={palette}
              onChange={(value) => setPalette(value as keyof typeof PALETTES)}
            >
              <SelectItem value="ocean">{t("ocean")}</SelectItem>
              <SelectItem value="ember">{t("ember")}</SelectItem>
            </Select>
          </div>
          <div className={styles.control}>
            <span>{t("timeWindow")}</span>
            <Select
              aria-label={t("timeWindow")}
              value={windowMs}
              onChange={setWindowMs}
            >
              <SelectItem value="30000">30 s</SelectItem>
              <SelectItem value="60000">60 s</SelectItem>
              <SelectItem value="90000">90 s</SelectItem>
            </Select>
          </div>
          <div className={styles.control}>
            <span>{t("intensityFilter")}</span>
            <Slider
              aria-label={t("intensityFilter")}
              min={0}
              max={0.9}
              step={0.05}
              value={filter}
              onChange={(value) => setFilter(Number(value))}
              formatValue={(value) => `${Math.round(value * 100)}%`}
              tooltip
            />
          </div>
          <Switch
            checked={candles}
            onChange={setCandles}
            label={t("showCandles")}
            data-testid="heatmap-show-candles"
          />
          <Button size="small" onClick={() => heatmap.current?.resetView()}>
            {t("resetViewport")}
          </Button>
        </div>
        <div className={styles.workspace}>
          <div className={styles.chart} data-testid="heatmap-terminal-chart">
            <OrderBookHeatmap
              ref={heatmap}
              height={500}
              candles={candles}
              lastPriceLine
              colors={PALETTES[palette]}
              intensityRange={[filter, 1]}
              window={Number(windowMs)}
              interval={250}
              maxColumns={720}
              maxBars={180}
              profile={false}
              pricePrecision={1}
              sizePrecision={3}
              sizeUnit="BTC"
              timeZone="utc"
              fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
              fontSize={11}
              ariaLabel={t("terminalAria")}
            />
            <HistoryNavigator heatmap={heatmap} summary={summary} />
          </div>
          <aside
            className={styles.ladder}
            data-testid="heatmap-terminal-ladder"
          >
            <h4>{t("currentBook")}</h4>
            <OrderBook
              ref={ladder}
              height={560}
              pricePrecision={1}
              sizePrecision={3}
              fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
              fontSize={11}
              ariaLabel={t("ladderAria")}
            />
          </aside>
        </div>
        <p className={styles.caption}>{t("terminalHint")}</p>
      </div>
    </ConfigProvider>
  );
}

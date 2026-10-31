import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, HStack } from "minerva-design";
import {
  SankeyChart,
  type SankeyLink,
  type SankeyNode,
} from "minerva-design/charts";

type Client = "web" | "ios" | "android" | "partners";
type Service = "auth" | "catalog" | "search" | "checkout";
type Status = "ok" | "clientError" | "serverError";

const CLIENTS: [Client, number][] = [
  ["web", 620],
  ["ios", 380],
  ["android", 310],
  ["partners", 140],
];
const SERVICES: [Service, number][] = [
  ["auth", 0.18],
  ["catalog", 0.38],
  ["search", 0.29],
  ["checkout", 0.15],
];
const STATUSES: [Status, string][] = [
  ["ok", "var(--success-color)"],
  ["clientError", "var(--warning-color)"],
  ["serverError", "var(--danger-color)"],
];

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let r = Math.imul(a ^ (a >>> 15), 1 | a);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

// Requests per second at a given tick: a slow wave plus seeded noise, then
// split downstream so every node receives exactly what it sends
function traffic(tick: number) {
  const random = mulberry32(tick * 7919 + 17);
  const flows: [string, string, number][] = [];
  let total = 0;
  for (const [client, base] of CLIENTS) {
    const rps =
      base * (1 + 0.15 * Math.sin(tick / 6 + base) + 0.08 * (random() - 0.5));
    flows.push([`client.${client}`, "gateway", rps]);
    total += rps;
  }
  let serverErrors = 0;
  for (const [service, share] of SERVICES) {
    const rps = total * share * (1 + 0.1 * (random() - 0.5));
    flows.push(["gateway", `service.${service}`, rps]);
    // checkout has an incident every 20 ticks
    const incident = service === "checkout" && tick % 20 >= 14;
    const server = rps * (incident ? 0.12 : 0.004 + 0.006 * random());
    const client = rps * (0.02 + 0.03 * random());
    flows.push([`service.${service}`, "status.ok", rps - server - client]);
    flows.push([`service.${service}`, "status.clientError", client]);
    flows.push([`service.${service}`, "status.serverError", server]);
    serverErrors += server;
  }
  const routed = flows
    .filter(([from]) => from === "gateway")
    .reduce((sum, [, , value]) => sum + value, 0);
  return { flows, total: routed, serverErrors };
}

export default function LiveTrafficDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.sankey-chart.data",
  });
  const [tick, setTick] = useState(0);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setTick((n) => n + 1), 1500);
    return () => clearInterval(id);
  }, [running]);

  const { flows, total, serverErrors } = useMemo(() => traffic(tick), [tick]);
  const rps = useMemo(() => {
    const number = new Intl.NumberFormat(i18n.language, {
      maximumFractionDigits: 0,
    });
    return (value: number) => t("traffic.rps", { value: number.format(value) });
  }, [i18n.language, t]);
  const percent = useMemo(
    () =>
      new Intl.NumberFormat(i18n.language, {
        style: "percent",
        maximumFractionDigits: 2,
      }),
    [i18n.language],
  );

  const nodes = useMemo(
    (): SankeyNode[] => [
      ...CLIENTS.map(([client]) => ({ name: t(`traffic.client.${client}`) })),
      { name: t("traffic.gateway"), color: "var(--text-secondary-color)" },
      ...SERVICES.map(([service]) => ({
        name: t(`traffic.service.${service}`),
      })),
      ...STATUSES.map(([status, color]) => ({
        name: t(`traffic.status.${status}`),
        color,
      })),
    ],
    [t],
  );
  const links = useMemo(
    (): SankeyLink[] =>
      flows.map(([from, to, value]) => ({
        source: t(`traffic.${from}`),
        target: t(`traffic.${to}`),
        value,
      })),
    [flows, t],
  );
  const errorRate = serverErrors / total;

  return (
    <div style={{ display: "grid", gap: 12, width: "100%" }}>
      <HStack gap={12} wrap align="center" justify="between">
        <output aria-live="polite">
          {t("traffic.summary", { total: rps(total) })}{" "}
          <span
            style={{
              color:
                errorRate > 0.01
                  ? "var(--danger-color)"
                  : "var(--success-color)",
            }}
          >
            {t(errorRate > 0.01 ? "traffic.incident" : "traffic.healthy", {
              rate: percent.format(errorRate),
            })}
          </span>
        </output>
        <Button
          variant="outline"
          size="small"
          onClick={() => setRunning((value) => !value)}
        >
          {running ? t("traffic.pause") : t("traffic.resume")}
        </Button>
      </HStack>
      <SankeyChart
        nodes={nodes}
        links={links}
        format={rps}
        linkColor="target"
        linkOpacity={0.35}
        // no relaxation: the nodes keep their order between updates
        iterations={0}
        height={380}
        ariaLabel={t("traffic.aria")}
      />
    </div>
  );
}

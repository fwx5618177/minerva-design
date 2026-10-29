import { useMemo } from "react";
import { Table, Tag, type TableColumn } from "minerva-design";
import { Sparkline } from "minerva-design/charts";

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Service {
  id: string;
  name: string;
  requests: number;
  /** p95 latency of the last 30 days, in ms */
  latency: number[];
}

const services: [string, number, number, number][] = [
  // name, requests / min, latency 30 days ago, latency today
  ["API gateway", 48_200, 96, 88],
  ["Auth", 12_900, 64, 71],
  ["Search", 8_400, 210, 162],
  ["Payments", 2_150, 320, 395],
  ["Notifications", 5_600, 140, 138],
];

const change = (latency: number[]) =>
  (latency[latency.length - 1] / latency[0] - 1) * 100;

const columns: TableColumn<Service>[] = [
  { key: "name", header: "Service" },
  {
    key: "requests",
    header: "Requests / min",
    align: "right",
    render: (row) => row.requests.toLocaleString("en"),
  },
  {
    key: "trend",
    header: "p95 latency, 30 days",
    width: 180,
    render: (row) => (
      <Sparkline
        data={row.latency}
        name="p95 (ms)"
        // rising latency is bad news
        color={
          change(row.latency) > 0
            ? "var(--danger-color)"
            : "var(--success-color)"
        }
        width={150}
        height={32}
        ariaLabel={`${row.name} p95 latency over 30 days`}
      />
    ),
  },
  {
    key: "latency",
    header: "Today",
    align: "right",
    render: (row) => `${row.latency[row.latency.length - 1]} ms`,
  },
  {
    key: "change",
    header: "Change",
    align: "right",
    render: (row) => {
      const value = change(row.latency);
      return (
        <Tag size="small" color={value > 0 ? "danger" : "success"}>
          {value > 0 ? "+" : "−"}
          {Math.abs(value).toFixed(1)}%
        </Tag>
      );
    },
  },
];

export default function TableDemo() {
  const data = useMemo((): Service[] => {
    const random = mulberry32(30);
    return services.map(([name, requests, from, to]) => {
      const latency = Array.from({ length: 30 }, (_, i) => {
        const value = from + ((to - from) * i) / 29;
        return Math.round(value * (1 + (random() - 0.5) * 0.14));
      });
      latency[0] = from;
      latency[29] = to;
      return { id: name, name, requests, latency };
    });
  }, []);

  return (
    <Table
      aria-label="Service latency"
      columns={columns}
      data={data}
      rowKey={(row) => row.id}
      hoverable
    />
  );
}

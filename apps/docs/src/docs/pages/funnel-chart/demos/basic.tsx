import {
  FunnelChart,
  type ShapeDatum,
  type ShapeHoverEvent,
} from "minerva-design/charts";

// Sign-up funnel of a SaaS product over one month
const stages: ShapeDatum[] = [
  { name: "Pricing page", value: 24000 },
  { name: "Started sign-up", value: 9600 },
  { name: "Verified email", value: 6850 },
  { name: "Created project", value: 4100 },
  { name: "Invited teammate", value: 1720 },
  { name: "Upgraded to paid", value: 640 },
];

const format = (value: number) => value.toLocaleString("en-US");
const pct = (ratio: number) => `${(ratio * 100).toFixed(1)}%`;

// The data is not sorted by the chart (sort="none"), so the event index
// is also the index in `stages`
function StageTooltip({ event }: { event: ShapeHoverEvent }) {
  const previous = event.index > 0 ? stages[event.index - 1] : null;
  return (
    <div style={{ display: "grid", gap: 2 }}>
      <strong>{event.name}</strong>
      <span>{format(event.value)} users</span>
      <span>{pct(event.percent)} of the visitors</span>
      {previous && (
        <span>
          {format(previous.value - event.value)} dropped since “{previous.name}”
        </span>
      )}
    </div>
  );
}

export default function BasicDemo() {
  return (
    <FunnelChart
      data={stages}
      format={format}
      renderTooltip={(event) => <StageTooltip event={event} />}
      height={360}
      ariaLabel="Sign-up funnel"
    />
  );
}

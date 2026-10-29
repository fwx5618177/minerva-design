import { Sparkline } from "minerva-design/charts";

const weekly = [
  42, 47, 45, 52, 49, 58, 61, 57, 64, 60, 68, 73, 70, 76, 74, 81, 79, 85, 88,
  84,
];
const average = weekly.reduce((sum, v) => sum + v, 0) / weekly.length;

const variants = [
  { caption: 'type="line"', props: {} },
  { caption: 'type="area"', props: { type: "area" as const } },
  { caption: 'type="bar"', props: { type: "bar" as const } },
  {
    caption: "reference = average",
    props: { reference: average, color: "var(--success-color)" },
  },
];

export default function BasicDemo() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
        gap: 24,
        width: "100%",
      }}
    >
      {variants.map(({ caption, props }) => (
        <figure key={caption} style={{ margin: 0 }}>
          <Sparkline
            data={weekly}
            name="Orders"
            ariaLabel={`Weekly orders, ${caption}`}
            {...props}
          />
          <figcaption
            style={{
              marginTop: 6,
              fontSize: 12,
              color: "var(--text-secondary-color)",
            }}
          >
            <code>{caption}</code>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

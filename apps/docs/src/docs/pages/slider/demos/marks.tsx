import { Slider } from "minerva-design";

const levels = [
  { value: 0, label: "Off" },
  { value: 25, label: "Low" },
  { value: 50, label: "Medium" },
  { value: 75, label: "High" },
  { value: 100, label: "Max" },
];

export default function MarksDemo() {
  return (
    <div style={{ display: "grid", gap: 32, width: "100%", maxWidth: 420 }}>
      <Slider aria-label="Rating" defaultValue={6} max={10} marks showValue />
      <Slider
        aria-label="Fan speed"
        defaultValue={50}
        step={null}
        marks={levels}
        getAriaValueText={(v) =>
          levels.find((level) => level.value === v)?.label ?? String(v)
        }
      />
    </div>
  );
}

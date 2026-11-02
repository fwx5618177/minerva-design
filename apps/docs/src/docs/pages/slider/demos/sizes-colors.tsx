import { Slider } from "minerva-design";

const colors = ["primary", "success", "info", "warning", "danger"] as const;

export default function SizesColorsDemo() {
  return (
    <div style={{ display: "grid", gap: 16, width: "100%", maxWidth: 420 }}>
      <Slider aria-label="Small" size="small" defaultValue={30} />
      <Slider aria-label="Medium" size="medium" defaultValue={50} />
      <Slider aria-label="Large" size="large" defaultValue={70} />
      {colors.map((color, index) => (
        <Slider
          key={color}
          aria-label={color}
          color={color}
          defaultValue={20 + index * 15}
        />
      ))}
    </div>
  );
}

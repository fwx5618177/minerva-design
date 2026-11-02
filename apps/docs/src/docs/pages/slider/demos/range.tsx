import { useState } from "react";
import { Slider, type SliderValue } from "minerva-design";

export default function RangeDemo() {
  const [price, setPrice] = useState<SliderValue>([20, 80]);
  const [low, high] = price as [number, number];

  return (
    <div style={{ display: "grid", gap: 12, width: "100%", maxWidth: 420 }}>
      <Slider
        aria-label="Price"
        range
        value={price}
        onChange={setPrice}
        step={5}
        formatValue={(v) => `$${v}`}
        tooltip
        name="price"
      />
      <p style={{ margin: 0 }}>
        From ${low} to ${high}
      </p>
    </div>
  );
}

import { useState } from "react";
import { Slider, type SliderValue } from "minerva-design";

export default function BasicDemo() {
  const [volume, setVolume] = useState<SliderValue>(40);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%", maxWidth: 420 }}>
      <Slider
        aria-label="Volume"
        value={volume}
        onChange={setVolume}
        showValue
        tooltip
      />
      <Slider
        aria-label="Opacity"
        defaultValue={0.6}
        min={0}
        max={1}
        step={0.05}
        showValue
      />
    </div>
  );
}

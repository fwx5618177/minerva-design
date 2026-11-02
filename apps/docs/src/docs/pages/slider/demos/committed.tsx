import { useState } from "react";
import { Slider, type SliderValue } from "minerva-design";

export default function CommittedDemo() {
  const [live, setLive] = useState<SliderValue>(50);
  const [saved, setSaved] = useState<SliderValue>(50);
  const [saves, setSaves] = useState(0);

  return (
    <div style={{ display: "grid", gap: 12, width: "100%", maxWidth: 420 }}>
      <Slider
        aria-label="Brightness"
        value={live}
        onChange={setLive}
        onChangeEnd={(value) => {
          setSaved(value);
          setSaves((n) => n + 1);
        }}
      />
      <p style={{ margin: 0 }}>
        While dragging: {String(live)} · Saved on release: {String(saved)} (
        {saves} saves)
      </p>
    </div>
  );
}

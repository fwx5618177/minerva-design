import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`import { useState } from "react";
import { View } from "react-native";
import { Slider, type SliderValue } from "minerva-design/native";

export default function Vertical() {
  const [volume, setVolume] = useState<SliderValue>(40);
  const [range, setRange] = useState<SliderValue>([20, 80]);
  return (
    <View style={{ flexDirection: "row", gap: 32 }}>
      <Slider
        accessibilityLabel="Volume"
        orientation="vertical"
        value={volume}
        onChange={setVolume}
        showValue
        tooltip
      />
      <Slider
        accessibilityLabel="Temperature"
        orientation="vertical"
        range
        value={range}
        onChange={setRange}
        step={10}
        marks={[
          { value: 0, label: "0°" },
          { value: 50, label: "50°" },
          { value: 100, label: "100°" },
        ]}
        color="success"
        style={{ height: 220 }}
      />
    </View>
  );
}
`})))()}n();export{t as default};
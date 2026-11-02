import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`import { useState } from "react";
import { Text, View } from "react-native";
import { Slider, type SliderValue } from "minerva-design/native";

export default function Basic() {
  const [volume, setVolume] = useState<SliderValue>(40);
  const [saved, setSaved] = useState<SliderValue>(40);
  const [price, setPrice] = useState<SliderValue>([20, 80]);
  return (
    <View style={{ gap: 24 }}>
      <Slider
        accessibilityLabel="Volume"
        value={volume}
        onChange={setVolume}
        onChangeEnd={setSaved}
        showValue
        tooltip
      />
      <Text>Saved on release: {String(saved)}</Text>
      <Slider
        accessibilityLabel="Price"
        range
        value={price}
        onChange={setPrice}
        step={10}
        marks
        color="success"
      />
    </View>
  );
}
`})))()}n();export{t as default};
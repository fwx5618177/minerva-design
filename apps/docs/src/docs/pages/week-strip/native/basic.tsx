import { useState } from "react";
import { Text, View } from "react-native";
import { WeekStrip } from "minerva-design/native";

const pad = (n: number) => String(n).padStart(2, "0");
const key = (date: Date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
const today = key(new Date());

export default function Basic() {
  const [value, setValue] = useState(today);
  return (
    <View style={{ gap: 12 }}>
      <WeekStrip
        showNavigation
        value={value}
        onChange={setValue}
        markers={{ [today]: 3 }}
      />
      <Text>Selected: {value}</Text>
    </View>
  );
}

import { useState } from "react";
import { Text, View } from "react-native";
import { Radio, RadioGroup, useTheme } from "minerva-design/native";
export default function Controlled() {
  const [plan, setPlan] = useState("pro");
  const { colors } = useTheme();
  return (
    <View style={{ gap: 12, alignItems: "flex-start" }}>
      <RadioGroup label="Plan" value={plan} onChange={setPlan}>
        <Radio value="free" label="Free" />
        <Radio value="pro" label="Pro" />
        <Radio value="team" label="Team" />
      </RadioGroup>
      <Text role="status" style={{ color: colors["text-color"] }}>
        Selected plan: {plan}
      </Text>
    </View>
  );
}

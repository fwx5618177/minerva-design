import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`import { useState } from "react";
import { Text, View } from "react-native";
import { BarChart, useTheme } from "minerva-design/native";

const quarters = ["Q1", "Q2", "Q3", "Q4"];
const sales = [120, 180, 150, 220];

export default function Basic() {
  const { colors } = useTheme();
  const [status, setStatus] = useState("Tap a bar");
  return (
    <View style={{ width: "100%", gap: 8 }}>
      <BarChart
        height={220}
        ariaLabel="Sales per quarter"
        series={[
          {
            name: "Sales",
            data: quarters.map((quarter, i) => [quarter, sales[i]] as const),
          },
        ]}
        onPointClick={(event) => {
          const item = event.items[0];
          if (item) setStatus(\`\${event.xLabel}: \${item.y} units\`);
        }}
      />
      <Text role="status" style={{ color: colors["text-secondary-color"] }}>
        {status}
      </Text>
    </View>
  );
}
`})))()}n();export{t as default};
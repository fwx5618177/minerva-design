import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`import { useState } from "react";
import { Text, View } from "react-native";
import { Chart, useTheme } from "minerva-design/native";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const revenue = [42, 51, 48, 69, 74, 88];
const target = [45, 50, 55, 60, 65, 70];

export default function Mixed() {
  const { colors } = useTheme();
  const [status, setStatus] = useState("Tap a bar or the line");
  return (
    <View style={{ width: "100%", gap: 8 }}>
      <Chart
        height={240}
        ariaLabel="Revenue and target per month"
        series={[
          {
            name: "Revenue",
            type: "bar",
            data: months.map((month, i) => [month, revenue[i]] as const),
          },
          {
            name: "Target",
            type: "line",
            data: months.map((month, i) => [month, target[i]] as const),
          },
        ]}
        yAxis={{ format: (value) => \`$\${value}k\` }}
        onPointClick={(event) => {
          const item = event.items[0];
          if (item)
            setStatus(\`\${event.xLabel}: $\${item.y}k (\${item.seriesName})\`);
        }}
      />
      <Text role="status" style={{ color: colors["text-secondary-color"] }}>
        {status}
      </Text>
    </View>
  );
}
`})))()}n();export{t as default};
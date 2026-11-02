import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import {
  QuadrantChart,
  useTheme,
  type QuadrantCorner,
  type QuadrantPoint,
  type QuadrantRegions,
} from "minerva-design/native";

// x: urgency, y: importance (0-10); reverseX puts urgent tasks on the left
const initial = [
  { key: "loginOutage", x: 9, y: 8 },
  { key: "taxFiling", x: 7, y: 8.8 },
  { key: "quarterlyPlanning", x: 3, y: 8.5 },
  { key: "bookTravel", x: 8.5, y: 3 },
  { key: "meetings", x: 6.5, y: 1.8 },
  { key: "socialMedia", x: 1.5, y: 1.2 },
];

export default function Triage() {
  const { t } = useTranslation("common", {
    keyPrefix: "docs.quadrant-chart.data",
  });
  const { colors } = useTheme();
  const [tasks, setTasks] = useState(initial);
  const [selected, setSelected] = useState<number | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const points: QuadrantPoint[] = tasks.map(({ key, x, y }) => ({
    label: t(\`tasks.\${key}\`),
    x,
    y,
  }));
  // badge pill, title and a second line, drawn by the chart
  const quadrants: QuadrantRegions = {
    topLeft: {
      badge: "Q1",
      label: t("doFirst"),
      description: t("triage.doNow"),
    },
    topRight: {
      badge: "Q2",
      label: t("schedule"),
      description: t("triage.plan"),
    },
    bottomLeft: {
      badge: "Q3",
      label: t("delegate"),
      description: t("triage.handOff"),
    },
    bottomRight: {
      badge: "Q4",
      label: t("eliminate"),
      description: t("triage.drop"),
    },
  };
  const title = (corner: QuadrantCorner) => quadrants[corner]?.label ?? "";

  return (
    <View style={{ width: "100%", gap: 8 }}>
      <QuadrantChart
        height={340}
        points={points}
        quadrants={quadrants}
        reverseX
        showTicks={false}
        showCounts
        selectedIndex={selected}
        ariaLabel={t("triage.aria")}
        onPointClick={(point, index) => {
          setSelected(index);
          setStatus(t("triage.selected", { task: point.label }));
        }}
        onPointDrop={(point, index, target) => {
          setTasks((current) =>
            current.map((task, i) =>
              i === index ? { ...task, x: target.x, y: target.y } : task,
            ),
          );
          setSelected(index);
          setStatus(
            t("taskMoved", {
              task: point.label,
              quadrant: title(target.quadrant),
            }),
          );
        }}
      />
      <Text role="status" style={{ color: colors["text-secondary-color"] }}>
        {status ?? t("dragHintNative")}
      </Text>
    </View>
  );
}
`})))()}n();export{t as default};
import{n as e}from"./rolldown-runtime-B0Z9INg1.js";var t;function n(){return(n=e((()=>{t=`import { useState } from "react";
import { Text, View } from "react-native";
import {
  IconButton,
  QuadrantChart,
  useTheme,
  type QuadrantCorner,
  type QuadrantPoint,
} from "minerva-design/native";

const titles: Record<QuadrantCorner, string> = {
  topLeft: "Do first",
  topRight: "Schedule",
  bottomLeft: "Delegate",
  bottomRight: "Eliminate",
};

// x: urgency, y: importance (0-10); reverseX puts urgent tasks on the left,
// so the top-left quadrant holds high x values
const centers: Record<QuadrantCorner, { x: number; y: number }> = {
  topLeft: { x: 7.5, y: 7.5 },
  topRight: { x: 2.5, y: 7.5 },
  bottomLeft: { x: 7.5, y: 2.5 },
  bottomRight: { x: 2.5, y: 2.5 },
};

const initial: QuadrantPoint[] = [
  { label: "Fix outage", x: 9, y: 8 },
  { label: "Plan Q3", x: 3, y: 8.5 },
  { label: "Book travel", x: 8, y: 3 },
  { label: "Inbox", x: 2.5, y: 2 },
];

const clamp = (value: number) => Math.min(9.5, Math.max(0.5, value));

export default function Draggable() {
  const { colors } = useTheme();
  const [tasks, setTasks] = useState(initial);
  const [status, setStatus] = useState("Drag a task to another quadrant");

  const add = (corner: QuadrantCorner) => {
    const label = \`Task \${tasks.length + 1}\`;
    const jitter = (tasks.length % 3) - 1;
    setTasks((current) => [
      ...current,
      {
        label,
        x: clamp(centers[corner].x + jitter),
        y: clamp(centers[corner].y + jitter),
      },
    ]);
    setStatus(\`\${label} added to "\${titles[corner]}"\`);
  };

  const tint: Record<QuadrantCorner, string> = {
    topLeft: colors["danger-color"],
    topRight: colors["primary-color"],
    bottomLeft: colors["warning-color"],
    bottomRight: colors["text-secondary-color"],
  };

  // Title + add button in the outer corner of each quadrant
  const header = (corner: QuadrantCorner) => {
    const right = corner.endsWith("Right");
    const top = corner.startsWith("top");
    return (
      <View
        style={{
          position: "absolute",
          [top ? "top" : "bottom"]: 2,
          [right ? "right" : "left"]: 6,
          flexDirection: right ? "row-reverse" : "row",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Text style={{ color: tint[corner], fontSize: 12, fontWeight: "600" }}>
          {titles[corner]}
        </Text>
        <IconButton
          size="small"
          label={\`Add a task to "\${titles[corner]}"\`}
          onPress={() => add(corner)}
        >
          <Text style={{ color: tint[corner], fontSize: 16 }}>+</Text>
        </IconButton>
      </View>
    );
  };

  return (
    <View style={{ width: "100%", gap: 8 }}>
      <QuadrantChart
        height={320}
        points={tasks}
        reverseX
        showTicks={false}
        axisLabels={{
          top: "Important",
          bottom: "Not important",
          left: "Urgent",
          right: "Not urgent",
        }}
        ariaLabel="Task matrix: drag tasks between quadrants"
        onPointDrop={(point, index, target) => {
          setTasks((current) =>
            current.map((task, i) =>
              i === index
                ? { ...task, x: clamp(target.x), y: clamp(target.y) }
                : task,
            ),
          );
          setStatus(\`\${point.label} moved to "\${titles[target.quadrant]}"\`);
        }}
        onQuadrantClick={(corner) => setStatus(\`"\${titles[corner]}" tapped\`)}
        renderTooltip={(point) => (
          <View>
            <Text style={{ color: colors["text-color"], fontWeight: "600" }}>
              {point.label}
            </Text>
            <Text style={{ color: colors["text-secondary-color"] }}>
              Urgency {point.x.toFixed(1)} · Importance {point.y.toFixed(1)}
            </Text>
          </View>
        )}
        quadrantContent={{
          topLeft: header("topLeft"),
          topRight: header("topRight"),
          bottomLeft: header("bottomLeft"),
          bottomRight: header("bottomRight"),
        }}
      />
      <Text role="status" style={{ color: colors["text-secondary-color"] }}>
        {status}
      </Text>
    </View>
  );
}
`})))()}n();export{t as default};
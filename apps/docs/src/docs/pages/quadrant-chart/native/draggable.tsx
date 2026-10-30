import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import {
  IconButton,
  QuadrantChart,
  useTheme,
  type QuadrantCorner,
  type QuadrantPoint,
} from "minerva-design/native";

// translation keys of the quadrant titles
const titleKeys: Record<QuadrantCorner, string> = {
  topLeft: "doFirst",
  topRight: "schedule",
  bottomLeft: "delegate",
  bottomRight: "eliminate",
};

// x: urgency, y: importance (0-10); reverseX puts urgent tasks on the left,
// so the top-left quadrant holds high x values
const centers: Record<QuadrantCorner, { x: number; y: number }> = {
  topLeft: { x: 7.5, y: 7.5 },
  topRight: { x: 2.5, y: 7.5 },
  bottomLeft: { x: 7.5, y: 2.5 },
  bottomRight: { x: 2.5, y: 2.5 },
};

// task names are translated when rendered (`key`), added tasks are numbered
type Task = { key?: string; n?: number; x: number; y: number };
const initial: Task[] = [
  { key: "loginOutage", x: 9, y: 8 },
  { key: "quarterlyPlanning", x: 3, y: 8.5 },
  { key: "bookTravel", x: 8, y: 3 },
  { key: "inboxZero", x: 2.5, y: 2 },
];

const clamp = (value: number) => Math.min(9.5, Math.max(0.5, value));

export default function Draggable() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.quadrant-chart.data",
  });
  const { colors } = useTheme();
  const [tasks, setTasks] = useState(initial);
  const [status, setStatus] = useState<string | null>(null);
  const title = (corner: QuadrantCorner) => t(titleKeys[corner]);
  const name = (task: Task) =>
    task.key ? t(`tasks.${task.key}`) : t("newTask", { n: task.n });
  const points: QuadrantPoint[] = tasks.map((task) => ({
    label: name(task),
    x: task.x,
    y: task.y,
  }));
  const decimal = new Intl.NumberFormat(i18n.language, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  const add = (corner: QuadrantCorner) => {
    const jitter = (tasks.length % 3) - 1;
    const task: Task = {
      n: tasks.length + 1,
      x: clamp(centers[corner].x + jitter),
      y: clamp(centers[corner].y + jitter),
    };
    setTasks((current) => [...current, task]);
    setStatus(t("taskAdded", { task: name(task), quadrant: title(corner) }));
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
          {title(corner)}
        </Text>
        <IconButton
          size="small"
          label={t("addTask", { quadrant: title(corner) })}
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
        points={points}
        reverseX
        showTicks={false}
        axisLabels={{
          top: t("important"),
          bottom: t("notImportant"),
          left: t("urgent"),
          right: t("notUrgent"),
        }}
        ariaLabel={t("boardAria")}
        onPointDrop={(point, index, target) => {
          setTasks((current) =>
            current.map((task, i) =>
              i === index
                ? { ...task, x: clamp(target.x), y: clamp(target.y) }
                : task,
            ),
          );
          setStatus(
            t("taskMoved", {
              task: point.label,
              quadrant: title(target.quadrant),
            }),
          );
        }}
        onQuadrantClick={(corner) =>
          setStatus(t("quadrantTapped", { quadrant: title(corner) }))
        }
        renderTooltip={(point) => (
          <View>
            <Text style={{ color: colors["text-color"], fontWeight: "600" }}>
              {point.label}
            </Text>
            <Text style={{ color: colors["text-secondary-color"] }}>
              {t("taskScores", {
                urgency: decimal.format(point.x),
                importance: decimal.format(point.y),
              })}
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
        {status ?? t("dragHintNative")}
      </Text>
    </View>
  );
}

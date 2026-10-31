import { useState, type FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { Button, IconButton, Input, Select, SelectItem } from "minerva-design";
import {
  QuadrantChart,
  quadrantCenter,
  quadrantOf,
  type QuadrantCorner,
  type QuadrantPoint,
} from "minerva-design/charts";
import { LuPlus } from "react-icons/lu";

type Corner = QuadrantCorner;

// x: urgency, y: importance (0-10); reverseX puts urgent tasks on the left
const geometry = { reverseX: true };

const corners: Corner[] = ["topLeft", "topRight", "bottomLeft", "bottomRight"];

// translation keys of the quadrant titles
const titleKeys: Record<Corner, string> = {
  topLeft: "doFirst",
  topRight: "schedule",
  bottomLeft: "delegate",
  bottomRight: "eliminate",
};

// Same tints as the default quadrant colors
const colors: Record<Corner, string> = {
  topLeft: "var(--danger-color, #ef4444)",
  topRight: "var(--primary-color, #4f46e5)",
  bottomLeft: "var(--warning-color, #f59e0b)",
  bottomRight: "var(--text-secondary-color, #64748b)",
};

// task names are translated when rendered (`key`), added tasks are numbered
// (`n`) until they are renamed in the editor (`label`)
type Task = { key?: string; n?: number; label?: string; x: number; y: number };
const initial: Task[] = [
  { key: "loginOutage", x: 9, y: 8 },
  { key: "quarterlyPlanning", x: 3, y: 8.5 },
  { key: "bookTravel", x: 8, y: 3 },
  { key: "inboxZero", x: 2.5, y: 2 },
];

const clamp = (value: number) => Math.min(9.5, Math.max(0.5, value));

export default function DraggableDemo() {
  const { t, i18n } = useTranslation("common", {
    keyPrefix: "docs.quadrant-chart.data",
  });
  const [tasks, setTasks] = useState(initial);
  const [editing, setEditing] = useState<number | null>(null);
  const [draft, setDraft] = useState<{ name: string; quadrant: Corner }>({
    name: "",
    quadrant: "topLeft",
  });
  const [status, setStatus] = useState<string | null>(null);
  const title = (corner: Corner) => t(titleKeys[corner]);
  const name = (task: Task) =>
    task.label ??
    (task.key ? t(`tasks.${task.key}`) : t("newTask", { n: task.n }));
  const points: QuadrantPoint[] = tasks.map((task) => ({
    label: name(task),
    x: task.x,
    y: task.y,
  }));
  const decimal = new Intl.NumberFormat(i18n.language, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  const add = (corner: Corner, at?: { x: number; y: number }) => {
    const center = quadrantCenter(geometry, corner);
    // Offset new tasks a little so they do not stack on the same spot
    const jitter = (tasks.length % 3) - 1;
    const task: Task = {
      n: tasks.length + 1,
      x: clamp(at?.x ?? center.x + jitter),
      y: clamp(at?.y ?? center.y + jitter),
    };
    setTasks((current) => [...current, task]);
    setStatus(t("taskAdded", { task: name(task), quadrant: title(corner) }));
  };

  const edit = (index: number) => {
    const task = tasks[index];
    setEditing(index);
    setDraft({
      name: name(task),
      quadrant: quadrantOf(geometry, task.x, task.y),
    });
  };

  // Moving a task to another quadrant puts it at that quadrant's center
  const save = (event: FormEvent) => {
    event.preventDefault();
    if (editing === null) return;
    const task = tasks[editing];
    const label = draft.name.trim() || name(task);
    const moved = quadrantOf(geometry, task.x, task.y) !== draft.quadrant;
    const center = quadrantCenter(geometry, draft.quadrant);
    setTasks((current) =>
      current.map((item, i) =>
        i === editing
          ? {
              ...item,
              label,
              x: moved ? center.x : item.x,
              y: moved ? center.y : item.y,
            }
          : item,
      ),
    );
    setStatus(t("taskSaved", { task: label, quadrant: title(draft.quadrant) }));
    setEditing(null);
  };

  const remove = (index: number) => {
    const label = name(tasks[index]);
    setTasks((current) => current.filter((_, i) => i !== index));
    setEditing(null);
    setStatus(t("taskRemoved", { task: label }));
  };

  // Title + add button drawn over each quadrant, in its outer corner
  const header = (corner: Corner) => {
    const right = corner.endsWith("Right");
    const top = corner.startsWith("top");
    return (
      <div
        style={{
          position: "absolute",
          [top ? "top" : "bottom"]: 6,
          [right ? "right" : "left"]: 8,
          display: "flex",
          flexDirection: right ? "row-reverse" : "row",
          alignItems: "center",
          gap: 6,
          fontSize: 12,
          fontWeight: 600,
          color: colors[corner],
        }}
      >
        <span>{title(corner)}</span>
        <IconButton
          size="xsmall"
          variant="ghost"
          label={t("addTask", { quadrant: title(corner) })}
          icon={<LuPlus />}
          onClick={() => add(corner)}
          style={{ pointerEvents: "auto" }}
        />
      </div>
    );
  };

  return (
    <div style={{ display: "grid", gap: 8, width: "100%" }}>
      <QuadrantChart
        points={points}
        quadrants={{
          topLeft: { color: colors.topLeft },
          topRight: { color: colors.topRight },
          bottomLeft: { color: colors.bottomLeft },
          bottomRight: { color: colors.bottomRight },
        }}
        reverseX
        showTicks={false}
        axisLabels={{
          top: t("important"),
          bottom: t("notImportant"),
          left: t("urgent"),
          right: t("notUrgent"),
        }}
        onPointDrag={(point, _index, target) =>
          setStatus(
            t("taskMoving", {
              task: point.label,
              quadrant: title(target.quadrant),
            }),
          )
        }
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
        onPointDoubleClick={(_point, index) => edit(index)}
        onQuadrantClick={(corner, at) => add(corner, at)}
        quadrantContent={{
          topLeft: header("topLeft"),
          topRight: header("topRight"),
          bottomLeft: header("bottomLeft"),
          bottomRight: header("bottomRight"),
        }}
        renderTooltip={(point) => (
          <div style={{ display: "grid", gap: 2 }}>
            <strong>{point.label}</strong>
            <span>
              {t("taskScores", {
                urgency: decimal.format(point.x),
                importance: decimal.format(point.y),
              })}
            </span>
          </div>
        )}
        height={360}
        ariaLabel={t("boardAria")}
      />
      {editing !== null && tasks[editing] && (
        <form
          onSubmit={save}
          aria-label={t("editTaskAria", { task: name(tasks[editing]) })}
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Input
            aria-label={t("taskName")}
            value={draft.name}
            onChange={(event) =>
              setDraft({ ...draft, name: event.target.value })
            }
          />
          <Select
            aria-label={t("taskQuadrant")}
            value={draft.quadrant}
            onChange={(value) =>
              setDraft({ ...draft, quadrant: value as Corner })
            }
          >
            {corners.map((corner) => (
              <SelectItem key={corner} value={corner}>
                {title(corner)}
              </SelectItem>
            ))}
          </Select>
          <Button type="submit">{t("save")}</Button>
          <Button
            type="button"
            color="neutral"
            variant="outline"
            onClick={() => setEditing(null)}
          >
            {t("cancel")}
          </Button>
          <Button
            type="button"
            color="danger"
            variant="outline"
            onClick={() => remove(editing)}
          >
            {t("remove")}
          </Button>
        </form>
      )}
      <p role="status">{status ?? t("dragHint")}</p>
    </div>
  );
}

import { useState, type CSSProperties } from "react";
import { Text, View } from "@tarojs/components";
import { cn } from "@minerva/core";
import {
  QUADRANT_CORNERS,
  applyQuadrantTaskDraft,
  canSaveQuadrantTask,
  editQuadrantTaskDraft,
  moveQuadrantTask,
  newQuadrantTaskDraft,
  quadrantCountText,
  quadrantGroups,
  quadrantLabels,
  quadrantTaskDeleteText,
  quadrantTaskLabels,
  removeQuadrantTask,
  selectionAfterRemove,
  type QuadrantCorner,
  type QuadrantPoint,
  type QuadrantTaskDraft,
  type QuadrantTaskLabels,
} from "@minerva/charts/canvas";
import { Button, Input } from "./components";
import { RadioGroup } from "./forms";
import { ConfirmDialog, Modal, ModalFooter } from "./overlays";
import { QuadrantChart, type QuadrantChartProps } from "./charts";
import { a11yAttrs, systemLocale } from "./chart-a11y";
import { useOptionalTheme } from "./theme";

export type { QuadrantTaskLabels };

/** Props of QuadrantTaskBoard */
export interface QuadrantTaskBoardProps extends Omit<
  QuadrantChartProps,
  "onPointDrop" | "onQuadrantClick" | "labels"
> {
  /**
   * Called with the next list of tasks after an add, an edit, a delete, a
   * drag and drop or a "move to" action (controlled: pass them back as `points`)
   */
  onPointsChange: (points: QuadrantPoint[]) => void;
  /** Texts of the buttons and dialogs (localized by default) */
  labels?: Partial<QuadrantTaskLabels>;
}

const ROW: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

/**
 * Task board on a four-quadrant matrix: a header per quadrant (title, count,
 * add button) under the chart, edit and delete buttons for the selected
 * task, a dialog to name a task and pick its quadrant, a confirmation
 * before a delete, drag and drop and "move to" actions. Controlled:
 * `points` in, `onPointsChange` out.
 */
export function QuadrantTaskBoard({
  points,
  onPointsChange,
  labels,
  className,
  style,
  ...props
}: QuadrantTaskBoardProps) {
  const providerLocale = useOptionalTheme()?.locale;
  const locale = props.locale ?? providerLocale ?? systemLocale();
  const [draft, setDraft] = useState<QuadrantTaskDraft | null>(null);
  const [deleting, setDeleting] = useState<number | null>(null);
  const [selection, setSelection] = useState<number | null>(null);
  const texts = quadrantTaskLabels(locale, labels);
  const geometry = {
    xDomain: props.xDomain,
    yDomain: props.yDomain,
    xSplit: props.xSplit,
    ySplit: props.ySplit,
    reverseX: props.reverseX,
  };
  const defaults = quadrantLabels(locale);
  const title = (corner: QuadrantCorner) =>
    props.quadrants?.[corner]?.label || defaults[corner];
  const groups = quadrantGroups({ points, ...geometry });
  const selected =
    props.selectedIndex !== undefined ? props.selectedIndex : selection;
  const active =
    selected !== null && selected !== undefined && points[selected]
      ? selected
      : null;
  const edit = (index: number) =>
    setDraft(editQuadrantTaskDraft(geometry, points, index));
  const save = () => {
    const saved = applyQuadrantTaskDraft(geometry, points, draft);
    if (!saved) return;
    onPointsChange(saved.points);
    setSelection(saved.index);
    setDraft(null);
  };
  const open =
    draft !== null && (draft.index === null || !!points[draft.index]);

  return (
    <View
      className={cn("mn-quadrant-task-board", className)}
      data-minerva="quadrant-task-board"
      style={{ display: "flex", flexDirection: "column", gap: "8px", ...style }}
    >
      <QuadrantChart
        {...props}
        locale={locale}
        points={points}
        selectedIndex={selected}
        onPointClick={(point, index) => {
          setSelection(index);
          props.onPointClick?.(point, index);
        }}
        onPointDrop={(_point, index, at) => {
          onPointsChange(moveQuadrantTask(points, index, at));
          setSelection(index);
        }}
        onQuadrantClick={(corner, at) =>
          setDraft(newQuadrantTaskDraft(geometry, corner, at))
        }
      />
      <View
        className="mn-quadrant-task-board__quadrants"
        style={{ display: "flex", flexWrap: "wrap", rowGap: "4px" }}
      >
        {QUADRANT_CORNERS.map((corner) => {
          const region = props.quadrants?.[corner];
          return (
            <View
              key={corner}
              className="mn-quadrant-task-board__header"
              data-corner={corner}
              style={{
                ...ROW,
                width: "50%",
                boxSizing: "border-box",
                padding: "0 4px",
              }}
            >
              {region?.badge ? (
                <Text className="mn-quadrant-task-board__badge">
                  {region.badge}
                </Text>
              ) : null}
              <Text
                className="mn-quadrant-task-board__title"
                style={{ flex: 1, minWidth: 0 }}
              >
                {title(corner)}
              </Text>
              {props.showCounts === false ? null : (
                <Text className="mn-quadrant-task-board__count">
                  {quadrantCountText(
                    props.showCounts ?? true,
                    groups[corner].points,
                    locale,
                  )}
                </Text>
              )}
              <Button
                size="xsmall"
                variant="ghost"
                className="mn-quadrant-task-board__add"
                aria-label={`${texts.add} · ${title(corner)}`}
                onClick={() => setDraft(newQuadrantTaskDraft(geometry, corner))}
              >
                +
              </Button>
            </View>
          );
        })}
      </View>
      {active !== null ? (
        <View
          className="mn-quadrant-task-board__actions"
          {...a11yAttrs("toolbar", texts.actions)}
          style={ROW}
        >
          <Text
            className="mn-quadrant-task-board__active"
            style={{ flex: 1, minWidth: 0 }}
          >
            {points[active]!.label ?? ""}
          </Text>
          <Button size="small" variant="ghost" onClick={() => edit(active)}>
            {texts.edit}
          </Button>
          <Button
            size="small"
            variant="ghost"
            color="danger"
            onClick={() => setDeleting(active)}
          >
            {texts.delete}
          </Button>
        </View>
      ) : null}
      <Modal
        open={open}
        onOpenChange={(next) => {
          if (!next) setDraft(null);
        }}
        title={draft?.index === null ? texts.add : texts.edit}
        size="small"
      >
        <View
          className="mn-quadrant-task-board__form"
          style={{ display: "flex", flexDirection: "column", gap: "12px" }}
        >
          <View className="mn-quadrant-task-board__field">
            <Text>{texts.name}</Text>
            <Input
              required
              focus={open}
              value={draft?.label ?? ""}
              aria-label={texts.name}
              onChange={(label) => setDraft((old) => old && { ...old, label })}
              onConfirm={save}
            />
          </View>
          <View className="mn-quadrant-task-board__field">
            <Text>{texts.quadrant}</Text>
            <RadioGroup
              aria-label={texts.quadrant}
              value={draft?.quadrant ?? "topLeft"}
              options={QUADRANT_CORNERS.map((corner) => ({
                value: corner,
                label: title(corner),
              }))}
              onChange={(corner) =>
                setDraft(
                  (old) =>
                    old && { ...old, quadrant: corner as QuadrantCorner },
                )
              }
            />
          </View>
        </View>
        <ModalFooter>
          <Button
            color="neutral"
            variant="outline"
            onClick={() => setDraft(null)}
          >
            {texts.cancel}
          </Button>
          <Button disabled={!canSaveQuadrantTask(draft, points)} onClick={save}>
            {texts.save}
          </Button>
        </ModalFooter>
      </Modal>
      <ConfirmDialog
        open={deleting !== null && !!points[deleting]}
        onOpenChange={(next) => {
          if (!next) setDeleting(null);
        }}
        title={texts.delete}
        description={quadrantTaskDeleteText(
          texts,
          deleting === null ? undefined : points[deleting],
        )}
        cancelLabel={texts.cancel}
        color="danger"
        onConfirm={() => {
          if (deleting !== null && points[deleting]) {
            onPointsChange(removeQuadrantTask(points, deleting));
            setSelection(selectionAfterRemove(selection, deleting));
          }
          setDeleting(null);
        }}
      />
    </View>
  );
}

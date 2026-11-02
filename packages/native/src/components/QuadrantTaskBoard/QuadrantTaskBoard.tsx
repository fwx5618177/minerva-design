import { useState } from "react";
import { Text, View } from "react-native";
import {
  QUADRANT_CORNERS,
  applyQuadrantTaskDraft,
  canSaveQuadrantTask,
  editQuadrantTaskDraft,
  moveQuadrantTask,
  newQuadrantTaskDraft,
  quadrantCountText,
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
import { useI18n, useTheme } from "../../theme/MinervaProvider";
import { Icon } from "../../internal/Icon";
import { part } from "../../internal/parts";
import { shadowStyle, textStyle, weight } from "../../internal/styles";
import { QuadrantChart, type QuadrantChartProps } from "../Chart";
import { Button } from "../Button";
import { ConfirmDialog } from "../Confirm";
import { Dialog } from "../Dialog";
import { IconButton } from "../IconButton";
import { Input } from "../Input";
import { RadioGroup } from "../Radio";

export type { QuadrantTaskLabels };

export interface QuadrantTaskBoardProps extends Omit<
  QuadrantChartProps,
  | "onPointDrop"
  | "onQuadrantClick"
  | "renderPointActions"
  | "renderQuadrantHeader"
  | "labels"
> {
  /**
   * Called with the next list of tasks after an add, an edit, a delete, a
   * drag and drop or a "Move to" accessibility action (controlled: pass
   * them back as `points`)
   */
  onPointsChange: (points: QuadrantPoint[]) => void;
  /** Texts of the buttons and dialogs (localized by default) */
  labels?: Partial<QuadrantTaskLabels>;
}

const hidden = {
  accessible: false,
  importantForAccessibility: "no-hide-descendants",
  accessibilityElementsHidden: true,
} as const;

/** Pencil glyph of the edit button (drawn with views: no SVG dependency) */
function EditGlyph({ color, size }: { color: string; size: number }) {
  const stroke = Math.max(1.5, Math.round(size / 9));
  return (
    <View
      {...hidden}
      style={{
        width: size,
        height: size,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          width: size * 0.3,
          height: size * 0.82,
          borderWidth: stroke,
          borderColor: color,
          borderTopLeftRadius: stroke,
          borderTopRightRadius: stroke,
          borderBottomLeftRadius: size * 0.15,
          borderBottomRightRadius: size * 0.15,
          transform: [{ rotate: "45deg" }],
        }}
      />
    </View>
  );
}

/** Trash can glyph of the delete button */
function DeleteGlyph({ color, size }: { color: string; size: number }) {
  const stroke = Math.max(1.5, Math.round(size / 9));
  return (
    <View
      {...hidden}
      style={{
        width: size,
        height: size,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          width: size * 0.32,
          height: size * 0.12,
          borderWidth: stroke,
          borderBottomWidth: 0,
          borderColor: color,
          borderTopLeftRadius: stroke,
          borderTopRightRadius: stroke,
        }}
      />
      <View
        style={{
          width: size * 0.8,
          height: stroke,
          borderRadius: stroke,
          backgroundColor: color,
        }}
      />
      <View
        style={{
          width: size * 0.58,
          height: size * 0.56,
          marginTop: stroke / 2,
          borderWidth: stroke,
          borderTopWidth: 0,
          borderColor: color,
          borderBottomLeftRadius: stroke * 1.5,
          borderBottomRightRadius: stroke * 1.5,
        }}
      />
    </View>
  );
}

/**
 * Task board on a four-quadrant matrix: an add button in each quadrant
 * header, edit and delete buttons next to the selected task, a dialog to
 * name a task and pick its quadrant, a confirmation before a delete, and
 * moves by drag and drop or the "Move to" accessibility actions of the
 * points. Controlled: `points` in, `onPointsChange` out.
 */
export function QuadrantTaskBoard({
  points,
  onPointsChange,
  labels,
  ...props
}: QuadrantTaskBoardProps) {
  const { tokens: t, fonts } = useTheme();
  const { language } = useI18n();
  const locale = props.locale ?? language;
  const texts = quadrantTaskLabels(locale, labels);
  const defaults = quadrantLabels(locale);
  const title = (corner: QuadrantCorner) =>
    props.quadrants?.[corner]?.label || defaults[corner];
  const geometry = {
    xDomain: props.xDomain,
    yDomain: props.yDomain,
    xSplit: props.xSplit,
    ySplit: props.ySplit,
    reverseX: props.reverseX,
  };

  const [selection, setSelection] = useState<number | null>(null);
  // the draft and the deleted task stay set while their dialog fades out
  const [draft, setDraft] = useState<QuadrantTaskDraft | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [deleting, setDeleting] = useState<{
    index: number;
    point: QuadrantPoint;
  } | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const openDraft = (next: QuadrantTaskDraft | null) => {
    if (!next) return;
    setDraft(next);
    setFormOpen(true);
  };
  const edit = (index: number) =>
    openDraft(editQuadrantTaskDraft(geometry, points, index));
  const askDelete = (index: number) => {
    const point = points[index];
    if (!point) return;
    setDeleting({ index, point });
    setConfirmOpen(true);
  };
  const save = () => {
    if (!formOpen) return;
    const saved = applyQuadrantTaskDraft(geometry, points, draft);
    if (!saved) return;
    onPointsChange(saved.points);
    setSelection(saved.index);
    setFormOpen(false);
  };
  const update = (patch: Partial<QuadrantTaskDraft>) =>
    setDraft((old) => old && { ...old, ...patch });

  const formVisible =
    formOpen &&
    draft !== null &&
    (draft.index === null || !!points[draft.index]);
  const confirmVisible =
    confirmOpen && deleting !== null && !!points[deleting.index];
  const sans = fonts.sans;

  return (
    <View {...part("quadrant-task-board", "root")}>
      <QuadrantChart
        {...props}
        locale={locale}
        points={points}
        selectedIndex={
          props.selectedIndex !== undefined ? props.selectedIndex : selection
        }
        onPointClick={(point, index) => {
          setSelection(index);
          props.onPointClick?.(point, index);
        }}
        onPointDrop={(_point, index, at) => {
          onPointsChange(moveQuadrantTask(points, index, at));
          setSelection(index);
        }}
        onQuadrantClick={(corner, at) =>
          openDraft(newQuadrantTaskDraft(geometry, corner, at))
        }
        renderPointActions={(_point, index) => (
          <View
            accessibilityRole="toolbar"
            accessibilityLabel={texts.actions}
            style={{
              flexDirection: "row",
              gap: 2,
              padding: 3,
              borderWidth: 1,
              borderColor: t.colors["border-color"],
              borderRadius: t.radius.md,
              backgroundColor:
                t.colors["surface-elevated-color"] ?? t.colors["surface-color"],
              ...shadowStyle(t.shadows.md),
            }}
            {...part("quadrant-task-board", "actions")}
          >
            <IconButton
              size="small"
              variant="ghost"
              label={texts.edit}
              icon={(color, size) => <EditGlyph color={color} size={size} />}
              onPress={() => edit(index)}
            />
            <IconButton
              size="small"
              variant="ghost"
              color="danger"
              label={texts.delete}
              icon={(color, size) => <DeleteGlyph color={color} size={size} />}
              onPress={() => askDelete(index)}
            />
          </View>
        )}
        renderQuadrantHeader={(corner, info) => {
          const count =
            props.showCounts === false
              ? undefined
              : quadrantCountText(
                  props.showCounts ?? true,
                  info.points,
                  locale,
                );
          return (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 4,
                maxWidth: "100%",
                paddingLeft: t.space["2"],
                paddingRight: 2,
                paddingVertical: 2,
                borderRadius: 999,
                borderWidth: 1,
                borderColor: t.colors["border-color"],
                backgroundColor: t.colors["surface-color"],
              }}
              {...part("quadrant-task-board", "header", { corner })}
            >
              {info.region?.badge ? (
                <Text
                  style={[
                    textStyle(t, "xs", sans),
                    {
                      color: t.colors["text-secondary-color"],
                      fontWeight: weight(t, "medium"),
                    },
                  ]}
                >
                  {info.region.badge}
                </Text>
              ) : null}
              <Text
                numberOfLines={1}
                style={[
                  textStyle(t, "xs", sans),
                  { flexShrink: 1, fontWeight: weight(t, "semibold") },
                ]}
              >
                {title(corner)}
              </Text>
              {count !== undefined ? (
                <Text
                  style={[
                    textStyle(t, 11, sans),
                    {
                      minWidth: 20,
                      paddingHorizontal: 6,
                      borderRadius: 999,
                      overflow: "hidden",
                      textAlign: "center",
                      color: t.colors["text-secondary-color"],
                      backgroundColor: t.colors["surface-muted-color"],
                      fontWeight: weight(t, "medium"),
                      fontVariant: ["tabular-nums"],
                    },
                  ]}
                  {...part("quadrant-task-board", "count")}
                >
                  {count}
                </Text>
              ) : null}
              <IconButton
                size="xsmall"
                variant="ghost"
                label={`${texts.add} · ${title(corner)}`}
                icon={(color, size) => (
                  <Icon name="plus" size={size} color={color} />
                )}
                onPress={() =>
                  openDraft(newQuadrantTaskDraft(geometry, corner))
                }
              />
            </View>
          );
        }}
      />
      <Dialog
        open={formVisible}
        onOpenChange={(next) => {
          if (!next) setFormOpen(false);
        }}
        title={draft?.index === null ? texts.add : texts.edit}
        size="small"
        footer={
          <View style={{ flexDirection: "row", gap: t.space["3"] }}>
            <Button
              variant="outline"
              color="neutral"
              style={{ flex: 1 }}
              onPress={() => setFormOpen(false)}
            >
              {texts.cancel}
            </Button>
            <Button
              style={{ flex: 1 }}
              disabled={!canSaveQuadrantTask(draft, points)}
              onPress={save}
            >
              {texts.save}
            </Button>
          </View>
        }
      >
        <View style={{ gap: t.space["5"] }}>
          <Input
            label={texts.name}
            autoFocus
            value={draft?.label ?? ""}
            onChange={(label) => update({ label })}
            returnKeyType="done"
            onSubmitEditing={save}
          />
          <RadioGroup
            label={texts.quadrant}
            value={draft?.quadrant ?? "topLeft"}
            onChange={(quadrant) =>
              update({ quadrant: quadrant as QuadrantCorner })
            }
            options={QUADRANT_CORNERS.map((corner) => ({
              value: corner,
              label: title(corner),
            }))}
          />
        </View>
      </Dialog>
      <ConfirmDialog
        open={confirmVisible}
        onOpenChange={(next) => {
          if (!next) setConfirmOpen(false);
        }}
        title={texts.delete}
        description={quadrantTaskDeleteText(texts, deleting?.point)}
        cancelLabel={texts.cancel}
        color="danger"
        onConfirm={() => {
          if (deleting && points[deleting.index]) {
            onPointsChange(removeQuadrantTask(points, deleting.index));
            setSelection(selectionAfterRemove(selection, deleting.index));
          }
          setConfirmOpen(false);
        }}
      />
    </View>
  );
}

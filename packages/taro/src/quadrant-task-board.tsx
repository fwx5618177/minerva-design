import { useState, type CSSProperties } from "react";
import { Image, Text, View } from "@tarojs/components";
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
  quadrantTaskColor,
  quadrantTaskDeleteText,
  quadrantTaskLabels,
  removeQuadrantTask,
  selectionAfterRemove,
  type QuadrantCorner,
  type QuadrantPoint,
  type QuadrantTaskDraft,
  type QuadrantTaskLabels,
  quadrantTaskIconUri,
} from "@minerva/charts/canvas";
import { Button, Input } from "./components";
import { IconButton } from "./display";
import { QuadrantChart, type QuadrantChartProps } from "./charts";
import { a11yAttrs, systemLocale } from "./chart-a11y";
import { useOptionalTheme, useThemeTokens } from "./theme";

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
  /** Texts of the buttons and panels (localized by default) */
  labels?: Partial<QuadrantTaskLabels>;
}

/**
 * What opened the inline panel: the quadrant headers (a + button or an empty
 * quadrant of the chart: the caret points at the column of the quadrant) or
 * the actions of the selected task (the caret points at Edit / Delete)
 */
type Anchor =
  | { at: "headers"; caret: "start" | "end" }
  | { at: "actions"; caret: "edit" | "delete" };

/** The inline panel: the add / edit form, or the delete confirmation */
type PanelContent = { anchor: Anchor } & (
  | { kind: "draft"; draft: QuadrantTaskDraft }
  | { kind: "delete"; index: number }
);
type Panel = PanelContent & { key: number };

const ROW: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

/** Caret of the column of a quadrant (left: 25%, right: 75%) */
const columnOf = (corner: QuadrantCorner): "start" | "end" =>
  corner === "topLeft" || corner === "bottomLeft" ? "start" : "end";

/**
 * Task board on a four-quadrant matrix: a header per quadrant (title, count,
 * add button) under the chart, edit and delete buttons for the selected
 * task, an inline panel (anchored under what opened it) to name a task and
 * pick its quadrant or to confirm a delete, drag and drop and "move to"
 * actions. Controlled: `points` in, `onPointsChange` out.
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
  // the + of the add buttons: an image (no inline SVG in mini programs)
  // stroked with the text color of the theme; no icon set in this entry
  const textColor = useThemeTokens().colors["text-color"];
  const addIcon = quadrantTaskIconUri("add", textColor ?? "#111827");
  const locale = props.locale ?? providerLocale ?? systemLocale();
  const [panel, setPanel] = useState<Panel | null>(null);
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

  // opening a panel replaces the current one (a new key: a new focus)
  const open = (next: PanelContent) =>
    setPanel((old) => ({ ...next, key: (old?.key ?? 0) + 1 }));
  const close = () => setPanel(null);
  const addAt = (corner: QuadrantCorner, at?: { x: number; y: number }) =>
    open({
      kind: "draft",
      draft: newQuadrantTaskDraft(geometry, corner, at),
      anchor: { at: "headers", caret: columnOf(corner) },
    });
  const edit = (index: number) => {
    const draft = editQuadrantTaskDraft(geometry, points, index);
    if (draft)
      open({ kind: "draft", draft, anchor: { at: "actions", caret: "edit" } });
  };
  const setDraft = (change: Partial<QuadrantTaskDraft>) =>
    setPanel((old) =>
      old?.kind === "draft"
        ? { ...old, draft: { ...old.draft, ...change } }
        : old,
    );
  const draft = panel?.kind === "draft" ? panel.draft : null;
  const deleting = panel?.kind === "delete" ? panel.index : null;
  const shown =
    panel !== null &&
    (draft
      ? draft.index === null || !!points[draft.index]
      : deleting !== null && !!points[deleting]);
  const save = () => {
    const saved = applyQuadrantTaskDraft(geometry, points, draft);
    if (!saved) return;
    onPointsChange(saved.points);
    setSelection(saved.index);
    close();
  };
  const remove = () => {
    if (deleting !== null && points[deleting]) {
      onPointsChange(removeQuadrantTask(points, deleting));
      setSelection(selectionAfterRemove(selection, deleting));
    }
    close();
  };

  const renderPanel = () => {
    if (!shown) return null;
    const kind = draft ? (draft.index === null ? "add" : "edit") : "delete";
    const heading =
      kind === "add" ? texts.add : kind === "edit" ? texts.edit : texts.delete;
    return (
      <View
        key={panel.key}
        className={cn(
          "mn-quadrant-task-board__panel",
          `mn-quadrant-task-board__panel--${kind}`,
          `mn-quadrant-task-board__panel--caret-${panel.anchor.caret}`,
        )}
        data-quadrant-task-panel={kind}
        {...a11yAttrs(kind === "delete" ? "alertdialog" : "dialog", heading)}
      >
        <View className="mn-quadrant-task-board__caret" aria-hidden>
          <View className="mn-quadrant-task-board__caret-tip" />
        </View>
        <Text className="mn-quadrant-task-board__panel-title">{heading}</Text>
        {draft ? (
          <>
            <View className="mn-quadrant-task-board__field">
              <Text className="mn-quadrant-task-board__label">
                {texts.name}
              </Text>
              <Input
                required
                focus
                size="small"
                className="mn-quadrant-task-board__name"
                value={draft.label}
                aria-label={texts.name}
                onChange={(label) => setDraft({ label })}
                onConfirm={save}
              />
            </View>
            <View className="mn-quadrant-task-board__field">
              <Text className="mn-quadrant-task-board__label">
                {texts.quadrant}
              </Text>
              <View
                className="mn-quadrant-task-board__quadrant-grid"
                {...a11yAttrs("radiogroup", texts.quadrant)}
              >
                {QUADRANT_CORNERS.map((corner) => {
                  const checked = draft.quadrant === corner;
                  return (
                    <View
                      key={corner}
                      className={cn(
                        "mn-quadrant-task-board__chip",
                        checked && "mn-quadrant-task-board__chip--checked",
                      )}
                      data-corner={corner}
                      {...a11yAttrs("radio", title(corner))}
                      aria-checked={checked}
                      onClick={() => setDraft({ quadrant: corner })}
                    >
                      <View
                        className="mn-quadrant-task-board__swatch"
                        style={{
                          background: quadrantTaskColor(
                            props.quadrants,
                            corner,
                          ),
                        }}
                        aria-hidden
                      />
                      <Text className="mn-quadrant-task-board__chip-name">
                        {title(corner)}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
          </>
        ) : (
          <Text className="mn-quadrant-task-board__panel-text">
            {quadrantTaskDeleteText(
              texts,
              deleting === null ? undefined : points[deleting],
            )}
          </Text>
        )}
        <View className="mn-quadrant-task-board__footer">
          <Button
            size="small"
            variant="ghost"
            color="neutral"
            className="mn-quadrant-task-board__cancel"
            onClick={close}
          >
            {texts.cancel}
          </Button>
          {draft ? (
            <Button
              size="small"
              className="mn-quadrant-task-board__save"
              disabled={!canSaveQuadrantTask(draft, points)}
              onClick={save}
            >
              {texts.save}
            </Button>
          ) : (
            <Button
              size="small"
              color="danger"
              className="mn-quadrant-task-board__confirm"
              onClick={remove}
            >
              {texts.confirmDelete}
            </Button>
          )}
        </View>
      </View>
    );
  };

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
          // like a press outside a popover: the open panel closes
          close();
          props.onPointClick?.(point, index);
        }}
        onPointDrop={(_point, index, at) => {
          onPointsChange(moveQuadrantTask(points, index, at));
          setSelection(index);
          close();
        }}
        onQuadrantClick={(corner, at) => addAt(corner, at)}
      />
      <View className="mn-quadrant-task-board__quadrants">
        {QUADRANT_CORNERS.map((corner) => {
          const region = props.quadrants?.[corner];
          return (
            <View
              key={corner}
              className="mn-quadrant-task-board__header"
              data-corner={corner}
              {...a11yAttrs("group", title(corner))}
            >
              {region?.badge ? (
                <Text className="mn-quadrant-task-board__badge">
                  {region.badge}
                </Text>
              ) : null}
              <Text className="mn-quadrant-task-board__title">
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
              <IconButton
                size="xsmall"
                showTooltip={false}
                className="mn-quadrant-task-board__add"
                label={`${texts.add} · ${title(corner)}`}
                aria-expanded={
                  shown && draft?.index === null && draft.quadrant === corner
                }
                icon={
                  <Image
                    src={addIcon}
                    className="mn-quadrant-task-board__add-icon"
                    style={{ width: "16px", height: "16px" }}
                    aria-hidden
                  />
                }
                onClick={() => addAt(corner)}
              />
            </View>
          );
        })}
      </View>
      {panel?.anchor.at === "headers" ? renderPanel() : null}
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
          <Button
            size="small"
            variant="ghost"
            className="mn-quadrant-task-board__edit"
            onClick={() => edit(active)}
          >
            {texts.edit}
          </Button>
          <Button
            size="small"
            variant="ghost"
            color="danger"
            className="mn-quadrant-task-board__delete"
            onClick={() =>
              open({
                kind: "delete",
                index: active,
                anchor: { at: "actions", caret: "delete" },
              })
            }
          >
            {texts.delete}
          </Button>
        </View>
      ) : null}
      {panel?.anchor.at === "actions" ? renderPanel() : null}
    </View>
  );
}

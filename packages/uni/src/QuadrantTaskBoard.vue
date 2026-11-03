<script setup lang="ts">
import { computed, inject, ref, type ComputedRef, type PropType } from "vue";
import {
  QUADRANT_CORNERS,
  quadrantTaskIconUri,
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
  type ChartHoverEvent,
  type ChartView,
  type QuadrantCorner,
  type QuadrantPoint,
  type QuadrantTaskDraft,
  type QuadrantTaskLabels,
} from "@minerva/charts/canvas";
import {
  chartCommonProps,
  quadrantChartProps,
  type ChartHandle,
  type QuadrantDropTarget,
} from "./chart-types";
import { chartThemeVariables } from "./chart-canvas";
import QuadrantChart from "./QuadrantChart.vue";
import Button from "./Button.vue";
import IconButton from "./IconButton.vue";
/**
 * Task board on a four-quadrant matrix: a header per quadrant (title,
 * count, add button) under the chart, edit and delete buttons for the
 * selected task, an inline panel (anchored under what opened it) to name a
 * task and pick its quadrant or to confirm a delete, drag and drop and
 * "move to" actions. Controlled: `points` in (`v-model:points`),
 * `pointsChange` out.
 */
const props = defineProps({
  ...chartCommonProps,
  ...quadrantChartProps,
  /** Texts of the buttons and panels (localized by default) */
  labels: Object as PropType<Partial<QuadrantTaskLabels>>,
});
const emit = defineEmits<{
  /** The next list of tasks after an add, edit, delete or move (v-model:points) */
  "update:points": [points: QuadrantPoint[]];
  /** The next list of tasks after an add, edit, delete or move */
  pointsChange: [points: QuadrantPoint[]];
  hover: [event: ChartHoverEvent | null];
  pointClick: [point: QuadrantPoint, index: number];
  zoom: [view: ChartView];
}>();

const config = inject<ComputedRef<
  Parameters<typeof chartThemeVariables>[0] & { locale?: string }
> | null>("minerva:config", null);
const locale = computed(
  () => props.locale || config?.value?.locale || undefined,
);
const texts = computed(() => quadrantTaskLabels(locale.value, props.labels));
const geometry = () => ({
  xDomain: props.xDomain,
  yDomain: props.yDomain,
  xSplit: props.xSplit,
  ySplit: props.ySplit,
  reverseX: props.reverseX,
});
// every chart prop but the ones the board sets itself
const chartProps = computed(() => {
  const {
    labels: _labels,
    points: _points,
    locale: _locale,
    selectedIndex: _selectedIndex,
    ...rest
  } = props;
  return rest;
});

// The + of the add buttons: a base64 SVG image (mini-program images reject
// percent-encoded SVG and have no currentColor), stroked with the text color
// of the theme like the icons of the icon set
const addIcon = computed(() => {
  const color = (
    chartThemeVariables(config?.value)["--text-color"] ?? "#111827"
  ).replace(/["<>&]/g, "");
  return quadrantTaskIconUri("add", color);
});

/**
 * The inline panel (add / edit form or delete confirmation), under what
 * opened it: the quadrant headers (caret at the column of the quadrant) or
 * the actions of the selected task (caret at Edit / Delete)
 */
type Anchor =
  | { at: "headers"; caret: "start" | "end" }
  | { at: "actions"; caret: "edit" | "delete" };
type PanelContent = { anchor: Anchor } & (
  | { kind: "draft"; draft: QuadrantTaskDraft }
  | { kind: "delete"; index: number }
);
type Panel = PanelContent & { key: number };
const panel = ref<Panel | null>(null);
let opened = 0;
// opening a panel replaces the current one (a new key: a new focus)
const open = (next: PanelContent) => {
  panel.value = { ...next, key: ++opened };
};
const close = () => {
  panel.value = null;
};
const columnOf = (corner: QuadrantCorner): "start" | "end" =>
  corner === "topLeft" || corner === "bottomLeft" ? "start" : "end";

const selection = ref<number | null>(null);
const selected = computed(() =>
  props.selectedIndex !== undefined ? props.selectedIndex : selection.value,
);
const active = computed(() => {
  const index = selected.value;
  return index !== null && index !== undefined && props.points[index]
    ? index
    : null;
});
const activeLabel = computed(() =>
  active.value === null ? "" : (props.points[active.value]!.label ?? ""),
);

const title = (corner: QuadrantCorner) =>
  props.quadrants?.[corner]?.label || quadrantLabels(locale.value)[corner];
const draft = computed(() =>
  panel.value?.kind === "draft" ? panel.value.draft : null,
);
const deleting = computed(() =>
  panel.value?.kind === "delete" ? panel.value.index : null,
);
const shown = computed(() => {
  if (!panel.value) return false;
  const d = draft.value;
  if (d) return d.index === null || !!props.points[d.index];
  return deleting.value !== null && !!props.points[deleting.value];
});
const headers = computed(() => {
  const groups = quadrantGroups({ points: props.points, ...geometry() });
  return QUADRANT_CORNERS.map((corner) => ({
    corner,
    title: title(corner),
    badge: props.quadrants?.[corner]?.badge,
    count:
      props.showCounts === false
        ? undefined
        : quadrantCountText(
            props.showCounts ?? true,
            groups[corner].points,
            locale.value,
          ),
    addLabel: `${texts.value.add} · ${title(corner)}`,
    expanded:
      shown.value &&
      draft.value?.index === null &&
      draft.value.quadrant === corner,
  }));
});
const chips = computed(() =>
  QUADRANT_CORNERS.map((corner) => ({
    corner,
    title: title(corner),
    color: quadrantTaskColor(props.quadrants, corner),
    checked: draft.value?.quadrant === corner,
  })),
);
const view = computed(() => {
  if (!shown.value || !panel.value) return null;
  const kind = draft.value
    ? draft.value.index === null
      ? "add"
      : "edit"
    : "delete";
  return {
    kind,
    key: panel.value.key,
    at: panel.value.anchor.at,
    caret: panel.value.anchor.caret,
    title:
      kind === "add"
        ? texts.value.add
        : kind === "edit"
          ? texts.value.edit
          : texts.value.delete,
  };
});
/** The rows under the chart, the panel right below the one that opened it */
const sections = computed(() => {
  const at = view.value?.at;
  const panelRow = `panel-${view.value?.key}`;
  return [
    "headers",
    ...(at === "headers" ? [panelRow] : []),
    ...(active.value !== null ? ["actions"] : []),
    ...(at === "actions" ? [panelRow] : []),
  ];
});

const change = (points: QuadrantPoint[]) => {
  emit("update:points", points);
  emit("pointsChange", points);
};
const onPointClick = (point: QuadrantPoint, index: number) => {
  selection.value = index;
  // like a press outside a popover: the open panel closes
  close();
  emit("pointClick", point, index);
};
const onPointDrop = (
  _point: QuadrantPoint,
  index: number,
  at: QuadrantDropTarget,
) => {
  change(moveQuadrantTask(props.points, index, at));
  selection.value = index;
  close();
};
const addAt = (corner: QuadrantCorner, at?: { x: number; y: number }) =>
  open({
    kind: "draft",
    draft: newQuadrantTaskDraft(geometry(), corner, at),
    anchor: { at: "headers", caret: columnOf(corner) },
  });
const onQuadrantClick = (
  corner: QuadrantCorner,
  at: { x: number; y: number },
) => addAt(corner, at);
const edit = () => {
  if (active.value === null) return;
  const next = editQuadrantTaskDraft(geometry(), props.points, active.value);
  if (next)
    open({
      kind: "draft",
      draft: next,
      anchor: { at: "actions", caret: "edit" },
    });
};
const askDelete = () => {
  if (active.value === null) return;
  open({
    kind: "delete",
    index: active.value,
    anchor: { at: "actions", caret: "delete" },
  });
};
const setDraft = (change: Partial<QuadrantTaskDraft>) => {
  const old = panel.value;
  if (old?.kind === "draft")
    panel.value = { ...old, draft: { ...old.draft, ...change } };
};
const onName = (event: unknown) => {
  const value = (event as { detail?: { value?: unknown } })?.detail?.value;
  if (typeof value === "string") setDraft({ label: value });
};
const canSave = computed(() => canSaveQuadrantTask(draft.value, props.points));
const save = () => {
  const saved = applyQuadrantTaskDraft(geometry(), props.points, draft.value);
  if (!saved) return;
  change(saved.points);
  selection.value = saved.index;
  close();
};
const deleteText = computed(() =>
  quadrantTaskDeleteText(
    texts.value,
    deleting.value === null ? undefined : props.points[deleting.value],
  ),
);
const remove = () => {
  const index = deleting.value;
  if (index !== null && props.points[index]) {
    change(removeQuadrantTask(props.points, index));
    selection.value = selectionAfterRemove(selection.value, index);
  }
  close();
};

const chart = ref<ChartHandle | null>(null);
defineExpose<ChartHandle>({
  resetZoom: () => chart.value?.resetZoom(),
  getView: () => chart.value?.getView() ?? null,
  setView: (view) => chart.value?.setView(view),
  getRenderer: () => chart.value?.getRenderer() ?? null,
  getInstance: () => chart.value?.getInstance() ?? null,
  resize: () => chart.value?.resize(),
});
</script>
<template>
  <view
    class="mn-quadrant-task-board"
    data-minerva="quadrant-task-board"
    style="display: flex; flex-direction: column; gap: 8px"
  >
    <QuadrantChart
      ref="chart"
      v-bind="chartProps"
      :points="points"
      :locale="locale"
      :selected-index="selected"
      @hover="emit('hover', $event)"
      @zoom="emit('zoom', $event)"
      @point-click="onPointClick"
      @point-drop="onPointDrop"
      @quadrant-click="onQuadrantClick"
    />
    <template v-for="section in sections" :key="section">
      <view
        v-if="section === 'headers'"
        class="mn-quadrant-task-board__quadrants"
      >
        <view
          v-for="header in headers"
          :key="header.corner"
          class="mn-quadrant-task-board__header"
          role="group"
          aria-role="group"
          :aria-label="header.title"
          :data-corner="header.corner"
        >
          <text v-if="header.badge" class="mn-quadrant-task-board__badge">{{
            header.badge
          }}</text>
          <text class="mn-quadrant-task-board__title">{{ header.title }}</text>
          <text
            v-if="header.count !== undefined"
            class="mn-quadrant-task-board__count"
            >{{ header.count }}</text
          >
          <IconButton
            size="xsmall"
            class="mn-quadrant-task-board__add"
            :label="header.addLabel"
            :show-tooltip="false"
            :aria-expanded="header.expanded"
            @click="addAt(header.corner)"
            ><template #icon
              ><image
                class="mn-quadrant-task-board__add-icon"
                :src="addIcon"
                mode="aspectFit"
                aria-hidden="true" /></template
          ></IconButton>
        </view>
      </view>
      <view
        v-else-if="section === 'actions'"
        class="mn-quadrant-task-board__actions"
        role="toolbar"
        aria-role="toolbar"
        :aria-label="texts.actions"
        style="display: flex; align-items: center; gap: 8px"
      >
        <text
          class="mn-quadrant-task-board__active"
          style="flex: 1; min-width: 0"
          >{{ activeLabel }}</text
        >
        <Button
          size="small"
          variant="ghost"
          class="mn-quadrant-task-board__edit"
          data-action="edit"
          @click="edit"
          >{{ texts.edit }}</Button
        >
        <Button
          size="small"
          variant="ghost"
          color="danger"
          class="mn-quadrant-task-board__delete"
          data-action="delete"
          @click="askDelete"
          >{{ texts.delete }}</Button
        >
      </view>
      <view
        v-else-if="view"
        class="mn-quadrant-task-board__panel"
        :class="[
          `mn-quadrant-task-board__panel--${view.kind}`,
          `mn-quadrant-task-board__panel--caret-${view.caret}`,
        ]"
        :data-quadrant-task-panel="view.kind"
        :role="view.kind === 'delete' ? 'alertdialog' : 'dialog'"
        :aria-role="view.kind === 'delete' ? 'alertdialog' : 'dialog'"
        :aria-label="view.title"
      >
        <view class="mn-quadrant-task-board__caret" aria-hidden="true"
          ><view class="mn-quadrant-task-board__caret-tip"
        /></view>
        <text class="mn-quadrant-task-board__panel-title">{{
          view.title
        }}</text>
        <template v-if="draft">
          <view class="mn-quadrant-task-board__field">
            <text class="mn-quadrant-task-board__label">{{ texts.name }}</text>
            <input
              class="mn-input mn-quadrant-task-board__name"
              :value="draft.label"
              :aria-label="texts.name"
              aria-required="true"
              :focus="true"
              @input="onName"
              @confirm="save"
            />
          </view>
          <view class="mn-quadrant-task-board__field">
            <text class="mn-quadrant-task-board__label">{{
              texts.quadrant
            }}</text>
            <view
              class="mn-quadrant-task-board__quadrant-grid"
              role="radiogroup"
              aria-role="radiogroup"
              :aria-label="texts.quadrant"
            >
              <view
                v-for="chip in chips"
                :key="chip.corner"
                class="mn-quadrant-task-board__chip"
                :class="{
                  'mn-quadrant-task-board__chip--checked': chip.checked,
                }"
                :data-corner="chip.corner"
                role="radio"
                aria-role="radio"
                :aria-label="chip.title"
                :aria-checked="chip.checked"
                @tap="setDraft({ quadrant: chip.corner })"
              >
                <view
                  class="mn-quadrant-task-board__swatch"
                  :style="{ background: chip.color }"
                  aria-hidden="true"
                />
                <text class="mn-quadrant-task-board__chip-name">{{
                  chip.title
                }}</text>
              </view>
            </view>
          </view>
        </template>
        <text v-else class="mn-quadrant-task-board__panel-text">{{
          deleteText
        }}</text>
        <view class="mn-quadrant-task-board__footer">
          <Button
            size="small"
            variant="ghost"
            color="neutral"
            class="mn-quadrant-task-board__cancel"
            data-action="cancel"
            @click="close"
            >{{ texts.cancel }}</Button
          >
          <Button
            v-if="draft"
            size="small"
            class="mn-quadrant-task-board__save"
            data-action="save"
            :disabled="!canSave"
            @click="save"
            >{{ texts.save }}</Button
          >
          <Button
            v-else
            size="small"
            color="danger"
            class="mn-quadrant-task-board__confirm"
            data-action="confirm"
            @click="remove"
            >{{ texts.confirmDelete }}</Button
          >
        </view>
      </view>
    </template>
  </view>
</template>

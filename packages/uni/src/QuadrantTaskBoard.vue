<script setup lang="ts">
import { computed, inject, ref, type ComputedRef, type PropType } from "vue";
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
import QuadrantChart from "./QuadrantChart.vue";
import Button from "./Button.vue";
import Input from "./Input.vue";
import RadioGroup from "./RadioGroup.vue";
import Modal from "./Modal.vue";
import ConfirmDialog from "./ConfirmDialog.vue";
/**
 * Task board on a four-quadrant matrix: a header per quadrant (title,
 * count, add button) under the chart, edit and delete buttons for the
 * selected task, a dialog to name a task and pick its quadrant, a
 * confirmation before a delete, drag and drop and "move to" actions.
 * Controlled: `points` in (`v-model:points`), `pointsChange` out.
 */
const props = defineProps({
  ...chartCommonProps,
  ...quadrantChartProps,
  /** Texts of the buttons and dialogs (localized by default) */
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

const config = inject<ComputedRef<{ locale?: string }> | null>(
  "minerva:config",
  null,
);
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

const draft = ref<QuadrantTaskDraft | null>(null);
const deleting = ref<number | null>(null);
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
  }));
});
const quadrantOptions = computed(() =>
  QUADRANT_CORNERS.map((corner) => ({ value: corner, label: title(corner) })),
);

const change = (points: QuadrantPoint[]) => {
  emit("update:points", points);
  emit("pointsChange", points);
};
const onPointClick = (point: QuadrantPoint, index: number) => {
  selection.value = index;
  emit("pointClick", point, index);
};
const onPointDrop = (
  _point: QuadrantPoint,
  index: number,
  at: QuadrantDropTarget,
) => {
  change(moveQuadrantTask(props.points, index, at));
  selection.value = index;
};
const onQuadrantClick = (
  corner: QuadrantCorner,
  at: { x: number; y: number },
) => {
  draft.value = newQuadrantTaskDraft(geometry(), corner, at);
};
const add = (corner: QuadrantCorner) => {
  draft.value = newQuadrantTaskDraft(geometry(), corner);
};
const edit = () => {
  if (active.value === null) return;
  draft.value = editQuadrantTaskDraft(geometry(), props.points, active.value);
};
const askDelete = () => {
  deleting.value = active.value;
};
const setLabel = (label: string) => {
  if (draft.value) draft.value = { ...draft.value, label };
};
const setQuadrant = (corner: string | number) => {
  if (draft.value)
    draft.value = { ...draft.value, quadrant: corner as QuadrantCorner };
};
const canSave = computed(() => canSaveQuadrantTask(draft.value, props.points));
const save = () => {
  const saved = applyQuadrantTaskDraft(geometry(), props.points, draft.value);
  if (!saved) return;
  change(saved.points);
  selection.value = saved.index;
  draft.value = null;
};
const closeDraft = (open?: boolean) => {
  if (!open) draft.value = null;
};
const open = computed(
  () =>
    draft.value !== null &&
    (draft.value.index === null || !!props.points[draft.value.index]),
);
const confirming = computed(
  () => deleting.value !== null && !!props.points[deleting.value],
);
const deleteText = computed(() =>
  quadrantTaskDeleteText(
    texts.value,
    deleting.value === null ? undefined : props.points[deleting.value],
  ),
);
const closeDelete = (open?: boolean) => {
  if (!open) deleting.value = null;
};
const remove = () => {
  const index = deleting.value;
  if (index !== null && props.points[index]) {
    change(removeQuadrantTask(props.points, index));
    selection.value = selectionAfterRemove(selection.value, index);
  }
  deleting.value = null;
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
    <view
      class="mn-quadrant-task-board__quadrants"
      style="display: flex; flex-wrap: wrap; row-gap: 4px"
    >
      <view
        v-for="header in headers"
        :key="header.corner"
        class="mn-quadrant-task-board__header"
        :data-corner="header.corner"
        style="
          display: flex;
          align-items: center;
          gap: 8px;
          width: 50%;
          box-sizing: border-box;
          padding: 0 4px;
        "
      >
        <text v-if="header.badge" class="mn-quadrant-task-board__badge">{{
          header.badge
        }}</text>
        <text
          class="mn-quadrant-task-board__title"
          style="flex: 1; min-width: 0"
          >{{ header.title }}</text
        >
        <text
          v-if="header.count !== undefined"
          class="mn-quadrant-task-board__count"
          >{{ header.count }}</text
        >
        <Button
          size="xsmall"
          variant="ghost"
          class="mn-quadrant-task-board__add"
          :aria-label="header.addLabel"
          @click="add(header.corner)"
          >+</Button
        >
      </view>
    </view>
    <view
      v-if="active !== null"
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
      <Button size="small" variant="ghost" data-action="edit" @click="edit">{{
        texts.edit
      }}</Button>
      <Button
        size="small"
        variant="ghost"
        color="danger"
        data-action="delete"
        @click="askDelete"
        >{{ texts.delete }}</Button
      >
    </view>
    <Modal
      :open="open"
      :title="draft?.index === null ? texts.add : texts.edit"
      size="small"
      @open-change="closeDraft"
    >
      <view
        class="mn-quadrant-task-board__form"
        style="display: flex; flex-direction: column; gap: 12px"
      >
        <view class="mn-quadrant-task-board__field">
          <text>{{ texts.name }}</text>
          <Input
            required
            :model-value="draft?.label ?? ''"
            :aria-label="texts.name"
            @update:model-value="setLabel"
            @confirm="save"
          />
        </view>
        <view class="mn-quadrant-task-board__field">
          <text>{{ texts.quadrant }}</text>
          <RadioGroup
            :model-value="draft?.quadrant ?? 'topLeft'"
            :aria-label="texts.quadrant"
            :options="quadrantOptions"
            @update:model-value="setQuadrant"
          />
        </view>
      </view>
      <template #footer
        ><view class="mn-dialog-footer">
          <Button
            data-action="cancel"
            variant="outline"
            color="neutral"
            @click="closeDraft()"
            >{{ texts.cancel }}</Button
          >
          <Button data-action="save" :disabled="!canSave" @click="save">{{
            texts.save
          }}</Button>
        </view></template
      >
    </Modal>
    <ConfirmDialog
      :open="confirming"
      :title="texts.delete"
      :description="deleteText"
      :cancel-label="texts.cancel"
      color="danger"
      :on-confirm="remove"
      @open-change="closeDelete"
    />
  </view>
</template>

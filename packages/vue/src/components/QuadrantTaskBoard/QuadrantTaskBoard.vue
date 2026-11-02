<script setup lang="ts">
/**
 * QuadrantTaskBoard: a task board on a four-quadrant matrix (QuadrantChart):
 * an add button per quadrant, edit and delete buttons on the active task, a
 * dialog to name a task and pick its quadrant, a confirmation before a
 * delete, drag and drop and keyboard moves (Shift + arrows). Controlled:
 * `points` in, `update:points` / `pointsChange` out (`v-model:points`).
 * Every other prop goes to the QuadrantChart.
 */
import {
  computed,
  h,
  ref,
  shallowRef,
  type FunctionalComponent,
  type PropType,
} from "vue";
import {
  QUADRANT_CORNERS,
  QUADRANT_TASK_ICONS,
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
  type ChartHoverEvent,
  type ChartRendererKind,
  type ChartView,
  type QuadrantCorner,
  type QuadrantPoint,
  type QuadrantTaskDraft,
  type QuadrantTaskLabels,
} from "minerva-design/charts/core";
import styles from "@react-styles/components/QuadrantTaskBoard/quadrantTaskBoard.module.scss";
import QuadrantChart from "../Chart/QuadrantChart.vue";
import { quadrantChartProps } from "../Chart/props";
import type { ChartHandle, QuadrantDropTarget } from "../Chart/types";
import { Button } from "../Button";
import { IconButton } from "../IconButton";
import { Input } from "../Input";
import { Select, SelectItem } from "../Select";
import { Modal, ModalBody, ModalFooter } from "../Modal";
import { ConfirmDialog } from "../Confirm";
import { useI18n } from "../../config/useI18n";

defineOptions({ name: "QuadrantTaskBoard", inheritAttrs: false });

const props = defineProps({
  ...quadrantChartProps,
  /** Texts of the buttons and dialogs (localized by default) */
  labels: Object as PropType<Partial<QuadrantTaskLabels>>,
});
const emit = defineEmits<{
  /**
   * The next list of tasks after an add, an edit, a delete, a drag and drop
   * or a keyboard move (`v-model:points`)
   */
  "update:points": [points: QuadrantPoint[]];
  /** Same as `update:points` */
  pointsChange: [points: QuadrantPoint[]];
  /** The hovered (or keyboard-focused) point changed (`null`: none) */
  hover: [event: ChartHoverEvent | null];
  /** A point was clicked (it becomes the active task) */
  pointClick: [point: QuadrantPoint, index: number];
  /** A point is being dragged (on every move, with the quadrant under the pointer) */
  pointDrag: [point: QuadrantPoint, index: number, target: QuadrantDropTarget];
  /** The user zoomed or panned */
  zoom: [view: ChartView];
  /** The backend is ready (or fell back after a GPU loss) */
  rendererChange: [renderer: ChartRendererKind];
}>();

const ActionIcon: FunctionalComponent<{
  kind: keyof typeof QUADRANT_TASK_ICONS;
}> = ({ kind }) =>
  h(
    "svg",
    {
      width: 16,
      height: 16,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": 1.8,
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "aria-hidden": "true",
    },
    [h("path", { d: QUADRANT_TASK_ICONS[kind] })],
  );
ActionIcon.props = ["kind"];

const { language } = useI18n();
const locale = computed(() => props.locale ?? language.value);
const texts = computed(() => quadrantTaskLabels(locale.value, props.labels));
const defaults = computed(() => quadrantLabels(locale.value));
const title = (corner: QuadrantCorner) =>
  props.quadrants?.[corner]?.label || defaults.value[corner];
const geometry = () => ({
  xDomain: props.xDomain,
  yDomain: props.yDomain,
  xSplit: props.xSplit,
  ySplit: props.ySplit,
  reverseX: props.reverseX,
});
// the props of the chart (`labels` are the texts of the board)
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

const change = (points: QuadrantPoint[]) => {
  emit("update:points", points);
  emit("pointsChange", points);
};
const add = (corner: QuadrantCorner, at?: { x: number; y: number }) => {
  draft.value = newQuadrantTaskDraft(geometry(), corner, at);
};
const edit = (index: number) => {
  draft.value = editQuadrantTaskDraft(geometry(), props.points, index);
};
const save = () => {
  const saved = applyQuadrantTaskDraft(geometry(), props.points, draft.value);
  if (!saved) return;
  change(saved.points);
  selection.value = saved.index;
  draft.value = null;
};
const setLabel = (label: string) => {
  if (draft.value) draft.value = { ...draft.value, label };
};
const setQuadrant = (quadrant: string) => {
  if (draft.value)
    draft.value = { ...draft.value, quadrant: quadrant as QuadrantCorner };
};
const editing = computed(
  () =>
    draft.value !== null &&
    (draft.value.index === null || !!props.points[draft.value.index]),
);
const canSave = computed(() => canSaveQuadrantTask(draft.value, props.points));
const closeDraft = (open: boolean) => {
  if (!open) draft.value = null;
};

const deletingPoint = computed(() =>
  deleting.value === null ? undefined : props.points[deleting.value],
);
const closeDelete = (open: boolean) => {
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

const onPointClick = (point: QuadrantPoint, index: number) => {
  selection.value = index;
  emit("pointClick", point, index);
};
const onPointDrop = (
  _point: QuadrantPoint,
  index: number,
  target: QuadrantDropTarget,
) => {
  change(moveQuadrantTask(props.points, index, target));
  selection.value = index;
};

const chart = shallowRef<ChartHandle | null>(null);
const handle: ChartHandle = {
  resetZoom: () => chart.value?.resetZoom(),
  getView: () => chart.value?.getView() ?? null,
  setView: (view) => chart.value?.setView(view),
  getRenderer: () => chart.value?.getRenderer() ?? null,
  getInstance: () => chart.value?.getInstance() ?? null,
};
defineExpose(handle);
</script>

<template>
  <div :class="styles.board">
    <QuadrantChart
      ref="chart"
      v-bind="{ ...chartProps, ...$attrs }"
      :points="points"
      :locale="locale"
      :selected-index="selected"
      @hover="emit('hover', $event)"
      @point-click="onPointClick"
      @point-double-click="(_point, index) => edit(index)"
      @point-drag="
        (point, index, target) => emit('pointDrag', point, index, target)
      "
      @point-drop="onPointDrop"
      @quadrant-click="add"
      @zoom="emit('zoom', $event)"
      @renderer-change="emit('rendererChange', $event)"
    >
      <template #point-actions="{ index }">
        <div
          role="toolbar"
          :aria-label="texts.actions"
          :class="styles.actions"
          @pointerdown.stop
        >
          <IconButton
            size="small"
            variant="ghost"
            :label="texts.edit"
            @click="edit(index)"
          >
            <ActionIcon kind="edit" />
          </IconButton>
          <IconButton
            size="small"
            variant="ghost"
            color="danger"
            :label="texts.delete"
            @click="deleting = index"
          >
            <ActionIcon kind="delete" />
          </IconButton>
        </div>
      </template>
      <template #quadrant-header="{ corner, info }">
        <div :class="styles.header" :data-corner="corner">
          <span v-if="info.region?.badge" :class="styles.badge">{{
            info.region.badge
          }}</span>
          <span :class="styles.title">{{ title(corner) }}</span>
          <span v-if="showCounts !== false" :class="styles.count">{{
            quadrantCountText(showCounts ?? true, info.points, locale)
          }}</span>
          <IconButton
            size="xsmall"
            variant="ghost"
            :class="styles.add"
            :label="`${texts.add} · ${title(corner)}`"
            @click="add(corner)"
          >
            <ActionIcon kind="add" />
          </IconButton>
        </div>
      </template>
    </QuadrantChart>
    <Modal
      :open="editing"
      :title="draft?.index === null ? texts.add : texts.edit"
      size="small"
      @update:open="closeDraft"
    >
      <form @submit.prevent="save">
        <ModalBody :class="styles.form">
          <label :class="styles.field">
            <span>{{ texts.name }}</span>
            <Input
              required
              autofocus
              :model-value="draft?.label ?? ''"
              :aria-label="texts.name"
              @update:model-value="setLabel"
            />
          </label>
          <label :class="styles.field">
            <span>{{ texts.quadrant }}</span>
            <Select
              :model-value="draft?.quadrant ?? 'topLeft'"
              :aria-label="texts.quadrant"
              @update:model-value="setQuadrant"
            >
              <SelectItem
                v-for="corner in QUADRANT_CORNERS"
                :key="corner"
                :value="corner"
              >
                {{ title(corner) }}
              </SelectItem>
            </Select>
          </label>
        </ModalBody>
        <ModalFooter>
          <Button color="neutral" variant="outline" @click="draft = null">
            {{ texts.cancel }}
          </Button>
          <Button type="submit" :disabled="!canSave">{{ texts.save }}</Button>
        </ModalFooter>
      </form>
    </Modal>
    <ConfirmDialog
      :open="deletingPoint !== undefined"
      :title="texts.delete"
      :description="quadrantTaskDeleteText(texts, deletingPoint)"
      :cancel-label="texts.cancel"
      color="danger"
      @update:open="closeDelete"
      @confirm="remove"
    />
  </div>
</template>

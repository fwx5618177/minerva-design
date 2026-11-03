<script setup lang="ts">
/**
 * QuadrantTaskBoard: a task board on a four-quadrant matrix (QuadrantChart):
 * an add button per quadrant, edit and delete buttons on the active task, an
 * inline panel anchored at the button or the task to name a task and pick its
 * quadrant, an inline confirmation before a delete, drag and drop and
 * keyboard moves (Shift + arrows). Controlled:
 * `points` in, `update:points` / `pointsChange` out (`v-model:points`).
 * Every other prop goes to the QuadrantChart.
 */
import {
  computed,
  h,
  ref,
  shallowRef,
  useId,
  watch,
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
  placeQuadrantTaskPanel,
  quadrantCountText,
  quadrantLabels,
  quadrantTaskColor,
  quadrantTaskDeleteText,
  quadrantTaskLabels,
  removeQuadrantTask,
  selectionAfterRemove,
  type ChartHoverEvent,
  type ChartRendererKind,
  type ChartView,
  type QuadrantCorner,
  type QuadrantPoint,
  type QuadrantTaskBox,
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
import { useI18n } from "../../config/useI18n";

defineOptions({ name: "QuadrantTaskBoard", inheritAttrs: false });

const props = defineProps({
  ...quadrantChartProps,
  /** Texts of the buttons and panels (localized by default) */
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
  size?: number;
}> = ({ kind, size = 16 }) =>
  h(
    "svg",
    {
      width: size,
      height: size,
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
ActionIcon.props = ["kind", "size"];

/** The inline panel: the add / edit form, or the delete confirmation */
type Panel =
  | { kind: "draft"; draft: QuadrantTaskDraft; anchor: QuadrantTaskBox }
  | { kind: "delete"; index: number; anchor: QuadrantTaskBox };

/** Half the size of the box around a task the panel keeps clear */
const DOT = 10;
const NO_BOX: QuadrantTaskBox = { x: 0, y: 0, width: 0, height: 0 };

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

const id = useId();
const board = ref<HTMLDivElement | null>(null);
const panelEl = ref<HTMLDivElement | null>(null);
const panel = ref<Panel | null>(null);
const selection = ref<number | null>(null);
const selected = computed(() =>
  props.selectedIndex !== undefined ? props.selectedIndex : selection.value,
);
let lastPointer: QuadrantTaskBox | null = null;
let returnFocus: HTMLElement | null = null;

const change = (points: QuadrantPoint[]) => {
  emit("update:points", points);
  emit("pointsChange", points);
};
const color = (corner: QuadrantCorner) =>
  quadrantTaskColor(props.quadrants, corner);

/** Box of an element, relative to the board */
const boxOf = (el: Element | null | undefined): QuadrantTaskBox | null => {
  const root = board.value;
  if (!el || !root) return null;
  const b = root.getBoundingClientRect();
  const r = el.getBoundingClientRect();
  return {
    x: r.left - b.left,
    y: r.top - b.top,
    width: r.width,
    height: r.height,
  };
};
/** Box around a task (its anchor in the chart), else the last pointer */
const pointBox = (index: number): QuadrantTaskBox => {
  const box = boxOf(
    board.value?.querySelector(
      `.minerva-chart-quadrant-point[data-point-index="${index}"]`,
    ),
  );
  if (box)
    return {
      x: box.x - DOT,
      y: box.y - DOT,
      width: 2 * DOT,
      height: 2 * DOT,
    };
  return lastPointer ?? NO_BOX;
};
const trackPointer = (event: PointerEvent) => {
  const root = board.value;
  if (!root) return;
  const b = root.getBoundingClientRect();
  lastPointer = {
    x: event.clientX - b.left,
    y: event.clientY - b.top,
    width: 0,
    height: 0,
  };
};

const open = (next: Panel) => {
  if (!panel.value) {
    const active = document.activeElement;
    returnFocus = active instanceof HTMLElement ? active : null;
  }
  panel.value = next;
};
const close = () => {
  panel.value = null;
  const target = returnFocus;
  returnFocus = null;
  if (target?.isConnected) target.focus();
};
const add = (corner: QuadrantCorner, event: MouseEvent) =>
  open({
    kind: "draft",
    draft: newQuadrantTaskDraft(geometry(), corner),
    anchor: boxOf(event.currentTarget as Element | null) ?? NO_BOX,
  });
const addAt = (corner: QuadrantCorner, at: { x: number; y: number }) =>
  open({
    kind: "draft",
    draft: newQuadrantTaskDraft(geometry(), corner, at),
    anchor: lastPointer ?? NO_BOX,
  });
const edit = (index: number, anchor = pointBox(index)) => {
  const draft = editQuadrantTaskDraft(geometry(), props.points, index);
  if (draft) open({ kind: "draft", draft, anchor });
};
const confirmRemove = (index: number) =>
  open({ kind: "delete", index, anchor: pointBox(index) });
const setDraft = (patch: Partial<QuadrantTaskDraft>) => {
  const old = panel.value;
  if (old?.kind === "draft")
    panel.value = { ...old, draft: { ...old.draft, ...patch } };
};

const draft = computed(() =>
  panel.value?.kind === "draft" ? panel.value.draft : null,
);
const deleting = computed(() =>
  panel.value?.kind === "delete" ? panel.value.index : null,
);
const shown = computed(() => {
  if (!panel.value) return false;
  if (draft.value)
    return draft.value.index === null || !!props.points[draft.value.index];
  return deleting.value !== null && !!props.points[deleting.value];
});
const anchor = computed(() => (shown.value ? panel.value!.anchor : null));
const kind = computed(() => (shown.value ? panel.value!.kind : null));
const canSave = computed(() => canSaveQuadrantTask(draft.value, props.points));

const save = () => {
  const saved = applyQuadrantTaskDraft(geometry(), props.points, draft.value);
  if (!saved) return;
  change(saved.points);
  selection.value = saved.index;
  close();
};
const remove = () => {
  const index = deleting.value;
  if (index !== null && props.points[index]) {
    change(removeQuadrantTask(props.points, index));
    selection.value = selectionAfterRemove(selection.value, index);
  }
  close();
};
const onPanelKeydown = (event: KeyboardEvent) => {
  if (event.key !== "Escape") return;
  event.preventDefault();
  event.stopPropagation();
  close();
};

// next to its anchor, inside the board, once rendered; then the first field
// (or Cancel) takes the focus
watch(
  [anchor, kind],
  ([box]) => {
    const el = panelEl.value;
    const root = board.value;
    if (!el || !root || !box) return;
    const place = placeQuadrantTaskPanel(
      box,
      { width: el.offsetWidth, height: el.offsetHeight },
      { width: root.clientWidth, height: root.clientHeight },
    );
    el.style.left = `${place.x}px`;
    el.style.top = `${place.y}px`;
    el.style.transformOrigin = `${place.origin.x}px ${place.origin.y}px`;
    el.dataset.placement = place.placement;
    el.querySelector<HTMLElement>("[data-autofocus]")?.focus({
      preventScroll: true,
    });
  },
  { flush: "post" },
);

// a press outside the panel closes it, like a popover
watch(
  shown,
  (isShown, _old, onCleanup) => {
    if (!isShown) return;
    const onDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (target && panelEl.value?.contains(target)) return;
      panel.value = null;
      returnFocus = null;
    };
    document.addEventListener("pointerdown", onDown, true);
    onCleanup(() => document.removeEventListener("pointerdown", onDown, true));
  },
  { flush: "post" },
);

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
  <div
    ref="board"
    :class="styles.board"
    :data-panel="kind ?? undefined"
    @pointerdown.capture="trackPointer"
  >
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
      @quadrant-click="addAt"
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
            size="xsmall"
            variant="ghost"
            :label="texts.edit"
            @click="edit(index)"
          >
            <ActionIcon kind="edit" :size="14" />
          </IconButton>
          <IconButton
            size="xsmall"
            variant="ghost"
            color="danger"
            :label="texts.delete"
            @click="confirmRemove(index)"
          >
            <ActionIcon kind="delete" :size="14" />
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
            :aria-expanded="
              shown && draft?.index === null && draft.quadrant === corner
            "
            @click="(event: MouseEvent) => add(corner, event)"
          >
            <ActionIcon kind="add" />
          </IconButton>
        </div>
      </template>
    </QuadrantChart>
    <div
      v-if="shown && draft"
      ref="panelEl"
      role="dialog"
      :aria-labelledby="`${id}-title`"
      :class="styles.panel"
      :data-quadrant-task-panel="draft.index === null ? 'add' : 'edit'"
      @keydown="onPanelKeydown"
    >
      <form :class="styles.form" @submit.prevent="save">
        <h3 :id="`${id}-title`" :class="styles.panelTitle">
          {{ draft.index === null ? texts.add : texts.edit }}
        </h3>
        <label :class="styles.field">
          <span>{{ texts.name }}</span>
          <Input
            required
            size="small"
            data-autofocus=""
            :model-value="draft.label"
            :aria-label="texts.name"
            @update:model-value="(label: string) => setDraft({ label })"
          />
        </label>
        <fieldset :class="styles.quadrants">
          <legend>{{ texts.quadrant }}</legend>
          <div :class="styles.quadrantGrid">
            <label
              v-for="corner in QUADRANT_CORNERS"
              :key="corner"
              :class="styles.quadrant"
              :data-corner="corner"
            >
              <input
                type="radio"
                :name="`${id}-quadrant`"
                :value="corner"
                :checked="draft.quadrant === corner"
                @change="setDraft({ quadrant: corner })"
              />
              <span
                :class="styles.swatch"
                :style="{ background: color(corner) }"
                aria-hidden="true"
              />
              <span :class="styles.quadrantName">{{ title(corner) }}</span>
            </label>
          </div>
        </fieldset>
        <div :class="styles.footer">
          <Button size="small" color="neutral" variant="ghost" @click="close">
            {{ texts.cancel }}
          </Button>
          <Button size="small" type="submit" :disabled="!canSave">
            {{ texts.save }}
          </Button>
        </div>
      </form>
    </div>
    <div
      v-else-if="shown && deleting !== null"
      ref="panelEl"
      role="alertdialog"
      :aria-labelledby="`${id}-title`"
      :aria-describedby="`${id}-text`"
      :class="styles.panel"
      data-quadrant-task-panel="delete"
      @keydown="onPanelKeydown"
    >
      <h3 :id="`${id}-title`" :class="styles.panelTitle">
        {{ texts.delete }}
      </h3>
      <p :id="`${id}-text`" :class="styles.panelText">
        {{ quadrantTaskDeleteText(texts, points[deleting]) }}
      </p>
      <div :class="styles.footer">
        <Button
          size="small"
          color="neutral"
          variant="ghost"
          data-autofocus=""
          @click="close"
        >
          {{ texts.cancel }}
        </Button>
        <Button size="small" color="danger" @click="remove">
          {{ texts.confirmDelete }}
        </Button>
      </div>
    </div>
  </div>
</template>

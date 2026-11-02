<script setup lang="ts">
/**
 * KanbanBoard: a horizontally scrolling board of status columns
 * (KanbanColumn), equal-width by default (`columnWidth`, 18rem). `fill`
 * stretches the columns equally when they fit; `height` / `maxHeight` bound
 * the board so that the column bodies scroll vertically. The board is a
 * labelled `role="region"` and a tab stop, so the keyboard can scroll it;
 * on narrow screens the columns keep their width and snap while scrolling.
 *
 * `draggable` lets the KanbanCard children of keyed columns (`value`) be
 * dragged with the mouse, touch (long press) or the keyboard. The board is
 * controlled: it emits each move (`card-move`) and the app updates the
 * columns' data.
 */
import {
  computed,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  provide,
  ref,
  useAttrs,
  useId,
  watch,
} from "vue";
import { kanbanLength, type KanbanCardMove } from "@minerva/core";
import {
  createKanbanDrag,
  kanbanDataAdapter,
  type KanbanDrag,
} from "@minerva/dom";
import styles from "@react-styles/components/KanbanBoard/kanbanBoard.module.scss";
import { hooks } from "../../internal/hooks";
import { useI18n } from "../../config/useI18n";
import { KANBAN_DRAG_KEY } from "./context";
import type { KanbanBoardProps } from "./types";

defineOptions({ name: "KanbanBoard", inheritAttrs: false });

const props = withDefaults(defineProps<KanbanBoardProps>(), {
  columnWidth: undefined,
  fill: false,
  gap: undefined,
  height: undefined,
  maxHeight: undefined,
  draggable: false,
  canDrop: undefined,
  "aria-label": undefined,
  "aria-labelledby": undefined,
});

const emit = defineEmits<{
  /**
   * A card was dropped at a new position (not when put back where it was):
   * move it in your data (`moveKanbanCard` from `minerva-design/core`)
   */
  "card-move": [move: KanbanCardMove];
}>();

defineSlots<{
  /** The columns (KanbanColumn) */
  default?: () => unknown;
}>();

const attrs = useAttrs();
const { t } = useI18n();
const root = ref<HTMLElement>();
const hintId = `${useId()}-kanban-hint`;

provide(KANBAN_DRAG_KEY, {
  draggable: computed(() => props.draggable),
  hintId,
});

// one controller for the life of the board; it reads the props lazily
let drag: KanbanDrag | undefined;
onMounted(() => {
  const element = root.value!;
  drag = createKanbanDrag(element, {
    ...kanbanDataAdapter(element),
    scroller: () => element,
    hintId,
    enabled: () => props.draggable,
    canDrop: (move) => props.canDrop?.(move) ?? true,
    onMove: (move) => emit("card-move", move),
    t: (key, params) => t(key, params),
  });
});
onUpdated(() => drag?.refresh());
watch(
  () => props.draggable,
  () => drag?.refresh(),
  { flush: "post" },
);
onBeforeUnmount(() => drag?.destroy());

const rootAttrs = computed(() => {
  // `aria-*` are declared props: Vue stores them camelized
  const { ariaLabel, ariaLabelledby: labelledBy } = props as unknown as {
    ariaLabel?: string;
    ariaLabelledby?: string;
  };
  return {
    ...attrs,
    role: "region",
    tabindex: 0,
    "aria-label": labelledBy ? ariaLabel : (ariaLabel ?? t("kanban.label")),
    "aria-labelledby": labelledBy,
    class: [styles.board, props.fill && styles.fill, attrs.class],
    style: [
      {
        "--kanban-column-width": kanbanLength(props.columnWidth),
        "--kanban-gap": kanbanLength(props.gap),
        height: kanbanLength(props.height),
        maxHeight: kanbanLength(props.maxHeight),
      },
      attrs.style,
    ],
    ...hooks("kanban-board", "root"),
  };
});
</script>

<template>
  <div ref="root" v-bind="rootAttrs">
    <slot />
  </div>
</template>

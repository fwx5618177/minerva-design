<script setup lang="ts">
/**
 * KanbanBoard: a horizontally scrolling board of status columns
 * (KanbanColumn), equal-width by default (`columnWidth`, 18rem). `fill`
 * stretches the columns equally when they fit; `height` / `maxHeight` bound
 * the board so that the column bodies scroll vertically. The board is a
 * labelled `role="region"` and a tab stop, so the keyboard can scroll it;
 * on narrow screens the columns keep their width and snap while scrolling.
 *
 * Drag and drop is not built in: move cards with your own actions (a menu,
 * buttons) and update the columns' data.
 */
import { computed, useAttrs } from "vue";
import { kanbanLength } from "@minerva/core";
import styles from "@react-styles/components/KanbanBoard/kanbanBoard.module.scss";
import { hooks } from "../../internal/hooks";
import { useI18n } from "../../config/useI18n";
import type { KanbanBoardProps } from "./types";

defineOptions({ name: "KanbanBoard", inheritAttrs: false });

const props = withDefaults(defineProps<KanbanBoardProps>(), {
  columnWidth: undefined,
  fill: false,
  gap: undefined,
  height: undefined,
  maxHeight: undefined,
  "aria-label": undefined,
  "aria-labelledby": undefined,
});

defineSlots<{
  /** The columns (KanbanColumn) */
  default?: () => unknown;
}>();

const attrs = useAttrs();
const { t } = useI18n();

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
  <div v-bind="rootAttrs">
    <slot />
  </div>
</template>

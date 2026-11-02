<script setup lang="ts">
import { computed, provide, useId, useSlots } from "vue";
import { kanbanAccent, kanbanCount } from "@minerva/core";
import { useI18n } from "./i18n";
import {
  KANBAN_COLUMN,
  injectKanbanBoard,
  useKanbanRegistration,
  useMeasure,
} from "./kanban-drag";
/**
 * A status column of a KanbanBoard: an accent dot (color), the title, a
 * count badge and the actions slot in the header; the cards (default slot)
 * in a role="list" body (use KanbanCard, or give each card role="listitem":
 * mini-program slots cannot be wrapped one by one); the empty slot / prop
 * (default translated "No items") when there is no default slot or count is
 * 0; a footer slot. The column is a role="group" named by its title and
 * count. `value` keys the column for drag and drop.
 */
const props = defineProps<{
  /** Title of the column (also its accessible name) */
  title?: string;
  /** Key of the column, reported as `fromColumn` / `toColumn` by a draggable board */
  value?: string;
  /** Number of items shown as a badge (and announced); 0 shows the empty content */
  count?: number;
  /** Accent: a theme color (primary, success, warning, danger, info, neutral) or any CSS color */
  color?: string;
  /** Supporting text under the header */
  description?: string;
  /** Text shown when the column has no cards (or the empty slot) */
  empty?: string;
  /** Accessible name (default: the title with the count, translated) */
  ariaLabel?: string;
}>();
const { t } = useI18n();
const slots = useSlots();
const titleId = `mn-kanban-${useId()}`;
const shown = computed(() => kanbanCount(props.count));
const accent = computed(() => kanbanAccent(props.color));
const label = computed(() => {
  if (props.ariaLabel) return props.ariaLabel;
  if (!props.title) return undefined;
  return shown.value !== undefined
    ? t("kanban.columnLabel", { title: props.title, count: shown.value })
    : props.title;
});
const hasCards = computed(() => !!slots.default && shown.value !== 0);
const columnId = `mn-kanban-column-${useId()}`;
const board = injectKanbanBoard();
provide(
  KANBAN_COLUMN,
  computed(() => props.value),
);
const measure = useMeasure(columnId);
useKanbanRegistration(
  board
    ? () => board.registerColumn({ key: () => props.value, measure })
    : null,
);
const dropTarget = computed(
  () =>
    props.value !== undefined &&
    board?.view.value?.target?.column === props.value,
);
</script>
<template>
  <view
    :id="columnId"
    class="mn-kanban-column"
    :class="[
      accent.scheme ? `mn-color-${accent.scheme}` : '',
      { 'mn-drop-target': dropTarget },
    ]"
    :data-kanban-column="value"
    role="group"
    :aria-label="label"
    :aria-labelledby="
      label === undefined
        ? shown !== undefined
          ? `${titleId} ${titleId}-count`
          : titleId
        : undefined
    "
    :style="
      accent.custom ? { '--kanban-column-color': accent.custom } : undefined
    "
    ><view class="mn-kanban-column__header"
      ><view
        v-if="accent.scheme || accent.custom"
        class="mn-kanban-column__indicator"
        aria-hidden="true" /><view :id="titleId" class="mn-kanban-column__title"
        ><slot name="title"
          ><text>{{ title }}</text></slot
        ></view
      ><view
        v-if="shown !== undefined"
        :id="`${titleId}-count`"
        class="mn-kanban-column__count"
        :aria-hidden="label !== undefined ? 'true' : undefined"
        ><text>{{ shown }}</text></view
      ><view v-if="$slots.actions" class="mn-kanban-column__actions"
        ><slot name="actions" /></view
    ></view>
    <view
      v-if="description || $slots.description"
      class="mn-kanban-column__description"
      ><slot name="description"
        ><text>{{ description }}</text></slot
      ></view
    >
    <view v-if="hasCards" class="mn-kanban-column__list" role="list"
      ><slot
    /></view>
    <view v-else class="mn-kanban-column__empty"
      ><slot name="empty"
        ><text>{{ empty ?? t("kanban.empty") }}</text></slot
      ></view
    >
    <view v-if="$slots.footer" class="mn-kanban-column__footer"
      ><slot name="footer"
    /></view>
  </view>
</template>

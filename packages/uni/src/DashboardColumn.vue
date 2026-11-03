<script setup lang="ts">
import { computed, provide, useId, useSlots } from "vue";
import { dashboardAccent, dashboardCount } from "@minerva/core";
import { useI18n } from "./i18n";
import {
  DASHBOARD_COLUMN,
  injectDashboardColumns,
  useDashboardRegistration,
  useMeasure,
} from "./dashboard-drag";
/**
 * A status column of a DashboardColumns: an accent dot (color), the title, a
 * count badge and the actions slot in the header; the cards (default slot)
 * in a role="list" body (use DashboardCard, or give each card role="listitem":
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
const titleId = `mn-dashboard-${useId()}`;
const shown = computed(() => dashboardCount(props.count));
const accent = computed(() => dashboardAccent(props.color));
const label = computed(() => {
  if (props.ariaLabel) return props.ariaLabel;
  if (!props.title) return undefined;
  return shown.value !== undefined
    ? t("dashboard.columnLabel", { title: props.title, count: shown.value })
    : props.title;
});
const hasCards = computed(() => !!slots.default && shown.value !== 0);
const columnId = `mn-dashboard-column-${useId()}`;
const board = injectDashboardColumns();
provide(
  DASHBOARD_COLUMN,
  computed(() => props.value),
);
const measure = useMeasure(columnId);
useDashboardRegistration(
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
    class="mn-dashboard-column"
    :class="[
      accent.scheme ? `mn-color-${accent.scheme}` : '',
      { 'mn-drop-target': dropTarget },
    ]"
    :data-dashboard-column="value"
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
      accent.custom ? { '--dashboard-column-color': accent.custom } : undefined
    "
    ><view class="mn-dashboard-column__header"
      ><view
        v-if="accent.scheme || accent.custom"
        class="mn-dashboard-column__indicator"
        aria-hidden="true" /><view
        :id="titleId"
        class="mn-dashboard-column__title"
        ><slot name="title"
          ><text>{{ title }}</text></slot
        ></view
      ><view
        v-if="shown !== undefined"
        :id="`${titleId}-count`"
        class="mn-dashboard-column__count"
        :aria-hidden="label !== undefined ? 'true' : undefined"
        ><text>{{ shown }}</text></view
      ><view v-if="$slots.actions" class="mn-dashboard-column__actions"
        ><slot name="actions" /></view
    ></view>
    <view
      v-if="description || $slots.description"
      class="mn-dashboard-column__description"
      ><slot name="description"
        ><text>{{ description }}</text></slot
      ></view
    >
    <view v-if="hasCards" class="mn-dashboard-column__list" role="list"
      ><slot
    /></view>
    <view v-else class="mn-dashboard-column__empty"
      ><slot name="empty"
        ><text>{{ empty ?? t("dashboard.empty") }}</text></slot
      ></view
    >
    <view v-if="$slots.footer" class="mn-dashboard-column__footer"
      ><slot name="footer"
    /></view>
  </view>
</template>

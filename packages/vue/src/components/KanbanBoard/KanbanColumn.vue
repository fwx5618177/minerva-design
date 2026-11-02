<script setup lang="ts">
/**
 * KanbanColumn: a status column of a KanbanBoard. The header shows an
 * optional accent dot (`color`: a theme color or any CSS color), the
 * `title`, a `count` badge and the `actions` slot; the cards (default slot)
 * form a `role="list"` (each card is wrapped in a `role="listitem"`) that
 * scrolls vertically within a bounded board; the `empty` slot / prop
 * replaces the list when there are no cards, and the `footer` slot sits
 * below. The column is a `role="group"` named by its title and count
 * ("To do, 3 items"). `value` keys the column for drag and drop.
 */
import { computed, useAttrs, useId, useSlots, type VNode } from "vue";
import { kanbanAccent, kanbanCount } from "@minerva/core";
import styles from "@react-styles/components/KanbanBoard/kanbanBoard.module.scss";
import { flattenChildren } from "../../internal/children";
import { hooks } from "../../internal/hooks";
import { useI18n } from "../../config/useI18n";
import type { KanbanColumnProps } from "./types";

defineOptions({ name: "KanbanColumn", inheritAttrs: false });

const props = withDefaults(defineProps<KanbanColumnProps>(), {
  title: undefined,
  value: undefined,
  count: undefined,
  color: undefined,
  description: undefined,
  empty: undefined,
  "aria-label": undefined,
});

defineSlots<{
  /** The cards: each is wrapped in a role="listitem" */
  default?: () => VNode[];
  /** Rich title (replaces the `title` text) */
  title?: () => unknown;
  /** Header controls on the end side (e.g. an add button) */
  actions?: () => unknown;
  /** Supporting text under the header */
  description?: () => unknown;
  /** Content shown when there are no cards */
  empty?: () => unknown;
  /** Footer below the cards (e.g. an "Add card" button) */
  footer?: () => unknown;
}>();

const attrs = useAttrs();
const slots = useSlots();
const { t } = useI18n();
const titleId = `${useId()}-title`;
const countId = `${titleId}-count`;

const count = computed(() => kanbanCount(props.count));
const accent = computed(() => kanbanAccent(props.color));
const label = computed(() => {
  // `aria-label` is a declared prop: Vue stores it camelized
  const ariaLabel = (props as unknown as { ariaLabel?: string }).ariaLabel;
  if (ariaLabel) return ariaLabel;
  // a rich title slot names the column through aria-labelledby
  if (slots.title || !props.title) return undefined;
  return count.value !== undefined
    ? t("kanban.columnLabel", { title: props.title, count: count.value })
    : props.title;
});

const rootAttrs = computed(() => {
  const { scheme, custom } = accent.value;
  return {
    ...attrs,
    role: "group",
    "aria-label": label.value,
    "aria-labelledby":
      label.value === undefined
        ? count.value !== undefined
          ? `${titleId} ${countId}`
          : titleId
        : undefined,
    class: [styles.column, scheme && styles[scheme], attrs.class],
    style: [custom ? { "--kanban-column-color": custom } : {}, attrs.style],
    "data-kanban-column": props.value || undefined,
    ...hooks("kanban-column", "root", { color: scheme }),
  };
});

const items = () => flattenChildren(slots.default?.());
</script>

<template>
  <section v-bind="rootAttrs">
    <div :class="styles.header" v-bind="hooks('kanban-column', 'header')">
      <span
        v-if="accent.scheme || accent.custom"
        :class="styles.indicator"
        aria-hidden="true"
        v-bind="hooks('kanban-column', 'indicator')"
      />
      <span
        :id="titleId"
        :class="styles.title"
        v-bind="hooks('kanban-column', 'title')"
      >
        <slot name="title">{{ title }}</slot>
      </span>
      <span
        v-if="count !== undefined"
        :id="countId"
        :class="styles.count"
        :aria-hidden="label !== undefined ? 'true' : undefined"
        v-bind="hooks('kanban-column', 'count')"
        >{{ count }}</span
      >
      <div
        v-if="$slots.actions"
        :class="styles.actions"
        v-bind="hooks('kanban-column', 'actions')"
      >
        <slot name="actions" />
      </div>
    </div>
    <p
      v-if="$slots.description || description"
      :class="styles.description"
      v-bind="hooks('kanban-column', 'description')"
    >
      <slot name="description">{{ description }}</slot>
    </p>
    <template v-for="cards in [items()]" :key="0">
      <div
        v-if="cards.length > 0"
        role="list"
        :class="styles.list"
        v-bind="hooks('kanban-column', 'list')"
      >
        <div
          v-for="(card, index) in cards"
          :key="card.key ?? index"
          role="listitem"
          :class="styles.item"
        >
          <component :is="card" />
        </div>
      </div>
      <div
        v-else
        :class="styles.empty"
        v-bind="hooks('kanban-column', 'empty')"
      >
        <slot name="empty">{{ empty ?? t("kanban.empty") }}</slot>
      </div>
    </template>
    <div
      v-if="$slots.footer"
      :class="styles.footer"
      v-bind="hooks('kanban-column', 'footer')"
    >
      <slot name="footer" />
    </div>
  </section>
</template>

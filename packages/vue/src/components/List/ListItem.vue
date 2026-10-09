<script setup lang="ts">
/**
 * ListItem: a native <li> row with primary / secondary text, a decorative
 * icon and trailing actions. It adds no selection state, tab stop or row
 * command.
 */
import { computed, useAttrs } from "vue";
import styles from "@react-styles/components/List/list.module.scss";
import { hooks } from "../../internal/hooks";
import type { ListItemProps } from "./types";

defineOptions({ name: "ListItem", inheritAttrs: false });

const props = withDefaults(defineProps<ListItemProps>(), {
  primary: undefined,
  secondary: undefined,
});

const slots = defineSlots<{
  /** Main content (the `primary` prop) */
  primary?: () => unknown;
  /** Supporting content (the `secondary` prop) */
  secondary?: () => unknown;
  /** Decorative leading slot, hidden from assistive technologies */
  icon?: () => unknown;
  /** Trailing controls, owned by the caller (bounded to 50% of the row) */
  actions?: () => unknown;
}>();

const attrs = useAttrs();
/** `null`, `undefined` and `""` are no content (0 is rendered) */
const hasSecondary = computed(
  () =>
    !!slots.secondary || (props.secondary != null && props.secondary !== ""),
);
const rootAttrs = computed(() => ({ ...attrs, ...hooks("list-item", "root") }));
</script>

<template>
  <li :class="styles.item" v-bind="rootAttrs">
    <div
      v-if="slots.icon"
      :class="styles.icon"
      aria-hidden="true"
      v-bind="hooks('list-item', 'icon')"
    >
      <slot name="icon" />
    </div>
    <div :class="styles.content">
      <div :class="styles.primary" v-bind="hooks('list-item', 'label')">
        <slot name="primary">{{ primary }}</slot>
      </div>
      <div
        v-if="hasSecondary"
        :class="styles.secondary"
        v-bind="hooks('list-item', 'description')"
      >
        <slot name="secondary">{{ secondary }}</slot>
      </div>
    </div>
    <div
      v-if="slots.actions"
      :class="styles.actions"
      v-bind="hooks('list-item', 'actions')"
    >
      <slot name="actions" />
    </div>
  </li>
</template>

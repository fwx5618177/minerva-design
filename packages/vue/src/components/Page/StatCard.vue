<script setup lang="ts">
/** StatCard: a labelled metric (`dl`) with optional icon and description. */
import { computed, useAttrs } from "vue";
import styles from "@react-styles/components/Page/page.module.scss";
import { hooks } from "../../internal/hooks";
import type { StatCardProps } from "./types";

defineOptions({ name: "StatCard", inheritAttrs: false });

const props = withDefaults(defineProps<StatCardProps>(), {
  label: undefined,
  value: undefined,
  description: undefined,
});

const slots = defineSlots<{
  /** Metric name (the `label` prop) */
  label?: () => unknown;
  /** Metric value (the `value` prop) */
  value?: () => unknown;
  /** Decorative icon, hidden from assistive technology */
  icon?: () => unknown;
  /** Explanatory content under the value (the `description` prop) */
  description?: () => unknown;
}>();

const attrs = useAttrs();
const hasDescription = computed(
  () => !!slots.description || props.description != null,
);
const rootAttrs = computed(() => ({ ...attrs, ...hooks("stat-card", "root") }));
</script>

<template>
  <div :class="styles.statCard" v-bind="rootAttrs">
    <span
      v-if="slots.icon"
      :class="styles.statIcon"
      aria-hidden="true"
      v-bind="hooks('stat-card', 'icon')"
    >
      <slot name="icon" />
    </span>
    <div :class="styles.statContent">
      <dl>
        <dt v-bind="hooks('stat-card', 'label')">
          <slot name="label">{{ label }}</slot>
        </dt>
        <dd v-bind="hooks('stat-card', 'value')">
          <slot name="value">{{ value }}</slot>
        </dd>
      </dl>
      <p
        v-if="hasDescription"
        :class="styles.statDescription"
        v-bind="hooks('stat-card', 'description')"
      >
        <slot name="description">{{ description }}</slot>
      </p>
    </div>
  </div>
</template>

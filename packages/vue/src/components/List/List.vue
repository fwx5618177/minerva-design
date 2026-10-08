<script setup lang="ts">
/**
 * List: a quiet operational list on a native <ul> (markers removed, list
 * semantics kept with role="list"). Rows are ListItem elements.
 */
import { computed, useAttrs } from "vue";
import styles from "@react-styles/components/List/list.module.scss";
import { hooks } from "../../internal/hooks";
import type { ListProps } from "./types";

defineOptions({ name: "List", inheritAttrs: false });

const props = withDefaults(defineProps<ListProps>(), {
  density: "default",
  bordered: false,
  dividers: true,
  role: "list",
});

defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const classes = computed(() => [
  styles.list,
  props.density === "compact" && styles.compact,
  props.density === "comfortable" && styles.comfortable,
  props.bordered && styles.bordered,
  props.dividers && styles.dividers,
]);
const rootAttrs = computed(() => ({ ...attrs, ...hooks("list", "root") }));
</script>

<template>
  <ul :role="role" :class="classes" v-bind="rootAttrs">
    <slot />
  </ul>
</template>

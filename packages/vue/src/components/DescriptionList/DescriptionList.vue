<script setup lang="ts">
/**
 * DescriptionList: labeled metadata fields as a native <dl>. Each item is a
 * row (<div>) holding one <dt> / <dd> pair; rows stack on narrow screens.
 * The `label` / `value` scoped slots render rich terms / descriptions.
 */
import { computed, useAttrs } from "vue";
import styles from "@react-styles/components/DescriptionList/descriptionList.module.scss";
import { hooks } from "../../internal/hooks";
import type { DescriptionListItem, DescriptionListProps } from "./types";

defineOptions({ name: "DescriptionList", inheritAttrs: false });

const props = withDefaults(defineProps<DescriptionListProps>(), {
  bordered: false,
  striped: false,
});

defineSlots<{
  /** Term of a row (default: `item.label`) */
  label?: (props: { item: DescriptionListItem }) => unknown;
  /** Description of a row (default: `item.value`) */
  value?: (props: { item: DescriptionListItem }) => unknown;
}>();

const attrs = useAttrs();
const classes = computed(() => [
  styles.descriptionList,
  props.bordered && styles.bordered,
  props.striped && styles.striped,
]);
const rootAttrs = computed(() => ({
  ...attrs,
  ...hooks("description-list", "root"),
}));
</script>

<template>
  <dl :class="classes" v-bind="rootAttrs">
    <div
      v-for="item in items"
      :key="item.key"
      :class="styles.row"
      v-bind="hooks('description-list', 'row')"
    >
      <dt v-bind="hooks('description-list', 'term')">
        <slot name="label" :item="item">{{ item.label }}</slot>
      </dt>
      <dd v-bind="hooks('description-list', 'description')">
        <slot name="value" :item="item">{{ item.value }}</slot>
      </dd>
    </div>
  </dl>
</template>

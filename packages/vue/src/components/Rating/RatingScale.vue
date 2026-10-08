<script setup lang="ts">
/**
 * RatingScale: several labelled ratings sharing one scale (e.g. plot /
 * characters / writing). Interactive with a `change(key, value)` listener.
 * Attributes fall through to the root `<div>`.
 */
import { computed, getCurrentInstance, useAttrs } from "vue";
import styles from "@react-styles/components/Rating/rating.module.scss";
import { hooks } from "../../internal/hooks";
import Rating from "./Rating.vue";
import type { RatingScaleProps } from "./types";

defineOptions({ name: "RatingScale", inheritAttrs: false });

const props = withDefaults(defineProps<RatingScaleProps>(), {
  max: 10,
  size: "medium",
  readOnly: false,
  showValue: true,
});
const emit = defineEmits<{
  /** The user rated a dimension: its key and new score */
  change: [key: string, value: number];
}>();

const attrs = useAttrs();
const vnodeProps = getCurrentInstance()?.vnode.props ?? {};
const interactive = computed(() => "onChange" in vnodeProps);

const rootAttrs = computed(() => ({
  ...attrs,
  ...hooks("rating-scale", "root", {
    readonly: !interactive.value || props.readOnly,
    size: props.size,
  }),
}));
const onChangeOf = (key: string) =>
  interactive.value
    ? { onChange: (value: number) => emit("change", key, value) }
    : {};
</script>

<template>
  <div :class="styles.scale" v-bind="rootAttrs">
    <div
      v-for="dim in dimensions"
      :key="dim.key"
      :class="styles.scaleRow"
      :title="dim.hint"
      v-bind="hooks('rating-scale', 'row')"
    >
      <span :class="styles.scaleLabel" v-bind="hooks('rating-scale', 'label')">
        {{ dim.label }}
      </span>
      <Rating
        :model-value="dim.value"
        :max="max"
        :size="size"
        :show-value="showValue"
        :read-only="readOnly"
        :aria-label="`${dim.label} ${dim.value.toFixed(1)} / ${max}`"
        v-bind="onChangeOf(dim.key)"
      />
    </div>
  </div>
</template>

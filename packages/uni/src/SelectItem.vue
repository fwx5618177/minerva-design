<script setup lang="ts">
import {
  computed,
  inject,
  onMounted,
  onBeforeUnmount,
  watch,
  useSlots,
  type VNode,
} from "vue";
import type { MiniSelectContext } from "./select-context";
const props = defineProps<{
  value: string;
  disabled?: boolean;
  textValue?: string;
  label?: string;
}>();
const root = inject<MiniSelectContext>("minerva:select");
const slots = useSlots();
function text(nodes: VNode[]): string {
  return nodes
    .map((n) =>
      typeof n.children === "string"
        ? n.children
        : Array.isArray(n.children)
          ? text(n.children as VNode[])
          : "",
    )
    .join("");
}
const option = computed(() => ({
  value: props.value,
  disabled: props.disabled,
  label: props.textValue ?? props.label ?? text(slots.default?.() ?? []),
}));
onMounted(() => root?.register(option.value));
watch(
  () => [props.value, props.disabled, props.textValue, props.label],
  () => root?.register(option.value),
);
onBeforeUnmount(() => root?.unregister(props.value));
</script>
<template>
  <button
    class="mn-option"
    role="option"
    :aria-selected="root?.value.value === value"
    :aria-disabled="disabled || root?.disabled.value"
    v-show="
      !root?.query.value ||
      option.label.toLowerCase().includes(root.query.value.toLowerCase())
    "
    :data-value="value"
    :class="{
      'mn-active': root?.value.value === value,
      'mn-option-focused': root?.active.value === value,
      'mn-disabled': disabled || root?.disabled.value,
    }"
    :disabled="disabled || root?.disabled.value"
    @tap="root?.choose(option)"
    @keydown="root?.keydown($event)"
  >
    <slot>{{ label }}</slot>
  </button>
</template>

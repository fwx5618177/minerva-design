<script setup lang="ts">
import { computed, ref, getCurrentInstance } from "vue";
import { useI18n } from "./i18n";
interface Item {
  value?: string;
  label?: string;
  title?: string;
  description?: string;
  disabled?: boolean;
  status?: "error" | "complete" | "upcoming";
  icon?: string;
}
const props = withDefaults(
  defineProps<{
    items?: Item[];
    value?: string;
    modelValue?: string;
    defaultValue?: string;
    current?: number;
    readOnly?: boolean;
    disabled?: boolean;
    direction?: "horizontal" | "vertical";
    ariaLabel?: string;
  }>(),
  { items: () => [], readOnly: undefined, direction: "horizontal" },
);
const emit = defineEmits<{
  change: [value: string | number];
  "update:modelValue": [value: string];
}>();
const { t } = useI18n();
const instance = getCurrentInstance();
const local = ref(props.defaultValue ?? "");
const selected = computed(() => props.modelValue ?? props.value ?? local.value);
const index = computed(
  () =>
    props.current ??
    props.items.findIndex((item) => item.value === selected.value),
);
const readonly = computed(
  () =>
    props.readOnly ??
    (!instance?.vnode.props?.onChange &&
      !instance?.vnode.props?.["onUpdate:modelValue"]),
);
function choose(item: Item, i: number) {
  if (readonly.value || props.disabled || item.disabled || index.value === i)
    return;
  if (item.value === undefined) {
    emit("change", i);
    return;
  }
  if (props.value === undefined && props.modelValue === undefined)
    local.value = item.value;
  emit("change", item.value);
  emit("update:modelValue", item.value);
}
</script>
<template>
  <view
    class="mn-steps mn-uni-steps"
    :class="`mn-${direction}`"
    role="list"
    :aria-label="props.ariaLabel ?? t('steps.label')"
  >
    <view
      v-for="(item, i) in items"
      :key="item.value ?? i"
      role="listitem"
      class="mn-step"
      :data-step="item.value ?? i"
      :data-status="
        item.status ??
        (i < index ? 'complete' : i === index ? 'current' : 'upcoming')
      "
      :aria-current="readonly && i === index ? 'step' : undefined"
      :class="{
        'mn-active': i === index,
        'mn-complete': i < index,
        'mn-error': item.status === 'error',
      }"
    >
      <button
        v-if="!readonly"
        class="mn-step-button"
        :disabled="disabled || item.disabled"
        :aria-current="i === index ? 'step' : undefined"
        @tap="choose(item, i)"
      >
        <text class="mn-step-indicator"
          ><slot name="icon" :item="item" :index="i" :current="i === index">{{
            item.icon ?? (item.status === "error" ? "!" : i + 1)
          }}</slot></text
        ><view
          ><slot name="label" :item="item" :index="i">{{
            item.label ?? item.title
          }}</slot
          ><text v-if="item.description" class="mn-muted">{{
            item.description
          }}</text></view
        >
      </button>
      <view v-else class="mn-step-button"
        ><text class="mn-step-indicator"
          ><slot name="icon" :item="item" :index="i" :current="i === index">{{
            item.icon ?? (item.status === "error" ? "!" : i + 1)
          }}</slot></text
        ><view
          ><slot name="label" :item="item" :index="i">{{
            item.label ?? item.title
          }}</slot
          ><text v-if="item.description" class="mn-muted">{{
            item.description
          }}</text></view
        ></view
      >
    </view>
  </view>
</template>

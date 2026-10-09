<script setup lang="ts">
import Rating from "./Rating.vue";
const props = withDefaults(
  defineProps<{
    dimensions?: { key: string; label: string; value: number; hint?: string }[];
    max?: number;
    size?: string;
    readOnly?: boolean;
    showValue?: boolean;
    onChange?: (key: string, value: number) => void;
  }>(),
  { dimensions: () => [], max: 10, showValue: true },
);
const emit = defineEmits(["change"]);
</script>
<template>
  <view class="mn-rating-scale"
    ><view v-for="d in dimensions" :key="d.key" class="mn-row"
      ><view
        ><text>{{ d.label }}</text
        ><text class="mn-muted">{{ d.hint }}</text></view
      ><Rating
        :value="d.value"
        :max="max"
        :size="size"
        :read-only="readOnly || !props.onChange"
        :aria-label="d.label"
        :show-value="showValue"
        @change="(v) => emit('change', d.key, v)" /></view
  ></view>
</template>

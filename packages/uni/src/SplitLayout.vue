<script setup lang="ts">
import { computed, ref } from "vue";
import { useNativeId as useId } from "./native-id";
import { resolveSpace } from "@minerva/core";
import { useResponsiveWidth } from "./responsive";
const props = withDefaults(
  defineProps<{
    asideWidth?: number;
    sidebarWidth?: number;
    collapseBelow?: "md" | "lg";
    gap?: string | number;
    reverse?: boolean;
  }>(),
  { asideWidth: 320, collapseBelow: "md", gap: 6 },
);
const root = ref<any>();
const id = `mn-split-${useId()}`;
const width = useResponsiveWidth(root, `.${id}`);
const aside = computed(() => {
  const value = props.sidebarWidth ?? props.asideWidth;
  if (!Number.isFinite(value) || value <= 0)
    throw new RangeError("SplitLayout asideWidth must be finite and positive");
  return value;
});
const stacked = computed(
  () => width.value < (props.collapseBelow === "lg" ? 1200 : 768),
);
</script>
<template>
  <view
    ref="root"
    class="mn-uni-split-layout"
    :class="id"
    :data-stacked="stacked"
    :style="{
      display: 'flex',
      gap: resolveSpace(gap),
      flexDirection: stacked ? 'column' : reverse ? 'row-reverse' : 'row',
    }"
    ><view class="mn-uni-split-main"><slot /></view
    ><view
      v-if="$slots.aside || $slots.sidebar"
      data-split-aside
      class="mn-uni-split-aside"
      :style="{ width: stacked ? '100%' : `min(${aside}px, 50%)` }"
      ><slot name="aside"><slot name="sidebar" /></slot></view
  ></view>
</template>

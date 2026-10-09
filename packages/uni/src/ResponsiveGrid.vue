<script setup lang="ts">
import { computed, ref } from "vue";
import { useNativeId as useId } from "./native-id";
import { resolveSpace, resolveSize } from "@minerva/core";
import { useResponsiveWidth } from "./responsive";
const props = withDefaults(
  defineProps<{
    columns?: number | { base?: number; sm?: number; md?: number; lg?: number };
    gap?: string | number;
    rowGap?: string | number;
    columnGap?: string | number;
    minChildWidth?: number;
  }>(),
  { columns: 1, gap: 4 },
);
const root = ref<any>();
const id = `mn-grid-${useId()}`;
const width = useResponsiveWidth(root, `.${id}`);
const counts = computed(() => {
  const values =
    typeof props.columns === "number" ? { base: props.columns } : props.columns;
  let previous = 1;
  return Object.fromEntries(
    (["base", "sm", "md", "lg"] as const).map((key) => {
      const value = values[key] ?? previous;
      if (!Number.isInteger(value) || value < 1 || value > 12)
        throw new RangeError(
          "ResponsiveGrid columns must be integers from 1 to 12",
        );
      previous = value;
      return [key, value];
    }),
  );
});
const count = computed(
  () =>
    counts.value[
      width.value >= 1200
        ? "lg"
        : width.value >= 768
          ? "md"
          : width.value >= 480
            ? "sm"
            : "base"
    ],
);
const columns = computed(() =>
  props.minChildWidth
    ? `repeat(auto-fit,minmax(min(100%,${resolveSize(props.minChildWidth)}),1fr))`
    : `repeat(${count.value}, minmax(0, 1fr))`,
);
</script>
<template>
  <view ref="root" class="mn-uni-grid" :class="id"
    ><view
      data-grid-layout
      class="mn-grid"
      :style="{
        display: 'grid',
        gridTemplateColumns: columns,
        rowGap: resolveSpace(rowGap ?? gap),
        columnGap: resolveSpace(columnGap ?? gap),
      }"
      ><slot /></view
  ></view>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    items?: {
      key?: string;
      label: string | number;
      value: string | number | null;
    }[];
    columns?: number;
    bordered?: boolean;
    striped?: boolean;
  }>(),
  { items: () => [], columns: 1 },
);
</script>
<template>
  <view
    class="mn-description-list mn-uni-description-list"
    :class="{
      'mn-description-bordered': bordered,
      'mn-description-striped': striped,
    }"
    :style="{
      gridTemplateColumns: `repeat(${Math.max(1, Math.floor(columns) || 1)},minmax(0,1fr))`,
    }"
  >
    <view
      v-for="(item, i) in items"
      :key="item.key ?? i"
      class="mn-description-item"
      :class="{
        'mn-description-stripe': striped && i % 2 === 1,
        'mn-description-last': i === items.length - 1,
      }"
      ><text role="term" class="mn-description-term"
        ><slot name="label" :item="item" :index="i">{{
          item.label
        }}</slot></text
      ><view role="definition" class="mn-description-value"
        ><slot name="value" :item="item" :index="i">{{
          item.value
        }}</slot></view
      ></view
    ><slot />
  </view>
</template>

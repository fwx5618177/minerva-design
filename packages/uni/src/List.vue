<script setup lang="ts">
import ListItem from "./ListItem.vue";
withDefaults(
  defineProps<{
    items?: {
      id?: string;
      title: string;
      description?: string;
      disabled?: boolean;
    }[];
    divided?: boolean;
    dividers?: boolean;
    bordered?: boolean;
    density?: "default" | "compact" | "comfortable";
    role?: string;
  }>(),
  {
    items: () => [],
    divided: true,
    dividers: undefined,
    density: "default",
    role: "list",
  },
);
const emit = defineEmits<{
  itemClick: [
    item: {
      id?: string;
      title: string;
      description?: string;
      disabled?: boolean;
    },
    index: number,
  ];
}>();
</script>
<template>
  <view
    class="mn-list mn-uni-list"
    :class="[
      `mn-list-${density}`,
      { 'mn-list-divided': dividers ?? divided, 'mn-list-bordered': bordered },
    ]"
    :role="role"
    ><ListItem
      v-for="(item, i) in items"
      :key="item.id ?? i"
      :primary="item.title"
      :secondary="item.description"
      :disabled="item.disabled"
      @click="emit('itemClick', item, i)" /><slot
  /></view>
</template>

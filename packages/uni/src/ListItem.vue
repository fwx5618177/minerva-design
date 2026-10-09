<script setup lang="ts">
import { useSlots } from "vue";
defineProps<{
  primary?: string | number;
  secondary?: string | number | null;
  icon?: string;
  actions?: string;
  title?: string;
  description?: string;
  disabled?: boolean;
}>();
const emit = defineEmits<{ click: [event: unknown] }>();
const slots = useSlots();
</script>
<template>
  <view
    class="mn-list-item mn-uni-list-item"
    :class="{ 'mn-disabled': disabled }"
    role="listitem"
    :aria-disabled="disabled"
    @tap="!disabled && emit('click', $event)"
  >
    <view
      v-if="icon || slots.icon || slots.leading"
      class="mn-list-icon"
      aria-hidden="true"
      ><slot name="icon"
        ><slot name="leading">{{ icon }}</slot></slot
      ></view
    >
    <view class="mn-list-content"
      ><view class="mn-list-primary"
        ><slot name="primary">{{ primary ?? title }}</slot></view
      ><view
        v-if="secondary != null || description || slots.secondary"
        class="mn-list-secondary"
        ><slot name="secondary">{{ secondary ?? description }}</slot></view
      ><slot
    /></view>
    <view
      v-if="actions || slots.actions || slots.trailing"
      class="mn-list-actions"
      ><slot name="actions"
        ><slot name="trailing">{{ actions }}</slot></slot
      ></view
    >
  </view>
</template>

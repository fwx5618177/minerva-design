<script setup lang="ts">
const props = withDefaults(
  defineProps<{ title: string; disabled?: boolean }>(),
  { disabled: false },
);

const emit = defineEmits<{ confirm: [] }>();

function onConfirm() {
  if (props.disabled) return;
  uni.showToast({ title: `${props.title} confirmed`, icon: "success" });
  emit("confirm");
}
</script>

<template>
  <view class="mn-card" :class="{ 'mn-card--disabled': disabled }">
    <text class="mn-card__title">{{ title }}</text>
    <view class="mn-card__body"><slot /></view>
    <button class="mn-card__action" :disabled="disabled" @tap="onConfirm">
      OK
    </button>
  </view>
</template>

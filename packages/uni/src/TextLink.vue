<script setup lang="ts">
const props = defineProps<{
  href?: string;
  disabled?: boolean;
  label?: string;
  openType?: string;
}>();
const emit = defineEmits(["click"]);
function click() {
  if (!props.disabled) emit("click", props.href);
}
</script>
<template>
  <navigator
    v-if="href && !disabled"
    class="mn-text-link"
    :url="href"
    :open-type="(openType || 'navigate') as any"
    @tap="click"
    ><slot>{{ label }}</slot></navigator
  ><text
    v-else
    class="mn-text-link"
    :class="{ 'mn-disabled': disabled }"
    @tap="click"
    ><slot>{{ label }}</slot></text
  >
</template>

<script setup lang="ts">
defineProps<{ label?: string }>();
</script>
<template>
  <view class="mn-table-body"
    ><slot>{{ label }}</slot></view
  >
</template>

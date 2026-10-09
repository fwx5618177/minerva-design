<script setup lang="ts">
defineProps<{ content?: string }>();
</script>
<template>
  <view class="mn-prose"
    ><text v-if="content" selectable>{{ content }}</text
    ><slot
  /></view>
</template>

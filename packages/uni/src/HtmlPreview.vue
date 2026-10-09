<script setup lang="ts">
import { computed } from "vue";
import { previewDocument } from "./preview-document";
const props = withDefaults(
  defineProps<{
    html?: string;
    nodes?: any[];
    title?: string;
    viewport?: "mobile" | "desktop";
    height?: number | string;
    mobileWidth?: number;
  }>(),
  { height: 600, mobileWidth: 375, viewport: "desktop", title: "HTML preview" },
);
const h5 = typeof document !== "undefined";
const doc = computed(() => previewDocument(props.html));
</script>
<template>
  <view class="mn-html-preview"
    ><iframe
      v-if="h5"
      :title="title"
      sandbox=""
      referrerpolicy="no-referrer"
      :srcdoc="doc"
      :style="{
        width: viewport === 'mobile' ? `${mobileWidth}px` : '100%',
        height: typeof height === 'number' ? `${height}px` : height,
        border: 0,
      }" /><rich-text v-else :nodes="nodes ?? html ?? ''"
  /></view>
</template>

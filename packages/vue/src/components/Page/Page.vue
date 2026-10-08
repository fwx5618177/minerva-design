<script setup lang="ts">
/** Page: the padded, vertically spaced column of a screen's content. */
import { computed, useAttrs, type CSSProperties } from "vue";
import styles from "@react-styles/components/Page/page.module.scss";
import { hooks } from "../../internal/hooks";
import type { PageProps } from "./types";

defineOptions({ name: "Page", inheritAttrs: false });

const props = withDefaults(defineProps<PageProps>(), { maxWidth: undefined });

defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const pageStyle = computed<CSSProperties>(() => ({
  maxWidth:
    typeof props.maxWidth === "number" ? `${props.maxWidth}px` : props.maxWidth,
}));
const rootAttrs = computed(() => ({ ...attrs, ...hooks("page", "root") }));
</script>

<template>
  <div :class="styles.page" :style="pageStyle" v-bind="rootAttrs">
    <slot />
  </div>
</template>

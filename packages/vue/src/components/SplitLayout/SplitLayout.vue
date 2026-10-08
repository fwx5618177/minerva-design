<script setup lang="ts">
/**
 * SplitLayout: main content with an optional aside column (`aside` slot or
 * prop) that splits beside it once the layout's own width reaches a
 * breakpoint. Main always precedes the aside in DOM / reading order, and
 * toggling the aside never remounts main.
 */
import { computed, useAttrs, type CSSProperties } from "vue";
import { resolveSpace } from "@minerva/core";
import styles from "@react-styles/components/SplitLayout/splitLayout.module.scss";
import { hooks } from "../../internal/hooks";
import type { SplitLayoutProps } from "./types";

defineOptions({ name: "SplitLayout", inheritAttrs: false });

const props = withDefaults(defineProps<SplitLayoutProps>(), {
  aside: undefined,
  asideWidth: 320,
  collapseBelow: "md",
  gap: 6,
});

const slots = defineSlots<{
  /** Main content */
  default?: () => unknown;
  /** Secondary content (the `aside` prop) */
  aside?: () => unknown;
}>();

const attrs = useAttrs();

const layoutStyle = computed<CSSProperties>(() => {
  if (!Number.isFinite(props.asideWidth) || props.asideWidth <= 0) {
    throw new RangeError(
      "SplitLayout asideWidth must be a finite positive number",
    );
  }
  return {
    "--split-layout-aside-width": `${props.asideWidth}px`,
    "--split-layout-gap": resolveSpace(props.gap),
  } as CSSProperties;
});
const hasAside = computed(
  () => !!slots.aside || (props.aside !== null && props.aside !== undefined),
);
const rootAttrs = computed(() => ({
  ...attrs,
  ...hooks("split-layout", "root"),
}));
</script>

<template>
  <div :class="styles.root" :style="layoutStyle" v-bind="rootAttrs">
    <div
      :class="[
        styles.grid,
        styles[collapseBelow],
        hasAside && styles.hasAside,
      ]"
    >
      <div :class="styles.main" v-bind="hooks('split-layout', 'main')">
        <slot />
      </div>
      <div
        v-if="hasAside"
        :class="styles.aside"
        v-bind="hooks('split-layout', 'aside')"
      >
        <slot name="aside">{{ aside }}</slot>
      </div>
    </div>
  </div>
</template>

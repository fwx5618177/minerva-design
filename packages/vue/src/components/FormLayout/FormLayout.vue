<script setup lang="ts">
/**
 * FormLayout: a native `<form>` laying its fields out on a ResponsiveGrid
 * (container queries at 480 / 768 / 1200px). Form attributes and listeners
 * (`@submit`) go to the `<form>`; submit, reset and native validation are
 * left to the browser.
 */
import { computed, useAttrs } from "vue";
import styles from "@react-styles/components/FormLayout/formLayout.module.scss";
import { hooks } from "../../internal/hooks";
import { ResponsiveGrid } from "../ResponsiveGrid";
import type { FormLayoutProps } from "./types";

defineOptions({ name: "FormLayout", inheritAttrs: false });

withDefaults(defineProps<FormLayoutProps>(), {
  columns: 1,
  gap: 4,
  rowGap: undefined,
  columnGap: undefined,
});
defineSlots<{
  /** Fields */
  default?: () => unknown;
}>();

const attrs = useAttrs();
const formAttrs = computed(() => ({
  ...attrs,
  ...hooks("form-layout", "root"),
}));
</script>

<template>
  <form :class="styles.root" v-bind="formAttrs">
    <ResponsiveGrid
      :columns="columns"
      :gap="gap"
      :row-gap="rowGap"
      :column-gap="columnGap"
    >
      <slot />
    </ResponsiveGrid>
  </form>
</template>

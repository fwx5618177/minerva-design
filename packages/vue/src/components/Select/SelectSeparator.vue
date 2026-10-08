<script setup lang="ts">
/** SelectSeparator: a (presentational) divider between options or groups. */
import { computed, useAttrs } from "vue";
import styles from "@react-styles/components/Select/select.module.scss";
import { hooks } from "../../internal/hooks";

defineOptions({ name: "SelectSeparator", inheritAttrs: false });

const attrs = useAttrs();
const rootAttrs = computed(() => ({
  ...attrs,
  ...hooks("select-separator", "root"),
}));
</script>

<template>
  <div aria-hidden="true" :class="styles.separator" v-bind="rootAttrs" />
</template>

<script setup lang="ts">
/** CardHeader: top section, usually holding CardTitle and CardDescription. */
import { computed, useAttrs } from "vue";
import styles from "@react-styles/components/Card/card.module.scss";
import { hooks } from "../../internal/hooks";
import type { CardHeaderProps } from "./types";

defineOptions({ name: "CardHeader", inheritAttrs: false });

const props = withDefaults(defineProps<CardHeaderProps>(), { padding: undefined });

defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const classes = computed(() => [styles.cardHeader, props.padding && styles[`pad-${props.padding}`]]);
const rootAttrs = computed(() => ({
  ...attrs,
  ...hooks("card-header", "root"),
}));
</script>

<template>
  <div :class="classes" v-bind="rootAttrs">
    <slot />
  </div>
</template>

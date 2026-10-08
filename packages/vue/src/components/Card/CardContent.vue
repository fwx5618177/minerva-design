<script setup lang="ts">
/** CardContent: main body of the card. */
import { computed, useAttrs } from "vue";
import styles from "@react-styles/components/Card/card.module.scss";
import { hooks } from "../../internal/hooks";
import type { CardContentProps } from "./types";

defineOptions({ name: "CardContent", inheritAttrs: false });

const props = withDefaults(defineProps<CardContentProps>(), { animation: undefined, padding: undefined });

defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const classes = computed(() => [styles.cardContent, props.animation && styles[props.animation], props.padding && styles[`pad-${props.padding}`]]);
const rootAttrs = computed(() => ({
  ...attrs,
  ...hooks("card-content", "root"),
}));
</script>

<template>
  <div :class="classes" v-bind="rootAttrs">
    <slot />
  </div>
</template>

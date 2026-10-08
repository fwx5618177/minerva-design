<script setup lang="ts">
/** CardFooter: bottom section, e.g. for actions. */
import { computed, useAttrs } from "vue";
import styles from "@react-styles/components/Card/card.module.scss";
import { hooks } from "../../internal/hooks";
import type { CardFooterProps } from "./types";

defineOptions({ name: "CardFooter", inheritAttrs: false });

const props = withDefaults(defineProps<CardFooterProps>(), { padding: undefined });

defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const classes = computed(() => [styles.cardFooter, props.padding && styles[`pad-${props.padding}`]]);
const rootAttrs = computed(() => ({
  ...attrs,
  ...hooks("card-footer", "root"),
}));
</script>

<template>
  <div :class="classes" v-bind="rootAttrs">
    <slot />
  </div>
</template>

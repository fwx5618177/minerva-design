<script setup lang="ts">
/** CardDescription: secondary text shown below the title. */
import { computed, useAttrs } from "vue";
import styles from "@react-styles/components/Card/card.module.scss";
import { hooks } from "../../internal/hooks";
import type { CardDescriptionProps } from "./types";

defineOptions({ name: "CardDescription", inheritAttrs: false });

defineProps<CardDescriptionProps>();

defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const classes = computed(() => [styles.cardDescription]);
const rootAttrs = computed(() => ({
  ...attrs,
  ...hooks("card-description", "root"),
}));
</script>

<template>
  <p :class="classes" v-bind="rootAttrs">
    <slot />
  </p>
</template>

<script setup lang="ts">
/** CardTitle: heading of the card (h3 by default). */
import { computed, useAttrs } from "vue";
import styles from "@react-styles/components/Card/card.module.scss";
import { hooks } from "../../internal/hooks";
import type { CardTitleProps } from "./types";

defineOptions({ name: "CardTitle", inheritAttrs: false });

withDefaults(defineProps<CardTitleProps>(), { as: "h3" });

defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const classes = computed(() => [styles.cardTitle]);
const rootAttrs = computed(() => ({
  ...attrs,
  ...hooks("card-title", "root"),
}));
</script>

<template>
  <component :is="as" :class="classes" v-bind="rootAttrs">
    <slot />
  </component>
</template>

<script setup lang="ts">
/**
 * Card: a content container composed of CardHeader, CardContent and
 * CardFooter (omit a section to leave it out). `padding` switches to the
 * padded layout (the card pads itself), `interactive` adds hover / focus
 * feedback and `as` changes the root element (e.g. a link).
 */
import { computed, useAttrs } from "vue";
import { linkRel } from "@minerva/core";
import styles from "@react-styles/components/Card/card.module.scss";
import { hooks } from "../../internal/hooks";
import { safeHref } from "../../internal/safe-url";
import type { CardProps } from "./types";

defineOptions({ name: "Card", inheritAttrs: false });

const props = withDefaults(defineProps<CardProps>(), {
  variant: "default",
  padding: undefined,
  interactive: false,
  as: "div",
  type: undefined,
});

defineSlots<{
  /** Card content, usually CardHeader, CardContent and CardFooter */
  default?: () => unknown;
}>();

const attrs = useAttrs();

const classes = computed(() => [
  styles.card,
  styles[props.variant],
  props.padding && styles.padded,
  props.padding && styles[`pad-${props.padding}`],
  props.interactive && styles.interactive,
]);
const rootAttrs = computed(() => {
  const isButton = props.as === "button";
  const disabled = attrs.disabled;
  const link =
    props.as === "a"
      ? {
          href: safeHref("Card", attrs.href),
          rel: linkRel(
            attrs.target as string | undefined,
            attrs.rel as string | undefined,
          ),
        }
      : undefined;
  return {
    type: isButton ? (props.type ?? "button") : undefined,
    ...attrs,
    ...link,
    ...hooks("card", "root", {
      variant: props.variant,
      disabled:
        isButton &&
        disabled !== undefined &&
        disabled !== null &&
        disabled !== false,
    }),
  };
});
</script>

<template>
  <component :is="as" :class="classes" v-bind="rootAttrs">
    <slot />
  </component>
</template>

<script setup lang="ts">
/**
 * Prose: unframed, theme-aware typography for semantic HTML (articles,
 * rendered Markdown, rich-text editors). It does not parse or sanitize HTML.
 * The same rules are published as the `prose` Sass mixin (`prose.scss`).
 */
import { computed, useAttrs } from "vue";
import styles from "@react-styles/components/Prose/prose.module.scss";
import { hooks } from "../../internal/hooks";
import { Slot } from "../../internal/Slot";
import type { ProseProps } from "./types";

defineOptions({ name: "Prose", inheritAttrs: false });

withDefaults(defineProps<ProseProps>(), { asChild: false });

defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const rootAttrs = computed(() => ({ ...attrs, ...hooks("prose", "root") }));
</script>

<template>
  <component
    :is="asChild ? Slot : 'div'"
    :class="styles.prose"
    v-bind="rootAttrs"
  >
    <slot />
  </component>
</template>

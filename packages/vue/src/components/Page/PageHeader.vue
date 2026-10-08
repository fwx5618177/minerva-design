<script setup lang="ts">
/** PageHeader: the page's h1 with optional description and actions. */
import { computed, useAttrs } from "vue";
import styles from "@react-styles/components/Page/page.module.scss";
import { hooks } from "../../internal/hooks";
import { hasContent } from "./content";
import type { PageHeaderProps } from "./types";

defineOptions({ name: "PageHeader", inheritAttrs: false });

withDefaults(defineProps<PageHeaderProps>(), {
  title: undefined,
  description: undefined,
});

const slots = defineSlots<{
  /** Heading content (the `title` prop) */
  title?: () => unknown;
  /** Supporting content (the `description` prop) */
  description?: () => unknown;
  /** Actions next to the heading */
  actions?: () => unknown;
}>();

const attrs = useAttrs();
const rootAttrs = computed(() => ({
  ...attrs,
  ...hooks("page-header", "root"),
}));
</script>

<template>
  <header :class="styles.header" v-bind="rootAttrs">
    <div :class="styles.heading">
      <h1 v-bind="hooks('page-header', 'title')">
        <slot name="title">{{ title }}</slot>
      </h1>
      <p
        v-if="hasContent(description, slots.description)"
        v-bind="hooks('page-header', 'description')"
      >
        <slot name="description">{{ description }}</slot>
      </p>
    </div>
    <div
      v-if="slots.actions"
      :class="styles.actions"
      v-bind="hooks('page-header', 'actions')"
    >
      <slot name="actions" />
    </div>
  </header>
</template>

<script setup lang="ts">
/** PageSection: a region named by its h2 title, with optional actions. */
import { computed, useAttrs, useId } from "vue";
import styles from "@react-styles/components/Page/page.module.scss";
import { hooks } from "../../internal/hooks";
import { hasContent } from "./content";
import type { PageSectionProps } from "./types";

defineOptions({ name: "PageSection", inheritAttrs: false });

withDefaults(defineProps<PageSectionProps>(), {
  title: undefined,
  description: undefined,
});

const slots = defineSlots<{
  /** Section content */
  default?: () => unknown;
  /** Heading content (the `title` prop) */
  title?: () => unknown;
  /** Supporting content (the `description` prop) */
  description?: () => unknown;
  /** Actions next to the heading */
  actions?: () => unknown;
  /** Decorative icon before the title, hidden from assistive technology */
  icon?: () => unknown;
}>();

const headingId = useId();
const attrs = useAttrs();
const rootAttrs = computed(() => ({
  ...attrs,
  ...hooks("page-section", "root"),
}));
</script>

<template>
  <section
    :aria-labelledby="headingId"
    :class="styles.section"
    v-bind="rootAttrs"
  >
    <div :class="styles.sectionHeader" v-bind="hooks('page-section', 'header')">
      <div :class="styles.heading">
        <h2 :id="headingId" v-bind="hooks('page-section', 'title')">
          <span
            v-if="slots.icon"
            :class="styles.sectionIcon"
            aria-hidden="true"
            v-bind="hooks('page-section', 'icon')"
          >
            <slot name="icon" />
          </span>
          <slot name="title">{{ title }}</slot>
        </h2>
        <p
          v-if="hasContent(description, slots.description)"
          v-bind="hooks('page-section', 'description')"
        >
          <slot name="description">{{ description }}</slot>
        </p>
      </div>
      <div
        v-if="slots.actions"
        :class="styles.actions"
        v-bind="hooks('page-section', 'actions')"
      >
        <slot name="actions" />
      </div>
    </div>
    <slot />
  </section>
</template>

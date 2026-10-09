<script setup lang="ts">
/**
 * Empty: the empty state of a page or a section (`role="status"`), with an
 * icon or illustration, a title naming the region, a description, actions
 * and a footer (default slot).
 */
import { computed, useAttrs, useId, type CSSProperties } from "vue";
import styles from "@react-styles/components/Empty/empty.module.scss";
import { hooks } from "../../internal/hooks";
import { IconInbox } from "../../internal/icons";
import { useI18n } from "../../config/useI18n";
import type { EmptyProps } from "./types";

defineOptions({ name: "Empty", inheritAttrs: false });

const props = withDefaults(defineProps<EmptyProps>(), {
  icon: undefined,
  title: undefined,
  description: undefined,
  size: undefined,
  useSvg: false,
  width: undefined,
  height: undefined,
  showShadow: false,
});

const slots = defineSlots<{
  /** Footer content, e.g. an action button */
  default?: () => unknown;
  /** Custom icon, replacing the default one */
  icon?: () => unknown;
  /** Heading (the `title` prop) */
  title?: () => unknown;
  /** Description (the `description` prop) */
  description?: () => unknown;
  /** Primary call to action (a Button, a link or a group of them) */
  action?: () => unknown;
  /** Secondary action rendered after `action` */
  "secondary-action"?: () => unknown;
}>();

const attrs = useAttrs();
const { t } = useI18n();
const titleId = useId();
const descriptionId = useId();

const px = (value: string | number | undefined) =>
  typeof value === "number" ? `${value}px` : value;

// Only an omitted description falls back to the default (null hides it)
const description = computed(() =>
  props.description === undefined ? t("empty.description") : props.description,
);
const hasTitle = computed(() => !!slots.title || !!props.title);
const hasDescription = computed(
  () => !!slots.description || !!description.value,
);
const hideIcon = computed(() => props.icon === null || props.icon === false);
const hasActions = computed(
  () => !!slots.action || !!slots["secondary-action"],
);

const sizeStyle = computed<CSSProperties>(() => ({
  width: px(props.width),
  height: px(props.height),
}));
const rootAttrs = computed(() => ({
  role: "status",
  // Named by the visible title (or the description) unless the consumer
  // names the region explicitly
  "aria-labelledby":
    attrs["aria-label"] !== undefined
      ? undefined
      : hasTitle.value
        ? titleId
        : hasDescription.value
          ? descriptionId
          : undefined,
  "aria-describedby":
    hasTitle.value && hasDescription.value ? descriptionId : undefined,
  ...attrs,
  ...hooks("empty", "root", { size: props.size }),
}));
</script>

<template>
  <div
    :class="[
      styles.empty,
      showShadow && styles.showShadow,
      size && styles.sized,
      size && styles[`size-${size}`],
    ]"
    :style="sizeStyle"
    v-bind="rootAttrs"
  >
    <div
      v-if="!hideIcon"
      :class="styles.iconWrapper"
      v-bind="hooks('empty', 'icon')"
    >
      <slot name="icon">
        <svg
          v-if="useSvg"
          :class="styles.defaultIcon"
          aria-hidden="true"
          focusable="false"
          width="64"
          height="41"
          viewBox="0 0 64 41"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g transform="translate(0 1)" fill="none" fill-rule="evenodd">
            <ellipse
              style="fill: var(--surface-muted-color)"
              cx="32"
              cy="33"
              rx="32"
              ry="7"
            />
            <g fill-rule="nonzero" style="stroke: var(--border-strong-color)">
              <path
                d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"
              />
              <path
                d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
                style="fill: var(--surface-color)"
              />
            </g>
          </g>
        </svg>
        <IconInbox
          v-else
          :size="40"
          :class="styles.defaultIcon"
          aria-hidden="true"
        />
      </slot>
    </div>
    <div
      v-if="hasTitle"
      :id="titleId"
      :class="styles.title"
      v-bind="hooks('empty', 'title')"
    >
      <slot name="title">{{ title }}</slot>
    </div>
    <div
      v-if="hasDescription"
      :id="descriptionId"
      :class="styles.description"
      v-bind="hooks('empty', 'description')"
    >
      <slot name="description">{{ description }}</slot>
    </div>
    <div
      v-if="hasActions"
      :class="styles.actions"
      v-bind="hooks('empty', 'actions')"
    >
      <slot name="action" />
      <slot name="secondary-action" />
    </div>
    <div
      v-if="slots.default"
      :class="styles.footer"
      v-bind="hooks('empty', 'footer')"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { isVueComment } from "./host";
import { computed, useSlots, Text as VueText, Fragment } from "vue";
import { useI18n } from "./i18n";
const props = withDefaults(
  defineProps<{
    count?: number;
    max?: number;
    dot?: boolean;
    status?: string;
    showZero?: boolean;
    color?: string;
    variant?: "solid" | "subtle" | "outline";
    size?: "small" | "medium" | "large";
    content?: string | number;
    position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
    borderRadius?: string;
    borderWidth?: string;
    icon?: string;
    role?: string;
    ariaLabel?: string;
  }>(),
  {
    max: 99,
    color: "primary",
    variant: "solid",
    size: "medium",
    position: "top-right",
    role: "status",
  },
);
const slots = useSlots();
const { t } = useI18n();
const children = computed(
  () => slots.default?.().filter((v) => !isVueComment(v.type)) ?? [],
);
function plain(nodes: any[]): boolean {
  return nodes.every(
    (node) =>
      node.type === VueText ||
      (typeof node.children === "string" && node.type === VueText) ||
      (node.type === Fragment && plain(node.children ?? [])),
  );
}
const attached = computed(
  () => children.value.length > 0 && !plain(children.value),
);
const color = computed(() =>
  props.status
    ? props.status === "error"
      ? "danger"
      : props.status
    : props.color,
);
const content = computed(
  () =>
    props.content ??
    (props.count === undefined
      ? undefined
      : props.count > props.max
        ? `${props.max}+`
        : props.count),
);
const visible = computed(
  () =>
    props.dot ||
    props.content !== undefined ||
    props.count === undefined ||
    props.count !== 0 ||
    props.showZero,
);
</script>
<template>
  <view class="mn-badge mn-uni-badge" :class="{ 'mn-badge-attached': attached }"
    ><slot v-if="attached" /><text
      v-if="visible"
      data-badge
      :role="role"
      :aria-label="props.ariaLabel ?? (dot ? t('badge.default') : undefined)"
      :data-position="position"
      :data-color="color"
      class="mn-uni-badge-indicator"
      :class="[
        `mn-tone-${color}`,
        `mn-position-${position}`,
        `mn-badge-${variant}`,
        `mn-badge-${size}`,
        { 'mn-badge-dot': dot },
      ]"
      :style="{ borderRadius, borderWidth }"
      ><template v-if="!dot"
        ><slot name="icon"
          ><text v-if="icon">{{ icon }}</text></slot
        ><slot name="content"
          >{{ content
          }}<slot
            v-if="!attached && content === undefined" /></slot></template></text
  ></view>
</template>

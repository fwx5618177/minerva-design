<script setup lang="ts">
import { computed, inject, useSlots, type ComputedRef } from "vue";
import { useNativeId as useId } from "./native-id";
import {
  resolveTokens,
  githubDark,
  type ComponentTheme,
  type DesignOptions,
  type Palette,
} from "@minerva/core";
import { useI18n } from "./i18n";
import { cssLength } from "./primitives";
const { t } = useI18n();
const props = withDefaults(
  defineProps<{
    title?: string | number;
    description?: string | number | null | false;
    icon?: string | null | false;
    action?: string;
    secondaryAction?: string;
    size?: "small" | "medium" | "large";
    useSvg?: boolean;
    width?: string | number;
    height?: string | number;
    showShadow?: boolean;
    ariaLabel?: string;
  }>(),
  { description: undefined, icon: undefined },
);
const slots = useSlots();
const titleId = useId(),
  descriptionId = useId();
const description = computed(() =>
  props.description === undefined ? t("empty.description") : props.description,
);
const hasTitle = computed(
  () => (props.title != null && props.title !== "") || !!slots.title,
);
const hasDescription = computed(
  () =>
    (description.value != null &&
      description.value !== false &&
      description.value !== "") ||
    !!slots.description,
);
const config = inject<
  ComputedRef<{
    mode?: "light" | "dark";
    theme?: string | Partial<ComponentTheme>;
    palette?: Palette | null;
    design?: DesignOptions;
  }>
>(
  "minerva:config",
  computed(() => ({ mode: "light" })),
);
const imageSource = computed(() => {
  const c = config.value;
  const { colors } = resolveTokens({
    mode: c.mode ?? "light",
    palette: c.palette,
    design: c.design,
    overrides:
      c.theme === "github-dark"
        ? githubDark
        : typeof c.theme === "object"
          ? c.theme
          : undefined,
  });
  const svg = props.useSvg
    ? `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="41" viewBox="0 0 64 41"><g transform="translate(0 1)" fill="none" fill-rule="evenodd"><ellipse cx="32" cy="33" rx="32" ry="7" fill="${colors["surface-muted-color"]}"/><g fill-rule="nonzero" stroke="${colors["border-strong-color"]}"><path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"/><path d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" fill="${colors["surface-color"]}"/></g></g></svg>`
    : `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="${colors["text-muted-color"]}"><path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1ZM5 5v9h4a3 3 0 0 0 6 0h4V5ZM5 16v3h14v-3h-2.54a5 5 0 0 1-8.92 0Z"/></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
});
</script>
<template>
  <view
    class="mn-empty mn-uni-empty"
    :class="[
      size && `mn-empty-${size}`,
      { 'mn-empty-shadow': showShadow, 'mn-empty-sized': !!size },
    ]"
    role="status"
    :aria-label="ariaLabel"
    :aria-labelledby="
      ariaLabel
        ? undefined
        : hasTitle
          ? titleId
          : hasDescription
            ? descriptionId
            : undefined
    "
    :aria-describedby="hasTitle && hasDescription ? descriptionId : undefined"
    :style="{ width: cssLength(width), height: cssLength(height) }"
  >
    <view
      v-if="icon !== null && icon !== false"
      class="mn-empty-icon"
      data-part="icon"
      aria-hidden="true"
      ><slot name="icon"
        ><text v-if="icon">{{ icon }}</text>
        <image
          v-else
          class="mn-empty-inbox"
          :class="{ 'mn-empty-illustration': useSvg }"
          :src="imageSource"
          mode="aspectFit" /></slot
    ></view>
    <view v-if="hasTitle" :id="titleId" class="mn-empty-title"
      ><slot name="title">{{ title }}</slot></view
    >
    <view v-if="hasDescription" :id="descriptionId" class="mn-empty-description"
      ><slot name="description">{{ description }}</slot></view
    >
    <view
      v-if="action || secondaryAction || slots.action || slots.secondaryAction"
      class="mn-empty-actions"
      ><slot name="action">{{ action }}</slot
      ><slot name="secondaryAction">{{ secondaryAction }}</slot></view
    >
    <view v-if="slots.default" class="mn-empty-footer"><slot /></view>
  </view>
</template>

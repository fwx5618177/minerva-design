<script setup lang="ts">
/**
 * LoadingState: page / route / section loading presentation. A decorative
 * ProgressIndicator spinner next to a visible label, inside a single polite
 * status region. It does not set aria-busy: mark the content container busy
 * yourself.
 */
import { computed, useAttrs } from "vue";
import styles from "@react-styles/components/LoadingState/loadingState.module.scss";
import { hooks } from "../../internal/hooks";
import { useI18n } from "../../config/useI18n";
import { ProgressIndicator } from "../ProgressIndicator";
import type { LoadingStateProps } from "./types";

defineOptions({ name: "LoadingState", inheritAttrs: false });

const props = withDefaults(defineProps<LoadingStateProps>(), {
  label: undefined,
  size: "medium",
});

const attrs = useAttrs();
const { t } = useI18n();
const rootAttrs = computed(() => ({
  ...attrs,
  ...hooks("loading-state", "root", { size: props.size }),
}));
</script>

<template>
  <div
    :class="[styles.loadingState, styles[size]]"
    role="status"
    aria-live="polite"
    aria-atomic="true"
    v-bind="rootAttrs"
  >
    <span :class="styles.indicator" v-bind="hooks('loading-state', 'spinner')">
      <ProgressIndicator color="current" decorative />
    </span>
    <span :class="styles.label" v-bind="hooks('loading-state', 'label')">
      {{ label ?? t("loadingState.label") }}
    </span>
  </div>
</template>

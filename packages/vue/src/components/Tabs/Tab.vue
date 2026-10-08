<script setup lang="ts">
/** Tab: a `role="tab"` trigger button of a `TabList`. */
import { computed, inject, ref, useAttrs } from "vue";
import styles from "@react-styles/components/Tabs/tabs.module.scss";
import { hooks } from "../../internal/hooks";
import { TAB_STOP_KEY, panelId, tabId, useTabsContext } from "./context";
import type { TabProps } from "./types";

defineOptions({ name: "Tab", inheritAttrs: false });

const props = withDefaults(defineProps<TabProps>(), {
  disabled: false,
  color: undefined,
});
defineSlots<{
  /** Tab content */
  default?: () => unknown;
}>();

const attrs = useAttrs();
const context = useTabsContext("Tab");
const fallbackStop = inject(TAB_STOP_KEY, ref<string | undefined>());
const id = computed(() => tabId(context.baseId, props.value));
const selected = computed(() => props.value === context.value.value);
const isTabStop = computed(() =>
  fallbackStop.value === undefined
    ? selected.value
    : fallbackStop.value === id.value,
);

const select = () =>
  context.send({
    type: "SELECT",
    value: props.value,
    disabled: props.disabled,
  });

function onMousedown(event: MouseEvent) {
  if (event.defaultPrevented || props.disabled) return;
  if (event.button === 0 && !event.ctrlKey) select();
  // Keep focus where it is on ctrl-click / other buttons (context menus).
  else event.preventDefault();
}

function onKeydown(event: KeyboardEvent) {
  if (event.defaultPrevented || props.disabled) return;
  if (event.key !== "Enter" && event.key !== " ") return;
  // Handled here, so suppress the native button click activation.
  event.preventDefault();
  select();
}

// Automatic activation selects the focused tab (see the tabs machine).
function onFocus() {
  context.send({ type: "FOCUS", value: props.value, disabled: props.disabled });
}

// Assistive technologies may activate with a bare click (no mouse down).
function onClick(event: MouseEvent) {
  if (!event.defaultPrevented && !props.disabled && event.detail === 0) {
    select();
  }
}

const tabAttrs = computed(() => ({
  ...attrs,
  ...hooks("tab", "root", {
    state: selected.value ? "active" : "inactive",
    disabled: props.disabled,
    orientation: context.orientation.value,
    variant: context.variant.value,
    color: props.color,
  }),
}));
</script>

<template>
  <button
    :id="id"
    type="button"
    role="tab"
    :aria-selected="selected"
    :aria-controls="panelId(context.baseId, value)"
    :disabled="disabled"
    :tabindex="isTabStop ? 0 : -1"
    :class="[
      styles.trigger,
      styles[`${context.variant.value}Trigger`],
      context.orientation.value === 'vertical' && styles.verticalTrigger,
      color && styles[color],
      color && styles.colored,
    ]"
    v-bind="tabAttrs"
    @mousedown="onMousedown"
    @keydown="onKeydown"
    @focus="onFocus"
    @click="onClick"
  >
    <slot />
  </button>
</template>

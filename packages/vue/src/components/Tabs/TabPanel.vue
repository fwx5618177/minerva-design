<script setup lang="ts">
/**
 * TabPanel: the `role="tabpanel"` content of the tab with the same value.
 * Inactive panels are unmounted unless `forceMount`, which keeps them in the
 * DOM with the `hidden` attribute.
 */
import { computed, useAttrs } from "vue";
import styles from "@react-styles/components/Tabs/tabs.module.scss";
import { hooks } from "../../internal/hooks";
import { panelId, tabId, useTabsContext } from "./context";
import type { TabPanelProps } from "./types";

defineOptions({ name: "TabPanel", inheritAttrs: false });

const props = withDefaults(defineProps<TabPanelProps>(), {
  forceMount: false,
});
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const context = useTabsContext("TabPanel");
const selected = computed(() => props.value === context.value.value);
const panelAttrs = computed(() => ({
  ...attrs,
  ...hooks("tab-panel", "root", {
    state: selected.value ? "active" : "inactive",
    orientation: context.orientation.value,
  }),
}));
</script>

<template>
  <div
    v-if="selected || forceMount"
    :id="panelId(context.baseId, value)"
    role="tabpanel"
    :aria-labelledby="tabId(context.baseId, value)"
    :hidden="!selected"
    tabindex="0"
    :class="styles.panel"
    v-bind="panelAttrs"
  >
    <slot />
  </div>
</template>

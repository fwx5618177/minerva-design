<script setup lang="ts">
/**
 * TabList: the `role="tablist"` container. Arrow keys (per orientation and
 * direction), Home and End move focus among its enabled tabs. It scrolls
 * (without a visible scrollbar) and keeps the selected tab in view after
 * async option updates and resizes, without scrolling the page or moving
 * focus.
 */
import {
  computed,
  onBeforeUnmount,
  onMounted,
  provide,
  ref,
  useAttrs,
  watch,
} from "vue";
import { getTabsNavigationIndex, getTabsTabStop } from "@minerva/core";
import styles from "@react-styles/components/Tabs/tabs.module.scss";
import { hooks } from "../../internal/hooks";
import { resolveDirection } from "../../internal/direction";
import { TAB_STOP_KEY, getOwnTabs, tabId, useTabsContext } from "./context";
import type { TabListProps } from "./types";

defineOptions({ name: "TabList", inheritAttrs: false });

const props = withDefaults(defineProps<TabListProps>(), { loop: true });
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const context = useTabsContext("TabList");
const listRef = ref<HTMLDivElement | null>(null);
const fallbackStop = ref<string>();
provide(TAB_STOP_KEY, fallbackStop);

// The selected tab is the tab stop; when there is none (no value, or the
// selected tab is disabled / missing) the first enabled tab is.
const updateStop = () => {
  const list = listRef.value;
  if (!list) return;
  const tabs = getOwnTabs(list).map((tab) => ({
    value: tab.id,
    disabled: tab.disabled,
  }));
  const value = context.value.value;
  const selectedId =
    value === undefined ? undefined : tabId(context.baseId, value);
  const stop = getTabsTabStop(tabs, selectedId)?.value;
  fallbackStop.value = stop === selectedId ? undefined : stop;
};

const reveal = () => {
  const list = listRef.value;
  if (!list) return;
  const selected = getOwnTabs(list).find(
    (tab) => tab.getAttribute("data-state") === "active",
  );
  if (!selected) return;
  // Scroll only the list (never scrollIntoView, which scrolls the page).
  const item = selected.getBoundingClientRect();
  const box = list.getBoundingClientRect();
  if (context.orientation.value === "horizontal") {
    if (item.left < box.left) list.scrollLeft += item.left - box.left;
    else if (item.right > box.right) list.scrollLeft += item.right - box.right;
  } else if (item.top < box.top) list.scrollTop += item.top - box.top;
  else if (item.bottom > box.bottom) list.scrollTop += item.bottom - box.bottom;
};

let stopObserver: MutationObserver | undefined;
let revealObserver: MutationObserver | undefined;
let resizeObserver: ResizeObserver | undefined;

onMounted(() => {
  const list = listRef.value!;
  updateStop();
  // Tabs added, removed or (un)disabled without a selection change.
  stopObserver = new MutationObserver(updateStop);
  stopObserver.observe(list, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["disabled"],
  });
  reveal();
  revealObserver = new MutationObserver(reveal);
  revealObserver.observe(list, {
    childList: true,
    subtree: true,
    characterData: true,
    attributes: true,
    attributeFilter: ["data-state"],
  });
  resizeObserver =
    typeof ResizeObserver === "undefined"
      ? undefined
      : new ResizeObserver(reveal);
  resizeObserver?.observe(list);
});

watch(() => context.value.value, updateStop, { flush: "post" });
watch(() => context.orientation.value, reveal, { flush: "post" });

onBeforeUnmount(() => {
  stopObserver?.disconnect();
  revealObserver?.disconnect();
  resizeObserver?.disconnect();
});

function onKeydown(event: KeyboardEvent) {
  if (event.defaultPrevented) return;
  const list = event.currentTarget as HTMLElement;
  if (event.altKey || event.ctrlKey || event.metaKey) return;
  const tabs = getOwnTabs(list);
  const currentIndex = tabs.indexOf(event.target as HTMLButtonElement);
  // Keys from nested Tabs (or other descendants) are not ours.
  if (currentIndex === -1) return;
  const next = getTabsNavigationIndex({
    currentIndex,
    tabs,
    key: event.key,
    orientation: context.orientation.value,
    dir: resolveDirection(context.dir.value, list),
    loop: props.loop,
  });
  if (next === null) return;
  event.preventDefault();
  tabs[next].focus();
}

const listAttrs = computed(() => ({
  ...attrs,
  ...hooks("tabs", "list", {
    orientation: context.orientation.value,
    variant: context.variant.value,
  }),
}));
</script>

<template>
  <!-- The tabs are the focusable elements, not the tablist itself. -->
  <div
    ref="listRef"
    role="tablist"
    :aria-orientation="context.orientation.value"
    :class="[
      styles.list,
      styles[`${context.variant.value}List`],
      context.orientation.value === 'vertical' && styles.verticalList,
    ]"
    v-bind="listAttrs"
    @keydown="onKeydown"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
/**
 * PageTabs: a strip of open application pages (route navigation, not an
 * ARIA tablist). The application owns routes, closing and leave guards.
 * Overflowing items scroll horizontally with scroll buttons and the current
 * item is kept in view. Attributes (`aria-label`) go to the `<nav>`.
 */
import {
  computed,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  ref,
  useAttrs,
} from "vue";
import styles from "@react-styles/components/PageTabs/pageTabs.module.scss";
import { hooks } from "../../internal/hooks";
import { getDirection } from "../../internal/direction";
import { IconChevronLeft, IconChevronRight } from "../../internal/icons";
import { useI18n } from "../../config/useI18n";
import { IconButton } from "../IconButton";
import type { PageTabsProps } from "./types";

defineOptions({ name: "PageTabs", inheritAttrs: false });

const props = withDefaults(defineProps<PageTabsProps>(), {
  scrollLeftLabel: undefined,
  scrollRightLabel: undefined,
});
const slots = defineSlots<{
  /** PageTab items */
  default?: () => unknown;
  /** Global actions shown after the scrollable list (e.g. a page menu) */
  actions?: () => unknown;
}>();

const attrs = useAttrs();
const { t } = useI18n();
const TAB_SELECTOR = `.${styles.pageTab}`;

const viewport = ref<HTMLDivElement | null>(null);
const list = ref<HTMLDivElement | null>(null);
let focused: HTMLElement | null = null;
let previousItems: string | null = null;
/** Scroll button last used: it may get disabled while it has focus */
let movedWith: "left" | "right" | null = null;

const scroll = ref({ overflow: false, left: false, right: false, rtl: false });

function measure() {
  const el = viewport.value;
  if (!el) return;
  // In RTL, scrollLeft runs from 0 (start, right edge) to -(max).
  const rtl = getDirection(el) === "rtl";
  const max = el.scrollWidth - el.clientWidth;
  const next = {
    overflow: el.scrollWidth > el.clientWidth + 1,
    left: rtl ? el.scrollLeft > -max + 1 : el.scrollLeft > 1,
    right: rtl ? el.scrollLeft < -1 : el.scrollLeft < max - 1,
    rtl,
  };
  const prev = scroll.value;
  if (
    prev.overflow !== next.overflow ||
    prev.left !== next.left ||
    prev.right !== next.right ||
    prev.rtl !== next.rtl
  ) {
    scroll.value = next;
  }
}

function revealActive() {
  const el = viewport.value;
  if (!el) return;
  const active = list.value?.querySelector<HTMLElement>(
    `${TAB_SELECTOR}[data-current]`,
  );
  if (active) {
    const view = el.getBoundingClientRect();
    const item = active.getBoundingClientRect();
    // Oversized items always align their start edge
    if (item.width > view.width) el.scrollLeft += item.left - view.left;
    else if (item.left < view.left) el.scrollLeft -= view.left - item.left;
    else if (item.right > view.right) el.scrollLeft += item.right - view.right;
  }
  measure();
}

// After every render: reveal the active item when the items changed (not on
// unrelated re-renders, to keep manual scrolling), and give focus back to
// the current page when the focused item was removed.
function afterRender() {
  const items = JSON.stringify([
    props.activeValue,
    ...Array.from(
      list.value?.querySelectorAll<HTMLElement>(TAB_SELECTOR) ?? [],
      (item) => [item.dataset.value, item.dataset.current],
    ),
  ]);
  if (items !== previousItems) {
    previousItems = items;
    revealActive();
  }
  const doc = list.value?.ownerDocument;
  if (focused && !focused.isConnected && doc?.activeElement === doc?.body) {
    list.value
      ?.querySelector<HTMLButtonElement>('[aria-current="page"]')
      ?.focus({ preventScroll: true });
  }
  // A scroll button activated from the keyboard is disabled once its end is
  // reached, which would drop focus to <body>: hand focus to the opposite
  // scroll button instead.
  if (movedWith) {
    const from = scrollButton(movedWith);
    if (from?.disabled) {
      const to = scrollButton(movedWith === "left" ? "right" : "left");
      movedWith = null;
      if (doc?.activeElement === from || doc?.activeElement === doc?.body) {
        to?.focus({ preventScroll: true });
      }
    }
  }
}

/** The physical left / right scroll `<button>` (IconButtons, in DOM order) */
const scrollButton = (side: "left" | "right") => {
  const buttons =
    viewport.value?.parentElement?.querySelectorAll<HTMLButtonElement>(
      `button.${styles.scroll}`,
    );
  const first = side === "left" ? !scroll.value.rtl : scroll.value.rtl;
  return buttons?.[first ? 0 : 1];
};

let observer: ResizeObserver | undefined;
onMounted(() => {
  afterRender();
  if (typeof ResizeObserver === "undefined") return;
  observer = new ResizeObserver(() => revealActive());
  observer.observe(viewport.value!);
  observer.observe(list.value!);
});
onUpdated(afterRender);
onBeforeUnmount(() => observer?.disconnect());

function move(direction: number) {
  const el = viewport.value!;
  movedWith = direction < 0 ? "left" : "right";
  el.scrollLeft += direction * Math.max(1, el.clientWidth * 0.8);
  measure();
}

function onFocusCapture(event: FocusEvent) {
  // Teleported content (e.g. a context menu) bubbles through the nav: only
  // remember focus that is really inside it.
  const nav = event.currentTarget as HTMLElement;
  const target = event.target as HTMLElement;
  if (nav.contains(target)) {
    focused = target.closest(TAB_SELECTOR) ? target : null;
  }
}

function onContextMenuCapture(event: MouseEvent) {
  const item = (event.target as Element).closest(TAB_SELECTOR);
  if (item) {
    focused = item.querySelector<HTMLButtonElement>(`.${styles.trigger}`);
  }
}

const navAttrs = computed(() => ({
  ...attrs,
  ...hooks("page-tabs", "root"),
}));
const leftLabel = computed(
  () => props.scrollLeftLabel ?? t("pageTabs.scrollLeft"),
);
const rightLabel = computed(
  () => props.scrollRightLabel ?? t("pageTabs.scrollRight"),
);
// Physical buttons: the left one always sits on the left edge (it comes
// last in the DOM in RTL, where the flex row is reversed).
const buttons = computed(() => {
  const left = {
    label: leftLabel.value,
    disabled: !scroll.value.left,
    icon: IconChevronLeft,
    direction: -1,
  };
  const right = {
    label: rightLabel.value,
    disabled: !scroll.value.right,
    icon: IconChevronRight,
    direction: 1,
  };
  return scroll.value.rtl ? [right, left] : [left, right];
});
</script>

<template>
  <nav
    :class="styles.pageTabs"
    v-bind="navAttrs"
    @focus.capture="onFocusCapture"
    @contextmenu.capture="onContextMenuCapture"
  >
    <IconButton
      v-if="scroll.overflow"
      :class="styles.scroll"
      :label="buttons[0].label"
      size="small"
      shape="square"
      :disabled="buttons[0].disabled"
      @click="move(buttons[0].direction)"
    >
      <component :is="buttons[0].icon" :size="18" aria-hidden="true" />
    </IconButton>
    <div
      ref="viewport"
      :class="styles.viewport"
      v-bind="hooks('page-tabs', 'viewport')"
      @scroll="measure"
    >
      <div ref="list" :class="styles.list" v-bind="hooks('page-tabs', 'list')">
        <slot />
      </div>
    </div>
    <IconButton
      v-if="scroll.overflow"
      :class="styles.scroll"
      :label="buttons[1].label"
      size="small"
      shape="square"
      :disabled="buttons[1].disabled"
      @click="move(buttons[1].direction)"
    >
      <component :is="buttons[1].icon" :size="18" aria-hidden="true" />
    </IconButton>
    <div
      v-if="slots.actions"
      :class="styles.actions"
      v-bind="hooks('page-tabs', 'actions')"
    >
      <slot name="actions" />
    </div>
  </nav>
</template>

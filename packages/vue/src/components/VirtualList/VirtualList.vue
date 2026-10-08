<script setup lang="ts" generic="T extends VirtualListItem">
/**
 * VirtualList: a scrolling list that only renders the rows in (and around)
 * the visible area, with an optional measured row height, infinite loading
 * (`@load-more`) and clickable rows (`@item-click`). The scroll container is
 * a focusable, labelled region; rows expose their real position
 * (`aria-setsize` / `aria-posinset`) and the focused row stays mounted when
 * it is scrolled out of the window. Attributes fall through to the root.
 */
import {
  computed,
  getCurrentInstance,
  onBeforeUnmount,
  onMounted,
  ref,
  shallowRef,
  useAttrs,
  type CSSProperties,
  type StyleValue,
  type VNodeChild,
} from "vue";
import { getVirtualRange } from "@minerva/core";
import styles from "@react-styles/components/VirtualList/virtualList.module.scss";
import progressStyles from "@react-styles/components/ProgressIndicator/progressIndicator.module.scss";
import { hooks } from "../../internal/hooks";
import { IconWaveSquare } from "../../internal/icons";
import { useI18n } from "../../config/useI18n";
import type { VirtualItem, VirtualListItem, VirtualListProps } from "./types";

defineOptions({ name: "VirtualList", inheritAttrs: false });

const props = withDefaults(defineProps<VirtualListProps<T>>(), {
  itemHeight: undefined,
  itemPadding: 8,
  overscan: 5,
  renderItem: undefined,
  onLoadMore: undefined,
  loadMoreThreshold: 100,
  highPerformance: false,
  loading: false,
  "aria-label": undefined,
});

const emit = defineEmits<{
  /**
   * A row was clicked, or activated with Enter / Space while the row itself
   * has focus. Listening makes the rows clickable: focusable and shown with
   * a pointer cursor
   */
  itemClick: [item: T, index: number, event: MouseEvent | KeyboardEvent];
}>();

const slots = defineSlots<{
  /** Content of one row (wins over `renderItem`) */
  default?: (props: { item: T; index: number }) => unknown;
}>();

const attrs = useAttrs();
// `aria-label` is a declared prop: Vue stores it camelized
const ariaLabel = computed(
  () => (props as unknown as { ariaLabel?: string }).ariaLabel,
);
const instance = getCurrentInstance();
const { t } = useI18n();

// The loading row renders the DOM of the React <ProgressIndicator
// variant="wave" size="small" /> (same classes and hooks).

/** Renders the result of a render function (`renderItem`) */
const RenderContent = (p: { render: () => VNodeChild }) => p.render();
RenderContent.props = ["render"];

// Clickable rows (an @item-click listener) stay list items for the list
// semantics, made focusable and activatable with Enter / Space so the click
// handler is not pointer-only.
// (read while rendering: listeners are not reactive)
const isClickable = () => {
  const vnodeProps = instance?.vnode.props ?? {};
  return !!(vnodeProps.onItemClick || vnodeProps.onItemClickOnce);
};

const scrollTop = ref(0);
const containerHeight = ref(0);
let lastScrollTop = 0;
let isLoadingMore = false;
let rafId: number | undefined;
let idleId: number | undefined;
// Id of the item containing focus: it stays mounted when it is scrolled out
// of the window, otherwise unmounting it would drop focus to <body>
// (WCAG 2.4.3). Tracked by id so it follows the item when the data changes.
const focusedId = ref<VirtualListItem["id"] | null>(null);
const focusedIndex = computed(() =>
  focusedId.value === null
    ? null
    : props.items.findIndex((item) => item.id === focusedId.value),
);

// Measured content height (without padding); the padding is added when
// rendering so that itemPadding changes apply without measuring again.
// 0 = not measured yet.
const measuredContentHeight = ref(0);
const needsMeasure = computed(
  () =>
    !props.itemHeight &&
    measuredContentHeight.value === 0 &&
    props.items.length > 0,
);

// Container height: read on mount and observed while mounted
const root = shallowRef<HTMLDivElement | null>(null);
let containerObserver: ResizeObserver | undefined;
onMounted(() => {
  const node = root.value!;
  containerHeight.value = node.clientHeight;
  if (typeof ResizeObserver === "undefined") return;
  containerObserver = new ResizeObserver((entries) => {
    for (const entry of entries)
      containerHeight.value = entry.contentRect.height;
  });
  containerObserver.observe(node);
});

// Height of the first item. The measuring element is only mounted while
// needed (also when items arrive later) and removed once measured, which
// disconnects its observer.
let measureNode: HTMLElement | null = null;
let measureObserver: ResizeObserver | undefined;
const measureItem = (el: unknown) => {
  const node = (el as HTMLElement | null) ?? null;
  if (node === measureNode) return;
  measureObserver?.disconnect();
  measureObserver = undefined;
  measureNode = node;
  if (!node) return;
  const measure = () => {
    const height = node.offsetHeight;
    if (height > 0) measuredContentHeight.value = height;
  };
  measure();
  if (typeof ResizeObserver === "undefined") return;
  measureObserver = new ResizeObserver(measure);
  measureObserver.observe(node);
};

// Fixed or measured row height
const finalItemHeight = computed(
  () =>
    props.itemHeight ||
    (measuredContentHeight.value > 0
      ? measuredContentHeight.value + props.itemPadding * 2
      : 0),
);

const visibleRange = computed(() => {
  // Before the first row is measured, render one row to measure it.
  if (!finalItemHeight.value) return { start: 0, end: 1, visibleCount: 1 };
  return getVirtualRange({
    scrollTop: scrollTop.value,
    viewportHeight: containerHeight.value,
    itemHeight: finalItemHeight.value,
    itemCount: props.items.length,
    overscan: props.overscan,
  });
});

const virtualItems = computed(() => {
  const height = finalItemHeight.value;
  const { start, end } = visibleRange.value;
  const result: VirtualItem[] = [];
  for (let i = start; i < end; i++) {
    result.push({ index: i, start: i * height, height });
  }
  // Keep the focused item rendered (at its real position) outside the window
  const focused = focusedIndex.value;
  if (focused !== null && focused >= 0 && (focused < start || focused >= end)) {
    const item = { index: focused, start: focused * height, height };
    if (focused < start) result.unshift(item);
    else result.push(item);
  }
  return result;
});

// Cancels the pending RAF / idle callbacks
function cancelScheduled() {
  if (rafId !== undefined) {
    cancelAnimationFrame(rafId);
    rafId = undefined;
  }
  if (idleId !== undefined) {
    if ("cancelIdleCallback" in window) cancelIdleCallback(idleId);
    idleId = undefined;
  }
}

function scheduleUpdate(callback: () => void) {
  if (!props.highPerformance) {
    callback();
    return;
  }
  // Only the latest scroll position matters: drop pending work
  cancelScheduled();
  rafId = requestAnimationFrame(() => {
    rafId = undefined;
    if ("requestIdleCallback" in window) {
      idleId = requestIdleCallback(
        () => {
          idleId = undefined;
          callback();
        },
        { timeout: 100 },
      );
    } else {
      callback();
    }
  });
}

function onScroll(event: Event) {
  const {
    scrollTop: top,
    scrollHeight,
    clientHeight,
  } = event.currentTarget as HTMLDivElement;
  const isScrollingDown = top > lastScrollTop;
  lastScrollTop = top;
  scheduleUpdate(() => {
    scrollTop.value = top;
    const onLoadMore = props.onLoadMore;
    if (
      isScrollingDown &&
      onLoadMore &&
      !isLoadingMore &&
      !props.loading &&
      scrollHeight - top - clientHeight < props.loadMoreThreshold &&
      // no load-more for content that does not scroll
      scrollHeight > clientHeight
    ) {
      isLoadingMore = true;
      // Tolerate callbacks that do not return a promise
      Promise.resolve(onLoadMore()).finally(() => {
        isLoadingMore = false;
      });
    }
  });
}

onBeforeUnmount(() => {
  cancelScheduled();
  containerObserver?.disconnect();
  measureItem(null);
});

function onItemKeydown(event: KeyboardEvent, index: number) {
  // Only the row itself: keys of its content are theirs
  if (event.target !== event.currentTarget) return;
  if (event.key !== "Enter" && event.key !== " ") return;
  event.preventDefault();
  emit("itemClick", props.items[index], index, event);
}

function onItemFocusout(event: FocusEvent) {
  const row = event.currentTarget as HTMLElement;
  if (!row.contains(event.relatedTarget as Node | null)) focusedId.value = null;
}

const rootAttrs = computed(() => {
  const { class: className, style, ...rest } = attrs;
  return {
    ...rest,
    // Scrollable region: focusable so keyboard users can scroll it
    role: "region",
    "aria-label": ariaLabel.value,
    tabindex: 0,
    "aria-busy": props.loading || undefined,
    class: [styles.virtualList, className],
    style: [
      style as StyleValue,
      {
        maxHeight: `${props.maxHeight}px`,
        overflow: "auto",
        position: "relative",
      } satisfies CSSProperties,
    ],
    ...hooks("virtual-list", "root", { loading: props.loading }),
  };
});

const contentStyle = computed<CSSProperties>(() => ({
  height: finalItemHeight.value
    ? `${props.items.length * finalItemHeight.value}px`
    : "auto",
  position: "relative",
  willChange: "transform",
}));

const itemStyle = (start: number): CSSProperties => ({
  position: "absolute",
  top: 0,
  transform: `translateY(${start}px)`,
  width: "100%",
  height: `${finalItemHeight.value}px`,
  willChange: "transform",
  padding: `${props.itemPadding}px`,
});
</script>

<template>
  <div ref="root" v-bind="rootAttrs" @scroll="onScroll">
    <div
      v-if="needsMeasure"
      :ref="measureItem"
      :class="styles.measureItem"
      aria-hidden="true"
    >
      <slot v-if="slots.default" :item="items[0]" :index="0" />
      <RenderContent
        v-else-if="renderItem"
        :render="() => renderItem!(items[0], 0)"
      />
    </div>
    <div
      :style="contentStyle"
      :class="styles.virtualListContent"
      role="list"
      :aria-label="ariaLabel"
      v-bind="hooks('virtual-list', 'list')"
    >
      <template v-if="finalItemHeight > 0">
        <div
          v-for="virtualItem in virtualItems"
          :key="items[virtualItem.index].id"
          :style="itemStyle(virtualItem.start)"
          :class="[styles.virtualListItem, isClickable() && styles.clickable]"
          :tabindex="isClickable() ? 0 : undefined"
          role="listitem"
          v-bind="hooks('virtual-list', 'item')"
          :aria-setsize="items.length"
          :aria-posinset="virtualItem.index + 1"
          @click="
            isClickable() &&
            emit(
              'itemClick',
              items[virtualItem.index],
              virtualItem.index,
              $event,
            )
          "
          @keydown="isClickable() && onItemKeydown($event, virtualItem.index)"
          @focusin="focusedId = items[virtualItem.index].id"
          @focusout="onItemFocusout"
        >
          <slot
            v-if="slots.default"
            :item="items[virtualItem.index]"
            :index="virtualItem.index"
          />
          <RenderContent
            v-else-if="renderItem"
            :render="
              () => renderItem!(items[virtualItem.index], virtualItem.index)
            "
          />
        </div>
      </template>
    </div>
    <div
      v-if="loading"
      :class="styles.loadingWrapper"
      v-bind="hooks('virtual-list', 'loading')"
    >
      <div
        :class="[progressStyles.progressIndicator, progressStyles.primary]"
        role="progressbar"
        :aria-label="t('common.loading')"
        v-bind="
          hooks('progress', 'root', {
            variant: 'wave',
            size: 'small',
            color: 'primary',
          })
        "
      >
        <div
          :class="[progressStyles.waveContainer, progressStyles.small]"
          v-bind="hooks('progress', 'indicator')"
        >
          <IconWaveSquare :class="progressStyles.wave" aria-hidden="true" />
        </div>
      </div>
    </div>
  </div>
</template>

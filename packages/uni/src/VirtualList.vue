<script setup lang="ts">
import {
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
  watch,
  nextTick,
  getCurrentInstance,
} from "vue";
import { useNativeId as useId } from "./native-id";
import { getVirtualRange } from "@minerva/core";
import ProgressIndicator from "./ProgressIndicator.vue";
const props = withDefaults(
  defineProps<{
    items?: any[];
    itemHeight?: number;
    maxHeight?: number;
    height?: number;
    overscan?: number;
    itemPadding?: number;
    loadMoreThreshold?: number;
    onLoadMore?: () => Promise<void> | void;
    highPerformance?: boolean;
    loading?: boolean;
    ariaLabel?: string;
  }>(),
  { items: () => [], overscan: 5, itemPadding: 8, loadMoreThreshold: 100 },
);
const emit = defineEmits<{
  scroll: [top: number, event: unknown];
  itemClick: [item: any, index: number, event: unknown];
  loadError: [error: unknown];
}>();
const instance = getCurrentInstance();
const clickable = computed(() => !!instance?.vnode.props?.onItemClick);
const top = ref(0),
  measured = ref(0),
  containerHeight = ref(0),
  focused = ref<string | number | null>(null);
const root = ref<any>(),
  sample = ref<any>();
const id = `mn-virtual-${useId().replace(/[^a-z0-9]/gi, "")}`;
const maxHeight = computed(() => props.maxHeight ?? props.height ?? 300);
const rowHeight = computed(
  () =>
    props.itemHeight ??
    (measured.value ? measured.value + props.itemPadding * 2 : 0),
);
const range = computed(() =>
  rowHeight.value
    ? getVirtualRange({
        scrollTop: top.value,
        viewportHeight: containerHeight.value || maxHeight.value,
        itemHeight: rowHeight.value,
        itemCount: props.items.length,
        overscan: props.overscan,
      })
    : { start: 0, end: Math.min(1, props.items.length) },
);
const indexes = computed(() => {
  const rows = Array.from(
    { length: Math.max(0, range.value.end - range.value.start) },
    (_, i) => i + range.value.start,
  );
  const at = props.items.findIndex((item) => item.id === focused.value);
  if (at >= 0 && !rows.includes(at)) rows.push(at);
  return rows.sort((a, b) => a - b);
});
let observer: ResizeObserver | undefined;
let frame: number | ReturnType<typeof setTimeout> | undefined;
let frameNative = false;
let idle: number | undefined;
let loadingMore = false;
let lastTop = 0;
let disposed = false;
function dom(value: any) {
  return value?.$el ?? value;
}
function measure() {
  const el = dom(root.value),
    probe = dom(sample.value);
  if (el?.clientHeight > 0) containerHeight.value = el.clientHeight;
  if (!props.itemHeight && probe?.offsetHeight > 0)
    measured.value = probe.offsetHeight;
  if (probe?.getBoundingClientRect || props.itemHeight) return;
  try {
    const query = uni.createSelectorQuery?.().in(instance?.proxy);
    query?.select(`#${id}`).boundingClientRect((rect: any) => {
      if (rect?.height > 0) containerHeight.value = rect.height;
    });
    if (!props.itemHeight)
      query?.select(`#${id}-measure`).boundingClientRect((rect: any) => {
        if (rect?.height > 0) measured.value = rect.height;
      });
    query?.exec();
  } catch {}
}
function cancel() {
  if (frame !== undefined) {
    if (frameNative) clearTimeout(frame);
    else cancelAnimationFrame(frame as number);
    frame = undefined;
  }
  if (idle !== undefined && typeof cancelIdleCallback === "function") {
    cancelIdleCallback(idle);
    idle = undefined;
  }
}
function schedule(callback: () => void) {
  cancel();
  if (!props.highPerformance) {
    callback();
    return;
  }
  const render = () => {
    frame = undefined;
    if (typeof requestIdleCallback === "function")
      idle = requestIdleCallback(
        () => {
          idle = undefined;
          if (!disposed) callback();
        },
        { timeout: 100 },
      );
    else if (!disposed) callback();
  };
  frameNative = typeof requestAnimationFrame !== "function";
  frame = frameNative ? setTimeout(render, 16) : requestAnimationFrame(render);
}
function scroll(event: any) {
  const el = dom(root.value);
  const value = event.detail?.scrollTop ?? el?.scrollTop ?? 0;
  const height =
    event.detail?.scrollHeight ??
    el?.scrollHeight ??
    rowHeight.value * props.items.length;
  const viewport = el?.clientHeight || containerHeight.value || maxHeight.value;
  const down = value > lastTop;
  lastTop = value;
  emit("scroll", value, event);
  schedule(() => {
    top.value = value;
    if (
      down &&
      props.onLoadMore &&
      !loadingMore &&
      !props.loading &&
      height > viewport &&
      height - value - viewport < props.loadMoreThreshold
    ) {
      loadingMore = true;
      Promise.resolve()
        .then(() => props.onLoadMore?.())
        .catch((error) => emit("loadError", error))
        .finally(() => (loadingMore = false));
    }
  });
}
function activate(index: number, event: Event) {
  if (clickable.value) emit("itemClick", props.items[index], index, event);
}
function keys(index: number, event: KeyboardEvent) {
  if (
    event.target !== event.currentTarget ||
    !["Enter", " "].includes(event.key)
  )
    return;
  event.preventDefault();
  activate(index, event);
}
watch(
  () => [props.items.length, props.itemHeight],
  () => nextTick(measure),
);
watch(() => props.highPerformance, cancel);
onMounted(() => {
  measure();
  if (typeof ResizeObserver !== "undefined") {
    observer = new ResizeObserver(measure);
    for (const element of [dom(root.value), dom(sample.value)])
      if (element?.nodeType === 1) observer.observe(element);
  }
  uni.onWindowResize?.(measure);
});
onBeforeUnmount(() => {
  disposed = true;
  cancel();
  observer?.disconnect();
  uni.offWindowResize?.(measure);
});
</script>
<template>
  <scroll-view
    :id="id"
    ref="root"
    scroll-y
    class="mn-virtual-list mn-uni-virtual-list"
    role="region"
    :aria-label="props.ariaLabel"
    tabindex="0"
    :style="{ height: `${maxHeight}px`, maxHeight: `${maxHeight}px` }"
    @scroll="scroll"
  >
    <view
      v-if="!itemHeight && items.length && !measured"
      :id="`${id}-measure`"
      ref="sample"
      data-virtual-measure
      class="mn-uni-virtual-measure"
      ><slot :item="items[0]" :index="0">{{
        items[0]?.label ?? items[0]
      }}</slot></view
    >
    <view
      class="mn-uni-virtual-spacer"
      :style="{ height: `${items.length * rowHeight}px` }"
      ><view
        v-for="index in indexes"
        :key="items[index]?.id ?? index"
        class="mn-list-item mn-uni-virtual-item"
        :class="{ 'mn-virtual-clickable': clickable }"
        :data-virtual-index="index"
        :tabindex="clickable ? 0 : undefined"
        :style="{
          height: rowHeight ? `${rowHeight}px` : undefined,
          padding: `${itemPadding}px`,
          top: `${index * rowHeight}px`,
        }"
        @focusin="focused = items[index]?.id ?? index"
        @focusout="focused = null"
        @tap="activate(index, $event)"
        @keydown="keys(index, $event)"
        ><slot :item="items[index]" :index="index">{{
          items[index]?.label ?? items[index]
        }}</slot></view
      ></view
    ><ProgressIndicator v-if="loading" variant="spinner" />
  </scroll-view>
</template>

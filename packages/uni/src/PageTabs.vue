<script setup lang="ts">
import {
  ref,
  computed,
  provide,
  onMounted,
  onBeforeUnmount,
  onUpdated,
  watch,
  nextTick,
  getCurrentInstance,
} from "vue";
import { useNativeId as useId } from "./native-id";
import PageTab from "./PageTab.vue";
import { useI18n } from "./i18n";
const props = withDefaults(
  defineProps<{
    activeValue?: string;
    value?: string;
    defaultValue?: string;
    ariaLabel?: string;
    scrollLeftLabel?: string;
    scrollRightLabel?: string;
    items?: {
      value: string;
      label: string;
      disabled?: boolean;
      closable?: boolean;
      content?: string;
    }[];
    disabled?: boolean;
  }>(),
  { items: () => [] },
);
const emit = defineEmits(["change", "update:modelValue", "close"]);
const { t, dir } = useI18n();
const local = ref(props.defaultValue ?? props.items[0]?.value);
const active = computed(() => props.activeValue ?? props.value ?? local.value);
const id = `mn-pages-${useId().replace(/[^a-z0-9]/gi, "")}`;
const viewport = ref<any>(),
  list = ref<any>();
const offset = ref(0),
  width = ref(0),
  total = ref(0);
const overflow = computed(() => total.value > width.value + 1);
const left = computed(() =>
  dir.value === "rtl"
    ? offset.value > -(total.value - width.value) + 1
    : offset.value > 1,
);
const right = computed(() =>
  dir.value === "rtl"
    ? offset.value < -1
    : offset.value < total.value - width.value - 1,
);
const instance = getCurrentInstance();
let observer: ResizeObserver | undefined;
let previousItems = "";
let focusedElement: HTMLElement | null = null;
const into = computed(
  () => `${id}-${encodeURIComponent(active.value ?? "").replace(/%/g, "_")}`,
);
function choose(value: string) {
  if (props.disabled) return;
  if (props.value === undefined && props.activeValue === undefined)
    local.value = value;
  emit("change", value);
  emit("update:modelValue", value);
}
provide("minerva:page-tabs", {
  active,
  disabled: computed(() => props.disabled),
  select: choose,
  itemId: (value: string) =>
    `${id}-${encodeURIComponent(value).replace(/%/g, "_")}`,
});
function element(value: any) {
  return value?.$el ?? value;
}
function measure() {
  const el = element(viewport.value);
  if (el?.getBoundingClientRect) {
    width.value = el.clientWidth;
    total.value = el.scrollWidth;
    offset.value = el.scrollLeft;
    return;
  }
  try {
    const query = uni.createSelectorQuery?.().in(instance?.proxy);
    query?.select(`#${id}`).boundingClientRect((rect: any) => {
      if (rect) width.value = rect.width;
    });
    query?.select(`#${id}-list`).boundingClientRect((rect: any) => {
      if (rect) total.value = rect.width;
    });
    query?.exec();
  } catch {}
}
function reveal() {
  const el = element(viewport.value);
  if (el?.getBoundingClientRect) {
    const item = el.querySelector("[data-current]");
    if (item) {
      const view = el.getBoundingClientRect(),
        box = item.getBoundingClientRect();
      if (box.width > view.width || box.left < view.left)
        el.scrollLeft += box.left - view.left;
      else if (box.right > view.right) el.scrollLeft += box.right - view.right;
    }
  }
  measure();
}
function move(direction: number) {
  const next = offset.value + direction * Math.max(1, width.value * 0.8);
  const max = Math.max(0, total.value - width.value);
  offset.value =
    dir.value === "rtl"
      ? Math.max(-max, Math.min(0, next))
      : Math.max(0, Math.min(max, next));
  const el = element(viewport.value);
  if (el?.getBoundingClientRect) el.scrollLeft = offset.value;
}
function scroll(event: any) {
  const detail = event.detail;
  if (detail) {
    offset.value = detail.scrollLeft ?? offset.value;
    total.value = detail.scrollWidth ?? total.value;
  } else measure();
}
watch(
  () => [active.value, props.items.map((item) => item.value).join("|")],
  () => nextTick(reveal),
);
onUpdated(() => {
  if (
    focusedElement &&
    !focusedElement.isConnected &&
    typeof document !== "undefined" &&
    document.activeElement === document.body
  ) {
    element(list.value)?.querySelector('[aria-current="page"]')?.focus();
    focusedElement = null;
  }

  const el = element(list.value);
  const identity = Array.from(
    el?.querySelectorAll?.("[data-value]") ?? [],
    (item: any) => item.dataset.value,
  ).join("|");
  if (identity !== previousItems) {
    previousItems = identity;
    reveal();
  }
});
onMounted(() => {
  reveal();
  const el = element(viewport.value);
  if (el?.nodeType === 1 && typeof ResizeObserver !== "undefined") {
    observer = new ResizeObserver(() => requestAnimationFrame(reveal));
    observer.observe(el);
    const children = element(list.value);
    if (children?.nodeType === 1) observer.observe(children);
  }
  uni.onWindowResize?.(reveal);
  if (typeof window !== "undefined") window.addEventListener("resize", reveal);
});
onBeforeUnmount(() => {
  observer?.disconnect();
  uni.offWindowResize?.(reveal);
  if (typeof window !== "undefined")
    window.removeEventListener("resize", reveal);
});
</script>
<template>
  <view
    class="mn-uni-page-tabs"
    role="navigation"
    :aria-label="props.ariaLabel"
  >
    <button
      v-if="overflow"
      class="mn-close"
      :aria-label="scrollLeftLabel ?? t('pageTabs.scrollLeft')"
      :disabled="!left"
      @tap="move(-1)"
    >
      ‹
    </button>
    <scroll-view
      :id="id"
      ref="viewport"
      data-page-viewport
      class="mn-uni-page-viewport"
      scroll-x
      :scroll-left="offset"
      :scroll-into-view="into"
      @scroll="scroll"
      @focusin="focusedElement = $event.target as HTMLElement"
      ><view :id="`${id}-list`" ref="list" class="mn-uni-page-list"
        ><slot name="tabs" /><PageTab
          v-for="item in items"
          :key="item.value"
          :value="item.value"
          :label="item.label"
          :disabled="item.disabled"
          :closable="item.closable"
          @close="emit('close', item.value)" /><slot
          v-if="!items.length" /></view
    ></scroll-view>
    <button
      v-if="overflow"
      class="mn-close"
      :aria-label="scrollRightLabel ?? t('pageTabs.scrollRight')"
      :disabled="!right"
      @tap="move(1)"
    >
      ›</button
    ><slot name="actions" /> </view
  ><view v-if="items.length" class="mn-tab-panel"
    ><slot :value="active">{{
      items.find((i) => i.value === active)?.content
    }}</slot></view
  >
</template>

<script setup lang="ts">
import { h5Host, nativeAttribute } from "./host";
import { modalScope } from "./h5";
import {
  inject,
  ref,
  computed,
  watch,
  nextTick,
  onMounted,
  onBeforeUnmount,
  getCurrentInstance,
} from "vue";
import { useNativeId as useId } from "./native-id";
import type { MiniPopoverContext } from "./popover-context";
type Side = "top" | "right" | "bottom" | "left";
const props = withDefaults(
  defineProps<{
    forceMount?: boolean;
    id?: string;
    role?: string;
    dismissLayer?: boolean;
    side?: Side;
    align?: "start" | "center" | "end";
    sideOffset?: number;
    alignOffset?: number;
    collisionPadding?: number;
    matchAnchorWidth?: false | "min" | "exact";
    arrow?: boolean;
    portal?: boolean;
  }>(),
  {
    align: "center",
    sideOffset: 6,
    alignOffset: 0,
    collisionPadding: 8,
    matchAnchorWidth: false,
    portal: false,
    dismissLayer: true,
  },
);
defineOptions({ inheritAttrs: false });
const emit = defineEmits<{
  openAutoFocus: [event: Event];
  closeAutoFocus: [event: Event];
  escapeKeyDown: [event: KeyboardEvent];
  pointerDownOutside: [event: Event];
  focusOutside: [event: Event];
  interactOutside: [event: Event];
}>();
const root = inject<MiniPopoverContext | undefined>(
  "minerva:popover",
  undefined,
);
const element = ref<any>();
const id = props.id ?? `mn-popover-panel-${useId().replace(/[^a-z0-9]/gi, "")}`;
const instance = getCurrentInstance();
const side = computed(
  () => props.side ?? (root?.placement.value.split("-")[0] as Side) ?? "bottom",
);
const placed = ref<Side>("bottom"),
  style = ref<Record<string, string>>({
    position: "fixed",
    visibility: "hidden",
  });
let observer: ResizeObserver | undefined;
let measureFrame: number | undefined;
const h5 = typeof document !== "undefined";
let releaseModal: (() => void) | undefined;
let disposed = false,
  revision = 0;
let nativeTimer: ReturnType<typeof setInterval> | undefined;
function dom(value: any) {
  return value?.$el ?? value;
}
function place(
  anchor: any,
  panel: any,
  viewport: { width: number; height: number },
) {
  if (!anchor || !panel) return;
  const pad = Math.max(0, props.collisionPadding),
    gap = props.sideOffset;
  let preferred = side.value;
  const width =
    props.matchAnchorWidth === "exact"
      ? Math.min(anchor.width, viewport.width - pad * 2)
      : Math.min(
          Math.max(
            panel.width,
            props.matchAnchorWidth === "min" ? anchor.width : 0,
          ),
          viewport.width - pad * 2,
        );
  const height = Math.min(panel.height, viewport.height - pad * 2);
  const room = {
    top: anchor.top - pad,
    bottom: viewport.height - anchor.bottom - pad,
    left: anchor.left - pad,
    right: viewport.width - anchor.right - pad,
  };
  const opposite = {
    top: "bottom",
    bottom: "top",
    left: "right",
    right: "left",
  } as const;
  const needed =
    (preferred === "left" || preferred === "right" ? width : height) + gap;
  if (room[preferred] < needed && room[opposite[preferred]] > room[preferred])
    preferred = opposite[preferred];
  placed.value = preferred;
  let x = anchor.left,
    y = anchor.top;
  const vertical = preferred === "top" || preferred === "bottom";
  if (vertical) {
    y = preferred === "top" ? anchor.top - height - gap : anchor.bottom + gap;
    x =
      props.align === "start"
        ? anchor.left
        : props.align === "end"
          ? anchor.right - width
          : anchor.left + (anchor.width - width) / 2;
    x += props.alignOffset;
  } else {
    x = preferred === "left" ? anchor.left - width - gap : anchor.right + gap;
    y =
      props.align === "start"
        ? anchor.top
        : props.align === "end"
          ? anchor.bottom - height
          : anchor.top + (anchor.height - height) / 2;
    y += props.alignOffset;
  }
  x = Math.max(pad, Math.min(viewport.width - pad - width, x));
  y = Math.max(pad, Math.min(viewport.height - pad - height, y));
  style.value = {
    position: "fixed",
    left: `${x}px`,
    top: `${y}px`,
    maxWidth: `${Math.max(0, viewport.width - pad * 2)}px`,
    maxHeight: `${Math.max(0, viewport.height - pad * 2)}px`,
    ...(props.matchAnchorWidth === "exact"
      ? { width: `${width}px` }
      : props.matchAnchorWidth === "min"
        ? { minWidth: `${width}px` }
        : {}),
    visibility: "visible",
  };
}
function measure() {
  if (!root?.open.value) return;
  const anchor = dom(root.anchor.value ?? root.trigger.value),
    panel = dom(element.value);
  if (anchor?.getBoundingClientRect && panel?.getBoundingClientRect) {
    place(anchor.getBoundingClientRect(), panel.getBoundingClientRect(), {
      width: window.innerWidth,
      height: window.innerHeight,
    });
    return;
  }
  try {
    const info = uni.getSystemInfoSync();
    const query = uni.createSelectorQuery?.().in(instance?.proxy);
    const measureAnchor = root.measureAnchor ?? root.measureTrigger;
    measureAnchor?.((a) => {
      query
        ?.select(`#${id}`)
        .boundingClientRect((p: any) =>
          place(a, p, { width: info.windowWidth, height: info.windowHeight }),
        )
        .exec();
    });
  } catch {}
}
function cancellable(): Event {
  if (typeof Event !== "undefined")
    return new Event("minerva-interaction", { cancelable: true });
  const event = {
    defaultPrevented: false,
    preventDefault() {
      event.defaultPrevented = true;
    },
  };
  return event as unknown as Event;
}
function escape(event: KeyboardEvent) {
  if (event.key !== "Escape") return;
  emit("escapeKeyDown", event);
  if (!event.defaultPrevented) {
    event.preventDefault();
    root?.setOpen(false);
  }
}
function outside(event: Event, focus = false) {
  if (!root?.open.value) return;
  const panel = dom(element.value),
    trigger = dom(root.trigger.value);
  if (panel?.contains?.(event.target) || trigger?.contains?.(event.target))
    return;
  if (focus && root?.modal.value) return;
  if (focus) emit("focusOutside", event);
  else emit("pointerDownOutside", event);
  emit("interactOutside", event);
  if (!event.defaultPrevented) root?.setOpen(false);
}
const pointer = (event: Event) => outside(event),
  focus = (event: Event) => outside(event, true);
function backdrop() {
  const event = cancellable();
  emit("pointerDownOutside", event);
  emit("interactOutside", event);
  if (!event.defaultPrevented) root?.setOpen(false);
}
watch(
  () => root?.open.value,
  async (open, previous) => {
    const currentRevision = ++revision;
    clearInterval(nativeTimer);
    nativeTimer = undefined;
    await nextTick();
    if (disposed || currentRevision !== revision) return;
    if (open) {
      measure();
      if (!dom(element.value)?.getBoundingClientRect)
        nativeTimer = setInterval(measure, 100);
      const event = cancellable();
      emit("openAutoFocus", event);
      if (!event.defaultPrevented) dom(element.value)?.focus?.();
    } else if (previous) {
      const event = cancellable();
      emit("closeAutoFocus", event);
      if (!event.defaultPrevented) dom(root?.trigger.value)?.focus?.();
    }
  },
  { immediate: true },
);
watch(
  () => [
    props.side,
    props.align,
    props.sideOffset,
    props.alignOffset,
    props.collisionPadding,
    props.matchAnchorWidth,
  ],
  () => nextTick(measure),
);
watch(
  () => [root?.open.value, root?.modal.value, element.value, props.role],
  () => {
    releaseModal?.();
    releaseModal = undefined;
    if (root?.open.value && root.modal.value)
      releaseModal = modalScope(
        dom(element.value),
        props.role === "presentation" && dom(root.trigger.value)?.nodeType === 1
          ? [dom(root.trigger.value)]
          : [],
      );
  },
  { flush: "post" },
);
function stopObserving() {
  observer?.disconnect();
  observer = undefined;
  if (measureFrame !== undefined) cancelAnimationFrame(measureFrame);
  measureFrame = undefined;
}
watch(
  () => [
    root?.open.value,
    element.value,
    root?.anchor.value,
    root?.trigger.value,
  ],
  () => {
    stopObserving();
    const panel = dom(element.value);
    if (
      !root?.open.value ||
      panel?.nodeType !== 1 ||
      typeof ResizeObserver === "undefined"
    )
      return;
    const current = new ResizeObserver(() => {
      if (observer !== current || disposed || !root.open.value) return;
      if (measureFrame !== undefined) cancelAnimationFrame(measureFrame);
      measureFrame = requestAnimationFrame(() => {
        measureFrame = undefined;
        if (!disposed && observer === current) measure();
      });
    });
    observer = current;
    observer.observe(panel);
    const anchor = dom(root.anchor.value ?? root.trigger.value);
    if (anchor?.nodeType === 1) observer.observe(anchor);
  },
  { flush: "post" },
);
onMounted(() => {
  if (typeof uni !== "undefined") uni.onWindowResize?.(measure);
  if (typeof document !== "undefined") {
    document.addEventListener("pointerdown", pointer);
    document.addEventListener("focusin", focus);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, true);
  }
});
onBeforeUnmount(() => {
  releaseModal?.();
  disposed = true;
  clearInterval(nativeTimer);
  stopObserving();
  if (typeof uni !== "undefined") uni.offWindowResize?.(measure);
  if (typeof document !== "undefined") {
    document.removeEventListener("pointerdown", pointer);
    document.removeEventListener("focusin", focus);
    window.removeEventListener("resize", measure);
    window.removeEventListener("scroll", measure, true);
  }
});
defineExpose({ element, measure });
</script>
<template>
  <!-- #ifdef H5 -->
  <template v-if="h5Host">
    <Teleport to="body" :disabled="!h5 || !portal">
      <view
        v-if="root?.open.value && props.dismissLayer"
        class="mn-uni-popover-backdrop"
        :class="{ 'mn-uni-popover-modal': root.modal.value }"
        @tap="backdrop"
      /><view
        v-if="forceMount || root?.open.value"
        v-show="root?.open.value"
        :id="id"
        ref="element"
        class="mn-popup mn-uni-popover-panel"
        :role="props.role ?? 'dialog'"
        v-bind="$attrs"
        :aria-modal="root?.modal.value || undefined"
        tabindex="-1"
        :data-side="placed"
        :data-state="root?.open.value ? 'open' : 'closed'"
        :style="style"
        @keydown="escape"
        ><view
          v-if="arrow"
          data-popover-arrow
          class="mn-uni-popover-arrow"
          :class="`mn-side-${placed}`"
          :data-side="placed" /><slot
      /></view>
    </Teleport>
  </template>
  <!-- #endif -->
  <!-- #ifndef H5 -->
  <template v-if="!h5Host">
    <template>
      <view
        v-if="root?.open.value && props.dismissLayer"
        class="mn-uni-popover-backdrop"
        :class="{ 'mn-uni-popover-modal': root.modal.value }"
        @tap="backdrop"
      /><view
        v-if="forceMount || root?.open.value"
        v-show="root?.open.value"
        :id="id"
        ref="element"
        class="mn-popup mn-uni-popover-panel"
        :role="props.role ?? 'dialog'"
        :aria-label="nativeAttribute($attrs['aria-label'])"
        :aria-labelledby="nativeAttribute($attrs['aria-labelledby'])"
        :aria-describedby="nativeAttribute($attrs['aria-describedby'])"
        :data-testid="nativeAttribute($attrs['data-testid'])"
        :aria-modal="root?.modal.value || undefined"
        tabindex="-1"
        :data-side="placed"
        :data-state="root?.open.value ? 'open' : 'closed'"
        :style="style"
        @keydown="escape"
        ><view
          v-if="arrow"
          data-popover-arrow
          class="mn-uni-popover-arrow"
          :class="`mn-side-${placed}`"
          :data-side="placed" /><slot
      /></view>
    </template>
  </template>
  <!-- #endif -->
</template>

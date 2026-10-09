<script setup lang="ts">
import {
  ref,
  computed,
  inject,
  provide,
  onBeforeUnmount,
  getCurrentInstance,
  nextTick,
} from "vue";
import { useNativeId as useId } from "./native-id";
import type { MiniTooltipContext } from "./tooltip-context";
import type { MiniPopoverContext } from "./popover-context";
import PopoverContent from "./PopoverContent.vue";
const props = withDefaults(
  defineProps<{
    open?: boolean;
    defaultOpen?: boolean;
    content?: string;
    disabled?: boolean;
    placement?: string;
    enterDelay?: number;
    leaveDelay?: number;
    color?: "neutral" | "info" | "success" | "warning" | "danger";
    variant?: "solid" | "subtle" | "glass";
    shape?: "default" | "rounded" | "thought" | "square";
    animation?:
      "fade" | "scale" | "shift-away" | "shift-toward" | "perspective";
    offset?: [number, number];
    followCursor?: boolean;
    zIndex?: number;
    arrow?: boolean;
    ariaLabel?: string;
    contentClassName?: string;
  }>(),
  {
    open: undefined,
    placement: "top",
    color: "neutral",
    variant: "solid",
    shape: "default",
    animation: "fade",
    zIndex: 1500,
  },
);
const emit = defineEmits<{
  openChange: [open: boolean];
  "update:open": [open: boolean];
  open: [];
  close: [];
}>();
const parent = inject<MiniTooltipContext | null>("minerva:tooltip", null),
  local = ref(props.defaultOpen ?? false);
const visible = computed(() => !props.disabled && (props.open ?? local.value));
let timer: ReturnType<typeof setTimeout> | undefined;
const trigger = ref<any>(),
  popup = ref<any>(),
  anchor = ref<any>();
const cursor = ref<{ x: number; y: number } | null>(null),
  id = `mn-tooltip-${useId().replace(/[^a-z0-9]/gi, "")}`;
const instance = getCurrentInstance();
const side = computed(
    () => props.placement.split("-")[0] as "top" | "bottom" | "left" | "right",
  ),
  align = computed(
    () =>
      (props.placement.split("-")[1] ?? "center") as "start" | "center" | "end",
  );
function setOpen(value: boolean) {
  clearTimeout(timer);
  if ((props.disabled && value) || value === visible.value) return;
  if (props.open === undefined) local.value = value;
  if (!value && parent) parent.lastClosed.value = Date.now();
  emit("openChange", value);
  emit("update:open", value);
  if (value) emit("open");
  else emit("close");
}
function schedule(value: boolean) {
  clearTimeout(timer);
  if (props.disabled) return;
  const skip =
    value &&
    parent &&
    Date.now() - parent.lastClosed.value < parent.skipDelay.value;
  const delay = skip
    ? 0
    : value
      ? (props.enterDelay ?? parent?.enterDelay.value ?? 200)
      : (props.leaveDelay ?? parent?.leaveDelay.value ?? 0);
  timer = setTimeout(() => setOpen(value), delay);
}
function stay() {
  clearTimeout(timer);
}
function follow(event: any) {
  if (!props.followCursor) return;
  const touch = event.touches?.[0] ?? event;
  const x = touch.clientX ?? touch.x,
    y = touch.clientY ?? touch.y;
  if (typeof x !== "number" || typeof y !== "number") return;
  cursor.value = { x, y };
  anchor.value = {
    getBoundingClientRect: () => ({
      left: x,
      right: x,
      top: y,
      bottom: y,
      width: 0,
      height: 0,
    }),
  };
  nextTick(() => popup.value?.measure?.());
}
provide<MiniPopoverContext>("minerva:popover", {
  open: visible,
  disabled: computed(() => props.disabled),
  placement: side,
  modal: computed(() => false),
  setOpen,
  trigger,
  anchor,
  anchorId: ref(""),
  triggerId: id,
  measureTrigger: (callback) => {
    if (props.followCursor && cursor.value) {
      const { x, y } = cursor.value;
      callback({ left: x, right: x, top: y, bottom: y, width: 0, height: 0 });
      return;
    }
    uni
      .createSelectorQuery?.()
      .in(instance?.proxy)
      .select(`#${id}`)
      .boundingClientRect((rect: any) => {
        if (rect) callback(rect);
      })
      .exec();
  },
});
onBeforeUnmount(() => clearTimeout(timer));
defineExpose({
  open: () => setOpen(true),
  close: () => setOpen(false),
  toggle: () => setOpen(!visible.value),
});
</script>
<template>
  <view class="mn-popover mn-uni-tooltip-root"
    ><view
      ref="trigger"
      :id="id"
      class="mn-popover-trigger"
      :aria-describedby="visible ? `${id}-content` : undefined"
      @tap="setOpen(true)"
      @mouseenter="schedule(true)"
      @mouseleave="schedule(false)"
      @focusin="setOpen(true)"
      @focusout="schedule(false)"
      @mousemove="follow"
      @touchmove="follow"
      @keydown.esc="setOpen(false)"
      ><slot /></view
    ><PopoverContent
      ref="popup"
      :id="`${id}-content`"
      role="tooltip"
      :side="side"
      :align="align"
      :side-offset="
        offset
          ? side === 'top' || side === 'bottom'
            ? offset[1]
            : offset[0]
          : 8
      "
      :align-offset="
        offset
          ? side === 'top' || side === 'bottom'
            ? offset[0]
            : offset[1]
          : 0
      "
      :arrow="arrow"
      :dismiss-layer="false"
      class="mn-tooltip mn-uni-tooltip"
      :class="[
        `mn-tooltip-${color}`,
        `mn-tooltip-${variant}`,
        `mn-tooltip-${shape}`,
        `mn-tooltip-${animation}`,
        contentClassName,
      ]"
      :aria-label="ariaLabel"
      :style="{ zIndex }"
      @mouseenter="stay"
      @mouseleave="schedule(false)"
      @open-auto-focus="$event.preventDefault()"
      @close-auto-focus="$event.preventDefault()"
      ><slot name="content">{{ content }}</slot></PopoverContent
    ></view
  >
</template>

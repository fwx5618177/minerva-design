<script setup lang="ts">
import {
  ref,
  computed,
  inject,
  provide,
  nextTick,
  onBeforeUnmount,
  getCurrentInstance,
  type ComputedRef,
} from "vue";
import { useNativeId as useId } from "./native-id";
import Menu from "./Menu.vue";
import PopoverContent from "./PopoverContent.vue";
import type { MenuEntry } from "./menu-types";
import type { MiniPopoverContext } from "./popover-context";
const props = withDefaults(
  defineProps<{
    items?: MenuEntry[];
    disabled?: boolean;
    closeOnSelect?: boolean;
    size?: "small" | "medium";
    loop?: boolean;
    modal?: boolean;
    dir?: "ltr" | "rtl";
    ariaLabel?: string;
  }>(),
  {
    items: () => [],
    closeOnSelect: true,
    size: "medium",
    loop: true,
    modal: true,
  },
);
const emit = defineEmits<{
  select: [item: MenuEntry];
  openChange: [open: boolean];
}>();
const config = inject<ComputedRef<{ dir?: "ltr" | "rtl" }>>(
  "minerva:config",
  computed(() => ({})),
);
const direction = computed(() => props.dir ?? config.value.dir ?? "ltr");
const open = ref(false),
  area = ref<any>(),
  panel = ref<any>(),
  anchor = ref<any>();
const areaId = `mn-context-${useId().replace(/[^a-z0-9]/gi, "")}`;
const instance = getCurrentInstance();
let restoreTarget: HTMLElement | undefined,
  timer: ReturnType<typeof setTimeout> | undefined;
const dom = (value: any) => value?.$el ?? value;
function stopLongPress() {
  clearTimeout(timer);
  timer = undefined;
}
function setOpen(value: boolean) {
  if ((value && props.disabled) || value === open.value) return;
  open.value = value;
  emit("openChange", value);
}
function openAt(x?: number, y?: number) {
  if (props.disabled) return;
  stopLongPress();
  if (!open.value) {
    const element = dom(area.value);
    const focused =
      typeof document !== "undefined" ? document.activeElement : undefined;
    restoreTarget = element?.contains?.(focused) ? focused : element;
  }
  anchor.value =
    Number.isFinite(x) && Number.isFinite(y)
      ? {
          getBoundingClientRect: () => ({
            left: x,
            right: x,
            top: y,
            bottom: y,
            width: 0,
            height: 0,
          }),
        }
      : undefined;
  setOpen(true);
  void nextTick(() => panel.value?.measure?.());
}
function pointer(event: any) {
  if (props.disabled || event.defaultPrevented) return;
  event.preventDefault?.();
  const point =
    event.touches?.[0] ?? event.changedTouches?.[0] ?? event.detail ?? event;
  openAt(
    event.clientX ?? point.clientX ?? point.x,
    event.clientY ?? point.clientY ?? point.y,
  );
}
function keydown(event: KeyboardEvent) {
  if (props.disabled || event.defaultPrevented) return;
  if (event.key === "ContextMenu" || (event.shiftKey && event.key === "F10")) {
    event.preventDefault();
    openAt();
  }
}
function pointerDown(event: PointerEvent) {
  if (props.disabled || event.pointerType !== "touch") return;
  stopLongPress();
  timer = setTimeout(() => openAt(event.clientX, event.clientY), 700);
}
function autofocus(event: Event) {
  event.preventDefault();
  void nextTick(() => {
    const el = dom(panel.value?.element);
    el?.querySelector?.('button[role^="menuitem"]:not([disabled])')?.focus?.();
  });
}
function restore(event: Event) {
  event.preventDefault();
  restoreTarget?.focus?.();
}
function trap(event: KeyboardEvent) {
  if (!props.modal || event.key !== "Tab" || typeof document === "undefined")
    return;
  const buttons = Array.from(
    (dom(panel.value?.element)?.querySelectorAll?.(
      'button:not([disabled]),[tabindex="0"]',
    ) ?? []) as HTMLElement[],
  );
  const first = buttons[0],
    last = buttons[buttons.length - 1];
  if (!first) {
    event.preventDefault();
    return;
  }
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last?.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}
provide<MiniPopoverContext>("minerva:popover", {
  open: computed(() => open.value),
  disabled: computed(() => props.disabled),
  placement: computed(() =>
    anchor.value ? (direction.value === "rtl" ? "left" : "right") : "bottom",
  ),
  modal: computed(() => props.modal),
  setOpen,
  trigger: area,
  anchor,
  anchorId: ref(""),
  triggerId: areaId,
  measureAnchor: (callback) => {
    if (anchor.value) callback(anchor.value.getBoundingClientRect());
    else
      uni
        .createSelectorQuery?.()
        .in(instance?.proxy)
        .select(`#${areaId}`)
        .boundingClientRect((rect: any) => {
          if (rect) callback(rect);
        })
        .exec();
  },
});
onBeforeUnmount(stopLongPress);
</script>
<template>
  <view class="mn-context-menu" :dir="direction">
    <view
      :id="areaId"
      ref="area"
      class="mn-context-area"
      :class="{ 'mn-context-active': open }"
      :tabindex="disabled ? undefined : 0"
      aria-haspopup="menu"
      :aria-expanded="open"
      :aria-controls="open ? `${areaId}-panel` : undefined"
      @longpress="pointer"
      @contextmenu="pointer"
      @keydown="keydown"
      @pointerdown="pointerDown"
      @pointerup="stopLongPress"
      @pointermove="stopLongPress"
      @pointercancel="stopLongPress"
      ><slot
    /></view>
    <PopoverContent
      ref="panel"
      :id="`${areaId}-panel`"
      class="mn-uni-context-positioner"
      role="presentation"
      :align="anchor ? 'start' : direction === 'rtl' ? 'end' : 'start'"
      :side-offset="anchor ? 2 : 4"
      @open-auto-focus="autofocus"
      @close-auto-focus="restore"
      @keydown="trap"
    >
      <Menu
        :items="items"
        :disabled="disabled"
        :close-on-select="closeOnSelect"
        :open="open"
        :size="size"
        :loop="loop"
        :dir="direction"
        :aria-label="ariaLabel"
        @open-change="setOpen"
        @select="emit('select', $event)"
      />
    </PopoverContent>
  </view>
</template>

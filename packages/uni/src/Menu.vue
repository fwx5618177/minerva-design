<script setup lang="ts">
import { h5Host, nativeAttribute } from "./host";
import {
  computed,
  ref,
  provide,
  useSlots,
  nextTick,
  watch,
  getCurrentInstance,
} from "vue";
import { useNativeId as useId } from "./native-id";
import MenuInline from "./MenuInline.vue";
import PopoverContent from "./PopoverContent.vue";
import type { MiniPopoverContext } from "./popover-context";
import MenuEntries from "./MenuEntries.vue";
import type { MenuEntry, MenuState } from "./menu-types";
const props = withDefaults(
  defineProps<{
    items?: MenuEntry[];
    value?: string;
    disabled?: boolean;
    open?: boolean;
    defaultOpen?: boolean;
    closeOnSelect?: boolean;
    size?: "small" | "medium";
    side?: "top" | "right" | "bottom" | "left";
    align?: "start" | "center" | "end";
    loop?: boolean;
    dir?: "ltr" | "rtl";
    ariaLabel?: string;
  }>(),
  {
    items: () => [],
    open: undefined,
    closeOnSelect: true,
    size: "medium",
    side: "bottom",
    align: "end",
    loop: true,
  },
);
const emit = defineEmits<{
  select: [item: MenuEntry];
  change: [key: string];
  openChange: [open: boolean];
  "update:open": [open: boolean];
  checkedChange: [key: string, checked: boolean];
  valueChange: [key: string, value: string];
}>();
const slots = useSlots();
const localOpen = ref(props.defaultOpen ?? false);
const shown = computed(
  () => props.open ?? (slots.trigger ? localOpen.value : true),
);
const expanded = ref<string[]>([]),
  active = ref("");
const checks = ref<Record<string, boolean>>({}),
  radios = ref<Record<string, string>>({});
const key = (item: MenuEntry) => item.key ?? item.value ?? "";
const checked = (item: MenuEntry) =>
  item.checked ?? checks.value[key(item)] ?? item.defaultChecked ?? false;
const radio = (item: MenuEntry) =>
  item.value ?? radios.value[key(item)] ?? item.defaultValue;
function setOpen(value: boolean) {
  if (props.disabled && value) return;
  if (props.open === undefined) localOpen.value = value;
  emit("openChange", value);
  emit("update:open", value);
  if (!value) expanded.value = [];
}
function choose(item: MenuEntry, group?: MenuEntry) {
  if (props.disabled || item.disabled || group?.disabled) return;
  active.value = group ? `${key(group)}:${item.value}` : key(item);
  if (group) {
    if (radio(group) !== item.value) {
      if (group.value === undefined) radios.value[key(group)] = item.value!;
      group.onValueChange?.(item.value!);
      emit("valueChange", key(group), item.value!);
    }
    if (group.closeOnSelect) setOpen(false);
    return;
  }
  if (item.type === "checkbox") {
    const next = !checked(item);
    if (item.checked === undefined) checks.value[key(item)] = next;
    item.onCheckedChange?.(next);
    emit("checkedChange", key(item), next);
    if (item.closeOnSelect) setOpen(false);
    return;
  }
  if (item.children?.length) {
    expanded.value = expanded.value.includes(key(item))
      ? expanded.value.filter((k) => k !== key(item))
      : [...expanded.value, key(item)];
    return;
  }
  emit("select", item);
  emit("change", key(item));
  if (item.closeOnSelect ?? props.closeOnSelect) setOpen(false);
}
function close(parentKey?: string) {
  if (parentKey) {
    expanded.value = expanded.value.filter((k) => k !== parentKey);
    active.value = parentKey;
    return;
  }
  if (expanded.value.length) expanded.value = expanded.value.slice(0, -1);
  else setOpen(false);
}
provide<MenuState>("minerva:menu", {
  disabled: computed(() => props.disabled),
  dir: computed(() => props.dir ?? "ltr"),
  checked,
  radio,
  expanded: computed(() => expanded.value),
  active: computed(() => active.value),
  choose,
  close,
  focus: (key) => (active.value = key),
});
const trigger = ref<any>(),
  floating = ref<any>();
const triggerId = `mn-menu-${useId().replace(/[^a-z0-9]/gi, "")}`;
const instance = getCurrentInstance();
let search = "",
  lastTyped = 0;
function triggerElement() {
  const el = trigger.value?.$el ?? trigger.value;
  return el?.querySelector?.("button") ?? el;
}
function autofocus(event: Event) {
  event.preventDefault();
  nextTick(() => {
    const el = floating.value?.$el ?? floating.value;
    const menu =
      typeof document !== "undefined"
        ? document.getElementById(`${triggerId}-menu`)
        : undefined;
    menu
      ?.querySelector<HTMLElement>('[role^="menuitem"]:not([disabled])')
      ?.focus();
  });
}
function restore(event: Event) {
  event.preventDefault();
  triggerElement()?.focus?.();
}
provide<MiniPopoverContext>("minerva:popover", {
  open: shown,
  disabled: computed(() => props.disabled),
  placement: computed(() => props.side),
  modal: computed(() => false),
  setOpen,
  trigger,
  anchor: ref(),
  anchorId: ref(""),
  triggerId,
  measureTrigger: (callback) => {
    uni
      .createSelectorQuery?.()
      .in(instance?.proxy)
      .select(`#${triggerId}`)
      .boundingClientRect((rect: any) => {
        if (rect) callback(rect);
      })
      .exec();
  },
});
function move(event: KeyboardEvent) {
  if (event.key === "Escape") {
    event.preventDefault();
    close();
    return;
  }
  if (
    event.key.length === 1 &&
    !event.altKey &&
    !event.ctrlKey &&
    !event.metaKey
  ) {
    const root = ((event.target as HTMLElement)?.closest?.('[role="menu"]') ??
      event.currentTarget) as HTMLElement;
    if (!root.querySelectorAll) return;
    const now = Date.now();
    search = now - lastTyped < 500 ? search + event.key : event.key;
    lastTyped = now;
    const buttons = Array.from(
      root.querySelectorAll<HTMLButtonElement>('button[role^="menuitem"]'),
    ).filter((b) => !b.disabled && b.closest('[role="menu"]') === root);
    const match = buttons.find((b) =>
      (b.textContent ?? "")
        .trim()
        .toLowerCase()
        .startsWith(search.toLowerCase()),
    );
    if (match) {
      event.preventDefault();
      match.focus();
    }
    return;
  }

  if (
    !["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key) ||
    props.disabled
  )
    return;
  event.preventDefault();
  const root = ((event.target as HTMLElement)?.closest?.('[role="menu"]') ??
    event.currentTarget) as HTMLElement;
  if (typeof root.querySelectorAll !== "function") return;
  const buttons = Array.from(
    root.querySelectorAll<HTMLButtonElement>('button[role^="menuitem"]'),
  ).filter((b) => !b.disabled && b.closest('[role="menu"]') === root);
  let index = buttons.findIndex((b) => b.dataset.menuKey === active.value);
  index =
    event.key === "Home"
      ? 0
      : event.key === "End"
        ? buttons.length - 1
        : index + (event.key === "ArrowDown" ? 1 : -1);
  if (props.loop) index = (index + buttons.length) % buttons.length;
  else index = Math.max(0, Math.min(buttons.length - 1, index));
  const button = buttons[index];
  if (button) {
    active.value = button.dataset.menuKey ?? "";
    button.focus?.();
  }
}
</script>
<template>
  <!-- #ifdef H5 -->
  <template v-if="h5Host">
    <view class="mn-menu-root" :dir="dir">
      <view
        v-if="$slots.trigger"
        ref="trigger"
        :id="triggerId"
        data-menu-trigger
        :aria-expanded="shown"
        @tap="setOpen(!shown)"
        @keydown.enter.prevent="setOpen(!shown)"
        @keydown.down.prevent="setOpen(true)"
        ><slot name="trigger" :open="shown" :disabled="disabled"
      /></view>
      <component
        :is="$slots.trigger ? PopoverContent : MenuInline"
        ref="floating"
        :side="side"
        :align="align"
        role="presentation"
        :class="{ 'mn-uni-menu-positioner': !!$slots.trigger }"
        @open-auto-focus="autofocus"
        @close-auto-focus="restore"
      >
        <view
          v-if="shown"
          :id="`${triggerId}-menu`"
          class="mn-menu mn-uni-menu"
          :class="[
            `mn-menu-${size}`,
            `mn-side-${side}`,
            `mn-align-${align}`,
            { 'mn-menu-inline': !$slots.trigger },
          ]"
          :data-side="side"
          :data-align="align"
          role="menu"
          :aria-label="props.ariaLabel"
          @keydown="move"
          ><MenuEntries :items="items"
            ><template v-if="$slots.item" #item="slotProps"
              ><slot
                name="item"
                :item="slotProps.item"
                :checked="slotProps.checked" /></template></MenuEntries
          ><slot /></view
      ></component>
    </view>
  </template>
  <!-- #endif -->
  <!-- #ifndef H5 -->
  <template v-if="!h5Host">
    <view class="mn-menu-root" :dir="dir">
      <view
        v-if="$slots.trigger"
        ref="trigger"
        :id="triggerId"
        data-menu-trigger
        :aria-expanded="shown"
        @tap="setOpen(!shown)"
        @keydown.enter.prevent="setOpen(!shown)"
        @keydown.down.prevent="setOpen(true)"
        ><slot name="trigger" :open="shown" :disabled="disabled"
      /></view>
      <PopoverContent
        v-if="$slots.trigger"
        ref="floating"
        :side="side"
        :align="align"
        role="presentation"
        :class="{ 'mn-uni-menu-positioner': !!$slots.trigger }"
        @open-auto-focus="autofocus"
        @close-auto-focus="restore"
      >
        <view
          v-if="shown"
          :id="`${triggerId}-menu`"
          class="mn-menu mn-uni-menu"
          :class="[
            `mn-menu-${size}`,
            `mn-side-${side}`,
            `mn-align-${align}`,
            { 'mn-menu-inline': !$slots.trigger },
          ]"
          :data-side="side"
          :data-align="align"
          role="menu"
          :aria-label="props.ariaLabel"
          @keydown="move"
          ><MenuEntries :items="items"
            ><template v-if="$slots.item" #item="slotProps"
              ><slot
                name="item"
                :item="slotProps.item"
                :checked="slotProps.checked" /></template></MenuEntries
          ><slot /></view></PopoverContent
      ><MenuInline
        v-else
        ref="floating"
        :side="side"
        :align="align"
        role="presentation"
        :class="{ 'mn-uni-menu-positioner': !!$slots.trigger }"
        @open-auto-focus="autofocus"
        @close-auto-focus="restore"
      >
        <view
          v-if="shown"
          :id="`${triggerId}-menu`"
          class="mn-menu mn-uni-menu"
          :class="[
            `mn-menu-${size}`,
            `mn-side-${side}`,
            `mn-align-${align}`,
            { 'mn-menu-inline': !$slots.trigger },
          ]"
          :data-side="side"
          :data-align="align"
          role="menu"
          :aria-label="props.ariaLabel"
          @keydown="move"
          ><MenuEntries :items="items"
            ><template v-if="$slots.item" #item="slotProps"
              ><slot
                name="item"
                :item="slotProps.item"
                :checked="slotProps.checked" /></template></MenuEntries
          ><slot /></view
      ></MenuInline>
    </view>
  </template>
  <!-- #endif -->
</template>

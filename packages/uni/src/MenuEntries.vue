<script setup lang="ts">
import { inject, nextTick, onBeforeUnmount } from "vue";
import type { MenuEntry, MenuState } from "./menu-types";
const props = defineProps<{ items: MenuEntry[]; parentKey?: string }>();
defineSlots<{
  item?: (props: { item: MenuEntry; checked?: boolean }) => any;
}>();
const state = inject<MenuState>("minerva:menu")!;
const key = (item: MenuEntry) => item.key ?? item.value ?? "";
const hoverTimers = new Map<string, ReturnType<typeof setTimeout>>();
function hover(item: MenuEntry) {
  clearTimeout(hoverTimers.get(key(item)));
  if (item.children?.length && !state.expanded.value.includes(key(item)))
    state.choose(item);
}
function leave(item: MenuEntry) {
  if (!item.children?.length) return;
  hoverTimers.set(
    key(item),
    setTimeout(() => state.close(key(item)), 250),
  );
}
onBeforeUnmount(() => hoverTimers.forEach(clearTimeout));
function keydown(event: KeyboardEvent, item: MenuEntry, group?: MenuEntry) {
  const opening = state.dir.value === "rtl" ? "ArrowLeft" : "ArrowRight";
  const closing = state.dir.value === "rtl" ? "ArrowRight" : "ArrowLeft";
  const button = event.currentTarget as HTMLElement;
  if (
    event.key === "Enter" ||
    event.key === " " ||
    (event.key === opening && item.children?.length)
  ) {
    event.preventDefault();
    event.stopPropagation();
    if (!item.children?.length || !state.expanded.value.includes(key(item)))
      state.choose(item, group);
    if (item.children?.length)
      nextTick(() =>
        button.nextElementSibling
          ?.querySelector<HTMLElement>('[role^="menuitem"]:not([disabled])')
          ?.focus(),
      );
  } else if (
    (event.key === "Escape" || event.key === closing) &&
    props.parentKey
  ) {
    event.preventDefault();
    event.stopPropagation();
    const parent = button.closest('[role="menu"]')?.previousElementSibling as
      HTMLElement | undefined;
    state.close(props.parentKey);
    nextTick(() => parent?.focus?.());
  }
}
</script>
<template>
  <template v-for="item in items" :key="key(item)">
    <view
      v-if="item.type === 'separator'"
      class="mn-divider"
      role="separator"
    />
    <view
      v-else-if="item.type === 'group'"
      role="group"
      :aria-label="item.label"
      ><text class="mn-menu-heading">{{ item.label }}</text
      ><MenuEntries :items="item.items ?? []" :parent-key="parentKey"
        ><template v-if="$slots.item" #item="slotProps"
          ><slot
            name="item"
            :item="slotProps.item"
            :checked="slotProps.checked" /></template></MenuEntries
    ></view>
    <view
      v-else-if="item.type === 'radio-group'"
      role="group"
      :aria-label="item.label"
      ><text v-if="item.label" class="mn-menu-heading">{{ item.label }}</text
      ><button
        v-for="radio in item.items ?? []"
        :key="radio.value"
        class="mn-option"
        role="menuitemradio"
        :data-menu-key="`${key(item)}:${radio.value}`"
        :aria-checked="state.radio(item) === radio.value"
        :disabled="state.disabled.value || item.disabled || radio.disabled"
        @tap="state.choose(radio, item)"
        @keydown="keydown($event, radio, item)"
      >
        <text aria-hidden="true">{{
          state.radio(item) === radio.value ? "●" : "○"
        }}</text>
        <slot
          name="item"
          :item="radio"
          :checked="state.radio(item) === radio.value"
          ><text>{{ radio.label }}</text></slot
        ><text v-if="radio.shortcut" class="mn-muted">{{
          radio.shortcut
        }}</text>
      </button></view
    >
    <view v-else @mouseenter="hover(item)" @mouseleave="leave(item)">
      <button
        class="mn-option"
        :class="{
          'mn-error': item.danger,
          'mn-active': state.active.value === key(item),
        }"
        :data-menu-key="key(item)"
        :role="item.type === 'checkbox' ? 'menuitemcheckbox' : 'menuitem'"
        :aria-checked="
          item.type === 'checkbox' ? state.checked(item) : undefined
        "
        :aria-expanded="
          item.children?.length
            ? state.expanded.value.includes(key(item))
            : undefined
        "
        :disabled="state.disabled.value || item.disabled"
        :tabindex="state.active.value === key(item) ? 0 : -1"
        @tap="state.choose(item)"
        @focus="state.focus(key(item))"
        @keydown="keydown($event, item)"
      >
        <text v-if="item.type === 'checkbox'" aria-hidden="true">{{
          state.checked(item) ? "☑" : "☐"
        }}</text
        ><text v-if="item.icon">{{ item.icon }}</text
        ><slot name="item" :item="item" :checked="state.checked(item)"
          ><text>{{ item.label }}</text></slot
        ><text v-if="item.shortcut" class="mn-muted">{{ item.shortcut }}</text
        ><text v-if="item.children?.length"> ›</text>
      </button>
      <view
        v-if="item.children?.length && state.expanded.value.includes(key(item))"
        class="mn-menu-submenu"
        role="menu"
        :aria-label="item.label"
        ><MenuEntries :items="item.children" :parent-key="key(item)"
          ><template #item="slotProps"
            ><slot
              name="item"
              :item="slotProps.item"
              :checked="slotProps.checked"
              ><text>{{ slotProps.item.label }}</text></slot
            ></template
          ></MenuEntries
        ></view
      >
    </view>
  </template>
</template>

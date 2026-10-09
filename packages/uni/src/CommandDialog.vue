<script setup lang="ts">
import {
  ref,
  computed,
  watch,
  nextTick,
  onMounted,
  onBeforeUnmount,
} from "vue";
import { useNativeId as useId } from "./native-id";
import {
  normalizeShortcuts,
  matchesShortcut,
  normalizeSearchText,
  commandSearchText,
  type ShortcutEvent,
} from "@minerva/core";
import { useI18n } from "./i18n";
import type { CommandItem } from "./command-types";
const props = withDefaults(
  defineProps<{
    open?: boolean;
    defaultOpen?: boolean;
    items?: CommandItem[];
    title?: string;
    description?: string;
    placeholder?: string;
    emptyText?: string;
    shortcutLabel?: string;
    shortcut?: string | string[];
    maxResults?: number;
    filter?: (items: CommandItem[], query: string) => CommandItem[];
    resultsLabel?: string;
    enterLabel?: string;
  }>(),
  { open: undefined, items: () => [], maxResults: 12 },
);
const { t } = useI18n();
const emit = defineEmits<{
  select: [item: CommandItem];
  openChange: [open: boolean];
  "update:open": [open: boolean];
}>();
const local = ref(props.defaultOpen ?? false),
  query = ref(""),
  active = ref(0),
  input = ref<any>();
const visible = computed(() => props.open ?? local.value);
const id = `mn-command-${useId().replace(/[^a-z0-9]/gi, "")}`;
let opener: HTMLElement | null = null;
let disposed = false;
const results = computed(() => {
  const enabled = props.items.filter((item) => !item.disabled),
    q = query.value.trim();
  if (!q) return enabled.slice(0, props.maxResults);
  return (
    props.filter
      ? props.filter(enabled, q)
      : enabled.filter((item) =>
          normalizeSearchText(commandSearchText(item)).includes(
            normalizeSearchText(q),
          ),
        )
  ).slice(0, props.maxResults);
});
const activeId = computed(() =>
  results.value[active.value] ? `${id}-option-${active.value}` : undefined,
);
function setOpen(value: boolean) {
  if (value === visible.value) return;
  if (props.open === undefined) local.value = value;
  emit("openChange", value);
  emit("update:open", value);
}
function choose(item?: CommandItem) {
  if (!item || item.disabled) return;
  emit("select", item);
  setOpen(false);
}
function change(event: any) {
  query.value = event.detail?.value ?? event.target?.value ?? "";
  active.value = 0;
}
function keys(event: KeyboardEvent) {
  if (event.isComposing) return;
  if (event.key === "Escape") {
    event.preventDefault();
    setOpen(false);
    return;
  }
  if (event.key === "Enter") {
    event.preventDefault();
    choose(results.value[active.value]);
    return;
  }
  const last = Math.max(0, results.value.length - 1);
  if (event.key === "ArrowDown") {
    event.preventDefault();
    active.value = Math.min(last, active.value + 1);
  } else if (event.key === "ArrowUp") {
    event.preventDefault();
    active.value = Math.max(0, active.value - 1);
  } else if (!query.value && event.key === "Home") {
    event.preventDefault();
    active.value = 0;
  } else if (!query.value && event.key === "End") {
    event.preventDefault();
    active.value = last;
  }
}
function shortcut(
  event: ShortcutEvent & {
    target?: EventTarget | null;
    isComposing?: boolean;
    preventDefault?: () => void;
    stopPropagation?: () => void;
  },
) {
  const target = event.target as HTMLElement | undefined;
  const editable =
    target &&
    (target.isContentEditable ||
      ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));
  if (
    event.isComposing ||
    (editable && !event.ctrlKey && !event.metaKey && !event.altKey)
  )
    return;
  if (
    normalizeShortcuts(props.shortcut).some((value) =>
      matchesShortcut(event, value),
    )
  ) {
    event.preventDefault?.();
    event.stopPropagation?.();
    setOpen(true);
  }
}
watch(
  visible,
  async (value, previous) => {
    if (value) {
      query.value = "";
      active.value = 0;
      if (typeof document !== "undefined")
        opener = document.activeElement as HTMLElement;
      await nextTick();
      if (!disposed) (input.value?.$el ?? input.value)?.focus?.();
    } else if (previous) {
      await nextTick();
      if (!disposed) opener?.focus?.();
    }
  },
  { immediate: true },
);
watch(activeId, () =>
  nextTick(() => {
    if (typeof document !== "undefined" && activeId.value)
      document
        .getElementById(activeId.value)
        ?.scrollIntoView?.({ block: "nearest" });
  }),
);
watch(results, (items) => {
  active.value = Math.max(0, Math.min(active.value, items.length - 1));
});
onMounted(() => {
  if (typeof document !== "undefined")
    document.addEventListener("keydown", shortcut, true);
});
onBeforeUnmount(() => {
  disposed = true;
  if (typeof document !== "undefined")
    document.removeEventListener("keydown", shortcut, true);
});
defineExpose({
  open: () => setOpen(true),
  close: () => setOpen(false),
  handleShortcut: shortcut,
});
</script>
<template>
  <view v-if="visible" class="mn-overlay mn-uni-command"
    ><view class="mn-backdrop" @tap="setOpen(false)" /><view
      class="mn-dialog mn-uni-command-panel"
      role="dialog"
      aria-modal="true"
      :aria-labelledby="`${id}-title`"
      :aria-describedby="`${id}-description`"
      @keydown.esc="setOpen(false)"
      ><view class="mn-row"
        ><text :id="`${id}-title`" class="mn-title"
          ><slot name="title">{{ title ?? t("command.title") }}</slot></text
        ><text v-if="shortcutLabel" class="mn-muted"
          ><slot name="shortcut">{{ shortcutLabel }}</slot></text
        ><button
          class="mn-close"
          :aria-label="t('modal.close')"
          @tap="setOpen(false)"
        >
          ×
        </button></view
      ><text :id="`${id}-description`" class="mn-muted"
        ><slot name="description">{{
          description ?? t("command.description")
        }}</slot></text
      ><view class="mn-row"
        ><input
          ref="input"
          :focus="visible"
          class="mn-input"
          :value="query"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded="true"
          :aria-controls="`${id}-results`"
          :aria-activedescendant="activeId"
          :aria-label="placeholder ?? t('command.placeholder')"
          :placeholder="placeholder ?? t('command.placeholder')"
          @input="change"
          @keydown="keys"
          @confirm="choose(results[active])"
        /><text class="mn-muted"
          ><slot name="enter">{{
            enterLabel ?? t("command.enter")
          }}</slot></text
        ></view
      ><scroll-view
        :id="`${id}-results`"
        scroll-y
        :scroll-into-view="activeId"
        class="mn-uni-command-results"
        role="listbox"
        :aria-label="resultsLabel ?? t('command.results')"
        ><button
          v-for="(item, index) in results"
          :id="`${id}-option-${index}`"
          :key="item.id"
          class="mn-option mn-uni-command-option"
          :class="{ 'mn-command-active': active === index }"
          role="option"
          :aria-selected="active === index"
          @mouseenter="active = index"
          @mousedown.prevent
          @tap="choose(item)"
        >
          <slot name="item" :item="item" :active="active === index"
            ><view
              ><text class="mn-title">{{ item.title }}</text
              ><text v-if="item.description" class="mn-muted">{{
                item.description
              }}</text></view
            ><text v-if="item.group" class="mn-badge">{{
              item.group
            }}</text></slot
          ></button
        ><text v-if="!results.length" class="mn-muted"
          ><slot name="empty">{{ emptyText ?? t("command.empty") }}</slot></text
        ></scroll-view
      ></view
    ></view
  >
</template>

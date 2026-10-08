<script setup lang="ts">
/**
 * CommandDialog: a searchable command palette in a modal. Filter with the
 * input, move with ArrowUp / ArrowDown, choose with Enter or a click. An
 * optional global `shortcut` (e.g. "mod+k") opens it. The markup of a large
 * Modal without close button (same styles), with its own styling hooks.
 */
import { computed, useSlots, watch } from "vue";
import { matchesShortcut, normalizeShortcuts } from "@minerva/core";
import { isEditableTarget } from "@minerva/dom";
import modalStyles from "@react-styles/components/Modal/modal.module.scss";
import styles from "@react-styles/components/Command/command.module.scss";
import DialogContent from "../../internal/DialogContent.vue";
import { provideDialog } from "../../internal/dialog";
import { useControllable } from "../../internal/controllable";
import { hooks } from "../../internal/hooks";
import { useI18n } from "../../config/useI18n";
import CommandPanel from "./CommandPanel.vue";
import CommandTitle from "./CommandTitle.vue";
import CommandDescription from "./CommandDescription.vue";
import type { CommandDialogProps, CommandItem } from "./types";

defineOptions({ name: "CommandDialog", inheritAttrs: false });

const props = withDefaults(defineProps<CommandDialogProps>(), {
  open: undefined,
  defaultOpen: undefined,
  title: undefined,
  description: undefined,
  placeholder: undefined,
  emptyText: undefined,
  shortcutLabel: undefined,
  shortcut: undefined,
  maxResults: 12,
  filter: undefined,
  resultsLabel: undefined,
  enterLabel: undefined,
  className: undefined,
});
const emit = defineEmits<{
  "update:open": [open: boolean];
  /** Open state requested to change (shortcut, selection, Escape, overlay) */
  openChange: [open: boolean];
  /** The chosen item (click or Enter); the dialog then closes */
  select: [item: CommandItem];
}>();
defineSlots<{
  title?: () => unknown;
  description?: () => unknown;
  "empty-text"?: () => unknown;
  "shortcut-label"?: () => unknown;
  "enter-label"?: () => unknown;
}>();
const slots = useSlots();
const { t } = useI18n();

const open = useControllable<boolean>(props, "open", {
  fallback: false,
  name: "CommandDialog",
  onChange: (value) => emit("openChange", value),
});
const setOpen = (value: boolean) => {
  open.value = value;
};
provideDialog({
  open: computed(() => open.value),
  setOpen,
  modal: computed(() => true),
});

// Stable key so an inline array literal does not re-register the listener.
const shortcutKey = computed(() =>
  normalizeShortcuts(props.shortcut).join("\n"),
);
watch(
  shortcutKey,
  (key, _prev, onCleanup) => {
    if (!key || typeof document === "undefined") return;
    const shortcuts = key.split("\n");
    const onKeyDown = (event: KeyboardEvent) => {
      // A shortcut without Ctrl / Meta / Alt (e.g. "/") is a printable key:
      // while typing in a text field (including the palette's own search) it
      // must reach the field instead of being swallowed.
      const editable =
        isEditableTarget(event.target) &&
        !event.ctrlKey &&
        !event.metaKey &&
        !event.altKey;
      if (editable || event.isComposing) return;
      if (!shortcuts.some((value) => matchesShortcut(event, value))) return;
      event.preventDefault();
      event.stopPropagation();
      setOpen(true);
    };
    document.addEventListener("keydown", onKeyDown, { capture: true });
    onCleanup(() => document.removeEventListener("keydown", onKeyDown, true));
  },
  { immediate: true, flush: "post" },
);

const select = (item: CommandItem) => {
  emit("select", item);
  setOpen(false);
};
</script>

<template>
  <DialogContent
    :overlay-class="modalStyles.overlay"
    :overlay-attrs="hooks('command-dialog', 'overlay')"
    :class="[modalStyles.content, modalStyles.large, styles.dialog, className]"
    v-bind="{ ...$attrs, ...hooks('command-dialog', 'content') }"
  >
    <CommandDescription>
      <slot name="description">{{
        description ?? t("command.description")
      }}</slot>
    </CommandDescription>
    <CommandTitle>
      <span
        ><slot name="title">{{ title ?? t("command.title") }}</slot></span
      >
      <kbd v-if="shortcutLabel || slots['shortcut-label']" :class="styles.kbd"
        ><slot name="shortcut-label">{{ shortcutLabel }}</slot></kbd
      >
    </CommandTitle>
    <CommandPanel
      :items="items"
      :max-results="maxResults"
      :filter="filter"
      :placeholder="placeholder ?? t('command.placeholder')"
      :results-label="resultsLabel ?? t('command.results')"
      @select="select"
    >
      <template #empty>
        <slot name="empty-text">{{ emptyText ?? t("command.empty") }}</slot>
      </template>
      <template #enter>
        <slot name="enter-label">{{ enterLabel ?? t("command.enter") }}</slot>
      </template>
    </CommandPanel>
  </DialogContent>
</template>

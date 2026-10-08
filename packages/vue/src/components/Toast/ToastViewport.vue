<script setup lang="ts">
/**
 * The fixed toast stack (internal): a labelled `role="region"`, only
 * programmatically focusable (hotkey) while focus is in it. Remembers where
 * focus came from to give it back once the toasts close.
 */
import { onBeforeUnmount, onMounted, shallowRef } from "vue";
import styles from "@react-styles/components/Toast/toast.module.scss";
import { hooks } from "../../internal/hooks";
import { useI18n } from "../../config/useI18n";
import ToastViewItem from "./ToastViewItem.vue";
import { ToastScope, type ToastFocusTracker } from "./parts";
import type { ToastItem } from "./store";
import type { ToastPosition } from "./types";

defineOptions({ name: "ToastViewport" });

const props = defineProps<{
  items: ToastItem[];
  position: ToastPosition;
  pauseOnHover: boolean;
  ariaLabel?: string;
  closeLabel?: string;
  /** Formatted hotkey, appended to the default region label */
  hotkeyLabel: string;
  tracker: ToastFocusTracker;
  /** Portal key of the viewport */
  viewportKey: string;
}>();

const { t } = useI18n();
const root = shallowRef<HTMLElement | null>(null);
onMounted(() => props.tracker.registerViewport(props.viewportKey, root.value));
onBeforeUnmount(() => props.tracker.registerViewport(props.viewportKey, null));

const onFocusIn = (event: FocusEvent) => {
  // Remember where focus came from to give it back once the toasts it moved
  // through close
  const from = event.relatedTarget as HTMLElement | null;
  const current = event.currentTarget as HTMLElement;
  if (from && !current.contains(from)) props.tracker.setReturnFocus(from);
};
const onFocusOut = (event: FocusEvent) => {
  // The region is only programmatically focusable while focus is in it
  const current = event.currentTarget as HTMLElement;
  if (!current.contains(event.relatedTarget as Node | null)) {
    current.removeAttribute("tabindex");
  }
};
</script>

<template>
  <div
    ref="root"
    :class="[styles.viewport, styles[position]]"
    v-bind="hooks('toast-region', 'root')"
    role="region"
    :aria-label="
      ariaLabel ??
      (hotkeyLabel
        ? t('toast.regionWithHotkey', { hotkey: hotkeyLabel })
        : t('toast.region'))
    "
    @focusin="onFocusIn"
    @focusout="onFocusOut"
  >
    <ToastScope v-for="item in items" :key="item.id" :scope="item.scope">
      <ToastViewItem
        :item="item"
        :pause-on-hover="pauseOnHover"
        :close-label="closeLabel"
        :tracker="tracker"
      />
    </ToastScope>
  </div>
</template>

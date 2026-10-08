<script setup lang="ts">
/**
 * One toast of the viewport (internal): `role="status"` (`alert` for a
 * settled danger toast), icon / spinner, title, description, action, close
 * button and countdown bar. Hover and focus pause its timer, Escape closes
 * the toast holding focus; closing moves focus to the next toast (never to
 * <body>).
 */
import { computed, shallowRef, type CSSProperties } from "vue";
import styles from "@react-styles/components/Toast/toast.module.scss";
import { hooks } from "../../internal/hooks";
import {
  IconCircleCheck,
  IconCircleX,
  IconInfo,
  IconTriangleAlert,
  IconX,
} from "../../internal/icons";
import { useI18n } from "../../config/useI18n";
import { toastStore, type ToastItem } from "./store";
import {
  moveFocusFromToast,
  ToastRender,
  ToastSpinner,
  type ToastFocusTracker,
} from "./parts";

defineOptions({ name: "ToastViewItem" });

const props = defineProps<{
  item: ToastItem;
  pauseOnHover: boolean;
  /** Explicit close label of the provider; localized in the item's scope otherwise */
  closeLabel?: string;
  tracker: ToastFocusTracker;
}>();

const ICONS = {
  info: IconInfo,
  success: IconCircleCheck,
  warning: IconTriangleAlert,
  danger: IconCircleX,
};

const { t } = useI18n();
const root = shallowRef<HTMLElement | null>(null);

/** Dismisses the toast, first moving focus out of it when it is inside. */
const close = () => {
  const el = root.value;
  if (el?.contains(el.ownerDocument.activeElement)) {
    moveFocusFromToast(el, props.tracker);
  }
  toastStore.dismiss(props.item.id);
};
const pause = () => {
  if (props.pauseOnHover) toastStore.pause(props.item.id);
};
const resume = () => {
  if (props.pauseOnHover) toastStore.resume(props.item.id);
};
const onFocusOut = (event: FocusEvent) => {
  const current = event.currentTarget as HTMLElement;
  if (!current.contains(event.relatedTarget as Node | null)) resume();
};
const closing = computed(() => props.item.state === "closing");
const onKeyDown = (event: KeyboardEvent) => {
  // Escape dismisses the toast holding focus (and only that one)
  if (event.key !== "Escape" || closing.value || event.isComposing) return;
  event.preventDefault();
  event.stopPropagation();
  close();
};
const onAction = () => {
  props.item.action?.onClick();
  close();
};

const style = computed<CSSProperties | undefined>(() =>
  props.item.duration > 0
    ? ({ "--toast-duration": `${props.item.duration}ms` } as CSSProperties)
    : undefined,
);
</script>

<template>
  <div
    ref="root"
    :class="[styles.toast, styles[item.color]]"
    :role="item.color === 'danger' && !item.loading ? 'alert' : 'status'"
    :style="style"
    v-bind="
      hooks('toast-region', 'toast', {
        state: closing ? 'closed' : 'open',
        color: item.color,
        loading: item.loading,
      })
    "
    @mouseenter="pause"
    @mouseleave="resume"
    @focusin="pause"
    @focusout="onFocusOut"
    @keydown="onKeyDown"
  >
    <span
      v-if="item.icon !== null"
      :class="styles.icon"
      aria-hidden="true"
      v-bind="hooks('toast-region', 'icon')"
    >
      <template v-if="item.icon === undefined">
        <ToastSpinner v-if="item.loading" />
        <component :is="ICONS[item.color]" v-else aria-hidden="true" />
      </template>
      <ToastRender v-else :content="item.icon" />
    </span>
    <div :class="styles.content">
      <div
        v-if="item.title"
        :class="styles.title"
        v-bind="hooks('toast-region', 'title')"
      >
        <ToastRender :content="item.title" />
      </div>
      <div
        v-if="item.description"
        :class="styles.description"
        v-bind="hooks('toast-region', 'description')"
      >
        <ToastRender :content="item.description" />
      </div>
    </div>
    <button
      v-if="item.action"
      type="button"
      :class="styles.action"
      v-bind="hooks('toast-region', 'action')"
      @click="onAction"
    >
      <ToastRender :content="item.action.label" />
    </button>
    <button
      v-if="item.closable"
      type="button"
      :class="styles.close"
      :aria-label="closeLabel ?? t('toast.close')"
      v-bind="hooks('toast-region', 'close-button')"
      @click="close"
    >
      <IconX aria-hidden="true" />
    </button>
    <span
      v-if="item.duration > 0 && !closing"
      :class="styles.progress"
      aria-hidden="true"
      v-bind="hooks('toast-region', 'progress')"
    />
  </div>
</template>

<script setup lang="ts">
import { h5Host, nativeAttribute } from "./host";
import { modalScope } from "./h5";
import {
  ref,
  computed,
  inject,
  provide,
  watch,
  nextTick,
  onMounted,
  onBeforeUnmount,
} from "vue";
import { useNativeId as useId } from "./native-id";
import { useI18n } from "./i18n";
import type { DrawerContext } from "./drawer-types";
import type { DialogSurfaceProps } from "./dialog-types";
defineOptions({ inheritAttrs: false });
const props = withDefaults(defineProps<DialogSurfaceProps>(), {
  open: undefined,
  modal: undefined,
  closeOnOverlayClick: true,
  size: "medium",
  role: "dialog",
});
const { t } = useI18n();
const context = inject<DrawerContext | undefined>(
  `minerva:${props.kind}`,
  undefined,
);
const emit = defineEmits<{
  openChange: [open: boolean];
  "update:open": [open: boolean];
  close: [reason: string];
  confirm: [];
  cancel: [];
  openAutoFocus: [event: Event];
  closeAutoFocus: [event: Event];
  escapeKeyDown: [event: KeyboardEvent];
  pointerDownOutside: [event: Event];
  interactOutside: [event: Event];
}>();
const local = ref(props.defaultOpen ?? false);
const visible = computed(() => props.open ?? local.value),
  modal = computed(() => props.modal ?? context?.modal.value ?? true),
  side = computed(() => props.side ?? props.placement ?? "right");
const panel = ref<any>(),
  trigger = ref<any>();
const id = `mn-drawer-${useId().replace(/[^a-z0-9]/gi, "")}`;
const authoredTitle = ref<string>();
provide("minerva:dialog-heading", authoredTitle);
let restoreTarget: HTMLElement | null = null;
let releaseModal: (() => void) | undefined;
let disposed = false;
let revision = 0;
function element(value: any) {
  return value?.$el ?? value;
}
function cancelable(): Event {
  if (typeof Event !== "undefined")
    return new Event("minerva-drawer", { cancelable: true });
  const event = {
    defaultPrevented: false,
    preventDefault() {
      event.defaultPrevented = true;
    },
  };
  return event as unknown as Event;
}
function request(value: boolean, reason = "close") {
  if (props.loading || (value && props.disabled)) return;
  if (props.open === undefined) local.value = value;
  emit("update:open", value);
  emit("openChange", value);
  if (!value) emit("close", reason);
}
function outside(event: Event, reason = "outside") {
  if (!visible.value || props.loading) return;
  if (reason === "overlay" && !props.closeOnOverlayClick) return;
  emit("pointerDownOutside", event);
  emit("interactOutside", event);
  if (!event.defaultPrevented) request(false, reason);
}
function escape(event: KeyboardEvent) {
  if (event.key !== "Escape" || !visible.value) return;
  emit("escapeKeyDown", event);
  if (!event.defaultPrevented) {
    event.preventDefault();
    request(false, "escape");
  }
}
function pointer(event: Event) {
  if (modal.value || !visible.value) return;
  const target = event.target;
  if (
    element(panel.value)?.contains?.(target) ||
    element(trigger.value ?? context?.trigger.value)?.contains?.(target)
  )
    return;
  outside(event);
}
function focus(event: Event) {
  if (modal.value || !visible.value) return;
  if (
    element(panel.value)?.contains?.(event.target) ||
    element(trigger.value ?? context?.trigger.value)?.contains?.(event.target)
  )
    return;
  emit("interactOutside", event);
  if (!event.defaultPrevented) request(false, "focus");
}
watch(
  visible,
  async (value, previous) => {
    if (value && typeof document !== "undefined")
      restoreTarget = document.activeElement as HTMLElement;
    const token = ++revision;
    await nextTick();
    if (disposed || token !== revision) return;
    if (value) {
      const event = cancelable();
      emit("openAutoFocus", event);
      if (!event.defaultPrevented) element(panel.value)?.focus?.();
    } else if (previous) {
      const event = cancelable();
      emit("closeAutoFocus", event);
      if (!event.defaultPrevented)
        element(
          trigger.value ?? context?.trigger.value ?? restoreTarget,
        )?.focus?.();
    }
  },
  { immediate: true },
);
watch(
  () => [visible.value, modal.value, element(panel.value)],
  () => {
    releaseModal?.();
    releaseModal = undefined;
    if (visible.value && modal.value)
      releaseModal = modalScope(element(panel.value));
  },
  { flush: "post" },
);
onMounted(() => {
  if (typeof document !== "undefined") {
    document.addEventListener("pointerdown", pointer);
    document.addEventListener("focusin", focus);
  }
});
onBeforeUnmount(() => {
  releaseModal?.();
  if (visible.value) {
    const event = cancelable();
    emit("closeAutoFocus", event);
    if (!event.defaultPrevented) {
      const target = element(
        trigger.value ?? context?.trigger.value ?? restoreTarget,
      );
      nextTick(() => target?.focus?.());
    }
  }
  disposed = true;
  if (typeof document !== "undefined") {
    document.removeEventListener("pointerdown", pointer);
    document.removeEventListener("focusin", focus);
  }
});
defineExpose({
  element: panel,
  dismissOutside: (event?: Event) => outside(event ?? cancelable()),
  close: () => request(false),
});
</script>
<template>
  <!-- #ifdef H5 -->
  <template v-if="h5Host">
    <view class="mn-uni-drawer-root"
      ><button
        v-if="$slots.trigger"
        ref="trigger"
        class="mn-drawer-trigger mn-button"
        :disabled="disabled || loading"
        :aria-expanded="visible"
        @tap="request(true)"
      >
        <slot name="trigger" />
      </button>
      <view
        v-if="forceMount || visible"
        v-show="visible"
        class="mn-uni-drawer-layer"
        :class="{ 'mn-drawer-nonmodal': !modal }"
        :data-state="visible ? 'open' : 'closed'"
      >
        <view
          v-if="modal"
          class="mn-backdrop"
          :class="overlayClassName"
          data-part="backdrop"
          @tap="outside(cancelable(), 'overlay')"
        />
        <view
          ref="panel"
          class="mn-dialog"
          :class="
            kind === 'modal'
              ? ['mn-uni-modal', `mn-modal-${size}`]
              : [
                  'mn-drawer',
                  'mn-uni-drawer',
                  `mn-drawer-${side}`,
                  `mn-drawer-${size}`,
                ]
          "
          :role="role"
          :aria-modal="modal || undefined"
          :aria-labelledby="
            title || $slots.title ? `${id}-title` : authoredTitle
          "
          :aria-label="
            !title && !$slots.title && !authoredTitle
              ? t('drawer.description')
              : undefined
          "
          :aria-describedby="
            kind === 'drawer' || description || $slots.description
              ? `${id}-description`
              : undefined
          "
          v-bind="$attrs"
          tabindex="-1"
          @keydown="escape"
        >
          <view class="mn-row"
            ><text
              v-if="title || $slots.title"
              :id="`${id}-title`"
              class="mn-title"
              ><slot name="title">{{ title }}</slot></text
            ><button
              v-if="!hideCloseButton"
              class="mn-close"
              :aria-label="
                closeLabel ??
                t(kind === 'modal' ? 'modal.close' : 'drawer.close')
              "
              :disabled="loading"
              @tap="request(false, 'close')"
            >
              ×
            </button></view
          >
          <view
            v-if="kind === 'drawer' || description || $slots.description"
            :id="`${id}-description`"
            :class="
              description || $slots.description
                ? 'mn-muted'
                : 'mn-uni-visually-hidden'
            "
            ><slot name="description">{{
              description ?? hiddenDescription ?? t("drawer.description")
            }}</slot></view
          ><view class="mn-dialog-content"><slot /></view><slot name="footer" />
        </view> </view
    ></view>
  </template>
  <!-- #endif -->
  <!-- #ifndef H5 -->
  <template v-if="!h5Host">
    <view class="mn-uni-drawer-root"
      ><button
        v-if="$slots.trigger"
        ref="trigger"
        class="mn-drawer-trigger mn-button"
        :disabled="disabled || loading"
        :aria-expanded="visible"
        @tap="request(true)"
      >
        <slot name="trigger" />
      </button>
      <view
        v-if="forceMount || visible"
        v-show="visible"
        class="mn-uni-drawer-layer"
        :class="{ 'mn-drawer-nonmodal': !modal }"
        :data-state="visible ? 'open' : 'closed'"
      >
        <view
          v-if="modal"
          class="mn-backdrop"
          :class="overlayClassName"
          data-part="backdrop"
          @tap="outside(cancelable(), 'overlay')"
        />
        <view
          ref="panel"
          class="mn-dialog"
          :class="
            kind === 'modal'
              ? ['mn-uni-modal', `mn-modal-${size}`]
              : [
                  'mn-drawer',
                  'mn-uni-drawer',
                  `mn-drawer-${side}`,
                  `mn-drawer-${size}`,
                ]
          "
          :role="role"
          :aria-modal="modal || undefined"
          :aria-labelledby="
            title || $slots.title ? `${id}-title` : authoredTitle
          "
          :aria-label="
            !title && !$slots.title && !authoredTitle
              ? t('drawer.description')
              : undefined
          "
          :aria-describedby="
            kind === 'drawer' || description || $slots.description
              ? `${id}-description`
              : undefined
          "
          :id="nativeAttribute($attrs['id'])"
          :style="$attrs['style']"
          :data-testid="nativeAttribute($attrs['data-testid'])"
          tabindex="-1"
          @keydown="escape"
        >
          <view class="mn-row"
            ><text
              v-if="title || $slots.title"
              :id="`${id}-title`"
              class="mn-title"
              ><slot name="title">{{ title }}</slot></text
            ><button
              v-if="!hideCloseButton"
              class="mn-close"
              :aria-label="
                closeLabel ??
                t(kind === 'modal' ? 'modal.close' : 'drawer.close')
              "
              :disabled="loading"
              @tap="request(false, 'close')"
            >
              ×
            </button></view
          >
          <view
            v-if="kind === 'drawer' || description || $slots.description"
            :id="`${id}-description`"
            :class="
              description || $slots.description
                ? 'mn-muted'
                : 'mn-uni-visually-hidden'
            "
            ><slot name="description">{{
              description ?? hiddenDescription ?? t("drawer.description")
            }}</slot></view
          ><view class="mn-dialog-content"><slot /></view><slot name="footer" />
        </view> </view
    ></view>
  </template>
  <!-- #endif -->
</template>

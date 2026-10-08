<script setup lang="ts">
/**
 * DialogContent: teleported overlay (modal) + the dialog element. Shared
 * foundation of Modal, Drawer, CommandDialog, ConfirmDialog and the AppShell
 * navigation drawer (same behaviour as the React `DialogContent`):
 *
 * - `role="dialog"` (or `alertdialog`), `aria-modal` when modal,
 *   `aria-labelledby` / `aria-describedby` linked to mounted title /
 *   description, `data-state="open|closed"`.
 * - Focus moves to the first tabbable (or the content) on open, is trapped and
 *   loops while modal, and returns to the opener (else the trigger) on close.
 * - Escape (topmost layer only) and pointer down outside (the overlay)
 *   request closing; overlays rendered inside are child layers.
 * - Modal: page scroll lock, the rest of the page `aria-hidden`, outside
 *   pointer events disabled. Stays mounted during the exit animation.
 */
import {
  computed,
  provide,
  shallowRef,
  useAttrs,
  type HTMLAttributes,
  type StyleValue,
} from "vue";
import Portal from "./Portal";
import { LAYER_KEY } from "./scope";
import { useDialogContext, type DialogState } from "./dialog";
import { useDismissableLayer } from "./dismissable-layer";
import { useFocusScope } from "./focus-scope";
import { useHideOthers, useScrollLock } from "./scroll-lock";
import { usePresence } from "./presence";

defineOptions({ name: "DialogContent", inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    role?: "dialog" | "alertdialog";
    /** Keep mounted while closed (`data-state="closed"`, no behaviour) */
    forceMount?: boolean;
    overlayClass?: HTMLAttributes["class"];
    overlayStyle?: StyleValue;
    /** `data-*` attributes of the overlay (its styling hooks) */
    overlayAttrs?: Record<string, string | undefined>;
    /** Teleport target; defaults to the theme-scoped one / `document.body` */
    container?: Element | null;
  }>(),
  {
    role: "dialog",
    forceMount: false,
    overlayClass: undefined,
    overlayStyle: undefined,
    overlayAttrs: undefined,
    container: undefined,
  },
);

const emit = defineEmits<{
  /** Before focus moves in; `preventDefault()` keeps it where it is */
  openAutoFocus: [event: Event];
  /** Before focus returns to the opener; `preventDefault()` skips it */
  closeAutoFocus: [event: Event];
  /** Escape while topmost; `preventDefault()` keeps it open */
  escapeKeyDown: [event: KeyboardEvent];
  /** Pointer pressed outside; `preventDefault()` keeps it open */
  pointerDownOutside: [event: PointerEvent];
  /** Pointer down or focus outside; `preventDefault()` keeps it open */
  interactOutside: [event: PointerEvent | FocusEvent];
}>();

defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const context = useDialogContext("DialogContent");
const element = shallowRef<HTMLElement | null>(null);
const setElement = (el: unknown) => {
  const node = el instanceof HTMLElement ? el : null;
  element.value = node;
  context.contentEl.value = node;
};

const open = context.open;
const present = usePresence(open, element);
const active = computed(() => open.value && !!element.value);
const modal = context.modal;

useDismissableLayer(element, () => ({
  enabled: active.value,
  disableOutsidePointerEvents: modal.value,
  branches: () => [context.triggerEl.value],
  onEscapeKeyDown: (event) => emit("escapeKeyDown", event),
  onPointerDownOutside: (event) => emit("pointerDownOutside", event),
  // Focus is trapped while modal: never dismiss on focus outside
  onFocusOutside: modal.value ? (event) => event.preventDefault() : undefined,
  onInteractOutside: (event) => emit("interactOutside", event),
  onDismiss: () => context.setOpen(false),
}));
useFocusScope(element, () => ({
  enabled: active.value,
  trapped: modal.value,
  loop: true,
  restoreFocus: () => context.openerEl.value ?? context.triggerEl.value,
  onMountAutoFocus: (event) => emit("openAutoFocus", event),
  onUnmountAutoFocus: (event) => emit("closeAutoFocus", event),
}));
useScrollLock(() => active.value && modal.value);
useHideOthers(element, () => active.value && modal.value);

provide(LAYER_KEY, element);

const state = computed<DialogState>(() => (open.value ? "open" : "closed"));
const overlayStyles = computed<StyleValue>(() => [
  { pointerEvents: "auto" },
  props.overlayStyle,
]);
</script>

<template>
  <Portal v-if="present || forceMount" :container="container">
    <div
      v-if="modal"
      :class="overlayClass"
      :style="overlayStyles"
      v-bind="overlayAttrs"
      :data-state="state"
      aria-hidden="true"
    />
    <div
      :ref="setElement"
      :id="context.contentId"
      :role="role"
      :aria-modal="modal || undefined"
      :aria-labelledby="context.titles.value > 0 ? context.titleId : undefined"
      :aria-describedby="
        context.descriptions.value > 0 ? context.descriptionId : undefined
      "
      tabindex="-1"
      :data-state="state"
      v-bind="attrs"
    >
      <slot />
    </div>
  </Portal>
</template>
